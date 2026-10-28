import {componentReferences,componentExampleSources} from './component-api-data.js';
import {highlightSample} from './code-highlight.js';
import {componentConcept,componentConceptCatalogue,componentGroupOrder} from './component-catalog.js';

const apiEscape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
export const componentGroups=componentGroupOrder;
export function componentCatalogue(){return componentConceptCatalogue(componentReferences);}
function componentSampleCode(h,component){
 const source=componentExampleSources[component.example];
 const registered=h.codeSample?.('Vue · SFC',source);
 const body=registered?registered.replace(/^<details\b[^>]*>[\s\S]*?<\/summary>/,'').replace(/<\/details>\s*$/,''):`<div class="code-body"><div class="code-toolbar"><span class="code-language">Vue · SFC</span></div><pre tabindex="0" role="group" aria-label="${apiEscape(componentConcept(component))} Vue SFC"><code>${highlightSample(source,'Vue · SFC')}</code></pre></div>`;
 const preview=componentPreview(component),params=new URLSearchParams({view:preview.view,example:preview.recipe});if(preview.part)params.set('part',preview.part);
 return `<div class="code-example component-sample-source">${body}<footer class="code-example-footer"><a href="${apiEscape('./starter/?'+params)}">이 예제 실행 ↗</a><a href="#start/registration">공통 등록·타입 설정</a></footer></div>`;
}
function apiTable(caption, columns, rows) {
  if (!rows.length) return '<p class="sol-hint">이 컴포넌트가 별도로 선언한 항목은 없습니다.</p>';
  return `<div class="api-table-scroll" tabindex="0" role="region" aria-label="${apiEscape(caption)}"><table class="api-table api-table--${columns.length}"><caption>${apiEscape(caption)}</caption><thead><tr>${columns.map(column=>`<th scope="col">${column}</th>`).join('')}</tr></thead><tbody>${rows.join('')}</tbody></table></div>`;
}
export function renderComponentReferences(h) {
  return componentCatalogue().map(({group,items},index)=>h.section('api-group-'+index,group,'컴포넌트 이름의 ABC 순서로 찾습니다.',
    items.map(item=>{
      const component=componentReferences.find(component=>component.id===item.id);
      const name=apiEscape(component.name),concept=apiEscape(componentConcept(component)),id=component.id;
      const preview=componentPreview(component);
      const code=componentSampleCode(h,component);
      return `<article class="component-reference sol-card" id="${id}" aria-labelledby="${id}-title">
        <div class="component-reference-heading"><h3 id="${id}-title">${concept}</h3><code class="component-api-name">${name}</code></div>
        <p>${apiEscape(component.description)}</p>
        <div class="component-reference-tabs" role="tablist" aria-label="${concept} 보기">
          <button type="button" role="tab" id="${id}-examples-tab" data-component-tab="examples" aria-selected="true" aria-controls="${id}-examples">Examples</button>
          <button type="button" role="tab" id="${id}-code-tab" data-component-tab="code" tabindex="-1" aria-selected="false" aria-controls="${id}-code">Sample Code</button>
          <button type="button" role="tab" id="${id}-api-tab" data-component-tab="api" tabindex="-1" aria-selected="false" aria-controls="${id}-api">API</button>
        </div>
        <div id="${id}-examples" class="component-example-panel" role="tabpanel" aria-labelledby="${id}-examples-tab">
          <div class="component-example-canvas" data-component-example="${preview.recipe}" data-preview-view="${preview.view}" data-preview-part="${preview.part}"></div>
        </div>
        <div id="${id}-code" class="component-code-panel" role="tabpanel" aria-labelledby="${id}-code-tab" hidden>${code}</div>
        <div id="${id}-api" class="component-api" role="tabpanel" aria-labelledby="${id}-api-tab" hidden><h4>API</h4>
          ${component.passthrough?`<p class="sol-hint">반응형 레이아웃의 속성·슬롯·이벤트는 <a href="https://vuetifyjs.com/en/api/${component.passthrough.replace(/^V/,'v-').replace(/([a-z])([A-Z])/g,'$1-$2').toLowerCase()}/">기반 레이아웃 API</a>를 사용합니다. <a href="#start/registration">설치와 기본 설정</a>을 함께 확인하세요.</p>`:''}
          <h5>Props</h5>${apiTable(name+' props',['이름 / 필수','타입 · 허용값','기본값','설명'],component.props.map(prop=>`<tr><th scope="row"><code>${apiEscape(prop.name)}</code>${prop.required?'<span class="api-required">필수</span>':''}</th><td><code>${apiEscape(prop.type)}</code>${prop.values.length?`<span class="sol-hint">${prop.values.map(apiEscape).join(' · ')}</span>`:''}</td><td><code>${apiEscape(prop.default)}</code></td><td>${apiEscape(prop.description)}</td></tr>`))}
          <h5>Slots</h5>${apiTable(name+' slots',['이름','전달 인자 타입','설명'],component.slots.map(slot=>`<tr><th scope="row"><code>${apiEscape(slot.name)}</code></th><td><code>${apiEscape(slot.scope)}</code></td><td>${apiEscape(slot.description)}</td></tr>`))}
          <h5>Events</h5>${apiTable(name+' events',['이름','인자 타입','설명'],component.events.map(event=>`<tr><th scope="row"><code>${apiEscape(event.name)}</code></th><td><code>${apiEscape(event.signature)}</code></td><td>${apiEscape(event.description)}</td></tr>`))}
          <h5>Methods</h5>${apiTable(name+' methods',['이름','공개 핸들 타입','설명'],component.methods.map(method=>`<tr><th scope="row"><code>${apiEscape(method.name)}</code></th><td><code>${apiEscape(method.signature)}</code></td><td>${apiEscape(method.description)}</td></tr>`))}
          ${component.types?.length?`<details class="api-type-definitions"><summary>자료·핸들 타입 정의</summary><pre tabindex="0" role="group" aria-label="${name} 자료 타입"><code>${highlightSample(component.types.map(type=>type.source).join('\n\n'),'TypeScript')}</code></pre></details>`:''}
          ${component.name==='SCard'?'<p class="sol-hint">제목·본문·actions 슬롯으로 내용을 묶는 article 카드입니다. 위 표에 있는 옵션을 사용하세요.</p>':''}
          <p class="sol-hint">설치한 버전에서 사용할 수 있는 속성·슬롯·이벤트와 메서드입니다.</p>
        </div>
      </article>`;
    }).join(''))).join('');
}

