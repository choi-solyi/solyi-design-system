/* Finite, user-triggered motion. State is committed before effects and never by completion callbacks. */
const goalState=[true,false,false];
const running=new Map();
const reducedQuery=typeof matchMedia==='function'?matchMedia('(prefers-reduced-motion: reduce)'):null;
let requestedReduction=false;
export const prefersLessMotion=()=>!reducedQuery||reducedQuery.matches||requestedReduction;
const token=(element,name)=>(getComputedStyle(element).getPropertyValue(`--sol-${name}`)||getComputedStyle(document.documentElement).getPropertyValue(`--sol-${name}`)).trim();
const duration=(element,name)=>{const value=token(element,name);return Number.parseFloat(value)*(value.endsWith('ms')?1:1000)||0;};
function stop(element){const animation=running.get(element);if(animation){animation.cancel();running.delete(element);}}
export function cancelMotions(){for(const element of [...running.keys()])stop(element);document.getAnimations?.().forEach(animation=>animation.cancel());}
function syncPolicy(){document.documentElement.dataset.motionPolicy=prefersLessMotion()?'reduced':'standard';document.documentElement.dataset.motionPaused=String(document.hidden);const note=document.querySelector('#motion-policy-note');if(note)note.textContent=reducedQuery?.matches?'현재 시스템: 모션 줄이기. 이동·반복 효과를 실행하지 않습니다.':requestedReduction?'현재 문서: 모션 줄이기. 상태는 즉시 반영됩니다.':'현재 시스템: 기본 모션. 직접 실행한 요소만 짧게 움직입니다.';}
function play(element,keyframes,kind='motion-duration-state'){
  if(!element)return;stop(element);
  if(prefersLessMotion()||document.hidden||typeof element.animate!=='function')return;
  const milliseconds=duration(element,kind);if(!milliseconds)return;
  const animation=element.animate(keyframes,{duration:milliseconds,easing:token(element,'motion-easing-standard')||'linear',iterations:1,fill:'none'});
  running.set(element,animation);
  const release=()=>{if(running.get(element)===animation)running.delete(element);};
  animation.onfinish=release;animation.oncancel=release;
}
reducedQuery?.addEventListener?.('change',()=>{cancelMotions();syncPolicy();});
document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelMotions();syncPolicy();});
syncPolicy();

export function renderGoalSpecimen(){
  return `<div class="specimen goal-specimen"><div class="specimen-head"><span class="eyebrow">YOUR NEXT SMALL STEP</span><span class="sol-status goal-status" id="goal-status">◷ 진행 중</span></div><h2>한 주의 작업</h2><p>해야 할 일이 선명하면, 화면은 차분해집니다.</p><div role="group" aria-labelledby="goal-label"><div class="row-between small"><span id="goal-label">이번 주의 작은 목표</span><span id="task-count" class="muted">1 / 3</span></div><progress class="sol-progress" id="task-progress" max="3" value="1" aria-label="완료한 목표"></progress>${['기본 규칙 정리하기','작은 화면에서 살펴보기','하나의 앱에 적용해 보기'].map((label,index)=>`<div class="specimen-task" data-goal-row><label class="sol-choice"><input type="checkbox" data-task ${goalState[index]?'checked':''}><span class="goal-copy">${label}</span></label><span class="goal-marker" aria-hidden="true">${String(index+1).padStart(2,'0')}</span></div>`).join('')}<p id="goal-feedback" class="sol-hint goal-feedback" role="status" aria-live="polite" aria-atomic="true"></p></div><button class="sol-button primary" data-action="overview-save">변경 저장</button><p id="overview-feedback" class="feedback-space" role="status"></p></div>`;
}
function bindGoals(root,signal){
  const inputs=[...root.querySelectorAll('[data-task]')];if(!inputs.length)return;
  const update=(changed=-1)=>{
    inputs.forEach((input,index)=>{input.checked=goalState[index];const row=input.closest('[data-goal-row]');row.dataset.complete=String(input.checked);row.querySelector('.goal-marker').textContent=input.checked?'✓':String(index+1).padStart(2,'0');});
    const count=goalState.filter(Boolean).length;const all=count===goalState.length;
    root.querySelector('#task-count').textContent=`${count} / ${goalState.length}`;root.querySelector('#task-progress').value=count;
    const status=root.querySelector('#goal-status');status.textContent=all?'✓ 완료':'◷ 진행 중';status.classList.toggle('success',all);
    const feedback=root.querySelector('#goal-feedback');feedback.textContent=all?'✓ 세 목표를 모두 마쳤어요.':`${count}/3개 목표 완료. ${changed>=0&&!goalState[changed]?'체크를 해제했어요.':'작은 한 걸음씩 이어가요.'}`;
    stop(status);stop(feedback);
    if(changed>=0){const row=inputs[changed].closest('[data-goal-row]');const distance=Number.parseFloat(token(row,'motion-distance-small'))||0;
      play(row.querySelector('.goal-marker'),[{opacity:.45,transform:`translateY(${distance/2}px)`},{opacity:1,transform:'translateY(0)'}]);
      if(all)play(status,[{opacity:.55},{opacity:1}]);
    }
  };
  inputs.forEach((input,index)=>input.addEventListener('change',()=>{goalState[index]=input.checked;update(index);},{signal}));update();
}

