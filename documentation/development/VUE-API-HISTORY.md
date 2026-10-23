# 이력 부록 · VUE-API

> 아래는 문서 구조 정리 전의 기록 원문입니다. 당시 버전·API·미게시·검수 상태를 보존하며 현행 지원이나 현재 공개 상태를 뜻하지 않습니다. 최신 안내는 [README](../../README.md)와 [현재 통합 계획](../plans/0.11.0-integration.md)을 따릅니다.

---

# Vue 입력·탐색 API

아래 입력·탐색 부품은 현재 패키지에서 계속 제공합니다. 기본은 [한 번의 전역 등록](../guide/DEDICATED-VUE-API.md)이며 Vue 함수·타입 import는 유지합니다. 공통 부품 9개는 같은 문서의 전용 API 표를 확인하세요. 실제 npm에는 게시하지 않았습니다.

## Shared contracts

- Form controls require a unique `id` and a visible `label`. `help`, `error`, `required`, `disabled`, `readonly`, native attributes and a component `locale` override are supported. Label/help slots are available; errors are plain strings linked with aria-describedby. The consuming app owns business errors and submitting data.
- Every editable value is controlled: bind `v-model` or handle `update:modelValue`. `change` reports committed changes. A parent that declines the event retains ownership; components do not mutate props, write storage or call a backend.
- Checkbox/Switch/Radio/Select use native input semantics. Readonly blocks changes while preserving reading/focus; disabled uses native disabled. Radio/Select option values must be unique, nonempty strings; null means no selection. Native labels remain clickable touch targets.
- Number/Date/Time retain invalid or partial typed drafts and emit only valid complete values, or null on clear. Enter/blur validates direct entry. `invalid(message)` reports parse/range/step failures. `validate()` commits a valid draft and `focus()` focuses the input; Date/Time also expose `clear()`. Explicit handle types are `SolNumberInputHandle` / `SolPickerHandle`.
- Slots: all field controls accept `label` / `help`; Tabs accepts `panel-${value}` (or default scoped `{item}`); Toast accepts default content and `action`. Native Select/Radio labels are text, not arbitrary interactive option markup.

| Export | v-model | Additional props / events |
|---|---|---|
| SCheckbox | boolean | required; change(boolean), blur(FocusEvent) |
| SRadioGroup | string or null | options: readonly SolOption[], optional native name; change(string) |
| SSwitch | boolean | native checkbox with role=switch; change(boolean) |
| SSelect | string or null | options, placeholder; change(string or null), blur |
| STextarea | string | rows (minimum3), maxlength, showCount; change(string), blur. Counter follows native UTF-16 maxlength units. |
| SNumberInput | number or null | min/max, positive step (default1); change(number or null), invalid, blur. Step is anchored at min or0; empty +/- starts at min or0. |
| STabs | string | items: readonly SolTab[], activation automatic/manual, orientation horizontal/vertical, disabled/readonly; change(string) |
| SSnackbar | boolean visibility | required id/message, optional label, tone info/success/warning/danger, duration milliseconds (default0=persistent), live polite/assertive/off, dismissible, returnFocus; close(reason) |
| SDatePicker | DateValue | mode single/range (defaultsingle); change(DateChange), invalid, open, close(PickerCloseReason) |
| STimePicker | HH:mm string or null | min/max (default00:00/23:59), positive integer minute step (default15); change, invalid, open, close |

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
import {SCheckbox,SRadioGroup,SSwitch,SSelect,STextarea,SNumberInput,
  STabs,SSnackbar,SDatePicker,STimePicker} from '@solyi/vue-ui';
import type {DateValue,SolPickerHandle} from '@solyi/vue-ui';
const checked=ref(false),radio=ref<string|null>('note'),enabled=ref(true),selected=ref<string|null>(null);
const note=ref(''),count=ref<number|null>(2),tab=ref('summary'),toast=ref(false);
const dates=ref<DateValue>({start:'2026-10-21',end:'2026-10-24'}),time=ref<string|null>('09:00');
const picker=ref<SolPickerHandle|null>(null);
const options=[{value:'note',label:'기록'},{value:'plan',label:'계획'}];
</script>
<template>
  <SCheckbox id="agree" v-model="checked" label="가상 예시 확인" required/>
  <SRadioGroup id="kind" v-model="radio" label="기록 종류" :options="options"/>
  <SSwitch id="enabled" v-model="enabled" label="가상 알림 켜기"/>
  <SSelect id="category" v-model="selected" label="분류" :options="options"/>
  <STextarea id="note" v-model="note" label="설명" :maxlength="120"/>
  <SNumberInput id="count" v-model="count" label="개수" :min="0" :max="10" :step="2"/>
  <STabs id="record-tabs" v-model="tab" label="기록 정보"
    :items="[{value:'summary',label:'요약'},{value:'memo',label:'메모'}]">
    <template #panel-summary><p>요약 내용</p></template>
    <template #panel-memo><p>메모 내용</p></template>
  </STabs>
  <button type="button" @click="toast=true">알림 보기</button>
  <SSnackbar id="notice" v-model="toast" message="가상 작업을 확인했습니다." :duration="4000"/>
  <SDatePicker id="schedule" ref="picker" v-model="dates" label="일정" mode="range"/>
  <STimePicker id="time" v-model="time" label="시각" min="09:00" max="18:00" :step="15"/>
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

SolLocale contains code/firstDay, messages and formatting functions. The existing provider accepts a partial pack, code, ref/computed or getter; all22 components including Field/Dialog/Table now inherit it. Per-component partial overrides win; changing component language starts from its own pack. ko-KR/en-US LTR only, invalid/missing values fall back. Runtime language changes retain draft/model/selection/focus. NumberInput supports validated comma grouping/dot decimals; TableColumn.format supports text/number/date. UTC/Gregorian formatSolDate and formatSolNumber/parseSolNumber are exported. Caller labels, slots and business errors remain caller text. Full contract and examples: [LOCALE.md](../guide/LOCALE.md). Reference-document translation and the remaining HTML examples are separate work.
