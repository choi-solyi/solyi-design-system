# 입력 내부 clear: 단계별 구현과 검증

승인된 [확장 요청 2 계획](EXTENSIONS-V2-PLAN.md)의 **1단계 입력 8종 source 구현을 완료**했습니다. 공통 구조·텍스트는 **ab6c1be**, Select·Number는 **712dba6**, Autocomplete·MultiSelect는 **bf01059**에 보존했고 Date·Time 단위는 아래에 기록합니다. 18개 요청 전체 완료나 공개 출시를 뜻하지 않습니다. 현재 source는 44개 공개 S 컴포넌트를 유지합니다.

| 컴포넌트 | 빈 모델 | starter·Components 정본 / 실행 ID | 실제 starter clear | 공개 반영 |
|---|---|---|---|---|
| STextField | 빈 문자열 | fields.vue / recipe-field | 통과 | 이번 변경 미배포 |
| STextarea | 빈 문자열 | advanced-inputs.vue / recipe-note | 통과 | 이번 변경 미배포 |
| SSelect | null | choices.vue / recipe-sort | 통과 | 이번 변경 미배포 |
| SNumberInput | null | advanced-inputs.vue / recipe-amount | 통과 | 이번 변경 미배포 |
| SAutocomplete | null | inputs.vue / recipe-autocomplete | 통과 | 이번 변경 미배포 |
| SMultiSelect | 빈 배열 | advanced-inputs.vue / recipe-tags | 통과 | 이번 변경 미배포 |
| SDatePicker | null (단일·range) | inputs.vue / recipe-date | 통과; range modal 별도 검증 | 이번 변경 미배포 |
| STimePicker | null | time.vue / recipe-time, recipe-time-list | native/list 모두 통과 | 이번 변경 미배포 |

## 실제 API와 호환성

- 두 입력에 `clearable=false`, `loading=false`와 `clear({value:'',reason:'clear'})`, exposed `clear():void`를 추가했습니다. 기존 focus/validate/resetValidation은 유지하며, 공통 `SolInputHandle`·`SolInputClearEvent<T>`·slot scope 타입을 root에서 개별 import할 수 있습니다. 전역 등록 이름도 그대로입니다.
- 내부 X, 공통 slot의 `clear()`, template ref의 `clear()`가 같은 transaction을 실행합니다. 빈 값은 두 입력 모두 **빈 문자열**입니다. STextField는 기존 `update:modelValue`만 내보내며 change 이벤트를 새로 만들지 않습니다. STextarea는 기존 문자열 change를 유지합니다. 값이 이미 비었다면 update/change를 중복해서 내보내지 않습니다.
- required 입력도 지운 뒤 검증 오류를 표시합니다. 외부 serverError를 지우거나 소비자의 controlled 변경 거부를 덮어쓰지 않습니다. disabled/readonly와 부모 SForm 상태에서는 X를 숨기고 메서드/slot으로도 지울 수 없습니다. unmount 뒤의 호출과 비동기 포커스 복원을 막고, 소비자가 다른 곳으로 옮긴 포커스를 다시 가져오지 않습니다.
- `leading/trailing/indicator/status/loading` slot은 `{hasValue,disabled,readonly,loading,error,clear}`를 받습니다. 기존 label/help는 유지합니다. `loading`은 진행 표시이며 편집 잠금은 disabled/readonly로 제어합니다. 커스텀 loading/status slot의 접근성 이름은 작성자가 제공합니다. 기본 loader에는 ko/en 이름, 기본 오류 표시는 장식용 기존 info 아이콘을 사용합니다.
- 옵션과 새 slot이 없으면 기존 DOM 레이아웃을 유지합니다. Vuetify 입력은 기존 VTextField의 prepend-inner/append-inner adapter, native Textarea는 grid shell을 사용합니다. action rail은 기존 크기·색·간격·radius·motion 토큰을 재사용합니다. 새 토큰·의존성·라이선스는 없습니다. 전역 링크/overflow/모든 입력 CSS를 덮어쓰지 않습니다.
- RTL 앱은 DOM `dir`와 Vuetify의 locale RTL 설정을 일치시켜야 합니다. 검사에서도 둘을 함께 설정했습니다. ko/en 문구와 RTL 배치는 별개입니다.

