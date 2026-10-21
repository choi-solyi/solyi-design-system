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
const result=await build({root:fileURLToPath(consumer),configFile:false,logLevel:'error',ssr:{noExternal:true},build:{ssr:fileURLToPath(new URL('runtime-entry.ts',consumer)),write:false,minify:false,rolldownOptions:{external:['vue']}}});
const output=result.output.find(x=>x.type==='chunk');assert.ok(output);
await writeFile(new URL('.runtime-check.mjs',consumer),output.code);
const {createApp,h,ref,nextTick,createVuetify,VApp,SolButton,SolField,SolDialog,SolTable}=await import(new URL('.runtime-check.mjs?check='+Date.now(),consumer));
const text=ref(''),open=ref(false),loading=ref(false),selection=ref([]),sort=ref(null),page=ref(1),selectable=ref(true),ariaDisabled=ref(false);let clicks=0,retries=0;const state=ref('ready');
const columns=[{key:'name',label:'이름',sortable:true},{key:'date',label:'날짜',width:'128px'}],rows=ref([{id:'a',name:'가상 자료',date:'2026-10-21'},{id:'b',name:'두 번째 자료',date:'2026-10-20'}]);
const app=createApp({setup(){return()=>h(VApp,{},()=>h('main',[
 h(SolButton,{id:'package-button',loading:loading.value,'aria-disabled':ariaDisabled.value?'true':undefined,onClick:()=>clicks++},()=> '실행'),
 h(SolButton,{id:'package-open',onClick:()=>open.value=true},()=> '열기'),
 h(SolField,{id:'package-field',label:'가상 제목',modelValue:text.value,error:text.value.length===1?'두 자 이상 입력하세요.':'',help:'가상 값','onUpdate:modelValue':value=>text.value=value}),
 h(SolDialog,{id:'package-dialog',title:'가상 상세',modelValue:open.value,'onUpdate:modelValue':value=>open.value=value},()=>h('p','대화상자 내용')),
 h(SolTable,{caption:'패키지 검사 자료',columns,rows:rows.value,selectable:selectable.value,selected:selection.value,'onUpdate:selected':value=>selection.value=value,sort:sort.value,'onUpdate:sort':value=>sort.value=value,page:page.value,pageCount:3,'onUpdate:page':value=>page.value=value,loading:state.value==='loading',error:state.value==='error'?'가상 오류':'',onRetry:()=>retries++})
 ]));}});app.use(createVuetify());app.mount('#app');await nextTick();
