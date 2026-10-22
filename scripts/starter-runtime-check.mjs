/* The actual starter SFC + installed tarballs, in synthetic DOM. Not visual/native-keyboard QA. */
import assert from 'node:assert/strict';
import {writeFile,mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {JSDOM,VirtualConsole} from 'jsdom';
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
const result=await build({root:fileURLToPath(consumer),configFile:false,plugins:[vue()],logLevel:'error',build:{lib:{entry:fileURLToPath(new URL('runtime-entry.js',consumer)),formats:['es']},write:false,minify:false,rolldownOptions:{external:['vue']}}});
const chunks=(Array.isArray(result)?result:[result]).flatMap(r=>r.output).filter(x=>x.type==='chunk'),output=chunks.find(x=>x.isEntry);assert.ok(output);const generated=new URL('.runtime-test/',consumer);await mkdir(generated,{recursive:true});for(const chunk of chunks){assert.ok(!chunk.fileName.includes('..')&&!chunk.fileName.startsWith('/'));const target=new URL(chunk.fileName,generated);await mkdir(new URL('./',target),{recursive:true});await writeFile(target,chunk.code);}
const {createApp,nextTick,createStarterVuetify,Starter}=await import(new URL(output.fileName+'?check='+Date.now(),generated));
const warnings=[];const app=createApp(Starter);app.config.warnHandler=message=>warnings.push(message);app.use(createStarterVuetify());app.mount('#app');await nextTick();
const input=d.querySelector('#starter-title'),form=input.closest('form'),button=d.querySelector('#starter-save');
for(const field of d.querySelectorAll('input[aria-labelledby]'))for(const id of field.getAttribute('aria-labelledby').split(/\s+/))assert.ok(d.getElementById(id),'Actual starter label resolves: '+id);
const dataState=d.querySelector('#starter-data-state');dataState.value='error';dataState.dispatchEvent(new w.Event('change',{bubbles:true}));await nextTick();const retry=d.querySelector('.sol-ui-table-retry');assert.ok(retry);retry.focus();retry.click();await nextTick();await nextTick();assert.equal(d.activeElement,d.querySelector('.sol-ui-table-summary'),'Actual starter recovery retains a visible result focus');assert.equal(dataState.value,'ready');
input.value='제출 시점의 가상 기록';input.dispatchEvent(new w.Event('input',{bubbles:true}));await nextTick();form.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));await nextTick();assert.equal(button.getAttribute('aria-busy'),'true');
input.value='';input.dispatchEvent(new w.Event('input',{bubbles:true}));await nextTick();await new Promise(r=>setTimeout(r,500));
assert.match(d.querySelector('#starter-result').textContent,/제출 시점의 가상 기록/,'Response confirms the validated submission snapshot');assert.ok(!d.querySelector('#starter-result').textContent.includes('“”'));assert.equal(input.value,'','A later edit remains untouched');assert.equal(button.getAttribute('aria-busy'),null);
form.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));await nextTick();assert.equal(input.getAttribute('aria-invalid'),'true');assert.equal(d.querySelector('#starter-result').textContent,'');
const nativeActivator=d.querySelector('#v-theme-open');assert.equal(nativeActivator.getAttribute('aria-haspopup'),'dialog','Native example binds the actual Vuetify activator for focus return');nativeActivator.focus();nativeActivator.click();await nextTick();await nextTick();const nativeDialog=d.querySelector('.sol-vuetify-dialog.v-overlay--active[role="dialog"]');assert.ok(nativeDialog);nativeDialog.querySelector('button').click();await nextTick();await nextTick();assert.ok(!d.querySelector('.sol-vuetify-dialog.v-overlay--active'));
assert.equal(d.querySelectorAll('.sol-ui-progress [role="progressbar"]').length,2,'Starter uses both actual package progress components');
app.unmount();assert.deepEqual(errors,[]);assert.deepEqual(warnings,[]);dom.window.close();console.log('PASS: actual starter and shared Vuetify config; async submission snapshot, linked validation, native VDialog activator/open/close and two installed S progress components. Real Escape/focus/visual checks are separate.');
