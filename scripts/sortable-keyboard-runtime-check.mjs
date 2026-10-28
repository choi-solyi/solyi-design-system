/* Internal component only: public root/global registration follows pointer verification. */
import assert from 'node:assert/strict'
import {writeFile} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'
import {JSDOM} from 'jsdom'
const root=new URL('../',import.meta.url),consumer=new URL('examples/package-consumer/',root)
const dom=new JSDOM('<div id="app"></div>',{url:'https://example.test',pretendToBeVisual:true}),w=dom.window,d=w.document
for(const name of ['window','document','Element','Node','HTMLElement','HTMLInputElement','SVGElement','ShadowRoot','Document','MutationObserver','Event','MouseEvent','KeyboardEvent','FocusEvent','getComputedStyle'])Object.defineProperty(globalThis,name,{value:name==='window'?w:name==='document'?d:w[name],configurable:true})
globalThis.requestAnimationFrame=w.requestAnimationFrame.bind(w);globalThis.cancelAnimationFrame=w.cancelAnimationFrame.bind(w)
w.matchMedia=()=>({matches:false,addEventListener(){},removeEventListener(){}});globalThis.matchMedia=w.matchMedia
globalThis.ResizeObserver=class{observe(){}unobserve(){}disconnect(){}};globalThis.CSS={supports:()=>false}
const sourceMode=process.argv.includes('--source'),entry=sourceMode?'../../packages/vue-ui/src/index':'solyi-ui'
await writeFile(new URL('.runtime-extension-entry.ts',consumer),`export {createApp,h,ref,nextTick} from 'vue';export * from ${JSON.stringify(entry)};`)
const {build}=await import(new URL('node_modules/vite/dist/node/index.js',consumer))
const bundled=await build({root:fileURLToPath(consumer),configFile:false,logLevel:'error',resolve:{dedupe:['vue','vuetify']},ssr:{noExternal:true},build:{ssr:fileURLToPath(new URL('.runtime-extension-entry.ts',consumer)),write:false,minify:false,rolldownOptions:{external:['vue']}}})
await writeFile(new URL('.runtime-check.mjs',consumer),bundled.output.find(chunk=>chunk.type==='chunk').code)
const api=await import(new URL('.runtime-check.mjs?sortable='+Date.now(),consumer)),{createApp,h,ref,nextTick,SSortableList}=api
const tick=async()=>{await nextTick();await nextTick()},$=selector=>{const element=d.querySelector(selector);assert.ok(element,selector);return element}
const press=(element,key,extra={})=>{const event=new w.KeyboardEvent('keydown',{key,bubbles:true,cancelable:true,...extra});element.dispatchEvent(event);return event}
const originals=Object.freeze(['a','b','c'].map((id,index)=>Object.freeze({id,title:id.toUpperCase(),details:Object.freeze({count:index+1})})))
let app,vuetify,value,disabled,readonly,accept,locale,handle,events,show,mutatePreview,locked,invalidDisabler
const warnings=[]
async function mount(){
  value=ref(originals);disabled=ref(false);readonly=ref(false);accept=ref(true);locale=ref('ko-KR');show=ref(true);mutatePreview=false
  locked=ref([]);invalidDisabler=ref(false)
  events={updates:[],change:[],start:[],preview:[],end:[]}
  app=createApp({render:()=>h('main',[show.value?h(SSortableList,{ref:next=>handle=next,id:'sort',label:'Items',modelValue:value.value,itemKey:item=>item.id,itemLabel:item=>item.title,disabled:disabled.value,readonly:readonly.value,
    isItemDisabled:item=>{if(invalidDisabler.value)throw Error('consumer disabled callback');return locked.value.includes(item.id)},
    'onUpdate:modelValue':next=>{events.updates.push(next);if(accept.value)value.value=next},onChange:next=>events.change.push(next),onStart:next=>events.start.push(next),onPreview:next=>{events.preview.push(next);if(mutatePreview)next.items.pop()},onEnd:next=>events.end.push(next),
  },{item:({item,index,active})=>[h('strong',item.title),h('input',{id:'content-'+item.id,value:item.details.count,'data-index':index,'data-active':active})]}):null,h('button',{id:'outside'},'Outside')])})
  app.config.warnHandler=message=>warnings.push(message);vuetify=api.createSolyiVuetify();app.use(vuetify).use({install:api.install},{locale}).mount('#app');await tick()
}
async function unmount(){app.unmount();vuetify.unmount();await tick()}
const keys=()=>value.value.map(item=>item.id),buttons=()=>[...d.querySelectorAll('.sol-ui-sortable-handle')],keyHandle=key=>buttons().find(button=>button.getAttribute('aria-label')?.includes(key.toUpperCase()))
await mount();keyHandle('a').focus();press(keyHandle('a'),' ');press(keyHandle('a'),'End');await tick()
assert.deepEqual(keys(),['a','b','c']);assert.deepEqual(events.updates,[]);assert.equal(events.preview.at(-1).to,2);assert.equal(keyHandle('a').getAttribute('aria-pressed'),'true')
assert.equal($('#content-a').value,'1');assert.equal(press($('#content-a'),'ArrowDown').defaultPrevented,false,'Interactive row content cannot start or move a gesture')
press(keyHandle('a'),'Enter');await tick();assert.deepEqual(keys(),['b','c','a']);assert.equal(value.value[2],originals[0]);assert.equal(events.change.length,1);assert.equal(events.end.at(-1).status,'commit');assert.equal(d.activeElement,keyHandle('a'))
assert.deepEqual(originals.map(item=>item.id),['a','b','c']);assert.equal(d.querySelector('ol').getAttribute('aria-labelledby'),'sort-label');assert.equal(d.querySelector('[role=listbox]'),null)
await unmount()

