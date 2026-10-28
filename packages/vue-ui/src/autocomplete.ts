import {
  useSFieldValidation,
  fieldError,
  externalFieldError,
  fieldDisabled,
  fieldReadonly,
} from './form'
import { computed, defineComponent, h, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { PropType, SlotsType } from 'vue'
import { inputControlProps, useInputControl } from './input-control'
import type { SolInputClearEvent, SolInputControlSlots } from './input-control'
import { SBtn } from './index'
import { commonFieldProps, fieldDescription, fieldLabel, fieldMessages } from './controls'
import type { SolOption } from './controls'
import type { SolOptionLoader } from './selection'
import { useSolLocale } from './locale'
import { useFloatingPanel } from './floating'

export interface SAutocompleteHandle {
  focus(): void
  clear(): void
  validate(): boolean
  retry(): void
  resetValidation(): void
}
export const SAutocomplete = defineComponent({
  name: 'SAutocomplete',
  inheritAttrs: false,
  props: {
    ...commonFieldProps,
    ...inputControlProps,
    modelValue: { type: String as PropType<string | null>, default: null },
    options: { type: Array as PropType<readonly SolOption[]>, default: () => [] },
    loadOptions: Function as PropType<SolOptionLoader>,
    debounce: { type: Number, default: 150 },
    placeholder: String,
  },
  slots: Object as SlotsType<SolInputControlSlots>,
  emits: {
    'update:modelValue': (_value: string | null) => true,
    change: (_value: string | null) => true,
    search: (_query: string) => true,
    open: () => true,
    close: () => true,
    invalid: (_message: string) => true,
    clear: (_event: SolInputClearEvent<string | null>) => true,
  },
  setup(p, { attrs, slots, emit, expose }) {
    const l = useSolLocale(() => p.locale),
      host = ref<HTMLElement | null>(null),
      input = ref<HTMLInputElement | null>(null),
      panel = ref<HTMLElement | null>(null),
      opened = ref(false),
      query = ref(''),
      active = ref(-1),
      items = ref<readonly SolOption[]>([]),
      busy = ref(false),
      loadError = ref(false),
      localError = ref('')
    const { position, locate } = useFloatingPanel(opened, input, panel, true),
      labels = new Map<string, string>()
    let cancelledComposition = false,
      composing = false,
      disposed = false,
      revision = 0,
      expectedValue: string | null | undefined,
      timer: ReturnType<typeof setTimeout> | undefined,
      abort: AbortController | undefined
    const available = () => !fieldDisabled(p) && !fieldReadonly(p)
    const clean = (list: readonly SolOption[]) => {
      const seen = new Set<string>()
      return list
        .filter(
          item =>
            item &&
            typeof item.value === 'string' &&
            !!item.value &&
            typeof item.label === 'string' &&
            !seen.has(item.value) &&
            !!seen.add(item.value),
        )
        .map(item => {
          labels.set(item.value, item.label)
          return item
        })
    }
    const normalized = (text: string) =>
      text.normalize('NFKC').trim().toLocaleLowerCase(l.value.code)
    const visible = computed(() =>
      p.loadOptions
        ? items.value
        : items.value.filter(item => normalized(item.label).includes(normalized(query.value))),
    )
    const enabled = () =>
      visible.value.map((item, index) => ({ item, index })).filter(({ item }) => !item.disabled)
    watch(
      () => p.options,
      value => {
        const list = clean(value)
        if (!p.loadOptions) items.value = list
        if (!opened.value && p.modelValue !== null)
          query.value = labels.get(p.modelValue) || p.modelValue
      },
      { immediate: true, deep: true },
    )
    watch(
      () => p.modelValue,
      value => {
        if (value !== expectedValue) query.value = value === null ? '' : labels.get(value) || value
        expectedValue = undefined
        localError.value = ''
      },
      { immediate: true },
    )
    function stop() {
      clearTimeout(timer)
      timer = undefined
      abort?.abort()
      abort = undefined
      revision++
      busy.value = false
    }
    function close() {
      if (!opened.value) return
      opened.value = false
      active.value = -1
      stop()
      emit('close')
    }
    function first() {
      active.value = enabled()[0]?.index ?? -1
    }
    async function load() {
      if (!p.loadOptions || !opened.value || !available() || composing) return
      stop()
      const current = revision,
        controller = new AbortController()
      abort = controller
      busy.value = true
      loadError.value = false
      items.value = []
      active.value = -1
      try {
        const result = await p.loadOptions(query.value, controller.signal)
        if (disposed || current !== revision || controller.signal.aborted) return
        items.value = clean(result)
        first()
      } catch {
        if (!disposed && current === revision && !controller.signal.aborted) loadError.value = true
      } finally {
        if (!disposed && current === revision) {
          busy.value = false
          void nextTick(locate)
        }
      }
    }
    function request() {
      if (!available() || composing) return
      emit('search', query.value)
      if (p.loadOptions) {
        stop()
        loadError.value = false
        items.value = []
        active.value = -1
        busy.value = true
        timer = setTimeout(() => void load(), Math.max(0, p.debounce))
      } else first()
    }
    function open() {
      if (!available()) return
      if (!opened.value) {
        opened.value = true
        emit('open')
      }
      request()
    }
    function changeValue(value: string | null) {
      expectedValue = value
      emit('update:modelValue', value)
      emit('change', value)
      localError.value = ''
    }
    function edit(e: Event) {
      if (!available()) return
      query.value = (e.target as HTMLInputElement).value
      if (p.modelValue !== null) changeValue(null)
      if (!composing) open()
    }
    function choose(item: SolOption) {
      if (!available() || item.disabled) return
      changeValue(item.value)
      query.value = item.label
      close()
      input.value?.focus({ preventScroll: true })
    }
    function clear() {
      if (control.enhanced()) {
        control.clear()
        return
      }
      if (!available()) return
      changeValue(null)
      query.value = ''
      close()
      input.value?.focus({ preventScroll: true })
      emit('clear', { value: null, reason: 'clear' })
    }
    function retry() {
      if (!available()) return
      input.value?.focus({ preventScroll: true })
      if (!opened.value) {
        opened.value = true
        emit('open')
      }
      void load()
    }
    function validateIntrinsic() {
      const message = p.required && p.modelValue === null ? l.value.chooseAtLeastOne : ''
      localError.value = message
      if (message) emit('invalid', message)
      return !externalFieldError(p) && !message
    }
    function key(e: KeyboardEvent) {
      if (composing || e.isComposing || !available()) return
      if (e.key === 'Escape' && opened.value) {
        e.preventDefault()
        e.stopPropagation()
        close()
        input.value?.focus()
        return
      }
      if (e.key === 'Tab') {
        if (!loadError.value) close()
        return
      }
      const list = enabled()
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        if (!opened.value) {
          open()
          if (!p.loadOptions)
            active.value = (e.key === 'ArrowUp' ? enabled().at(-1) : enabled()[0])?.index ?? -1
          return
        }
        const at = list.findIndex(({ index }) => index === active.value),
          step = e.key === 'ArrowDown' ? 1 : -1
        active.value =
          (at < 0
            ? step === 1
              ? list[0]
              : list.at(-1)
            : list[(at + step + list.length) % list.length]
          )?.index ?? -1
      } else if (opened.value && active.value >= 0 && visible.value[active.value]) {
        if (e.key === 'Home' || e.key === 'End') {
          e.preventDefault()
          active.value = (e.key === 'Home' ? list[0] : list.at(-1))?.index ?? -1
        } else if (e.key === 'Enter') {
          e.preventDefault()
          choose(visible.value[active.value])
        }
      }
      if (e.defaultPrevented)
        void nextTick(() => {
          const list = panel.value,
            item = list?.querySelector<HTMLElement>('[aria-selected="true"]')
          if (!list || !item) return
          const box = list.getBoundingClientRect(),
            row = item.getBoundingClientRect()
          if (row.top < box.top) list.scrollTop -= box.top - row.top
          else if (row.bottom > box.bottom) list.scrollTop += row.bottom - box.bottom
        })
    }
    function focusout(e: FocusEvent) {
      const target = e.relatedTarget as Node | null
      if (target && !host.value?.contains(target)) close()
    }
    const outside = (e: Event) => {
      if (opened.value && !host.value?.contains(e.target as Node)) close()
    }
    watch(
      () => [fieldDisabled(p), fieldReadonly(p), p.loadOptions],
      () => {
        close()
        if (!p.loadOptions) items.value = clean(p.options)
      },
    )
    onMounted(() => document.addEventListener('pointerdown', outside))
    onBeforeUnmount(() => {
      disposed = true
      stop()
      document.removeEventListener('pointerdown', outside)
    })
    const validation = useSFieldValidation(p, () => p.modelValue, {
      focus: () => input.value?.focus(),
      validateIntrinsic,
      intrinsicError: () => localError.value,
      resetIntrinsic: () => {
        localError.value = ''
      },
    })

    const control = useInputControl(p, slots, {
      locale: () => l.value,
      hasValue: () => p.modelValue !== null || query.value.length > 0,
      disabled: () => fieldDisabled(p),
      readonly: () => fieldReadonly(p),
      error: () => fieldError(p) || localError.value,
      loading: () => busy.value,
      clear: () => {
        cancelledComposition = composing
        composing = false
        changeValue(null)
        query.value = ''
        loadError.value = false
        close()
        stop()
        emit('clear', { value: null, reason: 'clear' })
      },
      reconcile: () => {
        expectedValue = undefined
        query.value = p.modelValue === null ? '' : labels.get(p.modelValue) || p.modelValue
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
            disabled: !available(),
            'aria-label': p.label + ' ' + (opened.value ? l.value.close : l.value.choose),
            'aria-haspopup': 'listbox',
            'aria-expanded': String(opened.value),
            'aria-controls': p.id + '-options',
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
    expose({ ...validation, clear, retry } satisfies SAutocompleteHandle)
    return () => {
      const error = fieldError(p) || localError.value,
        option =
          opened.value && !busy.value && !loadError.value && active.value >= 0
            ? visible.value[active.value]
            : undefined
      return h(
        'div',
        { ref: host, class: ['sol-field sol-ui-autocomplete', attrs.class], onFocusout: focusout },
        [
          fieldLabel(p, slots, l.value.required),
          control.native(
            h('input', {
              ...attrs,
              id: p.id,
              ref: input,
              class: 'sol-input',
              type: 'text',
              value: query.value,
              placeholder: p.placeholder,
              disabled: fieldDisabled(p),
              readonly: fieldReadonly(p),
              required: p.required,
              role: 'combobox',
              'aria-autocomplete': 'list',
              'aria-haspopup': 'listbox',
              'aria-expanded': String(opened.value),
              'aria-controls': p.id + '-options',
              'aria-activedescendant': option ? p.id + '-option-' + active.value : undefined,
              'aria-invalid': error ? 'true' : undefined,
              'aria-describedby': [
                fieldDescription(p, slots, error, attrs['aria-describedby']),
                p.id + '-status',
              ]
                .filter(Boolean)
                .join(' '),
              autocomplete: 'off',
              onClick: open,
              onInput: edit,
              onKeydown: key,
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
                edit(e)
              },
            }),
          ),
          ...fieldMessages(p, slots, error),
          h(
            'div',
            {
              ref: panel,
              popover: 'manual',
              hidden: !opened.value,
              class: 'sol-ui-floating sol-ui-combo-panel',
              style: position.value,
              onKeydown: (e: KeyboardEvent) => {
                if (e.key === 'Escape' && opened.value) {
                  e.preventDefault()
                  e.stopPropagation()
                  close()
                  input.value?.focus()
                }
              },
            },
            [
              h(
                'ul',
                {
                  id: p.id + '-options',
                  role: 'listbox',
                  'aria-label': p.label,
                  hidden: busy.value || loadError.value || !visible.value.length,
                },
                visible.value.map((item, index) =>
                  h(
                    'li',
                    {
                      id: p.id + '-option-' + index,
                      key: item.value,
                      role: 'option',
                      'aria-selected': String(active.value === index),
                      'aria-disabled': item.disabled ? 'true' : undefined,
                      onMousedown: (e: MouseEvent) => e.preventDefault(),
                      onClick: () => choose(item),
                    },
                    [
                      h('span', item.label),
                      item.description ? h('span', { class: 'sol-hint' }, item.description) : null,
                    ],
                  ),
                ),
              ),
              busy.value
                ? h('p', { class: 'sol-ui-combo-message' }, l.value.loading)
                : loadError.value
                  ? h('div', { class: 'sol-ui-combo-message' }, [
                      h('p', l.value.loadFailed),
                      h(SBtn, { variant: 'inline', onClick: retry }, () => l.value.retry),
                    ])
                  : !visible.value.length
                    ? h('p', { class: 'sol-ui-combo-message' }, l.value.noResults)
                    : null,
            ],
          ),
          h(
            'p',
            { id: p.id + '-status', class: 'sol-ui-sr-only', role: 'status' },
            opened.value
              ? busy.value
                ? l.value.loading
                : loadError.value
                  ? l.value.loadFailed
                  : !visible.value.length
                    ? l.value.noResults
                    : ''
              : '',
          ),
          !p.clearable
            ? h(
                SBtn,
                {
                  variant: 'inline',
                  disabled: !available() || (!query.value && !p.modelValue),
                  onClick: clear,
                },
                () => l.value.clear,
              )
            : null,
        ],
      )
    }
  },
})
