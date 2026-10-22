# 재사용 전환 전수표

기준 공개 v0.6.0 /8d0b297의 실제 렌더러에서 61개 검색/섹션 목적지와 34개 demo 블록을 추출했습니다. 앵커 별칭은 같은 예제를 가리킬 수 있습니다. 사이트에서 보인다는 이유로 Vue 구현 완료로 표시하지 않습니다. 기계 목록은 reuse-inventory.json입니다.

이번 최소 범위: 기존20종 S 이름·호환 별칭·공통 Vuetify 연결, 진행 표시2종. 나머지 부품→조합 패턴→템플릿 순으로 기존 API를 사용해 전환하며 별도 새 Playground/갤러리/생성기/Figma는 만들지 않습니다.

## 모든 문서 목적지

| 경로·이름 | 분류 / 연결 대상 | 실제 상태 |
|---|---|---|
| #overview · Overview | template · Overview/작업 목표·프로젝트 카드 조합 | 후속 · SCheckbox 기반 상태 조합 필요 |
| #style · Style | documentation/core · 토큰·사용 규칙·메타 문서 | 문서/독립 Core 자산; Vue 부품 완료 주장 아님 |
| #style/principles · Core 원칙 | documentation/core · 토큰·사용 규칙·메타 문서 | 문서/독립 Core 자산; Vue 부품 완료 주장 아님 |
| #style/tokens · 색 토큰 | documentation/core · 토큰·사용 규칙·메타 문서 | 문서/독립 Core 자산; Vue 부품 완료 주장 아님 |
| #style/type · 타이포그래피 | documentation/core · 토큰·사용 규칙·메타 문서 | 문서/독립 Core 자산; Vue 부품 완료 주장 아님 |
| #style/space · 간격·밀도·모서리 | documentation/core · 토큰·사용 규칙·메타 문서 | 문서/독립 Core 자산; Vue 부품 완료 주장 아님 |
| #style/accessibility · 접근성 기준 | documentation/core · 토큰·사용 규칙·메타 문서 | 문서/독립 Core 자산; Vue 부품 완료 주장 아님 |
| #style/color-examples · 컬러 적용 예시 | pattern · SBtn / SSnackbar + SAlert / SBadge 후속 | 부분 API; 색 샘플 전체 Vue 전환 대기 |
| #style/motion · 모션 | documentation/core · 토큰·사용 규칙·메타 문서 | 문서/독립 Core 자산; Vue 부품 완료 주장 아님 |
| #style/icons · 아이콘 | core/helper · Core icons paths / SIcon 후속 | 프레임워크 독립 helper 있음 |
| #style/layers · 레이어와 그림자 | documentation/core · 토큰·사용 규칙·메타 문서 | 문서/독립 Core 자산; Vue 부품 완료 주장 아님 |
| #style/writing · UI 문구 | documentation/core · 토큰·사용 규칙·메타 문서 | 문서/독립 Core 자산; Vue 부품 완료 주장 아님 |
| #component · Component | documentation/core · 토큰·사용 규칙·메타 문서 | 문서/독립 Core 자산; Vue 부품 완료 주장 아님 |
| #component/buttons · 버튼 | component · SBtn | API 있음; 본문 HTML 참고 / 실제 starter 실행 |
| #component/fields · 텍스트 필드 | component · STextField | API 있음; 본문 HTML 참고 / 실제 starter 실행 |
| #component/choices · 선택 컨트롤 기본 | component · SCheckbox / SRadioGroup / SSelect | API 있음; 본문 HTML 참고 / 실제 starter 실행 |
| #component/feedback · 상태 알림 | component · SAlert / SBadge | 후속 · 구현 완료 아님 |
| #component/dialog · 대화상자 | component · SDialog | API 있음; 본문 HTML 참고 / 실제 starter 실행 |
| #component/selection · 체크·라디오·스위치 | component · SCheckbox / SRadioGroup / SSwitch | API 있음; 본문 HTML 참고 / 실제 starter 실행 |
| #component/help · 툴팁과 팝오버 | component · STooltip / SPopover | 후속 · 구현 완료 아님 |
| #component/accordion · 아코디언 | component · SExpansionPanels | 후속 · 구현 완료 아님 |
| #component/navigation · 경로·패널·토스트 | component · SBreadcrumbs / SDrawer + SSnackbar 있음 | 후속 · 구현 완료 아님 |
| #component/advanced-inputs · Textarea·숫자·다중 선택 | component · STextarea / SNumberInput / SMultiSelect | API 있음; 본문 HTML 참고 / 실제 starter 실행 |
| #component/content-tabs · 탭 패널 | component · STabs | API 있음; 본문 HTML 참고 / 실제 starter 실행 |
| #component/action-menu · 행동 메뉴 | component · SMenu (SSplitBtn / SContextMenu 내부 동작 재사용) | 후속 · 구현 완료 아님 |
| #component/identity-progress · Avatar·단계 | component · SAvatar / SStepper | 후속 · 구현 완료 아님 |
| #component/progress · Progress bar·circle | component · SProgressLinear / SProgressCircular | 실제 Vue 패키지 2종 · starter/문서 공통 실행 · 로컬 검증 완료 |
| #component/time · 시간 선택 | component · STimePicker | API 있음; 본문 HTML 참고 / 실제 starter 실행 |
| #component/chart · 차트와 표 대안 | component · SChart + SDataTable 대안 | 후속 · 구현 완료 아님 |
| #component/tree · 트리 탐색 | component · STreeview | 후속 · 구현 완료 아님 |
| #component/textarea · Textarea | component · STextarea | API 있음; 본문 HTML 참고 / 실제 starter 실행 |
| #component/number · 숫자 증감 | component · SNumberInput | API 있음; 본문 HTML 참고 / 실제 starter 실행 |
| #component/multiselect · 다중 선택과 태그 | component · SMultiSelect | API 있음; 본문 HTML 참고 / 실제 starter 실행 |
| #component/avatar · Avatar와 사용자 메뉴 | component · SAvatar | 후속 · 구현 완료 아님 |
| #pattern · Pattern | documentation/core · 토큰·사용 규칙·메타 문서 | 문서/독립 Core 자산; Vue 부품 완료 주장 아님 |
| #pattern/form · 폼 검증과 회복 | pattern · SFormPattern (STextField·SSelect·SCheckbox 조합) | 후속 · 구현 완료 아님 |
| #pattern/search · 검색과 상세 | pattern · SSearchDetailPattern (STextField·SDataTable·SDialog) | 후속 · 구현 완료 아님 |
| #pattern/compare · 비교 선택 | pattern · SComparePattern | 후속 · 구현 완료 아님 |
| #pattern/empty · 빈 상태 | pattern · SEmptyState | 후속 · 구현 완료 아님 |
| #pattern/data · 표와 목록 | pattern · SCollectionPattern + SDataTable 있음 | 후속 · 구현 완료 아님 |
| #pattern/date · 날짜 선택 | component · SDatePicker | API 있음; 본문 HTML 참고 / 실제 starter 실행 |
| #pattern/files · 파일 선택·드롭 | pattern · SFileInput / 로컬 drop | 후속 · 구현 완료 아님 |
| #pattern/autocomplete · 자동완성 검색 | pattern · SAutocomplete 단일검색 (SMultiSelect와 별도) | 후속 · 구현 완료 아님 |
| #pattern/responses · 로딩·권한·오류 | pattern · SSkeletonLoader / SStatePanel | 후속 · 구현 완료 아님 |
| #pattern/composition · 조합 규칙 | documentation/core · 토큰·사용 규칙·메타 문서 | 문서/독립 Core 자산; Vue 부품 완료 주장 아님 |
| #pattern/layouts · 화면 템플릿 | template · SAppShell + SSettingsTemplate / SListDetailTemplate | 후속 · 구현 완료 아님 |
| #pattern/workflow · 편집·이탈·삭제·Undo | pattern · SInlineEdit / SUnsavedGuard / SDeleteUndoPattern | 후속 · 구현 완료 아님 |
| #pattern/error-summary · 오류 요약 | pattern · SFormErrorSummary | 후속 · 구현 완료 아님 |
| #pattern/not-found · 앱용 404 | template · SNotFoundTemplate | 후속 · 구현 완료 아님 |
| #pattern/bulk-recovery · 일괄 작업·부분 실패 | pattern · SBulkActionPattern | 후속 · 구현 완료 아님 |
| #theme · Theme & adoption | documentation/core · 토큰·사용 규칙·메타 문서 | 문서/독립 Core 자산; Vue 부품 완료 주장 아님 |
| #theme/themes · 테마 | documentation/core · Core + 기존 S API / 공통 theme·locale 연결 | 문서/독립 Core 자산; Vue 부품 완료 주장 아님 |
| #theme/density · 밀도 | documentation/core · Core + 기존 S API / 공통 theme·locale 연결 | 문서/독립 Core 자산; Vue 부품 완료 주장 아님 |
| #theme/adoption · CSS·JSON 도입 | documentation/core · 토큰·사용 규칙·메타 문서 | 문서/독립 Core 자산; Vue 부품 완료 주장 아님 |
| #theme/scope · 범위와 출처 | documentation/core · 토큰·사용 규칙·메타 문서 | 문서/독립 Core 자산; Vue 부품 완료 주장 아님 |
| #theme/locale · 공통 locale | documentation/core · Core + 기존 S API / 공통 theme·locale 연결 | 문서/독립 Core 자산; Vue 부품 완료 주장 아님 |
| #theme/starter · Vue·Vuetify starter | documentation/core · Core + 기존 S API / 공통 theme·locale 연결 | 문서/독립 Core 자산; Vue 부품 완료 주장 아님 |
| #theme/advanced-vue · 확장 Vue6종 | documentation/core · Core + 기존 S API / 공통 theme·locale 연결 | 문서/독립 Core 자산; Vue 부품 완료 주장 아님 |
| #theme/vue-components · Vue API·전환표 | documentation/core · Core + 기존 S API / 공통 theme·locale 연결 | 문서/독립 Core 자산; Vue 부품 완료 주장 아님 |
| #theme/versioning · 버전과 폐기 정책 | documentation/core · 토큰·사용 규칙·메타 문서 | 문서/독립 Core 자산; Vue 부품 완료 주장 아님 |
| #theme/packages · 설치·업데이트 | documentation/core · 토큰·사용 규칙·메타 문서 | 문서/독립 Core 자산; Vue 부품 완료 주장 아님 |

