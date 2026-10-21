/* Date-only range and Korean calendar. No parsing through local time zones. */
const weekdays=['일','월','화','수','목','금','토'];
const pad=n=>String(n).padStart(2,'0');
export const dateISO=({y,m,d})=>`${String(y).padStart(4,'0')}-${pad(m)}-${pad(d)}`;
export const monthDays=(y,m)=>[31,(y%4===0&&(y%100!==0||y%400===0))?29:28,31,30,31,30,31,31,30,31,30,31][m-1];
export function parseDateOnly(value){const match=/^(\d{4})-(\d{2})-(\d{2})$/.exec(value);if(!match)return null;const [y,m,d]=match.slice(1).map(Number);return y>=1&&y<=9999&&m>=1&&m<=12&&d>=1&&d<=monthDays(y,m)?{y,m,d}:null;}
const utcDate=value=>{const date=new Date(0);date.setUTCHours(0,0,0,0);date.setUTCFullYear(value.y,value.m-1,value.d);return date;};
export const weekday=value=>utcDate(value).getUTCDay();
export function shiftDay(value,delta){const date=utcDate(value);date.setUTCDate(date.getUTCDate()+delta);const y=date.getUTCFullYear();return y<1?{y:1,m:1,d:1}:y>9999?{y:9999,m:12,d:31}:{y,m:date.getUTCMonth()+1,d:date.getUTCDate()};}
export function shiftMonth(value,delta){const index=Math.max(12,Math.min(9999*12+11,value.y*12+value.m-1+delta));const y=Math.floor(index/12),m=index%12+1;return {y,m,d:Math.min(value.d,monthDays(y,m))};}
const koreanDate=value=>`${value.y}년 ${value.m}월 ${value.d}일 ${weekdays[weekday(value)]}요일`;
const todayDate=()=>{const now=new Date();return {y:now.getFullYear(),m:now.getMonth()+1,d:now.getDate()};};

export function renderDateRange(){
  return `<form id="extra-range-form" novalidate class="sol-stack"><div class="sol-filterbar">${[['start','시작일','2026-10-21'],['end','종료일','2026-10-24']].map(([id,label,value])=>`<div class="sol-field"><label class="sol-label" for="extra-date-${id}">${label} (필수)</label><div class="sol-date-field"><input class="sol-input" id="extra-date-${id}" type="text" inputmode="numeric" maxlength="10" autocomplete="off" spellcheck="false" value="${value}" placeholder="YYYY-MM-DD" required aria-describedby="extra-date-help extra-date-error"><button class="sol-button sol-date-open" type="button" data-calendar-open="${id}" aria-label="${label} 달력 열기" aria-haspopup="dialog" aria-controls="extra-calendar"><svg viewBox="0 0 20 20" aria-hidden="true" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4.5" width="14" height="13" rx="2"/><path d="M6.5 2v5m7-5v5M3 9h14M6 12h2m3 0h3M6 15h2"/></svg><span>선택</span></button></div><span class="sol-hint" id="extra-date-${id}-display"></span></div>`).join('')}</div><p class="sol-hint" id="extra-date-help">YYYY-MM-DD로 직접 입력하거나 달력을 여세요. 종료일은 시작일과 같거나 뒤여야 합니다.</p><p id="extra-date-error" class="sol-error" hidden></p><div class="button-row"><button class="sol-button primary" type="submit">기간 확인</button><button class="sol-button" type="reset">기본 날짜로</button></div><p id="extra-date-result" role="status" class="small" style="margin:0"></p></form><dialog class="sol-calendar-dialog" id="extra-calendar" aria-labelledby="extra-calendar-title" aria-describedby="extra-calendar-keys"><div class="sol-calendar-top"><span class="eyebrow" id="extra-calendar-title">날짜 선택</span><button type="button" class="sol-button inline-action" id="extra-calendar-close">닫기 ×</button></div><div class="sol-calendar-heading"><button type="button" class="sol-button subtle" id="extra-calendar-prev" aria-label="이전 달">‹</button><h3 id="extra-calendar-month" aria-live="polite" aria-atomic="true"></h3><button type="button" class="sol-button subtle" id="extra-calendar-next" aria-label="다음 달">›</button></div><table class="sol-calendar-grid" role="grid" aria-labelledby="extra-calendar-month"><thead><tr>${weekdays.map(day=>`<th scope="col" abbr="${day}요일">${day}</th>`).join('')}</tr></thead><tbody id="extra-calendar-days"></tbody></table><div class="sol-calendar-footer"><button type="button" class="sol-button inline-action" id="extra-calendar-today">오늘로 이동</button><span class="sol-hint">● 오늘 · 채움: 선택일</span></div><p class="sol-hint" id="extra-calendar-keys">방향키: 하루·한 주 · Home/End: 주 처음·끝 · PageUp/Down: 월 이동 (Shift: 연도) · Enter/Space: 선택 · Escape: 취소</p></dialog>`;
}

