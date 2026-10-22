# Vue UI API · 0.3.0 preview

This document preserves the first14 APIs. Six additional exports make20 total; see [the new API contracts](ADVANCED-VUE-API.md). Actual exports below: the existing **SolButton / SolField / SolDialog / SolTable** plus the ten components below. All are built and packed from TypeScript; Vue/Vuetify and Core stay external. This is a private local-tarball preview, not an npm release. See [inventory and remaining examples](VUE-MIGRATION.md), [installation/update/rollback](LIBRARY.md) and [the real consumer source](examples/vue-vuetify/src/ExtendedExamples.vue).

## Shared contracts

- Form controls require a unique `id` and a visible `label`. `help`, `error`, `required`, `disabled`, `readonly`, native attributes and a component `locale` override are supported. Label/help slots are available; errors are plain strings linked with aria-describedby. The consuming app owns business errors and submitting data.
- Every editable value is controlled: bind `v-model` or handle `update:modelValue`. `change` reports committed changes. A parent that declines the event retains ownership; components do not mutate props, write storage or call a backend.
- Checkbox/Switch/Radio/Select use native input semantics. Readonly blocks changes while preserving reading/focus; disabled uses native disabled. Radio/Select option values must be unique, nonempty strings; null means no selection. Native labels remain clickable touch targets.
- Number/Date/Time retain invalid or partial typed drafts and emit only valid complete values, or null on clear. Enter/blur validates direct entry. `invalid(message)` reports parse/range/step failures. `validate()` commits a valid draft and `focus()` focuses the input; Date/Time also expose `clear()`. Explicit handle types are `SolNumberInputHandle` / `SolPickerHandle`.
- Slots: all field controls accept `label` / `help`; Tabs accepts `panel-${value}` (or default scoped `{item}`); Toast accepts default content and `action`. Native Select/Radio labels are text, not arbitrary interactive option markup.

| Export | v-model | Additional props / events |
|---|---|---|
| SolCheckbox | boolean | required; change(boolean), blur(FocusEvent) |
| SolRadioGroup | string or null | options: readonly SolOption[], optional native name; change(string) |
| SolSwitch | boolean | native checkbox with role=switch; change(boolean) |
| SolSelect | string or null | options, placeholder; change(string or null), blur |
| SolTextarea | string | rows (minimum3), maxlength, showCount; change(string), blur. Counter follows native UTF-16 maxlength units. |
| SolNumberInput | number or null | min/max, positive step (default1); change(number or null), invalid, blur. Step is anchored at min or0; empty +/- starts at min or0. |
| SolTabs | string | items: readonly SolTab[], activation automatic/manual, orientation horizontal/vertical, disabled/readonly; change(string) |
| SolToast | boolean visibility | required id/message, optional label, tone info/success/warning/danger, duration milliseconds (default0=persistent), live polite/assertive/off, dismissible, returnFocus; close(reason) |
| SolDatePicker | DateValue | mode single/range (defaultsingle); change(DateChange), invalid, open, close(PickerCloseReason) |
| SolTimePicker | HH:mm string or null | min/max (default00:00/23:59), positive integer minute step (default15); change, invalid, open, close |

```ts
interface SolOption { value:string; label:string; disabled?:boolean }
interface SolTab { value:string; label:string; disabled?:boolean }
type DateValue = string | {start:string; end:string} | null;
type DateMode = 'single' | 'range';
interface DateChange { mode:DateMode; value:DateValue; reason:'input'|'calendar'|'clear'|'mode' }
type ToastCloseReason = 'close' | 'timeout' | 'programmatic';
type PickerCloseReason = 'close' | 'escape' | 'outside' | 'select' | 'disabled' | 'mode';
```

## Usage · actual package imports

