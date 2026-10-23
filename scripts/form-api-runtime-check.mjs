/* Targeted source/installed-package form contract checks; no browser or remote data. */
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {JSDOM} from 'jsdom';

const root=new URL('../',import.meta.url),consumer=new URL('examples/package-consumer/',root),source=process.argv.includes('--source');
const dom=new JSDOM('<html><body><div id="app"></div></body></html>',{url:'https://example.test/',pretendToBeVisual:true}),w=dom.window,d=w.document;
for(const key of ['window','document','Element','Node','HTMLElement','HTMLInputElement','SVGElement','ShadowRoot','Document','MutationObserver','Event','MouseEvent','KeyboardEvent','FocusEvent','AbortController','getComputedStyle'])Object.defineProperty(globalThis,key,{value:key==='window'?w:key==='document'?d:w[key],configurable:true});
globalThis.requestAnimationFrame=w.requestAnimationFrame.bind(w);globalThis.cancelAnimationFrame=w.cancelAnimationFrame.bind(w);globalThis.innerWidth=1180;globalThis.innerHeight=900;
w.matchMedia=()=>({matches:false,addEventListener(){},removeEventListener(){}});globalThis.matchMedia=w.matchMedia;
globalThis.ResizeObserver=class{observe(){}unobserve(){}disconnect(){}};
globalThis.CSS={supports:()=>false,escape:value=>String(value)};w.CSS=globalThis.CSS;
w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};
const entry=new URL('.runtime-form-entry.ts',consumer);
await writeFile(entry,`export {createApp,h,ref,nextTick} from 'vue';\nexport {VTextField} from 'vuetify/components/VTextField';\nexport {VContainer,VRow,VCol} from 'vuetify/components/VGrid';\nexport * from ${JSON.stringify(source?'../../packages/vue-ui/src/index':'@solyi/vue-ui')};\n`);
const {build}=await import(new URL('node_modules/vite/dist/node/index.js',consumer));
const built=await build({root:fileURLToPath(consumer),configFile:false,logLevel:'error',ssr:{noExternal:true},build:{ssr:fileURLToPath(entry),write:false,minify:false,rolldownOptions:{external:['vue']}}});
const module=new URL('.runtime-form-check.mjs',consumer);await writeFile(module,built.output.find(item=>item.type==='chunk').code);
const api=await import(module+'?t='+Date.now()),{createApp,h,ref,nextTick}=api;
const tick=async()=>{await nextTick();await nextTick();};
const form=ref(null),nameField=ref(null),numberField=ref(null),name=ref(''),description=ref(''),accepted=ref(false),count=ref(null),serverError=ref(''),disabled=ref(false),readonly=ref(false),showExtra=ref(true),valid=ref(null),submissions=[];
const app=createApp({setup(){return()=>h(api.SContainer,{fluid:true},()=>h(api.SForm,{ref:form,disabled:disabled.value,readonly:readonly.value,modelValue:valid.value,'onUpdate:modelValue':value=>valid.value=value,onSubmit:event=>submissions.push(event)},()=>h(api.SRow,{density:'compact'},()=>[
  h(api.SCol,{cols:12,md:6},()=>h(api.STextField,{id:'name',label:'Name',ref:nameField,required:true,modelValue:name.value,'onUpdate:modelValue':value=>name.value=value,rules:[api.sRules.required('Name required'),api.sRules.minLength(3,'Three characters')],serverError:serverError.value,help:'A fictional name'})),
  h(api.SCol,{cols:12,md:6},()=>h(api.SNumberInput,{id:'count',label:'Count',ref:numberField,required:true,min:0,max:5,modelValue:count.value,'onUpdate:modelValue':value=>count.value=value})),
  h(api.STextarea,{id:'description',label:'Description',modelValue:description.value,'onUpdate:modelValue':value=>description.value=value,rules:[api.sRules.minLength(2,'Two characters')]}),
  h(api.SCheckbox,{id:'accepted',label:'Accepted',modelValue:accepted.value,'onUpdate:modelValue':value=>accepted.value=value,required:true}),
  showExtra.value?h(api.SSelect,{id:'extra',label:'Extra',required:true,modelValue:null,options:[{value:'one',label:'One'}]}):null
])));}});
app.use(api.createSolyiVuetify());app.mount('#app');await tick();
const $=selector=>{const element=d.querySelector(selector);assert.ok(element,selector);return element;};
for(const [s,v] of [['SContainer','VContainer'],['SRow','VRow'],['SCol','VCol']]){
  if(!source)assert.equal(api[s],api[v],'Installed aliases retain constructor identity');
  assert.equal(api[s].name,v);assert.deepEqual(Object.keys(api[s].props),Object.keys(api[v].props));
}
assert.ok($('.v-container--fluid'));assert.ok($('.v-row--density-compact'));assert.ok($('.v-col--cols-md-6'));
assert.equal(valid.value,null);
let result=await form.value.validate();await tick();
assert.equal(result.valid,false);assert.deepEqual(result.errors.map(item=>item.id),['name','count','description','accepted','extra']);
assert.equal($('#name').getAttribute('aria-invalid'),'true');assert.match($('#name').getAttribute('aria-describedby'),/name-error/);assert.equal($('#name-error').textContent,'Name required');
assert.equal($('#description-error').textContent,'Two characters');assert.equal($('#accepted').getAttribute('aria-invalid'),'true');
form.value.focus();assert.equal(d.activeElement.id,'name');
name.value='Al';await tick();assert.equal($('#name-error').textContent,'Three characters');
name.value='Alpha';description.value='Fictional description';accepted.value=true;count.value=0;showExtra.value=false;await tick();
result=await form.value.validate();await tick();assert.equal(result.valid,true);assert.deepEqual(result.errors,[]);assert.equal(valid.value,true);assert.equal($('#name').getAttribute('aria-invalid'),'false');
nameField.value.focus();await tick();assert.equal(d.activeElement.id,'name');numberField.value.focus();assert.equal(d.activeElement.id,'count');
assert.equal(numberField.value.validate(),true,'Required numeric zero is valid');
count.value=null;await tick();$('#count').value='3';$('#count').dispatchEvent(new w.Event('input',{bubbles:true}));
assert.equal(numberField.value.validate(),true,'A newly typed draft is checked before the controlled model has rendered');await tick();assert.equal(count.value,3);
serverError.value='Name already used';await tick();result=await form.value.validate();await tick();assert.equal(result.valid,false);assert.equal($('#name-error').textContent,'Name already used');
form.value.resetValidation();await tick();assert.equal($('#name-error').textContent,'Name already used','Reset cannot erase app-owned server feedback');assert.equal(name.value,'Alpha','Reset validation preserves values');
serverError.value='';await tick();assert.equal(d.querySelector('#name-error'),null);assert.equal(valid.value,null);
name.value='';description.value='';accepted.value=false;count.value=null;await tick();
await form.value.validate();await tick();form.value.resetValidation();await tick();assert.equal(d.querySelector('#name-error'),null);assert.equal(d.querySelector('#count-error'),null);assert.equal($('#accepted').hasAttribute('aria-invalid'),false);
serverError.value='Server retained';disabled.value=true;await tick();assert.equal($('#name').disabled,true);assert.equal($('#accepted').disabled,true);result=await form.value.validate();assert.equal(result.valid,true,'Disabled fields are excluded');
disabled.value=false;readonly.value=true;await tick();assert.equal($('#name').readOnly,true);$('#accepted').click();await tick();assert.equal(accepted.value,false,'Form readonly blocks native toggle');assert.equal($('#name-error').textContent,'Server retained');
readonly.value=false;serverError.value='';name.value='Alpha';description.value='Valid';count.value=2;accepted.value=true;await tick();
$('form').dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));await tick();assert.equal(submissions.length,1);assert.equal((await submissions[0]).valid,true,'Submit event carries merged validation promise');
name.value='';await tick();const pendingValidation=form.value.validate();form.value.resetValidation();await pendingValidation;await tick();
assert.equal(d.querySelector('#name-error'),null,'A pending validation must not restore errors after reset');assert.equal(valid.value,null);
app.unmount();

