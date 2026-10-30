# 변경 이력

## 0.6.0 · local candidate, not published

- Preserve624bc43 exact document-name/alias ranking fix.
- Core0.3.1 overflow labels and UI0.4.0 shared reactive ko/en locale for20 APIs, base wrappers, Intl date-only/number display and strict grouped-number input. Caller text and data contracts stay unchanged.
- Actual installed locale starter and dedicated type/runtime/focus regressions; Pages distribution is the next local gate.

## 로컬 미게시 후속 · 검색 이름 우선순위 — 2026-10-22

- 정확한 이름·ID·명시적 검색 별칭을 설명/본문보다 우선. Date Picker/날짜, Time Picker/시간 등의 첫 결과와 NFKC·일반 다중 단어 AND 검색 회귀 추가. 기존59개 목적지/앵커/헤더·폰트·토큰 유지.
- 기존 locale 주입과 로컬 tarball/Pages 검증 흐름을 확인하고 실제 남은 전역 언어·설치/업데이트 작업을 NEXT-STEPS.md에 정리. 별도 로컬 커밋만 수행하며 공개 푸시는 하지 않습니다.

## 로컬 미게시 후속 · 문서 검색/헤더 설정 — 2026-10-22

- 기존 원본과 메뉴/호환 앵커에서59개 문서 검색, 키보드·IME·초기화·빈 결과·기존 미저장 이탈 확인 연결.
- 헤더의 테마3종/밀도2종과 기존 모드·저장 상태 공유. 좁은 화면에서는 화면 설정 패널로 통합. 기존 폰트·토큰·패키지 API 보존.
- 로컬 검증과 별도 커밋만 수행하며 공개 푸시·Pages 배포는 이번 단계에서 하지 않습니다.

## 로컬 미게시 후속 — 2026-10-22

- 9ee1faf를 보존한 별도 코드폰트 변경: JetBrains Mono2.304 → Nanum Gothic Coding2.000 → monospace. Core의 opt-in code-fonts.css, 공식 원본 Regular/Bold·OFL·고정 출처/해시, 실제 문서/설치 데모의 한영 주석 샘플과 검사 추가. Wanted Sans UI 및 리가처 설정은 유지.
- 아직 게시하지 않은0.5.0/Core0.3.0 후보의 tarball/소비 lock을 로컬에서 갱신합니다. 공개 푸시·Pages 배포·레지스트리 게시 없음.

## 0.5.0 — 2026-10-22

- Core/UI local pack0.3.0: SegmentedControl, 검색 가능한 MultiSelect, 양끝 RangeSlider, SplitButton, ContextMenu, ResizableSplitPane을 더해 실제 typed export20종을 제공합니다. 기존14종과 공개 링크/기능은 유지합니다.
- 다중 선택의 IME·비동기 레이스·오류/재시도·태그 제거, 고정 순서 슬라이더 경계/키보드/트랙, 공유 메뉴의 키보드/우클릭/모바일 버튼/초점, 분할 패널의 포인터·키보드·min/max·세로 리플로우를 실제 설치 데모에 연결했습니다.
- 기본 UI는 사용자 선택에 따라 공식 Wanted Sans1.0.3을 self-host합니다. 원본 CSS/WOFF2/OFL·고정 출처/해시를 패키지와 사이트에 보존하고 코드용 monospace는 변경하지 않습니다.
- TimePicker의 선택행과 완료 버튼 사이에 space-2(8px)를 추가했습니다. MultiSelect 재시도 버튼이 사라지는 로딩 상태에는 초점을 검색칸에 유지하고, 메뉴 동작 후 소비 앱이 옮긴 초점은 보존합니다.
- 레지스트리 게시·다른 앱 연결·새 권한 없이 기존 검증→Pages 흐름만 사용합니다. 남은 기존 예제 전환/문서 검색/전체 locale/설치 배포 채널/Figma는 후속으로 구분합니다.

## 0.4.0 — 2026-10-22

- Core/Vue UI local pack0.2.0: 기존 Button/Field/Dialog/Table에 Checkbox, RadioGroup, Switch, Select, Textarea, NumberInput, Tabs, Toast, DatePicker, TimePicker의 typed Vue API를 추가했습니다. 실제 설치 starter와 별도 타입 소비자가 총14종을 가져옵니다.
- 새 입력은 controlled v-model, 연결된 label/help/error, disabled/readonly와 locale 문구 확장을 지원합니다. 날짜는 단일/기간 완료값만, 시간은 유효한 HH:mm만 확정하며 직접 입력·키보드·초점 복귀를 유지합니다. Tabs는 roving/수동 활성화, Toast는 live region과 초점·포인터·문서 비활성 시 타이머 정지를 제공합니다.
- 순수 date-only 연산을 Core /date export로 공유하고 문서의 기존 달력도 같은 함수를 씁니다. Vue는 자신이 렌더한 노드와 refs를 관리하며 문서 예시 DOM에 의존하지 않습니다.
- 전체 예시 전환표 VUE-MIGRATION.md, 실제 API/사용 코드 VUE-API.md를 추가했습니다. 나머지 HTML 참고 예제와 다음 단계 신규6종은 전환 완료로 표시하지 않습니다. 색·폰트·공식 브랜드·반경6/10/12/16 및 기존 기능을 보존하고 npm 게시/다른 앱 연결은 하지 않았습니다.