await mount();accept.value=false;await tick();keyHandle('b').focus();press(keyHandle('b'),' ');press(keyHandle('b'),'Home');press(keyHandle('b'),'Enter');await tick()
assert.deepEqual(keys(),['a','b','c']);assert.deepEqual(events.updates[0].map(item=>item.id),['b','a','c']);assert.equal(d.activeElement,keyHandle('b'))
press(keyHandle('b'),' ');press(keyHandle('b'),'ArrowDown');press(keyHandle('b'),'Escape');await tick();assert.equal(events.end.at(-1).reason,'escape');assert.equal(events.change.length,1)
press(keyHandle('b'),'Enter');const tab=press(keyHandle('b'),'Tab');await tick();assert.equal(tab.defaultPrevented,false);assert.equal(events.end.at(-1).reason,'tab')
await unmount()

for(const action of ['external','remove','disabled','readonly','api','blur','unmount']){
  await mount();keyHandle('b').focus();press(keyHandle('b'),' ');press(keyHandle('b'),'End')
  if(action==='external')value.value=[...originals]
  if(action==='remove')value.value=[originals[2]]
  if(action==='disabled')disabled.value=true
  if(action==='readonly')readonly.value=true
  if(action==='api')handle.cancel()
  if(action==='blur')$('#outside').focus()
  if(action==='unmount')show.value=false
  await tick();assert.equal(events.end.length,1,action);assert.equal(events.end[0].status,'cancel',action);assert.equal(events.change.length,0,action)
  assert.equal(events.end[0].reason,action==='remove'?'external':action==='readonly'?'disabled':action,action)
  if(action==='remove')assert.equal(d.activeElement,keyHandle('c'),'Removed key falls back to a surviving handle')
  if(action==='blur')assert.equal(d.activeElement,$('#outside'),'Cancellation must not steal an explicit outside focus')
  await unmount()
}

await mount();keyHandle('b').focus();press(keyHandle('b'),'Enter');press(keyHandle('b'),'ArrowDown');await tick();locale.value='en-US';await tick()
assert.equal(events.end.length,0);assert.equal(keyHandle('b').getAttribute('aria-pressed'),'true');assert.match($('output').textContent,/Proposed position: B/)
press(keyHandle('b'),'Escape');await tick();await unmount()

await mount();mutatePreview=true;keyHandle('a').focus();press(keyHandle('a'),' ');press(keyHandle('a'),'End');press(keyHandle('a'),'Enter');await tick()
assert.deepEqual(keys(),['b','c','a']);assert.equal(events.change[0].items.length,3,'A mutated preview cannot damage the eventual proposal');await unmount()

await mount();const first=$('.sol-ui-sortable-row'),moves=first.querySelectorAll('.sol-ui-sortable-moves button');assert.equal(moves[0].disabled,true)
moves[1].focus();moves[1].click();await tick();assert.deepEqual(keys(),['b','a','c']);assert.equal(events.change[0].input,'button');assert.equal(d.activeElement,d.querySelectorAll('.sol-ui-sortable-row')[1].querySelectorAll('.sol-ui-sortable-moves button')[1])
readonly.value=true;await tick();assert.ok([...d.querySelectorAll('.sol-ui-sortable button')].every(button=>button.disabled));assert.equal($('#content-a').disabled,false,'Slot-owned input state belongs to the consumer');await unmount()

