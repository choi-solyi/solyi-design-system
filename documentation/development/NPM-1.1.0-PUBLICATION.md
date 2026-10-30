# solyi-ui 1.1.0 npm 게시 완료 (2026-10-29)

공식 npm 브라우저 인증 후 기존 게시 세션 85546이 exit 0, `+ solyi-ui@1.1.0`으로 완료됐습니다. 새 게시를 중복 실행하지 않았습니다. 공식 registry에서 version=1.1.0, latest=1.1.0을 확인했고 기존 1.0.0은 보존했습니다.

- npm: https://www.npmjs.com/package/solyi-ui/v/1.1.0
- tarball: https://registry.npmjs.org/solyi-ui/-/solyi-ui-1.1.0.tgz
- 크기: 5,982,999 bytes
- SHA-256: `f39964b931082a23d2c06e7d87d18c9c536132600bc93397e1687bad1b0c1426`
- integrity: `sha512-PAjQQOyrxOKpcZs5i1cVjAmSmw4AqsQjaFyBGBQaHbGP5mFso2dQfk0oKR7pn2U7dvES7oRUNYSqkw1ubDBTZg==`

공식 배포 파일을 직접 받아 동결 후보와 bytes/SHA/integrity 일치를 확인했습니다. 게시 직후 조회에는 이전 메타데이터가 보였지만 이후 공식 registry와 새 설치에서 1.1.0을 확인했습니다. 원인은 추정하지 않으며 재게시하지 않았습니다.

## 실제 registry 소비 검증

빈 node_modules와 새 npm 캐시를 사용하는 별도 소비 앱에 `solyi-ui@1.1.0`을 공식 registry로 설치했습니다. 로컬 tarball/소스 alias를 사용하지 않았으며 lock의 resolved URL과 integrity도 공식 배포 파일과 일치합니다.

- 설치 성공: Vue 3.5.44 / Vuetify 4.3.0 / TypeScript 6.0.3.
- TypeScript 및 Vite production build 완료: 50개 등록 export와 신규 옵션의 양성/음성 타입 계약 포함. skipLibCheck=true이며 외부 선언 전체 재검사는 반복하지 않았습니다. 이전 동일 조건의 자체 선언 0 / 외부 769 기준은 별도 보존합니다.
- 설치본 Pagination/Table, TimeGrid, Combobox runtime 모두 PASS. controlled 모델/제안, 새 페이지 옵션, 키보드 및 입력 상태 계약을 검사했습니다.
- 소비 앱 Vite의 500kB 청크 경고는 비차단 경고입니다. 라이브러리 자체 크기 예산 통과 결과와 구분합니다.
- 추가 registry 빌드 Chrome smoke는 Chrome crashpad crash server 시작 실패로 브라우저가 종료돼 미실행입니다. 샌드박스나 권한을 변경해 재시도하지 않았습니다. 같은 SHA 후보의 기존 격리 설치본 Chrome 화면 검증은 통과했으며, 이를 새 registry 브라우저 실행 통과로 대신 표기하지 않습니다.

근거: `qa-output/registry-published-1.1.0/verified-registry.json`, `registry-install.log`, `registry-build.log`, `registry-runtime.log`, `registry-browser.log`, `consumer/package-lock.json`. 이전 필수 `npm run check`/`npm test` 및 최종 후보 화면 검증은 `COMMON-UI-CORRECTIONS.md`의 기록을 재사용합니다.

npm 게시 목표는 완료됐습니다. 별도 소비 프로젝트 의존성 업데이트, 운영 문서 사이트 배포, 원격 Git push는 실행하지 않았습니다. 물리 기기·스크린리더 검증은 기존 미검증 범위로 남습니다.

## 공개 릴리즈 노트 정리 전 기술 기록

사용자 요청으로 공개 본문은 대표 추가 기능과 개선 사항만 남깁니다. 아래는 기존 상세 기록이며 추가 출시를 뜻하지 않습니다.

## 1.1.0 · 2026-10-29 · 한국시간

공식 npm 게시: 2026-10-29T07:40:08.664Z. 기존 1.0.0 API와 Vue/Vuetify peer 범위를 유지하는 추가 기능 버전입니다. GitHub Release 발행일은 별도 표시됩니다.

