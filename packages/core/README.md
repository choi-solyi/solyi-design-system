# @solyi/core 0.1.1

Local `npm pack` preview, private/UNLICENSED, not published. The source of truth is the repository's `tokens.json`, `site/components.css`, `site/overflow.js` and `site/icons.js`. Do not edit dist.

```js
import '@solyi/core/tokens.css';
import '@solyi/core/components.css'; // optional shared HTML examples
import {tokens, coreVersion} from '@solyi/core';
import {mountOverflowText} from '@solyi/core/overflow';
import {solIcon, solIconPaths} from '@solyi/core/icons';
```

Set `data-theme="violet|sage|sand"` and `data-mode="light|dark"` on html. Components use button radius 6px, field 10px, card 20px, panel 28px. CSS is opt-in and unscoped; import once. It is not a reset or a DTCG interchange format. CSS reference selectors beyond the four Vue wrappers remain example-level APIs in this draft. Brand logo/favicon and third-party dependencies are not packaged here.

`mountOverflowText(root)` enhances clipped `.sol-record-title/.sol-ellipsis` with a tooltip and full-text dialog. Call its returned cleanup function before unmounting. Existing interactive titles retain their click behavior.

`solIcon('chevron', {size:20})` returns the shared 16/20/24px line icon markup. `solIconPaths` supports framework renderers using the same path source. These are UI symbols, separate from the official brand logo/favicon. Decorative icons need no duplicate spoken label; label the containing action button.
