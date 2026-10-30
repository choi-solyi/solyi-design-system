# 사용자 요청 1~30 최종 후보 인수 대조

원문: [보존한 전체 요청](IMPROVEMENTS-30-REQUEST.txt). 번호를 합치거나 재배열하지 않았다. 구현 완료와 npm/운영 반영은 별개다. 현재 목표는 **미게시 1.1.1 준비**이며 공개 npm은1.1.0이다. 최종 로컬 후보의 패키지·문서·설치·실제 브라우저 회귀를 완료했다. main push/공개 배포/npm 게시는 하지 않았다.

| 번호 | 원인 소유 | 원문 하위 요구와 변경 | 실제 검증과 근거 | 남은 경계 |
|---|---|---|---|---|
|1|문서|공유 알림 [3] 제거, Badge 기능은 전용 예제로 보존|6개 소유 SFC/생성 Sample Code 일치·이종 예제 negative 검사, 기존 공개 357파일 및 PC/390 실제 조작|153개(51 API×3테마) 실제 문서 대조 통과|
|2|문서|Button/ConfirmAction/IconBtn/Badge/Chip/Icon 각각 전용 예제·의미 안내|두 번 확인, Escape/blur/timeout 취소, Chip 제거 후 실제 focus, IconBtn disabled, Badge/Icon 비대화형; f221ec1 및 역할별 회귀|153개(51 API×3테마) 실제 문서 대조 통과|
|3|문서 호스트|Autocomplete/비동기 Combobox를 같은 viewport에 마운트해 iframe 여백 제거|PC/390 문서·독립 npm fixture의 카드 높이/document scrollHeight/앵커 비교, 검색/empty/Escape focus|물리 기기 미인증|
|4|문서 호스트·예제|Date 설정 SRadioGroup, auto/popover 잘림과 여백 제거|PC/390 네 presentation·ISO 선택·부모 높이 불변; a2550f5 공개 검증과 기존 picker 회귀|153개(51 API×3테마) 실제 문서 대조 통과|
|5|문서|resetValidation 외 성공/서버 피드백도 예제 소유로 정리, 입력 유지|실제 오류·성공 지우기/값 보존·busy 차단, Form 기존 모델/메서드 검사|없음|
|6|패키지|floating MultiSelect·선택 SChip 입력 내부 배치|3테마 PC390/RTL, keyboard/touch/wheel/nested Dialog/Escape, 고정 배열/legacyclear/IME/async/타입/SSR/폭·스크롤|물리 기기 미인증|
|7|패키지|NumberInput −/+를 한쪽 그룹으로, Range의 직접 입력도 재사용|3테마 PC390/RTL, min5/step3/max20·직접입력·폼과 기존39전이|없음|
|8|문서|checkbox/radio/switch/select 역할별 예제; Switch는 checkbox와 의미 비교|전용 SFC·메뉴·코드, 실제 native radio 방향키/checkbox/switch 상태와 공개 API 유지|의미가 다른 API를 합치지 않음|
|9|문서 설명|실제 spinner 모션 안내, 무의미한 clear 횟수 제거|3테마 실제 animation 시간/transform 변화, reduce 정지, final-recipes-09-12|없음|
|10|패키지·문서|혼잡한 입력 rail 대신 이름 있는 grip, 시/분 오른쪽 단위, 우측 primary 완료|최종 설치 TimePicker48경로(legacy/auto/popover/dialog×native/list×3부모×2폭), focus/확정/취소; scrub3폭·keyboard ArrowUp→Escape·포인터/touch·폼/경계/외부변경|물리 키보드/모바일 OS/AT 미인증|
|11|문서|Accordion 1개와 독립4개 예제|3테마 실제 Enter·동시 열림·독립 닫힘, final-recipes-09-12|없음|
|12|문서·패키지|Breadcrumb/Pagination 분리, 숫자 조작은7번 재사용, 첫끝 단일 chevrons SVG·같은 폭·모바일 유지|실제 breadcrumb 이동/focus,1003페이지 주변3,수락/거절/RTL/넘침; chevrons 타입 산출물|최종 설치 solyi-ui/icons chevrons 이름·path·SVG runtime 통과|
|13|패키지 표시·문서 호스트|chevron 펼침 단서, viewport 호스트|연속 프레임 x/y 변화0·부모 높이0, 우클릭/ShiftF10/선택/Escape 복귀; 13~16 보고|153개(51 API×3테마) 실제 문서 대조 통과|
|14|양쪽|Stepper 연결선·inline/below, 중복 Progress 제거, reset 왼쪽/이전다음 오른쪽 primary|3테마 PC390/RTL 실제 입력→검토→완료→초기화·focus·배치|없음|
|15|패키지 CSS|붙은 수평 tabs·기준선/내용 패널 연결, 수직 계약 유지|3테마 PC390/RTL 경계 y오차0·disabled 건너뜀·panel 입력 유지|없음|
|16|패키지|부모 Tree row 전체 클릭 펼침+기존 선택, disclosure/방향키 보존|실제 label/행 클릭·접기·ArrowRight 자식 focus·ArrowLeft·선택 유지|없음|
|17|문서|처리 중에만 busyScope가 적용됨을 설명, 긴 Drawer viewport 호스트|PC/390/가로760×390 body scroll·header/actions 고정·all Escape 차단·완료/복귀|실제 OS 키보드 축소는 미인증|
|18|문서|Linear/Circular/Overlay 한 비교 카드, 각 API/코드/직접 링크 보존|3테마 PC390에서 실제 animation 시간·transform 변화 및 reduce, shared-owner 계약|미동작 원인은 모션 감소 설정과 예제 중복; 세 API 삭제 안 함|
|19|양쪽|Tooltip info 비대화형/Popover chevron 대화형 분리, viewport 여백·hover-only Escape 수정|Tooltip/Popover 각각 실제 hover/focus/확인/복귀·높이, IME Escape 보존·outside focus·listener cleanup|CSS/module/render 실패·retry/동일 페이지 재진입 실제 통과|
|20|문서 호스트|기존 body Teleport Snackbar를 전체 viewport에서 실행|3테마 PC390 하단 위치·닫기·계약, 독립 npm fixture와 대조|153개(51 API×3테마) 실제 문서 대조 통과|
|21|문서|Avatar 전용 대체글자/이름 설명, 가짜 사용자 메뉴 제거, Stepper 코드 분리|3테마 실제 이름·불필요 버튼 부재·Sample Code negative 검사|없음|
|22|양쪽|문서 명칭 Chart, SBarChart/bar 기본 export 보존, type bar/line/pie·동일 표·pie 번호범례|3테마 PC390/RTL 실제 geometry·동일값·zero/empty/loading, 자체 SVG·신규 엔진/라이선스 없음|SChart 별칭을 임의 추가하지 않음|
|23|문서|Card 항목 링크 새 탭·명시·noopener|실제 popup URL·opener null·부모 URL 유지|없음|
|24|문서|Container/Row/Col을 Style로 이동, export·검색·과거 component/code/api 링크 유지|PC390 실제 과거 URL→Style/API/Sample Code/hash, DOM·메뉴 검사|153개(51 API×3테마) 실제 문서 대조 통과|
|25|패키지 CSS|Table disabled sort만 투명 배경/테두리, 상태는 muted/native disabled 유지|3테마 PC390/RTL normal/loading/error computed 배경·border·높이 및 disabled|없음|
|26|패키지·예제|큰 제목/일요일 danger/날짜 top/전체 marker 상세/+N focus/ⓘ 제거/테마 accent/인접 화살표/year|3테마 PC390/RTL year 수락·거절/ISO/전체3marker/focus/Escape, source 계약; Enter/form smoke|최종 설치본의 실제 Enter로 주변 form 미제출 확인|
|27|패키지|bare grip/실제 FLIP 모션/drag ghost/disabled·readonly 조작 숨김·focus 복원|실제 CSSTransition·배열 불변·포커스·ghost/commit, reduce 전환0, 최종 설치320/768/1440 keyboard/pointer/cancel/capture/external/locked/nested/window autoscroll/CDP touch|물리 touch 기기 미인증|
|28|패키지·예제|상태/키 안내 아래로·grid top 안정, header/빈칸 생성,삭제,body drag/짧은 edge resize/duplicate/liveclock/부모 수락거절·잠금 안내|3테마 PC390/RTL CRUD/resize/drag/clock10:13→10:14 실제DOM·보이는 redline 캡처, CDP touch move/cancel, keyboard·수락거절·삭제 초점/최후항목·readonly/disabled/pending/item lock|업무 충돌/저장/ID/시간대 정책은 앱 책임|
|29|패키지·예제|image MIME 로컬 Blob 미리보기·metadata/fallback 유지·cleanup|PNG naturalWidth decode·preview off/on·깨진 이미지·제거/unmount URL 전량 revoke, 3테마 PC390/RTL·SSR|실제 파일 내용 업로드 안 함|
|30|패키지·예제|필수label/orientation/defaultslot SBtnGroup 명령 레이아웃, 선택토글은 기존 SegmentedControl|3테마 PC390/RTL 명령 실제 텍스트/focus·native radio 방향키·가로/세로 즉시 radius·nullable SSR·global/type/API51|무의미한 group model/readonly/loading API 추가 안 함|

