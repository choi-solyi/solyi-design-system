// Generated from packages/vue-ui/src by scripts/build-component-api.mjs.
export const componentReferences=[
  {
    "name": "SBtn",
    "id": "sbtn",
    "group": "동작",
    "description": "버튼의 기본·보조·로딩·비활성 상태를 구분합니다.",
    "exampleRoute": "component",
    "example": "buttons",
    "source": "packages/vue-ui/src/button.ts",
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
        "type": "'button' | 'submit' | 'reset'",
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
    "name": "SConfirmAction",
    "id": "sconfirm-action",
    "group": "동작",
    "description": "같은 버튼을 두 번 눌러 의도를 확인합니다. 실제 비동기 작업과 오류는 소비 앱에서 처리합니다.",
    "exampleRoute": "component",
    "example": "confirm-action",
    "source": "packages/vue-ui/src/confirm-action.ts",
    "props": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "기본 버튼 이름입니다. 첫 클릭은 확인 대기만 시작하며 type=button으로 폼을 자동 제출하지 않습니다.",
        "values": []
      },
      {
        "name": "confirmLabel",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "confirmLabel 설정값입니다.",
        "values": []
      },
      {
        "name": "timeout",
        "type": "number",
        "required": false,
        "default": "5000",
        "description": "확인 대기 시간(ms)입니다. 기본 5000, 0이면 자동 취소하지 않습니다. Escape와 기본 blur 취소는 유지합니다.",
        "values": []
      },
      {
        "name": "cancelOnBlur",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "cancelOnBlur 설정값입니다.",
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
        "name": "loading",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "소비 앱의 비동기 실행 상태입니다. 대기 확인을 취소하고 재실행을 막으며 버튼 포커스는 유지합니다. confirm listener의 Promise는 자동으로 기다리지 않습니다.",
        "values": []
      },
      {
        "name": "error",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "외부 오류 문구입니다. 확인 대기를 취소하고 접근 가능한 오류를 표시합니다. reset()은 외부 error/loading 값을 변경하지 않습니다.",
        "values": []
      },
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
      }
    ],
    "events": [
      {
        "name": "confirm",
        "signature": "(event: MouseEvent)",
        "description": "confirm 동작이 발생했을 때 전달합니다."
      },
      {
        "name": "cancel",
        "signature": "(reason: SolConfirmCancelReason)",
        "description": "cancel 동작이 발생했을 때 전달합니다."
      },
      {
        "name": "armedChange",
        "signature": "(armed: boolean)",
        "description": "armedChange 동작이 발생했을 때 전달합니다."
      }
    ],
    "slots": [
      {
        "name": "leading",
        "scope": "SolConfirmActionScope",
        "description": "leading 영역의 내용입니다."
      }
    ],
    "methods": [
      {
        "name": "focus",
        "signature": "() => void",
        "description": "사용 가능한 입력 또는 실행 요소로 초점을 이동합니다."
      },
      {
        "name": "reset",
        "signature": "() => void",
        "description": "reset 작업을 실행합니다."
      }
    ],
    "types": [
      {
        "name": "SolConfirmActionScope",
        "source": "interface SolConfirmActionScope {readonly armed:boolean;readonly disabled:boolean;readonly loading:boolean}"
      },
      {
        "name": "SolConfirmCancelReason",
        "source": "type SolConfirmCancelReason='timeout'|'blur'|'escape'|'disabled'|'loading'|'error'|'configuration'|'reset'|'unmount'"
      },
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
    "name": "SIconBtn",
    "id": "sicon-btn",
    "group": "동작",
    "description": "접근 가능한 이름을 갖는 아이콘 전용 버튼입니다.",
    "exampleRoute": "component",
    "example": "icon-button",
    "source": "packages/vue-ui/src/index.ts",
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
        "name": "icon",
        "type": "SolIconName",
        "required": false,
        "default": "undefined",
        "description": "icon 설정값입니다.",
        "values": []
      },
      {
        "name": "size",
        "type": "16 | 20 | 24",
        "required": false,
        "default": "20",
        "description": "아이콘·아바타·원형 진행 표시의 크기입니다.",
        "values": []
      },
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
        "type": "'button' | 'submit' | 'reset'",
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
    "exampleRoute": "component",
    "example": "action-menu",
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
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
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
        "name": "clearable",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "clearable 설정값입니다.",
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
        "name": "modelValue",
        "type": "string | null",
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
        "signature": "(value: string | null)",
        "description": "소비 앱의 모델 값을 갱신합니다."
      },
      {
        "name": "change",
        "signature": "(value: string | null)",
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
      },
      {
        "name": "clear",
        "signature": "(event: SolInputClearEvent<string | null>)",
        "description": "clear 동작이 발생했을 때 전달합니다."
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
      },
      {
        "name": "leading",
        "scope": "SolInputControlScope",
        "description": "leading 영역의 내용입니다."
      },
      {
        "name": "trailing",
        "scope": "SolInputControlScope",
        "description": "trailing 영역의 내용입니다."
      },
      {
        "name": "indicator",
        "scope": "SolInputControlScope",
        "description": "indicator 영역의 내용입니다."
      },
      {
        "name": "status",
        "scope": "SolInputControlScope",
        "description": "status 영역의 내용입니다."
      },
      {
        "name": "loading",
        "scope": "SolInputControlScope",
        "description": "loading 영역의 내용입니다."
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
        "name": "SolInputControlScope",
        "source": "interface SolInputControlScope {\n  readonly hasValue: boolean\n  readonly disabled: boolean\n  readonly readonly: boolean\n  readonly loading: boolean\n  readonly error: string\n  clear(): void\n}"
      },
      {
        "name": "SolInputClearEvent",
        "source": "interface SolInputClearEvent<T> {\n  readonly value: T\n  readonly reason: 'clear'\n}"
      },
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
    "example": "checkbox",
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
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
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
    "name": "SCombobox",
    "id": "scombobox",
    "group": "입력",
    "description": "콤보박스에서 자유 입력 문자열과 후보 선택을 확정합니다. Enter 또는 opt-in blur로 확정하고 옵션 ID는 change.option.value로 전달합니다.",
    "exampleRoute": "component",
    "example": "combobox",
    "source": "packages/vue-ui/src/combobox.ts",
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
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
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
        "name": "clearable",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "clearable 설정값입니다.",
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
        "name": "modelValue",
        "type": "string | null",
        "required": false,
        "default": "null",
        "description": "확정된 표시 문자열 또는 null입니다. 편집 draft는 Enter/opt-in blur 또는 후보 선택 전까지 모델에 반영하지 않습니다. 비어 있는 직접 입력은 null, 그 외 공백은 보존합니다.",
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
        "name": "openOnFocus",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "초점 진입 시 목록을 엽니다. clear·선택·retry의 내부 초점 복원으로 중복 요청하지 않습니다.",
        "values": []
      },
      {
        "name": "commitOn",
        "type": "readonly SolComboboxCommit[]",
        "required": false,
        "default": "['enter']",
        "description": "직접 입력의 확정 시점입니다. 기본 [enter], blur는 opt-in입니다. 후보 클릭 또는 명시적으로 방향키 탐색 후 Enter는 select입니다. 빈 배열은 자동 직접 입력 확정을 사용하지 않습니다.",
        "values": [
          "enter",
          "blur"
        ]
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
        "signature": "(value: string | null)",
        "description": "소비 앱의 모델 값을 갱신합니다."
      },
      {
        "name": "change",
        "signature": "(event: SolComboboxChange)",
        "description": "확정된 표시 문자열 value와 reason(select/custom/clear)을 전달합니다. select에만 option 복사본을 포함하고 option.value는 후보 ID입니다. clear는 이미 빈 모델에도 알림을 보냅니다. 부모가 제안을 거부하면 화면은 부모 모델로 복원됩니다."
      },
      {
        "name": "clear",
        "signature": "(event: SolInputClearEvent<string | null>)",
        "description": "clear 동작이 발생했을 때 전달합니다."
      },
      {
        "name": "search",
        "signature": "(query: string)",
        "description": "IME 조합 중에는 보내지 않고, debounce 전의 검색 문자열을 전달합니다. 실제 로더는 debounce/AbortSignal/stale 응답 무시를 적용합니다."
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
      },
      {
        "name": "leading",
        "scope": "SolInputControlScope",
        "description": "leading 영역의 내용입니다."
      },
      {
        "name": "trailing",
        "scope": "SolInputControlScope",
        "description": "trailing 영역의 내용입니다."
      },
      {
        "name": "indicator",
        "scope": "SolInputControlScope",
        "description": "indicator 영역의 내용입니다."
      },
      {
        "name": "status",
        "scope": "SolInputControlScope",
        "description": "status 영역의 내용입니다."
      },
      {
        "name": "loading",
        "scope": "SolInputControlScope",
        "description": "loading 영역의 내용입니다."
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
        "name": "SolInputControlScope",
        "source": "interface SolInputControlScope {\n  readonly hasValue: boolean\n  readonly disabled: boolean\n  readonly readonly: boolean\n  readonly loading: boolean\n  readonly error: string\n  clear(): void\n}"
      },
      {
        "name": "SolInputClearEvent",
        "source": "interface SolInputClearEvent<T> {\n  readonly value: T\n  readonly reason: 'clear'\n}"
      },
      {
        "name": "SolComboboxChange",
        "source": "type SolComboboxChange =\n  | { readonly value: string; readonly reason: 'select'; readonly option: Readonly<SolOption> }\n  | { readonly value: string | null; readonly reason: 'custom' | 'clear'; readonly option?: never }"
      },
      {
        "name": "SolOption",
        "source": "interface SolOption {value:string;label:string;description?:string;disabled?:boolean}"
      },
      {
        "name": "SolComboboxCommit",
        "source": "type SolComboboxCommit = 'enter' | 'blur'"
      },
      {
        "name": "SolOptionLoader",
        "source": "type SolOptionLoader=(query:string,signal:AbortSignal)=>Promise<readonly SolOption[]>;"
      },
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
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
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
        "name": "clearable",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "clearable 설정값입니다.",
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
      },
      {
        "name": "displayFormatter",
        "type": "SolDateDisplayFormatter",
        "required": false,
        "default": "undefined",
        "description": "ISO 모델과 분리한 날짜 표시 callback입니다. 편집과 제출에는 표시 문자열을 사용하지 않습니다.",
        "values": []
      },
      {
        "name": "pickerPresentation",
        "type": "SolPickerPresentation",
        "required": false,
        "default": "undefined",
        "description": "생략하면 기존 native 모달을 유지합니다. auto는 화면 크기에 맞춰 연결 팝업/모달로 전환하며 popover/dialog는 명시적 opt-in입니다. 열린 auto 전환은 부분 기간 선택을 보존하고 legacy 경계를 바꾸면 취소합니다.",
        "values": []
      },
      {
        "name": "placement",
        "type": "SolPickerPlacement",
        "required": false,
        "default": "'bottom-start'",
        "description": "opt-in 연결 팝업의 logical 시작/끝 위치입니다. 화면 경계에서 flip/shift하며 모달에서는 위치 기준으로 사용하지 않습니다.",
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
      },
      {
        "name": "clear",
        "signature": "(event: SolInputClearEvent<DateValue>)",
        "description": "clear 동작이 발생했을 때 전달합니다."
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
      },
      {
        "name": "leading",
        "scope": "SolInputControlScope",
        "description": "leading 영역의 내용입니다."
      },
      {
        "name": "trailing",
        "scope": "SolInputControlScope",
        "description": "trailing 영역의 내용입니다."
      },
      {
        "name": "indicator",
        "scope": "SolInputControlScope",
        "description": "indicator 영역의 내용입니다."
      },
      {
        "name": "status",
        "scope": "SolInputControlScope",
        "description": "status 영역의 내용입니다."
      },
      {
        "name": "loading",
        "scope": "SolInputControlScope",
        "description": "loading 영역의 내용입니다."
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
        "name": "SolInputControlScope",
        "source": "interface SolInputControlScope {\n  readonly hasValue: boolean\n  readonly disabled: boolean\n  readonly readonly: boolean\n  readonly loading: boolean\n  readonly error: string\n  clear(): void\n}"
      },
      {
        "name": "SolInputClearEvent",
        "source": "interface SolInputClearEvent<T> {\n  readonly value: T\n  readonly reason: 'clear'\n}"
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
        "name": "SolPickerPlacement",
        "source": "type SolPickerPlacement=PickerPlacement;"
      },
      {
        "name": "PickerPlacement",
        "source": "type PickerPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'"
      },
      {
        "name": "SolPickerPresentation",
        "source": "type SolPickerPresentation=PickerPresentation;"
      },
      {
        "name": "PickerPresentation",
        "source": "type PickerPresentation = 'auto' | 'popover' | 'dialog'"
      },
      {
        "name": "SolDateDisplayFormatter",
        "source": "type SolDateDisplayFormatter=(iso:string,locale:Readonly<SolLocale>)=>string;"
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
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
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
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
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
        "name": "clearable",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "clearable 설정값입니다.",
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
      },
      {
        "name": "clear",
        "signature": "(event: SolInputClearEvent<readonly string[]>)",
        "description": "clear 동작이 발생했을 때 전달합니다."
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
      },
      {
        "name": "leading",
        "scope": "SolInputControlScope",
        "description": "leading 영역의 내용입니다."
      },
      {
        "name": "trailing",
        "scope": "SolInputControlScope",
        "description": "trailing 영역의 내용입니다."
      },
      {
        "name": "indicator",
        "scope": "SolInputControlScope",
        "description": "indicator 영역의 내용입니다."
      },
      {
        "name": "status",
        "scope": "SolInputControlScope",
        "description": "status 영역의 내용입니다."
      },
      {
        "name": "loading",
        "scope": "SolInputControlScope",
        "description": "loading 영역의 내용입니다."
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
        "name": "SolInputControlScope",
        "source": "interface SolInputControlScope {\n  readonly hasValue: boolean\n  readonly disabled: boolean\n  readonly readonly: boolean\n  readonly loading: boolean\n  readonly error: string\n  clear(): void\n}"
      },
      {
        "name": "SolInputClearEvent",
        "source": "interface SolInputClearEvent<T> {\n  readonly value: T\n  readonly reason: 'clear'\n}"
      },
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
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
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
        "name": "clearable",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "clearable 설정값입니다.",
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
        "name": "modelValue",
        "type": "number | null",
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
        "description": "양의 유한한 증감 간격입니다. JavaScript Number로 정확한 별도 결과를 표현할 수 없거나 범위를 넘는 증감은 실행하지 않습니다.",
        "values": []
      },
      {
        "name": "presets",
        "type": "readonly SolNumberPreset[]",
        "required": false,
        "default": "[]",
        "description": "범위와 min 기준 step을 만족하는 숫자 preset 목록입니다.",
        "values": []
      },
      {
        "name": "formatValue",
        "type": "SolNumberDisplayFormatter",
        "required": false,
        "default": "undefined",
        "description": "숫자 하나를 받아 화면·접근성 값 표시용 문자열을 반환하는 함수입니다. 모델 값은 숫자로 유지합니다.",
        "values": []
      },
      {
        "name": "unit",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "모델과 parser에 포함하지 않는 표시용 단위입니다.",
        "values": []
      }
    ],
    "events": [
      {
        "name": "update:modelValue",
        "signature": "(value: number | null)",
        "description": "소비 앱의 모델 값을 갱신합니다."
      },
      {
        "name": "change",
        "signature": "(value: number | null)",
        "description": "change 동작이 발생했을 때 전달합니다."
      },
      {
        "name": "invalid",
        "signature": "(message: string)",
        "description": "검증 실패 문구를 전달합니다."
      },
      {
        "name": "blur",
        "signature": "(event: FocusEvent)",
        "description": "blur 동작이 발생했을 때 전달합니다."
      },
      {
        "name": "clear",
        "signature": "(event: SolInputClearEvent<number|null>)",
        "description": "clear 동작이 발생했을 때 전달합니다."
      }
    ],
    "slots": [
      {
        "name": "presets",
        "scope": "{ presets: readonly SolNumberPreset[]; value: number | null; setValue: (value: number) => boolean; isAllowed: (value: number) => boolean; disabled: boolean; readonly: boolean; }",
        "description": "presets 영역의 내용입니다."
      },
      {
        "name": "label",
        "scope": "인자 없음",
        "description": "기본 이름 표시를 바꿉니다. 접근 가능한 이름은 유지합니다."
      },
      {
        "name": "help",
        "scope": "인자 없음",
        "description": "입력 아래의 보조 설명입니다."
      },
      {
        "name": "leading",
        "scope": "SolInputControlScope",
        "description": "leading 영역의 내용입니다."
      },
      {
        "name": "trailing",
        "scope": "SolInputControlScope",
        "description": "trailing 영역의 내용입니다."
      },
      {
        "name": "indicator",
        "scope": "SolInputControlScope",
        "description": "indicator 영역의 내용입니다."
      },
      {
        "name": "status",
        "scope": "SolInputControlScope",
        "description": "status 영역의 내용입니다."
      },
      {
        "name": "loading",
        "scope": "SolInputControlScope",
        "description": "loading 영역의 내용입니다."
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
        "name": "SolInputControlScope",
        "source": "interface SolInputControlScope {\n  readonly hasValue: boolean\n  readonly disabled: boolean\n  readonly readonly: boolean\n  readonly loading: boolean\n  readonly error: string\n  clear(): void\n}"
      },
      {
        "name": "SolNumberPreset",
        "source": "interface SolNumberPreset {value:number;label?:string;disabled?:boolean}"
      },
      {
        "name": "SolInputClearEvent",
        "source": "interface SolInputClearEvent<T> {\n  readonly value: T\n  readonly reason: 'clear'\n}"
      },
      {
        "name": "SolNumberDisplayFormatter",
        "source": "type SolNumberDisplayFormatter=(value:number,locale:Readonly<SolLocale>)=>string;"
      },
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
    "example": "radio-group",
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
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
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
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
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
        "source": "type SolRangeValue = readonly [number, number]"
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
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
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
    "example": "select",
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
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
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
        "name": "clearable",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "clearable 설정값입니다.",
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
        "signature": "(value: string|null)",
        "description": "소비 앱의 모델 값을 갱신합니다."
      },
      {
        "name": "change",
        "signature": "(value: string|null)",
        "description": "change 동작이 발생했을 때 전달합니다."
      },
      {
        "name": "blur",
        "signature": "(event: FocusEvent)",
        "description": "blur 동작이 발생했을 때 전달합니다."
      },
      {
        "name": "clear",
        "signature": "(event: SolInputClearEvent<string|null>)",
        "description": "clear 동작이 발생했을 때 전달합니다."
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
      },
      {
        "name": "leading",
        "scope": "SolInputControlScope",
        "description": "leading 영역의 내용입니다."
      },
      {
        "name": "trailing",
        "scope": "SolInputControlScope",
        "description": "trailing 영역의 내용입니다."
      },
      {
        "name": "indicator",
        "scope": "SolInputControlScope",
        "description": "indicator 영역의 내용입니다."
      },
      {
        "name": "status",
        "scope": "SolInputControlScope",
        "description": "status 영역의 내용입니다."
      },
      {
        "name": "loading",
        "scope": "SolInputControlScope",
        "description": "loading 영역의 내용입니다."
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
        "name": "SolInputControlScope",
        "source": "interface SolInputControlScope {\n  readonly hasValue: boolean\n  readonly disabled: boolean\n  readonly readonly: boolean\n  readonly loading: boolean\n  readonly error: string\n  clear(): void\n}"
      },
      {
        "name": "SolInputClearEvent",
        "source": "interface SolInputClearEvent<T> {\n  readonly value: T\n  readonly reason: 'clear'\n}"
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
    "name": "SSwitch",
    "id": "sswitch",
    "group": "입력",
    "description": "즉시 적용되는 설정을 켜고 끕니다.",
    "exampleRoute": "component",
    "example": "switch",
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
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
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
        "name": "modelValue",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "소비 앱이 소유하는 현재 값입니다. update:modelValue와 연결합니다.",
        "values": []
      },
      {
        "name": "hideLabel",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "기본 false입니다. 외부 설정명이 있는 배치에서 시각 라벨만 숨깁니다. label의 접근 가능한 이름은 유지하고 명시적 aria-label/aria-labelledby를 우선합니다.",
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
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
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
        "name": "clearable",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "clearable 설정값입니다.",
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
        "signature": "(value: string)",
        "description": "소비 앱의 모델 값을 갱신합니다."
      },
      {
        "name": "change",
        "signature": "(value: string)",
        "description": "change 동작이 발생했을 때 전달합니다."
      },
      {
        "name": "blur",
        "signature": "(event: FocusEvent)",
        "description": "blur 동작이 발생했을 때 전달합니다."
      },
      {
        "name": "clear",
        "signature": "(event: SolInputClearEvent<string>)",
        "description": "clear 동작이 발생했을 때 전달합니다."
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
      },
      {
        "name": "leading",
        "scope": "SolInputControlScope",
        "description": "leading 영역의 내용입니다."
      },
      {
        "name": "trailing",
        "scope": "SolInputControlScope",
        "description": "trailing 영역의 내용입니다."
      },
      {
        "name": "indicator",
        "scope": "SolInputControlScope",
        "description": "indicator 영역의 내용입니다."
      },
      {
        "name": "status",
        "scope": "SolInputControlScope",
        "description": "status 영역의 내용입니다."
      },
      {
        "name": "loading",
        "scope": "SolInputControlScope",
        "description": "loading 영역의 내용입니다."
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
        "name": "SolInputControlScope",
        "source": "interface SolInputControlScope {\n  readonly hasValue: boolean\n  readonly disabled: boolean\n  readonly readonly: boolean\n  readonly loading: boolean\n  readonly error: string\n  clear(): void\n}"
      },
      {
        "name": "SolInputClearEvent",
        "source": "interface SolInputClearEvent<T> {\n  readonly value: T\n  readonly reason: 'clear'\n}"
      },
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
    "source": "packages/vue-ui/src/text-field.ts",
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
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
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
        "name": "clearable",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "clearable 설정값입니다.",
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
        "name": "modelValue",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "소비 앱이 소유하는 현재 값입니다. update:modelValue와 연결합니다.",
        "values": []
      },
      {
        "name": "type",
        "type": "'text' | 'search' | 'email' | 'password' | 'tel' | 'url'",
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
      },
      {
        "name": "clear",
        "signature": "(event: SolInputClearEvent<string>)",
        "description": "clear 동작이 발생했을 때 전달합니다."
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
      },
      {
        "name": "leading",
        "scope": "SolInputControlScope",
        "description": "leading 영역의 내용입니다."
      },
      {
        "name": "trailing",
        "scope": "SolInputControlScope",
        "description": "trailing 영역의 내용입니다."
      },
      {
        "name": "indicator",
        "scope": "SolInputControlScope",
        "description": "indicator 영역의 내용입니다."
      },
      {
        "name": "status",
        "scope": "SolInputControlScope",
        "description": "status 영역의 내용입니다."
      },
      {
        "name": "loading",
        "scope": "SolInputControlScope",
        "description": "loading 영역의 내용입니다."
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
        "name": "SolInputControlScope",
        "source": "interface SolInputControlScope {\n  readonly hasValue: boolean\n  readonly disabled: boolean\n  readonly readonly: boolean\n  readonly loading: boolean\n  readonly error: string\n  clear(): void\n}"
      },
      {
        "name": "SolInputClearEvent",
        "source": "interface SolInputClearEvent<T> {\n  readonly value: T\n  readonly reason: 'clear'\n}"
      },
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
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
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
        "name": "clearable",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "clearable 설정값입니다.",
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
        "name": "modelValue",
        "type": "string | null",
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
      },
      {
        "name": "allowManualInput",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "직접 타이핑을 허용합니다. false여도 readonly와 달리 팝업 선택은 허용합니다.",
        "values": []
      },
      {
        "name": "presentation",
        "type": "SolTimePresentation",
        "required": false,
        "default": "'native'",
        "description": "기본 두 native select 또는 opt-in 스크롤 목록입니다. 허용값은 native/list입니다.",
        "values": [
          "native",
          "list"
        ]
      },
      {
        "name": "pickerPresentation",
        "type": "SolPickerPresentation",
        "required": false,
        "default": "undefined",
        "description": "생략하면 기존 body 연결 패널입니다. auto/popover/dialog는 팝업 표시 opt-in이며 presentation=native/list의 내용 선택과 독립적입니다. 표시 전환 중 scrub은 확정 없이 취소합니다.",
        "values": []
      },
      {
        "name": "placement",
        "type": "SolPickerPlacement",
        "required": false,
        "default": "'bottom-start'",
        "description": "opt-in 연결 팝업의 logical 위치입니다. 기본 bottom-start이며 top/bottom과 start/end를 조합합니다. 화면 경계에서 flip/shift합니다.",
        "values": []
      },
      {
        "name": "initialScrollValue",
        "type": "string",
        "required": false,
        "default": "undefined",
        "description": "목록을 열 때의 별도 스크롤 기준입니다. 값 선택이나 모델 변경을 뜻하지 않습니다.",
        "values": []
      },
      {
        "name": "scrollToCurrentTime",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "선택값과 별도 기준이 없으면 현재 시각에 가까운 항목으로 스크롤합니다.",
        "values": []
      },
      {
        "name": "scrubbable",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "입력 옆 전용 손잡이를 켭니다. 드래그·키 반복 중 preview만 발행하고 release에 확정합니다.",
        "values": []
      },
      {
        "name": "listScrubbable",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "list presentation의 전용 행 손잡이를 켭니다. 목록 본문은 native 스크롤을 유지합니다.",
        "values": []
      },
      {
        "name": "scrubPixelsPerStep",
        "type": "number",
        "required": false,
        "default": "undefined",
        "description": "입력 손잡이에서 한 step에 필요한 양수 픽셀입니다. 생략하면 control 높이의 1/4, 잘못된 값은 10px을 사용합니다.",
        "values": []
      }
    ],
    "events": [
      {
        "name": "update:modelValue",
        "signature": "(value: string | null)",
        "description": "소비 앱의 모델 값을 갱신합니다."
      },
      {
        "name": "change",
        "signature": "(value: string | null)",
        "description": "change 동작이 발생했을 때 전달합니다."
      },
      {
        "name": "invalid",
        "signature": "(message: string)",
        "description": "검증 실패 문구를 전달합니다."
      },
      {
        "name": "open",
        "signature": "()",
        "description": "패널이 열린 뒤 전달합니다."
      },
      {
        "name": "close",
        "signature": "(reason: PickerCloseReason)",
        "description": "닫힌 이유를 전달합니다."
      },
      {
        "name": "preview",
        "signature": "(value: SolTimeInteraction)",
        "description": "스크러빙 중 허용 HH:mm 제안입니다. 모델·폼 값은 바꾸지 않습니다."
      },
      {
        "name": "interactionCommit",
        "signature": "(value: SolTimeInteraction)",
        "description": "스크러빙의 포인터·키 release 확정입니다. 기존 change payload는 유지합니다."
      },
      {
        "name": "interactionCancel",
        "signature": "(value: SolTimeInteractionCancel)",
        "description": "스크러빙 취소 사유와 마지막 제안입니다. 모델·change를 쓰지 않습니다."
      },
      {
        "name": "clear",
        "signature": "(event: SolInputClearEvent<string | null>)",
        "description": "clear 동작이 발생했을 때 전달합니다."
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
      },
      {
        "name": "leading",
        "scope": "SolInputControlScope",
        "description": "leading 영역의 내용입니다."
      },
      {
        "name": "trailing",
        "scope": "SolInputControlScope",
        "description": "trailing 영역의 내용입니다."
      },
      {
        "name": "indicator",
        "scope": "SolInputControlScope",
        "description": "indicator 영역의 내용입니다."
      },
      {
        "name": "status",
        "scope": "SolInputControlScope",
        "description": "status 영역의 내용입니다."
      },
      {
        "name": "loading",
        "scope": "SolInputControlScope",
        "description": "loading 영역의 내용입니다."
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
        "name": "SolInputControlScope",
        "source": "interface SolInputControlScope {\n  readonly hasValue: boolean\n  readonly disabled: boolean\n  readonly readonly: boolean\n  readonly loading: boolean\n  readonly error: string\n  clear(): void\n}"
      },
      {
        "name": "SolInputClearEvent",
        "source": "interface SolInputClearEvent<T> {\n  readonly value: T\n  readonly reason: 'clear'\n}"
      },
      {
        "name": "SolTimeInteractionCancel",
        "source": "interface SolTimeInteractionCancel extends SolTimeInteraction { reason: SolTimeCancelReason }"
      },
      {
        "name": "SolTimeInteraction",
        "source": "interface SolTimeInteraction {\n  source: 'input' | 'list'\n  input: 'pointer' | 'keyboard'\n  previousValue: string | null\n  value: string\n}"
      },
      {
        "name": "SolTimeCancelReason",
        "source": "type SolTimeCancelReason = 'escape' | 'pointercancel' | 'capture' | 'blur' | 'disabled' | 'configuration' | 'external' | 'close' | 'unmount'"
      },
      {
        "name": "PickerCloseReason",
        "source": "type PickerCloseReason='close'|'escape'|'outside'|'select'|'disabled'|'mode';"
      },
      {
        "name": "SolPickerPlacement",
        "source": "type SolPickerPlacement=PickerPlacement;"
      },
      {
        "name": "PickerPlacement",
        "source": "type PickerPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'"
      },
      {
        "name": "SolPickerPresentation",
        "source": "type SolPickerPresentation=PickerPresentation;"
      },
      {
        "name": "PickerPresentation",
        "source": "type PickerPresentation = 'auto' | 'popover' | 'dialog'"
      },
      {
        "name": "SolTimePresentation",
        "source": "type SolTimePresentation = 'native' | 'list'"
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
    "example": "breadcrumbs",
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
    "name": "SPagination",
    "id": "spagination",
    "group": "탐색",
    "description": "부모가 소유한 페이지 이동을 제안합니다. 페이지 수 변경은 모델을 자동 수정하지 않습니다.",
    "exampleRoute": "component",
    "example": "pagination",
    "source": "packages/vue-ui/src/pagination.ts",
    "props": [
      {
        "name": "modelValue",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "부모가 소유하는 1부터 시작하는 페이지입니다. 화면에서만 유효 범위로 표시하며 부모가 제안을 거부하거나 pageCount가 바뀌어도 자동으로 수정하지 않습니다.",
        "values": []
      },
      {
        "name": "pageCount",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "전체 페이지 수입니다. 0이면 빈 상태를 표시하고 모든 이동을 막습니다. 소수는 내림, 잘못된 값은 0으로 정규화합니다.",
        "values": []
      },
      {
        "name": "siblingCount",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "현재 페이지 양옆 번호 수입니다. 기본 1, 0–5로 제한하며 처음·마지막 번호를 포함합니다. 좁은 영역에서도 번호를 유지하고 줄바꿈합니다.",
        "values": []
      },
      {
        "name": "compactPagination",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "기본 false입니다. true이면 현재 번호와 이동 버튼만 표시합니다. 화면 폭이 작다는 이유만으로 주변 번호를 자동 숨기지 않습니다. 부모 모델·이벤트는 유지합니다.",
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
        "signature": "(page: number)",
        "description": "소비 앱의 모델 값을 갱신합니다."
      }
    ],
    "slots": [],
    "methods": [
      {
        "name": "focus",
        "signature": "() => void",
        "description": "사용 가능한 입력 또는 실행 요소로 초점을 이동합니다."
      }
    ],
    "types": [],
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
      },
      {
        "name": "busy",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "외부 작업 상태입니다. 본문을 inert로 잠그며 폼 값은 유지합니다. 슬롯에 busy/busyScope를 전달하고 작업 결과를 자동 처리하지 않습니다.",
        "values": []
      },
      {
        "name": "busyScope",
        "type": "'body'|'all'",
        "required": false,
        "default": "'body'",
        "description": "기본 body는 본문만 잠그고 닫기와 액션은 허용합니다. all은 feedback·액션·닫기·Escape·바깥 클릭도 잠급니다. 부모가 modelValue=false로 닫는 제어는 유지합니다.",
        "values": [
          "body",
          "all"
        ]
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
        "scope": "SolDialogScope",
        "description": "기본 내용입니다."
      },
      {
        "name": "feedback",
        "scope": "SolDialogScope",
        "description": "feedback 영역의 내용입니다."
      },
      {
        "name": "actions",
        "scope": "SolDialogScope",
        "description": "내용과 구분된 하단·보조 행동입니다."
      },
      {
        "name": "actions-start",
        "scope": "SolDialogScope",
        "description": "actions-start 영역의 내용입니다."
      }
    ],
    "methods": [],
    "types": [
      {
        "name": "SolDialogScope",
        "source": "interface SolDialogScope {readonly busy:boolean;readonly busyScope:'body'|'all'}"
      }
    ],
    "passthrough": null
  },
  {
    "name": "SLoadingOverlay",
    "id": "sloading-overlay",
    "group": "피드백",
    "description": "기존 Progress를 조합해 영역 또는 화면 작업 상태를 표시합니다. 실제 작업 모델은 소비 앱에서 소유합니다.",
    "exampleRoute": "component",
    "example": "progress",
    "source": "packages/vue-ui/src/loading-overlay.ts",
    "props": [
      {
        "name": "modelValue",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "실제 작업 상태입니다. 표시 타이머는 이 값을 변경하거나 update:modelValue를 보내지 않습니다. aria-busy는 이 모델을 반영합니다.",
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
        "name": "description",
        "type": "string",
        "required": false,
        "default": "undefined",
        "description": "description 설정값입니다.",
        "values": []
      },
      {
        "name": "scope",
        "type": "'container'|'viewport'",
        "required": false,
        "default": "'container'",
        "description": "기본 container는 소유 wrapper만 덮습니다. viewport blocking은 기존 modal host의 stack·focus·scroll lock을 재사용합니다. container는 페이지 전체 포커스나 스크롤을 잠그지 않습니다.",
        "values": [
          "container",
          "viewport"
        ]
      },
      {
        "name": "blocking",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "기본 true입니다. 보이는 동안 원본 영역을 inert로 만듭니다. false는 포커스 trap·스크롤 잠금 없이 조작을 허용합니다. hideContent로 현재 초점이 숨겨질 때만 안전한 표시 영역으로 이동합니다.",
        "values": []
      },
      {
        "name": "kind",
        "type": "'linear'|'circular'",
        "required": false,
        "default": "'circular'",
        "description": "kind 설정값입니다.",
        "values": [
          "linear",
          "circular"
        ]
      },
      {
        "name": "delay",
        "type": "number",
        "required": false,
        "default": "150",
        "description": "기본 150ms입니다. 이 시간 전에 작업이 끝나면 표시하지 않습니다. 0이면 즉시 표시합니다.",
        "values": []
      },
      {
        "name": "minVisibleMs",
        "type": "number",
        "required": false,
        "default": "200",
        "description": "기본 200ms입니다. 한 번 보인 표시는 최소 시간을 유지합니다. 작업이 다시 시작되면 대기 중 숨김을 취소합니다.",
        "values": []
      },
      {
        "name": "hideContent",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "보이는 동안 원본 크기를 유지하면서 내용만 숨깁니다. 숨긴 내용은 접근성 트리와 키보드 탐색에서도 제외합니다.",
        "values": []
      }
    ],
    "events": [
      {
        "name": "visibleChange",
        "signature": "(visible: boolean)",
        "description": "visibleChange 동작이 발생했을 때 전달합니다."
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
    "name": "SBadge",
    "id": "sbadge",
    "group": "표시·레이아웃",
    "description": "상태와 개수를 비대화형 표시로 전달합니다.",
    "exampleRoute": "component",
    "example": "badge",
    "source": "packages/vue-ui/src/primitives.ts",
    "props": [
      {
        "name": "tone",
        "type": "SolTone",
        "required": false,
        "default": "'neutral'",
        "description": "강조·정보·성공·주의·오류의 의미색입니다.",
        "values": [
          "neutral",
          "accent",
          "info",
          "success",
          "warning",
          "danger"
        ]
      },
      {
        "name": "variant",
        "type": "SolTagVariant",
        "required": false,
        "default": "'subtle'",
        "description": "행동의 시각적 위계입니다.",
        "values": [
          "filled",
          "outlined",
          "subtle"
        ]
      },
      {
        "name": "size",
        "type": "SolTagSize",
        "required": false,
        "default": "'md'",
        "description": "아이콘·아바타·원형 진행 표시의 크기입니다.",
        "values": [
          "sm",
          "md"
        ]
      },
      {
        "name": "id",
        "type": "string",
        "required": false,
        "default": "undefined",
        "description": "입력·제목·패널의 접근성 연결에 사용하는 고유 ID입니다.",
        "values": []
      },
      {
        "name": "content",
        "type": "[String, Number]",
        "required": false,
        "default": "undefined",
        "description": "content 설정값입니다.",
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
        "name": "live",
        "type": "'off' | 'polite'",
        "required": false,
        "default": "'off'",
        "description": "보조 기술에 알리는 강도입니다. 초기 정적 내용은 off를 권장합니다.",
        "values": [
          "off",
          "polite"
        ]
      },
      {
        "name": "placement",
        "type": "'top-start' | 'top-end'",
        "required": false,
        "default": "'top-end'",
        "description": "placement 설정값입니다.",
        "values": [
          "top-start",
          "top-end"
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
        "name": "icon",
        "scope": "인자 없음",
        "description": "icon 영역의 내용입니다."
      },
      {
        "name": "anchor",
        "scope": "{ descriptionId: string; }",
        "description": "anchor 영역의 내용입니다."
      }
    ],
    "methods": [],
    "types": [
      {
        "name": "SolTagSize",
        "source": "type SolTagSize = 'sm' | 'md'"
      },
      {
        "name": "SolTagVariant",
        "source": "type SolTagVariant = 'filled' | 'outlined' | 'subtle'"
      },
      {
        "name": "SolTone",
        "source": "type SolTone = 'neutral' | 'accent' | 'info' | 'success' | 'warning' | 'danger'"
      }
    ],
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
        "source": "interface SBarChartItem {\n  id: string\n  label: string\n  value: number\n}"
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
        "name": "description",
        "type": "string",
        "required": false,
        "default": "undefined",
        "description": "description 설정값입니다.",
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
        "name": "title",
        "scope": "인자 없음",
        "description": "title 영역의 내용입니다."
      },
      {
        "name": "leading",
        "scope": "인자 없음",
        "description": "leading 영역의 내용입니다."
      },
      {
        "name": "description",
        "scope": "인자 없음",
        "description": "description 영역의 내용입니다."
      },
      {
        "name": "meta",
        "scope": "인자 없음",
        "description": "meta 영역의 내용입니다."
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
    "types": [],
    "passthrough": null
  },
  {
    "name": "SChip",
    "id": "schip",
    "group": "표시·레이아웃",
    "description": "짧은 값의 표시·선택·제거를 구분합니다.",
    "exampleRoute": "component",
    "example": "chip",
    "source": "packages/vue-ui/src/primitives.ts",
    "props": [
      {
        "name": "tone",
        "type": "SolTone",
        "required": false,
        "default": "'neutral'",
        "description": "강조·정보·성공·주의·오류의 의미색입니다.",
        "values": [
          "neutral",
          "accent",
          "info",
          "success",
          "warning",
          "danger"
        ]
      },
      {
        "name": "variant",
        "type": "SolTagVariant",
        "required": false,
        "default": "'subtle'",
        "description": "행동의 시각적 위계입니다.",
        "values": [
          "filled",
          "outlined",
          "subtle"
        ]
      },
      {
        "name": "size",
        "type": "SolTagSize",
        "required": false,
        "default": "'md'",
        "description": "아이콘·아바타·원형 진행 표시의 크기입니다.",
        "values": [
          "sm",
          "md"
        ]
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
        "name": "selectable",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "행 선택 체크박스를 표시합니다.",
        "values": []
      },
      {
        "name": "selected",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "선택한 자료의 ID 목록입니다.",
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
        "name": "removable",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "removable 설정값입니다.",
        "values": []
      },
      {
        "name": "removeLabel",
        "type": "string",
        "required": false,
        "default": "undefined",
        "description": "removeLabel 설정값입니다.",
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
        "name": "update:selected",
        "signature": "(selected: boolean)",
        "description": "해당 상태의 변경을 소비 앱에 전달합니다."
      },
      {
        "name": "click",
        "signature": "(event: MouseEvent)",
        "description": "click 동작이 발생했을 때 전달합니다."
      },
      {
        "name": "remove",
        "signature": "(event: MouseEvent)",
        "description": "remove 동작이 발생했을 때 전달합니다."
      }
    ],
    "slots": [
      {
        "name": "default",
        "scope": "인자 없음",
        "description": "기본 내용입니다."
      },
      {
        "name": "leading",
        "scope": "인자 없음",
        "description": "leading 영역의 내용입니다."
      },
      {
        "name": "trailing",
        "scope": "인자 없음",
        "description": "trailing 영역의 내용입니다."
      }
    ],
    "methods": [],
    "types": [
      {
        "name": "SolTagSize",
        "source": "type SolTagSize = 'sm' | 'md'"
      },
      {
        "name": "SolTagVariant",
        "source": "type SolTagVariant = 'filled' | 'outlined' | 'subtle'"
      },
      {
        "name": "SolTone",
        "source": "type SolTone = 'neutral' | 'accent' | 'info' | 'success' | 'warning' | 'danger'"
      }
    ],
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
        "name": "siblingCount",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "현재 페이지 양옆 번호 수입니다. 기본 1, 0–5로 제한하며 처음·마지막 번호를 포함합니다. 좁은 영역에서도 번호를 유지하고 줄바꿈합니다.",
        "values": []
      },
      {
        "name": "compactPagination",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "기본 false입니다. true이면 현재 번호와 이동 버튼만 표시합니다. 화면 폭이 작다는 이유만으로 주변 번호를 자동 숨기지 않습니다. 부모 모델·이벤트는 유지합니다.",
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
    "name": "SEmptyState",
    "id": "sempty-state",
    "group": "표시·레이아웃",
    "description": "빈 자료의 설명과 다음 행동을 표시합니다. 로딩·오류 상태는 별도로 구성합니다.",
    "exampleRoute": "component",
    "example": "empty",
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
        "required": true,
        "default": "undefined",
        "description": "표면 또는 패널의 제목입니다.",
        "values": []
      },
      {
        "name": "description",
        "type": "string",
        "required": false,
        "default": "undefined",
        "description": "description 설정값입니다.",
        "values": []
      },
      {
        "name": "icon",
        "type": "SolIconName",
        "required": false,
        "default": "undefined",
        "description": "icon 설정값입니다.",
        "values": []
      },
      {
        "name": "variant",
        "type": "'card'|'page'",
        "required": false,
        "default": "'card'",
        "description": "행동의 시각적 위계입니다.",
        "values": [
          "card",
          "page"
        ]
      },
      {
        "name": "headingLevel",
        "type": "2|3|4",
        "required": false,
        "default": "3",
        "description": "문서의 제목 위계입니다. 화면의 실제 h2·h3·h4 수준에 맞춥니다.",
        "values": []
      },
      {
        "name": "minBlockSize",
        "type": "[String,Number]",
        "required": false,
        "default": "undefined",
        "description": "minBlockSize 설정값입니다.",
        "values": []
      }
    ],
    "events": [],
    "slots": [
      {
        "name": "icon",
        "scope": "인자 없음",
        "description": "icon 영역의 내용입니다."
      },
      {
        "name": "description",
        "scope": "인자 없음",
        "description": "description 영역의 내용입니다."
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
    "name": "SIcon",
    "id": "sicon",
    "group": "표시·레이아웃",
    "description": "공통 선 아이콘을 장식 또는 접근 가능한 이미지로 표시합니다.",
    "exampleRoute": "component",
    "example": "icon",
    "source": "packages/vue-ui/src/primitives.ts",
    "props": [
      {
        "name": "name",
        "type": "SolIconName",
        "required": true,
        "default": "undefined",
        "description": "라디오 입력 등에서 공유하는 HTML 이름입니다.",
        "values": []
      },
      {
        "name": "size",
        "type": "16 | 20 | 24",
        "required": false,
        "default": "20",
        "description": "아이콘·아바타·원형 진행 표시의 크기입니다.",
        "values": []
      },
      {
        "name": "decorative",
        "type": "boolean",
        "required": false,
        "default": "undefined",
        "description": "decorative 설정값입니다.",
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
        "name": "rotate",
        "type": "0 | 90 | 180 | 270",
        "required": false,
        "default": "0",
        "description": "rotate 설정값입니다.",
        "values": []
      }
    ],
    "events": [],
    "slots": [],
    "methods": [],
    "types": [],
    "passthrough": null
  },
  {
    "name": "SMonthCalendar",
    "id": "smonth-calendar",
    "group": "표시·레이아웃",
    "description": "한 달의 날짜와 범용 marker를 조회·탐색합니다. 선택과 표시 월은 부모가 관리합니다.",
    "exampleRoute": "component",
    "example": "advanced-vue",
    "source": "packages/vue-ui/src/month-calendar.ts",
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
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
        "values": []
      },
      {
        "name": "modelValue",
        "type": "string | null",
        "required": false,
        "default": "null",
        "description": "소비 앱이 소유하는 현재 값입니다. update:modelValue와 연결합니다.",
        "values": []
      },
      {
        "name": "month",
        "type": "string",
        "required": true,
        "default": "undefined",
        "description": "month 설정값입니다.",
        "values": []
      },
      {
        "name": "firstDay",
        "type": "CalendarWeekStart",
        "required": false,
        "default": "undefined",
        "description": "firstDay 설정값입니다.",
        "values": []
      },
      {
        "name": "today",
        "type": "string",
        "required": false,
        "default": "undefined",
        "description": "today 설정값입니다.",
        "values": []
      },
      {
        "name": "markers",
        "type": "SolCalendarMarkers",
        "required": false,
        "default": "({})",
        "description": "markers 설정값입니다.",
        "values": []
      },
      {
        "name": "markerLimit",
        "type": "number",
        "required": false,
        "default": "2",
        "description": "markerLimit 설정값입니다.",
        "values": []
      },
      {
        "name": "isDateDisabled",
        "type": "(date: string) => boolean",
        "required": false,
        "default": "undefined",
        "description": "isDateDisabled 설정값입니다.",
        "values": []
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "처리 중 상태입니다. 해당 컴포넌트의 입력·행동 계약을 따릅니다.",
        "values": []
      }
    ],
    "events": [
      {
        "name": "update:modelValue",
        "signature": "(value: string)",
        "description": "소비 앱의 모델 값을 갱신합니다."
      },
      {
        "name": "update:month",
        "signature": "(month: string)",
        "description": "해당 상태의 변경을 소비 앱에 전달합니다."
      },
      {
        "name": "change",
        "signature": "(value: SolCalendarChange)",
        "description": "change 동작이 발생했을 때 전달합니다."
      },
      {
        "name": "month-change",
        "signature": "(value: SolMonthChange)",
        "description": "month-change 동작이 발생했을 때 전달합니다."
      }
    ],
    "slots": [
      {
        "name": "marker",
        "scope": "SolCalendarMarkerScope",
        "description": "marker 영역의 내용입니다."
      },
      {
        "name": "cell",
        "scope": "SolCalendarCellScope",
        "description": "cell 영역의 내용입니다."
      },
      {
        "name": "empty",
        "scope": "범위 없음",
        "description": "empty 영역의 내용입니다."
      },
      {
        "name": "help",
        "scope": "범위 없음",
        "description": "입력 아래의 보조 설명입니다."
      }
    ],
    "methods": [
      {
        "name": "focus",
        "signature": "(date?: string) => void",
        "description": "사용 가능한 입력 또는 실행 요소로 초점을 이동합니다."
      }
    ],
    "types": [
      {
        "name": "SolCalendarCellScope",
        "source": "interface SolCalendarCellScope {\n  date: string\n  day: number\n  selected: boolean\n  today: boolean\n  disabled: boolean\n  markers: readonly SolCalendarMarker[]\n}"
      },
      {
        "name": "SolCalendarMarker",
        "source": "interface SolCalendarMarker {\n  readonly id: string\n  readonly label: string\n  readonly tone?: SolTone\n  readonly icon?: SolIconName\n  readonly category?: SolCategoryId\n}"
      },
      {
        "name": "SolTone",
        "source": "type SolTone = 'neutral' | 'accent' | 'info' | 'success' | 'warning' | 'danger'"
      },
      {
        "name": "SolCalendarMarkerScope",
        "source": "interface SolCalendarMarkerScope {\n  date: string\n  marker: Readonly<SolCalendarMarker>\n  index: number\n}"
      },
      {
        "name": "SolMonthChange",
        "source": "interface SolMonthChange {\n  month: string\n  previousMonth: string\n  reason: SolMonthChangeReason\n}"
      },
      {
        "name": "SolMonthChangeReason",
        "source": "type SolMonthChangeReason = 'previous' | 'next' | 'today' | 'keyboard'"
      },
      {
        "name": "SolCalendarChange",
        "source": "interface SolCalendarChange {\n  value: string\n  previousValue: string | null\n  reason: 'pointer' | 'keyboard'\n}"
      },
      {
        "name": "SolCalendarMarkers",
        "source": "type SolCalendarMarkers = Readonly<Record<string, readonly SolCalendarMarker[]>>"
      },
      {
        "name": "CalendarWeekStart",
        "source": "type CalendarWeekStart = 0 | 1 | 2 | 3 | 4 | 5 | 6"
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
        "type": "'horizontal' | 'vertical'",
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
    "types": [],
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
  },
  {
    "name": "SSortableList",
    "id": "ssortable-list",
    "group": "표시·레이아웃",
    "description": "임의 객체 목록의 순서를 포인터·키보드·이동 버튼으로 제안합니다. 원본 모델은 직접 수정하지 않습니다.",
    "exampleRoute": "component",
    "example": "advanced-vue",
    "source": "packages/vue-ui/src/sortable-list.ts",
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
        "name": "locale",
        "type": "Partial<SolLocale>",
        "required": false,
        "default": "undefined",
        "description": "앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.",
        "values": []
      },
      {
        "name": "modelValue",
        "type": "readonly T[]",
        "required": true,
        "default": "undefined",
        "description": "소비 앱이 소유하는 현재 값입니다. update:modelValue와 연결합니다.",
        "values": []
      },
      {
        "name": "itemKey",
        "type": "(item: T) => SolSortableKey",
        "required": true,
        "default": "undefined",
        "description": "항목의 안정적인 string/유한 number key를 반환합니다. 중복 key는 조작을 막습니다.",
        "values": []
      },
      {
        "name": "itemLabel",
        "type": "(item: T) => string",
        "required": true,
        "default": "undefined",
        "description": "각 항목의 손잡이·이동 버튼·상태 안내에 쓰는 비어 있지 않은 이름입니다.",
        "values": []
      },
      {
        "name": "isItemDisabled",
        "type": "(item: T) => boolean",
        "required": false,
        "default": "undefined",
        "description": "isItemDisabled 설정값입니다.",
        "values": []
      }
    ],
    "events": [
      {
        "name": "update:modelValue",
        "signature": "(items: T[])",
        "description": "소비 앱의 모델 값을 갱신합니다."
      },
      {
        "name": "change",
        "signature": "(proposal: SolSortableProposal<T>)",
        "description": "최종 순서가 달라질 때 items/key/from/to/input 제안을 한 번 보냅니다."
      },
      {
        "name": "start",
        "signature": "(proposal: SolSortableProposal<T>)",
        "description": "키보드/포인터 이동 조작을 시작합니다. 이동 버튼은 바로 제안을 확정합니다."
      },
      {
        "name": "preview",
        "signature": "(proposal: SolSortableProposal<T>)",
        "description": "순서 미리보기 제안입니다. 모델과 DOM 원본 순서는 바꾸지 않습니다."
      },
      {
        "name": "end",
        "signature": "(result: SolSortableEnd<T>)",
        "description": "commit/unchanged/cancel 결과입니다. cancel이면 취소 사유를 포함합니다."
      }
    ],
    "slots": [
      {
        "name": "item",
        "scope": "SolSortableItemScope<T>",
        "description": "item 영역의 내용입니다."
      },
      {
        "name": "empty",
        "scope": "범위 없음",
        "description": "empty 영역의 내용입니다."
      },
      {
        "name": "help",
        "scope": "범위 없음",
        "description": "입력 아래의 보조 설명입니다."
      },
      {
        "name": "handle-icon",
        "scope": "SolSortableItemScope<T>",
        "description": "handle-icon 영역의 내용입니다."
      }
    ],
    "methods": [
      {
        "name": "focus",
        "signature": "(key?: SolSortableKey) => void",
        "description": "사용 가능한 입력 또는 실행 요소로 초점을 이동합니다."
      },
      {
        "name": "cancel",
        "signature": "() => void",
        "description": "cancel 작업을 실행합니다."
      }
    ],
    "types": [
      {
        "name": "SolSortableItemScope",
        "source": "interface SolSortableItemScope<T> {\n  item: T\n  index: number\n  key: SolSortableKey\n  active: boolean\n  disabled: boolean\n}"
      },
      {
        "name": "SolSortableKey",
        "source": "type SolSortableKey = SortableKey"
      },
      {
        "name": "SortableKey",
        "source": "type SortableKey = string | number"
      },
      {
        "name": "SolSortableEnd",
        "source": "type SolSortableEnd<T> =\n  | (SolSortableProposal<T> & { status: 'commit' | 'unchanged' })\n  | (SolSortableProposal<T> & { status: 'cancel'; reason: SolSortableCancelReason })"
      },
      {
        "name": "SolSortableProposal",
        "source": "type SolSortableProposal<T> = SortableProposal<T>"
      },
      {
        "name": "SolSortableCancelReason",
        "source": "type SolSortableCancelReason =\n  | 'escape'\n  | 'tab'\n  | 'blur'\n  | 'disabled'\n  | 'external'\n  | 'configuration'\n  | 'unmount'\n  | 'api'\n  | 'pointercancel'\n  | 'capture'\n  | 'outside'"
      },
      {
        "name": "SortableProposal",
        "source": "interface SortableProposal<T> {\n  items: T[]\n  key: SortableKey\n  from: number\n  to: number\n  input: SortableInput\n}"
      },
      {
        "name": "SortableInput",
        "source": "type SortableInput = 'pointer' | 'keyboard' | 'button'"
      }
    ],
    "passthrough": null
  },
  {
    "name": "STimeGrid",
    "id": "stime-grid",
    "group": "표시·레이아웃",
    "description": "기본 readonly로 열과 분 좌표를 표시하고 opt-in 이동·resize·복제를 제안합니다. 시간대·충돌·저장은 소비 앱이 소유합니다.",
    "exampleRoute": "component",
    "example": "advanced-vue",
    "source": "packages/vue-ui/src/time-grid.ts",
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
        "type": "readonly T[]",
        "required": true,
        "default": "undefined",
        "description": "readonly 임의 객체 배열입니다. accessor로 읽으며 원본 배열·객체를 변경하지 않습니다. 겹침 lane은 시각 배치이며 앱의 충돌 정책을 처리하지 않습니다.",
        "values": []
      },
      {
        "name": "columns",
        "type": "readonly SolTimeGridColumn[]",
        "required": true,
        "default": "undefined",
        "description": "고유 key와 label, 선택적 ISO 달력 date를 받습니다. 분 좌표는 해당 열의 wall time이며 timezone/DST/instant 저장 변환은 앱에서 처리합니다.",
        "values": []
      },
      {
        "name": "itemKey",
        "type": "(item: T) => SolTimeGridKey",
        "required": true,
        "default": "undefined",
        "description": "항목의 안정적인 string/유한 number key를 반환합니다. 중복 key는 조작을 막습니다.",
        "values": []
      },
      {
        "name": "itemLabel",
        "type": "(item: T) => string",
        "required": true,
        "default": "undefined",
        "description": "각 항목의 손잡이·이동 버튼·상태 안내에 쓰는 비어 있지 않은 이름입니다.",
        "values": []
      },
      {
        "name": "itemColumn",
        "type": "(item: T) => string",
        "required": true,
        "default": "undefined",
        "description": "itemColumn 설정값입니다.",
        "values": []
      },
      {
        "name": "itemStart",
        "type": "(item: T) => number",
        "required": true,
        "default": "undefined",
        "description": "0–1440 범위 정수 분을 읽습니다. 시작<끝이며 자정 넘김은 앱에서 항목을 나눕니다. 모델을 Date/UTC 문자열로 변환하지 않습니다.",
        "values": []
      },
      {
        "name": "itemEnd",
        "type": "(item: T) => number",
        "required": true,
        "default": "undefined",
        "description": "0–1440 범위 정수 분을 읽습니다. 시작<끝이며 자정 넘김은 앱에서 항목을 나눕니다. 모델을 Date/UTC 문자열로 변환하지 않습니다.",
        "values": []
      },
      {
        "name": "startMinute",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "표시 범위입니다. 범위 밖 자료는 원본을 바꾸지 않고 clip하며 전체 목록에는 원래 시간을 표시합니다.",
        "values": []
      },
      {
        "name": "endMinute",
        "type": "number",
        "required": false,
        "default": "1440",
        "description": "표시 범위입니다. 범위 밖 자료는 원본을 바꾸지 않고 clip하며 전체 목록에는 원래 시간을 표시합니다.",
        "values": []
      },
      {
        "name": "bands",
        "type": "readonly SolTimeGridBand[]",
        "required": false,
        "default": "[]",
        "description": "bands 설정값입니다.",
        "values": []
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "부모의 작업 상태를 표시하며 기존 자료를 유지합니다. 내부 fetch나 모델 갱신은 하지 않습니다.",
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
        "name": "help",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "입력 아래의 보조 설명입니다.",
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
        "name": "readonly",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "기본 true입니다. false일 때만 편집 의도를 시작하며 읽기·스크롤·전체 목록은 계속 사용할 수 있습니다.",
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
        "name": "snapMinutes",
        "type": "number",
        "required": false,
        "default": "15",
        "description": "1–1440 정수 분 간격입니다. 자정 기준으로 맞추되 열만 바꾸면 기존 비정렬 시간을 보존합니다. 기존 TimePicker의 min 기준 step과 별도입니다.",
        "values": []
      },
      {
        "name": "allowMove",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "allowMove 설정값입니다.",
        "values": []
      },
      {
        "name": "allowResize",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "allowResize 설정값입니다.",
        "values": []
      },
      {
        "name": "allowDuplicate",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "allowDuplicate 설정값입니다.",
        "values": []
      },
      {
        "name": "pendingKeys",
        "type": "readonly SolTimeGridKey[]",
        "required": false,
        "default": "[]",
        "description": "부모가 처리 중인 stable key입니다. 해당 항목의 조작만 막고 진행 중 제안은 취소합니다. 비동기 listener를 자동 await하지 않습니다.",
        "values": []
      },
      {
        "name": "isItemDisabled",
        "type": "(item: T) => boolean",
        "required": false,
        "default": "undefined",
        "description": "임의 객체를 받아 boolean을 반환합니다. 항목별 조작만 막고 내용과 전체 목록은 유지합니다.",
        "values": []
      }
    ],
    "events": [
      {
        "name": "start",
        "signature": "(proposal: SolTimeGridProposal)",
        "description": "원본 key/from 좌표로 로컬 조작을 시작합니다. 부모 데이터는 바꾸지 않습니다."
      },
      {
        "name": "preview",
        "signature": "(proposal: SolTimeGridProposal)",
        "description": "스냅된 to 좌표의 frozen 미리보기입니다. 모델이나 저장을 쓰지 않습니다."
      },
      {
        "name": "commit",
        "signature": "(proposal: SolTimeGridProposal)",
        "description": "마지막 좌표를 한 번 제안합니다. 부모가 승인/거부/새 복제 key/pending과 실제 저장을 소유합니다."
      },
      {
        "name": "cancel",
        "signature": "(result: SolTimeGridCancellation)",
        "description": "마지막 제안과 취소 reason을 전달하고 원본을 유지합니다."
      }
    ],
    "slots": [
      {
        "name": "help",
        "scope": "범위 없음",
        "description": "입력 아래의 보조 설명입니다."
      },
      {
        "name": "band",
        "scope": "SolTimeGridBandScope",
        "description": "band 영역의 내용입니다."
      },
      {
        "name": "item",
        "scope": "SolTimeGridItemScope<T>",
        "description": "item 영역의 내용입니다."
      },
      {
        "name": "empty",
        "scope": "범위 없음",
        "description": "empty 영역의 내용입니다."
      }
    ],
    "methods": [
      {
        "name": "focus",
        "signature": "(key?: SolTimeGridKey) => void",
        "description": "사용 가능한 입력 또는 실행 요소로 초점을 이동합니다."
      },
      {
        "name": "cancel",
        "signature": "() => void",
        "description": "cancel 작업을 실행합니다."
      }
    ],
    "types": [
      {
        "name": "SolTimeGridItemScope",
        "source": "interface SolTimeGridItemScope<T> {\n  readonly item: Readonly<T>\n  readonly key: SolTimeGridKey\n  readonly column: SolTimeGridColumn\n  readonly startMinute: number\n  readonly endMinute: number\n  readonly clipped: boolean\n  readonly active: boolean\n  readonly readonly: boolean\n  readonly disabled: boolean\n  readonly pending: boolean\n  readonly proposal: SolTimeGridProposal | null\n}"
      },
      {
        "name": "SolTimeGridKey",
        "source": "type SolTimeGridKey = TimeGridKey"
      },
      {
        "name": "SolTimeGridColumn",
        "source": "type SolTimeGridColumn = TimeGridColumn"
      },
      {
        "name": "SolTimeGridProposal",
        "source": "type SolTimeGridProposal = TimeGridProposal"
      },
      {
        "name": "TimeGridProposal",
        "source": "interface TimeGridProposal {\n  readonly key: TimeGridKey\n  readonly action: TimeGridAction\n  readonly from: TimeGridCoordinate\n  readonly to: TimeGridCoordinate\n  readonly input: TimeGridInput\n}"
      },
      {
        "name": "TimeGridKey",
        "source": "type TimeGridKey = string | number"
      },
      {
        "name": "TimeGridAction",
        "source": "type TimeGridAction = 'move' | 'resize-start' | 'resize-end' | 'duplicate'"
      },
      {
        "name": "TimeGridCoordinate",
        "source": "interface TimeGridCoordinate {\n  readonly columnKey: string\n  readonly startMinute: number\n  readonly endMinute: number\n}"
      },
      {
        "name": "TimeGridInput",
        "source": "type TimeGridInput = 'keyboard' | 'pointer' | 'button'"
      },
      {
        "name": "TimeGridColumn",
        "source": "interface TimeGridColumn {\n  readonly key: string\n  readonly label: string\n  readonly date?: string\n}"
      },
      {
        "name": "SolTimeGridBandScope",
        "source": "interface SolTimeGridBandScope {\n  readonly band: SolTimeGridBand\n  readonly column: SolTimeGridColumn\n}"
      },
      {
        "name": "SolTimeGridBand",
        "source": "type SolTimeGridBand = TimeGridBand"
      },
      {
        "name": "TimeGridBand",
        "source": "interface TimeGridBand {\n  readonly id: string\n  readonly label: string\n  readonly columnKey?: string\n  readonly startMinute: number\n  readonly endMinute: number\n  readonly category?: SolCategoryId\n}"
      },
      {
        "name": "SolTimeGridCancellation",
        "source": "type SolTimeGridCancellation = TimeGridCancellation"
      },
      {
        "name": "TimeGridCancellation",
        "source": "interface TimeGridCancellation extends TimeGridProposal {\n  readonly reason: TimeGridCancelReason\n}"
      },
      {
        "name": "TimeGridCancelReason",
        "source": "type TimeGridCancelReason =\n  | 'escape'\n  | 'tab'\n  | 'blur'\n  | 'outside'\n  | 'disabled'\n  | 'readonly'\n  | 'loading'\n  | 'pending'\n  | 'external'\n  | 'configuration'\n  | 'pointercancel'\n  | 'capture'\n  | 'unmount'\n  | 'api'\n  | 'button'\n  | 'unchanged'"
      }
    ],
    "passthrough": null
  }
];
export const componentReferenceVersions={"core":"1.1.0","vue-ui":"1.1.0"};
export const componentExampleSources={
  "buttons": "<script setup lang=\"ts\">\nconst busy = ref(false),\n  result = ref('')\nlet timer: ReturnType<typeof setTimeout>\nfunction run() {\n  if (busy.value) return\n  busy.value = true\n  result.value = '처리 중입니다.'\n  timer = setTimeout(() => {\n    result.value = '가상 확인을 마쳤어요.'\n    busy.value = false\n  }, 700)\n}\nonBeforeUnmount(() => clearTimeout(timer))\n</script>\n<template>\n  <SCard :heading-level=\"2\" title=\"버튼 상태와 동작\">\n    <div class=\"sol-actions\">\n      <SBtn variant=\"primary\" :loading=\"busy\" @click=\"run\">확인</SBtn>\n      <SBtn @click=\"result = '보조 동작을 눌렀어요.'\">보조 동작</SBtn>\n      <SBtn variant=\"inline\" @click=\"result = ''\">초기화</SBtn>\n      <SBtn disabled>비활성</SBtn>\n    </div>\n    <p role=\"status\">{{ result }}</p>\n    <p class=\"sol-hint\">\n      확인은 0.7초의 가상 작업을 실행합니다. 처리 중에는 중복 실행을 막고, 비활성 버튼은 조작할 수\n      없습니다.\n    </p>\n  </SCard>\n</template>\n",
  "confirm-action": "<script setup lang=\"ts\">\nimport { useSolLocale } from 'solyi-ui'\n\nconst locale = useSolLocale()\nconst removed = ref(false)\nconst english = computed(() => locale.value.code === 'en-US')\nconst removalResult = ref<HTMLElement | null>(null)\nasync function removeDraft() {\n  removed.value = true\n  await nextTick()\n  removalResult.value?.focus()\n}\n</script>\n<template>\n  <SCard :heading-level=\"2\" :title=\"english ? 'Confirm before removing' : '두 번 눌러 제거 확인'\">\n    <p>\n      {{\n        english\n          ? 'The first press asks for confirmation. The second removes this fictional draft.'\n          : '한 번 누르면 확인 문구로 바뀌고, 한 번 더 누르면 이 화면의 가상 초안이 제거됩니다.'\n      }}\n    </p>\n    <div class=\"sol-actions\">\n      <SConfirmAction\n        :label=\"english ? 'Remove draft' : '초안 제거'\"\n        :confirm-label=\"english ? 'Press again to remove' : '한 번 더 눌러 제거'\"\n        tone=\"danger\"\n        :disabled=\"removed\"\n        @confirm=\"removeDraft\"\n      />\n      <SConfirmAction\n        :label=\"english ? 'Disabled action' : '비활성 동작'\"\n        :confirm-label=\"english ? 'Confirm' : '확인'\"\n        disabled\n      />\n    </div>\n    <p id=\"recipe-confirm-action-result\" ref=\"removalResult\" role=\"status\" tabindex=\"-1\">\n      {{\n        removed\n          ? english\n            ? 'The fictional draft was removed.'\n            : '가상 초안을 제거했습니다.'\n          : english\n            ? 'The draft is still here.'\n            : '초안이 남아 있습니다.'\n      }}\n    </p>\n    <p class=\"sol-hint\">\n      {{\n        english\n          ? 'Escape, moving focus away or waiting cancels the confirmation.'\n          : 'Escape, 다른 곳으로 초점 이동 또는 시간이 지나면 확인 상태가 취소됩니다.'\n      }}\n    </p>\n  </SCard>\n</template>\n",
  "icon-button": "<script setup lang=\"ts\">\nimport { useSolLocale } from 'solyi-ui'\n\nconst locale = useSolLocale()\nconst english = computed(() => locale.value.code === 'en-US')\nconst busy = ref(false),\n  saved = ref(false)\nlet timer: ReturnType<typeof setTimeout>\nfunction save() {\n  if (busy.value) return\n  busy.value = true\n  saved.value = false\n  timer = setTimeout(() => {\n    busy.value = false\n    saved.value = true\n  }, 700)\n}\nonBeforeUnmount(() => clearTimeout(timer))\n</script>\n<template>\n  <SCard :heading-level=\"2\" :title=\"english ? 'Icon-only actions' : '아이콘 버튼 동작'\">\n    <p>\n      {{\n        english\n          ? 'Save performs a fictional local task. Delete demonstrates a disabled action.'\n          : '저장 아이콘은 가상 로컬 작업을 실행하고, 삭제 아이콘은 비활성 상태를 보여줍니다.'\n      }}\n    </p>\n    <div class=\"sol-actions\">\n      <SIconBtn\n        icon=\"save\"\n        :label=\"english ? 'Save example' : '예제 저장'\"\n        :title=\"english ? 'Save example' : '예제 저장'\"\n        :loading=\"busy\"\n        @click=\"save\"\n      />\n      <SIconBtn\n        icon=\"trash\"\n        :label=\"english ? 'Delete (unavailable)' : '삭제 (사용 불가)'\"\n        :title=\"english ? 'Delete (unavailable)' : '삭제 (사용 불가)'\"\n        tone=\"danger\"\n        disabled\n      />\n    </div>\n    <p role=\"status\">\n      {{\n        busy\n          ? english\n            ? 'Saving…'\n            : '저장 중…'\n          : saved\n            ? english\n              ? 'The fictional task finished.'\n              : '가상 저장을 완료했습니다.'\n            : english\n              ? 'Ready to save.'\n              : '저장할 수 있습니다.'\n      }}\n    </p>\n  </SCard>\n</template>\n",
  "action-menu": "<script setup lang=\"ts\">\nconst result = ref('')\nconst items = [\n  { id: 'copy', label: '가상 복제' },\n  { id: 'archive', label: '가상 보관' },\n  { id: 'disabled', label: '비활성', disabled: true },\n]\n</script>\n<template>\n  <SCard :heading-level=\"2\" title=\"더 많은 동작\">\n    <SSplitBtn\n      id=\"recipe-actions\"\n      label=\"가상 내보내기\"\n      :items=\"items\"\n      @primary=\"result = '주 동작 확인'\"\n      @select=\"result = $event\"\n    />\n    <SContextMenu id=\"recipe-context\" label=\"가상 기록\" :items=\"items\" @select=\"result = $event\">\n      <p>우클릭·Shift+F10 또는 표시된 동작 버튼으로 엽니다.</p>\n    </SContextMenu>\n    <p role=\"status\">{{ result }}</p>\n  </SCard>\n</template>\n",
  "autocomplete": "<script setup lang=\"ts\">\nimport { formatSolDate } from 'solyi-ui'\nimport type {\n  DateValue,\n  SolOption,\n  SolOptionLoader,\n  SolDateDisplayFormatter,\n  SolPickerPresentation,\n  SolPickerPlacement,\n} from 'solyi-ui'\n\ndefineProps<{ part?: string }>()\nconst mode = ref<string | null>('range'),\n  date = ref<DateValue>(null)\nconst dateMode = computed(() => (mode.value === 'single' ? 'single' : 'range'))\nconst showWeekday = ref(false)\nconst pickerChoice = ref<string | null>('legacy'),\n  placementChoice = ref<string | null>('bottom-start')\nconst datePickerPresentation = computed<SolPickerPresentation | undefined>(() =>\n  pickerChoice.value === 'auto' ||\n  pickerChoice.value === 'popover' ||\n  pickerChoice.value === 'dialog'\n    ? pickerChoice.value\n    : undefined,\n)\nconst datePlacement = computed<SolPickerPlacement>(() =>\n  placementChoice.value === 'top-start' ||\n  placementChoice.value === 'top-end' ||\n  placementChoice.value === 'bottom-end'\n    ? placementChoice.value\n    : 'bottom-start',\n)\nconst formatDateWithWeekday: SolDateDisplayFormatter = (iso, locale) =>\n  iso +\n  ' (' +\n  formatSolDate(iso, locale, {\n    year: undefined,\n    month: undefined,\n    day: undefined,\n    weekday: 'short',\n  }) +\n  ')'\nwatch(dateMode, () => (date.value = null))\nconst files = ref<File[]>([]),\n  selected = ref<string | null>(null),\n  scenario = ref<string | null>('local')\nconst options: SolOption[] = ['기록', '독서', '식물', '산책', '작은 정원'].map(label => ({\n  value: label,\n  label,\n}))\nlet failNext = true\nwatch(scenario, () => {\n  failNext = true\n  selected.value = null\n})\nconst loader = computed<SolOptionLoader | undefined>(() => {\n  const responseMode = scenario.value\n  if (responseMode === 'local') return undefined\n  return (query, signal) =>\n    new Promise<readonly SolOption[]>((resolve, reject) => {\n      const cancel = () => {\n        clearTimeout(timer)\n        reject(new DOMException('Cancelled', 'AbortError'))\n      }\n      const timer = setTimeout(\n        () => {\n          signal.removeEventListener('abort', cancel)\n          if (responseMode === 'error' && failNext) {\n            failNext = false\n            reject(new Error('Simulated response'))\n            return\n          }\n          resolve(options.filter(item => item.label.includes(query.trim())))\n        },\n        query.includes('느림') ? 450 : 150,\n      )\n      signal.addEventListener('abort', cancel, { once: true })\n      if (signal.aborted) cancel()\n    })\n})\n</script>\n<template>\n  <section class=\"sol-stack\" :aria-labelledby=\"part ? undefined : 'recipe-inputs-title'\">\n    <h2 v-if=\"!part\" id=\"recipe-inputs-title\">로컬 입력 조합</h2>\n    <SCard :heading-level=\"part ? 2 : 3\" v-if=\"!part || part === 'date'\" title=\"단일 날짜와 기간\">\n      <SRadioGroup\n        id=\"recipe-date-mode\"\n        v-model=\"mode\"\n        label=\"개발 설정 시연\"\n        :options=\"[\n          { value: 'single', label: '단일 날짜' },\n          { value: 'range', label: '기간' },\n        ]\"\n        required\n      />\n      <SCheckbox\n        id=\"recipe-date-weekday\"\n        v-model=\"showWeekday\"\n        label=\"요일 표시 · 저장값은 ISO 유지\"\n      />\n      <SSelect\n        id=\"recipe-date-presentation\"\n        v-model=\"pickerChoice\"\n        label=\"팝업 표시 방식\"\n        :options=\"[\n          { value: 'legacy', label: '기존 기본 모달' },\n          { value: 'auto', label: '화면에 맞춰 자동 전환' },\n          { value: 'popover', label: '입력창에 연결된 팝업' },\n          { value: 'dialog', label: '모달 다이얼로그' },\n        ]\"\n      />\n      <SSelect\n        id=\"recipe-date-placement\"\n        v-model=\"placementChoice\"\n        label=\"연결 팝업의 기준 위치\"\n        :disabled=\"!datePickerPresentation\"\n        :options=\"[\n          { value: 'bottom-start', label: '아래 · 시작' },\n          { value: 'bottom-end', label: '아래 · 끝' },\n          { value: 'top-start', label: '위 · 시작' },\n          { value: 'top-end', label: '위 · 끝' },\n        ]\"\n      />\n      <SDatePicker\n        id=\"recipe-date\"\n        v-model=\"date\"\n        clearable\n        label=\"가상 일정\"\n        :mode=\"dateMode\"\n        :picker-presentation=\"datePickerPresentation\"\n        :placement=\"datePlacement\"\n        :display-formatter=\"showWeekday ? formatDateWithWeekday : undefined\"\n      />\n      <p role=\"status\">완료값: {{ JSON.stringify(date) }}</p>\n    </SCard>\n    <SCard\n      :heading-level=\"part ? 2 : 3\"\n      v-if=\"!part || part === 'files'\"\n      title=\"로컬 파일 선택과 드롭\"\n    >\n      <SFileInput\n        id=\"recipe-files\"\n        v-model=\"files\"\n        label=\"가상 첨부 파일\"\n        accept=\".txt,.png,.jpg,.jpeg,.pdf\"\n        :max-files=\"3\"\n        :max-file-size=\"2 * 1024 * 1024\"\n        help=\"파일을 외부로 보내거나 내용을 읽지 않습니다. 이름·형식·크기만 이 화면 메모리에 표시합니다.\"\n      />\n    </SCard>\n    <SCard\n      :heading-level=\"part ? 2 : 3\"\n      v-if=\"!part || part === 'autocomplete'\"\n      title=\"단일 자동완성\"\n    >\n      <SSelect\n        id=\"recipe-autocomplete-mode\"\n        v-model=\"scenario\"\n        label=\"가상 응답\"\n        :options=\"[\n          { value: 'local', label: '즉시 로컬' },\n          { value: 'async', label: '지연 응답' },\n          { value: 'error', label: '오류 후 재시도' },\n        ]\"\n        required\n      />\n      <SAutocomplete\n        id=\"recipe-autocomplete\"\n        v-model=\"selected\"\n        clearable\n        label=\"가상 분류 검색\"\n        :options=\"options\"\n        :load-options=\"loader\"\n        :debounce=\"0\"\n        :locale=\"{ retry: '검색 다시 시도' }\"\n        help=\"방향키·Enter 선택, Escape 닫기. 직접 입력은 검색어이며 선택한 값만 반영합니다. 비동기 응답도 브라우저 안의 가상 처리입니다.\"\n      />\n      <p role=\"status\">선택값: {{ selected || '없음' }}</p>\n    </SCard>\n  </section>\n</template>\n",
  "checkbox": "<script setup lang=\"ts\">\nconst include = ref(true),\n  archived = ref(false)\n</script>\n<template>\n  <SCard :heading-level=\"2\" title=\"독립된 항목 선택 · Checkbox\">\n    <p>각 항목을 따로 선택합니다. 하나를 선택해도 다른 항목의 선택은 바뀌지 않습니다.</p>\n    <SCheckbox id=\"recipe-checkbox-include\" v-model=\"include\" label=\"완료한 항목 포함\" />\n    <SCheckbox id=\"recipe-checkbox-archived\" v-model=\"archived\" label=\"보관한 항목 포함\" />\n    <SCheckbox id=\"recipe-checkbox-disabled\" label=\"선택할 수 없는 항목\" disabled />\n    <p role=\"status\">\n      완료 {{ include ? '포함' : '제외' }} · 보관 {{ archived ? '포함' : '제외' }}\n    </p>\n  </SCard>\n</template>\n",
  "combobox": "<script setup lang=\"ts\">\nimport type { SolComboboxChange, SolComboboxHandle, SolOption, SolOptionLoader } from 'solyi-ui'\n\nconst value = ref<string | null>(null),\n  blurValue = ref<string | null>(null),\n  asyncValue = ref<string | null>(null)\nconst event = ref<SolComboboxChange | null>(null),\n  combo = ref<SolComboboxHandle | null>(null)\nconst readOnly = ref(false),\n  disabled = ref(false),\n  fail = ref(false)\nconst options: readonly SolOption[] = [\n  { value: 'option-alpha', label: 'Alpha', description: '표시 문자열과 옵션 ID를 구분합니다.' },\n  { value: 'option-blocked', label: '선택할 수 없는 후보', disabled: true },\n  { value: 'option-beta', label: 'Beta' },\n  {\n    value: 'option-long',\n    label: '여러 줄 전체 내용에서 확인할 수 있는 아주 긴 후보 이름 '.repeat(6),\n    description: '후보 아래의 전체 내용 펼치기는 키보드와 터치로 사용할 수 있습니다.',\n  },\n]\nconst loadOptions: SolOptionLoader = (query, signal) =>\n  new Promise((resolve, reject) => {\n    if (signal.aborted) {\n      reject(new Error('aborted'))\n      return\n    }\n    const abort = () => {\n      clearTimeout(timer)\n      reject(new Error('aborted'))\n    }\n    const timer = setTimeout(() => {\n      signal.removeEventListener('abort', abort)\n      if (fail.value) reject(new Error('가상 목록 실패'))\n      else\n        resolve(options.filter(option => option.label.toLowerCase().includes(query.toLowerCase())))\n    }, 180)\n    signal.addEventListener('abort', abort, { once: true })\n  })\n</script>\n<template>\n  <SCard title=\"자유 입력과 후보 선택\" :heading-level=\"2\">\n    <div class=\"sol-stack\">\n      <SCombobox\n        id=\"recipe-combobox\"\n        ref=\"combo\"\n        v-model=\"value\"\n        label=\"문자열 또는 후보\"\n        :options=\"options\"\n        clearable\n        :readonly=\"readOnly\"\n        :disabled=\"disabled\"\n        help=\"Enter는 직접 입력을 확정합니다. 방향키로 후보를 탐색한 뒤 Enter를 누르면 선택합니다. Escape는 편집을 취소합니다.\"\n        @change=\"event = $event\"\n      >\n        <template #leading><SIcon name=\"edit\" decorative :size=\"16\" /></template>\n      </SCombobox>\n      <p id=\"recipe-combobox-result\" role=\"status\">\n        확정값: {{ value ?? '없음' }} · reason: {{ event?.reason ?? '없음' }} · option ID:\n        {{ event?.reason === 'select' ? event.option.value : '없음' }}\n      </p>\n      <div class=\"sol-actions\">\n        <SBtn @click=\"combo?.clear()\">메서드로 지우기</SBtn>\n        <SBtn @click=\"combo?.focus()\">초점 이동</SBtn>\n      </div>\n      <SCheckbox id=\"recipe-combobox-readonly\" v-model=\"readOnly\" label=\"보기 전용\" />\n      <SCheckbox id=\"recipe-combobox-disabled\" v-model=\"disabled\" label=\"비활성\" />\n      <SCombobox\n        id=\"recipe-combobox-blur\"\n        v-model=\"blurValue\"\n        label=\"blur 확정 사용\"\n        :options=\"options\"\n        :commit-on=\"['enter', 'blur']\"\n        :open-on-focus=\"false\"\n        clearable\n        help=\"입력 영역 밖으로 초점이 나가면 직접 입력을 확정합니다. 내부 X·목록·전체 내용 탐색은 확정하지 않습니다.\"\n      />\n      <SCombobox\n        id=\"recipe-combobox-async\"\n        v-model=\"asyncValue\"\n        label=\"비동기 후보\"\n        :load-options=\"loadOptions\"\n        :debounce=\"150\"\n        clearable\n        help=\"로컬 타이머를 사용한 가상 목록입니다. 서버 요청이나 저장은 하지 않습니다.\"\n      />\n      <SCheckbox id=\"recipe-combobox-fail\" v-model=\"fail\" label=\"다음 목록 요청 실패\" />\n    </div>\n  </SCard>\n</template>\n",
  "date": "<script setup lang=\"ts\">\nimport { formatSolDate } from 'solyi-ui'\nimport type {\n  DateValue,\n  SolOption,\n  SolOptionLoader,\n  SolDateDisplayFormatter,\n  SolPickerPresentation,\n  SolPickerPlacement,\n} from 'solyi-ui'\n\ndefineProps<{ part?: string }>()\nconst mode = ref<string | null>('range'),\n  date = ref<DateValue>(null)\nconst dateMode = computed(() => (mode.value === 'single' ? 'single' : 'range'))\nconst showWeekday = ref(false)\nconst pickerChoice = ref<string | null>('legacy'),\n  placementChoice = ref<string | null>('bottom-start')\nconst datePickerPresentation = computed<SolPickerPresentation | undefined>(() =>\n  pickerChoice.value === 'auto' ||\n  pickerChoice.value === 'popover' ||\n  pickerChoice.value === 'dialog'\n    ? pickerChoice.value\n    : undefined,\n)\nconst datePlacement = computed<SolPickerPlacement>(() =>\n  placementChoice.value === 'top-start' ||\n  placementChoice.value === 'top-end' ||\n  placementChoice.value === 'bottom-end'\n    ? placementChoice.value\n    : 'bottom-start',\n)\nconst formatDateWithWeekday: SolDateDisplayFormatter = (iso, locale) =>\n  iso +\n  ' (' +\n  formatSolDate(iso, locale, {\n    year: undefined,\n    month: undefined,\n    day: undefined,\n    weekday: 'short',\n  }) +\n  ')'\nwatch(dateMode, () => (date.value = null))\nconst files = ref<File[]>([]),\n  selected = ref<string | null>(null),\n  scenario = ref<string | null>('local')\nconst options: SolOption[] = ['기록', '독서', '식물', '산책', '작은 정원'].map(label => ({\n  value: label,\n  label,\n}))\nlet failNext = true\nwatch(scenario, () => {\n  failNext = true\n  selected.value = null\n})\nconst loader = computed<SolOptionLoader | undefined>(() => {\n  const responseMode = scenario.value\n  if (responseMode === 'local') return undefined\n  return (query, signal) =>\n    new Promise<readonly SolOption[]>((resolve, reject) => {\n      const cancel = () => {\n        clearTimeout(timer)\n        reject(new DOMException('Cancelled', 'AbortError'))\n      }\n      const timer = setTimeout(\n        () => {\n          signal.removeEventListener('abort', cancel)\n          if (responseMode === 'error' && failNext) {\n            failNext = false\n            reject(new Error('Simulated response'))\n            return\n          }\n          resolve(options.filter(item => item.label.includes(query.trim())))\n        },\n        query.includes('느림') ? 450 : 150,\n      )\n      signal.addEventListener('abort', cancel, { once: true })\n      if (signal.aborted) cancel()\n    })\n})\n</script>\n<template>\n  <section class=\"sol-stack\" :aria-labelledby=\"part ? undefined : 'recipe-inputs-title'\">\n    <h2 v-if=\"!part\" id=\"recipe-inputs-title\">로컬 입력 조합</h2>\n    <SCard :heading-level=\"part ? 2 : 3\" v-if=\"!part || part === 'date'\" title=\"단일 날짜와 기간\">\n      <SRadioGroup\n        id=\"recipe-date-mode\"\n        v-model=\"mode\"\n        label=\"개발 설정 시연\"\n        :options=\"[\n          { value: 'single', label: '단일 날짜' },\n          { value: 'range', label: '기간' },\n        ]\"\n        required\n      />\n      <SCheckbox\n        id=\"recipe-date-weekday\"\n        v-model=\"showWeekday\"\n        label=\"요일 표시 · 저장값은 ISO 유지\"\n      />\n      <SSelect\n        id=\"recipe-date-presentation\"\n        v-model=\"pickerChoice\"\n        label=\"팝업 표시 방식\"\n        :options=\"[\n          { value: 'legacy', label: '기존 기본 모달' },\n          { value: 'auto', label: '화면에 맞춰 자동 전환' },\n          { value: 'popover', label: '입력창에 연결된 팝업' },\n          { value: 'dialog', label: '모달 다이얼로그' },\n        ]\"\n      />\n      <SSelect\n        id=\"recipe-date-placement\"\n        v-model=\"placementChoice\"\n        label=\"연결 팝업의 기준 위치\"\n        :disabled=\"!datePickerPresentation\"\n        :options=\"[\n          { value: 'bottom-start', label: '아래 · 시작' },\n          { value: 'bottom-end', label: '아래 · 끝' },\n          { value: 'top-start', label: '위 · 시작' },\n          { value: 'top-end', label: '위 · 끝' },\n        ]\"\n      />\n      <SDatePicker\n        id=\"recipe-date\"\n        v-model=\"date\"\n        clearable\n        label=\"가상 일정\"\n        :mode=\"dateMode\"\n        :picker-presentation=\"datePickerPresentation\"\n        :placement=\"datePlacement\"\n        :display-formatter=\"showWeekday ? formatDateWithWeekday : undefined\"\n      />\n      <p role=\"status\">완료값: {{ JSON.stringify(date) }}</p>\n    </SCard>\n    <SCard\n      :heading-level=\"part ? 2 : 3\"\n      v-if=\"!part || part === 'files'\"\n      title=\"로컬 파일 선택과 드롭\"\n    >\n      <SFileInput\n        id=\"recipe-files\"\n        v-model=\"files\"\n        label=\"가상 첨부 파일\"\n        accept=\".txt,.png,.jpg,.jpeg,.pdf\"\n        :max-files=\"3\"\n        :max-file-size=\"2 * 1024 * 1024\"\n        help=\"파일을 외부로 보내거나 내용을 읽지 않습니다. 이름·형식·크기만 이 화면 메모리에 표시합니다.\"\n      />\n    </SCard>\n    <SCard\n      :heading-level=\"part ? 2 : 3\"\n      v-if=\"!part || part === 'autocomplete'\"\n      title=\"단일 자동완성\"\n    >\n      <SSelect\n        id=\"recipe-autocomplete-mode\"\n        v-model=\"scenario\"\n        label=\"가상 응답\"\n        :options=\"[\n          { value: 'local', label: '즉시 로컬' },\n          { value: 'async', label: '지연 응답' },\n          { value: 'error', label: '오류 후 재시도' },\n        ]\"\n        required\n      />\n      <SAutocomplete\n        id=\"recipe-autocomplete\"\n        v-model=\"selected\"\n        clearable\n        label=\"가상 분류 검색\"\n        :options=\"options\"\n        :load-options=\"loader\"\n        :debounce=\"0\"\n        :locale=\"{ retry: '검색 다시 시도' }\"\n        help=\"방향키·Enter 선택, Escape 닫기. 직접 입력은 검색어이며 선택한 값만 반영합니다. 비동기 응답도 브라우저 안의 가상 처리입니다.\"\n      />\n      <p role=\"status\">선택값: {{ selected || '없음' }}</p>\n    </SCard>\n  </section>\n</template>\n",
  "files": "<script setup lang=\"ts\">\nimport { formatSolDate } from 'solyi-ui'\nimport type {\n  DateValue,\n  SolOption,\n  SolOptionLoader,\n  SolDateDisplayFormatter,\n  SolPickerPresentation,\n  SolPickerPlacement,\n} from 'solyi-ui'\n\ndefineProps<{ part?: string }>()\nconst mode = ref<string | null>('range'),\n  date = ref<DateValue>(null)\nconst dateMode = computed(() => (mode.value === 'single' ? 'single' : 'range'))\nconst showWeekday = ref(false)\nconst pickerChoice = ref<string | null>('legacy'),\n  placementChoice = ref<string | null>('bottom-start')\nconst datePickerPresentation = computed<SolPickerPresentation | undefined>(() =>\n  pickerChoice.value === 'auto' ||\n  pickerChoice.value === 'popover' ||\n  pickerChoice.value === 'dialog'\n    ? pickerChoice.value\n    : undefined,\n)\nconst datePlacement = computed<SolPickerPlacement>(() =>\n  placementChoice.value === 'top-start' ||\n  placementChoice.value === 'top-end' ||\n  placementChoice.value === 'bottom-end'\n    ? placementChoice.value\n    : 'bottom-start',\n)\nconst formatDateWithWeekday: SolDateDisplayFormatter = (iso, locale) =>\n  iso +\n  ' (' +\n  formatSolDate(iso, locale, {\n    year: undefined,\n    month: undefined,\n    day: undefined,\n    weekday: 'short',\n  }) +\n  ')'\nwatch(dateMode, () => (date.value = null))\nconst files = ref<File[]>([]),\n  selected = ref<string | null>(null),\n  scenario = ref<string | null>('local')\nconst options: SolOption[] = ['기록', '독서', '식물', '산책', '작은 정원'].map(label => ({\n  value: label,\n  label,\n}))\nlet failNext = true\nwatch(scenario, () => {\n  failNext = true\n  selected.value = null\n})\nconst loader = computed<SolOptionLoader | undefined>(() => {\n  const responseMode = scenario.value\n  if (responseMode === 'local') return undefined\n  return (query, signal) =>\n    new Promise<readonly SolOption[]>((resolve, reject) => {\n      const cancel = () => {\n        clearTimeout(timer)\n        reject(new DOMException('Cancelled', 'AbortError'))\n      }\n      const timer = setTimeout(\n        () => {\n          signal.removeEventListener('abort', cancel)\n          if (responseMode === 'error' && failNext) {\n            failNext = false\n            reject(new Error('Simulated response'))\n            return\n          }\n          resolve(options.filter(item => item.label.includes(query.trim())))\n        },\n        query.includes('느림') ? 450 : 150,\n      )\n      signal.addEventListener('abort', cancel, { once: true })\n      if (signal.aborted) cancel()\n    })\n})\n</script>\n<template>\n  <section class=\"sol-stack\" :aria-labelledby=\"part ? undefined : 'recipe-inputs-title'\">\n    <h2 v-if=\"!part\" id=\"recipe-inputs-title\">로컬 입력 조합</h2>\n    <SCard :heading-level=\"part ? 2 : 3\" v-if=\"!part || part === 'date'\" title=\"단일 날짜와 기간\">\n      <SRadioGroup\n        id=\"recipe-date-mode\"\n        v-model=\"mode\"\n        label=\"개발 설정 시연\"\n        :options=\"[\n          { value: 'single', label: '단일 날짜' },\n          { value: 'range', label: '기간' },\n        ]\"\n        required\n      />\n      <SCheckbox\n        id=\"recipe-date-weekday\"\n        v-model=\"showWeekday\"\n        label=\"요일 표시 · 저장값은 ISO 유지\"\n      />\n      <SSelect\n        id=\"recipe-date-presentation\"\n        v-model=\"pickerChoice\"\n        label=\"팝업 표시 방식\"\n        :options=\"[\n          { value: 'legacy', label: '기존 기본 모달' },\n          { value: 'auto', label: '화면에 맞춰 자동 전환' },\n          { value: 'popover', label: '입력창에 연결된 팝업' },\n          { value: 'dialog', label: '모달 다이얼로그' },\n        ]\"\n      />\n      <SSelect\n        id=\"recipe-date-placement\"\n        v-model=\"placementChoice\"\n        label=\"연결 팝업의 기준 위치\"\n        :disabled=\"!datePickerPresentation\"\n        :options=\"[\n          { value: 'bottom-start', label: '아래 · 시작' },\n          { value: 'bottom-end', label: '아래 · 끝' },\n          { value: 'top-start', label: '위 · 시작' },\n          { value: 'top-end', label: '위 · 끝' },\n        ]\"\n      />\n      <SDatePicker\n        id=\"recipe-date\"\n        v-model=\"date\"\n        clearable\n        label=\"가상 일정\"\n        :mode=\"dateMode\"\n        :picker-presentation=\"datePickerPresentation\"\n        :placement=\"datePlacement\"\n        :display-formatter=\"showWeekday ? formatDateWithWeekday : undefined\"\n      />\n      <p role=\"status\">완료값: {{ JSON.stringify(date) }}</p>\n    </SCard>\n    <SCard\n      :heading-level=\"part ? 2 : 3\"\n      v-if=\"!part || part === 'files'\"\n      title=\"로컬 파일 선택과 드롭\"\n    >\n      <SFileInput\n        id=\"recipe-files\"\n        v-model=\"files\"\n        label=\"가상 첨부 파일\"\n        accept=\".txt,.png,.jpg,.jpeg,.pdf\"\n        :max-files=\"3\"\n        :max-file-size=\"2 * 1024 * 1024\"\n        help=\"파일을 외부로 보내거나 내용을 읽지 않습니다. 이름·형식·크기만 이 화면 메모리에 표시합니다.\"\n      />\n    </SCard>\n    <SCard\n      :heading-level=\"part ? 2 : 3\"\n      v-if=\"!part || part === 'autocomplete'\"\n      title=\"단일 자동완성\"\n    >\n      <SSelect\n        id=\"recipe-autocomplete-mode\"\n        v-model=\"scenario\"\n        label=\"가상 응답\"\n        :options=\"[\n          { value: 'local', label: '즉시 로컬' },\n          { value: 'async', label: '지연 응답' },\n          { value: 'error', label: '오류 후 재시도' },\n        ]\"\n        required\n      />\n      <SAutocomplete\n        id=\"recipe-autocomplete\"\n        v-model=\"selected\"\n        clearable\n        label=\"가상 분류 검색\"\n        :options=\"options\"\n        :load-options=\"loader\"\n        :debounce=\"0\"\n        :locale=\"{ retry: '검색 다시 시도' }\"\n        help=\"방향키·Enter 선택, Escape 닫기. 직접 입력은 검색어이며 선택한 값만 반영합니다. 비동기 응답도 브라우저 안의 가상 처리입니다.\"\n      />\n      <p role=\"status\">선택값: {{ selected || '없음' }}</p>\n    </SCard>\n  </section>\n</template>\n",
  "form": "<script setup lang=\"ts\">\nimport { sRules } from 'solyi-ui'\nimport type { SFormHandle, SFormSubmitEvent } from 'solyi-ui'\n\nconst form = useTemplateRef<SFormHandle>('form')\nconst name = ref('')\nconst kind = ref<string | null>('note')\nconst fail = ref(false)\nconst busy = ref(false)\nconst done = ref(false)\nconst serverError = ref('')\nconst validationNotice = ref('')\nconst nameRules = [\n  sRules.required('이름을 입력해 주세요.'),\n  sRules.minLength(3, '이름을 3자 이상 입력해 주세요.'),\n]\nlet timer: ReturnType<typeof setTimeout>\n\nasync function save(event: SFormSubmitEvent) {\n  if (busy.value) return\n  done.value = false\n  serverError.value = ''\n  validationNotice.value = ''\n  const result = await event\n  if (!result?.valid) {\n    form.value?.focus()\n    return\n  }\n  busy.value = true\n  timer = setTimeout(() => {\n    busy.value = false\n    if (fail.value)\n      serverError.value =\n        '가상 요청 실패입니다. 입력값은 유지됩니다. 실패 옵션을 끄고 다시 확인하세요.'\n    else done.value = true\n  }, 400)\n}\nfunction clearValidation() {\n  if (busy.value) return\n  form.value?.resetValidation()\n  serverError.value = ''\n  done.value = false\n  validationNotice.value = '검증 표시를 지웠어요. 입력값은 유지됩니다.'\n}\nonBeforeUnmount(() => clearTimeout(timer))\n</script>\n\n<template>\n  <SCard :heading-level=\"2\" title=\"입력과 검증·복구\">\n    <SForm ref=\"form\" class=\"sol-stack\" @submit.prevent=\"save\">\n      <SRow>\n        <SCol cols=\"12\" md=\"8\">\n          <STextField\n            id=\"recipe-form-name\"\n            v-model=\"name\"\n            label=\"가상 프로젝트 이름\"\n            :rules=\"nameRules\"\n            required\n          />\n        </SCol>\n        <SCol cols=\"12\" md=\"4\">\n          <SSelect\n            id=\"recipe-form-kind\"\n            v-model=\"kind\"\n            label=\"프로젝트 종류\"\n            :options=\"[\n              { value: 'note', label: '기록' },\n              { value: 'search', label: '탐색' },\n            ]\"\n            required\n          />\n        </SCol>\n      </SRow>\n      <SCheckbox id=\"recipe-form-fail\" v-model=\"fail\" label=\"실패를 흉내 내기\" />\n      <SAlert v-if=\"serverError\" tone=\"danger\" :title=\"serverError\" live=\"polite\" />\n      <SAlert v-if=\"done\" tone=\"success\" title=\"✓ 가상 입력을 확인했어요.\" live=\"polite\" />\n      <div class=\"sol-actions\">\n        <SBtn type=\"submit\" variant=\"primary\" :loading=\"busy\">프로젝트 확인</SBtn>\n        <SBtn :disabled=\"busy\" @click=\"clearValidation\">검증 표시 지우기</SBtn>\n      </div>\n      <p id=\"recipe-form-validation-result\" role=\"status\">{{ validationNotice }}</p>\n    </SForm>\n  </SCard>\n</template>\n",
  "advanced-inputs": "<script setup lang=\"ts\">\nimport type { SolNumberDisplayFormatter } from 'solyi-ui'\n\ndefineProps<{ part?: string }>()\nconst showNumberFormat = ref(false)\nconst noteClearCount = ref(0)\nconst formatAmount: SolNumberDisplayFormatter = (value, locale) =>\n  new Intl.NumberFormat(locale.code, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(\n    value,\n  )\nconst note = ref(''),\n  amount = ref<number | null>(2),\n  tags = ref<string[]>([])\nconst options = [\n  { value: 'garden', label: '정원' },\n  { value: 'book', label: '책장' },\n  { value: 'walk', label: '산책' },\n]\n</script>\n<template>\n  <SCard :heading-level=\"2\" :title=\"part ? undefined : '여러 줄·숫자·태그'\">\n    <STextarea\n      v-if=\"!part || part === 'textarea'\"\n      id=\"recipe-note\"\n      v-model=\"note\"\n      clearable\n      @clear=\"noteClearCount++\"\n      label=\"가상 기록 설명\"\n      :maxlength=\"120\"\n    />\n    <p v-if=\"!part || part === 'textarea'\" role=\"status\">내용 지움: {{ noteClearCount }}회</p>\n    <SCheckbox\n      v-if=\"!part || part === 'number'\"\n      id=\"recipe-number-format\"\n      v-model=\"showNumberFormat\"\n      label=\"숫자 표시 포맷 · 모델은 숫자 유지\"\n    />\n    <SNumberInput\n      v-if=\"!part || part === 'number'\"\n      id=\"recipe-amount\"\n      v-model=\"amount\"\n      clearable\n      label=\"가상 목표 개수\"\n      :min=\"0\"\n      :max=\"10\"\n      :step=\"2\"\n      unit=\"개\"\n      :presets=\"[{ value: 2 }, { value: 6 }, { value: 10 }, { value: 5, label: '5 · 간격 불일치' }]\"\n      :format-value=\"showNumberFormat ? formatAmount : undefined\"\n    />\n    <SMultiSelect\n      v-if=\"!part || part === 'multiselect'\"\n      id=\"recipe-tags\"\n      v-model=\"tags\"\n      clearable\n      label=\"가상 분류\"\n      :options=\"options\"\n      :max-selected=\"2\"\n    />\n    <p v-if=\"!part\" role=\"status\">{{ amount }}개 · {{ tags.join(', ') || '선택 없음' }}</p>\n    <p v-if=\"part === 'number'\" role=\"status\">숫자 모델: {{ amount === null ? 'null' : amount }}</p>\n  </SCard>\n</template>\n",
  "radio-group": "<script setup lang=\"ts\">\nconst choice = ref<string | null>('brief')\nconst options = [\n  { value: 'brief', label: '간단히' },\n  { value: 'full', label: '자세히' },\n  { value: 'reserved', label: '준비 중인 표시', disabled: true },\n]\n</script>\n<template>\n  <SCard :heading-level=\"2\" title=\"서로 배타적인 한 가지 선택 · Radio Group\">\n    <p>같은 그룹에서는 하나만 선택합니다. 방향키로 선택을 옮길 수 있습니다.</p>\n    <SRadioGroup\n      id=\"recipe-radio-choice\"\n      v-model=\"choice\"\n      label=\"표시 방법\"\n      :options=\"options\"\n      required\n    />\n    <p role=\"status\">선택한 표시: {{ choice === 'brief' ? '간단히' : '자세히' }}</p>\n  </SCard>\n</template>\n",
  "advanced-vue": "<script setup>\nimport { resolveCategoricalColor } from 'solyi-ui'\n\nconst props = defineProps({\n  part: { type: String, default: '' },\n  headingLevel: { type: Number, default: 2 },\n  idPrefix: { type: String, default: '' },\n})\nconst previewId = id => (props.idPrefix ? props.idPrefix + '-' + id : id)\nconst headingTag = computed(() =>\n  [2, 3, 4, 5, 6].includes(props.headingLevel) ? 'h' + props.headingLevel : 'h2',\n)\nconst supportedParts = [\n  'segmented',\n  'multiselect',\n  'range',\n  'split-button',\n  'context-menu',\n  'split-pane',\n  'sortable',\n  'month-calendar',\n  'time-grid',\n]\nconst part = computed(() => (supportedParts.includes(props.part) ? props.part : ''))\nconst show = (...parts) => !part.value || parts.includes(part.value)\nconst disabled = ref(false),\n  readonly = ref(false),\n  display = ref('brief'),\n  selected = ref(['garden']),\n  scenario = ref('local'),\n  requests = ref(0)\nconst choices = [\n  { value: 'garden', label: '정원' },\n  { value: 'book', label: '책장' },\n  { value: 'walk', label: '산책' },\n  { value: 'season', label: '계절 관찰' },\n  { value: 'locked', label: '보관 · 선택 불가', disabled: true },\n]\nconst loader = computed(() => {\n  const mode = scenario.value\n  if (mode === 'local') return undefined\n  return async (query, signal) => {\n    const attempt = ++requests.value\n    await new Promise((resolve, reject) => {\n      const timer = setTimeout(\n        () => {\n          signal.removeEventListener('abort', abort)\n          resolve()\n        },\n        query.includes('느림') ? 600 : 180,\n      )\n      const abort = () => {\n        clearTimeout(timer)\n        reject(new DOMException('Cancelled', 'AbortError'))\n      }\n      signal.addEventListener('abort', abort, { once: true })\n      if (signal.aborted) abort()\n    })\n    if (mode === 'retry' && attempt === 1) throw new Error('가상 실패')\n    return choices.filter(o => o.label.includes(query.trim()))\n  }\n})\nwatch(scenario, () => (requests.value = 0))\nconst range = ref([20, 80]),\n  action = ref('아직 실행하지 않았어요.'),\n  primaryCount = ref(0),\n  menuOpen = ref(false)\nconst actions = [\n  { id: 'json', label: 'JSON으로 내보내기 · 가상' },\n  { id: 'csv', label: 'CSV로 내보내기 · 가상' },\n  { id: 'blocked', label: '예약 · 비활성', disabled: true },\n]\nconst contextItems = [\n  { id: 'pin', label: '자료 고정 · 가상' },\n  { id: 'copy', label: '복제 · 가상' },\n  { id: 'archive', label: '보관 · 비활성', disabled: true },\n]\nfunction chosenAction(id) {\n  action.value =\n    '✓ ' +\n    [...actions, ...contextItems].find(i => i.id === id)?.label +\n    ' 동작을 확인했습니다. 외부 작업은 없습니다.'\n}\nconst ratio = ref(40),\n  direction = ref('horizontal'),\n  memo = ref('화면 폭을 바꾸어도 이 가상 메모는 유지됩니다.'),\n  stacked = ref(false),\n  resized = ref('')\nconst sortableItems = ref([\n    { id: 'a', label: '첫 번째 항목', details: { count: 4 } },\n    { id: 'b', label: '긴 텍스트를 가진 두 번째 항목도 줄바꿈합니다', details: { count: 7 } },\n    { id: 'c', label: '세 번째 항목', details: { count: 2 } },\n  ]),\n  acceptOrder = ref(true),\n  lockSecond = ref(false),\n  sortStatus = ref('')\nconst calendarMonth = ref('2026-10'),\n  calendarDate = ref('2026-10-07'),\n  calendarAcceptMonth = ref(true),\n  calendarAcceptDate = ref(true),\n  calendarLoading = ref(false),\n  calendarEmpty = ref(false),\n  calendarMonday = ref(false),\n  calendarBlocked = ref(false)\nconst calendarMarkers = Object.freeze({\n  '2026-10-28': Object.freeze([\n    Object.freeze({\n      id: 'a',\n      label: '첫 번째 범주',\n      category: resolveCategoricalColor('example-a').category,\n      icon: 'copy',\n    }),\n    Object.freeze({\n      id: 'b',\n      label: '길게 입력한 두 번째 상태도 넘치지 않게 표시합니다',\n      tone: 'warning',\n    }),\n    Object.freeze({ id: 'c', label: '세 번째 상태는 추가 개수로 안내합니다' }),\n  ]),\n})\nconst gridColumns = Object.freeze([\n  { key: 'one', label: '열 A', date: '2026-10-28' },\n  { key: 'two', label: '열 B', date: '2026-10-29' },\n])\nconst gridSeed = Object.freeze([\n  Object.freeze({ id: 'a', column: 'one', start: 480, end: 570, title: '첫 번째 항목' }),\n  Object.freeze({\n    id: 'b',\n    column: 'one',\n    start: 510,\n    end: 600,\n    title: '겹치는 항목도 원본 시간을 바꾸지 않습니다.',\n  }),\n  Object.freeze({\n    id: 'c',\n    column: 'one',\n    start: 600,\n    end: 615,\n    title: '짧은 항목 · 긴 이름은 아래 목록에서 전체 내용을 확인할 수 있습니다.',\n  }),\n  Object.freeze({ id: 'd', column: 'two', start: 780, end: 840, title: '두 번째 열 항목' }),\n])\nconst gridItems = ref(gridSeed),\n  gridEditable = ref(false),\n  gridDisabled = ref(false),\n  gridLockedFirst = ref(false),\n  gridPendingFirst = ref(false),\n  gridAccept = ref(true),\n  gridPreview = ref(null),\n  gridResult = ref('')\nlet gridCopy = 0\nfunction acceptGridProposal(proposal) {\n  gridPreview.value = null\n  gridResult.value =\n    proposal.action +\n    ' · ' +\n    proposal.to.columnKey +\n    ' · ' +\n    proposal.to.startMinute +\n    '–' +\n    proposal.to.endMinute\n  if (!gridAccept.value) return\n  const original = gridItems.value.find(item => item.id === proposal.key)\n  if (!original) return\n  const next = Object.freeze({\n    ...original,\n    column: proposal.to.columnKey,\n    start: proposal.to.startMinute,\n    end: proposal.to.endMinute,\n    ...(proposal.action === 'duplicate'\n      ? { id: 'copy-' + ++gridCopy, title: original.title + ' · 복제' }\n      : {}),\n  })\n  gridItems.value = Object.freeze(\n    proposal.action === 'duplicate'\n      ? [...gridItems.value, next]\n      : gridItems.value.map(item => (item.id === proposal.key ? next : item)),\n  )\n}\nfunction resetGrid() {\n  gridItems.value = Object.freeze([...gridSeed])\n  gridPreview.value = null\n  gridResult.value = ''\n}\nfunction cancelGrid(result) {\n  gridPreview.value = null\n  gridResult.value = '취소 · ' + result.reason\n}\nconst gridEmpty = ref(false),\n  gridLoading = ref(false)\nconst gridBands = Object.freeze([\n  { id: 'band-a', label: '범용 구간', startMinute: 720, endMinute: 780, category: 'c2' },\n])\nfunction acceptProposal(items) {\n  if (acceptOrder.value) sortableItems.value = items\n}\nfunction reorderEnd(result) {\n  sortStatus.value =\n    result.status === 'cancel'\n      ? '취소: ' + result.reason\n      : result.status === 'unchanged'\n        ? '순서 유지'\n        : (acceptOrder.value ? '새 순서 반영: ' : '순서 제안만 확인: ') + result.key\n}\nwatch([disabled, readonly], () => {\n  if (disabled.value || readonly.value) menuOpen.value = false\n})\n</script>\n\n<template>\n  <section\n    v-if=\"show('segmented')\"\n    class=\"starter-card\"\n    :aria-labelledby=\"previewId('advanced-title')\"\n  >\n    <component :is=\"headingTag\" :id=\"previewId('advanced-title')\"\n      >설정 하나 선택 · SSegmentedControl</component\n    >\n    <p class=\"starter-hint\">\n      선택·범위·메뉴·분할 부품을 설치한 solyi-ui에서 가져옵니다. 아래 설정은 이 예제들에만\n      적용됩니다. 모든 데이터와 작업은 가상입니다.\n    </p>\n    <div class=\"starter-settings starter-demo-settings\">\n      <SSwitch\n        :id=\"previewId('advanced-disabled')\"\n        v-model=\"disabled\"\n        label=\"확장 예시 비활성\"\n      /><SSwitch\n        :id=\"previewId('advanced-readonly')\"\n        v-model=\"readonly\"\n        label=\"확장 예시 읽기 전용\"\n      />\n    </div>\n    <SSegmentedControl\n      :id=\"previewId('advanced-segment')\"\n      v-model=\"display\"\n      label=\"가상 표시 설정\"\n      :options=\"[\n        { value: 'brief', label: '간단히' },\n        { value: 'full', label: '자세히' },\n        { value: 'locked', label: '보관 · 비활성', disabled: true },\n      ]\"\n      :disabled=\"disabled\"\n      :readonly=\"readonly\"\n      help=\"설정 하나를 고릅니다. Tabs처럼 별도 패널을 전환하는 부품은 아닙니다.\"\n    />\n    <p class=\"starter-result\" role=\"status\">\n      {{\n        display === 'brief'\n          ? '가상 기록 4개'\n          : '가상 기록 4개 · 메모와 변경 정보를 함께 표시하는 설정'\n      }}\n    </p>\n  </section>\n  <section\n    v-if=\"show('multiselect')\"\n    class=\"starter-card\"\n    :aria-labelledby=\"previewId('advanced-multi-title')\"\n  >\n    <component :is=\"headingTag\" :id=\"previewId('advanced-multi-title')\"\n      >검색 가능한 MultiSelect</component\n    >\n    <div v-if=\"part\" class=\"starter-settings starter-demo-settings\">\n      <SSwitch\n        :id=\"previewId('advanced-disabled')\"\n        v-model=\"disabled\"\n        label=\"예제 비활성\"\n      /><SSwitch :id=\"previewId('advanced-readonly')\" v-model=\"readonly\" label=\"예제 읽기 전용\" />\n    </div>\n    <SSelect\n      :id=\"previewId('advanced-multi-scenario')\"\n      v-model=\"scenario\"\n      required\n      label=\"가상 목록 동작\"\n      :options=\"[\n        { value: 'local', label: '로컬 검색' },\n        { value: 'async', label: '지연 응답 흉내' },\n        { value: 'retry', label: '첫 오류 후 재시도' },\n      ]\"\n      help=\"외부 요청 없이 브라우저 안에서 지연·실패를 흉내 냅니다. '없는값'으로 결과 없음을 확인할 수 있어요.\"\n    />\n    <SMultiSelect\n      :id=\"previewId('advanced-multi')\"\n      v-model=\"selected\"\n      clearable\n      label=\"가상 기록 분류\"\n      :options=\"choices\"\n      :load-options=\"loader\"\n      :max-selected=\"3\"\n      required\n      :disabled=\"disabled\"\n      :readonly=\"readonly\"\n      placeholder=\"분류 이름 검색\"\n      help=\"방향키·Enter로 선택/해제, 빈 검색칸에서 Backspace로 마지막 선택 제거. Escape는 목록만 닫습니다. Tab은 제거/재시도 버튼에도 접근합니다.\"\n    />\n    <p class=\"starter-hint\">\n      완료 값: {{ JSON.stringify(selected) }} · 가상 요청 {{ requests }}회. 검색을 바꾸어도 기존\n      선택은 유지됩니다.\n    </p>\n  </section>\n  <section\n    v-if=\"show('range')\"\n    class=\"starter-card\"\n    :aria-labelledby=\"previewId('advanced-range-title')\"\n  >\n    <component :is=\"headingTag\" :id=\"previewId('advanced-range-title')\">양끝 RangeSlider</component>\n    <div v-if=\"part\" class=\"starter-settings starter-demo-settings\">\n      <SSwitch\n        :id=\"previewId('advanced-disabled')\"\n        v-model=\"disabled\"\n        label=\"예제 비활성\"\n      /><SSwitch :id=\"previewId('advanced-readonly')\" v-model=\"readonly\" label=\"예제 읽기 전용\" />\n    </div>\n    <SRangeSlider\n      :id=\"previewId('advanced-range')\"\n      v-model=\"range\"\n      label=\"가상 점수 구간\"\n      lower-label=\"하한\"\n      upper-label=\"상한\"\n      :min=\"0\"\n      :max=\"100\"\n      :step=\"5\"\n      :format-value=\"(value) => value + '점'\"\n      :disabled=\"disabled\"\n      :readonly=\"readonly\"\n      help=\"두 핸들은 서로 넘어가지 않습니다. 핸들 드래그·방향키 또는 트랙 누르기로 조절하세요.\"\n    />\n    <div class=\"starter-control-grid\">\n      <SNumberInput\n        :id=\"previewId('advanced-lower')\"\n        required\n        v-model=\"range[0]\"\n        label=\"하한 직접 입력\"\n        :min=\"0\"\n        :max=\"range[1]\"\n        :step=\"5\"\n        :disabled=\"disabled\"\n        :readonly=\"readonly\"\n      /><SNumberInput\n        :id=\"previewId('advanced-upper')\"\n        required\n        v-model=\"range[1]\"\n        label=\"상한 직접 입력\"\n        :min=\"range[0]\"\n        :max=\"100\"\n        :step=\"5\"\n        :disabled=\"disabled\"\n        :readonly=\"readonly\"\n      />\n    </div>\n    <p class=\"starter-hint\">\n      숫자 입력도 같은 값을 사용합니다. 터치 보조기술의 사용자별 동작은 실제 기기에서 별도 확인해야\n      합니다.\n    </p>\n  </section>\n  <section\n    v-if=\"show('split-button', 'context-menu')\"\n    class=\"starter-card\"\n    :aria-labelledby=\"previewId('advanced-actions-title')\"\n  >\n    <component :is=\"headingTag\" :id=\"previewId('advanced-actions-title')\">\n      {{\n        part === 'split-button'\n          ? 'SplitButton'\n          : part === 'context-menu'\n            ? 'ContextMenu'\n            : 'SplitButton · ContextMenu'\n      }}\n    </component>\n    <div v-if=\"part\" class=\"starter-settings starter-demo-settings\">\n      <SSwitch\n        :id=\"previewId('advanced-disabled')\"\n        v-model=\"disabled\"\n        label=\"예제 비활성\"\n      /><SSwitch :id=\"previewId('advanced-readonly')\" v-model=\"readonly\" label=\"예제 읽기 전용\" />\n    </div>\n    <p class=\"starter-hint\">\n      주 동작과 다른 동작을 분리합니다. 실제 파일을 만들거나 자료를 변경하지 않습니다.\n    </p>\n    <SSplitBtn\n      v-if=\"show('split-button')\"\n      :id=\"previewId('advanced-split-button')\"\n      label=\"가상 내보내기\"\n      :items=\"actions\"\n      :disabled=\"disabled\"\n      :readonly=\"readonly\"\n      @primary=\"\n        primaryCount++;\n        action = '✓ 주 동작 ' + primaryCount + '회 · 실제 전송이나 다운로드는 없습니다.';\n      \"\n      @select=\"chosenAction\"\n    />\n    <SContextMenu\n      v-if=\"show('context-menu')\"\n      :id=\"previewId('advanced-context')\"\n      v-model:open=\"menuOpen\"\n      label=\"가상 정원 기록\"\n      trigger-label=\"기록 동작 열기\"\n      :items=\"contextItems\"\n      :disabled=\"disabled\"\n      :readonly=\"readonly\"\n      @select=\"chosenAction\"\n      ><p><strong>작은 정원 기록</strong></p>\n      <p>\n        이 영역에서 우클릭하거나 초점을 두고 Shift+F10을 누르세요. 터치에서도 아래 버튼을 사용할 수\n        있어요.\n      </p></SContextMenu\n    >\n    <p class=\"starter-result\" role=\"status\">{{ action }}</p>\n  </section>\n  <section\n    v-if=\"show('split-pane')\"\n    class=\"starter-card\"\n    :aria-labelledby=\"previewId('advanced-pane-title')\"\n  >\n    <component :is=\"headingTag\" :id=\"previewId('advanced-pane-title')\"\n      >ResizableSplitPane</component\n    >\n    <div v-if=\"part\" class=\"starter-settings starter-demo-settings\">\n      <SSwitch\n        :id=\"previewId('advanced-disabled')\"\n        v-model=\"disabled\"\n        label=\"예제 비활성\"\n      /><SSwitch :id=\"previewId('advanced-readonly')\" v-model=\"readonly\" label=\"예제 읽기 전용\" />\n    </div>\n    <SSelect\n      :id=\"previewId('advanced-pane-direction')\"\n      v-model=\"direction\"\n      required\n      label=\"개발 설정 · 분할 방향\"\n      :options=\"[\n        { value: 'horizontal', label: '좌우 두 영역' },\n        { value: 'vertical', label: '위아래 두 영역' },\n      ]\"\n    />\n    <SResizableSplitPane\n      :id=\"previewId('advanced-pane')\"\n      v-model=\"ratio\"\n      label=\"가상 목록과 메모\"\n      primary-label=\"가상 목록\"\n      secondary-label=\"가상 메모\"\n      :orientation=\"direction\"\n      :min=\"25\"\n      :max=\"75\"\n      :step=\"5\"\n      :disabled=\"disabled\"\n      :readonly=\"readonly\"\n      @reflow=\"stacked = $event\"\n      @change=\"resized = '조절 완료: ' + $event + '%'\"\n    >\n      <template #primary\n        ><p>계절 관찰<br />작은 정원<br />저녁 책장</p>\n        <p class=\"starter-hint\">\n          중앙 구분선을 드래그하거나 초점을 두고 방향키로 조절합니다.\n        </p></template\n      >\n      <template #secondary\n        ><STextarea\n          :id=\"previewId('advanced-pane-memo')\"\n          v-model=\"memo\"\n          label=\"유지되는 가상 메모\"\n          :disabled=\"disabled\"\n          :readonly=\"readonly\"\n      /></template>\n    </SResizableSplitPane>\n    <p class=\"starter-hint\" role=\"status\">\n      저장 비율 {{ ratio }}% · {{ stacked ? '좁은 폭: 위아래 높이 조절' : '크기 조절 가능' }} ·\n      {{ resized }}\n    </p>\n  </section>\n  <section\n    v-if=\"show('sortable')\"\n    class=\"starter-card\"\n    :aria-labelledby=\"previewId('advanced-sortable-title')\"\n  >\n    <component :is=\"headingTag\" :id=\"previewId('advanced-sortable-title')\"\n      >정렬 목록 · SSortableList</component\n    >\n    <p class=\"starter-hint\">\n      손잡이를 드래그하거나 키보드와 위·아래 이동 버튼으로 순서를 제안합니다. 원본 객체는\n      유지합니다.\n    </p>\n    <div class=\"starter-settings\">\n      <SCheckbox\n        :id=\"previewId('advanced-sort-accept')\"\n        v-model=\"acceptOrder\"\n        label=\"새 순서 반영\"\n      />\n      <SCheckbox\n        :id=\"previewId('advanced-sort-lock')\"\n        v-model=\"lockSecond\"\n        label=\"두 번째 항목 자체의 이동 막기\"\n      />\n      <SSwitch\n        v-if=\"part\"\n        :id=\"previewId('advanced-sort-disabled')\"\n        v-model=\"disabled\"\n        label=\"정렬 비활성\"\n      />\n      <SSwitch\n        v-if=\"part\"\n        :id=\"previewId('advanced-sort-readonly')\"\n        v-model=\"readonly\"\n        label=\"정렬 보기 전용\"\n      />\n      <SBtn @click=\"sortableItems = [...sortableItems].reverse()\">외부 목록 변경 시연</SBtn>\n    </div>\n    <SSortableList\n      :id=\"previewId('advanced-sortable')\"\n      label=\"가상 항목 순서\"\n      :model-value=\"sortableItems\"\n      :item-key=\"item => item.id\"\n      :item-label=\"item => item.label\"\n      :is-item-disabled=\"item => lockSecond && item.id === 'b'\"\n      :disabled=\"disabled\"\n      :readonly=\"readonly\"\n      @update:model-value=\"acceptProposal\"\n      @end=\"reorderEnd\"\n    >\n      <template #item=\"{ item, index, active }\">\n        <strong>{{ index + 1 }}. {{ item.label }}</strong>\n        <p>{{ item.details.count.toFixed(0) }}개 · {{ active ? '이동 위치 선택 중' : '대기' }}</p>\n        <SBtn\n          variant=\"inline\"\n          :disabled=\"disabled\"\n          @click=\"sortStatus = item.label + ' 본문 버튼 확인'\"\n          >본문 동작</SBtn\n        >\n      </template>\n    </SSortableList>\n    <p role=\"status\">{{ sortStatus }}</p>\n    <p class=\"starter-hint\">확정 순서: {{ sortableItems.map(item => item.id).join(' → ') }}</p>\n  </section>\n  <section\n    v-if=\"show('month-calendar')\"\n    class=\"starter-card\"\n    :aria-labelledby=\"previewId('advanced-month-title')\"\n  >\n    <component :is=\"headingTag\" :id=\"previewId('advanced-month-title')\"\n      >월간 달력 · SMonthCalendar</component\n    >\n    <p class=\"starter-hint\">\n      월과 날짜는 부모가 반영할 때 바뀝니다. 오늘 이동과 키보드 탐색은 선택을 자동 저장하지\n      않습니다. 날짜별 자료가 늦게 와도 선택은 남습니다.\n    </p>\n    <div class=\"starter-settings\">\n      <SCheckbox\n        :id=\"previewId('advanced-month-accept')\"\n        v-model=\"calendarAcceptMonth\"\n        label=\"표시 월 제안 반영\"\n      />\n      <SCheckbox\n        :id=\"previewId('advanced-month-accept-date')\"\n        v-model=\"calendarAcceptDate\"\n        label=\"선택 날짜 제안 반영\"\n      />\n      <SCheckbox\n        :id=\"previewId('advanced-month-monday')\"\n        v-model=\"calendarMonday\"\n        label=\"월요일 시작\"\n      />\n      <SCheckbox\n        :id=\"previewId('advanced-month-loading')\"\n        v-model=\"calendarLoading\"\n        label=\"자료 loading\"\n      />\n      <SCheckbox\n        :id=\"previewId('advanced-month-empty')\"\n        v-model=\"calendarEmpty\"\n        label=\"날짜별 자료 없음\"\n      />\n      <SCheckbox\n        :id=\"previewId('advanced-month-blocked')\"\n        v-model=\"calendarBlocked\"\n        label=\"10일 선택 막기\"\n      />\n      <SSwitch\n        v-if=\"part\"\n        :id=\"previewId('advanced-month-disabled')\"\n        v-model=\"disabled\"\n        label=\"달력 비활성\"\n      />\n      <SSwitch\n        v-if=\"part\"\n        :id=\"previewId('advanced-month-readonly')\"\n        v-model=\"readonly\"\n        label=\"달력 보기 전용\"\n      />\n    </div>\n    <SMonthCalendar\n      :id=\"previewId('advanced-month')\"\n      label=\"범용 날짜 상태\"\n      :month=\"calendarMonth\"\n      :model-value=\"calendarDate\"\n      today=\"2026-10-28\"\n      :first-day=\"calendarMonday ? 1 : 0\"\n      :markers=\"calendarEmpty ? {} : calendarMarkers\"\n      :is-date-disabled=\"date => calendarBlocked && date.endsWith('-10')\"\n      :loading=\"calendarLoading\"\n      :disabled=\"disabled\"\n      :readonly=\"readonly\"\n      @update:month=\"next => { if (calendarAcceptMonth) calendarMonth = next }\"\n      @update:model-value=\"next => { if (calendarAcceptDate) calendarDate = next }\"\n    >\n      <template #cell=\"{ date, disabled: unavailable }\">\n        <small\n          v-if=\"date.endsWith('-28')\"\n          :aria-label=\"unavailable ? '선택 불가 추가 정보' : '추가 정보'\"\n          >ⓘ</small\n        >\n      </template>\n    </SMonthCalendar>\n    <p :id=\"previewId('advanced-month-result')\" class=\"starter-hint\">\n      표시 월: {{ calendarMonth }} · 선택 ISO: {{ calendarDate }}\n    </p>\n  </section>\n  <section\n    v-if=\"show('time-grid')\"\n    class=\"starter-card\"\n    :aria-labelledby=\"previewId('advanced-time-grid-title')\"\n  >\n    <component :is=\"headingTag\" :id=\"previewId('advanced-time-grid-title')\"\n      >시간 그리드 · 변경 제안</component\n    >\n    <p class=\"starter-hint\">\n      기본은 읽기 전용이며 편집을 켜면 이동·크기 변경·복제를 제안합니다. 아래 반영 체크를 끄면\n      원본은 유지됩니다. 시간대·충돌·새 key·저장은 소비 앱에서 소유합니다.\n    </p>\n    <div class=\"starter-settings\">\n      <SCheckbox\n        :id=\"previewId('advanced-time-grid-empty')\"\n        v-model=\"gridEmpty\"\n        label=\"빈 항목\"\n      /><SCheckbox\n        :id=\"previewId('advanced-time-grid-loading')\"\n        v-model=\"gridLoading\"\n        label=\"불러오는 중\"\n      />\n    </div>\n    <div class=\"starter-settings\">\n      <SCheckbox\n        :id=\"previewId('advanced-time-grid-edit')\"\n        v-model=\"gridEditable\"\n        label=\"변경 제안 허용\"\n      />\n      <SCheckbox\n        :id=\"previewId('advanced-time-grid-disabled')\"\n        v-model=\"gridDisabled\"\n        label=\"전체 조작 비활성\"\n      />\n      <SCheckbox\n        :id=\"previewId('advanced-time-grid-lock')\"\n        v-model=\"gridLockedFirst\"\n        label=\"첫 항목 조작 비활성\"\n      />\n      <SCheckbox\n        :id=\"previewId('advanced-time-grid-pending')\"\n        v-model=\"gridPendingFirst\"\n        label=\"첫 항목 반영 대기\"\n      />\n      <SCheckbox\n        :id=\"previewId('advanced-time-grid-accept')\"\n        v-model=\"gridAccept\"\n        label=\"부모에서 제안 반영\"\n      />\n      <SBtn :id=\"previewId('advanced-time-grid-reset')\" @click=\"resetGrid\">원본으로 외부 갱신</SBtn>\n    </div>\n    <STimeGrid\n      :id=\"previewId('advanced-time-grid')\"\n      label=\"범용 시간 항목\"\n      :items=\"gridEmpty ? [] : gridItems\"\n      :columns=\"gridColumns\"\n      :bands=\"gridBands\"\n      :item-key=\"item=>item.id\"\n      :item-label=\"item=>item.title\"\n      :item-column=\"item=>item.column\"\n      :item-start=\"item=>item.start\"\n      :item-end=\"item=>item.end\"\n      :start-minute=\"480\"\n      :end-minute=\"1080\"\n      :loading=\"gridLoading\"\n      :readonly=\"!gridEditable\"\n      :disabled=\"gridDisabled\"\n      allow-resize\n      allow-duplicate\n      :snap-minutes=\"15\"\n      :pending-keys=\"gridPendingFirst ? ['a'] : []\"\n      :is-item-disabled=\"item=>gridLockedFirst && item.id==='a'\"\n      @preview=\"gridPreview=$event\"\n      @commit=\"acceptGridProposal\"\n      @cancel=\"cancelGrid\"\n      help=\"각 항목에 Tab으로 초점을 둘 수 있습니다. 좁은 화면에서는 가로로 스크롤하고 목록으로 전체 이름을 확인하세요.\"\n    />\n    <p :id=\"previewId('advanced-time-grid-result')\" class=\"starter-hint\" role=\"status\">\n      {{gridPreview ? '미리보기 · '+gridPreview.to.columnKey+' · '+gridPreview.to.startMinute+'–'+gridPreview.to.endMinute : gridResult}}\n    </p>\n  </section>\n</template>\n",
  "select": "<script setup lang=\"ts\">\nconst selected = ref<string | null>('recent')\n</script>\n<template>\n  <SCard :heading-level=\"2\" title=\"목록에서 한 가지 선택 · Select\">\n    <SSelect\n      id=\"recipe-owned-select\"\n      v-model=\"selected\"\n      label=\"정렬 기준\"\n      clearable\n      :options=\"[\n        { value: 'recent', label: '최근 수정순' },\n        { value: 'name', label: '이름순' },\n        { value: 'reserved', label: '준비 중인 기준', disabled: true },\n      ]\"\n    />\n    <p role=\"status\">선택값: {{ selected ?? '없음' }}</p>\n  </SCard>\n</template>\n",
  "switch": "<script setup lang=\"ts\">\nconst chosen = ref(false),\n  enabled = ref(false),\n  external = ref(false)\n</script>\n<template>\n  <SCard :heading-level=\"2\" title=\"선택과 즉시 설정의 차이 · Switch\">\n    <p>\n      체크박스는 항목의 선택을 확인하고, 스위치는 설정을 즉시 켜거나 끕니다. 모양을 합쳐도 같은\n      의미가 되지는 않습니다.\n    </p>\n    <SCheckbox\n      id=\"recipe-switch-choice\"\n      v-model=\"chosen\"\n      label=\"확인 후 적용할 항목 선택 · Checkbox\"\n    />\n    <SSwitch id=\"recipe-switch-enabled\" v-model=\"enabled\" label=\"즉시 알림 켜기 · Switch\" />\n    <div class=\"sol-actions\">\n      <label id=\"recipe-switch-external-label\" for=\"recipe-switch-external\"\n        >외부 라벨을 쓰는 설정</label\n      >\n      <SSwitch\n        id=\"recipe-switch-external\"\n        v-model=\"external\"\n        label=\"외부 라벨을 쓰는 설정\"\n        hide-label\n        aria-labelledby=\"recipe-switch-external-label\"\n      />\n    </div>\n    <p role=\"status\">\n      항목 {{ chosen ? '선택' : '미선택' }} · 알림 {{ enabled ? '켜짐' : '꺼짐' }} · 외부 설정\n      {{ external ? '켜짐' : '꺼짐' }}\n    </p>\n  </SCard>\n</template>\n",
  "fields": "<script setup lang=\"ts\">\nconst field = useTemplateRef<{ focus(): void }>('field')\nconst serverRejected = ref(false)\nconst showInputLoading = ref(false)\nconst value = ref(''),\n  submitted = ref(false)\nconst error = computed(() =>\n  submitted.value && value.value.trim().length < 3 ? '3자 이상 입력해 주세요.' : '',\n)\nfunction check() {\n  submitted.value = true\n  if (error.value) nextTick(() => field.value?.focus())\n}\n</script>\n<template>\n  <SCard :heading-level=\"2\" title=\"텍스트 입력\">\n    <form class=\"sol-stack\" @submit.prevent=\"check\" novalidate>\n      <STextField\n        id=\"recipe-field\"\n        ref=\"field\"\n        v-model=\"value\"\n        clearable\n        :loading=\"showInputLoading\"\n        label=\"가상 기록 제목\"\n        required\n        help=\"3자 이상. 이 페이지 메모리에만 남습니다.\"\n        :error=\"error\"\n        :server-error=\"\n          serverRejected ? '이미 사용 중인 가상 이름입니다. 다른 이름을 입력해 주세요.' : ''\n        \"\n      >\n        <template #leading><SIcon name=\"edit\" decorative :size=\"16\" /></template>\n        <template #trailing\n          ><span class=\"sol-hint\">{{ value.length }}자</span></template\n        >\n      </STextField>\n      <SCheckbox id=\"recipe-field-loading\" v-model=\"showInputLoading\" label=\"로딩 상태 시연 켜기\" />\n      <p class=\"sol-hint\">\n        로딩은 입력값과 별개인 작업 상태입니다. 동작 줄이기 설정에서는 회전 대신 상태 문구로\n        안내합니다.\n      </p>\n      <p role=\"status\">{{ showInputLoading ? '불러오는 중…' : '대기 중' }}</p>\n      <STextField\n        id=\"recipe-readonly\"\n        model-value=\"읽기 전용 예시\"\n        label=\"수정할 수 없는 값\"\n        readonly\n      />\n      <STextField\n        id=\"recipe-disabled-field\"\n        model-value=\"아직 만들 수 없어요\"\n        label=\"공유 주소 · 비활성\"\n        disabled\n      />\n      <SBtn type=\"submit\" variant=\"primary\">입력 확인</SBtn>\n      <SAlert\n        v-if=\"submitted && !error && !serverRejected\"\n        tone=\"success\"\n        title=\"✓ 사용할 수 있는 이름입니다.\"\n        ><p>예시 입력값입니다.</p></SAlert\n      >\n    </form>\n  </SCard>\n</template>\n",
  "time": "<script setup lang=\"ts\">\nimport type { SolTimeInteraction, SolTimeInteractionCancel, SolPickerPresentation } from 'solyi-ui'\n\nconst time = ref<string | null>('09:00')\nconst popupChoice = ref<string | null>('legacy')\nconst pickerPresentation = computed<SolPickerPresentation | undefined>(() =>\n  popupChoice.value === 'auto' || popupChoice.value === 'popover' || popupChoice.value === 'dialog'\n    ? popupChoice.value\n    : undefined,\n)\nconst listTime = ref<string | null>(null),\n  manual = ref(false)\nconst scrub = ref(false),\n  interaction = ref('')\nconst initialTime = ref('09:07'),\n  useCurrentTime = ref(false),\n  scrubPixels = ref<number | null>(10)\nfunction preview(value: SolTimeInteraction) {\n  interaction.value = `미리보기 ${value.value}`\n}\nfunction committed(value: SolTimeInteraction) {\n  interaction.value = `확정 ${value.value}`\n}\nfunction cancelled(value: SolTimeInteractionCancel) {\n  interaction.value = `취소 ${value.reason}`\n}\n</script>\n<template>\n  <SCard :heading-level=\"2\" title=\"직접 입력과 시·분 선택\">\n    <SSelect\n      id=\"recipe-time-popup\"\n      v-model=\"popupChoice\"\n      label=\"시각 팝업 표시 방식\"\n      :options=\"[\n        { value: 'legacy', label: '기존 연결 패널' },\n        { value: 'auto', label: '화면에 맞춰 자동 전환' },\n        { value: 'popover', label: '연결 팝업' },\n        { value: 'dialog', label: '모달 다이얼로그' },\n      ]\"\n    />\n    <STimePicker\n      id=\"recipe-time\"\n      :picker-presentation=\"pickerPresentation\"\n      v-model=\"time\"\n      clearable\n      label=\"가상 알림 시각\"\n      min=\"09:00\"\n      max=\"18:00\"\n      :step=\"15\"\n      required\n      help=\"HH:mm 또는 HHmm으로 입력하거나 Alt+↓로 패널을 엽니다.\"\n    />\n    <p role=\"status\">완료값: {{ time || '없음' }} · 실제 알림을 예약하지 않습니다.</p>\n    <SCheckbox id=\"recipe-time-manual\" v-model=\"manual\" label=\"목록 예제의 직접 입력 허용\" />\n    <SCheckbox id=\"recipe-time-scrub\" v-model=\"scrub\" label=\"입력·목록 드래그 조절 사용\" />\n    <SCheckbox\n      id=\"recipe-time-now\"\n      v-model=\"useCurrentTime\"\n      label=\"선택이 없으면 현재 시각 근처에서 목록 열기\"\n    />\n    <STextField\n      id=\"recipe-time-initial\"\n      v-model=\"initialTime\"\n      label=\"목록 초기 위치\"\n      :disabled=\"useCurrentTime\"\n      help=\"선택된 값이 우선입니다. 시각을 비우고 다시 열어 확인하세요.\"\n    />\n    <SNumberInput\n      id=\"recipe-time-pixels\"\n      v-model=\"scrubPixels\"\n      label=\"드래그 한 단계 이동 거리 · px\"\n      :min=\"2\"\n      :max=\"40\"\n      :step=\"2\"\n      :disabled=\"!scrub\"\n    />\n    <STimePicker\n      id=\"recipe-time-list\"\n      :picker-presentation=\"pickerPresentation\"\n      v-model=\"listTime\"\n      clearable\n      label=\"목록에서 시각 선택\"\n      presentation=\"list\"\n      :allow-manual-input=\"manual\"\n      :scrubbable=\"scrub\"\n      :list-scrubbable=\"scrub\"\n      :scrub-pixels-per-step=\"scrubPixels ?? undefined\"\n      :scroll-to-current-time=\"useCurrentTime\"\n      @preview=\"preview\"\n      @interaction-commit=\"committed\"\n      @interaction-cancel=\"cancelled\"\n      :initial-scroll-value=\"useCurrentTime ? undefined : initialTime || undefined\"\n      min=\"00:07\"\n      max=\"23:59\"\n      :step=\"15\"\n      help=\"처음 위치는 선택이 아닙니다. 방향키·Home/End·Page로 이동하고 Enter/Space로 선택, Escape로 닫습니다.\"\n    />\n    <p role=\"status\">{{ interaction }}</p>\n    <p role=\"status\">목록 완료값: {{ listTime || '선택 없음' }}</p>\n  </SCard>\n</template>\n",
  "accordion": "<script setup lang=\"ts\">\nconst expanded = ref(false)\nconst opened = ref<Record<string, boolean>>({})\nconst items = [\n  { id: 'purpose', label: '언제 사용하나요?', text: '필요할 때 확인하는 추가 설명을 제공합니다.' },\n  { id: 'content', label: '어떤 내용을 넣나요?', text: '짧은 설명이나 보조 정보를 담습니다.' },\n  {\n    id: 'keyboard',\n    label: '키보드로 여는 방법',\n    text: '제목 버튼에 초점을 두고 Enter 또는 Space를 누릅니다.',\n  },\n  {\n    id: 'independent',\n    label: '여러 항목을 함께 열 수 있나요?',\n    text: '이 예제의 항목은 서로 독립적으로 열고 닫힙니다.',\n  },\n]\n</script>\n<template>\n  <section class=\"sol-stack\" aria-label=\"단일 및 여러 추가 설명\">\n    <SCard :heading-level=\"2\" title=\"추가 설명 한 개\">\n      <SAccordion id=\"recipe-accordion\" v-model=\"expanded\" label=\"가상 기록의 상세\">\n        <p>접으면 이 안의 링크가 Tab 순서에서 제외됩니다.</p>\n        <a href=\"https://ui.solyi.kr/\" target=\"_blank\" rel=\"noopener\">문서 홈 · 새 창</a>\n      </SAccordion>\n      <p role=\"status\">{{ expanded ? '상세를 펼쳤어요.' : '상세를 접었어요.' }}</p>\n    </SCard>\n    <SCard :heading-level=\"2\" title=\"추가 설명 여러 개 · 독립적으로 열기\">\n      <p>각 항목을 별도로 여닫습니다. 한 항목을 열어도 다른 항목은 닫히지 않습니다.</p>\n      <SAccordion\n        v-for=\"item in items\"\n        :key=\"item.id\"\n        :id=\"'recipe-accordion-multi-' + item.id\"\n        v-model=\"opened[item.id]\"\n        :label=\"item.label\"\n      >\n        <p>{{ item.text }}</p>\n      </SAccordion>\n    </SCard>\n  </section>\n</template>\n",
  "breadcrumbs": "<script setup lang=\"ts\">\nimport type { SBreadcrumbItem } from 'solyi-ui'\n\ntype View = 'home' | 'list' | 'detail'\nconst view = ref<View>('detail'),\n  title = ref<HTMLElement | null>(null)\nconst all: SBreadcrumbItem[] = [\n  { id: 'home', label: '기록함' },\n  { id: 'list', label: '기록 목록' },\n  { id: 'detail', label: '항목 상세' },\n]\nconst path = computed(() => all.slice(0, view.value === 'home' ? 1 : view.value === 'list' ? 2 : 3))\nfunction show(next: View) {\n  view.value = next\n  nextTick(() => title.value?.focus())\n}\nfunction navigate(item: SBreadcrumbItem) {\n  if (item.id === 'home' || item.id === 'list' || item.id === 'detail') show(item.id)\n}\n</script>\n<template>\n  <SCard :heading-level=\"2\" title=\"현재 위치와 상위 경로 · Breadcrumbs\">\n    <p>상위 위치를 누르면 예제의 현재 위치가 바뀝니다.</p>\n    <SBreadcrumbs label=\"예제 경로\" :items=\"path\" @navigate=\"navigate\" />\n    <h3 id=\"recipe-breadcrumb-view\" ref=\"title\" tabindex=\"-1\">{{ path[path.length - 1].label }}</h3>\n    <div class=\"sol-actions\">\n      <SBtn @click=\"show('list')\">목록 보기</SBtn><SBtn @click=\"show('detail')\">상세 보기</SBtn>\n    </div>\n  </SCard>\n</template>\n",
  "pagination": "<script setup lang=\"ts\">\nconst page = ref(1),\n  pageCount = ref<number | null>(20),\n  siblings = ref<number | null>(3)\nconst accept = ref(true),\n  compact = ref(false),\n  proposal = ref<number | null>(null)\nfunction propose(next: number) {\n  proposal.value = next\n  if (accept.value) page.value = next\n}\nfunction manyPages() {\n  pageCount.value = 1003\n  page.value = 500\n  proposal.value = null\n}\nwatch(pageCount, count => {\n  page.value = Math.max(1, Math.min(page.value, Math.max(1, count ?? 0)))\n})\n</script>\n<template>\n  <SCard :heading-level=\"2\" title=\"부모가 수락하는 페이지 이동 · Pagination\">\n    <fieldset class=\"sol-stack\">\n      <legend>예제 설정</legend>\n      <SNumberInput\n        id=\"recipe-pagination-count\"\n        v-model=\"pageCount\"\n        label=\"페이지 수\"\n        :min=\"0\"\n        :step=\"1\"\n      />\n      <SNumberInput\n        id=\"recipe-pagination-siblings\"\n        v-model=\"siblings\"\n        label=\"현재 페이지 양옆의 번호 수\"\n        :min=\"0\"\n        :max=\"5\"\n        :step=\"1\"\n      />\n      <SCheckbox id=\"recipe-pagination-accept\" v-model=\"accept\" label=\"이동 제안을 부모가 반영\" />\n      <SCheckbox id=\"recipe-pagination-compact\" v-model=\"compact\" label=\"주변 번호를 접어서 표시\" />\n      <SBtn id=\"recipe-pagination-many\" @click=\"manyPages\">1003페이지 중 500페이지 보기</SBtn>\n    </fieldset>\n    <SPagination\n      :model-value=\"page\"\n      :page-count=\"pageCount ?? 0\"\n      :sibling-count=\"siblings ?? 1\"\n      :compact-pagination=\"compact\"\n      label=\"예제 페이지\"\n      @update:model-value=\"propose\"\n    />\n    <p role=\"status\">부모 페이지 {{ page }} · 최근 제안 {{ proposal ?? '아직 없음' }}</p>\n  </SCard>\n</template>\n",
  "identity-progress": "<script setup lang=\"ts\">\ndefineProps<{ part?: string }>()\nconst nameField = useTemplateRef<{ focus(): void }>('nameField')\nconst categoryField = useTemplateRef<{ focus(): void }>('categoryField')\nconst review = useTemplateRef<HTMLElement>('review')\nconst finalResult = useTemplateRef<HTMLElement>('finalResult')\nconst stage = ref(0),\n  done = ref(false),\n  name = ref(''),\n  category = ref<string | null>(null),\n  error = ref(''),\n  result = ref('')\nconst items = [\n  { id: 'profile', label: '가상 사용자 정보' },\n  { id: 'settings', label: '가상 설정' },\n]\nconst steps = [\n  { id: 'name', label: '이름' },\n  { id: 'category', label: '분류' },\n  { id: 'review', label: '검토' },\n]\nconst current = computed(() => steps[stage.value].id)\nconst completed = computed(() => steps.slice(0, done.value ? 3 : stage.value).map(item => item.id))\nasync function move(delta: number) {\n  error.value = ''\n  if (delta > 0 && stage.value === 0 && !name.value.trim())\n    error.value = '가상 이름을 입력해 주세요.'\n  if (delta > 0 && stage.value === 1 && !category.value) error.value = '가상 분류를 선택해 주세요.'\n  if (!error.value) {\n    if (stage.value === 2 && delta > 0) done.value = true\n    else {\n      stage.value = Math.max(0, Math.min(2, stage.value + delta))\n      done.value = false\n    }\n  }\n  await nextTick()\n  if (done.value) finalResult.value?.focus()\n  else if (stage.value === 0) nameField.value?.focus()\n  else if (stage.value === 1) categoryField.value?.focus()\n  else review.value?.focus()\n}\nasync function reset() {\n  stage.value = 0\n  done.value = false\n  name.value = ''\n  category.value = null\n  error.value = ''\n  await nextTick()\n  nameField.value?.focus()\n}\n</script>\n<template>\n  <SCard :heading-level=\"2\" :title=\"part ? undefined : '가상 사용자와 단계'\">\n    <div v-if=\"!part || part === 'avatar'\" class=\"sol-actions\">\n      <SAvatar label=\"가상 사용자 민하\" initials=\"민\" />\n      <SSplitBtn\n        id=\"recipe-user\"\n        label=\"민하 · 가상 사용자\"\n        :items=\"items\"\n        @primary=\"result = '가상 사용자 정보'\"\n        @select=\"result = $event\"\n      />\n      <p role=\"status\">{{ result }}</p>\n    </div>\n    <template v-if=\"!part || part === 'steps'\">\n      <SStepper\n        id=\"recipe-steps\"\n        :model-value=\"current\"\n        :items=\"steps\"\n        :completed=\"completed\"\n        label=\"가상 작성 단계\"\n      />\n      <SProgressLinear\n        id=\"recipe-step-progress\"\n        label=\"완료한 단계\"\n        :model-value=\"done ? 3 : stage\"\n        :min=\"0\"\n        :max=\"3\"\n        :show-message=\"false\"\n      />\n      <template v-if=\"!done\">\n        <STextField\n          v-if=\"stage === 0\"\n          id=\"recipe-step-name\"\n          ref=\"nameField\"\n          v-model=\"name\"\n          label=\"가상 프로젝트 이름\"\n          :error=\"error\"\n          required\n        />\n        <SSelect\n          v-else-if=\"stage === 1\"\n          id=\"recipe-step-category\"\n          ref=\"categoryField\"\n          v-model=\"category\"\n          label=\"가상 분류\"\n          :error=\"error\"\n          :options=\"[\n            { value: 'notes', label: '기록' },\n            { value: 'books', label: '독서' },\n          ]\"\n          required\n        />\n        <p v-else id=\"recipe-step-review\" ref=\"review\" tabindex=\"-1\">\n          {{ name }} · {{ category }} · 서버에 저장하지 않는 가상 검토입니다.\n        </p>\n      </template>\n      <p v-else id=\"recipe-step-result\" ref=\"finalResult\" role=\"status\" tabindex=\"-1\">\n        ✓ 가상 단계를 완료했어요. 실제 프로젝트는 만들지 않습니다.\n      </p>\n      <div class=\"sol-actions\">\n        <SBtn :disabled=\"stage === 0\" @click=\"move(-1)\">이전 단계</SBtn>\n        <SBtn :disabled=\"done\" @click=\"move(1)\">{{ stage === 2 ? '가상 완료' : '다음 단계' }}</SBtn>\n        <SBtn @click=\"reset\">처음부터</SBtn>\n      </div>\n    </template>\n  </SCard>\n</template>\n",
  "content-tabs": "<script setup lang=\"ts\">\nconst tab = ref('summary'),\n  memo = ref('')\nconst items = [\n  { value: 'summary', label: '요약' },\n  { value: 'detail', label: '상세' },\n  { value: 'blocked', label: '비활성', disabled: true },\n]\n</script>\n<template>\n  <SCard :heading-level=\"2\" title=\"같은 맥락의 탭\">\n    <STabs id=\"recipe-tabs\" v-model=\"tab\" label=\"기록 보기\" :items=\"items\">\n      <template #panel-summary><p>방향키로 탭을 바꾸세요.</p></template>\n      <template #panel-detail>\n        <STextField id=\"recipe-tab-memo\" v-model=\"memo\" label=\"탭을 바꾸어도 유지되는 메모\" />\n      </template>\n    </STabs>\n  </SCard>\n</template>\n",
  "tree": "<script setup lang=\"ts\">\nimport type { STreeItem, SBarChartItem } from 'solyi-ui'\n\ndefineProps<{ part?: string }>()\nconst selected = ref<string | null>(null),\n  expanded = ref<string[]>([]),\n  week = ref<string | null>('current')\nconst items: STreeItem[] = [\n  {\n    id: 'notes',\n    label: '기록',\n    children: [\n      { id: 'garden', label: '작은 정원' },\n      { id: 'book', label: '저녁 책장' },\n    ],\n  },\n  { id: 'archive', label: '보관', children: [{ id: 'walk', label: '주말 산책' }] },\n]\nconst chart = computed<SBarChartItem[]>(() =>\n  ['월요일', '화요일', '수요일', '목요일'].map((label, index) => ({\n    id: String(index),\n    label,\n    value: (week.value === 'current' ? [2, 4, 0, 5] : [1, 3, 2, 4])[index],\n  })),\n)\nconst total = computed(() => chart.value.reduce((sum, item) => sum + item.value, 0))\n</script>\n<template>\n  <SCard :heading-level=\"2\" :title=\"part ? undefined : '가상 자료의 차트와 계층'\">\n    <template v-if=\"!part || part === 'chart'\">\n      <SSelect\n        id=\"recipe-chart-week\"\n        v-model=\"week\"\n        label=\"가상 활동 주간\"\n        :options=\"[\n          { value: 'current', label: '이번 주' },\n          { value: 'previous', label: '지난주' },\n        ]\"\n      />\n      <p role=\"status\">총 {{ total }}개 기록 · 가상 자료</p>\n      <SBarChart\n        id=\"recipe-chart\"\n        label=\"가상 활동 횟수 · 차트와 같은 자료\"\n        :items=\"chart\"\n        category-label=\"요일\"\n        value-label=\"기록 수\"\n      />\n    </template>\n    <template v-if=\"!part || part === 'tree'\">\n      <STree\n        id=\"recipe-tree\"\n        v-model=\"selected\"\n        v-model:expanded=\"expanded\"\n        label=\"가상 기록 폴더\"\n        :items=\"items\"\n      />\n      <p role=\"status\">선택: {{ selected || '없음' }}</p>\n    </template>\n  </SCard>\n</template>\n",
  "feedback": "<script setup lang=\"ts\">\nconst open = ref(false),\n  recovered = ref(false)\n</script>\n<template>\n  <SCard :heading-level=\"2\" title=\"상태와 다음 행동\">\n    <SAlert v-if=\"!recovered\" tone=\"danger\" title=\"가상 저장을 완료하지 못했어요.\">\n      <p>입력 내용은 유지됩니다.</p>\n      <template #actions>\n        <SBtn variant=\"inline\" @click=\"recovered = true\"> 다시 시도 </SBtn>\n      </template>\n    </SAlert>\n    <SAlert v-else tone=\"success\" title=\"✓ 가상 저장을 확인했어요.\" />\n    <SBtn @click=\"open = true\">짧은 완료 안내</SBtn>\n    <SSnackbar\n      id=\"recipe-feedback-toast\"\n      v-model=\"open\"\n      tone=\"success\"\n      message=\"가상 작업을 확인했어요.\"\n      :duration=\"4000\"\n    />\n  </SCard>\n</template>\n",
  "dialog": "<script setup lang=\"ts\">\nconst open = ref(false),\n  longContent = ref(false),\n  draft = ref('')\nconst presentation = ref<string | null>('dialog'),\n  description = ref<string | null>('one')\nconst busyScope = ref<string | null>('body'),\n  busy = ref(false),\n  feedback = ref('')\nlet timer: ReturnType<typeof setTimeout>\nfunction save() {\n  if (busy.value) return\n  busy.value = true\n  feedback.value = '잠시 기다려 주세요.'\n  timer = setTimeout(() => {\n    busy.value = false\n    feedback.value = '예제 처리를 마쳤어요.'\n  }, 1200)\n}\nonBeforeUnmount(() => clearTimeout(timer))\n</script>\n<template>\n  <SCard :heading-level=\"2\" title=\"본문 스크롤과 고정 헤더\">\n    <SSelect\n      id=\"recipe-dialog-presentation\"\n      v-model=\"presentation\"\n      label=\"표시 방식\"\n      :options=\"[\n        { value: 'dialog', label: '다이얼로그' },\n        { value: 'drawer', label: '옆 패널' },\n      ]\"\n    />\n    <SSelect\n      id=\"recipe-dialog-description\"\n      v-model=\"description\"\n      label=\"설명 길이\"\n      :options=\"[\n        { value: 'none', label: '설명 없음' },\n        { value: 'one', label: '한 줄' },\n        { value: 'multi', label: '여러 줄' },\n      ]\"\n    />\n    <SCheckbox id=\"recipe-dialog-long\" v-model=\"longContent\" label=\"긴 본문으로 스크롤 확인\" />\n    <SSelect\n      id=\"recipe-dialog-busy-scope\"\n      v-model=\"busyScope\"\n      label=\"작업 중 잠금 범위\"\n      :options=\"[\n        { value: 'body', label: '본문만 · 닫기 가능' },\n        { value: 'all', label: '전체 · 완료 후 닫기' },\n      ]\"\n    />\n    <SBtn id=\"recipe-dialog-open\" @click=\"open = true\">창 열기</SBtn>\n    <SDialog\n      id=\"recipe-dialog\"\n      v-model=\"open\"\n      :presentation=\"presentation === 'drawer' ? 'drawer' : 'dialog'\"\n      eyebrow=\"UI EXAMPLE\"\n      title=\"제목과 닫기는 자리를 유지합니다\"\n      :busy=\"busy\"\n      :busy-scope=\"busyScope === 'all' ? 'all' : 'body'\"\n    >\n      <p v-if=\"description !== 'none'\">\n        {{\n          description === 'multi'\n            ? '본문만 스크롤되며 제목과 닫기는 자리를 유지합니다. '.repeat(8)\n            : '본문만 스크롤되며 제목과 닫기는 자리를 유지합니다.'\n        }}\n      </p>\n      <p>\n        {{\n          busyScope === 'all'\n            ? '전체 잠금 중에는 처리가 끝난 뒤 닫을 수 있습니다.'\n            : 'Escape로 닫으면 열기 버튼으로 돌아갑니다.'\n        }}\n      </p>\n      <p v-for=\"line in longContent ? 30 : 0\" :key=\"line\">스크롤 확인용 내용 {{ line }}</p>\n      <STextField id=\"recipe-dialog-last\" v-model=\"draft\" label=\"마지막 입력\" />\n      <template #feedback\n        ><p role=\"status\">{{ feedback }}</p></template\n      >\n      <template #actions-start=\"{ busy: pending }\"\n        ><SBtn variant=\"subtle\" :disabled=\"pending\" @click=\"draft = ''\">입력 초기화</SBtn></template\n      >\n      <template #actions=\"{ busy: pending }\">\n        <SBtn :disabled=\"pending && busyScope === 'all'\" @click=\"open = false\">닫기</SBtn>\n        <SBtn id=\"recipe-dialog-save\" variant=\"primary\" :loading=\"pending\" @click=\"save\"\n          >예제 처리</SBtn\n        >\n      </template>\n    </SDialog>\n  </SCard>\n</template>\n",
  "progress": "<script setup lang=\"ts\">\nimport type { SProgressState } from 'solyi-ui'\n\nconst state = ref<string | null>('indeterminate'),\n  animated = ref(true),\n  showValue = ref(true),\n  showMessage = ref(true)\nconst resolved = computed(() => state.value as SProgressState)\nconst pending = ref(false),\n  scope = ref<string | null>('container'),\n  blocking = ref(true),\n  hideContent = ref(false)\nlet timer: ReturnType<typeof setTimeout>\nfunction start(ms: number) {\n  if (pending.value) return\n  pending.value = true\n  timer = setTimeout(() => {\n    pending.value = false\n  }, ms)\n}\nonBeforeUnmount(() => clearTimeout(timer))\nconst options = [\n  { value: 'determinate', label: '35% 진행' },\n  { value: 'indeterminate', label: '진행률을 모르는 처리 중' },\n  { value: 'complete', label: '완료' },\n  { value: 'error', label: '오류' },\n]\n</script>\n<template>\n  <SCard :heading-level=\"2\" title=\"값을 아는 진행과 처리 중 표시\">\n    <SSelect\n      id=\"recipe-progress-mode\"\n      v-model=\"state\"\n      label=\"가상 작업 상태\"\n      :options=\"options\"\n      required\n    />\n    <SCheckbox id=\"recipe-progress-motion\" v-model=\"animated\" label=\"처리 중 반복 모션\" />\n    <SCheckbox id=\"recipe-progress-value\" v-model=\"showValue\" label=\"수치 표시\" />\n    <SCheckbox id=\"recipe-progress-message\" v-model=\"showMessage\" label=\"상태 문구 표시\" />\n    <SProgressLinear\n      id=\"recipe-linear\"\n      label=\"선형 진행\"\n      :model-value=\"35\"\n      :state=\"resolved\"\n      :animated=\"animated\"\n      :show-value=\"showValue\"\n      :show-message=\"showMessage\"\n    />\n    <SProgressCircular\n      id=\"recipe-circular\"\n      label=\"원형 진행\"\n      :model-value=\"35\"\n      :state=\"resolved\"\n      :animated=\"animated\"\n      :show-value=\"showValue\"\n      :show-message=\"showMessage\"\n    />\n    <p>\n      알 수 없는 진행률에는 퍼센트를 만들지 않습니다. 움직임 줄이기 설정에서는 정적으로 표시합니다.\n    </p>\n    <SSelect\n      id=\"recipe-loading-scope\"\n      v-model=\"scope\"\n      label=\"로딩 표시 범위\"\n      :options=\"[\n        { value: 'container', label: '이 영역만' },\n        { value: 'viewport', label: '화면 전체' },\n      ]\"\n    />\n    <SCheckbox id=\"recipe-loading-blocking\" v-model=\"blocking\" label=\"표시 중 영역 조작 잠금\" />\n    <SCheckbox\n      id=\"recipe-loading-hide-content\"\n      v-model=\"hideContent\"\n      label=\"표시 중 원본 내용 숨김\"\n    />\n    <SLoadingOverlay\n      :model-value=\"pending\"\n      title=\"예제를 처리하고 있어요.\"\n      description=\"잠시 후 자동으로 완료됩니다.\"\n      :scope=\"scope === 'viewport' ? 'viewport' : 'container'\"\n      :blocking=\"blocking\"\n      :hide-content=\"hideContent\"\n    >\n      <SCard title=\"독립 작업 영역\">\n        <p>짧은 작업은 표시를 지연해 깜빡임을 줄입니다.</p>\n        <div class=\"sol-actions\">\n          <SBtn id=\"recipe-loading-start\" @click=\"start(1200)\">로딩 예제</SBtn>\n          <SBtn id=\"recipe-loading-short\" @click=\"start(50)\">짧은 작업</SBtn>\n        </div>\n      </SCard>\n    </SLoadingOverlay>\n  </SCard>\n</template>\n",
  "help": "<script setup lang=\"ts\">\nconst open = ref(false)\n</script>\n<template>\n  <SCard :heading-level=\"2\" title=\"짧은 설명과 추가 정보\">\n    <p>짧은 설명에는 툴팁, 읽을 내용과 행동이 있는 추가 정보에는 팝오버를 사용합니다.</p>\n    <div class=\"sol-actions\">\n      <STooltip id=\"recipe-tooltip\" label=\"짧은 설명\" text=\"가상 기록을 찾는 도구예요.\" />\n      <SPopover id=\"recipe-popover\" v-model=\"open\" label=\"추가 정보\" title=\"추가 정보\">\n        <p>읽을 내용과 닫기 행동이 있는 가상 정보입니다.</p>\n      </SPopover>\n    </div>\n    <p class=\"sol-hint\">\n      포커스·포인터·터치로 열고 Escape로 닫습니다. 팝오버는 닫기 버튼과 초점 복귀를 제공합니다.\n    </p>\n  </SCard>\n</template>\n",
  "badge": "<script setup lang=\"ts\">\nimport { useSolLocale } from 'solyi-ui'\n\nconst locale = useSolLocale()\nconst english = computed(() => locale.value.code === 'en-US')\n</script>\n<template>\n  <SCard :heading-level=\"2\" :title=\"english ? 'Badge status indicators' : '배지로 상태 표시'\">\n    <p>\n      {{\n        english\n          ? 'Badges describe a status; they are not action buttons.'\n          : '배지는 상태를 설명하는 표시이며 누르는 버튼이 아닙니다.'\n      }}\n    </p>\n    <div class=\"sol-actions\">\n      <SBadge tone=\"success\" :content=\"english ? 'Complete' : '완료'\" />\n      <SBadge tone=\"warning\" variant=\"outlined\" :content=\"english ? 'Needs review' : '확인 필요'\" />\n      <SBadge tone=\"danger\" variant=\"filled\" :content=\"english ? 'Error' : '오류'\" />\n      <SBadge :content=\"english ? 'New' : '새 항목'\" />\n    </div>\n  </SCard>\n</template>\n",
  "chart": "<script setup lang=\"ts\">\nimport type { STreeItem, SBarChartItem } from 'solyi-ui'\n\ndefineProps<{ part?: string }>()\nconst selected = ref<string | null>(null),\n  expanded = ref<string[]>([]),\n  week = ref<string | null>('current')\nconst items: STreeItem[] = [\n  {\n    id: 'notes',\n    label: '기록',\n    children: [\n      { id: 'garden', label: '작은 정원' },\n      { id: 'book', label: '저녁 책장' },\n    ],\n  },\n  { id: 'archive', label: '보관', children: [{ id: 'walk', label: '주말 산책' }] },\n]\nconst chart = computed<SBarChartItem[]>(() =>\n  ['월요일', '화요일', '수요일', '목요일'].map((label, index) => ({\n    id: String(index),\n    label,\n    value: (week.value === 'current' ? [2, 4, 0, 5] : [1, 3, 2, 4])[index],\n  })),\n)\nconst total = computed(() => chart.value.reduce((sum, item) => sum + item.value, 0))\n</script>\n<template>\n  <SCard :heading-level=\"2\" :title=\"part ? undefined : '가상 자료의 차트와 계층'\">\n    <template v-if=\"!part || part === 'chart'\">\n      <SSelect\n        id=\"recipe-chart-week\"\n        v-model=\"week\"\n        label=\"가상 활동 주간\"\n        :options=\"[\n          { value: 'current', label: '이번 주' },\n          { value: 'previous', label: '지난주' },\n        ]\"\n      />\n      <p role=\"status\">총 {{ total }}개 기록 · 가상 자료</p>\n      <SBarChart\n        id=\"recipe-chart\"\n        label=\"가상 활동 횟수 · 차트와 같은 자료\"\n        :items=\"chart\"\n        category-label=\"요일\"\n        value-label=\"기록 수\"\n      />\n    </template>\n    <template v-if=\"!part || part === 'tree'\">\n      <STree\n        id=\"recipe-tree\"\n        v-model=\"selected\"\n        v-model:expanded=\"expanded\"\n        label=\"가상 기록 폴더\"\n        :items=\"items\"\n      />\n      <p role=\"status\">선택: {{ selected || '없음' }}</p>\n    </template>\n  </SCard>\n</template>\n",
  "composition": "<script setup lang=\"ts\">\nconst query = ref('')\nconst state = ref<string | null>('all')\nconst failed = ref(true)\nconst bookmarked = ref(false)\nconst resultPanel = useTemplateRef<HTMLElement>('resultPanel')\n\nfunction retry(event: MouseEvent) {\n  const owner = event.currentTarget\n  failed.value = false\n  nextTick(() => {\n    if (document.activeElement === owner || document.activeElement === document.body) {\n      resultPanel.value?.focus({ preventScroll: true })\n    }\n  })\n}\n</script>\n<template>\n  <div class=\"sol-stack\">\n    <SCard :heading-level=\"2\" title=\"컨트롤과 보조 행동의 관계\">\n      <div class=\"sol-filterbar\">\n        <STextField\n          id=\"recipe-composition-query\"\n          v-model=\"query\"\n          label=\"검색\"\n          help=\"도움말이 있어도 컨트롤 시작점은 같습니다.\"\n        />\n        <SSelect\n          id=\"recipe-composition-state\"\n          v-model=\"state\"\n          label=\"상태\"\n          :options=\"[\n            { value: 'all', label: '전체' },\n            { value: 'done', label: '완료' },\n          ]\"\n          required\n        />\n      </div>\n      <SAlert v-if=\"failed\" tone=\"danger\" title=\"가상 자료를 불러오지 못했어요.\">\n        <p>현재 검색 조건은 유지됩니다.</p>\n        <template #actions>\n          <SBtn variant=\"inline\" @click=\"retry\"> 다시 시도 </SBtn>\n        </template>\n      </SAlert>\n      <p v-else id=\"recipe-composition-result\" ref=\"resultPanel\" tabindex=\"-1\" role=\"status\">\n        ✓ 가상 재시도를 확인했어요.\n      </p>\n    </SCard>\n    <SCard description=\"제목 링크와 보조 버튼을 독립적으로 조작할 수 있습니다.\">\n      <template #leading><SIcon name=\"folder\" decorative /></template>\n      <template #title><a href=\"?view=recipes&amp;example=empty\">항목 미리보기</a></template>\n      <template #meta><SBadge :content=\"bookmarked ? '보관됨' : '예제'\" /></template>\n      <template #actions>\n        <SBtn @click=\"bookmarked = !bookmarked\">{{ bookmarked ? '보관 해제' : '보관' }}</SBtn>\n      </template>\n    </SCard>\n  </div>\n</template>\n",
  "chip": "<script setup lang=\"ts\">\nimport { useSolLocale } from 'solyi-ui'\n\nconst locale = useSolLocale()\nconst selected = ref(false),\n  removed = ref(false)\nconst english = computed(() => locale.value.code === 'en-US')\nconst removalResult = ref<HTMLElement | null>(null)\nasync function removeChip() {\n  removed.value = true\n  await nextTick()\n  removalResult.value?.focus()\n}\n</script>\n<template>\n  <SCard :heading-level=\"2\" :title=\"english ? 'Chip labels and selection' : '칩 표시·선택·제거'\">\n    <div class=\"sol-actions\">\n      <SChip :label=\"english ? 'Display label' : '표시용 라벨'\" />\n      <SChip\n        v-model:selected=\"selected\"\n        selectable\n        :label=\"english ? 'Select review' : '검토 선택'\"\n        tone=\"info\"\n      />\n      <SChip\n        v-if=\"!removed\"\n        removable\n        :label=\"english ? 'Remove this label' : '이 라벨 제거'\"\n        @remove=\"removeChip\"\n      />\n      <SChip disabled selectable :label=\"english ? 'Disabled selection' : '비활성 선택'\" />\n    </div>\n    <p id=\"recipe-chip-result\" ref=\"removalResult\" role=\"status\" tabindex=\"-1\">\n      {{ english ? 'Review selected: ' : '검토 선택: '\n      }}{{ selected ? (english ? 'yes' : '선택됨') : english ? 'no' : '선택 안 됨' }} ·\n      {{\n        removed\n          ? english\n            ? 'Label removed'\n            : '라벨 제거됨'\n          : english\n            ? 'Label retained'\n            : '라벨 유지'\n      }}\n    </p>\n  </SCard>\n</template>\n",
  "layouts": "<script setup lang=\"ts\">\nconst heading = useTemplateRef<HTMLElement>('heading')\nconst view = ref('list')\nconst selected = ref('작은 정원')\nconst name = ref('가상 사용자')\nconst result = ref('')\n\nfunction move(next: string) {\n  view.value = next\n  nextTick(() => heading.value?.focus())\n}\n</script>\n\n<template>\n  <SCard :heading-level=\"2\" title=\"설정·목록·상세 화면틀\">\n    <template #actions>\n      <nav class=\"sol-actions\" aria-label=\"가상 화면\">\n        <SBtn @click=\"move('list')\">목록</SBtn>\n        <SBtn @click=\"move('detail')\">상세</SBtn>\n        <SBtn @click=\"move('settings')\">설정</SBtn>\n      </nav>\n    </template>\n    <SContainer fluid class=\"pa-0\">\n      <SRow>\n        <SCol cols=\"12\" md=\"4\">\n          <p>목록·상세·설정은 같은 여백과 반응형 열을 공유합니다.</p>\n        </SCol>\n        <SCol cols=\"12\" md=\"8\">\n          <section>\n            <h3 id=\"recipe-layout-title\" ref=\"heading\" tabindex=\"-1\">\n              {{ view === 'list' ? '목록' : view === 'detail' ? '상세' : '설정' }}\n            </h3>\n            <div v-if=\"view === 'list'\" class=\"sol-actions\">\n              <SBtn\n                v-for=\"row in ['작은 정원', '조용한 책장']\"\n                :key=\"row\"\n                @click=\"\n                  selected = row;\n                  move('detail');\n                \"\n                >{{ row }}</SBtn\n              >\n            </div>\n            <SCard v-else-if=\"view === 'detail'\" :title=\"selected\">\n              <p>가상 기록의 짧은 상세입니다.</p>\n              <template #actions><SBtn @click=\"move('list')\">목록으로</SBtn></template>\n            </SCard>\n            <SForm v-else class=\"sol-stack\" @submit.prevent=\"result = '✓ 가상 설정을 확인했어요.'\">\n              <STextField id=\"recipe-layout-name\" v-model=\"name\" label=\"사용자 이름\" />\n              <SBtn type=\"submit\">설정 확인</SBtn>\n            </SForm>\n            <p role=\"status\">{{ result }}</p>\n          </section>\n        </SCol>\n      </SRow>\n    </SContainer>\n  </SCard>\n</template>\n",
  "data": "<script setup lang=\"ts\">\nimport type { TableColumn, TableRow, TableSort } from 'solyi-ui'\n\nconst query = ref(''),\n  page = ref(1),\n  selected = ref<string[]>([]),\n  sort = ref<TableSort | null>({ key: 'date', direction: 'descending' }),\n  state = ref<string | null>('ready')\nconst columns: TableColumn[] = [\n  { key: 'name', label: '이름', sortable: true },\n  { key: 'status', label: '상태', width: '96px' },\n  { key: 'date', label: '변경일', width: '128px', sortable: true },\n]\nconst all: TableRow[] = [\n  {\n    id: '1',\n    name: '작은 정원의 아주 긴 가상 기록 제목을 한 줄로 표시합니다',\n    status: '진행 중',\n    date: '2026-10-22',\n  },\n  { id: '2', name: '저녁 책장', status: '초안', date: '2026-10-21' },\n  { id: '3', name: '주말 산책', status: '완료', date: '2026-10-20' },\n  { id: '4', name: '계절 관찰', status: '진행 중', date: '2026-10-19' },\n]\nconst filtered = computed(() =>\n  all\n    .filter(r => String(r.name).includes(query.value.trim()))\n    .sort((a, b) => {\n      const s = sort.value\n      return s\n        ? String(a[s.key]).localeCompare(String(b[s.key]), 'ko') *\n            (s.direction === 'ascending' ? 1 : -1)\n        : 0\n    }),\n)\nconst pages = computed(() => Math.max(1, Math.ceil(filtered.value.length / 2))),\n  rows = computed(() => filtered.value.slice((page.value - 1) * 2, page.value * 2))\nconst siblings = ref<number | null>(1),\n  compactPagination = ref(false)\nwatch([query, sort], () => (page.value = 1))\nwatch(pages, p => (page.value = Math.min(page.value, p)))\n</script>\n<template>\n  <SCard :heading-level=\"2\" title=\"선택·정렬·페이지\">\n    <STextField id=\"recipe-table-search\" v-model=\"query\" label=\"자료 검색\" type=\"search\" />\n    <SSelect\n      id=\"recipe-table-state\"\n      v-model=\"state\"\n      label=\"가상 상태\"\n      :options=\"[\n        { value: 'ready', label: '정상' },\n        { value: 'loading', label: '로딩' },\n        { value: 'error', label: '오류' },\n      ]\"\n      required\n    />\n    <SDataTable\n      caption=\"가상 자료 목록\"\n      :columns=\"columns\"\n      :rows=\"rows\"\n      selectable\n      v-model:selected=\"selected\"\n      v-model:sort=\"sort\"\n      v-model:page=\"page\"\n      :page-count=\"pages\"\n      :sibling-count=\"siblings ?? 1\"\n      :compact-pagination=\"compactPagination\"\n      :loading=\"state === 'loading'\"\n      :error=\"state === 'error' ? '가상 오류입니다. 검색과 선택은 남습니다.' : ''\"\n      @retry=\"state = 'ready'\"\n    />\n    <SNumberInput\n      id=\"recipe-table-siblings\"\n      v-model=\"siblings\"\n      label=\"현재 페이지 양옆 번호 수\"\n      :min=\"0\"\n      :max=\"5\"\n      :step=\"1\"\n    />\n    <SCheckbox\n      id=\"recipe-table-compact\"\n      v-model=\"compactPagination\"\n      label=\"페이지 이동을 현재 번호 중심으로 표시\"\n    />\n    <SBtn variant=\"inline\" :disabled=\"!selected.length\" @click=\"selected = []\"> 선택 해제 </SBtn>\n  </SCard>\n</template>\n",
  "empty": "<script setup lang=\"ts\">\nimport { useSolLocale } from 'solyi-ui'\n\nconst locale = useSolLocale(),\n  added = ref(false),\n  target = ref<HTMLElement | null>(null)\nconst empty = ref<{ $el: HTMLElement } | null>(null)\nasync function toggle() {\n  added.value = !added.value\n  await nextTick()\n  ;(added.value ? target.value : empty.value?.$el)?.focus()\n}\n</script>\n<template>\n  <SEmptyState\n    v-if=\"!added\"\n    id=\"recipe-empty\"\n    ref=\"empty\"\n    tabindex=\"-1\"\n    :heading-level=\"2\"\n    icon=\"folder\"\n    :title=\"locale.code === 'en-US' ? 'No items yet' : '아직 항목이 없어요.'\"\n    :description=\"\n      locale.code === 'en-US'\n        ? 'Create your first item to get started.'\n        : '첫 항목을 추가해 보세요.'\n    \"\n    :min-block-size=\"240\"\n  >\n    <template #actions\n      ><SBtn id=\"recipe-empty-add\" variant=\"primary\" @click=\"toggle\">{{\n        locale.code === 'en-US' ? 'Add item' : '항목 추가'\n      }}</SBtn></template\n    >\n  </SEmptyState>\n  <SCard v-else :heading-level=\"2\" :title=\"locale.code === 'en-US' ? 'Your first item' : '첫 항목'\">\n    <p ref=\"target\" tabindex=\"-1\">\n      {{ locale.code === 'en-US' ? 'One example item is ready.' : '예제 항목을 추가했어요.' }}\n    </p>\n    <template #actions\n      ><SBtn @click=\"toggle\">{{\n        locale.code === 'en-US' ? 'Reset example' : '예제 초기화'\n      }}</SBtn></template\n    >\n  </SCard>\n  <p role=\"status\">{{ locale.code === 'en-US' ? 'Items: ' : '항목 수: ' }}{{ added ? 1 : 0 }}</p>\n</template>\n",
  "icon": "<script setup lang=\"ts\">\nimport { useSolLocale } from 'solyi-ui'\n\nconst locale = useSolLocale()\nconst english = computed(() => locale.value.code === 'en-US')\n</script>\n<template>\n  <SCard :heading-level=\"2\" :title=\"english ? 'Icons with and without text' : '아이콘과 설명'\">\n    <div class=\"sol-actions\">\n      <SIcon name=\"info\" :label=\"english ? 'Information' : '정보'\" />\n      <span><SIcon name=\"calendar\" decorative /> {{ english ? 'Calendar' : '달력' }}</span>\n      <span><SIcon name=\"folder\" decorative /> {{ english ? 'Folder' : '폴더' }}</span>\n      <SIcon name=\"chevron\" :rotate=\"270\" :label=\"english ? 'Next direction' : '다음 방향'\" />\n    </div>\n    <p class=\"sol-hint\">\n      {{\n        english\n          ? 'Decorative icons beside visible text are hidden from assistive technology. An icon alone needs a label.'\n          : '옆에 설명이 있는 장식 아이콘은 중복 낭독하지 않습니다. 아이콘만 표시할 때는 label로 의미를 전달합니다.'\n      }}\n    </p>\n  </SCard>\n</template>\n"
};
