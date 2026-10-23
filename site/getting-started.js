import {packageReleases} from './release-data.js';

// The site and guide contract test read the same copyable source strings.
export const gettingStartedSnippets = Object.freeze({
  tooling: `npm install -D vite@8.3.4 @vitejs/plugin-vue@6.0.10 typescript@5.9.3 vue-tsc@3.3.13 unplugin-auto-import@21.1.0`,
  registration: `import { createApp } from 'vue'
import { VApp } from 'vuetify/components/VApp'
import SolyiUI, { createSolyiVuetify, applySolyiAppearance } from 'solyi-ui'
import 'solyi-ui/global'
import 'solyi-ui/all.css'
import App from './App.vue'

const vuetify = createSolyiVuetify({ components: { VApp } })
const app = createApp(App)

app.use(vuetify).use(SolyiUI)
applySolyiAppearance(vuetify.theme, {
  theme: 'violet',
  mode: 'light',
  density: 'comfortable',
})
app.mount('#app')`,
  vite: `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

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
})`,
  types: `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "skipLibCheck": true,
    "noEmit": true,
    "types": ["vite/client"]
  },
  "include": ["src/**/*.ts", "src/**/*.vue", "src/auto-imports.d.ts"]
}`,
  lintInstall: `npm install -D eslint@10.13.0 vue-eslint-parser@10.4.1 @typescript-eslint/parser@8.72.0`,
  lint: `import { readFileSync } from 'node:fs'
import vueParser from 'vue-eslint-parser'
import tsParser from '@typescript-eslint/parser'

const { globals } = JSON.parse(
  readFileSync(new URL('./.eslintrc-auto-import.json', import.meta.url), 'utf8'),
)

export default [
  {
    files: ['src/**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: { parser: tsParser, ecmaVersion: 'latest', sourceType: 'module' },
      globals,
    },
    rules: { 'no-undef': 'error', 'no-global-assign': 'error' },
  },
]`,
  verify: `npm exec vite build
npm exec vue-tsc -- --noEmit -p tsconfig.json
npm exec eslint -- "src/**/*.vue"`,
  form: `<script setup lang="ts">
import { sRules } from 'solyi-ui'
import type { SFormHandle, SFormSubmitEvent } from 'solyi-ui'

const form = useTemplateRef<SFormHandle>('form')
const name = ref('')
const serverError = ref('')
const message = ref('')
const rules = [sRules.required(), sRules.minLength(3)]

async function submit(event: SFormSubmitEvent) {
  message.value = ''
  const result = await event
  if (result.cancelled) return
  if (!result.valid) {
    form.value?.focus()
    return
  }
  message.value = '입력을 확인했어요.'
}

function clearValidation() {
  serverError.value = ''
  message.value = ''
  form.value?.resetValidation()
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

export function currentInstallCommand() {
  return 'npm install solyi-ui';
}

export function currentTarballInstallCommand(catalogue = packageReleases) {
  const release = catalogue.releases.find(item => item.release === catalogue.current);
  const ui = release?.packages.find(item => item.name === 'solyi-ui');
  if (!ui) return '';
  const peer = release.compatibility;
  return `npm install --save-exact https://ui.solyi.kr/releases/${release.release}/${ui.file} vue@${peer.vue} vuetify@${peer.vuetify}`;
}

function installCommands(h) {
  const managers = [
    {name: 'pnpm', code: currentInstallCommand().replace('npm install', 'pnpm add')},
    {name: 'npm', code: currentInstallCommand()},
  ];
  return `<div class="sol-stack" data-install-command-group><div class="install-command-tabs" role="tablist" aria-label="패키지 관리자">${managers.map((manager, index) => `<button class="install-command-tab" type="button" role="tab" id="install-${manager.name}-tab" data-install-manager="${manager.name}" aria-controls="install-${manager.name}-panel" aria-selected="${index === 0}" tabindex="${index === 0 ? 0 : -1}">${manager.name}</button>`).join('')}</div>${managers.map((manager, index) => `<div class="sol-stack" role="tabpanel" id="install-${manager.name}-panel" data-install-panel="${manager.name}" aria-labelledby="install-${manager.name}-tab"${index ? ' hidden' : ''}>${h.codeSample('새 프로젝트',manager.code+' vue vuetify',{collapsible:false})}${h.codeSample('기존 프로젝트',manager.code,{collapsible:false})}</div>`).join('')}</div>`;
}

export function mountGettingStarted(root) {
  const Controller = root.ownerDocument?.defaultView?.AbortController || globalThis.AbortController;
  const controller = new Controller();
  for (const group of root.querySelectorAll('[data-install-command-group]')) {
    const tabs = [...group.querySelectorAll('[data-install-manager]')];
    const panels = [...group.querySelectorAll('[data-install-panel]')];
    const select = (target, focus = false) => {
      for (const tab of tabs) {
        const active = tab === target;
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
      }
      for (const panel of panels) panel.hidden = panel.dataset.installPanel !== target.dataset.installManager;
      if (focus) target.focus();
    };
    group.addEventListener('click', event => {
      const tab = event.target.closest('[data-install-manager]');
      if (tabs.includes(tab)) select(tab);
    }, {signal: controller.signal});
    group.addEventListener('keydown', event => {
      const index = tabs.indexOf(event.target);
      if (index < 0) return;
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      select(tabs[next], true);
    }, {signal: controller.signal});
  }
  return () => controller.abort();
}

export function renderGettingStarted(h) {
  const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const release = packageReleases.releases.find(item => item.release === packageReleases.current);
  const ui = release?.packages.find(item => item.name === 'solyi-ui');
  const install = ui ? `<div class="sol-stack"><p class="sol-hint">새 프로젝트는 Vue·Vuetify를 함께 설치합니다. 기존 프로젝트는 이미 설치된 호환 버전을 사용합니다.</p>${installCommands(h)}<p class="sol-hint">공통 스타일·토큰·폰트는 solyi-ui에 포함됩니다. package.json과 lockfile을 함께 저장하세요.</p><p class="sol-hint">버전을 생략하면 설치 시점의 최신 배포를 선택합니다. 이후 같은 설치를 재현할 때는 lockfile과 npm ci를 사용합니다.</p><details class="install-compatibility"><summary>호환과 검증한 버전</summary><div class="sol-stack"><p><code>${escape(ui.name)} ${escape(ui.version)}</code> · Vue ${escape(release.compatibility.vue)} / Vuetify ${escape(release.compatibility.vuetify)} · Vite 8.3.4</p><p>이 조합으로 화면과 타입을 검증했습니다. 모든 peer 허용 버전의 동작을 보장하지 않습니다.</p></div></details><details><summary>peer 자동 다운로드를 끈 환경</summary><div class="sol-stack"><p>Vue·Vuetify는 외부 peer 의존성입니다. npm(7 이상)과 pnpm은 기본 설정에서 필요한 peer를 자동 다운로드합니다. pnpm 앱의 직접 import에는 앱 의존성도 필요하므로 새 프로젝트 명령에 함께 명시합니다. 자동 다운로드를 끈 환경은 아래처럼 직접 설치하세요. 아래는 검증한 버전입니다.</p>${h.codeSample('터미널 · Vue와 Vuetify 직접 설치', `npm install vue@${release.compatibility.vue} vuetify@${release.compatibility.vuetify}`)}</div></details><details><summary>특정 버전으로 고정하기</summary><div class="sol-stack"><p>--save-exact는 package.json에 ^·~ 범위를 붙이지 않는 선택 옵션입니다. 설치한 정확한 버전과 lockfile을 함께 저장합니다.</p>${h.codeSample('터미널 · 특정 버전 고정', `npm install --save-exact ${ui.name}@${ui.version}`)}</div></details><details><summary>tarball로 직접 설치·검증하기</summary><div class="sol-stack"><div class="button-row"><a class="sol-button" href="./releases/${escape(release.release)}/${escape(ui.file)}" download>solyi-ui 다운로드</a><a href="./releases/${escape(release.release)}/manifest.json">Manifest</a><a href="./releases/${escape(release.release)}/SHA256SUMS">SHA-256</a></div>${h.codeSample('터미널 · tarball 직접 설치', currentTarballInstallCommand())}<p class="sol-hint">체크섬은 파일 손상 확인에 사용하며 라이선스나 공급망 안전성 전체를 보증하지 않습니다.</p></div></details></div>` : '<p class="sol-notice warning">설치 파일 정보를 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.</p>';
  return h.section('install', '설치', '기존 Vite + Vue 프로젝트에 solyi-ui를 설치합니다.',
    `<div class="sol-stack"><p><code>solyi-ui</code> 하나로 S 컴포넌트와 공통 스타일·토큰·폰트를 사용합니다. 아래 안내는 기존 Vite + Vue 프로젝트를 기준으로 합니다.</p>${install}<p>처음 구성하는 앱이라면 아래 개발 도구도 설치합니다.</p>${h.codeSample('터미널 · 개발 도구 설치', gettingStartedSnippets.tooling)}<p class="sol-hint">Node는 <code>^22.18.0 || &gt;=24.12.0</code> 범위를 사용합니다.</p></div>`) +
    h.section('registration', '스타일과 전역 등록', 'main.ts에서 한 번 등록하면 각 SFC에서 S 컴포넌트를 개별 import하지 않습니다.',
      `<div class="sol-stack"><p><code>solyi-ui/all.css</code> 한 줄로 Vuetify 스타일·Wanted Sans·토큰·컴포넌트 스타일을 정해진 순서로 불러옵니다. 코드 폰트는 필요한 앱에서 <code>solyi-ui/code-fonts.css</code>로 별도 선택합니다. 폰트 로딩에 실패하면 시스템 폰트를 사용합니다.</p>${h.codeSample('main.ts · 전역 등록', gettingStartedSnippets.registration)}<p><code>app.use(SolyiUI)</code>는 런타임 S 컴포넌트를 등록하고 <code>solyi-ui/global</code>은 Volar/vue-tsc의 전역 컴포넌트 타입을 제공합니다. 타입 import만으로 런타임 등록되지는 않습니다. 문서 사이트 전용 <code>docs.css</code>는 소비 앱에 추가하지 않습니다.</p></div>`) +
    h.section('auto-import', 'Vue 자동 import와 타입 검사', 'S 컴포넌트 등록과 Vue 함수 자동 import는 서로 다른 설정입니다.',
      `<div class="sol-stack"><p><code>unplugin-auto-import</code>의 Vue preset을 설정하면 <code>ref</code>, <code>computed</code>, <code>useTemplateRef</code>, <code>onBeforeUnmount</code> 같은 Vue 함수를 SFC에서 반복 import하지 않아도 됩니다. TypeScript 타입과 <code>sRules</code> 같은 라이브러리 함수는 직접 import합니다.</p>${h.codeSample('vite.config.ts · Vue 자동 import', gettingStartedSnippets.vite)}<p>Vite를 실행하면 <code>src/auto-imports.d.ts</code>와 <code>.eslintrc-auto-import.json</code>이 생성됩니다. 기존 tsconfig의 옵션을 유지하면서 전역 타입과 생성 파일을 포함하세요.</p><p>전역 컴포넌트 타입은 앞의 main.ts에서 <code>solyi-ui/global</code>을 이미 불러왔으므로 tsconfig에 다시 추가하지 않습니다.</p>${h.codeSample('tsconfig.json · 전역 타입', gettingStartedSnippets.types)}<p><code>strict</code>는 앱 소스와 S 컴포넌트 사용 타입을 검사합니다. <code>skipLibCheck</code>는 지원 Vuetify·선택 어댑터의 외부 선언 충돌을 소비 앱 검사에서 제외합니다. solyi-ui 자체 공개 선언은 별도로 <code>skipLibCheck: false</code>에서 검사하며, 외부 의존성의 모든 선언까지 통과한다고 뜻하지 않습니다.</p><p>ESLint를 사용한다면 생성된 readonly globals를 실제 lint 설정에도 연결합니다. 다음은 Vue SFC의 script 영역을 검사하는 최소 설정입니다. 브라우저 전역·매크로·팀 규칙은 앱의 기존 lint 설정과 병합하세요.</p>${h.codeSample('터미널 · 선택 도구 ESLint 설치', gettingStartedSnippets.lintInstall)}${h.codeSample('eslint.config.mjs · 생성 globals 연결', gettingStartedSnippets.lint)}<p>생성 파일을 먼저 준비한 뒤 타입·lint를 검사합니다. 자동 import가 없는 앱에서는 Vue 함수를 직접 import해야 합니다.</p>${h.codeSample('터미널 · 빌드와 타입·lint 검사', gettingStartedSnippets.verify)}</div>`) +
    h.section('forms', '첫 폼 만들기', 'rules, 서버 오류, template ref를 구분해 입력 상태를 관리합니다.',
      `<div class="sol-stack"><p>아래 App.vue는 앞의 전역 등록·자동 import 설정을 사용합니다. <code>SForm</code>의 submit 이벤트를 기다려 결과를 받고 <code>form.value?.focus()</code>로 첫 오류 입력에 이동합니다. DOM ID로 입력을 찾아 조작하지 않습니다.</p>${h.codeSample('App.vue · rules와 template ref', gettingStartedSnippets.form)}<p><code>rules</code>는 동기 검증입니다. 서버 응답은 앱이 처리한 뒤 <code>server-error</code> 또는 <code>error-messages</code>로 전달합니다. <code>resetValidation()</code>은 입력값과 외부 서버 오류를 자동 삭제하지 않으므로 필요한 값은 앱에서 명시적으로 초기화합니다.</p><p><code>STabs</code>는 탐색, <code>SResizableSplitPane</code>는 레이아웃 컴포넌트입니다. 이 둘은 폼 검증 <code>rules</code>·<code>required</code>·서버 오류 props를 받지 않으며 <code>SForm</code>의 필드 상태를 상속하지 않습니다. 필요한 경우 각각의 <code>disabled</code>·<code>readonly</code>와 표시용 <code>error</code>를 직접 지정합니다.</p><div class="button-row"><a class="sol-button" href="./starter/?view=recipes&amp;example=form">실행 예제</a><a href="#component/sform">SForm Examples / API</a><a href="#component/stext-field">STextField Examples / API</a></div></div>`) +
    h.section('appearance', '테마와 밀도 연결', '공통 CSS와 Vuetify를 같은 상태로 갱신합니다.',
      `<div class="sol-card sol-stack"><p><code>createSolyiVuetify()</code>로 Vuetify 인스턴스를 만들고 <code>applySolyiAppearance(vuetify.theme, state)</code>에 앱의 상태를 전달합니다. <code>theme</code>은 violet/sage/sand, <code>mode</code>는 light/dark, <code>density</code>는 comfortable/compact입니다.</p><p>현재 UI 상태의 저장·복원은 소비 앱이 관리합니다. CSS data 속성만 바꾸고 Vuetify 테마를 별도로 남겨두지 마세요. <code>SContainer</code>·<code>SRow</code>·<code>SCol</code>은 Vuetify 레이아웃을 재사용하며, <code>SCard</code>는 자체 API이므로 모든 VCard 옵션을 전달하지는 않습니다.</p><div class="button-row"><a href="#start/themes">테마 예제</a><a href="#component/scard">SCard API</a><a href="./starter/">패키지 데모</a></div></div>`) +
    h.section('update', '업데이트와 롤백', 'solyi-ui 버전과 lockfile을 함께 관리합니다.',
      `<div class="sol-card sol-stack"><ol class="rule-list"><li><a href="#releases/changelog">변경 사항</a>과 각 컴포넌트 API를 확인합니다.</li><li><a href="#start/install">현재 권장 설치 명령</a>으로 solyi-ui를 갱신하고 package.json과 lockfile 변경을 저장합니다.</li><li>소비 앱에서 타입·키보드·대표 화면을 검사한 뒤 그 앱의 배포를 진행합니다.</li><li>되돌릴 때는 직전 정상 버전의 소비 코드·package.json·lockfile을 함께 복원한 뒤 아래 명령으로 재설치합니다.</li></ol>${h.codeSample('터미널 · lockfile로 재설치와 검사', gettingStartedSnippets.restore)}<p class="sol-hint">이 라이브러리를 바꾸어도 다른 앱이 자동으로 배포되지는 않습니다. 브라우저·실기기 지원은 각 앱에서 확인해야 하며, 버전 범위 전체나 모든 Vuetify 옵션의 호환을 보장하지 않습니다.</p><p><a href="./releases/index.json">릴리스 카탈로그</a> · <a href="#licensing">라이선스와 제삼자 고지</a></p></div>`);
}
