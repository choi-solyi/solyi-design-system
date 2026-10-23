/* Native controls shared by the document header and the Vue starter wrapper. */
function appearanceIcon(name){
 const paths={moon:'M20.8 14.5A9 9 0 0 1 9.5 3.2 9 9 0 1 0 20.8 14.5Z',sun:'M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8ZM12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5',swap:'M4 8h15m-4-4 4 4-4 4M20 16H5m4-4-4 4 4 4'};
 return `<svg class="sol-icon appearance-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" focusable="false" aria-hidden="true"><path d="${paths[name]}"></path></svg>`;
}
export function mountAppearanceControls(scope,{themes,getState,apply,toggleMode}){
 const doc=scope.ownerDocument||scope,controller=new doc.defaultView.AbortController(),signal=controller.signal;
 const themeInputs=[],densityButtons=Array.from(scope.querySelectorAll('[data-pref-density-toggle]'));
 const modeButtons=Array.from(scope.querySelectorAll('[data-pref-mode-toggle],#mode-toggle,#appearance-mode-toggle'));
 for(const group of scope.querySelectorAll('[data-pref-theme-group]')){
  const options=group.querySelector('.appearance-options');
  for(const [value,theme]of Object.entries(themes)){
   const label=doc.createElement('label'),input=doc.createElement('input'),face=doc.createElement('span'),text=doc.createElement('span'),check=doc.createElement('span'),swatch=doc.createElement('span');
   label.className='appearance-choice-label';input.type='radio';input.name=group.dataset.prefName;input.value=value;input.dataset.prefTheme=value;input.setAttribute('aria-label',theme.label);
   face.className='appearance-choice-face';text.className='appearance-choice-name';text.textContent=theme.label.split(' ').at(-1);check.className='appearance-choice-check';check.setAttribute('aria-hidden','true');check.textContent='✓';swatch.className='appearance-swatch';swatch.setAttribute('aria-hidden','true');face.append(swatch,text,check);label.append(input,face);options.append(label);themeInputs.push(input);
   // A label's native activation focuses the clipped radio with scrolling before
   // change fires. Keep native radio/change semantics, but own that focus step.
   label.addEventListener('click',event=>{
    if(event.target===input)return;
    event.preventDefault();input.focus({preventScroll:true});input.click();
   },{signal});
   input.addEventListener('change',()=>{if(input.checked)apply({theme:input.value});},{signal});
  }
  group.addEventListener('keydown',event=>{
   if(event.altKey||event.ctrlKey||event.metaKey||event.shiftKey||!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(event.key))return;
   const inputs=Array.from(group.querySelectorAll('[data-pref-theme]')).filter(input=>!input.disabled),index=inputs.indexOf(event.target);
   if(index<0||!inputs.length)return;
   const rtl=doc.defaultView.getComputedStyle(group).direction==='rtl';
   const previous=event.key==='ArrowUp'||event.key===(rtl?'ArrowRight':'ArrowLeft');
   const next=event.key==='Home'?0:event.key==='End'?inputs.length-1:(index+(previous?-1:1)+inputs.length)%inputs.length;
   event.preventDefault();inputs[next].focus({preventScroll:true});inputs[next].click();
  },{signal});
 }
 function sync(){
  const state=getState();
  for(const input of themeInputs){input.checked=input.value===state.theme;const colors=themes[input.value][state.mode];for(const [key,role]of [['accent','accent'],['soft','accent-soft'],['ink','text']])input.parentElement.style.setProperty('--pref-'+key,colors[role]);}
  for(const button of densityButtons){
   const compact=state.density==='compact',current=compact?'컴팩트':'기본',next=compact?'기본':'컴팩트';
   button.dataset.density=state.density;button.setAttribute('aria-pressed',String(compact));button.setAttribute('aria-label','기본 · 컴팩트 밀도');
   button.setAttribute('title',`현재 ${current} 밀도. ${next}으로 전환`);button.setAttribute('aria-describedby',button.id+'-state');
   button.innerHTML=appearanceIcon('swap')+`<span>${current}</span><span id="${button.id}-state" class="appearance-sr-only">현재 ${current} 밀도. ${next}으로 전환</span>`;
  }
  for(const button of modeButtons){
   const dark=state.mode==='dark';button.dataset.modeTarget=dark?'light':'dark';button.classList.add('appearance-mode');button.removeAttribute('aria-pressed');
   button.setAttribute('aria-label',dark?'Light · 현재 다크 모드. 라이트 모드로 전환':'Dark · 현재 라이트 모드. 다크 모드로 전환');
   button.innerHTML=appearanceIcon(dark?'sun':'moon')+`<span>${dark?'Light':'Dark'}</span>`;
   button.style.setProperty('--appearance-dark-background',themes.violet.light.text);button.style.setProperty('--appearance-dark-foreground',themes.violet.light.surface);button.style.setProperty('--appearance-dark-hover',themes.violet.dark['surface-alt']);
  }
 }
 for(const button of densityButtons)button.addEventListener('click',()=>apply({density:getState().density==='compact'?'comfortable':'compact'}),{signal});
 for(const button of modeButtons)button.addEventListener('click',()=>toggleMode?toggleMode():apply({mode:getState().mode==='dark'?'light':'dark'}),{signal});
 sync();return{sync,cleanup(){controller.abort();for(const input of themeInputs)input.parentElement.remove();}};
}