## 추가 전수 점검에서 고친 항목

- A1 Combobox 메뉴 누락: recipe registry·메뉴 도달성 별개 검사 및 실제 메뉴 추가.
- A2 공통 preview CSS/module/render 실패 후 복구: 실패 Promise 캐시와 mounted 상태 정리, retry/동일 페이지 재진입·busy 제거·실패 fallback. 최종 문서에서 CSS/module/render 오류·수동 retry/같은 페이지 재진입 복구를 실제 실행해 통과했다.
- R1 Chip 제거 예제의 사라진 초점: nextTick 후 결과로 복구, 실제 activeElement 검사.
- R2 legacy TimePicker의 부모 Dialog overlay 차단/transform 좌표 오류: 부모 modal 내부 Teleport와 native popover top layer, 최종 설치48경로로 확인.
- R3 TimeGrid agenda 삭제 focus: 수락 시 다음/이전 행, 마지막 삭제 시 grid; 거절 시 원래 버튼 보존. 기존 snapshot watcher에 통합.
- 역할별 예제 negative 검사, Sample Code 동일 소스, Components·검색·메뉴·라우트·과거 직접 링크 인벤토리를 함께 유지한다.

## 공통 제약과 게시 상태

- source/installed/문서 실제 브라우저 근거를 구분하며 JSDOM 통과를 레이아웃·touch·AT 인증으로 확장하지 않는다.
- 물리 휴대폰, 실제 스크린리더, OS 소프트 키보드는 미검증이다. 연결 휴대폰/공유 브라우저/다른 앱은 조작하지 않았다.
- 같은 TypeScript5.9.3/skipLibCheck:false에서 자체 선언 오류0, 외부 Vuetify/선택 어댑터769는 기존 baseline과 동일하다. 소비 build는 skipLibCheck 설정을 따르며 외부 라이브러리를 수정하지 않았다.
- 기존50export+SBtnGroup=51. 추가 기능이며 기존 모델/이벤트/저장 책임을 유지한다. 사용자가 지정한 목표1.1.1을 준비하며 기존1.0/1.1 원본과 날짜를 보존한다.
- npm publish, main push, 공개Pages배포, 소비4앱 업데이트, 인증정보 변경은 하지 않는다. 이 표의 후보 검증은 공개 반영 완료를 뜻하지 않는다.

