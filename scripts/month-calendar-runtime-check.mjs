import assert from 'node:assert/strict'
import {writeFile} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'
import {JSDOM} from 'jsdom'
const root=new URL('../',import.meta.url),consumer=new URL('examples/package-consumer/',root)
const dom=new JSDOM('<div id="app"></div>',{url:'https://example.test',pretendToBeVisual:true}),w=dom.window,d=w.document
for(const key of ['window','document','Element','Node','HTMLElement','HTMLInputElement','SVGElement','ShadowRoot','Document','MutationObserver','Event','MouseEvent','KeyboardEvent','FocusEvent','getComputedStyle'])Object.defineProperty(globalThis,key,{value:key==='window'?w:key==='document'?d:w[key],configurable:true})
globalThis.requestAnimationFrame=w.requestAnimationFrame.bind(w);globalThis.cancelAnimationFrame=w.cancelAnimationFrame.bind(w)
w.matchMedia=()=>({matches:false,addEventListener(){},removeEventListener(){}});globalThis.matchMedia=w.matchMedia
globalThis.ResizeObserver=class{observe(){}unobserve(){}disconnect(){}};globalThis.CSS={supports:()=>false}
const source=process.argv.includes('--source'),entry=source?'../../packages/vue-ui/src/index':'solyi-ui'
await writeFile(new URL('.runtime-extension-entry.ts',consumer),`export {createApp,h,ref,nextTick} from 'vue';export * from ${JSON.stringify(entry)};`)
const {build}=await import(new URL('node_modules/vite/dist/node/index.js',consumer))
const bundled=await build({root:fileURLToPath(consumer),configFile:false,logLevel:'error',resolve:{dedupe:['vue','vuetify']},ssr:{noExternal:true},build:{ssr:fileURLToPath(new URL('.runtime-extension-entry.ts',consumer)),write:false,minify:false,rolldownOptions:{external:['vue']}}})
await writeFile(new URL('.runtime-check.mjs',consumer),bundled.output.find(chunk=>chunk.type==='chunk').code)
const api=await import(new URL('.runtime-check.mjs?month='+Date.now(),consumer)),{createApp,h,ref,nextTick,SMonthCalendar}=api
const tick=async()=>{await nextTick();await nextTick()},$=selector=>{const node=d.querySelector(selector);assert.ok(node,selector);return node},day=iso=>$('[data-date="'+iso+'"] .sol-ui-month-day')
const press=(node,key,options={})=>{const event=new w.KeyboardEvent('keydown',{key,bubbles:true,cancelable:true,...options});node.dispatchEvent(event);return event}
const initialMarkers=Object.freeze({'2026-10-28':Object.freeze([
 Object.freeze({id:'a',label:'Alpha information',tone:'info',icon:'copy'}),Object.freeze({id:'b',label:'Beta attention',tone:'warning'}),Object.freeze({id:'c',label:'Gamma long marker'})
])})
let app,vuetify,handle,value,month,acceptValue,acceptMonth,disabled,readonly,loading,firstDay,markers,blocked,broken,events,locale
const warnings=[]
async function mount(){
 value=ref('2026-10-07');month=ref('2026-10');acceptValue=ref(true);acceptMonth=ref(true);disabled=ref(false);readonly=ref(false);loading=ref(false);firstDay=ref(0);markers=ref(initialMarkers);blocked=ref(['2026-10-10']);broken=ref(false);locale=ref('ko-KR');events={values:[],months:[],changes:[],monthChanges:[]}
 app=createApp({render:()=>h('main',[
  h(SMonthCalendar,{ref:next=>handle=next,id:'month',label:'Calendar',modelValue:value.value,month:month.value,today:'2026-10-28',markers:markers.value,firstDay:firstDay.value,disabled:disabled.value,readonly:readonly.value,loading:loading.value,
   isDateDisabled:date=>{if(broken.value)throw Error('consumer callback');return blocked.value.includes(date)},
   'onUpdate:modelValue':next=>{events.values.push(next);if(acceptValue.value)value.value=next},'onUpdate:month':next=>{events.months.push(next);if(acceptMonth.value)month.value=next},onChange:next=>events.changes.push(next),'onMonth-change':next=>events.monthChanges.push(next)},
   {cell:scope=>[h('span',{'data-cell-disabled':scope.disabled,'data-cell':scope.date},scope.selected?'Selected detail':''),h('button',{type:'button','data-slot-action':scope.date},'Slot action')]}),
  h('button',{id:'outside'},'Outside')])})
 app.config.warnHandler=message=>warnings.push(message);vuetify=api.createSolyiVuetify();app.use(vuetify).use({install:api.install},{locale}).mount('#app');await tick()
}
async function unmount(){app.unmount();vuetify.unmount();await tick()}
await mount();assert.equal(d.querySelectorAll('tbody tr').length,6);assert.equal(d.querySelectorAll('tbody td').length,42);assert.equal(d.querySelectorAll('.sol-ui-month-day').length,31);assert.equal(d.querySelectorAll('th').length,7)
assert.equal(day('2026-10-07').getAttribute('aria-pressed'),'true');assert.equal(day('2026-10-28').getAttribute('aria-current'),'date');assert.equal(day('2026-10-28').querySelectorAll('.sol-ui-month-marker').length,2);assert.match(day('2026-10-28').getAttribute('aria-label'),/Gamma long marker/);assert.equal(day('2026-10-28').querySelector('.sol-ui-month-more').textContent,'+1');assert.match(day('2026-10-28').querySelector('.sol-ui-month-more').title,/추가 1개/)
assert.equal(day('2026-10-10').getAttribute('aria-disabled'),'true');assert.equal(day('2026-10-10').disabled,false);day('2026-10-10').focus();press(day('2026-10-10'),'Enter');day('2026-10-10').click();assert.equal(events.values.length,0)
const slot=$('[data-slot-action="2026-10-10"]');assert.equal(press(slot,'ArrowDown').defaultPrevented,false);slot.click();assert.equal(events.values.length,0)
acceptValue.value=false;day('2026-10-12').click();await tick();assert.equal(value.value,'2026-10-07');assert.deepEqual(events.values,['2026-10-12']);assert.deepEqual(events.changes[0],{value:'2026-10-12',previousValue:'2026-10-07',reason:'keyboard'});assert.equal(day('2026-10-07').getAttribute('aria-pressed'),'true')
acceptValue.value=true;day('2026-10-12').click();await tick();assert.equal(value.value,'2026-10-12');assert.equal(events.changes.length,2);day('2026-10-12').click();assert.equal(events.changes.length,2,'Same selection does not emit a duplicate change');await unmount()

