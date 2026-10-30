import type { TimeGridAction, TimeGridCancelReason, TimeGridProposal } from './time-grid-proposal'
import type { TimeGridKey } from './time-grid-values'
interface Options {
  scroll: () => HTMLElement | null
  columns: () => ReadonlyMap<string, HTMLElement>
  range: () => { startMinute: number; endMinute: number }
  state: () => TimeGridProposal | null
  begin: (key: TimeGridKey, action: TimeGridAction) => boolean
  preview: (minute: number, columnKey: string) => void
  commit: () => void
  cancel: (reason: TimeGridCancelReason, restore?: boolean) => void
}
interface Gesture {
  key: TimeGridKey
  action: TimeGridAction
  id: number
  owner: HTMLElement
  x: number
  y: number
  lastX: number
  lastY: number
  dragging: boolean
  originTop: number
  columnHeight: number
  range: number
  width: number
  height: number
}
/** Only item gestures capture pointers; the blank canvas keeps native pan. */
export function createTimeGridPointer(options: Options) {
  let gesture: Gesture | null = null,
    frame = 0,
    resize: ResizeObserver | undefined,
    suppressKey: TimeGridKey | undefined,
    canvasPress = false
  const moveOptions = { capture: true, passive: false }
  function bind(method: 'addEventListener' | 'removeEventListener') {
    window[method]('pointermove', move as EventListener, moveOptions)
    window[method]('pointerup', up as EventListener, true)
    window[method]('pointercancel', cancelPointer as EventListener, true)
    window[method]('pointerdown', otherPointer as EventListener, true)
    window[method]('blur', outside)
  }
  function stop() {
    const current = gesture
    gesture = null
    if (frame) cancelAnimationFrame(frame)
    frame = 0
    resize?.disconnect()
    resize = undefined
    bind('removeEventListener')
    if (current) {
      if (current.dragging) {
        suppressKey = current.key
      }
      try {
        if (current.owner.hasPointerCapture(current.id))
          current.owner.releasePointerCapture(current.id)
      } catch {}
    }
  }
  function cancel(reason: TimeGridCancelReason, restore = true) {
    const active = gesture?.dragging
    stop()
    if (active) options.cancel(reason, restore)
  }
  function point(current: Gesture) {
    const scroll = options.scroll(),
      state = options.state()
    if (!scroll || !state || state.key !== current.key) return
    const fromColumn = options.columns().get(state.from.columnKey),
      box = fromColumn?.getBoundingClientRect()
    if (!box || box.height !== current.columnHeight) {
      cancel('configuration')
      return
    }
    const base = current.action === 'resize-end' ? state.from.endMinute : state.from.startMinute
    const minute =
      base +
      ((current.lastY - current.y + current.originTop - box.top) / current.columnHeight) *
        current.range
    let column = state.from.columnKey,
      distance = Infinity
    if (current.action === 'move' || current.action === 'duplicate')
      for (const [key, node] of options.columns()) {
        const box = node.getBoundingClientRect(),
          value =
            current.lastX < box.left
              ? box.left - current.lastX
              : current.lastX > box.right
                ? current.lastX - box.right
                : 0
        if (value < distance) {
          distance = value
          column = key
        }
      }
    options.preview(minute, column)
  }
  function tick() {
    const current = gesture,
      scroll = options.scroll()
    if (!current?.dragging || !scroll) return
    const box = scroll.getBoundingClientRect(),
      // Tokens may use rem; DOM geometry gives the actual density/touch size in px.
      control = current.owner.getBoundingClientRect().height || 40,
      edge = Math.min(control, box.width / 4, box.height / 4)
    const velocity = (point: number, start: number, end: number) =>
      Math.max(
        -control / 4,
        Math.min(
          control / 4,
          point < start + edge
            ? -Math.ceil((start + edge - point) / 4)
            : point > end - edge
              ? Math.ceil((point - (end - edge)) / 4)
              : 0,
        ),
      )
    scroll.scrollBy(
      velocity(current.lastX, box.left, box.right),
      velocity(
        current.lastY,
        Math.max(
          box.top,
          scroll.querySelector('.sol-ui-time-grid-head')?.getBoundingClientRect().bottom ?? box.top,
        ),
        box.bottom,
      ),
    )
    point(current)
    if (gesture === current) frame = requestAnimationFrame(tick)
  }
  function move(event: PointerEvent) {
    const current = gesture
    if (!current || event.pointerId !== current.id) return
    current.lastX = event.clientX
    current.lastY = event.clientY
    if (!current.dragging) {
      if (Math.hypot(event.clientX - current.x, event.clientY - current.y) < 5) return
      const scroll = options.scroll()
      if (!scroll || !options.begin(current.key, current.action)) {
        stop()
        return
      }
      const state = options.state(),
        column = state ? options.columns().get(state.from.columnKey) : undefined
      if (!column) {
        cancel('external')
        return
      }
      current.dragging = true
      current.columnHeight = column.getBoundingClientRect().height
      current.range = options.range().endMinute - options.range().startMinute
      if (current.columnHeight <= 0) {
        cancel('configuration')
        return
      }
      if (typeof ResizeObserver !== 'undefined') {
        resize = new ResizeObserver(() => {
          if (
            gesture === current &&
            (scroll.clientWidth !== current.width ||
              scroll.clientHeight !== current.height ||
              column.getBoundingClientRect().height !== current.columnHeight)
          )
            cancel('configuration')
        })
        resize.observe(scroll)
        resize.observe(column)
      }
      frame = requestAnimationFrame(tick)
    }
    event.preventDefault()
    point(current)
  }
  function up(event: PointerEvent) {
    const current = gesture
    if (!current || event.pointerId !== current.id) return
    if (current.dragging) {
      current.lastX = event.clientX
      current.lastY = event.clientY
      point(current)
      const scroll = options.scroll(),
        box = scroll?.getBoundingClientRect(),
        top =
          scroll?.querySelector('.sol-ui-time-grid-head')?.getBoundingClientRect().bottom ??
          box?.top ??
          0
      const inside =
        !!box &&
        event.clientY >= Math.max(box.top, top) &&
        event.clientY <= box.bottom &&
        [...options.columns().values()].some((node) => {
          const column = node.getBoundingClientRect()
          return (
            event.clientX >= Math.max(box.left, column.left) &&
            event.clientX <= Math.min(box.right, column.right)
          )
        })
      if (!inside) cancel('outside', false)
      else options.commit()
    }
    stop()
  }
  function cancelPointer(event: PointerEvent) {
    if (gesture?.id === event.pointerId) cancel('pointercancel')
  }
  function otherPointer(event: PointerEvent) {
    if (gesture && event.pointerId !== gesture.id) cancel('pointercancel')
  }
  function outside() {
    cancel('outside', false)
  }
  function down(event: PointerEvent, key: TimeGridKey, action: TimeGridAction) {
    if (
      event.defaultPrevented ||
      !event.isPrimary ||
      event.button !== 0 ||
      !(event.currentTarget instanceof HTMLElement)
    )
      return
    stop()
    suppressKey = undefined
    const scroll = options.scroll()
    if (!scroll) return
    const range = options.range(),
      rect = scroll.getBoundingClientRect()
    gesture = {
      key,
      action,
      id: event.pointerId,
      owner: event.currentTarget,
      x: event.clientX,
      y: event.clientY,
      lastX: event.clientX,
      lastY: event.clientY,
      dragging: false,
      originTop:
        event.currentTarget.closest('.sol-ui-time-grid-column')?.getBoundingClientRect().top ??
        rect.top,
      columnHeight: 0,
      range: range.endMinute - range.startMinute,
      width: scroll.clientWidth,
      height: scroll.clientHeight,
    }
    try {
      event.currentTarget.setPointerCapture(event.pointerId)
    } catch {
      stop()
      return
    }
    bind('addEventListener')
  }
  return {
    down,
    stop,
    isDragging: () => !!gesture?.dragging,
    clearClick: (event: PointerEvent) => { if (!gesture) { suppressKey = undefined;canvasPress = !(event.target as Element).closest('.sol-ui-time-grid-item') } },
    lost: (event: PointerEvent) => {
      if (gesture?.id === event.pointerId) cancel('capture')
    },
    consumeClick: (event: MouseEvent, key?: TimeGridKey) => {
      const pointerClick = event.detail > 0 || ('pointerType' in event && event.pointerType === 'touch')
      if (
        pointerClick &&
        suppressKey !== undefined &&
        (key === undefined || key === suppressKey)
      ) {
        event.preventDefault()
        event.stopPropagation()
        return true
      }
      // Creation needs a press in canvas space, never a retargeted item click.
      return pointerClick && key === undefined && !canvasPress
    },
  }
}
