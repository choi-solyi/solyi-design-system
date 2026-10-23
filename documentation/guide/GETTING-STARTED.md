# 처음 사용하기

기존 Vite + Vue 프로젝트에 재사용 UI를 설치하고 첫 폼을 만드는 순서입니다. 같은 안내와 복사 가능한 코드는 사이트의 [Getting started](https://ui.solyi.kr/#start/install)에서 바로 읽을 수 있습니다.

## 1. solyi-ui 설치

`solyi-ui` 하나에 S 컴포넌트와 공통 스타일·토큰·폰트가 포함됩니다. [Getting started의 설치](https://ui.solyi.kr/#start/install)에서 pnpm·npm 탭으로 명령과 검증한 버전을 확인합니다. 사이트에서는 pnpm 명령이 먼저 표시됩니다. package.json과 lockfile을 함께 저장합니다.

```sh
pnpm add solyi-ui
```

npm을 사용하는 앱에서는 같은 패키지를 설치합니다.

```sh
npm install solyi-ui
```

기본 설정의 npm(7 이상)과 pnpm은 필요한 Vue·Vuetify peer dependency를 자동 다운로드합니다. 자동 다운로드와 앱의 직접 import는 다릅니다. 새 pnpm 앱에서 Vue·Vuetify를 직접 import하려면 다음처럼 앱 의존성으로 함께 추가합니다. 이미 호환되는 Vue·Vuetify가 있는 앱은 solyi-ui만 추가합니다.

```sh
pnpm add solyi-ui vue vuetify
```

앱에 이미 있는 호환 버전은 유지할 수 있습니다. 자동 peer 다운로드를 끈 환경도 Vue·Vuetify를 직접 설치해야 합니다. 검증한 조합은 Vue 3.5.44·Vuetify 4.3.0이며 모든 허용 버전을 검증했다는 뜻은 아닙니다. 버전을 생략하면 설치 시점의 최신 배포를 선택하며 이후 같은 설치는 lockfile로 재현합니다. 특정 버전을 고정하려는 앱은 선택적으로 `--save-exact`를 사용해 package.json의 ^·~ 범위를 생략할 수 있습니다.

직접 tarball로 검증하는 방법과 파일·버전·해시는 같은 설치 섹션의 접힌 항목 및 [릴리스 카탈로그](https://ui.solyi.kr/releases/index.json)에 있습니다.

처음 구성하는 앱이라면 개발 도구도 설치합니다.

```sh
npm install -D vite@8.3.4 @vitejs/plugin-vue@6.0.10 typescript@5.9.3 vue-tsc@3.3.13 unplugin-auto-import@21.1.0
```

## 2. 전역 등록과 CSS·폰트

다음은 main.ts입니다. Vuetify 스타일, solyi-ui의 토큰·컴포넌트 CSS, UI CSS를 순서대로 불러옵니다. `fonts.css`는 Wanted Sans, `code-fonts.css`는 JetBrains Mono와 한글 폴백 나눔고딕코딩을 self-host합니다. 코드 폰트는 일반 UI와 분리됩니다. 폰트를 생략하면 앱의 시스템 폴백을 사용합니다.

```ts
import { createApp } from 'vue';
import { VApp } from 'vuetify/components/VApp';
import SolyiUI, { createSolyiVuetify, applySolyiAppearance } from 'solyi-ui';
import 'solyi-ui/global';
import 'vuetify/styles';
import 'solyi-ui/fonts.css';
import 'solyi-ui/code-fonts.css';
import 'solyi-ui/tokens.css';
import 'solyi-ui/components.css';
import 'solyi-ui/styles.css';
import App from './App.vue';

const vuetify = createSolyiVuetify({ components: { VApp } });
const app = createApp(App);

app.use(vuetify).use(SolyiUI);
applySolyiAppearance(vuetify.theme, {
  theme: 'violet',
  mode: 'light',
  density: 'comfortable',
});
app.mount('#app');
```

`app.use(SolyiUI)`는 런타임 전역 등록입니다. `solyi-ui/global`은 Volar/vue-tsc가 S 컴포넌트를 이해하도록 하는 타입 진입점이며, 타입 import만으로 컴포넌트가 런타임 등록되지는 않습니다. 각 SFC에서 SBtn·STextField를 개별 import할 필요는 없습니다. 문서 전용 `docs.css`는 소비 앱에 추가하지 않습니다.

## 3. Vue 자동 import·TypeScript·lint

S 컴포넌트 등록과 Vue 함수 자동 import는 별개입니다. 다음 Vite 설정은 `ref`, `computed`, `useTemplateRef`, `onBeforeUnmount` 같은 Vue 함수를 SFC에 자동 import합니다. Vue preset 밖의 함수와 TypeScript 타입은 직접 import합니다.

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
      vueTemplate: false,
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
        filepath: '.eslintrc-auto-import.json',
        globalsPropValue: 'readonly',
      },
    }),
  ],
});
```

Vite 실행 시 `src/auto-imports.d.ts`와 `.eslintrc-auto-import.json`이 생성됩니다. 기존 tsconfig 옵션을 유지하면서 전역 컴포넌트 타입과 생성 파일을 포함합니다.

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "noEmit": true,
    "types": ["vite/client", "solyi-ui/global"]
  },
  "include": ["src/**/*.ts", "src/**/*.vue", "src/auto-imports.d.ts"]
}
```

ESLint를 사용한다면 생성된 readonly globals를 실제 lint 설정과 연결합니다.

```sh
npm install -D eslint@10.13.0 vue-eslint-parser@10.4.1 @typescript-eslint/parser@8.72.0
```

