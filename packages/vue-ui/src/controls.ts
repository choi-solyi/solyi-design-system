import {defineComponent,h,ref,watch,nextTick,onMounted,mergeProps} from 'vue';
import {SChip} from './primitives';
import {formatFieldDisplay} from './display-format';
import type {PropType,Slots,SlotsType,VNode} from 'vue';
import {inputControlProps,useInputControl,preserveInputFocus} from './input-control';
import type {SolInputClearEvent,SolInputControlSlots} from './input-control';
import {useSolLocale,formatSolNumber,parseSolNumber} from './locale';
import type {SolLocale} from './locale';
import {validationProps,useSFieldValidation,fieldError,fieldDisabled,fieldReadonly} from './form';
import { addNumberStep, isNumberStepAligned } from './number-step'
import { groupNumberInput } from './number-draft'

export interface SolOption {value:string;label:string;description?:string;disabled?:boolean}
export interface SolNumberPreset {value:number;label?:string;disabled?:boolean}
export type SolNumberDisplayFormatter=(value:number,locale:Readonly<SolLocale>)=>string;
export interface SolNumberInputHandle {focus():void;validate():boolean;resetValidation():void;clear():void}
export interface SolNumberPresetScope {
  readonly presets: readonly SolNumberPreset[]
  readonly value: number | null
  readonly disabled: boolean
  readonly readonly: boolean
  setValue(value:number):boolean
  isAllowed(value:number):boolean
}
export interface SolNumberInputSlots extends SolInputControlSlots {
  presets?: (scope:SolNumberPresetScope)=>VNode[]
}
export const displayFieldProps = {
  id: {type: String, required: true as const},
  label: {type: String, required: true as const},
  help: {type: String, default: ''},
  error: {type: String, default: ''},
  disabled: Boolean,
  readonly: Boolean,
  locale: Object as PropType<Partial<SolLocale>>,
}
export const commonFieldProps = {...validationProps, ...displayFieldProps, required: Boolean}
type Field = {
  id: string
  label: string
  help: string
  error: string
  disabled: boolean
  readonly: boolean
  required?: boolean
}
export function fieldDescription(p:Field,slots:Slots,error=fieldError(p),external?:unknown){return [p.help||slots.help?p.id+'-help':'',error?p.id+'-error':'',external].filter(Boolean).join(' ')||undefined;}
export function fieldMessages(p:Field,slots:Slots,error=fieldError(p)){return [p.help||slots.help?h('div',{id:p.id+'-help',class:'sol-hint'},slots.help?.()||p.help):null,error?h('p',{id:p.id+'-error',class:'sol-error',role:'alert'},error):null];}
export function fieldLabel(p:Field,slots:Slots,required:string){return h('label',{id:p.id+'-label',for:p.id,class:'sol-label'},[slots.label?.()||p.label,p.required?` (${required})`:'']);}
const stopReadonly=(p:Field,e:Event)=>{if(fieldReadonly(p))e.preventDefault();};
const readonlyKeys=(p:Field,e:KeyboardEvent)=>{if(fieldReadonly(p)&&!['Tab','Escape','Shift','Control','Alt','Meta'].includes(e.key))e.preventDefault();};

