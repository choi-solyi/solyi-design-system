import {packageReleases} from './release-data.js';

// The site and guide contract test read the same copyable source strings.
export const gettingStartedSnippets = Object.freeze({
  tooling: `npm install -D vite@8.3.4 @vitejs/plugin-vue@6.0.10 typescript@5.9.3 vue-tsc@3.3.13 unplugin-auto-import@21.1.0`,
  registration: `import { createApp } from 'vue';
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
app.mount('#app');`,
  vite: `import { defineConfig } from 'vite';
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
});`,
  types: `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "noEmit": true,
    "types": ["vite/client", "solyi-ui/global"]
  },
  "include": ["src/**/*.ts", "src/**/*.vue", "src/auto-imports.d.ts"]
}`,
  lintInstall: `npm install -D eslint@10.13.0 vue-eslint-parser@10.4.1 @typescript-eslint/parser@8.72.0`,
  lint: `import { readFileSync } from 'node:fs';
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
}];`,
  verify: `npm exec vite build
npm exec vue-tsc -- --noEmit -p tsconfig.json
npm exec eslint -- "src/**/*.vue"`,
  form: `<script setup lang="ts">
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
</template>`,
  restore: `npm ci --ignore-scripts
npm exec vue-tsc -- --noEmit -p tsconfig.json
npm exec vite build`,
});

export function currentInstallCommand(catalogue = packageReleases) {
  const release = catalogue.releases.find(item => item.release === catalogue.current);
  const ui = release?.packages.find(item => item.name === 'solyi-ui');
  if (!ui) return '';
  const peer = release.compatibility;
  return `npm install --save-exact ${ui.name}@${ui.version} vue@${peer.vue} vuetify@${peer.vuetify}`;
}

export function currentTarballInstallCommand(catalogue = packageReleases) {
  const release = catalogue.releases.find(item => item.release === catalogue.current);
  const ui = release?.packages.find(item => item.name === 'solyi-ui');
  if (!ui) return '';
  const peer = release.compatibility;
  return `npm install --save-exact https://ui.solyi.kr/releases/${release.release}/${ui.file} vue@${peer.vue} vuetify@${peer.vuetify}`;
}

