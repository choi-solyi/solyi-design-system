import { defineComponent, h, ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import type { PropType } from 'vue'
import { displayFieldProps, fieldDescription, fieldMessages } from './controls'
import { useSolLocale, formatSolNumber } from './locale'

export const SResizableSplitPane = /* @__PURE__ */ defineComponent({
  name: 'SResizableSplitPane',
  inheritAttrs: false,
  props: {
    ...displayFieldProps,
    modelValue: { type: Number, default: 50 },
    min: { type: Number, default: 20 },
    max: { type: Number, default: 80 },
    step: { type: Number, default: 1 },
    orientation: { type: String as PropType<'horizontal' | 'vertical'>, default: 'horizontal' },
    collapseBelow: { type: Number, default: 560 },
    primaryLabel: { type: String, required: true },
    secondaryLabel: { type: String, required: true },
  },
  emits: {
    'update:modelValue': (_v: number) => true,
    change: (_v: number) => true,
    reflow: (_stacked: boolean) => true,
  },
  setup(p, { attrs, slots, emit }) {
    const l = useSolLocale(() => p.locale)
    const host = ref<HTMLElement | null>(null)
    const layout = ref<HTMLElement | null>(null)
    const separator = ref<HTMLElement | null>(null)
    const primary = ref<HTMLElement | null>(null)
    const secondary = ref<HTMLElement | null>(null)
    const stacked = ref(false)
    let observer: ResizeObserver | undefined
    let measurementFrame: number | undefined
    let disposed = false
    let previous = 50
    let drag: {
      id: number
      start: number
      last: number
      coordinate: number
      space: number
      horizontal: boolean
      target: HTMLElement
    } | null = null

    const horizontal = () => !stacked.value && p.orientation === 'horizontal'
    const valid = () =>
      Number.isFinite(p.min) &&
      Number.isFinite(p.max) &&
      p.min >= 0 &&
      p.max <= 100 &&
      p.min < p.max &&
      Number.isFinite(p.step) &&
      p.step > 0
    const low = () => (valid() ? p.min : 0)
    const high = () =>
      valid()
        ? Number((p.min + Math.floor((p.max - p.min) / p.step + 1e-9) * p.step).toFixed(6))
        : 100
    const snap = (n: number) =>
      valid()
        ? Number(
            Math.max(
              low(),
              Math.min(high(), p.min + Math.round((n - p.min) / p.step) * p.step),
            ).toFixed(6),
          )
        : 50
    const value = () => snap(Number.isFinite(p.modelValue) ? p.modelValue : 50)

    function adjust(n: number, complete = true) {
      if (p.disabled || p.readonly || !valid()) return
      const next = snap(n)
      if (next !== p.modelValue) {
        emit('update:modelValue', next)
        if (drag) drag.last = next
        if (complete) emit('change', next)
      }
    }

    function move(e: PointerEvent) {
      if (!drag || drag.id !== e.pointerId) return
      const coordinate = drag.horizontal ? e.clientX : e.clientY
      adjust(drag.start + ((coordinate - drag.coordinate) / drag.space) * 100, false)
    }

    function finish(e?: PointerEvent, complete = true) {
      if (!drag || (e && drag.id !== e.pointerId)) return
      const old = drag
      drag = null
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', finish)
      window.removeEventListener('pointercancel', cancel)
      window.removeEventListener('blur', abort)
      try {
        old.target.releasePointerCapture?.(old.id)
      } catch {}
      if (complete && old.last !== old.start) emit('change', old.last)
    }

    function cancel(e: PointerEvent) {
      finish(e, false)
    }

    function abort() {
      finish(undefined, false)
    }

    function start(e: PointerEvent) {
      if (drag || e.button !== 0 || e.isPrimary === false || p.disabled || p.readonly || !valid()) {
        return
      }
      const rect = layout.value!.getBoundingClientRect()
      const bar = separator.value!.getBoundingClientRect()
      const axis = horizontal()
      const space = axis ? rect.width - bar.width : rect.height - bar.height
      if (space <= 0) return
      e.preventDefault()
      separator.value?.focus({ preventScroll: true })
      drag = {
        id: e.pointerId,
        start: value(),
        last: value(),
        coordinate: axis ? e.clientX : e.clientY,
        space,
        horizontal: axis,
        target: e.currentTarget as HTMLElement,
      }
      // Window listeners also cover browsers where pointer capture is unavailable or fails.
      window.addEventListener('pointermove', move)
      window.addEventListener('pointerup', finish)
      window.addEventListener('pointercancel', cancel)
      window.addEventListener('blur', abort)
      try {
        drag.target.setPointerCapture?.(e.pointerId)
      } catch {}
    }

    function measure() {
      const width = host.value?.getBoundingClientRect().width || 0
      const next = p.collapseBelow > 0 && width > 0 && width < p.collapseBelow
      if (next !== stacked.value) {
        abort()
        stacked.value = next
        emit('reflow', next)
      }
    }

    function scheduleMeasure() {
      if (disposed || measurementFrame !== undefined) return
      measurementFrame = requestAnimationFrame(() => {
        measurementFrame = undefined
        measure()
      })
    }

    function key(e: KeyboardEvent) {
      if (e.isComposing || p.disabled || p.readonly) return
      const v = value()
      const forward = horizontal() ? 'ArrowRight' : 'ArrowDown'
      const back = horizontal() ? 'ArrowLeft' : 'ArrowUp'
      let next: number | undefined
      if (e.key === forward) next = v + p.step * (e.shiftKey ? 10 : 1)
      else if (e.key === back) next = v - p.step * (e.shiftKey ? 10 : 1)
      else if (e.key === 'Home') next = low()
      else if (e.key === 'End') next = high()
      else if (e.key === 'Enter') {
        if (v > low()) {
          previous = v
          next = low()
        } else next = previous > low() ? previous : high()
      }
      if (next !== undefined) {
        e.preventDefault()
        adjust(next)
      }
    }

    watch(() => [p.disabled, p.readonly, p.orientation, p.min, p.max, p.step], abort)
    watch(
      () => p.collapseBelow,
      () => nextTick(scheduleMeasure),
    )
    watch(
      () => p.modelValue,
      async () => {
        const active = document.activeElement
        if (
          (value() === 0 && primary.value?.contains(active)) ||
          (value() === 100 && secondary.value?.contains(active))
        ) {
          await nextTick()
          separator.value?.focus()
        }
      },
    )
    onMounted(() => {
      previous = value()
      measure()
      if (typeof ResizeObserver !== 'undefined') {
        observer = new ResizeObserver(scheduleMeasure)
        if (host.value) observer.observe(host.value)
      }
      window.addEventListener('resize', scheduleMeasure)
    })
    onBeforeUnmount(() => {
      disposed = true
      if (measurementFrame !== undefined) cancelAnimationFrame(measurementFrame)
      abort()
      observer?.disconnect()
      window.removeEventListener('resize', scheduleMeasure)
    })

    return () => {
      const error = p.error || (!valid() ? l.value.invalidNumber : '')
      const v = value()
      const axis = horizontal()
      const tracks = `minmax(0,${v}fr) var(--sol-split-handle-size) minmax(0,${100 - v}fr)`
      const grid = axis ? { gridTemplateColumns: tracks } : { gridTemplateRows: tracks }
      return h(
        'div',
        {
          ...attrs,
          ref: host,
          id: p.id,
          class: ['sol-field sol-ui-split-pane', attrs.class],
          role: 'group',
          'aria-labelledby': p.id + '-label',
          'aria-describedby': fieldDescription(p, slots, error, attrs['aria-describedby']),
        },
        [
          h('div', { id: p.id + '-label', class: 'sol-label' }, slots.label?.() || p.label),
          h(
            'div',
            {
              ref: layout,
              class: ['sol-ui-pane-layout', stacked.value ? 'is-stacked' : ''],
              'data-orientation': axis ? 'horizontal' : 'vertical',
              style: grid,
            },
            [
              h(
                'section',
                {
                  ref: primary,
                  id: p.id + '-primary',
                  class: 'sol-ui-pane',
                  role: 'region',
                  'aria-labelledby': p.id + '-primary-label',
                  tabindex: -1,
                  inert: v === 0 ? '' : undefined,
                  'aria-hidden': v === 0 ? 'true' : undefined,
                },
                [
                  h('div', { id: p.id + '-primary-label', class: 'sol-label' }, p.primaryLabel),
                  slots.primary?.({ size: v, stacked: stacked.value }),
                ],
              ),
              h(
                'div',
                {
                  ref: separator,
                  role: 'separator',
                  tabindex: p.disabled || !valid() ? -1 : 0,
                  class: 'sol-ui-separator',
                  'aria-labelledby': p.id + '-primary-label',
                  'aria-controls': p.id + '-primary ' + p.id + '-secondary',
                  'aria-orientation': axis ? 'vertical' : 'horizontal',
                  'aria-valuemin': low(),
                  'aria-valuemax': high(),
                  'aria-valuenow': v,
                  'aria-valuetext': formatSolNumber(v / 100, l.value, { style: 'percent' }),
                  'aria-disabled': p.disabled || p.readonly || !valid() ? 'true' : undefined,
                  'aria-describedby': fieldDescription(p, slots, error, p.id + '-keys'),
                  onKeydown: key,
                  onPointerdown: start,
                  onLostpointercapture: cancel,
                },
                h('span', { 'aria-hidden': 'true' }),
              ),
              h(
                'section',
                {
                  ref: secondary,
                  id: p.id + '-secondary',
                  class: 'sol-ui-pane',
                  role: 'region',
                  'aria-labelledby': p.id + '-secondary-label',
                  tabindex: -1,
                  inert: v === 100 ? '' : undefined,
                  'aria-hidden': v === 100 ? 'true' : undefined,
                },
                [
                  h('div', { id: p.id + '-secondary-label', class: 'sol-label' }, p.secondaryLabel),
                  slots.secondary?.({ size: 100 - v, stacked: stacked.value }),
                ],
              ),
            ],
          ),
          h('p', { id: p.id + '-keys', class: 'sol-hint' }, [
            stacked.value ? l.value.splitStacked + ' ' : '',
            l.value.splitKeys,
          ]),
          ...fieldMessages(p, slots, error),
        ],
      )
    }
  },
})