await mount();acceptMonth.value=false;const next=$('button[aria-label="다음 달"]');next.focus();next.click();await tick();assert.equal(month.value,'2026-10');assert.deepEqual(events.months,['2026-11']);assert.deepEqual(events.monthChanges[0],{month:'2026-11',previousMonth:'2026-10',reason:'next'});assert.equal(events.values.length,0)
acceptMonth.value=true;next.click();await tick();assert.equal(month.value,'2026-11');assert.equal(value.value,'2026-10-07');assert.equal(d.activeElement,next)
const today=[...d.querySelectorAll('.sol-ui-month-toolbar button')].at(-1);today.focus();today.click();await tick();assert.equal(month.value,'2026-10');assert.equal(value.value,'2026-10-07');assert.equal(d.activeElement,day('2026-10-28'));await unmount()

await mount();handle.focus('2026-10-31');await tick();press(day('2026-10-31'),'ArrowRight');await tick();assert.equal(month.value,'2026-11');assert.equal(value.value,'2026-10-07');assert.equal(d.activeElement,day('2026-11-01'));assert.equal(events.monthChanges[0].reason,'keyboard')
firstDay.value=1;await tick();handle.focus('2026-11-04');await tick();press(day('2026-11-04'),'Home');await tick();assert.equal(d.activeElement,day('2026-11-02'));press(day('2026-11-02'),'End');await tick();assert.equal(d.activeElement,day('2026-11-08'));press(day('2026-11-08'),'PageUp');await tick();assert.equal(month.value,'2026-10');assert.equal(d.activeElement,day('2026-10-08'));assert.equal(events.values.length,0);await unmount()

