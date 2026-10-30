# 사용자 개선 요청 30개 추적

원문: Library `libfile_a66fb4c88318819190ce06b0d4f3afb3`, 붙여넣은 텍스트(4).txt, 2026-10-30. 82줄 전체를 읽었고 줄바꿈만 LF로 정규화한 [원문](IMPROVEMENTS-30-REQUEST.txt)을 보존한다. 번호는 사용자가 작성한 1~30을 유지한다. 항목을 합쳐도 원래 번호의 상태를 없애지 않는다.

완료는 소스 수정만으로 판단하지 않는다. 공개 사이트 / npm 1.1.0 독립 소비 fixture / 미게시 수정 후보를 구분하고 실제 화면·조작으로 확인한다. Page 담당자에게는 이 표의 확인된 결과만 전달하며 별도 완료 상태를 만들지 않는다.

## 현재 환경과 증거

- 시작 기준: `df906f6`, `fix/prepublish-common-ui`, clean. 다른 프로젝트·휴대폰·공유 브라우저는 건드리지 않는다.
- 첨부 PNG 6개는 Library에서 식별했으나 소비 PC의 Python 실행기는 Store 별칭뿐이다. 공식 helper 실행은 Python 없음(exit 9009)으로 실패했다. helper 변경·임의 다운로드·설치는 하지 않았다. Library read도 픽셀이 아닌 asset pointer/설명만 반환하여 이 세션에서 픽셀 확인 완료로 보지 않는다.
- 부모와 독립 QA의 실제 픽셀 확인: 얇게 잘린 Date 팝업, Popover 하단 여백, 혼합 버튼 예제의 [3], 입력 밖 Multi Select 칩, disabled/readonly에서 남은 Sortable 버튼. 이 관찰만으로 패키지 원인은 확정하지 않는다.
- `examples/vue-vuetify/src/embed-height.js`가 열린 floating panel마다 iframe 높이를 최소 480px 및 panel scrollHeight 이상으로 늘리는 경로를 확인했다. 여백 문제의 공통 원인 후보이며 브라우저 전후 치수로 판별한다.
- `examples/vue-vuetify/src/recipes/buttons.vue`에 Button/ConfirmAction/Chip/Badge/Icon/IconBtn이 함께 있다. 카드별 예제/코드 소유 분리가 필요하다. [3]은 이 소스의 Badge 알림 데모에 존재한다.

## 번호별 상태

아래의 ‘미재현’은 사용자 제보를 부정하는 뜻이 아니라 이 세션의 실제 조작 검증 전임을 뜻한다. 원인 소유는 재현 후 문서 / 패키지 / 둘 다로 확정한다.

