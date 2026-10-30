import {useSFieldValidation,fieldError,externalFieldError,fieldDisabled,fieldReadonly} from './form';
import {computed,defineComponent,h,ref,watch,nextTick,onMounted,onBeforeUnmount} from 'vue';
import type {PropType,SlotsType} from 'vue';
import {inputControlProps,useInputControl} from './input-control';
import type {SolInputClearEvent,SolInputControlSlots} from './input-control';
import {commonFieldProps,fieldDescription,fieldLabel,fieldMessages} from './controls';
import type {SolOption} from './controls';
import {useSolLocale,formatSolNumber} from './locale';
import {useFloatingPanel} from './floating';
import {SChip} from './primitives';

export const SSegmentedControl=/* @__PURE__ */ defineComponent({name:'SSegmentedControl',inheritAttrs:false,props:{...commonFieldProps,modelValue:{type:String as PropType<string|null>,default:null},options:{type:Array as PropType<readonly SolOption[]>,required:true},name:String},emits:{'update:modelValue':(_v:string)=>true,change:(_v:string)=>true},setup(p,{attrs,slots,emit,expose}){
 const l=useSolLocale(()=>p.locale),inputs=new Map<string,HTMLInputElement>();
 const enabled=()=>p.options.filter(o=>!o.disabled),chosen=()=>enabled().find(o=>o.value===p.modelValue)||enabled()[0];
 function choose(value:string){if(fieldDisabled(p)||fieldReadonly(p)||!enabled().some(o=>o.value===value))return;if(value!==p.modelValue){emit('update:modelValue',value);emit('change',value);}}
 function key(e:KeyboardEvent,value:string){if(e.isComposing||fieldDisabled(p))return;const list=enabled(),i=list.findIndex(o=>o.value===value);let n:number|undefined;if(e.key==='Home')n=0;else if(e.key==='End')n=list.length-1;else if(['ArrowRight','ArrowDown'].includes(e.key))n=(i+1)%list.length;else if(['ArrowLeft','ArrowUp'].includes(e.key))n=(i-1+list.length)%list.length;else if(e.key===' '&&fieldReadonly(p))e.preventDefault();if(n===undefined||!list[n])return;e.preventDefault();inputs.get(list[n].value)?.focus();choose(list[n].value);}
 const validation=useSFieldValidation(p,()=>p.modelValue,{focus:()=>inputs.get(chosen()?.value||'')?.focus()});expose(validation);
 return()=>h('fieldset',{...attrs,id:p.id,disabled:fieldDisabled(p),class:['sol-ui-native-field sol-ui-segments',attrs.class],'aria-describedby':fieldDescription(p,slots)},[h('legend',{class:'sol-label',id:p.id+'-label'},[slots.label?.()||p.label,p.required?' ('+l.value.required+')':'']),h('div',{class:'sol-ui-segment-options'},p.options.map((o,i)=>h('label',{class:'sol-ui-segment',for:p.id+'-'+i},[h('input',{ref:(e:unknown)=>{if(e)inputs.set(o.value,e as HTMLInputElement);else inputs.delete(o.value);},id:p.id+'-'+i,name:p.name||p.id,type:'radio',value:o.value,checked:p.modelValue===o.value,disabled:fieldDisabled(p)||o.disabled,required:p.required,'aria-invalid':fieldError(p)?'true':undefined,'aria-describedby':fieldDescription(p,slots),tabindex:!fieldDisabled(p)&&!o.disabled&&chosen()?.value===o.value?0:-1,'aria-disabled':fieldReadonly(p)?'true':undefined,onClick:(e:MouseEvent)=>{if(fieldReadonly(p))e.preventDefault();},onChange:(e:Event)=>{if(fieldDisabled(p)||fieldReadonly(p))(e.target as HTMLInputElement).checked=p.modelValue===o.value;else choose(o.value);},onKeydown:(e:KeyboardEvent)=>key(e,o.value)}),h('span',o.label)]))),...fieldMessages(p,slots)]);
}});

