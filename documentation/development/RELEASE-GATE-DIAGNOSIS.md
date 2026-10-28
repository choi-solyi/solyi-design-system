# 출시 보류 원인과 해결 권고

이 문서는 진단과 승인 대상 제안입니다. **게이트·버전·private 플래그·원본 빌드 설정을 변경하지 않았고 npm 게시·push·운영 배포도 하지 않았습니다.** 측정 대상은 동결 1.0.0과 최종 설치 검증된 c4f3011 후보입니다. 진행 중인 private Picker host는 이 후보에 포함되지 않습니다.

## 176,000은 npm 제한이 아니다

`scripts/library-contract-check.mjs:54–58`은 dist/index.js의 JavaScript `string.length < 176000`을 검사합니다. UTF-16 문자열 길이 기반의 **프로젝트 자체 소스 성장 경보**이며 UTF-8 파일 크기·minified 소비 크기·gzip·npm tarball 용량 제한과 다릅니다. 바로 위 주석도 peer external 여부의 증거가 아니라고 명시합니다.

주석은 0.8.0의 9개 추가 API와 34 APIs를 기준으로 설명합니다. 로컬 이력에서 최초로 확인 가능한 03d7191(2026-10-24)에 이미 같은 값이 있습니다. checkout이 shallow이므로 실제 최초 도입 commit/일자는 이 자료만으로 확정하지 않습니다. 동결 1.0.0은 38종, c4f3011은 45종인데 설명과 기준선은 갱신되지 않은 상태입니다.

| 지표 | 동결 1.0.0 | 완료 후보 c4f3011 | 증가 |
|---|---:|---:|---:|
| 공개 컴포넌트 | 38 | 45 | 7 |
| ESM 문자열 길이 | 145,638 | 222,586 | 76,948 |
| ESM UTF-8 bytes | 147,294 | 224,919 | 77,625 |
| ESM gzip bytes | 37,493 | 56,546 | 19,053 |
| 전역 plugin 소비 앱 JS bytes | 418,504 | 477,019 | 58,515 |
| 전역 plugin 소비 앱 JS gzip bytes | 139,836 | 157,089 | 17,253 |

현재 길이는 기준보다 46,586자 큽니다. 이 사실은 숨기거나 단순 minify로 판정만 바꾸지 않습니다. 소스에 추가된 동작과 실제 소비 비용을 함께 평가해야 합니다.

## 실제 named import 소비 크기

Vite 8.3.4, Vue 3.5.44/Vuetify 4.3.0, production minification, Node gzip level 9의 동일 fixture로 측정했습니다. 별도 subpath 컴포넌트 import를 있다고 가정하지 않고 공개 root의 named import를 사용했습니다. 표의 앱 수치는 **Vue·Vuetify·createSolyiVuetify 설정을 포함**하며 컴포넌트 자체 크기가 아닙니다.

| 소비 앱 | 현재 JS bytes / gzip bytes | 동결 대비 gzip 증가 | 현재 공통 setup만 대비 gzip 증가 |
|---|---:|---:|---:|
| Vue만 | 62,737 / 24,314 | 0 | 해당 없음 |
| 공통 Vuetify setup만 | 312,774 / 111,319 | 1,439 | 0 |
| SBtn | 313,646 / 111,647 | 1,399 | 328 |
| SIcon | 313,996 / 111,827 | 신규 | 508 |
| SChip | 316,494 / 112,759 | 신규 | 1,440 |
| STextField | 320,225 / 114,106 | 2,837 | 2,787 |
| SDatePicker | 330,630 / 117,483 | 2,978 | 6,164 |
| STimePicker | 336,952 / 119,321 | 6,217 | 8,002 |
| SCombobox | 328,587 / 117,027 | 신규 | 5,708 |

- 원본 library Vite 설정은 Vue/Vuetify를 external로 유지하고 실제 dist에도 peer import가 남습니다. dependency가 원본 ESM에 중복 포함된 상황은 아닙니다. Core는 의도적으로 패키지 내부에 포함됩니다.
- package.json의 sideEffects는 CSS만 보존합니다. 일반 앱 번들에서 SBtn/SIcon을 선택하면 해당 컴포넌트 name만 남아 tree-shaking이 작동합니다. 다만 name 문자열 잔존 여부만으로 모든 부수 코드를 제거했다고 판정하지는 않습니다.
- **peer를 external로 남기는 소비 빌드에는 별도 문제가 있습니다.** SIcon 하나도 173,282 bytes / gzip 50,513 bytes이고 자체 컴포넌트 name 42개가 남습니다. SCombobox도 173,290 / 50,522입니다. 3개 grid alias를 제외한 다수 초기화가 남으므로 최적화 대상입니다.
- 기본 all.css를 명시한 SBtn 앱은 JS 수치는 같지만 CSS가 398,150 bytes / gzip 65,471 bytes이며 폰트 asset 93개/3,571,152 bytes가 산출됩니다. 이는 배포 산출물 합계이며 브라우저가 모든 unicode-range 폰트를 처음부터 다운로드한다는 뜻은 아닙니다. 위 JS 표는 이 CSS·폰트 전송량을 포함하지 않습니다.

## 소스 최적화로 해결할 부분

격리 복사본에서 TypeScript의 binding 해석으로 **Vue에서 import한 defineComponent를 실제로 참조하는 호출 41개만** 찾아 PURE 주석을 추가했습니다. 원본 소스나 설치 검증 후보를 수정하지 않은 분석 실험입니다.

