import {computed, defineComponent, h, inject, nextTick, onBeforeUnmount, provide, ref, shallowReactive, watch, watchEffect} from 'vue';
import type {ComputedRef, InjectionKey, PropType} from 'vue';
import {VForm} from 'vuetify/components/VForm';
import {useSolLocale} from './locale';
import type {SolLocale} from './locale';

/** Rules are synchronous. Server/async results belong in serverError/errorMessages. */
export type SRule<T = unknown> = (value: T, locale: SolLocale) => boolean | string;
export interface SFieldHandle {focus(): void; validate(): boolean; resetValidation(): void}
export interface SFormError {id: string; label: string; errorMessages: string[]}
export interface SFormResult {valid: boolean; errors: SFormError[]; cancelled?: boolean}
export interface SFormHandle {validate(): Promise<SFormResult>; resetValidation(): void; focus(): void}
export type SFormSubmitEvent = SubmitEvent & Promise<SFormResult>;

/** 0 is filled; false, null/undefined, whitespace and an empty array are not. */
export function isSFieldFilled(value: unknown): boolean {
  return value !== null && value !== undefined && value !== false &&
    (typeof value !== 'string' || value.trim().length > 0) &&
    (!Array.isArray(value) || value.length > 0);
}
export const sRules = Object.freeze({
  required: (message?: string): SRule => (value, locale) => isSFieldFilled(value) || message || locale.validationRequired,
  minLength: (minimum: number, message?: string): SRule => (value, locale) => {
    if (!Number.isInteger(minimum) || minimum < 0) return message || locale.validationInvalid;
    return (typeof value === 'string' || Array.isArray(value)) && value.length >= minimum || message || locale.validationMinLength(minimum);
  }
});
export const validationProps = {
  rules: {type: Array as PropType<readonly SRule<any>[]>, default: () => []},
  errorMessages: {type: [String, Array] as PropType<string | readonly string[]>, default: ''},
  serverError: {type: String, default: ''}
};
interface ValidationProps {
  id: string; label: string; required?: boolean; disabled?: boolean; readonly?: boolean;
  error?: string; rules?: readonly SRule<any>[]; errorMessages?: string | readonly string[];
  serverError?: string; locale?: Partial<SolLocale>;
}
interface RegisteredField {
  id: string; label: () => string; disabled: () => boolean; error: ComputedRef<string>;
  validate(): boolean; resetValidation(): void; focus(): void;
}
interface NativeFormResult {valid: boolean; errors: {id: string | number; errorMessages: string[]}[]}
interface FormContext {
  disabled: ComputedRef<boolean>; readonly: ComputedRef<boolean>;
  register(field: RegisteredField): () => void;
}
const SFormKey: InjectionKey<FormContext> = Symbol('SForm');
interface FieldState {error: ComputedRef<string>; context?: FormContext}
const fieldStates = new WeakMap<object, FieldState>();
export function externalFieldError(p: ValidationProps): string {
  return p.serverError || p.error || (typeof p.errorMessages === 'string' ? p.errorMessages : p.errorMessages?.filter(Boolean).join(' ')) || '';
}
export function fieldError(p: ValidationProps): string {return fieldStates.get(p)?.error.value ?? externalFieldError(p);}
export function fieldDisabled(p: ValidationProps): boolean {return !!p.disabled || !!fieldStates.get(p)?.context?.disabled.value;}
export function fieldReadonly(p: ValidationProps): boolean {return !!p.readonly || !!fieldStates.get(p)?.context?.readonly.value;}

/** Shared registration/validation for native S inputs and the VTextField wrapper. */
export function useSFieldValidation(p: ValidationProps, value: () => unknown, options: {
  focus(): void; validateIntrinsic?: () => boolean; intrinsicError?: () => string; resetIntrinsic?: () => void;
}): SFieldHandle {
  const context = inject(SFormKey, undefined), locale = useSolLocale(() => p.locale);
  const message = ref(''), validated = ref(false);
  const error = computed(() => fieldDisabled(p) ? '' : externalFieldError(p) || options.intrinsicError?.() || message.value);
  fieldStates.set(p, {error, context});
  function checkRules() {
    if (fieldDisabled(p)) {message.value = ''; return;}
    let result = '';
    for (const rule of p.rules || []) {
      try {
        const outcome = rule(value(), locale.value);
        if (outcome !== true) {result = typeof outcome === 'string' && outcome ? outcome : locale.value.validationInvalid; break;}
      } catch {result = locale.value.validationInvalid; break;}
    }
    if (!result && p.required && !isSFieldFilled(value())) result = locale.value.validationRequired;
    message.value = result;
  }
  function validate() {
    if (fieldDisabled(p)) {message.value = ''; return true;}
    validated.value = true;
    const intrinsic = options.validateIntrinsic?.() ?? true;
    checkRules();
    return intrinsic && !error.value;
  }
  function resetValidation() {validated.value = false; message.value = ''; options.resetIntrinsic?.();}
  watch([value, () => p.rules, () => p.required, locale], () => {if (validated.value) checkRules();}, {deep: true});
  watch(() => fieldDisabled(p), disabled => {if (disabled) resetValidation();});
  const unregister = context?.register({id: p.id, label: () => p.label, disabled: () => fieldDisabled(p), error, validate, resetValidation, focus: options.focus});
  onBeforeUnmount(() => {unregister?.(); fieldStates.delete(p);});
  return {focus: options.focus, validate, resetValidation};
}

