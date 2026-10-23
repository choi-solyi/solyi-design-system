# Sol UI 소비 프로젝트 디자인 지침

이 문서는 Vue 3용 UI 라이브러리 solyi-ui를 사용하는 앱의 UI 구현 지침입니다. 디자인 시스템 저장소 자체의 개발·기여 규칙이나 API 명세를 대신하지 않습니다. 사용자의 명시적 요구와 소비 프로젝트의 기존 규칙을 먼저 확인하고, 예외가 필요하면 적용 범위와 이유를 기록하세요.

## AI 도구에 연결하기

DESIGN.md라는 파일명만으로 모든 AI 도구가 자동으로 읽는 것은 아닙니다. 프로젝트 루트에 복사한 뒤 사용하는 도구의 프로젝트 지침에서 이 파일을 참조하게 하거나, 작업을 시작할 때 파일을 첨부·제공하세요. 도구별 자동 로딩 방식은 따로 확인합니다.

설치된 패키지의 DESIGN.md에도 같은 지침이 포함됩니다. 프로젝트에 복사한 가이드는 패키지 업데이트 때 원본과 비교하고, 앱별 예외는 별도 항목으로 유지하세요. 가이드를 업데이트한다고 앱의 코드나 배포가 자동으로 바뀌지는 않습니다.

## 짧은 시작 프롬프트

```text
UI 작업 전에 프로젝트의 DESIGN.md를 읽고 적용해 주세요.
설치된 solyi-ui의 버전, 공개 타입·API, 기존 앱 설정을 먼저 확인하세요.
실제 S 컴포넌트와 역할 토큰을 우선 사용하고 없는 API는 추측하지 마세요.
기존 기능·접근성·앱별 예외를 보존하며, 변경 범위의 반응형·라이트/다크·키보드 동작을 확인하고 미검증을 구분해 보고하세요.
```

## 1. 설치 버전과 실제 API

- package.json과 lockfile, 설치된 패키지의 package.json·exports·타입을 기준으로 작업합니다. 문서 버전과 패키지 버전은 서로 다를 수 있습니다.
- 설치된 solyi-ui와 Vue/Vuetify peer 버전을 확인합니다. 버전과 integrity를 고정하고 업데이트·롤백 때 package.json과 lockfile을 함께 관리합니다.
- solyi-ui를 설치하고 프로젝트의 Vue/Vuetify peer 조합을 확인합니다. Core 토큰·CSS·helper는 solyi-ui 안에 포함되므로 @solyi/core를 별도 설치하지 않습니다. 제공하지 않는 생성 CLI나 설치 옵션을 임의로 안내하지 않습니다.
- 사용할 props·slots·events·methods를 설치 버전에서 확인합니다. SCard가 모든 VCard 옵션을 전달한다고 가정하거나, 존재하지 않는 S 태그·메서드를 만들지 않습니다.

## 2. 컴포넌트와 레이아웃

- 실제 공개 S 컴포넌트를 우선 사용합니다. 예를 들어 SBtn, STextField, SSelect, SForm, SCard, SDialog, SDataTable을 목적에 맞게 사용합니다. 명명은 S 접두사 PascalCase입니다.
- SContainer·SRow·SCol은 Vuetify 레이아웃을 재사용합니다. SCard의 actions 슬롯은 카드의 행동을 배치할 때 사용하고, 시각적 그룹과 간격은 명시적으로 구성합니다.
- S API가 없는 기능은 조합 가능한 기존 컴포넌트와 의미 있는 HTML로 구현하고, 전용 API가 있는 것처럼 설명하지 않습니다. 직접 V 컴포넌트가 필요하면 createSolyiVuetify의 공통 테마·defaults 연결을 유지합니다.
- 문서 사이트의 docs.css는 소비 앱에 복사하지 않습니다. solyi-ui/all.css로 Vuetify·폰트·토큰·컴포넌트 스타일을 앱 진입점에서 한 번 불러옵니다. 개별 스타일 export도 유지되며 코드 폰트는 solyi-ui/code-fonts.css로 별도 선택합니다.

## 3. 토큰·테마·밀도

- 선택 영역은 --sol-color-selected-surface/text/border/indicator 역할을 사용합니다. 배경색만 바꾸지 말고 체크·표시선·굵기 등 상태 단서를 함께 유지합니다. `accent-soft`는 옅은 강조 바탕이므로 선택 역할 전체를 대신한다고 가정하지 않습니다. '현재 진행 작업'과 '사용자가 보고 있는 항목'은 앱에서 별도 상태로 관리합니다.

