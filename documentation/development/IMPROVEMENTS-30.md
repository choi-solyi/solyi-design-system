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
| 1 | 모든 Examples 중간의 [3] 제거 | 6개 카드가 같은 buttons.vue의 Badge 알림 데모 공유 | 문서 | 공통 [3] 데모 제거, Badge 표시 자체는 독립 예제로 보존 | 로컬 타입·빌드·Components 연결 및 PC/모바일 12개 실제 예제 조작 통과 | f221ec1 CI·공개 357파일·390px 실제 예제 확인 완료 |
| 2 | Button/ConfirmAction/IconBtn/Badge/Chip/Icon 예제를 각각 자기 기능만 남기고 의미 명확화 | 동일 buttons recipe 확인 | 문서 | buttons·confirm-action·chip·badge·icon·icon-button의 6개 SFC/코드/실행 링크 분리 | 두 번 확인·칩 선택/제거·아이콘 저장/disabled·Badge/Icon 비대화형 표시 통과 | f221ec1 공개 예제까지 완료; 다른 중복 예제는 각 번호에서 추적 |
| 3 | Autocomplete·비동기 Combobox 열림/닫힘 때 부모 카드 여백 증가 제거 | 로컬 문서와 registry fixture 실제 검색/목록 열기 비교 | 문서 iframe 호스트 | 설치된 1.1.0을 같은 문서 viewport에 직접 마운트 | 1440/390px 카드·문서 높이 불변, Escape 포커스 복귀 | 새 호스트 CI·공개 배포 확인 |
| 4 | Date 개발 설정 라디오; auto/popover의 얇은 팝업·하단 여백 해결 | 기존 라이브 18px, 같은 npm 독립 fixture 약 525px | 문서 iframe 경계; 패키지 모든 경계의 정상 여부는 단정하지 않음 | 직접 viewport 호스트 + SRadioGroup 설정 | PC/390px 네 presentation 열기·높이 불변·ISO 날짜 선택 실제 확인 | a2550f5 CI·공개 390px 네 표시 방식 확인 완료; 특수 배치 경계는 별도 회귀 |
| 5 | Form 프로젝트 확인 후 검증 표시 지우기 버튼을 실제 동작시킴 | 기존 API는 오류를 지움; 성공/서버 피드백이 남아 예제 동작을 알기 어려움 | 문서 예제 피드백 소유 | resetValidation과 예제 소유 피드백 정리, 입력 보존 안내, busy 중 차단 | PC/390px 및 a2550f5 공개 390px 오류/성공 지우기·값 보존 확인 | 추가 미완료 없음 |
| 6 | MultiSelect 목록이 부모를 늘리지 않고 선택 칩이 입력 안에 표시 | registry 1.1.0과 독립 fixture에서 확장 재현 | 패키지 일반 흐름 popup/외부 선택 목록 | 전용 개발 브랜치에서 floating·입력 내부 SChip·Escape 계층 보완 | 개발 tarball의 3테마/PC·390px/RTL·키보드·터치·SSR·타입·예산 통과 | npm/공개 1.1.0 미반영. [실행 근거](IMPROVEMENTS-30-06.md) |
| 7 | NumberInput과 Range 직접 입력의 -/+를 한쪽에 모음 | 기존 양 끝 버튼 재현 | 패키지 NumberInput 렌더링 | 감소/증가 그룹을 논리적 끝 쪽에 배치; 모델/step 로직 유지 | 3테마 PC·390px/RTL 소비 UI·폼·키보드 및 기존 39개 전이 통과 | 개발본 완료; 최종 1.1.1 통합/반영 대기. [근거](IMPROVEMENTS-30-07-08.md) |
| 8 | checkbox/switch/radio 의미를 보존하며 전용 예제로 구분 | 기존 혼합 예제 재현 | 문서 소유 | 4개 전용 SFC/Components/코드/starter, Switch의 checkbox 비교 명시 | 타입·40개 SFC·메뉴·3테마 12개 실제 페이지/키보드 통과 | 개발 브랜치 완료; 최종 일괄 반영 대기. [근거](IMPROVEMENTS-30-07-08.md) |
| 9 | TextField loading이 실제 움직임을 표현; clear 횟수 설명 또는 불필요 표시 정리 | no-preference 회전 확인, reduce에서는 의도적으로 정지 | 예제 설명 | 불필요 clear 횟수 제거·상태 안내 | 설치본 Chrome 3테마/390px·실제 animation 시간 변화·reduce 확인 | 개발 완료·최종 통합 전, 공개 미반영 |
| 10 | Time 손잡이 의미·X/↑/꺾쇠 혼잡 개선, 시/분 오른쪽 단위, 완료 우측·확인색 | 입력 내 손잡이와 단위/확인 배치 확인 | 패키지 | 이름 있는 grip 별도 줄·오른쪽 단위·우측 primary 확인 | 설치본 Chrome PC/390px/RTL 선택 확정·grip 키보드, 기존 source 계약 검사 | 개발 완료·최종 통합 전, npm 1.1.0 미포함 |
| 11 | Accordion 1개 및 3~5개 예제 | 단일만 제공 확인 | 문서 | 단일+독립 4개 | 실제 summary Enter·동시 열림·독립 닫기·3테마 | 개발 완료·최종 통합 전, 공개 미반영 |
| 12 | Breadcrumb/Pagination 예제 분리, 숫자 stepper 한쪽, 처음/끝 아이콘 개선 | 공용 navigation 예제·이중 SVG·좁은 화면 첫끝 숨김 확인 | 문서·패키지 | 독립 예제·새 chevrons 1개·같은 폭·모바일 첫끝 유지 | 설치본 Chrome 이동/포커스·1003/주변3·수락/거절·첫끝·RTL·넘침, 소유/메뉴/코드 일치 검사 | 개발 완료·최종 통합 전, legacy navigation 링크 보존 |
| 13 | ContextMenu 펼침 표시·깜빡임·부모 빈 공간 | 펼침 단서 부족, iframe 호스트 높이 문제는 기존 수정 | 문서 호스트+패키지 표시 | 버튼에 chevron 추가·메뉴 의미 보존 | 설치본 PC/390/RTL에서 연속 프레임 x/y 변화 0·부모/card/scrollHeight 변화 0, 우클릭/Shift+F10/선택/Escape focus | 개발 완료·최종 통합 전, 공개 미반영 |
| 14 | Stepper 연결선·이름 아래 옵션·중복 진행 제거·초기화 왼쪽/이전다음 오른쪽·색상 | 예제 중복 진행막대·배치와 패키지 표현 부족 | 문서+패키지 | additive labelPosition 기본 inline/below·연결선, 예제 actions와 primary 정리 | 설치본 3테마/390/RTL 연결선·아래 배치·실제 입력→검토→완료→초기화 및 포커스 | 개발 완료·최종 통합 전, npm 1.1.0 미포함 |
| 15 | Tabs와 기준선/내용 패널 연결 | gap·분리된 둥근 패널 확인 | 패키지 CSS | 수평 탭을 붙이고 패널과 기준선 공유, 수직 계약 보존 | 설치본 3테마/390/RTL 경계 y 오차 0·방향키 disabled 건너뜀·패널 입력 유지 | 개발 완료·최종 통합 전 |
| 16 | Tree 화살표 외 부모 항목 행 전체 펼침 | 기존 row는 선택만 수행 | 패키지 | 부모 row 클릭 시 기존 선택+펼침, disclosure와 방향키 보존 | 설치본 실제 라벨/행 클릭·접기·ArrowRight 자식 focus·ArrowLeft·선택 유지, source 42 SFC 회귀 통과 | 개발 완료·최종 통합 전 |
| 17 | Dialog busyScope 설명, 긴 본문 옆패널 viewport | iframe 호스트 문제와 설명 부족 | 문서 | 처리 중에만 잠금이 적용됨과 두 범위 설명 보강 | 로컬 실제 Drawer PC/390/가로760×390 높이·본문 scroll·header/actions 고정·all Escape 잠금·완료/복귀 확인 | 개발 완료·최종 통합 전 |
| 18 | Linear/Circular/Overlay 실제 모션 및 한 카드 비교 | 기존 모션은 허용 설정에서 동작·예제 3중 중복 | 문서 | 비교 카드 하나, 다른 API 예제는 소유 카드 연결·세 API 유지·기기 모션 감소 안내 | 실제 3테마 1100/390에서 막대/SVG/Overlay 시간·transform 변화 및 reduce 확인, 정확한 shared-owner 계약 검사 | 개발 완료·최종 통합 전 |
| 19 | Tooltip/Popover 의미·트리거 구분·부모 여백 | iframe 높이 문제, hover-only Escape 패키지 결함 추가 확인 | 문서+패키지 | 독립 예제·info 도움말/chevron 추가정보·Tooltip document Escape capture 및 IME 보존 | 문서 3테마 높이/hover/focus/확인/복귀, 설치본 hover Escape reason·바깥 focus·IME 확인, source runtime 회귀 | 개발 완료·최종 통합 전, npm 1.1.0 hover Escape 미수정 |
| 20 | Snackbar 전체 페이지 우측 하단 | 기존 패키지 body Teleport 정상·문서 iframe viewport 문제 | 문서 호스트 | 기존 공통 호스트 재사용 | 로컬 문서 3테마 PC/390에서 전체 viewport 하단과 닫기/기존 계약 확인 | 개발 완료·최종 통합 전 |
| 21 | Avatar와 메뉴 의미 및 Sample Code 역할 일치 | Avatar가 Stepper/사용자 메뉴 조합 소스 공유 | 문서 | Avatar 전용 소스·대체 글자/접근성 이름 설명, 가짜 메뉴 제거 | 3테마 실제 Avatar 이름/버튼 부재/코드에 Stepper·메뉴 부재 확인, 소유 negative 검사 | 개발 완료·최종 통합 전 |
| 22 | Chart 명칭·bar/line/pie 실제 유형 | 기존 bar-only 구현 | 문서+패키지 | 기존 SBarChart/export·bar 기본값 유지, additive type 및 SChartType·동일 표·원형 번호/범례 | 설치본 3테마/390/RTL 3유형 실제 geometry·동일 자료·zero/empty/loading 확인, 자체 SVG로 새 엔진/라이선스 없음 | 개발 완료·최종 1.1.1 문서 런타임 전환·통합 전 |
| 23 | Card 링크가 iframe 안에서 starter를 여는 동작 | 예제 링크 target 없음 | 문서 | 새 탭임을 표시하고 _blank/noopener 지정 | 실제 popup URL·opener null·부모 URL 유지 확인 | 개발 완료·최종 통합 전 |
| 24 | Container/Row/Column을 Style 레이아웃으로 이동 | Components 메뉴/카드에 배치 도구 혼합 | 문서 | Style 안내/API·검색·메뉴 이전, 세 export와 구 component/code/api 링크 유지 | PC/390 실제 구 링크→Style/API/Sample Code·hash 확인, 계약 검사·이동 후 DOM 회귀 보완 | 개발 완료·최종 통합 전 |
| 25 | Table loading/error 정렬 헤더 배경·테두리 안정 | SBtn disabled 공통 스타일이 헤더 sort에 적용 | 패키지 CSS | Table sort disabled에만 투명 배경/테두리 유지·native disabled/접근성 보존 | 설치본 3테마 PC/390/RTL normal/loading/error 실제 computed 배경/테두리/높이 및 disabled 확인 | 개발 완료·최종 통합 전 |
| 26 | Calendar 제목·일요일·날짜 상단·전체 항목·아이콘 의미·색·인접 화살표·연도 이동 | 기존 작은 제목/중앙 정렬/상세 발견성 부족 | 패키지+예제 | 토큰 toolbar/큰 제목/일요일 danger·날짜 top·전체 상세 focus·year controlled 입력, 예제 ⓘ 제거 | 설치본 3테마 PC/390/RTL year 수락·거절/ISO 보존/마커3개·focus 확인, source 계약 통과 | 마지막 Enter 폼 제출 방지 보완과 최종 1.1.1 재검증 전 |
| 27 | Sortable bare grip·가시적 이동·disabled/readonly 조작 숨김 | 테두리 버튼·순간 재정렬·회색 조작 | 패키지 | 투명 손잡이·이동 전환·드래그 label ghost·숨김·focus 복귀 | 설치본 실제 CSSTransition·배열 불변/순서·포커스·ghost/commit·숨김, source invalid/empty 포함 회귀 통과 | 마지막 숨김 focus 보완·touch/reduce 및 최종 후보 확인 전 |
| 28 | TimeGrid 위치 안정·CRUD·직접 drag/edge resize·duplicate·live clock·제어/잠금 의미 | 도움말/로딩 추가로 grid top 변동·손잡이 발견성 부족·생성/삭제/clock 부재 | 패키지+예제 | 아래 상태/키 안내·body drag·짧은 edge resize·opt-in create/remove 요청·현재 분 시각선·실제 부모 수락/거절 | 설치본 3테마 PC/390/RTL CRUD/drag/짧은 resize/duplicate/취소/수락거절/disabled/item lock/keyboard Delete·60초 clock DOM 갱신, CDP 실제 touch move/cancel 통과 | 최종 1.1.1 산출물·전체 회귀 전 |
| 29 | FileInput 이미지 미리보기 | 메타데이터만 제공 | 패키지+예제 | preview 기본 true·image MIME 로컬 URL·실패/제거/옵션 해제/unmount 정리 | 설치본 PNG decode·숨김/재표시·실패 fallback·전 URL revoke 확인, 3테마/390/RTL | 최종 1.1.1 타입/SSR/전체 회귀 전 |
| 30 | 연결 명령 버튼/선택 토글 | 단일 선택 SegmentedControl 기존 제공·명령 그룹 부재 | 신규 SBtnGroup+기존 재사용 | label/orientation/default slot·자식별 상태/행동, 선택은 기존 SegmentedControl | 실제 명령/복원 focus·가로/세로·native radio 방향키·모바일/RTL 통과, type/global/export 등록 | 세로 전환 radius 애니메이션 제거 보완과 최종 후보 등록/타입/SSR 확인 전 |

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

