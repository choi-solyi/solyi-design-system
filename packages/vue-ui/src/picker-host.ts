import { computed, defineComponent, h, nextTick, onBeforeUnmount, onMounted, ref, watch, Teleport } from 'vue'
import type { Component, PropType } from 'vue'
import { VOverlay } from 'vuetify/components/VOverlay'
import { useFloatingPanel } from './floating'

// Private until the Date/Time opt-in adapters export their public contracts.
export type PickerPresentation = 'auto' | 'popover' | 'dialog'
export type PickerPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
export type PickerHostCloseReason = 'escape' | 'outside'
export interface PickerHostHandle { content(): HTMLElement | null }
const locations = { 'bottom-start': 'bottom start', 'bottom-end': 'bottom end', 'top-start': 'top start', 'top-end': 'top end' } as const

/** Reuses Vuetify's connected location, stack, focus trap and owned scroll locks. */
export const PickerHost = /* @__PURE__ */ defineComponent({
  name: 'SolInternalPickerHost',
  inheritAttrs: false,
  props: {
    open: Boolean,
    id: { type: String, required: true },
    labelledby: { type: String, required: true },
    describedby: String,
    anchor: Object as PropType<HTMLElement | null>,
    returnFocus: Object as PropType<HTMLElement | null>,
    presentation: { type: String as PropType<PickerPresentation>, default: 'auto' },
    placement: { type: String as PropType<PickerPlacement>, default: 'bottom-start' },
    width: { type: String, default: 'max-content' },
    panelClass: String,
    initialFocus: Function as PropType<() => HTMLElement | null | undefined>,
    focusOnOpen: { type: Boolean, default: true },
  },
  emits: {
    requestClose: (_reason: PickerHostCloseReason) => true,
    ready: (_mode: 'popover' | 'dialog') => true,
  },
  setup(p, { slots, emit, expose }) {
    const overlay = ref<InstanceType<typeof VOverlay> | null>(null),
      narrow = ref(false),
      bridge = ref<HTMLDialogElement | null>(null),
      nativePanel = ref<HTMLElement | null>(null),
      supportsPopover = ref(true),
      offset = ref(0),
      margin = ref<number>(),
      viewport = ref<{top:number;left:number;width:number;height:number} | null>(null),
      nativeParent = computed(() => p.anchor?.closest('dialog') ?? null),
      mode = computed(() => nativeParent.value && !supportsPopover.value ? 'dialog' : p.presentation === 'auto' ? narrow.value ? 'dialog' : 'popover' : p.presentation),
      nativePopover = computed(() => !!nativeParent.value && p.open && mode.value === 'popover'),
      nativeAnchor = computed(() => p.anchor ?? null),
      attach = computed(() => nativeParent.value ? true : mode.value === 'popover' ? p.anchor?.closest('.v-overlay__content') || false : false)
    const { position: nativePosition, locate: locateNative } = useFloatingPanel(nativePopover, nativeAnchor, nativePanel, false, true, {
      manageNative: false, placement: () => p.placement, gap: () => offset.value,
      margin: () => margin.value, visualViewport: true,
    })
    let media: MediaQueryList | undefined, disposed = false, revision = 0, frame = 0,
      restore = true, requested = false, switching = false
    const content = () => overlay.value?.contentEl ?? null
    const top = () => !!overlay.value?.globalTop && !!overlay.value?.localTop
    const owned = (target: EventTarget | null) => target instanceof Node &&
      (!!content()?.contains(target) || target === p.anchor || !!p.anchor?.contains(target))
    function returnFocus() {
      const target = p.returnFocus || p.anchor
      if (target?.isConnected && !target.matches(':disabled,[aria-disabled="true"]')) target.focus({ preventScroll: true })
    }
    function request(reason: PickerHostCloseReason) {
      if (disposed || !p.open || requested || !top()) return
      requested = true
      restore = reason !== 'outside'
      emit('requestClose', reason)
      void nextTick(() => { requested = false })
    }
    function escape(event: KeyboardEvent) {
      if (event.isComposing || event.key !== 'Escape' || !p.open || !top()) return
      // Native parent dialogs must not consume the same Escape after this child.
      event.preventDefault()
      event.stopImmediatePropagation()
      request('escape')
    }
    function outsideFocus(event: FocusEvent) {
      if (!switching && p.open && mode.value === 'popover' && !owned(event.target)) request('outside')
    }
    function reveal() {
      const panel = content(), target = document.activeElement
      if (!p.open || !top() || !panel || !(target instanceof HTMLElement) || target === panel || !panel.contains(target)) return
      const box = panel.getBoundingClientRect(), field = target.getBoundingClientRect(), padding = parseFloat(getComputedStyle(panel).paddingBlockStart) || 0
      if (field.top < box.top + padding) panel.scrollTop += field.top - box.top - padding
      else if (field.bottom > box.bottom - padding) panel.scrollTop += field.bottom - box.bottom + padding
    }
    function focusout(event: FocusEvent) {
      if (switching || mode.value !== 'popover') return
      if (event.relatedTarget && owned(event.relatedTarget)) return
      void nextTick(() => {
        if (!switching && p.open && mode.value === 'popover' && !owned(document.activeElement)) request('outside')
      })
    }
    const outsideWindow = () => { if (!switching && mode.value === 'popover') request('outside') }
    function closeBridge() {
      const element = bridge.value
      if (!element) return
      try { if (element.matches(':popover-open')) element.hidePopover() } catch { /* No Popover API in the modal fallback. */ }
      if (element.open) element.close()
    }
    function syncBridge() {
      const element = bridge.value
      if (!nativeParent.value || !element) return
      const popover = mode.value === 'popover'
      if (popover ? element.matches(':popover-open') : element.open) return
      closeBridge()
      if (popover) element.showPopover()
      else element.showModal()
    }
    async function ready(initial: boolean, previous: Element | null) {
      const current = ++revision
      cancelAnimationFrame(frame)
      await nextTick()
      if (disposed || !p.open || current !== revision) return
      switching = true
      syncBridge()
      nativePanel.value = content()
      let attempts = 0
      const check = () => {
        if (disposed || !p.open || current !== revision) return
        const panel = content()
        if (!panel?.isConnected || !panel.getClientRects().length || getComputedStyle(panel).visibility === 'hidden') {
          if (++attempts < 10) frame = requestAnimationFrame(check)
          return
        }
        const style = getComputedStyle(panel)
        offset.value = parseFloat(style.paddingBlockStart) || 0
        margin.value = parseFloat(style.scrollMarginBlockStart) || undefined
        void nextTick(async () => {
          if (disposed || !p.open || current !== revision) return
          if (nativePopover.value) locateNative()
          else overlay.value?.updateLocation?.(new Event('resize'))
          await nextTick()
          if (!disposed && p.open && current === revision) reveal()
        })
        const active = document.activeElement
        const previousInside = !initial && previous instanceof HTMLElement && previous.isConnected && panel.contains(previous)
        if ((!initial || p.focusOnOpen || mode.value === 'dialog') && (previousInside || initial || !panel.contains(active)) &&
          (active === previous || active === document.body || owned(active))) {
          const target = previousInside ? previous : p.initialFocus?.()
          ;(target?.isConnected && panel.contains(target) ? target : panel).focus({ preventScroll: true })
        }
        emit('ready', mode.value)
        switching = false
      }
      frame = requestAnimationFrame(check)
    }
    watch(() => p.open, (value, old) => {
      if (value) {
        restore = true
        requested = false
        void ready(true, document.activeElement)
      } else if (old) {
        revision++
        cancelAnimationFrame(frame)
        const previous = document.activeElement, inside = !!content()?.contains(previous)
        switching = true
        closeBridge()
        const nativeRestored = nativeParent.value ? document.activeElement : null
        nativePanel.value = null
        void nextTick(() => {
          if (!disposed && restore && inside && (document.activeElement === previous || document.activeElement === document.body || document.activeElement === nativeRestored)) returnFocus()
          switching = false
        })
      }
    })
    watch(mode, () => { if (p.open) void ready(false, document.activeElement) })
    const mediaChanged = () => { narrow.value = !!media?.matches }
    const viewportChanged = () => {
      const visible = window.visualViewport
      viewport.value = { top: visible?.offsetTop || 0, left: visible?.offsetLeft || 0, width: visible?.width || window.innerWidth, height: visible?.height || window.innerHeight }
      void nextTick(reveal)
    }
    onMounted(() => {
      // Matches the existing library's narrow layout breakpoint; no new public breakpoint API.
      media = window.matchMedia('(max-width: 680px)')
      supportsPopover.value = typeof HTMLElement.prototype.showPopover === 'function'
      viewportChanged()
      mediaChanged()
      media.addEventListener('change', mediaChanged)
      window.addEventListener('keydown', escape, true)
      document.addEventListener('focusin', outsideFocus)
      window.addEventListener('resize', viewportChanged)
      window.addEventListener('blur', outsideWindow)
      window.visualViewport?.addEventListener('resize', viewportChanged)
      window.visualViewport?.addEventListener('scroll', viewportChanged)
      if (p.open) void ready(true, document.activeElement)
    })
    onBeforeUnmount(() => {
      disposed = true
      revision++
      cancelAnimationFrame(frame)
      media?.removeEventListener('change', mediaChanged)
      window.removeEventListener('keydown', escape, true)
      document.removeEventListener('focusin', outsideFocus)
      window.removeEventListener('resize', viewportChanged)
      window.removeEventListener('blur', outsideWindow)
      window.visualViewport?.removeEventListener('resize', viewportChanged)
      window.visualViewport?.removeEventListener('scroll', viewportChanged)
      if (p.open && content()?.contains(document.activeElement)) returnFocus()
      closeBridge()
    })
    expose({ content } satisfies PickerHostHandle)
    const renderOverlay = () => h(VOverlay as Component, {
      ref: overlay,
      modelValue: p.open,
      'onUpdate:modelValue': (value: boolean) => { if (!value) request('outside') },
      activator: p.returnFocus || p.anchor || undefined,
      target: p.anchor || undefined,
      attach: attach.value,
      openOnClick: false, openOnFocus: false, openOnHover: false,
      closeOnContentClick: false, closeOnBack: false,
      persistent: true, noClickAnimation: true, transition: false,
      scrim: mode.value === 'dialog',
      captureFocus: mode.value === 'dialog', retainFocus: mode.value === 'dialog',
      scrollStrategy: mode.value === 'dialog' ? 'block' : 'reposition',
      locationStrategy: mode.value === 'dialog' || nativePopover.value ? 'static' : 'connected',
      location: mode.value === 'dialog' ? 'center center' : locations[p.placement],
      offset: offset.value, viewportMargin: margin.value,
      width: p.width,
      maxWidth: `calc(${viewport.value ? viewport.value.width + 'px' : '100vw'} - 2 * var(--sol-space-4))`,
      maxHeight: `calc(${viewport.value ? viewport.value.height + 'px' : '100dvh'} - 2 * var(--sol-space-4))`,
      class: 'sol-ui-picker-host',
      style: mode.value === 'dialog' && viewport.value ? {top:viewport.value.top+'px',left:viewport.value.left+'px',width:viewport.value.width+'px',height:viewport.value.height+'px',right:'auto',bottom:'auto'} : undefined,
      contentClass: ['sol-ui-picker-host-panel', p.panelClass],
      contentProps: {
        id: p.id, role: nativeParent.value ? undefined : 'dialog', tabindex: -1,
        'aria-labelledby': nativeParent.value ? undefined : p.labelledby,
        'aria-describedby': nativeParent.value ? undefined : p.describedby,
        'aria-modal': nativeParent.value ? undefined : String(mode.value === 'dialog'),
        'data-picker-presentation': mode.value,
        style: nativePopover.value ? { ...nativePosition.value, position: 'fixed' } : undefined,
        onFocusout: focusout,
        onFocusin: () => void nextTick(reveal),
      },
      'onClick:outside': () => request('outside'),
    } satisfies Partial<InstanceType<typeof VOverlay>['$props']>, () => slots.default?.())
    return () => nativeParent.value ? h(Teleport, { to: nativeParent.value }, [
      h('dialog', { ref: bridge, popover: 'manual', role: 'dialog', 'aria-labelledby': p.labelledby, 'aria-describedby': p.describedby, 'aria-modal': String(mode.value === 'dialog'), class: 'sol-ui-picker-native-host', onCancel: (event: Event) => event.preventDefault() }, renderOverlay()),
    ]) : renderOverlay()
  },
})
