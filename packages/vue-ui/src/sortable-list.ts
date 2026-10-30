import { computed, defineComponent, h, nextTick, onBeforeUnmount, onMounted, ref, watch, TransitionGroup } from 'vue'
import type { AllowedComponentProps, PropType, SlotsType, VNode, VNodeProps } from 'vue'
import { displayFieldProps, fieldDescription, fieldMessages } from './controls'
import { useSolLocale } from './locale'
import type { SolLocale } from './locale'
import { SIcon } from './primitives'
import { snapshotSortable, sameSortableSnapshot, proposeSortableMove } from './sortable-values'
import { createSortablePointer } from './sortable-pointer'
import type {
  SortableKey,
  SortableInput,
  SortableSnapshot,
  SortableProposal,
} from './sortable-values'

export type SolSortableKey = SortableKey
export type SolSortableInput = SortableInput
export type SolSortableProposal<T> = SortableProposal<T>
export type SolSortableCancelReason =
  | 'escape'
  | 'tab'
  | 'blur'
  | 'disabled'
  | 'external'
  | 'configuration'
  | 'unmount'
  | 'api'
  | 'pointercancel'
  | 'capture'
  | 'outside'
export type SolSortableEnd<T> =
  | (SolSortableProposal<T> & { status: 'commit' | 'unchanged' })
  | (SolSortableProposal<T> & { status: 'cancel'; reason: SolSortableCancelReason })
export interface SolSortableItemScope<T> {
  item: T
  index: number
  key: SolSortableKey
  active: boolean
  disabled: boolean
}
export interface SolSortableSlots<T> {
  item?: (scope: SolSortableItemScope<T>) => VNode[]
  'handle-icon'?: (scope: SolSortableItemScope<T>) => VNode[]
  empty?: () => VNode[]
  help?: () => VNode[]
}
export interface SolSortableProps<T> extends AllowedComponentProps, VNodeProps {
  id: string
  label: string
  modelValue: readonly T[]
  itemKey: (item: T) => SolSortableKey
  itemLabel: (item: T) => string
  isItemDisabled?: (item: T) => boolean
  help?: string
  error?: string
  disabled?: boolean
  readonly?: boolean
  locale?: Partial<SolLocale>
  'onUpdate:modelValue'?: (items: T[]) => void
  onChange?: (proposal: SolSortableProposal<T>) => void
  onStart?: (proposal: SolSortableProposal<T>) => void
  onPreview?: (proposal: SolSortableProposal<T>) => void
  onEnd?: (result: SolSortableEnd<T>) => void
}
export interface SolSortableHandle {
  focus(key?: SolSortableKey): void
  cancel(): void
}
export interface SolSortableEmit<T> {
  (event: 'update:modelValue', items: T[]): void
  (event: 'change' | 'start' | 'preview', proposal: SolSortableProposal<T>): void
  (event: 'end', result: SolSortableEnd<T>): void
}
interface SolSortableContext<T> {
  props: SolSortableProps<T>
  slots: SolSortableSlots<T>
  emit: SolSortableEmit<T>
  expose: (value: SolSortableHandle) => void
}
export interface SolSortableComponent {
  <T>(
    props: SolSortableProps<T>,
    context?: Pick<SolSortableContext<T>, 'slots' | 'emit'> & { attrs: Record<string, unknown> },
    expose?: (value: SolSortableHandle) => void,
  ): VNode & { __ctx?: SolSortableContext<T> }
}

