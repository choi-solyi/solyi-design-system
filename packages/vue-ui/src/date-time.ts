import {useSFieldValidation,fieldError,externalFieldError,fieldDisabled,fieldReadonly} from './form';
import {defineComponent,h,ref,watch,nextTick,onMounted,onBeforeUnmount,Teleport,mergeProps,computed} from 'vue';
import type {PropType,SlotsType,VNodeChild} from 'vue';
import {inputControlProps,useInputControl} from './input-control';
import type {SolInputClearEvent,SolInputControlSlots} from './input-control';
import type {SolLocale} from './locale';
import {formatFieldDisplay} from './display-format';
import {dateISO,parseDateOnly,weekday,shiftDay,shiftMonth,parseTimeOnly} from '@solyi/core/date';
import type {DateParts} from '@solyi/core/date';
import {solIconPaths} from '@solyi/core/icons';
import {SIcon} from './primitives';
import {PickerHost} from './picker-host';
import type {PickerPresentation,PickerPlacement,PickerHostHandle} from './picker-host';
import {timeChoices,nearestTime} from './time-values';
import {createTimeScrub} from './time-scrub';
import type {SolTimeInteraction,SolTimeInteractionCancel} from './time-scrub';
import {commonFieldProps,fieldDescription,fieldLabel,fieldMessages} from './controls';
import { useSolLocale, withVisibleNumberLabel } from './locale'

export type DateMode='single'|'range';
export type SolPickerPresentation=PickerPresentation;
export type SolPickerPlacement=PickerPlacement;
export type SolDateDisplayFormatter=(iso:string,locale:Readonly<SolLocale>)=>string;
export interface DateRange {start:string;end:string}
export interface SolPickerHandle {focus():void;validate():boolean;clear():void;resetValidation():void}
export type DateValue=string|DateRange|null;
export interface DateChange {mode:DateMode;value:DateValue;reason:'input'|'calendar'|'clear'|'mode'}
export type PickerCloseReason='close'|'escape'|'outside'|'select'|'disabled'|'mode';
const clone=(v:DateValue):DateValue=>v&&typeof v==='object'?{...v}:v;
const sameDateValue=(a:DateValue,b:DateValue)=>a===b||!!a&&!!b&&typeof a==='object'&&typeof b==='object'&&a.start===b.start&&a.end===b.end;
const today=():DateParts=>{const d=new Date();return {y:d.getFullYear(),m:d.getMonth()+1,d:d.getDate()};};
const format=(mode:DateMode,v:DateValue)=>v===null?'':mode==='single'&&typeof v==='string'?v:mode==='range'&&typeof v==='object'?v.start+' ~ '+v.end:'';
export function isDateValue(mode:DateMode,value:unknown):value is DateValue{return value===null||(mode==='single'?typeof value==='string'&&!!parseDateOnly(value):typeof value==='object'&&!!value&&'start' in value&&'end' in value&&typeof value.start==='string'&&typeof value.end==='string'&&!!parseDateOnly(value.start)&&!!parseDateOnly(value.end)&&value.start<=value.end);}
function utc(v:DateParts){const d=new Date(0);d.setUTCHours(0,0,0,0);d.setUTCFullYear(v.y,v.m-1,v.d);return d;}
function dateFormatter(code:string,options:Intl.DateTimeFormatOptions){try{return new Intl.DateTimeFormat(code,{...options,calendar:'gregory',timeZone:'UTC'});}catch{return new Intl.DateTimeFormat('ko-KR',{...options,calendar:'gregory',timeZone:'UTC'});}}
function calendarDayLabel(formatter: Intl.DateTimeFormat, day: DateParts): string {
  const full = formatter
    .formatToParts(utc(day))
    .map(part => (part.type === 'day' ? ` ${part.value} ` : part.value))
    .join('')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;])/g, '$1')
    .trim()
  return withVisibleNumberLabel(full, String(day.d))
}