await mount();acceptMonth.value=false;handle.focus('2026-10-31');await tick();press(day('2026-10-31'),'ArrowRight');await tick();assert.equal(d.activeElement,day('2026-10-31'));$('#outside').focus();month.value='2026-11';await tick();assert.equal(d.activeElement,$('#outside'),'A delayed accepted month must not steal outside focus');await unmount()
await mount();acceptMonth.value=false;handle.focus('2026-10-31');await tick();press(day('2026-10-31'),'ArrowRight');await tick();handle.focus('2026-10-05');await tick();month.value='2026-11';await tick();assert.equal(day('2026-11-01').getAttribute('tabindex'),'0','A later local focus action discards the stale month intent');await unmount()

await mount();loading.value=true;markers.value={};await tick();assert.equal($('#month').getAttribute('aria-busy'),'true');assert.equal(d.querySelectorAll('tbody td').length,42);assert.equal(value.value,'2026-10-07');day('2026-10-12').click();assert.equal(events.values.length,0);loading.value=false;markers.value=initialMarkers;await tick();assert.equal(day('2026-10-07').getAttribute('aria-pressed'),'true');assert.equal(events.values.length,0)
readonly.value=true;await tick();handle.focus('2026-10-12');await tick();press(day('2026-10-12'),'ArrowRight');await tick();assert.equal(d.activeElement,day('2026-10-13'));press(day('2026-10-13'),'Enter');assert.equal(events.values.length,0);$('button[aria-label="다음 달"]').click();await tick();assert.equal(month.value,'2026-11');disabled.value=true;await tick();assert.ok([...d.querySelectorAll('.sol-ui-month-toolbar button,.sol-ui-month-day')].every(button=>button.disabled));await unmount()

for(const invalid of ['month','model','callback','markers']){
 await mount();if(invalid==='month')month.value='2026-13';if(invalid==='model')value.value='2026-02-30';if(invalid==='callback')broken.value=true;if(invalid==='markers')markers.value={'2026-10-28':[{id:'same',label:'A'},{id:'same',label:'B'}]};await tick();assert.ok($('[role=alert]').textContent);assert.equal(events.values.length,0);assert.equal(events.months.length,0);assert.equal(d.querySelectorAll('tbody td').length,42);if(invalid!=='month'){day('2026-10-12').click();assert.equal(events.values.length,0)}await unmount()
}
await mount();locale.value='en-US';await tick();assert.match(day('2026-10-28').getAttribute('aria-label'),/Today/);assert.match(day('2026-10-28').querySelector('.sol-ui-month-more').title,/1 more/);assert.equal($('button[aria-label="Previous month"]').type,'button');markers.value={};await tick();assert.match($('#month-empty').textContent,/No date-specific data/);assert.equal(events.values.length,0);await unmount()
assert.deepEqual(initialMarkers['2026-10-28'].map(marker=>marker.id),['a','b','c']);assert.equal(Object.isFrozen(initialMarkers['2026-10-28']),true);assert.deepEqual(warnings,[])
dom.window.close()
console.log('PASS: '+(source?'source':'installed')+' month calendar controlled selection/month acceptance and refusal, native table/42 cells, marker overflow/accessibility, disabled/readonly/loading, ISO retention, keyboard/month focus and delayed data, invalid callbacks/models, slot independence and ko/en. Real browser geometry is separate.')