| 번호 | 원문 요구의 추적 범위 | 재현 | 원인 소유 | 변경 | 검증 | 미완료 |
|---|---|---|---|---|---|---|
| 1 | 모든 Examples 중간의 [3] 제거 | 6개 카드가 같은 buttons.vue의 Badge 알림 데모 공유 | 문서 | 공통 [3] 데모 제거, Badge 표시 자체는 독립 예제로 보존 | 로컬 타입·빌드·Components 연결 및 PC/모바일 12개 실제 예제 조작 통과 | 공개 배포 후 확인 전까지 전체 완료 아님 |
| 2 | Button/ConfirmAction/IconBtn/Badge/Chip/Icon 예제를 각각 자기 기능만 남기고 의미 명확화 | 동일 buttons recipe 확인 | 문서 | buttons·confirm-action·chip·badge·icon·icon-button의 6개 SFC/코드/실행 링크 분리 | 두 번 확인·칩 선택/제거·아이콘 저장/disabled·Badge/Icon 비대화형 표시 통과 | 공개 배포 후 확인; 다른 중복 예제는 각 번호에서 추적 |
| 3 | Autocomplete·비동기 Combobox 열림/닫힘 때 부모 카드 여백 증가 제거 | 미재현 | iframe 측정 공통 후보 | 미착수 | 미실행 | 독립 소비 화면과 비교 |
| 4 | Date 개발 설정 라디오; auto/popover의 얇은 팝업·하단 여백 해결 | 라이브 18px, 같은 npm 독립 fixture 약 525px | 문서 iframe 경계 확인; 패키지 경계 추가 검사 필요 | 미착수 | Chrome 1440/light/violet 비교 실행 | 4 presentation·배치·좁은 화면 |
| 5 | Form 프로젝트 확인 후 검증 표시 지우기 버튼을 실제 동작시킴 | 미재현 | 판별 중 | 미착수 | 미실행 | 오류·모델·포커스 계약 |
| 6 | MultiSelect 목록이 부모를 늘리지 않고 선택 칩이 입력 안에 표시 | 부모 픽셀 관찰 | 판별 중 | 미착수 | 미실행 | 선택·삭제·검색·키보드 |
| 7 | NumberInput과 RangeSlider 직접 입력의 -/+를 한쪽에 모음 | 미재현 | 판별 중 | 미착수 | 미실행 | step/min/max/readonly 보존 |
| 8 | RadioGroup에는 radio, Switch에는 switch/단일 선택 차이를 명확히 표시 | 미재현 | 예제 소유 판별 | 미착수 | 미실행 | 용어·접근성 역할 보존 |
| 9 | TextField loading이 실제 움직임을 표현; clear 횟수 설명 또는 불필요 표시 정리 | 미재현 | motion/예제 판별 | 미착수 | 미실행 | 입력 상태·reduced-motion |
| 10 | Time 손잡이 의미·X/↑/꺾쇠 혼잡 개선, 시/분 오른쪽 단위, 완료 우측·확인색 | 미재현 | 판별 중 | 미착수 | 미실행 | native/list/수동/scrub 취소 |
| 11 | Accordion 1개 및 3~5개 예제 | 미재현 | 문서 | 미착수 | 미실행 | 독립/복수 열기·키보드 |
| 12 | Breadcrumb/Pagination 예제 분리, 숫자 stepper 한쪽, 처음/끝 아이콘 개선 | 미재현 | 문서·패키지 판별 | 미착수 | 미실행 | 두 공개 페이지 모델 보존 |
| 13 | ContextMenu trigger의 메뉴 의미, 깜빡임·부모 하단 여백 개선 | 미재현 | 판별 중 | 미착수 | 미실행 | 클릭/키보드/닫기/포커스 |
| 14 | Stepper 연결선·중복 완료 영역 제거, 라벨 아래 변형, reset 좌/이전다음 우·색 | 미재현 | 판별 중 | 미착수 | 미실행 | 단계 이동/완료/양식 |
| 15 | Tabs와 라인·패널의 시각 연결 강화, 카드 내용도 탭과 연결 | 미재현 | 판별 중 | 미착수 | 미실행 | active/hover/focus/키보드 |
| 16 | Tree 화살표 외 부모 항목 행 전체로 펼침 | 미재현 | 판별 중 | 미착수 | 미실행 | 선택/확장/키보드 역할 |
| 17 | Dialog busyScope 설명 명확화, 사이드패널이 카드 내부에 뜨거나 과도하게 길어지는 문제 | 미재현 | iframe/패키지 판별 | 미착수 | 미실행 | header/actions/body scroll·닫기 |
| 18 | Linear/Circular/Overlay 반복 모션 실제 동작, 중복 예제는 하나 안에서 구분 | no-preference의 Linear/Circular는 양쪽 실행, reduce는 의도한 정지 | 사용자 설정·예제 상태 전환 추가 판별 | 미착수 | 실제 350ms 전후 transform/currentTime 비교 실행 | Overlay·전환·모션 상태 안내·중복 예제 |
| 19 | Popover/Tooltip 의미·트리거 구분, 불필요한 중복과 하단 여백 제거 | 라이브 iframe 207→480px, 카드 +273px | 문서 embed 측정의 최소 480px 확인 | 미착수 | Chrome 1440/light/violet 실제 열기 비교 실행 | hover/focus/click·포커스·부모 높이 불변 |
| 20 | Snackbar가 카드가 아닌 전체 페이지 우측 하단에 표시 | 미재현 | iframe/패키지 판별 | 미착수 | 미실행 | 위치·live region·닫기 |
| 21 | Avatar와 프로필/메뉴 의미 구분, 화면에 없는 입력 샘플 코드 혼입 제거 | 미재현 | 예제 소유 판별 | 미착수 | 미실행 | 화면/코드 동일 원본 |
| 22 | Chart 명칭과 실제 bar·원형·line 등 유형 선택 기능 | 미재현 | 신규 확장 범위 확인 | 미착수 | 미실행 | 실제 렌더·데이터·표 대안 |
| 23 | Card 항목 링크가 iframe 안에서 starter를 여는 동작 개선 | 미재현 | 문서 링크/탐색 판별 | 미착수 | 미실행 | 링크 의미·탐색 대상 |
| 24 | Column/Container/Row 안내를 Components에서 Style 레이아웃으로 이동 검토·반영 | 미재현 | 문서 탐색 | 미착수 | 미실행 | 공개 export 유지·검색/기존 링크 |
| 25 | DataTable loading/error에서 헤더 이름·변경일의 회색 배경/테두리 불일치 | 미재현 | 판별 중 | 미착수 | 미실행 | 정상/로딩/오류 및 테마 |
| 26 | Calendar 월 제목·일요일색·날짜 상단정렬·+N/항목/ⓘ 실제 접근, 테마색·인접 이전다음·연도선택 | 미재현 | 판별 중 | 미착수 | 미실행 | ISO/marker·overflow·키보드 |
| 27 | Sortable 무테 손잡이·이동 모션, disabled/readonly 조작 숨김 | 부모 픽셀 관찰 | 판별 중 | 미착수 | 미실행 | drag/화살표/취소·reduced-motion |
| 28 | TimeGrid 위치 흔들림 제거·설명 정리·실제 생성/삭제/drag 이동/양끝 resize/복제·현재시각선 갱신 | 미재현 | 패키지/소비 예제 판별 | 미착수 | 미실행 | controlled 제안·저장 없음·실제 조작 |
| 29 | FileInput 이미지 파일 미리보기 | 미재현 | 패키지/소비 예제 판별 | 미착수 | 미실행 | 타입·취소·객체 URL 해제 |
| 30 | 실제 연결 버튼·토글/그룹 기능 | 미재현 | 기존 Segmented/API 비교 | 미착수 | 미실행 | 선택 모델·키보드·폼 의미 |

