import { parseDateOnly } from '@solyi/core/date'
import type { SolCategoryId } from '@solyi/core'
export type TimeGridKey = string | number
export interface TimeGridColumn {
  readonly key: string
  readonly label: string
  readonly date?: string
}
export interface TimeGridBand {
  readonly id: string
  readonly label: string
  readonly columnKey?: string
  readonly startMinute: number
  readonly endMinute: number
  readonly category?: SolCategoryId
}
export interface TimeGridAccessors<T> {
  key: (item: T) => TimeGridKey
  label: (item: T) => string
  column: (item: T) => string
  start: (item: T) => number
  end: (item: T) => number
}
export interface TimeGridEntry<T> {
  readonly key: TimeGridKey
  readonly item: T
  readonly label: string
  readonly columnKey: string
  readonly startMinute: number
  readonly endMinute: number
  readonly index: number
}
export interface TimeGridLayout<T> extends TimeGridEntry<T> {
  readonly visibleStart: number
  readonly visibleEnd: number
  readonly lane: number
  readonly lanes: number
}
const minute = (value: number) => Number.isInteger(value) && value >= 0 && value <= 1440
const text = (value: unknown): value is string => typeof value === 'string' && !!value.trim()
export function readTimeGrid<T>(
  items: readonly T[],
  columns: readonly TimeGridColumn[],
  access: TimeGridAccessors<T>,
  startMinute: number,
  endMinute: number,
  bands: readonly TimeGridBand[] = [],
) {
  if (
    !minute(startMinute) ||
    !minute(endMinute) ||
    startMinute >= endMinute ||
    !Array.isArray(items) ||
    !Array.isArray(columns) ||
    !Array.isArray(bands)
  )
    throw TypeError('Invalid time grid range')
  const columnKeys = new Set<string>(),
    keys = new Set<TimeGridKey>(),
    bandKeys = new Set<string>()
  const safeColumns = columns.map((column) => {
    if (
      !column ||
      !text(column.key) ||
      !text(column.label) ||
      columnKeys.has(column.key) ||
      (column.date !== undefined && !parseDateOnly(column.date))
    )
      throw TypeError('Invalid time grid column')
    columnKeys.add(column.key)
    return Object.freeze({ key: column.key, label: column.label, date: column.date })
  })
  const safeBands = bands.map((band) => {
    if (
      !band ||
      !text(band.id) ||
      bandKeys.has(band.id) ||
      !text(band.label) ||
      (band.columnKey !== undefined && !columnKeys.has(band.columnKey)) ||
      !minute(band.startMinute) ||
      !minute(band.endMinute) ||
      band.startMinute >= band.endMinute ||
      (band.category !== undefined &&
        (typeof band.category !== 'string' || !/^c[1-8]$/.test(band.category)))
    )
      throw TypeError('Invalid time grid band')
    bandKeys.add(band.id)
    return Object.freeze({
      id: band.id,
      label: band.label,
      columnKey: band.columnKey,
      startMinute: band.startMinute,
      endMinute: band.endMinute,
      category: band.category,
    })
  })
  const entries = items.map((item, index) => {
    const key = access.key(item),
      label = access.label(item),
      columnKey = access.column(item),
      start = access.start(item),
      end = access.end(item)
    if (
      (typeof key !== 'string' && typeof key !== 'number') ||
      (typeof key === 'number' && !Number.isFinite(key)) ||
      (typeof key === 'string' && !key.trim()) ||
      keys.has(key) ||
      !text(label) ||
      !columnKeys.has(columnKey) ||
      !minute(start) ||
      !minute(end) ||
      start >= end
    )
      throw TypeError('Invalid time grid item')
    keys.add(key)
    return Object.freeze({ key, item, label, columnKey, startMinute: start, endMinute: end, index })
  })
  return Object.freeze({
    columns: Object.freeze(safeColumns),
    entries: Object.freeze(entries),
    bands: Object.freeze(safeBands),
    startMinute,
    endMinute,
  })
}
export type TimeGridSnapshot<T> = ReturnType<typeof readTimeGrid<T>>
/** Inline accessor/column objects can be rebound by a parent's unrelated render. */
export function sameTimeGridSnapshot<T>(
  a: TimeGridSnapshot<T> | null | undefined,
  b: TimeGridSnapshot<T> | null | undefined,
) {
  if (!a || !b) return a === b
  return (
    a.startMinute === b.startMinute &&
    a.endMinute === b.endMinute &&
    a.columns.length === b.columns.length &&
    a.entries.length === b.entries.length &&
    a.bands.length === b.bands.length &&
    a.columns.every((value, index) => {
      const other = b.columns[index]
      return value.key === other.key && value.label === other.label && value.date === other.date
    }) &&
    a.entries.every((value, index) => {
      const other = b.entries[index]
      return (
        value.key === other.key &&
        value.item === other.item &&
        value.label === other.label &&
        value.columnKey === other.columnKey &&
        value.startMinute === other.startMinute &&
        value.endMinute === other.endMinute
      )
    }) &&
    a.bands.every((value, index) => {
      const other = b.bands[index]
      return (
        value.id === other.id &&
        value.label === other.label &&
        value.columnKey === other.columnKey &&
        value.startMinute === other.startMinute &&
        value.endMinute === other.endMinute &&
        value.category === other.category
      )
    })
  )
}
/** Visual packing only; never infers or resolves application scheduling conflicts. */
export function timeGridLanes<T>(
  entries: readonly TimeGridEntry<T>[],
  columnKey: string,
  startMinute: number,
  endMinute: number,
): TimeGridLayout<T>[] {
  const sorted = entries
    .filter(
      (item) =>
        item.columnKey === columnKey &&
        item.startMinute < endMinute &&
        item.endMinute > startMinute,
    )
    .map((item) => ({
      ...item,
      visibleStart: Math.max(startMinute, item.startMinute),
      visibleEnd: Math.min(endMinute, item.endMinute),
    }))
    .sort((a, b) => a.visibleStart - b.visibleStart || a.index - b.index)
  const result: TimeGridLayout<T>[] = [],
    ends: number[] = []
  let group: Omit<TimeGridLayout<T>, 'lanes'>[] = [],
    groupEnd = -1
  const flush = () => {
    for (const item of group) result.push(Object.freeze({ ...item, lanes: ends.length }))
    group = []
    ends.length = 0
  }
  for (const item of sorted) {
    if (item.visibleStart >= groupEnd) {
      flush()
      groupEnd = -1
    }
    let lane = ends.findIndex((end) => end <= item.visibleStart)
    if (lane < 0) lane = ends.length
    const visualEnd = Math.max(item.visibleEnd, item.visibleStart + 30)
    ends[lane] = visualEnd
    groupEnd = Math.max(groupEnd, visualEnd)
    group.push({ ...item, lane })
  }
  flush()
  return result
}
export function timeGridTicks(start: number, end: number) {
  const ticks: number[] = []
  for (let minute = Math.ceil(start / 60) * 60; minute <= end; minute += 60) ticks.push(minute)
  return ticks
}
