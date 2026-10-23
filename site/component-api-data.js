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
export const componentReferenceVersions={"core":"0.4.8","vue-ui":"0.10.2"};
export const componentExampleSources={
  "buttons": "<script setup lang=\"ts\">\nconst busy = ref(false),\n  result = ref('');\nlet timer: ReturnType<typeof setTimeout>;\nfunction run() {\n  if (busy.value) return;\n  busy.value = true;\n  timer = setTimeout(() => {\n    result.value = '가상 확인을 마쳤어요.';\n    busy.value = false;\n  }, 500);\n}\nonBeforeUnmount(() => clearTimeout(timer));\n</script>\n<template>\n  <SCard :heading-level=\"2\" title=\"버튼 사용\">\n    <div class=\"sol-actions\">\n      <SBtn variant=\"primary\" :loading=\"busy\" @click=\"run\"> 확인 </SBtn>\n      <SBtn @click=\"result = '보조 동작을 눌렀어요.'\">보조 동작</SBtn>\n      <SBtn variant=\"inline\" @click=\"result = ''\"> 초기화 </SBtn>\n      <SBtn disabled>비활성</SBtn>\n    </div>\n    <p role=\"status\">{{ result }}</p>\n  </SCard>\n</template>\n",
  "advanced-vue": "<script setup>\nconst props = defineProps({ part: { type: String, default: '' } });\nconst supportedParts = [\n  'segmented',\n  'multiselect',\n  'range',\n  'split-button',\n  'context-menu',\n  'split-pane',\n];\nconst part = computed(() => (supportedParts.includes(props.part) ? props.part : ''));\nconst show = (...parts) => !part.value || parts.includes(part.value);\nconst disabled = ref(false),\n  readonly = ref(false),\n  display = ref('brief'),\n  selected = ref(['garden']),\n  scenario = ref('local'),\n  requests = ref(0);\nconst choices = [\n  { value: 'garden', label: '정원' },\n  { value: 'book', label: '책장' },\n  { value: 'walk', label: '산책' },\n  { value: 'season', label: '계절 관찰' },\n  { value: 'locked', label: '보관 · 선택 불가', disabled: true },\n];\nconst loader = computed(() => {\n  const mode = scenario.value;\n  if (mode === 'local') return undefined;\n  return async (query, signal) => {\n    const attempt = ++requests.value;\n    await new Promise((resolve, reject) => {\n      const timer = setTimeout(\n        () => {\n          signal.removeEventListener('abort', abort);\n          resolve();\n        },\n        query.includes('느림') ? 600 : 180,\n      );\n      const abort = () => {\n        clearTimeout(timer);\n        reject(new DOMException('Cancelled', 'AbortError'));\n      };\n      signal.addEventListener('abort', abort, { once: true });\n      if (signal.aborted) abort();\n    });\n    if (mode === 'retry' && attempt === 1) throw new Error('가상 실패');\n    return choices.filter((o) => o.label.includes(query.trim()));\n  };\n});\nwatch(scenario, () => (requests.value = 0));\nconst range = ref([20, 80]),\n  action = ref('아직 실행하지 않았어요.'),\n  primaryCount = ref(0),\n  menuOpen = ref(false);\nconst actions = [\n  { id: 'json', label: 'JSON으로 내보내기 · 가상' },\n  { id: 'csv', label: 'CSV로 내보내기 · 가상' },\n  { id: 'blocked', label: '예약 · 비활성', disabled: true },\n];\nconst contextItems = [\n  { id: 'pin', label: '자료 고정 · 가상' },\n  { id: 'copy', label: '복제 · 가상' },\n  { id: 'archive', label: '보관 · 비활성', disabled: true },\n];\nfunction chosenAction(id) {\n  action.value =\n    '✓ ' +\n    [...actions, ...contextItems].find((i) => i.id === id)?.label +\n    ' 동작을 확인했습니다. 외부 작업은 없습니다.';\n}\nconst ratio = ref(40),\n  direction = ref('horizontal'),\n  memo = ref('화면 폭을 바꾸어도 이 가상 메모는 유지됩니다.'),\n  stacked = ref(false),\n  resized = ref('');\nwatch([disabled, readonly], () => {\n  if (disabled.value || readonly.value) menuOpen.value = false;\n});\n</script>\n\n<template>\n  <section v-if=\"show('segmented')\" class=\"starter-card\" aria-labelledby=\"advanced-title\">\n    <h2 id=\"advanced-title\">설정 하나 선택 · SSegmentedControl</h2>\n    <p class=\"starter-hint\">\n      선택·범위·메뉴·분할 부품을 설치한 solyi-ui에서 가져옵니다. 아래 설정은 이 예제들에만\n      적용됩니다. 모든 데이터와 작업은 가상입니다.\n    </p>\n    <div class=\"starter-settings starter-demo-settings\">\n      <SSwitch id=\"advanced-disabled\" v-model=\"disabled\" label=\"확장 예시 비활성\" /><SSwitch\n        id=\"advanced-readonly\"\n        v-model=\"readonly\"\n        label=\"확장 예시 읽기 전용\"\n      />\n    </div>\n    <SSegmentedControl\n      id=\"advanced-segment\"\n      v-model=\"display\"\n      label=\"가상 표시 설정\"\n      :options=\"[\n        { value: 'brief', label: '간단히' },\n        { value: 'full', label: '자세히' },\n        { value: 'locked', label: '보관 · 비활성', disabled: true },\n      ]\"\n      :disabled=\"disabled\"\n      :readonly=\"readonly\"\n      help=\"설정 하나를 고릅니다. Tabs처럼 별도 패널을 전환하는 부품은 아닙니다.\"\n    />\n    <p class=\"starter-result\" role=\"status\">\n      {{\n        display === 'brief'\n          ? '가상 기록 4개'\n          : '가상 기록 4개 · 메모와 변경 정보를 함께 표시하는 설정'\n      }}\n    </p>\n  </section>\n  <section v-if=\"show('multiselect')\" class=\"starter-card\" aria-labelledby=\"advanced-multi-title\">\n    <h2 id=\"advanced-multi-title\">검색 가능한 MultiSelect</h2>\n    <div v-if=\"part\" class=\"starter-settings starter-demo-settings\">\n      <SSwitch id=\"advanced-disabled\" v-model=\"disabled\" label=\"예제 비활성\" /><SSwitch\n        id=\"advanced-readonly\"\n        v-model=\"readonly\"\n        label=\"예제 읽기 전용\"\n      />\n    </div>\n    <SSelect\n      id=\"advanced-multi-scenario\"\n      v-model=\"scenario\"\n      required\n      label=\"가상 목록 동작\"\n      :options=\"[\n        { value: 'local', label: '로컬 검색' },\n        { value: 'async', label: '지연 응답 흉내' },\n        { value: 'retry', label: '첫 오류 후 재시도' },\n      ]\"\n      help=\"외부 요청 없이 브라우저 안에서 지연·실패를 흉내 냅니다. '없는값'으로 결과 없음을 확인할 수 있어요.\"\n    />\n    <SMultiSelect\n      id=\"advanced-multi\"\n      v-model=\"selected\"\n      label=\"가상 기록 분류\"\n      :options=\"choices\"\n      :load-options=\"loader\"\n      :max-selected=\"3\"\n      required\n      :disabled=\"disabled\"\n      :readonly=\"readonly\"\n      placeholder=\"분류 이름 검색\"\n      help=\"방향키·Enter로 선택/해제, 빈 검색칸에서 Backspace로 마지막 선택 제거. Escape는 목록만 닫습니다. Tab은 제거/재시도 버튼에도 접근합니다.\"\n    />\n    <p class=\"starter-hint\">\n      완료 값: {{ JSON.stringify(selected) }} · 가상 요청 {{ requests }}회. 검색을 바꾸어도 기존\n      선택은 유지됩니다.\n    </p>\n  </section>\n  <section v-if=\"show('range')\" class=\"starter-card\" aria-labelledby=\"advanced-range-title\">\n    <h2 id=\"advanced-range-title\">양끝 RangeSlider</h2>\n    <div v-if=\"part\" class=\"starter-settings starter-demo-settings\">\n      <SSwitch id=\"advanced-disabled\" v-model=\"disabled\" label=\"예제 비활성\" /><SSwitch\n        id=\"advanced-readonly\"\n        v-model=\"readonly\"\n        label=\"예제 읽기 전용\"\n      />\n    </div>\n    <SRangeSlider\n      id=\"advanced-range\"\n      v-model=\"range\"\n      label=\"가상 점수 구간\"\n      lower-label=\"하한\"\n      upper-label=\"상한\"\n      :min=\"0\"\n      :max=\"100\"\n      :step=\"5\"\n      :format-value=\"(value) => value + '점'\"\n      :disabled=\"disabled\"\n      :readonly=\"readonly\"\n      help=\"두 핸들은 서로 넘어가지 않습니다. 핸들 드래그·방향키 또는 트랙 누르기로 조절하세요.\"\n    />\n    <div class=\"starter-control-grid\">\n      <SNumberInput\n        id=\"advanced-lower\"\n        required\n        v-model=\"range[0]\"\n        label=\"하한 직접 입력\"\n        :min=\"0\"\n        :max=\"range[1]\"\n        :step=\"5\"\n        :disabled=\"disabled\"\n        :readonly=\"readonly\"\n      /><SNumberInput\n        id=\"advanced-upper\"\n        required\n        v-model=\"range[1]\"\n        label=\"상한 직접 입력\"\n        :min=\"range[0]\"\n        :max=\"100\"\n        :step=\"5\"\n        :disabled=\"disabled\"\n        :readonly=\"readonly\"\n      />\n    </div>\n    <p class=\"starter-hint\">\n      숫자 입력도 같은 값을 사용합니다. 터치 보조기술의 사용자별 동작은 실제 기기에서 별도 확인해야\n      합니다.\n    </p>\n  </section>\n  <section\n    v-if=\"show('split-button', 'context-menu')\"\n    class=\"starter-card\"\n    aria-labelledby=\"advanced-actions-title\"\n  >\n    <h2 id=\"advanced-actions-title\">\n      {{\n        part === 'split-button'\n          ? 'SplitButton'\n          : part === 'context-menu'\n            ? 'ContextMenu'\n            : 'SplitButton · ContextMenu'\n      }}\n    </h2>\n    <div v-if=\"part\" class=\"starter-settings starter-demo-settings\">\n      <SSwitch id=\"advanced-disabled\" v-model=\"disabled\" label=\"예제 비활성\" /><SSwitch\n        id=\"advanced-readonly\"\n        v-model=\"readonly\"\n        label=\"예제 읽기 전용\"\n      />\n    </div>\n    <p class=\"starter-hint\">\n      주 동작과 다른 동작을 분리합니다. 실제 파일을 만들거나 자료를 변경하지 않습니다.\n    </p>\n    <SSplitBtn\n      v-if=\"show('split-button')\"\n      id=\"advanced-split-button\"\n      label=\"가상 내보내기\"\n      :items=\"actions\"\n      :disabled=\"disabled\"\n      :readonly=\"readonly\"\n      @primary=\"\n        primaryCount++;\n        action = '✓ 주 동작 ' + primaryCount + '회 · 실제 전송이나 다운로드는 없습니다.';\n      \"\n      @select=\"chosenAction\"\n    />\n    <SContextMenu\n      v-if=\"show('context-menu')\"\n      id=\"advanced-context\"\n      v-model:open=\"menuOpen\"\n      label=\"가상 정원 기록\"\n      trigger-label=\"기록 동작 열기\"\n      :items=\"contextItems\"\n      :disabled=\"disabled\"\n      :readonly=\"readonly\"\n      @select=\"chosenAction\"\n      ><p><strong>작은 정원 기록</strong></p>\n      <p>\n        이 영역에서 우클릭하거나 초점을 두고 Shift+F10을 누르세요. 터치에서도 아래 버튼을 사용할 수\n        있어요.\n      </p></SContextMenu\n    >\n    <p class=\"starter-result\" role=\"status\">{{ action }}</p>\n  </section>\n  <section v-if=\"show('split-pane')\" class=\"starter-card\" aria-labelledby=\"advanced-pane-title\">\n    <h2 id=\"advanced-pane-title\">ResizableSplitPane</h2>\n    <div v-if=\"part\" class=\"starter-settings starter-demo-settings\">\n      <SSwitch id=\"advanced-disabled\" v-model=\"disabled\" label=\"예제 비활성\" /><SSwitch\n        id=\"advanced-readonly\"\n        v-model=\"readonly\"\n        label=\"예제 읽기 전용\"\n      />\n    </div>\n    <SSelect\n      id=\"advanced-pane-direction\"\n      v-model=\"direction\"\n      required\n      label=\"개발 설정 · 분할 방향\"\n      :options=\"[\n        { value: 'horizontal', label: '좌우 두 영역' },\n        { value: 'vertical', label: '위아래 두 영역' },\n      ]\"\n    />\n    <SResizableSplitPane\n      id=\"advanced-pane\"\n      v-model=\"ratio\"\n      label=\"가상 목록과 메모\"\n      primary-label=\"가상 목록\"\n      secondary-label=\"가상 메모\"\n      :orientation=\"direction\"\n      :min=\"25\"\n      :max=\"75\"\n      :step=\"5\"\n      :disabled=\"disabled\"\n      :readonly=\"readonly\"\n      @reflow=\"stacked = $event\"\n      @change=\"resized = '조절 완료: ' + $event + '%'\"\n    >\n      <template #primary\n        ><p>계절 관찰<br />작은 정원<br />저녁 책장</p>\n        <p class=\"starter-hint\">\n          중앙 구분선을 드래그하거나 초점을 두고 방향키로 조절합니다.\n        </p></template\n      >\n      <template #secondary\n        ><STextarea\n          id=\"advanced-pane-memo\"\n          v-model=\"memo\"\n          label=\"유지되는 가상 메모\"\n          :disabled=\"disabled\"\n          :readonly=\"readonly\"\n      /></template>\n    </SResizableSplitPane>\n    <p class=\"starter-hint\" role=\"status\">\n      저장 비율 {{ ratio }}% · {{ stacked ? '좁은 폭: 세로 순서 표시' : '크기 조절 가능' }} ·\n      {{ resized }}\n    </p>\n  </section>\n</template>\n",
  "autocomplete": "<script setup lang=\"ts\">\nimport type { DateValue, SolOption, SolOptionLoader } from 'solyi-ui';\ndefineProps<{ part?: string }>();\nconst mode = ref<string | null>('range'),\n  date = ref<DateValue>(null);\nconst dateMode = computed(() => (mode.value === 'single' ? 'single' : 'range'));\nwatch(dateMode, () => (date.value = null));\nconst files = ref<File[]>([]),\n  selected = ref<string | null>(null),\n  scenario = ref<string | null>('local');\nconst options: SolOption[] = ['기록', '독서', '식물', '산책', '작은 정원'].map((label) => ({\n  value: label,\n  label,\n}));\nlet failNext = true;\nwatch(scenario, () => {\n  failNext = true;\n  selected.value = null;\n});\nconst loader = computed<SolOptionLoader | undefined>(() => {\n  const responseMode = scenario.value;\n  if (responseMode === 'local') return undefined;\n  return (query, signal) =>\n    new Promise<readonly SolOption[]>((resolve, reject) => {\n      const cancel = () => {\n        clearTimeout(timer);\n        reject(new DOMException('Cancelled', 'AbortError'));\n      };\n      const timer = setTimeout(\n        () => {\n          signal.removeEventListener('abort', cancel);\n          if (responseMode === 'error' && failNext) {\n            failNext = false;\n            reject(new Error('Simulated response'));\n            return;\n          }\n          resolve(options.filter((item) => item.label.includes(query.trim())));\n        },\n        query.includes('느림') ? 450 : 150,\n      );\n      signal.addEventListener('abort', cancel, { once: true });\n      if (signal.aborted) cancel();\n    });\n});\n</script>\n<template>\n  <SCard :heading-level=\"2\" :title=\"part ? undefined : '로컬 입력 조합'\">\n    <SCard :heading-level=\"part ? 2 : 3\" v-if=\"!part || part === 'date'\" title=\"단일 날짜와 기간\">\n      <SSelect\n        id=\"recipe-date-mode\"\n        v-model=\"mode\"\n        label=\"개발 설정 시연\"\n        :options=\"[\n          { value: 'single', label: '단일 날짜' },\n          { value: 'range', label: '기간' },\n        ]\"\n        required\n      />\n      <SDatePicker id=\"recipe-date\" v-model=\"date\" label=\"가상 일정\" :mode=\"dateMode\" />\n      <p role=\"status\">완료값: {{ JSON.stringify(date) }}</p>\n    </SCard>\n    <SCard\n      :heading-level=\"part ? 2 : 3\"\n      v-if=\"!part || part === 'files'\"\n      title=\"로컬 파일 선택과 드롭\"\n    >\n      <SFileInput\n        id=\"recipe-files\"\n        v-model=\"files\"\n        label=\"가상 첨부 파일\"\n        accept=\".txt,.png,.jpg,.jpeg,.pdf\"\n        :max-files=\"3\"\n        :max-file-size=\"2 * 1024 * 1024\"\n        help=\"파일을 외부로 보내거나 내용을 읽지 않습니다. 이름·형식·크기만 이 화면 메모리에 표시합니다.\"\n      />\n    </SCard>\n    <SCard\n      :heading-level=\"part ? 2 : 3\"\n      v-if=\"!part || part === 'autocomplete'\"\n      title=\"단일 자동완성\"\n    >\n      <SSelect\n        id=\"recipe-autocomplete-mode\"\n        v-model=\"scenario\"\n        label=\"가상 응답\"\n        :options=\"[\n          { value: 'local', label: '즉시 로컬' },\n          { value: 'async', label: '지연 응답' },\n          { value: 'error', label: '오류 후 재시도' },\n        ]\"\n        required\n      />\n      <SAutocomplete\n        id=\"recipe-autocomplete\"\n        v-model=\"selected\"\n        label=\"가상 분류 검색\"\n        :options=\"options\"\n        :load-options=\"loader\"\n        :debounce=\"0\"\n        :locale=\"{ retry: '검색 다시 시도' }\"\n        help=\"방향키·Enter 선택, Escape 닫기. 직접 입력은 검색어이며 선택한 값만 반영합니다. 비동기 응답도 브라우저 안의 가상 처리입니다.\"\n      />\n      <p role=\"status\">선택값: {{ selected || '없음' }}</p>\n    </SCard>\n  </SCard>\n</template>\n",
  "choices": "<script setup lang=\"ts\">\nconst include = ref(true),\n  archived = ref(false),\n  view = ref<string | null>('list'),\n  sort = ref<string | null>('recent');\nconst options = [\n  { value: 'list', label: '목록' },\n  { value: 'cards', label: '카드' },\n  { value: 'map', label: '지도 · 비활성', disabled: true },\n];\n</script>\n<template>\n  <SCard :heading-level=\"2\" title=\"익숙한 기본 선택\">\n    <SCheckbox\n      class=\"sol-choice-row\"\n      id=\"recipe-include\"\n      v-model=\"include\"\n      label=\"완료한 항목 포함\"\n    />\n    <SCheckbox\n      class=\"sol-choice-row\"\n      id=\"recipe-archived\"\n      v-model=\"archived\"\n      label=\"보관한 항목 포함\"\n    />\n    <SCheckbox class=\"sol-choice-row\" id=\"recipe-unavailable\" label=\"공유 항목 · 비활성\" disabled />\n    <SRadioGroup\n      class=\"sol-choice-row\"\n      id=\"recipe-view\"\n      v-model=\"view\"\n      label=\"보기 방식\"\n      :options=\"options\"\n    />\n    <SSelect\n      id=\"recipe-sort\"\n      v-model=\"sort\"\n      label=\"정렬 기준\"\n      :options=\"[\n        { value: 'recent', label: '최근 변경순' },\n        { value: 'name', label: '이름순' },\n      ]\"\n    />\n    <p role=\"status\">\n      완료 {{ include ? '포함' : '제외' }} · 보관 {{ archived ? '포함' : '제외' }} · {{ view }} ·\n      {{ sort }}\n    </p>\n  </SCard>\n</template>\n",
  "date": "<script setup lang=\"ts\">\nimport type { DateValue, SolOption, SolOptionLoader } from 'solyi-ui';\ndefineProps<{ part?: string }>();\nconst mode = ref<string | null>('range'),\n  date = ref<DateValue>(null);\nconst dateMode = computed(() => (mode.value === 'single' ? 'single' : 'range'));\nwatch(dateMode, () => (date.value = null));\nconst files = ref<File[]>([]),\n  selected = ref<string | null>(null),\n  scenario = ref<string | null>('local');\nconst options: SolOption[] = ['기록', '독서', '식물', '산책', '작은 정원'].map((label) => ({\n  value: label,\n  label,\n}));\nlet failNext = true;\nwatch(scenario, () => {\n  failNext = true;\n  selected.value = null;\n});\nconst loader = computed<SolOptionLoader | undefined>(() => {\n  const responseMode = scenario.value;\n  if (responseMode === 'local') return undefined;\n  return (query, signal) =>\n    new Promise<readonly SolOption[]>((resolve, reject) => {\n      const cancel = () => {\n        clearTimeout(timer);\n        reject(new DOMException('Cancelled', 'AbortError'));\n      };\n      const timer = setTimeout(\n        () => {\n          signal.removeEventListener('abort', cancel);\n          if (responseMode === 'error' && failNext) {\n            failNext = false;\n            reject(new Error('Simulated response'));\n            return;\n          }\n          resolve(options.filter((item) => item.label.includes(query.trim())));\n        },\n        query.includes('느림') ? 450 : 150,\n      );\n      signal.addEventListener('abort', cancel, { once: true });\n      if (signal.aborted) cancel();\n    });\n});\n</script>\n<template>\n  <SCard :heading-level=\"2\" :title=\"part ? undefined : '로컬 입력 조합'\">\n    <SCard :heading-level=\"part ? 2 : 3\" v-if=\"!part || part === 'date'\" title=\"단일 날짜와 기간\">\n      <SSelect\n        id=\"recipe-date-mode\"\n        v-model=\"mode\"\n        label=\"개발 설정 시연\"\n        :options=\"[\n          { value: 'single', label: '단일 날짜' },\n          { value: 'range', label: '기간' },\n        ]\"\n        required\n      />\n      <SDatePicker id=\"recipe-date\" v-model=\"date\" label=\"가상 일정\" :mode=\"dateMode\" />\n      <p role=\"status\">완료값: {{ JSON.stringify(date) }}</p>\n    </SCard>\n    <SCard\n      :heading-level=\"part ? 2 : 3\"\n      v-if=\"!part || part === 'files'\"\n      title=\"로컬 파일 선택과 드롭\"\n    >\n      <SFileInput\n        id=\"recipe-files\"\n        v-model=\"files\"\n        label=\"가상 첨부 파일\"\n        accept=\".txt,.png,.jpg,.jpeg,.pdf\"\n        :max-files=\"3\"\n        :max-file-size=\"2 * 1024 * 1024\"\n        help=\"파일을 외부로 보내거나 내용을 읽지 않습니다. 이름·형식·크기만 이 화면 메모리에 표시합니다.\"\n      />\n    </SCard>\n    <SCard\n      :heading-level=\"part ? 2 : 3\"\n      v-if=\"!part || part === 'autocomplete'\"\n      title=\"단일 자동완성\"\n    >\n      <SSelect\n        id=\"recipe-autocomplete-mode\"\n        v-model=\"scenario\"\n        label=\"가상 응답\"\n        :options=\"[\n          { value: 'local', label: '즉시 로컬' },\n          { value: 'async', label: '지연 응답' },\n          { value: 'error', label: '오류 후 재시도' },\n        ]\"\n        required\n      />\n      <SAutocomplete\n        id=\"recipe-autocomplete\"\n        v-model=\"selected\"\n        label=\"가상 분류 검색\"\n        :options=\"options\"\n        :load-options=\"loader\"\n        :debounce=\"0\"\n        :locale=\"{ retry: '검색 다시 시도' }\"\n        help=\"방향키·Enter 선택, Escape 닫기. 직접 입력은 검색어이며 선택한 값만 반영합니다. 비동기 응답도 브라우저 안의 가상 처리입니다.\"\n      />\n      <p role=\"status\">선택값: {{ selected || '없음' }}</p>\n    </SCard>\n  </SCard>\n</template>\n",
  "files": "<script setup lang=\"ts\">\nimport type { DateValue, SolOption, SolOptionLoader } from 'solyi-ui';\ndefineProps<{ part?: string }>();\nconst mode = ref<string | null>('range'),\n  date = ref<DateValue>(null);\nconst dateMode = computed(() => (mode.value === 'single' ? 'single' : 'range'));\nwatch(dateMode, () => (date.value = null));\nconst files = ref<File[]>([]),\n  selected = ref<string | null>(null),\n  scenario = ref<string | null>('local');\nconst options: SolOption[] = ['기록', '독서', '식물', '산책', '작은 정원'].map((label) => ({\n  value: label,\n  label,\n}));\nlet failNext = true;\nwatch(scenario, () => {\n  failNext = true;\n  selected.value = null;\n});\nconst loader = computed<SolOptionLoader | undefined>(() => {\n  const responseMode = scenario.value;\n  if (responseMode === 'local') return undefined;\n  return (query, signal) =>\n    new Promise<readonly SolOption[]>((resolve, reject) => {\n      const cancel = () => {\n        clearTimeout(timer);\n        reject(new DOMException('Cancelled', 'AbortError'));\n      };\n      const timer = setTimeout(\n        () => {\n          signal.removeEventListener('abort', cancel);\n          if (responseMode === 'error' && failNext) {\n            failNext = false;\n            reject(new Error('Simulated response'));\n            return;\n          }\n          resolve(options.filter((item) => item.label.includes(query.trim())));\n        },\n        query.includes('느림') ? 450 : 150,\n      );\n      signal.addEventListener('abort', cancel, { once: true });\n      if (signal.aborted) cancel();\n    });\n});\n</script>\n<template>\n  <SCard :heading-level=\"2\" :title=\"part ? undefined : '로컬 입력 조합'\">\n    <SCard :heading-level=\"part ? 2 : 3\" v-if=\"!part || part === 'date'\" title=\"단일 날짜와 기간\">\n      <SSelect\n        id=\"recipe-date-mode\"\n        v-model=\"mode\"\n        label=\"개발 설정 시연\"\n        :options=\"[\n          { value: 'single', label: '단일 날짜' },\n          { value: 'range', label: '기간' },\n        ]\"\n        required\n      />\n      <SDatePicker id=\"recipe-date\" v-model=\"date\" label=\"가상 일정\" :mode=\"dateMode\" />\n      <p role=\"status\">완료값: {{ JSON.stringify(date) }}</p>\n    </SCard>\n    <SCard\n      :heading-level=\"part ? 2 : 3\"\n      v-if=\"!part || part === 'files'\"\n      title=\"로컬 파일 선택과 드롭\"\n    >\n      <SFileInput\n        id=\"recipe-files\"\n        v-model=\"files\"\n        label=\"가상 첨부 파일\"\n        accept=\".txt,.png,.jpg,.jpeg,.pdf\"\n        :max-files=\"3\"\n        :max-file-size=\"2 * 1024 * 1024\"\n        help=\"파일을 외부로 보내거나 내용을 읽지 않습니다. 이름·형식·크기만 이 화면 메모리에 표시합니다.\"\n      />\n    </SCard>\n    <SCard\n      :heading-level=\"part ? 2 : 3\"\n      v-if=\"!part || part === 'autocomplete'\"\n      title=\"단일 자동완성\"\n    >\n      <SSelect\n        id=\"recipe-autocomplete-mode\"\n        v-model=\"scenario\"\n        label=\"가상 응답\"\n        :options=\"[\n          { value: 'local', label: '즉시 로컬' },\n          { value: 'async', label: '지연 응답' },\n          { value: 'error', label: '오류 후 재시도' },\n        ]\"\n        required\n      />\n      <SAutocomplete\n        id=\"recipe-autocomplete\"\n        v-model=\"selected\"\n        label=\"가상 분류 검색\"\n        :options=\"options\"\n        :load-options=\"loader\"\n        :debounce=\"0\"\n        :locale=\"{ retry: '검색 다시 시도' }\"\n        help=\"방향키·Enter 선택, Escape 닫기. 직접 입력은 검색어이며 선택한 값만 반영합니다. 비동기 응답도 브라우저 안의 가상 처리입니다.\"\n      />\n      <p role=\"status\">선택값: {{ selected || '없음' }}</p>\n    </SCard>\n  </SCard>\n</template>\n",
  "form": "<script setup lang=\"ts\">\nimport { sRules } from 'solyi-ui';\nimport type { SFormHandle, SFormSubmitEvent } from 'solyi-ui';\n\nconst form = useTemplateRef<SFormHandle>('form');\nconst name = ref('');\nconst kind = ref<string | null>('note');\nconst fail = ref(false);\nconst busy = ref(false);\nconst done = ref(false);\nconst serverError = ref('');\nconst nameRules = [\n  sRules.required('이름을 입력해 주세요.'),\n  sRules.minLength(3, '이름을 3자 이상 입력해 주세요.'),\n];\nlet timer: ReturnType<typeof setTimeout>;\n\nasync function save(event: SFormSubmitEvent) {\n  if (busy.value) return;\n  done.value = false;\n  serverError.value = '';\n  const result = await event;\n  if (!result?.valid) {\n    form.value?.focus();\n    return;\n  }\n  busy.value = true;\n  timer = setTimeout(() => {\n    busy.value = false;\n    if (fail.value)\n      serverError.value =\n        '가상 요청 실패입니다. 입력값은 유지됩니다. 실패 옵션을 끄고 다시 확인하세요.';\n    else done.value = true;\n  }, 400);\n}\nonBeforeUnmount(() => clearTimeout(timer));\n</script>\n\n<template>\n  <SCard :heading-level=\"2\" title=\"입력과 검증·복구\">\n    <SForm ref=\"form\" class=\"sol-stack\" @submit.prevent=\"save\">\n      <SRow>\n        <SCol cols=\"12\" md=\"8\">\n          <STextField\n            id=\"recipe-form-name\"\n            v-model=\"name\"\n            label=\"가상 프로젝트 이름\"\n            :rules=\"nameRules\"\n            required\n          />\n        </SCol>\n        <SCol cols=\"12\" md=\"4\">\n          <SSelect\n            id=\"recipe-form-kind\"\n            v-model=\"kind\"\n            label=\"프로젝트 종류\"\n            :options=\"[\n              { value: 'note', label: '기록' },\n              { value: 'search', label: '탐색' },\n            ]\"\n            required\n          />\n        </SCol>\n      </SRow>\n      <SCheckbox id=\"recipe-form-fail\" v-model=\"fail\" label=\"실패를 흉내 내기\" />\n      <SAlert v-if=\"serverError\" tone=\"danger\" :title=\"serverError\" live=\"polite\" />\n      <SAlert v-if=\"done\" tone=\"success\" title=\"✓ 가상 입력을 확인했어요.\" live=\"polite\" />\n      <div class=\"sol-actions\">\n        <SBtn type=\"submit\" variant=\"primary\" :loading=\"busy\">프로젝트 확인</SBtn>\n        <SBtn @click=\"form?.resetValidation()\">검증 표시 지우기</SBtn>\n      </div>\n    </SForm>\n  </SCard>\n</template>\n",
  "advanced-inputs": "<script setup lang=\"ts\">\ndefineProps<{ part?: string }>();\nconst note = ref(''),\n  amount = ref<number | null>(2),\n  tags = ref<string[]>([]);\nconst options = [\n  { value: 'garden', label: '정원' },\n  { value: 'book', label: '책장' },\n  { value: 'walk', label: '산책' },\n];\n</script>\n<template>\n  <SCard :heading-level=\"2\" :title=\"part ? undefined : '여러 줄·숫자·태그'\">\n    <STextarea\n      v-if=\"!part || part === 'textarea'\"\n      id=\"recipe-note\"\n      v-model=\"note\"\n      label=\"가상 기록 설명\"\n      :maxlength=\"120\"\n    />\n    <SNumberInput\n      v-if=\"!part || part === 'number'\"\n      id=\"recipe-amount\"\n      v-model=\"amount\"\n      label=\"가상 목표 개수\"\n      :min=\"0\"\n      :max=\"10\"\n      :step=\"2\"\n    />\n    <SMultiSelect\n      v-if=\"!part || part === 'multiselect'\"\n      id=\"recipe-tags\"\n      v-model=\"tags\"\n      label=\"가상 분류\"\n      :options=\"options\"\n      :max-selected=\"2\"\n    />\n    <p v-if=\"!part\" role=\"status\">{{ amount }}개 · {{ tags.join(', ') || '선택 없음' }}</p>\n  </SCard>\n</template>\n",
  "selection": "<script setup lang=\"ts\">\nconst multiple = ref(false),\n  single = ref<string | null>('brief'),\n  immediate = ref(false);\nconst options = [\n  { value: 'brief', label: '간단히' },\n  { value: 'full', label: '자세히' },\n];\n</script>\n<template>\n  <SCard :heading-level=\"2\" title=\"선택의 의미\">\n    <SCheckbox\n      class=\"sol-choice-row\"\n      id=\"recipe-multiple\"\n      v-model=\"multiple\"\n      label=\"자료 포함 · 다중 선택의 한 항목\"\n    />\n    <SRadioGroup\n      class=\"sol-choice-row\"\n      id=\"recipe-single\"\n      v-model=\"single\"\n      label=\"한 가지 표시 방식\"\n      :options=\"options\"\n    />\n    <SSwitch id=\"recipe-immediate\" v-model=\"immediate\" label=\"바꾸는 즉시 적용\" />\n    <p role=\"status\">\n      자료 {{ multiple ? '포함' : '제외' }} · {{ single }} · 즉시 설정\n      {{ immediate ? '켬' : '끔' }}\n    </p>\n  </SCard>\n</template>\n",
  "fields": "<script setup lang=\"ts\">\nconst field = useTemplateRef<{ focus(): void }>('field');\nconst serverRejected = ref(false);\nconst value = ref(''),\n  submitted = ref(false);\nconst error = computed(() =>\n  submitted.value && value.value.trim().length < 3 ? '3자 이상 입력해 주세요.' : '',\n);\nfunction check() {\n  submitted.value = true;\n  if (error.value) nextTick(() => field.value?.focus());\n}\n</script>\n<template>\n  <SCard :heading-level=\"2\" title=\"텍스트 입력\">\n    <form class=\"sol-stack\" @submit.prevent=\"check\" novalidate>\n      <STextField\n        id=\"recipe-field\"\n        ref=\"field\"\n        v-model=\"value\"\n        label=\"가상 기록 제목\"\n        required\n        help=\"3자 이상. 이 페이지 메모리에만 남습니다.\"\n        :error=\"error\"\n        :server-error=\"\n          serverRejected ? '이미 사용 중인 가상 이름입니다. 다른 이름을 입력해 주세요.' : ''\n        \"\n      />\n      <STextField\n        id=\"recipe-readonly\"\n        model-value=\"읽기 전용 예시\"\n        label=\"수정할 수 없는 값\"\n        readonly\n      />\n      <STextField\n        id=\"recipe-disabled-field\"\n        model-value=\"아직 만들 수 없어요\"\n        label=\"공유 주소 · 비활성\"\n        disabled\n      />\n      <SBtn type=\"submit\" variant=\"primary\">입력 확인</SBtn>\n      <SAlert\n        v-if=\"submitted && !error && !serverRejected\"\n        tone=\"success\"\n        title=\"✓ 사용할 수 있는 이름입니다.\"\n        ><p>예시 입력값입니다.</p></SAlert\n      >\n    </form>\n  </SCard>\n</template>\n",
  "time": "<script setup lang=\"ts\">\nconst time = ref<string | null>('09:00');\n</script>\n<template>\n  <SCard :heading-level=\"2\" title=\"직접 입력과 시·분 선택\">\n    <STimePicker\n      id=\"recipe-time\"\n      v-model=\"time\"\n      label=\"가상 알림 시각\"\n      min=\"09:00\"\n      max=\"18:00\"\n      :step=\"15\"\n      required\n      help=\"HH:mm 또는 HHmm으로 입력하거나 Alt+↓로 패널을 엽니다.\"\n    />\n    <p role=\"status\">완료값: {{ time || '없음' }} · 실제 알림을 예약하지 않습니다.</p>\n  </SCard>\n</template>\n",
  "accordion": "<script setup lang=\"ts\">\nconst expanded = ref(false);\n</script>\n<template>\n  <SCard :heading-level=\"2\" title=\"상세 펼침\">\n    <SAccordion id=\"recipe-accordion\" v-model=\"expanded\" label=\"가상 기록의 상세\">\n      <p>접으면 이 안의 링크가 Tab 순서에서 제외됩니다.</p>\n      <a href=\"https://choi-solyi.github.io/solyi-design-system/\">문서 홈</a>\n    </SAccordion>\n    <p role=\"status\">{{ expanded ? '상세를 펼쳤어요.' : '상세를 접었어요.' }}</p>\n  </SCard>\n</template>\n",
  "navigation": "<script setup lang=\"ts\">\nconst drawer = ref(false),\n  toast = ref(false),\n  detail = ref(false);\nconst path = computed(() => [\n  { id: 'home', label: '기록함' },\n  { id: 'current', label: detail.value ? '기록 상세' : '기록 목록' },\n]);\n</script>\n<template>\n  <SCard :heading-level=\"2\" title=\"현재 위치와 짧은 상세\">\n    <SBreadcrumbs label=\"가상 경로\" :items=\"path\" @navigate=\"detail = false\" />\n    <div class=\"sol-actions\">\n      <SBtn @click=\"detail = true\">가상 상세로 이동</SBtn>\n      <SBtn @click=\"drawer = true\">사이드 패널 열기</SBtn>\n      <SBtn @click=\"toast = true\">완료 안내</SBtn>\n    </div>\n    <SDialog\n      id=\"recipe-drawer\"\n      v-model=\"drawer\"\n      presentation=\"drawer\"\n      eyebrow=\"FICTIONAL DETAIL\"\n      title=\"작은 정원 기록\"\n    >\n      <p>Dialog와 같은 제목·초점·Escape·복귀 계약을 쓰는 모달 사이드 패널입니다.</p>\n    </SDialog>\n    <SSnackbar\n      id=\"recipe-nav-toast\"\n      v-model=\"toast\"\n      tone=\"success\"\n      message=\"가상 설정을 적용했어요.\"\n      :duration=\"4000\"\n    />\n  </SCard>\n</template>\n",
  "identity-progress": "<script setup lang=\"ts\">\ndefineProps<{ part?: string }>();\nconst nameField = useTemplateRef<{ focus(): void }>('nameField');\nconst categoryField = useTemplateRef<{ focus(): void }>('categoryField');\nconst review = useTemplateRef<HTMLElement>('review');\nconst finalResult = useTemplateRef<HTMLElement>('finalResult');\nconst stage = ref(0),\n  done = ref(false),\n  name = ref(''),\n  category = ref<string | null>(null),\n  error = ref(''),\n  result = ref('');\nconst items = [\n  { id: 'profile', label: '가상 사용자 정보' },\n  { id: 'settings', label: '가상 설정' },\n];\nconst steps = [\n  { id: 'name', label: '이름' },\n  { id: 'category', label: '분류' },\n  { id: 'review', label: '검토' },\n];\nconst current = computed(() => steps[stage.value].id);\nconst completed = computed(() =>\n  steps.slice(0, done.value ? 3 : stage.value).map((item) => item.id),\n);\nasync function move(delta: number) {\n  error.value = '';\n  if (delta > 0 && stage.value === 0 && !name.value.trim())\n    error.value = '가상 이름을 입력해 주세요.';\n  if (delta > 0 && stage.value === 1 && !category.value) error.value = '가상 분류를 선택해 주세요.';\n  if (!error.value) {\n    if (stage.value === 2 && delta > 0) done.value = true;\n    else {\n      stage.value = Math.max(0, Math.min(2, stage.value + delta));\n      done.value = false;\n    }\n  }\n  await nextTick();\n  if (done.value) finalResult.value?.focus();\n  else if (stage.value === 0) nameField.value?.focus();\n  else if (stage.value === 1) categoryField.value?.focus();\n  else review.value?.focus();\n}\nasync function reset() {\n  stage.value = 0;\n  done.value = false;\n  name.value = '';\n  category.value = null;\n  error.value = '';\n  await nextTick();\n  nameField.value?.focus();\n}\n</script>\n<template>\n  <SCard :heading-level=\"2\" :title=\"part ? undefined : '가상 사용자와 단계'\">\n    <div v-if=\"!part || part === 'avatar'\" class=\"sol-actions\">\n      <SAvatar label=\"가상 사용자 민하\" initials=\"민\" />\n      <SSplitBtn\n        id=\"recipe-user\"\n        label=\"민하 · 가상 사용자\"\n        :items=\"items\"\n        @primary=\"result = '가상 사용자 정보'\"\n        @select=\"result = $event\"\n      />\n      <p role=\"status\">{{ result }}</p>\n    </div>\n    <template v-if=\"!part || part === 'steps'\">\n      <SStepper\n        id=\"recipe-steps\"\n        :model-value=\"current\"\n        :items=\"steps\"\n        :completed=\"completed\"\n        label=\"가상 작성 단계\"\n      />\n      <SProgressLinear\n        id=\"recipe-step-progress\"\n        label=\"완료한 단계\"\n        :model-value=\"done ? 3 : stage\"\n        :min=\"0\"\n        :max=\"3\"\n        :show-message=\"false\"\n      />\n      <template v-if=\"!done\">\n        <STextField\n          v-if=\"stage === 0\"\n          id=\"recipe-step-name\"\n          ref=\"nameField\"\n          v-model=\"name\"\n          label=\"가상 프로젝트 이름\"\n          :error=\"error\"\n          required\n        />\n        <SSelect\n          v-else-if=\"stage === 1\"\n          id=\"recipe-step-category\"\n          ref=\"categoryField\"\n          v-model=\"category\"\n          label=\"가상 분류\"\n          :error=\"error\"\n          :options=\"[\n            { value: 'notes', label: '기록' },\n            { value: 'books', label: '독서' },\n          ]\"\n          required\n        />\n        <p v-else id=\"recipe-step-review\" ref=\"review\" tabindex=\"-1\">\n          {{ name }} · {{ category }} · 서버에 저장하지 않는 가상 검토입니다.\n        </p>\n      </template>\n      <p v-else id=\"recipe-step-result\" ref=\"finalResult\" role=\"status\" tabindex=\"-1\">\n        ✓ 가상 단계를 완료했어요. 실제 프로젝트는 만들지 않습니다.\n      </p>\n      <div class=\"sol-actions\">\n        <SBtn :disabled=\"stage === 0\" @click=\"move(-1)\">이전 단계</SBtn>\n        <SBtn :disabled=\"done\" @click=\"move(1)\">{{ stage === 2 ? '가상 완료' : '다음 단계' }}</SBtn>\n        <SBtn @click=\"reset\">처음부터</SBtn>\n      </div>\n    </template>\n  </SCard>\n</template>\n",
  "content-tabs": "<script setup lang=\"ts\">\nconst tab = ref('summary'),\n  memo = ref('');\nconst items = [\n  { value: 'summary', label: '요약' },\n  { value: 'detail', label: '상세' },\n  { value: 'blocked', label: '비활성', disabled: true },\n];\n</script>\n<template>\n  <SCard :heading-level=\"2\" title=\"같은 맥락의 탭\">\n    <STabs id=\"recipe-tabs\" v-model=\"tab\" label=\"기록 보기\" :items=\"items\">\n      <template #panel-summary><p>방향키로 탭을 바꾸세요.</p></template>\n      <template #panel-detail>\n        <STextField id=\"recipe-tab-memo\" v-model=\"memo\" label=\"탭을 바꾸어도 유지되는 메모\" />\n      </template>\n    </STabs>\n  </SCard>\n</template>\n",
  "tree": "<script setup lang=\"ts\">\nimport type { STreeItem, SBarChartItem } from 'solyi-ui';\ndefineProps<{ part?: string }>();\nconst selected = ref<string | null>(null),\n  expanded = ref<string[]>([]),\n  week = ref<string | null>('current');\nconst items: STreeItem[] = [\n  {\n    id: 'notes',\n    label: '기록',\n    children: [\n      { id: 'garden', label: '작은 정원' },\n      { id: 'book', label: '저녁 책장' },\n    ],\n  },\n  { id: 'archive', label: '보관', children: [{ id: 'walk', label: '주말 산책' }] },\n];\nconst chart = computed<SBarChartItem[]>(() =>\n  ['월요일', '화요일', '수요일', '목요일'].map((label, index) => ({\n    id: String(index),\n    label,\n    value: (week.value === 'current' ? [2, 4, 0, 5] : [1, 3, 2, 4])[index],\n  })),\n);\nconst total = computed(() => chart.value.reduce((sum, item) => sum + item.value, 0));\n</script>\n<template>\n  <SCard :heading-level=\"2\" :title=\"part ? undefined : '가상 자료의 차트와 계층'\">\n    <template v-if=\"!part || part === 'chart'\">\n      <SSelect\n        id=\"recipe-chart-week\"\n        v-model=\"week\"\n        label=\"가상 활동 주간\"\n        :options=\"[\n          { value: 'current', label: '이번 주' },\n          { value: 'previous', label: '지난주' },\n        ]\"\n      />\n      <p role=\"status\">총 {{ total }}개 기록 · 가상 자료</p>\n      <SBarChart\n        id=\"recipe-chart\"\n        label=\"가상 활동 횟수 · 차트와 같은 자료\"\n        :items=\"chart\"\n        category-label=\"요일\"\n        value-label=\"기록 수\"\n      />\n    </template>\n    <template v-if=\"!part || part === 'tree'\">\n      <STree\n        id=\"recipe-tree\"\n        v-model=\"selected\"\n        v-model:expanded=\"expanded\"\n        label=\"가상 기록 폴더\"\n        :items=\"items\"\n      />\n      <p role=\"status\">선택: {{ selected || '없음' }}</p>\n    </template>\n  </SCard>\n</template>\n",
  "feedback": "<script setup lang=\"ts\">\nconst open = ref(false),\n  recovered = ref(false);\n</script>\n<template>\n  <SCard :heading-level=\"2\" title=\"상태와 다음 행동\">\n    <SAlert v-if=\"!recovered\" tone=\"danger\" title=\"가상 저장을 완료하지 못했어요.\">\n      <p>입력 내용은 유지됩니다.</p>\n      <template #actions>\n        <SBtn variant=\"inline\" @click=\"recovered = true\"> 다시 시도 </SBtn>\n      </template>\n    </SAlert>\n    <SAlert v-else tone=\"success\" title=\"✓ 가상 저장을 확인했어요.\" />\n    <SBtn @click=\"open = true\">짧은 완료 안내</SBtn>\n    <SSnackbar\n      id=\"recipe-feedback-toast\"\n      v-model=\"open\"\n      tone=\"success\"\n      message=\"가상 작업을 확인했어요.\"\n      :duration=\"4000\"\n    />\n  </SCard>\n</template>\n",
  "dialog": "<script setup lang=\"ts\">\nconst open = ref(false);\n</script>\n<template>\n  <SCard :heading-level=\"2\" title=\"상세 대화상자\">\n    <SBtn id=\"recipe-dialog-open\" @click=\"open = true\"> 상세 열기 </SBtn>\n    <SDialog id=\"recipe-dialog\" v-model=\"open\" eyebrow=\"FICTIONAL PROJECT\" title=\"작은 정원 기록\">\n      <p>데이터와 계정에 연결하지 않는 상세 예제입니다.</p>\n      <p>Escape로 닫으면 실행 버튼으로 돌아갑니다.</p>\n    </SDialog>\n  </SCard>\n</template>\n",
  "help": "<script setup lang=\"ts\">\nconst open = ref(false);\n</script>\n<template>\n  <SCard :heading-level=\"2\" title=\"짧은 설명과 추가 정보\">\n    <p>짧은 설명에는 툴팁, 읽을 내용과 행동이 있는 추가 정보에는 팝오버를 사용합니다.</p>\n    <div class=\"sol-actions\">\n      <STooltip id=\"recipe-tooltip\" label=\"짧은 설명\" text=\"가상 기록을 찾는 도구예요.\" />\n      <SPopover id=\"recipe-popover\" v-model=\"open\" label=\"추가 정보\" title=\"추가 정보\">\n        <p>읽을 내용과 닫기 행동이 있는 가상 정보입니다.</p>\n      </SPopover>\n    </div>\n    <p class=\"sol-hint\">\n      포커스·포인터·터치로 열고 Escape로 닫습니다. 팝오버는 닫기 버튼과 초점 복귀를 제공합니다.\n    </p>\n  </SCard>\n</template>\n",
  "progress": "<script setup lang=\"ts\">\nimport type { SProgressState } from 'solyi-ui';\nconst state = ref<string | null>('indeterminate'),\n  animated = ref(true),\n  showValue = ref(true),\n  showMessage = ref(true);\nconst resolved = computed(() => state.value as SProgressState);\nconst options = [\n  { value: 'determinate', label: '35% 진행' },\n  { value: 'indeterminate', label: '진행률을 모르는 처리 중' },\n  { value: 'complete', label: '완료' },\n  { value: 'error', label: '오류' },\n];\n</script>\n<template>\n  <SCard :heading-level=\"2\" title=\"값을 아는 진행과 처리 중 표시\">\n    <SSelect\n      id=\"recipe-progress-mode\"\n      v-model=\"state\"\n      label=\"가상 작업 상태\"\n      :options=\"options\"\n      required\n    />\n    <SCheckbox id=\"recipe-progress-motion\" v-model=\"animated\" label=\"처리 중 반복 모션\" />\n    <SCheckbox id=\"recipe-progress-value\" v-model=\"showValue\" label=\"수치 표시\" />\n    <SCheckbox id=\"recipe-progress-message\" v-model=\"showMessage\" label=\"상태 문구 표시\" />\n    <SProgressLinear\n      id=\"recipe-linear\"\n      label=\"선형 진행\"\n      :model-value=\"35\"\n      :state=\"resolved\"\n      :animated=\"animated\"\n      :show-value=\"showValue\"\n      :show-message=\"showMessage\"\n    />\n    <SProgressCircular\n      id=\"recipe-circular\"\n      label=\"원형 진행\"\n      :model-value=\"35\"\n      :state=\"resolved\"\n      :animated=\"animated\"\n      :show-value=\"showValue\"\n      :show-message=\"showMessage\"\n    />\n    <p>\n      알 수 없는 진행률에는 퍼센트를 만들지 않습니다. 움직임 줄이기 설정에서는 정적으로 표시합니다.\n    </p>\n  </SCard>\n</template>\n",
  "chart": "<script setup lang=\"ts\">\nimport type { STreeItem, SBarChartItem } from 'solyi-ui';\ndefineProps<{ part?: string }>();\nconst selected = ref<string | null>(null),\n  expanded = ref<string[]>([]),\n  week = ref<string | null>('current');\nconst items: STreeItem[] = [\n  {\n    id: 'notes',\n    label: '기록',\n    children: [\n      { id: 'garden', label: '작은 정원' },\n      { id: 'book', label: '저녁 책장' },\n    ],\n  },\n  { id: 'archive', label: '보관', children: [{ id: 'walk', label: '주말 산책' }] },\n];\nconst chart = computed<SBarChartItem[]>(() =>\n  ['월요일', '화요일', '수요일', '목요일'].map((label, index) => ({\n    id: String(index),\n    label,\n    value: (week.value === 'current' ? [2, 4, 0, 5] : [1, 3, 2, 4])[index],\n  })),\n);\nconst total = computed(() => chart.value.reduce((sum, item) => sum + item.value, 0));\n</script>\n<template>\n  <SCard :heading-level=\"2\" :title=\"part ? undefined : '가상 자료의 차트와 계층'\">\n    <template v-if=\"!part || part === 'chart'\">\n      <SSelect\n        id=\"recipe-chart-week\"\n        v-model=\"week\"\n        label=\"가상 활동 주간\"\n        :options=\"[\n          { value: 'current', label: '이번 주' },\n          { value: 'previous', label: '지난주' },\n        ]\"\n      />\n      <p role=\"status\">총 {{ total }}개 기록 · 가상 자료</p>\n      <SBarChart\n        id=\"recipe-chart\"\n        label=\"가상 활동 횟수 · 차트와 같은 자료\"\n        :items=\"chart\"\n        category-label=\"요일\"\n        value-label=\"기록 수\"\n      />\n    </template>\n    <template v-if=\"!part || part === 'tree'\">\n      <STree\n        id=\"recipe-tree\"\n        v-model=\"selected\"\n        v-model:expanded=\"expanded\"\n        label=\"가상 기록 폴더\"\n        :items=\"items\"\n      />\n      <p role=\"status\">선택: {{ selected || '없음' }}</p>\n    </template>\n  </SCard>\n</template>\n",
  "composition": "<script setup lang=\"ts\">\nconst query = ref(''),\n  state = ref<string | null>('all'),\n  failed = ref(true);\n</script>\n<template>\n  <SCard :heading-level=\"2\" title=\"컨트롤과 보조 행동의 관계\">\n    <div class=\"sol-filterbar\">\n      <STextField\n        id=\"recipe-composition-query\"\n        v-model=\"query\"\n        label=\"검색\"\n        help=\"도움말이 있어도 컨트롤 시작점은 같습니다.\"\n      />\n      <SSelect\n        id=\"recipe-composition-state\"\n        v-model=\"state\"\n        label=\"상태\"\n        :options=\"[\n          { value: 'all', label: '전체' },\n          { value: 'done', label: '완료' },\n        ]\"\n        required\n      />\n    </div>\n    <SAlert v-if=\"failed\" tone=\"danger\" title=\"가상 자료를 불러오지 못했어요.\">\n      <p>현재 검색 조건은 유지됩니다.</p>\n      <template #actions>\n        <SBtn variant=\"inline\" @click=\"failed = false\"> 다시 시도 </SBtn>\n      </template>\n    </SAlert>\n    <p v-else role=\"status\">✓ 가상 재시도를 확인했어요.</p>\n  </SCard>\n</template>\n",
  "layouts": "<script setup lang=\"ts\">\nconst heading = useTemplateRef<HTMLElement>('heading');\nconst view = ref('list');\nconst selected = ref('작은 정원');\nconst name = ref('가상 사용자');\nconst result = ref('');\n\nfunction move(next: string) {\n  view.value = next;\n  nextTick(() => heading.value?.focus());\n}\n</script>\n\n<template>\n  <SCard :heading-level=\"2\" title=\"설정·목록·상세 화면틀\">\n    <template #actions>\n      <nav class=\"sol-actions\" aria-label=\"가상 화면\">\n        <SBtn @click=\"move('list')\">목록</SBtn>\n        <SBtn @click=\"move('detail')\">상세</SBtn>\n        <SBtn @click=\"move('settings')\">설정</SBtn>\n      </nav>\n    </template>\n    <SContainer fluid class=\"pa-0\">\n      <SRow>\n        <SCol cols=\"12\" md=\"4\">\n          <p>목록·상세·설정은 같은 여백과 반응형 열을 공유합니다.</p>\n        </SCol>\n        <SCol cols=\"12\" md=\"8\">\n          <section>\n            <h3 id=\"recipe-layout-title\" ref=\"heading\" tabindex=\"-1\">\n              {{ view === 'list' ? '목록' : view === 'detail' ? '상세' : '설정' }}\n            </h3>\n            <div v-if=\"view === 'list'\" class=\"sol-actions\">\n              <SBtn\n                v-for=\"row in ['작은 정원', '조용한 책장']\"\n                :key=\"row\"\n                @click=\"\n                  selected = row;\n                  move('detail');\n                \"\n                >{{ row }}</SBtn\n              >\n            </div>\n            <SCard v-else-if=\"view === 'detail'\" :title=\"selected\">\n              <p>가상 기록의 짧은 상세입니다.</p>\n              <template #actions><SBtn @click=\"move('list')\">목록으로</SBtn></template>\n            </SCard>\n            <SForm v-else class=\"sol-stack\" @submit.prevent=\"result = '✓ 가상 설정을 확인했어요.'\">\n              <STextField id=\"recipe-layout-name\" v-model=\"name\" label=\"사용자 이름\" />\n              <SBtn type=\"submit\">설정 확인</SBtn>\n            </SForm>\n            <p role=\"status\">{{ result }}</p>\n          </section>\n        </SCol>\n      </SRow>\n    </SContainer>\n  </SCard>\n</template>\n",
  "data": "<script setup lang=\"ts\">\nimport type { TableColumn, TableRow, TableSort } from 'solyi-ui';\nconst query = ref(''),\n  page = ref(1),\n  selected = ref<string[]>([]),\n  sort = ref<TableSort | null>({ key: 'date', direction: 'descending' }),\n  state = ref<string | null>('ready');\nconst columns: TableColumn[] = [\n  { key: 'name', label: '이름', sortable: true },\n  { key: 'status', label: '상태', width: '96px' },\n  { key: 'date', label: '변경일', width: '128px', sortable: true },\n];\nconst all: TableRow[] = [\n  {\n    id: '1',\n    name: '작은 정원의 아주 긴 가상 기록 제목을 한 줄로 표시합니다',\n    status: '진행 중',\n    date: '2026-10-22',\n  },\n  { id: '2', name: '저녁 책장', status: '초안', date: '2026-10-21' },\n  { id: '3', name: '주말 산책', status: '완료', date: '2026-10-20' },\n  { id: '4', name: '계절 관찰', status: '진행 중', date: '2026-10-19' },\n];\nconst filtered = computed(() =>\n  all\n    .filter((r) => String(r.name).includes(query.value.trim()))\n    .sort((a, b) => {\n      const s = sort.value;\n      return s\n        ? String(a[s.key]).localeCompare(String(b[s.key]), 'ko') *\n            (s.direction === 'ascending' ? 1 : -1)\n        : 0;\n    }),\n);\nconst pages = computed(() => Math.max(1, Math.ceil(filtered.value.length / 2))),\n  rows = computed(() => filtered.value.slice((page.value - 1) * 2, page.value * 2));\nwatch([query, sort], () => (page.value = 1));\nwatch(pages, (p) => (page.value = Math.min(page.value, p)));\n</script>\n<template>\n  <SCard :heading-level=\"2\" title=\"선택·정렬·페이지\">\n    <STextField id=\"recipe-table-search\" v-model=\"query\" label=\"자료 검색\" type=\"search\" />\n    <SSelect\n      id=\"recipe-table-state\"\n      v-model=\"state\"\n      label=\"가상 상태\"\n      :options=\"[\n        { value: 'ready', label: '정상' },\n        { value: 'loading', label: '로딩' },\n        { value: 'error', label: '오류' },\n      ]\"\n      required\n    />\n    <SDataTable\n      caption=\"가상 자료 목록\"\n      :columns=\"columns\"\n      :rows=\"rows\"\n      selectable\n      v-model:selected=\"selected\"\n      v-model:sort=\"sort\"\n      v-model:page=\"page\"\n      :page-count=\"pages\"\n      :loading=\"state === 'loading'\"\n      :error=\"state === 'error' ? '가상 오류입니다. 검색과 선택은 남습니다.' : ''\"\n      @retry=\"state = 'ready'\"\n    />\n    <SBtn variant=\"inline\" :disabled=\"!selected.length\" @click=\"selected = []\"> 선택 해제 </SBtn>\n  </SCard>\n</template>\n"
};
