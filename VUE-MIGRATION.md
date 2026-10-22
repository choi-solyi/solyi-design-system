# Vue migration inventory · phase 2

Historical phase2 baseline: docs0.3.5, Core/Vue UI0.1.5. Only this repository and its existing Pages demo are in scope. Packages remain private local tarballs. Existing apps, registry publication, Figma and new credentials/permissions are excluded.

## Release gates

- [x] Inventory the current source, distinguish actual package exports from reference demos.
- [x] A. Checkbox, RadioGroup, Switch, Select, Textarea, NumberInput: source milestone build/types/runtime passed. Final installed-tarball gate remains D.
- [x] B. Tabs and Toast: source runtime roving/panels, live region, dismissal, pointer/focus/visibility pause and cleanup passed. Final installed gate remains D.
- [x] C. DatePicker and TimePicker: source runtime complete values, leap/bounds, draft/cancel/reverse/same-day, mode reset, locale/firstDay, keyboard/outside/focus recovery passed. Final installed gate remains D.
- [x] D. Document every API and usage, connect the actual installed starter and independent type consumer, run the complete package/document regression pipeline.
- [x] E1. Actual Chrome keyboard/state checks and 1643/833/333/320 CSS px geometry; 3 themes × light/dark representative layout. Screenshot timed out; no pixel-review pass. See QA.md.
- [x] E2. Phase2 published at e04ba299; CI39716365908 attempt1 succeeded,33 public asset hashes matched, public Chrome interactions confirmed. See release report; no registry or other-app update.

## Existing examples and conversion status

`exported` means a typed Vue component in a packed artifact and an installed consumer, not just a document title.

| Current example / source | Actual Vue API before this phase | This release / remaining scope |
|---|---|---|
| Button / loading / disabled / hierarchy | SolButton | Preserve; state regressions |
| Text field / validation | SolField | Preserve; label/error regressions |
| Dialog / detail / full title | SolDialog; Table full-title dialog | Preserve |
| Table / list / mobile / select-sort-filter-page | SolTable; consumer owns filtering | Preserve |
| Checkbox | None | A: SolCheckbox |
| Radio single choice | None | A: SolRadioGroup |
| Switch immediate setting | None | A: SolSwitch |
| Native select | None | A: SolSelect |
| Multiline textarea / counter | None | A: SolTextarea |
| Number min/max/step | None | A: SolNumberInput |
| Content Tabs / panels | None | B: SolTabs |
| Snackbar / Toast | None | B: SolToast |
| Date single/range | None | C: SolDatePicker |
| HH:mm direct entry / time panel | None | C: SolTimePicker |
| Static multi-select tags | None | New SolMultiSelect API in phase3; original HTML example remains a reference |
| Autocomplete local/delayed/empty/error/retry | None | Follow-up; keep reference behavior |
| Tooltip / interactive popover | None | Follow-up |
| Accordion | None | Follow-up |
| Action menu / Avatar user menu | None | Follow-up |
| Avatar / fallback initials | None | Follow-up |
| Breadcrumb / side panel | None | Follow-up |
| Progress bar/circle determinate/unknown/complete/error | None | Follow-up |
| Step indicator / step form | None | Follow-up |
| Chart / table alternative / Tree | None | Follow-up |
| File picker/drop / metadata / remove/errors | None | Follow-up |
| Badge / semantic inline notice / retry / palette samples | None (Button's four variants only) | Follow-up |
| Skeleton / loading / no-results / denied/error simulator | None | Follow-up |
| Overflow text | Core imperative helper + Table integration | Existing owned-container helper; no separate Vue export yet |
| Icons | Core paths/types; private Vue icon helper | No public SolIcon component yet |
| Form/error summary, search/detail, compare, empty | Reference patterns | Follow-up compositions; constituent controls do not make these Vue templates |
| Edit/save/cancel, unsaved leave, delete/undo | Reference patterns | Follow-up compositions |
| 404, batch partial failure/retry | Reference patterns | Follow-up compositions |
| Header/sidebar/mobile navigation; settings/list/detail templates | Reference patterns | Follow-up templates |
| Core principles, tokens/JSON/CSS, type/space/radii, layers, motion, copy rules, themes/density/adoption | Framework-neutral documentation/assets | Preserve; not Vue component claims |

## Approved later additions · excluded from this release

SegmentedControl, searchable MultiSelect, two-ended RangeSlider, SplitButton, ContextMenu and ResizableSplitPane now have actual typed exports, standalone consumer usage and an installed starter. [Contracts](ADVANCED-VUE-API.md) and [phase3 release gates](VUE-EXPANSION-PLAN.md) distinguish source/installed/browser/public validation. The existing14 stay available.

Document-wide search, complete shared-locale settings, distribution/update channels, Figma kit and broader real-device verification remain later work. The reference examples listed as follow-up above remain HTML/JS references; these six exports do not convert them all.

## API decisions

- Required unique `id` and visible `label` for form controls; `help`/`error` link by ID. Consumers own business validation. Local parsing errors never erase typed input.
- Controlled `modelValue` and `update:modelValue`; `change` carries committed values. Disabled uses native disabled where supported. Readonly keeps readable/focusable content and blocks mutations; no invented unsupported ARIA.
- String-valued native Select/Radio options, boolean Checkbox/Switch, string Textarea, number-or-null NumberInput, string Tabs value, boolean Toast visibility, date-only single/range values and HH:mm-or-null Time values. No partial date/time value is emitted as a completed value.
- Locale-ready message objects and Intl formatting hooks are shared by new APIs; this is not a claim that the whole document has been translated. Korean remains the starter default. Wanted Sans is the newly approved default UI font; code/pre monospace stays unchanged.
- Date arithmetic is pure and shared with the existing calendar. Components use Vue-rendered owned nodes/refs and lifecycle cleanup, not document-example IDs or innerHTML mounting.
- Existing compact desktop sizes, mobile44px targets and button6/field10/card-popup12/dialog16 radius roles remain.