const $=s=>d.querySelector(s),click=s=>$(s).click(),pause=()=>new Promise(r=>setTimeout(r,50));
for(const button of d.querySelectorAll('.sol-pagination .sol-ui-page-icon')){const svg=button.querySelector('svg');assert.ok(svg);assert.equal(svg.getAttribute('aria-hidden'),'true');assert.equal(svg.getAttribute('viewBox'),'0 0 24 24');assert.equal(svg.querySelector('path').getAttribute('d'),solIconPaths.chevron);assert.equal(button.querySelector('.v-btn__content').textContent,'');}
assert.equal($('.sol-ui-table-mobile-caption').textContent,$('.sol-ui-table caption').textContent);
click('#package-button');assert.equal(clicks,1);loading.value=true;await nextTick();$('#package-button').focus();click('#package-button');assert.equal(clicks,1);assert.equal($('#package-button').getAttribute('aria-busy'),'true');assert.equal(d.activeElement.id,'package-button');loading.value=false;await nextTick();
ariaDisabled.value=true;await nextTick();$('#package-button').focus();click('#package-button');assert.equal(clicks,1,'Forwarded aria-disabled blocks click');assert.equal($('#package-button').getAttribute('aria-disabled'),'true');assert.equal($('#package-button').disabled,false,'Focusable disabled action keeps native focusability');assert.equal(d.activeElement.id,'package-button');ariaDisabled.value=false;await nextTick();
const field=$('#package-field');assert.equal(d.querySelector('label[for=package-field]').textContent,'가상 제목');field.value='가';field.dispatchEvent(new w.Event('input',{bubbles:true}));await nextTick();assert.equal(text.value,'가');assert.equal(field.getAttribute('aria-invalid'),'true');assert.ok(field.getAttribute('aria-describedby').includes('package-field-error'));field.value='가상';field.dispatchEvent(new w.Event('input',{bubbles:true}));await nextTick();assert.equal(field.getAttribute('aria-invalid'),'false');
const select=$('.sol-ui-table-desktop tbody input');select.checked=true;select.dispatchEvent(new w.Event('change',{bubbles:true}));await nextTick();assert.deepEqual(selection.value,['a']);$('.sol-sort-button').click();await nextTick();assert.deepEqual(sort.value,{key:'name',direction:'ascending'});$('.sol-pagination [aria-label="다음 페이지"]').click();await nextTick();await nextTick();assert.equal(page.value,2);assert.equal(d.activeElement.getAttribute('aria-current'),'page');
for(const box of d.querySelectorAll('.sol-ui-table-desktop thead input,.sol-ui-table-mobile-select input'))assert.equal(box.indeterminate,true);
selection.value.push('b');await nextTick();await nextTick();assert.equal($('.sol-ui-table-desktop thead input').indeterminate,false);assert.equal($('.sol-ui-table-desktop thead input').checked,true);selection.value.splice(1,1);await nextTick();await nextTick();assert.equal($('.sol-ui-table-desktop thead input').indeterminate,true);
selectable.value=false;await nextTick();selectable.value=true;await nextTick();await nextTick();for(const box of d.querySelectorAll('.sol-ui-table-desktop thead input,.sol-ui-table-mobile-select input'))assert.equal(box.indeterminate,true,'Re-enabled selection retains partial state');
rows.value.splice(1,1);await nextTick();await nextTick();assert.equal($('.sol-ui-table-desktop thead input').indeterminate,false);rows.value.push({id:'b',name:'두 번째 자료',date:'2026-10-20'});await nextTick();await nextTick();assert.equal($('.sol-ui-table-desktop thead input').indeterminate,true,'In-place row changes recompute partial state');
const mobileSort=$('.sol-ui-table-mobile-sort select');mobileSort.value='name';mobileSort.dispatchEvent(new w.Event('change',{bubbles:true}));await nextTick();assert.deepEqual(sort.value,{key:'name',direction:'ascending'});$('.sol-ui-table-mobile-sort button').click();await nextTick();assert.deepEqual(sort.value,{key:'name',direction:'descending'});assert.equal($('.sol-ui-table-desktop th[aria-sort=descending] button').textContent.trim(),'이름↓');
state.value='loading';await nextTick();assert.equal($('.sol-ui-table').getAttribute('aria-busy'),'true');assert.equal($('.sol-pagination button').disabled,true);state.value='error';await nextTick();[...d.querySelectorAll('.sol-ui-table button')].find(b=>b.textContent.includes('다시 시도')).click();assert.equal(retries,1);state.value='ready';await nextTick();
$('#package-open').focus();click('#package-open');await nextTick();await pause();assert.ok(d.querySelector('[role=dialog]'));assert.ok(d.getElementById('package-dialog-close'));$('#package-dialog-close').click();await nextTick();await pause();assert.equal(open.value,false);assert.equal(d.activeElement.id,'package-open');
for(const theme of ['violet','sage','sand'])for(const mode of ['light','dark']){d.documentElement.dataset.theme=theme;d.documentElement.dataset.mode=mode;assert.ok($('#package-field'));}
app.unmount();assert.equal(d.querySelectorAll('.sol-full-text-dialog,.sol-overflow-tooltip').length,0);assert.deepEqual(errors,[]);dom.window.close();
console.log('PASS: installed tarball Button loading guard/focus, Field value/linked error, controlled Table selection/sort/page/busy/retry, Dialog close/return and unmount cleanup. Synthetic DOM is not browser layout/native keyboard verification.');