export type SolOptionLoader=(query:string,signal:AbortSignal)=>Promise<readonly SolOption[]>;
export interface SolMultiSelectHandle {focus():void;validate():boolean;clear():void;resetValidation():void}
export const SMultiSelect = /* @__PURE__ */ defineComponent({
  name: 'SMultiSelect',
  inheritAttrs: false,
  props: {
    ...commonFieldProps,
    ...inputControlProps,
    modelValue: { type: Array as PropType<readonly string[]>, default: () => [] },
    options: { type: Array as PropType<readonly SolOption[]>, default: () => [] },
    loadOptions: Function as PropType<SolOptionLoader>,
    maxSelected: Number,
    placeholder: String,
    debounce: { type: Number, default: 150 },
  },
  slots: Object as SlotsType<SolInputControlSlots>,
  emits: {
    'update:modelValue': (_v: string[]) => true,
    change: (_v: string[]) => true,
    search: (_q: string) => true,
    open: () => true,
    close: () => true,
    invalid: (_m: string) => true,
    clear: (_event: SolInputClearEvent<readonly string[]>) => true,
  },
  setup(p, { attrs, slots, emit, expose }) {
    const l = useSolLocale(() => p.locale),
      host = ref<HTMLElement | null>(null),
      panel = ref<HTMLElement | null>(null),
      input = ref<HTMLInputElement | null>(null),
      query = ref(''),
      opened = ref(false),
      active = ref(''),
      items = ref<readonly SolOption[]>([]),
      busy = ref(false),
      loadError = ref(''),
      localError = ref('')
    const anchor = computed(
      () => input.value?.closest<HTMLElement>('.sol-ui-input-frame') || input.value,
    )
    const { position } = useFloatingPanel(opened, anchor, panel, true, true, {
      visualViewport: true,
    })
    const labels = new Map<string, string>()
    let cancelledComposition = false,
      composing = false,
      request = 0,
      abort: AbortController | undefined,
      timer: ReturnType<typeof setTimeout> | undefined,
      disposed = false
    const remember = (list: readonly SolOption[]) => {
      const seen = new Set<string>()
      return list
        .filter(o => !!o.value && !seen.has(o.value) && !!seen.add(o.value))
        .map(o => {
          labels.set(o.value, o.label)
          return o
        })
    }
    watch(
      () => p.options,
      value => {
        const list = remember(value)
        if (!p.loadOptions) items.value = list
      },
      { immediate: true, deep: true },
    )
    const visible = () =>
      p.loadOptions
        ? items.value
        : items.value.filter(o => o.label.toLowerCase().includes(query.value.trim().toLowerCase()))
    const available = () => visible().filter(o => !o.disabled),
      selected = () => [...new Set(p.modelValue)],
      canAdd = (o: SolOption) =>
        selected().includes(o.value) ||
        p.maxSelected === undefined ||
        selected().length < p.maxSelected
    function stop() {
      clearTimeout(timer)
      timer = undefined
      abort?.abort()
      abort = undefined
      request++
      busy.value = false
    }
    async function load() {
      if (!p.loadOptions || composing || !opened.value || fieldDisabled(p) || fieldReadonly(p))
        return
      stop()
      const revision = request,
        controller = new AbortController()
      abort = controller
      busy.value = true
      loadError.value = ''
      items.value = []
      active.value = ''
      try {
        const result = await p.loadOptions(query.value, controller.signal)
        if (disposed || revision !== request || controller.signal.aborted) return
        items.value = remember(result)
        active.value = available()[0]?.value || ''
      } catch (e) {
        if (disposed || revision !== request || controller.signal.aborted) return
        loadError.value = l.value.loadFailed
      } finally {
        if (!disposed && revision === request) busy.value = false
      }
    }
    function search() {
      emit('search', query.value)
      if (p.loadOptions) {
        stop()
        loadError.value = ''
        items.value = []
        timer = setTimeout(() => void load(), Math.max(0, p.debounce))
      } else active.value = available()[0]?.value || ''
    }
    function open() {
      if (fieldDisabled(p) || fieldReadonly(p)) return
      const was = opened.value
      opened.value = true
      if (!was) {
        if (p.loadOptions) void load()
        else active.value = available()[0]?.value || ''
      }
    }
    function close() {
      if (!opened.value) return
      opened.value = false
      active.value = ''
      stop()
    }
    function validity() {
      input.value?.setCustomValidity(
        fieldError(p) || (p.required && !selected().length ? l.value.chooseAtLeastOne : ''),
      )
    }
    function validateIntrinsic() {
      localError.value = p.required && !selected().length ? l.value.chooseAtLeastOne : ''
      validity()
      if (localError.value) emit('invalid', localError.value)
      return !externalFieldError(p) && !localError.value
    }
    function commit(values: string[]) {
      if (fieldDisabled(p) || fieldReadonly(p)) return
      emit('update:modelValue', values)
      emit('change', values)
    }
    function toggle(o: SolOption) {
      if (fieldDisabled(p) || fieldReadonly(p) || o.disabled || busy.value || loadError.value)
        return
      const values = selected()
      if (values.includes(o.value)) commit(values.filter(v => v !== o.value))
      else if (canAdd(o)) commit([...values, o.value])
      else {
        localError.value = l.value.selectionLimit(p.maxSelected!)
        emit('invalid', localError.value)
      }
      input.value?.focus()
    }
    function remove(value: string) {
      if (fieldDisabled(p) || fieldReadonly(p)) return
      commit(selected().filter(v => v !== value))
      input.value?.focus()
    }
    function key(e: KeyboardEvent) {
      if (e.isComposing || composing || fieldDisabled(p)) return
      if (e.key === 'Escape' && opened.value) {
        e.preventDefault()
        e.stopPropagation()
        close()
        return
      }
      if (fieldReadonly(p)) return
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        if (!opened.value) {
          open()
          return
        }
        const list = available(),
          index = list.findIndex(o => o.value === active.value)
        active.value =
          list[(index + (e.key === 'ArrowDown' ? 1 : -1) + list.length) % list.length]?.value || ''
        void nextTick(() =>
          panel.value
            ?.querySelector('[data-active="true"]')
            ?.scrollIntoView?.({ block: 'nearest' }),
        )
      } else if (e.key === 'Enter' && opened.value) {
        e.preventDefault()
        const item = available().find(o => o.value === active.value)
        if (item) toggle(item)
      } else if (e.key === 'Backspace' && !query.value && selected().length) {
        e.preventDefault()
        remove(selected().at(-1)!)
      }
    }
    const outside = (e: Event) => {
      if (!host.value?.contains(e.target as Node)) close()
    }
    watch(opened, value => {
      if (value) emit('open')
      else emit('close')
    })
    watch(l, () => {
      if (loadError.value) loadError.value = l.value.loadFailed
      if (localError.value)
        localError.value =
          p.required && !selected().length
            ? l.value.chooseAtLeastOne
            : l.value.selectionLimit(p.maxSelected!)
      void nextTick(validity)
    })
    watch(
      () => [...p.modelValue],
      () => {
        localError.value = ''
        void nextTick(validity)
      },
    )
    watch(
      () => [fieldDisabled(p), fieldReadonly(p)],
      () => {
        if (fieldDisabled(p) || fieldReadonly(p)) close()
      },
    )
    watch(
      () => [p.required, fieldError(p)],
      () => nextTick(validity),
    )
    watch(
      () => p.loadOptions,
      () => {
        stop()
        items.value = p.loadOptions ? [] : remember(p.options)
        if (opened.value && p.loadOptions) void load()
      },
    )
    onMounted(() => {
      document.addEventListener('pointerdown', outside)
      document.addEventListener('focusin', outside)
      validity()
    })
    onBeforeUnmount(() => {
      disposed = true
      stop()
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('focusin', outside)
    })
    const validation = useSFieldValidation(p, () => p.modelValue, {
        focus: () => input.value?.focus(),
        validateIntrinsic,
        intrinsicError: () => localError.value,
        resetIntrinsic: () => {
          localError.value = ''
        },
      }),
      validate = validation.validate
    const control = useInputControl(p, slots, {
      always: true,
      locale: () => l.value,
      hasValue: () => selected().length > 0 || query.value.length > 0,
      disabled: () => fieldDisabled(p),
      readonly: () => fieldReadonly(p),
      error: () => fieldError(p) || localError.value,
      loading: () => busy.value,
      clear: () => {
        cancelledComposition = composing
        composing = false
        commit([])
        query.value = ''
        localError.value = ''
        loadError.value = ''
        close()
        stop()
        emit('clear', { value: [], reason: 'clear' })
      },
      validate: validation.validate,
      focus: validation.focus,
      element: () => input.value,
      trigger: icon =>
        h(
          'button',
          {
            type: 'button',
            class: 'sol-button',
            disabled: fieldDisabled(p) || fieldReadonly(p),
            'aria-label': p.label + ' ' + (opened.value ? l.value.close : l.value.choose),
            'aria-haspopup': 'listbox',
            'aria-expanded': String(opened.value),
            'aria-controls': opened.value ? p.id + '-list' : undefined,
            onMousedown: (event: MouseEvent) => event.preventDefault(),
            onClick: () => {
              if (opened.value) close()
              else open()
              input.value?.focus({ preventScroll: true })
            },
          },
          [icon],
        ),
    })
    function clear() {
      // The intrinsic chip frame must not change the existing undecorated clear contract.
      if (control.decorated()) {
        control.clear()
        return
      }
      if (fieldDisabled(p) || fieldReadonly(p)) return
      commit([])
      emit('clear', { value: [], reason: 'clear' })
    }
    expose({ ...validation, clear })
    return () => {
      const error = fieldError(p) || localError.value,
        list = visible()
      return h(
        'div',
        {
          ref: host,
          class: 'sol-field sol-ui-native-field sol-ui-multiselect',
          onKeydown: (event: KeyboardEvent) => {
            if (event.key === 'Escape' && opened.value && !event.isComposing && !composing) {
              event.preventDefault()
              event.stopPropagation()
              close()
              input.value?.focus()
            }
          },
        },
        [
          fieldLabel(p, slots, l.value.required),
          control.native(
            h('span', { class: 'sol-ui-multi-entry' }, [
              selected().length
                ? h(
                    'span',
                    {
                      class: 'sol-ui-tags sol-ui-multi-tags',
                      role: 'list',
                      'aria-label': p.label + ' ' + l.value.selectedItems,
                    },
                    selected().map(value =>
                      h(
                        'span',
                        { key: value, role: 'listitem' },
                        h(SChip, {
                          label: labels.get(value) || value,
                          size: 'sm',
                          removable: !fieldReadonly(p),
                          disabled: fieldDisabled(p),
                          removeLabel: l.value.remove(labels.get(value) || value),
                          onRemove: () => remove(value),
                        }),
                      ),
                    ),
                  )
                : null,
              h('input', {
                ...attrs,
                ref: input,
                id: p.id,
                type: 'text',
                class: ['sol-input sol-ui-input-native sol-ui-multi-query', attrs.class],
                role: 'combobox',
                value: query.value,
                placeholder: p.placeholder,
                disabled: fieldDisabled(p),
                readonly: fieldReadonly(p),
                autocomplete: 'off',
                'aria-autocomplete': 'list',
                'aria-busy': p.loading || busy.value ? 'true' : undefined,
                'aria-expanded': String(opened.value),
                'aria-controls': opened.value ? p.id + '-list' : undefined,
                'aria-activedescendant':
                  opened.value &&
                  !busy.value &&
                  !loadError.value &&
                  list.some(o => o.value === active.value)
                    ? p.id + '-option-' + list.findIndex(o => o.value === active.value)
                    : undefined,
                'aria-required': p.required ? 'true' : undefined,
                'aria-invalid': error ? 'true' : undefined,
                'aria-describedby': fieldDescription(
                  p,
                  slots,
                  error,
                  [p.id + '-count', attrs['aria-describedby']].filter(Boolean).join(' '),
                ),
                onClick: open,
                onInput: (e: Event) => {
                  if (fieldDisabled(p) || fieldReadonly(p)) return
                  query.value = (e.target as HTMLInputElement).value
                  if (!composing) {
                    if (!opened.value) opened.value = true
                    search()
                  }
                },
                onCompositionstart: () => {
                  cancelledComposition = false
                  composing = true
                  stop()
                },
                onCompositionend: (e: CompositionEvent) => {
                  if (cancelledComposition) {
                    cancelledComposition = false
                    composing = false
                    ;(e.target as HTMLInputElement).value = query.value
                    return
                  }
                  composing = false
                  query.value = (e.target as HTMLInputElement).value
                  if (!fieldDisabled(p) && !fieldReadonly(p)) {
                    opened.value = true
                    search()
                  }
                },
                onKeydown: key,
                onInvalid: (e: Event) => {
                  e.preventDefault()
                  validate()
                  input.value?.focus()
                },
              }),
            ]),
          ),
          opened.value
            ? h(
                'div',
                {
                  ref: panel,
                  popover: 'manual',
                  hidden: !opened.value,
                  class: 'sol-ui-floating sol-ui-multi-popup',
                  style: position.value,
                  onKeydown: (event: KeyboardEvent) => {
                    if (event.key === 'Escape') {
                      event.preventDefault()
                      event.stopPropagation()
                      close()
                      input.value?.focus()
                    }
                  },
                },
                [
                  h(
                    'ul',
                    {
                      id: p.id + '-list',
                      role: 'listbox',
                      'aria-label': p.label,
                      'aria-multiselectable': 'true',
                      'aria-busy': String(busy.value),
                      class: 'sol-ui-multi-options',
                    },
                    !busy.value && !loadError.value
                      ? list.map((o, i) =>
                          h(
                            'li',
                            {
                              key: o.value,
                              id: p.id + '-option-' + i,
                              role: 'option',
                              'aria-selected': String(selected().includes(o.value)),
                              'aria-disabled': o.disabled ? 'true' : undefined,
                              'data-active': String(active.value === o.value),
                              onPointerdown: (e: PointerEvent) => e.preventDefault(),
                              onClick: () => toggle(o),
                            },
                            [
                              h(
                                'span',
                                { 'aria-hidden': 'true' },
                                selected().includes(o.value) ? '✓' : '○',
                              ),
                              h('span', o.label),
                              o.disabled ? h('small', l.value.unavailable) : null,
                            ],
                          ),
                        )
                      : [],
                  ),
                  busy.value
                    ? h('p', { role: 'status', class: 'sol-hint' }, l.value.loading)
                    : loadError.value
                      ? h('div', { role: 'alert' }, [
                          h('p', { class: 'sol-error' }, loadError.value),
                          h(
                            'button',
                            {
                              type: 'button',
                              class: 'sol-button inline-action',
                              onClick: () => {
                                input.value?.focus()
                                void load()
                              },
                              onKeydown: (e: KeyboardEvent) => {
                                if (e.key === 'Escape') {
                                  e.preventDefault()
                                  close()
                                  input.value?.focus()
                                }
                              },
                            },
                            l.value.retry,
                          ),
                        ])
                      : !list.length
                        ? h('p', { role: 'status', class: 'sol-hint' }, l.value.noResults)
                        : null,
                ],
              )
            : null,
          h(
            'span',
            { id: p.id + '-count', class: 'sol-hint', role: 'status' },
            l.value.selectionCount(selected().length, p.maxSelected),
          ),
          ...fieldMessages(p, slots, error),
        ],
      )
    }
  },
})