## 검증

| 구분 | 결과와 범위 |
|---|---|
| UI 패키지 build | Vite + 자체 source 선언 생성 통과 |
| 공통 clear runtime | 두 입력의 빈 모델, 정확한 기존 이벤트 횟수/형태, required/serverError, native FormData, focus, form submit 방지, disabled/readonly/SForm, controlled 거부, locale/slots/loading, 기본 layout, unmount/외부 focus 통과 |
| strict Vue SFC 타입 | 개별 import·전역 사용 2건 통과, 잘못된 모델·clear payload·reason·slot·미지원 prop 5건 거부 확인 |
| 기존 회귀 | form-api-runtime-check --source 및 s-api-runtime-check --source 통과; 기존 44 export/전역 등록·직접 V 컴포넌트 공존 보존 |
| 격리 Chrome | 320/768/1440 × 3 theme × light/dark × 2 density × ko/en × LTR/RTL = **144조합 통과**. 긴 입력값, rail 겹침/가로 overflow, 40/44px target, Tab/Enter clear·focus·required·FormData, loading/disabled/readonly 확인. 320px tap은 에뮬레이션 |
| 생성 API | 44개 source 기반 props/events/slots/methods 생성 통과 |
| 자체 선언 | TS 5.9.3, strict ES2022/DOM/ESNext/Bundler, skipLibCheck:false: 33개 자체 선언 0건, 외부 선언 769건. 기존 알려진 수치와 증가 없음; 이번 단위에서 진단 ID 전체 baseline 재비교·새 tarball 설치·TS 6 소비자 비교는 미실행 |
| 실제 starter·문서 | source alias로 실제 starter 30 recipes/공유 예제 타입·빌드, 문서 build/check 통과. 기존 npm test 19개 명령도 모두 통과: 연결 중단 전 앞 5개 pass 로그, 복구 후 기존 node 프로세스 없음 확인 뒤 header-preferences 1개와 나머지 13개만 회수/실행. 중단된 원래 세션의 전체 종료 코드는 복구되지 않아 단일 npm test 실행 성공으로 기록하지 않음 |

검사 스크립트는 [runtime](../../scripts/input-control-runtime-check.mjs), [strict types](../../scripts/input-control-types-check.mjs), [isolated Chrome](../../scripts/input-control-browser-check.mjs)입니다. Chrome report와 screenshot은 ignored `qa-output/input-control-browser/`에 남깁니다. 물리 터치·스크린리더·Safari는 미실행입니다.

모바일 screenshot에서 강화된 VTextField의 native input과 바깥 필드에 포커스 링이 함께 그려지는 것을 발견해 강화 모드에만 안쪽 링을 제거했습니다. 바깥 필드와 clear 버튼의 키보드 포커스 링은 유지하며, 수정 후 144조합에서 두 조건을 다시 확인했습니다. RTL 검사 초기의 DOM/Vuetify 방향 불일치와 runtime의 Vuetify 내부 progressbar 오선택은 테스트 설정을 수정해 재검증했습니다.

## 문서·starter·출시 경계

STextField는 [fields recipe](../../examples/vue-vuetify/src/recipes/fields.vue)의 clearable/loading 제어·clear 횟수, STextarea는 [advanced-inputs recipe](../../examples/vue-vuetify/src/recipes/advanced-inputs.vue)의 내부 X·clear 횟수로 연결했습니다. Components Examples/Sample Code는 같은 정본 SFC를 사용하며 API도 실제 source에서 생성합니다. 추가 검증은 아래 후속 기록에 구분합니다.

새 tarball 설치 검증·npm 게시·push·운영 ui.solyi.kr 배포·외부 소비 앱 변경은 이번 단위에서 하지 않았습니다. package 버전은 private 1.0.0 그대로이며 compatible minor 후보 검토까지입니다. 기존 frozen 1.0.0 산출물을 덮어쓰지 않았습니다.

