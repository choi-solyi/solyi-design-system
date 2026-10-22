# @solyi/core 0.3.0

Local `npm pack` preview, private/UNLICENSED, not published. The source of truth is the repository's `tokens.json`, `site/components.css`, `site/overflow.js` and `site/icons.js`. Do not edit dist.

```js
import '@solyi/core/fonts.css'; // optional self-hosted official Wanted Sans/OFL
import '@solyi/core/code-fonts.css'; // optional JetBrains Mono + Nanum Gothic Coding/OFL
import '@solyi/core/tokens.css';
import '@solyi/core/components.css'; // optional shared HTML examples
import {tokens, coreVersion} from '@solyi/core';
import {mountOverflowText} from '@solyi/core/overflow';
import {solIcon, solIconPaths} from '@solyi/core/icons';
```

Set `data-theme="violet|sage|sand"` and `data-mode="light|dark"` on html. Components use button radius 6px, field 10px, card 12px, panel 16px. CSS is opt-in and unscoped; import once. It is not a reset or a DTCG interchange format. CSS reference selectors beyond the four Vue wrappers remain example-level APIs in this draft. Brand logo/favicon and framework dependencies are not packaged here. The official Wanted Sans WOFF2/CSS is bundled as licensed data with its unmodified OFL and pinned source/hash record under dist/fonts/wanted-sans; it remains OFL-1.1, separate from the own-source UNLICENSED preview. Import fonts.css once to enable self-hosted UI text; otherwise the token falls back to the system stack. Code fonts are a separate opt-in code-fonts.css export: JetBrains Mono 2.304, Nanum Gothic Coding 2.000, monospace. The unmodified WOFF2/TTF, source hashes and OFL notices are included; the complete Korean TTF data is approximately4.56MB. UI font remains Wanted Sans.

`mountOverflowText(root)` enhances clipped `.sol-record-title/.sol-ellipsis` with a tooltip and full-text dialog. Call its returned cleanup function before unmounting. Existing interactive titles retain their click behavior.

`solIcon('chevron', {size:20})` returns the shared 16/20/24px line icon markup. `solIconPaths` supports framework renderers using the same path source. These are UI symbols, separate from the official brand logo/favicon. Decorative icons need no duplicate spoken label; label the containing action button.

`@solyi/core/date` exports typed dateISO/monthDays/parseDateOnly/weekday/shiftDay/shiftMonth/parseTimeOnly helpers. They have no DOM dependency and preserve date-only strings; no scheduling or timezone conversion API is implied.