## 최종 산출물과 통합 결과

- 패키지 코드/README 기준 commit: 0674273420690b93149b26b1a6a0c06c6d0566bd. 이후 문서/검사/기록 수정은 패키지 코드 바이트를 바꾸지 않았다. 두 내부 예제, 최종 문서 starter와 동결 다운로드가 같은 1.1.1 파일을 사용한다.
- 후보: artifacts/candidates/1.1.1-final/solyi-ui-1.1.1.tgz, 동결 사본 release-assets/1.1.1/solyi-ui-1.1.1.tgz 및 docs/releases/1.1.1/solyi-ui-1.1.1.tgz.
- SHA256 10381632323b8e23d4c8c0ca079b62b1997343c0f6cee0e975f74ed8c2440ff7, 5987420 bytes. manifest와 SHA256SUMS가 일치한다. 1.0/1.1 원본은 변경하지 않았다.
- 전체 packages-only pipeline 통과. README 최종 정리 후 코드/dist 변경 없음도 확인하고 최종 포장·두 소비자 새 설치·계약·9개 import 예산·53개 자체 선언·SSR·앱/47개 canonical 예제 빌드·타입 검사를 다시 통과했다.
- 문서 pipeline의 release-preparation/getting-started/preview/followup/public-sample/로컬 HTTP 배포 소비와 npm run check 통과. 기존 npm test는 DOM/navigation 성공 후 오래된 모바일50개 단언에서 멈췄다. 기존 API와 Style 이전을 정확히 검사하도록 고친 뒤 mobile부터 나머지 모든 구성 검사까지 순차 재개해 통과했다. 이미 통과한 무거운 DOM 검사를 의미 없이 반복하지 않았다. 단언·게이트를 제거하지 않았다.
- 최종 설치 TimePicker48경로·scrub 3폭과 26~30 smoke, Sortable 실제 touch/capture/autoscroll/취소, TimeGrid 시각선/CRUD/keyboard/touch가 통과했다. 독립 소비 fixture의 dist와 최종 tarball dist도 같다. 물리 기기 인증으로 확대하지 않는다.
- 최종 문서 실제 검사: 51개 API×3테마=153경로의 Examples 실제 마운트/공유 예제 링크, Sample Code 원본 일치, API, 과거 component→Style 링크, document 가로 넘침 없음. published release 기사는 1.1.0·1.0.0만 표시한다. starter/문서의 미게시1.1.1 안내와 npm안정1.1.0 구분을 확인했다.
- 추가 A3: Style 레이아웃 이동 뒤 메뉴만 앞에 남아 본문과 순서가 어긋난 결함을 수정했다. navigation97개 앵커와 모바일 Components48+Style3개의 정확한 API 도달성을 검증했다.
- 추가 A4: Button Group의 한국어 검색 별칭을 보완했다. 버튼 그룹·연결 버튼 등의 metadata와 정확 이름 검색 순위, 3테마 실제 검색창에서 키보드로 결과 이동을 확인했다.
- 크기 상세: [실제 설치 측정 JSON](IMPROVEMENTS-30-SIZE-RESULT.json). UI 297445 characters/300270 bytes/gzip9 75493, 모든 JS325541/gzip합82775. all_plugin67573/67584로 여유11 bytes다. 기존1.0.0/1.1.0 budget 객체는 git 원본과 동일하며, 후보도 동일 source/gzip 한도를 유지한다. 새 엔진/유료 의존/라이선스 추가 없음. 이 기준은 npm 용량 제한이 아니라 내부 예산이다.

