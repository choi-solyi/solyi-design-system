# 날짜·숫자 표시 확장 · 미게시

이 안내는 `feat/input-display`의 개발 API입니다. npm 1.0.0에는 새 옵션이 없으며 게시·버전 변경·외부 소비 앱 교체는 포함하지 않습니다. 기존 옵션을 생략한 기본 동작과 이벤트 payload, 폼 검증·readonly 계약은 유지합니다.

## SDatePicker

선택적 `displayFormatter: SolDateDisplayFormatter`를 추가했습니다. 타입은 `(iso: string, locale: Readonly<SolLocale>) => string`입니다. range에서는 각 endpoint에 같은 함수를 적용하고 기존 구분자 ` ~ `를 유지합니다.

- 저장 모델은 기존 ISO 문자열 / `{start,end}` / null이며 표시 문자열을 parse하지 않습니다.
- 편집 가능한 입력은 focus에서 원래 ISO draft를 보여주고 blur 검증 후 표시 포맷을 적용합니다. readonly는 focus해도 표시 포맷을 유지하며 선택·변경을 막습니다.
- 잘못된 수동 입력은 오류와 draft를 유지하고 마지막 유효 모델을 보존합니다. 캘린더 선택은 기존 commit 경로를 사용합니다.
- locale 변경은 선택값·draft·편집 중 선택 영역을 초기화하거나 change를 발생시키지 않습니다.
- formatter는 표시 전용입니다. 빈 문자열·잘못된 반환 타입·예외는 기본 ISO 표시로 돌아갑니다. 모델과 제출값에는 반영하지 않습니다.
- formatter와 name을 함께 쓰면 보이는 입력의 name을 분리하고 숨겨진 입력으로 현재 모델의 ISO 값을 제출합니다. range의 native 제출 문자열은 기존 `start ~ end` 형식입니다. form 속성과 disabled의 폼 참여 여부도 유지합니다. 편집 중 미확정 draft가 아닌 현재 모델이 제출 기준입니다.
- formatter가 없으면 기존 named input DOM과 native 제출 동작을 그대로 사용합니다.

요일은 기존 `formatSolDate`에 weekday 옵션을 전달하는 callback으로 조합합니다. 실제 단일/범위·요일 표시 예제는 [inputs.vue](../../examples/vue-vuetify/src/recipes/inputs.vue)에 있습니다. callback을 켜도 완료값은 ISO인 것을 함께 표시합니다.

## SNumberInput

기존 ± 버튼·min 기준 step·숫자/null 모델·키보드·검증을 재사용하며 별도 Step/Duration 컴포넌트는 추가하지 않습니다.

| 추가 API | 계약 |
|---|---|
| presets | `readonly SolNumberPreset[]`, 기본 빈 배열. `{value:number,label?:string,disabled?:boolean}` |
| formatValue | 선택적 `(value:number,locale:Readonly<SolLocale>) => string` |
| unit | 선택적 단위 텍스트. 기본 빈 문자열. parser나 모델값에 포함하지 않음 |
| presets slot | `{presets,value,setValue,isAllowed,disabled,readonly}`. 기본 preset 버튼 배치를 대체 |

범위 밖·step 불일치·비활성 preset은 선택할 수 없습니다. 유효 preset은 기존 commit 경로로 숫자 update/change를 내보내고 입력으로 초점을 옮깁니다. `setValue(value):boolean`은 전역 disabled/readonly와 수치 경계를 검사합니다. 유효 값을 받아들였는지를 반환하며 서버·rules 오류가 없어졌다는 뜻은 아닙니다. 소비자 slot은 전달된 상태를 버튼에도 연결해야 합니다. preset의 개별 disabled는 해당 선택지의 행동만 막으며 같은 수치를 직접 입력하는 것을 금지하지 않습니다.

formatValue는 비편집 표시와 aria-valuetext에만 사용합니다. focus에서는 기존 숫자 draft를 편집하고 formatter 출력은 숫자로 다시 parse하지 않습니다. unit은 입력 밖에 표시하며 보조 기술 값에도 포함합니다. formatter 자체에 단위를 넣었다면 unit을 생략해 중복을 피하세요. 단위가 있는 입력에는 tabular 숫자와 고정 grid 열을 적용해 한 자리에서 두 자리로 바뀌어도 폭이 흔들리지 않습니다.

formatter와 name을 함께 쓰면 현재 숫자 모델을 기존 `formatSolNumber` 방식으로 제출합니다. 예를 들어 1234.5의 기존 native 문자열 `1,234.5`를 유지하며 사용자 formatter의 “표시용 문구”는 제출하지 않습니다. 모델은 언제나 number/null입니다. formatter를 생략하면 기존 named input을 유지합니다. readonly는 표시를 유지하고 모든 증감·preset 행동을 막으며, disabled는 native 폼 제출에서도 제외합니다.

15/30/60 같은 분 단위 preset은 소비자가 숫자 배열과 unit을 전달해 구성할 수 있습니다. 근무시간·휴일·서비스별 규칙은 포함하지 않습니다. 범용 개수·preset·포맷의 실제 예제는 [advanced-inputs.vue](../../examples/vue-vuetify/src/recipes/advanced-inputs.vue)에 있습니다.

## 검증 상태와 다음 범위

현재 소스 빌드, 자체 선언/negative 타입 fixture, [새 런타임 검사](../../scripts/input-display-runtime-check.mjs)의 `--source`, 기존 입력·폼·1차 primitive·42개 export/등록 source 회귀가 통과했습니다. [격리 Chrome 검사](../../scripts/input-display-browser-check.mjs)는 최신 UI dist를 사용해 320/768/1440 × 3테마 × light/dark × 2밀도 × ko/en의 72개 조합과 실제 native 편집·폼 제출·preset 경계·readonly/disabled·callback 실패 복구를 통과했습니다. 숫자의 한 자리→두 자리 전환에서도 입력 폭이 유지됐습니다.

30개 공유 SFC의 source alias runtime·strict source 타입 검사, source 기반 starter와 문서 빌드, 27개 문서/82개 링크 검사도 통과했습니다. 문서 빌드의 첫 시도는 starter 폰트 산출물이 없어 실패했으며 source 기반 starter를 먼저 생성해 해결했습니다.

이 작은 단위에서는 새 tarball의 설치 소비 검증과 전체 배포 파이프라인을 아직 실행하지 않았습니다. 동결 1.0.0과 다른 개발 산출물을 같은 릴리스로 바꾸는 검사는 삭제·완화하지 않습니다. 실제 모바일·Safari·화면 낭독기도 미검증입니다. 다음 단위는 STimePicker의 기존 min 기준 step/readonly를 보존하는 opt-in 입력·스크롤·scrubbing 설계와 구현입니다.
