import {dateISO,monthDays,parseDateOnly,weekday,shiftDay,shiftMonth} from './date-only.js';
/* Framework-neutral single/range date picker. Values remain date-only strings. */
const weekdays=['일','월','화','수','목','금','토'];
const koreanDate=value=>`${value.y}년 ${value.m}월 ${value.d}일 ${weekdays[weekday(value)]}요일`;
const todayDate=()=>{const now=new Date();return {y:now.getFullYear(),m:now.getMonth()+1,d:now.getDate()};};
const dateEscape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const cloneDateValue=value=>value&&typeof value==='object'?{start:value.start,end:value.end}:value;
let pickerId=0;

export function createDatePicker(container,options={}){
  if(!container?.ownerDocument)throw new TypeError('Date picker needs a container element.');
  const validMode=value=>value==='single'||value==='range';
  let mode=options.mode??'single';if(!validMode(mode))throw new TypeError('mode must be single or range.');
  const id=options.id??`sol-date-${++pickerId}`;
  if(!/^[A-Za-z][A-Za-z0-9_-]*$/.test(id)||container.ownerDocument.getElementById(`${id}-input`))throw new TypeError('Use a unique, safe date picker id.');
  const required=options.required??false,label=options.label??'날짜';
  const validValue=value=>value===null||(mode==='single'?typeof value==='string'&&!!parseDateOnly(value):!!value&&typeof value==='object'&&!!parseDateOnly(value.start)&&!!parseDateOnly(value.end)&&value.start<=value.end);
  let value=options.value??null;if(!validValue(value))throw new TypeError('Invalid date-only value for this mode.');value=cloneDateValue(value);
  const controller=new AbortController(),signal=controller.signal;
  let active=todayDate(),draftStart=null,touched=false,destroyed=false;
  const host=container.ownerDocument.createElement('div');host.className='sol-date-picker';
  host.innerHTML=`<div class="sol-field"><label class="sol-label" for="${id}-input">${dateEscape(label)}${required?' (필수)':''}</label><div class="sol-date-field"><input class="sol-input" id="${id}-input" type="text" autocomplete="off" spellcheck="false"${required?' required':''} aria-describedby="${id}-help ${id}-error"><button class="sol-button sol-date-open" type="button" data-calendar-open="${id}" aria-haspopup="dialog" aria-controls="${id}-calendar"><svg viewBox="0 0 20 20" aria-hidden="true" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4.5" width="14" height="13" rx="2"/><path d="M6.5 2v5m7-5v5M3 9h14M6 12h2m3 0h3M6 15h2"/></svg></button></div><p class="sol-hint" id="${id}-help"></p><p class="sol-error" id="${id}-error" role="alert" hidden></p><div class="sol-date-summary"><span class="sol-hint" data-date-role="display"></span><button type="button" class="sol-button inline-action" data-date-role="clear">지우기</button></div></div><dialog class="sol-calendar-dialog" id="${id}-calendar" aria-labelledby="${id}-title" aria-describedby="${id}-keys"><div class="sol-calendar-top"><span class="eyebrow" id="${id}-title"></span><button type="button" class="sol-button inline-action" data-date-role="close">닫기 ×</button></div><p class="sol-hint sol-calendar-status" data-date-role="status" role="status" aria-live="polite" aria-atomic="true"></p><div class="sol-calendar-heading"><button type="button" class="sol-button subtle" data-date-role="prev" aria-label="이전 달">‹</button><h3 id="${id}-month" aria-live="polite" aria-atomic="true"></h3><button type="button" class="sol-button subtle" data-date-role="next" aria-label="다음 달">›</button></div><table class="sol-calendar-grid" role="grid" aria-labelledby="${id}-month"><thead><tr>${weekdays.map(day=>`<th scope="col" abbr="${day}요일">${day}</th>`).join('')}</tr></thead><tbody data-date-role="days"></tbody></table><div class="sol-calendar-footer"><button type="button" class="sol-button inline-action" data-date-role="today">오늘로 이동</button><button type="button" class="sol-button inline-action" data-date-role="calendar-clear">선택 지우기</button><span class="sol-hint">● 오늘 · 채움: 양 끝 · 옅은색: 기간</span></div><p class="sol-hint sol-calendar-keys" id="${id}-keys">방향키: 하루·한 주 · Home/End: 주 처음·끝 · PageUp/Down: 월 이동 (Shift: 연도) · Enter/Space: 선택 · Escape: 취소</p></dialog>`;
  container.append(host);
  const $=role=>host.querySelector(`[data-date-role="${role}"]`),input=host.querySelector('input'),dialog=host.querySelector('dialog'),trigger=host.querySelector('[data-calendar-open]');
  const on=(target,type,fn)=>target.addEventListener(type,fn,{signal});
  const format=next=>next===null?'':mode==='single'?next:`${next.start} ~ ${next.end}`;
  function parseText(){
    const text=input.value.trim();if(!text)return {value:null,error:required?'날짜를 선택하거나 입력해 주세요.':''};
    if(mode==='single')return parseDateOnly(text)?{value:text,error:''}:{error:'YYYY-MM-DD 형식의 실제 날짜를 입력해 주세요.'};
    const parts=/^(\d{4}-\d{2}-\d{2})\s*~\s*(\d{4}-\d{2}-\d{2})$/.exec(text);
    if(!parts||!parseDateOnly(parts[1])||!parseDateOnly(parts[2]))return {error:'YYYY-MM-DD ~ YYYY-MM-DD 형식으로 두 실제 날짜를 입력해 주세요.'};
    return parts[1]<=parts[2]?{value:{start:parts[1],end:parts[2]},error:''}:{error:'직접 입력한 종료일은 시작일과 같거나 뒤여야 합니다.'};
  }
  function validation(show=touched){const result=parseText();input.setCustomValidity(result.error);host.querySelector(`#${id}-error`).textContent=result.error;host.querySelector(`#${id}-error`).hidden=!show||!result.error;if(show&&result.error)input.setAttribute('aria-invalid','true');else input.removeAttribute('aria-invalid');return result;}
  function updateField(){
    host.dataset.mode=mode;input.value=format(value);input.maxLength=mode==='single'?10:25;input.placeholder=mode==='single'?'YYYY-MM-DD':'YYYY-MM-DD ~ YYYY-MM-DD';
    host.querySelector(`#${id}-title`).textContent=mode==='single'?'날짜 선택':'기간 선택';
    host.querySelector(`#${id}-help`).textContent=mode==='single'?'YYYY-MM-DD로 직접 입력하고 Enter 또는 입력 밖으로 이동해 확인합니다. 달력에서도 한 날짜를 선택할 수 있습니다.':'YYYY-MM-DD ~ YYYY-MM-DD로 직접 입력합니다. 달력에서는 시작·종료를 차례로 선택하며, 앞선 날짜를 나중에 누르면 순서를 맞춥니다.';
    $('display').textContent=value===null?'확정된 날짜가 없어요.':mode==='single'?`확정: ${koreanDate(parseDateOnly(value))}`:`확정: ${value.start} → ${value.end}`;
    trigger.setAttribute('aria-label',`${label} 달력 열기${value===null?'':`, ${format(value)}`}`);validation(false);
    $('calendar-clear').nextElementSibling.textContent=mode==='single'?'● 오늘 · 채움: 선택일':'● 오늘 · 채움: 양 끝 · 옅은색: 기간';
  }
  function notify(reason){const detail={mode,value:cloneDateValue(value),reason};host.dispatchEvent(new CustomEvent('sol-date-change',{bubbles:true,detail:{...detail,value:cloneDateValue(value)}}));options.onChange?.(detail);}
  function commit(next,reason,{emit=true,close=false}={}){
    if(destroyed)throw new Error('Date picker has been destroyed.');
    const changed=JSON.stringify(value)!==JSON.stringify(next);value=cloneDateValue(next);draftStart=null;touched=false;updateField();
    if(close&&dialog.open)dialog.close();else if(dialog.open)render();if(emit&&changed)notify(reason);
  }
  function commitText(focus=false){touched=true;const result=validation(true);if(result.value===null){commit(null,'input');if(result.error){touched=true;validation(true);if(focus)input.focus();return false;}return true;}if(result.error){if(focus)input.focus();return false;}commit(result.value,'input');return true;}
  function commitValidDraft(){const result=validation();if(result.value===null)commit(null,'input');else if(!result.error)commit(result.value,'input');}
  function selected(){return value===null?null:mode==='single'?{start:value,end:value}:value;}
  function paintDays(){
    const range=draftStart?{start:draftStart,end:draftStart}:selected();const candidate=dateISO(active);const preview=draftStart?{start:[draftStart,candidate].sort()[0],end:[draftStart,candidate].sort()[1]}:null;
    for(const button of host.querySelectorAll('[data-calendar-day]')){const day=button.dataset.calendarDay;const inside=!!range&&range.start<=day&&day<=range.end;const endpoint=!!range&&(day===range.start||day===range.end);button.dataset.range=String(inside);button.dataset.endpoint=String(endpoint);button.dataset.preview=String(!!preview&&preview.start<=day&&day<=preview.end);button.closest('td').setAttribute('aria-selected',String(inside));button.tabIndex=day===candidate?0:-1;
      button.setAttribute('aria-label',`${koreanDate(parseDateOnly(day))}${mode==='single'?(endpoint?', 선택일':''):`${range&&day===range.start?', 시작일':''}${range&&day===range.end?', 종료일':''}`}`);
    }
  }
  function render(){
    host.querySelector(`#${id}-month`).textContent=`${active.y}년 ${active.m}월`;
    host.querySelector('[role="grid"]').setAttribute('aria-multiselectable',String(mode==='range'));
    const first={...active,d:1},offset=weekday(first);let markup='';
    for(let row=0;row<6;row++){markup+='<tr>';for(let col=0;col<7;col++){const delta=row*7+col-offset,date=shiftDay(first,delta),iso=dateISO(date);if((active.y===1&&active.m===1&&delta<0)||(active.y===9999&&active.m===12&&delta>=31)){markup+='<td></td>';continue;}const today=iso===dateISO(todayDate());markup+=`<td><button type="button" class="sol-calendar-day" data-calendar-day="${iso}" data-outside="${date.m!==active.m}"${today?' aria-current="date"':''}>${date.d}${today?'<span class="sol-calendar-dot" aria-hidden="true"></span>':''}</button></td>`;}markup+='</tr>';}
    $('days').innerHTML=markup;paintDays();$('prev').disabled=active.y===1&&active.m===1;$('next').disabled=active.y===9999&&active.m===12;
    $('status').textContent=mode==='single'?'한 날짜를 선택하면 바로 반영합니다.':draftStart?`선택 중: ${draftStart}. 종료일을 선택하세요. 같은 날도 두 번 선택할 수 있습니다.`:'시작일을 선택한 뒤 종료일을 선택하세요. 두 날짜를 모두 고르면 반영합니다.';
  }
  const focusDay=()=>host.querySelector(`[data-calendar-day="${dateISO(active)}"]`)?.focus();
  const move=(next,focus=true)=>{active=next;render();if(focus)focusDay();};
  on(trigger,'click',()=>{commitValidDraft();draftStart=null;const current=selected();active=parseDateOnly(current?.start)||todayDate();render();dialog.showModal();focusDay();});
  on(dialog,'close',()=>{draftStart=null;if(!destroyed&&trigger.isConnected)trigger.focus();});
  on(dialog,'keydown',event=>{if(event.key!=='Tab')return;const stops=[...dialog.querySelectorAll('button:not(:disabled):not([tabindex="-1"])')],first=stops[0],last=stops.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}});
  on($('close'),'click',()=>dialog.close());on($('prev'),'click',()=>move(shiftMonth(active,-1),false));on($('next'),'click',()=>move(shiftMonth(active,1),false));on($('today'),'click',()=>move(todayDate()));
  on($('days'),'click',event=>{const button=event.target.closest('[data-calendar-day]');if(!button)return;const day=button.dataset.calendarDay;active=parseDateOnly(day);if(mode==='single'){commit(day,'calendar',{close:true});return;}if(!draftStart){draftStart=day;render();focusDay();return;}const sorted=[draftStart,day].sort();commit({start:sorted[0],end:sorted[1]},'calendar',{close:true});});
  on($('days'),'keydown',event=>{if(!event.target.matches('[data-calendar-day]')||event.isComposing)return;active=parseDateOnly(event.target.dataset.calendarDay);let next;if(event.key==='ArrowLeft')next=shiftDay(active,-1);else if(event.key==='ArrowRight')next=shiftDay(active,1);else if(event.key==='ArrowUp')next=shiftDay(active,-7);else if(event.key==='ArrowDown')next=shiftDay(active,7);else if(event.key==='Home')next=shiftDay(active,-weekday(active));else if(event.key==='End')next=shiftDay(active,6-weekday(active));else if(event.key==='PageUp')next=shiftMonth(active,event.shiftKey?-12:-1);else if(event.key==='PageDown')next=shiftMonth(active,event.shiftKey?12:1);if(next){event.preventDefault();move(next);}});
  on($('days'),'focusin',event=>{if(event.target.matches('[data-calendar-day]')){active=parseDateOnly(event.target.dataset.calendarDay);paintDays();}});
  on(input,'input',()=>validation());
  // Do not insert a new error row between pointer-down and pointer-up on a following action.
  on(input,'blur',()=>{if(!dialog.open)commitValidDraft();});
  on(input,'invalid',()=>{touched=true;validation(true);});
  on(input,'keydown',event=>{if(event.key==='Enter'&&!event.isComposing){event.preventDefault();commitText(true);}});
  on($('clear'),'click',()=>{commit(null,'clear');input.focus();});on($('calendar-clear'),'click',()=>commit(null,'clear',{close:true}));
  function destroy(){if(destroyed)return;destroyed=true;controller.abort();if(dialog.open)dialog.close();options.signal?.removeEventListener('abort',destroy);host.remove();}
  options.signal?.addEventListener('abort',destroy,{once:true});updateField();if(options.signal?.aborted)destroy();
  return {
    getValue:()=>cloneDateValue(value),getMode:()=>mode,
    validate:()=>commitText(true),clear:()=>commit(null,'clear'),
    setValue(next,{emit=false}={}){if(!validValue(next))throw new TypeError('Invalid date-only value for this mode.');commit(next,'programmatic',{emit});},
    setMode(next){if(destroyed)throw new Error('Date picker has been destroyed.');if(!validMode(next))throw new TypeError('mode must be single or range.');if(next===mode)return;if(dialog.open)dialog.close();mode=next;value=null;draftStart=null;touched=false;updateField();notify('mode');},
    destroy
  };
}