export type SolRangeValue = readonly [number, number]

export const SRangeSlider=/* @__PURE__ */ defineComponent({name:'SRangeSlider',inheritAttrs:false,props:{...commonFieldProps,modelValue:{type:Array as unknown as PropType<SolRangeValue>,required:true},min:{type:Number,default:0},max:{type:Number,default:100},step:{type:Number,default:1},lowerLabel:String,upperLabel:String,formatValue:Function as PropType<(value:number)=>string>},emits:{'update:modelValue':(_v:[number,number])=>true,change:(_v:[number,number])=>true},setup(p,{attrs,slots,emit,expose}){
 const l=useSolLocale(()=>p.locale),track=ref<HTMLElement|null>(null),handles:HTMLElement[]=[];let drag:{id:number;index:number;start:SolRangeValue;last:SolRangeValue;target:HTMLElement}|null=null;
 const valid=()=>Number.isFinite(p.min)&&Number.isFinite(p.max)&&p.min<p.max&&Number.isFinite(p.step)&&p.step>0;
 const top=()=>valid()?Number((p.min+Math.floor((p.max-p.min)/p.step+1e-9)*p.step).toFixed(10)):1;
 const snap=(n:number)=>valid()?Number(Math.max(p.min,Math.min(top(),p.min+Math.round((n-p.min)/p.step)*p.step)).toFixed(10)):0;
 const values=():[number,number]=>{const a=snap(Number.isFinite(p.modelValue[0])?p.modelValue[0]:p.min),b=snap(Number.isFinite(p.modelValue[1])?p.modelValue[1]:top());return [Math.min(a,b),Math.max(a,b)];};
 function adjust(index:number,value:number,complete=true){if(fieldDisabled(p)||fieldReadonly(p)||!valid())return;const next=values();next[index]=index===0?Math.min(snap(value),next[1]):Math.max(snap(value),next[0]);if(next[0]!==p.modelValue[0]||next[1]!==p.modelValue[1]){emit('update:modelValue',next);if(drag)drag.last=next;if(complete)emit('change',next);}}
 function key(e:KeyboardEvent,index:number){if(e.isComposing||fieldDisabled(p)||fieldReadonly(p))return;const v=values(),step=p.step*(e.shiftKey?10:1);let n:number|undefined;if(['ArrowRight','ArrowUp'].includes(e.key))n=v[index]+step;else if(['ArrowLeft','ArrowDown'].includes(e.key))n=v[index]-step;else if(e.key==='Home')n=index===0?p.min:v[0];else if(e.key==='End')n=index===0?v[1]:top();else if(e.key==='PageUp')n=v[index]+p.step*10;else if(e.key==='PageDown')n=v[index]-p.step*10;if(n!==undefined){e.preventDefault();adjust(index,n);}}
 function at(clientX:number){const r=track.value!.getBoundingClientRect();return r.width?p.min+(clientX-r.left)/r.width*(top()-p.min):p.min;}
 function end(e?:PointerEvent,complete=true){if(!drag||e&&e.pointerId!==drag.id)return;const old=drag;drag=null;try{old.target.releasePointerCapture?.(old.id);}catch{}if(complete&&(old.last[0]!==old.start[0]||old.last[1]!==old.start[1]))emit('change',[...old.last] as [number,number]);}
 watch(()=>[fieldDisabled(p),fieldReadonly(p),p.min,p.max,p.step],()=>end(undefined,false));onBeforeUnmount(()=>{drag=null;});
 const validation=useSFieldValidation(p,()=>p.modelValue,{focus:()=>handles[0]?.focus(),validateIntrinsic:valid,intrinsicError:()=>valid()?'':l.value.invalidNumber});expose(validation);
 return()=>{const v=values(),range=top()-p.min,pct=(n:number)=>range>0?100*(n-p.min)/range:0,display=(n:number)=>p.formatValue?.(n)??formatSolNumber(n,l.value);return h('div',{...attrs,class:['sol-field sol-ui-range',attrs.class],role:'group','aria-labelledby':p.id+'-label','aria-describedby':fieldDescription(p,slots)},[h('div',{id:p.id+'-label',class:'sol-label'},slots.label?.()||p.label),h('div',{class:'sol-ui-range-values'},[h('span',{id:p.id+'-lower'},(p.lowerLabel||l.value.lower)+': '+display(v[0])),h('span',{id:p.id+'-upper'},(p.upperLabel||l.value.upper)+': '+display(v[1]))]),h('div',{class:'sol-ui-range-target',onPointerdown:(e:PointerEvent)=>{if((e.target as Element).closest('[role=slider]')||e.button!==0||fieldDisabled(p)||fieldReadonly(p)||!valid())return;e.preventDefault();const n=at(e.clientX),index=n>v[1]?1:n<v[0]?0:Math.abs(n-v[0])<=Math.abs(n-v[1])?0:1;adjust(index,n);handles[index]?.focus();}},[h('div',{ref:track,class:'sol-ui-range-rail'},h('div',{class:'sol-ui-range-fill',style:{left:pct(v[0])+'%',width:(pct(v[1])-pct(v[0]))+'%'}})),...[0,1].map(index=>h('div',{ref:(e:unknown)=>{handles[index]=e as HTMLElement;},id:p.id+(index===0?'-lower-thumb':'-upper-thumb'),role:'slider',tabindex:fieldDisabled(p)||!valid()?-1:0,class:'sol-ui-range-thumb',style:{left:pct(v[index])+'%'},'aria-labelledby':p.id+'-label '+p.id+(index===0?'-lower':'-upper'),'aria-valuemin':index===0?p.min:v[0],'aria-valuemax':index===0?v[1]:top(),'aria-valuenow':v[index],'aria-valuetext':display(v[index]),'aria-disabled':fieldDisabled(p)||!valid()?'true':undefined,'aria-readonly':fieldReadonly(p)?'true':undefined,'aria-invalid':fieldError(p)?'true':undefined,'aria-describedby':fieldDescription(p,slots,fieldError(p),p.id+'-keys'),onKeydown:(e:KeyboardEvent)=>key(e,index),onPointerdown:(e:PointerEvent)=>{if(drag||e.button!==0||fieldDisabled(p)||fieldReadonly(p)||!valid())return;e.preventDefault();handles[index]?.focus();drag={id:e.pointerId,index,start:v,last:v,target:e.currentTarget as HTMLElement};drag.target.setPointerCapture?.(e.pointerId);},onPointermove:(e:PointerEvent)=>{if(drag?.id===e.pointerId)adjust(index,at(e.clientX),false);},onPointerup:end,onPointercancel:end,onLostpointercapture:()=>end()}))]),h('p',{id:p.id+'-keys',class:'sol-hint'},l.value.rangeKeys),...fieldMessages(p,slots,fieldError(p)||(!valid()?l.value.invalidNumber:''))]);};
}});
