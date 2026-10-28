import type { TimeGridKey } from './time-grid-values'
export type TimeGridAction = 'move' | 'resize-start' | 'resize-end' | 'duplicate'
export type TimeGridInput = 'keyboard' | 'pointer' | 'button'
export type TimeGridCancelReason =
  | 'escape'
  | 'tab'
  | 'blur'
  | 'outside'
  | 'disabled'
  | 'readonly'
  | 'loading'
  | 'pending'
  | 'external'
  | 'configuration'
  | 'pointercancel'
  | 'capture'
  | 'unmount'
  | 'api'
  | 'button'
  | 'unchanged'
export interface TimeGridCoordinate {
  readonly columnKey: string
  readonly startMinute: number
  readonly endMinute: number
}
export interface TimeGridProposal {
  readonly key: TimeGridKey
  readonly action: TimeGridAction
  readonly from: TimeGridCoordinate
  readonly to: TimeGridCoordinate
  readonly input: TimeGridInput
}
export interface TimeGridCancellation extends TimeGridProposal {
  readonly reason: TimeGridCancelReason
}
const actions = /* @__PURE__ */ new Set(['move', 'resize-start', 'resize-end', 'duplicate'])
const coordinate = (value: TimeGridCoordinate) =>
  typeof value.columnKey === 'string' &&
  !!value.columnKey.trim() &&
  Number.isInteger(value.startMinute) &&
  Number.isInteger(value.endMinute) &&
  value.startMinute >= 0 &&
  value.endMinute <= 1440 &&
  value.startMinute < value.endMinute
/** Midnight-origin snapping, clamped to the calendar day's endpoints. No app conflict policy. */
export function proposeTimeGridCoordinate(
  from: TimeGridCoordinate,
  action: TimeGridAction,
  minute: number,
  columnKey = from.columnKey,
  snapMinutes = 15,
): TimeGridCoordinate {
  if (
    !coordinate(from) ||
    !actions.has(action) ||
    !Number.isFinite(minute) ||
    typeof columnKey !== 'string' ||
    !columnKey.trim() ||
    !Number.isInteger(snapMinutes) ||
    snapMinutes < 1 ||
    snapMinutes > 1440
  )
    throw TypeError('Invalid time grid proposal')
  const unchanged = minute === (action === 'resize-end' ? from.endMinute : from.startMinute)
  const snapped = unchanged ? minute : Math.round(minute / snapMinutes) * snapMinutes
  let startMinute = from.startMinute,
    endMinute = from.endMinute,
    targetColumn = from.columnKey
  if (action === 'move' || action === 'duplicate') {
    const duration = endMinute - startMinute
    startMinute = Math.max(0, Math.min(1440 - duration, snapped))
    endMinute = startMinute + duration
    targetColumn = columnKey
  } else if (action === 'resize-start') startMinute = Math.max(0, Math.min(endMinute - 1, snapped))
  else endMinute = Math.min(1440, Math.max(startMinute + 1, snapped))
  return Object.freeze({ columnKey: targetColumn, startMinute, endMinute })
}
export const sameTimeGridCoordinate = (a: TimeGridCoordinate, b: TimeGridCoordinate) =>
  a.columnKey === b.columnKey && a.startMinute === b.startMinute && a.endMinute === b.endMinute
export function freezeTimeGridProposal(
  key: TimeGridKey,
  action: TimeGridAction,
  from: TimeGridCoordinate,
  to: TimeGridCoordinate,
  input: TimeGridInput,
): TimeGridProposal {
  if (
    !coordinate(from) ||
    !coordinate(to) ||
    !actions.has(action) ||
    !['keyboard', 'pointer', 'button'].includes(input) ||
    (typeof key !== 'string' && typeof key !== 'number') ||
    (typeof key === 'number' && !Number.isFinite(key)) ||
    (typeof key === 'string' && !key.trim())
  )
    throw TypeError('Invalid time grid proposal payload')
  return Object.freeze({
    key,
    action,
    from: Object.freeze({ ...from }),
    to: Object.freeze({ ...to }),
    input,
  })
}
