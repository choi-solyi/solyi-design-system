/* Local documentation search. Native links keep the existing hash router/leave guard. */
import {containShellDialogTab} from './shell-dialog.js';
const searchEscape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const searchNormalize=s=>String(s).normalize('NFKC').toLocaleLowerCase('ko').replace(/\s+/g,' ').trim();
const searchCompact=s=>searchNormalize(s).replace(/[\s\p{P}\p{S}]/gu,'');
export function findDocumentResults(documents,query){
 const q=searchNormalize(query),compact=searchCompact(q),terms=q.split(' ').filter(Boolean);if(!compact)return[];
 return documents.map((item,order)=>{const primary=[item.label,item.title,item.id].filter(Boolean),names=[...primary,...(item.aliases||[])].filter(Boolean),title=searchNormalize(names.join(' ')),text=searchNormalize(item.text),description=searchNormalize(item.description),joined=title+' '+description+' '+text;
  if(!terms.every(t=>joined.includes(t))&&!searchCompact(joined).includes(compact))return null;
  // Compare individual names, not joined metadata: incidental prose never outranks an exact name.
  const score=primary.some(n=>searchCompact(n)===compact)?1100:names.some(n=>searchCompact(n)===compact)?1000:names.some(n=>searchNormalize(n).includes(q))?700:names.some(n=>searchCompact(n).includes(compact))?650:terms.every(t=>title.includes(t))?600:description.includes(q)?40:10;
  return{...item,score,order};
 }).filter(Boolean).sort((a,b)=>b.score-a.score||a.order-b.order);
}
export function mountDocumentSearch({getDocuments,goToSection}){
 const trigger=document.querySelector('#document-search-open'),panel=document.querySelector('#document-search-dialog');if(!trigger||!panel)return()=>{};
 const input=panel.querySelector('#document-search-query'),clear=panel.querySelector('#document-search-clear'),results=panel.querySelector('#document-search-results'),status=panel.querySelector('#document-search-status'),form=panel.querySelector('form');
 const controller=new AbortController(),signal=controller.signal;let index=null,items=[],composing=false,suppressSubmit=false,restore=true,opener=trigger;
 const links=()=>Array.from(results.querySelectorAll('a'));
 function renderSearch(){const query=input.value.trim();items=findDocumentResults(index||[],query);clear.disabled=!input.value;results.replaceChildren();
  status.textContent=!query?`문서 ${index?.length||0}개에서 이름이나 설명을 검색하세요.`:items.length?`검색 결과 ${items.length}개. 아래 방향키 또는 Tab으로 결과를 탐색하세요.`:'검색 결과가 없어요. 이름이나 설명의 다른 단어를 입력해 보세요.';
  if(!query)return;
  if(!items.length){const p=document.createElement('p');p.className='doc-search-empty';p.textContent='일치하는 문서를 찾지 못했어요. 검색어를 바꾸거나 초기화해 보세요.';results.append(p);return;}
  const list=document.createElement('ul');list.innerHTML=items.map(item=>`<li><a class="doc-search-result" href="#${searchEscape(item.route)}${item.id?'/'+searchEscape(item.id):''}"><span class="doc-search-location">${searchEscape(item.group)}</span><strong>${searchEscape(item.label)}</strong><span>${searchEscape(item.description)}</span></a></li>`).join('');results.append(list);
 }
 function dismiss(navigating=false){restore=!navigating;if(panel.open)panel.close();}
 function open(){if(panel.open)return;opener=trigger;restore=true;composing=false;suppressSubmit=false;
  if(typeof panel.showModal!=='function'){document.querySelector('#announcement').textContent='문서 검색은 dialog를 지원하는 브라우저에서 사용할 수 있어요. 문서 메뉴를 이용해 주세요.';return;}
  if(!index)index=getDocuments();renderSearch();panel.showModal();input.focus();
 }
 trigger.addEventListener('click',open,{signal});
 panel.querySelector('#document-search-close').addEventListener('click',()=>dismiss(),{signal});
 panel.addEventListener('close',()=>{composing=false;if(restore&&opener?.isConnected)opener.focus();},{signal});
 panel.addEventListener('cancel',e=>{if(composing)e.preventDefault();},{signal});
 // type=search can consume the first Escape to clear text. The documented action closes once.
 panel.addEventListener('keydown',e=>{containShellDialogTab(e,panel);if(e.key!=='Escape')return;e.preventDefault();if(composing||e.isComposing||e.keyCode===229)return;e.stopPropagation();dismiss();},{signal});
 input.addEventListener('compositionstart',()=>composing=true,{signal});
 input.addEventListener('compositionend',()=>{composing=false;renderSearch();},{signal});
 input.addEventListener('input',e=>{if(!composing&&!e.isComposing)renderSearch();},{signal});
 clear.addEventListener('click',()=>{input.value='';composing=false;renderSearch();input.focus();},{signal});
 input.addEventListener('keydown',e=>{if(composing||e.isComposing||e.keyCode===229){suppressSubmit=true;return;}suppressSubmit=false;if(e.key==='ArrowDown'&&items.length){e.preventDefault();links()[0]?.focus();}},{signal});
 form.addEventListener('submit',e=>{e.preventDefault();if(!composing&&!suppressSubmit&&items.length)links()[0]?.click();},{signal});
 results.addEventListener('keydown',e=>{if(e.isComposing||e.altKey||e.ctrlKey||e.metaKey)return;const all=links(),i=all.indexOf(e.target.closest('a'));if(i<0)return;let next;if(e.key==='ArrowDown')next=all[Math.min(i+1,all.length-1)];else if(e.key==='ArrowUp')next=i?all[i-1]:input;else if(e.key==='Home')next=all[0];else if(e.key==='End')next=all.at(-1);if(next){e.preventDefault();next.focus();}},{signal});
 results.addEventListener('click',e=>{const a=e.target.closest('a');if(!a||e.button!==0||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;const same=a.hash===location.hash;dismiss(true);if(same){e.preventDefault();goToSection(a.hash.split('/')[1]||'',{focus:true});}},{signal});
 window.addEventListener('hashchange',()=>dismiss(true),{signal});
 return()=>{controller.abort();dismiss();};
}
