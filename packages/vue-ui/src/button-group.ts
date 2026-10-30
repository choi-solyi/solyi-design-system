import { defineComponent, h } from 'vue'
import type { PropType, SlotsType, VNodeChild } from 'vue'

/** Command grouping only. Each child owns its action, loading and disabled state. */
export const SBtnGroup = /* @__PURE__ */ defineComponent({
  name: 'SBtnGroup',
  inheritAttrs: false,
  props: {
    label: { type: String, required: true },
    orientation: { type: String as PropType<'horizontal' | 'vertical'>, default: 'horizontal' },
  },
  slots: Object as SlotsType<{ default?: () => VNodeChild }>,
  setup(p, { attrs, slots }) {
    return () => h('div', { ...attrs, role: 'group', 'aria-label': p.label, class: ['sol-ui-button-group', attrs.class], 'data-orientation': p.orientation }, [slots.default?.()])
  },
})
