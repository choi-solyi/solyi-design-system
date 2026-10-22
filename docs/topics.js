/* Continuous parent documents. Indented sidebar links scroll to headings; they never hide content. */
import {solIcon} from './icons.js';
const documentSections={
 style:[['principles','Core 원칙'],['tokens','색 토큰'],['type','타이포그래피'],['space','간격·밀도·모서리'],['accessibility','접근성 기준'],['color-examples','컬러 적용 예시'],['motion','모션'],['icons','아이콘'],['layers','레이어와 그림자'],['writing','UI 문구']],
 component:[['buttons','버튼'],['fields','텍스트 필드'],['choices','선택 컨트롤 기본'],['feedback','상태 알림'],['dialog','대화상자'],['selection','체크·라디오·스위치'],['help','툴팁과 팝오버'],['accordion','아코디언'],['navigation','경로·패널·토스트'],['advanced-inputs','Textarea·숫자·다중 선택'],['content-tabs','탭 패널'],['action-menu','행동 메뉴'],['identity-progress','Avatar·단계'],['progress','Progress bar·circle'],['time','시간 선택'],['chart','차트와 표 대안'],['tree','트리 탐색']],
 pattern:[['form','폼 검증과 회복'],['search','검색과 상세'],['compare','비교 선택'],['empty','빈 상태'],['data','표와 목록'],['date','날짜 선택'],['files','파일 선택·드롭'],['autocomplete','자동완성 검색'],['responses','로딩·권한·오류'],['composition','조합 규칙'],['layouts','화면 템플릿'],['workflow','편집·이탈·삭제·Undo'],['error-summary','오류 요약'],['not-found','앱용 404'],['bulk-recovery','일괄 작업·부분 실패']],
 theme:[['themes','테마'],['density','밀도'],['adoption','CSS·JSON 도입'],['scope','범위와 출처'],['starter','Vue·Vuetify starter'],['vue-components','Vue API·전환표'],['versioning','버전과 폐기 정책']]
};
const documentNames={overview:'Overview',style:'Style',component:'Component',pattern:'Pattern',theme:'Theme & adoption'};
// v0.2.1 links keep their exact hashes and now target the original, continuous examples.
const documentAliases={
 pattern:[['date','단일 날짜와 기간','#extra-range-form'],['files','로컬 파일과 드롭','#extra-file-drop'],['autocomplete','자동완성 검색','#extra-autocomplete']],
 component:[['textarea','Textarea','#advanced-note'],['number','숫자 증감','#advanced-number-form'],['multiselect','다중 선택과 태그','#advanced-tags'],['avatar','Avatar와 사용자 메뉴','#avatar-menu-trigger'],['progress','진행률과 단계','#steps-form'],['chart','차트와 표 대안','#chart-period'],['tree','트리 탐색','#example-tree']]
};
const documentEscape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let activeDocumentNavigation=null;
export function getTopicCatalogue(route){return[{group:documentNames[route]||route,items:(documentSections[route]||[]).map(([id,label])=>({id,label}))}];}
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
 const nav=document.createElement('nav');nav.id='document-section-nav';nav.className='section-subnav';nav.setAttribute('aria-label',`${documentNames[route]} 섹션`);nav.innerHTML=targets.map(t=>`<a href="#${route}/${t.id}" data-section-link="${t.id}">${documentEscape(t.label)}</a>`).join('');branch.append(nav);if(!targets.length)toggle.hidden=true;
 const mobileButton=document.createElement('button');mobileButton.type='button';mobileButton.id='mobile-document-menu';mobileButton.className='mobile-document-menu';mobileButton.setAttribute('aria-controls','document-primary-nav');mobileButton.setAttribute('aria-expanded','false');mobileButton.textContent=`메뉴 · ${documentNames[route]}`;primary.id='document-primary-nav';primary.before(mobileButton);
 function setActive(id){const section=byId(id)?.closest('section.section');const canonical=targets.some(t=>t.id===id)?id:targets.find(t=>section?.contains(t.node))?.id||targets[0]?.id;activeId=canonical||'';for(const a of nav.querySelectorAll('a')){if(a.dataset.sectionLink===activeId)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');}}
 function offset(){const header=document.querySelector('.topbar');return header&&['fixed','sticky'].includes(getComputedStyle(header).position)?Math.max(0,header.getBoundingClientRect().height)+16:16;}
 function closeMobile(restore=false){if(!media.matches)return;const inside=primary.contains(document.activeElement);primary.hidden=true;mobileButton.setAttribute('aria-expanded','false');if(restore&&inside)mobileButton.focus();}
 function go(anchor,focus){const node=anchor?byId(anchor):root.querySelector('h1');if(!node){closeMobile();setActive('');return false;}closeMobile();document.documentElement.style.setProperty('--sol-document-offset',offset()+'px');const heading=node.matches('h1,h2,h3')?node:node.querySelector('h2,h3')||node;heading.setAttribute('tabindex','-1');window.scrollTo({top:Math.max(0,heading.getBoundingClientRect().top+scrollY-offset()),behavior:'auto'});if(focus)heading.focus({preventScroll:true});setActive(anchor);return true;}
 function track(){frame=0;const edge=offset()+24;let reading=targets[0];for(const t of targets){if(t.node.getBoundingClientRect().top<=edge)reading=t;}if(document.documentElement.scrollHeight>innerHeight&&scrollY+innerHeight>=document.documentElement.scrollHeight-2)reading=targets.at(-1);if(reading&&reading.id!==activeId)setActive(reading.id);}
 function queueTrack(){if(!frame)frame=requestAnimationFrame(track);}
 function responsive(){const inside=primary.contains(document.activeElement);mobileButton.hidden=!media.matches;primary.hidden=media.matches;mobileButton.setAttribute('aria-expanded','false');if(media.matches&&inside)mobileButton.focus();document.documentElement.style.setProperty('--sol-document-offset',offset()+'px');}
 toggle.addEventListener('click',()=>{nav.hidden=!nav.hidden;toggle.setAttribute('aria-expanded',String(!nav.hidden));toggle.setAttribute('aria-label',`${documentNames[route]} 목차 ${nav.hidden?'펼치기':'접기'}`);},{signal});
 mobileButton.addEventListener('click',()=>{primary.hidden=!primary.hidden;mobileButton.setAttribute('aria-expanded',String(!primary.hidden));},{signal});
 primary.addEventListener('click',e=>{const a=e.target.closest('a');if(a?.hash===location.hash){e.preventDefault();go(location.hash.split('/')[1]||'',true);}},{signal});
 primary.addEventListener('keydown',e=>{if(e.key==='Escape'&&media.matches){e.preventDefault();closeMobile(true);}},{signal});
 window.addEventListener('scroll',queueTrack,{passive:true,signal});window.addEventListener('resize',queueTrack,{signal});media.addEventListener('change',responsive,{signal});
 const api={go};activeDocumentNavigation=api;responsive();setActive(location.hash.split('/')[1]||'');
 return()=>{controller.abort();if(frame)cancelAnimationFrame(frame);if(activeDocumentNavigation===api)activeDocumentNavigation=null;primary.hidden=false;branch.before(parentLink);branch.remove();mobileButton.remove();primary.removeAttribute('id');document.documentElement.style.removeProperty('--sol-document-offset');};
}
