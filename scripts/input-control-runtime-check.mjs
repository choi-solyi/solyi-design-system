import assert from 'node:assert/strict'
import {writeFile} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'
import {JSDOM} from 'jsdom'
const root=new URL('../',import.meta.url),consumer=new URL('examples/package-consumer/',root),source=process.argv.includes('--source')
const dom=new JSDOM('<div id="app"></div>',{url:'https://example.test',pretendToBeVisual:true}),w=dom.window,d=w.document
for(const key of ['window','document','Element','Node','HTMLElement','HTMLInputElement','HTMLTextAreaElement','SVGElement','ShadowRoot','Document','MutationObserver','Event','MouseEvent','KeyboardEvent','FocusEvent','getComputedStyle'])Object.defineProperty(globalThis,key,{value:key==='window'?w:key==='document'?d:w[key],configurable:true})
globalThis.requestAnimationFrame=w.requestAnimationFrame.bind(w);globalThis.cancelAnimationFrame=w.cancelAnimationFrame.bind(w);globalThis.ResizeObserver=class{observe(){}unobserve(){}disconnect(){}};globalThis.CSS={supports:()=>false}
w.matchMedia=()=>({matches:false,addEventListener(){},removeEventListener(){}});globalThis.matchMedia=w.matchMedia
await writeFile(new URL('.runtime-extension-entry.ts',consumer),`export {createApp,h,ref,nextTick} from 'vue';export * from ${JSON.stringify(source?'../../packages/vue-ui/src/index':'solyi-ui')};`)
const {build}=await import(new URL('node_modules/vite/dist/node/index.js',consumer))
const built=await build({root:fileURLToPath(consumer),configFile:false,logLevel:'error',resolve:{dedupe:['vue','vuetify']},ssr:{noExternal:true},build:{ssr:fileURLToPath(new URL('.runtime-extension-entry.ts',consumer)),write:false,minify:false,rolldownOptions:{external:['vue']}}})
await writeFile(new URL('.runtime-check.mjs',consumer),built.output.find(chunk=>chunk.type==='chunk').code)
const api=await import(new URL('.runtime-check.mjs?input='+Date.now(),consumer)),{createApp,h,ref,nextTick}=api
const tick=async()=>{await nextTick();await nextTick()},$=selector=>{const node=d.querySelector(selector);assert.ok(node,selector);return node}
let app,vuetify,value,required,disabled,readonly,loading,clearable,formDisabled,formReadonly,serverError,accept,locale,show,handle,events,submitCount,moveOutside,removeOnClear
const warnings=[]
async function mount(kind,slots=true){
 value=ref('Initial text');required=ref(false);disabled=ref(false);readonly=ref(false);loading=ref(false);clearable=ref(true);formDisabled=ref(false);formReadonly=ref(false);serverError=ref('');accept=ref(true);locale=ref('ko-KR');show=ref(true);events={updates:[],changes:[],clears:[]};submitCount=0;moveOutside=false;removeOnClear=false
 app=createApp({render:()=>h('main',[h(api.SForm,{id:'form',disabled:formDisabled.value,readonly:formReadonly.value,onSubmit:event=>{submitCount++;event.preventDefault()}},()=>show.value?h(api[kind],{
   ref:next=>handle=next,id:'input',label:'Field',modelValue:value.value,required:required.value,disabled:disabled.value,readonly:readonly.value,loading:loading.value,clearable:clearable.value,serverError:serverError.value,name:'field',
   'onUpdate:modelValue':next=>{events.updates.push(next);if(accept.value)value.value=next},onChange:next=>events.changes.push(next),onClear:detail=>{events.clears.push(detail);if(moveOutside)$('#outside').focus();if(removeOnClear)show.value=false},
  },slots?{leading:scope=>[h('span',{'data-slot-disabled':String(scope.disabled)},'Lead')],trailing:scope=>[h('button',{id:'slot-clear',type:'button',onClick:scope.clear},'Slot action')],status:scope=>[h('span',{'data-slot-error':scope.error,'data-slot-loading':String(scope.loading)},scope.error?'Error':'Status')]}:{}):null),h('button',{id:'outside',type:'button'},'Outside')])})
 app.config.warnHandler=message=>warnings.push(message);vuetify=api.createSolyiVuetify();app.use(vuetify).use({install:api.install},{locale}).mount('#app');await tick()
}
async function unmount(){app.unmount();vuetify.unmount();await tick()}
for(const kind of ['STextField','STextarea']){
 await mount(kind);required.value=true;await tick();$('#input').focus();$('.sol-ui-input-clear').click();await tick()
 assert.equal(value.value,'');assert.deepEqual(events.updates,['']);assert.deepEqual(events.clears,[{value:'',reason:'clear'}]);assert.deepEqual(events.changes,kind==='STextarea'?['']:[],'Existing change shape is preserved; TextField does not invent one')
 assert.equal(d.querySelector('.sol-ui-input-clear'),null);assert.equal(d.activeElement,$('#input'));assert.equal($('#input').getAttribute('aria-invalid'),'true');assert.ok($('#input-error').textContent);assert.equal(submitCount,0);assert.equal(new w.FormData($('#form')).get('field'),'')
 value.value='Restored';await tick();serverError.value='External error remains';await tick();handle.clear();await tick();assert.equal($('#input-error').textContent,'External error remains');assert.equal(events.clears.length,2);await unmount()
 for(const mode of ['disabled','readonly','formDisabled','formReadonly']){
  await mount(kind);if(mode==='disabled')disabled.value=true;if(mode==='readonly')readonly.value=true;if(mode==='formDisabled')formDisabled.value=true;if(mode==='formReadonly')formReadonly.value=true;await tick();assert.equal(d.querySelector('.sol-ui-input-clear'),null);handle.clear();$('#slot-clear').click();await tick();assert.equal(value.value,'Initial text');assert.equal(events.clears.length,0);assert.equal(events.updates.length,0);await unmount()
 }
 await mount(kind,false);clearable.value=false;await tick();assert.equal(d.querySelector('.sol-ui-input-frame,.sol-ui-input-enhanced'),null);assert.equal(d.querySelector('.sol-ui-input-clear'),null);await unmount()
 await mount(kind);accept.value=false;required.value=true;await tick();$('.sol-ui-input-clear').click();await tick();assert.equal(value.value,'Initial text');assert.equal($('#input').value,'Initial text');assert.equal(d.querySelector('#input-error'),null);assert.equal(events.clears.length,1);await unmount()
 await mount(kind);loading.value=true;locale.value='en-US';await tick();assert.ok($('.sol-ui-input-loading[role=progressbar]').getAttribute('aria-label').includes('Working'));assert.equal($('.sol-ui-input-clear').getAttribute('aria-label'),'Field Clear');assert.equal($('[data-slot-loading]').getAttribute('data-slot-loading'),'true');await unmount()
 await mount(kind);moveOutside=true;$('.sol-ui-input-clear').click();await tick();assert.equal(d.activeElement,$('#outside'),'A consumer moving focus elsewhere owns the new focus');await unmount()
 await mount(kind);removeOnClear=true;const staleHandle=handle;$('.sol-ui-input-clear').click();await tick();assert.equal(d.querySelector('#input'),null);staleHandle.clear();await tick();assert.equal(events.clears.length,1,'Unmounted control cannot emit again');await unmount()
}
assert.deepEqual(warnings,[]);dom.window.close()
console.log('PASS: text/textarea shared clear action, empty model, exact existing events, required/server validation, native FormData/focus, disabled/readonly/SForm guards, controlled refusal, slots/loading/ko-en, no legacy layout and no stale/unmounted focus or submit. Real browser geometry is separate.')
