import { defineComponent, h, useId, warn, watch } from 'vue'
import type { Component, PropType, VNode } from 'vue'
import { solIconPaths } from '@solyi/core/icons'
import type { SolIconName } from '@solyi/core/icons'
import { useSolLocale } from './locale'
import type { SolLocale } from './locale'
import type { ButtonVariant, SButtonTone } from './index'

export type SolTone = 'neutral' | 'accent' | 'info' | 'success' | 'warning' | 'danger'
export type SolTagVariant = 'filled' | 'outlined' | 'subtle'
export type SolTagSize = 'sm' | 'md'

const tagProps = {
  tone: { type: String as PropType<SolTone>, default: 'neutral' },
  variant: { type: String as PropType<SolTagVariant>, default: 'subtle' },
  size: { type: String as PropType<SolTagSize>, default: 'md' },
}
const iconSize = { type: Number as PropType<16 | 20 | 24>, default: 20 }

function textContent(nodes: readonly VNode[] | undefined): string {
  return (nodes || [])
    .map((node) => {
      if (typeof node.children === 'string') return node.children
      return Array.isArray(node.children)
        ? node.children
            .map((child) =>
              typeof child === 'object' && child !== null
                ? textContent([child as VNode])
                : String(child ?? ''),
            )
            .join('')
        : ''
    })
    .join('')
    .trim()
}

export const SIcon = defineComponent({
  name: 'SIcon',
  inheritAttrs: false,
  props: {
    name: { type: String as PropType<SolIconName>, required: true },
    size: iconSize,
    decorative: { type: Boolean, default: undefined },
    label: String,
    rotate: { type: Number as PropType<0 | 90 | 180 | 270>, default: 0 },
  },
  setup(p, { attrs }) {
    watch(
      () => [p.name, p.decorative, p.label, p.size, p.rotate],
      () => {
        if (!Object.hasOwn(solIconPaths, p.name)) warn(`SIcon: unknown icon "${p.name}".`)
        if (p.decorative === false && !p.label?.trim())
          warn('SIcon: a meaningful icon requires label.')
        if (![16, 20, 24].includes(p.size)) warn('SIcon: size must be 16, 20 or 24.')
        if (![0, 90, 180, 270].includes(p.rotate)) warn('SIcon: rotate must be 0, 90, 180 or 270.')
      },
      { immediate: true },
    )
    return () => {
      const size = [16, 20, 24].includes(p.size) ? p.size : 20
      const meaningful = p.decorative !== true && !!p.label?.trim()
      const path = Object.hasOwn(solIconPaths, p.name) ? solIconPaths[p.name] : undefined
      const rotate = [0, 90, 180, 270].includes(p.rotate) ? p.rotate : 0
      return h(
        'svg',
        {
          ...attrs,
          class: ['sol-icon', 'sol-ui-icon-display', 'size-' + size, attrs.class],
          width: size,
          height: size,
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          'stroke-width': 1.6,
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          focusable: 'false',
          role: meaningful ? 'img' : undefined,
          'aria-label': meaningful ? p.label : undefined,
          'aria-hidden': meaningful ? undefined : 'true',
        },
        path
          ? [h('path', { d: path, transform: rotate ? `rotate(${rotate} 12 12)` : undefined })]
          : [],
      )
    }
  },
})

export const SChip = defineComponent({
  name: 'SChip',
  inheritAttrs: false,
  props: {
    ...tagProps,
    label: String,
    selectable: Boolean,
    selected: Boolean,
    disabled: Boolean,
    removable: Boolean,
    removeLabel: String,
    locale: Object as PropType<Partial<SolLocale>>,
  },
  emits: {
    'update:selected': (_selected: boolean) => true,
    click: (_event: MouseEvent) => true,
    remove: (_event: MouseEvent) => true,
  },
  setup(p, { attrs, slots, emit }) {
    const l = useSolLocale(() => p.locale)
    return () => {
      const content = slots.default?.() || p.label
      const label = p.label || (Array.isArray(content) ? textContent(content) : content) || ''
      const { class: className, style, ...controlAttrs } = attrs
      const unavailable =
        p.disabled || attrs['aria-disabled'] === true || attrs['aria-disabled'] === 'true'
      const body = [
        slots.leading
          ? h('span', { class: 'sol-ui-tag-icon', 'aria-hidden': 'true' }, slots.leading())
          : null,
        p.selectable && p.selected ? h(SIcon, { name: 'check', size: 16, decorative: true }) : null,
        h('span', { class: 'sol-ui-tag-label' }, content),
        slots.trailing
          ? h('span', { class: 'sol-ui-tag-icon', 'aria-hidden': 'true' }, slots.trailing())
          : null,
      ]
      return h(
        'span',
        {
          ...(p.selectable ? {} : controlAttrs),
          class: ['sol-ui-tag', 'sol-ui-chip', className],
          style,
          'data-tone': p.tone,
          'data-variant': p.variant,
          'data-size': p.size,
          'data-selected': p.selectable && p.selected ? 'true' : undefined,
          'data-disabled': unavailable ? 'true' : undefined,
          title: attrs.title ?? label,
        },
        [
          p.selectable
            ? h(
                'button',
                {
                  ...controlAttrs,
                  type: 'button',
                  class: 'sol-ui-chip-main',
                  disabled: unavailable,
                  'aria-pressed': String(p.selected),
                  onClick: (event: MouseEvent) => {
                    if (unavailable) return
                    emit('update:selected', !p.selected)
                    emit('click', event)
                  },
                },
                body,
              )
            : h('span', { class: 'sol-ui-chip-main' }, body),
          p.removable
            ? h(
                'button',
                {
                  type: 'button',
                  class: 'sol-ui-chip-remove',
                  disabled: unavailable,
                  'aria-label': p.removeLabel || l.value.remove(label || l.value.selectedItems),
                  onClick: (event: MouseEvent) => {
                    event.stopPropagation()
                    if (!unavailable) emit('remove', event)
                  },
                },
                h(SIcon, { name: 'close', size: 16, decorative: true }),
              )
            : null,
        ],
      )
    }
  },
})

