# @solyi/vue-ui 0.9.2

실제 Vue S 컴포넌트를 제공하는 **로컬 tarball 초안**입니다. npm에 게시하지 않았습니다. Vue 3.5 / Vuetify 4.3과 @solyi/core 0.4.5을 소비 앱에 설치합니다. 검증 기준은 Vue 3.5.44 / Vuetify 4.3.0이며 라이브러리에 런타임을 중복 번들하지 않습니다.

## 한 번 등록

```ts
import {createApp} from 'vue';
import {VApp} from 'vuetify/components/VApp';
import SolyiUI, {createSolyiVuetify} from '@solyi/vue-ui';
import 'vuetify/styles';
import '@solyi/core/fonts.css';
import '@solyi/core/code-fonts.css';
import '@solyi/core/tokens.css';
import '@solyi/core/components.css';
import '@solyi/vue-ui/styles.css';
import '@solyi/vue-ui/global';
import App from './App.vue';

createApp(App)
  .use(createSolyiVuetify({components: {VApp}}))
  .use(SolyiUI)
  .mount('#app');
```

전역 S 등록은 각 앱에서 한 번 합니다. Volar/vue-tsc에는 `@solyi/vue-ui/global`을 compilerOptions.types 또는 포함되는 env.d.ts에 연결합니다. 타입 모듈만 가져와서는 런타임 등록이 되지 않습니다. 개별 named export도 사용할 수 있습니다.

실행 예제는 `unplugin-auto-import` Vue preset과 생성 TypeScript/lint globals를 함께 설정해 SFC의 반복 Vue 함수 import를 생략합니다. 자동 import를 설정하지 않은 앱에서는 Vue 함수 import를 유지해야 합니다. TypeScript 타입 import는 별도입니다. [정확한 시작 절차](https://github.com/choi-solyi/solyi-design-system/blob/main/documentation/guide/GETTING-STARTED.md)를 참고하세요.

## API와 책임

실제 Props·Slots·Events·Methods의 타입·기본값·허용값은 [컴포넌트별 문서](https://choi-solyi.github.io/solyi-design-system/#component)와 생성한 `dist/index.d.ts`가 기준입니다. 문서의 샘플 코드는 같은 실제 패키지로 실행합니다.

- SBtn은 primary/secondary/subtle/inline 역할 변형과 tone을 제공합니다. loading은 중복 실행을 막고 초점을 유지합니다.
- STextField와 입력 컴포넌트는 label·help·규칙 오류·서버 오류의 연결을 담당하고, 값과 제출 데이터는 앱이 소유합니다. SForm과 메서드는 실제 타입 계약을 따릅니다.
- SCard는 자체 article 기반 카드입니다. id/title/eyebrow/headingLevel과 default/actions 슬롯을 제공하며 모든 VCard props를 전달하는 래퍼가 아닙니다.
- SContainer/SRow/SCol은 Vuetify 레이아웃을 재사용합니다. 모든 V 컴포넌트를 복제하거나 V 사용을 막지 않습니다.
- SDataTable은 현재 페이지 rows, 선택 ID, sort와 page를 받아 이벤트를 내보냅니다. 검색·필터·정렬·페이지 범위와 전체 선택의 의미는 소비 앱이 관리합니다. 긴 제목은 말줄임과 전체 보기 경로를 함께 제공합니다.
- SDialog·팝오버·툴팁·날짜·시간은 열림·닫힘·Escape·초점 복귀의 계약을 구분합니다. 비활성·취소·부분값과 좁은 화면을 실제 소비 앱에서 확인합니다.
- 파일 데모는 브라우저 로컬 메타데이터만 처리하며 내용을 읽거나 외부로 전송·저장하지 않습니다. 자동완성의 서버 공급자·인증·업무 오류는 소비 앱 책임입니다.
- 알 수 없는 진행률에 가짜 퍼센트나 aria-valuenow를 만들지 않습니다. indeterminate 모션은 reduced-motion에서 정적 대안으로 표시합니다.

`provideSolLocale`과 ko-KR/en-US의 LTR 팩을 제공하며 부분 override와 반응형 변경을 지원합니다. 전달된 label·slot·업무 오류는 앱 문구입니다. 앱 콘텐츠 번역이나 RTL 지원을 뜻하지 않습니다.

## 스타일·라이선스·게시 경계

Core 토큰과 CSS, Vue UI CSS를 한 번 가져옵니다. 문서 셸용 docs.css는 가져오지 않습니다. 테마·defaults 브리지는 `createSolyiVuetify/applySolyiAppearance`로 연결하며 원본 V API와 S API의 차이를 유지합니다. 반경은 버튼 6·입력 10·카드/작은 팝업 12·다이얼로그/큰 패널 16px입니다.

자체 재사용 코드는 MIT이며 Core 폰트는 원문 OFL을 유지합니다. 로고·캐릭터·favicon·개인 콘텐츠는 제외하며 MIT로 브랜드 권리를 부여하지 않습니다. `private:true`는 게시 차단 장치이지 코드 라이선스가 아닙니다. [설치·업데이트·롤백](https://github.com/choi-solyi/solyi-design-system/blob/main/documentation/guide/DISTRIBUTION.md)을 확인하세요. 다른 앱 자동 업데이트와 npm 게시를 연결하지 않았습니다.

## 소비 프로젝트 AI 지침

패키지의 `DESIGN.md`는 소비 앱의 UI 지침입니다. 프로젝트 루트로 복사하고 AI 도구의 프로젝트 지침에서 참조하세요. 파일명만으로 자동 적용되지는 않습니다. 두 패키지와 문서 사이트는 루트의 같은 원본을 사용합니다.
