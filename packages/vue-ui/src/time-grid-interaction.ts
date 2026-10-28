import { nextTick, onBeforeUnmount, shallowRef, watch, watchEffect } from 'vue'
import {
  freezeTimeGridProposal,
  proposeTimeGridCoordinate,
  sameTimeGridCoordinate,
} from './time-grid-proposal'
import type {
  TimeGridAction,
  TimeGridCancelReason,
  TimeGridCancellation,
  TimeGridInput,
  TimeGridProposal,
} from './time-grid-proposal'
import type { TimeGridColumn, TimeGridEntry, TimeGridKey } from './time-grid-values'
export interface TimeGridInteractionSource {
  readonly columns: readonly TimeGridColumn[]
  readonly entries: readonly TimeGridEntry<unknown>[]
}
export interface TimeGridInteractionOptions {
  source: () => TimeGridInteractionSource | null
  configuration: () => readonly unknown[]
  snap: () => number
  blocked: (key: TimeGridKey, action: TimeGridAction) => TimeGridCancelReason | null
  focus: (key: TimeGridKey, target: 'item' | 'toolbar') => void
  prepareRestore: (key: TimeGridKey) => () => void
  start: (proposal: TimeGridProposal) => void
  preview: (proposal: TimeGridProposal) => void
  commit: (proposal: TimeGridProposal) => void
  cancel: (result: TimeGridCancellation) => void
}
function sameSource(a: TimeGridInteractionSource | null, b: TimeGridInteractionSource | null) {
  if (!a || !b) return a === b
  return (
    a.columns.length === b.columns.length &&
    a.entries.length === b.entries.length &&
    a.columns.every((value, index) => {
      const other = b.columns[index]
      return value.key === other.key && value.label === other.label && value.date === other.date
    }) &&
    a.entries.every((value, index) => {
      const other = b.entries[index]
      return (
        value.key === other.key &&
        value.label === other.label &&
        value.columnKey === other.columnKey &&
        value.startMinute === other.startMinute &&
        value.endMinute === other.endMinute
      )
    })
  )
}
/** Intent only. The parent owns source changes and async acknowledgement. */
export function useTimeGridInteraction(options: TimeGridInteractionOptions) {
  const state = shallowRef<TimeGridProposal | null>(null)
  let generation = 0,
    ready = false,
    disposed = false,
    initialConfiguration: readonly unknown[] = []
  function cancel(reason: TimeGridCancelReason, restore = true) {
    const current = state.value
    if (!current) return false
    const restoreFocus = restore ? options.prepareRestore(current.key) : undefined
    generation++
    ready = false
    state.value = null
    options.cancel(Object.freeze({ ...current, reason }))
    if (restoreFocus) void nextTick(restoreFocus)
    return true
  }
  function begin(
    key: TimeGridKey,
    action: TimeGridAction,
    input: TimeGridInput,
    target: 'item' | 'toolbar' = 'item',
  ) {
    if (disposed || options.blocked(key, action)) return false
    const item = options.source()?.entries.find((item) => item.key === key)
    if (!item) return false
    cancel('configuration', false)
    const coordinate = {
        columnKey: item.columnKey,
        startMinute: item.startMinute,
        endMinute: item.endMinute,
      },
      token = ++generation
    initialConfiguration = [...options.configuration()]
    ready = false
    state.value = freezeTimeGridProposal(key, action, coordinate, coordinate, input)
    options.start(state.value)
    void nextTick(() => {
      if (!disposed && state.value && token === generation) {
        ready = true
        options.focus(key, target)
      }
    })
    return true
  }
  function preview(minute: number, columnKey: string, input: TimeGridInput) {
    const current = state.value
    if (!current || disposed) return false
    const reason = options.blocked(current.key, current.action)
    if (reason) {
      cancel(reason)
      return false
    }
    if (!options.source()?.columns.some((column) => column.key === columnKey)) {
      cancel('external')
      return false
    }
    try {
      const to = proposeTimeGridCoordinate(
        current.from,
        current.action,
        minute,
        columnKey,
        options.snap(),
      )
      if (sameTimeGridCoordinate(current.to, to)) return false
      state.value = freezeTimeGridProposal(current.key, current.action, current.from, to, input)
      options.preview(state.value)
      return true
    } catch {
      cancel('configuration')
      return false
    }
  }
  function commit() {
    const current = state.value
    if (!current || !ready || disposed) return false
    const reason = options.blocked(current.key, current.action)
    if (reason) {
      cancel(reason)
      return false
    }
    if (current.action !== 'duplicate' && sameTimeGridCoordinate(current.from, current.to)) {
      cancel('unchanged')
      return false
    }
    const restoreFocus = options.prepareRestore(current.key)
    generation++
    ready = false
    state.value = null
    options.commit(current)
    void nextTick(restoreFocus)
    return true
  }
  watch(options.source, (value, previous) => {
    if (state.value) {
      const config = options.configuration(),
        changed =
          config.length !== initialConfiguration.length ||
          config.some((value, index) => !Object.is(value, initialConfiguration[index]))
      if (!changed && sameSource(value, previous)) return
      cancel(
        changed
          ? 'configuration'
          : options.blocked(state.value.key, state.value.action) || 'external',
      )
    }
  })
  watch(options.configuration, () => cancel('configuration'))
  watchEffect(() => {
    const current = state.value
    if (current) {
      const reason = options.blocked(current.key, current.action)
      if (reason) cancel(reason)
    }
  })
  onBeforeUnmount(() => {
    cancel('unmount', false)
    disposed = true
    generation++
  })
  return { state, begin, preview, commit, cancel }
}