function icon(name:'calendar'|'chevron',direction?:'previous'|'next'){return h('svg',{class:['sol-icon','sol-ui-picker-icon',direction?'sol-ui-picker-icon--'+direction:undefined],width:20,height:20,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor','stroke-width':1.6,'stroke-linecap':'round','stroke-linejoin':'round','aria-hidden':'true',focusable:'false'},h('path',{d:solIconPaths[name]}));}

const pickerHostProps = {
  pickerPresentation: String as PropType<SolPickerPresentation>,
  placement: { type: String as PropType<SolPickerPlacement>, default: 'bottom-start' },
}

export const SDatePicker = /* @__PURE__ */ defineComponent({
  name: 'SDatePicker',
  inheritAttrs: false,
  props: {
    ...commonFieldProps,
    ...inputControlProps,
    mode: { type: String as PropType<DateMode>, default: 'single' },
    modelValue: { type: [String, Object] as PropType<DateValue>, default: null },
    displayFormatter: Function as PropType<SolDateDisplayFormatter>,
    ...pickerHostProps,
  },
  slots: Object as SlotsType<SolInputControlSlots>,
  emits: {
    'update:modelValue': (_v: DateValue) => true,
    change: (_v: DateChange) => true,
    invalid: (_v: string) => true,
    open: () => true,
    close: (_why: PickerCloseReason) => true,
    clear: (_event: SolInputClearEvent<DateValue>) => true,
  },
  setup(p, { attrs, slots, emit, expose }) {
    const l = useSolLocale(() => p.locale),
      draft = ref(format(p.mode, p.modelValue)),
      focused = ref(false),
      localError = ref(''),
      opened = ref(false),
      active = ref<DateParts>(today()),
      view = ref<DateParts>(today()),
      draftStart = ref<string | null>(null),
      input = ref<HTMLInputElement | null>(null),
      dialog = ref<HTMLDialogElement | null>(null),
      host = ref<PickerHostHandle | null>(null),
      trigger = ref<HTMLButtonElement | null>(null),
      dayButtons = new Map<string, HTMLButtonElement>()
    let opener: HTMLElement | null = null,
      reason: PickerCloseReason = 'close',
      visibilityRevision = 0,
      disposed = false,
      announced = false
    const weekStart = () =>
      Number.isInteger(l.value.firstDay) && l.value.firstDay >= 0 && l.value.firstDay <= 6
        ? l.value.firstDay
        : 0
    const selected = (): DateRange | null =>
      !isDateValue(p.mode, p.modelValue) || p.modelValue === null
        ? null
        : typeof p.modelValue === 'string'
          ? { start: p.modelValue, end: p.modelValue }
          : p.modelValue
    function parse() {
      const text = draft.value.trim()
      if (!text) return { value: null as DateValue, error: p.required ? l.value.dateRequired : '' }
      if (p.mode === 'single')
        return { value: text as DateValue, error: parseDateOnly(text) ? '' : l.value.invalidDate }
      const m = /^(\d{4}-\d{2}-\d{2})\s*~\s*(\d{4}-\d{2}-\d{2})$/.exec(text)
      return m && parseDateOnly(m[1]) && parseDateOnly(m[2]) && m[1] <= m[2]
        ? { value: { start: m[1], end: m[2] } as DateValue, error: '' }
        : { value: null as DateValue, error: l.value.invalidRange }
    }
    function displayValue() {
      const result = parse()
      if (!p.displayFormatter || focused.value || result.error || result.value === null)
        return draft.value
      const display = (iso: string) => formatFieldDisplay(iso, iso, p.displayFormatter, l.value)
      return typeof result.value === 'string'
        ? display(result.value)
        : display(result.value.start) + ' ~ ' + display(result.value.end)
    }
    function beginEdit() {
      focused.value = !fieldReadonly(p) && !fieldDisabled(p)
      if (focused.value && p.displayFormatter && input.value) input.value.value = draft.value
    }
    function validity() {
      input.value?.setCustomValidity(
        fieldError(p) ||
          parse().error ||
          (!isDateValue(p.mode, p.modelValue) ? l.value.invalidDate : ''),
      )
    }
    function commit(value: DateValue, why: DateChange['reason']) {
      if (fieldDisabled(p) || fieldReadonly(p)) return
      const modeAtCommit = p.mode
      draft.value = format(p.mode, value)
      localError.value = ''
      if (!sameDateValue(value, p.modelValue)) {
        emit('update:modelValue', clone(value))
        emit('change', { mode: p.mode, value: clone(value), reason: why })
      }
      void nextTick(() => {
        if (!disposed && p.mode === modeAtCommit && !sameDateValue(value, p.modelValue)) {
          // A controlled parent may reject the proposal; do not submit stale display text.
          draft.value = format(p.mode, p.modelValue)
          localError.value = ''
        }
        validity()
      })
    }
    function validateIntrinsic() {
      const result = parse()
      localError.value = result.error
      if (result.error) {
        emit('invalid', result.error)
        validity()
        return false
      }
      if (!fieldDisabled(p) && !fieldReadonly(p)) commit(result.value, 'input')
      return !externalFieldError(p)
    }
    function close(why: PickerCloseReason = 'close') {
      reason = why
      opened.value = false
      draftStart.value = null
    }
    function open(from: HTMLElement | null) {
      if (fieldDisabled(p) || fieldReadonly(p)) return
      opener = from
      const parsed = parse(),
        value = parsed.error
          ? selected()?.start
          : typeof parsed.value === 'string'
            ? parsed.value
            : parsed.value?.start
      active.value = parseDateOnly(value) || today()
      view.value = active.value
      draftStart.value = null
      opened.value = true
    }
    async function focusDay() {
      await nextTick()
      if (!disposed && opened.value && (dialog.value?.open || host.value?.content()?.isConnected))
        dayButtons.get(dateISO(active.value))?.focus()
    }
    function choose(day: DateParts) {
      if (fieldDisabled(p) || fieldReadonly(p)) return
      active.value = day
      view.value = day
      const iso = dateISO(day)
      if (p.mode === 'single') {
        commit(iso, 'calendar')
        close('select')
        return
      }
      if (!draftStart.value) {
        draftStart.value = iso
        void focusDay()
        return
      }
      const [start, end] = [draftStart.value, iso].sort()
      commit({ start, end }, 'calendar')
      close('select')
    }
    function key(e: KeyboardEvent) {
      if (e.isComposing) return
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        close('escape')
        return
      }
      const target = e.target as HTMLElement
      if (!target.hasAttribute('data-calendar-day')) return
      let next: DateParts | undefined
      if (e.key === 'ArrowLeft') next = shiftDay(active.value, -1)
      else if (e.key === 'ArrowRight') next = shiftDay(active.value, 1)
      else if (e.key === 'ArrowUp') next = shiftDay(active.value, -7)
      else if (e.key === 'ArrowDown') next = shiftDay(active.value, 7)
      else if (e.key === 'Home')
        next = shiftDay(active.value, -((weekday(active.value) - weekStart() + 7) % 7))
      else if (e.key === 'End')
        next = shiftDay(active.value, 6 - ((weekday(active.value) - weekStart() + 7) % 7))
      else if (e.key === 'PageUp' || e.key === 'PageDown')
        next = shiftMonth(active.value, (e.key === 'PageUp' ? -1 : 1) * (e.shiftKey ? 12 : 1))
      else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        choose(active.value)
        return
      }
      if (next) {
        e.preventDefault()
        active.value = next
        view.value = next
        void focusDay()
      }
    }
    watch(opened, async (v, old) => {
      const revision = ++visibilityRevision
      await nextTick()
      if (disposed || revision !== visibilityRevision || v !== opened.value) return
      if (v) {
        if (p.pickerPresentation) return // The opt-in host announces after visible content is ready.
        if (!dialog.value?.open) dialog.value?.showModal()
        await focusDay()
        if (!disposed && opened.value && revision === visibilityRevision) emit('open')
      } else if (old) {
        announced = false
        if (dialog.value?.open) dialog.value.close()
        const target = opener && !(opener as HTMLButtonElement).disabled ? opener : input.value
        if (!p.pickerPresentation && target?.isConnected && !fieldDisabled(p)) target.focus()
        emit('close', reason)
      }
    })
    watch(() => p.pickerPresentation, (value, old) => {
      if (opened.value && !!value !== !!old) {
        // Crossing the legacy/opt-in ownership boundary cancels, rather than committing a draft.
        close()
        if (dialog.value?.open) dialog.value.close()
        void nextTick(() => {
          const target = opener && !(opener as HTMLButtonElement).disabled ? opener : input.value
          if (!disposed && !opened.value && target?.isConnected && !fieldDisabled(p)) target.focus()
        })
      }
    })
    watch(l, () => {
      if (localError.value) localError.value = parse().error
      void nextTick(validity)
    })
    watch(
      () => p.modelValue,
      v => {
        draft.value = format(p.mode, v)
        localError.value = ''
        draftStart.value = null
        void nextTick(validity)
      },
    )
    watch(
      () => p.mode,
      () => {
        close('mode')
        draft.value = ''
        localError.value = ''
        emit('update:modelValue', null)
        emit('change', { mode: p.mode, value: null, reason: 'mode' })
        void nextTick(validity)
      },
    )
    watch(
      () => [fieldDisabled(p), fieldReadonly(p)],
      () => {
        if (fieldDisabled(p) || fieldReadonly(p)) {
          focused.value = false
          close('disabled')
        }
      },
    )
    watch(
      () => [fieldError(p), p.required, draft.value],
      () => nextTick(validity),
    )
    onMounted(validity)
    onBeforeUnmount(() => {
      disposed = true
      visibilityRevision++
      if (dialog.value?.open) {
        dialog.value.close()
        if (opener?.isConnected) opener.focus()
      }
    })
    const validation = useSFieldValidation(p, () => parse().value, {
        focus: () => input.value?.focus(),
        validateIntrinsic,
        intrinsicError: () => localError.value,
        resetIntrinsic: () => {
          localError.value = ''
        },
      }),
      validate = validation.validate
    function pickerButton(glyph: VNodeChild) {
      return h(
        'button',
        {
          ref: trigger,
          type: 'button',
          class: 'sol-button sol-date-open',
          disabled: fieldDisabled(p) || fieldReadonly(p),
          'aria-label': p.label + ' ' + l.value.calendar,
          'aria-haspopup': 'dialog',
          'aria-controls': p.id + '-calendar',
          'aria-expanded': String(opened.value),
          onClick: () => open(trigger.value),
        },
        [glyph],
      )
    }
    const control = useInputControl(p, slots, {
      locale: () => l.value,
      hasValue: () => p.modelValue !== null || draft.value.length > 0 || draftStart.value !== null,
      disabled: () => fieldDisabled(p),
      readonly: () => fieldReadonly(p),
      error: () => fieldError(p) || localError.value,
      clear: () => {
        opener = input.value
        commit(null, 'clear')
        close('select')
        emit('clear', { value: null, reason: 'clear' })
      },
      reconcile: () => {
        draft.value = format(p.mode, p.modelValue)
        localError.value = ''
        draftStart.value = null
      },
      validate: validation.validate,
      focus: validation.focus,
      element: () => input.value,
      icon: 'calendar',
      trigger: pickerButton,
    })
    function clear() {
      if (control.enhanced()) {
        control.clear()
        return
      }
      if (fieldDisabled(p) || fieldReadonly(p)) return
      commit(null, 'clear')
      emit('clear', { value: null, reason: 'clear' })
    }
    expose({ ...validation, clear })
    function renderCalendar(legacyProps: Record<string, unknown>, children: VNodeChild[]) {
      if (!p.pickerPresentation) return h('dialog', legacyProps, children)
      return h(PickerHost, {
        ref: host,
        open: opened.value,
        id: p.id + '-calendar',
        labelledby: p.id + '-title',
        describedby: p.id + '-keys',
        anchor: input.value?.closest<HTMLElement>('.sol-ui-input-frame,.sol-date-field') || input.value,
        returnFocus: opener,
        presentation: p.pickerPresentation,
        placement: p.placement,
        width: '384px',
        panelClass: 'sol-ui-calendar',
        initialFocus: () => dayButtons.get(dateISO(active.value)),
        onRequestClose: close,
        onReady: () => {
          if (!disposed && opened.value && !announced) {
            announced = true
            emit('open')
          }
        },
      }, () => h('div', {class:'sol-ui-calendar-content',onKeydown:key}, children))
    }
    return () => {
      const range = draftStart.value
          ? { start: draftStart.value, end: draftStart.value }
          : selected(),
        candidate = dateISO(active.value),
        preview = draftStart.value ? [draftStart.value, candidate].sort() : null,
        error =
          fieldError(p) ||
          localError.value ||
          (!isDateValue(p.mode, p.modelValue) ? l.value.invalidDate : '')
      const first = { ...view.value, d: 1 },
        firstISO = dateISO(first),
        cells = Array.from({ length: 42 }, (_, i) => {
          const offset = i - ((weekday(first) - weekStart() + 7) % 7),
            day = shiftDay(first, offset)
          return dateISO(shiftDay(day, -offset)) === firstISO ? day : null
        })
      const long = dateFormatter(l.value.code, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long',
        }),
        short = dateFormatter(l.value.code, { weekday: 'short' }),
        month = dateFormatter(l.value.code, { year: 'numeric', month: 'long' }),
        todayISO = dateISO(today())
      const entry = h(
        'input',
        mergeProps(
          { onFocus: beginEdit },
          {
            ...attrs,
            ref: input,
            name: p.displayFormatter ? undefined : attrs.name,
            id: p.id,
            type: 'text',
            class: ['sol-input', attrs.class],
            value: displayValue(),
            disabled: fieldDisabled(p),
            readonly: fieldReadonly(p),
            required: p.required,
            maxlength: p.mode === 'single' ? 10 : 25,
            autocomplete: 'off',
            spellcheck: false,
            placeholder: p.mode === 'single' ? 'YYYY-MM-DD' : 'YYYY-MM-DD ~ YYYY-MM-DD',
            'aria-haspopup': 'dialog',
            'aria-controls': p.id + '-calendar',
            ...(p.pickerPresentation ? {'aria-expanded': String(opened.value)} : {}),
            'aria-invalid': error ? 'true' : undefined,
            'aria-describedby': fieldDescription(
              p,
              slots,
              error,
              [p.id + '-format', attrs['aria-describedby']].filter(Boolean).join(' '),
            ),
            onInput: (e: Event) => {
              if (fieldDisabled(p) || fieldReadonly(p)) return
              draft.value = (e.target as HTMLInputElement).value
              if (localError.value) localError.value = parse().error
            },
            onBlur: () => {
              if (!fieldDisabled(p) && !fieldReadonly(p)) validate()
              focused.value = false
            },
            onInvalid: (e: Event) => {
              e.preventDefault()
              validate()
              input.value?.focus()
            },
            onKeydown: (e: KeyboardEvent) => {
              if (e.isComposing) return
              if (e.key === 'ArrowDown' && e.altKey) {
                e.preventDefault()
                open(input.value)
              } else if (e.key === 'Enter') {
                e.preventDefault()
                validate()
              }
            },
          },
        ),
      )
      return h('div', { class: 'sol-field sol-ui-native-field sol-ui-date' }, [
        fieldLabel(p, slots, l.value.required),
        p.displayFormatter && attrs.name != null
          ? h('input', {
              type: 'hidden',
              name: attrs.name,
              form: attrs.form,
              value: format(p.mode, p.modelValue),
              disabled: fieldDisabled(p),
            })
          : null,
        control.enhanced()
          ? control.native(entry)
          : h('div', { class: 'sol-date-field' }, [entry, pickerButton(icon('calendar'))]),
        h(
          'span',
          { id: p.id + '-format', class: 'sol-hint' },
          p.mode === 'single' ? 'YYYY-MM-DD' : 'YYYY-MM-DD ~ YYYY-MM-DD',
        ),
        ...fieldMessages(p, slots, error),
        !p.clearable
          ? h(
              'button',
              {
                type: 'button',
                class: 'sol-button inline-action sol-ui-picker-clear',
                disabled: fieldDisabled(p) || fieldReadonly(p),
                onClick: () => {
                  clear()
                  input.value?.focus()
                },
              },
              l.value.clear,
            )
          : null,
        renderCalendar(
          {
            ref: dialog,
            id: p.id + '-calendar',
            class: 'sol-calendar-dialog sol-ui-calendar',
            'aria-labelledby': p.id + '-title',
            'aria-describedby': p.id + '-keys',
            onKeydown: key,
            onCancel: (e: Event) => {
              e.preventDefault()
              close('escape')
            },
            onClose: () => {
              if (opened.value) close()
            },
            onClick: (e: MouseEvent) => {
              const el = dialog.value
              if (!el || e.target !== el) return
              const r = el.getBoundingClientRect()
              if (
                e.clientX < r.left ||
                e.clientX > r.right ||
                e.clientY < r.top ||
                e.clientY > r.bottom
              )
                close('outside')
            },
          },
          [
            h('div', { class: 'sol-calendar-top' }, [
              h(
                'strong',
                { id: p.id + '-title' },
                p.mode === 'single' ? l.value.singleDate : l.value.dateRange,
              ),
              h(
                'button',
                { type: 'button', class: 'sol-button inline-action', onClick: () => close() },
                l.value.close,
              ),
            ]),
            h(
              'p',
              { class: 'sol-hint sol-calendar-status', role: 'status', 'aria-live': 'polite' },
              p.mode === 'range'
                ? draftStart.value
                  ? l.value.chooseEnd
                  : l.value.chooseStart
                : l.value.singleDate,
            ),
            h('div', { class: 'sol-calendar-heading' }, [
              h(
                'button',
                {
                  type: 'button',
                  class: 'sol-button subtle',
                  'aria-label': l.value.previousMonth,
                  onClick: () => {
                    active.value = shiftMonth(view.value, -1)
                    view.value = active.value
                  },
                },
                icon('chevron', 'previous'),
              ),
              h(
                'p',
                { id: p.id + '-month', class: 'sol-ui-calendar-month', 'aria-live': 'polite' },
                month.format(utc(view.value)),
              ),
              h(
                'button',
                {
                  type: 'button',
                  class: 'sol-button subtle',
                  'aria-label': l.value.nextMonth,
                  onClick: () => {
                    active.value = shiftMonth(view.value, 1)
                    view.value = active.value
                  },
                },
                icon('chevron', 'next'),
              ),
            ]),
            h(
              'table',
              { class: 'sol-calendar-grid', role: 'grid', 'aria-labelledby': p.id + '-month' },
              [
                h(
                  'thead',
                  h(
                    'tr',
                    Array.from({ length: 7 }, (_, i) =>
                      h(
                        'th',
                        { scope: 'col' },
                        short.format(utc(shiftDay({ y: 2026, m: 10, d: 18 }, i + weekStart()))),
                      ),
                    ),
                  ),
                ),
                h(
                  'tbody',
                  Array.from({ length: 6 }, (_, row) =>
                    h(
                      'tr',
                      cells.slice(row * 7, row * 7 + 7).map(day => {
                        if (!day) return h('td', { role: 'gridcell' })
                        const iso = dateISO(day),
                          inside = !!range && range.start <= iso && iso <= range.end,
                          endpoint = !!range && (iso === range.start || iso === range.end),
                          label = [
                            calendarDayLabel(long, day),
                            p.mode === 'single' && inside
                              ? l.value.selected
                              : range?.start === iso
                                ? l.value.start
                                : '',
                            p.mode === 'range' && !draftStart.value && range?.end === iso
                              ? l.value.end
                              : '',
                          ]
                            .filter(Boolean)
                            .join(', ')
                        return h(
                          'td',
                          { role: 'gridcell', 'aria-selected': String(inside) },
                          h(
                            'button',
                            {
                              ref: (el: unknown) => {
                                if (el) dayButtons.set(iso, el as HTMLButtonElement)
                                else dayButtons.delete(iso)
                              },
                              type: 'button',
                              class: 'sol-calendar-day',
                              'data-calendar-day': iso,
                              'data-outside': String(day.m !== view.value.m),
                              'data-range': String(inside),
                              'data-endpoint': String(endpoint),
                              'data-preview': String(
                                !!preview && preview[0] <= iso && iso <= preview[1],
                              ),
                              'aria-label': label,
                              'aria-current': iso === todayISO ? 'date' : undefined,
                              tabindex: iso === candidate ? 0 : -1,
                              onClick: () => choose(day),
                              onFocus: () => {
                                active.value = day
                              },
                            },
                            [
                              day.d,
                              iso === todayISO
                                ? h('span', { class: 'sol-calendar-dot', 'aria-hidden': 'true' })
                                : null,
                            ],
                          ),
                        )
                      }),
                    ),
                  ),
                ),
              ],
            ),
            h('div', { class: 'sol-calendar-footer' }, [
              h(
                'button',
                {
                  type: 'button',
                  class: 'sol-button inline-action',
                  onClick: () => {
                    active.value = today()
                    view.value = active.value
                    void focusDay()
                  },
                },
                l.value.today,
              ),
              h(
                'button',
                {
                  type: 'button',
                  class: 'sol-button inline-action',
                  onClick: () => {
                    clear()
                  if (!control.enhanced()) close('select')
                  },
                },
                l.value.clear,
              ),
            ]),
            h(
              'p',
              { id: p.id + '-keys', class: 'sol-hint sol-calendar-keys' },
              l.value.calendarKeys,
            ),
          ],
        ),
      ])
    }
  },
})

