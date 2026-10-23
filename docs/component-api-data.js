// Generated from packages/vue-ui/src by scripts/build-component-api.mjs.
export const componentReferences=[
  {
    "name": "SBtn",
    "id": "sbtn",
    "group": "동작",
    "description": "버튼의 기본·보조·로딩·비활성 상태를 구분합니다.",
    "exampleRoute": "component",
    "example": "buttons",
    "source": "packages/vue-ui/src/index.ts",
    "props": [
      {
        "name": "variant",
        "type": "ButtonVariant",
        "required": false,
        "default": "'secondary'",
        "description": "행동의 시각적 위계입니다.",
        "values": [
          "primary",
          "secondary",
          "subtle",
          "inline"
        ]
      },
      {
        "name": "tone",
        "type": "SButtonTone",
        "required": false,
        "default": "undefined",
        "description": "강조·정보·성공·주의·오류의 의미색입니다.",
        "values": [
          "accent",
          "info",
          "success",
          "warning",
          "danger"
        ]
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "사용을 막고 비활성 상태를 표시합니다.",
        "values": []
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "처리 중 상태입니다. 해당 컴포넌트의 입력·행동 계약을 따릅니다.",
        "values": []
      },
      {
        "name": "type",
        "type": "'button'|'submit'|'reset'",
        "required": false,
        "default": "'button'",
        "description": "입력 또는 버튼의 HTML 유형입니다.",
        "values": [
          "button",
          "submit",
          "reset"
        ]
      }
    ],
    "events": [
      {
        "name": "click",
        "signature": "(event: MouseEvent)",
        "description": "click 동작이 발생했을 때 전달합니다."
      }
    ],
    "slots": [
      {
        "name": "default",
        "scope": "인자 없음",
        "description": "기본 내용입니다."
      }
    ],
    "methods": [],
    "types": [
      {
        "name": "SButtonTone",
        "source": "type SButtonTone='accent'|'info'|'success'|'warning'|'danger';"
      },
      {
        "name": "ButtonVariant",
        "source": "type ButtonVariant='primary'|'secondary'|'subtle'|'inline';"
      }
    ],
    "passthrough": null
  },
  {
    "name": "SSplitBtn",
    "id": "ssplit-btn",
    "group": "동작",
    "description": "대표 행동과 추가 행동 메뉴를 한 묶음으로 제공합니다.",
    "exampleRoute": "start",
    "example": "advanced-vue",
    "source": "packages/vue-ui/src/actions.ts",
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "입력·제목·패널의 접근성 연결에 사용하는 고유 ID입니다.",
        "values": []
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "화면과 보조 기술에 전달하는 이름입니다.",
        "values": []
      },
      {
        "name": "items",
        "type": "readonly SolMenuItem[]",
        "required": true,
        "default": "undefined",
        "description": "표시할 항목 자료입니다. 타입 정의의 필수 키를 확인합니다.",
        "values": []
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "사용을 막고 비활성 상태를 표시합니다.",
        "values": []
      },
      {
        "name": "readonly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "현재 값은 보여 주고 사용자 변경을 막습니다.",
        "values": []
      },
      {
        "name": "open",
        "type": "boolean",
        "required": false,
        "default": "undefined",
        "description": "메뉴의 제어형 열림 상태입니다. update:open 이벤트와 연결합니다.",
        "values": []
      },
      {
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
        "values": []
      },
      {
        "name": "menuLabel",
        "type": "string",
        "required": false,
        "default": "undefined",
        "description": "분할 버튼에서 추가 행동 메뉴를 여는 버튼의 이름입니다.",
        "values": []
      }
    ],
    "events": [
      {
        "name": "update:open",
        "signature": "(v: boolean)",
        "description": "해당 상태의 변경을 소비 앱에 전달합니다."
      },
      {
        "name": "select",
        "signature": "(id: string)",
        "description": "select 동작이 발생했을 때 전달합니다."
      },
      {
        "name": "open",
        "signature": "()",
        "description": "패널이 열린 뒤 전달합니다."
      },
      {
        "name": "close",
        "signature": "(why: SolMenuCloseReason)",
        "description": "닫힌 이유를 전달합니다."
      },
      {
        "name": "primary",
        "signature": "(e: MouseEvent)",
        "description": "primary 동작이 발생했을 때 전달합니다."
      }
    ],
    "slots": [
      {
        "name": "default",
        "scope": "인자 없음",
        "description": "기본 내용입니다."
      }
    ],
    "methods": [],
    "types": [
      {
        "name": "SolMenuCloseReason",
        "source": "type SolMenuCloseReason='escape'|'outside'|'tab'|'select'|'disabled'|'programmatic';"
      },
      {
        "name": "SolMenuItem",
        "source": "interface SolMenuItem {id:string;label:string;disabled?:boolean;danger?:boolean}"
      }
    ],
    "passthrough": null
  },
  {
    "name": "SAutocomplete",
    "id": "sautocomplete",
    "group": "입력",
    "description": "검색어와 한 개의 선택값을 구분하고 비동기 응답을 다룹니다.",
    "exampleRoute": "pattern",
    "example": "autocomplete",
    "source": "packages/vue-ui/src/autocomplete.ts",
    "props": [
      {
        "name": "rules",
        "type": "readonly SRule<any>[]",
        "required": false,
        "default": "[]",
        "description": "순서대로 실행할 공통 검증 규칙입니다. true·false 또는 오류 문구를 반환합니다.",
        "values": []
      },
      {
        "name": "errorMessages",
        "type": "string | readonly string[]",
        "required": false,
        "default": "''",
        "description": "외부에서 제공하는 오류 문구입니다.",
        "values": []
      },
      {
        "name": "serverError",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "서버 응답 오류입니다. 로컬 규칙 오류와 구분하여 소비 앱에서 갱신합니다.",
        "values": []
      },
      {
        "name": "id",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "입력·제목·패널의 접근성 연결에 사용하는 고유 ID입니다.",
        "values": []
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "화면과 보조 기술에 전달하는 이름입니다.",
        "values": []
      },
      {
        "name": "help",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "입력 아래의 보조 설명입니다.",
        "values": []
      },
      {
        "name": "error",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "소비 앱이 제공하는 오류 문구입니다.",
        "values": []
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "사용을 막고 비활성 상태를 표시합니다.",
        "values": []
      },
      {
        "name": "readonly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "현재 값은 보여 주고 사용자 변경을 막습니다.",
        "values": []
      },
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "필수 입력 의미와 해당 컴포넌트의 검증에 사용합니다.",
        "values": []
      },
      {
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
        "values": []
      },
      {
        "name": "modelValue",
        "type": "string|null",
        "required": false,
        "default": "null",
        "description": "소비 앱이 소유하는 현재 값입니다. update:modelValue와 연결합니다.",
        "values": []
      },
      {
        "name": "options",
        "type": "readonly SolOption[]",
        "required": false,
        "default": "[]",
        "description": "값·이름·비활성 여부로 구성된 선택지입니다.",
        "values": []
      },
      {
        "name": "loadOptions",
        "type": "SolOptionLoader",
        "required": false,
        "default": "undefined",
        "description": "로컬 또는 소비 앱의 비동기 선택지 공급 함수입니다. 취소 신호를 처리합니다.",
        "values": []
      },
      {
        "name": "debounce",
        "type": "number",
        "required": false,
        "default": "150",
        "description": "검색 요청 전 기다리는 밀리초입니다.",
        "values": []
      },
      {
        "name": "placeholder",
        "type": "string",
        "required": false,
        "default": "undefined",
        "description": "값이 없을 때의 짧은 입력 예입니다. label을 대신하지 않습니다.",
        "values": []
      }
    ],
    "events": [
      {
        "name": "update:modelValue",
        "signature": "(value: string|null)",
        "description": "소비 앱의 모델 값을 갱신합니다."
      },
      {
        "name": "change",
        "signature": "(value: string|null)",
        "description": "change 동작이 발생했을 때 전달합니다."
      },
      {
        "name": "search",
        "signature": "(query: string)",
        "description": "search 동작이 발생했을 때 전달합니다."
      },
      {
        "name": "open",
        "signature": "()",
        "description": "패널이 열린 뒤 전달합니다."
      },
      {
        "name": "close",
        "signature": "()",
        "description": "닫힌 뒤 전달합니다."
      },
      {
        "name": "invalid",
        "signature": "(message: string)",
        "description": "검증 실패 문구를 전달합니다."
      }
    ],
    "slots": [
      {
        "name": "label",
        "scope": "인자 없음",
        "description": "기본 이름 표시를 바꿉니다. 접근 가능한 이름은 유지합니다."
      },
      {
        "name": "help",
        "scope": "인자 없음",
        "description": "입력 아래의 보조 설명입니다."
      }
    ],
    "methods": [
      {
        "name": "clear",
        "signature": "() => void",
        "description": "선택값을 초기화합니다."
      },
      {
        "name": "retry",
        "signature": "() => void",
        "description": "실패한 요청을 다시 실행합니다."
      },
      {
        "name": "focus",
        "signature": "() => void",
        "description": "사용 가능한 입력 또는 실행 요소로 초점을 이동합니다."
      },
      {
        "name": "validate",
        "signature": "() => boolean",
        "description": "현재 값을 검증하고 유효 여부를 반환합니다."
      },
      {
        "name": "resetValidation",
        "signature": "() => void",
        "description": "입력값을 바꾸지 않고 로컬 검증 표시를 초기화합니다."
      }
    ],
    "types": [
      {
        "name": "SolOptionLoader",
        "source": "type SolOptionLoader=(query:string,signal:AbortSignal)=>Promise<readonly SolOption[]>;"
      },
      {
        "name": "SolOption",
        "source": "interface SolOption {value:string;label:string;description?:string;disabled?:boolean}"
      },
      {
        "name": "SRule",
        "source": "type SRule<T = unknown> = (value: T, locale: SolLocale) => boolean | string;"
      }
    ],
    "passthrough": null
  },
  {
    "name": "SCheckbox",
    "id": "scheckbox",
    "group": "입력",
    "description": "서로 독립적인 여러 조건을 켜고 끕니다.",
    "exampleRoute": "component",
    "example": "choices",
    "source": "packages/vue-ui/src/controls.ts",
    "props": [
      {
        "name": "rules",
        "type": "readonly SRule<any>[]",
        "required": false,
        "default": "[]",
        "description": "순서대로 실행할 공통 검증 규칙입니다. true·false 또는 오류 문구를 반환합니다.",
        "values": []
      },
      {
        "name": "errorMessages",
        "type": "string | readonly string[]",
        "required": false,
        "default": "''",
        "description": "외부에서 제공하는 오류 문구입니다.",
        "values": []
      },
      {
        "name": "serverError",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "서버 응답 오류입니다. 로컬 규칙 오류와 구분하여 소비 앱에서 갱신합니다.",
        "values": []
      },
      {
        "name": "id",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "입력·제목·패널의 접근성 연결에 사용하는 고유 ID입니다.",
        "values": []
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "화면과 보조 기술에 전달하는 이름입니다.",
        "values": []
      },
      {
        "name": "help",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "입력 아래의 보조 설명입니다.",
        "values": []
      },
      {
        "name": "error",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "소비 앱이 제공하는 오류 문구입니다.",
        "values": []
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "사용을 막고 비활성 상태를 표시합니다.",
        "values": []
      },
      {
        "name": "readonly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "현재 값은 보여 주고 사용자 변경을 막습니다.",
        "values": []
      },
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "필수 입력 의미와 해당 컴포넌트의 검증에 사용합니다.",
        "values": []
      },
      {
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
        "values": []
      },
      {
        "name": "modelValue",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "소비 앱이 소유하는 현재 값입니다. update:modelValue와 연결합니다.",
        "values": []
      }
    ],
    "events": [
      {
        "name": "update:modelValue",
        "signature": "(v: boolean)",
        "description": "소비 앱의 모델 값을 갱신합니다."
      },
      {
        "name": "change",
        "signature": "(v: boolean)",
        "description": "change 동작이 발생했을 때 전달합니다."
      },
      {
        "name": "blur",
        "signature": "(e: FocusEvent)",
        "description": "blur 동작이 발생했을 때 전달합니다."
      }
    ],
    "slots": [
      {
        "name": "label",
        "scope": "인자 없음",
        "description": "기본 이름 표시를 바꿉니다. 접근 가능한 이름은 유지합니다."
      },
      {
        "name": "help",
        "scope": "인자 없음",
        "description": "입력 아래의 보조 설명입니다."
      }
    ],
    "methods": [
      {
        "name": "focus",
        "signature": "() => void",
        "description": "사용 가능한 입력 또는 실행 요소로 초점을 이동합니다."
      },
      {
        "name": "validate",
        "signature": "() => boolean",
        "description": "현재 값을 검증하고 유효 여부를 반환합니다."
      },
      {
        "name": "resetValidation",
        "signature": "() => void",
        "description": "입력값을 바꾸지 않고 로컬 검증 표시를 초기화합니다."
      }
    ],
    "types": [
      {
        "name": "SRule",
        "source": "type SRule<T = unknown> = (value: T, locale: SolLocale) => boolean | string;"
      }
    ],
    "passthrough": null
  },
  {
    "name": "SDatePicker",
    "id": "sdate-picker",
    "group": "입력",
    "description": "한 입력창에서 단일 날짜 또는 기간을 선택합니다.",
    "exampleRoute": "pattern",
    "example": "date",
    "source": "packages/vue-ui/src/date-time.ts",
    "props": [
      {
        "name": "rules",
        "type": "readonly SRule<any>[]",
        "required": false,
        "default": "[]",
        "description": "순서대로 실행할 공통 검증 규칙입니다. true·false 또는 오류 문구를 반환합니다.",
        "values": []
      },
      {
        "name": "errorMessages",
        "type": "string | readonly string[]",
        "required": false,
        "default": "''",
        "description": "외부에서 제공하는 오류 문구입니다.",
        "values": []
      },
      {
        "name": "serverError",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "서버 응답 오류입니다. 로컬 규칙 오류와 구분하여 소비 앱에서 갱신합니다.",
        "values": []
      },
      {
        "name": "id",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "입력·제목·패널의 접근성 연결에 사용하는 고유 ID입니다.",
        "values": []
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "화면과 보조 기술에 전달하는 이름입니다.",
        "values": []
      },
      {
        "name": "help",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "입력 아래의 보조 설명입니다.",
        "values": []
      },
      {
        "name": "error",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "소비 앱이 제공하는 오류 문구입니다.",
        "values": []
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "사용을 막고 비활성 상태를 표시합니다.",
        "values": []
      },
      {
        "name": "readonly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "현재 값은 보여 주고 사용자 변경을 막습니다.",
        "values": []
      },
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "필수 입력 의미와 해당 컴포넌트의 검증에 사용합니다.",
        "values": []
      },
      {
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
        "values": []
      },
      {
        "name": "mode",
        "type": "DateMode",
        "required": false,
        "default": "'single'",
        "description": "단일 날짜 또는 시작·종료 기간을 선택합니다.",
        "values": [
          "single",
          "range"
        ]
      },
      {
        "name": "modelValue",
        "type": "DateValue",
        "required": false,
        "default": "null",
        "description": "소비 앱이 소유하는 현재 값입니다. update:modelValue와 연결합니다.",
        "values": []
      }
    ],
    "events": [
      {
        "name": "update:modelValue",
        "signature": "(v: DateValue)",
        "description": "소비 앱의 모델 값을 갱신합니다."
      },
      {
        "name": "change",
        "signature": "(v: DateChange)",
        "description": "change 동작이 발생했을 때 전달합니다."
      },
      {
        "name": "invalid",
        "signature": "(v: string)",
        "description": "검증 실패 문구를 전달합니다."
      },
      {
        "name": "open",
        "signature": "()",
        "description": "패널이 열린 뒤 전달합니다."
      },
      {
        "name": "close",
        "signature": "(why: PickerCloseReason)",
        "description": "닫힌 이유를 전달합니다."
      }
    ],
    "slots": [
      {
        "name": "label",
        "scope": "인자 없음",
        "description": "기본 이름 표시를 바꿉니다. 접근 가능한 이름은 유지합니다."
      },
      {
        "name": "help",
        "scope": "인자 없음",
        "description": "입력 아래의 보조 설명입니다."
      }
    ],
    "methods": [
      {
        "name": "clear",
        "signature": "() => void",
        "description": "선택값을 초기화합니다."
      },
      {
        "name": "focus",
        "signature": "() => void",
        "description": "사용 가능한 입력 또는 실행 요소로 초점을 이동합니다."
      },
      {
        "name": "validate",
        "signature": "() => boolean",
        "description": "현재 값을 검증하고 유효 여부를 반환합니다."
      },
      {
        "name": "resetValidation",
        "signature": "() => void",
        "description": "입력값을 바꾸지 않고 로컬 검증 표시를 초기화합니다."
      }
    ],
    "types": [
      {
        "name": "PickerCloseReason",
        "source": "type PickerCloseReason='close'|'escape'|'outside'|'select'|'disabled'|'mode';"
      },
      {
        "name": "DateChange",
        "source": "interface DateChange {mode:DateMode;value:DateValue;reason:'input'|'calendar'|'clear'|'mode'}"
      },
      {
        "name": "DateMode",
        "source": "type DateMode='single'|'range';"
      },
      {
        "name": "DateValue",
        "source": "type DateValue=string|DateRange|null;"
      },
      {
        "name": "DateRange",
        "source": "interface DateRange {start:string;end:string}"
      },
      {
        "name": "SRule",
        "source": "type SRule<T = unknown> = (value: T, locale: SolLocale) => boolean | string;"
      }
    ],
    "passthrough": null
  },
  {
    "name": "SFileInput",
    "id": "sfile-input",
    "group": "입력",
    "description": "브라우저 안에서만 파일을 선택·드롭·제거합니다.",
    "exampleRoute": "pattern",
    "example": "files",
    "source": "packages/vue-ui/src/files.ts",
    "props": [
      {
        "name": "rules",
        "type": "readonly SRule<any>[]",
        "required": false,
        "default": "[]",
        "description": "순서대로 실행할 공통 검증 규칙입니다. true·false 또는 오류 문구를 반환합니다.",
        "values": []
      },
      {
        "name": "errorMessages",
        "type": "string | readonly string[]",
        "required": false,
        "default": "''",
        "description": "외부에서 제공하는 오류 문구입니다.",
        "values": []
      },
      {
        "name": "serverError",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "서버 응답 오류입니다. 로컬 규칙 오류와 구분하여 소비 앱에서 갱신합니다.",
        "values": []
      },
      {
        "name": "id",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "입력·제목·패널의 접근성 연결에 사용하는 고유 ID입니다.",
        "values": []
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "화면과 보조 기술에 전달하는 이름입니다.",
        "values": []
      },
      {
        "name": "help",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "입력 아래의 보조 설명입니다.",
        "values": []
      },
      {
        "name": "error",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "소비 앱이 제공하는 오류 문구입니다.",
        "values": []
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "사용을 막고 비활성 상태를 표시합니다.",
        "values": []
      },
      {
        "name": "readonly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "현재 값은 보여 주고 사용자 변경을 막습니다.",
        "values": []
      },
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "필수 입력 의미와 해당 컴포넌트의 검증에 사용합니다.",
        "values": []
      },
      {
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
        "values": []
      },
      {
        "name": "modelValue",
        "type": "readonly File[]",
        "required": false,
        "default": "[]",
        "description": "소비 앱이 소유하는 현재 값입니다. update:modelValue와 연결합니다.",
        "values": []
      },
      {
        "name": "accept",
        "type": "string",
        "required": false,
        "default": "'.txt,.png,.jpg,.jpeg,.pdf'",
        "description": "허용하는 파일 확장자 또는 MIME 형식입니다.",
        "values": []
      },
      {
        "name": "maxFiles",
        "type": "number",
        "required": false,
        "default": "3",
        "description": "선택 가능한 최대 파일 수입니다.",
        "values": []
      },
      {
        "name": "maxFileSize",
        "type": "number",
        "required": false,
        "default": "2*1024*1024",
        "description": "파일 하나에 허용하는 최대 바이트 수입니다. 기본 2 × 1024 × 1024바이트(2 MiB)입니다.",
        "values": []
      },
      {
        "name": "drop",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "파일 드래그·드롭 영역을 활성화합니다. 선택 버튼은 별도로 유지합니다.",
        "values": []
      }
    ],
    "events": [
      {
        "name": "update:modelValue",
        "signature": "(files: File[])",
        "description": "소비 앱의 모델 값을 갱신합니다."
      },
      {
        "name": "change",
        "signature": "(files: File[])",
        "description": "change 동작이 발생했을 때 전달합니다."
      },
      {
        "name": "reject",
        "signature": "(items: SFileRejection[])",
        "description": "reject 동작이 발생했을 때 전달합니다."
      },
      {
        "name": "remove",
        "signature": "(file: File)",
        "description": "remove 동작이 발생했을 때 전달합니다."
      },
      {
        "name": "invalid",
        "signature": "(message: string)",
        "description": "검증 실패 문구를 전달합니다."
      }
    ],
    "slots": [
      {
        "name": "label",
        "scope": "인자 없음",
        "description": "기본 이름 표시를 바꿉니다. 접근 가능한 이름은 유지합니다."
      },
      {
        "name": "help",
        "scope": "인자 없음",
        "description": "입력 아래의 보조 설명입니다."
      }
    ],
    "methods": [
      {
        "name": "clear",
        "signature": "() => void",
        "description": "선택값을 초기화합니다."
      },
      {
        "name": "focus",
        "signature": "() => void",
        "description": "사용 가능한 입력 또는 실행 요소로 초점을 이동합니다."
      },
      {
        "name": "validate",
        "signature": "() => boolean",
        "description": "현재 값을 검증하고 유효 여부를 반환합니다."
      },
      {
        "name": "resetValidation",
        "signature": "() => void",
        "description": "입력값을 바꾸지 않고 로컬 검증 표시를 초기화합니다."
      }
    ],
    "types": [
      {
        "name": "SFileRejection",
        "source": "interface SFileRejection {file:File;code:SFileRejectionCode;message:string}"
      },
      {
        "name": "SFileRejectionCode",
        "source": "type SFileRejectionCode='type'|'size'|'count'|'duplicate';"
      },
      {
        "name": "SRule",
        "source": "type SRule<T = unknown> = (value: T, locale: SolLocale) => boolean | string;"
      }
    ],
    "passthrough": null
  },
  {
    "name": "SForm",
    "id": "sform",
    "group": "입력",
    "description": "폼 검증 결과와 필드 초점을 모아 처리합니다.",
    "exampleRoute": "pattern",
    "example": "form",
    "source": "packages/vue-ui/src/form.ts",
    "props": [
      {
        "name": "modelValue",
        "type": "boolean | null",
        "required": false,
        "default": "null",
        "description": "소비 앱이 소유하는 현재 값입니다. update:modelValue와 연결합니다.",
        "values": []
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "사용을 막고 비활성 상태를 표시합니다.",
        "values": []
      },
      {
        "name": "readonly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "현재 값은 보여 주고 사용자 변경을 막습니다.",
        "values": []
      },
      {
        "name": "fastFail",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "폼 검증에서 첫 오류가 발생하면 뒤의 자체 필드 검사를 중단합니다.",
        "values": []
      }
    ],
    "events": [
      {
        "name": "update:modelValue",
        "signature": "(value: boolean | null)",
        "description": "소비 앱의 모델 값을 갱신합니다."
      },
      {
        "name": "submit",
        "signature": "(event: SFormSubmitEvent)",
        "description": "submit 동작이 발생했을 때 전달합니다."
      }
    ],
    "slots": [
      {
        "name": "default",
        "scope": "{ validate: () => Promise<SFormResult>; resetValidation: () => void; focus: () => void; errors: { id: string; label: string; errorMessages: string[]; }[]; isValid: boolean | null; isValidating: boolean; }",
        "description": "폼 상태와 작업을 받습니다: {validate, resetValidation, focus, errors, isValid, isValidating}. validate는 Promise<SFormResult>를 반환합니다."
      }
    ],
    "methods": [
      {
        "name": "validate",
        "signature": "() => Promise<SFormResult>",
        "description": "현재 값을 검증하고 유효 여부를 반환합니다."
      },
      {
        "name": "resetValidation",
        "signature": "() => void",
        "description": "입력값을 바꾸지 않고 로컬 검증 표시를 초기화합니다."
      },
      {
        "name": "focus",
        "signature": "() => void",
        "description": "사용 가능한 입력 또는 실행 요소로 초점을 이동합니다."
      }
    ],
    "types": [
      {
        "name": "SFormResult",
        "source": "interface SFormResult {valid: boolean; errors: SFormError[]; cancelled?: boolean}"
      },
      {
        "name": "SFormError",
        "source": "interface SFormError {id: string; label: string; errorMessages: string[]}"
      },
      {
        "name": "SFormSubmitEvent",
        "source": "type SFormSubmitEvent = SubmitEvent & Promise<SFormResult>;"
      }
    ],
    "passthrough": null
  },
  {
    "name": "SMultiSelect",
    "id": "smulti-select",
    "group": "입력",
    "description": "검색과 태그 제거를 함께 사용하는 다중 선택입니다.",
    "exampleRoute": "component",
    "example": "advanced-inputs",
    "source": "packages/vue-ui/src/selection.ts",
    "props": [
      {
        "name": "rules",
        "type": "readonly SRule<any>[]",
        "required": false,
        "default": "[]",
        "description": "순서대로 실행할 공통 검증 규칙입니다. true·false 또는 오류 문구를 반환합니다.",
        "values": []
      },
      {
        "name": "errorMessages",
        "type": "string | readonly string[]",
        "required": false,
        "default": "''",
        "description": "외부에서 제공하는 오류 문구입니다.",
        "values": []
      },
      {
        "name": "serverError",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "서버 응답 오류입니다. 로컬 규칙 오류와 구분하여 소비 앱에서 갱신합니다.",
        "values": []
      },
      {
        "name": "id",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "입력·제목·패널의 접근성 연결에 사용하는 고유 ID입니다.",
        "values": []
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "화면과 보조 기술에 전달하는 이름입니다.",
        "values": []
      },
      {
        "name": "help",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "입력 아래의 보조 설명입니다.",
        "values": []
      },
      {
        "name": "error",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "소비 앱이 제공하는 오류 문구입니다.",
        "values": []
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "사용을 막고 비활성 상태를 표시합니다.",
        "values": []
      },
      {
        "name": "readonly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "현재 값은 보여 주고 사용자 변경을 막습니다.",
        "values": []
      },
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "필수 입력 의미와 해당 컴포넌트의 검증에 사용합니다.",
        "values": []
      },
      {
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
        "values": []
      },
      {
        "name": "modelValue",
        "type": "readonly string[]",
        "required": false,
        "default": "[]",
        "description": "소비 앱이 소유하는 현재 값입니다. update:modelValue와 연결합니다.",
        "values": []
      },
      {
        "name": "options",
        "type": "readonly SolOption[]",
        "required": false,
        "default": "[]",
        "description": "값·이름·비활성 여부로 구성된 선택지입니다.",
        "values": []
      },
      {
        "name": "loadOptions",
        "type": "SolOptionLoader",
        "required": false,
        "default": "undefined",
        "description": "로컬 또는 소비 앱의 비동기 선택지 공급 함수입니다. 취소 신호를 처리합니다.",
        "values": []
      },
      {
        "name": "maxSelected",
        "type": "number",
        "required": false,
        "default": "undefined",
        "description": "선택 가능한 최대 항목 수입니다.",
        "values": []
      },
      {
        "name": "placeholder",
        "type": "string",
        "required": false,
        "default": "undefined",
        "description": "값이 없을 때의 짧은 입력 예입니다. label을 대신하지 않습니다.",
        "values": []
      },
      {
        "name": "debounce",
        "type": "number",
        "required": false,
        "default": "150",
        "description": "검색 요청 전 기다리는 밀리초입니다.",
        "values": []
      }
    ],
    "events": [
      {
        "name": "update:modelValue",
        "signature": "(v: string[])",
        "description": "소비 앱의 모델 값을 갱신합니다."
      },
      {
        "name": "change",
        "signature": "(v: string[])",
        "description": "change 동작이 발생했을 때 전달합니다."
      },
      {
        "name": "search",
        "signature": "(q: string)",
        "description": "search 동작이 발생했을 때 전달합니다."
      },
      {
        "name": "open",
        "signature": "()",
        "description": "패널이 열린 뒤 전달합니다."
      },
      {
        "name": "close",
        "signature": "()",
        "description": "닫힌 뒤 전달합니다."
      },
      {
        "name": "invalid",
        "signature": "(m: string)",
        "description": "검증 실패 문구를 전달합니다."
      }
    ],
    "slots": [
      {
        "name": "label",
        "scope": "인자 없음",
        "description": "기본 이름 표시를 바꿉니다. 접근 가능한 이름은 유지합니다."
      },
      {
        "name": "help",
        "scope": "인자 없음",
        "description": "입력 아래의 보조 설명입니다."
      }
    ],
    "methods": [
      {
        "name": "clear",
        "signature": "() => void",
        "description": "선택값을 초기화합니다."
      },
      {
        "name": "focus",
        "signature": "() => void",
        "description": "사용 가능한 입력 또는 실행 요소로 초점을 이동합니다."
      },
      {
        "name": "validate",
        "signature": "() => boolean",
        "description": "현재 값을 검증하고 유효 여부를 반환합니다."
      },
      {
        "name": "resetValidation",
        "signature": "() => void",
        "description": "입력값을 바꾸지 않고 로컬 검증 표시를 초기화합니다."
      }
    ],
    "types": [
      {
        "name": "SolOptionLoader",
        "source": "type SolOptionLoader=(query:string,signal:AbortSignal)=>Promise<readonly SolOption[]>;"
      },
      {
        "name": "SolOption",
        "source": "interface SolOption {value:string;label:string;description?:string;disabled?:boolean}"
      },
      {
        "name": "SRule",
        "source": "type SRule<T = unknown> = (value: T, locale: SolLocale) => boolean | string;"
      }
    ],
    "passthrough": null
  },
  {
    "name": "SNumberInput",
    "id": "snumber-input",
    "group": "입력",
    "description": "최소·최대·간격이 있는 수치를 입력합니다.",
    "exampleRoute": "component",
    "example": "advanced-inputs",
    "source": "packages/vue-ui/src/controls.ts",
    "props": [
      {
        "name": "rules",
        "type": "readonly SRule<any>[]",
        "required": false,
        "default": "[]",
        "description": "순서대로 실행할 공통 검증 규칙입니다. true·false 또는 오류 문구를 반환합니다.",
        "values": []
      },
      {
        "name": "errorMessages",
        "type": "string | readonly string[]",
        "required": false,
        "default": "''",
        "description": "외부에서 제공하는 오류 문구입니다.",
        "values": []
      },
      {
        "name": "serverError",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "서버 응답 오류입니다. 로컬 규칙 오류와 구분하여 소비 앱에서 갱신합니다.",
        "values": []
      },
      {
        "name": "id",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "입력·제목·패널의 접근성 연결에 사용하는 고유 ID입니다.",
        "values": []
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "화면과 보조 기술에 전달하는 이름입니다.",
        "values": []
      },
      {
        "name": "help",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "입력 아래의 보조 설명입니다.",
        "values": []
      },
      {
        "name": "error",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "소비 앱이 제공하는 오류 문구입니다.",
        "values": []
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "사용을 막고 비활성 상태를 표시합니다.",
        "values": []
      },
      {
        "name": "readonly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "현재 값은 보여 주고 사용자 변경을 막습니다.",
        "values": []
      },
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "필수 입력 의미와 해당 컴포넌트의 검증에 사용합니다.",
        "values": []
      },
      {
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
        "values": []
      },
      {
        "name": "modelValue",
        "type": "number|null",
        "required": false,
        "default": "null",
        "description": "소비 앱이 소유하는 현재 값입니다. update:modelValue와 연결합니다.",
        "values": []
      },
      {
        "name": "min",
        "type": "number",
        "required": false,
        "default": "undefined",
        "description": "허용하는 최소값입니다.",
        "values": []
      },
      {
        "name": "max",
        "type": "number",
        "required": false,
        "default": "undefined",
        "description": "허용하는 최대값입니다.",
        "values": []
      },
      {
        "name": "step",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "값이 증가하거나 선택되는 간격입니다.",
        "values": []
      }
    ],
    "events": [
      {
        "name": "update:modelValue",
        "signature": "(v: number|null)",
        "description": "소비 앱의 모델 값을 갱신합니다."
      },
      {
        "name": "change",
        "signature": "(v: number|null)",
        "description": "change 동작이 발생했을 때 전달합니다."
      },
      {
        "name": "invalid",
        "signature": "(v: string)",
        "description": "검증 실패 문구를 전달합니다."
      },
      {
        "name": "blur",
        "signature": "(e: FocusEvent)",
        "description": "blur 동작이 발생했을 때 전달합니다."
      }
    ],
    "slots": [
      {
        "name": "label",
        "scope": "인자 없음",
        "description": "기본 이름 표시를 바꿉니다. 접근 가능한 이름은 유지합니다."
      },
      {
        "name": "help",
        "scope": "인자 없음",
        "description": "입력 아래의 보조 설명입니다."
      }
    ],
    "methods": [
      {
        "name": "focus",
        "signature": "() => void",
        "description": "사용 가능한 입력 또는 실행 요소로 초점을 이동합니다."
      },
      {
        "name": "validate",
        "signature": "() => boolean",
        "description": "현재 값을 검증하고 유효 여부를 반환합니다."
      },
      {
        "name": "resetValidation",
        "signature": "() => void",
        "description": "입력값을 바꾸지 않고 로컬 검증 표시를 초기화합니다."
      }
    ],
    "types": [
      {
        "name": "SRule",
        "source": "type SRule<T = unknown> = (value: T, locale: SolLocale) => boolean | string;"
      }
    ],
    "passthrough": null
  },
  {
    "name": "SRadioGroup",
    "id": "sradio-group",
    "group": "입력",
    "description": "서로 배타적인 선택지에서 하나를 고릅니다.",
    "exampleRoute": "component",
    "example": "selection",
    "source": "packages/vue-ui/src/controls.ts",
    "props": [
      {
        "name": "rules",
        "type": "readonly SRule<any>[]",
        "required": false,
        "default": "[]",
        "description": "순서대로 실행할 공통 검증 규칙입니다. true·false 또는 오류 문구를 반환합니다.",
        "values": []
      },
      {
        "name": "errorMessages",
        "type": "string | readonly string[]",
        "required": false,
        "default": "''",
        "description": "외부에서 제공하는 오류 문구입니다.",
        "values": []
      },
      {
        "name": "serverError",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "서버 응답 오류입니다. 로컬 규칙 오류와 구분하여 소비 앱에서 갱신합니다.",
        "values": []
      },
      {
        "name": "id",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "입력·제목·패널의 접근성 연결에 사용하는 고유 ID입니다.",
        "values": []
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "화면과 보조 기술에 전달하는 이름입니다.",
        "values": []
      },
      {
        "name": "help",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "입력 아래의 보조 설명입니다.",
        "values": []
      },
      {
        "name": "error",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "소비 앱이 제공하는 오류 문구입니다.",
        "values": []
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "사용을 막고 비활성 상태를 표시합니다.",
        "values": []
      },
      {
        "name": "readonly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "현재 값은 보여 주고 사용자 변경을 막습니다.",
        "values": []
      },
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "필수 입력 의미와 해당 컴포넌트의 검증에 사용합니다.",
        "values": []
      },
      {
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
        "values": []
      },
      {
        "name": "modelValue",
        "type": "string|null",
        "required": false,
        "default": "null",
        "description": "소비 앱이 소유하는 현재 값입니다. update:modelValue와 연결합니다.",
        "values": []
      },
      {
        "name": "options",
        "type": "readonly SolOption[]",
        "required": true,
        "default": "undefined",
        "description": "값·이름·비활성 여부로 구성된 선택지입니다.",
        "values": []
      },
      {
        "name": "layout",
        "type": "'list'|'cards'",
        "required": false,
        "default": "'list'",
        "description": "목록 또는 카드 표시 방식입니다.",
        "values": [
          "list",
          "cards"
        ]
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "default": "undefined",
        "description": "라디오 입력 등에서 공유하는 HTML 이름입니다.",
        "values": []
      }
    ],
    "events": [
      {
        "name": "update:modelValue",
        "signature": "(v: string)",
        "description": "소비 앱의 모델 값을 갱신합니다."
      },
      {
        "name": "change",
        "signature": "(v: string)",
        "description": "change 동작이 발생했을 때 전달합니다."
      }
    ],
    "slots": [
      {
        "name": "label",
        "scope": "인자 없음",
        "description": "기본 이름 표시를 바꿉니다. 접근 가능한 이름은 유지합니다."
      },
      {
        "name": "help",
        "scope": "인자 없음",
        "description": "입력 아래의 보조 설명입니다."
      }
    ],
    "methods": [
      {
        "name": "focus",
        "signature": "() => void",
        "description": "사용 가능한 입력 또는 실행 요소로 초점을 이동합니다."
      },
      {
        "name": "validate",
        "signature": "() => boolean",
        "description": "현재 값을 검증하고 유효 여부를 반환합니다."
      },
      {
        "name": "resetValidation",
        "signature": "() => void",
        "description": "입력값을 바꾸지 않고 로컬 검증 표시를 초기화합니다."
      }
    ],
    "types": [
      {
        "name": "SolOption",
        "source": "interface SolOption {value:string;label:string;description?:string;disabled?:boolean}"
      },
      {
        "name": "SRule",
        "source": "type SRule<T = unknown> = (value: T, locale: SolLocale) => boolean | string;"
      }
    ],
    "passthrough": null
  },
  {
    "name": "SRangeSlider",
    "id": "srange-slider",
    "group": "입력",
    "description": "최소·최대 범위의 양 끝값을 조절합니다.",
    "exampleRoute": "start",
    "example": "advanced-vue",
    "source": "packages/vue-ui/src/selection.ts",
    "props": [
      {
        "name": "rules",
        "type": "readonly SRule<any>[]",
        "required": false,
        "default": "[]",
        "description": "순서대로 실행할 공통 검증 규칙입니다. true·false 또는 오류 문구를 반환합니다.",
        "values": []
      },
      {
        "name": "errorMessages",
        "type": "string | readonly string[]",
        "required": false,
        "default": "''",
        "description": "외부에서 제공하는 오류 문구입니다.",
        "values": []
      },
      {
        "name": "serverError",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "서버 응답 오류입니다. 로컬 규칙 오류와 구분하여 소비 앱에서 갱신합니다.",
        "values": []
      },
      {
        "name": "id",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "입력·제목·패널의 접근성 연결에 사용하는 고유 ID입니다.",
        "values": []
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "화면과 보조 기술에 전달하는 이름입니다.",
        "values": []
      },
      {
        "name": "help",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "입력 아래의 보조 설명입니다.",
        "values": []
      },
      {
        "name": "error",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "소비 앱이 제공하는 오류 문구입니다.",
        "values": []
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "사용을 막고 비활성 상태를 표시합니다.",
        "values": []
      },
      {
        "name": "readonly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "현재 값은 보여 주고 사용자 변경을 막습니다.",
        "values": []
      },
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "필수 입력 의미와 해당 컴포넌트의 검증에 사용합니다.",
        "values": []
      },
      {
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
        "values": []
      },
      {
        "name": "modelValue",
        "type": "SolRangeValue",
        "required": true,
        "default": "undefined",
        "description": "소비 앱이 소유하는 현재 값입니다. update:modelValue와 연결합니다.",
        "values": []
      },
      {
        "name": "min",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "허용하는 최소값입니다.",
        "values": []
      },
      {
        "name": "max",
        "type": "number",
        "required": false,
        "default": "100",
        "description": "허용하는 최대값입니다.",
        "values": []
      },
      {
        "name": "step",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "값이 증가하거나 선택되는 간격입니다.",
        "values": []
      },
      {
        "name": "lowerLabel",
        "type": "string",
        "required": false,
        "default": "undefined",
        "description": "범위의 아래쪽 핸들을 구분하는 이름입니다.",
        "values": []
      },
      {
        "name": "upperLabel",
        "type": "string",
        "required": false,
        "default": "undefined",
        "description": "범위의 위쪽 핸들을 구분하는 이름입니다.",
        "values": []
      },
      {
        "name": "formatValue",
        "type": "(value:number)=>string",
        "required": false,
        "default": "undefined",
        "description": "숫자 하나를 받아 화면·접근성 값 표시용 문자열을 반환하는 함수입니다. 모델 값은 숫자로 유지합니다.",
        "values": []
      }
    ],
    "events": [
      {
        "name": "update:modelValue",
        "signature": "(v: [number,number])",
        "description": "소비 앱의 모델 값을 갱신합니다."
      },
      {
        "name": "change",
        "signature": "(v: [number,number])",
        "description": "change 동작이 발생했을 때 전달합니다."
      }
    ],
    "slots": [
      {
        "name": "label",
        "scope": "인자 없음",
        "description": "기본 이름 표시를 바꿉니다. 접근 가능한 이름은 유지합니다."
      },
      {
        "name": "help",
        "scope": "인자 없음",
        "description": "입력 아래의 보조 설명입니다."
      }
    ],
    "methods": [
      {
        "name": "focus",
        "signature": "() => void",
        "description": "사용 가능한 입력 또는 실행 요소로 초점을 이동합니다."
      },
      {
        "name": "validate",
        "signature": "() => boolean",
        "description": "현재 값을 검증하고 유효 여부를 반환합니다."
      },
      {
        "name": "resetValidation",
        "signature": "() => void",
        "description": "입력값을 바꾸지 않고 로컬 검증 표시를 초기화합니다."
      }
    ],
    "types": [
      {
        "name": "SolRangeValue",
        "source": "type SolRangeValue=readonly [number,number];"
      },
      {
        "name": "SRule",
        "source": "type SRule<T = unknown> = (value: T, locale: SolLocale) => boolean | string;"
      }
    ],
    "passthrough": null
  },
  {
    "name": "SSegmentedControl",
    "id": "ssegmented-control",
    "group": "입력",
    "description": "짧은 단일 선택지를 이어진 컨트롤로 표시합니다.",
    "exampleRoute": "start",
    "example": "advanced-vue",
    "source": "packages/vue-ui/src/selection.ts",
    "props": [
      {
        "name": "rules",
        "type": "readonly SRule<any>[]",
        "required": false,
        "default": "[]",
        "description": "순서대로 실행할 공통 검증 규칙입니다. true·false 또는 오류 문구를 반환합니다.",
        "values": []
      },
      {
        "name": "errorMessages",
        "type": "string | readonly string[]",
        "required": false,
        "default": "''",
        "description": "외부에서 제공하는 오류 문구입니다.",
        "values": []
      },
      {
        "name": "serverError",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "서버 응답 오류입니다. 로컬 규칙 오류와 구분하여 소비 앱에서 갱신합니다.",
        "values": []
      },
      {
        "name": "id",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "입력·제목·패널의 접근성 연결에 사용하는 고유 ID입니다.",
        "values": []
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "화면과 보조 기술에 전달하는 이름입니다.",
        "values": []
      },
      {
        "name": "help",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "입력 아래의 보조 설명입니다.",
        "values": []
      },
      {
        "name": "error",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "소비 앱이 제공하는 오류 문구입니다.",
        "values": []
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "사용을 막고 비활성 상태를 표시합니다.",
        "values": []
      },
      {
        "name": "readonly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "현재 값은 보여 주고 사용자 변경을 막습니다.",
        "values": []
      },
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "필수 입력 의미와 해당 컴포넌트의 검증에 사용합니다.",
        "values": []
      },
      {
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
        "values": []
      },
      {
        "name": "modelValue",
        "type": "string|null",
        "required": false,
        "default": "null",
        "description": "소비 앱이 소유하는 현재 값입니다. update:modelValue와 연결합니다.",
        "values": []
      },
      {
        "name": "options",
        "type": "readonly SolOption[]",
        "required": true,
        "default": "undefined",
        "description": "값·이름·비활성 여부로 구성된 선택지입니다.",
        "values": []
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "default": "undefined",
        "description": "라디오 입력 등에서 공유하는 HTML 이름입니다.",
        "values": []
      }
    ],
    "events": [
      {
        "name": "update:modelValue",
        "signature": "(v: string)",
        "description": "소비 앱의 모델 값을 갱신합니다."
      },
      {
        "name": "change",
        "signature": "(v: string)",
        "description": "change 동작이 발생했을 때 전달합니다."
      }
    ],
    "slots": [
      {
        "name": "label",
        "scope": "인자 없음",
        "description": "기본 이름 표시를 바꿉니다. 접근 가능한 이름은 유지합니다."
      },
      {
        "name": "help",
        "scope": "인자 없음",
        "description": "입력 아래의 보조 설명입니다."
      }
    ],
    "methods": [
      {
        "name": "focus",
        "signature": "() => void",
        "description": "사용 가능한 입력 또는 실행 요소로 초점을 이동합니다."
      },
      {
        "name": "validate",
        "signature": "() => boolean",
        "description": "현재 값을 검증하고 유효 여부를 반환합니다."
      },
      {
        "name": "resetValidation",
        "signature": "() => void",
        "description": "입력값을 바꾸지 않고 로컬 검증 표시를 초기화합니다."
      }
    ],
    "types": [
      {
        "name": "SolOption",
        "source": "interface SolOption {value:string;label:string;description?:string;disabled?:boolean}"
      },
      {
        "name": "SRule",
        "source": "type SRule<T = unknown> = (value: T, locale: SolLocale) => boolean | string;"
      }
    ],
    "passthrough": null
  },
  {
    "name": "SSelect",
    "id": "sselect",
    "group": "입력",
    "description": "정해진 항목 가운데 하나를 선택합니다.",
    "exampleRoute": "component",
    "example": "choices",
    "source": "packages/vue-ui/src/controls.ts",
    "props": [
      {
        "name": "rules",
        "type": "readonly SRule<any>[]",
        "required": false,
        "default": "[]",
        "description": "순서대로 실행할 공통 검증 규칙입니다. true·false 또는 오류 문구를 반환합니다.",
        "values": []
      },
      {
        "name": "errorMessages",
        "type": "string | readonly string[]",
        "required": false,
        "default": "''",
        "description": "외부에서 제공하는 오류 문구입니다.",
        "values": []
      },
      {
        "name": "serverError",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "서버 응답 오류입니다. 로컬 규칙 오류와 구분하여 소비 앱에서 갱신합니다.",
        "values": []
      },
      {
        "name": "id",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "입력·제목·패널의 접근성 연결에 사용하는 고유 ID입니다.",
        "values": []
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "화면과 보조 기술에 전달하는 이름입니다.",
        "values": []
      },
      {
        "name": "help",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "입력 아래의 보조 설명입니다.",
        "values": []
      },
      {
        "name": "error",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "소비 앱이 제공하는 오류 문구입니다.",
        "values": []
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "사용을 막고 비활성 상태를 표시합니다.",
        "values": []
      },
      {
        "name": "readonly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "현재 값은 보여 주고 사용자 변경을 막습니다.",
        "values": []
      },
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "필수 입력 의미와 해당 컴포넌트의 검증에 사용합니다.",
        "values": []
      },
      {
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
        "values": []
      },
      {
        "name": "modelValue",
        "type": "string|null",
        "required": false,
        "default": "null",
        "description": "소비 앱이 소유하는 현재 값입니다. update:modelValue와 연결합니다.",
        "values": []
      },
      {
        "name": "options",
        "type": "readonly SolOption[]",
        "required": true,
        "default": "undefined",
        "description": "값·이름·비활성 여부로 구성된 선택지입니다.",
        "values": []
      },
      {
        "name": "placeholder",
        "type": "string",
        "required": false,
        "default": "undefined",
        "description": "값이 없을 때의 짧은 입력 예입니다. label을 대신하지 않습니다.",
        "values": []
      }
    ],
    "events": [
      {
        "name": "update:modelValue",
        "signature": "(v: string|null)",
        "description": "소비 앱의 모델 값을 갱신합니다."
      },
      {
        "name": "change",
        "signature": "(v: string|null)",
        "description": "change 동작이 발생했을 때 전달합니다."
      },
      {
        "name": "blur",
        "signature": "(e: FocusEvent)",
        "description": "blur 동작이 발생했을 때 전달합니다."
      }
    ],
    "slots": [
      {
        "name": "label",
        "scope": "인자 없음",
        "description": "기본 이름 표시를 바꿉니다. 접근 가능한 이름은 유지합니다."
      },
      {
        "name": "help",
        "scope": "인자 없음",
        "description": "입력 아래의 보조 설명입니다."
      }
    ],
    "methods": [
      {
        "name": "focus",
        "signature": "() => void",
        "description": "사용 가능한 입력 또는 실행 요소로 초점을 이동합니다."
      },
      {
        "name": "validate",
        "signature": "() => boolean",
        "description": "현재 값을 검증하고 유효 여부를 반환합니다."
      },
      {
        "name": "resetValidation",
        "signature": "() => void",
        "description": "입력값을 바꾸지 않고 로컬 검증 표시를 초기화합니다."
      }
    ],
    "types": [
      {
        "name": "SolOption",
        "source": "interface SolOption {value:string;label:string;description?:string;disabled?:boolean}"
      },
      {
        "name": "SRule",
        "source": "type SRule<T = unknown> = (value: T, locale: SolLocale) => boolean | string;"
      }
    ],
    "passthrough": null
  },
  {
    "name": "SSwitch",
    "id": "sswitch",
    "group": "입력",
    "description": "즉시 적용되는 설정을 켜고 끕니다.",
    "exampleRoute": "component",
    "example": "selection",
    "source": "packages/vue-ui/src/controls.ts",
    "props": [
      {
        "name": "rules",
        "type": "readonly SRule<any>[]",
        "required": false,
        "default": "[]",
        "description": "순서대로 실행할 공통 검증 규칙입니다. true·false 또는 오류 문구를 반환합니다.",
        "values": []
      },
      {
        "name": "errorMessages",
        "type": "string | readonly string[]",
        "required": false,
        "default": "''",
        "description": "외부에서 제공하는 오류 문구입니다.",
        "values": []
      },
      {
        "name": "serverError",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "서버 응답 오류입니다. 로컬 규칙 오류와 구분하여 소비 앱에서 갱신합니다.",
        "values": []
      },
      {
        "name": "id",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "입력·제목·패널의 접근성 연결에 사용하는 고유 ID입니다.",
        "values": []
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "화면과 보조 기술에 전달하는 이름입니다.",
        "values": []
      },
      {
        "name": "help",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "입력 아래의 보조 설명입니다.",
        "values": []
      },
      {
        "name": "error",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "소비 앱이 제공하는 오류 문구입니다.",
        "values": []
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "사용을 막고 비활성 상태를 표시합니다.",
        "values": []
      },
      {
        "name": "readonly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "현재 값은 보여 주고 사용자 변경을 막습니다.",
        "values": []
      },
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "필수 입력 의미와 해당 컴포넌트의 검증에 사용합니다.",
        "values": []
      },
      {
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
        "values": []
      },
      {
        "name": "modelValue",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "소비 앱이 소유하는 현재 값입니다. update:modelValue와 연결합니다.",
        "values": []
      }
    ],
    "events": [
      {
        "name": "update:modelValue",
        "signature": "(v: boolean)",
        "description": "소비 앱의 모델 값을 갱신합니다."
      },
      {
        "name": "change",
        "signature": "(v: boolean)",
        "description": "change 동작이 발생했을 때 전달합니다."
      }
    ],
    "slots": [
      {
        "name": "label",
        "scope": "인자 없음",
        "description": "기본 이름 표시를 바꿉니다. 접근 가능한 이름은 유지합니다."
      },
      {
        "name": "help",
        "scope": "인자 없음",
        "description": "입력 아래의 보조 설명입니다."
      }
    ],
    "methods": [
      {
        "name": "focus",
        "signature": "() => void",
        "description": "사용 가능한 입력 또는 실행 요소로 초점을 이동합니다."
      },
      {
        "name": "validate",
        "signature": "() => boolean",
        "description": "현재 값을 검증하고 유효 여부를 반환합니다."
      },
      {
        "name": "resetValidation",
        "signature": "() => void",
        "description": "입력값을 바꾸지 않고 로컬 검증 표시를 초기화합니다."
      }
    ],
    "types": [
      {
        "name": "SRule",
        "source": "type SRule<T = unknown> = (value: T, locale: SolLocale) => boolean | string;"
      }
    ],
    "passthrough": null
  },
  {
    "name": "STextarea",
    "id": "stextarea",
    "group": "입력",
    "description": "여러 줄 내용과 글자 수·도움말을 표시합니다.",
    "exampleRoute": "component",
    "example": "advanced-inputs",
    "source": "packages/vue-ui/src/controls.ts",
    "props": [
      {
        "name": "rules",
        "type": "readonly SRule<any>[]",
        "required": false,
        "default": "[]",
        "description": "순서대로 실행할 공통 검증 규칙입니다. true·false 또는 오류 문구를 반환합니다.",
        "values": []
      },
      {
        "name": "errorMessages",
        "type": "string | readonly string[]",
        "required": false,
        "default": "''",
        "description": "외부에서 제공하는 오류 문구입니다.",
        "values": []
      },
      {
        "name": "serverError",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "서버 응답 오류입니다. 로컬 규칙 오류와 구분하여 소비 앱에서 갱신합니다.",
        "values": []
      },
      {
        "name": "id",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "입력·제목·패널의 접근성 연결에 사용하는 고유 ID입니다.",
        "values": []
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "화면과 보조 기술에 전달하는 이름입니다.",
        "values": []
      },
      {
        "name": "help",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "입력 아래의 보조 설명입니다.",
        "values": []
      },
      {
        "name": "error",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "소비 앱이 제공하는 오류 문구입니다.",
        "values": []
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "사용을 막고 비활성 상태를 표시합니다.",
        "values": []
      },
      {
        "name": "readonly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "현재 값은 보여 주고 사용자 변경을 막습니다.",
        "values": []
      },
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "필수 입력 의미와 해당 컴포넌트의 검증에 사용합니다.",
        "values": []
      },
      {
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
        "values": []
      },
      {
        "name": "modelValue",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "소비 앱이 소유하는 현재 값입니다. update:modelValue와 연결합니다.",
        "values": []
      },
      {
        "name": "rows",
        "type": "number",
        "required": false,
        "default": "3",
        "description": "표 자료 또는 입력 줄 수입니다. 컴포넌트별 타입을 확인합니다.",
        "values": []
      },
      {
        "name": "maxlength",
        "type": "number",
        "required": false,
        "default": "undefined",
        "description": "입력 가능한 최대 글자 수입니다.",
        "values": []
      },
      {
        "name": "showCount",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "입력 글자 수 표시 여부입니다.",
        "values": []
      }
    ],
    "events": [
      {
        "name": "update:modelValue",
        "signature": "(v: string)",
        "description": "소비 앱의 모델 값을 갱신합니다."
      },
      {
        "name": "change",
        "signature": "(v: string)",
        "description": "change 동작이 발생했을 때 전달합니다."
      },
      {
        "name": "blur",
        "signature": "(e: FocusEvent)",
        "description": "blur 동작이 발생했을 때 전달합니다."
      }
    ],
    "slots": [
      {
        "name": "label",
        "scope": "인자 없음",
        "description": "기본 이름 표시를 바꿉니다. 접근 가능한 이름은 유지합니다."
      },
      {
        "name": "help",
        "scope": "인자 없음",
        "description": "입력 아래의 보조 설명입니다."
      }
    ],
    "methods": [
      {
        "name": "focus",
        "signature": "() => void",
        "description": "사용 가능한 입력 또는 실행 요소로 초점을 이동합니다."
      },
      {
        "name": "validate",
        "signature": "() => boolean",
        "description": "현재 값을 검증하고 유효 여부를 반환합니다."
      },
      {
        "name": "resetValidation",
        "signature": "() => void",
        "description": "입력값을 바꾸지 않고 로컬 검증 표시를 초기화합니다."
      }
    ],
    "types": [
      {
        "name": "SRule",
        "source": "type SRule<T = unknown> = (value: T, locale: SolLocale) => boolean | string;"
      }
    ],
    "passthrough": null
  },
  {
    "name": "STextField",
    "id": "stext-field",
    "group": "입력",
    "description": "레이블·도움말·오류가 연결된 한 줄 입력입니다.",
    "exampleRoute": "component",
    "example": "fields",
    "source": "packages/vue-ui/src/index.ts",
    "props": [
      {
        "name": "rules",
        "type": "readonly SRule<any>[]",
        "required": false,
        "default": "[]",
        "description": "순서대로 실행할 공통 검증 규칙입니다. true·false 또는 오류 문구를 반환합니다.",
        "values": []
      },
      {
        "name": "errorMessages",
        "type": "string | readonly string[]",
        "required": false,
        "default": "''",
        "description": "외부에서 제공하는 오류 문구입니다.",
        "values": []
      },
      {
        "name": "serverError",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "서버 응답 오류입니다. 로컬 규칙 오류와 구분하여 소비 앱에서 갱신합니다.",
        "values": []
      },
      {
        "name": "id",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "입력·제목·패널의 접근성 연결에 사용하는 고유 ID입니다.",
        "values": []
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "화면과 보조 기술에 전달하는 이름입니다.",
        "values": []
      },
      {
        "name": "help",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "입력 아래의 보조 설명입니다.",
        "values": []
      },
      {
        "name": "error",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "소비 앱이 제공하는 오류 문구입니다.",
        "values": []
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "사용을 막고 비활성 상태를 표시합니다.",
        "values": []
      },
      {
        "name": "readonly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "현재 값은 보여 주고 사용자 변경을 막습니다.",
        "values": []
      },
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "필수 입력 의미와 해당 컴포넌트의 검증에 사용합니다.",
        "values": []
      },
      {
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
        "values": []
      },
      {
        "name": "modelValue",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "소비 앱이 소유하는 현재 값입니다. update:modelValue와 연결합니다.",
        "values": []
      },
      {
        "name": "type",
        "type": "'text'|'search'|'email'|'password'|'tel'|'url'",
        "required": false,
        "default": "'text'",
        "description": "입력 또는 버튼의 HTML 유형입니다.",
        "values": [
          "text",
          "search",
          "email",
          "password",
          "tel",
          "url"
        ]
      }
    ],
    "events": [
      {
        "name": "update:modelValue",
        "signature": "(value: string)",
        "description": "소비 앱의 모델 값을 갱신합니다."
      },
      {
        "name": "blur",
        "signature": "(event: FocusEvent)",
        "description": "blur 동작이 발생했을 때 전달합니다."
      },
      {
        "name": "focus",
        "signature": "(event: FocusEvent)",
        "description": "focus 동작이 발생했을 때 전달합니다."
      }
    ],
    "slots": [
      {
        "name": "label",
        "scope": "인자 없음",
        "description": "기본 이름 표시를 바꿉니다. 접근 가능한 이름은 유지합니다."
      },
      {
        "name": "help",
        "scope": "인자 없음",
        "description": "입력 아래의 보조 설명입니다."
      }
    ],
    "methods": [
      {
        "name": "focus",
        "signature": "() => void",
        "description": "사용 가능한 입력 또는 실행 요소로 초점을 이동합니다."
      },
      {
        "name": "validate",
        "signature": "() => boolean",
        "description": "현재 값을 검증하고 유효 여부를 반환합니다."
      },
      {
        "name": "resetValidation",
        "signature": "() => void",
        "description": "입력값을 바꾸지 않고 로컬 검증 표시를 초기화합니다."
      }
    ],
    "types": [
      {
        "name": "SRule",
        "source": "type SRule<T = unknown> = (value: T, locale: SolLocale) => boolean | string;"
      }
    ],
    "passthrough": null
  },
  {
    "name": "STimePicker",
    "id": "stime-picker",
    "group": "입력",
    "description": "직접 HH:mm 입력과 작은 시·분 패널을 함께 제공합니다.",
    "exampleRoute": "component",
    "example": "time",
    "source": "packages/vue-ui/src/date-time.ts",
    "props": [
      {
        "name": "rules",
        "type": "readonly SRule<any>[]",
        "required": false,
        "default": "[]",
        "description": "순서대로 실행할 공통 검증 규칙입니다. true·false 또는 오류 문구를 반환합니다.",
        "values": []
      },
      {
        "name": "errorMessages",
        "type": "string | readonly string[]",
        "required": false,
        "default": "''",
        "description": "외부에서 제공하는 오류 문구입니다.",
        "values": []
      },
      {
        "name": "serverError",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "서버 응답 오류입니다. 로컬 규칙 오류와 구분하여 소비 앱에서 갱신합니다.",
        "values": []
      },
      {
        "name": "id",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "입력·제목·패널의 접근성 연결에 사용하는 고유 ID입니다.",
        "values": []
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "화면과 보조 기술에 전달하는 이름입니다.",
        "values": []
      },
      {
        "name": "help",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "입력 아래의 보조 설명입니다.",
        "values": []
      },
      {
        "name": "error",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "소비 앱이 제공하는 오류 문구입니다.",
        "values": []
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "사용을 막고 비활성 상태를 표시합니다.",
        "values": []
      },
      {
        "name": "readonly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "현재 값은 보여 주고 사용자 변경을 막습니다.",
        "values": []
      },
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "필수 입력 의미와 해당 컴포넌트의 검증에 사용합니다.",
        "values": []
      },
      {
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
        "values": []
      },
      {
        "name": "modelValue",
        "type": "string|null",
        "required": false,
        "default": "null",
        "description": "소비 앱이 소유하는 현재 값입니다. update:modelValue와 연결합니다.",
        "values": []
      },
      {
        "name": "min",
        "type": "string",
        "required": false,
        "default": "'00:00'",
        "description": "허용하는 최소값입니다.",
        "values": []
      },
      {
        "name": "max",
        "type": "string",
        "required": false,
        "default": "'23:59'",
        "description": "허용하는 최대값입니다.",
        "values": []
      },
      {
        "name": "step",
        "type": "number",
        "required": false,
        "default": "15",
        "description": "값이 증가하거나 선택되는 간격입니다.",
        "values": []
      }
    ],
    "events": [
      {
        "name": "update:modelValue",
        "signature": "(v: string|null)",
        "description": "소비 앱의 모델 값을 갱신합니다."
      },
      {
        "name": "change",
        "signature": "(v: string|null)",
        "description": "change 동작이 발생했을 때 전달합니다."
      },
      {
        "name": "invalid",
        "signature": "(v: string)",
        "description": "검증 실패 문구를 전달합니다."
      },
      {
        "name": "open",
        "signature": "()",
        "description": "패널이 열린 뒤 전달합니다."
      },
      {
        "name": "close",
        "signature": "(why: PickerCloseReason)",
        "description": "닫힌 이유를 전달합니다."
      }
    ],
    "slots": [
      {
        "name": "label",
        "scope": "인자 없음",
        "description": "기본 이름 표시를 바꿉니다. 접근 가능한 이름은 유지합니다."
      },
      {
        "name": "help",
        "scope": "인자 없음",
        "description": "입력 아래의 보조 설명입니다."
      }
    ],
    "methods": [
      {
        "name": "clear",
        "signature": "() => void",
        "description": "선택값을 초기화합니다."
      },
      {
        "name": "focus",
        "signature": "() => void",
        "description": "사용 가능한 입력 또는 실행 요소로 초점을 이동합니다."
      },
      {
        "name": "validate",
        "signature": "() => boolean",
        "description": "현재 값을 검증하고 유효 여부를 반환합니다."
      },
      {
        "name": "resetValidation",
        "signature": "() => void",
        "description": "입력값을 바꾸지 않고 로컬 검증 표시를 초기화합니다."
      }
    ],
    "types": [
      {
        "name": "PickerCloseReason",
        "source": "type PickerCloseReason='close'|'escape'|'outside'|'select'|'disabled'|'mode';"
      },
      {
        "name": "SRule",
        "source": "type SRule<T = unknown> = (value: T, locale: SolLocale) => boolean | string;"
      }
    ],
    "passthrough": null
  },
  {
    "name": "SAccordion",
    "id": "saccordion",
    "group": "탐색",
    "description": "추가 내용을 같은 맥락에서 펼치고 접습니다.",
    "exampleRoute": "component",
    "example": "accordion",
    "source": "packages/vue-ui/src/disclosures.ts",
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "입력·제목·패널의 접근성 연결에 사용하는 고유 ID입니다.",
        "values": []
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "화면과 보조 기술에 전달하는 이름입니다.",
        "values": []
      },
      {
        "name": "modelValue",
        "type": "boolean",
        "required": false,
        "default": "undefined",
        "description": "소비 앱이 소유하는 현재 값입니다. update:modelValue와 연결합니다.",
        "values": []
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "사용을 막고 비활성 상태를 표시합니다.",
        "values": []
      },
      {
        "name": "readonly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "현재 값은 보여 주고 사용자 변경을 막습니다.",
        "values": []
      },
      {
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
        "values": []
      }
    ],
    "events": [
      {
        "name": "update:modelValue",
        "signature": "(value: boolean)",
        "description": "소비 앱의 모델 값을 갱신합니다."
      },
      {
        "name": "change",
        "signature": "(value: boolean)",
        "description": "change 동작이 발생했을 때 전달합니다."
      }
    ],
    "slots": [
      {
        "name": "default",
        "scope": "인자 없음",
        "description": "기본 내용입니다."
      }
    ],
    "methods": [],
    "types": [],
    "passthrough": null
  },
  {
    "name": "SBreadcrumbs",
    "id": "sbreadcrumbs",
    "group": "탐색",
    "description": "현재 위치와 상위 경로를 표시합니다.",
    "exampleRoute": "component",
    "example": "navigation",
    "source": "packages/vue-ui/src/presentation.ts",
    "props": [
      {
        "name": "items",
        "type": "readonly SBreadcrumbItem[]",
        "required": true,
        "default": "undefined",
        "description": "표시할 항목 자료입니다. 타입 정의의 필수 키를 확인합니다.",
        "values": []
      },
      {
        "name": "current",
        "type": "string",
        "required": false,
        "default": "undefined",
        "description": "현재 경로나 항목 ID입니다.",
        "values": []
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "default": "undefined",
        "description": "화면과 보조 기술에 전달하는 이름입니다.",
        "values": []
      },
      {
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
        "values": []
      }
    ],
    "events": [
      {
        "name": "navigate",
        "signature": "(item: SBreadcrumbItem, event: MouseEvent)",
        "description": "navigate 동작이 발생했을 때 전달합니다."
      }
    ],
    "slots": [],
    "methods": [],
    "types": [
      {
        "name": "SBreadcrumbItem",
        "source": "interface SBreadcrumbItem {id:string;label:string;href?:string;disabled?:boolean}"
      }
    ],
    "passthrough": null
  },
  {
    "name": "SContextMenu",
    "id": "scontext-menu",
    "group": "탐색",
    "description": "우클릭·키보드·모바일 실행 버튼으로 행동 메뉴를 엽니다.",
    "exampleRoute": "start",
    "example": "advanced-vue",
    "source": "packages/vue-ui/src/actions.ts",
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "입력·제목·패널의 접근성 연결에 사용하는 고유 ID입니다.",
        "values": []
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "화면과 보조 기술에 전달하는 이름입니다.",
        "values": []
      },
      {
        "name": "items",
        "type": "readonly SolMenuItem[]",
        "required": true,
        "default": "undefined",
        "description": "표시할 항목 자료입니다. 타입 정의의 필수 키를 확인합니다.",
        "values": []
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "사용을 막고 비활성 상태를 표시합니다.",
        "values": []
      },
      {
        "name": "readonly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "현재 값은 보여 주고 사용자 변경을 막습니다.",
        "values": []
      },
      {
        "name": "open",
        "type": "boolean",
        "required": false,
        "default": "undefined",
        "description": "메뉴의 제어형 열림 상태입니다. update:open 이벤트와 연결합니다.",
        "values": []
      },
      {
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
        "values": []
      },
      {
        "name": "triggerLabel",
        "type": "string",
        "required": false,
        "default": "undefined",
        "description": "모바일·키보드에서 맥락 메뉴를 직접 여는 버튼의 이름입니다.",
        "values": []
      }
    ],
    "events": [
      {
        "name": "update:open",
        "signature": "(v: boolean)",
        "description": "해당 상태의 변경을 소비 앱에 전달합니다."
      },
      {
        "name": "select",
        "signature": "(id: string)",
        "description": "select 동작이 발생했을 때 전달합니다."
      },
      {
        "name": "open",
        "signature": "()",
        "description": "패널이 열린 뒤 전달합니다."
      },
      {
        "name": "close",
        "signature": "(why: SolMenuCloseReason)",
        "description": "닫힌 이유를 전달합니다."
      }
    ],
    "slots": [
      {
        "name": "default",
        "scope": "인자 없음",
        "description": "기본 내용입니다."
      }
    ],
    "methods": [],
    "types": [
      {
        "name": "SolMenuCloseReason",
        "source": "type SolMenuCloseReason='escape'|'outside'|'tab'|'select'|'disabled'|'programmatic';"
      },
      {
        "name": "SolMenuItem",
        "source": "interface SolMenuItem {id:string;label:string;disabled?:boolean;danger?:boolean}"
      }
    ],
    "passthrough": null
  },
  {
    "name": "SStepper",
    "id": "sstepper",
    "group": "탐색",
    "description": "현재·완료·다음 단계를 글과 상태로 구분합니다.",
    "exampleRoute": "component",
    "example": "identity-progress",
    "source": "packages/vue-ui/src/presentation.ts",
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "입력·제목·패널의 접근성 연결에 사용하는 고유 ID입니다.",
        "values": []
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "default": "undefined",
        "description": "화면과 보조 기술에 전달하는 이름입니다.",
        "values": []
      },
      {
        "name": "items",
        "type": "readonly SStep[]",
        "required": true,
        "default": "undefined",
        "description": "표시할 항목 자료입니다. 타입 정의의 필수 키를 확인합니다.",
        "values": []
      },
      {
        "name": "modelValue",
        "type": "string|null",
        "required": false,
        "default": "null",
        "description": "소비 앱이 소유하는 현재 값입니다. update:modelValue와 연결합니다.",
        "values": []
      },
      {
        "name": "completed",
        "type": "readonly string[]",
        "required": false,
        "default": "[]",
        "description": "완료한 단계 ID 목록입니다.",
        "values": []
      },
      {
        "name": "interactive",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "사용자가 단계를 선택할 수 있게 합니다.",
        "values": []
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "사용을 막고 비활성 상태를 표시합니다.",
        "values": []
      },
      {
        "name": "readonly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "현재 값은 보여 주고 사용자 변경을 막습니다.",
        "values": []
      },
      {
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
        "values": []
      }
    ],
    "events": [
      {
        "name": "update:modelValue",
        "signature": "(id: string)",
        "description": "소비 앱의 모델 값을 갱신합니다."
      },
      {
        "name": "change",
        "signature": "(id: string)",
        "description": "change 동작이 발생했을 때 전달합니다."
      }
    ],
    "slots": [],
    "methods": [],
    "types": [
      {
        "name": "SStep",
        "source": "interface SStep {id:string;label:string;description?:string;disabled?:boolean}"
      }
    ],
    "passthrough": null
  },
  {
    "name": "STabs",
    "id": "stabs",
    "group": "탐색",
    "description": "방향키로 탭을 탐색하고 연결된 패널을 표시합니다.",
    "exampleRoute": "component",
    "example": "content-tabs",
    "source": "packages/vue-ui/src/navigation.ts",
    "props": [
      {
        "name": "rules",
        "type": "readonly SRule<any>[]",
        "required": false,
        "default": "[]",
        "description": "순서대로 실행할 공통 검증 규칙입니다. true·false 또는 오류 문구를 반환합니다.",
        "values": []
      },
      {
        "name": "errorMessages",
        "type": "string | readonly string[]",
        "required": false,
        "default": "''",
        "description": "외부에서 제공하는 오류 문구입니다.",
        "values": []
      },
      {
        "name": "serverError",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "서버 응답 오류입니다. 로컬 규칙 오류와 구분하여 소비 앱에서 갱신합니다.",
        "values": []
      },
      {
        "name": "id",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "입력·제목·패널의 접근성 연결에 사용하는 고유 ID입니다.",
        "values": []
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "화면과 보조 기술에 전달하는 이름입니다.",
        "values": []
      },
      {
        "name": "help",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "입력 아래의 보조 설명입니다.",
        "values": []
      },
      {
        "name": "error",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "소비 앱이 제공하는 오류 문구입니다.",
        "values": []
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "사용을 막고 비활성 상태를 표시합니다.",
        "values": []
      },
      {
        "name": "readonly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "현재 값은 보여 주고 사용자 변경을 막습니다.",
        "values": []
      },
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "필수 입력 의미와 해당 컴포넌트의 검증에 사용합니다.",
        "values": []
      },
      {
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
        "values": []
      },
      {
        "name": "modelValue",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "소비 앱이 소유하는 현재 값입니다. update:modelValue와 연결합니다.",
        "values": []
      },
      {
        "name": "items",
        "type": "readonly SolTab[]",
        "required": true,
        "default": "undefined",
        "description": "표시할 항목 자료입니다. 타입 정의의 필수 키를 확인합니다.",
        "values": []
      },
      {
        "name": "orientation",
        "type": "'horizontal'|'vertical'",
        "required": false,
        "default": "'horizontal'",
        "description": "가로 또는 세로 탐색 방향입니다.",
        "values": [
          "horizontal",
          "vertical"
        ]
      },
      {
        "name": "activation",
        "type": "'automatic'|'manual'",
        "required": false,
        "default": "'automatic'",
        "description": "초점 이동과 선택을 함께 할지, 별도로 확정할지 정합니다.",
        "values": [
          "automatic",
          "manual"
        ]
      }
    ],
    "events": [
      {
        "name": "update:modelValue",
        "signature": "(v: string)",
        "description": "소비 앱의 모델 값을 갱신합니다."
      },
      {
        "name": "change",
        "signature": "(v: string)",
        "description": "change 동작이 발생했을 때 전달합니다."
      }
    ],
    "slots": [
      {
        "name": "label",
        "scope": "인자 없음",
        "description": "기본 이름 표시를 바꿉니다. 접근 가능한 이름은 유지합니다."
      },
      {
        "name": "default",
        "scope": "{ item: SolTab; }",
        "description": "기본 내용입니다."
      },
      {
        "name": "help",
        "scope": "인자 없음",
        "description": "입력 아래의 보조 설명입니다."
      },
      {
        "name": "panel-{item.value}",
        "scope": "{ item: SolTab; }",
        "description": "항목 값에 해당하는 탭 패널 내용입니다."
      }
    ],
    "methods": [],
    "types": [
      {
        "name": "SolTab",
        "source": "interface SolTab {value:string;label:string;disabled?:boolean}"
      },
      {
        "name": "SRule",
        "source": "type SRule<T = unknown> = (value: T, locale: SolLocale) => boolean | string;"
      }
    ],
    "passthrough": null
  },
  {
    "name": "STree",
    "id": "stree",
    "group": "탐색",
    "description": "계층 자료의 펼침과 선택을 구분합니다.",
    "exampleRoute": "component",
    "example": "tree",
    "source": "packages/vue-ui/src/tree.ts",
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "입력·제목·패널의 접근성 연결에 사용하는 고유 ID입니다.",
        "values": []
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "화면과 보조 기술에 전달하는 이름입니다.",
        "values": []
      },
      {
        "name": "items",
        "type": "readonly STreeItem[]",
        "required": true,
        "default": "undefined",
        "description": "표시할 항목 자료입니다. 타입 정의의 필수 키를 확인합니다.",
        "values": []
      },
      {
        "name": "modelValue",
        "type": "string|null",
        "required": false,
        "default": "null",
        "description": "소비 앱이 소유하는 현재 값입니다. update:modelValue와 연결합니다.",
        "values": []
      },
      {
        "name": "expanded",
        "type": "readonly string[]",
        "required": false,
        "default": "[]",
        "description": "펼쳐진 항목 ID 목록입니다.",
        "values": []
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "사용을 막고 비활성 상태를 표시합니다.",
        "values": []
      },
      {
        "name": "readonly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "현재 값은 보여 주고 사용자 변경을 막습니다.",
        "values": []
      }
    ],
    "events": [
      {
        "name": "update:modelValue",
        "signature": "(id: string)",
        "description": "소비 앱의 모델 값을 갱신합니다."
      },
      {
        "name": "update:expanded",
        "signature": "(ids: string[])",
        "description": "해당 상태의 변경을 소비 앱에 전달합니다."
      },
      {
        "name": "select",
        "signature": "(id: string)",
        "description": "select 동작이 발생했을 때 전달합니다."
      }
    ],
    "slots": [],
    "methods": [],
    "types": [
      {
        "name": "STreeItem",
        "source": "interface STreeItem {id:string;label:string;disabled?:boolean;children?:readonly STreeItem[]}"
      }
    ],
    "passthrough": null
  },
  {
    "name": "SAlert",
    "id": "salert",
    "group": "피드백",
    "description": "화면에 남아 있어야 하는 정보·성공·오류를 전달합니다.",
    "exampleRoute": "component",
    "example": "feedback",
    "source": "packages/vue-ui/src/surfaces.ts",
    "props": [
      {
        "name": "title",
        "type": "string",
        "required": false,
        "default": "undefined",
        "description": "표면 또는 패널의 제목입니다.",
        "values": []
      },
      {
        "name": "tone",
        "type": "'accent'|'info'|'success'|'warning'|'danger'",
        "required": false,
        "default": "'info'",
        "description": "강조·정보·성공·주의·오류의 의미색입니다.",
        "values": [
          "accent",
          "info",
          "success",
          "warning",
          "danger"
        ]
      },
      {
        "name": "live",
        "type": "'off'|'polite'|'assertive'",
        "required": false,
        "default": "'off'",
        "description": "보조 기술에 알리는 강도입니다. 초기 정적 내용은 off를 권장합니다.",
        "values": [
          "off",
          "polite",
          "assertive"
        ]
      }
    ],
    "events": [],
    "slots": [
      {
        "name": "default",
        "scope": "인자 없음",
        "description": "기본 내용입니다."
      },
      {
        "name": "actions",
        "scope": "인자 없음",
        "description": "내용과 구분된 하단·보조 행동입니다."
      }
    ],
    "methods": [],
    "types": [],
    "passthrough": null
  },
  {
    "name": "SDialog",
    "id": "sdialog",
    "group": "피드백",
    "description": "현재 맥락의 모달 또는 사이드 패널을 표시합니다.",
    "exampleRoute": "component",
    "example": "dialog",
    "source": "packages/vue-ui/src/index.ts",
    "props": [
      {
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
        "values": []
      },
      {
        "name": "id",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "입력·제목·패널의 접근성 연결에 사용하는 고유 ID입니다.",
        "values": []
      },
      {
        "name": "title",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "표면 또는 패널의 제목입니다.",
        "values": []
      },
      {
        "name": "eyebrow",
        "type": "string",
        "required": false,
        "default": "undefined",
        "description": "제목 위에 표시하는 짧은 보조 문구입니다.",
        "values": []
      },
      {
        "name": "presentation",
        "type": "'dialog'|'drawer'",
        "required": false,
        "default": "'dialog'",
        "description": "중앙 다이얼로그 또는 옆 패널 표시 방식입니다.",
        "values": [
          "dialog",
          "drawer"
        ]
      },
      {
        "name": "modelValue",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "소비 앱이 소유하는 현재 값입니다. update:modelValue와 연결합니다.",
        "values": []
      },
      {
        "name": "maxWidth",
        "type": "[Number,String]",
        "required": false,
        "default": "480",
        "description": "패널의 최대 너비입니다.",
        "values": []
      },
      {
        "name": "closeLabel",
        "type": "string",
        "required": false,
        "default": "undefined",
        "description": "닫기 행동의 접근 가능한 이름입니다.",
        "values": []
      },
      {
        "name": "returnFocus",
        "type": "HTMLElement|null",
        "required": false,
        "default": "null",
        "description": "닫힌 뒤 초점을 돌려줄 요소입니다.",
        "values": []
      }
    ],
    "events": [
      {
        "name": "update:modelValue",
        "signature": "(value: boolean)",
        "description": "소비 앱의 모델 값을 갱신합니다."
      },
      {
        "name": "close",
        "signature": "()",
        "description": "닫힌 뒤 전달합니다."
      }
    ],
    "slots": [
      {
        "name": "default",
        "scope": "인자 없음",
        "description": "기본 내용입니다."
      },
      {
        "name": "actions",
        "scope": "인자 없음",
        "description": "내용과 구분된 하단·보조 행동입니다."
      }
    ],
    "methods": [],
    "types": [],
    "passthrough": null
  },
  {
    "name": "SPopover",
    "id": "spopover",
    "group": "피드백",
    "description": "실행 가능한 추가 정보를 작은 패널에 표시합니다.",
    "exampleRoute": "component",
    "example": "help",
    "source": "packages/vue-ui/src/disclosures.ts",
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "입력·제목·패널의 접근성 연결에 사용하는 고유 ID입니다.",
        "values": []
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "화면과 보조 기술에 전달하는 이름입니다.",
        "values": []
      },
      {
        "name": "modelValue",
        "type": "boolean",
        "required": false,
        "default": "undefined",
        "description": "소비 앱이 소유하는 현재 값입니다. update:modelValue와 연결합니다.",
        "values": []
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "사용을 막고 비활성 상태를 표시합니다.",
        "values": []
      },
      {
        "name": "readonly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "현재 값은 보여 주고 사용자 변경을 막습니다.",
        "values": []
      },
      {
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
        "values": []
      },
      {
        "name": "title",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "표면 또는 패널의 제목입니다.",
        "values": []
      }
    ],
    "events": [
      {
        "name": "update:modelValue",
        "signature": "(value: boolean)",
        "description": "소비 앱의 모델 값을 갱신합니다."
      },
      {
        "name": "open",
        "signature": "()",
        "description": "패널이 열린 뒤 전달합니다."
      },
      {
        "name": "close",
        "signature": "(reason: SDisclosureCloseReason)",
        "description": "닫힌 이유를 전달합니다."
      }
    ],
    "slots": [
      {
        "name": "activator",
        "scope": "{ props: { id: string; disabled: boolean; 'aria-disabled': string | undefined; 'aria-expanded': string; 'aria-controls': string; 'aria-haspopup': string; onClick: () => void; onKeydown: (e: KeyboardEvent) => void; }; }",
        "description": "전달받은 props를 실제 실행 요소에 바인딩합니다."
      },
      {
        "name": "default",
        "scope": "인자 없음",
        "description": "기본 내용입니다."
      },
      {
        "name": "actions",
        "scope": "인자 없음",
        "description": "내용과 구분된 하단·보조 행동입니다."
      }
    ],
    "methods": [],
    "types": [
      {
        "name": "SDisclosureCloseReason",
        "source": "type SDisclosureCloseReason='escape'|'outside'|'focus'|'trigger'|'close'|'disabled'|'programmatic';"
      }
    ],
    "passthrough": null
  },
  {
    "name": "SProgressCircular",
    "id": "sprogress-circular",
    "group": "피드백",
    "description": "수치가 알려진 진행률과 무한 로딩을 원형으로 표시합니다.",
    "exampleRoute": "component",
    "example": "progress",
    "source": "packages/vue-ui/src/progress.ts",
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "입력·제목·패널의 접근성 연결에 사용하는 고유 ID입니다.",
        "values": []
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "화면과 보조 기술에 전달하는 이름입니다.",
        "values": []
      },
      {
        "name": "modelValue",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "소비 앱이 소유하는 현재 값입니다. update:modelValue와 연결합니다.",
        "values": []
      },
      {
        "name": "min",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "허용하는 최소값입니다.",
        "values": []
      },
      {
        "name": "max",
        "type": "number",
        "required": false,
        "default": "100",
        "description": "허용하는 최대값입니다.",
        "values": []
      },
      {
        "name": "state",
        "type": "SProgressState",
        "required": false,
        "default": "'determinate'",
        "description": "알려진 진행률·무한 로딩·완료·오류 상태입니다.",
        "values": [
          "determinate",
          "indeterminate",
          "complete",
          "error"
        ]
      },
      {
        "name": "message",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "상태를 설명하는 문구입니다.",
        "values": []
      },
      {
        "name": "animated",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "무한 로딩의 반복 모션 여부입니다. 모션 줄이기 설정을 존중합니다.",
        "values": []
      },
      {
        "name": "showLabel",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "보이는 이름 표시 여부입니다. 접근 가능한 이름은 유지합니다.",
        "values": []
      },
      {
        "name": "showValue",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "보이는 수치 표시 여부입니다. 알 수 없는 진행률을 만들지 않습니다.",
        "values": []
      },
      {
        "name": "showMessage",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "보이는 상태 문구 표시 여부입니다.",
        "values": []
      },
      {
        "name": "announce",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "진행 상태 변화를 aria-live로 알릴지 정합니다.",
        "values": []
      },
      {
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
        "values": []
      },
      {
        "name": "size",
        "type": "number",
        "required": false,
        "default": "96",
        "description": "아이콘·아바타·원형 진행 표시의 크기입니다.",
        "values": []
      }
    ],
    "events": [],
    "slots": [
      {
        "name": "label",
        "scope": "인자 없음",
        "description": "기본 이름 표시를 바꿉니다. 접근 가능한 이름은 유지합니다."
      }
    ],
    "methods": [],
    "types": [
      {
        "name": "SProgressState",
        "source": "type SProgressState='determinate'|'indeterminate'|'complete'|'error';"
      }
    ],
    "passthrough": null
  },
  {
    "name": "SProgressLinear",
    "id": "sprogress-linear",
    "group": "피드백",
    "description": "수치가 알려진 진행률과 무한 로딩을 선형으로 표시합니다.",
    "exampleRoute": "component",
    "example": "progress",
    "source": "packages/vue-ui/src/progress.ts",
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "입력·제목·패널의 접근성 연결에 사용하는 고유 ID입니다.",
        "values": []
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "화면과 보조 기술에 전달하는 이름입니다.",
        "values": []
      },
      {
        "name": "modelValue",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "소비 앱이 소유하는 현재 값입니다. update:modelValue와 연결합니다.",
        "values": []
      },
      {
        "name": "min",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "허용하는 최소값입니다.",
        "values": []
      },
      {
        "name": "max",
        "type": "number",
        "required": false,
        "default": "100",
        "description": "허용하는 최대값입니다.",
        "values": []
      },
      {
        "name": "state",
        "type": "SProgressState",
        "required": false,
        "default": "'determinate'",
        "description": "알려진 진행률·무한 로딩·완료·오류 상태입니다.",
        "values": [
          "determinate",
          "indeterminate",
          "complete",
          "error"
        ]
      },
      {
        "name": "message",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "상태를 설명하는 문구입니다.",
        "values": []
      },
      {
        "name": "animated",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "무한 로딩의 반복 모션 여부입니다. 모션 줄이기 설정을 존중합니다.",
        "values": []
      },
      {
        "name": "showLabel",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "보이는 이름 표시 여부입니다. 접근 가능한 이름은 유지합니다.",
        "values": []
      },
      {
        "name": "showValue",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "보이는 수치 표시 여부입니다. 알 수 없는 진행률을 만들지 않습니다.",
        "values": []
      },
      {
        "name": "showMessage",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "보이는 상태 문구 표시 여부입니다.",
        "values": []
      },
      {
        "name": "announce",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "진행 상태 변화를 aria-live로 알릴지 정합니다.",
        "values": []
      },
      {
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
        "values": []
      },
      {
        "name": "size",
        "type": "number",
        "required": false,
        "default": "96",
        "description": "아이콘·아바타·원형 진행 표시의 크기입니다.",
        "values": []
      }
    ],
    "events": [],
    "slots": [
      {
        "name": "label",
        "scope": "인자 없음",
        "description": "기본 이름 표시를 바꿉니다. 접근 가능한 이름은 유지합니다."
      }
    ],
    "methods": [],
    "types": [
      {
        "name": "SProgressState",
        "source": "type SProgressState='determinate'|'indeterminate'|'complete'|'error';"
      }
    ],
    "passthrough": null
  },
  {
    "name": "SSnackbar",
    "id": "ssnackbar",
    "group": "피드백",
    "description": "짧은 상태를 초점을 빼앗지 않고 알립니다.",
    "exampleRoute": "component",
    "example": "feedback",
    "source": "packages/vue-ui/src/navigation.ts",
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "입력·제목·패널의 접근성 연결에 사용하는 고유 ID입니다.",
        "values": []
      },
      {
        "name": "modelValue",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "소비 앱이 소유하는 현재 값입니다. update:modelValue와 연결합니다.",
        "values": []
      },
      {
        "name": "message",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "상태를 설명하는 문구입니다.",
        "values": []
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "default": "undefined",
        "description": "화면과 보조 기술에 전달하는 이름입니다.",
        "values": []
      },
      {
        "name": "tone",
        "type": "ToastTone",
        "required": false,
        "default": "'info'",
        "description": "강조·정보·성공·주의·오류의 의미색입니다.",
        "values": [
          "accent",
          "info",
          "success",
          "warning",
          "danger"
        ]
      },
      {
        "name": "duration",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "자동 닫기까지의 밀리초입니다. 0이면 자동으로 닫지 않으며, 초점·포인터가 알림 안에 있는 동안 타이머를 멈춥니다.",
        "values": []
      },
      {
        "name": "live",
        "type": "'polite'|'assertive'|'off'",
        "required": false,
        "default": "'polite'",
        "description": "보조 기술에 알리는 강도입니다. 초기 정적 내용은 off를 권장합니다.",
        "values": [
          "polite",
          "assertive",
          "off"
        ]
      },
      {
        "name": "dismissible",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "사용자가 알림을 닫을 수 있는 버튼을 표시합니다.",
        "values": []
      },
      {
        "name": "returnFocus",
        "type": "HTMLElement|null",
        "required": false,
        "default": "undefined",
        "description": "닫힌 뒤 초점을 돌려줄 요소입니다.",
        "values": []
      },
      {
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
        "values": []
      }
    ],
    "events": [
      {
        "name": "update:modelValue",
        "signature": "(v: boolean)",
        "description": "소비 앱의 모델 값을 갱신합니다."
      },
      {
        "name": "close",
        "signature": "(reason: ToastCloseReason)",
        "description": "닫힌 이유를 전달합니다."
      }
    ],
    "slots": [
      {
        "name": "default",
        "scope": "인자 없음",
        "description": "기본 내용입니다."
      },
      {
        "name": "action",
        "scope": "인자 없음",
        "description": "action 영역의 내용입니다."
      }
    ],
    "methods": [],
    "types": [
      {
        "name": "ToastCloseReason",
        "source": "type ToastCloseReason='close'|'timeout'|'programmatic';"
      },
      {
        "name": "ToastTone",
        "source": "type ToastTone='accent'|'info'|'success'|'warning'|'danger';"
      }
    ],
    "passthrough": null
  },
  {
    "name": "STooltip",
    "id": "stooltip",
    "group": "피드백",
    "description": "초점·클릭으로 짧은 비대화형 설명을 표시합니다.",
    "exampleRoute": "component",
    "example": "help",
    "source": "packages/vue-ui/src/disclosures.ts",
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "입력·제목·패널의 접근성 연결에 사용하는 고유 ID입니다.",
        "values": []
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "화면과 보조 기술에 전달하는 이름입니다.",
        "values": []
      },
      {
        "name": "modelValue",
        "type": "boolean",
        "required": false,
        "default": "undefined",
        "description": "소비 앱이 소유하는 현재 값입니다. update:modelValue와 연결합니다.",
        "values": []
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "사용을 막고 비활성 상태를 표시합니다.",
        "values": []
      },
      {
        "name": "readonly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "현재 값은 보여 주고 사용자 변경을 막습니다.",
        "values": []
      },
      {
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
        "values": []
      },
      {
        "name": "text",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "짧은 설명 본문입니다.",
        "values": []
      }
    ],
    "events": [
      {
        "name": "update:modelValue",
        "signature": "(value: boolean)",
        "description": "소비 앱의 모델 값을 갱신합니다."
      },
      {
        "name": "open",
        "signature": "()",
        "description": "패널이 열린 뒤 전달합니다."
      },
      {
        "name": "close",
        "signature": "(reason: SDisclosureCloseReason)",
        "description": "닫힌 이유를 전달합니다."
      }
    ],
    "slots": [
      {
        "name": "activator",
        "scope": "{ props: { id: string; disabled: boolean; 'aria-disabled': string | undefined; 'aria-describedby': string | undefined; onPointerenter: () => void; onPointerleave: () => void; onFocus: () => void; onBlur: () => void; onClick: () => void; onKeydown: (e: KeyboardEvent) => void; }; }",
        "description": "전달받은 props를 실제 실행 요소에 바인딩합니다."
      }
    ],
    "methods": [],
    "types": [
      {
        "name": "SDisclosureCloseReason",
        "source": "type SDisclosureCloseReason='escape'|'outside'|'focus'|'trigger'|'close'|'disabled'|'programmatic';"
      }
    ],
    "passthrough": null
  },
  {
    "name": "SAvatar",
    "id": "savatar",
    "group": "표시·레이아웃",
    "description": "이미지 또는 대체 글자로 대상을 표시합니다.",
    "exampleRoute": "component",
    "example": "identity-progress",
    "source": "packages/vue-ui/src/presentation.ts",
    "props": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "화면과 보조 기술에 전달하는 이름입니다.",
        "values": []
      },
      {
        "name": "src",
        "type": "string",
        "required": false,
        "default": "undefined",
        "description": "이미지 주소입니다. 소비 앱이 허용한 주소를 사용합니다.",
        "values": []
      },
      {
        "name": "initials",
        "type": "string",
        "required": false,
        "default": "undefined",
        "description": "이미지가 없을 때 보여 줄 짧은 글자입니다.",
        "values": []
      },
      {
        "name": "size",
        "type": "24|32|40|48",
        "required": false,
        "default": "40",
        "description": "아이콘·아바타·원형 진행 표시의 크기입니다.",
        "values": []
      }
    ],
    "events": [
      {
        "name": "error",
        "signature": "(event: Event)",
        "description": "error 동작이 발생했을 때 전달합니다."
      }
    ],
    "slots": [
      {
        "name": "default",
        "scope": "인자 없음",
        "description": "기본 내용입니다."
      }
    ],
    "methods": [],
    "types": [],
    "passthrough": null
  },
  {
    "name": "SBarChart",
    "id": "sbar-chart",
    "group": "표시·레이아웃",
    "description": "작은 수치 비교를 차트와 같은 자료의 표로 제공합니다.",
    "exampleRoute": "component",
    "example": "chart",
    "source": "packages/vue-ui/src/presentation.ts",
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "입력·제목·패널의 접근성 연결에 사용하는 고유 ID입니다.",
        "values": []
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "화면과 보조 기술에 전달하는 이름입니다.",
        "values": []
      },
      {
        "name": "items",
        "type": "readonly SBarChartItem[]",
        "required": true,
        "default": "undefined",
        "description": "표시할 항목 자료입니다. 타입 정의의 필수 키를 확인합니다.",
        "values": []
      },
      {
        "name": "max",
        "type": "number",
        "required": false,
        "default": "undefined",
        "description": "허용하는 최대값입니다.",
        "values": []
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "처리 중 상태입니다. 해당 컴포넌트의 입력·행동 계약을 따릅니다.",
        "values": []
      },
      {
        "name": "showTable",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "차트와 같은 자료의 텍스트 표를 함께 표시합니다.",
        "values": []
      },
      {
        "name": "categoryLabel",
        "type": "string",
        "required": false,
        "default": "undefined",
        "description": "범주 열의 제목입니다.",
        "values": []
      },
      {
        "name": "valueLabel",
        "type": "string",
        "required": false,
        "default": "undefined",
        "description": "수치 열의 제목입니다.",
        "values": []
      },
      {
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
        "values": []
      }
    ],
    "events": [],
    "slots": [],
    "methods": [],
    "types": [
      {
        "name": "SBarChartItem",
        "source": "interface SBarChartItem {id:string;label:string;value:number}"
      }
    ],
    "passthrough": null
  },
  {
    "name": "SCard",
    "id": "scard",
    "group": "표시·레이아웃",
    "description": "제목·내용·하단 행동을 한 표면으로 묶습니다.",
    "exampleRoute": "pattern",
    "example": "composition",
    "source": "packages/vue-ui/src/surfaces.ts",
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": false,
        "default": "undefined",
        "description": "입력·제목·패널의 접근성 연결에 사용하는 고유 ID입니다.",
        "values": []
      },
      {
        "name": "title",
        "type": "string",
        "required": false,
        "default": "undefined",
        "description": "표면 또는 패널의 제목입니다.",
        "values": []
      },
      {
        "name": "eyebrow",
        "type": "string",
        "required": false,
        "default": "undefined",
        "description": "제목 위에 표시하는 짧은 보조 문구입니다.",
        "values": []
      },
      {
        "name": "headingLevel",
        "type": "2|3|4",
        "required": false,
        "default": "3",
        "description": "문서의 제목 위계입니다. 화면의 실제 h2·h3·h4 수준에 맞춥니다.",
        "values": []
      }
    ],
    "events": [],
    "slots": [
      {
        "name": "default",
        "scope": "인자 없음",
        "description": "기본 내용입니다."
      },
      {
        "name": "actions",
        "scope": "인자 없음",
        "description": "내용과 구분된 하단·보조 행동입니다."
      }
    ],
    "methods": [],
    "types": [],
    "passthrough": null
  },
  {
    "name": "SCol",
    "id": "scol",
    "group": "표시·레이아웃",
    "description": "반응형 격자의 한 열을 구성합니다.",
    "exampleRoute": "pattern",
    "example": "layouts",
    "source": "packages/vue-ui/src/layout.ts",
    "props": [],
    "events": [],
    "slots": [],
    "methods": [],
    "types": [],
    "passthrough": "VCol"
  },
  {
    "name": "SContainer",
    "id": "scontainer",
    "group": "표시·레이아웃",
    "description": "반응형 화면의 콘텐츠 너비를 제한합니다.",
    "exampleRoute": "pattern",
    "example": "layouts",
    "source": "packages/vue-ui/src/layout.ts",
    "props": [],
    "events": [],
    "slots": [],
    "methods": [],
    "types": [],
    "passthrough": "VContainer"
  },
  {
    "name": "SDataTable",
    "id": "sdata-table",
    "group": "표시·레이아웃",
    "description": "정렬·선택·페이지와 작은 화면의 카드 보기를 제공합니다.",
    "exampleRoute": "pattern",
    "example": "data",
    "source": "packages/vue-ui/src/index.ts",
    "props": [
      {
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
        "values": []
      },
      {
        "name": "columns",
        "type": "TableColumn[]",
        "required": true,
        "default": "undefined",
        "description": "열 키·제목·너비·정렬·표시 형식을 정의합니다.",
        "values": []
      },
      {
        "name": "rows",
        "type": "TableRow[]",
        "required": true,
        "default": "undefined",
        "description": "표 자료 또는 입력 줄 수입니다. 컴포넌트별 타입을 확인합니다.",
        "values": []
      },
      {
        "name": "caption",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "표의 이름입니다.",
        "values": []
      },
      {
        "name": "selected",
        "type": "string[]",
        "required": false,
        "default": "[]",
        "description": "선택한 자료의 ID 목록입니다.",
        "values": []
      },
      {
        "name": "selectable",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "행 선택 체크박스를 표시합니다.",
        "values": []
      },
      {
        "name": "sort",
        "type": "TableSort|null",
        "required": false,
        "default": "null",
        "description": "소비 앱이 소유하는 정렬 열과 방향입니다.",
        "values": []
      },
      {
        "name": "page",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "현재 페이지 번호입니다.",
        "values": []
      },
      {
        "name": "pageCount",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "전체 페이지 수입니다.",
        "values": []
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "처리 중 상태입니다. 해당 컴포넌트의 입력·행동 계약을 따릅니다.",
        "values": []
      },
      {
        "name": "error",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "소비 앱이 제공하는 오류 문구입니다.",
        "values": []
      },
      {
        "name": "emptyText",
        "type": "string",
        "required": false,
        "default": "undefined",
        "description": "자료가 없을 때 표시할 문구입니다.",
        "values": []
      }
    ],
    "events": [
      {
        "name": "update:selected",
        "signature": "(ids: string[])",
        "description": "해당 상태의 변경을 소비 앱에 전달합니다."
      },
      {
        "name": "update:sort",
        "signature": "(sort: TableSort)",
        "description": "해당 상태의 변경을 소비 앱에 전달합니다."
      },
      {
        "name": "update:page",
        "signature": "(page: number)",
        "description": "해당 상태의 변경을 소비 앱에 전달합니다."
      },
      {
        "name": "retry",
        "signature": "()",
        "description": "소비 앱에 재시도 처리를 요청합니다."
      },
      {
        "name": "rowAction",
        "signature": "(row: TableRow)",
        "description": "rowAction 동작이 발생했을 때 전달합니다."
      }
    ],
    "slots": [
      {
        "name": "cell-{column.key}",
        "scope": "{ row: TableRow; value: unknown; }",
        "description": "열 키에 해당하는 셀 내용입니다. {row, value}를 받습니다."
      }
    ],
    "methods": [],
    "types": [
      {
        "name": "TableRow",
        "source": "interface TableRow {id:string;[key:string]:unknown}"
      },
      {
        "name": "TableSort",
        "source": "interface TableSort {key:string;direction:'ascending'|'descending'}"
      },
      {
        "name": "TableColumn",
        "source": "interface TableColumn {key:string;label:string;width?:string;align?:'start'|'end';sortable?:boolean;ellipsis?:boolean;format?:'text'|'number'|'date'}"
      }
    ],
    "passthrough": null
  },
  {
    "name": "SResizableSplitPane",
    "id": "sresizable-split-pane",
    "group": "표시·레이아웃",
    "description": "포인터·키보드로 두 영역의 크기를 조절합니다.",
    "exampleRoute": "start",
    "example": "advanced-vue",
    "source": "packages/vue-ui/src/split-pane.ts",
    "props": [
      {
        "name": "rules",
        "type": "readonly SRule<any>[]",
        "required": false,
        "default": "[]",
        "description": "순서대로 실행할 공통 검증 규칙입니다. true·false 또는 오류 문구를 반환합니다.",
        "values": []
      },
      {
        "name": "errorMessages",
        "type": "string | readonly string[]",
        "required": false,
        "default": "''",
        "description": "외부에서 제공하는 오류 문구입니다.",
        "values": []
      },
      {
        "name": "serverError",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "서버 응답 오류입니다. 로컬 규칙 오류와 구분하여 소비 앱에서 갱신합니다.",
        "values": []
      },
      {
        "name": "id",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "입력·제목·패널의 접근성 연결에 사용하는 고유 ID입니다.",
        "values": []
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "화면과 보조 기술에 전달하는 이름입니다.",
        "values": []
      },
      {
        "name": "help",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "입력 아래의 보조 설명입니다.",
        "values": []
      },
      {
        "name": "error",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "소비 앱이 제공하는 오류 문구입니다.",
        "values": []
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "사용을 막고 비활성 상태를 표시합니다.",
        "values": []
      },
      {
        "name": "readonly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "현재 값은 보여 주고 사용자 변경을 막습니다.",
        "values": []
      },
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "필수 입력 의미와 해당 컴포넌트의 검증에 사용합니다.",
        "values": []
      },
      {
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
        "values": []
      },
      {
        "name": "modelValue",
        "type": "number",
        "required": false,
        "default": "50",
        "description": "소비 앱이 소유하는 현재 값입니다. update:modelValue와 연결합니다.",
        "values": []
      },
      {
        "name": "min",
        "type": "number",
        "required": false,
        "default": "20",
        "description": "허용하는 최소값입니다.",
        "values": []
      },
      {
        "name": "max",
        "type": "number",
        "required": false,
        "default": "80",
        "description": "허용하는 최대값입니다.",
        "values": []
      },
      {
        "name": "step",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "값이 증가하거나 선택되는 간격입니다.",
        "values": []
      },
      {
        "name": "orientation",
        "type": "'horizontal'|'vertical'",
        "required": false,
        "default": "'horizontal'",
        "description": "가로 또는 세로 탐색 방향입니다.",
        "values": [
          "horizontal",
          "vertical"
        ]
      },
      {
        "name": "collapseBelow",
        "type": "number",
        "required": false,
        "default": "560",
        "description": "컨테이너 너비가 이 CSS px 값보다 작으면 두 영역을 세로로 배치합니다. 0 이하는 자동 전환을 끕니다.",
        "values": []
      },
      {
        "name": "primaryLabel",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "첫 번째 분할 영역의 접근 가능한 이름입니다.",
        "values": []
      },
      {
        "name": "secondaryLabel",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "두 번째 분할 영역의 접근 가능한 이름입니다.",
        "values": []
      }
    ],
    "events": [
      {
        "name": "update:modelValue",
        "signature": "(v: number)",
        "description": "소비 앱의 모델 값을 갱신합니다."
      },
      {
        "name": "change",
        "signature": "(v: number)",
        "description": "change 동작이 발생했을 때 전달합니다."
      },
      {
        "name": "reflow",
        "signature": "(stacked: boolean)",
        "description": "reflow 동작이 발생했을 때 전달합니다."
      }
    ],
    "slots": [
      {
        "name": "label",
        "scope": "인자 없음",
        "description": "기본 이름 표시를 바꿉니다. 접근 가능한 이름은 유지합니다."
      },
      {
        "name": "primary",
        "scope": "{ size: number; stacked: boolean; }",
        "description": "primary 영역의 내용입니다."
      },
      {
        "name": "secondary",
        "scope": "{ size: number; stacked: boolean; }",
        "description": "secondary 영역의 내용입니다."
      },
      {
        "name": "help",
        "scope": "인자 없음",
        "description": "입력 아래의 보조 설명입니다."
      }
    ],
    "methods": [],
    "types": [
      {
        "name": "SRule",
        "source": "type SRule<T = unknown> = (value: T, locale: SolLocale) => boolean | string;"
      }
    ],
    "passthrough": null
  },
  {
    "name": "SRow",
    "id": "srow",
    "group": "표시·레이아웃",
    "description": "반응형 격자의 행과 열 간격을 구성합니다.",
    "exampleRoute": "pattern",
    "example": "layouts",
    "source": "packages/vue-ui/src/layout.ts",
    "props": [],
    "events": [],
    "slots": [],
    "methods": [],
    "types": [],
    "passthrough": "VRow"
  }
];
export const componentReferenceVersions={"core":"0.4.5","vue-ui":"0.9.2"};
