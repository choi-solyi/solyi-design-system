/* One catalogue drives the landing cards, secondary navigation, headings and next/previous links.
 * Existing hash section IDs remain valid. Examples are moved, never cloned, so IDs/state hooks stay unique. */
const topicGroups={
 style:[['기본',[['principles','Core 원칙'],['accessibility','접근성 기준'],['writing','UI 문구']]],['색',[['tokens','색 토큰'],['color-examples','컬러 적용 예시']]],['형태와 공간',[['type','타이포그래피'],['space','간격과 밀도'],['layers','레이어와 그림자'],['icons','아이콘']]],['모션',[['motion','모션']]]],
 component:[['동작',[['buttons','버튼'],['action-menu','행동 메뉴']]],['입력',[['fields','텍스트 필드'],['choices','선택 컨트롤 기본'],['selection','체크·라디오·스위치 조합'],['textarea','Textarea'],['number','숫자 증감'],['multiselect','다중 선택과 태그'],['time','시간 선택']]],['탐색',[['content-tabs','탭 패널'],['help','툴팁과 팝오버'],['accordion','아코디언'],['navigation','경로·패널·토스트']]],['피드백과 표시',[['feedback','상태 알림'],['dialog','대화상자'],['avatar','Avatar와 사용자 메뉴'],['progress','진행률과 단계'],['chart','차트와 표 대안'],['tree','트리 탐색']]]],
 pattern:[['조회',[['search','검색과 상세'],['data','표와 목록'],['compare','비교 선택']]],['작성과 편집',[['form','폼 검증과 회복'],['date','단일 날짜와 기간'],['files','로컬 파일과 드롭'],['autocomplete','자동완성 검색'],['workflow','편집·이탈·삭제·Undo']]],['상태와 복구',[['empty','빈 상태'],['responses','로딩·결과 없음·권한·오류']]],['화면틀과 조합',[['layouts','설정·목록·상세 템플릿'],['composition','폼과 행동 조합 규칙']]]],
 theme:[['표현 설정',[['themes','테마'],['density','밀도']]],['도입',[['adoption','CSS·JSON 도입'],['starter','Vue·Vuetify starter'],['versioning','버전과 폐기 정책']]],['범위',[['scope','범위와 출처']]]]
};
const topicRouteNames={style:'Style',component:'Component',pattern:'Pattern',theme:'Theme & adoption'};
const topicBundles={inputs:['date','files','autocomplete'],'advanced-inputs':['textarea','number','multiselect'],'identity-progress':['avatar','progress'],'chart-tree':['chart','tree']};
const topicBundleNames={inputs:'로컬 입력 안내','advanced-inputs':'입력 확장 안내','identity-progress':'사용자·진행 안내','chart-tree':'차트·트리 안내'};
const topicEscape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function getTopicCatalogue(route){return (topicGroups[route]||[]).map(([group,items])=>({group,items:items.map(([id,label])=>({id,label}))}));}
function splitTopics(root,route,h){
 const $=s=>root.querySelector(s);
 const leaf=(id,label,subtitle,nodes,{demo='',states='',keys='',mapping='',reuse='',code=''}={})=>{
   const template=document.createElement('template');template.innerHTML=h.section(id,label,subtitle,`<div class="topic-live">${demo?h.demo(demo,''):''}</div>${states?h.contract(states,keys,mapping):''}${reuse?`<p class="demo-usage">${reuse}</p>`:''}${code?h.codeSample('현재 예시의 마크업과 연결',code):''}`);
   const section=template.content.firstElementChild;const target=section.querySelector('.demo-stage')||section.querySelector('.topic-live');for(const node of nodes)target.append(node);root.append(section);return section;
 };
 const bundle=source=>{const body=[...source.children].filter(x=>!x.classList.contains('section-header'));const legacy=document.createElement('details');legacy.className='code-example';legacy.innerHTML='<summary>이전 통합 문서의 공통 계약과 사용 예시</summary>';const content=document.createElement('div');content.className='code-body';body.forEach(n=>content.append(n));legacy.append(content);source.append(legacy);};
 if(route==='pattern'){
   const source=$('#inputs'),stack=source?.querySelector(':scope > .sol-stack');if(stack){const demos=[...stack.querySelectorAll(':scope > .demo')],children=[...stack.childNodes],end=children.indexOf(demos[1]);
     leaf('date','단일 날짜와 기간','한 입력창과 하나의 달력 · mode 설정',children.slice(0,end));
     leaf('files','로컬 파일과 드롭','서버 전송·자동 저장 없는 로컬 데모',[demos[1]],{states:'대기·드래그 진입/이탈·선택 목록·중복/형식/크기/개수 오류·개별 제거·초기화·재선택.',keys:'파일 선택 버튼은 Tab/Enter. 제거 후 다음 제거 버튼 또는 선택 입력으로 복귀합니다. 터치도 선택 버튼으로 같은 검사를 사용합니다.',mapping:'control-height · button-height · control-border · accent-soft · danger · focus',reuse:'TXT·PNG·JPG·JPEG·PDF, 파일당 2MiB, 최대 3개. 확장자와 제공된 MIME 이름·크기를 표시하며 알 수 없는 MIME은 추측하지 않습니다. 파일 내용은 읽지 않습니다. 데모가 열린 동안 영역 밖 파일 드롭은 페이지 이동만 막습니다. 좁은 화면·터치의 선택 버튼은 최소 44px입니다.',code:demos[1].querySelector('.demo-stage').innerHTML+"\n// import {mountExamples} from './extended.js';\nconst cleanup = mountExamples(container, announce);\n// 선택과 drop이 같은 addFiles 검사를 사용합니다. 해제 시 cleanup()."});
     leaf('autocomplete','자동완성 검색','가상 분류의 로컬 검색과 키보드 선택',[demos[2]],{states:'닫힘·입력·활성 제안·선택·결과 없음·지우기. 자유 입력과 확정 값을 구분합니다.',keys:'↓/↑로 목록과 제안을 탐색, Enter로 확정, Escape/Tab으로 닫기. 한국어 IME 조합 중 Enter는 선택하지 않습니다. 초점은 입력에 남습니다.',mapping:'control-height · surface · control-border · accent-soft · focus',reuse:'aria-activedescendant는 열린 목록의 실제 제안 ID를 가리킵니다. 모바일에서는 목록 열기 버튼과 제안 터치를 사용할 수 있습니다. 외부 검색 요청 없이 가상 데이터만 사용합니다.',code:demos[2].querySelector('.demo-stage').innerHTML+"\n// mountExamples(container, announce), 해제 시 반환된 cleanup().\n// 조합 중: event.isComposing || composing || event.keyCode===229 이면 선택하지 않습니다."});
     stack.remove();bundle(source);
   }
 }
 if(route==='component'){
   let source=$('#advanced-inputs');if(source){const demo=source.querySelector('.demo'),text=$('#advanced-note'),number=$('#advanced-number-form'),tags=$('#advanced-tags').closest('fieldset');
     for(const [id,label,node,states,keys]of [['textarea','Textarea',text,'필수·1~120자·줄바꿈·길이 안내·오류 후 값 보존.','Tab으로 입력, 확인 시 검증하고 오류는 입력으로 초점.'],['number','숫자 증감',number,'0~12, step 2. 최소/최대 버튼 비활성, 범위·간격 오류, 잘못된 값 보존.','직접 입력·네이티브 ↑/↓·명명된 증감 버튼. 오류는 먼저 고친 뒤 증감합니다.'],['multiselect','다중 선택과 태그',tags,'0~2개 선택·초과 안내·태그 제거. 체크박스의 선택과 태그 목록을 함께 갱신.','Space로 체크, 제거 Enter 후 다음 제거 또는 원래 체크박스에 초점.']])leaf(id,label,'가상 입력 예시 · 값은 이 문서 안에서만 유지',[node],{demo:label,states,keys,mapping:'control-height · control-border · danger · accent-soft · focus · space-2/4',reuse:'좁은 화면은 한 열로 쌓고 터치 목표 44px을 유지합니다. 입력의 의미에 따라 텍스트·수량·여러 값을 구분합니다.',code:node.outerHTML+"\n// import {mountAdvancedInputs} from './inputs.js';\nconst cleanup = mountAdvancedInputs(container);\n// 화면 해제 시 cleanup(). 실제 서버 전송은 없습니다."});
     demo.remove();bundle(source);
   }
   source=$('#identity-progress');if(source){const demo=source.querySelector('.demo'),stack=demo.querySelector('.demo-stage > .sol-stack'),avatar=stack.firstElementChild,progress=$('#steps-form');
     leaf('avatar','Avatar와 사용자 메뉴','이미지가 없으면 이니셜과 이름을 함께',[avatar],{demo:'Fictional user',states:'이니셜 대안·메뉴 열림/닫힘·가상 행동 안내.',keys:'행동 메뉴와 같은 ↑/↓·Home/End·Enter·Escape·Tab 계약. 실제 계정을 불러오지 않습니다.',mapping:'accent-soft · accent · surface · layer-floating · focus',reuse:'이름을 함께 표시하고 이니셜은 aria-hidden입니다. createActionMenu를 재사용합니다. 좁은 화면의 행동은 44px 이상입니다.',code:avatar.outerHTML+"\n// extras.js의 mountExtras(container), 해제 시 cleanup()."});
     leaf('progress','진행률과 단계','이름 → 분류 → 검토',[progress],{demo:'Local wizard',states:'현재 단계·완료 단계·오류·뒤로·입력값 유지·완료·초기화.',keys:'다음 단계의 첫 필드, 오류는 해당 필드, 최종 완료는 결과 문구로 초점. 이전/처음부터는 실제 버튼입니다.',mapping:'accent · on-accent · muted · border · focus',reuse:'실제 완료한 단계 수를 progress로 표시하고 현재 단계는 aria-current=step입니다. 완료 시점을 모르는 대기는 로딩 패턴을 사용합니다. 모바일에서 이름과 행동은 줄바꿈합니다.',code:progress.outerHTML+"\n// mountExtras(container), 해제 시 cleanup(). 실제 생성 요청 없음."});
     demo.remove();bundle(source);
   }
   source=$('#chart-tree');if(source){const demos=[...source.querySelectorAll(':scope > .demo')];
     leaf('chart','차트와 표 대안','한 데이터에서 만드는 시각·텍스트 비교',[demos[0]],{states:'주간 선택·0값·총합·같은 값의 표 대안.',keys:'Select로 주간 변경. 값은 호버 없이 항상 표에서 읽습니다.',mapping:'accent · text · muted · control-border',reuse:'색이나 호버에만 의존하지 않고 가상 막대의 전체 값을 표로 제공합니다. 좁은 폭에서는 SVG 폭을 줄이고 같은 표를 유지합니다. 복잡한 분석 대시보드는 포함하지 않습니다.',code:'// extras.js / mountExtras: 같은 values에서 SVG와 visible table을 함께 렌더링합니다.\n// svg role=img + title/desc, table caption + th scope를 유지합니다.'});
     leaf('tree','트리 탐색','단일 선택과 초점을 나누는 가상 폴더',[demos[1]],{states:'펼침·접힘·키보드 초점·단일 선택을 별도로 관리합니다.',keys:'↑/↓ 이동, → 펼침/자식, ← 접힘/부모, Home/End, Enter/Space 선택. 표시 항목 중 하나만 Tab stop. 숨긴 자식은 Tab 제외.',mapping:'control-height · accent-soft · accent · focus · space-2/6',reuse:'폴더 몇 개라면 Accordion이 더 단순할 수 있습니다. 이 예시는 실제 파일 시스템과 연결되지 않습니다. 모바일은 행 터치로 선택/펼침을 사용할 수 있습니다.',code:'// extras.js / mountExtras. role=tree/treeitem/group, aria-expanded/selected와\n// hidden group, roving tabindex를 함께 갱신합니다. 초점 이동은 선택이 아닙니다.'});
     bundle(source);
   }
 }
}
export function presentTopics(root,route,h){
 const groups=getTopicCatalogue(route),sidebar=document.querySelector('.sidebar');sidebar.querySelector('#secondary-topics')?.remove();
 if(!groups.length)return()=>{};
 splitTopics(root,route,h);root.querySelector(':scope > .local-nav')?.remove();
 const items=groups.flatMap(g=>g.items.map(x=>({...x,group:g.group}))),sectionMap=new Map([...root.querySelectorAll(':scope > section.section')].map(s=>[s.id,s]));
 const label=id=>items.find(x=>x.id===id)?.label||topicBundleNames[id]||id;
 const cards=ids=>`<ul class="topic-links">${ids.map(id=>{const section=sectionMap.get(id),description=section?.querySelector('.section-header > p')?.textContent||'';return `<li><a href="#${route}/${id}"><strong>${topicEscape(label(id))}</strong>${description?`<span>${topicEscape(description)}</span>`:''}</a></li>`;}).join('')}</ul>`;
 for(const [id,children]of Object.entries(topicBundles)){const source=sectionMap.get(id);if(source){const node=document.createElement('div');node.className='topic-bundle';node.innerHTML='<p class="small muted">하나의 주제를 골라 예시와 사용 방법을 확인하세요. 기존 통합 문서는 아래에서 펼칠 수 있습니다.</p>'+cards(children);source.insertBefore(node,source.querySelector('.code-example'));}}
 const requested=location.hash.split('/')[1]||'',chosen=sectionMap.has(requested)?requested:'',current=items.find(i=>i.id===chosen),group=current?.group||items.find(i=>topicBundles[chosen]?.includes(i.id))?.group;
 const ordered=[...items.map(i=>sectionMap.get(i.id)),...Object.keys(topicBundles).map(id=>sectionMap.get(id))].filter(Boolean);
 const footer=root.querySelector('.site-footer');for(const section of ordered){section.hidden=section.id!==chosen;root.insertBefore(section,footer);}
 if(chosen){root.querySelector(':scope > .page-intro')?.remove();const section=sectionMap.get(chosen),old=section.querySelector('.section-header h2'),heading=document.createElement('h1');heading.id=old.id;heading.tabIndex=-1;heading.textContent=label(chosen);if(old.textContent!==heading.textContent){const note=document.createElement('p');note.className='topic-note';note.textContent=old.textContent;old.after(note);}old.replaceWith(heading);section.classList.add('focused-topic');
   root.querySelector('.breadcrumb').innerHTML=`<span>Solyi</span><span aria-hidden="true">/</span><a href="#${route}">${topicRouteNames[route]}</a><span aria-hidden="true">/</span>${group?`<span>${topicEscape(group)}</span><span aria-hidden="true">/</span>`:''}<span>${topicEscape(label(chosen))}</span>`;
   const index=items.findIndex(i=>i.id===chosen),nav=document.createElement('nav');nav.className='topic-pager';nav.setAttribute('aria-label','관련 주제 이동');nav.innerHTML=`<a href="#${route}">전체 주제</a>${index>0?`<a href="#${route}/${items[index-1].id}">← ${topicEscape(items[index-1].label)}</a>`:''}${index>=0&&index<items.length-1?`<a href="#${route}/${items[index+1].id}">${topicEscape(items[index+1].label)} →</a>`:''}`;root.insertBefore(nav,footer);
   document.title=`${label(chosen)} · ${topicRouteNames[route]} · Solyi Design System`;
 }else{const catalog=document.createElement('div');catalog.id='topic-catalog';catalog.className='topic-catalog';catalog.innerHTML=(requested?'<p role="status" class="sol-hint">해당 주제를 찾지 못해 전체 항목을 표시합니다.</p>':'')+groups.map(g=>`<section class="topic-group-card" aria-label="${topicEscape(g.group)}"><h2>${topicEscape(g.group)}</h2>${cards(g.items.map(x=>x.id))}</section>`).join('');root.querySelector(':scope > .page-intro').after(catalog);}
 const nav=document.createElement('details');nav.id='secondary-topics';nav.className='secondary-topics';nav.open=!matchMedia('(max-width: 800px)').matches;nav.innerHTML=`<summary>${chosen?topicEscape(label(chosen)):'세부 주제 선택'}<span>${topicRouteNames[route]}</span></summary><nav class="secondary-nav" aria-label="${topicRouteNames[route]} 세부 주제"><a class="topic-overview-link" href="#${route}" ${!chosen?'aria-current="location"':''}>주제 개요</a>${groups.map(g=>`<details class="topic-nav-group" ${g.group===group?'open data-current-group="true"':''}><summary>${topicEscape(g.group)}${g.group===group?'<span class="topic-current-label">현재 그룹</span>':''}</summary>${g.items.map(i=>`<a href="#${route}/${i.id}" ${i.id===chosen?'aria-current="location"':''}>${topicEscape(i.label)}</a>`).join('')}</details>`).join('')}</nav>`;sidebar.querySelector(':scope > nav').after(nav);
 const controller=new AbortController(),media=matchMedia('(max-width: 800px)');
 media.addEventListener('change',e=>{const inside=nav.contains(document.activeElement);nav.open=!e.matches;if(e.matches&&inside)nav.querySelector(':scope > summary').focus();},{signal:controller.signal});
 nav.addEventListener('click',e=>{const link=e.target.closest('a[href^="#"]');if(link?.hash===location.hash){e.preventDefault();if(media.matches)nav.open=false;root.querySelector('h1')?.focus();root.querySelector('h1')?.scrollIntoView({block:'start'});}},{signal:controller.signal});
 nav.addEventListener('keydown',e=>{if(e.key==='Escape'){const open=e.target.closest('details[open]');if(open&&(nav.contains(open)||open===nav)){e.preventDefault();e.stopPropagation();open.open=false;open.querySelector(':scope > summary').focus();}}},{signal:controller.signal});
 root.dataset.topic=chosen;return()=>controller.abort();
}