export function mountDateRange(root,signal){
  const form=root.querySelector('#extra-range-form');if(!form)return;
  const $=selector=>root.querySelector(selector);const on=(target,type,fn)=>target.addEventListener(type,fn,{signal});
  const fields={start:$('#extra-date-start'),end:$('#extra-date-end')};const dialog=$('#extra-calendar');const error=$('#extra-date-error');
  let validated=false,active=todayDate(),target='start',opener;
  const display=()=>{for(const [id,input] of Object.entries(fields)){const value=parseDateOnly(input.value);$(`#extra-date-${id}-display`).textContent=value?koreanDate(value):'유효한 날짜를 입력해 주세요.';const trigger=$(`[data-calendar-open="${id}"]`);trigger.setAttribute('aria-label',`${id==='start'?'시작일':'종료일'} 달력 열기${value?`, ${koreanDate(value)}`:''}`);}};
  const validate=()=>{let invalid=null,message='';for(const [id,input] of Object.entries(fields)){input.removeAttribute('aria-invalid');if(!invalid&&!parseDateOnly(input.value)){invalid=input;message=`${id==='start'?'시작일':'종료일'}을 YYYY-MM-DD 형식의 실제 날짜로 입력해 주세요.`;}}
    if(!invalid&&fields.end.value<fields.start.value){invalid=fields.end;message='종료일은 시작일과 같거나 뒤여야 합니다.';}
    error.textContent=message;error.hidden=!message;invalid?.setAttribute('aria-invalid','true');return invalid;
  };
  const render=()=>{
    $('#extra-calendar-month').textContent=`${active.y}년 ${active.m}월`;
    const first={...active,d:1};const offset=weekday(first);const selected=fields[target].value;const start=fields.start.value,end=fields.end.value;
    let markup='';for(let row=0;row<6;row++){markup+='<tr>';for(let col=0;col<7;col++){const delta=row*7+col-offset;const date=shiftDay(first,delta);const iso=dateISO(date);const outOfBounds=(active.y===1&&active.m===1&&delta<0)||(active.y===9999&&active.m===12&&delta>=31);if(outOfBounds){markup+='<td></td>';continue;}
      const isToday=iso===dateISO(todayDate());const inRange=parseDateOnly(start)&&parseDateOnly(end)&&start<=iso&&iso<=end;
      markup+=`<td aria-selected="${iso===selected}"><button type="button" class="sol-calendar-day" data-calendar-day="${iso}" data-outside="${date.m!==active.m}" data-range="${!!inRange}" tabindex="${iso===dateISO(active)?0:-1}" aria-label="${koreanDate(date)}${iso===selected?', 선택일':''}"${isToday?' aria-current="date"':''}>${date.d}${isToday?'<span class="sol-calendar-dot" aria-hidden="true"></span>':''}</button></td>`;
    }markup+='</tr>';}$('#extra-calendar-days').innerHTML=markup;
    $('#extra-calendar-prev').disabled=active.y===1&&active.m===1;$('#extra-calendar-next').disabled=active.y===9999&&active.m===12;
  };
  const focusDay=()=>$( `[data-calendar-day="${dateISO(active)}"]`)?.focus();
  const move=(value,focus=true)=>{active=value;render();if(focus)focusDay();};
  for(const button of root.querySelectorAll('[data-calendar-open]'))on(button,'click',()=>{opener=button;target=button.dataset.calendarOpen;active=parseDateOnly(fields[target].value)||todayDate();$('#extra-calendar-title').textContent=`${target==='start'?'시작일':'종료일'} 선택`;render();dialog.showModal();focusDay();});
  on(dialog,'close',()=>{if(opener?.isConnected)opener.focus();});
  // Keep Tab at the custom calendar's explicit boundary; native dialog still owns inertness and Escape.
  on(dialog,'keydown',event=>{if(event.key!=='Tab')return;const stops=[...dialog.querySelectorAll('button:not(:disabled):not([tabindex="-1"])')];const first=stops[0],last=stops.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}});
  on($('#extra-calendar-close'),'click',()=>dialog.close());
  on($('#extra-calendar-prev'),'click',()=>move(shiftMonth(active,-1),false));on($('#extra-calendar-next'),'click',()=>move(shiftMonth(active,1),false));
  on($('#extra-calendar-today'),'click',()=>move(todayDate()));
  on($('#extra-calendar-days'),'click',event=>{const button=event.target.closest('[data-calendar-day]');if(!button)return;fields[target].value=button.dataset.calendarDay;fields[target].dispatchEvent(new Event('input',{bubbles:true}));$('#extra-date-result').textContent=`${target==='start'?'시작일':'종료일'}: ${koreanDate(parseDateOnly(fields[target].value))}`;dialog.close();});
  on($('#extra-calendar-days'),'keydown',event=>{if(!event.target.matches('[data-calendar-day]')||event.isComposing)return;active=parseDateOnly(event.target.dataset.calendarDay);let next;
    if(event.key==='ArrowLeft')next=shiftDay(active,-1);else if(event.key==='ArrowRight')next=shiftDay(active,1);else if(event.key==='ArrowUp')next=shiftDay(active,-7);else if(event.key==='ArrowDown')next=shiftDay(active,7);else if(event.key==='Home')next=shiftDay(active,-weekday(active));else if(event.key==='End')next=shiftDay(active,6-weekday(active));else if(event.key==='PageUp')next=shiftMonth(active,event.shiftKey?-12:-1);else if(event.key==='PageDown')next=shiftMonth(active,event.shiftKey?12:1);if(next){event.preventDefault();move(next);}
  });
  // A clicked or programmatically focused day becomes the sole Tab stop without replacing focused DOM.
  on($('#extra-calendar-days'),'focusin',event=>{if(!event.target.matches('[data-calendar-day]'))return;active=parseDateOnly(event.target.dataset.calendarDay);for(const day of root.querySelectorAll('[data-calendar-day]'))day.tabIndex=day===event.target?0:-1;});
  on(form,'input',()=>{display();if(validated)validate();$('#extra-date-result').textContent='';});
  on(form,'submit',event=>{event.preventDefault();validated=true;const invalid=validate();if(invalid){invalid.focus();$('#extra-date-result').textContent='날짜를 확인해 주세요.';}else $('#extra-date-result').textContent=`✓ 가상 기간: ${fields.start.value} → ${fields.end.value}. 시간대 변환 없이 확인했습니다.`;});
  on(form,'reset',()=>{validated=false;error.hidden=true;error.textContent='';for(const input of Object.values(fields))input.removeAttribute('aria-invalid');queueMicrotask(()=>{if(!signal.aborted){display();$('#extra-date-result').textContent='기본 가상 날짜로 되돌렸어요.';fields.start.focus();}});});
  signal.addEventListener('abort',()=>{opener=null;if(dialog.open)dialog.close();},{once:true});display();
}
