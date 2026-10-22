# @solyi/vue-ui 0.2.0

Private local-pack preview, **not published**. Requires the consumer's Vue 3.5 / Vuetify 4.3 and @solyi/core 0.2.0. Only the exact installed Vue 3.5.44/Vuetify 4.3.0 combination has been tested. These are external imports in the library, not bundled runtimes.

```js
import 'vuetify/styles';
import '@solyi/core/tokens.css';
import '@solyi/core/components.css';
import '@solyi/vue-ui/styles.css';
import {SolButton, SolField, SolDialog, SolTable, SolCheckbox, SolRadioGroup, SolSwitch,
  SolSelect, SolTextarea, SolNumberInput, SolTabs, SolToast, SolDatePicker, SolTimePicker} from '@solyi/vue-ui';
// Or app.use(SolyiUI) for global registration. Install createVuetify() once in the app.
```

| API | Contract |
|---|---|
| SolButton | variant primary/secondary/subtle/inline; type button/submit/reset; disabled; loading (keeps focus, aria-busy, blocks duplicate activation); click. Attributes and default slot forwarded. |
| SolField | required id + label; v-model string; help/error; required/disabled; supported single-line type; native input attributes forwarded. Label, help and errors linked. |
| SolDialog | required unique id + title; v-model boolean; maxWidth; closeLabel; optional returnFocus element; default/actions slots. Vuetify focus trap/Escape/backdrop; no transition; close focus + return focus. |
| SolTable | caption, columns, current-page rows with unique string id; selectable + v-model:selected IDs; v-model:sort {key,direction}; page/pageCount + update:page; loading/error/retry/emptyText; cell-key slots and rowAction notification. Fixed width columns, one flexible title column; mobile cards and shared full-text helper. |

Table is controlled: the app owns filtering/sorting/paging and off-page selection. Changing a query/sort resets page in the consumer; pass only current-page rows and a valid page count. Select-all is current page, existing off-page IDs remain. Never sort or mutate the supplied rows inside the component. Keep at least one column without width. Slots can opt out of ellipsis with column.ellipsis=false for genuinely multi-line/custom content. Don't put nested interactions inside an ellipsis span.

Types are generated from TypeScript. No theme plugin, global CSS injection, network, account, storage or backend is installed. Other documentation components remain framework-independent reference demos, not Vue package exports.

Button honors forwarded aria-disabled while retaining focus; disabled uses the native disabled prop. Table exposes labeled column/direction sorting for its mobile card view using the same sort/update:sort contract. Selection updates support reactive in-place ID/row edits as well as array replacement.

## Additional typed exports (0.2.0)

SolCheckbox, SolRadioGroup, SolSwitch, SolSelect, SolTextarea, SolNumberInput, SolTabs, SolToast, SolDatePicker and SolTimePicker are actual package components. Field controls share id/label/help/error/disabled/readonly and locale contracts; state is controlled by v-model. Dates emit complete single/range values, Time emits HH:mm, and Toast has persistent/pauseable timing. See the [complete API and ten usage examples](https://github.com/choi-solyi/solyi-design-system/blob/main/VUE-API.md) and [remaining reference-only inventory](https://github.com/choi-solyi/solyi-design-system/blob/main/VUE-MIGRATION.md).

`app.use(SolyiUI,{locale:koLocale})` supplies defaults; per-component locale overrides win. Korean/English built-in messages are exported. This does not translate application content or the documentation.