현재 build ESM은 **205,285자 / 207,565 bytes**이며 기존 **176,000자 제한 초과**입니다. 이전 Calendar 200,955자에서 4,330자 늘었습니다. 크기 gate 및 frozen 1.0.0 hash gate는 출시 차단으로 유지하며 위치·임계값·검사를 바꾸지 않습니다. 이 결과는 새 기능의 source 동작 통과와 구분합니다. 기존 설치본의 외부 선언 baseline 769건도 해결됐다고 주장하지 않습니다.

## 후속 단위: SSelect·SNumberInput

두 입력에 같은 opt-in `clearable/loading`, common slots, `clear():void`, `clear({value:null,reason:'clear'})`를 연결했습니다. 기존 scalar update/change는 그대로이며 clear로 모델이 달라질 때만 각각 한 번 보냅니다. Select는 native select/option/required/readonly 처리를 유지하고 indicator slot도 비대화형 장식으로 배치합니다. Number는 required라도 모델을 null로 지울 수 있게 intrinsic commit과 clear transaction을 구분하고, 부모가 거부하면 canonical 모델에서 draft를 복구합니다. 미완성 `-` draft도 지웁니다.

Number의 formatter·unit·min 기준 step·preset과 hidden canonical 제출값을 유지했습니다. 기존 preset scope의 실제 값 `{presets,value,setValue,isAllowed,disabled,readonly}`를 `SolNumberPresetScope`로 공개하고 `SolNumberInputSlots`에 연결했습니다. 기존 slot 이름이나 필드를 바꾸지 않았습니다. 공통 action이 의미 없는 Checkbox/Radio/Switch 등에는 clear props를 추가하지 않습니다.

패키지 build, clear runtime 4종, strict local/global SFC 2건 + negative 7건, 기존 form runtime, 격리 Chrome 144조합에서 4종 clear/모델/required/포커스/RTL/배치가 통과했습니다. Number의 preset·off-step 차단·clear 이후 min 기준 ArrowUp·formatted native 제출값, Select의 비활성 option과 custom indicator도 검사했습니다. JSDOM은 required select의 비활성 빈 option을 FormData에 포함하지만 Chrome은 제외하므로 실제 브라우저의 기존 제출 의미를 따로 확인했습니다. Chrome 초기 선택자가 select/hidden input을 구분하지 못한 것은 테스트 선택자를 수정한 뒤 재검증했습니다.

정본 `choices.vue`의 SSelect와 `advanced-inputs.vue`의 SNumberInput에 clearable을 추가했습니다. Components Examples/Sample Code와 starter가 같은 정본을 사용합니다. 이 단위의 ESM은 **206,458자 / 208,738 bytes**로 이전 텍스트 단위보다 1,173자 늘었으며 기존 크기 제한·frozen gate는 계속 차단입니다. 추가 의존성·토큰·외부 배포는 없습니다.

기존 input-display source runtime(weekday/range, formatted raw editing, invalid draft, form, inherited guards, decimal/min-origin presets, formatter fallback), 실제 starter source 타입·빌드, Components API, 문서 build도 통과했습니다. TS 5.9.3/skipLibCheck:false 자체 선언 33개 0건·외부 769건입니다. 새 설치본 검증은 아직 하지 않았고 앞 단위에서 닫은 전체 문서 회귀를 불필요하게 반복하지 않았습니다.

## 후속 단위: SAutocomplete·SMultiSelect

두 입력에 opt-in clearable/loading과 공통 slots/action rail을 연결했습니다. 내부 X와 clearable 모드의 exposed clear는 같은 transaction으로 null/빈 배열을 제안하고 검색어·오류·진행 중 요청을 초기화해 닫고 검증한 뒤 입력으로 포커스를 돌립니다. readonly/disabled/SForm 가드는 공통으로 적용합니다. 읽기 전용 입력 배열은 변조하지 않습니다. 기존 scalar change와 commit의 호출 횟수를 유지하므로 이 두 입력은 이미 빈 모델에서 query만 지울 때도 기존 update/change를 내보냅니다. 별도 clear 알림은 `{value,reason:'clear'}`입니다.