## 0.3.5 — 2026-10-22

- 공인 기준 감사에서 재현한 화면틀 선택 메뉴 대비, 시간 textbox ARIA 상태, 검색/빈 결과 제목 계층을 수정했습니다. 기존 색 토큰·타이포·반경6/10/12/16은 유지합니다.
- SolField의 외부 레이블 ID를 Vuetify 입력 참조에 연결하고 Table 재시도 조작이 사라질 때 결과 요약으로 초점을 이어 줍니다. 사용자가 다른 곳으로 옮긴 초점은 보존합니다.
- starter 메타 설명과 관련 회귀를 추가했습니다. Core/Vue UI local pack0.1.5, 레지스트리 미게시. 원본 HTML의 h1 경고는 렌더 후 정상인 SPA 셸의 한계로 기록하고 구조는 유지합니다.

## 0.3.4 — 2026-10-21

- 개발자 및 독립 리뷰의 재현 결함 수정: Vue 버튼 aria-disabled, Table 반응형 정렬과 부분 선택 갱신, starter 제출 시점 값, 전체 제목 접근성 이름 갱신.
- 자동완성 Home/End 편집·Tab 재시도·문자열 렌더링, 사이드바04 번호 줄바꿈 보완. 반경6/10/12/16과 색·타이포 토큰 유지.
- 독립 패키지/실제 starter 런타임 회귀 보강. Core/Vue UI local pack0.1.4, 레지스트리 미게시. 상세는 DEVELOPER-REVIEW.md.

## 0.3.3 — 2026-10-21

- 카드·작은 팝업12px, 다이얼로그·큰 패널16px로 반경 체계를 통일. 버튼6/입력10/중첩 보조 면10과 의도된 원형·가장자리 연결 규칙은 유지합니다.
- radius-lg12/radius-xl16과 역할 토큰을 일치시키고 메뉴·팝오버·달력·시간 패널·자동완성 목록·툴팁·토스트에 floating12를 적용. 색·패딩·타이포·높이·기능은 변경하지 않았습니다.
- 문서·공통 Core·Vue UI·starter 및 보관용 starter 토큰을 동기화. Core/Vue UI local pack0.1.3, 레지스트리 미게시.

## 0.3.2 — 2026-10-21

- 카드 역할만 20→12px로 조정. 버튼6/입력10/큰 패널28/중첩 보조 면10, 모든 색·여백·높이와 동작은 유지.
- 기존 카드 토큰을 공유하던 메뉴·팝오버·달력·시간 선택 패널은 radius-floating 역할로 분리해 기존20px 유지.
- 문서·공유 Core와 설치형 Vue 데모를 함께 갱신. Core/Vue UI local pack0.1.2, 레지스트리 미게시.

## 0.3.1 — 2026-10-21

- 패키지 Table caption 좌우 inset, 검색 컨트롤과 표 사이 간격, header/body 시작점과 footer 리듬 수정.
- Core의 기존 Solyi line icon 원본을 typed icons export로 공유하고 페이지 이동/닫기에 고정 SVG box 사용. 버튼 반경 6px과 compact row/고정 열/말줄임은 유지.
- 패키지 Field의 label/help/error 간격, Dialog 본문 간격, 모바일 caption/상세 행동, 로딩/빈 결과의 여백을 함께 정리. Core/Vue UI local pack 0.1.1.
- 시각 검토의 실제 캡처 범위와 제한은 VISUAL-REVIEW.md 및 QA.md에 분리 기록. 다른 앱 연결/레지스트리 게시 없음.

## 0.3.0 — 2026-10-21

- private Core/Vue UI 0.1.0 local pack, Button/Field/Dialog/Table 타입·스타일 exports와 실제 tarball 소비 demo/독립 소비 검증. Vue/Vuetify external.
- 검증 성공에 의존하는 같은 Pages 배포 구조, 정확한 버전·lock·롤백·미연결 앱 경계 문서. 레지스트리 게시 없음.
- 오류 요약·가상404·일괄 부분 실패/실패만 재시도·비동기 자동완성 상태/경합, 개별 입력/차트/트리 앵커, Time 작은 선택 패널.
- 버튼6px·표/목록 밀도와 말줄임·이전 기능·공식 브랜드 보존.

## 0.2.5 — 2026-10-21

- 컬렉션 제목을 한 줄 ellipsis로 고정하고 실제 tooltip/전체 제목 Dialog와 원래 상세 행동을 함께 제공. 모바일 grid의 최소 너비를 보완해 긴 제목에도 행/열/카드 치수 유지.
- Progress 전용 메뉴: 기존 선형 바 재사용+원형 서클, 알려진 값/값 없음/완료/오류/재시작·키보드·줄이기 지원. 가짜 퍼센트·반복 회전 없음.
- 버튼 반경만 v0.2.2(86b5f7b)6px로 복원하고 독립 radius-button 역할 분리. 입력10/카드20/패널28, 높이·색·서체·공식 브랜드 보존.
- 최신 소스 누락 감사는 후속 검토만 기록. Time picker 구현은 변경하지 않음.

