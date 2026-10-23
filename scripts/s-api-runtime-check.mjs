import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {JSDOM,VirtualConsole} from 'jsdom';
import {solIconPaths} from '../site/icons.js';
const source=process.argv.includes('--source');
const root=new URL('../',import.meta.url),consumer=new URL('examples/package-consumer/',root);
const errors=[],vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
const dom=new JSDOM('<html><body><div id="app"></div></body></html>',{url:'https://example.test/',pretendToBeVisual:true,virtualConsole:vc}),w=dom.window,d=w.document;
for(const key of ['window','document','Element','Node','HTMLElement','HTMLInputElement','SVGElement','ShadowRoot','Document','MutationObserver','Event','MouseEvent','KeyboardEvent','AbortController','getComputedStyle'])Object.defineProperty(globalThis,key,{value:key==='window'?w:key==='document'?d:w[key],configurable:true});
globalThis.visualViewport=undefined;
globalThis.requestAnimationFrame=w.requestAnimationFrame.bind(w);globalThis.cancelAnimationFrame=w.cancelAnimationFrame.bind(w);globalThis.innerWidth=1000;globalThis.innerHeight=800;
w.matchMedia=()=>({matches:false,addEventListener(){},removeEventListener(){}});globalThis.matchMedia=w.matchMedia;
globalThis.ResizeObserver=class{observe(){}unobserve(){}disconnect(){}};w.ResizeObserver=globalThis.ResizeObserver;
globalThis.CSS={supports:()=>false,escape:value=>String(value).replace(/[^\w-]/g,'')};w.CSS=globalThis.CSS;
w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;this.dispatchEvent(new w.Event('close'));};
await writeFile(new URL('.runtime-extension-entry.ts',consumer),`export {createApp,h,ref,nextTick} from 'vue';export {VApp} from 'vuetify/components/VApp';export {VBtn} from 'vuetify/components/VBtn';export {VTextField} from 'vuetify/components/VTextField';export * from ${JSON.stringify(source?'../../packages/vue-ui/src/index':'solyi-ui')};export {default as SolyiUI} from ${JSON.stringify(source?'../../packages/vue-ui/src/index':'solyi-ui')};`);
const {build}=await import(new URL('node_modules/vite/dist/node/index.js',consumer));
const result=await build({root:fileURLToPath(consumer),configFile:false,resolve:{dedupe:['vue','vuetify']},logLevel:'error',ssr:{noExternal:true},build:{ssr:fileURLToPath(new URL('.runtime-extension-entry.ts',consumer)),write:false,minify:false,rolldownOptions:{external:['vue']}}});
const output=result.output.find(x=>x.type==='chunk');assert.ok(output);
await writeFile(new URL('.runtime-check.mjs',consumer),output.code);
const api=await import(new URL('.runtime-check.mjs?s-api='+Date.now(),consumer));
assert.equal(api.uiVersion,JSON.parse(await readFile(new URL('packages/vue-ui/package.json',root),'utf8')).version,'Runtime uiVersion matches the package and demo version');
const componentNames=Object.keys(api.sComponents);assert.equal(componentNames.length,38);const removed=["SolButton","SolField","SolDialog","SolTable","SolCheckbox","SolRadioGroup","SolSwitch","SolSelect","SolTextarea","SolNumberInput","SolTabs","SolToast","SolDatePicker","SolTimePicker","SolSegmentedControl","SolMultiSelect","SolRangeSlider","SolSplitButton","SolContextMenu","SolResizableSplitPane"];for(const name of componentNames){assert.match(name,/^S[A-Z]/);assert.equal(api[name].name,({SContainer:'VContainer',SRow:'VRow',SCol:'VCol'})[name]||name);}for(const name of removed)assert.equal(api[name],undefined,name+' is not exported');
const {createApp,h,ref,nextTick,VApp,VBtn,VTextField,SBtn,STextField,SolyiUI,createSolyiVuetify,applySolyiAppearance}=api;
const vuetify=createSolyiVuetify({components:{VApp},defaults:{VBtn:{density:'compact'}}});
assert.equal(vuetify.defaults.value.VBtn.class,'sol-vuetify-btn');assert.equal(vuetify.defaults.value.VBtn.density,'compact');
const disabled=ref(false),busy=ref(false);let sClicks=0,vClicks=0;
const app=createApp({render:()=>h(VApp,{},()=>[
 h(SBtn,{id:'s-btn',variant:'primary',disabled:disabled.value,loading:busy.value,onClick:()=>sClicks++},()=> 'S action'),
 h(VBtn,{id:'v-btn',color:'primary',variant:'flat',disabled:disabled.value,onClick:()=>vClicks++},()=> 'V action'),
 h(STextField,{id:'s-field',label:'S field',modelValue:'S draft'}),
 h(VTextField,{id:'v-field',label:'V field',modelValue:'V draft'})
])});app.use(vuetify).use(SolyiUI);for(const name of componentNames)assert.equal(app.component(name),api[name]);for(const name of removed)assert.equal(app.component(name),undefined);app.mount('#app');await nextTick();
assert.ok(d.querySelector('#s-btn.sol-ui-button'));assert.ok(d.querySelector('#v-btn.sol-vuetify-btn'));assert.ok(d.querySelector('.sol-vuetify-field'));assert.ok(d.querySelector('.v-application.sol-vuetify'));
d.querySelector('#s-btn').click();d.querySelector('#v-btn').click();assert.equal(sClicks,1);assert.equal(vClicks,1);busy.value=true;await nextTick();d.querySelector('#s-btn').click();assert.equal(sClicks,1);busy.value=false;disabled.value=true;await nextTick();assert.equal(d.querySelector('#v-btn').disabled,true);assert.equal(d.querySelector('#s-btn').disabled,true);
for(const theme of ['violet','sage','sand'])for(const mode of ['light','dark']){assert.equal(applySolyiAppearance(vuetify.theme,{theme,mode,density:'compact'}),true);await nextTick();await nextTick();assert.equal(d.documentElement.dataset.theme,theme);assert.equal(d.documentElement.dataset.mode,mode);assert.equal(vuetify.theme.global.name.value,theme+'-'+mode);assert.ok(d.querySelector('.v-theme--'+theme+'-'+mode));}
assert.equal(applySolyiAppearance(vuetify.theme,{theme:'invalid',mode:'light'}),false);assert.equal(d.documentElement.dataset.theme,'sand');assert.equal(d.querySelector('#s-field').value,'S draft');assert.equal(d.querySelector('#v-field').value,'V draft');
app.unmount();vuetify.unmount();assert.deepEqual(errors,[]);dom.window.close();
console.log('PASS:38 canonical S exports/global registrations and no legacy component aliases; merged Vuetify defaults, direct VBtn/VTextField coexistence, guards, six shared themes/Core attributes and retained drafts. Synthetic DOM; visual/native input checks are separate.');
