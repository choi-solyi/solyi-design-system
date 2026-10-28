# 입력 내부 clear: 공통 구조와 텍스트 2종

승인된 [확장 요청 2 계획](EXTENSIONS-V2-PLAN.md)의 1단계 중 공통 입력 구조와 STextField·STextarea를 먼저 연결했습니다. **나머지 SSelect/SNumberInput/SAutocomplete/SMultiSelect/SDatePicker/STimePicker 연결은 아직 남아 있습니다.** 18개 전체 또는 입력 8종 완료를 뜻하지 않습니다. 현재 source는 44개 공개 S 컴포넌트를 유지합니다.

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