- 색은 원시 팔레트보다 역할 토큰을 우선합니다. --sol-color-canvas, --sol-color-surface, --sol-color-text, --sol-color-muted, --sol-color-accent와 의미 색을 용도에 맞게 연결합니다. 성공·주의·오류를 색만으로 전달하지 않습니다.
- 간격은 --sol-space-* 토큰을 사용합니다. 검색 입력·선택창의 컨트롤 높이와 시작선을 맞추고 라벨·설명·오류·행동 사이 간격을 유지합니다. 알림의 보조 행동은 메시지보다 강조하지 않습니다.
- 기본 반경은 버튼6px, 입력10px, 카드·작은 팝업12px, 다이얼로그·큰 패널16px입니다. --sol-radius-button/control/card/floating/panel을 사용하고 의도된 원형 아바타·상태점은 유지합니다.
- UI 글꼴은 --sol-font-sans의 Wanted Sans 계열, 코드 글꼴은 --sol-font-mono의 JetBrains Mono → Nanum Gothic Coding → monospace입니다. 폰트 CSS는 명시적으로 불러오고 원래 라이선스를 유지합니다.
- 테마 이름은 violet/sage/sand, 화면 모드는 light/dark, 밀도는 comfortable/compact입니다. 공통 설정은 createSolyiVuetify와 applySolyiAppearance를 통해 Core CSS와 Vuetify에 같은 상태를 전달합니다. 저장·복원은 소비 앱이 담당합니다.
- 데스크톱 기본 버튼36px, 컨트롤40px이며 좁은 화면·터치의 기본 대상은44px입니다. compact를 이유로 터치 영역이나 포커스 표시를 희생하지 않습니다. 의미 색과 밀도는 앱 성격에 맞게 조정하되 예외를 문서화합니다.

## 4. 전역 등록과 자동 import의 전제

- S 컴포넌트는 앱에서 SolyiUI 플러그인을 한 번 등록하고, solyi-ui/global의 전역 템플릿 타입도 연결합니다. 타입 선언만으로 런타임 컴포넌트가 등록되지는 않습니다.
- 샘플의 ref/computed/onBeforeUnmount 등 생략된 Vue import는 unplugin-auto-import의 Vue preset이 설정된 프로젝트를 전제로 합니다. TypeScript 선언과 lint globals도 같은 설정에 연결합니다.
- 자동 import를 설정하지 않은 앱에서는 실제 사용하는 Vue 함수를 직접 import합니다. 패키지 helper와 TypeScript 타입까지 자동 import된다고 가정하지 않습니다.

## 5. 폼·오류·초점

- SForm과 입력의 rules, sRules.required()/minLength() 같은 공통 검증을 사용합니다. 현재 rules는 동기 함수이며 비동기·서버 응답은 소비 앱이 처리합니다.
- 서버 오류는 serverError/errorMessages로 전달하고 클라이언트 규칙 오류와 책임을 구분합니다. 입력을 지우거나 중복 오류 문구를 무조건 추가하지 않습니다. 오류와 입력의 접근성 연결을 유지합니다.
- SForm.validate()는 결과 Promise를 반환합니다. 제출에서 결과를 기다리고 valid를 확인합니다. cancelled 결과는 제출에 사용하지 않습니다. resetValidation()이 입력 모델이나 외부 서버 오류까지 지운다고 가정하지 않습니다.
- template ref와 공개된 focus()/validate()/resetValidation() 메서드를 사용합니다. 필드마다 반환값·노출 메서드를 타입에서 확인하며, document.getElementById로 내부 입력을 찾아 조작하지 않습니다.
- 오류 요약은 필드로 이동하는 링크를 제공하고 실제 필드 ref로 초점을 옮깁니다. 다이얼로그·팝오버는 Escape 닫기, 포커스 트랩이 필요한 경우의 범위, 닫은 뒤 초점 복귀를 보존합니다.

## 6. HTML·상태·데이터

- HTML을 무조건 제거하지 않습니다. button·a·form·label·목록·표·제목의 의미와 접근 가능한 이름을 보존하고, S 컴포넌트와 불필요하게 중복되는 외형 구현을 줄입니다.
- 로딩·비활성·오류·빈 결과·완료와 반복·취소·재시도를 확인합니다. 비동기 응답 경합, IME 조합 중 Enter, 표의 선택·정렬·필터·페이지 조합을 고려합니다.
- 날짜는 date-only 값, 시간은 HH:mm 등 실제 API 값 구조를 유지합니다. 기간의 부분 선택을 완료값으로 내보내지 않습니다. 파일 전송·저장은 실제 앱 요구와 별도로 구현하며 문서의 로컬 데모가 업로드 서비스를 제공한다고 가정하지 않습니다.

## 7. 변경 후 확인과 프로젝트별 예외

- 변경 범위의 타입·빌드와 관련 동작을 검사합니다. 설치 패키지로 실행해 문서 예시와 실제 스타일이 일치하는지 확인합니다.
- 넓은 화면·중간 폭·320~333 CSSpx 상당 좁은 화면에서 오버플로, 긴 텍스트, 코드 스크롤, 겹침·잘림을 확인합니다. 라이트/다크와 영향을 받는 테마·밀도도 확인합니다.
- Tab·방향키·Enter·Space·Escape, 포커스 표시·복귀·가림, 라벨·오류 안내와 reduced-motion을 실제 상호작용에서 확인합니다. 모션만으로 상태를 전달하지 않습니다.
- 실제로 실행한 브라우저·폭·상태·검사를 보고합니다. Safari·실기기·화면 낭독기를 검사하지 않았다면 통과라고 표현하지 않습니다. 자동 검사만으로 접근성 전체 준수를 주장하지 않습니다.
- 프로젝트별 예외는 적용 위치·이유·대체 값·확인한 상태를 기록합니다. 사용자의 명시적 결정 없이 다른 앱의 색·데이터·운영 설정까지 일괄 변경하지 않습니다.
