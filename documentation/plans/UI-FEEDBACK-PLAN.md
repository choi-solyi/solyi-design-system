# UI feedback follow-up

> 이 문서는 이전 단계의 계획·전환 이력입니다. 당시 체크포인트와 문구를 보존하므로 현재 구현·공개·검수 상태와 혼동하지 마세요. 현재 작업 범위는 [0.11.0 통합 계획](../plans/0.11.0-integration.md), 실제 사용법은 [처음 시작하기](../guide/GETTING-STARTED.md)를 따릅니다.

## 이력 부록 · 당시 기록 원문

Baseline: `72bf050` (document 0.7.1). Scope: this repository and its existing Pages only; no registry publication or other applications.

## Evidence and execution

- [x] Confirm clean baseline and source locations.
- [x] Parent inspected all 24 supplied screenshots as pixels in its cloud environment and supplied a per-image mapping. This Windows worker did not view their pixels: its official Library materializer calls `os.setxattr`, unavailable here; direct read returns an asset pointer. Private downloads remain outside this repository. Image dimensions are not assumed to be CSS viewport dimensions.
- [x] Implement and test the approved bundle; see UI-FEEDBACK-QA.md.
- [x] Complete actual Chrome keyboard/geometry checks at measured desktop/intermediate/332–333 CSS px. Screenshot visual review remains incomplete; see UI-FEEDBACK-QA.md.
- [x] Freeze distinct package versions and verify clean HTTP install/update/rollback.
- Remote CI and the approved bundled Pages deployment are tracked in the repository Actions page: https://github.com/choi-solyi/solyi-design-system/actions/workflows/pages.yml . The final deployment SHA/result is reported after completion.

## Checklist

| Request | Source finding / action | State |
| --- | --- | --- |
| Dialog heading spacing and SBtn example | Native HTML example currently uses unstyled buttons; add a clearly separate package usage example | Reviewed; see UI-FEEDBACK-QA.md |
| TimePicker focus/help overlap | Review entry/help spacing and panel spacing in shared Core and Vue CSS | Parent pixel mapping received; see UI-FEEDBACK-QA.md |
| Tree alignment/chevron/selection | Current branch rows show folder + text status without a stable chevron slot | Reviewed; see UI-FEEDBACK-QA.md |
| Search loading padding | Loading paragraph is inserted directly in the bordered result list | Reviewed; see UI-FEEDBACK-QA.md |
| Whole comparison card / keyboard radio | Only the inner radio label activates selection | Reviewed; see UI-FEEDBACK-QA.md |
| Table filter/footer at Fold-like landscape widths | Check shared filter grid, selection toolbar and footer independently | Reviewed; see UI-FEEDBACK-QA.md |
| Loading/error/clear-selection spacing | Keep container and action spacing explicit | Reviewed; see UI-FEEDBACK-QA.md |
| Editing initial focus | `mountWorkflow` explicitly focuses the title input | Reviewed; see UI-FEEDBACK-QA.md |
| Duplicate errors | Separate summary navigation from field remediation; do not remove useful error context | Reviewed; see UI-FEEDBACK-QA.md |
| STextField / VTextField labels | S uses a persistent external label; V uses native floating label. Review contract before changing | Reviewed; see UI-FEEDBACK-QA.md |
| Access denied color | Distinguish permission limitation from destructive/error meaning before changing | Reviewed; see UI-FEEDBACK-QA.md |
| Progress display options | Current API always renders label, numeric circle text and message | Reviewed; see UI-FEEDBACK-QA.md |
| Toast state recognition | Vue toast currently adds only a colored edge to neutral background | Reviewed; see UI-FEEDBACK-QA.md |
| “Extended six” naming | Replace release-count labels with task-oriented names; keep deep-link IDs and API names | Reviewed; see UI-FEEDBACK-QA.md |
| Starting-point card placement | Requires screenshot interpretation | Reviewed; see UI-FEEDBACK-QA.md |
| Portrait header/menu/anchor offsets | Existing sticky header uses fixed offsets; inspect before changing | Reviewed; see UI-FEEDBACK-QA.md |

Screenshots, signed transfer data and user identifiers must not be committed. Existing branding, fonts, radii, compact sizing and deep links stay intact. Safari, screen reader and physical Fold testing remain unverified unless actually performed.

## Decisions based on source and the parent's pixel review

- Label comparison: keep the S field's persistent label contract. Give the direct V field the same visible external label in the comparison only, with an explicit `for` connection. Native Vuetify floating labels remain available; no global V API change. Evidence: W3C WAI Labeling Controls, https://www.w3.org/WAI/tutorials/forms/labels/ (checked 2026-10-22).
- Permission state: the existing blue is the `info / info-soft` pair. Keep it as an access-limitation explanation with an alternate example, distinct from a failed load (`danger`). This is a system semantic choice, not a rule requiring blue; no permission or account operation occurs. Text identifies access limitation independently of color.
- Error summary: use short links identifying fields; retain detailed remediation below each field. Summary receives submission focus; it is not a second live announcement of all errors. This preserves navigation and the input's error description.
- Package changes use a new Core0.3.5/UI0.6.1 pair (document0.8.1); previous release bytes remain frozen.
