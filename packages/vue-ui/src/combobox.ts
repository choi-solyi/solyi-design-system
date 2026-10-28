import { computed, defineComponent, h, mergeProps, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { PropType, SlotsType } from 'vue'
import { commonFieldProps, fieldDescription, fieldLabel, fieldMessages } from './controls'
import type { SolOption } from './controls'
import type { SolOptionLoader } from './selection'
import { fieldDisabled, fieldError, fieldReadonly, useSFieldValidation } from './form'
import { inputControlProps, useInputControl } from './input-control'
import type { SolInputClearEvent, SolInputControlSlots, SolInputHandle } from './input-control'
import { useSolLocale } from './locale'
import { useFloatingPanel } from './floating'
import { createOptionRequest } from './option-request'

export type SolComboboxCommit = 'enter' | 'blur'
export type SolComboboxChange =
  | { readonly value: string; readonly reason: 'select'; readonly option: Readonly<SolOption> }
  | { readonly value: string | null; readonly reason: 'custom' | 'clear'; readonly option?: never }
export interface SolComboboxHandle extends SolInputHandle {
  retry(): void
}

/** Editable text is a draft. Only confirmation, selection or clear proposes a model update. */
export const SCombobox = defineComponent({
  name: 'SCombobox',
  inheritAttrs: false,
  props: {
    ...commonFieldProps,
    ...inputControlProps,
    modelValue: { type: String as PropType<string | null>, default: null },
    options: { type: Array as PropType<readonly SolOption[]>, default: () => [] },
    loadOptions: Function as PropType<SolOptionLoader>,
    debounce: { type: Number, default: 150 },
    openOnFocus: { type: Boolean, default: true },
    commitOn: { type: Array as PropType<readonly SolComboboxCommit[]>, default: () => ['enter'] },
    placeholder: String,
  },
  slots: Object as SlotsType<SolInputControlSlots>,
  emits: {
    'update:modelValue': (_value: string | null) => true,
    change: (_event: SolComboboxChange) => true,
    clear: (_event: SolInputClearEvent<string | null>) => true,
    search: (_query: string) => true,
    open: () => true,
    close: () => true,
    invalid: (_message: string) => true,
  },
  setup(p, { attrs, slots, emit, expose }) {
    const l = useSolLocale(() => p.locale),
      host = ref<HTMLElement | null>(null),
      anchor = ref<HTMLElement | null>(null),
      input = ref<HTMLInputElement | null>(null),
      panel = ref<HTMLElement | null>(null),
      query = ref(p.modelValue ?? ''),
      opened = ref(false),
      active = ref(-1),
      navigated = ref(false),
      items = ref<readonly SolOption[]>([]),
      busy = ref(false),
      loadError = ref(false),
      localError = ref(''),
      details = ref(false)
    const { position, locate } = useFloatingPanel(opened, anchor, panel, true, true),
      dirty = computed(() => query.value !== (p.modelValue ?? '')),
      available = () => !fieldDisabled(p) && !fieldReadonly(p),
      normalized = (text: string) => text.normalize('NFKC').trim().toLocaleLowerCase(l.value.code),
      visible = computed(() => p.loadOptions ? items.value : items.value.filter(item => normalized(item.label).includes(normalized(query.value)))),
      enabled = () => visible.value.map((item, index) => ({ item, index })).filter(({ item }) => !item.disabled)
    let composing = false, cancelledComposition = false, disposed = false,
      suppressFocus = false, revision = 0
    function clean(list: readonly SolOption[]) {
      const keys = new Set<string>()
      return list.filter(item => item && typeof item.value === 'string' && !!item.value && typeof item.label === 'string' && !keys.has(item.value) && !!keys.add(item.value))
        .map(item => ({ ...item }))
    }
    function resetNavigation() { active.value = -1; navigated.value = false }
    const requests = createOptionRequest<SolOption>({
      loader: () => p.loadOptions,
      available: () => opened.value && available() && !composing,
      pending: () => { busy.value = true; loadError.value = false; items.value = []; resetNavigation() },
      resolved: value => { items.value = clean(value); resetNavigation() },
      rejected: () => { loadError.value = true },
      settled: () => { busy.value = false; void nextTick(locate) },
    })
    function close() {
      requests.stop()
      resetNavigation()
      details.value = false
      if (opened.value) { opened.value = false; emit('close') }
    }
    function focusInput() {
      suppressFocus = true
      input.value?.focus({ preventScroll: true })
      suppressFocus = false
    }
    function request() {
      if (!available() || composing) return
      emit('search', query.value)
      if (p.loadOptions) requests.schedule(query.value, p.debounce)
    }
    function open() {
      if (!available() || composing || opened.value) return
      opened.value = true
      emit('open')
      request()
    }
    function reconcile() {
      query.value = p.modelValue ?? ''
      localError.value = ''
    }
    function propose(event: SolComboboxChange) {
      const current = ++revision
      query.value = event.value ?? ''
      localError.value = ''
      close()
      if (p.modelValue !== event.value) emit('update:modelValue', event.value)
      emit('change', event)
      void nextTick(() => {
        if (disposed || current !== revision) return
        reconcile()
        validation.validate()
      })
    }
    function custom() {
      if (!available() || composing) return
      if (dirty.value) propose({ value: query.value === '' ? null : query.value, reason: 'custom' })
      else close()
    }
    function choose(item: SolOption) {
      if (!available() || item.disabled || composing) return
      propose({ value: item.label, reason: 'select', option: { ...item } })
      focusInput()
    }
    function edit(event: Event) {
      if (!available()) return
      revision++
      query.value = (event.target as HTMLInputElement).value
      resetNavigation()
      localError.value = ''
      if (!composing) {
        if (opened.value) request()
        else open()
      }
    }
    function cancel() {
      revision++
      cancelledComposition = composing
      composing = false
      reconcile()
      close()
      focusInput()
    }
    function retry() {
      if (!available() || composing || !p.loadOptions) return
      focusInput()
      if (!opened.value) { opened.value = true; emit('open') }
      emit('search', query.value)
      void requests.run(query.value)
    }
    function intrinsicMessage() {
      return dirty.value ? l.value.comboboxUncommitted! : ''
    }
    const validation = useSFieldValidation(p, () => p.modelValue, {
      focus: () => input.value?.focus(),
      validateIntrinsic: () => {
        localError.value = intrinsicMessage()
        if (localError.value) emit('invalid', localError.value)
        return !localError.value
      },
      intrinsicError: () => localError.value,
      resetIntrinsic: () => { localError.value = '' },
    })
    const control = useInputControl(p, slots, {
      always: true,
      locale: () => l.value,
      hasValue: () => p.modelValue !== null || !!query.value,
      disabled: () => fieldDisabled(p), readonly: () => fieldReadonly(p),
      error: () => fieldError(p), loading: () => busy.value,
      clear: () => {
        revision++
        cancelledComposition = composing
        composing = false
        query.value = ''
        localError.value = ''
        loadError.value = false
        close()
        if (p.modelValue !== null) emit('update:modelValue', null)
        emit('change', { value: null, reason: 'clear' })
        emit('clear', { value: null, reason: 'clear' })
      },
      reconcile, validate: validation.validate, focus: focusInput, element: () => input.value,
      trigger: icon => h('button', {
        type: 'button', class: 'sol-button', disabled: !available(),
        'aria-label': p.label + ' ' + (opened.value ? l.value.close : l.value.choose),
        'aria-haspopup': 'listbox', 'aria-controls': p.id + '-options', 'aria-expanded': String(opened.value),
        onMousedown: (event: MouseEvent) => event.preventDefault(),
        onClick: () => { if (opened.value) close(); else open(); focusInput() },
      }, [icon]),
    })
    function key(event: KeyboardEvent) {
      if (!available() || composing || event.isComposing || event.keyCode === 229) return
      if (event.key === 'Escape' && (opened.value || dirty.value)) {
        event.preventDefault(); event.stopPropagation(); cancel(); return
      }
      if (event.key === 'Enter') {
        const item = navigated.value && opened.value ? visible.value[active.value] : undefined
        // Never submit a form with an unconfirmed draft, even when Enter commit is disabled.
        if (item || p.commitOn.includes('enter') || dirty.value || opened.value) {
          event.preventDefault()
          if (item) choose(item)
          else if (p.commitOn.includes('enter')) custom()
        }
        return
      }
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault(); open()
        const list = enabled(), at = list.findIndex(item => item.index === active.value), step = event.key === 'ArrowDown' ? 1 : -1
        active.value = (at < 0 ? step === 1 ? list[0] : list.at(-1) : list[(at + step + list.length) % list.length])?.index ?? -1
        navigated.value = active.value >= 0
      } else if (opened.value && navigated.value && (event.key === 'Home' || event.key === 'End')) {
        event.preventDefault()
        active.value = (event.key === 'Home' ? enabled()[0] : enabled().at(-1))?.index ?? -1
      }
      if (event.defaultPrevented) void nextTick(() => panel.value?.querySelector('[aria-selected="true"]')?.scrollIntoView?.({ block: 'nearest' }))
    }
    function leave(event: FocusEvent) {
      const target = event.relatedTarget as Node | null
      if (target && host.value?.contains(target)) return
      const current = revision
      void nextTick(() => {
        if (disposed || current !== revision || host.value?.contains(document.activeElement)) return
        if (!composing && p.commitOn.includes('blur')) custom()
        close()
        validation.validate()
      })
    }
    const outside = (event: Event) => {
      if (opened.value && !host.value?.contains(event.target as Node)) close()
    }
    watch(() => p.options, value => {
      if (!p.loadOptions) items.value = clean(value)
      resetNavigation()
    }, { immediate: true, deep: true })
    watch(() => p.modelValue, () => {
      revision++; cancelledComposition = cancelledComposition || composing; composing = false; reconcile(); close()
    })
    watch(() => [fieldDisabled(p), fieldReadonly(p), p.loadOptions], () => {
      revision++; cancelledComposition = cancelledComposition || composing; composing = false; reconcile(); close()
      if (!p.loadOptions) items.value = clean(p.options)
    })
    watch([dirty, () => p.required, l], () => {
      input.value?.setCustomValidity(fieldDisabled(p) ? '' : intrinsicMessage())
    }, { flush: 'post' })
    onMounted(() => document.addEventListener('pointerdown', outside))
    onBeforeUnmount(() => { disposed = true; revision++; requests.dispose(); document.removeEventListener('pointerdown', outside) })
    expose({ ...validation, clear: control.clear, retry } satisfies SolComboboxHandle)
    return () => {
      const error = fieldError(p), option = navigated.value && opened.value && !busy.value && !loadError.value ? visible.value[active.value] : undefined
      return h('div', { ref: host, class: ['sol-field sol-ui-combobox', attrs.class], onFocusout: leave }, [
        fieldLabel(p, slots, l.value.required),
        h('div', { ref: anchor }, control.native(h('input', mergeProps(attrs, {
          ref: input, id: p.id, class: 'sol-input', type: 'text', name: undefined,
          value: query.value, placeholder: p.placeholder, disabled: fieldDisabled(p), readonly: fieldReadonly(p), required: p.required,
          role: 'combobox', 'aria-autocomplete': 'list', 'aria-haspopup': 'listbox',
          'aria-expanded': String(opened.value), 'aria-controls': p.id + '-options',
          'aria-activedescendant': option ? p.id + '-option-' + active.value : undefined,
          'aria-invalid': error ? 'true' : undefined,
          'aria-describedby': [fieldDescription(p, slots, error, attrs['aria-describedby']), p.id + '-status'].filter(Boolean).join(' '),
          autocomplete: 'off', onInput: edit, onKeydown: key, onClick: open,
          onFocus: () => { if (p.openOnFocus && !suppressFocus) open() },
          onCompositionstart: () => { cancelledComposition = false; composing = true; requests.stop(); resetNavigation() },
          onCompositionend: (event: CompositionEvent) => {
            composing = false
            if (cancelledComposition) { cancelledComposition = false; (event.target as HTMLInputElement).value = query.value; return }
            if (!host.value?.contains(document.activeElement)) {
              revision++; query.value = (event.target as HTMLInputElement).value; resetNavigation()
              if (p.commitOn.includes('blur')) custom()
              close(); validation.validate(); return
            }
            edit(event)
          },
        })))),
        attrs.name ? h('input', { type: 'hidden', name: attrs.name, value: p.modelValue ?? '', disabled: fieldDisabled(p), form: attrs.form }) : null,
        ...fieldMessages(p, slots, error),
        h('div', {
          ref: panel, popover: 'manual', hidden: !opened.value, class: 'sol-ui-floating sol-ui-combo-panel sol-ui-combobox-panel', style: position.value,
          onKeydown: (event: KeyboardEvent) => {
            if (event.key === 'Escape' && opened.value) { event.preventDefault(); event.stopPropagation(); cancel() }
          },
        }, [
          h('ul', { id: p.id + '-options', role: 'listbox', 'aria-label': p.label, hidden: busy.value || loadError.value || !visible.value.length },
            visible.value.map((item, index) => h('li', {
              id: p.id + '-option-' + index, key: item.value, role: 'option',
              'aria-selected': String(navigated.value && active.value === index), 'aria-disabled': item.disabled ? 'true' : undefined,
              'aria-label': [item.label, item.description].filter(Boolean).join(' · '),
              onMousedown: (event: MouseEvent) => event.preventDefault(), onClick: () => choose(item),
            }, [h('span', { class: 'sol-ui-combobox-ellipsis' }, item.label), item.description ? h('span', { class: 'sol-hint sol-ui-combobox-ellipsis' }, item.description) : null]))),
          busy.value ? h('p', { class: 'sol-ui-combo-message' }, l.value.loading)
            : loadError.value ? h('div', { class: 'sol-ui-combo-message' }, [h('p', l.value.loadFailed), h('button', { class: 'sol-button', type: 'button', onClick: retry }, l.value.retry)])
              : !visible.value.length ? h('p', { class: 'sol-ui-combo-message' }, l.value.noResults) : null,
          !busy.value && !loadError.value && visible.value.length ? h('details', {
            open: details.value, class: 'sol-ui-combobox-details',
            onToggle: (event: Event) => { details.value = (event.target as HTMLDetailsElement).open; void nextTick(locate) },
          }, [h('summary', l.value.comboboxDetails), details.value ? h('ul', visible.value.map(item => h('li', { key: item.value }, [item.label, item.description ? h('p', { class: 'sol-hint' }, item.description) : null, item.disabled ? h('span', l.value.unavailable) : null]))) : null]) : null,
        ]),
        h('p', { id: p.id + '-status', class: 'sol-ui-sr-only', role: 'status' }, opened.value ? busy.value ? l.value.loading : loadError.value ? l.value.loadFailed : !visible.value.length ? l.value.noResults : '' : ''),
      ])
    }
  },
})
