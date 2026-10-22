# Vue expansion · phase 3

Baseline: docs0.4.0 / Core and UI0.2.0, e04ba299. Only this repository and existing Pages are approved. Preserve existing14 and official brand, tokens and radii6/10/12/16. No registry publication, new permission, other app or backend.

- [x] Inventory and contracts: six new exports; remaining reference examples stay explicit in VUE-MIGRATION.md.
- [x] A. Source milestone passed; final installed/browser gate remains D/E. SegmentedControl, searchable MultiSelect, two-thumb RangeSlider: typed controlled values, readonly/disabled, labels/errors, keyboard/IME/race/bounds tests.
- [x] B. Source milestone passed; final installed/browser gate remains D/E. SplitButton and ContextMenu: shared flat-action menu, keyboard/pointer/mobile opening, dismissal/focus tests.
- [x] C. Source milestone passed; final installed/browser gate remains D/E. ResizableSplitPane: pointer capture and keyboard, min/max, separator semantics, narrow container reflow and cleanup tests.
- [x] D. API docs, actual installed starter, independent type consumer, pack/type/runtime/regression pipeline.
- [x] E1. Local Chrome keyboard/pointer/theme/mobile and actual font404 fallback checks; limits and line-wrap differences in QA.md. Final rebuilt-candidate recheck was interrupted by browser transport closure; do not imply a final pixel/public browser pass.
- [x] E2. Phase3 published at38e67f7, CI39724470149 passed and52 public assets matched source hashes; public runtime/font checks are in the release report. The later document-search/header phase remains local and unpublished.

## Contracts decided before implementation

- SegmentedControl: string|null with string options; a single choice, not Tabs. Native radio semantics and arrow/Home/End navigation.
- MultiSelect: controlled string[]; internal text query emits search. Local options or optional cancellable loadOptions(query, signal); no built-in network. IME composition does not select/load early. Selected labels survive query changes; tags have explicit remove buttons. Async errors have a keyboard reachable retry button.
- RangeSlider: readonly pair [lower,upper], min/max/positive step anchored at min. Thumb identity/Tab order stay fixed; clamp at the other thumb, never silently swap. Track click is a pointer alternative to dragging. Expose each thumb's dependent bounds.
- SplitButton/ContextMenu: action events rather than invented data values. Optional controlled open prop; flat menu only. Escape/select return to the invoker, outside/Tab preserve destination. ContextMenu ignores editable text controls and includes a visible mobile trigger.
- SplitPane: percentage of available pane space; controlled number and change at completed adjustment. Capture pointer, clamp min/max, arrows/Home/End/Enter. Auto stack at narrow container widths; retain ratio and both mounted contents, hide separator from navigation while stacked.
- WAI APG references are implementation guidance, not a conformance claim: https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/ ; https://www.w3.org/WAI/ARIA/apg/patterns/menubar/ ; https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/ ; https://www.w3.org/WAI/ARIA/apg/patterns/combobox/ . Multi-select is a documented extension, not APG's single-value example copied as-is.

Document search and shared header appearance controls were published at b8648fa (DOC-SEARCH-PLAN.md); only the subsequent search-ranking refinement remains local. Full shared locale settings, distribution/update channels and Figma remain subsequent work. Existing reference autocomplete, files, progress, overlays and templates are not implicitly converted by these six APIs.

## Subsequent approved additions

User selected Wanted Sans for the default UI. Self-host official unmodified WOFF2 with pinned source/version/OFL; retain code/pre monospace. Check font loading/fallback/layout after the six APIs. Also include the independently reproduced TimePicker select-to-Done spacing (8px shared token); retain all behavior.
