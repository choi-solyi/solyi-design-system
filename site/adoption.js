import {componentReferenceVersions} from './component-api-data.js';
import {renderAiGuide} from './ai-guide.js';

export function renderAdoption(h) {
  const guide='https://github.com/choi-solyi/solyi-design-system/blob/main/documentation/guide/';
  return renderAiGuide(h)+h.section('locale','공통 locale','한국어·영어 문구와 날짜·숫자 표시를 같은 provider로 바꿉니다.',
    `<div class="sol-card"><p>provideSolLocale은 ref/getter와 부분 override를 지원합니다. 입력·대화상자·표·날짜는 같은 설정을 사용하고 앱이 제공한 이름·자료·오류는 임의 번역하지 않습니다. ko-KR/en-US의 왼쪽에서 오른쪽으로 읽는 방향만 지원합니다. 날짜 값은 ISO, 시간은 HH:mm을 유지합니다.</p><div class="button-row"><a class="sol-button" href="./starter/#locale-demo">실제 locale 예제 →</a><a href="${guide}LOCALE.md">fallback·override·표시 계약</a></div></div>`) +
  h.section('starter','실제 패키지로 실행하기','별도 설치 프로젝트가 제공하는 API와 문서 예제를 함께 확인합니다.',
    `<div class="sol-card"><h3>독립 Vue 프로젝트</h3><p>@solyi/core ${componentReferenceVersions.core}와 solyi-ui ${componentReferenceVersions['vue-ui']}의 고정 tarball을 설치합니다. Vue·Vuetify는 peer로 분리하며 중복 번들링하지 않습니다.</p><div class="button-row"><a class="sol-button primary" href="./starter/">실제 starter 열기 →</a><a class="sol-button" href="./starter/?view=recipes">분류별 샘플 실행 →</a><a href="#releases/packages">현재 권장 조합 설치</a></div><p class="sol-hint">검증 조합: Vue 3.5.44 · Vuetify 4.3.0 · Vite 8.3.4. 실제 앱·다른 버전의 호환성을 자동으로 보장하지 않습니다. 기존 개인 앱에는 연결하지 않았습니다.</p></div>`) +
  h.section('advanced-vue','선택·동작·분할 조합','필요한 상태와 키보드 동작을 실제 패키지에서 확인합니다.',
    `<div class="sol-card"><h3>맥락에 맞는 상호작용</h3><p>SegmentedControl은 짧은 단일 선택, MultiSelect는 검색과 태그 제거, RangeSlider는 양 끝 범위를 다룹니다. SplitButton·ContextMenu는 행동 메뉴를 공유하고 SplitPane은 좁은 화면에서 두 영역을 세로로 배치합니다.</p><div class="button-row"><a class="sol-button" href="./starter/#advanced-title">선택·범위·동작·분할 실행 →</a><a href="#component/ssegmented-control">각 컴포넌트의 API</a></div></div>`) +
  h.section('vue-components','전역 등록과 자동 import','S 컴포넌트 등록과 Vue 함수 자동 import는 각각 한 번 설정합니다.',
    `<div class="sol-card"><h3>프로젝트에 한 번 설정</h3><p>SBtn·STextField 등은 <code>app.use(SolyiUI)</code>로 전역 등록합니다. Vue의 ref·computed·onBeforeUnmount 등은 Vite의 <code>unplugin-auto-import</code> Vue preset이 처리합니다. 이 설정을 적용한 샘플에서는 개별 import를 반복하지 않습니다.</p><p>샘플의 파일 경로나 앱 전용 함수·타입까지 자동 import되는 것은 아닙니다. 생성된 선언 파일을 TypeScript에 포함하고 lint 설정에서도 자동 import한 이름을 인식해야 합니다.</p></div>` +
    h.codeSample('앱의 공통 등록',`import { createApp } from 'vue';
import { VApp } from 'vuetify/components/VApp';
import SolyiUI, { createSolyiVuetify } from 'solyi-ui';
import 'solyi-ui/global';
import '@solyi/core/fonts.css';
import '@solyi/core/code-fonts.css';
import '@solyi/core/tokens.css';
import '@solyi/core/components.css';
import 'solyi-ui/styles.css';

createApp(App)
  .use(createSolyiVuetify({ components: { VApp } }))
  .use(SolyiUI)
  .mount('#app');`) +
    h.codeSample('Vite의 Vue 함수 자동 import',`import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
      dts: 'src/auto-imports.d.ts',
      eslintrc: { enabled: true },
    }),
  ],
});`) +
    `<p><a href="${guide}GETTING-STARTED.md">설치·타입·lint 설정 전체</a> · <a href="./starter/?view=recipes">같은 설정으로 실행되는 샘플</a></p>`) +
  h.section('versioning','변경과 호환 정책','0.x 초안의 API 변화도 기록합니다.',
    `<div class="grid-2"><div class="sol-card"><h3>문서 v${h.version}</h3><p>문서 버전과 Core/UI 패키지 버전은 별도입니다. 설치에는 현재 권장 Core/UI 쌍을 사용하고 lockfile을 함께 보존합니다. 화면에서 과거 설치 목록을 숨겨도 기존 다운로드 URL과 산출물은 보존합니다.</p></div><div class="sol-card"><h3>업데이트와 복원</h3><ul class="rule-list"><li>새 API·행동 변화는 변경 이력과 실제 타입에 함께 기록합니다.</li><li>0.x는 검토 중인 초안입니다. 최종 승인 전 1.0.0으로 올리지 않습니다.</li><li>패키지 업데이트 뒤 소비 앱의 타입·행동·화면 검사를 진행합니다. 되돌릴 때 package.json과 lockfile을 함께 복원합니다.</li><li>이 저장소의 데모만 자동 배포되며 다른 앱의 업데이트·배포는 연결하지 않았습니다.</li></ul></div></div><p><a href="https://github.com/choi-solyi/solyi-design-system/blob/main/CHANGELOG.md">변경 이력</a> · <a href="${guide}COMPATIBILITY.md">검증·호환 범위</a></p>`);
}