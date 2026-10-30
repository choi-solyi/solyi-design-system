import { computed, h, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { ComputedRef, Ref, VNode } from 'vue'
import { SBtn } from './button'
import { SIcon } from './primitives'
import { formatSolDate } from './locale'
import type { SolLocale } from './locale'
import { useTimeGridInteraction } from './time-grid-interaction'
import type { TimeGridInteractionSource } from './time-grid-interaction'
import { createTimeGridPointer } from './time-grid-pointer'
import { proposeTimeGridCoordinate, sameTimeGridCoordinate } from './time-grid-proposal'
import type {
  TimeGridAction,
  TimeGridCancelReason,
  TimeGridCancellation,
  TimeGridProposal,
} from './time-grid-proposal'
import type { TimeGridEntry, TimeGridKey } from './time-grid-values'
interface Props {
  readonly readonly: boolean
  readonly disabled: boolean
  readonly loading: boolean
  readonly snapMinutes: number
  readonly allowMove: boolean
  readonly allowResize: boolean
  readonly allowDuplicate: boolean
  readonly pendingKeys: readonly TimeGridKey[]
  readonly isItemDisabled?: (item: unknown) => boolean
  readonly startMinute: number
  readonly endMinute: number
}
interface View {
  host: Ref<HTMLElement | null>
  scroll: Ref<HTMLElement | null>
  nodes: Map<TimeGridKey, HTMLElement>
  columns: Map<string, HTMLElement>
  focus: (key?: TimeGridKey) => void
  locale: ComputedRef<SolLocale>
  time: (minute: number) => string
  keysId: string
}
interface Events {
  start: (value: TimeGridProposal) => void
  preview: (value: TimeGridProposal) => void
  commit: (value: TimeGridProposal) => void
  cancel: (value: TimeGridCancellation) => void
}
/** Shared keyboard/button intent and explicit-handle pointer adapter. */
export function useTimeGridEditor(
  p: Props,
  source: () => TimeGridInteractionSource | null,
  view: View,
  events: Events,
) {
  const toolbar = ref<HTMLElement | null>(null),
    message = ref<'' | 'commit' | 'cancel' | 'unchanged'>(''),
    l = view.locale
  const validKey = (key: unknown) =>
    typeof key === 'string' ? !!key.trim() : typeof key === 'number' && Number.isFinite(key)
  const configurationValid = computed(
    () =>
      Number.isInteger(p.snapMinutes) &&
      p.snapMinutes >= 1 &&
      p.snapMinutes <= 1440 &&
      Array.isArray(p.pendingKeys) &&
      p.pendingKeys.every(validKey),
  )
  const disabledItems = computed(() => {
    const keys = new Set<TimeGridKey>()
    try {
      for (const entry of source()?.entries || []) {
        const disabled = p.isItemDisabled?.(entry.item) ?? false
        if (typeof disabled !== 'boolean') return { valid: false, keys }
        if (disabled) keys.add(entry.key)
      }
      return { valid: true, keys }
    } catch {
      return { valid: false, keys }
    }
  })
  const pendingSet = computed(() => new Set(Array.isArray(p.pendingKeys) ? p.pendingKeys : []))
  const entryMap = computed(
    () => new Map(source()?.entries.map((item) => [item.key, item] as const) || []),
  )
  const pending = (key: TimeGridKey) => pendingSet.value.has(key)
  const entry = (key: TimeGridKey) => entryMap.value.get(key)
  function blocked(key: TimeGridKey, action: TimeGridAction): TimeGridCancelReason | null {
    if (!configurationValid.value || !disabledItems.value.valid || !source()) return 'configuration'
    if (!entry(key)) return 'external'
    if (p.readonly) return 'readonly'
    if (
      p.disabled ||
      disabledItems.value.keys.has(key) ||
      view.host.value?.closest('[inert],[aria-disabled=true]')
    )
      return 'disabled'
    if (p.loading) return 'loading'
    if (pending(key)) return 'pending'
    if (
      (action === 'move' && !p.allowMove) ||
      (action === 'duplicate' && !p.allowDuplicate) ||
      ((action === 'resize-start' || action === 'resize-end') && !p.allowResize)
    )
      return 'configuration'
    return null
  }
  const operation = useTimeGridInteraction({
    source,
    configuration: () => [
      p.snapMinutes,
      p.allowMove,
      p.allowResize,
      p.allowDuplicate,
      p.startMinute,
      p.endMinute,
    ],
    snap: () => p.snapMinutes,
    blocked,
    focus: (key, target) => {
      if (target === 'toolbar') {
        const button = toolbar.value?.querySelector<HTMLElement>('button:not(:disabled)')
        if (button) {
          button.focus()
          return
        }
      }
      view.focus(key)
    },
    prepareRestore: (key) => {
      const previous = typeof document === 'undefined' ? null : document.activeElement,
        owned = !!previous && !!view.host.value?.contains(previous)
      return () => {
        if (
          owned &&
          view.host.value?.isConnected &&
          (document.activeElement === previous ||
            (!previous?.isConnected && document.activeElement === document.body))
        )
          view.focus(key)
      }
    },
    start: (value) => {
      message.value = ''
      events.start(value)
    },
    preview: events.preview,
    commit: (value) => {
      message.value = 'commit'
      events.commit(value)
    },
    cancel: (value) => {
      message.value = value.reason === 'unchanged' ? 'unchanged' : 'cancel'
      events.cancel(value)
    },
  })
  const pointer = createTimeGridPointer({
    scroll: () => view.scroll.value,
    columns: () => view.columns,
    range: () => ({ startMinute: p.startMinute, endMinute: p.endMinute }),
    state: () => operation.state.value,
    begin: (key, action) => operation.begin(key, action, 'pointer'),
    preview: (minute, column) => {
      operation.preview(minute, column, 'pointer')
    },
    commit: () => {
      operation.commit()
    },
    cancel: operation.cancel,
  })
  watch(
    operation.state,
    (value, old) => {
      if (!value && old) pointer.stop()
    },
    { flush: 'sync' },
  )
  const actionLabel = (action: TimeGridAction) =>
    action === 'move'
      ? l.value.timeGridMove || 'Move'
      : action === 'resize-start'
        ? l.value.timeGridResizeStart || 'Resize start'
        : action === 'resize-end'
          ? l.value.timeGridResizeEnd || 'Resize end'
          : l.value.timeGridDuplicate || 'Duplicate'
  function step(timeSteps: number, columnSteps = 0, input: 'keyboard' | 'button' = 'button') {
    const current = operation.state.value,
      columns = source()?.columns
    if (!current || !columns) return
    const index = columns.findIndex((column) => column.key === current.to.columnKey),
      column = columns[Math.max(0, Math.min(columns.length - 1, index + columnSteps))]
    if (!column) return
    const minute =
      (current.action === 'resize-end' ? current.to.endMinute : current.to.startMinute) +
      timeSteps * p.snapMinutes
    operation.preview(minute, column.key, input)
  }
  function canStep(timeSteps: number, columnSteps = 0) {
    const current = operation.state.value,
      columns = source()?.columns
    if (!current || !columns || blocked(current.key, current.action)) return false
    const index = columns.findIndex((column) => column.key === current.to.columnKey),
      column = columns[index + columnSteps]
    if (!column) return false
    try {
      const minute =
        (current.action === 'resize-end' ? current.to.endMinute : current.to.startMinute) +
        timeSteps * p.snapMinutes
      return !sameTimeGridCoordinate(
        current.to,
        proposeTimeGridCoordinate(current.from, current.action, minute, column.key, p.snapMinutes),
      )
    } catch {
      return false
    }
  }
  function keydown(event: KeyboardEvent) {
    if (event.isComposing || event.defaultPrevented) return
    const target = event.target instanceof HTMLElement ? event.target : null,
      current = operation.state.value
    if (current && event.key === 'Escape') {
      event.preventDefault()
      event.stopPropagation()
      operation.cancel('escape')
      return
    }
    if (current && event.key === 'Tab' && target?.closest('.sol-ui-time-grid-item')) {
      operation.cancel('tab', false)
      return
    }
    if (
      !target ||
      target.closest('button,input,textarea,select,[contenteditable=true]') ||
      event.ctrlKey ||
      event.metaKey ||
      event.altKey
    )
      return
    if (current) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        if (!event.repeat) operation.commit()
        return
      }
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown'].includes(event.key)) {
        event.preventDefault()
        const direction = event.key === 'ArrowUp' || event.key === 'PageUp' ? -1 : 1
        step(direction * (event.shiftKey || event.key.startsWith('Page') ? 10 : 1), 0, 'keyboard')
        return
      }
      if (
        (event.key === 'ArrowLeft' || event.key === 'ArrowRight') &&
        (current.action === 'move' || current.action === 'duplicate')
      ) {
        event.preventDefault()
        const rtl = !!view.host.value && getComputedStyle(view.host.value).direction === 'rtl'
        step(0, (event.key === 'ArrowLeft' ? -1 : 1) * (rtl ? -1 : 1), 'keyboard')
        return
      }
      if (event.key === 'Home' || event.key === 'End') {
        event.preventDefault()
        const minute = event.key === 'Home' ? 0 : 1440
        operation.preview(minute, current.to.columnKey, 'keyboard')
      }
    } else if (event.key === ' ' && !event.repeat) {
      const item = [...view.nodes].find(([, node]) => node === target || node.contains(target))
      if (item && !blocked(item[0], 'move')) {
        event.preventDefault()
        operation.begin(item[0], 'move', 'keyboard')
      }
    }
  }
  function focusout(event: FocusEvent) {
    if (
      !operation.state.value ||
      pointer.isDragging() ||
      (event.relatedTarget instanceof Node && view.host.value?.contains(event.relatedTarget))
    )
      return
    void nextTick(() => {
      if (!operation.state.value || view.host.value?.contains(document.activeElement)) return
      // Reaching a boundary disables the focused step button. Browsers may move
      // focus to body; keep the intent and move to an available toolbar action.
      if (
        document.activeElement === document.body &&
        event.target instanceof HTMLElement &&
        view.host.value?.contains(event.target) &&
        event.target.matches(':disabled')
      ) {
        const available = toolbar.value?.querySelector<HTMLElement>('button:not(:disabled)')
        if (available) {
          available.focus()
          return
        }
      }
      operation.cancel('blur', false)
    })
  }
  const outside = (event: PointerEvent) => {
    if (
      operation.state.value &&
      event.target instanceof Node &&
      !view.host.value?.contains(event.target)
    )
      operation.cancel('outside', false)
  }
  const blur = () => operation.cancel('outside', false)
  onMounted(() => {
    document.addEventListener('pointerdown', outside, true)
    window.addEventListener('blur', blur)
  })
  onBeforeUnmount(() => {
    pointer.stop()
    document.removeEventListener('pointerdown', outside, true)
    window.removeEventListener('blur', blur)
  })
  function pointerProps(item: TimeGridEntry<unknown>) {
    return {
      'data-draggable': !blocked(item.key, 'move') ? 'true' : undefined,
      onPointerdown: (event: PointerEvent) => {
        if (blocked(item.key, 'move') || (event.target as Element).closest('button,a,input,textarea,select,[contenteditable]')) return
        operation.cancel('configuration', false)
        pointer.down(event, item.key, 'move')
      },
      onLostpointercapture: pointer.lost,
      onDragstart: (event: DragEvent) => event.preventDefault(),
      onClick: (event: MouseEvent) => { pointer.consumeClick(event, item.key) },
    }
  }
  function handles(item: TimeGridEntry<unknown>, _minutes: number): VNode[] {
    if (p.readonly) return []
    const button = (action: TimeGridAction, icon: 'grip' | 'chevron', rotate: 0 | 180 = 0) =>
      h(
        'button',
        {
          key: action,
          type: 'button',
          class: ['sol-button sol-ui-time-grid-handle', 'sol-ui-time-grid-handle--' + action],
          'aria-label': actionLabel(action) + ' · ' + item.label,
          disabled: !!blocked(item.key, action),
          'aria-describedby': view.keysId,
          onPointerdown: (event: PointerEvent) => {
            if (!blocked(item.key, action)) {
              operation.cancel('configuration', false)
              pointer.down(event, item.key, action)
            }
          },
          onLostpointercapture: pointer.lost,
          onDragstart: (event: DragEvent) => event.preventDefault(),
          onClick: (event: MouseEvent) => {
            if (!pointer.consumeClick(event, item.key))
              operation.begin(item.key, action, 'button', 'toolbar')
          },
        },
        [h(SIcon, { name: icon, size: 16, rotate, decorative: true })],
      )
    return [
      ...(p.allowResize
        ? [button('resize-start', 'chevron', 180), button('resize-end', 'chevron')]
        : []),
    ]
  }
  function agendaActions(item: TimeGridEntry<unknown>) {
    if (p.readonly) return null
    const actions: TimeGridAction[] = [
      ...(p.allowMove ? ['move' as const] : []),
      ...(p.allowResize ? ['resize-start' as const, 'resize-end' as const] : []),
      ...(p.allowDuplicate ? ['duplicate' as const] : []),
    ]
    return h(
      'div',
      { class: 'sol-actions' },
      actions.map((action) =>
        h(
          SBtn,
          {
            key: action,
            disabled: !!blocked(item.key, action),
            'aria-label': actionLabel(action) + ' · ' + item.label,
            onClick: () => operation.begin(item.key, action, 'button', 'toolbar'),
          },
          () => actionLabel(action),
        ),
      ),
    )
  }
  function renderToolbar() {
    const current = operation.state.value
    if (!current) return null
    const move = current.action === 'move' || current.action === 'duplicate',
      rtl = !!view.host.value && getComputedStyle(view.host.value).direction === 'rtl'
    const button = (
      label: string,
      disabled: boolean,
      click: () => void,
      rotate: 0 | 90 | 180 | 270,
    ) =>
      h(SBtn, { disabled, 'aria-label': label, onClick: click }, () =>
        h(SIcon, { name: 'arrow', rotate, decorative: true }),
      )
    return h(
      'div',
      {
        ref: toolbar,
        class: 'sol-ui-time-grid-toolbar',
        role: 'group',
        'aria-label': l.value.timeGridActions || actionLabel(current.action),
      },
      [
        ...(move
          ? [
              button(
                l.value.timeGridPreviousColumn || 'Previous column',
                !canStep(0, -1),
                () => step(0, -1),
                rtl ? 0 : 180,
              ),
              button(
                l.value.timeGridNextColumn || 'Next column',
                !canStep(0, 1),
                () => step(0, 1),
                rtl ? 180 : 0,
              ),
            ]
          : []),
        button(l.value.timeGridEarlier || 'Earlier', !canStep(-1), () => step(-1), 270),
        button(l.value.timeGridLater || 'Later', !canStep(1), () => step(1), 90),
        h('div', { class: 'sol-ui-time-grid-toolbar-actions' }, [
          h(
            SBtn,
            {
              variant: 'primary',
              disabled:
                !!blocked(current.key, current.action) ||
                (current.action !== 'duplicate' &&
                  sameTimeGridCoordinate(current.from, current.to)),
              onClick: () => operation.commit(),
            },
            () => l.value.timeGridApply || l.value.done,
          ),
          h(
            SBtn,
            { onClick: () => operation.cancel('button') },
            () => l.value.timeGridCancel || l.value.close,
          ),
        ]),
      ],
    )
  }
  function preview(columnKey: string) {
    const current = operation.state.value
    if (
      !current ||
      current.to.columnKey !== columnKey ||
      current.to.startMinute >= p.endMinute ||
      current.to.endMinute <= p.startMinute
    )
      return null
    const start = Math.max(p.startMinute, current.to.startMinute),
      end = Math.min(p.endMinute, current.to.endMinute),
      span = p.endMinute - p.startMinute
    return h(
      'div',
      {
        key: 'preview',
        class: 'sol-ui-time-grid-preview',
        'aria-hidden': 'true',
        style: {
          top: ((start - p.startMinute) / span) * 100 + '%',
          height: ((Math.max(end, start + 30) - start) / span) * 100 + '%',
        },
      },
      [
        h('strong', { class: 'sol-ui-time-grid-item-title' }, entry(current.key)?.label),
        h(
          'span',
          { class: 'sol-ui-time-grid-item-time' },
          view.time(current.to.startMinute) + '–' + view.time(current.to.endMinute),
        ),
      ],
    )
  }
  function status() {
    const current = operation.state.value,
      column = current
        ? source()?.columns.find((column) => column.key === current.to.columnKey)
        : undefined
    return h(
      'output',
      {
        class: [
          'sol-ui-hint sol-ui-time-grid-status',
          !current && !message.value ? 'sol-ui-sr-only' : undefined,
        ],
        role: 'status',
        'aria-live': 'polite',
        'aria-atomic': 'true',
      },
      current
        ? (l.value.timeGridPreview || 'Preview') +
            ' · ' +
            actionLabel(current.action) +
            ' · ' +
            (entry(current.key)?.label || String(current.key)) +
            ' · ' +
            (column
              ? column.label + (column.date ? ' · ' + formatSolDate(column.date, l.value) : '')
              : current.to.columnKey) +
            ' · ' +
            view.time(current.to.startMinute) +
            '–' +
            view.time(current.to.endMinute)
        : message.value === 'commit'
          ? l.value.timeGridProposed || l.value.done
          : message.value === 'unchanged'
            ? l.value.timeGridUnchanged || l.value.done
            : message.value === 'cancel'
              ? l.value.timeGridCancelled || l.value.close
              : '',
    )
  }
  return {
    state: operation.state,
    events: { onKeydown: keydown, onFocusout: focusout },
    cancel: () => operation.cancel('api'),
    valid: computed(() => configurationValid.value && disabledItems.value.valid),
    blocked,
    pending,
    handles,
    pointerProps,
    agendaActions,
    renderToolbar,
    preview,
    status,
    scope: (key: TimeGridKey) => ({
      active: operation.state.value?.key === key,
      readonly: p.readonly,
      disabled:
        p.disabled ||
        p.loading ||
        pending(key) ||
        disabledItems.value.keys.has(key) ||
        !configurationValid.value ||
        !disabledItems.value.valid,
      pending: pending(key),
      proposal: operation.state.value?.key === key ? operation.state.value : null,
    }),
  }
}