// Runtime unknown values are exposed through the checked generic public contract above.
export const SSortableList = /* @__PURE__ */ defineComponent({
  name: 'SSortableList',
  inheritAttrs: false,
  props: {
    ...displayFieldProps,
    modelValue: { type: Array as PropType<readonly unknown[]>, required: true },
    itemKey: { type: Function as PropType<(item: unknown) => SolSortableKey>, required: true },
    itemLabel: { type: Function as PropType<(item: unknown) => string>, required: true },
    isItemDisabled: Function as PropType<(item: unknown) => boolean>,
  },
  slots: Object as SlotsType<SolSortableSlots<unknown>>,
  emits: {
    'update:modelValue': (_items: unknown[]) => true,
    change: (_proposal: SolSortableProposal<unknown>) => true,
    start: (_proposal: SolSortableProposal<unknown>) => true,
    preview: (_proposal: SolSortableProposal<unknown>) => true,
    end: (_result: SolSortableEnd<unknown>) => true,
  },
  setup(p, { attrs, slots, emit, expose }) {
    const l = useSolLocale(() => p.locale),
      host = ref<HTMLElement | null>(null),
      revision = ref(0),
      list = ref<HTMLElement | null>(null)
    const dragPreview = ref<{ key: SolSortableKey; left: number; top: number; width: number } | null>(null)
    const handles = new Map<SolSortableKey, HTMLButtonElement>(),
      upButtons = new Map<SolSortableKey, HTMLButtonElement>(),
      downButtons = new Map<SolSortableKey, HTMLButtonElement>(),
      rows = new Map<SolSortableKey, HTMLElement>()
    const state = computed(() => {
      const locked = new Set<SolSortableKey>()
      const result = snapshotSortable(p.modelValue, p.itemKey)
      if (!result.valid) return { snapshot: undefined, labels: [] as string[], locked }
      const labels: string[] = []
      try {
        for (const item of result.snapshot.items) {
          const label = p.itemLabel(item)
          if (typeof label !== 'string' || !label.trim())
            return { snapshot: undefined, labels, locked }
          const disabled = p.isItemDisabled ? p.isItemDisabled(item) : false
          if (typeof disabled !== 'boolean') return { snapshot: undefined, labels, locked }
          if (disabled) locked.add(result.snapshot.keys[labels.length]!)
          labels.push(label.trim())
        }
      } catch {
        return { snapshot: undefined, labels, locked }
      }
      return { snapshot: result.snapshot, labels, locked }
    })
    type Session = {
      snapshot: SortableSnapshot<unknown>
      key: SolSortableKey
      to: number
      keyer: typeof p.itemKey
      labeler: typeof p.itemLabel
      input: 'keyboard' | 'pointer'
    }
    let session: Session | undefined,
      disposed = false
    const status = ref<{
      kind: 'start' | 'preview' | 'commit' | 'cancel' | 'unchanged'
      key: SolSortableKey
      label: string
      to: number
      count: number
    }>()
    const unavailable = () => p.disabled || p.readonly || !state.value.snapshot
    const itemUnavailable = (key: SolSortableKey) => unavailable() || state.value.locked.has(key)
    const labelFor = (key: SolSortableKey, fallback = '') => {
      const index = state.value.snapshot?.keys.indexOf(key) ?? -1
      return index >= 0 ? state.value.labels[index]! : fallback
    }
    function proposal(current: Session) {
      return proposeSortableMove(current.snapshot, current.key, current.to, current.input)!
    }
    function announce(
      kind: NonNullable<typeof status.value>['kind'],
      value: SolSortableProposal<unknown>,
    ) {
      status.value = {
        kind,
        key: value.key,
        label: labelFor(value.key),
        to: value.to,
        count: value.items.length,
      }
    }
    function restoreFocus(
      key: SolSortableKey,
      previous: Element | null,
      action: 'handle' | 'up' | 'down' = 'handle',
      fallbackIndex = 0,
    ) {
      void nextTick(() => {
        if (disposed || p.disabled) return
        const active = document.activeElement
        if (
          active &&
          active !== document.body &&
          active !== previous &&
          !host.value?.contains(active)
        )
          return
        const map = action === 'up' ? upButtons : action === 'down' ? downButtons : handles
        let button = itemUnavailable(key) ? undefined : map.get(key)
        if (!itemUnavailable(key) && (!button || button.disabled)) button = handles.get(key)
        if (!button || button.disabled) {
          const keys = state.value.snapshot?.keys || []
          const start = Math.max(0, Math.min(fallbackIndex, keys.length - 1))
          button = [...keys.slice(start), ...keys.slice(0, start).reverse()]
            .filter(key => !itemUnavailable(key))
            .map(key => handles.get(key))
            .find(button => button && !button.disabled)
        }
        if (button && !button.disabled) button.focus({ preventScroll: true })
        else host.value?.focus({ preventScroll: true })
      })
    }
    function cancel(reason: SolSortableCancelReason = 'api', restore = true) {
      pointer.stop()
      if (!session) return
      const old = session,
        value = proposal(old),
        focused = document.activeElement
      session = undefined
      revision.value++
      announce('cancel', value)
      emit('end', { ...value, status: 'cancel', reason })
      if (restore) restoreFocus(old.key, focused, 'handle', value.from)
    }
    function begin(key: SolSortableKey, input: 'keyboard' | 'pointer' = 'keyboard') {
      if (itemUnavailable(key)) return false
      const snapshot = state.value.snapshot!
      const from = snapshot.keys.indexOf(key)
      if (from < 0) return false
      if (input === 'keyboard') cancel('api', false)
      const current = { snapshot, key, to: from, keyer: p.itemKey, labeler: p.itemLabel, input }
      session = current
      revision.value++
      handles.get(key)?.focus({ preventScroll: true })
      if (session !== current || itemUnavailable(key)) return false
      const value = proposal(current)
      announce('start', value)
      emit('start', value)
      return session === current
    }
    function finish() {
      if (!session) return
      const old = session,
        value = proposal(old),
        focused = document.activeElement
      pointer.stop()
      session = undefined
      revision.value++
      if (
        itemUnavailable(old.key) ||
        !state.value.snapshot ||
        !sameSortableSnapshot(old.snapshot, state.value.snapshot)
      ) {
        announce('cancel', value)
        emit('end', { ...value, status: 'cancel', reason: 'external' })
        return
      }
      const changed = value.from !== value.to
      announce(changed ? 'commit' : 'unchanged', value)
      if (changed) {
        emit('update:modelValue', [...value.items])
        emit('change', { ...value, items: [...value.items] })
      }
      emit('end', { ...value, items: [...value.items], status: changed ? 'commit' : 'unchanged' })
      restoreFocus(old.key, focused)
    }
    function moveButton(key: SolSortableKey, direction: -1 | 1) {
      if (itemUnavailable(key)) return
      cancel('api', false)
      const snapshot = state.value.snapshot!,
        from = snapshot.keys.indexOf(key),
        value = proposeSortableMove(snapshot, key, from + direction, 'button')
      if (!value) return
      const focused = document.activeElement
      announce('commit', value)
      emit('update:modelValue', [...value.items])
      emit('change', { ...value, items: [...value.items] })
      emit('end', { ...value, items: [...value.items], status: 'commit' })
      restoreFocus(key, focused, direction === -1 ? 'up' : 'down', from)
    }
    function key(event: KeyboardEvent, item: SolSortableKey) {
      if (event.isComposing || event.altKey || event.ctrlKey || event.metaKey) return
      if (event.key === 'Tab') {
        cancel('tab', false)
        return
      }
      if (event.key === 'Escape' && session) {
        event.preventDefault()
        event.stopPropagation()
        cancel('escape')
        return
      }
      if (itemUnavailable(item)) return
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault()
        event.stopPropagation()
        if (event.repeat) return
        if (session?.key === item) finish()
        else begin(item)
        return
      }
      if (!session || session.key !== item) return
      const current = session
      let to = current.to
      if (event.key === 'ArrowUp') to--
      else if (event.key === 'ArrowDown') to++
      else if (event.key === 'Home') to = 0
      else if (event.key === 'End') to = current.snapshot.items.length - 1
      else return
      event.preventDefault()
      event.stopPropagation()
      to = Math.max(0, Math.min(current.snapshot.items.length - 1, to))
      if (to === current.to) return
      current.to = to
      revision.value++
      const value = proposal(current)
      announce('preview', value)
      emit('preview', value)
    }
    const pointer = createSortablePointer({
      visual: (key, _x, y) => {
        const box = key === null ? undefined : rows.get(key)?.getBoundingClientRect()
        dragPreview.value = key !== null && box && typeof y === 'number'
          ? { key, left: box.left, top: Math.max(8, Math.min(y - box.height / 2, window.innerHeight - box.height - 8)), width: box.width }
          : null
      },
      list: () => list.value,
      row: key => rows.get(key),
      keys: () => session?.snapshot.keys || state.value.snapshot?.keys || [],
      enabled: () => !unavailable(),
      begin: key => begin(key, 'pointer'),
      finish,
      cancel,
      move: to => {
        if (!session || session.input !== 'pointer' || session.to === to) return
        session.to = to
        revision.value++
        const value = proposal(session)
        announce('preview', value)
        emit('preview', value)
      },
    })
    function pointerdown(event: PointerEvent, key: SolSortableKey) {
      if (event.button !== 0 || event.isPrimary === false || itemUnavailable(key)) return
      cancel('api', false)
      const snapshot = state.value.snapshot!
      pointer.press(
        event,
        key,
        () =>
          !itemUnavailable(key) &&
          !!state.value.snapshot &&
          sameSortableSnapshot(snapshot, state.value.snapshot),
      )
    }
    watch(
      state,
      current => {
        if (session && current.locked.has(session.key)) {
          cancel('disabled')
          return
        }
        if (pointer.pending() && !pointer.valid() && !session) {
          cancel('external', false)
          return
        }
        if (
          session &&
          (!current.snapshot || !sameSortableSnapshot(session.snapshot, current.snapshot))
        )
          cancel(
            session.snapshot.source === p.modelValue &&
              (session.keyer !== p.itemKey || session.labeler !== p.itemLabel)
              ? 'configuration'
              : 'external',
          )
      },
      { flush: 'sync' },
    )
    watch(
      () => [p.disabled, p.readonly],
      () => {
        if (p.disabled || p.readonly) {
          const previous = typeof document !== 'undefined' ? document.activeElement : null
          const inside = previous instanceof HTMLElement && host.value?.contains(previous) && (previous.matches('.sol-ui-sortable-handle') || previous.closest('.sol-ui-sortable-moves'))
          cancel('disabled', false)
          if (inside) void nextTick(() => {
            if (!disposed && (document.activeElement === document.body || document.activeElement === previous)) host.value?.focus({ preventScroll: true })
          })
        }
      },
      { flush: 'sync' },
    )
    const blur = () => cancel('blur', false),
      visibility = () => {
        if (document.hidden) cancel('blur', false)
      }
    onMounted(() => {
      window.addEventListener('blur', blur)
      document.addEventListener('visibilitychange', visibility)
    })
    onBeforeUnmount(() => {
      disposed = true
      cancel('unmount', false)
      window.removeEventListener('blur', blur)
      document.removeEventListener('visibilitychange', visibility)
    })
    expose({
      focus: (key?: SolSortableKey) => {
        if (!p.disabled) {
          const first = key ?? state.value.snapshot?.keys.find(key => !itemUnavailable(key))
          const button =
            first === undefined || itemUnavailable(first) ? undefined : handles.get(first)
          if (button && !button.disabled) button.focus()
          else host.value?.focus()
        }
      },
      cancel: () => cancel('api'),
    })
    return () => {
      void revision.value
      const snapshot = state.value.snapshot,
        items = snapshot?.items || (Array.isArray(p.modelValue) ? p.modelValue : []),
        error = p.error || (!snapshot ? l.value.sortableInvalid! : '')
      const from = session?.snapshot.keys.indexOf(session.key) ?? -1
      const description = fieldDescription(p, slots, error, p.id + '-keys')
      const currentStatus = status.value
      const message = currentStatus
        ? l.value.sortableStatus!(
            currentStatus.kind,
            labelFor(currentStatus.key, currentStatus.label),
            currentStatus.to + 1,
            currentStatus.count,
          )
        : ''
      return h(
        'div',
        {
          ...attrs,
          ref: host,
          id: p.id,
          class: ['sol-field sol-ui-sortable', attrs.class],
          tabindex: -1,
          role: 'group',
          'aria-labelledby': p.id + '-label',
          'aria-describedby': description,
          'aria-disabled': p.disabled ? 'true' : undefined,
        },
        [
          h('p', { id: p.id + '-label', class: 'sol-label' }, p.label),
          h('p', { id: p.id + '-keys', class: 'sol-hint' }, l.value.sortableKeys),
          h(
            'ol',
            { ref: list, class: 'sol-ui-sortable-list', 'aria-labelledby': p.id + '-label' },
            [h(TransitionGroup, { name: 'sol-ui-sortable', css: false }, () => items.map((item, index) => {
              const itemKey = snapshot?.keys[index] ?? 'invalid-' + index,
                label = state.value.labels[index] || l.value.record + ' ' + (index + 1),
                active = session?.key === itemKey
              const disabled = itemUnavailable(itemKey),
                scope = { item, index, key: itemKey, active, disabled }
              return h(
                'li',
                {
                  key: itemKey,
                  ref: (element: unknown) => {
                    if (element) rows.set(itemKey, element as HTMLElement)
                    else rows.delete(itemKey)
                  },
                  class: 'sol-ui-sortable-row',
                  'data-active': active ? 'true' : undefined,
                  'data-disabled': state.value.locked.has(itemKey) ? 'true' : undefined,
                  'data-controls': disabled ? 'hidden' : undefined,
                  'data-insert':
                    session?.to === index && session.to !== from
                      ? session.to > from
                        ? 'after'
                        : 'before'
                      : undefined,
                },
                [
                  h(
                    'button',
                    {
                      ref: (element: unknown) => {
                        if (element) handles.set(itemKey, element as HTMLButtonElement)
                        else handles.delete(itemKey)
                      },
                      type: 'button',
                      class: 'sol-button sol-ui-sortable-handle',
                      disabled,
                      'aria-label': l.value.sortableHandle!(label),
                      'aria-pressed': String(active),
                      'aria-describedby': p.id + '-keys',
                      onKeydown: (event: KeyboardEvent) => key(event, itemKey),
                      onPointerdown: (event: PointerEvent) => pointerdown(event, itemKey),
                      onDragstart: (event: DragEvent) => event.preventDefault(),
                      onClick: (event: MouseEvent) => {
                        if (pointer.consumeClick(event)) return
                        if (session?.key === itemKey) finish()
                        else begin(itemKey)
                      },
                      onBlur: () => {
                        if (session?.key === itemKey || pointer.key() === itemKey)
                          cancel('blur', false)
                      },
                    },
                    slots['handle-icon']?.(scope) || h(SIcon, { name: 'grip', decorative: true }),
                  ),
                  h('div', { class: 'sol-ui-sortable-content' }, [
                    slots.item?.(scope) || label,
                    state.value.locked.has(itemKey)
                      ? h('span', { class: 'sol-hint' }, l.value.unavailable)
                      : null,
                  ]),
                  h(
                    'div',
                    { class: 'sol-ui-sortable-moves' },
                    ([-1, 1] as const).map(direction =>
                      h(
                        'button',
                        {
                          ref: (element: unknown) => {
                            const map = direction === -1 ? upButtons : downButtons
                            if (element) map.set(itemKey, element as HTMLButtonElement)
                            else map.delete(itemKey)
                          },
                          type: 'button',
                          class: 'sol-button',
                          disabled:
                            disabled ||
                            (direction === -1 ? index === 0 : index === items.length - 1),
                          'aria-label': l.value.sortableMove!(label, direction),
                          'aria-describedby': p.id + '-keys',
                          onClick: () => moveButton(itemKey, direction),
                        },
                        h(SIcon, {
                          name: 'arrow',
                          rotate: direction === -1 ? 270 : 90,
                          decorative: true,
                        }),
                      ),
                    ),
                  ),
                ],
              )
            })),
          ]),
          dragPreview.value ? h('div', { popover: 'manual', class: 'sol-ui-sortable-ghost', 'aria-hidden': 'true', style: { left: dragPreview.value.left + 'px', top: dragPreview.value.top + 'px', width: dragPreview.value.width + 'px' }, ref: (element: unknown) => { if (element instanceof HTMLElement) { try { element.showPopover?.() } catch { element.removeAttribute('popover') } } } }, labelFor(dragPreview.value.key)) : null,
          !items.length
            ? h('div', { class: 'sol-hint' }, slots.empty?.() || l.value.noResults)
            : null,
          ...fieldMessages(p, slots, error),
          h(
            'output',
            { class: 'sol-hint sol-ui-sortable-status', role: 'status', 'aria-live': 'polite' },
            message,
          ),
        ],
      )
    }
  },
}) as unknown as SolSortableComponent
