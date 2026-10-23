# Document search · local implementation

> 이 문서는 이전 단계의 계획·전환 이력입니다. 당시 체크포인트와 문구를 보존하므로 현재 구현·공개·검수 상태와 혼동하지 마세요. 현재 작업 범위는 [0.11.0 통합 계획](../plans/0.11.0-integration.md), 실제 사용법은 [처음 시작하기](../guide/GETTING-STARTED.md)를 따릅니다.

## 이력 부록 · 당시 기록 원문

Baseline: `38e67f7`, published docs0.5.0 / Core and Vue UI0.3.0. This phase changes only the documentation shell and search, not the package API or another app. No external search service, storage, credential, permission or public push/deployment.

- [x] Build a local, lazy index from the same document renderers and existing section catalogue:59 destinations, including component names and descriptions. No index from live user input.
- [x] Header search dialog: Korean label, native result links, query/clear/empty/count states, keyboard/IME/Escape/focus and mobile layout. Preserve continuous documents and deep links.
- [x] Shared header preferences: existing3 themes,2 densities and light/dark state/storage; desktop selects and a small-screen settings panel. No package or font/token changes.
- [x] Regression: all indexed destinations, ranking/normalization, keyboard/IME, same-page input retention, cross-page unsaved guard, history,12 preference combinations and narrow layout. Actual Chrome checks are recorded separately from DOM tests/pixel review in QA.md.
- [x] Documentation and local validation complete. The separate commit is identified in the task result. No public push.

Remaining overall expansion after this phase: site-wide shared locale settings; installation/update distribution channel (registry publication or other app automation still needs a separate decision); Figma kit; broader real-device/browser/assistive-technology verification. Existing HTML examples not yet exported as Vue APIs remain listed in VUE-MIGRATION.md; this search phase does not silently convert them. The20 typed Vue components and chosen fonts/tokens/navigation remain intact.

## 후속 상태

검색·헤더 본 구현은 b8648fa로 공개됐고 CI39727368722/공개55개 자산 검증이 완료됐습니다. 이후 정확한 이름·검색 별칭 우선순위 수정은 별도의 로컬 후속이며 아직 푸시하지 않습니다. Date/Time의 한영·공백·전각 이름 및 일반 다중 단어 회귀를 추가했고, 잔여 locale/설치·업데이트 범위는 NEXT-STEPS.md에 실제 기존 기능과 나눠 기록합니다.
