import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {JSDOM,VirtualConsole} from 'jsdom';
import {solIconPaths} from '../site/icons.js';
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
const {build}=await import(new URL('node_modules/vite/dist/node/index.js',consumer));
const result=await build({root:fileURLToPath(consumer),configFile:false,logLevel:'error',ssr:{noExternal:true},build:{ssr:fileURLToPath(new URL('locale-runtime-entry.ts',consumer)),write:false,minify:false,rolldownOptions:{external:['vue']}}});
const output=result.output.find(x=>x.type==='chunk');assert.ok(output);
await writeFile(new URL('.runtime-check.mjs',consumer),output.code);
const api=await import(new URL('.runtime-check.mjs?locale='+Date.now(),consumer));
const {createApp,h,ref,nextTick,createVuetify,VApp,STextField,SDialog,SDataTable,SNumberInput,SDatePicker,STimePicker,SSelect,STextarea,SSnackbar,SMultiSelect,provideSolLocale,resolveSolLocale,formatSolNumber,parseSolNumber,formatSolDate}=api;
assert.equal(resolveSolLocale('en').close,'Close');assert.equal(resolveSolLocale('fr').code,'ko-KR');assert.equal(resolveSolLocale('__proto__').code,'ko-KR');
assert.equal(resolveSolLocale({code:'en',close:'Dismiss'},{required:'needed'}).close,'Dismiss');
assert.equal(resolveSolLocale({code:'ko',close:'앱 닫기'},{code:'en'}).close,'Close');
assert.equal(resolveSolLocale('en',{code:'bad',close:undefined,firstDay:9}).firstDay,0);
assert.equal(resolveSolLocale('en',{close:42}).close,'Close');
assert.equal(formatSolNumber(1234.5,'en'),'1,234.5');assert.equal(formatSolNumber(.123456,'ko'),'0.123456');assert.equal(parseSolNumber('1,234.5','en'),1234.5);
for(const bad of ['1,2','1e3','','Infinity','1 234','1,234,56'])assert.equal(parseSolNumber(bad),null,bad);
assert.equal(formatSolDate('2026-10-21','en'),'Oct 21, 2026');assert.equal(formatSolDate('0099-01-01','en'),'Jan 1, 99');assert.equal(formatSolDate('2026-02-30','en'),'');
const language=ref('ko'),dialog=ref(false),number=ref(1234.5),date=ref('2026-10-21'),time=ref('09:30'),selected=ref(['a']),page=ref(2),text=ref('draft');let changes=0;
const cols=[{key:'name',label:'Name'},{key:'count',label:'Count',format:'number'},{key:'date',label:'Date',format:'date'}];
const app=createApp({setup(){return()=>h(VApp,{},()=>h('main',[
 h(STextField,{id:'field',label:'Title',required:true,modelValue:text.value}),
 h(STextField,{id:'override',label:'Override',required:true,locale:{code:'en',required:'needed'}}),
 h(SNumberInput,{id:'number',label:'Number',modelValue:number.value,step:.5,'onUpdate:modelValue':v=>number.value=v,onChange:()=>changes++}),
 h(SDatePicker,{id:'date',label:'Date',modelValue:date.value,onChange:()=>changes++}),
 h(STimePicker,{id:'time',label:'Time',modelValue:time.value,min:'09:00',max:'18:00',step:15,onChange:()=>changes++}),
 h(SSelect,{id:'select',label:'Select',options:[]}),h(STextarea,{id:'textarea',label:'Note',modelValue:'sample'}),
 h(SMultiSelect,{id:'multi',label:'Tags',required:true,modelValue:[],options:[]}),
 h(SSnackbar,{id:'toast',message:'Caller message',modelValue:true}),
 h(SDialog,{id:'dialog',title:'Caller title',modelValue:dialog.value,'onUpdate:modelValue':v=>dialog.value=v}),
 h(SDataTable,{caption:'Caller caption',columns:cols,rows:[{id:'a',name:'Caller data',count:1234.5,date:'2026-10-21'}],selected:selected.value,selectable:true,page:page.value,pageCount:3})
 ]));}});provideSolLocale(app,()=>({code:language.value}));app.use(createVuetify());app.mount('#app');
const tick=async()=>{await nextTick();await nextTick();},$=s=>{const el=d.querySelector(s);assert.ok(el,s);return el;},fire=(el,type)=>el.dispatchEvent(new w.Event(type,{bubbles:true,cancelable:true}));await tick();
assert.match($('label[for=field]').textContent,/필수/);assert.match($('label[for=override]').textContent,/needed/);assert.equal($('#number').value,'1,234.5');
$('#number').value='1,2';fire($('#number'),'input');fire($('#number'),'blur');
$('#date').value='2026-02-30';fire($('#date'),'input');fire($('#date'),'blur');
$('#time').value='10:07';fire($('#time'),'input');fire($('#time'),'blur');await tick();$('#field').focus();language.value='en';await tick();
assert.equal(d.activeElement.id,'field');assert.equal($('#field').value,'draft');assert.match($('label[for=field]').textContent,/required/);
assert.equal($('#number').value,'1,2');assert.equal($('#number').validationMessage,'Enter a valid number.');assert.equal($('#date').value,'2026-02-30');assert.equal($('#date').validationMessage,'Enter a real date as YYYY-MM-DD.');assert.equal($('#time').value,'10:07');assert.match($('#time').validationMessage,/HH:mm/);
assert.equal($('#select option').textContent,'Choose');assert.equal($('#toast button').textContent,'Close');assert.equal($('.sol-ui-table-summary').textContent,'Page 2 of 3 · 1 selected');assert.equal($('.sol-data-table tbody td:nth-child(4)').textContent,'Oct 21, 2026');assert.equal(changes,0);
dialog.value=true;await tick();await new Promise(r=>setTimeout(r,50));assert.match($('#dialog-close').getAttribute('aria-label'),/Close/);language.value='ko';await tick();assert.match($('#dialog-close').getAttribute('aria-label'),/닫기/);assert.equal(d.activeElement.id,'dialog-close');assert.equal($('#dialog-title').textContent,'Caller title');dialog.value=false;await tick();
assert.deepEqual(selected.value,['a']);assert.equal(page.value,2);assert.equal(number.value,1234.5);assert.equal(date.value,'2026-10-21');assert.equal(time.value,'09:30');assert.equal(changes,0);
app.unmount();assert.deepEqual(errors,[]);dom.window.close();
console.log('PASS: installed locale packs/fallback/partial overrides/getter reactivity; Field/Dialog/Table/inputs/Toast language changes, invalid drafts and validity, focus/selection/page/models retained; Intl date-only and strict number parsing. Synthetic DOM, not browser layout.');