## 진행 순서와 완료 경계

1. 공통 iframe/floating/containment와 motion을 라이브 및 npm 1.1.0 독립 fixture에서 먼저 재현한다. 문서 호스트 원인과 패키지 원인을 분리한다.
2. 중복 예제를 실제 소유 컴포넌트별로 분리하고 표시·복사·실행 원본을 일치시킨다.
3. 입력·내비게이션·Calendar/Sortable를 변경 영향 범위로 확인한다.
4. Chart/TimeGrid/FileInput/ButtonGroup의 승인된 실제 기능을 구현한다. 동작하지 않는 장식 버튼으로 완료 처리하지 않는다.
5. 30개 외 추가 발견은 별도 표에 증거/수정 판단을 기록한다. 별도 기능 확대는 제안으로만 남긴다.
6. 최종 스크린샷과 실제 상호작용 확인 후만 각 번호를 완료 처리한다. 단위/빌드만 통과한 항목은 실제 UI 미검증으로 남긴다.

## 배포 전 버전 구분안 (아직 적용·배포하지 않음)

- 공개 릴리즈 목록은 1.0.0·1.1.0만 유지한다. npm 1.1.0 tarball·해시·태그를 바꾸지 않는다.
- 문서 호스트/기존 1.1.0 예제 수정과 미게시 패키지 기능은 분리한다. 새 API를 npm 1.1.0 기능으로 안내하지 않는다.
- 패키지 변경의 독립 소비 검증은 별도 미게시 개발 후보를 사용하고 버전·소스 commit을 화면에 명시한다. 1.1.0 동결 검사를 완화하지 않는다.
- 사이트 반영 전, 안정판(게시 1.1.0)과 개발 미리보기의 경로·배지·코드 import/설치 안내 구분을 구체적으로 보고한다. 이 문서의 구분안만으로 새 npm 게시나 새 공개 릴리즈를 만들지 않는다.
- npm 새 버전 게시·소비 4개 앱 업데이트·휴대폰 조작은 금지다.

## 추가 발견

아직 완료 판정 없음. 공통 원인을 재현한 뒤 원문 외 발견은 요구 번호와 섞지 않고 근거를 적는다.