export const SBadge = defineComponent({
  name: 'SBadge',
  inheritAttrs: false,
  props: {
    ...tagProps,
    id: String,
    content: [String, Number],
    label: String,
    live: { type: String as PropType<'off' | 'polite'>, default: 'off' },
    placement: { type: String as PropType<'top-start' | 'top-end'>, default: 'top-end' },
  },
  setup(p, { attrs, slots }) {
    const fallbackId = useId()
    return () => {
      const id = p.id || 'sol-badge-' + fallbackId
      const content = slots.default?.() ?? p.content
      const badge = h(
        'span',
        {
          ...attrs,
          id,
          class: ['sol-ui-tag', 'sol-ui-badge', attrs.class],
          'data-tone': p.tone,
          'data-variant': p.variant,
          'data-size': p.size,
          role: p.live === 'polite' ? 'status' : p.label ? 'img' : undefined,
          'aria-label': p.live === 'off' ? p.label : undefined,
          'aria-live': p.live === 'polite' ? 'polite' : undefined,
          'aria-atomic': p.live === 'polite' ? 'true' : undefined,
          title:
            attrs.title ?? p.label ?? (Array.isArray(content) ? textContent(content) : content),
        },
        [
          h(
            'span',
            { class: 'sol-ui-badge-content', 'aria-hidden': p.label ? 'true' : undefined },
            [
              slots.icon
                ? h('span', { class: 'sol-ui-tag-icon', 'aria-hidden': 'true' }, slots.icon())
                : null,
              h('span', { class: 'sol-ui-tag-label' }, content),
            ],
          ),
          p.label && p.live === 'polite' ? h('span', { class: 'sol-ui-sr-only' }, p.label) : null,
        ],
      )
      return slots.anchor
        ? h(
            'span',
            {
              class: 'sol-ui-badge-anchor',
              'data-placement': p.placement,
            },
            [slots.anchor({ descriptionId: id }), badge],
          )
        : badge
    }
  },
})

/** Keep SBtn's click/loading contract in one implementation without an import cycle. */
export function createSIconBtn(button: Component) {
  return defineComponent({
    name: 'SIconBtn',
    inheritAttrs: false,
    props: {
      label: { type: String, required: true, validator: (value: string) => !!value.trim() },
      icon: String as PropType<SolIconName>,
      size: iconSize,
      variant: { type: String as PropType<ButtonVariant>, default: 'secondary' },
      tone: String as PropType<SButtonTone>,
      disabled: Boolean,
      loading: Boolean,
      type: { type: String as PropType<'button' | 'submit' | 'reset'>, default: 'button' },
    },
    emits: { click: (_event: MouseEvent) => true },
    setup(p, { attrs, slots, emit }) {
      watch(
        () => [p.label, p.icon],
        () => {
          if (!p.label?.trim()) warn('SIconBtn: label must be a nonempty accessible name.')
          if (!p.icon && !slots.default) warn('SIconBtn: provide icon or a default icon slot.')
        },
        { immediate: true },
      )
      return () =>
        !p.label?.trim() || (!p.icon && !slots.default)
          ? h('span', { 'aria-hidden': 'true' })
          : h(
              button,
              {
                ...attrs,
                class: ['sol-ui-icon-button', attrs.class],
                'aria-label': p.label,
                type: p.type,
                variant: p.variant,
                tone: p.tone,
                disabled: p.disabled,
                loading: p.loading,
                onClick: (event: MouseEvent) => emit('click', event),
              },
              {
                default: () =>
                  slots.default?.() ||
                  (p.icon
                    ? h(SIcon, {
                        name: p.icon,
                        size: p.size,
                        decorative: true,
                      })
                    : null),
              },
            )
    },
  })
}