### 재현 명령과 로컬 증거

- node scripts/component-candidate-browser-check.mjs: 153경로, 카드 캡처와 inventory.json. --search-only는 한국어 검색만 검사한다.
- node scripts/time-presentation-browser-check.mjs --installed: 최종 설치48경로.
- node scripts/time-scrub-browser-check.mjs --installed / node scripts/sortable-browser-check.mjs --installed: 실제 Chrome 포인터·키보드·touch 회귀.
- node scripts/calendar-sortable-files-group-browser-check.mjs --consumer=examples/package-consumer: 최종 설치의 26/27/29/30, 신뢰된 Enter·숨김 focus·모션 감소·즉시 모서리.
- node scripts/time-grid-interaction-browser-check.mjs: 명시적 QA 소비 경로에 최종 dist가 설치되어 있어야 하며 실행 전 source dist와 바이트 일치를 검사한다. --consumer=examples/package-consumer로 최종 내부 설치본도 지정할 수 있다.
- qa-output/improvements-30/final-candidate-packages.log, final-artifact-install.log, final-document-pipeline.log, final-npm-test.log, final-remaining-tests.log에 성공 및 중간 실패/수정 경위를 보존했다. 단일 실패 로그를 전체 성공으로 덮어 해석하지 않는다.
- final-frozen-time-presentation.log, final-frozen-26-30-smoke.log, final-time-grid.log, final-inline-recovery.log, final-group-search.log, final-group-search-browser.log, final-document-browser/inventory.json과 카드 캡처를 확인한다. 위 브라우저 검사 스크립트는 저장소에 보존해 독립 재현할 수 있다.