export const SForm = defineComponent({
  name: 'SForm', inheritAttrs: false,
  props: {modelValue: {type: Boolean as PropType<boolean | null>, default: null}, disabled: Boolean, readonly: Boolean, fastFail: Boolean},
  emits: {'update:modelValue': (_value: boolean | null) => true, submit: (_event: SFormSubmitEvent) => true},
  setup(p, {attrs, slots, emit, expose}) {
    const native = ref<InstanceType<typeof VForm> | null>(null), fields = shallowReactive(new Map<string, RegisteredField>());
    const errors = ref<SFormError[]>([]), nativeErrors = ref<SFormError[]>([]), submitted = ref(false), validating = ref(false), nativeValid = ref<boolean | null>(null);
    const pending = new Set<number>(); let revision = 0, resetPending = false;
    provide(SFormKey, {disabled: computed(() => p.disabled), readonly: computed(() => p.readonly), register(field) {
      if (fields.has(field.id)) throw new Error('SForm field id must be unique: ' + field.id);
      fields.set(field.id, field); return () => fields.delete(field.id);
    }});
    const fieldErrors = () => [...fields.values()].filter(field => !field.disabled() && field.error.value).map(field => ({id: field.id, label: field.label(), errorMessages: [field.error.value]}));
    const combinedErrors = () => [...fieldErrors(), ...nativeErrors.value.filter(item => !fields.has(item.id))];
    watch(() => native.value?.errors, value => {if (!resetPending) nativeErrors.value = (value || []).map(item => ({id: String(item.id), label: String(item.id), errorMessages: item.errorMessages}));}, {deep: true});
    const valid = computed<boolean | null>(() => fieldErrors().length || nativeValid.value === false ? false : submitted.value ? true : null);
    watchEffect(() => {if (submitted.value) errors.value = combinedErrors(); emit('update:modelValue', valid.value);});
    function validate(): Promise<SFormResult> {return performValidation();}
    async function performValidation(nativeReady?: Promise<NativeFormResult>): Promise<SFormResult> {
      const current = ++revision; pending.add(current); resetPending = false;
      validating.value = true; submitted.value = true;
      try {
        const nativeResult = await (nativeReady || native.value?.validate());
        if (current !== revision) return {valid: false, errors: [], cancelled: true};
        nativeValid.value = nativeResult?.valid ?? true;
        const ownErrors: SFormError[] = [];
        for (const field of fields.values()) {
          if (field.disabled()) continue;
          if (!field.validate()) ownErrors.push({id: field.id, label: field.label(), errorMessages: [field.error.value || '입력값을 확인해 주세요.']});
          if (p.fastFail && ownErrors.length) break;
        }
        for (const item of nativeResult?.errors || []) if (!fields.has(String(item.id))) ownErrors.push({id: String(item.id), label: String(item.id), errorMessages: item.errorMessages});
        errors.value = ownErrors;
        nativeValid.value = !ownErrors.length;
        return {valid: !ownErrors.length, errors: ownErrors};
      } finally {
        pending.delete(current); validating.value = pending.size > 0;
        if (resetPending && !pending.size) {
          const resetRevision = revision;
          native.value?.resetValidation(); nativeErrors.value = []; nativeValid.value = null;
          // VForm/VTextField publish reset state on their next ticks as well.
          await nextTick(); await nextTick();
          if (resetRevision === revision && !pending.size) resetPending = false;
        }
      }
    }
    function resetValidation() {revision++; resetPending = pending.size > 0; for (const field of fields.values()) field.resetValidation(); native.value?.resetValidation(); errors.value = []; nativeErrors.value = []; submitted.value = false; nativeValid.value = null;}
    function focus() {const list = [...fields.values()].filter(field => !field.disabled()); (list.find(field => field.error.value) || list[0])?.focus();}
    expose({validate, resetValidation, focus} satisfies SFormHandle);
    onBeforeUnmount(() => {revision++; resetPending = true;});
    return () => h(VForm, {...attrs, ref: native, modelValue: nativeValid.value, disabled: p.disabled, readonly: p.readonly, fastFail: p.fastFail,
      'onUpdate:modelValue': (value: boolean | null) => {if (!resetPending) nativeValid.value = value;},
      onSubmit: (event: SubmitEvent) => {
        event.preventDefault();
        // VForm has already started native validation before emitting submit. Reuse it.
        const nativeSubmission = event as SubmitEvent & Promise<NativeFormResult>;
        const nativeReady = typeof nativeSubmission.then === 'function'
          ? new Promise<NativeFormResult>((resolve, reject) => nativeSubmission.then(resolve, reject))
          : undefined;
        const ready = performValidation(nativeReady), submission = event as SFormSubmitEvent;
        submission.then = ready.then.bind(ready); submission.catch = ready.catch.bind(ready); submission.finally = ready.finally.bind(ready);
        emit('submit', submission);
      }, onReset: () => resetValidation()
    }, {default: () => slots.default?.({validate, resetValidation, focus, errors: errors.value, isValid: valid.value, isValidating: validating.value})});
  }
});
