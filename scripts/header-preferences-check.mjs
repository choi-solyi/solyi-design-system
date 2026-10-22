import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {JSDOM} from 'jsdom';
import {mountHeaderPreferences} from '../site/header-preferences.js';
const root=new URL('../',import.meta.url),tokens=JSON.parse(await readFile(new URL('tokens.json',root),'utf8')),css=await readFile(new URL('site/docs.css',root),'utf8');
const dom=new JSDOM(await readFile(new URL('docs/index.html',root),'utf8')),w=dom.window,d=w.document;
globalThis.document=d;globalThis.AbortController=w.AbortController;globalThis.matchMedia=()=>new w.EventTarget();
let header;header=mountHeaderPreferences({themes:tokens.themes,getState:()=>d.documentElement.dataset,apply:next=>{Object.assign(d.documentElement.dataset,next);header.sync();},toggleMode(){}});
assert.equal(d.querySelectorAll('#appearance-inline select,#appearance-dialog select').length,0);
assert.equal(d.querySelectorAll('[data-pref-theme]').length,6);assert.equal(d.querySelectorAll('[data-pref-density]').length,4);
for(const container of ['#appearance-inline','#appearance-dialog']){assert.equal(d.querySelectorAll(container+' [data-pref-theme]:checked').length,1);assert.equal(d.querySelectorAll(container+' [data-pref-density]:checked').length,1);}
for(const mode of ['light','dark']){d.documentElement.dataset.mode=mode;header.sync();for(const input of d.querySelectorAll('[data-pref-theme]')){const c=tokens.themes[input.value][mode],style=input.parentElement.style;assert.equal(style.getPropertyValue('--pref-accent'),c.accent);assert.equal(style.getPropertyValue('--pref-soft'),c['accent-soft']);assert.equal(style.getPropertyValue('--pref-ink'),c.text);assert.equal(input.getAttribute('aria-label'),tokens.themes[input.value].label);assert.equal(input.type,'radio');}}
assert.notEqual(d.querySelector('#appearance-inline [data-pref-theme]').name,d.querySelector('#appearance-dialog [data-pref-theme]').name);
const lum=hex=>hex.slice(1).match(/../g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4).reduce((s,x,i)=>s+x*[.2126,.7152,.0722][i],0),ratio=(a,b)=>(Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05);let checks=0;
for(const current of Object.values(tokens.themes))for(const candidate of Object.values(tokens.themes))for(const mode of ['light','dark']){const a=current[mode],b=candidate[mode];for(const [fg,bg,min]of [[b.text,b['accent-soft'],4.5],[b.accent,b['accent-soft'],4.5],[a.focus,b['accent-soft'],3],[a['control-border'],b['accent-soft'],3]]){assert.ok(ratio(fg,bg)>=min);checks++;}}
assert.match(css,/input:focus-visible\+\.appearance-choice-face[^}]*outline:2px/);assert.match(css,/input:checked\+\.appearance-choice-face[^}]*box-shadow:inset/);assert.match(css,/\.appearance-choice-check\s*\{visibility:hidden;width:12px/);assert.match(css,/\.appearance-choice-face[^}]*min-height:var\(--sol-button-height\)/);
header.cleanup();dom.window.close();console.log('PASS: native named theme/density groups, no dropdowns, selected-state slots, exact palette tokens in both modes and '+checks+' text/check/focus/border contrasts. Native keys and responsive geometry require Chrome checks.');
