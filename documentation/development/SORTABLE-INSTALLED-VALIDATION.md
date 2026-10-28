# Sortable 설치 소비 검증 · 1815de3

2026-10-28 UTC, 원본 feat/sortable-list의 1815de3에서 별도 로컬 checkout solyi-ui-sortable-verify를 만들었습니다. 최초 clone 실패 뒤 원본 경로·커밋·미생성 대상 상태를 확인하고 Git 로컬 복제를 완료했습니다. 기존 원본 WIP·외부 소비 프로젝트는 변경하지 않았습니다. 새 credential·의존성·권한 설정은 추가하지 않았습니다.

## 기준과 실제 산출물

| 대상 | SHA-256 |
|---|---|
| npm 공식 1.0.0 tarball baseline | ef6514359a4eca688568294614dd1a5a6cac1d5fe7ea8173a1946687a9f15a05 |
| 동결 release 1.0.0 tarball | 72d1d8d622287e8a86444c404ad20f7c5ed5d065dc2b4e48765374697854e23a |
| 격리 개발 tarball, 160파일 | 7ff78eff52b09c9938714845420609ba0b6941da1bd35952f816264822770b4d |
| 개발 tarball runtime index.js | af3393fa3e027a62a03ab7f7d7e93c445a6ef94a70710b3ccb0a5e549e3a1175 |

개발 tarball의 metadata는 아직 private 1.0.0입니다. 이 파일은 격리 checkout artifacts/에 처음 생성한 테스트 산출물이며, npm 1.0.0이나 동결 release를 대체하는 새 공개 버전이 아닙니다. 원본 artifacts/와 release-assets/·docs/releases/를 덮어쓰지 않았습니다.

## 통과와 실패 구분

Node 22.22.1, 잠금 Vue 3.5.44/Vuetify 4.3.0을 사용했습니다. 원래 library-pipeline --refresh 실행(session 38456)은 Core/UI 빌드, stylesheet, pack/prepack, 두 소비 앱 npm ci, 독립 앱 타입·빌드와 실제 30개 recipe + AdvancedExamples.vue의 strict template 검사를 통과했습니다. 7/10 library-contract-check의 크기 검사에서 종료됐습니다.

**크기 한도 실패:** runtime은 186,673자 / 188,716 bytes / gzip 48,705 bytes입니다. 기존 한도 176,000자를 10,673자 초과합니다. 앞 단계 d1b20d2는 169,955자 / 171,775 bytes / gzip 44,173 bytes로, 증가분은 16,718자 / gzip 4,532 bytes입니다. 조건·한도·검사 위치를 변경하지 않았습니다. 이 assertion 뒤의 나머지 library-contract-check 검사는 미실행입니다. 기능 통과로 이 실패를 상쇄하지 않으며 배포 전 크기 검토가 필요합니다.

이 실패 뒤 패키지를 재빌드·재pack하지 않고 **같은 설치본**에서 원래 pipeline의 후속 명령을 별도로 실행했습니다. qa-output/finish-validation.mjs와 validation-resume-results.json은 격리 checkout의 무시되는 검증 산출물입니다. 37개 명령 중 36개가 통과했습니다.

- 기존 runtime 전체와 locale·폼·43개 공개 API/등록, 기존 38종 및 표시 4종 유지.
- Sortable helper 140개 조합, 설치본 controlled 거부·불변성·포커스·키보드/이동 버튼·pointer 취소, generic 정상/오류 SFC와 공개 선언.
- Date/Number/Time 확장, native/list/scrub, 기존 min 기준 step·readonly·폼 제출 회귀.
- 문서 preview·fallback·정본 코드·public sample, 설치본 starter와 docs 빌드, npm check 및 npm test.

**동결 gate 실패:** 나머지 1개는 distribution-check의 `Fresh build matches frozen package solyi-ui`입니다. 위 개발 hash와 동결 hash가 달라 거부했습니다. 동결 자산 검증은 보존했고 release 준비·버전 변경·gate 수정은 하지 않았습니다. 이 지점 이후의 HTTP release 설치 검사는 미실행입니다. 전체 pipeline을 통과했다고 표현하지 않습니다.

검사 순서를 바꿔 library-contract-check의 후반부까지 읽으려던 수정은 자동 승인 검토가 보호 gate 실행 변경으로 거부했습니다. 패치는 적용되지 않았고 해당 작업을 재시도하거나 우회하지 않았습니다. 검증 대상 소스와 gate의 Git diff는 없습니다.

## 외부 선언 baseline

[비교 스크립트](../../scripts/compare-declaration-diagnostics.mjs)로 모든 .d.ts를 동일한 가상 패키지 경로에 overlay했습니다. 의존성·공통 소비 fixture·strict/ES2022/DOM/ESNext/Bundler/noEmit 옵션은 같습니다. 파일을 교체하거나 옵션을 바꾸어 오류를 숨기지 않았습니다.

| TS / skipLibCheck | npm 1.0.0 자체/외부 | 1815de3 자체/외부 | 진단 추가/제거 |
|---|---|---|---|
| 5.9.3 / false | 0 / 769 | 0 / 769 | 0 / 0 |
| 6.0.3 / false | 0 / 769 | 0 / 769 | 0 / 0 |
| 5.9.3 / true | 0 / 0 | 0 / 0 | 0 / 0 |
| 6.0.3 / true | 0 / 0 | 0 / 0 | 0 / 0 |

진단의 파일·위치·코드·메시지 집합도 동일합니다. 선언 수는 embedded Core 포함 baseline 26개, candidate 33개입니다. 별도 installed declaration-contract-check도 skipLibCheck:false에서 자체 오류 0, 외부 769건을 확인했습니다. 외부 Vuetify/선택 adapter 선언 오류가 해결된 것은 아니며 skipLibCheck:false 소비자는 여전히 타입 빌드에 영향을 받습니다.

## 실제 설치본 실행

격리 headless Chrome 156.0.8078.48, localhost 전용입니다. [Sortable 검사](../../scripts/sortable-browser-check.mjs)의 --installed --consumer 옵션으로 **node_modules의 동일 설치본**을 사용했습니다.

- 320/768/1440 × 3테마 × light/dark × 2density × ko/en, 72조합 통과.
- trusted 키보드 Space/Enter/Tab, 페이지 내 버튼과 focus-visible, pointer capture/release·취소·외부 변경, nested/window 자동 스크롤과 정지 통과.
- 320px touch emulation의 이동 버튼 탭·손잡이 드래그·pointercancel·본문 pan 통과.
- 설치본으로 만든 문서의 Components 8종 × 320/1440px = 16건, 실제 iframe 조작·검색·API·Sample Code·실행 링크 통과.
- UI 데모 header/nav 36조합과 표시 4종·Date/Number/Time 확장 조작 통과.

물리 터치·스크린리더·Safari는 미검증입니다. 현재 disabled/readonly는 전체 목록 컨트롤에 적용되며 항목별 disabled callback은 아직 제공하지 않습니다. 원 요청의 항목별 비활성은 남은 기능으로 구분하며, 이 검증은 현재 공개 계약 범위의 통과입니다.

로그: 격리 checkout qa-output/library-refresh.log·validation-resume.log·validation-resume-results.json, 원본 qa-output/sortable-declaration-comparison/report.json·sortable-installed-browser/report.json·component-extensions-browser/report.json·starter-updates-browser/report.json. 최종 실행 명령은 모두 종료 상태를 회수했습니다.

npm 게시·원격 push·운영 배포·외부 소비 프로젝트 변경은 하지 않았습니다. 다음 minor 후보와 최종 배포 기준은 별도로 결정합니다.