요구/인수 기준 Page: https://chatgpt.com/space/page_860e6bc2fbac8191a9cf334134dde5fe . 부모가 확인 결과를 대조해 갱신한다. 1·2번 묶음은 공개 배포와 실제 공개 예제까지 확인했다. 나머지 부분 검증을 전체 30건 완료로 해석하지 않는다.

### 공통 호스트 묶음의 실제 증거

- `21f4170`의 CI [41003242961](https://github.com/choi-solyi/solyi-design-system/actions/runs/41003242961)는 validate/Pages deploy 모두 성공했다. 이후 추가 복구 결함 보완과 4·5번 문서 수정은 별도 커밋으로 구분한다.
- A2(추가 결함): 호스트의 실패 Promise/실패 CSS 링크/마운트 집합이 일시 실패를 영구 캐시했다. 실패 캐시와 링크를 정리하고 명시적 재시도 버튼을 추가했다. 브라우저의 실패 모듈 URL 캐시 때문에 실패 후 사용자 재시도에는 같은 origin의 새 retry URL을 사용한다. Vue 예제별 error boundary에서 초기/후속 렌더 예외를 fallback에 연결하며 실제 nextTick 렌더 완료 후 aria-busy를 해제한다. `scripts/inline-preview-recovery-browser-check.mjs`가 CSS·module·실제 Vue render 첫 실패 후 같은 페이지 재진입 복구를 실행한다. 테스트용 render 예외는 격리 브라우저 응답에만 주입하며 배포 코드에 테스트 hook을 넣지 않는다. 복구 시험은 `inline-recovery-observations.json`/`inline-recovery-canonical.log`로 구분한다. 30개 번호는 재배열하지 않는다.
- #4 라디오/네 presentation과 #5 오류·성공 피드백 지우기의 실제 PC/390px 증거는 `date-form-observations.json`, `date-radio-*.png`, `form-clear-*.png`다. 모달 scroll lock의 정상 scrollHeight 감소와 열림으로 인한 불필요한 높이 증가를 구분했다. 기존 SForm/Date 모델·메서드는 수정하지 않았다.

- `f221ec1`의 CI [41001183377](https://github.com/choi-solyi/solyi-design-system/actions/runs/41001183377)는 validate와 Pages deploy 모두 성공했다. 공개 파일 357개의 HTTP 200/SHA-256을 해당 커밋과 대조했다(`examples-live-verification.log`). 공개 starter 390px에서 여섯 예제의 실제 키보드·제거 후 포커스·상태를 확인했다(`example-public-observations.json`). 로컬 PC/390px 검사와 공개 390px 검사는 구분한다.
- 새 호스트는 별도 로컬 변경이다. `site/inline-previews.js`, `site/vue-examples.js`, `examples/vue-vuetify/src/inline-previews.ts`가 설치된 **npm 1.1.0 그대로**를 한 VApp과 문서 viewport에서 실행한다. 라이브러리 소스·동결 tarball·버전은 수정하지 않는다. 따라서 이번 문서 배포에는 미게시 API가 없으며 1.1.0 안내를 유지할 수 있다. 이후 패키지 수정은 개발 미리보기/출시 전 상태를 분리한 뒤 공개한다.
- Date/Popover의 1440/390px 실제 열기 4건에서 카드와 문서 높이 변화는 0px, 사용 가능한 팝업 높이와 viewport 경계 및 Escape 포커스를 확인했다(`inline-observations.json`). #4의 radio 설정, #19의 의미/소유 분리는 아직 남았다. 이것을 두 번호 전체 완료로 확대하지 않는다.
- #3 Autocomplete/async Combobox, #13 ContextMenu, #17 Drawer, #20 Snackbar의 PC/390px 실제 조작 10건은 통과했다. #6 MultiSelect 2건은 별도 결함 재현이다(`host-cases-observations.json`, `host-*-open.png`). Drawer는 실제 `.sol-ui-dialog-heading`/`.sol-ui-dialog-actions` rect가 본문 스크롤 전후 같고, busyScope all 중 Escape 차단 후 완료 시 닫기/포커스 복귀를 확인했다.
- 새로 공식 registry에서 설치한 독립 fixture에서도 같은 7종을 PC/390px에서 비교했다. MultiSelect만 일반 흐름 확장을 재현하고, 나머지는 카드 높이 불변이었다(`registry-host-observations.json`). 문서와 독립 fixture는 같은 1.1.0/테마/상위 viewport를 사용하지만 내부 앵커/컨테이너 크기는 다르다. Date의 기존 얇은 iframe 경계에 대한 정확한 동일 앵커 counterfactual 검증은 아직 남았으며 패키지 모든 경계가 정상이라고 단정하지 않는다.
- 기존 violet/light 검사에 더해 sage/dark/compact, sand/light/comfortable, sand/dark/compact의 390px Date/Popover 6건이 통과했다. 여러 직접 캔버스의 document ID 중복도 검사했다(`inline-appearance-observations.json`). 경로 이탈 시 열린 팝업과 runtime 제거, 실제 모듈 503 시 접근 가능한 별도 예제 링크도 실제 Chrome에서 확인했다(`inline-lifecycle-browser.log`).
- 타입·starter/문서 빌드·공개 allowlist·36개 canonical 예제 인벤토리·ARIA/브리지/guard 정리·Components 연결·65개 공개 샘플 포맷/구문 검사가 통과했다. JSDOM의 IntersectionObserver는 교차 지연 로드를 위한 스텁이며 Vue 픽셀 동작 통과의 근거가 아니다. 실제 Vue 검증은 위 Chrome 증거로 구분한다. guard cleanup 중 async 이탈 결과가 true로 돌아가던 신규 경합도 abort 확인으로 수정했고 기존 보수적 취소 검사를 유지했다.

최신 공개 문서: a2550f5 / CI 41004668042 validate·Pages deploy 성공. 변경 공개 파일 5개 SHA-256과 공개 390px 날짜 네 표시 방식·Form 동작을 확인했다. 6번 소스 변경은 feat/improvements-30-package에만 있으며 공개 1.1.0과 분리한다.
