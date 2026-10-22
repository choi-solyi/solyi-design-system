/* One existing preference state; this module only connects header controls. */
import {containShellDialogTab} from './shell-dialog.js';
export function mountHeaderPreferences({themes,getState,apply,toggleMode}){
 const panel=document.querySelector('#appearance-dialog'),trigger=document.querySelector('#appearance-open'),inline=document.querySelector('#appearance-inline'),mode=panel.querySelector('#appearance-mode-toggle'),media=matchMedia('(max-width: 1100px)'),controller=new AbortController(),signal=controller.signal;
 const themeInputs=Array.from(document.querySelectorAll('[data-pref-theme]')),densityInputs=Array.from(document.querySelectorAll('[data-pref-density]'));
 for(const select of themeInputs)for(const [value,theme]of Object.entries(themes)){const option=document.createElement('option');option.value=value;option.textContent=theme.label;select.append(option);}
 function sync(){const s=getState();themeInputs.forEach(e=>e.value=s.theme);densityInputs.forEach(e=>e.value=s.density);mode.textContent=s.mode==='dark'?'라이트 모드로 전환':'다크 모드로 전환';mode.setAttribute('aria-label',`현재 ${s.mode==='dark'?'다크':'라이트'} 모드. ${mode.textContent}`);}
 themeInputs.forEach(e=>e.addEventListener('change',()=>apply({theme:e.value}),{signal}));densityInputs.forEach(e=>e.addEventListener('change',()=>apply({density:e.value}),{signal}));
 mode.addEventListener('click',toggleMode,{signal});trigger.addEventListener('click',()=>{if(typeof panel.showModal==='function'){sync();panel.showModal();themeInputs.find(e=>panel.contains(e))?.focus();}},{signal});
 panel.querySelector('#appearance-close').addEventListener('click',()=>panel.close(),{signal});
 panel.addEventListener('keydown',e=>containShellDialogTab(e,panel),{signal});
 panel.addEventListener('close',()=>{(media.matches?trigger:themeInputs.find(e=>inline.contains(e)))?.focus();},{signal});
 media.addEventListener('change',()=>{if(!media.matches&&panel.open)panel.close();},{signal});
 sync();return{sync,cleanup(){controller.abort();if(panel.open)panel.close();}};
}
