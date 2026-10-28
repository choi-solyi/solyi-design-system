import { ref } from 'vue'

export interface SolTimeInteraction {
  source: 'input' | 'list'
  input: 'pointer' | 'keyboard'
  previousValue: string | null
  value: string
}
export type SolTimeCancelReason = 'escape' | 'pointercancel' | 'capture' | 'blur' | 'disabled' | 'configuration' | 'external' | 'close' | 'unmount'
export interface SolTimeInteractionCancel extends SolTimeInteraction { reason: SolTimeCancelReason }

type Source = SolTimeInteraction['source']
interface Session {
  source: Source
  input: SolTimeInteraction['input']
  choices: readonly string[]
  previousValue: string | null
  index: number
  pointerId?: number
  target?: HTMLElement
  y: number
  remainder: number
  pixels: number
  changed: boolean
  restore: () => void
}
interface ScrubOptions {
  choices(): readonly string[]
  value(): string | null
  disabled(source: Source): boolean
  pixels(): number
  start(source: Source): () => void
  preview(value: SolTimeInteraction): void
  commit(value: SolTimeInteraction): void
  cancel(value: SolTimeInteractionCancel): void
  listIndex?(event: PointerEvent): number | undefined
  listMove?(event: PointerEvent): void
  stop?(): void
}

/** A proposal never changes the form draft. Only finish() may request a commit. */
export function createTimeScrub(options: ScrubOptions) {
  const active = ref(false), preview = ref<string>(), source = ref<Source>()
  let session: Session | undefined
  const payload = (current: Session): SolTimeInteraction => ({ source: current.source, input: current.input, previousValue: current.previousValue, value: current.choices[current.index]! })
  function cleanup() {
    const current = session
    session = undefined; active.value = false; preview.value = undefined; source.value = undefined
    window.removeEventListener('pointermove', move, true); window.removeEventListener('pointerup', up, true)
    window.removeEventListener('pointercancel', pointerCancel, true); window.removeEventListener('blur', blur)
    window.removeEventListener('keydown', escape, true); window.removeEventListener('keyup', keyup, true)
    document.removeEventListener('visibilitychange', visibility)
    current?.target?.removeEventListener('lostpointercapture', capture)
    if (current?.pointerId !== undefined) {
      try { if (current.target?.hasPointerCapture(current.pointerId)) current.target.releasePointerCapture(current.pointerId) } catch { /* Already released by the browser. */ }
    }
    options.stop?.()
    return current
  }
  function cancel(reason: SolTimeCancelReason, restore = true) {
    if (!session) return
    const current = cleanup()!
    options.cancel({ ...payload(current), reason })
    if (restore) current.restore()
  }
  function valid() {
    if (!session) return false
    if (options.disabled(session.source)) { cancel('disabled', false); return false }
    if (session.choices !== options.choices()) { cancel('configuration'); return false }
    return true
  }
  function propose(index: number, initial = false) {
    if (!valid()) return
    const current = session!, next = Math.max(0, Math.min(current.choices.length - 1, index))
    if (next === current.index && !initial) return
    current.index = next; current.changed = true; preview.value = current.choices[next]
    options.preview(payload(current))
  }
  function finish() {
    if (!valid()) return
    const current = cleanup()!
    if (current.changed) options.commit(payload(current))
  }
  function begin(where: Source, input: Session['input'], initial: string | undefined) {
    if (options.disabled(where) || !options.choices().length) return false
    cancel('close', false)
    if (options.disabled(where) || !options.choices().length) return false
    const choices = options.choices(), pixels = options.pixels()
    session = { source: where, input, choices, previousValue: options.value(), index: Math.max(0, choices.indexOf(initial ?? '')), y: 0, remainder: 0,
      pixels: Number.isFinite(pixels) && pixels > 0 ? pixels : 10, changed: false, restore: () => {} }
    active.value = true; source.value = where
    window.addEventListener('blur', blur); window.addEventListener('keydown', escape, true)
    document.addEventListener('visibilitychange', visibility)
    // The caller can move focus now: its input blur must see active=true.
    const current = session, restore = options.start(where)
    if (session !== current) return false
    current.restore = restore
    return true
  }
  function pointer(event: PointerEvent, where: Source, initial: string | undefined) {
    if (event.button !== 0 || event.isPrimary === false || options.disabled(where)) return
    event.preventDefault(); event.stopPropagation()
    if (!begin(where, 'pointer', initial)) return
    const current = session!
    current.pointerId = event.pointerId; current.target = event.currentTarget as HTMLElement; current.y = event.clientY
    current.target.addEventListener('lostpointercapture', capture)
    window.addEventListener('pointermove', move, { capture: true, passive: false })
    window.addEventListener('pointerup', up, true); window.addEventListener('pointercancel', pointerCancel, true)
    try { current.target.setPointerCapture(event.pointerId) } catch { /* Window listeners retain mouse support when capture is unavailable. */ }
    if (where === 'list') propose(current.index, true)
  }
  function move(event: PointerEvent) {
    if (!session || event.pointerId !== session.pointerId || !valid()) return
    event.preventDefault()
    const current = session!
    if (current.source === 'list') {
      const index = options.listIndex?.(event)
      if (index !== undefined) propose(index)
      if (session) options.listMove?.(event)
      return
    }
    current.remainder += current.y - event.clientY; current.y = event.clientY
    const steps = Math.trunc(current.remainder / current.pixels)
    if (!steps) return
    current.remainder -= steps * current.pixels
    const target = current.index + steps
    if (target < 0 || target >= current.choices.length) current.remainder = 0
    propose(target)
  }
  function up(event: PointerEvent) {
    if (!session || event.pointerId !== session.pointerId) return
    move(event); if (session) { event.preventDefault(); finish() }
  }
  function pointerCancel(event: PointerEvent) { if (event.pointerId === session?.pointerId) cancel('pointercancel') }
  function capture(event: Event) { if ((event as PointerEvent).pointerId === session?.pointerId) cancel('capture') }
  function blur() { cancel('blur', false) }
  function visibility() { if (document.hidden) cancel('blur', false) }
  function escape(event: KeyboardEvent) {
    if (event.key === 'Escape' && !event.isComposing && session) { event.preventDefault(); event.stopImmediatePropagation(); cancel('escape') }
  }
  const keys = new Set(['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft', 'PageUp', 'PageDown', 'Home', 'End'])
  function keyboard(event: KeyboardEvent, initial: string | undefined) {
    if (event.isComposing || event.altKey || event.ctrlKey || event.metaKey || !keys.has(event.key)) return
    if (options.disabled('input')) return
    event.preventDefault(); event.stopPropagation()
    if (session?.input === 'pointer') return
    if (!session && !begin('input', 'keyboard', initial)) return
    window.addEventListener('keyup', keyup, true)
    const current = session!, step = event.shiftKey ? 10 : 1
    const index = event.key === 'Home' ? 0 : event.key === 'End' ? current.choices.length - 1 : current.index +
      (event.key === 'PageUp' ? 10 : event.key === 'PageDown' ? -10 : ['ArrowUp', 'ArrowRight'].includes(event.key) ? step : -step)
    propose(index, !current.changed)
  }
  function keyup(event: KeyboardEvent) {
    if (session?.input === 'keyboard' && keys.has(event.key)) { event.preventDefault(); event.stopPropagation(); finish() }
  }
  return { active, preview, source, pointer, keyboard, cancel, propose, blur }
}