await mount();value.value=[{id:'a',title:'A',details:{count:1}},{id:'a',title:'Duplicate',details:{count:2}}];await tick();assert.ok($('[role=alert]').textContent);assert.ok(buttons().every(button=>button.disabled));assert.deepEqual(events.updates,[]);await unmount()
await mount();value.value=[];await tick();assert.equal(buttons().length,0);handle.focus();assert.equal(d.activeElement,$('#sort'));await unmount()
const captured=new WeakMap()
w.HTMLElement.prototype.setPointerCapture=function(id){captured.set(this,id)}
w.HTMLElement.prototype.hasPointerCapture=function(id){return captured.get(this)===id}
w.HTMLElement.prototype.releasePointerCapture=function(){captured.delete(this)}
function geometry(){const rect=(top,height,width=300)=>({x:0,y:top,left:0,right:width,top,bottom:top+height,width,height,toJSON(){}})
  $('.sol-ui-sortable-list').getBoundingClientRect=()=>rect(0,180)
  d.querySelectorAll('.sol-ui-sortable-row').forEach((row,index)=>{row.getBoundingClientRect=()=>rect(index*60,60);row.querySelector('.sol-ui-sortable-handle').getBoundingClientRect=()=>rect(index*60+10,40,40)})
}
function point(element,type,y=20,x=20,id=1){const event=new w.MouseEvent(type,{bubbles:true,cancelable:true,clientX:x,clientY:y,button:0});Object.defineProperties(event,{pointerId:{value:id},isPrimary:{value:true},pointerType:{value:'touch'}});element.dispatchEvent(event);return event}
await mount();geometry();point(keyHandle('a'),'pointerdown');point(w,'pointerup');keyHandle('a').dispatchEvent(new w.MouseEvent('click',{bubbles:true,detail:1}));await tick()
assert.equal(events.start.length,0);assert.equal(events.change.length,0,'A pointer tap cannot enter or commit a keyboard gesture');await unmount()
await mount();geometry();point(keyHandle('a'),'pointerdown');point(w,'pointermove',150);await tick();assert.deepEqual(keys(),['a','b','c']);point(w,'pointerup',150,20,2);assert.equal(events.end.length,0,'Another pointer cannot finish this gesture')
point(w,'pointerup',150);await tick();assert.deepEqual(keys(),['b','c','a']);assert.equal(events.end.length,1);assert.equal(events.end[0].input,'pointer');assert.equal(keyHandle('a').hasPointerCapture(1),false);await unmount()
for(const reason of ['pointercancel','capture','outside','external','disabled','readonly','unmount','blur','escape']){
 await mount();geometry();point(keyHandle('a'),'pointerdown');point(w,'pointermove',150);await tick()
 if(reason==='pointercancel')point(w,'pointercancel',150)
 if(reason==='capture')point(keyHandle('a'),'lostpointercapture',150)
 if(reason==='outside')point(w,'pointerup',150,400)
 if(reason==='external')value.value=[...originals].reverse()
 if(reason==='disabled')disabled.value=true
 if(reason==='readonly')readonly.value=true
 if(reason==='unmount')show.value=false
 if(reason==='blur')w.dispatchEvent(new w.Event('blur'))
 if(reason==='escape')press(w,'Escape')
 await tick();point(w,'pointerup',150);point(w,'pointermove',60);await tick()
 assert.equal(events.change.length,0,reason);assert.equal(events.end.length,1,reason);assert.equal(events.end[0].reason,reason==='readonly'?'disabled':reason,reason)
 await unmount()
}
await mount();geometry();point(keyHandle('a'),'pointerdown');value.value=[...originals];await tick();point(w,'pointermove',150);point(w,'pointerup',150);assert.equal(events.start.length,0);assert.equal(events.end.length,0,'An external change cancels a pending press before its start threshold');await unmount()
await mount();locked.value=['b'];await tick();geometry();assert.equal(keyHandle('b').disabled,true);assert.ok([...d.querySelectorAll('.sol-ui-sortable-row')[1].querySelectorAll('button')].every(button=>button.disabled));assert.equal($('#content-b').disabled,false)
press(keyHandle('b'),' ');point(keyHandle('b'),'pointerdown');point(w,'pointermove',150);point(w,'pointerup',150);assert.equal(events.start.length,0);assert.equal(events.change.length,0)
keyHandle('a').focus();press(keyHandle('a'),' ');press(keyHandle('a'),'End');press(keyHandle('a'),'Enter');await tick();assert.deepEqual(keys(),['b','c','a'],'Other rows may pass an immovable source; its absolute index is not locked');await unmount()
for(const interaction of ['keyboard','pointer','pending']){
 await mount();geometry();keyHandle('a').focus()
 if(interaction==='keyboard'){press(keyHandle('a'),' ');press(keyHandle('a'),'End')}
 else{point(keyHandle('a'),'pointerdown');if(interaction==='pointer')point(w,'pointermove',150)}
 locked.value=['a'];await tick();point(w,'pointermove',150);point(w,'pointerup',150);await tick()
 assert.deepEqual(keys(),['a','b','c']);assert.equal(events.change.length,0);assert.equal(events.end.length,interaction==='pending'?0:1)
 if(interaction!=='pending'){assert.equal(events.end[0].reason,'disabled');assert.equal(d.activeElement,keyHandle('b'),'A newly unavailable source restores focus to an available handle')}
 await unmount()
}
await mount();press(keyHandle('a'),' ');locked.value=['c'];await tick();assert.equal(events.end.length,0,'Unrelated disabled changes do not cancel the active source');press(keyHandle('a'),'ArrowDown');press(keyHandle('a'),'Enter');await tick();assert.deepEqual(keys(),['b','a','c']);await unmount()
await mount();invalidDisabler.value=true;await tick();assert.ok(buttons().every(button=>button.disabled));assert.ok($('[role=alert]').textContent);assert.equal(events.change.length,0);await unmount()
assert.deepEqual(warnings,[])
console.log('PASS: '+(sourceMode?'source':'installed')+' generic list keyboard/button proposals, frozen object identity, controlled rejection, slot content, external removal/replace, seven cancel paths, focus, locale, readonly/invalid/empty and preview isolation. Real pointer/keyboard/touch are checked separately in Chrome.')
