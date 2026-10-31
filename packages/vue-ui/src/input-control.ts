import {solIconPaths} from '@solyi/core/icons';
import { cloneVNode, h, nextTick, onBeforeUnmount } from 'vue'
import type { Slots, VNode, VNodeChild } from 'vue'
import type { SFieldHandle } from './form'
import type { SolLocale } from './locale'
import type { SolIconName } from '@solyi/core/icons'
import { SIcon ,renderSolIcon} from './primitives'

export interface SolInputClearEvent<T> {
  readonly value: T
  readonly reason: 'clear'
}
export interface SolInputHandle extends SFieldHandle {
  clear(): void
}
export interface SolInputControlScope {
  readonly hasValue: boolean
  readonly disabled: boolean
  readonly readonly: boolean
  readonly loading: boolean
  readonly error: string
  clear(): void
}
export interface SolInputControlSlots {
  label?: () => VNode[]
  help?: () => VNode[]
  leading?: (scope: SolInputControlScope) => VNode[]
  trailing?: (scope: SolInputControlScope) => VNode[]
  indicator?: (scope: SolInputControlScope) => VNode[]
  status?: (scope: SolInputControlScope) => VNode[]
  loading?: (scope: SolInputControlScope) => VNode[]
}
export const inputControlProps = { clearable: Boolean, loading: Boolean }
interface Props {
  label: string
  clearable: boolean
  loading: boolean
}
interface Options {
  always?: boolean
  locale(): SolLocale
  hasValue(): boolean
  disabled(): boolean
  readonly(): boolean
  error(): string
  loading?(): boolean
  clear(): void
  reconcile?(): void
  validate(): unknown
  focus(): void
  element(): Element | null | undefined
  icon?: SolIconName
  actions?(): VNodeChild
  trigger?: (icon: VNodeChild) => VNode
}
const content = (items: VNodeChild[]) =>
  items.flat().filter(value => value !== null && value !== undefined && value !== false)

export function preserveInputFocus(event: PointerEvent, element: Element | null | undefined) {
  if (document.activeElement === element) event.preventDefault()
}
export function isPointerActivation(event: MouseEvent) {
  return event.detail > 0 || !!(event as PointerEvent).pointerType
}

/** One clear/focus lifecycle and action layout; value/event semantics remain in each input. */
export function useInputControl(p: Props, slots: Slots, options: Options) {
  let disposed = false
  onBeforeUnmount(() => {
    disposed = true
  })
  const scope = (): SolInputControlScope => ({
    hasValue: options.hasValue(),
    disabled: options.disabled(),
    readonly: options.readonly(),
    loading: p.loading || !!options.loading?.(),
    error: options.error(),
    clear,
  })
  function clear(event?: MouseEvent) {
    if (disposed || options.disabled() || options.readonly()) return
    const previous = typeof document === 'undefined' ? null : document.activeElement
    options.clear()
    void nextTick(() => {
      if (disposed) return
      options.reconcile?.()
      options.validate()
      if (options.disabled() || typeof document === 'undefined') return
      const current = document.activeElement,
        element = options.element()
      if (event && isPointerActivation(event)) return
      const owned = element?.closest('.sol-ui-input-frame,.sol-ui-input-enhanced')
      if (
        current &&
        current !== document.body &&
        current !== previous &&
        current !== element &&
        !owned?.contains(current)
      )
        return
      options.focus()
    })
  }
  const decorated = () =>
    p.clearable ||
    p.loading ||
    ['leading', 'trailing', 'indicator', 'status', 'loading'].some(name => !!slots[name])
  const enhanced = () => options.always || decorated()
  function indicator() {
    return (
      slots.indicator?.(scope()) ||
      h(SIcon, { name: options.icon || 'chevron', size: 20, decorative: true })
    )
  }
  function leading() {
    const nodes = slots.leading?.(scope())
    return nodes?.length ? h('span', { class: 'sol-ui-input-leading' }, nodes) : null
  }
  function rail(includeIndicator = true) {
    const state = scope(),
      locale = options.locale()
    const nodes = content([
      slots.trailing?.(state),
      state.loading
        ? slots.loading?.(state) ||
          h(
            'span',
            {
              class: 'sol-ui-input-loading',
              role: 'progressbar',
              'aria-label': locale.inputLoading,
            },
            h('span', { class: 'sol-ui-input-spinner', 'aria-hidden': 'true' }),
          )
        : null,
      slots.status?.(state) ||
        (state.error
          ? h(
              'span',
              { class: 'sol-ui-input-status', 'aria-hidden': 'true' },
              renderSolIcon(solIconPaths.info,16,0),
            )
          : null),
      p.clearable && state.hasValue && !state.disabled && !state.readonly
        ? h(
            'button',
            {
              type: 'button',
              class: 'sol-button sol-ui-input-clear',
              'aria-label': p.label + ' ' + locale.clear,
              onMousedown: (event: MouseEvent) => { event.preventDefault(); event.stopPropagation() },
              onPointerdown: (event: PointerEvent) => preserveInputFocus(event, options.element()),
              onClick: clear,
            },
            renderSolIcon(solIconPaths.close,16,0),
          )
        : null,
      options.actions?.(),
      options.trigger
        ? cloneVNode(options.trigger(indicator()), { class: 'sol-ui-input-trigger' })
        : includeIndicator
          ? slots.indicator?.(state)
          : null,
    ])
    return nodes.length ? h('div', { class: 'sol-ui-input-rail' }, nodes) : null
  }
  function native(node: VNode, settings: { multiline?: boolean; select?: boolean } = {}) {
    if (!enhanced()) return node
    const state = scope(),
      customIndicator = settings.select && !!slots.indicator
    return h(
      'div',
      {
        class: [
          'sol-ui-input-frame',
          settings.multiline ? 'sol-ui-input-frame--multiline' : undefined,
        ],
        'data-disabled': state.disabled ? 'true' : undefined,
        'data-error': state.error ? 'true' : undefined,
        'aria-busy': state.loading ? 'true' : undefined,
      },
      [
        leading(),
        h('span', { class: 'sol-ui-input-core' }, [
          cloneVNode(node, {
            class: [
              'sol-ui-input-native',
              customIndicator ? 'sol-ui-input-native--indicator' : undefined,
            ],
            'aria-busy': state.loading ? 'true' : undefined,
          }),
          customIndicator
            ? h(
                'span',
                { class: 'sol-ui-input-overlay-indicator', 'aria-hidden': 'true' },
                slots.indicator?.(state),
              )
            : null,
        ]),
        rail(!settings.select),
      ],
    )
  }
  function vuetifySlots() {
    return enhanced()
      ? { ...(slots.leading ? { 'prepend-inner': leading } : {}), 'append-inner': () => rail() }
      : {}
  }
  return { clear, scope, decorated, enhanced, native, vuetifySlots }
}