다음은 Vue SFC의 script 영역을 검사하는 최소 eslint.config.mjs입니다. 브라우저 전역·매크로·팀 규칙은 기존 앱 설정과 병합합니다.

```js
import { readFileSync } from 'node:fs';
import vueParser from 'vue-eslint-parser';
import tsParser from '@typescript-eslint/parser';

const { globals } = JSON.parse(
  readFileSync(new URL('./.eslintrc-auto-import.json', import.meta.url), 'utf8'),
);

export default [{
  files: ['src/**/*.vue'],
  languageOptions: {
    parser: vueParser,
    parserOptions: { parser: tsParser, ecmaVersion: 'latest', sourceType: 'module' },
    globals,
  },
  rules: { 'no-undef': 'error', 'no-global-assign': 'error' },
}];
```

생성 파일을 먼저 준비한 뒤 타입과 lint를 검사합니다.

```sh
npm exec vite build
npm exec vue-tsc -- --noEmit -p tsconfig.json
npm exec eslint -- "src/**/*.vue"
```

실제 starter는 [auto-import.config.js](../../examples/vue-vuetify/auto-import.config.js), [tsconfig.recipes.json](../../examples/vue-vuetify/tsconfig.recipes.json), [공통 ESLint 설정](../../examples/eslint.config.mjs)을 사용합니다. 독립 소비 예제도 같은 Vue preset을 사용합니다. 자동 import를 설정하지 않은 앱에서는 Vue 함수를 직접 import해야 합니다.

## 4. 첫 폼과 template ref

다음 App.vue는 앞의 전역 등록·자동 import 설정을 사용합니다.

```vue
<script setup lang="ts">
import { sRules } from 'solyi-ui';
import type { SFormHandle, SFormSubmitEvent } from 'solyi-ui';

const form = useTemplateRef<SFormHandle>('form');
const name = ref('');
const serverError = ref('');
const message = ref('');
const rules = [sRules.required(), sRules.minLength(3)];

async function submit(event: SFormSubmitEvent) {
  message.value = '';
  const result = await event;
  if (result.cancelled) return;
  if (!result.valid) {
    form.value?.focus();
    return;
  }
  message.value = '입력을 확인했어요.';
}

function clearValidation() {
  serverError.value = '';
  message.value = '';
  form.value?.resetValidation();
}
</script>

<template>
  <VApp>
    <SContainer>
      <SCard title="프로젝트 이름">
        <SForm ref="form" class="sol-stack" @submit.prevent="submit">
          <STextField
            id="project-name"
            v-model="name"
            label="이름"
            :rules="rules"
            :server-error="serverError"
            required
            @update:model-value="serverError = ''"
          />
          <div class="sol-actions">
            <SBtn type="submit" variant="primary">입력 확인</SBtn>
            <SBtn @click="clearValidation">오류 표시 초기화</SBtn>
          </div>
          <p v-if="message" role="status">{{ message }}</p>
        </SForm>
      </SCard>
    </SContainer>
  </VApp>
</template>
```

SForm의 submit 이벤트는 검증 결과를 기다릴 수 있는 `SFormSubmitEvent`입니다. `result.cancelled`이면 제출을 중단합니다. `SFormHandle`의 `validate()`, `focus()`, `resetValidation()`을 template ref로 호출할 수 있습니다. DOM ID를 조회해 내부 입력을 조작하지 않습니다.

`rules`는 동기 검증입니다. 서버 응답은 앱이 처리한 뒤 `server-error` 또는 `error-messages`로 전달합니다. `resetValidation()`은 입력값과 서버 오류를 자동 삭제하지 않으므로 필요한 값은 앱에서 명시적으로 초기화합니다. 자세한 계약은 [폼과 오류 처리](FORMS.md), [SForm Examples / API](https://ui.solyi.kr/#component/sform)를 확인합니다.

## 5. 테마와 레이아웃

`createSolyiVuetify()`와 `applySolyiAppearance()`로 공통 CSS와 Vuetify 테마를 같은 상태로 갱신합니다. 테마는 violet/sage/sand, 모드는 light/dark, 밀도는 comfortable/compact입니다. 저장·복원은 소비 앱이 관리합니다.

SContainer·SRow·SCol은 Vuetify 레이아웃을 재사용합니다. SCard는 자체 API이므로 모든 VCard props가 지원되는 것으로 가정하지 않습니다. 각 컴포넌트의 Props·Slots·Events·Methods는 [Components](https://ui.solyi.kr/#component)에서 확인합니다.

배경·테두리가 있는 선택 행에는 공통 CSS의 `sol-choice-row`를 명시적으로 사용합니다. 전체 label에 세로 8px·가로 12px, 최소 터치 높이 44px를 주며 체크박스 아이콘 자체에는 padding을 추가하지 않습니다.

## 6. 업데이트와 롤백

[설치·업데이트](DISTRIBUTION.md)대로 solyi-ui 버전과 lockfile을 갱신하고 소비 앱의 타입·동작·대표 화면을 검사합니다. 롤백은 직전 정상 버전의 소비 코드·package.json·lockfile을 함께 복원한 뒤 재설치합니다.

```sh
npm ci --ignore-scripts
npm exec vue-tsc -- --noEmit -p tsconfig.json
npm exec vite build
```

라이브러리를 변경해도 다른 앱이 자동 배포되지는 않습니다. 지원 범위는 [버전과 호환](COMPATIBILITY.md), 권리는 [라이선스 범위](../../LICENSE-SCOPE.md), AI와 공유할 앱 규칙은 [DESIGN.md](../../DESIGN.md)를 참고합니다.
