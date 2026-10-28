import type { SortableKey } from './sortable-values'

type PointerCancel =
  'pointercancel' | 'capture' | 'escape' | 'tab' | 'blur' | 'outside' | 'external'
interface Options {
  list(): HTMLElement | null
  row(key: SortableKey): HTMLElement | undefined
  keys(): readonly SortableKey[]
  enabled(): boolean
  begin(key: SortableKey): boolean
  move(to: number): void
  finish(): void
  cancel(reason: PointerCancel, restore?: boolean): void
}
interface Press {
  id: number
  key: SortableKey
  target: HTMLElement
  startY: number
  x: number
  y: number
  threshold: number
  rowHeight: number
  started: boolean
  guard: () => boolean
  scroll: HTMLElement | Window
}

/** Dedicated handles only; source rows stay in place so hit geometry cannot chase a preview. */
export function createSortablePointer(options: Options) {
  let current: Press | undefined,
    frame = 0,
    lastFrame = 0,
    ignoredTarget: HTMLElement | undefined,
    ignoreUntil = 0
  function scrollParent(element: HTMLElement): HTMLElement | Window {
    for (let parent = element.parentElement; parent; parent = parent.parentElement) {
      if (parent === document.documentElement || parent === document.body) break
      if (
        /auto|scroll/.test(getComputedStyle(parent).overflowY) &&
        parent.scrollHeight > parent.clientHeight
      )
        return parent
    }
    return window
  }
  function bounds(press: Press) {
    let top = 0,
      bottom = window.innerHeight
    const list = options.list(),
      box = list?.getBoundingClientRect()
    if (!list || !box) return undefined
    // Every clipping ancestor contributes to the visible hit/scroll area.
    for (let parent = list.parentElement; parent; parent = parent.parentElement) {
      if (parent === document.documentElement || parent === document.body) break
      if (/auto|scroll|hidden|clip/.test(getComputedStyle(parent).overflowY)) {
        const rect = parent.getBoundingClientRect()
        top = Math.max(top, rect.top + parent.clientTop)
        bottom = Math.min(bottom, rect.top + parent.clientTop + parent.clientHeight)
      }
    }
    const target = press.scroll
    if (target !== window) {
      const element = target as HTMLElement,
        rect = element.getBoundingClientRect()
      top = Math.max(top, rect.top + element.clientTop)
      bottom = Math.min(bottom, rect.top + element.clientTop + element.clientHeight)
    }
    return { top, bottom, left: box.left, right: box.right }
  }
  function stop(suppress = true) {
    const previous = current
    current = undefined
    if (frame) cancelAnimationFrame(frame)
    frame = 0
    lastFrame = 0
    window.removeEventListener('pointermove', move, true)
    window.removeEventListener('pointerup', up, true)
    window.removeEventListener('pointercancel', pointerCancel, true)
    window.removeEventListener('keydown', keydown, true)
    previous?.target.removeEventListener('lostpointercapture', capture)
    if (previous) {
      if (suppress) {
        ignoredTarget = previous.target
        ignoreUntil = performance.now() + 500
      }
      try {
        if (previous.target.hasPointerCapture(previous.id))
          previous.target.releasePointerCapture(previous.id)
      } catch {
        /* Browser already released capture. */
      }
    }
  }
  function valid() {
    return !!current && options.enabled() && current.guard()
  }
  function hit(press: Press) {
    const viewport = bounds(press)
    if (
      !viewport ||
      viewport.bottom <= viewport.top ||
      press.x < viewport.left ||
      press.x > viewport.right
    )
      return
    const y = Math.max(viewport.top, Math.min(press.y, viewport.bottom))
    let to = 0
    for (const key of options.keys()) {
      if (key === press.key) continue
      const row = options.row(key)
      if (!row) continue
      const rect = row.getBoundingClientRect()
      if (y >= rect.top + rect.height / 2) to++
    }
    options.move(to)
  }
  function scroll(now: number) {
    frame = 0
    const press = current
    if (!press?.started) return
    if (!valid()) {
      options.cancel('external')
      return
    }
    const viewport = bounds(press)
    if (
      !viewport ||
      viewport.bottom <= viewport.top ||
      press.x < viewport.left ||
      press.x > viewport.right
    ) {
      lastFrame = 0
      return
    }
    const edge = Math.min(press.rowHeight, Math.max(1, (viewport.bottom - viewport.top) / 3))
    const pressure =
      press.y < viewport.top + edge
        ? -Math.min(1, (viewport.top + edge - press.y) / edge)
        : press.y > viewport.bottom - edge
          ? Math.min(1, (press.y - viewport.bottom + edge) / edge)
          : 0
    if (!pressure) {
      lastFrame = 0
      return
    }
    const delta =
      (pressure * press.rowHeight * 8 * Math.min(32, lastFrame ? now - lastFrame : 16)) / 1000
    lastFrame = now
    let before: number, after: number
    if (press.scroll === window) {
      before = window.scrollY
      window.scrollBy(0, delta)
      after = window.scrollY
    } else {
      const element = press.scroll as HTMLElement
      before = element.scrollTop
      element.scrollTop += delta
      after = element.scrollTop
    }
    hit(press)
    if (current === press && before !== after) frame = requestAnimationFrame(scroll)
  }
  function move(event: PointerEvent) {
    const press = current
    if (!press || press.id !== event.pointerId) return
    event.preventDefault()
    if (!valid()) {
      options.cancel('external')
      return
    }
    press.x = event.clientX
    press.y = event.clientY
    if (!press.started) {
      if (Math.abs(press.y - press.startY) < press.threshold) return
      press.started = true
      if (!options.begin(press.key)) {
        stop()
        return
      }
      if (current !== press) return
    }
    hit(press)
    if (current === press && !frame) frame = requestAnimationFrame(scroll)
  }
  function up(event: PointerEvent) {
    const press = current
    if (!press || press.id !== event.pointerId) return
    move(event)
    if (current !== press) return
    const viewport = bounds(press)
    if (press.started) {
      event.preventDefault()
      if (!viewport || press.x < viewport.left || press.x > viewport.right)
        options.cancel('outside')
      else options.finish()
    } else stop()
  }
  function pointerCancel(event: PointerEvent) {
    if (event.pointerId === current?.id) options.cancel('pointercancel')
  }
  function capture(event: Event) {
    if ((event as PointerEvent).pointerId === current?.id) options.cancel('capture')
  }
  function keydown(event: KeyboardEvent) {
    if (!current || event.isComposing) return
    if (event.key === 'Escape') {
      event.preventDefault()
      event.stopImmediatePropagation()
      options.cancel('escape')
    } else if (event.key === 'Tab') options.cancel('tab', false)
    else if ([' ', 'Enter', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
      event.preventDefault()
      event.stopImmediatePropagation()
    }
  }
  function press(event: PointerEvent, key: SortableKey, guard: () => boolean) {
    if (event.button !== 0 || event.isPrimary === false || !options.enabled()) return
    const target = event.currentTarget as HTMLElement,
      list = options.list(),
      row = options.row(key)
    if (!list || !row) return
    event.preventDefault()
    event.stopPropagation()
    stop()
    const rect = target.getBoundingClientRect(),
      height = row.getBoundingClientRect().height
    const pending: Press = {
      id: event.pointerId,
      key,
      target,
      startY: event.clientY,
      x: event.clientX,
      y: event.clientY,
      threshold: Math.max(1, (rect.height || 40) / 8),
      rowHeight: height || rect.height || 40,
      started: false,
      guard,
      scroll: scrollParent(list),
    }
    current = pending
    window.addEventListener('pointermove', move, { capture: true, passive: false })
    window.addEventListener('pointerup', up, true)
    window.addEventListener('pointercancel', pointerCancel, true)
    window.addEventListener('keydown', keydown, true)
    target.addEventListener('lostpointercapture', capture)
    try {
      target.setPointerCapture(event.pointerId)
    } catch {
      /* Window listeners still support mouse when capture is unavailable. */
    }
    target.focus({ preventScroll: true })
  }
  return {
    press,
    stop,
    valid,
    pending: () => !!current,
    active: () => !!current?.started,
    key: () => current?.key,
    consumeClick: (event: MouseEvent) =>
      event.detail > 0 && event.currentTarget === ignoredTarget && performance.now() < ignoreUntil,
  }
}
