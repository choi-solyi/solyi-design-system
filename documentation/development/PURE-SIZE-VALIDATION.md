# PURE 적용과 1.1.0 후보 크기 기준

사용자가 승인한 최적화와 기준 정리를 실제 소스에 적용했습니다. 비교 기준은 private Picker host가 완료된 `c440b03`이며 공개 컴포넌트는 45종입니다. root·tokens·Core·UI metadata와 해당 lock metadata는 **미게시 1.1.0 후보**로 맞췄습니다. 외부 의존성 버전·integrity와 package private 보호는 유지합니다.

## 실제 최적화

Vue에서 import한 `defineComponent`에 결합되는 호출 42곳만 PURE로 표시했습니다. 인자는 기존 object literal이며 setup/watch/DOM 초기화는 실행 시점에 그대로 남습니다. TypeScript checker로 결합을 확인하고 주석을 제거한 실행 AST가 c440b03과 동일한지 검사했습니다. 임의 함수·locale·토큰 초기화에 일괄 적용하거나 minification/external 설정을 바꾸지 않았습니다.

같은 1.0.0 metadata·동일 framework pin으로 실제 tarball을 설치한 전후 비교입니다. 아래 숫자는 바이트, gzip은 Node level 9입니다. peer-external은 Vue/Vuetify를 제외한 Solyi/Core JS이며 app은 framework와 createSolyiVuetify 설정을 포함합니다. CSS·폰트와 섞지 않습니다.

| 측정 | 이전 raw / gzip | PURE 이후 raw / gzip |
|---|---:|---:|
| 배포 ESM index | 225,784 / 56,831 | 226,440 / 56,882 |
| SIcon, peer-external | 174,013 / 50,765 | 16,444 / 6,316 |
| SCombobox, peer-external | 174,021 / 50,773 | 31,773 / 11,933 |
| 전체 plugin, peer-external | 174,947 / 51,330 | 174,941 / 51,328 |
| SIcon app | 313,959 / 111,805 | 275,574 / 99,453 |
| SCombobox app | 329,282 / 117,257 | 290,909 / 104,919 |
| 전체 plugin app | 477,717 / 157,322 | 477,717 / 157,322 |

PURE 주석 때문에 원본 ESM은 656바이트 늘었습니다. 전체 plugin이 사용하는 45종은 보존되고 개별 import에서 불필요한 컴포넌트가 제거됩니다. 이름 문자열 개수는 진단 보조입니다. 선언·CSS·embedded Core 등 나머지 dist 162개 파일은 byte 단위로 동일합니다. Vue가 만든 ID를 정규화한 45종 SSR HTML과 전역 등록 identity도 같았습니다.

## 버전별 검사

설정은 [LIBRARY-SIZE-BUDGETS.json](LIBRARY-SIZE-BUDGETS.json), 구현은 scripts/library-size-budget.mjs와 library-size-check.mjs입니다. npm 자체 업로드 제한이 아니라 저장소의 회귀 기준입니다.

| 검사 | 1.1.0 후보 기준 | 근거 |
|---|---:|---|
| index ESM 문자 수 | <235,000 | 현재 224,107자, 약 4.9% 여유 |
| index ESM gzip | ≤61,440 (60KiB) | 현재 약 56.9KB, 약 8% 여유 |
| 모든 배포 JS raw 합계 | ≤260,000 | 현재 243,969바이트, 약 6.6% 여유 |
| 모든 JS의 개별 gzip 합계 | ≤69,632 (68KiB) | 현재 약 63.1KB, 약 10% 여유 |
| SIcon peer-external gzip | ≤8,192 (8KiB) | 현재 6,316, 소형 API의 전체 보존 검출 |
| SCombobox peer-external gzip | ≤14,336 (14KiB) | 현재 11,933, async/form/floating 포함 대표 |
| 전체 plugin peer-external gzip | ≤56,320 (55KiB) | 현재 약 51.3KB, 45종 유지 |

공개 45종의 **이름 집합**도 일치해야 하고 알 수 없는 버전은 실패합니다. 여러 파일로 분할해 index만 줄여도 전체 JS가 검사됩니다. framework peer가 측정 모듈에 포함되거나 관찰 가능한 진입점이 제거되어 0바이트가 되면 실패합니다. 초기 비교 fixture의 export-only 진입점 제거 오류를 확인했고 window 참조로 수정한 위 결과만 사용했습니다.

library-contract-check.mjs의 원래 검사 위치를 유지했습니다. pipeline에 음성 사례와 실제 설치본 named-import 검사를 연결했습니다. raw/gzip/전체 JS/개별 import 경계 초과, 이름 누락·대체, 미등록 버전 거부가 통과했습니다. 신규 API나 다음 초과를 자동 한도 상향으로 처리하지 않습니다.

## 1.0.0 보존과 릴리스 상태

- 1.0.0의 exclusive **176,000자** 기준과 38종 집합을 보존했습니다.
- release-assets/1.0.0/solyi-ui-1.0.0.tgz SHA-256은 `72d1d8d622287e8a86444c404ad20f7c5ed5d065dc2b4e48765374697854e23a`로 동일합니다. 두 패키지 bytes/SHA/integrity/SHA256SUMS와 동일 버전 다른 bytes 거부도 통과했습니다.
- 1.1.0 임시 tarball은 qa-output/pure-size/final/에만 있습니다. SHA-256은 결과 JSON에 기록합니다. 기존 artifacts·release-assets·release/current 포인터·외부 소비 앱은 변경하지 않았습니다.
- Date/Time 공개 host 연결과 공통 Dialog 등 후속 구현이 남아 **1.1.0 정식 불변 artifact 생성과 전체 delivery pipeline은 아직 실행하지 않았습니다.** 범위가 닫힌 뒤 별도 1.1.0 파일과 manifest로 전체 pipeline을 검증해야 합니다. 원본 개발 metadata와 아직 갱신하지 않은 정식 릴리스 포인터는 구분합니다.
- npm 게시·remote push·운영 문서 배포를 하지 않았습니다. 로컬 크기 통과는 게시 승인을 뜻하지 않습니다.

## 검증과 후속

최종 임시 설치본의 크기 검사, 독립 앱 TypeScript/Vite build, Combobox runtime·positive/negative SFC 타입, 격리 Chrome 144조합(3폭 × theme/mode/density/locale/RTL)이 통과했습니다. 소스 공개 45종/전역 등록과 기존 9종 dedicated 동작도 통과했습니다. 자체 36개 선언은 skipLibCheck:false에서 0건이며 외부 선언 진단의 증감 비교는 결과 JSON에 기록합니다. 실제 Fold·OS 키보드·Safari·화면 낭독기 검증은 별도입니다.

재현 명령·수치는 [PURE-SIZE-RESULT.json](PURE-SIZE-RESULT.json)에 보존합니다. 다음은 [Picker 계획](PICKER-PRESENTATION-NEXT.md)의 Date opt-in → Time opt-in입니다. 공통 Dialog의 고정 header/body scroll·설명 간격과 Switch label 개선은 [요구 기록](DIALOG-FEEDBACK-NEXT.md)에 남아 있으며 아직 구현 완료가 아닙니다.
