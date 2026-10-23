import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {JSDOM} from 'jsdom';
import {resolveAppearance,persistAppearance,appearanceStorageKey} from '../site/appearance-state.js';
import {mountAppearanceControls} from '../site/appearance-controls.js';
import {containShellDialogTab} from '../site/shell-dialog.js';

const root=new URL('../',import.meta.url),read=path=>readFile(new URL(path,root),'utf8');
const require=createRequire(new URL('../examples/vue-vuetify/package.json',import.meta.url));
const {parse,compileScript}=require('@vue/compiler-sfc'),ts=require('typescript');
const themes=JSON.parse(await read('tokens.json')).themes;
let value=null,writes=0;
const storage={getItem:key=>key===appearanceStorageKey?value:null,setItem(key,next){assert.equal(key,'solyi-ds-prefs');value=next;writes++;}};
for(const theme of ['violet','sage','sand'])for(const mode of ['light','dark'])for(const density of ['comfortable','compact']){
 const state={theme,mode,density};persistAppearance(state,{storage});
 assert.deepEqual(resolveAppearance({storage,search:'?view=recipes&example=buttons',prefersDark:mode==='light'}),state);
}
value=JSON.stringify({theme:'sage',mode:'dark',density:'compact'});
assert.deepEqual(resolveAppearance({storage,search:'?view=advanced&theme=sand&mode=light&density=comfortable',prefersDark:true}),{theme:'sand',mode:'light',density:'comfortable'});
assert.deepEqual(resolveAppearance({storage,search:'?theme=unknown&mode=invalid&density=bad'}),{theme:'sage',mode:'dark',density:'compact'});
value='{invalid';assert.deepEqual(resolveAppearance({storage,search:'',prefersDark:true}),{theme:'violet',mode:'dark',density:'comfortable'});
const denied={getItem(){throw Error('Storage denied');},setItem(){throw Error('Storage denied');}};
assert.deepEqual(resolveAppearance({storage:denied,search:'?mode=light',prefersDark:true}),{theme:'violet',mode:'light',density:'comfortable'});
assert.equal(persistAppearance({theme:'sage',mode:'dark',density:'compact'},{storage:denied}),false);
const before=writes;resolveAppearance({storage,search:'?theme=sage',prefersDark:false});assert.equal(writes,before,'URL overrides never persist without an explicit user change');

