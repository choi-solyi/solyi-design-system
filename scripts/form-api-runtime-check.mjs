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
await writeFile(entry,`export {createApp,h,ref,nextTick} from 'vue';\nexport {VTextField} from 'vuetify/components/VTextField';\nexport {VContainer,VRow,VCol} from 'vuetify/components/VGrid';\nexport * from ${JSON.stringify(source?'../../packages/vue-ui/src/index':'solyi-ui')};\n`);
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
contractApp.unmount();

// Audit API-001: blocked number nudges do not turn a valid boundary into an invalid draft.
const boundary = ref(10), boundaryStep = ref(1), boundaryChanges = []
const boundaryApp = createApp({
  setup() {
    return () => h(api.SNumberInput, {
      id: 'boundary-number',
      label: 'Boundary',
      min: 0,
      max: 10,
      step: boundaryStep.value,
      modelValue: boundary.value,
      'onUpdate:modelValue': value => {
        boundary.value = value
        boundaryChanges.push(value)
      },
    })
  },
})
boundaryApp.use(api.createSolyiVuetify()).mount('#app')
await tick()
const nudgeKey = key => $('#boundary-number').dispatchEvent(
  new w.KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }),
)
assert.equal($('[aria-label="Boundary ' + api.koLocale.increase + '"]').disabled, true)
nudgeKey('ArrowUp')
await tick()
assert.equal($('#boundary-number').value, '10')
assert.equal(d.querySelector('#boundary-number-error'), null)
assert.deepEqual(boundaryChanges, [])
boundary.value = 0
await tick()
assert.equal($('[aria-label="Boundary ' + api.koLocale.decrease + '"]').disabled, true)
nudgeKey('ArrowDown')
await tick()
assert.equal($('#boundary-number').value, '0')
assert.equal(d.querySelector('#boundary-number-error'), null)
assert.deepEqual(boundaryChanges, [])
boundary.value = 9.5
boundaryStep.value = 0.5
await tick()
nudgeKey('ArrowUp')
await tick()
nudgeKey('ArrowUp')
await tick()
assert.equal(boundary.value, 10)
assert.equal($('#boundary-number').value, '10')
assert.deepEqual(boundaryChanges, [10])
assert.equal(d.querySelector('#boundary-number-error'), null)
boundaryApp.unmount()

// Audit API-002: navigation/layout are not form fields. Supported error text and ARIA agree.
for (const name of ['STabs', 'SResizableSplitPane']) {
  for (const prop of ['rules', 'required', 'serverError', 'errorMessages']) {
    assert.equal(Object.hasOwn(api[name].props, prop), false, name + ' does not advertise ' + prop)
  }
}
const navigationForm = ref(null), tabError = ref('Tab explanation'), paneError = ref('Pane explanation')
const paneMinimum = ref(20)
const navigationApp = createApp({
  setup() {
    return () => h(api.SForm, { ref: navigationForm }, () => [
      h(api.STabs, {
        id: 'audit-tabs',
        label: 'Navigation',
        modelValue: 'a',
        items: [{ value: 'a', label: 'Alpha' }, { value: 'b', label: 'Beta' }],
        error: tabError.value,
      }),
      h(api.SResizableSplitPane, {
        id: 'audit-pane',
        label: 'Layout',
        modelValue: 50,
        min: paneMinimum.value,
        max: 80,
        primaryLabel: 'Primary',
        secondaryLabel: 'Secondary',
        error: paneError.value,
      }),
    ])
  },
})
navigationApp.use(api.createSolyiVuetify()).mount('#app')
await tick()
assert.equal((await navigationForm.value.validate()).valid, true, 'UI explanations are not field validation')
assert.equal($('#audit-tabs-error').textContent, 'Tab explanation')
assert.equal($('#audit-pane-error').textContent, 'Pane explanation')
assert.ok($('[role="tablist"]').getAttribute('aria-describedby').includes('audit-tabs-error'))
assert.ok($('[role="separator"]').getAttribute('aria-describedby').includes('audit-pane-error'))
const assertDescriptions = () => {
  for (const element of d.querySelectorAll('#app [aria-describedby]')) {
    for (const id of element.getAttribute('aria-describedby').split(' ')) {
      assert.ok(d.getElementById(id), 'Existing description ' + id)
    }
  }
}
assertDescriptions()
tabError.value = ''
paneError.value = ''
await tick()
assert.equal(d.querySelector('#audit-tabs-error'), null)
assert.equal(d.querySelector('#audit-pane-error'), null)
assertDescriptions()
paneMinimum.value = 90
await tick()
assert.ok($('#audit-pane-error').textContent)
assert.ok($('#audit-pane').getAttribute('aria-describedby').includes('audit-pane-error'))
assertDescriptions()
paneMinimum.value = 20
await tick()
assert.equal(d.querySelector('#audit-pane-error'), null)
assertDescriptions()
navigationApp.unmount()

// Audit A11Y-001: the shared desktop/mobile detail action name includes its visible label.
const tableApp = createApp({
  setup() {
    return () => h(api.SDataTable, {
      columns: [{ key: 'name', label: 'Name' }],
      rows: [{ id: 'fictional', name: 'Fictional record' }],
      caption: 'Name check',
    })
  },
})
tableApp.use(api.createSolyiVuetify()).mount('#app')
await tick()
const detailActions = [...d.querySelectorAll('.sol-ui-table [aria-label]')]
  .filter(element => element.tagName === 'BUTTON' && element.textContent.trim() === api.koLocale.details)
assert.equal(detailActions.length, 2, 'Both responsive detail actions are checked')
for (const action of detailActions) {
  assert.ok(action.getAttribute('aria-label').includes(action.textContent.trim()))
  assert.ok(action.getAttribute('aria-label').includes('Fictional record'))
}
tableApp.unmount()
dom.window.close();
console.log('PASS: exact typed grid aliases; VForm + native S validation, rules/required/range, error/ARIA, template-ref focus, reset/server distinction, disabled/readonly, unregister, submit promise, direct V coexistence and common input handles.');
console.log('PASS: bounded number keys match buttons; navigation/layout reject unsupported validation props, display error/ARIA stay linked through cleanup/config errors; table detail names include the visible label.');
