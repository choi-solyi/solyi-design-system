# 입력 확장 설치 소비 검증 · 미게시

검증 대상은 로컬 d1b20d2792eb6d74893a75f3f3fc4e51e89cd437입니다. 작업 저장소는 solyi-design-system, 별도 검증 checkout은 같은 workspace의 solyi-ui-phase2-verify입니다. 기존 사용자 변경·외부 소비 프로젝트·공개 릴리스는 건드리지 않고 검증 checkout의 내부 두 예제에만 설치했습니다.

## 산출물 식별

| 대상 | 의미 | SHA-256 |
|---|---|---|
| 공식 npm 1.0.0 tarball | 최초 확인한 공개 기준, private:false | ef6514359a4eca688568294614dd1a5a6cac1d5fe7ea8173a1946687a9f15a05 |
| 저장소 동결 1.0.0 tarball | 보호되는 기존 release-assets/docs/releases | 72d1d8d622287e8a86444c404ad20f7c5ed5d065dc2b4e48765374697854e23a |
| 격리 개발 tarball | 미게시 d1b20d2, private:true, 157 files | 1d0bde8c39b70e5b3a9bd79006a7139b3b73f4b02505a90de66ef135ebc891b0 |

개발 tarball은 격리 checkout의 artifacts/에 최초 생성한 테스트 산출물입니다. 버전 문자열이 아직 1.0.0이어도 공개 1.0.0 대체물이 아닙니다. 기존 artifacts를 지우거나 덮어쓰지 않았습니다. 새 버전은 별도로 결정해야 하며 호환 추가의 minor 후보는 1.1.0입니다. 게시·push·운영 문서 배포 승인을 가정하지 않습니다.

## 설치·실행

Node 22.22.1, Vue 3.5.44, Vuetify 4.3.0의 잠금 버전으로 library-pipeline --refresh를 실행했습니다. 공식 npm registry에서 잠금 의존성을 설치하고 로컬 UI tarball 하나를 내부 소비 앱 두 곳에 npm ci로 설치했습니다. 별도 Core 설치나 새 의존성은 없습니다.

통과 범위는 Core 독립 bootstrap, Core/UI 빌드, stylesheet·pack·prepack, independent consumer의 TypeScript 6.0.3 타입·Vite 빌드, 실제 30개 SFC의 TypeScript 5.9.3/vue-tsc 타입·템플릿, 설치 runtime 전체, 공개 demo 빌드, 문서 빌드, 시작 예제·문서 preview·fallback입니다. Date/Number 새 API, native/list TimePicker, 스크러빙, 기존 38개와 신규 4개 API/전역 등록도 설치본으로 확인했습니다.

현재 API에 맞는 문서 코드 블록의 포맷과 타입 import를 수정한 뒤 public-sample-check가 58개 JS/TS/Vue 예제·38개 SFC를 통과했습니다. 이 수정은 패키지 runtime 변경이 아닙니다.

[Chrome 검사](../../scripts/time-scrub-browser-check.mjs)의 --installed/--consumer 옵션으로 격리 소비 앱 node_modules의 실제 UI를 사용했습니다. 320/768/1440 × 3테마 × 2모드 × 2density × ko/en의 72개 조합에서 capture/release, 폼 값을 쓰지 않는 preview, 1회 commit, Escape 선택 복원, 목록 자동 스크롤 취소와 페이지 스크롤을 통과했습니다. 320px 터치는 Chrome 에뮬레이션입니다. 물리 기기·Safari·스크린리더는 미검증입니다.

## 외부 선언 진단 비교

[비교 스크립트](../../scripts/compare-declaration-diagnostics.mjs)는 baseline과 candidate의 모든 .d.ts를 **동일한 가상 solyi-ui 경로**에 메모리로 교체합니다. 실제 설치 의존성·compiler·공통 소비 fixture는 같으며 디스크의 패키지를 교체하지 않습니다. strict:true, noEmit:true, ES2022/DOM, ESNext, Bundler 옵션입니다. 각 compiler에서 skipLibCheck만 false/true로 비교했습니다.