const source=await read('examples/vue-vuetify/src/AppearanceSettings.vue');
const appSource=await read('examples/vue-vuetify/src/App.vue');
assert.equal((appSource.match(/<AppearanceSettings /g)||[]).length,1);
assert.doesNotMatch(appSource,/v-model="(?:selected|mode)"|id="starter-(?:theme|mode)"/);
assert.match(appSource,/settingsHidden=params\.get\('embed'\)==='1'/);
assert.match(appSource,/watch\(appearance,state=>applySolyiAppearance\(theme,state\)/);
assert.doesNotMatch(appSource,/replaceState|pushState|location\.(?:hash|search)\s*=(?!=)/);
assert.match(appSource,/const viewport=\{left:window\.scrollX,top:window\.scrollY\}/);
assert.match(appSource,/nextTick\(\(\)=>\{if\(location\.hash===hash/);
assert.match(source,/import '\.\.\/\.\.\/\.\.\/site\/header-preferences\.css'/);
const docCss=await read('site/docs.css'),sharedCss=await read('site/header-preferences.css');
assert.doesNotMatch(docCss,/^\.appearance-choice-face\s*\{/m,'Theme control styling has a single shared CSS source');
assert.match(sharedCss,/\.appearance-choice-face[^}]*height:var\(--sol-button-height\)/);
assert.match(sharedCss,/@media\(max-width:680px\),\(pointer:coarse\)[^]*\.appearance-choice-face\{height:var\(--sol-touch-target-min\)/);
assert.match(source,/@media\(max-width:720px\)[^]*\.starter-appearance-inline \{display:none;/);

// Compile and mount the actual thin wrapper with Vue's browser runtime and the
// same Vue preset imports that Vite provides. No package rebuild is needed.
const dom=new JSDOM('<div id="app"></div>',{url:'https://example.test/starter/?view=recipes&example=buttons#kept',runScripts:'outside-only',pretendToBeVisual:true});
const w=dom.window,d=w.document,media=new w.EventTarget();media.matches=false;
w.matchMedia=()=>media;w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;this.dispatchEvent(new w.Event('close'));};
w.eval(await read('examples/vue-vuetify/node_modules/vue/dist/vue.global.js'));
const withPreset=source.replace('<script setup>',"<script setup>\nimport {ref,watch,onMounted,onBeforeUnmount} from 'vue';");
const {descriptor,errors}=parse(withPreset,{filename:'AppearanceSettings.vue'});assert.deepEqual(errors,[]);
const compiled=compileScript(descriptor,{id:'appearance-check',inlineTemplate:true});
const js=ts.transpileModule(compiled.content,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const componentModule={exports:{}};
const testRequire=id=>id==='vue'?w.Vue:id.endsWith('appearance-controls.js')?{mountAppearanceControls}:id.endsWith('shell-dialog.js')?{containShellDialogTab}:{};
new Function('require','module','exports','matchMedia',js)(testRequire,componentModule,componentModule.exports,w.matchMedia);
const appearance=w.Vue.ref({theme:'violet',mode:'light',density:'comfortable'});
const mounted=w.Vue.createApp({setup(){return()=>w.Vue.h('main',[w.Vue.h(componentModule.exports.default,{state:appearance.value,themes,onChange:next=>{appearance.value={...appearance.value,...next};}}),w.Vue.h('input',{'aria-label':'Draft',defaultValue:'KEEP'})]);}});
mounted.mount('#app');await w.Vue.nextTick();
const panel=d.querySelector('dialog'),draft=d.querySelector('input[aria-label=Draft]'),scope=d.querySelector('.starter-appearance'),history=w.history.length,url=w.location.href;
assert.equal(scope.querySelectorAll('[data-pref-theme]').length,6);assert.equal(scope.querySelectorAll('[data-pref-density-toggle]').length,2);assert.equal(scope.querySelectorAll('[data-pref-mode-toggle]').length,2);
draft.value='LOCAL DRAFT';
for(const [selector,expected]of [['.starter-appearance-inline [value=sage]',['theme','sage']],['.starter-appearance-inline [data-pref-density-toggle]',['density','compact']],['.starter-appearance-inline [data-pref-mode-toggle]',['mode','dark']]]){
 d.querySelector(selector).click();await w.Vue.nextTick();assert.equal(appearance.value[expected[0]],expected[1]);assert.equal(draft.value,'LOCAL DRAFT');assert.equal(d.querySelector('input[aria-label=Draft]'),draft);assert.equal(w.location.href,url);assert.equal(w.history.length,history);
}
for(const input of scope.querySelectorAll('[data-pref-theme][value=sage]'))assert.equal(input.checked,true);
assert.equal(d.querySelector('.starter-appearance-inline [data-pref-density-toggle] span').textContent,'컴팩트');
assert.equal(d.querySelector('.starter-appearance-inline [data-pref-mode-toggle] span').textContent,'Light');
media.matches=true;d.querySelector('.starter-appearance-open').click();assert.equal(panel.open,true);assert.equal(d.activeElement,panel.querySelector('[data-pref-theme]:checked'));
panel.querySelector('button').click();assert.equal(panel.open,false);assert.equal(d.activeElement,d.querySelector('.starter-appearance-open'));
mounted.unmount();assert.equal(scope.querySelectorAll('[data-pref-theme]').length,0,'Unmount removes generated controls and listeners');dom.window.close();
console.log('PASS: shared appearance resolver/persistence, 12 saved combinations, URL override/invalid/denied storage, actual Vue wrapper compile/mount/change/mobile focus lifecycle, unchanged route/history/draft identity; shared CSS and root-density wiring. Browser geometry remains separate.');
