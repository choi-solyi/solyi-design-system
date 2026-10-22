/* The actual starter SFC + installed tarballs, in synthetic DOM. Not visual/native-keyboard QA. */
import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {JSDOM,VirtualConsole} from 'jsdom';
const source=process.argv.includes('--source');
const root=new URL('../',import.meta.url),consumer=new URL('examples/vue-vuetify/',root);
const errors=[],vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
const dom=new JSDOM('<html><body><div id="app"></div></body></html>',{url:'https://example.test/',pretendToBeVisual:true,virtualConsole:vc}),w=dom.window,d=w.document;
for(const key of ['window','document','Element','Node','HTMLElement','HTMLInputElement','SVGElement','ShadowRoot','Document','MutationObserver','Event','MouseEvent','KeyboardEvent','AbortController','getComputedStyle'])Object.defineProperty(globalThis,key,{value:key==='window'?w:key==='document'?d:w[key],configurable:true});
globalThis.visualViewport=undefined;globalThis.requestAnimationFrame=w.requestAnimationFrame.bind(w);globalThis.cancelAnimationFrame=w.cancelAnimationFrame.bind(w);globalThis.innerWidth=1000;globalThis.innerHeight=800;
w.matchMedia=()=>({matches:false,addEventListener(){},removeEventListener(){}});globalThis.matchMedia=w.matchMedia;
globalThis.ResizeObserver=class{observe(){}unobserve(){}disconnect(){}};w.ResizeObserver=globalThis.ResizeObserver;
globalThis.CSS={supports:()=>false,escape:value=>String(value).replace(/[^\w-]/g,'')};w.CSS=globalThis.CSS;
const {build}=await import(new URL('node_modules/vite/dist/node/index.js',consumer));
const {default:vue}=await import(new URL('node_modules/@vitejs/plugin-vue/dist/index.mjs',consumer));
const entry=new URL('.runtime-test/recipe-nav-entry.js',consumer);await mkdir(new URL('./',entry),{recursive:true});
await writeFile(entry,`export {createApp,h,ref,nextTick} from 'vue';export * from '@solyi/vue-ui';export {default as RecipeExamples} from '../src/RecipeExamples.vue';`);
const built=await build({root:fileURLToPath(consumer),configFile:false,plugins:[vue()],resolve:{dedupe:['vue','vuetify','@solyi/core','@solyi/vue-ui'],alias:source?[{find:/^@solyi\/vue-ui$/,replacement:fileURLToPath(new URL('packages/vue-ui/src/index.ts',root))}]:[]},logLevel:'error',build:{lib:{entry:fileURLToPath(entry),formats:['es']},write:false,minify:false,rolldownOptions:{external:['vue']}}});
const chunks=(Array.isArray(built)?built:[built]).flatMap(r=>r.output).filter(x=>x.type==='chunk'),out=new URL('.runtime-test/recipe-nav-bundle/',consumer);await mkdir(out,{recursive:true});for(const chunk of chunks){assert.ok(!chunk.fileName.includes('..'));await mkdir(new URL('./',new URL(chunk.fileName,out)),{recursive:true});await writeFile(new URL(chunk.fileName,out),chunk.code);}
const api=await import(new URL(chunks.find(c=>c.isEntry).fileName+'?progress='+Date.now(),out));
const {createApp,nextTick,createSolyiVuetify,RecipeExamples}=api;
for(const [key,value]of Object.entries({location:w.location,history:w.history}))Object.defineProperty(globalThis,key,{value,configurable:true});
const media=new Map();w.matchMedia=query=>{if(!media.has(query))media.set(query,{matches:query==='(min-width: 1100px)',media:query,listeners:new Set(),addEventListener(_event,fn){this.listeners.add(fn);},removeEventListener(_event,fn){this.listeners.delete(fn);}});return media.get(query);};globalThis.matchMedia=w.matchMedia;
const query=w.matchMedia('(min-width: 1100px)');const resize=matches=>{query.matches=matches;for(const fn of query.listeners)fn({matches,media:query.media});};
const tick=async()=>{await nextTick();await nextTick();},$=selector=>{const el=d.querySelector(selector);assert.ok(el,selector);return el;};
let app,vuetify;const warnings=[];
async function mount(){app=createApp(RecipeExamples);app.config.warnHandler=msg=>warnings.push(msg);vuetify=createSolyiVuetify();app.use(vuetify).use({install:api.install});app.mount('#app');await tick();}
function unmount(){app.unmount();vuetify.unmount();}
w.history.replaceState(null,'','/starter/?view=recipes&example=time&keep=1#anchor');await mount();
assert.equal(d.querySelectorAll('#recipe-navigation a').length,30);assert.equal(new Set([...d.querySelectorAll('#recipe-navigation a')].map(e=>e.id)).size,30);assert.equal(d.querySelectorAll('.recipe-nav-group').length,5);
assert.equal($('#recipe-navigation [aria-current=page]').id,'recipe-link-time');assert.equal($('#recipe-current-title').textContent,'시간 선택');assert.equal(d.querySelector('#recipe-menu-toggle'),null);assert.notEqual($('#recipe-navigation').style.display,'none');
$('#recipe-link-buttons').click();await tick();assert.equal(new URL(w.location.href).searchParams.get('example'),'buttons');assert.equal(new URL(w.location.href).searchParams.get('keep'),'1');assert.equal(w.location.hash,'#anchor');assert.equal(d.activeElement.id,'recipe-current-title');
const length=w.history.length;$('#recipe-link-buttons').click();await tick();assert.equal(w.history.length,length,'Selecting the current example does not add history');
async function travel(direction){await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('No popstate')),1000);w.addEventListener('popstate',()=>{clearTimeout(timer);resolve();},{once:true});w.history[direction]();});await tick();}
await travel('back');assert.equal($('#recipe-navigation [aria-current=page]').id,'recipe-link-time');await travel('forward');assert.equal($('#recipe-navigation [aria-current=page]').id,'recipe-link-buttons');
resize(false);await tick();assert.equal($('#recipe-navigation').style.display,'none');assert.equal($('#recipe-menu-toggle').getAttribute('aria-expanded'),'false');$('#recipe-menu-toggle').click();await tick();assert.notEqual($('#recipe-navigation').style.display,'none');$('#recipe-link-time').focus();$('#recipe-link-time').dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape',bubbles:true,cancelable:true}));await tick();assert.equal($('#recipe-navigation').style.display,'none');assert.equal(d.activeElement.id,'recipe-menu-toggle');
$('#recipe-menu-toggle').click();await tick();
for(const key of ['Tab','Enter','ArrowDown']){const event=new w.KeyboardEvent('keydown',{key,bubbles:true,cancelable:true});$('#recipe-link-dialog').dispatchEvent(event);await tick();assert.equal(event.defaultPrevented,false,key+' keeps its native action');assert.notEqual($('#recipe-navigation').style.display,'none',key+' cannot dismiss the list');}
$('#recipe-link-buttons').focus();$('#recipe-link-fields').focus();await tick();assert.equal(d.activeElement.id,'recipe-link-fields');assert.notEqual($('#recipe-navigation').style.display,'none','Moving focus between links preserves the list');
$('#recipe-link-fields').dispatchEvent(new w.FocusEvent('focusout',{bubbles:true,relatedTarget:null}));await tick();assert.notEqual($('#recipe-navigation').style.display,'none','An unavailable next focus cannot hide a keyboard target');
$('#recipe-link-dialog').click();await tick();assert.equal($('#recipe-navigation').style.display,'none');assert.equal(d.activeElement.id,'recipe-current-title');assert.equal($('#recipe-current-title').textContent,'대화상자 열기와 복귀');
$('#recipe-menu-toggle').focus();resize(true);await tick();assert.equal(d.activeElement.id,'recipe-link-dialog');resize(false);await tick();assert.notEqual($('#recipe-navigation').style.display,'none','A breakpoint cannot hide the focused item');assert.equal(d.activeElement.id,'recipe-link-dialog');
const outside=d.createElement('button');outside.textContent='Outside';d.body.append(outside);outside.focus();await tick();assert.equal($('#recipe-navigation').style.display,'none');assert.equal(d.activeElement,outside);outside.remove();
unmount();assert.equal(query.listeners.size,0);w.history.replaceState(null,'','/starter/?view=recipes&example=unknown&keep=1');await mount();assert.equal(new URL(w.location.href).searchParams.get('example'),'buttons');assert.equal(new URL(w.location.href).searchParams.get('keep'),'1');assert.equal($('#recipe-navigation [aria-current=page]').id,'recipe-link-buttons');unmount();
assert.deepEqual(warnings,[]);assert.deepEqual(errors,[]);dom.window.close();console.log('PASS: actual recipe explorer, all30 unique grouped links, direct/invalid URL, preserved query/hash, same-item history, back/forward, current title/selection, narrow disclosure/Escape/outside focus, breakpoint focus preservation and cleanup. Real layout is checked separately.');

const adapter=await readFile(new URL('src/adapter.css',consumer),'utf8');assert.match(adapter,/\.starter-main>header,\.recipe-explorer>header/,'Only page headers receive the adapter margin');assert.doesNotMatch(adapter,/\.starter-main\s+header:not/,'Page layout must not override a package popover header');
