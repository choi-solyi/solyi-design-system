# solyi-ui

solyi-ui 1.0.0은 Vue 3용 S 컴포넌트를 제공하는 UI 라이브러리입니다. Vue 3.5 / Vuetify 4.3을 peer로 사용합니다. Core 토큰·CSS·helper·폰트는 이 패키지에 포함되어 @solyi/core를 따로 설치하지 않습니다. 검증 기준은 Vue 3.5.44 / Vuetify 4.3.0이며 라이브러리에 런타임을 중복 번들하지 않습니다.

## 한 번 등록

```ts
import { createApp } from 'vue'
import { VApp } from 'vuetify/components/VApp'
import SolyiUI, { createSolyiVuetify } from 'solyi-ui'
import 'solyi-ui/all.css'
import 'solyi-ui/global'
import App from './App.vue'

createApp(App)
  .use(createSolyiVuetify({ components: { VApp } }))
  .use(SolyiUI)
  .mount('#app')
```

전역 S 등록은 각 앱에서 한 번 합니다. 위의 `solyi-ui/global` import는 Volar/vue-tsc의 전역 컴포넌트 타입을 연결합니다. `compilerOptions.types`에 중복으로 추가할 필요는 없습니다. 타입 모듈만 가져와서는 런타임 등록이 되지 않습니다. 개별 named export도 사용할 수 있으며, 로컬 등록만 사용하는 앱에서는 global import를 생략합니다.