export type SolTimePresentation = 'native' | 'list'

export const STimePicker = /* @__PURE__ */ defineComponent({
  name: 'STimePicker',
  inheritAttrs: false,
  props: {
    ...commonFieldProps,
    ...inputControlProps,
    modelValue: { type: String as PropType<string | null>, default: null },
    min: { type: String, default: '00:00' },
    max: { type: String, default: '23:59' },
    step: { type: Number, default: 15 },
    allowManualInput: { type: Boolean, default: true },
    presentation: { type: String as PropType<SolTimePresentation>, default: 'native' },
    ...pickerHostProps,
    initialScrollValue: String,
    scrollToCurrentTime: Boolean,
    scrubbable: Boolean,
    listScrubbable: Boolean,
    scrubPixelsPerStep: Number,
  },
  slots: Object as SlotsType<SolInputControlSlots>,
  emits: {
    'update:modelValue': (_value: string | null) => true,
    change: (_value: string | null) => true,
    invalid: (_message: string) => true,
    open: () => true,
    close: (_reason: PickerCloseReason) => true,
    preview: (_value: SolTimeInteraction) => true,
    interactionCommit: (_value: SolTimeInteraction) => true,
    interactionCancel: (_value: SolTimeInteractionCancel) => true,
    clear: (_event: SolInputClearEvent<string | null>) => true,
  },
  setup(p, { attrs, slots, emit, expose }) {
    const l = useSolLocale(() => p.locale)
    const draft = ref(p.modelValue ?? ''),
      localError = ref(''),
      opened = ref(false)
    const hour = ref(''),
      minute = ref(''),
      active = ref<string | undefined>()
    const input = ref<HTMLInputElement | null>(null),
      validationInput = ref<HTMLInputElement | null>(null)
    const trigger = ref<HTMLButtonElement | null>(null),
      panel = ref<HTMLElement | null>(null)
    let keyboardOpen = true, announced = false
    const hourSelect = ref<HTMLSelectElement | null>(null),
      minuteSelect = ref<HTMLSelectElement | null>(null)
    const list = ref<HTMLElement | null>(null),
      options = new Map<string, HTMLElement>()
    const grip = ref<HTMLElement | null>(null),
      status = ref<{ kind: 'preview' | 'commit' | 'cancel'; value: string }>()
    const position = ref<Record<string, string>>({ left: '8px', top: '8px' })
    const choices = computed(() => timeChoices(p.min, p.max, p.step))
    let savedActive: string | undefined,
      autoFrame = 0,
      autoY = 0,
      autoLast = 0
    let opener: HTMLElement | null = null,
      reason: PickerCloseReason = 'close',
      disposed = false
    const bounds = () => ({
      min: parseTimeOnly(p.min)?.minutes ?? NaN,
      max: parseTimeOnly(p.max)?.minutes ?? NaN,
    })
    const allowed = (minutes: number) => {
      const b = bounds()
      return (
        Number.isFinite(b.min) &&
        Number.isFinite(b.max) &&
        b.min <= b.max &&
        Number.isInteger(p.step) &&
        p.step > 0 &&
        minutes >= b.min &&
        minutes <= b.max &&
        (minutes - b.min) % p.step === 0
      )
    }
    function parse() {
      if (!draft.value.trim()) return { value: null, error: p.required ? l.value.timeRequired : '' }
      const time = parseTimeOnly(draft.value)
      return time && allowed(time.minutes)
        ? { value: time.value, error: '' }
        : { value: null, error: l.value.invalidTime }
    }
    function syncOptions() {
      const time = parseTimeOnly(draft.value)
      hour.value =
        time &&
        Array.from({ length: 60 }, (_, n) => n).some(n =>
          allowed(Math.floor(time.minutes / 60) * 60 + n),
        )
          ? time.value.slice(0, 2)
          : ''
      minute.value = time && allowed(time.minutes) ? time.value.slice(3) : ''
    }
    function validity() {
      const error = fieldError(p) || parse().error
      input.value?.setCustomValidity(error)
      validationInput.value?.setCustomValidity(error)
    }
    function commit(value: string | null) {
      if (fieldDisabled(p) || fieldReadonly(p)) return
      draft.value = value ?? ''
      localError.value = ''
      syncOptions()
      if (value !== p.modelValue) {
        emit('update:modelValue', value)
        emit('change', value)
      }
      void nextTick(validity)
    }
    function validateIntrinsic() {
      scrub.cancel('external', false)
      const result = parse()
      localError.value = result.error
      if (result.error) {
        emit('invalid', result.error)
        validity()
        return false
      }
      if (!fieldDisabled(p) && !fieldReadonly(p)) commit(result.value)
      return !externalFieldError(p)
    }
    function locate() {
      if (p.pickerPresentation) return
      if (!opened.value || !input.value || !panel.value) return
      const enhanced = control.enhanced()
      const anchor = enhanced
        ? input.value.closest<HTMLElement>('.sol-ui-input-frame') || input.value
        : input.value
      const rect = anchor.getBoundingClientRect(),
        box = panel.value.getBoundingClientRect()
      const width = document.documentElement.clientWidth || window.innerWidth
      if (enhanced) {
        // Resolve Core panel spacing to pixels. A fixed bottom keeps an above-panel
        // attached to the field even when its content or available height changes.
        const edge = Math.max(0, parseFloat(getComputedStyle(panel.value).paddingInlineStart) || 0)
        const gap = edge / 2, height = window.innerHeight
        const below = Math.max(0, height - rect.bottom - gap - edge)
        const above = Math.max(0, rect.top - gap - edge)
        const opensBelow = box.height <= below || below >= above
        const maxWidth = Math.max(0, width - edge * 2)
        position.value = {
          left: Math.max(edge, Math.min(rect.left, width - Math.min(box.width, maxWidth) - edge)) + 'px',
          top: opensBelow ? Math.max(edge, rect.bottom + gap) + 'px' : 'auto',
          bottom: opensBelow ? 'auto' : Math.max(edge, height - rect.top + gap) + 'px',
          maxHeight: (opensBelow ? below : above) + 'px',
          maxWidth: maxWidth + 'px',
        }
        return
      }
      position.value = {
        left: Math.max(8, Math.min(rect.left, width - box.width - 8)) + 'px',
        top: Math.max(8, Math.min(rect.bottom + 6, window.innerHeight - box.height - 8)) + 'px',
      }
    }
    function anchor() {
      const selected = parseTimeOnly(p.modelValue)
      if (selected && allowed(selected.minutes)) return selected.value
      const initial = parseTimeOnly(p.initialScrollValue)
      if (initial) return nearestTime(choices.value, initial.minutes)
      if (p.scrollToCurrentTime) {
        const now = new Date()
        return nearestTime(choices.value, now.getHours() * 60 + now.getMinutes())
      }
      return choices.value[0]
    }
    function scrollActive(center = false) {
      const viewport = list.value,
        option = active.value && options.get(active.value)
      if (!viewport || !option) return
      const outer = viewport.getBoundingClientRect(),
        inner = option.getBoundingClientRect()
      if (center)
        viewport.scrollTop += inner.top - outer.top - (viewport.clientHeight - inner.height) / 2
      else if (inner.top < outer.top) viewport.scrollTop += inner.top - outer.top
      else if (inner.bottom > outer.bottom) viewport.scrollTop += inner.bottom - outer.bottom
    }
    function close(why: PickerCloseReason = 'close', restore = true) {
      scrub.cancel(
        why === 'escape'
          ? 'escape'
          : why === 'disabled'
            ? 'disabled'
            : why === 'mode'
              ? 'configuration'
              : 'close',
        false,
      )
      if (!opened.value) return
      reason = why
      opened.value = false
      if (restore && !p.pickerPresentation)
        void nextTick(() => {
          const target = opener && !(opener as HTMLButtonElement).disabled ? opener : input.value
          if (target?.isConnected && !fieldDisabled(p)) target.focus()
        })
    }
    async function open(keyboard: boolean, from: HTMLElement | null) {
      if (fieldDisabled(p) || fieldReadonly(p)) return
      opener = from
      keyboardOpen = keyboard
      const wasOpen = opened.value
      active.value = anchor()
      opened.value = true
      await nextTick()
      if (disposed || !opened.value || !input.value) return
      if (p.pickerPresentation) return // The shared host owns readiness, focus and placement.
      locate()
      if (p.presentation === 'list') {
        scrollActive(true)
        if (keyboard) list.value?.focus({ preventScroll: true })
      } else if (keyboard) hourSelect.value?.focus()
      if (!wasOpen) emit('open')
    }
    function selectNative() {
      if (fieldDisabled(p) || fieldReadonly(p) || !hour.value || !minute.value) return
      const time = parseTimeOnly(hour.value + ':' + minute.value)
      if (time && allowed(time.minutes)) commit(time.value)
      else {
        minute.value = ''
        localError.value = ''
      }
    }
    function choose(value: string | undefined) {
      if (!value || !choices.value.includes(value) || fieldDisabled(p) || fieldReadonly(p)) return
      active.value = value
      commit(value)
      close('select')
    }
    function listKey(event: KeyboardEvent) {
      if (event.isComposing || fieldDisabled(p) || fieldReadonly(p)) return
      if (scrub.active.value) return
      let index = Math.max(0, choices.value.indexOf(active.value || ''))
      if (event.key === 'ArrowDown') index++
      else if (event.key === 'ArrowUp') index--
      else if (event.key === 'Home') index = 0
      else if (event.key === 'End') index = choices.value.length - 1
      else if (event.key === 'PageDown') index += 10
      else if (event.key === 'PageUp') index -= 10
      else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        event.stopPropagation()
        choose(active.value)
        return
      } else return
      event.preventDefault()
      event.stopPropagation()
      active.value = choices.value[Math.max(0, Math.min(index, choices.value.length - 1))]
      void nextTick(() => scrollActive())
    }
    const outside = (event: Event) => {
      if (p.pickerPresentation) return
      const target = event.target as Node
      if (
        opened.value &&
        !panel.value?.contains(target) &&
        target !== input.value &&
        !trigger.value?.contains(target) &&
        !grip.value?.contains(target)
      )
        close('outside', false)
    }
    function stopAuto() {
      if (autoFrame) cancelAnimationFrame(autoFrame)
      autoFrame = 0
      autoLast = 0
    }
    function listIndex(y: number) {
      const viewport = list.value,
        first = choices.value[0] && options.get(choices.value[0])
      if (!viewport || !first) return undefined
      const box = viewport.getBoundingClientRect(),
        row = first.getBoundingClientRect()
      if (!row.height) return undefined
      const clamped = Math.max(box.top + viewport.clientTop, Math.min(y, box.bottom - 1))
      return Math.max(
        0,
        Math.min(choices.value.length - 1, Math.floor((clamped - row.top) / row.height)),
      )
    }
    function autoScroll(now: number) {
      autoFrame = 0
      if (!scrub.active.value || scrub.source.value !== 'list' || !list.value) return
      const viewport = list.value,
        box = viewport.getBoundingClientRect()
      const first = choices.value[0] && options.get(choices.value[0])
      const row = first ? first.getBoundingClientRect().height : 0
      if (!row) return
      const zone = Math.min(row, box.height / 3),
        pressure =
          autoY < box.top + zone
            ? -Math.min(1, (box.top + zone - autoY) / zone)
            : autoY > box.bottom - zone
              ? Math.min(1, (autoY - box.bottom + zone) / zone)
              : 0
      if (!pressure) {
        autoLast = 0
        return
      }
      const before = viewport.scrollTop
      viewport.scrollTop +=
        (pressure * row * 6 * Math.min(32, autoLast ? now - autoLast : 16)) / 1000
      autoLast = now
      const index = listIndex(autoY)
      if (index !== undefined) scrub.propose(index)
      if (scrub.active.value && viewport.scrollTop !== before)
        autoFrame = requestAnimationFrame(autoScroll)
    }
    const scrub = createTimeScrub({
      choices: () => choices.value,
      value: () => p.modelValue,
      disabled: source =>
        fieldDisabled(p) ||
        fieldReadonly(p) ||
        !(source === 'input'
          ? p.scrubbable
          : p.listScrubbable && p.presentation === 'list' && opened.value),
      pixels: () =>
        p.scrubPixelsPerStep ??
        Math.max(1, (input.value?.getBoundingClientRect().height || 40) / 4),
      start: source => {
        const previous = document.activeElement as HTMLElement | null,
          selection =
            previous === input.value
              ? [input.value?.selectionStart, input.value?.selectionEnd]
              : undefined
        savedActive = active.value
        ;(source === 'input' ? grip.value : list.value)?.focus({ preventScroll: true })
        return () => {
          if (fieldDisabled(p) || disposed) return
          const target = previous?.isConnected ? previous : input.value
          target?.focus({ preventScroll: true })
          if (target === input.value && selection)
            input.value?.setSelectionRange(selection[0] ?? null, selection[1] ?? null)
        }
      },
      preview: value => {
        if (value.source === 'list') active.value = value.value
        status.value = { kind: 'preview', value: value.value }
        emit('preview', value)
      },
      commit: value => {
        commit(value.value)
        status.value = { kind: 'commit', value: value.value }
        emit('interactionCommit', value)
        if (value.source === 'list') close('select')
      },
      cancel: value => {
        if (value.source === 'list') {
          active.value = savedActive
          void nextTick(() => scrollActive())
        }
        status.value = { kind: 'cancel', value: value.value }
        emit('interactionCancel', value)
      },
      listIndex: event => listIndex(event.clientY),
      listMove: event => {
        autoY = event.clientY
        if (!autoFrame) autoFrame = requestAnimationFrame(autoScroll)
      },
      stop: stopAuto,
    })
    const scrubBase = () => {
      const time = parseTimeOnly(draft.value)
      return time ? nearestTime(choices.value, time.minutes) : anchor()
    }
    function beginInputScrub(event: PointerEvent) {
      close('close', false)
      scrub.pointer(event, 'input', scrubBase())
    }
    watch(l, () => {
      if (localError.value) localError.value = parse().error
      void nextTick(validity)
    })
    watch(
      () => p.modelValue,
      value => {
        scrub.cancel('external')
        draft.value = value ?? ''
        localError.value = ''
        syncOptions()
        void nextTick(validity)
      },
      { flush: 'sync' },
    )
    watch(
      () => [fieldDisabled(p), fieldReadonly(p)],
      () => {
        if (fieldDisabled(p) || fieldReadonly(p)) {
          scrub.cancel('disabled', false)
          close('disabled', !fieldDisabled(p))
        }
      },
      { flush: 'sync' },
    )
    watch(
      () => [
        p.min,
        p.max,
        p.step,
        p.allowManualInput,
        p.scrubbable,
        p.listScrubbable,
        p.scrubPixelsPerStep,
        p.placement,
      ],
      () => scrub.cancel('configuration'),
      { flush: 'sync' },
    )
    watch(
      () => [p.min, p.max, p.step, fieldError(p), p.required, p.allowManualInput],
      () => {
        syncOptions()
        if (!active.value || !choices.value.includes(active.value)) active.value = anchor()
        void nextTick(() => {
          validity()
          scrollActive()
        })
      },
    )
    watch(
      () => p.presentation,
      () => close('mode'),
    )
    watch(opened, (value, old) => {
      if (!value && old) { announced = false; emit('close', reason) }
    })
    watch(() => p.pickerPresentation, (value, old) => {
      scrub.cancel('configuration', false)
      if (!!value !== !!old) close('mode')
    })
    onMounted(() => {
      syncOptions()
      validity()
      document.addEventListener('pointerdown', outside)
      document.addEventListener('focusin', outside)
      window.addEventListener('resize', locate)
      document.addEventListener('scroll', locate, true)
    })
    onBeforeUnmount(() => {
      disposed = true
      scrub.cancel('unmount', false)
      stopAuto()
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('focusin', outside)
      window.removeEventListener('resize', locate)
      document.removeEventListener('scroll', locate, true)
      if (panel.value?.contains(document.activeElement) && opener?.isConnected) opener.focus()
    })
    const validation = useSFieldValidation(p, () => parse().value, {
      focus: () => input.value?.focus(),
      validateIntrinsic,
      intrinsicError: () => localError.value,
      resetIntrinsic: () => {
        localError.value = ''
      },
    })
    const validate = validation.validate

    function renderTimePopup(node: VNodeChild) {
      if (!p.pickerPresentation) return h(Teleport, {to:'body'}, [node])
      return h(PickerHost, {
        open: opened.value, id:p.id+'-panel', labelledby:p.id+'-title',
        anchor:input.value?.closest<HTMLElement>('.sol-ui-input-frame,.sol-time-entry') || input.value,
        returnFocus:opener, presentation:p.pickerPresentation, placement:p.placement,
        width:'320px', initialFocus:()=>p.presentation==='list'?list.value:hourSelect.value,
        focusOnOpen:keyboardOpen,
        onRequestClose:(why)=>close(why, why!=='outside'),
        onReady:()=>{
          if (disposed || !opened.value) return
          if (announced) scrub.cancel('configuration', false)
          else { scrollActive(true); announced=true; emit('open') }
        },
      }, ()=>node)
    }

    function renderGrip() {
      return p.scrubbable
        ? h(
            'div',
            {
              ref: grip,
              role: 'spinbutton',
              class: 'sol-ui-time-scrub',
              tabindex: fieldDisabled(p) || fieldReadonly(p) || !choices.value.length ? -1 : 0,
              'aria-label': p.label + ' ' + l.value.timeScrub!('input'),
              'aria-disabled': String(
                fieldDisabled(p) || fieldReadonly(p) || !choices.value.length,
              ),
              'aria-valuemin': parseTimeOnly(choices.value[0])?.minutes,
              'aria-valuemax': parseTimeOnly(choices.value.at(-1))?.minutes,
              'aria-valuenow': parseTimeOnly(scrub.preview.value ?? draft.value)?.minutes,
              'aria-valuetext': (scrub.preview.value ?? draft.value) || l.value.choose,
              'aria-describedby': p.id + '-scrub-keys',
              onPointerdown: beginInputScrub,
              onKeydown: (event: KeyboardEvent) => {
                if (!scrub.active.value) close('close', false)
                scrub.keyboard(event, scrubBase())
              },
              onBlur: () => {
                if (scrub.source.value === 'input') scrub.cancel('blur', false)
              },
            },
            h(SIcon, { name: 'arrow', rotate: 270, decorative: true }),
          )
        : null
    }
    function pickerButton(glyph: VNodeChild) {
      return h(
        'button',
        {
          ref: trigger,
          type: 'button',
          class: 'sol-button',
          disabled: fieldDisabled(p) || fieldReadonly(p),
          'aria-haspopup': 'dialog',
          'aria-controls': opened.value ? p.id + '-panel' : undefined,
          'aria-expanded': String(opened.value),
          'aria-label': p.label + ' ' + l.value.time,
          onClick: () => (opened.value ? close() : void open(true, trigger.value)),
        },
        [glyph],
      )
    }
    const control = useInputControl(p, slots, {
      locale: () => l.value,
      hasValue: () => p.modelValue !== null || draft.value.length > 0,
      disabled: () => fieldDisabled(p),
      readonly: () => fieldReadonly(p),
      error: () => fieldError(p) || localError.value,
      clear: () => {
        scrub.cancel('external', false)
        close('close', false)
        commit(null)
        active.value = undefined
        status.value = undefined
        emit('clear', { value: null, reason: 'clear' })
      },
      reconcile: () => {
        draft.value = p.modelValue ?? ''
        localError.value = ''
        syncOptions()
      },
      validate: validation.validate,
      focus: validation.focus,
      element: () => input.value,
      actions: renderGrip,
      trigger: pickerButton,
    })
    function clear() {
      if (control.enhanced()) {
        control.clear()
        return
      }
      scrub.cancel('external', false)
      if (fieldDisabled(p) || fieldReadonly(p)) return
      commit(null)
      emit('clear', { value: null, reason: 'clear' })
    }
    expose({ ...validation, clear })
    const optionId = (value: string) => p.id + '-time-' + value.replace(':', '')
    return () => {
      const error = fieldError(p) || localError.value,
        pad = (value: number) => String(value).padStart(2, '0')
      const hours = Array.from({ length: 24 }, (_, n) => n).filter(hour =>
        Array.from({ length: 60 }, (_, n) => n).some(n => allowed(hour * 60 + n)),
      )
      const minutes = Array.from({ length: 60 }, (_, n) => n).filter(
        n => hour.value !== '' && allowed(Number(hour.value) * 60 + n),
      )
      const selected = parseTimeOnly(p.modelValue)?.value
      const invalid = (event: Event) => {
        event.preventDefault()
        validate()
        input.value?.focus()
      }
      const entry = h('input', {
        ...attrs,
        ref: input,
        id: p.id,
        type: 'text',
        class: ['sol-input', attrs.class],
        inputmode: 'numeric',
        maxlength: 5,
        autocomplete: 'off',
        value: draft.value,
        disabled: fieldDisabled(p),
        readonly: fieldReadonly(p) || !p.allowManualInput,
        required: p.required,
        placeholder: 'HH:mm',
        'aria-haspopup': 'dialog',
        'aria-controls': opened.value ? p.id + '-panel' : undefined,
        'aria-expanded': p.presentation === 'list' ? String(opened.value) : undefined,
        'aria-invalid': error ? 'true' : undefined,
        'aria-describedby': fieldDescription(
          p,
          slots,
          error,
          [p.id + '-format', attrs['aria-describedby']].filter(Boolean).join(' '),
        ),
        onBeforeinput: (event: Event) => {
          if (!p.allowManualInput || fieldReadonly(p) || fieldDisabled(p)) event.preventDefault()
        },
        onInput: (event: Event) => {
          scrub.cancel('external', false)
          if (fieldDisabled(p) || fieldReadonly(p) || !p.allowManualInput) {
            ;(event.target as HTMLInputElement).value = draft.value
            return
          }
          draft.value = (event.target as HTMLInputElement).value
          syncOptions()
          if (localError.value) localError.value = parse().error
          validity()
        },
        onClick: () => void open(false, input.value),
        onBlur: () => {
          if (!scrub.active.value && !fieldReadonly(p) && !fieldDisabled(p)) validate()
        },
        onInvalid: invalid,
        onKeydown: (event: KeyboardEvent) => {
          if (event.isComposing) return
          if (event.key === 'ArrowDown' && event.altKey) {
            event.preventDefault()
            void open(true, input.value)
          } else if (event.key === 'Escape') {
            event.preventDefault()
            close('escape')
          } else if (event.key === 'Enter') {
            event.preventDefault()
            validate()
          }
        },
      })
      return h('div', { class: 'sol-field sol-ui-native-field' }, [
        fieldLabel(p, slots, l.value.required),
        !p.allowManualInput && !fieldReadonly(p)
          ? h('input', {
              ref: validationInput,
              type: 'text',
              class: 'sol-ui-sr-only',
              tabindex: -1,
              'aria-hidden': 'true',
              form: attrs.form,
              value: draft.value,
              required: p.required,
              disabled: fieldDisabled(p),
              autocomplete: 'off',
              onInvalid: invalid,
            })
          : null,
        control.enhanced()
          ? control.native(entry)
          : h('div', { class: ['sol-time-entry', p.scrubbable && 'sol-ui-time-entry--scrub'] }, [
              entry,
              renderGrip(),
              pickerButton(l.value.time),
            ]),
        ,
        h(
          'span',
          { id: p.id + '-format', class: 'sol-hint' },
          l.value.timeHelp(p.min, p.max, p.step),
        ),
        p.scrubbable || p.listScrubbable
          ? h('span', { id: p.id + '-scrub-keys', class: 'sol-hint' }, l.value.timeScrubKeys)
          : null,
        p.scrubbable || p.listScrubbable
          ? h(
              'output',
              { class: 'sol-hint sol-ui-time-preview', role: 'status', 'aria-live': 'polite' },
              status.value
                ? status.value.kind === 'preview'
                  ? l.value.timePreview!(status.value.value)
                  : status.value.kind === 'commit'
                    ? l.value.done + ' ' + status.value.value
                    : l.value.timeScrubCancelled
                : '',
            )
          : null,
        ...fieldMessages(p, slots, error),
        !p.clearable
          ? h(
              'button',
              {
                type: 'button',
                class: 'sol-button inline-action sol-ui-picker-clear',
                disabled: fieldDisabled(p) || fieldReadonly(p),
                onClick: () => {
                  close('close', false)
                  clear()
                  input.value?.focus()
                },
              },
              l.value.clear,
            )
          : null,
        renderTimePopup(
          opened.value
            ? h(
                'div',
                {
                  ref: panel,
                  id: p.pickerPresentation ? undefined : p.id + '-panel',
                  class: p.pickerPresentation ? 'sol-ui-time-content' : 'sol-time-panel sol-ui-time-panel',
                  role: p.pickerPresentation ? undefined : 'dialog',
                  'aria-labelledby': p.pickerPresentation ? undefined : p.id + '-title',
                  style: p.pickerPresentation ? undefined : position.value,
                  onKeydown: (event: KeyboardEvent) => {
                    if (event.key === 'Escape' && !event.isComposing) {
                      event.preventDefault()
                      event.stopPropagation()
                      close('escape')
                    }
                  },
                },
                [
                  h('div', { class: 'sol-ui-picker-top' }, [
                    h('strong', { id: p.id + '-title' }, l.value.time),
                    h(
                      'button',
                      { type: 'button', class: 'sol-button inline-action', onClick: () => close() },
                      l.value.close,
                    ),
                  ]),
                  p.presentation === 'list'
                    ? h(
                        'div',
                        {
                          ref: list,
                          class: [
                            'sol-ui-time-list',
                            p.listScrubbable && 'sol-ui-time-list--scrub',
                          ],
                          role: 'listbox',
                          tabindex: 0,
                          'aria-label': l.value.time,
                          'aria-describedby': p.listScrubbable ? p.id + '-scrub-keys' : undefined,
                          'aria-activedescendant': active.value
                            ? optionId(active.value)
                            : undefined,
                          onKeydown: listKey,
                        },
                        choices.value.length
                          ? choices.value.map(value =>
                              h(
                                'div',
                                {
                                  key: value,
                                  ref: (element: unknown) => {
                                    if (element) options.set(value, element as HTMLElement)
                                    else options.delete(value)
                                  },
                                  id: optionId(value),
                                  role: 'option',
                                  'aria-selected': String(value === selected),
                                  class: 'sol-ui-time-option',
                                  'data-time-value': value,
                                  'data-active': value === active.value ? 'true' : undefined,
                                  onClick: () => choose(value),
                                },
                                [
                                  h('span', value),
                                  value === selected
                                    ? h(SIcon, { name: 'check', size: 16, decorative: true })
                                    : null,
                                  p.listScrubbable
                                    ? h(
                                        'span',
                                        {
                                          class: 'sol-ui-time-list-grip',
                                          'aria-hidden': 'true',
                                          onPointerdown: (event: PointerEvent) =>
                                            scrub.pointer(event, 'list', value),
                                          onClick: (event: MouseEvent) => {
                                            event.preventDefault()
                                            event.stopPropagation()
                                          },
                                        },
                                        h(SIcon, { name: 'arrow', rotate: 270, decorative: true }),
                                      )
                                    : null,
                                ],
                              ),
                            )
                          : h('p', { role: 'status', class: 'sol-hint' }, l.value.noResults),
                      )
                    : h('div', { class: 'sol-time-options' }, [
                        h('label', { class: 'sol-field' }, [
                          h('span', { class: 'sol-label' }, l.value.hour),
                          h(
                            'select',
                            {
                              ref: hourSelect,
                              class: 'sol-select',
                              value: hour.value,
                              onChange: (event: Event) => {
                                hour.value = (event.target as HTMLSelectElement).value
                                selectNative()
                              },
                            },
                            [
                              h('option', { value: '' }, l.value.choose),
                              ...hours.map(n => h('option', { value: pad(n) }, pad(n))),
                            ],
                          ),
                        ]),
                        h('label', { class: 'sol-field' }, [
                          h('span', { class: 'sol-label' }, l.value.minute),
                          h(
                            'select',
                            {
                              ref: minuteSelect,
                              class: 'sol-select',
                              value: minute.value,
                              onChange: (event: Event) => {
                                minute.value = (event.target as HTMLSelectElement).value
                                selectNative()
                              },
                            },
                            [
                              h('option', { value: '' }, l.value.choose),
                              ...minutes.map(n => h('option', { value: pad(n) }, pad(n))),
                            ],
                          ),
                        ]),
                      ]),
                  h(
                    'button',
                    {
                      type: 'button',
                      class: 'sol-button',
                      disabled: p.presentation === 'list' && !active.value,
                      onClick: () => {
                        if (p.presentation === 'list') {
                          choose(active.value)
                          return
                        }
                        if (!hour.value) {
                          hourSelect.value?.focus()
                          return
                        }
                        if (!minute.value) {
                          minuteSelect.value?.focus()
                          return
                        }
                        if (validate()) close('select')
                      },
                    },
                    l.value.done,
                  ),
                ],
              )
            : null,
        ),
      ])
    }
  },
})