현재 사용자 입력/인증 대기나 기능 미완료 차단은 없다. 물리 기기/AT/실제 OS 키보드는 미검증 범위이며 공개 반영·npm 게시·소비 앱 업데이트는 이번 후보 준비와 별도다.

원격 CI는 main push/PR/workflow_dispatch에서만 실행되는 기존 설정이며 이번 개발 브랜치 push에는 실행하지 않는다. 로컬 필수 pipeline을 검증했으며 원격 CI·운영 배포·실제 registry1.1.1 설치는 아직 실행하지 않았다. 최종 tarball과 두 내부 lock의 SHA-512, 소스 동결/문서 동결 사본 SHA-256을 마지막으로 대조해 모두 일치했다. 최종 소스에 대한 npm run check와 release-preparation 검사도 다시 통과했다.

## 공개판 추가 피드백 · 2026-10-30

이 절은 원래 1~30번의 검증 기록을 대체하지 않고 공개판 사용 후 발견된 별도 결함을 추적합니다. 공개 npm은 1.1.0이며 아래 수정은 미게시 1.1.1 후보 작업입니다.

| 요청 | 원인·수정 | 확인 상태 |
|---|---|---|
| Circular 자체 예제 | 공유 비교 안내로 원형 항목의 실제 예제가 가려짐. 독립 canonical recipe와 Components canvas 연결 | 격리 설치본 3테마 실제 렌더 확인 |
| 전체화면 LoadingOverlay | fullscreen scrim이 요청한 중립 배경을 드러내지 못함. 기존 surface-alt 토큰으로 범위 한정 | 3테마 실제 표시·자동 종료 및 캡처 확인 |
| Badge | 기본 border가 버튼 인상을 강화. 비대화형·그림자 없음·경계 없음으로 정리 | 3테마 렌더 확인, 키보드 버튼으로 만들지 않음 |
| Card 링크 | 예제의 native 링크가 브랜드 스타일을 적용하지 않음. 해당 링크만 스타일 적용 | 새 탭 의미·초점 테두리·실제 화면 확인 |
| Chart 범례 | 번호/이름/값을 같은 텍스트 흐름에 배치. 별도 열과 보이는 값 단위로 구분 | 자체 실행 화면은 확인, 원본 첨부 픽셀은 아래 차단 |
| Chip 높이 | passive span에는 button의 최소 높이 규칙이 적용되지 않음. 공통 main rail 높이 적용 | 표시/선택/제거/disabled 네 높이 차이 1px 미만, 3테마 |
| Calendar | 로딩 설명을 표 앞에 조건부 추가. 상세 영역이 항상 열려 반응이 불분명하고 iframe 안에서 초점 이동. 표 뒤 예약 상태 영역·상세 닫기/재열기·same-document host | 3테마 로딩 반복 위치 불변, 전체 marker·닫기·다른 날짜·재열기 |
| Sortable | 숨긴 grip track까지 제거해 라벨이 당겨짐. pointerdown의 기본 초점을 막은 뒤 programmatic focus로 keyboard ring 잔류. track 유지와 포인터/키보드 표시 분리 | 잠금 전후 x좌표 동일·grip 숨김·클릭 무테두리·키보드 테두리, 3테마 |
| TimeGrid | 드래그 click 억제가 항목 key에만 적용되어 빈 열로 retarget된 click은 create에 도달 가능. host click 억제·새 deliberate pointerdown 해제. 여러 보조 버튼 대신 공통 메뉴 호스트 재사용, allowEdit/edit 요청과 부모의 실제 내용·시간 편집 연결 | 일반 pointer move/양끝 resize는 ID·개수·create 불변 확인. 메뉴 취소/저장/삭제 및 controlled 거절 확인. 최종 설치본 전체 결과는 아래 명령 로그와 일치시킨 뒤 판정 |