| peer-external 소비 | 현재 minified JS / gzip bytes | 격리 PURE 실험 JS / gzip bytes |
|---|---:|---:|
| SIcon | 173,282 / 50,513 | 16,444 / 6,316 |
| SCombobox | 173,290 / 50,522 | 31,042 / 11,677 |
| 전역 plugin | 174,216 / 51,075 | 174,210 / 51,082 |

일반 앱도 SIcon gzip 111,827→99,472, SCombobox 117,027→104,684로 감소했습니다. 전역 plugin은 전체 등록을 선택하므로 전체 컴포넌트가 남는 것이 맞습니다. 이 실험은 기능·SSR·모듈 부작용 회귀 통과를 대신하지 않습니다.

권장 순서는 다음과 같습니다.

1. 실제 source의 순수 component 초기화/factory에 한정해 annotation과 빌드 후 보존 여부를 점검합니다. component setup의 경고·watch·등록 같은 실행 시 동작을 제거하지 않습니다. source/설치본 runtime·타입·SSR·개별 import 크기를 함께 검증합니다.
2. 남은 불필요한 보존이 있으면 index.ts의 런타임 SBtn 순환 의존 등 module boundary를 분석합니다. API 이름과 전역 등록은 유지합니다. multi-entry/preserveModules가 필요해도 index.js만 작게 만들어 기존 길이 검사를 통과시키지 않고 전체 배포 JS 합계 지표를 먼저 승인받아야 합니다.
3. PURE 표시만으로 원본 소스 성장 76,948자가 없어지지는 않습니다. 출력 whitespace/minification을 바꿔 176k 판정만 맞추는 방식을 권고하지 않습니다. 실제 최적화와 버전별 성장 기준선 갱신은 별개입니다.

## 1.0.0 보존과 다음 버전 검사

현재 구현은 이미 두 목적을 구분합니다.

- pack-packages.mjs는 같은 artifacts 파일명이 이미 있으면 새 bytes와 같아야 한다고 검사합니다.
- releases.mjs의 assertImmutableRelease/assertPackageVersions는 같은 이름·버전에 다른 bytes가 생기는 것을 거부합니다. verifyRelease는 tarball 크기·SHA-256·integrity·SHA256SUMS를 확인합니다.
- distribution-check.mjs는 **current release**의 source 버전·artifact hash를 대조하고 모든 보존 release 다운로드의 무결성도 확인합니다.
- build.mjs는 공개 index에 current만 표시하면서 기존 다운로드 URL과 immutable 파일을 보존합니다. 기존 검사를 지우거나 모든 버전에 새 source를 일치시키도록 바꿀 필요가 없습니다.

따라서 새 기능을 계속 1.0.0 이름으로 포장해서는 안 됩니다. 기존 1.0.0 파일·SHA-256 **72d1d8d622287e8a86444c404ad20f7c5ed5d065dc2b4e48765374697854e23a**를 보존하고, 범위가 확정된 **새 minor 후보(예: 1.1.0)**를 별도 파일·manifest/current pointer로 검증해야 합니다. 현재 pipeline은 root 문서 버전과 tokens.json 버전을 맞추도록 요구합니다. 토큰 metadata bytes도 바뀌므로 기존 Core 1.0.0의 동일 bytes를 유지한 채 덮어쓸 수 없습니다. 첫 릴리스에서는 root/tokens/Core/UI 버전을 일관되게 새로 준비하는 편이 현재 구조를 가장 적게 바꿉니다. 버전 독립화는 별도 설계입니다.

## 사용자 승인 후 변경할 정확한 범위 제안

아래는 아직 적용하지 않은 제안입니다. 승인 없이 숫자·버전·릴리스 상태를 바꾸지 않습니다.

| 대상 | 권고 범위 |
|---|---|
| source component 초기화와 library 빌드 | 위 PURE 실험을 안전한 소스 변경으로 옮기고 설치 소비 회귀를 검증. Vue/Vuetify external 정책 유지 |
| library-contract-check.mjs 및 별도 version budget 데이터 | 검사 위치를 유지하고 34-API 고정 설명 대신 승인된 릴리스의 sourceRef·API 범위·raw/gzip·named import 기준선을 기록. 자동 무제한 상향 금지 |
| 45종 c4f3011 범위의 잠정 수치 | 최적화 후 재측정을 전제로 source 길이 <235,000자, 원본 ESM gzip ≤60KiB, peer-external SIcon gzip ≤8KiB/SCombobox ≤14KiB/전체 plugin ≤55KiB를 검토할 수 있음. 측정값에 근거한 여유분이며 최종 승인 수치가 아님. 미완성 Picker/후속 컴포넌트까지 포괄 승인하는 예산이 아님 |
| root/tokens/Core/UI metadata·변경로그·새 artifact/manifest/current | 릴리스 포함 범위를 확정한 뒤 1.1.0 후보로 준비. 1.0.0·기존 무결성 검사·다운로드 URL 유지. private=true는 실제 npm 게시 승인 전까지 유지 |
| 검증 | 새 버전의 포장·설치·타입·런타임·문서·HTTP 소비·손상 negative 검사를 실행. 새 버전 승인은 npm 게시/운영 배포 승인과 구분 |

측정 스크립트는 scripts/release-size-analysis.mjs, 원시 결과는 qa-output/release-size-analysis/report.json이며 핵심 결과는 [크기 스냅샷](RELEASE-SIZE-RESULT.json)에 보존합니다. 진단 때문에 기존 크기/frozen 게이트를 수정하거나 재배치하지 않았습니다.
