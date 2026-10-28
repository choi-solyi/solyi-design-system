/** Internal foundations; the public component/API is introduced in a later unit. */
export type SortableKey = string | number
export type SortableInput = 'pointer' | 'keyboard' | 'button'
export interface SortableSnapshot<T> {
  readonly source: readonly T[]
  readonly items: readonly T[]
  readonly keys: readonly SortableKey[]
}
export type SortableSnapshotResult<T> =
  | {valid: true; snapshot: SortableSnapshot<T>}
  | {valid: false; reason: 'items' | 'item-key' | 'duplicate-key'; index: number}
export interface SortableProposal<T> {
  items: T[]
  key: SortableKey
  from: number
  to: number
  input: SortableInput
}

/** Read keys once; never freeze or alter caller-owned arrays or objects. */
export function snapshotSortable<T>(items: readonly T[], itemKey: (item: T) => SortableKey): SortableSnapshotResult<T> {
  if (!Array.isArray(items)) return {valid: false, reason: 'items', index: -1}
  const captured = items.slice(), keys: SortableKey[] = [], seen = new Set<SortableKey>()
  for (let index = 0; index < captured.length; index++) {
    if (!(index in captured)) return {valid: false, reason: 'items', index}
    let key: SortableKey
    try { key = itemKey(captured[index]!) }
    catch { return {valid: false, reason: 'item-key', index} }
    if (typeof key !== 'string' && (typeof key !== 'number' || !Number.isFinite(key))) return {valid: false, reason: 'item-key', index}
    if (seen.has(key)) return {valid: false, reason: 'duplicate-key', index}
    seen.add(key); keys.push(key)
  }
  if (items.length !== captured.length || captured.some((item, index) => !Object.is(item, items[index]))) return {valid: false, reason: 'items', index: -1}
  return {valid: true, snapshot: Object.freeze({source: items, items: Object.freeze(captured), keys: Object.freeze(keys)})}
}

/** Labels/business fields may change; replacing the source, an item or a key invalidates a gesture. */
export function sameSortableSnapshot<T>(previous: SortableSnapshot<T>, current: SortableSnapshot<T>): boolean {
  return previous.source === current.source && previous.items.length === current.items.length &&
    previous.items.every((item, index) => Object.is(item, current.items[index]) && previous.keys[index] === current.keys[index])
}

/** A fresh proposal can be accepted, ignored or changed by the parent; its source is untouched. */
export function proposeSortableMove<T>(snapshot: SortableSnapshot<T>, key: SortableKey, to: number, input: SortableInput): SortableProposal<T> | undefined {
  const from = snapshot.keys.indexOf(key)
  if (from < 0 || !Number.isInteger(to) || to < 0 || to >= snapshot.items.length) return undefined
  const items = [...snapshot.items], [item] = items.splice(from, 1)
  items.splice(to, 0, item!)
  return {items, key, from, to, input}
}