export const SCheckbox=/* @__PURE__ */ defineComponent({name:'SCheckbox',inheritAttrs:false,props:{...commonFieldProps,modelValue:Boolean},emits:{'update:modelValue':(_v:boolean)=>true,change:(_v:boolean)=>true,blur:(_e:FocusEvent)=>true},setup(p,{attrs,slots,emit,expose}){
 const l=useSolLocale(()=>p.locale),input=ref<HTMLElement|null>(null);const validation=useSFieldValidation(p,()=>p.modelValue,{focus:()=>input.value?.focus()});expose(validation);return()=>h('div',{class:['sol-ui-native-field',attrs.class]},[h('label',{class:'sol-choice',for:p.id},[h('input',{...attrs,ref:input,class:'sol-ui-choice-input',id:p.id,type:'checkbox',checked:p.modelValue,disabled:fieldDisabled(p),required:p.required,'aria-readonly':fieldReadonly(p)?'true':undefined,'aria-invalid':fieldError(p)?'true':undefined,'aria-describedby':fieldDescription(p,slots,fieldError(p),attrs['aria-describedby']),onClick:(e:MouseEvent)=>stopReadonly(p,e),onChange:(e:Event)=>{const input=e.target as HTMLInputElement;if(fieldReadonly(p)||fieldDisabled(p)){input.checked=p.modelValue;return;}emit('update:modelValue',input.checked);emit('change',input.checked);},onBlur:(e:FocusEvent)=>{validation.validate();emit('blur',e);}}),h('span',slots.label?.()||p.label),p.required?h('span',{class:'sol-hint'},` (${l.value.required})`):null]),...fieldMessages(p,slots)]);
}});
export const SRadioGroup=/* @__PURE__ */ defineComponent({name:'SRadioGroup',inheritAttrs:false,props:{...commonFieldProps,modelValue:{type:String as PropType<string|null>,default:null},options:{type:Array as PropType<readonly SolOption[]>,required:true},layout:{type:String as PropType<'list'|'cards'>,default:'list'},name:String},emits:{'update:modelValue':(_v:string)=>true,change:(_v:string)=>true},setup(p,{attrs,slots,emit,expose}){
 const l=useSolLocale(()=>p.locale),inputs=new Map<string,HTMLElement>();const validation=useSFieldValidation(p,()=>p.modelValue,{focus:()=>{const option=p.options.find(o=>!o.disabled&&o.value===p.modelValue)||p.options.find(o=>!o.disabled);if(option)inputs.get(option.value)?.focus();}});expose(validation);return()=>h('fieldset',{...attrs,id:p.id,disabled:fieldDisabled(p),class:['sol-ui-native-field sol-choice-fieldset',attrs.class],'aria-describedby':fieldDescription(p,slots,fieldError(p),attrs['aria-describedby']),'aria-invalid':fieldError(p)?'true':undefined},[h('legend',{id:p.id+'-label',class:'sol-label'},[slots.label?.()||p.label,p.required?` (${l.value.required})`:'']),...p.options.map((o,i)=>h('label',{class:['sol-choice',p.layout==='cards'?'sol-ui-radio-card':undefined],for:p.id+'-'+i},[h('input',{id:p.id+'-'+i,type:'radio',ref:(el:unknown)=>{if(el)inputs.set(o.value,el as HTMLElement);else inputs.delete(o.value);},name:p.name||p.id,value:o.value,checked:p.modelValue===o.value,disabled:fieldDisabled(p)||o.disabled,required:p.required,'aria-disabled':fieldReadonly(p)?'true':undefined,onClick:(e:MouseEvent)=>stopReadonly(p,e),onKeydown:(e:KeyboardEvent)=>readonlyKeys(p,e),onChange:(e:Event)=>{if(fieldDisabled(p)||fieldReadonly(p)){(e.target as HTMLInputElement).checked=p.modelValue===o.value;return;}emit('update:modelValue',o.value);emit('change',o.value);}}),h('span',[h('span',o.label),o.description?h('span',{class:'sol-hint sol-ui-option-description'},o.description):null])])),...fieldMessages(p,slots)]);
}});
export const SSwitch=/* @__PURE__ */ defineComponent({name:'SSwitch',inheritAttrs:false,props:{...commonFieldProps,modelValue:Boolean,hideLabel:Boolean},emits:{'update:modelValue':(_v:boolean)=>true,change:(_v:boolean)=>true},setup(p,{attrs,slots,emit,expose}){const l=useSolLocale(()=>p.locale),input=ref<HTMLElement|null>(null);const validation=useSFieldValidation(p,()=>p.modelValue,{focus:()=>input.value?.focus()});expose(validation);return()=>h('div',{class:'sol-ui-native-field'},[h('label',{class:'sol-choice',for:p.id},[h('input',{...attrs,ref:input,id:p.id,type:'checkbox',role:'switch',class:['sol-ui-switch-input',attrs.class],checked:p.modelValue,disabled:fieldDisabled(p),required:p.required,'aria-checked':String(p.modelValue),'aria-readonly':fieldReadonly(p)?'true':undefined,'aria-describedby':fieldDescription(p,slots,fieldError(p),attrs['aria-describedby']),'aria-invalid':fieldError(p)?'true':undefined,onClick:(e:MouseEvent)=>stopReadonly(p,e),onChange:(e:Event)=>{const input=e.target as HTMLInputElement;if(fieldDisabled(p)||fieldReadonly(p)){input.checked=p.modelValue;return;}emit('update:modelValue',input.checked);emit('change',input.checked);}}),h('span',{class:p.hideLabel?'sol-ui-sr-only':undefined},[slots.label?.()||p.label,p.required?' ('+l.value.required+')':''])]),...fieldMessages(p,slots)]);}});
export const SSelect = /* @__PURE__ */ defineComponent({
  name: 'SSelect', inheritAttrs: false,
  props: {
    ...commonFieldProps, ...inputControlProps,
    modelValue: {type:String as PropType<string|null>,default:null},
    options: {type:Array as PropType<readonly SolOption[]>,required:true}, placeholder:String,
  },
  slots: Object as SlotsType<SolInputControlSlots>,
  emits: {
    'update:modelValue': (_value:string|null)=>true,
    change: (_value:string|null)=>true, blur: (_event:FocusEvent)=>true,
    clear: (_event:SolInputClearEvent<string|null>)=>true,
  },
  setup(p,{attrs,slots,emit,expose}) {
    const l=useSolLocale(()=>p.locale),input=ref<HTMLSelectElement|null>(null)
    const validation=useSFieldValidation(p,()=>p.modelValue,{focus:()=>input.value?.focus()})
    const control=useInputControl(p,slots,{
      locale:()=>l.value,hasValue:()=>p.modelValue!==null&&p.modelValue!=='',
      disabled:()=>fieldDisabled(p),readonly:()=>fieldReadonly(p),error:()=>fieldError(p),
      clear:()=>{
        if(p.modelValue!==null){emit('update:modelValue',null);emit('change',null)}
        emit('clear',{value:null,reason:'clear'})
      },
      validate:validation.validate,focus:validation.focus,element:()=>input.value,
    })
    expose({...validation,clear:control.clear})
    return()=>h('div',{class:'sol-field sol-ui-native-field'},[
      fieldLabel(p,slots,l.value.required),
      control.native(h('select',{
        ...attrs,ref:input,id:p.id,value:p.modelValue??'',class:['sol-select',attrs.class],
        disabled:fieldDisabled(p),required:p.required,
        'aria-readonly':fieldReadonly(p)?'true':undefined,'aria-invalid':fieldError(p)?'true':undefined,
        'aria-describedby':fieldDescription(p,slots,fieldError(p),attrs['aria-describedby']),
        onPointerdown:(event:PointerEvent)=>stopReadonly(p,event),
        onKeydown:(event:KeyboardEvent)=>readonlyKeys(p,event),
        onChange:(event:Event)=>{
          const target=event.target as HTMLSelectElement
          if(fieldDisabled(p)||fieldReadonly(p)){target.value=p.modelValue??'';return}
          const value=target.value||null;emit('update:modelValue',value);emit('change',value)
        },
        onBlur:(event:FocusEvent)=>{validation.validate();emit('blur',event)},
      },[
        h('option',{value:'',disabled:p.required},p.placeholder??l.value.choose),
        ...p.options.map(option=>h('option',{value:option.value,disabled:option.disabled},option.label)),
      ]),{select:true}),
      ...fieldMessages(p,slots),
    ])
  },
})
export const STextarea = /* @__PURE__ */ defineComponent({
  name: 'STextarea',
  inheritAttrs: false,
  props: {
    ...commonFieldProps,
    ...inputControlProps,
    modelValue: { type: String, default: '' },
    rows: { type: Number, default: 3 },
    maxlength: Number,
    showCount: { type: Boolean, default: true },
  },
  slots: Object as SlotsType<SolInputControlSlots>,
  emits: {
    'update:modelValue': (_value: string) => true,
    change: (_value: string) => true,
    blur: (_event: FocusEvent) => true,
    clear: (_event: SolInputClearEvent<string>) => true,
  },
  setup(p, { attrs, slots, emit, expose }) {
    const l = useSolLocale(() => p.locale),
      input = ref<HTMLElement | null>(null)
    const validation = useSFieldValidation(p, () => p.modelValue, {
      focus: () => input.value?.focus(),
    })
    const control = useInputControl(p, slots, {
      locale: () => l.value,
      hasValue: () => p.modelValue.length > 0,
      disabled: () => fieldDisabled(p),
      readonly: () => fieldReadonly(p),
      error: () => fieldError(p),
      clear: () => {
        if (p.modelValue !== '') {
          emit('update:modelValue', '')
          emit('change', '')
        }
        emit('clear', { value: '', reason: 'clear' })
      },
      validate: validation.validate,
      focus: validation.focus,
      element: () => input.value,
    })
    expose({ ...validation, clear: control.clear })
    return () =>
      h('div', { class: 'sol-field sol-ui-native-field' }, [
        fieldLabel(p, slots, l.value.required),
        control.native(
          h('textarea', {
            ...attrs,
            ref: input,
            id: p.id,
            class: ['sol-input sol-textarea', attrs.class],
            value: p.modelValue,
            rows: Math.max(3, p.rows),
            maxlength: p.maxlength,
            disabled: fieldDisabled(p),
            readonly: fieldReadonly(p),
            required: p.required,
            'aria-invalid': fieldError(p) ? 'true' : undefined,
            'aria-describedby': fieldDescription(
              p,
              slots,
              fieldError(p),
              attrs['aria-describedby'],
            ),
            onInput: (event: Event) => {
              if (!fieldDisabled(p) && !fieldReadonly(p))
                emit('update:modelValue', (event.target as HTMLTextAreaElement).value)
            },
            onChange: (event: Event) => {
              if (!fieldDisabled(p) && !fieldReadonly(p))
                emit('change', (event.target as HTMLTextAreaElement).value)
            },
            onBlur: (event: FocusEvent) => {
              validation.validate()
              emit('blur', event)
            },
          }),
          { multiline: true },
        ),
        h('div', { class: 'sol-ui-field-footer' }, [
          h('div', fieldMessages(p, slots)),
          p.showCount
            ? h(
                'span',
                { class: 'sol-hint sol-ui-counter' },
                l.value.count(p.modelValue.length, p.maxlength),
              )
            : null,
        ]),
      ])
  },
})