/* Documentation adapter only. Applications use createDatePicker without this mode selector. */
export function renderDateDocs(h){return `<div class="sol-card"><h3>설정 하나, 입력창 하나</h3><ul class="rule-list"><li><code>mode: 'single'</code>은 한 날짜를 선택하고 <code>YYYY-MM-DD</code> 문자열 또는 <code>null</code>을 반환합니다. <code>mode: 'range'</code>는 한 달력에서 두 날짜를 선택하며 <code>{start, end}</code> 또는 <code>null</code>을 반환합니다. 입력에는 <code>YYYY-MM-DD ~ YYYY-MM-DD</code> 한 문자열로 표시합니다.</li><li>기간의 첫 클릭은 임시 시작점입니다. 입력·완료값·change는 그대로 두고 점선으로 탐색 후보 범위를 보여 줍니다. 두 번째 클릭에서 확정하며, 역순 클릭은 앞선 날짜부터 정렬합니다. 같은 날을 두 번 선택할 수 있습니다. 닫기/Escape는 임시 선택을 버리고 기존 값과 입력을 유지합니다.</li><li>유효한 직접 입력은 Enter 또는 입력 밖으로 이동할 때 반영합니다. 잘못된 날짜·미완성 기간·역순 입력은 자동 보정하지 않고 입력과 마지막 완료값을 유지하며 Enter/입력 확인 시 오류를 표시합니다. 폼 제출 전 <code>validate()</code>가 true인지 확인하세요. native 입력 유효성에도 오류를 연결합니다.</li><li>지우기는 <code>null</code>을 내보냅니다. 필수 입력이면 다시 입력해야 제출할 수 있습니다. 모드 전환은 이전 완료값·임시값·입력 오류를 비우고 새 모드의 <code>null</code>을 한 번 알립니다. 임의로 단일 날짜를 기간으로 변환하지 않습니다.</li><li><code>onChange({mode, value, reason})</code> 또는 컨테이너의 <code>sol-date-change</code> 이벤트를 받습니다. 부분 기간과 잘못된 입력은 보내지 않으며 같은 완료값 재선택은 중복 알림을 보내지 않습니다. reason은 calendar/input/clear/mode/programmatic입니다. 초기 값은 change가 아닙니다.</li></ul></div>${h.contract('단일 선택·기간 첫 선택·후보 범위·완료 범위·같은 날·지우기·오류·모드 전환. 선택 의미는 글자·입력값·시작/종료 레이블로도 전달합니다.','날짜 방향키 하루/주, Home/End 주 경계, PageUp/Down 월(Shift 연도), Enter/Space 선택. 달력 안 Tab은 한 날짜와 조작 버튼을 순환하며 Escape는 실행 버튼으로 돌아갑니다.','control-height / button-height / touch-target-min / accent / accent-soft / on-accent / danger / focus')}<p class="demo-usage"><strong>Mobile & reuse</strong> 통합 입력과 달력은 같은 토큰을 사용하고 좁은 화면·터치 포인터에서 44px 목표를 유지합니다. 외부 라이브러리 없이 <a href="./calendar.js" download>calendar.js</a>와 <a href="./components.css" download>components.css</a>를 가져오세요. 앱은 설정된 모드로 바로 렌더링하면 됩니다.</p>${h.codeSample('단일 / 기간 설정과 완료값 사용',`import { createDatePicker } from './calendar.js';\n\nconst picker = createDatePicker(document.querySelector('#schedule'), {\n  id: 'schedule', // 같은 화면에서 고유한 ID\n  mode: 'range', // 또는 'single'\n  label: '일정', required: true,\n  value: { start: '2026-10-21', end: '2026-10-24' },\n  // single의 value: '2026-10-21' 또는 null\n  onChange({ mode, value, reason }) {\n    // range: null 또는 { start, end }. single: null 또는 날짜 문자열\n    // 첫 날짜만 고른 부분 기간과 잘못된 입력은 오지 않습니다.\n  }\n});\nform.addEventListener('submit', event => {\n  event.preventDefault();\n  if (picker.validate()) useValue(picker.getValue());\n});\n// 설정 변경은 값을 비우고 새 모드의 null을 알립니다.\npicker.setMode('single');\npicker.setValue('2026-10-21'); // 기본은 알림 없음. { emit: true }로 알림 가능\npicker.clear(); // null\n// 컨테이너는 sol-date-change 이벤트의 detail로도 같은 출력을 받습니다.\n// 화면 해제 전 picker.destroy(). 선택적으로 options.signal로 해제 연결.`)}`;}
export function renderDateDemo(){return `<form id="extra-range-form" novalidate class="sol-stack"><label class="sol-field"><span class="sol-label">개발 설정 시연 · mode</span><select class="sol-select" id="extra-date-mode" aria-describedby="extra-date-mode-help"><option value="range">range · 기간</option><option value="single">single · 단일 날짜</option></select><span class="sol-hint" id="extra-date-mode-help">이 선택창은 개발 옵션의 시연입니다. 실제 앱에 모드 선택 UI를 둘 필요는 없습니다. 모드를 바꾸면 값을 비웁니다.</span></label><div id="extra-date-mount"></div><div class="button-row sol-actions--commit"><button class="sol-button primary" type="submit">입력 확인</button></div><p id="extra-date-result" role="status" class="small" style="margin:0"></p><div><p class="sol-hint">완료값 / 마지막 change 출력 (가상 데이터)</p><pre id="extra-date-output" class="sol-date-output" role="status" aria-live="polite"></pre></div></form>`;}
export function mountDateDemo(root,signal){
  const form=root.querySelector('#extra-range-form');if(!form)return;const output=root.querySelector('#extra-date-output'),result=root.querySelector('#extra-date-result');
  const picker=createDatePicker(root.querySelector('#extra-date-mount'),{id:'extra',mode:'range',label:'일정',required:true,value:{start:'2026-10-21',end:'2026-10-24'},signal,onChange:detail=>{output.textContent=JSON.stringify(detail,null,2);result.textContent=detail.reason==='mode'?'설정 모드를 바꾸어 이전 값을 비웠어요.':'';}});
  output.textContent=JSON.stringify({mode:picker.getMode(),value:picker.getValue(),reason:'initial'},null,2);
  root.querySelector('#extra-date-mode').addEventListener('change',event=>picker.setMode(event.target.value),{signal});
  form.addEventListener('submit',event=>{event.preventDefault();result.textContent=picker.validate()?`✓ ${picker.getMode()==='single'?'단일 날짜':'기간'} 확인: ${JSON.stringify(picker.getValue())}`:'날짜 입력을 확인해 주세요.';},{signal});
}
