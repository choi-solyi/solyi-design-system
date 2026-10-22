# Locale and package delivery · local phases

Baseline: published `b8648fa`, local search-ranking fix `624bc43` preserved. Existing20 Vue APIs, fonts and role tokens/radii stay intact. No public push, registry publication, new account/credential/permission or other app update.

- [x] Inventory: retain existing locale injection and preserve the verified0.3.0 tarballs as rollback assets before new builds.
- [x] A. Complete ko/en locale defaults/override/reactive language changes; base wrappers and existing controls, date-only/number formatting and validation. Demonstrate the real installed package and add typed/runtime regressions.
- [x] A gate: full package/independent consumer/starter/document checks; record limits and a separate local commit.
- [ ] B. Versioned Pages tarballs, SHA-256/integrity manifests, immutable release preparation and installation/update/rollback documentation. Existing package pipeline remains the deployment gate.
- [ ] B gate: install from the prepared HTTP URLs in a clean consumer, build/typecheck, then verify an actual previous-version rollback. Verify missing/corrupt assets fail checks. Separate local commit; no public push.
- [ ] Report exact local commits and remaining Figma/real-device/reference-example conversion work.

Current choices: reuse `provideSolLocale`/`SolLocaleKey`; keep caller labels/data/errors caller-owned. Ship only ko-KR/en-US LTR packs. Date-only values remain ISO and time values HH:mm. Distribution uses this repository's existing Pages path; manifests and versioned tarballs are prepared locally, not live until a later approved push.

A evidence (2026-10-22): locale-pipeline-final.log passed full package/types/two installed consumers/runtime/starter/document regression. Chrome local 1643/333 CSSpx: ko/en switching, invalid draft/validity relocalization, Dialog and date/time Escape return. 12 language×theme×mode combinations at333px had no document overflow; desktop and333px screenshots reviewed. Existing demo grid spacing fixed using shared starter-control-grid. No push.