- A1: 기존 Combobox 예제는 정본 registry에 있지만 starter 탐색 메뉴에는 없었다. `RecipeExamples.vue` 입력 그룹에 연결하고 `recipe-navigation-check.mjs`에서 registry의 모든 예제가 정확히 한 개의 메뉴 링크를 갖는지 비교한다. 예전 고정 개수 30은 이 누락을 감추고 있었다. 이는 새 기능 제안이 아니라 기존 공개 예제의 탐색 누락 수정이다.
- R1(개발 중 발견·공개 배포 전 수정): Chip 예제 분리 때 원래의 nextTick 후 결과 포커스 복원을 누락했다. `recipes/chip.vue`에 안정적인 결과 ref와 포커스 복원을 복구하고, ConfirmAction의 확정 후 비활성화에도 같은 원칙을 적용했다. 설치본 runtime의 실제 activeElement 및 Chrome의 Enter 제거 후 결과 포커스가 양 폭에서 통과했다. 상태 문구만 바뀌는 검사를 키보드 검증으로 대신하지 않는다.

초기 실행 근거: `qa-output/improvements-30/initial-observations.json`, `initial-document-*.png`, `initial-package-*.png`. 독립 fixture는 공식 registry에서 solyi-ui 1.1.0 / Vue 3.5.44 / Vuetify 4.3.0을 새로 설치했다. 모듈 junction 생성은 OS 접근 거부로 실행되지 않았고 재시도하지 않았다. 정상 npm 설치로 별도 fixture를 구성했으며 기존 소비 앱·기존 설치본을 수정하지 않았다. Autocomplete는 첫 probe의 focus만으로 패널이 열리지 않아 이 probe를 재현 완료로 보지 않는다. 검색 입력까지 수행하는 추가 확인이 필요하다.

1·2번 로컬 검증 근거: `example-types.log`, `example-final-build.log`, `example-docs-build.log`, `example-observations.json`, `example-*-390.png`, `example-*-1100.png` (위 QA 폴더). 실제 npm 1.1.0 API만 사용하며 패키지 소스·배포 tarball·릴리즈 목록은 변경하지 않았다. 이 첫 문서 수정 배포에는 미게시 API가 없다. 새 패키지 기능은 안정판 1.1.0 예제에 섞지 않는다.

첫 CI `40997142825`는 배포 전에 중단됐다. 원인은 실제 예제가 36개가 되었는데 `vue-recipes-runtime-check.mjs`가 31개를 고정 비교한 것이다. 원래 31개 전체와 새 5개의 정확한 등록 목록을 검사하고 새 확인/칩/아이콘 저장 동작도 추가 검증하도록 보완했다. 수정 후 로컬 installed runtime은 36개 mount·ARIA/ID와 기존 동작·새 동작 모두 통과했다(`example-runtime-fixed.log`). 첫 CI의 실패를 공개 반영 완료로 표시하지 않는다.

후속 CI `40998452160`은 탐색 메뉴 고정 개수 30에서 중단됐다. 메뉴에 실제 Combobox 누락도 있었으므로 숫자를 36으로 바꾸는 대신 정본 registry의 모든 예제와 실제 메뉴 href 목록을 정확히 대조하고 중복 ID도 검사한다. 실제 탐색 runtime(`navigation-inventory.log`)과 390px Chrome의 메뉴 펼침→Combobox Enter 이동→제목 포커스(`menu-browser.json`, `combobox-menu-390.png`)가 통과했다.

독립 검토 후 여섯 예제 각각에 다른 다섯 주 컨트롤의 재혼입을 막는 negative assertion을 추가했다. ConfirmAction의 Escape/blur는 설치본 실제 예제 runtime에서, Escape/Tab blur/기본 timeout은 실제 Chrome에서 실행했다. 기본 timeout 확인은 한 폭에서만 반복하여 불필요한 대기를 줄였다. 근거는 `example-keyboard-browser.log` 및 `example-browser.mjs`, `example-runtime-fixed.log`다. 1·2번은 이 보완과 최종 공개 검증 전까지 전체 완료로 표시하지 않는다.

요구/인수 기준 Page: https://chatgpt.com/space/page_860e6bc2fbac8191a9cf334134dde5fe . 부모가 확인 결과를 대조해 갱신한다. 현재 30건 모두 미완료이며 이 문서의 초기 재현 결과를 전체 완료로 해석하지 않는다.
