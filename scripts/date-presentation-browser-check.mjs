/* Public built Date adapter in a fresh local-only Chrome context; never a shared browser. */
import assert from 'node:assert/strict'
import http from 'node:http'
import path from 'node:path'
import {mkdir,readFile,writeFile} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'
const root=new URL('../',import.meta.url),consumer=new URL('examples/package-consumer/',root),fixture=new URL('.runtime-test/picker-host/date/',consumer),out=new URL('qa-output/date-presentation/',root)
const {build}=await import(new URL('node_modules/vite/dist/node/index.js',consumer)),{chromium}=await import(new URL('.tooling/browser-qa/node_modules/playwright-core/index.mjs',root))
await mkdir(fixture,{recursive:true});await mkdir(out,{recursive:true})
await writeFile(new URL('index.html',fixture),'<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Public Date presentation</title><style>body{margin:0}main{padding:var(--sol-space-4);min-height:110vh}.fields{display:grid;gap:var(--sol-space-3);inline-size:280px;max-inline-size:100%}.native-parent{max-width:calc(100vw - 2 * var(--sol-space-4));box-sizing:border-box}</style><div id="app"></div><script type="module" src="./entry.js"></script></html>')
await writeFile(new URL('entry.js',fixture),`
import {createApp,h,ref,nextTick} from 'vue'
import SolyiUI,{SDatePicker,SDialog,SForm,createSolyiVuetify,applySolyiAppearance} from 'solyi-ui'
import 'solyi-ui/all.css'
const q=new URLSearchParams(location.search),context=q.get('context')||'page',dir=q.get('dir')||'ltr',mode=ref(q.get('mode')||'single'),presentation=ref(q.get('presentation')||'legacy'),parent=ref(false),native=ref(null),value=ref(mode.value==='range'?{start:'2026-10-15',end:'2026-10-18'}:'2026-10-15'),disabled=ref(false),readonly=ref(false),formReadonly=ref(false),accept=ref(true),show=ref(true)
const events={updates:[],changes:[],closes:[],opens:0,clears:[]}
document.documentElement.dir=dir
const button=(id,text,click)=>h('button',{id,type:'button',class:'sol-button',onClick:click},text)
const fields=()=>h(SForm,{id:'canonical-form',readonly:formReadonly.value},()=>h('div',{class:'fields'},[
 show.value?h(SDatePicker,{id:'date',name:'canonical',label:'Date field',clearable:true,required:q.has('required'),mode:mode.value,modelValue:value.value,disabled:disabled.value,readonly:readonly.value,pickerPresentation:presentation.value==='legacy'?undefined:presentation.value,placement:q.get('placement')||'bottom-start',displayFormatter:q.has('display')?iso=>iso+' (display)':undefined,'onUpdate:modelValue':v=>{events.updates.push(v);if(accept.value)value.value=v},onChange:v=>events.changes.push(v),onOpen:()=>events.opens++,onClose:r=>events.closes.push(r),onClear:e=>events.clears.push(e)}):null,
 h('input',{id:'outside-field',class:'sol-input','aria-label':'Outside field'}),button('outside','Outside',()=>{}),
]))
const v=createSolyiVuetify({locale:{locale:q.get('locale')||'en',rtl:{en:dir==='rtl',ko:dir==='rtl'}}}),app=createApp({render:()=>h('main',[
 button('open-parent','Open parent',async()=>{parent.value=true;await nextTick();if(context==='native')native.value.showModal()}),
 context==='page'?h('section',{style:q.has('low')?'padding-top:55vh':''},fields()):context==='native'?h('dialog',{id:'native-parent',ref:native,class:'native-parent',onCancel:()=>parent.value=false},[h('h2','Native parent'),fields()]):h(SDialog,{id:'parent',title:'Parent',presentation:context==='drawer'?'drawer':'dialog',modelValue:parent.value,'onUpdate:modelValue':x=>parent.value=x},fields),
])})
app.use(v);app.use(SolyiUI,{locale:q.get('locale')||'en'});app.mount('#app');applySolyiAppearance(v.theme,{theme:q.get('theme')||'violet',mode:q.get('color')||'light',density:q.get('density')||'comfortable'})
window.qa={get:()=>({value:value.value,events:JSON.parse(JSON.stringify(events)),parent:parent.value,blocked:[...document.querySelectorAll('.v-overlay-scroll-blocked')].length,form:document.querySelector('#canonical-form')?new FormData(document.querySelector('#canonical-form')).get('canonical'):null}),set:async(k,x)=>{({mode,presentation,value,disabled,readonly,formReadonly,accept,show})[k].value=x;await nextTick()}}
`)
await build({root:fileURLToPath(fixture),configFile:false,logLevel:'error',resolve:{dedupe:['vue','vuetify'],alias:[{find:/^solyi-ui$/,replacement:fileURLToPath(new URL('packages/vue-ui/dist/index.js',root))},{find:/^solyi-ui\/all\.css$/,replacement:fileURLToPath(new URL('packages/vue-ui/dist/all.css',root))}]},build:{outDir:'dist',emptyOutDir:true}})
const dist=new URL('dist/',fixture),server=http.createServer(async(req,res)=>{try{const name=decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\//,'')||'index.html',file=new URL(name,dist);if(!file.href.startsWith(dist.href)){res.writeHead(403).end();return}const bytes=await readFile(file);res.setHeader('Content-Type',file.pathname.endsWith('.js')?'text/javascript':file.pathname.endsWith('.css')?'text/css':file.pathname.endsWith('.html')?'text/html':'application/octet-stream');res.end(bytes)}catch{res.writeHead(404).end()}})
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const origin='http://127.0.0.1:'+server.address().port
let browser
const records=[],errors=[]
try{
 browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,chromiumSandbox:true})
 const context=await browser.newContext({hasTouch:true}),page=await context.newPage();page.setDefaultTimeout(12000);page.on('pageerror',error=>errors.push(error.message));await page.route('**/*',route=>new URL(route.request().url()).origin===origin?route.continue():route.abort())
 const field=()=>page.locator('.sol-ui-date').first(),trigger=()=>field().locator('.sol-date-open'),panel=()=>page.locator('#date-calendar'),get=()=>page.evaluate(()=>window.qa.get()),set=(key,value)=>page.evaluate(([k,v])=>window.qa.set(k,v),[key,value])
 const goto=async(params={})=>{await page.goto(origin+'/?'+new URLSearchParams(params),{waitUntil:'networkidle'});if(params.context&&params.context!=='page')await page.locator('#open-parent').click()}
 const open=async()=>{await trigger().click();await panel().waitFor();await page.waitForFunction(()=>document.activeElement?.hasAttribute('data-calendar-day'))}
 const within=async()=>{const box=await panel().boundingBox(),viewport=page.viewportSize();assert.ok(box&&box.x>=-1&&box.y>=-1&&box.x+box.width<=viewport.width+1&&box.y+box.height<=viewport.height+1,JSON.stringify({url:page.url(),box,viewport}));assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);return box}
 for(const width of process.argv.includes('--focused')?[]:[320,768,1440])for(const dir of ['ltr','rtl'])for(const parent of ['page','dialog','drawer','native'])for(const presentation of ['legacy','popover','dialog','auto']){
  await page.setViewportSize({width,height:900});await goto({context:parent,presentation,dir,...(width===1440&&parent==='page'?{low:'1'}:{})});await open();await within()
  const expected=presentation==='auto'?width<=680?'dialog':'popover':presentation
  if(presentation==='legacy')assert.equal(await panel().evaluate(el=>el instanceof HTMLDialogElement&&el.matches(':modal')),true)
  else{assert.equal(await panel().getAttribute('data-picker-presentation'),expected);assert.equal(await page.locator(parent==='native'?'.sol-ui-picker-native-host':'#date-calendar').getAttribute('aria-modal'),String(expected==='dialog'));assert.equal(await panel().evaluate(el=>!!document.getElementById(el.getAttribute('aria-describedby')||el.closest('dialog')?.getAttribute('aria-describedby'))),true)}
  await page.keyboard.press('ArrowRight');assert.equal(await page.evaluate(()=>document.activeElement.dataset.calendarDay),'2026-10-16');await page.keyboard.press('Escape');await panel().waitFor({state:'hidden'});assert.equal(await trigger().evaluate(el=>el===document.activeElement),true);assert.equal((await get()).value,'2026-10-15');assert.equal((await get()).events.closes.at(-1),'escape');if(parent!=='page')assert.equal((await get()).parent,true)
  await open();await page.locator('[data-calendar-day="2026-10-16"]').click();await panel().waitFor({state:'hidden'});const state=await get();assert.equal(state.value,'2026-10-16');assert.deepEqual(state.events.changes,[{mode:'single',value:'2026-10-16',reason:'calendar'}]);assert.equal(state.events.opens,2);assert.equal(await trigger().evaluate(el=>el===document.activeElement),true);records.push({width,dir,parent,presentation,resolved:expected})
  if(records.length%16===0)console.log('PASS: '+records.length+' public Date width/RTL/context/presentation cases')
 }
 await page.setViewportSize({width:1440,height:900})
 for(const parent of ['page','dialog','native']){
  await goto({context:parent,presentation:'auto',mode:'range',display:'1'});await open();await page.locator('[data-calendar-day="2026-10-16"]').click();assert.equal((await get()).events.changes.length,0);await page.setViewportSize({width:320,height:900});await page.waitForFunction(()=>document.querySelector('#date-calendar')?.dataset.pickerPresentation==='dialog');await within();assert.ok(await page.locator('[data-preview="true"]').count());await page.setViewportSize({width:1440,height:900});await page.waitForFunction(()=>document.querySelector('#date-calendar')?.dataset.pickerPresentation==='popover');await page.keyboard.press('Escape');await panel().waitFor({state:'hidden'});assert.deepEqual((await get()).value,{start:'2026-10-15',end:'2026-10-18'});await open();await page.locator('[data-calendar-day="2026-10-16"]').click();await page.locator('[data-calendar-day="2026-10-20"]').click();await panel().waitFor({state:'hidden'});assert.deepEqual((await get()).value,{start:'2026-10-16',end:'2026-10-20'});assert.equal((await get()).form,'2026-10-16 ~ 2026-10-20');assert.ok((await page.locator('#date').inputValue()).includes('(display)'))
 }
 for(const presentation of ['legacy','popover','dialog','auto']){
  await goto({presentation,display:'1'});await page.locator('#date').focus();await page.keyboard.press('Alt+ArrowDown');await panel().waitFor();await page.waitForFunction(()=>document.activeElement?.hasAttribute('data-calendar-day'));await page.keyboard.press('Escape');await panel().waitFor({state:'hidden'});assert.equal(await page.locator('#date').evaluate(el=>el===document.activeElement),true)
  await open();await set('readonly',true);await panel().waitFor({state:'hidden'});assert.equal((await get()).events.closes.at(-1),'disabled');assert.equal((await get()).events.changes.length,0)
  await set('readonly',false);await open();await set('formReadonly',true);await panel().waitFor({state:'hidden'});assert.equal((await get()).events.closes.at(-1),'disabled')
  await set('formReadonly',false);await open();await set('mode','range');await panel().waitFor({state:'hidden'});assert.equal((await get()).events.closes.at(-1),'mode');assert.deepEqual((await get()).events.changes.at(-1),{mode:'range',value:null,reason:'mode'})
 }
 await goto({presentation:'popover',mode:'range'});await open();await page.locator('[data-calendar-day="2026-10-16"]').click();await page.locator('#outside-field').focus();await panel().waitFor({state:'hidden'});assert.equal(await page.locator('#outside-field').evaluate(el=>el===document.activeElement),true);assert.equal((await get()).events.closes.at(-1),'outside');assert.equal((await get()).events.changes.length,0)
 for(const presentation of ['legacy','popover','dialog']){
  await goto({presentation});await open();await set('accept',false);await page.locator('[data-calendar-day="2026-10-16"]').click();await panel().waitFor({state:'hidden'});assert.equal((await get()).value,'2026-10-15');assert.equal(await page.locator('#date').inputValue(),'2026-10-15','Rejected calendar proposal restores canonical text and form value')
 }
 for(const presentation of ['legacy','popover','dialog','auto']){
  await goto({presentation,required:'1'});await open();await panel().locator('.sol-calendar-footer button').last().click();await panel().waitFor({state:'hidden'});const state=await get();assert.equal(state.value,null);assert.deepEqual(state.events.changes,[{mode:'single',value:null,reason:'clear'}]);assert.deepEqual(state.events.clears,[{value:null,reason:'clear'}]);assert.equal(state.form,'');assert.equal(await page.locator('#date').evaluate(el=>el===document.activeElement&&!el.validity.valid),true)
 }
 const ax=await context.newCDPSession(page)
 for(const parent of ['page','native'])for(const presentation of ['legacy','popover','dialog']){
  await goto({context:parent,presentation});await open();const title=await page.locator('#date-title').textContent(),tree=await ax.send('Accessibility.getFullAXTree');assert.equal(tree.nodes.filter(node=>!node.ignored&&node.role?.value==='dialog'&&node.name?.value===title).length,1,'Exactly one named Date dialog in the accessibility tree');await page.keyboard.press('Escape')
 }
 await goto({presentation:'auto',mode:'range'});await open();await page.locator('[data-calendar-day="2026-10-16"]').click();await set('presentation','dialog');await panel().waitFor();assert.ok(await page.locator('[data-preview="true"]').count());assert.equal((await get()).events.opens,1);await set('presentation','legacy');await panel().waitFor({state:'hidden'});assert.equal((await get()).events.changes.length,0)
 await goto({presentation:'popover'});await open();await set('show',false);await panel().waitFor({state:'hidden'});assert.equal((await get()).blocked,0)
 await page.screenshot({path:fileURLToPath(new URL('date.png',out)),fullPage:true});assert.deepEqual(errors,[])
 await writeFile(new URL(process.argv.includes('--focused')?'focused-result.json':'browser-result.json',out),JSON.stringify({browser:browser.version(),cases:records.length,records,checks:['legacy native modal defaults','logical placement and viewport bounds','nested parent Escape ownership','ISO models and display/FormData separation','range draft resize/cancel/commit','readonly/disabled/SForm/mode guards','nonmodal outside focus','parent rejection','required clear reason/form/focus','one named accessible Date dialog','explicit presentation boundary cancellation','unmount cleanup'],limits:['Built package alias, not an installed candidate','Physical Fold/OS keyboard/Safari/screen reader unverified']},null,2)+'\n');console.log('PASS: public Date presentation '+records.length+' cases and controlled/keyboard/focus/form regressions');await context.close()
}catch(error){await writeFile(new URL('failure.txt',out),String(error.stack||error));throw error}finally{await browser?.close();await new Promise(resolve=>server.close(resolve))}
