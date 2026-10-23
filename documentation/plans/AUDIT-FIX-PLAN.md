# Standards audit fixes · v0.3.5

> 이 문서는 이전 단계의 계획·전환 이력입니다. 당시 체크포인트와 문구를 보존하므로 현재 구현·공개·검수 상태와 혼동하지 마세요. 현재 작업 범위는 [0.11.0 통합 계획](../plans/0.11.0-integration.md), 실제 사용법은 [처음 시작하기](../guide/GETTING-STARTED.md)를 따릅니다.

## 이력 부록 · 당시 기록 원문

Scope: fix the reproduced v0.3.4 audit findings, validate the real tarball consumers, publish only this repository's existing Pages site. Library expansion remains a later step.

- [x] Fix selected app-navigation text/background as a pair across all themes and interaction states.
- [x] Keep the time textbox as a textbox; expose expanded state on its explicit popup button.
- [x] Restore the search/empty-result heading hierarchy without changing visual typography.
- [x] Preserve logical focus when a focused Table retry action disappears; never steal focus after the user moves elsewhere.
- [x] Connect SolField's generated label reference and add the starter meta description.
- [x] Run shared CSS/DOM, package types/exports, installed runtime and two independent tarball-consumer builds.
- [x] Review local rendered states: three themes/light-dark on desktop;333CSSpx starter retry, label references, control heights, radii and Dialog focus return.

Publication follows this commit: push once, await the existing Pages CI, compare public assets, remeasure public Component/Pattern/starter in Lighthouse and verify keyboard recovery. Exact commit/run/report links are release-time evidence in the final report; this source checkpoint does not pre-claim a successful deployment.

Publication completed: commit f164078004181b1282f4856f965b310c70f80c19, [CI39712512952](https://github.com/choi-solyi/solyi-design-system/actions/runs/39712512952) succeeded;32public asset hashes matched. Component/Pattern/starter mobile+desktop Lighthouse13.5.0 accessibility/best-practices/SEO100 on2026-10-22. Public333px retry summary focus and time Escape return verified. Screenshot attempt timed out; complete pixel review was not claimed.

The Nu warning about the original document's missing h1 describes its pre-JavaScript shell. The rendered document has an h1, and hidden dialog markup is not a suitable replacement. This patch will preserve the SPA structure, record this limitation, and avoid adding a misleading hidden heading merely to remove a warning.

Preserve official brand assets, color tokens, typography, compact controls and radius roles 6/10/12/16px. No other application, registry publication, credential or permission changes.