## 0.2.4 — 2026-10-21

- 테이블·리스트 재설계: 컴팩트 행, 고정 보조 열/유연한 제목, 고정 정렬 아이콘, 묶인 번호 페이지 탐색과 별도 표시 개수.
- 모바일은 콘텐츠 폭에 따른 카드와 현재 주변 번호, 44px 조작 영역. 긴 제목·많은 자료·로딩/오류/복구를 같은 로컬 데모로 제공.
- Textarea 공통 height 덮임 수정,3줄 이상/조건부 세로 스크롤/카운터 정리. Time은 직접 시각 입력+시·분 선택으로 교체하고 HH:mm·범위·간격 계약 유지.
- 차트 대체 표를 체크박스 열 규칙과 분리. 긴 자료의 상세 연결과 부분 시간 선택의 오류 후 보존도 회귀 검사에 추가.

## 0.2.3 — 2026-10-21

- 작은 표시 6px / 버튼·필드·중첩 보조 면 10px / 카드 20px / 큰 패널 28px의 공유 반경 역할 적용. 사선 모서리·새 폰트·새 색·그라데이션 없음.
- Style 모서리 설명과 실제 중첩 예시, 다운로드 CSS/JSON, Vue/Vuetify 어댑터 일치. 기존 36/40/44px 높이와 탐색·날짜·파일 기능 보존.
- 자체 리뷰에서 문서 컨테이너 안의 일반 카드까지 작아지는 규칙을 제거하고, 예시 컨테이너/메뉴의 포커스 외곽선 잘림 가능성을 여백과 overflow로 보완.

## 0.2.2 — 2026-10-21

- 상위 분류별 본문을 연속 문서로 복원하고, 현재 상위 항목 바로 아래의 들여쓴 2차 목차를 섹션 앵커로 연결.
- 별도 주제 개요·그룹 드롭다운·독립 주제 화면 제거. 사이드바 스크롤 하나, 모바일 문서 메뉴 하나로 통일.
- 같은 페이지 앵커에서 데모 입력을 유지. 헤더 오프셋·현재 읽는 섹션 활성·모바일 선택 후 닫힘·이전 개별 링크 호환.
- 버튼 hover 대비, 공식 브랜드, 기존 데모와 Core 역할 값을 보존. 이전 0.2.1의 문서 화면 분리는 이 변경으로 대체.


## 0.2.1 — 2026-10-21

- 의미색 버튼의 hover 전경/배경 조합을 공통 규칙으로 유지. focus·active·native/aria disabled도 함께 검사.
- 상위 메뉴를 개요로, 문서를 기능군별 2차 메뉴와 47개 개별 주제로 분리. 기존 공개 해시와 통합 문서를 보존.
- 날짜/파일/자동완성, Textarea/숫자/다중선택, Avatar/진행, 차트/트리를 개별 예시로 탐색.
- CSS cascade·specificity를 반영한 630개 상태 대비와 주제별 경로/초점/호환/뒤로·앞으로 회귀 추가. Core 역할 값·공식 브랜드·독립 starter의 구현 범위는 유지.

## 0.2.0 — 2026-10-21 · 검토 초안

- 공식 브랜드 sparkle SVG와 favicon ICO 원본 적용. 출처/해시: BRAND-ASSETS.md.
- Solyi line UI 아이콘 16/20/24, 레이어·elevation·backdrop 토큰, 문구와 크기·간격 규칙.
- 반응형 공통 셸과 설정/목록/상세 템플릿.
- Textarea·숫자 증감·다중 태그·실제 탭 패널·재사용 행동 메뉴.
- 가상 기록 편집/저장/취소, 미저장 이탈 확인, 삭제 영향·지속 Undo.
- Avatar/menu·단계/progress·time-only·차트/표·키보드 트리.
- 독립 Vue/Vuetify Button/Field/Dialog starter, 고정 lockfile·원본 라이선스 고지.
- 기존 역할 색·통합 날짜 API·드롭·모션·작은 보조 버튼 계약 유지. 기존 앱에 적용하지 않음.

## 0.1.0 — 2026-10-21

역할 토큰과 세 테마/라이트·다크, 기존 컴포넌트·패턴·모션·컬러 샘플, 단일/기간 통합 달력과 로컬 파일 선택/드롭의 초기 초안.

## 버전과 폐기

Patch는 계약을 유지하는 수정, Minor는 새 기능과 문서의 확장입니다. 계약을 깨는 변경은 별도 이행 안내가 필요합니다. 0.x에서도 폐기 표기·대체 예시·이행 방법을 먼저 제공하고 최소 다음 minor까지 병행합니다. 이후 제거 시 변경 이력에 정확한 버전과 영향을 기록합니다. 현재 폐기 예정 API는 없습니다. 기존 앱의 운영 반영은 별도 검토와 승인 범위입니다.
