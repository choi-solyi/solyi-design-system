# 표시·아이콘 1차 검증 기록

2026-10-28, 미게시 개발 브랜치 `feat/display-primitives`에서 SChip/SBadge/SIcon/SIconBtn을 검증했습니다. 최종 API·상태 적용 범위·사용 방법은 [컴포넌트 안내](../guide/DISPLAY-PRIMITIVES.md)를 따릅니다.

## 기준과 호환성

- 원본 기준: `03d7191785d53e325dd5a1b1049191143f41a61f`. 구현 체크포인트: `cfec568ad5694f343ce684d8341920791226d2fd`.
- 변경 전 빌드 dist 149개 파일은 공식 npm 1.0.0과 바이트 단위로 같았습니다. 저장소 다운로드와의 포장 차이는 package.json의 private 값뿐입니다.
- 기존 38개와 신규 4개의 이름을 명시적으로 고정하고 42개 export와 각 플러그인 등록의 동일성을 검사했습니다. 같은 개수의 다른 API로 교체해도 검사에 실패합니다.
- 새 props·이벤트·타입은 추가이며 기존 SBtn·폼·날짜·시간 API와 peer 범위를 변경하지 않았습니다. SIconBtn은 SBtn을 재사용합니다.
- 신규 공통 토큰·아이콘 경로·런타임 의존성은 없습니다. 기존 18개 아이콘을 유지하며 warning 이름은 타입 검사에서 거절합니다. locale 필수 키도 추가하지 않았습니다.
- 기존 dist와의 변경은 index.js/index.d.ts/global.d.ts/styles.css, 새 primitives.d.ts입니다. presentation.d.ts에는 기존 SAvatar size union의 출력 순서만 달라졌으며 허용값은 같습니다.
- package.json 버전·private 보호, tokens.json, site/icons.js, release-assets와 docs/releases는 변경하지 않았습니다.

## 실행 결과

Node 22.22.1, Vue 3.5.44, Vuetify 4.3.0을 사용했습니다. 기존 개발 tarball을 덮어쓰지 않도록 구현 체크포인트의 별도 깨끗한 로컬 checkout에서 새 개발 tarball을 생성했습니다. 저장소 내부 소비 테스트 앱 두 개만 갱신했으며 외부 소비 프로젝트는 변경하지 않았습니다.

| 검증 | 결과 |
|---|---|
| Core/UI 빌드·strict 자체 소스 선언·CSS entry·npm pack 보호 | 통과 |
| 실제 tarball의 독립 소비 앱 빌드·Vue 예제 타입 검사 | 통과 |
| 기존 입력·버튼·폼·날짜·시간·선택·탐색·오버레이·파일 등 설치 패키지 런타임 회귀 | 통과 |
| 자체 공개 선언 27개와 positive/negative 타입 fixture | 자체 선언 오류 0. 외부 Vuetify 등의 769개 선언 진단은 별도 한계 |
| 신규 primitive DOM·controlled 선택·삭제 이벤트 분리·locale·초점·잘못된 이름 방어 | 통과 |
| 108개 신규 primitive 의미색/variant 대비 조합 | 모두 4.5:1 이상 |
| 실제 30개 공유 SFC mount·ARIA 연결·ID 검사 | 통과 |
| starter 빌드·문서 빌드·42개 API 생성·복사/실행 코드 일치·샘플 문법/포맷 | 통과 |
| npm run check | 통과. 기존 216개 대비·토큰·링크·라이선스·폰트·생성 파일 검사 포함 |
| npm test | 통과. 42개 문서/탐색 항목·자동 import·타입/lint·기존 DOM 회귀 포함 |
| 격리 headless Chrome | 아래 72개 조합 및 native 키보드/초점 검사 통과 |
| 전체 library:refresh의 배포 무결성 단계 | 아래 사유로 실패, 보호 유지 |

기존 예제는 Vue preset 자동 import를 계약으로 사용합니다. buttons.vue에 처음 추가한 명시적 Vue 함수 import가 해당 검사와 충돌하여 기존 recipe 방식으로 수정했고, 예제 타입·실제 SFC runtime·starter/문서 빌드·npm test를 다시 통과했습니다. 새 컴포넌트 패키지 코드는 이 수정으로 바뀌지 않습니다.

## Chrome·접근성 범위

새 headless Chrome 156.0.8078.48을 별도 임시 프로필로 실행했습니다. 공유 브라우저·기존 디버깅 연결·외부 사이트는 사용하지 않았습니다.

- 폭 320/768/1440 × Violet/Sage/Sand × light/dark × comfortable/compact × ko/en = 72개 조합.
- 가로 오버플로 없음, 아이콘 20px 유지, 정사각형 버튼 목표 및 모바일 44px 목표 확인.
- 실제 브라우저 Space/Enter 선택, Tab 순서와 비활성 항목 건너뛰기, 포커스 표시, 삭제 후 상태 영역으로 복귀 확인.
- loading 중 버튼 초점 유지, 접근 가능한 버튼/이미지 이름과 Badge 설명 연결 확인.
- 320px touch 에뮬레이션에서 선택값 변경 확인. 실제 모바일 하드웨어·Safari·NVDA/VoiceOver 등의 화면 낭독기는 검증하지 않았습니다.
- 좁은 다크 선택 상태와 데스크톱 라이트 화면을 직접 시각 확인했습니다. 화면 낭독기 또는 전체 WCAG 적합성을 인증하는 결과가 아닙니다.

재현 스크립트는 [런타임 검사](../../scripts/primitives-runtime-check.mjs), [Chrome 검사](../../scripts/primitives-browser-check.mjs), [타입 계약](../../scripts/declaration-contract-check.mjs)입니다. Chrome 도구는 기존 방식대로 무시되는 `.tooling/browser-qa`에만 설치하며 패키지 의존성에 추가하지 않습니다.

## 릴리스 게이트와 다음 범위

`library:refresh`는 패키지·타입·런타임·예제·문서 검사를 통과한 뒤 `scripts/distribution-check.mjs`에서 멈췄습니다. 해당 검사는 새 개발 tarball의 해시가 동결된 1.0.0 릴리스와 같아야 한다고 요구합니다. 기능을 추가한 tarball은 기존 1.0.0과 다르므로 이 실패는 유지합니다. 검사 삭제·완화나 기존 릴리스 교체는 하지 않았습니다. 뒤의 `npm run check`와 `npm test`는 독립 실행하여 통과했습니다.

새 버전 결정·릴리스 준비가 승인되기 전 전체 배포 파이프라인 성공으로 보고하지 않습니다. 다음 minor 버전 후보는 1.1.0이며 이번 단계는 버전 변경·npm 게시·push·운영 문서 배포를 포함하지 않습니다. starter 빌드에는 500kB chunk 크기 경고가 있으며 빌드는 성공했습니다.

다음 구현 단위는 기존 STimePicker의 min 기준 step/readonly 계약을 유지한 입력·스크롤·opt-in scrubbing 확장, SDatePicker의 ISO/표시 분리, SNumberInput의 preset/format/unit 확장입니다. Sortable·MonthCalendar·TimeGrid는 그 이후 별도 단위로 진행합니다.
