# 실제 패키지를 사용하는 Vue 예제

설치한 `solyi-ui` tarball을 사용하는 문서 실행 앱입니다. 문서 표시·복사·실행은 같은 `src/recipes/*.vue` 30개를 원본으로 사용합니다.

저장소 루트에서 검증된 tarball과 잠금 파일을 준비한 뒤 실행합니다. Node `^22.18.0 || >=24.12.0`을 사용하며 정확한 Vue·Vuetify·Vite 버전은 package.json과 lockfile에 고정합니다.

```sh
cd examples/vue-vuetify
npm ci --ignore-scripts
npm run dev
npm run check:recipes
npm run build
```

- `src/main.js`: 설치된 공통 CSS·Wanted Sans·코드 폰트를 불러오고, `app.use(SolyiUI)`로 S 컴포넌트를 한 번 등록합니다. `solyi-ui/global`은 템플릿 타입을 제공합니다.
- `auto-import.config.js`: `unplugin-auto-import`의 Vue preset을 사용합니다. 이 앱의 `ref/computed/onBeforeUnmount` 생략은 이 빌드 설정을 전제로 하며, S 전역 등록과는 별개입니다. 미설정 소비 앱은 Vue 함수를 직접 import해야 합니다.
- `src/auto-imports.d.ts`, `.eslintrc-auto-import.json`: 같은 preset의 TypeScript 선언과 읽기 전용 lint 전역 목록입니다. `../eslint.config.mjs`는 실제 ESLint 검사에 연결하며 템플릿은 vue-tsc가 검사합니다. Vue·라이브러리 타입 import는 필요한 경우 유지합니다.
- `src/vuetify.js`: 공통 `createSolyiVuetify`로 테마·기본값을 연결합니다. 실행 앱은 solyi-ui에 포함된 토큰·CSS·런타임을 사용합니다.
- `src/recipes/`: SForm·template refs, SCard actions, SContainer/SRow/SCol과 실제 S API를 사용하는 조합 예제입니다. 의미 있는 form·section·목록 등 기본 HTML은 그대로 사용합니다.
- `src/adapter.css`: 실행 앱 주변의 배치와 문서 iframe 연결을 맡습니다. 컴포넌트 내부 스타일은 설치한 패키지가 제공합니다.
- `THIRD-PARTY-NOTICES.txt`: 설치된 제삼자 라이선스를 보존합니다. 자체 재사용 코드의 MIT 범위와 브랜드 제외는 [라이선스 안내](../../LICENSE-SCOPE.md), 폰트 OFL과 출처는 [폰트 안내](../../documentation/guide/FONT.md)를 확인하세요.

문서 코드의 Prism 강조는 문서 셸에서 처리합니다. 이 앱의 컴포넌트 동작과는 분리되며, raw Vue 원본과 복사 값은 바뀌지 않습니다. 설치·등록·자동 import 전제는 [시작하기](../../documentation/guide/GETTING-STARTED.md)를 확인하세요. 실제 Safari·Fold 기기 검수는 별도로 수행하며 모든 환경에서의 호환을 보장하지 않습니다.
