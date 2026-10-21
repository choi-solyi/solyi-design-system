# Package demo visual review

Baseline: v0.3.0 / 3bbac067. Scope: this repository, `/starter/`, shared package styles and matching documentation only. Preserve type, colors, button radius 6px, compact data rows and all interactions.

## Plan

1. [x] Confirm checkout and existing successful deployment; preserve the stale initial CI record without rerunning it.
2. [x] Record source causes and prioritized findings; compare package and framework-neutral examples.
3. [x] Fix shared/package causes and demo composition; install refreshed tarballs in both independent consumers.
4. [ ] Actual Chrome rendering/geometry/keyboard reviewed at 1644/766/333 CSS px, three themes × light/dark; **screenshot-based visual review remains unverified** because capture timed out.
5. [x] Run package/export/type/consumer/DOM/contrast regressions and relevant layout checks.
6. [ ] Commit/push once ready, await existing Pages workflow, verify public files and actual public UI.

## Findings and priorities

| Priority | Finding | Cause / action | Verification |
| --- | --- | --- | --- |
| P1 | Table caption touches the inner card boundary | Core caption has vertical padding only; package adds a surrounding border but no horizontal caption inset. Add an explicit package inset aligned with cells. | Chrome geometry/function verified; screenshot pending |
| P1 | Search controls touch the table card | Demo settings wrapper has no following composition gap. Make the form/control-to-content rhythm explicit. | Chrome geometry/function verified; screenshot pending |
| P1 | Pagination chevrons have inconsistent optical size/center | Literal `‹ ›` glyphs vary by font. Reuse the existing Solyi line chevron path with fixed SVG/button boxes. | Chrome geometry/function verified; screenshot pending |
| P1 | Sort labels do not align with body text | Vue button selector specificity overrides Core's smaller sort padding; explicitly scope package sort spacing. | Chrome geometry/function verified; screenshot pending |
| P2 | Field and dialog content rely on paragraph/default margins | Field gets the same 8px label/control/help rhythm as Core; dialog body owns a 12px content gap. | Chrome geometry/function verified; screenshot pending |
| P2 | Mobile Table has no visible caption and its detail action touches data | Show the existing caption at the mobile breakpoint and give the action an explicit end-aligned row/gap. | Chrome geometry/function verified; screenshot pending |
| P2 | Loading/empty/footer spacing relies on loose paragraphs | Component-owned grid/footer/state spacing; keep screen-owned control-to-table gap separate. | Chrome geometry/function verified; screenshot pending |
| P2 | Independent consumers inherit Vuetify's Roboto instead of the existing font token | Bind the four package roots to the existing font/line-height tokens. Starter already used that token; no new font or font file is introduced. | Chrome geometry/function verified; screenshot pending |

Baseline actual Chrome geometry at 1643 CSS px (installed 0.1.0): caption text inset 1.11px from inner border, controls-to-table gap ~0px, sort label starts 13.10px to the right of its body text. All four page buttons already had equal ~35.99px boxes; the regression is glyph positioning inside them, not unequal button box dimensions.

Capture availability: connected Chrome is the only browser advertised. Both documented screenshot surfaces returned `Page.captureScreenshot` timeout (5s), including the normal local page after HTTP access was restored. No native/other browser control or security workaround was used. The initial local server's sandbox network isolation was corrected by using the approved temporary loopback preview server; navigation then worked. Screenshot review remains unverified until an actual image can be obtained.

## Review coverage

- Package Button, Field, Dialog, Table: normal/hover/focus/disabled/loading/error/empty/selected, title/help baselines, card/field spacing, focus clipping, stable table widths and full text access.
- Matching Core/reference examples: search/filter/selection/pagination, error summary, 404 recovery, time popover, autocomplete, progress and overlay focus.
- Desktop, intermediate width and 332–333 CSS px; light/dark and three brand themes on representative samples.
- Actual screenshots are required for a completed visual screenshot review. DOM geometry or passing functional checks alone do not establish visual completeness. If capture is unavailable, state that limitation and preserve all independently completed work.

## Verified results before publication

- Caption padding is now 16px block / 12px inline; text box inset ~13.11px including border. Controls-to-table gap ~15.99px. Header/body start difference ~1.11px (previously ~13.10px).
- Pagination buttons retain equal ~35.99px desktop / ~43.99px narrow boxes; SVG centers differ from button centers by less than 0.02px in either axis. The actual chevron path is imported from the documentation's original UI icon source.
- Desktop data rows remain ~49.08px. At 766px the columns remained exactly 47.986 / 305.625 / 95.990 / 127.986 / 71.997px across normal, sort, page 2 and empty-filter states (0px change).
- All 18 actual width/theme/mode combinations (1644/766/333px × violet/sage/sand × light/dark) had no page horizontal overflow. Button radius 6px, Field outer radius 10px, control heights 36/40 desktop and 44 narrow retained. Mobile caption appears and desktop table is replaced by cards.
- Field label/control gap ~8px; Dialog paragraph gap ~12px, radius 28px and close-button inset ~17px on narrow screen. Actual Chrome keyboard Escape restored the opener. Native Tab/Enter/Escape showed an unclipped tooltip, full title dialog and returned focus. Tooltip is appended to body, outside the clipped table border.
- Error/retry preserved three selected IDs, disabled pagination during error, and recovered. Empty filtering returned page 1. Independent consumer actual font families, caption padding, SVGs and Dialog gap match existing token values without the starter adapter.
- Core reference Field (40px / radius10), Textarea (~96px / conditional scroll), time panel (16px padding / Escape return), unknown progress (no aria-valuenow or fake percent), linked error summary, 404 route preservation and autocomplete keyboard selection were checked in actual Chrome. At 766px reference search/filter controls both measured 40px and had identical top positions; at 333px they intentionally stack and stay 44px.
- Full local pipeline passed: both real tarball consumers, exports/types/CSS/shared icons, no source links, component runtime, all existing recovery/date/upload/navigation/progress tests, 186 token contrast pairs and 672 button-state contrast cases (minimum 4.562:1).
- The consumer linkage gate caught a temporary accidental repository-source dependency during lock refresh. It was removed before publication; runtime file dependencies are now explicitly rejected. Refresh resolves the two own-package lock records and then uses clean npm ci, preserving third-party pins. A Windows preview process file lock was released before clean install; no privilege change was used.

This file is the pre-publication review snapshot. Commit/CI/public HTTP-SHA results are recorded in the final release report rather than triggering an additional metadata-only deployment. The screenshot limitation is still open; none of the geometry checks above is described as a successful image review.
