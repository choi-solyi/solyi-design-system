import {defineComponent,h} from 'vue';
import type {PropType,Component} from 'vue';
import {VBtn} from 'vuetify/components/VBtn';

export type ButtonVariant='primary'|'secondary'|'subtle'|'inline';
export type SButtonTone='accent'|'info'|'success'|'warning'|'danger';
export const SBtn = /* @__PURE__ */ defineComponent({
  name: 'SBtn',
  inheritAttrs: false,
  props: {
    variant: { type: String as PropType<ButtonVariant>, default: 'secondary' },
    tone: String as PropType<SButtonTone>,
    disabled: Boolean,
    loading: Boolean,
    type: { type: String as PropType<'button' | 'submit' | 'reset'>, default: 'button' },
  },
  emits: { click: (_event: MouseEvent) => true },
  setup(props, { attrs, slots, emit }) {
    return () => {
      const unavailable =
        props.disabled ||
        props.loading ||
        attrs['aria-disabled'] === true ||
        attrs['aria-disabled'] === 'true'
      return h(
        VBtn as Component,
        {
          ...attrs,
          'data-tone': props.tone || attrs['data-tone'],
          class: [
            'sol-ui-button',
            'sol-ui-button--' + props.variant,
            props.tone ? 'sol-tone' : undefined,
            attrs.class,
          ],
          type: props.type,
          disabled: props.disabled,
          loading: props.loading,
          tabindex: props.loading ? (attrs.tabindex ?? 0) : attrs.tabindex,
          'aria-disabled': unavailable ? 'true' : attrs['aria-disabled'],
          'aria-busy': props.loading ? 'true' : attrs['aria-busy'],
          ripple: false,
          variant: 'flat',
          onClick: (event: MouseEvent) => {
            if (unavailable) {
              event.preventDefault()
              return
            }
            emit('click', event)
          },
        },
        {
          default: () => slots.default?.(),
          loader: () => h('span', { class: 'sol-ui-busy', 'aria-hidden': 'true' }, '◷'),
        },
      )
    }
  },
})

