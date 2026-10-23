/* Continuous parent documents with grouped component references and compatible deep links. */
import {solIcon} from './icons.js';
import {componentCatalogue} from './component-api.js';
import {componentReferences} from './component-api-data.js';
const componentExampleSections=[['buttons','버튼'],['fields','텍스트 필드'],['choices','선택 컨트롤 기본'],['feedback','상태 알림'],['dialog','대화상자'],['selection','체크·라디오·스위치'],['help','툴팁과 팝오버'],['accordion','아코디언'],['navigation','경로·패널·토스트'],['advanced-inputs','Textarea·숫자·다중 선택'],['content-tabs','탭 패널'],['action-menu','행동 메뉴'],['identity-progress','Avatar·단계'],['progress','Progress bar·circle'],['time','시간 선택'],['chart','차트와 표 대안'],['tree','트리 탐색']];
const documentSections={
 start:[['start-here','시작 순서'],['vue-components','공통 등록·자동 import'],['ai-guide','AI guide'],['starter','실제 패키지 실행'],['adoption','CSS·JSON 적용'],['themes','테마'],['density','밀도'],['locale','공통 locale'],['advanced-vue','선택·동작·분할'],['scope','검증·출처'],['principles','시스템 원칙']],
 style:[['principles','Core 원칙'],['tokens','색 토큰'],['type','타이포그래피'],['space','간격·밀도·모서리'],['accessibility','접근성 기준'],['color-examples','컬러 적용 예시'],['motion','모션'],['icons','아이콘'],['layers','레이어와 그림자'],['writing','UI 문구']],
 component:[...componentReferences.map(component=>[component.id,component.name]),...componentExampleSections],
 pattern:[['form','폼 검증과 회복'],['search','검색과 상세'],['compare','비교 선택'],['empty','빈 상태'],['data','표와 목록'],['date','날짜 선택'],['files','파일 선택·드롭'],['autocomplete','자동완성 검색'],['responses','로딩·권한·오류'],['composition','조합 규칙'],['layouts','화면 템플릿'],['workflow','편집·이탈·삭제·Undo'],['error-summary','오류 요약'],['not-found','앱용 404'],['bulk-recovery','일괄 작업·부분 실패']],
 releases:[['packages','설치·업데이트'],['versioning','변경·호환 정책']],
 licensing:[['code-license','코드 · MIT'],['brand-license','브랜드 제외'],['third-party-license','폰트·아이콘·외부 고지']]
};
const documentNames={start:'Getting started',style:'Style',component:'Components',pattern:'Patterns',releases:'Releases',licensing:'Licensing'};
export function resolveDocumentLocation(hash){
 const [requested='',anchor='']=String(hash||'').replace(/^#/,'').split('/');
 if(requested==='overview'||!requested)return {route:'start',anchor};
 if(requested==='theme')return {route:['packages','versioning'].includes(anchor)?'releases':'start',anchor};
 const route=({components:'component',patterns:'pattern','getting-started':'start'})[requested]||requested;
 return {route:documentNames[route]?route:'start',anchor:documentNames[route]?anchor:''};
}
const documentSearchNames={
 'start/ai-guide':['DESIGN.md','AI guide','AI prompt','프롬프트','AI 지침'],
 'pattern/date':['Date Picker','DatePicker','날짜','날짜 선택기','기간 선택'],
 'component/time':['Time Picker','TimePicker','시간','시각','시각 선택'],
 'component/buttons':['Button','버튼'], 'component/fields':['Field','Text Field','Input','입력칸'],
 'component/selection':['Checkbox','Radio Group','Switch','체크박스','라디오','스위치'],
 'component/dialog':['Dialog','Modal','모달'], 'component/help':['Tooltip','Popover','툴팁','팝오버'],
 'component/accordion':['Accordion'], 'component/textarea':['Text Area','Textarea'],
 'component/number':['Number Input'], 'component/content-tabs':['Tabs'],
 'component/action-menu':['Action Menu'], 'component/progress':['Progress Bar','Progress Circle'],
 'component/chart':['Chart','차트'], 'component/tree':['Tree','트리'],
 'component/choices':['Select'], 'component/navigation':['Snackbar'], 'pattern/data':['Table','표','리스트'],
 'pattern/files':['File Upload','FileUploader','Drag and Drop'], 'pattern/autocomplete':['Autocomplete']
};
// A dedicated API keeps its own visible Korean names, independent of the shared recipe title.
const componentSearchNames={
 SDatePicker:['Date Picker','DatePicker','날짜','날짜 선택','날짜 선택기','기간 선택'],
 STimePicker:['Time Picker','TimePicker','시간','시각','시간 선택','시각 선택','시간 선택기','시각 선택기']
};
const documentAliases={
 pattern:[['date','단일 날짜와 기간','#extra-range-form'],['files','로컬 파일과 드롭','#extra-file-drop'],['autocomplete','자동완성 검색','#extra-autocomplete']],
 component:[['textarea','Textarea','#advanced-note'],['number','숫자 증감','#advanced-number-form'],['multiselect','다중 선택과 태그','#advanced-tags'],['avatar','Avatar와 사용자 메뉴','#avatar-menu-trigger'],['progress','진행률과 단계','#steps-form'],['chart','차트와 표 대안','#chart-period'],['tree','트리 탐색','#example-tree']]
};
const documentEscape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let activeDocumentNavigation=null;
export function getTopicCatalogue(route){return route==='component'?[...componentCatalogue(),{group:'공통 모양·상태 예제',items:componentExampleSections.map(([id,label])=>({id,label}))}]:[{group:documentNames[route]||route,items:(documentSections[route]||[]).map(([id,label])=>({id,label}))}];}
// Detached markup only: no live demo values, event handlers or navigation mounts.
export function getDocumentSearchEntries(root,route){
 const plain=node=>(node?.textContent||'').replace(/\s+/g,' ').trim();
 const intro=root.querySelector('.page-intro')||root;
 const entries=[{route,id:'',group:documentNames[route],label:documentNames[route],title:plain(intro.querySelector('h1')),description:plain(intro.querySelector('p')),text:plain(intro)}];
 const sections=[...(documentSections[route]||[])];for(const [id,label,selector]of documentAliases[route]||[])if(!sections.some(x=>x[0]===id))sections.push([id,label,selector]);
 for(const [id,label,selector]of sections){const fallback=selector||(documentAliases[route]||[]).find(x=>x[0]===id)?.[2],node=root.querySelector('#'+id)||(fallback&&root.querySelector(fallback));if(!node)throw Error('Search destination missing: '+route+'/'+id);
  const component=componentReferences.find(component=>route==='component'&&component.id===id);
  const context=node.matches('section.section,.component-reference')?node:node.closest('.demo')||node.closest('section.section')||node;
  const summary=Array.from(context.querySelectorAll('.section-header>p,p,.sol-hint')).find(p=>plain(p)&&!p.closest('pre,[role="status"]'));
  const title=plain(context.querySelector('h2,h3,h4'))||label,text=plain(context),description=component?.description||plain(summary)||label+' · '+title;
  entries.push({route,id,group:documentNames[route],label,title,aliases:component?[component.name,component.name.slice(1),component.name.slice(1).replace(/([a-z])([A-Z])/g,'$1 $2'),...(componentSearchNames[component.name]||[]),...(documentSearchNames[component.exampleRoute+'/'+component.example]||[])]:documentSearchNames[route+'/'+id]||[],description:description.length>170?description.slice(0,169)+'…':description,text});
 }
 return entries;
}
export function scrollToDocumentSection(anchor,{focus=true}={}){return activeDocumentNavigation?.go(anchor,focus)||false;}
export function presentTopics(root,route){
 root.dataset.page=route;root.removeAttribute('data-topic');root.querySelector(':scope > .local-nav')?.remove();
 const entries=documentSections[route]||[];
 const sidebar=document.querySelector('.sidebar'),primary=sidebar.querySelector(':scope > nav'),parentLink=primary.querySelector(`[data-route="${route}"]`);
 const controller=new AbortController(),signal=controller.signal,media=matchMedia('(max-width: 800px)');let frame=0,activeId='';
 for(const [id,label,selector]of documentAliases[route]||[]){const node=root.querySelector(selector);if(!node||root.querySelector('#'+id))continue;const target=id==='multiselect'?node.closest('fieldset'):['avatar','chart','tree','date','files','autocomplete'].includes(id)?node.closest('.demo'):node;const heading=document.createElement('h3');heading.id=id;heading.className='document-alias-heading';heading.tabIndex=-1;heading.textContent=label;if(target.matches('form,fieldset'))target.prepend(heading);else target.before(heading);}
 const byId=id=>{const node=document.getElementById(id);return node&&root.contains(node)?node:null;};
 const targets=entries.map(([id,label])=>({id,label,node:byId(id)})).filter(x=>x.node);
 const branch=document.createElement('div');branch.className='doc-nav-branch';const row=document.createElement('div');row.className='doc-nav-row';parentLink.before(branch);branch.append(row);row.append(parentLink);
 const toggle=document.createElement('button');toggle.type='button';toggle.className='doc-section-toggle';toggle.setAttribute('aria-label',`${documentNames[route]} 목차 접기`);toggle.setAttribute('aria-controls','document-section-nav');toggle.setAttribute('aria-expanded','true');toggle.innerHTML=solIcon('chevron',{size:16});row.append(toggle);
 const nav=document.createElement('nav');nav.id='document-section-nav';nav.className='section-subnav';nav.setAttribute('aria-label',`${documentNames[route]} 섹션`);nav.innerHTML=getTopicCatalogue(route).map(group=>(route==='component'?'<p class="doc-nav-group">'+documentEscape(group.group)+'</p>':'')+group.items.filter(item=>targets.some(target=>target.id===item.id)).map(t=>`<a href="#${route}/${t.id}" data-section-link="${t.id}">${documentEscape(t.label)}</a>`).join('')).join('');branch.append(nav);if(!targets.length)toggle.hidden=true;
 const mobileButton=document.createElement('button');mobileButton.type='button';mobileButton.id='mobile-document-menu';mobileButton.className='mobile-document-menu';mobileButton.setAttribute('aria-controls','document-primary-nav');mobileButton.setAttribute('aria-expanded','false');mobileButton.setAttribute('aria-label',`${documentNames[route]} 문서 메뉴`);mobileButton.innerHTML=solIcon('menu',{size:20});primary.id='document-primary-nav';document.querySelector('.header-actions').append(mobileButton);
 function setActive(id){const node=byId(id),section=node?.closest('section.section');const canonical=targets.some(t=>t.id===id)?id:targets.filter(t=>t.node.contains(node)).at(-1)?.id||targets.find(t=>section?.contains(t.node))?.id||targets[0]?.id;activeId=canonical||'';for(const a of nav.querySelectorAll('a')){if(a.dataset.sectionLink===activeId)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');}}
 function offset(){const header=document.querySelector('.topbar');return header&&['fixed','sticky'].includes(getComputedStyle(header).position)?Math.max(0,header.getBoundingClientRect().height)+16:16;}
 function closeMobile(restore=false){if(!media.matches)return;const inside=primary.contains(document.activeElement);primary.hidden=true;mobileButton.setAttribute('aria-expanded','false');if(restore&&inside)mobileButton.focus();}
 function go(anchor,focus){const node=anchor?byId(anchor):root.querySelector('h1');if(!node){closeMobile();setActive('');return false;}closeMobile();document.documentElement.style.setProperty('--sol-document-offset',offset()+'px');const heading=node.matches('h1,h2,h3')?node:node.querySelector('h2,h3')||node;heading.setAttribute('tabindex','-1');window.scrollTo({top:Math.max(0,heading.getBoundingClientRect().top+scrollY-offset()),behavior:'auto'});if(focus)heading.focus({preventScroll:true});setActive(anchor);return true;}
 function track(){frame=0;const positioned=targets.filter(t=>{const rect=t.node.getBoundingClientRect();return rect.height>0||rect.width>0;});if(!positioned.length)return;const edge=offset()+24;let reading=positioned[0];for(const t of positioned){if(t.node.getBoundingClientRect().top<=edge)reading=t;}if(document.documentElement.scrollHeight>innerHeight&&scrollY+innerHeight>=document.documentElement.scrollHeight-2)reading=positioned.at(-1);if(reading&&reading.id!==activeId)setActive(reading.id);}
 function queueTrack(){if(!frame)frame=requestAnimationFrame(track);}
 function responsive(){const inside=primary.contains(document.activeElement);mobileButton.hidden=!media.matches;primary.hidden=media.matches;mobileButton.setAttribute('aria-expanded','false');if(media.matches&&inside)mobileButton.focus();document.documentElement.style.setProperty('--sol-document-offset',offset()+'px');}
 toggle.addEventListener('click',()=>{nav.hidden=!nav.hidden;toggle.setAttribute('aria-expanded',String(!nav.hidden));toggle.setAttribute('aria-label',`${documentNames[route]} 목차 ${nav.hidden?'펼치기':'접기'}`);},{signal});
 mobileButton.addEventListener('click',()=>{primary.hidden=!primary.hidden;mobileButton.setAttribute('aria-expanded',String(!primary.hidden));},{signal});
 primary.addEventListener('click',e=>{const a=e.target.closest('a');if(a?.hash===location.hash){e.preventDefault();go(location.hash.split('/')[1]||'',true);}},{signal});
 primary.addEventListener('keydown',e=>{if(e.key==='Escape'&&media.matches){e.preventDefault();closeMobile(true);}},{signal});
 function measure(){document.documentElement.style.setProperty('--sol-shell-header-height',document.querySelector('.topbar').getBoundingClientRect().height+'px');document.documentElement.style.setProperty('--sol-document-offset',offset()+'px');queueTrack();}const observer=typeof ResizeObserver==='function'?new ResizeObserver(measure):null;observer?.observe(document.querySelector('.topbar'));measure();window.addEventListener('scroll',queueTrack,{passive:true,signal});window.addEventListener('resize',measure,{signal});media.addEventListener('change',responsive,{signal});
 const api={go};activeDocumentNavigation=api;responsive();setActive(resolveDocumentLocation(location.hash).anchor);
 return()=>{controller.abort();observer?.disconnect();document.documentElement.style.removeProperty('--sol-shell-header-height');if(frame)cancelAnimationFrame(frame);if(activeDocumentNavigation===api)activeDocumentNavigation=null;primary.hidden=false;branch.before(parentLink);branch.remove();mobileButton.remove();primary.removeAttribute('id');document.documentElement.style.removeProperty('--sol-document-offset');};
}
