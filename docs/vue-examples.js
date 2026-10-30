import {vueRecipes} from './vue-recipes-data.js';
import {mountInlinePreviews} from './inline-previews.js';

const compositions = new Set([
  'navigation', 'identity-progress', 'chart-tree', 'inputs',
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
    source.innerHTML = codeSample('Vue 샘플 코드', recipe.source);
    const vueBody = source.querySelector('pre').outerHTML;
    const copyButton = source.querySelector('[data-copy-snippet]').cloneNode(true);
    const vueCopyId = copyButton.dataset.copySnippet;
    const htmlSource = document.createElement('div');
    htmlSource.innerHTML = codeSample('HTML·CSS 참고', originals.map(detail => detail.querySelector('pre code').textContent).join('\n\n'));
    const htmlCopyId = htmlSource.querySelector('[data-copy-snippet]').dataset.copySnippet;
    const htmlBody = originals.map(detail => `
      <div class="code-reference-part">
        <p class="code-part-label">${escapeHTML(detail.querySelector('summary').textContent)}</p>
        ${detail.querySelector('pre').outerHTML}
      </div>`).join('');
    const id = `usage-${section.id}`;
    const isComposition = compositions.has(section.id);
    const vueLabel = isComposition ? 'Vue 조합' : 'Vue 예제';
    const title = escapeHTML(section.querySelector('h2').textContent);
    const host = document.createElement('details');
    host.className = 'code-example vue-code-examples';
    host.innerHTML = `
      <summary>샘플 코드</summary>
      <div class="vue-code-frame">
        <div class="code-toolbar"><div role="tablist" aria-label="${title} 샘플 코드">
          <button type="button" class="vue-code-tab" id="${id}-vue-tab"
            role="tab" aria-selected="true" aria-controls="${id}-vue">${vueLabel}</button>
          <button type="button" class="vue-code-tab" id="${id}-html-tab"
            role="tab" tabindex="-1" aria-selected="false"
            aria-controls="${id}-html">HTML·CSS 참고</button>
        </div>${copyButton.outerHTML}</div>
        <div id="${id}-vue" role="tabpanel" aria-labelledby="${id}-vue-tab">
          <p class="code-panel-note">${isComposition
            ? '전역 등록한 S 컴포넌트에 앱 상태를 연결한 조합입니다. ref·computed 등은 Vue preset 자동 import를 전제로 합니다.'
            : 'S 전역 등록과 Vue preset 자동 import를 설정한 프로젝트의 샘플입니다.'}</p>
          ${vueBody}
          <footer class="code-example-footer"><a href="./starter/?view=recipes&example=${encodeURIComponent(section.id)}">이 Vue 예제 실행 →</a><a href="#start/vue-components">전역 등록·타입 설정</a></footer>
        </div>
        <div id="${id}-html" role="tabpanel" aria-labelledby="${id}-html-tab" hidden>
          ${htmlBody}
        </div>
      </div>`;
    originals[0].before(host);
    originals.forEach(detail => detail.remove());
    const tabs = [...host.querySelectorAll('[role=tab]')];
    const panels = [...host.querySelectorAll('[role=tabpanel]')];
    const copy = host.querySelector('.code-copy-button');
    function activate(index, focus = false) {
      tabs.forEach((tab, i) => {
        tab.setAttribute('aria-selected', String(i === index));
        tab.tabIndex = i === index ? 0 : -1;
        panels[i].hidden = i !== index;
      });
      copy.dataset.copySnippet = index === 0 ? vueCopyId : htmlCopyId;
      delete copy.dataset.copied;
      copy.setAttribute('aria-label','현재 코드 복사');
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

/* The document canvas and standalone explorer execute identical canonical SFCs.
   Native Core examples remain source references, not a second active canvas. */
export function mountVuePreviews(root) {
  const controller=new AbortController(),{signal}=controller,origin=location.origin,frames=new Set();
  const pending=new Map();let requestId=0;
  const inlineDefinitions=[];
  const viewportExamples=new Set(['sautocomplete','scombobox','sdate-picker','stime-picker','smulti-select','scontext-menu','sdialog','spopover','stooltip','sprogress-linear','ssnackbar','ssplit-btn']);
  const parts={
    inputs:[['date','단일 날짜와 기간','#extra-range-form'],['files','로컬 파일과 드롭','#extra-file-drop'],['autocomplete','자동완성 검색','#extra-autocomplete']],
    'advanced-inputs':[['textarea','Textarea','#advanced-note'],['number','숫자 증감','#advanced-number-form'],['multiselect','다중 선택과 태그','#advanced-tags']],
    'chart-tree':[['chart','차트와 표 대안','#chart-period'],['tree','트리 탐색','#example-tree']],
    'identity-progress':[['avatar','Avatar와 사용자 메뉴','#avatar-menu-trigger'],['steps','진행 단계','#steps-form']]
  };
  const appearance=()=>({theme:document.documentElement.dataset.theme,mode:document.documentElement.dataset.mode,density:document.documentElement.dataset.density,motionPolicy:document.documentElement.dataset.motionPolicy});
  const sync=frame=>frame.contentWindow?.postMessage({type:'solyi:appearance',appearance:appearance()},origin);
  function canvas(section,id,part,label,view='recipes',inline=false){
    const box=document.createElement('div');box.className='vue-live-part';
    const heading=part?section.querySelector('#'+part):null;
    if(heading?.classList.contains('document-alias-heading'))box.append(heading);
    const frame=document.createElement('iframe'),url=new URL('./starter/',location.href);
    url.searchParams.set('view',view);url.searchParams.set('example',id);url.searchParams.set('embed','1');
    if(part)url.searchParams.set('part',part);
    for(const [key,value] of Object.entries(appearance()))if(value)url.searchParams.set(key,value);
    if(inline){
      const host=document.createElement('div');host.className='inline-preview-canvas';host.dataset.recipe=id;if(part)host.dataset.part=part;
      inlineDefinitions.push({host,recipe:id,part,view,label,fallback:url.pathname+url.search});box.append(host);return box;
    }
    frame.src=url.pathname+url.search;frame.className='vue-recipe-frame';frame.title=label+' · 실제 패키지 예제';frame.loading='lazy';frame.height='320';frame.dataset.recipe=id;if(part)frame.dataset.part=part;frame.setAttribute('aria-busy','true');
    frame.addEventListener('load',()=>sync(frame),{signal});frames.add(frame);box.append(frame);
    return box;
  }
  for(const host of root.querySelectorAll('[data-component-example]')){
    const label=host.closest('.component-reference').querySelector('h3').textContent;
    host.append(canvas(host,host.dataset.componentExample,host.dataset.previewPart,label,host.dataset.previewView,viewportExamples.has(host.closest('.component-reference').id)));
  }
  for(const section of root.querySelectorAll('section.section')){
    const id=section.id,recipe=vueRecipes[id];if(!recipe)continue;
    const demos=[...section.querySelectorAll('.demo')],assignments=new Map();
    for(const spec of parts[id]||[]){const node=section.querySelector(spec[2]),demo=node?.closest('.demo');if(demo){if(!assignments.has(demo))assignments.set(demo,[]);assignments.get(demo).push(spec);}}
    const aliases=[...section.querySelectorAll('.document-alias-heading')];let first;
    for(const demo of demos){
      if(!assignments.has(demo)&&first){demo.remove();continue;}
      const stage=demo.querySelector('.demo-stage');if(!stage)continue;
      const blocks=(assignments.get(demo)||[['',recipe.label,'']]).map(([part,label])=>canvas(section,id,part,label));
      stage.replaceChildren(...blocks);stage.classList.add('vue-live-stage');first||=blocks[0];
      const caption=demo.querySelector('.demo-header span');if(caption)caption.textContent='설치한 S 컴포넌트 · '+recipe.label;
    }
    if(!first){
      const demo=document.createElement('div');demo.className='demo';const stage=document.createElement('div');stage.className='demo-stage vue-live-stage';first=canvas(section,id,'',recipe.label);stage.append(first);demo.append(stage);
      const palette=[...section.children].find(child=>child.classList.contains('sol-stack')&&child.querySelector('.color-specimen'));
      if(palette)palette.replaceWith(demo);else section.querySelector('.vue-code-examples')?.before(demo);
      section.querySelector('#color-toast')?.remove();section.querySelector('#color-example-result')?.remove();
    }
    for(const heading of aliases)if(!heading.isConnected)first.prepend(heading);
  }
  const inlinePreviews=mountInlinePreviews(inlineDefinitions,appearance);
  window.addEventListener('message',event=>{
    if(event.origin!==origin)return;const frame=[...frames].find(item=>item.contentWindow===event.source);if(!frame)return;
    const request=pending.get(event.data?.id);
    if(request?.frame===frame){
      if(event.data.type==='solyi:recipe-leave-ready')clearTimeout(request.timer);
      if(event.data.type==='solyi:recipe-leave-result'){clearTimeout(request.timer);pending.delete(event.data.id);request.resolve(event.data.allowed===true);}
    }
    if(event.data?.type==='solyi:recipe-ready'){frame.removeAttribute('aria-busy');sync(frame);}
    if(event.data?.type==='solyi:recipe-height'&&Number.isFinite(event.data.height)){
      const height=Math.max(128,Math.min(6000,Math.ceil(event.data.height)));if(frame.height!==String(height))frame.height=String(height);
    }
  },{signal});
  const observer=new MutationObserver(()=>{frames.forEach(sync);inlinePreviews.sync();});observer.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme','data-mode','data-density','data-motion-policy']});frames.forEach(sync);
  const cleanup=()=>{controller.abort();observer.disconnect();inlinePreviews.dispose();frames.clear();for(const item of pending.values()){clearTimeout(item.timer);item.resolve(false);}pending.clear();};
  cleanup.requestLeave=async()=>{
    if(signal.aborted||!await inlinePreviews.requestLeave()||signal.aborted)return false;
    for(const frame of frames){if(frame.dataset.recipe!=='workflow'||frame.hasAttribute('aria-busy'))continue;
      const id='leave-'+Date.now()+'-'+(++requestId);
      const allowed=await new Promise(resolve=>{const timer=setTimeout(()=>{pending.delete(id);resolve(false);},2000);pending.set(id,{frame,resolve,timer});frame.contentWindow?.postMessage({type:'solyi:recipe-leave',id},origin);});
      if(!allowed)return false;
    }
    return true;
  };
  return cleanup;
}
