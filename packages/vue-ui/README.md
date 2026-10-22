# @solyi/vue-ui 0.7.1

Private local-pack preview, **not published**. Requires the consumer's Vue 3.5 / Vuetify 4.3 and @solyi/core 0.4.1. Only the exact installed Vue 3.5.44/Vuetify 4.3.0 combination has been tested. These are external imports in the library, not bundled runtimes.

```js
import 'vuetify/styles';
import '@solyi/core/fonts.css'; // optional self-hosted official Wanted Sans/OFL
import '@solyi/core/code-fonts.css'; // optional JetBrains Mono + Nanum Gothic Coding/OFL
import '@solyi/core/tokens.css';
import '@solyi/core/components.css';
import '@solyi/vue-ui/styles.css';
import {SBtn, STextField, SDialog, SDataTable, SCheckbox, SRadioGroup, SSwitch,
  SSelect, STextarea, SNumberInput, STabs, SSnackbar, SDatePicker, STimePicker, SSegmentedControl, SMultiSelect, SRangeSlider,
  SSplitBtn, SContextMenu, SResizableSplitPane, SProgressLinear, SProgressCircular} from '@solyi/vue-ui';
// Or app.use(SolyiUI) for global registration. Install createVuetify() once in the app.
```

| API | Contract |
|---|---|
| SBtn | variant primary/secondary/subtle/inline; type button/submit/reset; disabled; loading (keeps focus, aria-busy, blocks duplicate activation); click. Attributes and default slot forwarded. |
| STextField | required id + label; v-model string; help/error; required/disabled; supported single-line type; native input attributes forwarded. Label, help and errors linked. |
| SDialog | required unique id + title; v-model boolean; maxWidth; closeLabel; optional returnFocus element; default/actions slots. Vuetify focus trap/Escape/backdrop; no transition; close focus + return focus. |
| SDataTable | caption, columns, current-page rows with unique string id; selectable + v-model:selected IDs; v-model:sort {key,direction}; page/pageCount + update:page; loading/error/retry/emptyText; cell-key slots and rowAction notification. Fixed width columns, one flexible title column; mobile cards and shared full-text helper. |

Table is controlled: the app owns filtering/sorting/paging and off-page selection. Changing a query/sort resets page in the consumer; pass only current-page rows and a valid page count. Select-all is current page, existing off-page IDs remain. Never sort or mutate the supplied rows inside the component. Keep at least one column without width. Slots can opt out of ellipsis with column.ellipsis=false for genuinely multi-line/custom content. Don't put nested interactions inside an ellipsis span.

Types are generated from TypeScript. Theme/default bridging is opt-in through createSolyiVuetify/applySolyiAppearance. No global CSS injection, network, account, storage or backend is installed. Other documentation components remain framework-independent reference demos, not Vue package exports.

Button honors forwarded aria-disabled while retaining focus; disabled uses the native disabled prop. Table exposes labeled column/direction sorting for its mobile card view using the same sort/update:sort contract. Selection updates support reactive in-place ID/row edits as well as array replacement.

## Inputs and navigation

SCheckbox, SRadioGroup, SSwitch, SSelect, STextarea, SNumberInput, STabs, SSnackbar, SDatePicker and STimePicker are actual package components. Field controls share id/label/help/error/disabled/readonly and locale contracts; state is controlled by v-model. Dates emit complete single/range values, Time emits HH:mm, and Toast has persistent/pauseable timing. See the [complete API and ten usage examples](https://github.com/choi-solyi/solyi-design-system/blob/main/VUE-API.md) and [remaining reference-only inventory](https://github.com/choi-solyi/solyi-design-system/blob/main/VUE-MIGRATION.md).

`provideSolLocale(app, ref('en-US'))`, a getter, or `app.use(SolyiUI,{locale:source})` supplies reactive defaults. All supplied APIs including Field/Dialog/Table use the ko-KR/en-US LTR packs. Partial component overrides win; a different component code starts from that language pack. Unsupported codes fall back; caller content stays caller-owned. `formatSolNumber`, `parseSolNumber` and UTC date-only `formatSolDate` share the policy. See [locale contract](https://github.com/choi-solyi/solyi-design-system/blob/main/LOCALE.md). This does not translate application content or the documentation. Fixed versioned tarball pairs and checksums use the existing Pages releases path; see [installation and rollback](https://github.com/choi-solyi/solyi-design-system/blob/main/DISTRIBUTION.md). No registry publication or automatic update of other apps.

## Selection, actions and layouts

SegmentedControl(string|null), MultiSelect(string[] with cancellable optional option loader), RangeSlider(readonly number pair), SplitButton and ContextMenu(flat action events/optional controlled open), ResizableSplitPane(percentage/keyboard/pointer/reflow) are actual typed exports. See ../../ADVANCED-VUE-API.md and the installed AdvancedExamples.vue consumer. The original14 remain. Other reference demos are not implicitly converted.

Canonical components use S PascalCase: SBtn/STextField/SDialog/SDataTable/SSnackbar and the remaining input/navigation APIs, plus SProgressLinear/SProgressCircular. Only S-named components are exported and registered. Legacy Sol component aliases were removed in this draft. Native V components remain usable via createSolyiVuetify/applySolyiAppearance. Contracts differ from native Vuetify: see S-API.md in the repository. All supplied use shared Core tokens; unknown progress has no aria-valuenow/fake percentage ; indeterminate can animate, with a static reduced-motion fallback.
