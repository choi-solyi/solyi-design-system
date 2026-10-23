import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {JSDOM,VirtualConsole} from 'jsdom';
import {mountHeaderPreferences} from '../site/header-preferences.js';
import {siteFiles,moduleOrder} from './site-manifest.mjs';
const root=new URL('../',import.meta.url),read=path=>readFile(new URL(path,root),'utf8'),tokens=JSON.parse(await read('tokens.json'));
const css=(await read('site/docs.css'))+'\n'+await read('site/header-preferences.css');
const html=await read('site/index.html');
const dom=new JSDOM(html,{url:'https://example.test/solyi-design-system/'}),w=dom.window,d=w.document;
const media=new w.EventTarget();media.matches=false;
w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;this.dispatchEvent(new w.Event('close'));};
globalThis.document=d;globalThis.AbortController=w.AbortController;globalThis.matchMedia=()=>media;
let header;header=mountHeaderPreferences({themes:tokens.themes,getState:()=>d.documentElement.dataset,apply:next=>{Object.assign(d.documentElement.dataset,next);header.sync();},toggleMode(){d.documentElement.dataset.mode=d.documentElement.dataset.mode==='dark'?'light':'dark';header.sync();}});
assert.equal(d.querySelectorAll('#appearance-inline select,#appearance-dialog select').length,0);
assert.equal(d.querySelectorAll('[data-pref-theme]').length,6);assert.equal(d.querySelectorAll('[data-pref-density]').length,0);assert.equal(d.querySelectorAll('[data-pref-density-toggle]').length,2);
for(const container of ['#appearance-inline','#appearance-dialog']){assert.equal(d.querySelectorAll(container+' [data-pref-theme]:checked').length,1);assert.equal(d.querySelectorAll(container+' [data-pref-density-toggle]').length,1);}
for(const mode of ['light','dark']){d.documentElement.dataset.mode=mode;header.sync();for(const input of d.querySelectorAll('[data-pref-theme]')){const colors=tokens.themes[input.value][mode],style=input.parentElement.style;assert.equal(style.getPropertyValue('--pref-accent'),colors.accent);assert.equal(style.getPropertyValue('--pref-soft'),colors['accent-soft']);assert.equal(style.getPropertyValue('--pref-ink'),colors.text);assert.equal(input.getAttribute('aria-label'),tokens.themes[input.value].label);assert.equal(input.type,'radio');}for(const button of d.querySelectorAll('.appearance-mode')){assert.ok(button.querySelector('svg[aria-hidden=true]'));assert.equal(button.dataset.modeTarget,mode==='light'?'dark':'light');assert.equal(button.querySelector('span').textContent,mode==='light'?'Dark':'Light');assert.ok(button.getAttribute('aria-label').includes(button.querySelector('span').textContent),'Visible mode action is included in accessible name');}}
assert.notEqual(d.querySelector('#appearance-inline [data-pref-theme]').name,d.querySelector('#appearance-dialog [data-pref-theme]').name);
d.documentElement.dataset.density='comfortable';header.sync();d.querySelector('#header-density-toggle').click();assert.equal(d.documentElement.dataset.density,'compact');for(const button of d.querySelectorAll('[data-pref-density-toggle]')){assert.equal(button.getAttribute('aria-pressed'),'true');assert.match(button.textContent,/컴팩트/);assert.ok(button.getAttribute('aria-label').includes(button.querySelector('span').textContent),'Visible density label is included in accessible name');assert.ok(d.getElementById(button.getAttribute('aria-describedby')));}
d.querySelector('#panel-density-toggle').click();assert.equal(d.documentElement.dataset.density,'comfortable');assert.equal(d.querySelector('#header-density-toggle').getAttribute('aria-pressed'),'false');
d.documentElement.dataset.mode='light';header.sync();d.querySelector('#mode-toggle').click();assert.equal(d.documentElement.dataset.mode,'dark','One click toggles once');d.querySelector('#appearance-mode-toggle').click();assert.equal(d.documentElement.dataset.mode,'light');
media.matches=true;d.querySelector('#appearance-open').click();assert.equal(d.querySelector('#appearance-dialog').open,true);assert.equal(d.activeElement,d.querySelector('#appearance-dialog [data-pref-theme]:checked'));d.querySelector('#appearance-close').click();assert.equal(d.activeElement.id,'appearance-open');
const lum=hex=>hex.slice(1).match(/../g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4).reduce((s,x,i)=>s+x*[.2126,.7152,.0722][i],0),ratio=(a,b)=>(Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05);let checks=0;
for(const current of Object.values(tokens.themes))for(const candidate of Object.values(tokens.themes))for(const mode of ['light','dark']){const a=current[mode],b=candidate[mode];for(const [fg,bg,min]of [[b.text,b['accent-soft'],4.5],[b.accent,b['accent-soft'],4.5],[a.focus,b['accent-soft'],3],[a['control-border'],b['accent-soft'],3]]){assert.ok(ratio(fg,bg)>=min);checks++;}}
const neutral=tokens.themes.violet;for(const background of [neutral.light.text,neutral.dark['surface-alt']]){assert.ok(ratio(neutral.light.surface,background)>=4.5,'Dark-action ink/default and hover neutral contrast');checks++;}
for(const theme of Object.values(tokens.themes))for(const mode of ['light','dark'])assert.ok(ratio(theme[mode].focus,theme[mode].canvas)>=3,'Outside header focus outline contrast');
assert.match(css,/input:focus-visible\+\.appearance-choice-face[^}]*outline:2px/);assert.match(css,/input:checked\+\.appearance-choice-face[^}]*box-shadow:inset/);assert.match(css,/\.appearance-choice-check\s*\{visibility:hidden;width:12px/);assert.match(css,/\.appearance-choice-face[^}]*min-height:var\(--sol-button-height\)/);assert.match(css,/\.appearance-density-toggle:focus-visible[^}]*outline:2px/);assert.match(html,/href="\.\/header-preferences\.css"/);assert.ok(siteFiles.includes('header-preferences.css'),'New document-only stylesheet is in the build copy allowlist');
header.cleanup();dom.window.close();