export function renderMotionSection(h){
  return h.section('motion','Motion','상태를 알아차리게 하는 짧은 변화',`<div class="sol-card"><ul class="rule-list"><li>모션은 사용자가 직접 바꾼 곳에만 적용합니다. 목표 체크는 즉시 반영하고, 체크 표시와 완료 안내만 짧게 강조합니다. 진입 시 화면 전체를 순서대로 움직이지 않습니다.</li><li>상태의 최종 값·텍스트·아이콘은 애니메이션 완료와 관계없이 유지합니다. 빠르게 취소·다시 실행하면 이전 효과를 취소하고 최신 상태를 표시합니다.</li><li>페이지·탭 이동과 모션 줄이기 설정 변경 시 진행 중 효과를 취소합니다. 돌아왔을 때 자동으로 재생하지 않습니다. 목표 체크는 현재 탭의 문서 이동에서 유지되고 새로고침 시 초기화됩니다.</li><li>크기나 높이를 보간하지 않습니다. 카드 데모는 자리를 미리 확보하고, 아코디언은 native 열기·닫기를 즉시 반영한 뒤 내용만 짧게 나타냅니다. 패널도 위치를 흔들지 않고 불투명도만 바꿉니다.</li><li>기본 피드백과 스켈레톤 강조는 짧게 끝냅니다. 진행률을 모르는 처리 중 표시는 Progress의 animated 옵션으로 기다리는 동안만 반복할 수 있습니다. 움직임 줄이기에서는 정적인 띠·호와 텍스트를 유지합니다. 번쩍임·큰 확대·강제 지연은 사용하지 않습니다.</li></ul></div><table class="spec-table" style="margin-top:20px"><caption>공유 CSS·JSON 모션 토큰</caption><thead><tr><th scope="col">토큰</th><th scope="col">값</th><th scope="col">용도</th></tr></thead><tbody><tr><th scope="row"><code>motion-fast</code></th><td>${h.tokens.base["motion-fast"]}</td><td>기존 hover의 색·경계 전환</td></tr><tr><th scope="row"><code>motion-duration-state</code></th><td>${h.tokens.base["motion-duration-state"]}</td><td>체크 표시·완료 안내·펼친 내용</td></tr><tr><th scope="row"><code>motion-duration-enter</code></th><td>${h.tokens.base["motion-duration-enter"]}</td><td>직접 요청한 카드·패널의 진입</td></tr><tr><th scope="row"><code>motion-duration-loading</code></th><td>${h.tokens.base["motion-duration-loading"]} × 1회</td><td>처리 시작을 알리는 짧은 표시</td></tr><tr><th scope="row"><code>motion-duration-indeterminate</code></th><td>${h.tokens.base["motion-duration-indeterminate"]} · 반복</td><td>알 수 없는 진행률의 대기 표시. 축소 모션에서는 정적</td></tr><tr><th scope="row"><code>motion-easing-standard</code></th><td>${h.tokens.base["motion-easing-standard"]}</td><td>빠르게 반응하고 차분하게 멈춤</td></tr><tr><th scope="row"><code>motion-easing-linear</code></th><td>${h.tokens.base["motion-easing-linear"]}</td><td>한 번의 균일한 회전</td></tr><tr><th scope="row"><code>motion-distance-small</code></th><td>${h.tokens.base["motion-distance-small"]} 이하</td><td>비대화형 카드·체크 표시의 작은 이동</td></tr></tbody></table>${h.demo('Explicit replay / Reserved space',`<div class="sol-stack"><p id="motion-policy-note" class="sol-hint" role="status"></p><label class="sol-choice"><input type="checkbox" id="motion-preview-reduce">이 문서에서 모션 더 줄이기</label><p class="sol-hint">시스템의 줄이기 요청은 이 체크를 해제해도 유지됩니다.</p><div class="button-row"><button class="sol-button" id="motion-card-play" type="button">카드 보이기 / 다시 보기</button><button class="sol-button subtle" id="motion-card-reset" type="button">즉시 되돌리기</button></div><div class="sol-motion-stage"><p class="small muted" id="motion-card-placeholder">버튼을 누르면 이 자리에서 카드가 나타납니다.</p><article class="sol-card" id="motion-demo-card" hidden><h3>작은 기록 한 장</h3><p class="small muted">새 정보를 알아차릴 만큼만 나타납니다. 입력과 탐색을 기다리게 하지 않습니다.</p></article></div><p id="motion-demo-status" class="sol-hint motion-demo-status" role="status">카드를 아직 표시하지 않았어요.</p></div>`)}<p class="demo-usage"><strong>Keyboard & reduce</strong> 버튼은 Enter/Space로 즉시 실행합니다. 포커스와 조작 영역은 움직이지 않습니다. <code>prefers-reduced-motion: reduce</code>에서는 이동·확대·반복·전환을 제거하고 같은 최종 상태를 즉시 표시합니다.</p><p class="small muted">재사용: CSS는 <a href="./components.css" download>components.css</a>, 상태와 유한 효과 연결은 <a href="./motion.js" download>motion.js</a>를 참고하세요. <code>mountMotion(root)</code>의 반환 정리 함수를 화면을 바꾸기 전에 호출합니다. 애니메이션의 finish 콜백으로 데이터를 저장하거나 입력을 잠그지 않습니다.</p>${h.codeSample('상태와 효과를 분리하는 기본 원칙',`// 상태를 먼저 반영합니다.\ncheckbox.checked = state.done;\nstatus.textContent = state.done ? '✓ 완료' : '진행 중';\n// 이전 효과를 취소한 뒤, 사용자 설정이 허용할 때만 한 번 실행합니다.\npreviousAnimation?.cancel();\nif (!matchMedia('(prefers-reduced-motion: reduce)').matches) {\n  previousAnimation = label.animate(\n    [{ opacity: .55 }, { opacity: 1 }],\n    { duration: 160, easing: 'cubic-bezier(.2,0,0,1)', iterations: 1 }\n  );\n}\n// 실제 데모는 CSS 토큰의 duration/easing을 읽습니다.\n// finish 이벤트에서는 데이터·체크 상태·포커스를 바꾸지 않습니다.`)}`);
}

export function mountMotion(root){
  const controller=new AbortController();const signal=controller.signal;syncPolicy();bindGoals(root,signal);
  const reduction=root.querySelector('#motion-preview-reduce');if(reduction){reduction.checked=requestedReduction;reduction.addEventListener('change',()=>{requestedReduction=reduction.checked;cancelMotions();syncPolicy();},{signal});}
  const card=root.querySelector('#motion-demo-card');const placeholder=root.querySelector('#motion-card-placeholder');const demoStatus=root.querySelector('#motion-demo-status');
  root.querySelector('#motion-card-play')?.addEventListener('click',()=>{card.hidden=false;placeholder.hidden=true;demoStatus.textContent=prefersLessMotion()?'✓ 카드 표시. 모션 줄이기를 적용했어요.':'✓ 카드 표시. 짧은 등장 효과를 재생했어요.';const distance=Number.parseFloat(token(card,'motion-distance-small'))||0;play(card,[{opacity:.55,transform:`translateY(${distance}px)`},{opacity:1,transform:'translateY(0)'}],'motion-duration-enter');},{signal});
  root.querySelector('#motion-card-reset')?.addEventListener('click',()=>{stop(card);card.hidden=true;placeholder.hidden=false;demoStatus.textContent='카드를 즉시 숨겼어요. 다시 표시할 수 있습니다.';},{signal});
  root.addEventListener('toggle',event=>{if(event.target.matches('details.sol-accordion')){const content=event.target.querySelector('.sol-accordion-content');if(event.target.open)play(content,[{opacity:.55},{opacity:1}]);else stop(content);}},{capture:true,signal});
  root.addEventListener('click',event=>{const trigger=event.target.closest('[data-extra="panel-open"],[data-calendar-open]');const panel=root.querySelector(trigger?.hasAttribute('data-calendar-open')?'#extra-calendar':'#extra-panel');if(trigger&&panel?.open)play(panel,[{opacity:.65},{opacity:1}],'motion-duration-enter');},{signal});
  root.addEventListener('close',event=>{if(event.target.matches('dialog'))stop(event.target);},{capture:true,signal});
  return ()=>{controller.abort();cancelMotions();};
}