export function renderGettingStarted(h) {
  const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const release = packageReleases.releases.find(item => item.release === packageReleases.current);
  const ui = release?.packages.find(item => item.name === 'solyi-ui');
  const install = ui ? `<div class="sol-card sol-stack"><h3>현재 권장 버전</h3><p><code>${escape(ui.name)} ${escape(ui.version)}</code> · Vue ${escape(release.compatibility.vue)} / Vuetify ${escape(release.compatibility.vuetify)}</p>${h.codeSample('터미널 · npm으로 설치', currentInstallCommand())}${h.codeSample('터미널 · pnpm으로 설치', currentInstallCommand().replace('npm install', 'pnpm add'))}<p class="sol-hint">공통 스타일과 폰트는 solyi-ui에 포함됩니다. Vue와 Vuetify는 앱에서 함께 사용하는 peer dependency입니다. package.json과 lockfile을 함께 저장하세요.</p><details><summary>tarball로 직접 설치·검증하기</summary><div class="sol-stack"><div class="button-row"><a class="sol-button" href="./releases/${escape(release.release)}/${escape(ui.file)}" download>solyi-ui 다운로드</a><a href="./releases/${escape(release.release)}/manifest.json">Manifest</a><a href="./releases/${escape(release.release)}/SHA256SUMS">SHA-256</a></div>${h.codeSample('터미널 · tarball 직접 설치', currentTarballInstallCommand())}<p class="sol-hint">체크섬은 파일 손상 확인에 사용하며 라이선스나 공급망 안전성 전체를 보증하지 않습니다.</p></div></details></div>` : '<p class="sol-notice warning">설치 파일 정보를 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.</p>';
  return h.section('install', '설치', '기존 Vite + Vue 프로젝트에 solyi-ui를 설치합니다.',
    `<div class="sol-stack"><p><code>solyi-ui</code> 하나로 S 컴포넌트와 공통 스타일·토큰·폰트를 사용합니다. 아래 안내는 기존 Vite + Vue 프로젝트를 기준으로 합니다.</p>${install}<p>처음 구성하는 앱이라면 아래 개발 도구도 설치합니다.</p>${h.codeSample('터미널 · 개발 도구 설치', gettingStartedSnippets.tooling)}<p class="sol-hint">현재 확인한 도구는 Vite 8.3.4, Vue 3.5.44, Vuetify 4.3.0입니다. Node는 <code>^22.18.0 || &gt;=24.12.0</code> 범위를 사용합니다.</p></div>`) +
    h.section('registration', '스타일과 전역 등록', 'main.ts에서 한 번 등록하면 각 SFC에서 S 컴포넌트를 개별 import하지 않습니다.',
      `<div class="sol-stack"><p>Vuetify 스타일 → solyi-ui 폰트·토큰·컴포넌트 CSS → UI CSS 순서로 불러옵니다. <code>fonts.css</code>는 Wanted Sans, <code>code-fonts.css</code>는 JetBrains Mono와 한글 폴백 나눔고딕코딩을 self-host합니다. 코드 폰트는 일반 UI 폰트와 분리됩니다. 폰트를 생략하면 앱의 시스템 폴백을 사용합니다.</p>${h.codeSample('main.ts · 전역 등록', gettingStartedSnippets.registration)}<p><code>app.use(SolyiUI)</code>는 런타임 S 컴포넌트를 등록하고 <code>solyi-ui/global</code>은 Volar/vue-tsc의 전역 컴포넌트 타입을 제공합니다. 타입 import만으로 런타임 등록되지는 않습니다. 문서 사이트 전용 <code>docs.css</code>는 소비 앱에 추가하지 않습니다.</p></div>`) +
    h.section('auto-import', 'Vue 자동 import와 타입 검사', 'S 컴포넌트 등록과 Vue 함수 자동 import는 서로 다른 설정입니다.',
      `<div class="sol-stack"><p><code>unplugin-auto-import</code>의 Vue preset을 설정하면 <code>ref</code>, <code>computed</code>, <code>useTemplateRef</code>, <code>onBeforeUnmount</code> 같은 Vue 함수를 SFC에서 반복 import하지 않아도 됩니다. TypeScript 타입과 <code>sRules</code> 같은 라이브러리 함수는 직접 import합니다.</p>${h.codeSample('vite.config.ts · Vue 자동 import', gettingStartedSnippets.vite)}<p>Vite를 실행하면 <code>src/auto-imports.d.ts</code>와 <code>.eslintrc-auto-import.json</code>이 생성됩니다. 기존 tsconfig의 옵션을 유지하면서 전역 타입과 생성 파일을 포함하세요.</p>${h.codeSample('tsconfig.json · 전역 타입', gettingStartedSnippets.types)}<p>ESLint를 사용한다면 생성된 readonly globals를 실제 lint 설정에도 연결합니다. 다음은 Vue SFC의 script 영역을 검사하는 최소 설정입니다. 브라우저 전역·매크로·팀 규칙은 앱의 기존 lint 설정과 병합하세요.</p>${h.codeSample('터미널 · 선택 도구 ESLint 설치', gettingStartedSnippets.lintInstall)}${h.codeSample('eslint.config.mjs · 생성 globals 연결', gettingStartedSnippets.lint)}<p>생성 파일을 먼저 준비한 뒤 타입·lint를 검사합니다. 자동 import가 없는 앱에서는 Vue 함수를 직접 import해야 합니다.</p>${h.codeSample('터미널 · 빌드와 타입·lint 검사', gettingStartedSnippets.verify)}</div>`) +
    h.section('forms', '첫 폼 만들기', 'rules, 서버 오류, template ref를 구분해 입력 상태를 관리합니다.',
      `<div class="sol-stack"><p>아래 App.vue는 앞의 전역 등록·자동 import 설정을 사용합니다. <code>SForm</code>의 submit 이벤트를 기다려 결과를 받고 <code>form.value?.focus()</code>로 첫 오류 입력에 이동합니다. DOM ID로 입력을 찾아 조작하지 않습니다.</p>${h.codeSample('App.vue · rules와 template ref', gettingStartedSnippets.form)}<p><code>rules</code>는 동기 검증입니다. 서버 응답은 앱이 처리한 뒤 <code>server-error</code> 또는 <code>error-messages</code>로 전달합니다. <code>resetValidation()</code>은 입력값과 외부 서버 오류를 자동 삭제하지 않으므로 필요한 값은 앱에서 명시적으로 초기화합니다.</p><div class="button-row"><a class="sol-button" href="./starter/?view=recipes&amp;example=form">실행 예제</a><a href="#component/sform">SForm Examples / API</a><a href="#component/stext-field">STextField Examples / API</a></div></div>`) +
    h.section('appearance', '테마와 밀도 연결', '공통 CSS와 Vuetify를 같은 상태로 갱신합니다.',
      `<div class="sol-card sol-stack"><p><code>createSolyiVuetify()</code>로 Vuetify 인스턴스를 만들고 <code>applySolyiAppearance(vuetify.theme, state)</code>에 앱의 상태를 전달합니다. <code>theme</code>은 violet/sage/sand, <code>mode</code>는 light/dark, <code>density</code>는 comfortable/compact입니다.</p><p>현재 UI 상태의 저장·복원은 소비 앱이 관리합니다. CSS data 속성만 바꾸고 Vuetify 테마를 별도로 남겨두지 마세요. <code>SContainer</code>·<code>SRow</code>·<code>SCol</code>은 Vuetify 레이아웃을 재사용하며, <code>SCard</code>는 자체 API이므로 모든 VCard 옵션을 전달하지는 않습니다.</p><div class="button-row"><a href="#start/themes">테마 예제</a><a href="#component/scard">SCard API</a><a href="./starter/">패키지 데모</a></div></div>`) +
    h.section('update', '업데이트와 롤백', 'solyi-ui 버전과 lockfile을 함께 관리합니다.',
      `<div class="sol-card sol-stack"><ol class="rule-list"><li><a href="#releases/changelog">변경 사항</a>과 각 컴포넌트 API를 확인합니다.</li><li><a href="#start/install">현재 권장 설치 명령</a>으로 solyi-ui를 갱신하고 package.json과 lockfile 변경을 저장합니다.</li><li>소비 앱에서 타입·키보드·대표 화면을 검사한 뒤 그 앱의 배포를 진행합니다.</li><li>되돌릴 때는 직전 정상 버전의 소비 코드·package.json·lockfile을 함께 복원한 뒤 아래 명령으로 재설치합니다.</li></ol>${h.codeSample('터미널 · lockfile로 재설치와 검사', gettingStartedSnippets.restore)}<p class="sol-hint">이 라이브러리를 바꾸어도 다른 앱이 자동으로 배포되지는 않습니다. 브라우저·실기기 지원은 각 앱에서 확인해야 하며, 버전 범위 전체나 모든 Vuetify 옵션의 호환을 보장하지 않습니다.</p><p><a href="./releases/index.json">릴리스 카탈로그</a> · <a href="#licensing">라이선스와 제삼자 고지</a></p></div>`);
}