새 공통 옵션/slot을 사용하지 않는 기본 모드의 기존 exposed clear는 동작을 보존합니다. Autocomplete는 기존처럼 검색어를 지우고 닫아 포커스를 돌리며, MultiSelect는 기존처럼 선택 값만 비우고 검색어/팝업은 유지합니다. 새 loading이나 공통 slot만 사용해도 exposed clear와 scope.clear가 같은 강화 모드 transaction을 사용합니다. 내부 busy는 강화 모드의 loader/slot scope에 합쳐 표시하고 기존 기본 DOM을 강제로 바꾸지 않습니다. dropdown은 이름 있는 native button이고 기존 popup·ArrowDown/Escape 키를 재사용합니다. SAutocomplete는 여전히 옵션 선택 전용이며 자유 입력 API를 추가하지 않았습니다.

새 clear 후 부모가 값을 거부하면 Autocomplete label을 canonical model로 복구하고, 이후 실제 외부 reset도 동기화합니다. 요청은 AbortSignal과 기존 revision으로 취소·stale 차단합니다. composition 중 clear한 뒤 늦게 온 compositionend가 이전 draft를 복원하거나 팝업을 다시 열지 않으며 다음 composition은 다시 동작합니다.

- 6종 공통 runtime: 모델/이벤트·required/serverError·FormData·포커스·가드·controlled 거부·unmount와 query-only/abort/late response/composition/기본 clear 계약 통과.
- strict Vue SFC: local/global 2건 + negative 9건 통과. readonly 배열 push 및 SAutocomplete의 미지원 allow-custom도 거부.
- 기존 dedicated/expansion source runtime: Autocomplete IME/caret/stale/retry/abort, MultiSelect tags/limit/readonly/async/IME/error-retry/unmount 회귀 통과.
- 격리 Chrome 144조합에서 6종 clear·긴 label·RTL·키보드·폼·guard·모바일 배치 통과. 각 폭에서 실제 ArrowDown/Escape·dropdown·열린 상태 clear·포커스 복원 추가 확인. 물리 IME/터치·스크린리더·Safari는 미실행.
- 자체 선언 33개 0건/외부 769건, 실제 starter source 타입·빌드, 44개 Components API 및 문서 build 통과. 새 tarball 설치 검증은 미실행.

Components 정본 `inputs.vue`의 SAutocomplete와 `advanced-inputs.vue`의 SMultiSelect, starter의 공유 `AdvancedExamples.vue` 모두 clearable을 연결했습니다. source ESM은 **208,845자 / 211,125 bytes**로 기존 176,000자 제한을 초과합니다. frozen 1.0.0 및 크기 검사·위치·임계값을 변경하지 않았고 새 의존성/토큰·게시·push·운영 배포는 없습니다.

## 후속 단위: SDatePicker·STimePicker와 8종 공통 마무리

Date의 단일·range와 Time 모두 null clear를 연결했습니다. 기존 DateChange의 mode/value/reason:clear와 Time의 scalar change, min 기준 step, native/list 기본 presentation, initial scroll/manual input/scrubbing 계약을 유지합니다. 새 공통 기능이 없는 기본 모드의 exposed clear는 종전처럼 popup을 임의로 닫거나 새 포커스 이동을 추가하지 않습니다. 강화 모드에서는 내부 X·scope.clear·공개 clear가 draft/부분 range/preview를 정리하고 닫기→검증→입력 focus의 같은 경로를 사용합니다. allowManualInput=false는 전체 readonly와 다르므로 picker·clear는 계속 사용할 수 있습니다.

Date의 range 비교는 객체의 속성 순서 대신 start/end 값으로 판단합니다. 부모가 clear를 거부한 뒤 validation이 순서가 다른 같은 range를 추가 input commit으로 내보내지 않게 했고, 기존 payload·ISO 값은 유지했습니다. Time은 active scrub을 external cancel하고 capture/자동 스크롤을 정리한 뒤 null을 제안합니다. 뒤늦은 pointerup/keyup은 commit하지 않습니다. shared rail은 내부 scrub control을 수용하며, clear만 쓰는 VTextField에는 비어 있는 leading slot 공간을 만들지 않습니다.

