/* Header controls share the existing appearance state; no document re-render is needed. */
import {containShellDialogTab} from './shell-dialog.js';
import {mountAppearanceControls} from './appearance-controls.js';

export function mountHeaderPreferences({themes,getState,apply,toggleMode}){
 const panel=document.querySelector('#appearance-dialog'),trigger=document.querySelector('#appearance-open'),inline=document.querySelector('#appearance-inline'),media=matchMedia('(max-width: 1100px)'),controller=new AbortController(),signal=controller.signal;
 const controls=mountAppearanceControls(document,{themes,getState,apply,toggleMode});
 const selectedTheme=root=>root.querySelector('[data-pref-theme]:checked');
 trigger.addEventListener('click',()=>{if(typeof panel.showModal==='function'){controls.sync();panel.showModal();selectedTheme(panel)?.focus();}},{signal});
 panel.querySelector('#appearance-close').addEventListener('click',()=>panel.close(),{signal});
 panel.addEventListener('keydown',event=>containShellDialogTab(event,panel),{signal});
 panel.addEventListener('close',()=>{(media.matches?trigger:selectedTheme(inline))?.focus();},{signal});
 media.addEventListener('change',()=>{if(!media.matches&&panel.open)panel.close();},{signal});
 return{sync:controls.sync,cleanup(){controller.abort();if(panel.open)panel.close();controls.cleanup();}};
}