### 재발 방지

- 과거 검사는 드래그 뒤 바뀐 시각만 확인하고 생성 이벤트·ID 집합·개수 불변을 확인하지 않았습니다. 한 흐름의 생성→본문 이동→양끝 resize→내용 수정→메뉴 삭제를 검증합니다. 원본 사용자 화면의 복제 현상은 일반 경로에서 재현되지 않았으며, 소스에서 확인한 빈 열 click 억제 누락과 구분합니다.
- touch cancel 검사는 새 메뉴 버튼을 누른 채 drag가 시작됐다고 가정했습니다. pointer event target을 기록해 본문 지점을 사용하고 실제 preview 상태 진입 후 cancel을 검증합니다. 진단 중 실패를 통과로 바꾸지 않습니다.
- 상태/요소 존재와 단위 테스트만으로 사용자 조작 완료를 선언하지 않습니다. 같은 설치 bytes, 실제 조작, 전후 모델과 초점, 캡처를 함께 확인합니다. 물리 휴대폰과 스크린리더 실행은 수행하지 않았습니다.
- 재현 스크립트: scripts/public-ui-followup-browser-check.mjs, scripts/time-grid-interaction-browser-check.mjs. 설치 경로는 --consumer로 명시하며 소스 alias를 쓰지 않습니다.

### 첨부 원본 접근 차단

Library libfile_2828e3a7c4988191bda84f104081b1cf의 공식 materialize는 Windows에서 os.setxattr 미지원으로 실패했습니다. 최종 chart-legend.png는 생성되지 않았고 실제 원본 픽셀을 확인했다고 주장하지 않습니다. WSL 확인도 E_ACCESSDENIED로 거부되어 재시도·helper 수정·직접 다운로드 우회를 하지 않았습니다. OCR은 픽셀 확인의 대체 증거가 아닙니다.

### 현재 실행 결과와 출시 차단

- 임시 QA tarball SHA-256: 58c249f2245d7d2d6cd068ed241a0fcaa4a8d15c41eedf50c54b60b511ae6a0e, 5988517 bytes. 기존 artifacts/release-assets/docs/releases의 동결 1.0.0·1.1.0·이전 1.1.1 후보는 아직 교체하지 않았습니다.
- 최종 QA 설치본: TimeGrid pointer move/양끝 resize, 내용 편집 취소/저장, 메뉴 삭제, controlled 거절, ID/개수/create 불변, 명시적 legacy duplicate 메뉴가 Violet 1100 / Sage dark 390 / Sand RTL 390에서 통과했습니다. Sage CDP touch는 본문 이동·양끝 조절·pointercancel과 실제 preview 진입을 확인했습니다. 물리 기기 실행은 아닙니다.
- UI 외관/상태는 Violet 1100 / Sage dark compact 390 / Sand 390에서 통과했습니다. 이 외관 검사 설치본과 최종 QA 설치본의 dist/styles.css bytes가 일치합니다. 실제 Chip/Badge/Chart/Loading 캡처를 열어 확인했습니다. 전체 공개 사이트/최종 URL 검증은 아직 실행하지 않았습니다.
- 설치본 TypeScript 5.9.3 양성/음성 edit 요청 계약(skipLibCheck=true), 자체 소스 빌드·선언, SSR, TimeGrid 기존 상태 전이 runtime, proposal/value 불변성, Components 색인/검색/예제 연결 및 릴리즈 이력 검사 통과. 동결 후보 갱신 후 전체 pipeline은 미실행입니다.
- 크기: source 298031자 / gzip 75645, 전체 JS 326032 bytes / gzip 합 82927. 기존 source·전체 JS·전체 plugin 한도는 통과했지만 named STimeGrid gzip 17,861 > 17,408(453 bytes 초과)로 필수 검사는 실패합니다. 한도나 검사를 변경하지 않았으며 이 상태로 main/배포/최종 artifact 동결을 진행하지 않습니다.
- 원본 PNG 실제 픽셀 확인 차단과 named import 예산 문제를 남깁니다. 기존 공개 1.1.0은 유지하고 npm 1.1.1은 게시하지 않았습니다.
