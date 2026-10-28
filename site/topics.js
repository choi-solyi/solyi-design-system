/* Continuous parent documents with grouped component references and compatible deep links. */
import {solIcon} from './icons.js';
import {componentCatalogue,revealComponentTarget} from './component-api.js';
import {componentReferences} from './component-api-data.js';
import {componentLegacyAnchors} from './component-catalog.js';
const documentSections={
 start:[['start-here','시작 순서'],['install','설치'],['registration','공통 등록'],['auto-import','자동 import'],['forms','폼 검증'],['appearance','테마·화면 설정'],['update','업데이트'],['ai-guide','AI guide'],['starter','실제 패키지 실행'],['adoption','CSS·JSON 적용'],['themes','테마'],['density','밀도'],['locale','공통 locale'],['advanced-vue','선택·동작·분할'],['scope','검증·출처'],['principles','시스템 원칙']],
 style:[['principles','Core 원칙'],['tokens','색 토큰'],['type','타이포그래피'],['space','간격·밀도·모서리'],['accessibility','접근성 기준'],['color-examples','컬러 적용 예시'],['motion','모션'],['icons','아이콘'],['layers','레이어와 그림자'],['writing','UI 문구']],
 component:componentCatalogue().flatMap(group=>group.items.map(item=>[item.id,item.label])),
 pattern:[['form','폼 검증과 회복'],['search','검색과 상세'],['compare','비교 선택'],['empty','빈 상태'],['data','표와 목록'],['date','날짜 선택'],['files','파일 선택·드롭'],['autocomplete','자동완성 검색'],['responses','로딩·권한·오류'],['composition','조합 규칙'],['layouts','화면 템플릿'],['workflow','편집·이탈·삭제·Undo'],['error-summary','오류 요약'],['not-found','앱용 404'],['bulk-recovery','일괄 작업·부분 실패']],
 releases:[['changelog','변경 이력']],
 licensing:[['code-license','코드 · MIT'],['brand-license','브랜드 제외'],['third-party-license','폰트·아이콘·외부 고지']]
};
const documentNames={start:'Getting started',style:'Style',component:'Components',pattern:'Patterns',releases:'Releases',licensing:'Licensing'};
export function resolveDocumentLocation(hash){
 const [requested='',anchor='']=String(hash||'').replace(/^#/,'').split('/');
 let route=({overview:'start',theme:'start',components:'component',patterns:'pattern','getting-started':'start'})[requested]||requested||'start',target=anchor;
 if((requested==='theme'||route==='releases')&&anchor==='packages'){route='start';target='install';}
 else if((requested==='theme'||route==='releases')&&anchor==='versioning'){route='releases';target='changelog';}
 else if(route==='start')target=({'vue-components':'registration',installation:'install'})[anchor]||anchor;
 else if(route==='component')target=componentLegacyAnchors[anchor]||anchor;
 return {route:documentNames[route]?route:'start',anchor:documentNames[route]?target:''};
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
 SChip:['Chip','칩'],SBadge:['Badge','배지','뱃지'],SIcon:['Icon','아이콘'],SIconBtn:['Icon Button','아이콘 버튼','아이콘버튼'],
 SNumberInput:['Number Input','NumberInput','숫자 입력','숫자입력'],
 SSortableList:['Sortable List','SortableList','정렬 목록','정렬목록','순서 변경','드래그 정렬'],
 SDatePicker:['Date Picker','DatePicker','날짜','날짜 선택','날짜 선택기','기간 선택'],
 STimePicker:['Time Picker','TimePicker','시간','시각','시간 선택','시각 선택','시간 선택기','시각 선택기']
};
const documentAliases={
 pattern:[['date','단일 날짜와 기간','#extra-range-form'],['files','로컬 파일과 드롭','#extra-file-drop'],['autocomplete','자동완성 검색','#extra-autocomplete']],
};
const documentEscape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let activeDocumentNavigation=null;
export function getTopicCatalogue(route){return route==='component'?componentCatalogue():[{group:documentNames[route]||route,items:(documentSections[route]||[]).map(([id,label])=>({id,label}))}];}
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
  let navigationPosition = null
 for(const [id,label,selector]of documentAliases[route]||[]){const node=root.querySelector(selector);if(!node||root.querySelector('#'+id))continue;const target=id==='multiselect'?node.closest('fieldset'):['avatar','chart','tree','date','files','autocomplete'].includes(id)?node.closest('.demo'):node;const heading=document.createElement('h3');heading.id=id;heading.className='document-alias-heading';heading.tabIndex=-1;heading.textContent=label;if(target.matches('form,fieldset'))target.prepend(heading);else target.before(heading);}
 const byId=id=>{const node=document.getElementById(id);return node&&root.contains(node)?node:null;};
 const targets=entries.map(([id,label])=>({id,label,node:byId(id)})).filter(x=>x.node);
 const branch=document.createElement('div');branch.className='doc-nav-branch';const row=document.createElement('div');row.className='doc-nav-row';parentLink.before(branch);branch.append(row);row.append(parentLink);
 const toggle=document.createElement('button');toggle.type='button';toggle.className='doc-section-toggle';toggle.setAttribute('aria-label',`${documentNames[route]} 목차 접기`);toggle.setAttribute('aria-controls','document-section-nav');toggle.setAttribute('aria-expanded','true');toggle.innerHTML=solIcon('chevron',{size:16});row.append(toggle);
 const nav=document.createElement('nav');nav.id='document-section-nav';nav.className='section-subnav';nav.setAttribute('aria-label',`${documentNames[route]} 섹션`);nav.innerHTML=getTopicCatalogue(route).map(group=>(route==='component'?'<p class="doc-nav-group">'+documentEscape(group.group)+'</p>':'')+group.items.filter(item=>targets.some(target=>target.id===item.id)).map(t=>`<a href="#${route}/${t.id}" data-section-link="${t.id}">${documentEscape(t.label)}</a>`).join('')).join('');branch.append(nav);if(!targets.length)toggle.hidden=true;
 // The mobile parent is a disclosure button; only its child links navigate.
 const branches=[];let mobileExpanded=route,desktopExpanded=true;
 for(const link of primary.querySelectorAll('[data-route]')){
  const name=link.dataset.route,current=name===route;
  let itemBranch=branch,itemRow=row,itemNav=nav;
  if(!current){itemBranch=document.createElement('div');itemBranch.className='doc-nav-other';itemRow=document.createElement('div');itemRow.className='doc-nav-row';link.before(itemBranch);itemBranch.append(itemRow);itemRow.append(link);itemNav=document.createElement('nav');itemNav.id='document-section-nav-'+name;itemNav.className='section-subnav';itemNav.setAttribute('aria-label',`${documentNames[name]} 섹션`);itemNav.innerHTML=getTopicCatalogue(name).map(group=>(name==='component'?'<p class="doc-nav-group">'+documentEscape(group.group)+'</p>':'')+group.items.map(item=>`<a href="#${name}/${item.id}" data-nav-anchor="${item.id}">${documentEscape(item.label)}</a>`).join('')).join('');itemBranch.append(itemNav);}
  const button=document.createElement('button');button.type='button';button.className='doc-parent-toggle';button.setAttribute('aria-controls',itemNav.id);button.setAttribute('aria-label',`${documentNames[name]} 목차`);button.innerHTML=link.innerHTML+solIcon('chevron',{size:16});if(current)button.setAttribute('aria-current','page');itemRow.append(button);
  const item={name,current,branch:itemBranch,link,button,nav:itemNav};branches.push(item);
  button.addEventListener('click',()=>{mobileExpanded=mobileExpanded===name?null:name;syncBranches();const bounds=sidebar.getBoundingClientRect(),control=button.getBoundingClientRect();if(control.top<bounds.top)sidebar.scrollTop+=control.top-bounds.top;else if(control.bottom>bounds.bottom)sidebar.scrollTop+=control.bottom-bounds.bottom;},{signal});
 }
 function syncBranches(){for(const item of branches){item.link.hidden=media.matches;item.button.hidden=!media.matches;const expanded=media.matches?mobileExpanded===item.name:item.current&&desktopExpanded;item.nav.hidden=!expanded;item.button.setAttribute('aria-expanded',String(expanded));}toggle.hidden=media.matches||!targets.length;toggle.setAttribute('aria-expanded',String(desktopExpanded));}
 const mobileButton=document.createElement('button');mobileButton.type='button';mobileButton.id='mobile-document-menu';mobileButton.className='mobile-document-menu';mobileButton.setAttribute('aria-controls','document-primary-nav');mobileButton.setAttribute('aria-expanded','false');mobileButton.setAttribute('aria-label',`${documentNames[route]} 문서 메뉴`);mobileButton.innerHTML=solIcon('menu',{size:20});primary.id='document-primary-nav';document.querySelector('.header-actions').append(mobileButton);
 function setActive(id){const node=byId(id),section=node?.closest('section.section');const canonical=targets.some(t=>t.id===id)?id:targets.filter(t=>t.node.contains(node)).at(-1)?.id||targets.find(t=>section?.contains(t.node))?.id||targets[0]?.id;activeId=canonical||'';for(const a of nav.querySelectorAll('a')){if(a.dataset.sectionLink===activeId)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');}}
 function offset(){const header=document.querySelector('.topbar');return header&&['fixed','sticky'].includes(getComputedStyle(header).position)?Math.max(0,header.getBoundingClientRect().height)+16:16;}
 function closeMobile(restore=false){if(!media.matches)return;const inside=primary.contains(document.activeElement);primary.hidden=true;mobileButton.setAttribute('aria-expanded','false');if(restore&&inside)mobileButton.focus();}
  function go(anchor, focus) {
    if (anchor) revealComponentTarget(root, anchor)
    const node = anchor ? byId(anchor) : root.querySelector('h1')
    if (!node) {
      navigationPosition = null
      closeMobile()
      setActive('')
      return false
    }
    closeMobile()
    document.documentElement.style.setProperty('--sol-document-offset', offset() + 'px')
    const heading = node.matches('h1,h2,h3') ? node : node.querySelector('h2,h3') || node
    heading.setAttribute('tabindex', '-1')
    window.scrollTo({
      top: Math.max(0, heading.getBoundingClientRect().top + scrollY - offset()),
      behavior: 'auto',
    })
    if (focus) heading.focus({ preventScroll: true })
    setActive(anchor)
    navigationPosition = { id: activeId, y: scrollY }
    return true
  }

  function track() {
    frame = 0
    const positioned = targets.filter(target => {
      const rect = target.node.getBoundingClientRect()
      return rect.height > 0 || rect.width > 0
    })
    if (!positioned.length) return
    // A short page may clamp an explicit anchor to the bottom. Keep that selection until scrolling.
    if (navigationPosition) {
      if (Math.abs(scrollY - navigationPosition.y) <= 2) {
        setActive(navigationPosition.id)
        return
      }
      navigationPosition = null
    }
    const edge = offset() + 24
    let reading = positioned[0]
    for (const target of positioned) {
      if (target.node.getBoundingClientRect().top <= edge) reading = target
    }
    if (
      document.documentElement.scrollHeight > innerHeight &&
      scrollY + innerHeight >= document.documentElement.scrollHeight - 2
    ) {
      reading = positioned.at(-1)
    }
    if (reading && reading.id !== activeId) setActive(reading.id)
  }
 function queueTrack(){if(!frame)frame=requestAnimationFrame(track);}
 function responsive(){const focused=document.activeElement,inside=primary.contains(focused);mobileButton.hidden=!media.matches;primary.hidden=media.matches;mobileButton.setAttribute('aria-expanded','false');syncBranches();if(media.matches&&inside)mobileButton.focus();else if(!media.matches){const item=branches.find(item=>item.button===focused);item?.link.focus({preventScroll:true});}document.documentElement.style.setProperty('--sol-document-offset',offset()+'px');}
 toggle.addEventListener('click',()=>{desktopExpanded=!desktopExpanded;syncBranches();toggle.setAttribute('aria-label',`${documentNames[route]} 목차 ${desktopExpanded?'접기':'펼치기'}`);},{signal});
 mobileButton.addEventListener('click',()=>{primary.hidden=!primary.hidden;mobileButton.setAttribute('aria-expanded',String(!primary.hidden));},{signal});
 primary.addEventListener('click',e=>{const a=e.target.closest('a');if(a?.hash===location.hash){e.preventDefault();go(location.hash.split('/')[1]||'',true);}},{signal});
 primary.addEventListener('keydown',e=>{if(e.key==='Escape'&&media.matches){e.preventDefault();closeMobile(true);}},{signal});
 function measure(){document.documentElement.style.setProperty('--sol-shell-header-height',document.querySelector('.topbar').getBoundingClientRect().height+'px');document.documentElement.style.setProperty('--sol-document-offset',offset()+'px');queueTrack();}const observer=typeof ResizeObserver==='function'?new ResizeObserver(measure):null;observer?.observe(document.querySelector('.topbar'));measure();window.addEventListener('scroll',queueTrack,{passive:true,signal});window.addEventListener('resize',measure,{signal});media.addEventListener('change',responsive,{signal});
 const api={go};activeDocumentNavigation=api;responsive();setActive(resolveDocumentLocation(location.hash).anchor);
 return()=>{controller.abort();observer?.disconnect();document.documentElement.style.removeProperty('--sol-shell-header-height');if(frame)cancelAnimationFrame(frame);if(activeDocumentNavigation===api)activeDocumentNavigation=null;primary.hidden=false;for(const item of branches){item.link.hidden=false;item.branch.before(item.link);item.branch.remove();}mobileButton.remove();primary.removeAttribute('id');document.documentElement.style.removeProperty('--sol-document-offset');};
}