// Exercise the actual app source without rebuilding packages or replacing the document.
const strip=source=>source.replace(/^import .* from '\.\/[\w-]+\.js';\r?\n/gm,'').replace(/^export const /gm,'var ').replace(/^export /gm,'');
const errors=[],virtual=new VirtualConsole();virtual.on('jsdomError',error=>errors.push(error.message));
const appDom=new JSDOM(html,{url:'https://example.test/solyi-design-system/#component/sbtn-api',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:virtual}),aw=appDom.window,ad=aw.document;
let x=0,y=640;Object.defineProperty(aw,'scrollX',{get:()=>x});Object.defineProperty(aw,'scrollY',{get:()=>y});aw.scrollTo=position=>{x=position.left??x;y=position.top??y;};aw.HTMLElement.prototype.scrollIntoView=()=>{};aw.matchMedia=()=>{const media=new aw.EventTarget();media.matches=false;return media;};
aw.HTMLDialogElement.prototype.showModal=function(){this.open=true;this.querySelector('[autofocus]')?.focus();};aw.HTMLDialogElement.prototype.close=function(){this.open=false;this.dispatchEvent(new aw.Event('close'));};
for(const name of moduleOrder){let source;try{source=await read('site/'+name+'.js');}catch{source=await read('docs/'+name+'.js');}aw.eval(strip(source));}
aw.mountVuePreviews=()=>()=>{};
const app=strip((await read('site/app.js')).replace("import tokens from './token-data.js';",`const tokens=${JSON.stringify(tokens)};`));aw.eval(app+'\nwindow.__applyAppearance=applyPreferences;');
await new Promise(resolve=>setTimeout(resolve,30));
const apiTab=ad.querySelector('#sbtn-api-tab');assert.ok(apiTab,'Actual SBtn API tab is present');apiTab.click();await new Promise(resolve=>setTimeout(resolve,30));assert.equal(apiTab.getAttribute('aria-selected'),'true');
const main=ad.querySelector('main'),first=main.firstElementChild,hash=aw.location.hash,history=aw.history.length;
const draft=ad.createElement('input');draft.value='KEEP-LOCAL-DRAFT';draft.setAttribute('aria-label','검사용 메모');main.append(draft);y=640;
for(const selector of ['#appearance-inline [data-pref-theme][value=sage]','#header-density-toggle','#mode-toggle']){ad.querySelector(selector).click();await new Promise(resolve=>setTimeout(resolve,30));assert.equal(aw.location.hash,hash);assert.equal(aw.history.length,history);assert.equal(main.firstElementChild,first,'No document re-render');assert.equal(draft.value,'KEEP-LOCAL-DRAFT');assert.equal(draft.isConnected,true);assert.equal(aw.scrollY,640,'Preference updates keep scroll');assert.equal(apiTab.getAttribute('aria-selected'),'true','Selected API panel survives');}
const saved=JSON.parse(aw.localStorage.getItem('solyi-ds-prefs'));assert.deepEqual(saved,{theme:'sage',density:'compact',mode:'dark'});
// A synchronous CSS/layout scroll adjustment is restored without changing the route or panel.
aw.eval('updateTokens=()=>window.scrollTo({top:120});');aw.__applyAppearance({theme:'sand'});assert.equal(aw.scrollY,640);assert.equal(aw.location.hash,hash);assert.equal(main.firstElementChild,first);
assert.deepEqual(errors,[]);appDom.window.close();
console.log('PASS: shared native theme radios, single density swap per surface, icon/action mode buttons, neutral contrast, mobile focus, '+checks+' color pairs, CSS build allowlist; actual app route/history/API selection/input identity/scroll/storage retained. Browser geometry and native keyboard remain separate.');