| TypeScript | skipLibCheck | npm 1.0.0 자체/외부 | d1b20d2 자체/외부 | 새 외부 진단 / 제거 |
|---|---|---|---|---|
| 5.9.3 | false | 0 / 769 | 0 / 769 | 0 / 0 |
| 6.0.3 | false | 0 / 769 | 0 / 769 | 0 / 0 |
| 5.9.3 | true | 0 / 0 | 0 / 0 | 0 / 0 |
| 6.0.3 | true | 0 / 0 | 0 / 0 | 0 / 0 |

건수뿐 아니라 파일·위치·진단 코드·메시지의 집합도 같습니다. 외부 769건은 TS2344 693건, TS2307 73건, TS2687 2건, TS2308 1건입니다. 주요 위치는 Vuetify VSelect/transitions/VDateInput/labs 선언이며, @vuetify/v0의 선택 adapter가 참조하는 @js-temporal/polyfill·Flagsmith·LaunchDarkly 등의 누락 모듈도 포함됩니다. 이 문제를 감추기 위해 옵션을 바꾸거나 외부 라이브러리·선택 의존성을 추가하지 않았습니다.

비교 대상 패키지의 선언 수는 embedded Core를 포함해 baseline 26개, candidate 30개입니다. 별도의 declaration-contract-check --installed는 UI 자체 선언 26개와 새 API/negative fixture를 skipLibCheck:false로 검사해 자체 오류 0건을 확인했습니다. 라이브러리 빌드와 두 실제 소비 앱은 기존 설정의 skipLibCheck:true를 사용합니다. 이 설정에서도 소비 코드와 템플릿은 strict로 검사하지만 외부 .d.ts의 무오류를 보증하지는 않습니다. skipLibCheck:false가 필요한 소비 환경에서는 동일한 외부 오류로 타입 빌드가 실패할 수 있으며, 이번 변경이 그 환경까지 해결했다고 주장하지 않습니다.

재현 명령은 저장소 루트에서 실행합니다. baseline은 공식 1.0.0을 풀어 둔 읽기 전용 경로입니다.

```powershell
node scripts/compare-declaration-diagnostics.mjs --baseline ./qa-output/baseline/package --candidate ../solyi-ui-phase2-verify/examples/package-consumer/node_modules/solyi-ui --consumer ../solyi-ui-phase2-verify/examples/package-consumer --starter ../solyi-ui-phase2-verify/examples/vue-vuetify
```

전체 진단 JSON과 상세 로그는 작업 저장소 qa-output/declaration-comparison/, 격리 검증 로그는 solyi-ui-phase2-verify/qa-output/에 보존합니다. runtime index SHA-256은 npm 기준 192002ef44ff02aea8ddcfd449af0aaead771f957eca75c1c3a1703138dffc20, candidate 9d116bac669d32c16b6044d10e894d3a38ba5fdbee9551f91603962f91f75153입니다.

## 남은 배포 게이트

distribution-check는 Fresh build matches frozen package solyi-ui에서 **미통과**입니다. 위 개발 hash와 동결 hash가 달라 보호 검사가 정상적으로 거부한 결과입니다. 기존 release 파일 diff는 없으며 검사 삭제·완화·새 release 준비·버전 변경은 하지 않았습니다. 이 지점 이후의 HTTP release 설치 검사는 실행되지 않았습니다. 실제 로컬 tarball 설치/Chrome 검사와 구별합니다.

파이프라인 마지막 npm check/test는 이 게이트 때문에 자동 실행되지 않아 격리 checkout에서 별도로 실행했고 둘 다 통과했습니다. 초기 문서 코드 블록 실패는 수정 후 재통과했으며, 미해결 배포 게이트는 위 동결 hash 검사입니다. 동결 검사 이후의 HTTP release 설치는 미실행 상태를 유지합니다.