```vue
<script setup lang="ts">
import {ref} from 'vue';
import {SolCheckbox,SolRadioGroup,SolSwitch,SolSelect,SolTextarea,SolNumberInput,
  SolTabs,SolToast,SolDatePicker,SolTimePicker} from '@solyi/vue-ui';
import type {DateValue,SolPickerHandle} from '@solyi/vue-ui';
const checked=ref(false),radio=ref<string|null>('note'),enabled=ref(true),selected=ref<string|null>(null);
const note=ref(''),count=ref<number|null>(2),tab=ref('summary'),toast=ref(false);
const dates=ref<DateValue>({start:'2026-10-21',end:'2026-10-24'}),time=ref<string|null>('09:00');
const picker=ref<SolPickerHandle|null>(null);
const options=[{value:'note',label:'기록'},{value:'plan',label:'계획'}];
</script>
<template>
  <SolCheckbox id="agree" v-model="checked" label="가상 예시 확인" required/>
  <SolRadioGroup id="kind" v-model="radio" label="기록 종류" :options="options"/>
  <SolSwitch id="enabled" v-model="enabled" label="가상 알림 켜기"/>
  <SolSelect id="category" v-model="selected" label="분류" :options="options"/>
  <SolTextarea id="note" v-model="note" label="설명" :maxlength="120"/>
  <SolNumberInput id="count" v-model="count" label="개수" :min="0" :max="10" :step="2"/>
  <SolTabs id="record-tabs" v-model="tab" label="기록 정보"
    :items="[{value:'summary',label:'요약'},{value:'memo',label:'메모'}]">
    <template #panel-summary><p>요약 내용</p></template>
    <template #panel-memo><p>메모 내용</p></template>
  </SolTabs>
  <button type="button" @click="toast=true">알림 보기</button>
  <SolToast id="notice" v-model="toast" message="가상 작업을 확인했습니다." :duration="4000"/>
  <SolDatePicker id="schedule" ref="picker" v-model="dates" label="일정" mode="range"/>
  <SolTimePicker id="time" v-model="time" label="시각" min="09:00" max="18:00" :step="15"/>
</template>
```

Use `mode="single"` with a YYYY-MM-DD string/null for a single date. The starter's mode switch only demonstrates a developer setting; real apps can fix their mode.

## State and keyboard details

- Number: min/max/step errors preserve the typed draft. The input is a spinbutton with numeric bounds/current value only when valid; ArrowUp/Down and small +/- controls use the same step. Buttons stop at bounds, and do not silently turn an invalid value into an out-of-range model.
- Tabs: one roving Tab stop; orientation arrows and Home/End skip disabled items. Automatic activation changes on arrows; manual activation requires Enter/Space. Hidden panels stay mounted with hidden, preserving values and removing their descendants from normal navigation. If a selected item is removed/disabled, the first enabled item is reported; readonly/disabled does not silently mutate the model. Disabling tab navigation does not automatically disable arbitrary slot controls: the app owns those states.
- Toast: opening/message changes never take focus. A persistent live region announces text without fake progress. Duration0 stays until closed; pointer/focus inside and a hidden document pause the remaining timeout. Close returns focus only if it was inside the disappearing toast. Important errors must also have persistent inline recovery; the starter forces error toasts to duration0. `close` emits once after the controlled visible prop actually becomes false.
- Date: YYYY-MM-DD is parsed as a date-only value, not new Date(string). A range's first click is a draft and emits nothing; the second sorts click order (same day allowed). Escape/outside/close cancel the draft. Invalid direct range order is an error, not silent sorting. Mode change clears to null with reason=mode; it does not guess a conversion. Changing modelValue externally replaces the draft.
- Calendar: native modal dialog, roving date button, arrows day/week, Home/End week boundaries, PageUp/Down month (Shift=year), Enter/Space selection, Escape cancel and opener return. Sunday is the Korean default; locale.firstDay can change it. The native modal supplies browser focus containment; screen-reader/browser combinations still need app-specific verification.
- Time: one HH:mm/HHmm text input; input click opens a small nonmodal panel without stealing text focus, Alt+Down/explicit button focuses the hour select. Hour/minute are native selects; only allowed values appear. Partial selection never emits a completed value. Escape/close/done returns to the opener; outside pointer/focus closes without stealing the destination focus. Cross-midnight ranges/DST/actual scheduling are outside this time-only API.
- Programmatically disabling a picker closes its panel. If every potential return target is disabled/unmounted, the consuming app must choose the next workflow focus; a component must not guess a neighboring application control.

## Locale extension · no whole-site translation claim

```ts
import SolyiUI,{koLocale,enLocale} from '@solyi/vue-ui';
app.use(SolyiUI,{locale:koLocale}); // createVuetify() once separately
// Or pass :locale="enLocale" on a new component.
// Per-app/per-component overrides: {...enLocale,code:'en-GB',firstDay:1,clear:'Reset'}.
```

SolLocale contains code/firstDay, plain messages, count/numberHelp/timeHelp functions. Per-component overrides win over injected app values; undefined entries keep defaults. Intl date formatting is Gregorian/UTC for arithmetic/display safety. Caller-provided labels, slot content and business errors remain the caller's text. Existing reference documents and old four component labels are not automatically translated. Broader locale settings, other reference examples remain in the inventory, not this release's completion claim.
