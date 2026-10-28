import {dateISO, monthDays, parseDateOnly, shiftDay, shiftMonth, weekday} from '@solyi/core/date'
import type {DateParts} from '@solyi/core/date'

export type CalendarWeekStart = 0 | 1 | 2 | 3 | 4 | 5 | 6
export type CalendarNavigationKey =
  'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'ArrowDown' | 'Home' | 'End' | 'PageUp' | 'PageDown'
export interface CalendarCell {
  readonly iso: string
  readonly day: number
  readonly weekday: number
}
export type CalendarMonthLayout =
  | {readonly valid: false; readonly reason: 'month' | 'first-day'}
  | {
      readonly valid: true
      readonly month: string
      readonly firstDay: CalendarWeekStart
      readonly weekdays: readonly number[]
      readonly cells: readonly (CalendarCell | null)[]
    }

/** ISO calendar month, without interpreting a stored value in a local timezone. */
export function parseCalendarMonth(value: unknown): DateParts | null {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}$/.test(value)) return null
  return parseDateOnly(value + '-01')
}
export function calendarMonthOf(value: unknown): string | null {
  return parseDateOnly(value) ? (value as string).slice(0, 7) : null
}
function validFirstDay(value: number): value is CalendarWeekStart {
  return Number.isInteger(value) && value >= 0 && value <= 6
}

/** Always six rows. Out-of-month cells are empty, including years 0001/9999. */
export function calendarMonthLayout(month: unknown, firstDay: number): CalendarMonthLayout {
  const first = parseCalendarMonth(month)
  if (!first) return {valid: false, reason: 'month'}
  if (!validFirstDay(firstDay)) return {valid: false, reason: 'first-day'}
  const leading = (weekday(first) - firstDay + 7) % 7
  const days = monthDays(first.y, first.m)
  const cells = Array.from({length: 42}, (_, index): CalendarCell | null => {
    const day = index - leading + 1
    if (day < 1 || day > days) return null
    return Object.freeze({iso: dateISO({...first, d: day}), day, weekday: (firstDay + index) % 7})
  })
  return Object.freeze({
    valid: true,
    month: month as string,
    firstDay,
    weekdays: Object.freeze(Array.from({length: 7}, (_, index) => (firstDay + index) % 7)),
    cells: Object.freeze(cells),
  })
}
export function shiftCalendarMonth(month: unknown, delta: number): string | null {
  const first = parseCalendarMonth(month)
  return first && Number.isSafeInteger(delta) ? dateISO(shiftMonth(first, delta)).slice(0, 7) : null
}

/** Roving focus anchor only; never normalizes or replaces the parent's selection. */
export function initialCalendarDate(month: unknown, selected: unknown, today: unknown): string | null {
  const first = parseCalendarMonth(month)
  if (!first) return null
  for (const value of [selected, today]) {
    if (calendarMonthOf(value) === month) return value as string
  }
  return dateISO(first)
}

/** Keyboard navigation is a date proposal; the component decides when to request a new month. */
export function navigateCalendarDate(
  value: unknown,
  key: CalendarNavigationKey,
  firstDay: number,
  shift = false,
): string | null {
  const date = parseDateOnly(value)
  if (!date || !validFirstDay(firstDay)) return null
  const weekOffset = (weekday(date) - firstDay + 7) % 7
  let next: DateParts
  switch (key) {
    case 'ArrowLeft': next = shiftDay(date, -1); break
    case 'ArrowRight': next = shiftDay(date, 1); break
    case 'ArrowUp': next = shiftDay(date, -7); break
    case 'ArrowDown': next = shiftDay(date, 7); break
    case 'Home': next = shiftDay(date, -weekOffset); break
    case 'End': next = shiftDay(date, 6 - weekOffset); break
    case 'PageUp': next = shiftMonth(date, shift ? -12 : -1); break
    case 'PageDown': next = shiftMonth(date, shift ? 12 : 1); break
    default: return null
  }
  return dateISO(next)
}
