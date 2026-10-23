# S API · first reusable expansion (local)

> 이 문서는 이전 단계의 계획·전환 이력입니다. 당시 체크포인트와 문구를 보존하므로 현재 구현·공개·검수 상태와 혼동하지 마세요. 현재 작업 범위는 [0.11.0 통합 계획](../plans/0.11.0-integration.md), 실제 사용법은 [처음 시작하기](../guide/GETTING-STARTED.md)를 따릅니다.

## 이력 부록 · 당시 기록 원문

Baseline: public v0.6.0 /8d0b297. Only solyi-design-system. No public push, registry/package rename/license/credential/permission or other-app change.

- [x] Inventory every current document destination and embedded example; map to reusable component, composition pattern, template or documentation. Distinguish actual package exports from planned work.
- [x] A. Canonical S PascalCase names, identity-preserving Sol aliases and both plugin registrations; real examples/docs use canonical names. Shared Vuetify themes/default classes and appearance setter; direct V components remain supported. Build/type/runtime milestone and local commit.
- [x] B. SProgressLinear/SProgressCircular: determinate/unknown/complete/error, localized status, bounds, reduced motion and manual demo controls. Actual installed-package examples in starter and document section; no duplicate reference implementation presented as canonical.
- [x] Gate: package exports/types/alias regressions, direct V/native API coexistence, installed consumers, progress/iframe lifecycle and focused theme/keyboard/narrow-screen checks. New local0.7.0 pair prepared without rewriting v0.5.0/v0.6.0 archives; HTTP0.6→0.7→0.6 installation/type/build and final document checks passed. Public push remains held.

Canonical names deliberately do not promise Vuetify prop compatibility. SBtn keeps primary/secondary/subtle/inline; SDataTable keeps columns/rows and consumer-owned pagination. Existing colors/fonts and button6/field10/card-popup12/dialog16 stay. Remaining reference examples are inventory targets, not completed exports. Playground, new layout gallery, project generator and Figma are excluded.

A source gate: Vite library+strict declarations passed;20 alias identities/global registrations, direct VBtn/VTextField, merged defaults and six shared themes/draft retention passed in s-api-a-runtime.log. B source/installed artifact/browser checks completed; final immutable release/delivery gate is recorded separately in S-API-QA.md.
