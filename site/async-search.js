/* Local async combobox controller: injected data, no remote requests. */
export function mountAsyncAutocomplete(root,{values,signal}){
 const $=s=>root.querySelector(s),input=$('#extra-autocomplete');if(!input)return;
 const menu=$('#extra-autocomplete-menu'),list=$('#extra-autocomplete-list'),status=$('#extra-autocomplete-status'),retry=$('#extra-autocomplete-retry'),mode=$('#extra-autocomplete-mode');
 let matches=[],active=-1,composing=false,generation=0,pending=false,failed=false;const timers=new Set();
 const on=(node,type,fn)=>node.addEventListener(type,fn,{signal});
 const mark=()=>{list.querySelectorAll('[role=option]').forEach((li,i)=>li.setAttribute('aria-selected',String(i===active)));if(active>=0)input.setAttribute('aria-activedescendant','extra-option-'+active);else input.removeAttribute('aria-activedescendant');};
 const close=()=>{generation++;pending=false;menu.hidden=true;input.setAttribute('aria-expanded','false');input.setAttribute('aria-busy','false');input.removeAttribute('aria-activedescendant');status.textContent='';active=-1;};
 const render=()=>{list.innerHTML=matches.map((value,i)=>`<li id="extra-option-${i}" role="option" aria-selected="false" data-extra-option="${i}">${value}</li>`).join('');$('#extra-autocomplete-empty').hidden=pending||failed||!!matches.length;retry.hidden=!failed;status.textContent=pending?'가상 검색 중이에요.':failed?'가상 검색 오류입니다. 입력은 남아 있어요. 다시 시도해 주세요.':matches.length+'개 제안';input.setAttribute('aria-busy',String(pending));mark();};
 function open(forceSuccess=false){const token=++generation,query=input.value.trim();menu.hidden=false;input.setAttribute('aria-expanded','true');matches=[];active=-1;failed=false;pending=mode.value!=='local';render();
  const finish=()=>{if(signal.aborted||token!==generation||menu.hidden)return;pending=false;failed=mode.value==='error'&&!forceSuccess;matches=failed?[]:values.filter(value=>value.includes(query));render();};
  if(!pending)finish();else{const timer=setTimeout(()=>{timers.delete(timer);finish();},query.length<2?260:90);timers.add(timer);}
 }
 const choose=index=>{if(pending||failed||!matches[index])return;input.value=matches[index];$('#extra-autocomplete-result').textContent='선택: '+matches[index];close();input.focus();};
 on(input,'input',()=>{if(!composing)open();});on(input,'compositionstart',()=>{composing=true;});on(input,'compositionend',()=>{composing=false;open();});
 on(input,'keydown',e=>{if(composing||e.isComposing||e.keyCode===229)return;if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();if(menu.hidden)open();if(!pending&&!failed&&matches.length){active=e.key==='Home'?0:e.key==='End'?matches.length-1:active<0?(e.key==='ArrowDown'?0:matches.length-1):((active+(e.key==='ArrowDown'?1:-1)+matches.length)%matches.length);mark();}}else if(e.key==='Enter'&&!menu.hidden){e.preventDefault();choose(active);}else if(e.key==='Escape'){e.preventDefault();close();}else if(e.key==='Tab')close();});
 on(list,'pointerdown',e=>e.preventDefault());on(list,'click',e=>{const li=e.target.closest('[data-extra-option]');if(li)choose(Number(li.dataset.extraOption));});
 on($('#extra-autocomplete-toggle'),'click',()=>{menu.hidden?open():close();input.focus();});on($('#extra-autocomplete-clear'),'click',()=>{input.value='';$('#extra-autocomplete-result').textContent='아직 선택하지 않았어요.';close();input.focus();});
 on(retry,'click',()=>{open(true);input.focus();});on(mode,'change',()=>{close();$('#extra-autocomplete-result').textContent='가상 검색 모드를 바꿨어요. 입력하거나 목록을 여세요.';});
 on(menu,'keydown',e=>{if(e.key==='Escape'){e.preventDefault();close();input.focus();}});
 on(document,'focusin',e=>{if(!menu.hidden&&e.target!==input&&!menu.contains(e.target)&&e.target!==$('#extra-autocomplete-toggle'))close();});
 on(document,'pointerdown',e=>{if(!menu.hidden&&e.target!==input&&!menu.contains(e.target)&&!$('#extra-autocomplete-toggle').contains(e.target))close();});
 signal.addEventListener('abort',()=>{generation++;for(const timer of timers)clearTimeout(timer);timers.clear();},{once:true});
}
