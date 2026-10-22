# Document search · local implementation

Baseline: `38e67f7`, published docs0.5.0 / Core and Vue UI0.3.0. This phase changes only the documentation shell and search, not the package API or another app. No external search service, storage, credential, permission or public push/deployment.

- [x] Build a local, lazy index from the same document renderers and existing section catalogue:59 destinations, including component names and descriptions. No index from live user input.
- [x] Header search dialog: Korean label, native result links, query/clear/empty/count states, keyboard/IME/Escape/focus and mobile layout. Preserve continuous documents and deep links.
- [x] Shared header preferences: existing3 themes,2 densities and light/dark state/storage; desktop selects and a small-screen settings panel. No package or font/token changes.
- [x] Regression: all indexed destinations, ranking/normalization, keyboard/IME, same-page input retention, cross-page unsaved guard, history,12 preference combinations and narrow layout. Actual Chrome checks are recorded separately from DOM tests/pixel review in QA.md.
- [x] Documentation and local validation complete. The separate commit is identified in the task result. No public push.

Remaining overall expansion after this phase: site-wide shared locale settings; installation/update distribution channel (registry publication or other app automation still needs a separate decision); Figma kit; broader real-device/browser/assistive-technology verification. Existing HTML examples not yet exported as Vue APIs remain listed in VUE-MIGRATION.md; this search phase does not silently convert them. The20 typed Vue components and chosen fonts/tokens/navigation remain intact.
