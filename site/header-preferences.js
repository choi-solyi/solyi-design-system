/* Native radio groups share the existing preference state and token palettes. */
import {containShellDialogTab} from './shell-dialog.js';
export function mountHeaderPreferences({themes,getState,apply,toggleMode}){
 const panel=document.querySelector('#appearance-dialog'),trigger=document.querySelector('#appearance-open'),inline=document.querySelector('#appearance-inline'),mode=panel.querySelector('#appearance-mode-toggle'),media=matchMedia('(max-width: 1100px)'),controller=new AbortController(),signal=controller.signal;
 const selectedTheme=root=>root.querySelector('[data-pref-theme]:checked');
 for(const key of ['theme','density'])for(const group of document.querySelectorAll(`[data-pref-${key}-group]`)){
  const options=group.querySelector('.appearance-options'),entries=key==='theme'?Object.entries(themes).map(([value,t])=>[value,t.label,t.label.split(' ').at(-1)]):[['comfortable','기본','기본'],['compact','컴팩트','컴팩트']];
  for(const [value,name,short]of entries){const label=document.createElement('label'),input=document.createElement('input'),face=document.createElement('span'),text=document.createElement('span'),check=document.createElement('span');label.className='appearance-choice-label';input.type='radio';input.name=group.dataset.prefName;input.value=value;input.dataset['pref'+(key==='theme'?'Theme':'Density')]=value;input.setAttribute('aria-label',name);face.className='appearance-choice-face';text.className='appearance-choice-name';text.textContent=short;check.className='appearance-choice-check';check.setAttribute('aria-hidden','true');check.textContent='✓';if(key==='theme'){const swatch=document.createElement('span');swatch.className='appearance-swatch';swatch.setAttribute('aria-hidden','true');face.append(swatch);}face.append(text,check);label.append(input,face);options.append(label);input.addEventListener('change',()=>{if(input.checked)apply({[key]:input.value});},{signal});}
 }
 const themeInputs=Array.from(document.querySelectorAll('[data-pref-theme]')),densityInputs=Array.from(document.querySelectorAll('[data-pref-density]'));
 function sync(){const s=getState();for(const input of themeInputs){input.checked=input.value===s.theme;const colors=themes[input.value][s.mode];for(const [key,role]of [['accent','accent'],['soft','accent-soft'],['ink','text']])input.parentElement.style.setProperty('--pref-'+key,colors[role]);}densityInputs.forEach(e=>e.checked=e.value===s.density);mode.textContent=s.mode==='dark'?'라이트 모드로 전환':'다크 모드로 전환';mode.setAttribute('aria-label',`현재 ${s.mode==='dark'?'다크':'라이트'} 모드. ${mode.textContent}`);}
 mode.addEventListener('click',toggleMode,{signal});trigger.addEventListener('click',()=>{if(typeof panel.showModal==='function'){sync();panel.showModal();selectedTheme(panel)?.focus();}},{signal});
 panel.querySelector('#appearance-close').addEventListener('click',()=>panel.close(),{signal});
 panel.addEventListener('keydown',e=>containShellDialogTab(e,panel),{signal});
 panel.addEventListener('close',()=>{(media.matches?trigger:selectedTheme(inline))?.focus();},{signal});
 media.addEventListener('change',()=>{if(!media.matches&&panel.open)panel.close();},{signal});
 sync();return{sync,cleanup(){controller.abort();if(panel.open)panel.close();}};
}
