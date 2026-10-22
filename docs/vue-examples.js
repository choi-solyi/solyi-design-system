import {vueRecipes} from './vue-recipes-data.js';

const compositions = new Set([
  'help', 'accordion', 'navigation', 'identity-progress', 'chart-tree', 'inputs',
  'form', 'search', 'compare', 'empty', 'data', 'responses', 'composition',
  'layouts', 'workflow', 'error-summary', 'bulk-recovery',
]);
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({
  '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;',
}[char]));

export function mountVueExamples(root, codeSample) {
  const controller = new AbortController();
  const {signal} = controller;
  for (const section of root.querySelectorAll('section.section')) {
    const recipe = vueRecipes[section.id];
    if (!recipe) continue;
    const originals = [...section.querySelectorAll('details.code-example')];
    if (!originals.length) continue;

    // Keep registered snippet IDs while removing nested disclosures.
    const source = document.createElement('div');
    source.innerHTML = codeSample('Vue 사용 예시', recipe.source);
    const vueBody = source.querySelector('.code-body').innerHTML;
    const htmlBody = originals.map(detail => `
      <div class="code-reference-part">
        <p class="code-part-label">${escapeHTML(detail.querySelector('summary').textContent)}</p>
        ${detail.querySelector('.code-body').innerHTML}
      </div>`).join('');
    const id = `usage-${section.id}`;
    const isComposition = compositions.has(section.id);
    const vueLabel = isComposition ? 'Vue 조합' : 'Vue 예제';
    const title = escapeHTML(section.querySelector('h2').textContent);
    const host = document.createElement('details');
    host.className = 'code-example vue-code-examples';
    host.innerHTML = `
      <summary>사용 코드</summary>
      <div class="vue-code-frame">
        <div role="tablist" aria-label="${title} 사용 코드">
          <button type="button" class="vue-code-tab" id="${id}-vue-tab"
            role="tab" aria-selected="true" aria-controls="${id}-vue">${vueLabel}</button>
          <button type="button" class="vue-code-tab" id="${id}-html-tab"
            role="tab" tabindex="-1" aria-selected="false"
            aria-controls="${id}-html">HTML·CSS 참고</button>
        </div>
        <div id="${id}-vue" role="tabpanel" aria-labelledby="${id}-vue-tab">
          <p class="code-panel-note">${isComposition
            ? 'S 컴포넌트와 기본 HTML을 연결한 Vue 조합입니다. 모두 전용 컴포넌트 API로 제공되는 것은 아닙니다.'
            : '실제 패키지에서 가져다 쓰는 S 컴포넌트 예제입니다.'}</p>
          ${vueBody}
          <p class="code-example-link"><a href="./starter/?view=recipes&example=${encodeURIComponent(section.id)}">이 Vue 예제 실행 →</a></p>
        </div>
        <div id="${id}-html" role="tabpanel" aria-labelledby="${id}-html-tab" hidden>
          ${htmlBody}
        </div>
      </div>`;
    originals[0].before(host);
    originals.forEach(detail => detail.remove());
    const tabs = [...host.querySelectorAll('[role=tab]')];
    const panels = [...host.querySelectorAll('[role=tabpanel]')];
    function activate(index, focus = false) {
      tabs.forEach((tab, i) => {
        tab.setAttribute('aria-selected', String(i === index));
        tab.tabIndex = i === index ? 0 : -1;
        panels[i].hidden = i !== index;
      });
      if (focus) tabs[index].focus();
    }
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(index), {signal});
      tab.addEventListener('keydown', event => {
        if (event.isComposing) return;
        let next;
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') next = 1 - index;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = 1;
        if (next !== undefined) {
          event.preventDefault();
          activate(next, true);
        }
      }, {signal});
    });
  }
  return () => controller.abort();
}
