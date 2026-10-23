/* Only appearance preferences are persisted. Example inputs remain in memory. */
export const appearanceStorageKey='solyi-ds-prefs';
export function resolveAppearance(options={}){
 let saved={};
 try{saved=JSON.parse((options.storage??globalThis.localStorage)?.getItem(appearanceStorageKey)||'{}')||{};}catch{}
 const search=new URLSearchParams(options.search??globalThis.location?.search??'');
 const dark=options.prefersDark??globalThis.matchMedia?.('(prefers-color-scheme: dark)').matches??false;
 const allowed={theme:['violet','sage','sand'],mode:['light','dark'],density:['comfortable','compact']};
 const state={theme:'violet',mode:dark?'dark':'light',density:'comfortable'};
 for(const key of Object.keys(allowed)){
  if(allowed[key].includes(saved[key]))state[key]=saved[key];
  if(allowed[key].includes(search.get(key)))state[key]=search.get(key);
 }
 return state;
}
export function persistAppearance(state,options={}){
 try{(options.storage??globalThis.localStorage)?.setItem(appearanceStorageKey,JSON.stringify({theme:state.theme,mode:state.mode,density:state.density}));return true;}catch{return false;}
}