export const SNumberInput = /* @__PURE__ */ defineComponent({
  name: 'SNumberInput',
  inheritAttrs: false,
  props: {
    ...commonFieldProps,
    ...inputControlProps,
    modelValue: { type: Number as PropType<number | null>, default: null },
    min: Number,
    max: Number,
    step: { type: Number, default: 1 },
    presets: { type: Array as PropType<readonly SolNumberPreset[]>, default: () => [] },
    formatValue: Function as PropType<SolNumberDisplayFormatter>,
    useGrouping: { type: Boolean, default: true },
    unit: { type: String, default: '' },
  },
  slots: Object as SlotsType<SolNumberInputSlots>,
  emits: {
    'update:modelValue': (_value: number | null) => true,
    change: (_value: number | null) => true,
    invalid: (_message: string) => true,
    blur: (_event: FocusEvent) => true,
    clear: (_event: SolInputClearEvent<number|null>) => true,
  },
  setup(p, { attrs, slots, emit, expose }) {
    const l = useSolLocale(() => p.locale)
    const numberText = (value: number) => formatSolNumber(value, l.value, { useGrouping: p.useGrouping })
    const draft = ref(p.modelValue === null ? '' : numberText(p.modelValue))
    const localError = ref(''), focused = ref(false), input = ref<HTMLInputElement | null>(null)
    const numeric = () => draft.value.trim() === '' ? null : parseSolNumber(draft.value, l.value) ?? NaN
    function numberMessage(value: number | null) {
      if (value === null) return p.required ? l.value.invalidNumber : ''
      if (!Number.isFinite(value) || !Number.isFinite(p.step) || p.step <= 0 ||
        (p.min !== undefined && p.max !== undefined && p.min > p.max)) return l.value.invalidNumber
      if ((p.min !== undefined && value < p.min) || (p.max !== undefined && value > p.max)) return l.value.numberRange
      return isNumberStepAligned(value, p.min ?? 0, p.step) ? '' : l.value.numberStep
    }
    const message = () => numberMessage(numeric())
    function syncValidity() { input.value?.setCustomValidity(fieldError(p) || message()) }
    function commit() {
      if (fieldReadonly(p) || fieldDisabled(p)) return !fieldError(p) && !message()
      const error = message()
      localError.value = error
      if (error) { emit('invalid', error); syncValidity(); return false }
      const value = numeric()
      draft.value = value === null ? '' : numberText(value)
      if (value !== p.modelValue) { emit('update:modelValue', value); emit('change', value) }
      return !p.error && !p.serverError && !p.errorMessages.length
    }
    function nudgeValue(direction: number): number | null {
      if (!Number.isFinite(p.step) || p.step <= 0) return null
      const base = p.modelValue ?? p.min ?? 0
      const next = p.modelValue === null ? base : addNumberStep(base, direction * p.step)
      return next === null || !Number.isFinite(next) ||
        (p.min !== undefined && next < p.min) || (p.max !== undefined && next > p.max) ? null : next
    }
    function nudge(direction: number) {
      if (fieldDisabled(p) || fieldReadonly(p)) return
      const next = nudgeValue(direction)
      if (next === null) return
      setNumber(next)
    }
    function setNumber(value: number) {
      const element = input.value
      const selection = element && document.activeElement === element
        ? [element.selectionStart ?? 0, element.selectionEnd ?? 0, element.selectionDirection ?? undefined] as const : null
      draft.value = numberText(value)
      commit()
      if (selection) void nextTick(() => element?.setSelectionRange(...selection))
    }
    const isAllowed = (value: number) => Number.isFinite(value) &&
      (p.min === undefined || Number.isFinite(p.min)) &&
      (p.max === undefined || Number.isFinite(p.max)) && !numberMessage(value)
    function setPreset(value: number): boolean {
      if (fieldDisabled(p) || fieldReadonly(p) || !isAllowed(value)) return false
      setNumber(value)
      return true
    }
    const formatted = (value: number) => formatFieldDisplay(value, formatSolNumber(value, l.value), p.formatValue, l.value)
    function displayValue() {
      const value = numeric()
      return !p.formatValue || focused.value || value === null || message() ? draft.value : formatted(value)
    }
    function beginEdit() {
      focused.value = !fieldReadonly(p) && !fieldDisabled(p)
      if (focused.value && p.formatValue && input.value) input.value.value = draft.value
    }
    const preserveEdit = (event: PointerEvent) => {
      preserveInputFocus(event, input.value)
    }
    let pasted: string | undefined
    function edit(event: Event) {
      if (fieldReadonly(p) || fieldDisabled(p)) return
      const target = event.target as HTMLInputElement
      const type = (event as InputEvent).inputType, data = (event as InputEvent).data ?? (type === 'insertFromPaste' ? pasted : undefined)
      const regroup = /^(insertText|deleteContentBackward|deleteContentForward|deleteByCut|insertFromPaste)$/.test(type) && (type !== 'insertFromPaste' || data !== undefined) && !data?.includes(',') && parseSolNumber(draft.value, l.value) !== null
      pasted = undefined
      draft.value = p.useGrouping && !(event as InputEvent).isComposing ? groupNumberInput(target, regroup) : target.value
      if (localError.value) localError.value = message()
    }
    const validation = useSFieldValidation(p, numeric, {
      focus: () => input.value?.focus(), validateIntrinsic: commit,
      intrinsicError: () => localError.value, resetIntrinsic: () => { localError.value = '' },
    })
    const control=useInputControl(p,slots,{
      locale:()=>l.value,hasValue:()=>p.modelValue!==null||draft.value.length>0,
      disabled:()=>fieldDisabled(p),readonly:()=>fieldReadonly(p),error:()=>fieldError(p)||localError.value,
      clear:()=>{
        draft.value='';localError.value=''
        if(p.modelValue!==null){emit('update:modelValue',null);emit('change',null)}
        emit('clear',{value:null,reason:'clear'})
      },
      reconcile:()=>{draft.value=p.modelValue===null?'':numberText(p.modelValue);localError.value=''},
      validate:validation.validate,focus:validation.focus,element:()=>input.value,
    })
    watch(() => p.modelValue, value => {
      draft.value = value === null ? '' : numberText(value)
      localError.value = ''
    })
    watch(() => p.useGrouping, () => {
      const value = numeric()
      if (!message()) draft.value = value === null ? '' : numberText(value)
    })
    watch(() => [draft.value, fieldError(p), p.required, p.min, p.max, p.step], () => nextTick(syncValidity))
    watch(() => [fieldDisabled(p), fieldReadonly(p)], () => {
      if (fieldDisabled(p) || fieldReadonly(p)) focused.value = false
    })
    watch(l, () => {
      if (localError.value) localError.value = message()
      if (document.activeElement !== input.value && !message()) draft.value = p.modelValue === null ? '' : numberText(p.modelValue)
      void nextTick(syncValidity)
    })
    onMounted(syncValidity)
    expose({...validation,clear:control.clear})
    return () => {
      const error = fieldError(p) || localError.value, value = numeric()
      const valueText = value !== null && !message() && (p.formatValue || p.unit)
        ? [formatted(value), p.unit].filter(Boolean).join(' ') : undefined
      return h('div', { class: 'sol-field sol-ui-native-field' }, [
        fieldLabel(p, slots, l.value.required),
        p.formatValue && attrs.name != null ? h('input', {
          type: 'hidden', name: attrs.name, form: attrs.form, disabled: fieldDisabled(p),
          value: p.modelValue === null ? '' : formatSolNumber(p.modelValue, l.value),
        }) : null,
        h('div', { class: ['sol-ui-number', p.unit ? 'sol-ui-number--unit' : undefined] }, [
          control.native(h('input', mergeProps({ onFocus: beginEdit }, {
            ...attrs, ref: input, id: p.id, type: 'text', inputmode: 'decimal',
            class: ['sol-input', attrs.class], value: displayValue(),
            name: p.formatValue ? undefined : attrs.name,
            disabled: fieldDisabled(p), readonly: fieldReadonly(p), required: p.required,
            role: 'spinbutton', 'aria-valuemin': p.min, 'aria-valuemax': p.max,
            'aria-valuenow': value !== null && Number.isFinite(value) && !message() ? value : undefined,
            'aria-valuetext': valueText, 'aria-invalid': error ? 'true' : undefined,
            'aria-describedby': fieldDescription(p, slots, error, [p.id + '-constraints', attrs['aria-describedby']].filter(Boolean).join(' ')),
            onInput: edit,
            onCompositionend: edit,
            onPaste: (event: ClipboardEvent) => { pasted = event.clipboardData?.getData('text/plain') },
            onBeforeinput: (event: InputEvent) => {
              const target = event.target as HTMLInputElement, start = target.selectionStart ?? 0
              if (!p.useGrouping || fieldReadonly(p) || fieldDisabled(p) || target.selectionEnd !== start || parseSolNumber(draft.value, l.value) === null) return
              const backward = event.inputType === 'deleteContentBackward'
              if ((backward && target.value[start - 1] === ',') ||
                (event.inputType === 'deleteContentForward' && target.value[start] === ',')) {
                event.preventDefault()
                const at = backward ? start - 2 : start
                target.setRangeText('', at, at + 2, 'start')
                edit(event)
              }
            },
            onBlur: (event: FocusEvent) => {
              if (!fieldReadonly(p) && !fieldDisabled(p)) validation.validate()
              focused.value = false
              emit('blur', event)
            },
            onInvalid: (event: Event) => { event.preventDefault(); commit(); input.value?.focus() },
            onKeydown: (event: KeyboardEvent) => {
              if (event.isComposing || fieldReadonly(p) || fieldDisabled(p)) return
              if (event.key === 'Enter') { event.preventDefault(); commit() }
              else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                event.preventDefault(); nudge(event.key === 'ArrowUp' ? 1 : -1)
              }
            },
          }))),
          p.unit ? h('span', { class: 'sol-ui-number-unit', 'aria-hidden': 'true' }, p.unit) : null,
          h('div', { class: 'sol-ui-number-stepper', role: 'group', 'aria-labelledby': p.id + '-label' }, [
            h('button', {
            type: 'button', class: 'sol-button',
            disabled: fieldDisabled(p) || fieldReadonly(p) || nudgeValue(-1) === null,
            onPointerdown: preserveEdit,
            'aria-label': p.label + ' ' + l.value.decrease, onClick: () => nudge(-1),
          }, '−'),
            h('button', {
            type: 'button', class: 'sol-button',
            disabled: fieldDisabled(p) || fieldReadonly(p) || nudgeValue(1) === null,
            onPointerdown: preserveEdit,
            'aria-label': p.label + ' ' + l.value.increase, onClick: () => nudge(1),
          }, '+'),
          ]),
        ]),
        p.presets.length || slots.presets ? h('div', {
          class: 'sol-ui-number-presets', role: 'group', 'aria-labelledby': p.id + '-label',
        }, slots.presets?.({ presets: p.presets, value: p.modelValue, setValue: setPreset, isAllowed, disabled: fieldDisabled(p), readonly: fieldReadonly(p) }) ||
          p.presets.map((preset, index) => h(SChip, {
            key: index, selectable: true, selected: p.modelValue === preset.value,
            disabled: fieldDisabled(p) || fieldReadonly(p) || !!preset.disabled || !isAllowed(preset.value),
            label: preset.label ?? [formatted(preset.value), p.unit].filter(Boolean).join(' '),
            locale: p.locale, onClick: () => setPreset(preset.value),
            onPointerdown: preserveEdit,
          }))) : null,
        h('span', { id: p.id + '-constraints', class: 'sol-hint' }, l.value.numberHelp(p.min, p.max, p.step)),
        ...fieldMessages(p, slots, error),
      ])
    }
  },
})