## 모든 live demo 블록

| 원본 위치 / 예제 | 연결 대상 | 실제 상태 |
|---|---|---|
| style/motion · Explicit replay / Reserved space | 토큰·사용 규칙·메타 문서 | 문서/독립 Core 자산; Vue 부품 완료 주장 아님 |
| style/icons · Solyi line / interface symbols | Core icons paths / SIcon 후속 | 프레임워크 독립 helper 있음 |
| style/writing · Copy lab / fictional states | 토큰·사용 규칙·메타 문서 | 문서/독립 Core 자산; Vue 부품 완료 주장 아님 |
| component/buttons · Button / State gallery | SBtn | API 있음; 본문 HTML 참고 / 실제 starter 실행 |
| component/fields · Text field / Validation | STextField | API 있음; 본문 HTML 참고 / 실제 starter 실행 |
| component/choices · Checkbox / Radio / Select | SCheckbox / SRadioGroup / SSelect | API 있음; 본문 HTML 참고 / 실제 starter 실행 |
| component/feedback · Status / Notice / Announcement | SAlert / SBadge | 후속 · 구현 완료 아님 |
| component/dialog · Native dialog / Detail | SDialog | API 있음; 본문 HTML 참고 / 실제 starter 실행 |
| component/selection · Local preferences / Live preview | SCheckbox / SRadioGroup / SSwitch | API 있음; 본문 HTML 참고 / 실제 starter 실행 |
| component/help · Help / Touch and keyboard | STooltip / SPopover | 후속 · 구현 완료 아님 |
| component/accordion · Native details / Independent sections | SExpansionPanels | 후속 · 구현 완료 아님 |
| component/navigation · Breadcrumb / Side panel / Toast | SBreadcrumbs / SDrawer + SSnackbar 있음 | 후속 · 구현 완료 아님 |
| component/advanced-inputs · Local input extensions | STextarea / SNumberInput / SMultiSelect | API 있음; 본문 HTML 참고 / 실제 starter 실행 |
| component/content-tabs · Fictional record / local panels | STabs | API 있음; 본문 HTML 참고 / 실제 starter 실행 |
| component/action-menu · Fictional record actions | SMenu (SSplitBtn / SContextMenu 내부 동작 재사용) | 후속 · 구현 완료 아님 |
| component/identity-progress · Fictional identity and local wizard | SAvatar / SStepper | 후속 · 구현 완료 아님 |
| component/progress · Manual fictional progress | SProgressLinear / SProgressCircular | 실제 Vue 패키지 2종 · starter/문서 공통 실행 · 로컬 검증 완료 |
| component/time · Local time-only value | STimePicker | API 있음; 본문 HTML 참고 / 실제 starter 실행 |
| component/chart-tree · Fictional activity / visible text alternative | SChart + SDataTable 대안 | 후속 · 구현 완료 아님 |
| component/chart-tree · Fictional folders / single-select tree | STreeview | 후속 · 구현 완료 아님 |
| pattern/form · Create project / Form | SFormPattern (STextField·SSelect·SCheckbox 조합) | 후속 · 구현 완료 아님 |
| pattern/search · Project explorer / Search | SSearchDetailPattern (STextField·SDataTable·SDialog) | 후속 · 구현 완료 아님 |
| pattern/compare · Comparison / Selection | SComparePattern | 후속 · 구현 완료 아님 |
| pattern/empty · First use / Empty state | SEmptyState | 후속 · 구현 완료 아님 |
| pattern/data · Fictional library / local data | SCollectionPattern + SDataTable 있음 | 후속 · 구현 완료 아님 |
| pattern/inputs · Date picker / Single or range | SDatePicker | API 있음; 본문 HTML 참고 / 실제 starter 실행 |
| pattern/inputs · Local file selection / Drop and picker | SFileInput / 로컬 drop | 후속 · 구현 완료 아님 |
| pattern/inputs · Autocomplete / Local fictional categories | SAutocomplete 단일검색 (SMultiSelect와 별도) | 후속 · 구현 완료 아님 |
| pattern/responses · Fictional response simulator | SSkeletonLoader / SStatePanel | 후속 · 구현 완료 아님 |
| pattern/layouts · Fictional notebook / responsive shell | SAppShell + SSettingsTemplate / SListDetailTemplate | 후속 · 구현 완료 아님 |
| pattern/workflow · Disposable fictional record | SInlineEdit / SUnsavedGuard / SDeleteUndoPattern | 후속 · 구현 완료 아님 |
| pattern/error-summary · Linked form errors | SFormErrorSummary | 후속 · 구현 완료 아님 |
| pattern/not-found · Fictional app route | SNotFoundTemplate | 후속 · 구현 완료 아님 |
| pattern/bulk-recovery · Disposable fictional batch | SBulkActionPattern | 후속 · 구현 완료 아님 |

## 셸과 자산

- 문서 헤더·테마/밀도 선택: SHeaderPreferences / SRadioGroup 조합. 현재 문서 JS; Vue 전환 후속.
- 문서 검색·앵커/사이드바·모바일 메뉴: SDocumentShell / SDocumentSearch. 현재 문서 JS; Vue 전환 후속.
- 공식 로고·favicon·CSS/JSON/폰트: 기존 브랜드·Core 자산. 자산 재사용; Vue 컴포넌트 아님.
