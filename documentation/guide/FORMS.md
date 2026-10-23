# 폼과 오류 처리

SForm은 Vuetify VForm을 재사용하고 S 입력의 검증 결과를 함께 모읍니다. 실제 코드·타입은 [form.ts](../../packages/vue-ui/src/form.ts), 실행 예제는 [form.vue](../../examples/vue-vuetify/src/recipes/form.vue)와 [오류 요약](../../examples/vue-vuetify/src/recipes/error-summary.vue)이 기준입니다.

## 입력값과 오류의 소유권

- 값은 v-model로 소비 앱이 소유합니다. 검증을 초기화해도 값을 지우지 않습니다.
- `rules`는 동기 함수 배열입니다. 규칙은 `(value, locale) => boolean | string`이며 통과는 true, 실패는 오류 문자열 또는 false입니다. 예외나 잘못된 결과는 일반 오류로 처리합니다.
- `sRules.required(message?)`는 null·undefined·false·공백뿐인 문자열·빈 배열을 비어 있는 값으로 보고 숫자 0은 유효한 값으로 봅니다.
- `sRules.minLength(n, message?)`는 문자열 또는 배열의 length를 검사합니다. 한글 자소·이모지의 사람이 읽는 글자 수를 따로 세는 함수는 아닙니다.
- 서버 검사는 소비 앱에서 수행한 뒤 `serverError` 또는 `errorMessages`로 전달합니다. 비동기 rules를 지원한다고 가정하지 않습니다. 기존 `error` 문자열도 유지합니다.

가시 오류의 우선순위는 `serverError` → 기존 `error` → `errorMessages` → 내부 파싱/범위 오류 → 규칙 오류입니다. 오류 텍스트와 입력의 설명·invalid 상태를 함께 연결하며 색만으로 오류를 알리지 않습니다.

## 메서드와 제출

| 대상 | 메서드 | 반환·동작 |
|---|---|---|
| SForm | `validate()` | `Promise<{ valid, errors }>`; 오류 항목은 id·label·errorMessages를 포함 |
| SForm | `focus()` | 비활성 필드를 제외하고 첫 오류 또는 첫 필드에 초점 |
| SForm | `resetValidation()` | 클라이언트 검증 상태 초기화. 값과 외부 서버 오류는 유지 |
| S 입력 | `validate()` | boolean. 날짜·시간·숫자는 유효한 완성 초안의 기존 commit 계약도 유지 |
| S 입력 | `focus()` | 해당 입력으로 초점 이동 |
| S 입력 | `resetValidation()` | 클라이언트 오류 초기화. 값과 외부 오류는 유지 |

폼 props는 `modelValue:boolean|null`, `disabled`, `readonly`, `fastFail`입니다. 초기 검증 전은 null이고 제출 후 결과를 모델로 알립니다. disabled 필드는 검증에서 제외하지만 readonly 필드는 읽기만 가능해도 값의 유효성은 검사합니다.

규칙은 `validate()`와 폼 제출에서 평가하고, 한 번 검증한 뒤에는 값·규칙·언어 변경에 맞춰 갱신합니다. 텍스트·기본 선택의 blur 검사와 일부 복합 입력의 동작은 구분되며 모든 입력에 통일된 `validate-on` prop이 있는 것은 아닙니다. 폼의 submit 이벤트는 결과를 기다릴 수 있는 `SFormSubmitEvent`입니다. 정확한 사용은 실제 실행 SFC를 따릅니다.

`SFormHandle`과 `SFieldHandle` 타입의 template ref를 사용합니다. `document.getElementById`로 입력을 찾거나 잘못된 ref를 VTextField 내부 구조에 연결하지 않습니다. 오류 요약은 해당 필드의 ref로 이동하고, 서버 오류를 해제하는 시점은 소비 앱이 결정합니다.

이 동작은 요청 전 로컬 검증 도구이지 서버 검증·인증·데이터 저장을 대신하지 않습니다. 실제 네트워크·서버 오류는 앱에 맞게 별도 검증해야 합니다.

`SFormResult.cancelled`는 검증 도중 더 최근 검증·초기화·언마운트가 발생해 결과가 폐기되었음을 뜻합니다. 이때 `valid`는 false이며 제출을 진행하지 않습니다. 초기화 뒤 오래된 검증 응답이 오류 표시를 되살리지 않도록 소비 앱도 이 결과를 존중하세요.

이 취소 표시는 SForm이 반환하는 검증 결과에 적용됩니다. SForm 안에 native Vuetify 입력을 두고 비동기 `rules`를 사용하면, 오래된 응답이 Vuetify 자체의 오류 표시와 유효 상태를 바꿀 수 있으며 SForm은 이를 중단하거나 되돌리는 보호를 보장하지 않습니다. 서버 검증은 소비 앱에서 요청 순서·취소를 관리하고, 현재 요청의 결과만 `serverError` 또는 `errorMessages`로 전달하세요. S 입력의 동기 `rules` 계약은 그대로입니다.
