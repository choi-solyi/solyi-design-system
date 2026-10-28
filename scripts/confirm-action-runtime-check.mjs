import assert from 'node:assert/strict'
import {writeFile} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'
import {JSDOM} from 'jsdom'
const root=new URL('../',import.meta.url),target=process.argv.find(arg=>arg.startsWith('--consumer='))?.slice(11),consumer=new URL(target?target.replace(/\/?$/,'/'):process.argv.includes('--candidate')?'qa-output/combobox-candidate/consumer/':'examples/package-consumer/',root),source=process.argv.includes('--source')
if(target){assert.ok(consumer.href.startsWith(new URL('qa-output/',root).href),'Explicit fixtures stay in qa-output');assert.ok(!source,'An explicit consumer checks its installed package, never a source alias')}
const dom=new JSDOM('<div id="app"></div>',{url:'https://example.test',pretendToBeVisual:true}),w=dom.window,d=w.document
for(const key of ['window','document','Element','Node','HTMLElement','HTMLInputElement','SVGElement','ShadowRoot','Document','MutationObserver','Event','MouseEvent','KeyboardEvent','FocusEvent','getComputedStyle'])Object.defineProperty(globalThis,key,{value:key==='window'?w:key==='document'?d:w[key],configurable:true})
globalThis.requestAnimationFrame=w.requestAnimationFrame.bind(w);globalThis.cancelAnimationFrame=w.cancelAnimationFrame.bind(w);globalThis.ResizeObserver=class{observe(){}unobserve(){}disconnect(){}};globalThis.CSS={supports:()=>false}
w.matchMedia=()=>({matches:false,addEventListener(){},removeEventListener(){}});globalThis.matchMedia=w.matchMedia
await writeFile(new URL('.runtime-extension-entry.ts',consumer),`export {createApp,h,ref,nextTick} from 'vue';export * from ${JSON.stringify(source?'../../packages/vue-ui/src/index':'solyi-ui')};`)
const {build}=await import(new URL('node_modules/vite/dist/node/index.js',consumer))
const built=await build({root:fileURLToPath(consumer),configFile:false,logLevel:'error',resolve:{dedupe:['vue','vuetify']},ssr:{noExternal:true},build:{ssr:fileURLToPath(new URL('.runtime-extension-entry.ts',consumer)),write:false,minify:false,rolldownOptions:{external:['vue']}}})
await writeFile(new URL('.runtime-check.mjs',consumer),built.output.find(chunk=>chunk.type==='chunk').code)
const api=await import(new URL('.runtime-check.mjs?combo='+Date.now(),consumer)),{createApp,h,ref,nextTick}=api
const tick=async()=>{await nextTick();await nextTick()},wait=async(ms=8)=>{await new Promise(resolve=>setTimeout(resolve,ms));await tick()},$=selector=>{const node=d.querySelector(selector);assert.ok(node,selector);return node}

let app,handle;const disabled=ref(false),loading=ref(false),error=ref(''),events=[],changes=[];
app=createApp({render:()=>h('form',{onSubmit:e=>{e.preventDefault();throw Error('Unexpected form submission')}},[h(api.SConfirmAction,{id:'confirm',label:'Remove',confirmLabel:'Press again',timeout:30,disabled:disabled.value,loading:loading.value,error:error.value,ref:el=>handle=el,onConfirm:()=>events.push('confirm'),onCancel:reason=>events.push(reason),onArmedChange:v=>changes.push(v)}),h('button',{id:'outside',type:'button'},'Outside')])});app.use(api.createSolyiVuetify());app.mount('#app');await tick();
const click=async()=>{$('#confirm').click();await tick()};
assert.equal($('#confirm').type,'button');await click();assert.equal(events.length,0);assert.equal($('#confirm').textContent,'Press again');await click();assert.deepEqual(events,['confirm']);assert.equal($('#confirm').textContent,'Remove');
$('#confirm').click();$('#confirm').click();await tick();assert.equal(events.length,1,'Same tick clicks do not confirm');await wait(40);assert.equal(events.at(-1),'timeout');
await click();const escape=new w.KeyboardEvent('keydown',{key:'Escape',bubbles:true,cancelable:true});$('#confirm').dispatchEvent(escape);await tick();assert.ok(escape.defaultPrevented);assert.equal(events.at(-1),'escape');
await click();$('#confirm').dispatchEvent(new w.FocusEvent('blur'));await tick();assert.equal(events.at(-1),'blur');
await click();loading.value=true;await tick();assert.equal(events.at(-1),'loading');assert.equal($('#confirm').getAttribute('aria-disabled'),'true');const count=events.length;await click();assert.equal(events.length,count,'Loading suppresses activation while preserving button focus');loading.value=false;await tick();await click();disabled.value=true;await tick();assert.equal(events.at(-1),'disabled');disabled.value=false;await tick();await click();error.value='Try again';await tick();assert.equal(events.at(-1),'error');assert.equal($('[role=alert]').textContent,'Try again');
error.value='';await tick();await click();handle.reset();await tick();assert.equal(events.at(-1),'reset');handle.focus();assert.equal(d.activeElement,$('#confirm'));await click();app.unmount();await wait(40);assert.equal(events.at(-1),'unmount');assert.equal(changes.filter(Boolean).length,changes.filter(x=>!x).length);dom.window.close();console.log('PASS: Confirm arm/confirm, synchronous duplicates, timeout, Escape ownership, blur, disabled/loading/error/reset/unmount, focus and native form button semantics.');