- 게시 전 공통 UI 보완: 버튼 loading은 크기와 역할 색을 유지하고 disabled 버튼·입력은 기존 surface-alt를 사용합니다. 짧은 trailing의 불필요한 줄바꿈과 Segmented 선택선·hover 밑줄 중복을 정리합니다.
- SDataTable과 SPagination에 같은 siblingCount·compactPagination 설정을 제공합니다. 좁은 화면에서도 주변 번호를 유지하며 명시적으로 간단 표시를 선택할 수 있습니다. 두 컴포넌트의 설정 비교 예제를 추가합니다.
- STimeGrid를 추가합니다. 기본 readonly이며 임의 객체 accessor·ISO 열·분 좌표·band·generic 슬롯·겹침 배치·전체 목록을 제공합니다. opt-in 이동·resize·복제는 frozen 좌표 proposal로 전달하며 원본 배열은 변경하지 않습니다. 키보드·터치 손잡이·자동스크롤·취소·pending을 지원하고 timezone/충돌/저장 모델은 앱에서 처리합니다.
- SPagination은 처음·이전·다음·마지막 이동과 controlled 페이지 제안을 제공합니다. 페이지 수가 바뀌어도 부모 모델을 자동 수정하지 않으며 Table의 기존 페이지 모델·이벤트는 유지합니다.
- semantic tone과 별도인 범주 8색과 resolveCategoricalColor를 추가합니다. Calendar marker의 opt-in category는 현재 테마의 CSS 역할로 표시하며 이름·기존 tone·ISO 모델을 유지합니다.
- SLoadingOverlay는 기존 Progress와 modal host를 재사용합니다. container/viewport·blocking/nonblocking·지연·최소 표시·내용 숨김을 제공하며 타이머가 부모 작업 모델을 변경하지 않습니다.
- SEmptyState의 제목·설명·아이콘·액션·card/page 표현을 추가합니다. SCard는 leading/title/description/meta 슬롯을 확장하며 제목 링크와 보조 버튼을 독립적으로 배치합니다.
- SBtn을 재사용하는 SConfirmAction을 추가합니다. 두 번 누르기, Escape·blur·timeout 취소, 외부 loading/error/reset과 중복 입력 차단을 제공하며 실제 작업은 소비 앱의 confirm listener가 소유합니다.
- Date/Time에 opt-in pickerPresentation과 logical placement를 연결합니다. 기존 표시 방식과 모델·폼 계약을 유지합니다.
- Dialog의 제목·닫기·actions는 고정하고 본문만 스크롤합니다. 설명 간격과 짧은 viewport를 다듬고 Switch에 시각 라벨만 숨기는 hideLabel을 추가합니다.
- Dialog에 feedback/actions-start 슬롯과 busy/busyScope를 추가합니다. 기본 body 잠금은 닫기를 허용하고 all은 완료까지 내부 조작과 닫기를 막습니다. 외부 모델 제어와 기존 슬롯은 유지합니다.

- Vue defineComponent의 순수 초기화 42곳에 PURE 표시를 추가합니다. 개별 import의 불필요한 컴포넌트 보존을 줄이며 setup·watch·이벤트·스타일 동작은 유지합니다.
- 최종 공개 50종에 맞춰 버전별 source/gzip/전체 JS 및 실제 설치본 개별 import 크기 검사를 추가합니다. 기존 1.0.0 파일과 176,000자 기준은 보존합니다. 1.1.0 후보의 동결·npm 게시·공식 registry 설치 검증을 완료했습니다.
- 공통 입력 8종의 opt-in 내부 clear action과 별도 자유 입력 SCombobox를 추가합니다. 기존 빈 값·change·폼 제출 계약을 보존하며 문서·starter 예제를 제공합니다.

- SMonthCalendar를 추가합니다. ISO 선택과 표시 월을 controlled로 관리하며 범용 marker·키보드 탐색·로딩·모바일 marker 개수와 전체 자료 표시를 제공합니다. 기존 DatePicker 입력 API와 저장 형식은 유지합니다.
- SSortableList의 isItemDisabled와 슬롯 disabled를 보완합니다. 조작 중 항목 비활성화 시 취소하고 가능한 다른 손잡이로 초점을 복원합니다.

- SSortableList를 추가합니다. 임의 객체와 stable key를 받는 controlled 목록으로 키보드·이동 버튼·손잡이 드래그, preview/최종 제안/취소, 자동 스크롤과 포커스 복원을 제공합니다. 기존 API를 보존하며 타입·전역 등록·Components 문서와 starter를 연결합니다.
- 문서 헤더의 UI 데모 바로가기, 컴포넌트 미리보기 제목과 섹션 이동 버튼을 추가하고 Examples/코드 카드의 모서리 배경을 바로잡습니다. 1.1.0 문서 사이트와 실행 예제에 반영했습니다.

- STimePicker 입력·목록 손잡이를 opt-in으로 추가합니다. preview는 모델·폼 값을 유지하며 release에서 확정하고 Escape·pointercancel·capture 상실·외부 값/설정 변경 시 취소합니다. 키보드·목록 자동 스크롤과 optional ko/en locale 키를 함께 제공합니다.

- STimePicker의 native 기본·기존 change/readonly를 유지하고 opt-in 직접 입력 제어·custom list·초기 스크롤·목록 키보드 탐색을 추가합니다. readonly 입력에서도 선택 가능한 required 필드의 native 폼 검증을 유지합니다.

- SDatePicker의 opt-in displayFormatter와 SNumberInput의 preset·formatValue·unit을 추가합니다. 모델·수동 편집 draft·표시·native 제출을 분리하며 기존 readonly·min 기준 step을 유지합니다.

- SChip·SBadge·SIcon·SIconBtn을 추가하고 개별 import·전역 등록·타입·문서 예제를 연결합니다.
- 기존 버튼·locale·아이콘·테마·밀도·포커스·터치 목표 토큰을 재사용합니다. SIconBtn은 SBtn의 loading·disabled 동작을 유지합니다.
- controlled 선택·삭제, SVG 접근성, 배지 설명 연결, 타입 계약과 의미색 대비 검사를 추가합니다.
- 기존 API와 peer 범위를 유지합니다. npm 1.1.0과 문서 사이트에 반영했으며 소비 앱 업데이트는 각 앱에서 별도로 진행합니다.

