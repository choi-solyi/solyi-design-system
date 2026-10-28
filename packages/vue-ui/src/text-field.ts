import { defineComponent, h, ref } from 'vue'
import type { Component, PropType, SlotsType } from 'vue'
import { VTextField } from 'vuetify/components/VTextField'
import { commonFieldProps, fieldDescription, fieldLabel, fieldMessages } from './controls'
import { fieldDisabled, fieldError, fieldReadonly, useSFieldValidation } from './form'
import { useSolLocale } from './locale'
import { inputControlProps, useInputControl } from './input-control'
import type { SolInputClearEvent, SolInputControlSlots } from './input-control'

export const STextField = defineComponent({
  name: 'STextField',
  inheritAttrs: false,
  props: {
    ...commonFieldProps,
    ...inputControlProps,
    modelValue: { type: String, default: '' },
    type: {
      type: String as PropType<'text' | 'search' | 'email' | 'password' | 'tel' | 'url'>,
      default: 'text',
    },
  },
  slots: Object as SlotsType<SolInputControlSlots>,
  emits: {
    'update:modelValue': (_value: string) => true,
    blur: (_event: FocusEvent) => true,
    focus: (_event: FocusEvent) => true,
    clear: (_event: SolInputClearEvent<string>) => true,
  },
  setup(p, { attrs, slots, emit, expose }) {
    const l = useSolLocale(() => p.locale),
      field = ref<{ focus?: () => void } | null>(null)
    const validation = useSFieldValidation(p, () => p.modelValue, {
      focus: () => field.value?.focus?.(),
    })
    const control = useInputControl(p, slots, {
      locale: () => l.value,
      hasValue: () => p.modelValue.length > 0,
      disabled: () => fieldDisabled(p),
      readonly: () => fieldReadonly(p),
      error: () => fieldError(p),
      clear: () => {
        if (p.modelValue !== '') emit('update:modelValue', '')
        emit('clear', { value: '', reason: 'clear' })
      },
      validate: validation.validate,
      focus: validation.focus,
      element: () => (typeof document === 'undefined' ? null : document.getElementById(p.id)),
    })
    expose({ ...validation, clear: control.clear })
    return () => {
      const error = fieldError(p)
      return h('div', { class: 'sol-ui-field' }, [
        fieldLabel(p, slots, l.value.required),
        h(
          VTextField as Component,
          {
            ...attrs,
            ref: field,
            id: p.id,
            modelValue: p.modelValue,
            'onUpdate:modelValue': (value: unknown) =>
              emit('update:modelValue', String(value ?? '')),
            type: p.type,
            disabled: fieldDisabled(p),
            readonly: fieldReadonly(p),
            required: p.required,
            error: !!error,
            'aria-invalid': String(!!error),
            'aria-busy': p.loading ? 'true' : undefined,
            'aria-describedby': fieldDescription(p, slots, error, attrs['aria-describedby']),
            hideDetails: true,
            variant: 'outlined',
            density: 'compact',
            clearable: false,
            class: [
              'sol-ui-input',
              control.enhanced() ? 'sol-ui-input-enhanced' : undefined,
              attrs.class,
            ],
            onBlur: (event: FocusEvent) => {
              validation.validate()
              emit('blur', event)
            },
            onFocus: (event: FocusEvent) => emit('focus', event),
          },
          control.vuetifySlots(),
        ),
        ...fieldMessages(p, slots, error),
      ])
    }
  },
})