// Native Vuetify inputs can coexist: their VForm validation is merged with registered S fields.
const nativeForm=ref(null),nativeValue=ref('');
const coexist=createApp({setup(){return()=>h(api.SForm,{ref:nativeForm},()=>h(api.VTextField,{id:'native-name',modelValue:nativeValue.value,rules:[value=>!!value||'Native required']}));}});
coexist.use(api.createSolyiVuetify());coexist.mount('#app');await tick();result=await nativeForm.value.validate();assert.equal(result.valid,false);assert.equal(result.errors[0].id,'native-name');nativeValue.value='Native';await tick();assert.equal((await nativeForm.value.validate()).valid,true);coexist.unmount();

for(const [value,filled] of [[0,true],[false,false],['  ',false],[[],false],[null,false],[undefined,false],['0',true],[[0],true]])assert.equal(api.isSFieldFilled(value),filled);
assert.equal(api.sRules.required()(0,api.enLocale),true);assert.equal(api.sRules.required()(false,api.enLocale),'Enter or choose a required value.');assert.equal(api.sRules.minLength(3)('a',api.enLocale),'Use at least 3 characters.');

// Every common input exposes one consistent validation/focus surface, preserving extra methods.
const handles=new Map(),models={SRadioGroup:null,SSwitch:false,SSelect:null,SSegmentedControl:null,SMultiSelect:[],SRangeSlider:[0,10],SDatePicker:null,STimePicker:null,SAutocomplete:null,SFileInput:[]};
const contractApp=createApp({setup(){return()=>h('div',Object.entries(models).map(([name,value])=>h(api[name],{id:'contract-'+name,label:name,ref:handle=>handle?handles.set(name,handle):handles.delete(name),modelValue:value,required:true,options:[{value:'one',label:'One'}]})));}});
contractApp.use(api.createSolyiVuetify());contractApp.mount('#app');await tick();
for(const [name,handle]of handles){for(const method of ['focus','validate','resetValidation'])assert.equal(typeof handle[method],'function',name+'.'+method);handle.focus();assert.notEqual(d.activeElement,d.body,name+' focus');assert.equal(typeof handle.validate(),'boolean',name+' sync validate');handle.resetValidation();}
for(const [name,value]of [['SDatePicker','2026-10-23'],['STimePicker','09:30']]){
  const input=$('#contract-'+name);input.value=value;input.dispatchEvent(new w.Event('input',{bubbles:true}));
  assert.equal(handles.get(name).validate(),true,name+' validates the typed draft without waiting for a parent render');
}
contractApp.unmount();dom.window.close();
console.log('PASS: exact typed grid aliases; VForm + native S validation, rules/required/range, error/ARIA, template-ref focus, reset/server distinction, disabled/readonly, unregister, submit promise, direct V coexistence and common input handles.');
