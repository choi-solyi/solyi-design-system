import { computed, defineComponent, h, ref, watch, nextTick, mergeProps } from 'vue'
import type { AllowedComponentProps, PropType, SlotsType, VNode, VNodeProps } from 'vue'
import { formatSolDate, formatSolNumber, useSolLocale } from './locale'
import type { SolLocale } from './locale'
import {
  readTimeGrid,
  sameTimeGridSnapshot,
  timeGridLanes,
  timeGridTicks,
} from './time-grid-values'
import type {
  TimeGridBand,
  TimeGridColumn,
  TimeGridKey,
  TimeGridSnapshot,
} from './time-grid-values'
import { useTimeGridEditor } from './time-grid-editor'
import type {
  TimeGridAction,
  TimeGridCancelReason,
  TimeGridCancellation,
  TimeGridCoordinate,
  TimeGridInput,
  TimeGridProposal,
} from './time-grid-proposal'
export type SolTimeGridAction = TimeGridAction
export type SolTimeGridCancelReason = TimeGridCancelReason
export type SolTimeGridCancellation = TimeGridCancellation
export type SolTimeGridCoordinate = TimeGridCoordinate
export type SolTimeGridInput = TimeGridInput
export type SolTimeGridProposal = TimeGridProposal
export type SolTimeGridKey = TimeGridKey
export type SolTimeGridColumn = TimeGridColumn
export type SolTimeGridBand = TimeGridBand
export interface SolTimeGridItemScope<T> {
  readonly item: Readonly<T>
  readonly key: SolTimeGridKey
  readonly column: SolTimeGridColumn
  readonly startMinute: number
  readonly endMinute: number
  readonly clipped: boolean
  readonly active: boolean
  readonly readonly: boolean
  readonly disabled: boolean
  readonly pending: boolean
  readonly proposal: SolTimeGridProposal | null
}
export interface SolTimeGridBandScope {
  readonly band: SolTimeGridBand
  readonly column: SolTimeGridColumn
}
export interface SolTimeGridSlots<T> {
  item?: (scope: SolTimeGridItemScope<T>) => VNode[]
  band?: (scope: SolTimeGridBandScope) => VNode[]
  empty?: () => VNode[]
  help?: () => VNode[]
}
export interface SolTimeGridProps<T> extends AllowedComponentProps, VNodeProps {
  id: string
  label: string
  items: readonly T[]
  columns: readonly SolTimeGridColumn[]
  itemKey: (item: T) => SolTimeGridKey
  itemLabel: (item: T) => string
  itemColumn: (item: T) => string
  itemStart: (item: T) => number
  itemEnd: (item: T) => number
  startMinute?: number
  endMinute?: number
  bands?: readonly SolTimeGridBand[]
  loading?: boolean
  error?: string
  help?: string
  locale?: Partial<SolLocale>
  readonly?: boolean
  disabled?: boolean
  snapMinutes?: number
  allowMove?: boolean
  allowResize?: boolean
  allowDuplicate?: boolean
  pendingKeys?: readonly SolTimeGridKey[]
  isItemDisabled?: (item: T) => boolean
  onStart?: (proposal: SolTimeGridProposal) => void
  onPreview?: (proposal: SolTimeGridProposal) => void
  onCommit?: (proposal: SolTimeGridProposal) => void
  onCancel?: (result: SolTimeGridCancellation) => void
}
export interface SolTimeGridHandle {
  focus(key?: SolTimeGridKey): void
  cancel(): void
}
interface SolTimeGridContext<T> {
  props: SolTimeGridProps<T>
  slots: SolTimeGridSlots<T>
  emit: SolTimeGridEmit
  expose: (handle: SolTimeGridHandle) => void
}
export interface SolTimeGridComponent {
  <T>(
    props: SolTimeGridProps<T>,
    context?: Pick<SolTimeGridContext<T>, 'slots' | 'emit'> & { attrs: Record<string, unknown> },
    expose?: (handle: SolTimeGridHandle) => void,
  ): VNode & { __ctx?: SolTimeGridContext<T> }
}
export interface SolTimeGridEmit {
  (event: 'start' | 'preview' | 'commit', proposal: SolTimeGridProposal): void
  (event: 'cancel', result: SolTimeGridCancellation): void
}
/** Controlled wall-minute projection and opt-in intent. No timezone, collision or storage policy. */
export const STimeGrid = /* @__PURE__ */ defineComponent({
  name: 'STimeGrid',
  inheritAttrs: false,
  props: {
    id: { type: String, required: true },
    label: { type: String, required: true },
    items: { type: Array as PropType<readonly unknown[]>, required: true },
    columns: { type: Array as PropType<readonly SolTimeGridColumn[]>, required: true },
    itemKey: { type: Function as PropType<(item: unknown) => SolTimeGridKey>, required: true },
    itemLabel: { type: Function as PropType<(item: unknown) => string>, required: true },
    itemColumn: { type: Function as PropType<(item: unknown) => string>, required: true },
    itemStart: { type: Function as PropType<(item: unknown) => number>, required: true },
    itemEnd: { type: Function as PropType<(item: unknown) => number>, required: true },
    startMinute: { type: Number, default: 0 },
    endMinute: { type: Number, default: 1440 },
    bands: { type: Array as PropType<readonly SolTimeGridBand[]>, default: () => [] },
    loading: Boolean,
    error: { type: String, default: '' },
    help: { type: String, default: '' },
    locale: Object as PropType<Partial<SolLocale>>,
    readonly: { type: Boolean, default: true },
    disabled: Boolean,
    snapMinutes: { type: Number, default: 15 },
    allowMove: { type: Boolean, default: true },
    allowResize: Boolean,
    allowDuplicate: Boolean,
    pendingKeys: { type: Array as PropType<readonly SolTimeGridKey[]>, default: () => [] },
    isItemDisabled: Function as PropType<(item: unknown) => boolean>,
  },
  slots: Object as SlotsType<SolTimeGridSlots<unknown>>,
  emits: {
    start: (_proposal: SolTimeGridProposal) => true,
    preview: (_proposal: SolTimeGridProposal) => true,
    commit: (_proposal: SolTimeGridProposal) => true,
    cancel: (_result: SolTimeGridCancellation) => true,
  },
  setup(p, { attrs, slots, emit, expose }) {
    const l = useSolLocale(() => p.locale),
      scroll = ref<HTMLElement | null>(null),
      host = ref<HTMLElement | null>(null),
      nodes = new Map<SolTimeGridKey, HTMLElement>(),
      columnNodes = new Map<string, HTMLElement>()
    const snapshot = computed<TimeGridSnapshot<unknown> | null>((previous) => {
      try {
        const next = readTimeGrid(
          p.items,
          p.columns,
          {
            key: p.itemKey,
            label: p.itemLabel,
            column: p.itemColumn,
            start: p.itemStart,
            end: p.itemEnd,
          },
          p.startMinute,
          p.endMinute,
          p.bands,
        )
        return sameTimeGridSnapshot(previous, next) ? previous! : next
      } catch {
        return null
      }
    })
    const focus = (key?: SolTimeGridKey) => {
      ;(key !== undefined
        ? nodes.get(key) || scroll.value || host.value
        : nodes.values().next().value || scroll.value || host.value
      )?.focus()
    }
    const time = (minute: number) =>
      formatSolNumber(Math.floor(minute / 60), l.value, {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      ':' +
      formatSolNumber(minute % 60, l.value, { minimumIntegerDigits: 2, useGrouping: false })
    const layouts = computed(() => {
      const data = snapshot.value
      return new Map(
        data?.columns.map(
          (column) =>
            [
              column.key,
              timeGridLanes(data.entries, column.key, data.startMinute, data.endMinute),
            ] as const,
        ) || [],
      )
    })
    const editor = useTimeGridEditor(
      p,
      () => snapshot.value,
      { host, scroll, nodes, columns: columnNodes, focus, locale: l, time, keysId: p.id + '-keys' },
      {
        start: (value) => emit('start', value),
        preview: (value) => emit('preview', value),
        commit: (value) => emit('commit', value),
        cancel: (value) => emit('cancel', value),
      },
    )
    expose({
      focus,
      cancel: () => {
        editor.cancel()
      },
    } satisfies SolTimeGridHandle)
    watch(snapshot, async () => {
      if (typeof document === 'undefined') return
      const active = document.activeElement,
        key = [...nodes].find(([, node]) => active && node.contains(active))?.[0]
      if (key === undefined || !active) return
      await nextTick()
      if (!active.isConnected && document.activeElement === document.body) focus(key)
    })
    return () => {
      const data = snapshot.value,
        error =
          p.error ||
          (!data || !editor.valid.value ? l.value.timeGridInvalid || l.value.invalidTime : '')
      if (!data)
        return h(
          'section',
          {
            ...mergeProps(attrs, editor.events),
            class: ['sol-ui-time-grid', attrs.class],
            ref: host,
            tabindex: attrs.tabindex ?? -1,
            id: p.id,
            'aria-labelledby': p.id + '-label',
          },
          [
            h('h3', { id: p.id + '-label' }, p.label),
            h('p', { class: 'sol-ui-error', role: 'alert' }, error),
          ],
        )
      const span = data.endMinute - data.startMinute,
        ticks = timeGridTicks(data.startMinute, data.endMinute),
        top = (minute: number) => ((minute - data.startMinute) / span) * 100 + '%',
        height = (start: number, end: number) => ((end - start) / span) * 100 + '%',
        columns = `calc(var(--sol-control-height) * 1.5) repeat(${data.columns.length},minmax(calc(var(--sol-control-height) * 4),1fr))`,
        bodyHeight = `calc(var(--sol-control-height) * ${span / 30})`,
        minimumWidth = `calc(var(--sol-control-height) * ${1.5 + 4 * data.columns.length})`
      return h(
        'section',
        {
          ...mergeProps(attrs, editor.events),
          class: ['sol-ui-time-grid', attrs.class],
          ref: host,
          tabindex: attrs.tabindex ?? -1,
          id: p.id,
          'aria-labelledby': p.id + '-label',
          'aria-busy': p.loading ? 'true' : undefined,
        },
        [
          h('h3', { id: p.id + '-label' }, p.label),
          p.help || slots.help
            ? h('div', { class: 'sol-ui-hint', id: p.id + '-help' }, slots.help?.() || p.help)
            : null,
          error ? h('p', { class: 'sol-ui-error', role: 'alert' }, error) : null,
          !p.readonly
            ? h('p', { class: 'sol-ui-hint', id: p.id + '-keys' }, l.value.timeGridKeys)
            : null,
          p.loading
            ? h(
                'p',
                { class: 'sol-ui-hint', role: 'status' },
                l.value.timeGridLoading || l.value.loading,
              )
            : null,
          data.columns.length
            ? h(
                'div',
                {
                  ref: scroll,
                  class: 'sol-ui-time-grid-scroll',
                  tabindex: 0,
                  role: 'region',
                  'aria-label': l.value.timeGridScroll || p.label,
                  'aria-describedby': p.help || slots.help ? p.id + '-help' : undefined,
                },
                [
                  h(
                    'div',
                    {
                      class: 'sol-ui-time-grid-head',
                      style: { gridTemplateColumns: columns, minWidth: minimumWidth },
                    },
                    [
                      h('span', { 'aria-hidden': 'true' }),
                      ...data.columns.map((column, index) =>
                        h(
                          'div',
                          {
                            key: column.key,
                            id: p.id + '-column-' + index,
                            class: 'sol-ui-time-grid-heading',
                          },
                          [
                            h('strong', column.label),
                            column.date
                              ? h(
                                  'time',
                                  { datetime: column.date },
                                  formatSolDate(column.date, l.value),
                                )
                              : null,
                          ],
                        ),
                      ),
                    ],
                  ),
                  h(
                    'div',
                    {
                      class: 'sol-ui-time-grid-body',
                      style: { gridTemplateColumns: columns, minWidth: minimumWidth },
                    },
                    [
                      h(
                        'div',
                        {
                          class: 'sol-ui-time-grid-axis',
                          style: { height: bodyHeight },
                          'aria-hidden': 'true',
                        },
                        ticks.map((minute) =>
                          h('span', { key: minute, style: { top: top(minute) } }, time(minute)),
                        ),
                      ),
                      ...data.columns.map((column, index) =>
                        h(
                          'div',
                          {
                            key: column.key,
                            ref: (node: unknown) => {
                              if (node) columnNodes.set(column.key, node as HTMLElement)
                              else columnNodes.delete(column.key)
                            },
                            role: 'group',
                            'aria-labelledby': p.id + '-column-' + index,
                            class: 'sol-ui-time-grid-column',
                            style: { height: bodyHeight },
                          },
                          [
                            ...ticks.map((minute) =>
                              h('div', {
                                key: 'line-' + minute,
                                class: 'sol-ui-time-grid-line',
                                style: { top: top(minute) },
                                'aria-hidden': 'true',
                              }),
                            ),
                            ...data.bands
                              .filter(
                                (band) =>
                                  (band.columnKey === undefined || band.columnKey === column.key) &&
                                  band.startMinute < data.endMinute &&
                                  band.endMinute > data.startMinute,
                              )
                              .map((band) =>
                                h(
                                  'div',
                                  {
                                    key: 'band-' + band.id,
                                    class: 'sol-ui-time-grid-band',
                                    role: 'note',
                                    'aria-label':
                                      band.label +
                                      ' ' +
                                      time(band.startMinute) +
                                      '–' +
                                      time(band.endMinute),
                                    style: {
                                      top: top(Math.max(band.startMinute, data.startMinute)),
                                      height: height(
                                        Math.max(band.startMinute, data.startMinute),
                                        Math.min(band.endMinute, data.endMinute),
                                      ),
                                      background: band.category
                                        ? `var(--sol-color-categorical-${band.category.slice(1)}-background)`
                                        : undefined,
                                      color: band.category
                                        ? `var(--sol-color-categorical-${band.category.slice(1)}-foreground)`
                                        : undefined,
                                      borderColor: band.category
                                        ? `var(--sol-color-categorical-${band.category.slice(1)}-border)`
                                        : undefined,
                                    },
                                  },
                                  slots.band?.({ band, column }) || band.label,
                                ),
                              ),
                            ...(layouts.value.get(column.key) || []).map((entry) => {
                              const scope: SolTimeGridItemScope<unknown> = {
                                item: entry.item as Readonly<unknown>,
                                key: entry.key,
                                column,
                                startMinute: entry.startMinute,
                                endMinute: entry.endMinute,
                                clipped:
                                  entry.visibleStart !== entry.startMinute ||
                                  entry.visibleEnd !== entry.endMinute,
                                ...editor.scope(entry.key),
                              }
                              return h(
                                'article',
                                {
                                  key: 'item:' + typeof entry.key + ':' + String(entry.key),
                                  ref: (node: unknown) => {
                                    if (node) nodes.set(entry.key, node as HTMLElement)
                                    else nodes.delete(entry.key)
                                  },
                                  tabindex: 0,
                                  class: [
                                    'sol-ui-time-grid-item',
                                    !p.readonly ? 'sol-ui-time-grid-item--editable' : undefined,
                                  ],
                                  'data-active': String(editor.state.value?.key === entry.key),
                                  'aria-busy': editor.pending(entry.key) ? 'true' : undefined,
                                  'aria-describedby': !p.readonly ? p.id + '-keys' : undefined,
                                  'aria-label':
                                    entry.label +
                                    ' · ' +
                                    column.label +
                                    ' · ' +
                                    time(entry.startMinute) +
                                    '–' +
                                    time(entry.endMinute),
                                  style: {
                                    top: top(entry.visibleStart),
                                    height: height(
                                      entry.visibleStart,
                                      Math.max(entry.visibleEnd, entry.visibleStart + 30),
                                    ),
                                    insetInlineStart: (entry.lane / entry.lanes) * 100 + '%',
                                    inlineSize: 100 / entry.lanes + '%',
                                  },
                                },
                                [
                                  ...(slots.item?.(scope) || [
                                    h(
                                      'strong',
                                      { class: 'sol-ui-time-grid-item-title' },
                                      entry.label,
                                    ),
                                    h(
                                      'span',
                                      { class: 'sol-ui-time-grid-item-time' },
                                      time(entry.startMinute) + '–' + time(entry.endMinute),
                                    ),
                                  ]),
                                  ...editor.handles(
                                    entry,
                                    Math.max(30, entry.visibleEnd - entry.visibleStart),
                                  ),
                                ],
                              )
                            }),
                            editor.preview(column.key),
                          ],
                        ),
                      ),
                    ],
                  ),
                ],
              )
            : null,
          !p.readonly ? editor.status() : null,
          editor.renderToolbar(),
          data.entries.length
            ? h('details', { class: 'sol-ui-time-grid-agenda' }, [
                h('summary', l.value.timeGridList || p.label),
                h(
                  'ul',
                  data.entries.map((entry) => {
                    const column = data.columns.find((column) => column.key === entry.columnKey)!
                    return h('li', { key: entry.key }, [
                      h('strong', entry.label),
                      h(
                        'span',
                        column.label +
                          (column.date ? ' · ' + formatSolDate(column.date, l.value) : '') +
                          ' · ' +
                          time(entry.startMinute) +
                          '–' +
                          time(entry.endMinute),
                      ),
                      editor.pending(entry.key)
                        ? h(
                            'span',
                            { role: 'status' },
                            l.value.timeGridPending || l.value.progressPending,
                          )
                        : null,
                      editor.agendaActions(entry),
                    ])
                  }),
                ),
              ])
            : null,
          !data.entries.length
            ? h(
                'div',
                { class: 'sol-ui-hint' },
                slots.empty?.() || l.value.timeGridEmpty || l.value.noResults,
              )
            : null,
        ],
      )
    }
  },
}) as unknown as SolTimeGridComponent