실제 Chrome에서 좁은 화면의 Time panel이 input row를 덮어 X를 가로막는 실패를 발견했습니다. 강화 모드에서만 전체 field frame을 기준으로 위·아래 가용 공간을 고르고 높이를 제한하며, Core panel spacing을 사용합니다. 위쪽 panel은 bottom을 고정해 내용 크기가 바뀌어도 입력행을 덮지 않습니다. 기존 기본 모드의 위치 정책은 유지했고, force click·z-index 강제 덮어쓰기·전역 overflow 변경을 하지 않았습니다. native/list 양쪽에서 panel/field 비겹침과 실제 clear 클릭을 다시 확인했습니다.

- 8종 공통 runtime 통과: 모든 빈 모델·기존 이벤트·required/serverError·폼·가드·부모 거부·focus/unmount, Date range 속성 순서·부분 range 취소, Time manual-input required·preview cancel·capture/late release. 새 slot/loading 모드의 ref/slot clear 일치도 12조합으로 확인했습니다.
- strict SFC local/global 2건 + negative 11건 통과. DateChange와 새 clear payload 구분 및 Time의 미지원 presentation=auto 거부 포함입니다.
- 기존 input-display, extended Date calendar/Time/기본 입력, Time list/scrub, 44개 S export/global 회귀 통과. 자체 선언 33개 오류 0건, TS 5.9.3/skipLibCheck:false 외부 769건은 유지합니다.
- Chrome 144조합에서 8종 + Date range(9개 instance)의 clear·required·FormData·포커스·긴 text·ko/en·3 theme/light-dark/2 density/LTR-RTL 통과. 각 폭에서 native Date 단일/range footer clear·Escape, Time의 keydown 상태 clear→keyup 후 무commit, initialScrollValue/list/manual-input 및 panel 비겹침을 추가 확인했습니다. key-release commit을 press()로 잘못 시험한 것은 down/up을 분리해 기존 계약 그대로 재검증했습니다.
- 실제 source-built starter 320px에서 위 9개 예제의 touch-emulated clear·focus·selection 초기화 통과. 읽기 전용 Time 목록 입력에 fill을 강제하지 않고 목록에서 값을 선택했습니다. 문서에는 fields의 leading/trailing과 choices의 indicator 사용 예시도 보완했습니다.

검증 코드는 [actual starter browser](../../scripts/input-control-starter-browser-check.mjs)와 위 공통 runtime/type/browser 검사입니다. 물리 touch/IME, 실제 screen reader, Safari, 새 tarball 설치는 미실행입니다. 문서·실제 starter는 source alias로 검증했으며 배포된 npm/운영 사이트 검증으로 바꾸어 말하지 않습니다.

최종 source ESM은 **211,118자 / 213,398 bytes**로 **176,000자 gate 초과**입니다. frozen UI 1.0.0 SHA-256은 `72d1d8d622287e8a86444c404ad20f7c5ed5d065dc2b4e48765374697854e23a`로 유지했습니다. 새 dependency/token, 버전 변경·게시·push·운영 배포·외부 소비 앱 수정은 없습니다. 지원된 모델과 change 계약을 유지한 opt-in 추가이므로 minor 후보로 정리하되 실제 버전/출시는 별도 결정해야 합니다.

소비자는 내부 clear가 필요한 입력에 clearable을 선택하고 새 null/빈 배열/빈 문자열을 기존 모델 계약대로 처리합니다. 새 공통 옵션/slot을 추가하지 않으면 기존 clear 동작을 유지합니다. 이미 앱이 그린 외부 clear 버튼은 앱에서 선택적으로 정리할 수 있으며 이 작업에서 외부 소비 프로젝트를 변경하지 않았습니다. 다음 승인 단계는 기존 SAutocomplete를 유지한 별도 SCombobox입니다.

실제 코드는 [공통 lifecycle·rail](../../packages/vue-ui/src/input-control.ts), [VTextField adapter](../../packages/vue-ui/src/text-field.ts), [Select/Textarea/Number](../../packages/vue-ui/src/controls.ts), [Autocomplete](../../packages/vue-ui/src/autocomplete.ts), [MultiSelect](../../packages/vue-ui/src/selection.ts), [Date/Time](../../packages/vue-ui/src/date-time.ts), [scoped 스타일](../../packages/vue-ui/src/input-control.css)에 있습니다. global 등록 이름·개별 import 경로는 그대로이고 공개 API 문서는 실제 source에서 생성합니다.
