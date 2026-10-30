import { computed, defineComponent, h, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import type { PropType, SlotsType, VNode } from 'vue'
import { parseDateOnly } from '@solyi/core/date'
import { solIconPaths } from '@solyi/core/icons'
import type { SolIconName } from '@solyi/core/icons'
import type { SolCategoryId } from '@solyi/core'
import { displayFieldProps, fieldDescription, fieldMessages } from './controls'
import { formatSolDate, useSolLocale, withVisibleNumberLabel } from './locale'
import { SBadge, SIcon } from './primitives'
import type { SolTone } from './primitives'
import {
  calendarMonthLayout,
  calendarMonthOf,
  initialCalendarDate,
  navigateCalendarDate,
  shiftCalendarMonth,
} from './month-calendar-values'
import type { CalendarNavigationKey, CalendarWeekStart } from './month-calendar-values'

export type SolCalendarWeekStart = CalendarWeekStart

export interface SolCalendarMarker {
  readonly id: string
  readonly label: string
  readonly tone?: SolTone
  readonly icon?: SolIconName
  readonly category?: SolCategoryId
}
const markerCategoryStyle = (marker: Readonly<SolCalendarMarker>) =>
  marker.tone === undefined && marker.category
    ? {
        '--sol-tag-fg': `var(--sol-color-categorical-${marker.category.slice(1)}-foreground)`,
        '--sol-tag-bg': `var(--sol-color-categorical-${marker.category.slice(1)}-background)`,
        borderColor: `var(--sol-color-categorical-${marker.category.slice(1)}-border)`,
      }
    : undefined
export type SolCalendarMarkers = Readonly<Record<string, readonly SolCalendarMarker[]>>
export interface SolCalendarCellScope {
  date: string
  day: number
  selected: boolean
  today: boolean
  disabled: boolean
  markers: readonly SolCalendarMarker[]
}
export interface SolCalendarMarkerScope {
  date: string
  marker: Readonly<SolCalendarMarker>
  index: number
}
export interface SolMonthCalendarSlots {
  cell?: (scope: SolCalendarCellScope) => VNode[]
  marker?: (scope: SolCalendarMarkerScope) => VNode[]
  empty?: () => VNode[]
  help?: () => VNode[]
}
export type SolMonthChangeReason = 'previous' | 'next' | 'today' | 'keyboard'
export interface SolMonthChange {
  month: string
  previousMonth: string
  reason: SolMonthChangeReason
}
export interface SolCalendarChange {
  value: string
  previousValue: string | null
  reason: 'pointer' | 'keyboard'
}
export interface SolMonthCalendarHandle {
  focus(date?: string): void
}

const tones = new Set(['neutral', 'accent', 'info', 'success', 'warning', 'danger'])
const navigation = new Set([
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'Home',
  'End',
  'PageUp',
  'PageDown',
])
function localToday() {
  const now = new Date()
  return `${String(now.getFullYear()).padStart(4, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

/** Standalone controlled calendar; no form normalization, data fetching or timezone conversion. */
export const SMonthCalendar = /* @__PURE__ */ defineComponent({
  name: 'SMonthCalendar',
  inheritAttrs: false,
  props: {
    ...displayFieldProps,
    modelValue: { type: String as PropType<string | null>, default: null },
    month: { type: String, required: true },
    firstDay: Number as PropType<CalendarWeekStart>,
    today: String,
    markers: { type: Object as PropType<SolCalendarMarkers>, default: () => ({}) },
    markerLimit: { type: Number, default: 2 },
    isDateDisabled: Function as PropType<(date: string) => boolean>,
    loading: Boolean,
  },
  slots: Object as SlotsType<SolMonthCalendarSlots>,
  emits: {
    'update:modelValue': (_value: string) => true,
    'update:month': (_month: string) => true,
    change: (_value: SolCalendarChange) => true,
    'month-change': (_value: SolMonthChange) => true,
  },
  setup(p, { attrs, slots, emit, expose }) {
    const l = useSolLocale(() => p.locale),
      host = ref<HTMLElement | null>(null),
      details = ref<HTMLElement | null>(null),
      buttons = new Map<string, HTMLButtonElement>()
    const mountedToday = localToday(),
      today = computed(() => (p.today === undefined ? mountedToday : p.today))
    const firstDay = computed(() => (p.firstDay === undefined ? l.value.firstDay : p.firstDay))
    const layout = computed(() => calendarMonthLayout(p.month, firstDay.value))
    const active = ref(initialCalendarDate(p.month, p.modelValue, today.value))
    let disposed = false,
      pending: { month: string; date: string; origin: Element | null } | undefined
    const state = computed(() => {
      const grid = layout.value,
        days = new Map<string, { disabled: boolean; markers: readonly SolCalendarMarker[] }>()
      let invalid =
        !grid.valid ||
        (p.modelValue !== null && !parseDateOnly(p.modelValue)) ||
        !parseDateOnly(today.value) ||
        !Number.isSafeInteger(p.markerLimit) ||
        p.markerLimit < 0 ||
        !p.markers ||
        typeof p.markers !== 'object' ||
        Array.isArray(p.markers)
      if (grid.valid)
        for (const cell of grid.cells) {
          if (!cell) continue
          try {
            const disabled = p.isDateDisabled ? p.isDateDisabled(cell.iso) : false
            const raw = p.markers?.[cell.iso] ?? [],
              ids = new Set<string>()
            if (typeof disabled !== 'boolean' || !Array.isArray(raw))
              throw Error('Invalid calendar data')
            const markers = raw.map((marker: SolCalendarMarker) => {
              if (
                !marker ||
                typeof marker.id !== 'string' ||
                !marker.id.trim() ||
                ids.has(marker.id) ||
                typeof marker.label !== 'string' ||
                !marker.label.trim() ||
                (marker.tone !== undefined && !tones.has(marker.tone)) ||
                (marker.icon !== undefined && !Object.hasOwn(solIconPaths, marker.icon)) ||
                (marker.category !== undefined && (typeof marker.category !== 'string' || !/^c[1-8]$/.test(marker.category)))
              )
                throw Error('Invalid calendar marker')
              ids.add(marker.id)
              return Object.freeze({
                id: marker.id,
                label: marker.label,
                tone: marker.tone,
                icon: marker.icon,
                category: marker.category,
              })
            })
            days.set(cell.iso, { disabled, markers: Object.freeze(markers) })
          } catch {
            invalid = true
            days.set(cell.iso, { disabled: true, markers: [] })
          }
        }
      return { invalid, days, hasMarkers: [...days.values()].some((day) => day.markers.length > 0) }
    })
    const unavailable = (date: string) =>
      !!(
        p.disabled ||
        p.readonly ||
        p.loading ||
        state.value.invalid ||
        state.value.days.get(date)?.disabled
      )
    function focusDate(date: string | null, origin: Element | null = null) {
      pending = undefined
      if (date && calendarMonthOf(date) === p.month) active.value = date
      void nextTick(() => {
        if (disposed || p.disabled) return
        const current = document.activeElement
        if (
          origin &&
          current &&
          current !== document.body &&
          current !== origin &&
          !host.value?.contains(current)
        )
          return
        const button = active.value ? buttons.get(active.value) : undefined
        if (button && !button.disabled) {
          button.focus({ preventScroll: true })
          button.scrollIntoView?.({ block: 'nearest', inline: 'nearest' })
        } else host.value?.focus({ preventScroll: true })
      })
    }
    function requestMonth(month: string | null, reason: SolMonthChangeReason, date?: string) {
      if (p.disabled || !layout.value.valid || !month) return
      if (month === p.month) {
        if (date) focusDate(date, document.activeElement)
        return
      }
      pending = date ? { month, date, origin: document.activeElement } : undefined
      const previousMonth = p.month
      emit('update:month', month)
      emit('month-change', { month, previousMonth, reason })
    }
    function changeYear(input: HTMLInputElement) {
      const value = Number(input.value), previous = Number(p.month.slice(0, 4))
      if (/^\d{1,4}$/.test(input.value) && Number.isInteger(value) && value >= 1 && value <= 9999)
        requestMonth(String(value).padStart(4, '0') + p.month.slice(4), value < previous ? 'previous' : 'next')
      void nextTick(() => { input.value = p.month.slice(0, 4) })
    }
    function choose(date: string, reason: SolCalendarChange['reason']) {
      if (unavailable(date)) return
      pending = undefined
      active.value = date
      if (reason === 'pointer' && state.value.days.get(date)?.markers.length) void nextTick(() => {
        if (disposed) return
        details.value?.focus({ preventScroll: true })
        details.value?.scrollIntoView?.({ block: 'nearest' })
      })
      if (date === p.modelValue) return
      const previousValue = p.modelValue
      emit('update:modelValue', date)
      emit('change', { value: date, previousValue, reason })
    }
    function key(event: KeyboardEvent, date: string) {
      if (event.isComposing || event.altKey || event.ctrlKey || event.metaKey || p.disabled) return
      if (navigation.has(event.key)) {
        event.preventDefault()
        const target = navigateCalendarDate(
          date,
          event.key as CalendarNavigationKey,
          firstDay.value,
          event.shiftKey,
        )
        if (!target) return
        if (calendarMonthOf(target) === p.month) focusDate(target, event.currentTarget as Element)
        else requestMonth(calendarMonthOf(target), 'keyboard', target)
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        if (!event.repeat) choose(date, 'keyboard')
      } else if (event.key === 'Escape') {
        event.preventDefault()
        focusDate(
          initialCalendarDate(p.month, p.modelValue, today.value),
          event.currentTarget as Element,
        )
      }
    }
    watch(
      () => p.month,
      () => {
        const intent = pending
        pending = undefined
        active.value =
          intent?.month === p.month
            ? intent.date
            : initialCalendarDate(p.month, p.modelValue, today.value)
        if (intent?.month === p.month) focusDate(intent.date, intent.origin)
      },
      { flush: 'post' },
    )
    watch(
      () => p.modelValue,
      () => {
        if (!host.value?.contains(document.activeElement))
          active.value = initialCalendarDate(p.month, p.modelValue, today.value)
      },
    )
    watch(
      () => p.disabled,
      (disabled) => {
        if (disabled) pending = undefined
      },
    )
    onBeforeUnmount(() => {
      disposed = true
      pending = undefined
      buttons.clear()
    })
    expose({ focus: (date?: string) => focusDate(date ?? active.value) })
    return () => {
      const grid = layout.value,
        error = p.error || (state.value.invalid ? l.value.monthCalendarInvalid! : ''),
        busy = p.loading
      const empty = !busy && !state.value.hasMarkers && !state.value.invalid
      const description = fieldDescription(
        p,
        slots,
        error,
        [
          p.id + '-keys',
          empty ? p.id + '-empty' : '',
          busy ? p.id + '-loading' : '',
          p.readonly ? p.id + '-readonly' : '',
          attrs['aria-describedby'],
        ]
          .filter(Boolean)
          .join(' '),
      )
      const monthName = grid.valid
        ? formatSolDate(p.month + '-01', l.value, {
            year: 'numeric',
            month: 'long',
            day: undefined,
          })
        : p.month
      const nav = (direction: -1 | 1) =>
        h(
          'button',
          {
            type: 'button',
            class: 'sol-button',
            'aria-label': direction === -1 ? l.value.previousMonth : l.value.nextMonth,
            disabled:
              p.disabled || !grid.valid || shiftCalendarMonth(p.month, direction) === p.month,
            onClick: () =>
              requestMonth(
                shiftCalendarMonth(p.month, direction),
                direction === -1 ? 'previous' : 'next',
              ),
          },
          h(SIcon, { name: 'chevron', rotate: direction === -1 ? 90 : 270, decorative: true }),
        )
      const cells = grid.valid ? grid.cells : Array.from({ length: 42 }, () => null)
      const activeMarkers = active.value ? state.value.days.get(active.value)?.markers || [] : []
      return h(
        'div',
        {
          ...attrs,
          ref: host,
          id: p.id,
          class: ['sol-field sol-ui-month-calendar', attrs.class],
          role: 'group',
          tabindex: -1,
          'aria-labelledby': p.id + '-label',
          'aria-describedby': description,
          'aria-busy': busy ? 'true' : undefined,
          'aria-disabled': p.disabled ? 'true' : undefined,
        },
        [
          h('p', { id: p.id + '-label', class: 'sol-label' }, p.label),
          h('div', { class: 'sol-ui-month-toolbar' }, [
            h(
              'h3',
              { id: p.id + '-month', 'aria-live': 'polite', 'aria-atomic': 'true' },
              monthName,
            ),
            h('label', { class: 'sol-ui-month-year' }, [
              h('span', { class: 'sol-label' }, l.value.monthCalendarYear),
              h('input', { class: 'sol-input', type: 'number', min: 1, max: 9999, step: 1, inputmode: 'numeric', value: grid.valid ? p.month.slice(0, 4) : '', disabled: p.disabled || !grid.valid,
                onChange: (event: Event) => changeYear(event.currentTarget as HTMLInputElement),
                onKeydown: (event: KeyboardEvent) => {
                  if (event.key === 'Enter' && !event.isComposing) { event.preventDefault();changeYear(event.currentTarget as HTMLInputElement) }
                },
              }),
            ]),
            h('div', { class: 'sol-ui-month-navigation' }, [nav(-1), nav(1)]),
            h(
              'button',
              {
                type: 'button',
                class: 'sol-button',
                disabled: p.disabled || !grid.valid || !parseDateOnly(today.value),
                onClick: () => requestMonth(calendarMonthOf(today.value), 'today', today.value),
              },
              l.value.today,
            ),
          ]),
          h('p', { id: p.id + '-keys', class: 'sol-hint' }, l.value.monthCalendarKeys),
          p.readonly
            ? h('p', { id: p.id + '-readonly', class: 'sol-hint' }, l.value.monthCalendarReadonly)
            : null,
          busy
            ? h(
                'p',
                { id: p.id + '-loading', class: 'sol-hint', role: 'status' },
                l.value.monthCalendarLoading,
              )
            : null,
          h('table', { class: 'sol-ui-month-table', 'aria-labelledby': p.id + '-month' }, [
            h(
              'thead',
              h(
                'tr',
                Array.from({ length: 7 }, (_, index) => {
                  const day = grid.valid ? grid.weekdays[index]! : index
                  const date = '2023-01-0' + (day + 1),
                    options = { year: undefined, month: undefined, day: undefined } as const
                  return h(
                    'th',
                    { scope: 'col', 'data-sunday': day === 0 ? 'true' : undefined },
                    h(
                      'abbr',
                      { title: formatSolDate(date, l.value, { ...options, weekday: 'long' }) },
                      formatSolDate(date, l.value, { ...options, weekday: 'short' }),
                    ),
                  )
                }),
              ),
            ),
            h(
              'tbody',
              Array.from({ length: 6 }, (_, row) =>
                h(
                  'tr',
                  cells.slice(row * 7, row * 7 + 7).map((cell) => {
                    if (!cell)
                      return h(
                        'td',
                        { 'aria-hidden': 'true', class: 'sol-ui-month-spacer' },
                        h('div', { class: 'sol-ui-month-cell' }),
                      )
                    const data = state.value.days.get(cell.iso)!,
                      selected = p.modelValue === cell.iso,
                      isToday = cell.iso === today.value
                    const scope: SolCalendarCellScope = {
                      date: cell.iso,
                      day: cell.day,
                      selected,
                      today: isToday,
                      disabled: unavailable(cell.iso),
                      markers: data.markers,
                    }
                    const label = [
                      withVisibleNumberLabel(
                        formatSolDate(cell.iso, l.value, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          weekday: 'long',
                        }),
                        String(cell.day),
                      ),
                      isToday ? l.value.monthCalendarToday : '',
                      selected ? l.value.selected : '',
                      scope.disabled ? l.value.unavailable : '',
                      ...data.markers.map((marker) => marker.label),
                      data.markers.length ? l.value.monthCalendarCount!(data.markers.length) : '',
                    ]
                      .filter(Boolean)
                      .join(' · ')
                    return h(
                      'td',
                      { key: cell.iso, 'data-date': cell.iso },
                      h('div', { class: 'sol-ui-month-cell' }, [
                        h(
                          'button',
                          {
                            type: 'button',
                            class: 'sol-button sol-ui-month-day',
                            ref: (element: unknown) => {
                              if (element) buttons.set(cell.iso, element as HTMLButtonElement)
                              else buttons.delete(cell.iso)
                            },
                            tabindex: cell.iso === active.value ? 0 : -1,
                            disabled: p.disabled,
                            'aria-disabled': scope.disabled ? 'true' : undefined,
                            'aria-pressed': String(selected),
                            'aria-current': isToday ? 'date' : undefined,
                            'aria-label': label,
                            'aria-describedby': p.id + '-keys',
                            'data-today': isToday ? 'true' : undefined,
                            'data-sunday': cell.weekday === 0 ? 'true' : undefined,
                            onFocus: () => {
                              pending = undefined
                              active.value = cell.iso
                            },
                            onClick: (event: MouseEvent) =>
                              choose(cell.iso, event.detail ? 'pointer' : 'keyboard'),
                            onKeydown: (event: KeyboardEvent) => key(event, cell.iso),
                          },
                          [
                            h('span', { class: 'sol-ui-month-number' }, [
                              String(cell.day),
                              selected ? h('span', { 'aria-hidden': 'true' }, ' ✓') : null,
                            ]),
                            ...data.markers
                              .slice(0, Math.max(0, p.markerLimit))
                              .map((marker, index) =>
                                h(
                                  'span',
                                  {
                                    key: marker.id,
                                    class: 'sol-ui-month-marker',
                                    title: marker.label,
                                  },
                                  slots.marker?.({ date: cell.iso, marker, index }) ||
                                    h(
                                      SBadge,
                                      {
                                        tone: marker.tone ?? 'neutral',
                                        size: 'sm',
                                        style: markerCategoryStyle(marker),
                                      },
                                      () => [
                                        marker.icon
                                          ? h(SIcon, {
                                              name: marker.icon,
                                              size: 16,
                                              decorative: true,
                                            })
                                          : null,
                                        h('span', marker.label),
                                      ],
                                    ),
                                ),
                              ),
                            data.markers.length > p.markerLimit
                              ? h(
                                  'span',
                                  {
                                    class: 'sol-ui-month-more',
                                    title: l.value.monthCalendarMore!(
                                      data.markers.length - p.markerLimit,
                                    ),
                                  },
                                  '+' + (data.markers.length - p.markerLimit),
                                )
                              : null,
                            data.markers.length
                              ? h(
                                  'span',
                                  {
                                    class: 'sol-ui-month-marker-count',
                                    'aria-hidden': 'true',
                                    title: l.value.monthCalendarCount!(data.markers.length),
                                  },
                                  String(data.markers.length),
                                )
                              : null,
                          ],
                        ),
                        slots.cell?.(scope),
                      ]),
                    )
                  }),
                ),
              ),
            ),
          ]),
          !empty || busy
            ? h(
                'section',
                {
                  class: 'sol-ui-month-details',
                  ref: details,
                  tabindex: 0,
                  role: 'region',
                  'aria-labelledby': p.id + '-details-label',
                  onKeydown: (event: KeyboardEvent) => {
                    if (event.key === 'Escape' && !event.isComposing) {
                      event.preventDefault();event.stopPropagation();focusDate(active.value)
                    }
                  },
                },
                [
                  h('h4', { id: p.id + '-details-label' }, [
                    active.value ? formatSolDate(active.value, l.value) + ' · ' : '',
                    l.value.monthCalendarDetails,
                  ]),
                  activeMarkers.length
                    ? h(
                        'ul',
                        activeMarkers.map((marker) =>
                          h('li', { key: marker.id }, [
                            marker.icon
                              ? h(SIcon, { name: marker.icon, size: 16, decorative: true })
                              : null,
                            marker.category && marker.tone === undefined
                              ? h(SBadge, {
                                  content: marker.label,
                                  size: 'sm',
                                  style: markerCategoryStyle(marker),
                                })
                              : h('span', marker.label),
                          ]),
                        ),
                      )
                    : h(
                        'p',
                        { class: 'sol-hint' },
                        busy ? l.value.monthCalendarLoading : l.value.monthCalendarEmpty,
                      ),
                ],
              )
            : null,
          empty
            ? h(
                'div',
                { id: p.id + '-empty', class: 'sol-hint' },
                slots.empty?.() || l.value.monthCalendarEmpty,
              )
            : null,
          ...fieldMessages(p, slots, error),
        ],
      )
    }
  },
})