실행 예제는 `unplugin-auto-import` Vue preset과 생성 TypeScript/lint globals를 함께 설정해 SFC의 반복 Vue 함수 import를 생략합니다. 자동 import를 설정하지 않은 앱에서는 Vue 함수 import를 유지해야 합니다. TypeScript 타입 import는 별도입니다. [정확한 시작 절차](https://ui.solyi.kr/#start/install)를 참고하세요.

## API와 책임

실제 Props·Slots·Events·Methods의 타입·기본값·허용값은 [컴포넌트별 문서](https://ui.solyi.kr/#component)와 생성한 `dist/index.d.ts`가 기준입니다. 문서의 샘플 코드는 같은 실제 패키지로 실행합니다.

- SBtn은 primary/secondary/subtle/inline 역할 변형과 tone을 제공합니다. loading은 중복 실행을 막고 초점을 유지합니다.
- STextField와 입력 컴포넌트는 label·help·규칙 오류·서버 오류의 연결을 담당하고, 값과 제출 데이터는 앱이 소유합니다. SForm과 메서드는 실제 타입 계약을 따릅니다.
- SCard는 자체 article 기반 카드입니다. id/title/eyebrow/headingLevel과 default/actions 슬롯을 제공하며 모든 VCard props를 전달하는 래퍼가 아닙니다.
- SContainer/SRow/SCol은 Vuetify 레이아웃을 재사용합니다. 모든 V 컴포넌트를 복제하거나 V 사용을 막지 않습니다.
- SDataTable은 현재 페이지 rows, 선택 ID, sort와 page를 받아 이벤트를 내보냅니다. 검색·필터·정렬·페이지 범위와 전체 선택의 의미는 소비 앱이 관리합니다. 긴 제목은 말줄임과 전체 보기 경로를 함께 제공합니다.
- SDialog·팝오버·툴팁·날짜·시간은 열림·닫힘·Escape·초점 복귀의 계약을 구분합니다. 비활성·취소·부분값과 좁은 화면을 실제 소비 앱에서 확인합니다.
- 파일 데모는 브라우저 로컬 메타데이터만 처리하며 내용을 읽거나 외부로 전송·저장하지 않습니다. 자동완성의 서버 공급자·인증·업무 오류는 소비 앱 책임입니다.
- 알 수 없는 진행률에 가짜 퍼센트나 aria-valuenow를 만들지 않습니다. indeterminate 모션은 reduced-motion에서 정적 대안으로 표시합니다.

`provideSolLocale`과 ko-KR/en-US의 LTR 팩을 제공하며 부분 override와 반응형 변경을 지원합니다. 전달된 label·slot·업무 오류는 앱 문구입니다. 앱 콘텐츠 번역이나 RTL 지원을 뜻하지 않습니다.

## 스타일과 라이선스

`solyi-ui/all.css` 한 줄로 Vuetify 스타일, UI 폰트, 토큰, 공통 컴포넌트와 S 컴포넌트 스타일을 순서대로 가져옵니다. 기존 개별 CSS 경로도 선택적으로 사용할 수 있으며 통합 진입점과 중복해서 가져오지는 않습니다. 코드 폰트가 필요한 앱은 `solyi-ui/code-fonts.css`를 추가합니다. 문서 셸용 docs.css는 가져오지 않습니다. 테마·defaults 브리지는 `createSolyiVuetify/applySolyiAppearance`로 연결하며 원본 V API와 S API의 차이를 유지합니다. 반경은 버튼 6·입력 10·카드/작은 팝업 12·다이얼로그/큰 패널 16px입니다.

자체 재사용 코드는 MIT이며 Core 폰트는 원문 OFL을 유지합니다. 로고·캐릭터·favicon·개인 콘텐츠는 제외하며 MIT로 브랜드 권리를 부여하지 않습니다. [설치·업데이트](https://ui.solyi.kr/#start/install)를 확인하세요. 패키지 업데이트와 배포는 소비 앱의 절차에 맞게 관리합니다.

## 입력 내부 clear (개발 source)

STextField·STextarea의 `clearable`은 입력 안의 이름 있는 X 버튼을 표시합니다. 기본값은 false입니다. `clear()`도 같은 동작을 수행하며, 두 모델의 빈 값은 `''`입니다. 새 `clear({value,reason:'clear'})` 알림은 기존 update/change payload를 바꾸지 않습니다. STextField에는 기존에 change 이벤트가 없으므로 새로 만들지 않습니다. required도 지운 뒤 오류를 표시하며 disabled/readonly는 버튼과 메서드를 모두 막습니다.

SSelect·SNumberInput도 같은 내부 clear를 지원하며 빈 모델은 `null`입니다. Select의 native option·readonly 제약과 Number의 required·min 기준 step·formatter·unit·preset·native 제출값을 유지합니다. Number의 잘못된 draft도 지울 수 있으며 부모가 clear를 거부하면 기존 모델의 draft를 복원합니다.

SAutocomplete·SMultiSelect도 clearable 모드에서 내부 X와 공개 clear가 검색어·요청·팝업을 초기화하고 검증·포커스를 처리합니다. 빈 모델은 null/빈 배열이고 기존 change payload는 유지합니다. 기본 false에서는 기존 clear의 검색어/팝업 동작을 보존합니다. SAutocomplete는 옵션 선택 전용이며 자유 입력 기능이 아닙니다.

`leading/trailing/indicator/status/loading` slot은 `{hasValue,disabled,readonly,loading,error,clear}`를 받습니다. `loading`은 진행 표시입니다. 편집을 막으려면 disabled/readonly를 함께 제어합니다. 새 기능의 타입은 `SolInputHandle`, `SolInputClearEvent<T>`, `SolInputControlScope`이며 Number의 기존 preset scope는 `SolNumberPresetScope`·`SolNumberInputSlots`로도 제공합니다. Date·Time 연결과 새 tarball·공개 배포는 아직 완료하지 않았습니다.

## 소비 프로젝트 AI 지침

패키지의 `DESIGN.md`는 소비 앱의 UI 지침입니다. 프로젝트 루트로 복사하고 AI 도구의 프로젝트 지침에서 참조하세요. 파일명만으로 자동 적용되지는 않습니다. 패키지와 문서 사이트는 루트의 같은 원본을 사용합니다.