function componentPreview(component) {
 const aliases={date:['inputs','date'],files:['inputs','files'],autocomplete:['inputs','autocomplete'],chart:['chart-tree','chart'],tree:['chart-tree','tree']};
 const parts={STextarea:'textarea',SNumberInput:'number',SMultiSelect:'multiselect',SAvatar:'avatar',SStepper:'steps',SSegmentedControl:'segmented',SRangeSlider:'range',SContextMenu:'context-menu',SResizableSplitPane:'split-pane'};
 const [recipe,part]=aliases[component.example]||[component.example,component.name==='SSortableList'?'sortable':parts[component.name]||''];
 return {recipe,part,view:component.example==='advanced-vue'?'advanced':'recipes'};
}

export function revealComponentTarget(root,anchor) {
 const target=root.ownerDocument.getElementById(anchor);if(!target||!root.contains(target))return null;
 const card=target?.closest('.component-reference');if(!card)return null;
 const kind=anchor===card.id+'-api'?'api':anchor===card.id+'-code'?'code':anchor===card.id+'-examples'||anchor===card.id?'examples':null;
 if(kind)for(const tab of card.querySelectorAll('[data-component-tab]')){
  const active=tab.dataset.componentTab===kind;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;root.querySelector('#'+tab.getAttribute('aria-controls')).hidden=!active;
 }
 return card;
}

export function mountComponentReferences(root,{onNavigate=()=>{}}={}) {
 const controller=new AbortController(),{signal}=controller;
 for(const card of root.querySelectorAll('.component-reference')){
  const tabs=[...card.querySelectorAll('[data-component-tab]')];
  function activate(index,focus=false){
   const tab=tabs[index],anchor=tab.getAttribute('aria-controls');revealComponentTarget(root,anchor);
   if(focus)tab.focus({preventScroll:true});
   const hash='#component/'+anchor;if(location.hash!==hash)history.pushState(null,'',hash);onNavigate(hash);
  }
  tabs.forEach((tab,index)=>{
   tab.addEventListener('click',()=>activate(index),{signal});
   tab.addEventListener('keydown',event=>{if(event.isComposing)return;let next;if(event.key==='ArrowRight')next=(index+1)%tabs.length;else if(event.key==='ArrowLeft')next=(index-1+tabs.length)%tabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;if(next!==undefined){event.preventDefault();activate(next,true);}},{signal});
  });
 }
 const anchor=location.hash.split('/')[1];if(anchor)revealComponentTarget(root,anchor);
 return()=>controller.abort();
}
