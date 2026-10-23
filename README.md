# Sol UI

Sol UI 1.0.0은 Vue 3와 Vuetify를 사용하는 프로젝트를 위한 UI 라이브러리입니다. `solyi-ui`에 포함된 S 컴포넌트와 공통 토큰·CSS로 색, 글꼴, 간격, 밀도와 상태 표현을 함께 사용합니다.

## 설치

Core 토큰·CSS·helper가 포함된 `solyi-ui`를 설치합니다. 호환되는 Vue·Vuetify가 있는 프로젝트에서는 다음 명령을 사용합니다.

```sh
pnpm add solyi-ui
```

새 앱에서는 프레임워크도 한 명령으로 함께 설치합니다. Vue·Vuetify는 외부 peer 의존성이며 라이브러리 내부에 중복 번들하지 않습니다.

```sh
pnpm add solyi-ui vue vuetify
```

npm 7 이상은 기본 설정에서 필요한 peer를 자동 설치합니다. pnpm의 격리 구조에서는 앱이 직접 import할 Vue·Vuetify를 앱 의존성으로 명시하세요.

자세한 설치·업데이트 절차는 [설치 안내](https://ui.solyi.kr/#start/install)를 확인하세요.

검증한 조합은 Vue 3.5.44 / Vuetify 4.3.0이며 Node `^22.18.0 || >=24.12.0`을 사용합니다. 다른 조합과 실제 브라우저 지원 범위는 [호환 안내](documentation/guide/COMPATIBILITY.md)를 참고하세요.

## 앱에 연결

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

`solyi-ui/all.css`는 Vuetify 스타일·Wanted Sans·토큰·컴포넌트 스타일을 포함합니다. 코드 폰트는 필요한 앱에서 `solyi-ui/code-fonts.css`로 별도 선택합니다.

등록 후 템플릿에서 S 접두사의 PascalCase 컴포넌트를 사용합니다.

```vue
<template>
  <SBtn variant="primary">저장</SBtn>
</template>
```

`solyi-ui/global`은 템플릿 타입, `app.use(SolyiUI)`는 런타임 등록을 담당합니다. 샘플에서 생략된 `ref/computed` 등 Vue 함수 import는 별도의 자동 import 설정이 있어야 합니다. [시작 가이드](documentation/guide/GETTING-STARTED.md)에서 TypeScript·자동 import·테마 설정을 확인하세요.

## 컴포넌트와 예제

- [문서 사이트](https://ui.solyi.kr/): Style, Components, Patterns와 컴포넌트별 Examples·API
- [실행 예제](https://ui.solyi.kr/starter/?view=recipes): 설치한 패키지를 사용하는 Vue 화면
- [설치·업데이트](documentation/guide/DISTRIBUTION.md): 패키지 버전, 잠금 파일과 업데이트 방법
- [폼과 오류 처리](documentation/guide/FORMS.md): rules, 서버 오류와 template ref 메서드
- [소비 프로젝트 디자인 지침](DESIGN.md): 앱에서 토큰·컴포넌트를 적용하는 규칙

버튼·입력·폼·표·탐색·알림·오버레이·날짜/시간·파일·진행 표시 등은 공개 S API를 제공합니다. 검색·편집·비교·복구·화면틀은 해당 컴포넌트를 조합한 예제입니다. 문서 코드와 실행 화면은 같은 SFC와 실제 패키지를 사용합니다.

테마는 Violet·Sage·Sand, 화면 모드는 라이트·다크, 밀도는 기본·컴팩트를 제공합니다. 원본 V 컴포넌트도 공통 테마와 함께 사용할 수 있으며 모든 V API가 S API와 같다는 뜻은 아닙니다. 자동 검사만으로 전체 접근성 준수나 모든 브라우저 호환을 주장하지 않습니다.

## 개발

저장소의 설치·생성 원본·검사 명령·커밋 규칙은 [CONTRIBUTING](CONTRIBUTING.md), 패키지와 문서 구조는 [개발 가이드](documentation/guide/LIBRARY.md)에 있습니다.

## 라이선스

자체 재사용 코드·토큰·스타일·패키지 문서는 [MIT](LICENSE)입니다. 로고·캐릭터·favicon·개인 콘텐츠는 MIT 및 배포 패키지 범위에서 제외합니다. 폰트와 외부 소프트웨어에는 원래 라이선스·저작권 고지가 적용됩니다. [정확한 범위](LICENSE-SCOPE.md), [폰트](documentation/guide/FONT.md), [브랜드 자산](documentation/guide/BRAND-ASSETS.md)을 확인하세요.
