/* Real isolated Chrome: keyboard, touch alternatives, pointer/capture and scroll recovery. */
import assert from 'node:assert/strict'
import http from 'node:http'
import path from 'node:path'
import {mkdir,readFile,writeFile} from 'node:fs/promises'
import {fileURLToPath,pathToFileURL} from 'node:url'
const installed=process.argv.includes('--installed'),consumerArgument=process.argv.indexOf('--consumer')
const root=new URL('../',import.meta.url),out=new URL(installed?'qa-output/sortable-installed-browser/':'qa-output/sortable-browser/',root),consumer=consumerArgument<0?new URL('examples/package-consumer/',root):pathToFileURL(path.resolve(process.argv[consumerArgument+1])+path.sep)
const ui=installed?new URL('node_modules/solyi-ui/',consumer):new URL('packages/vue-ui/',root)
const {chromium}=await import(new URL('.tooling/browser-qa/node_modules/playwright-core/index.mjs',root)),{build}=await import(new URL('node_modules/vite/dist/node/index.js',consumer))
await mkdir(out,{recursive:true})
await writeFile(new URL('index.html',out),'<!doctype html><html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;font-family:var(--sol-font-sans)}</style><div id="app"></div><script type="module" src="./entry.js"></script></html>')
await writeFile(new URL('entry.js',out),`
import {createApp,h,ref,nextTick} from 'vue'
import {SSortableList,createSolyiVuetify,provideSolLocale,applySolyiAppearance} from 'solyi-ui'
import 'solyi-ui/all.css'
const locale=ref('ko-KR'),items=ref([]),disabled=ref(false),readonly=ref(false),accept=ref(true),mode=ref('window')
let updates=[],changes=[],starts=[],previews=[],ends=[],original=[]
const vuetify=createSolyiVuetify(),app=createApp({render:()=>h('main',{class:'sol-card',style:'margin:var(--sol-space-4);padding:var(--sol-space-4)'},[
 h('div',{id:'scrollport',style:mode.value==='nested'?'max-block-size:calc(var(--sol-control-height) * 7);overflow-y:auto':''},[
 h(SSortableList,{id:'sort',label:'Arbitrary objects',modelValue:items.value,itemKey:item=>item.id,itemLabel:item=>'Item '+item.id,disabled:disabled.value,readonly:readonly.value,
 'onUpdate:modelValue':next=>{updates.push(next);if(accept.value)items.value=next},onChange:value=>changes.push(value),onStart:value=>starts.push(value),onPreview:value=>previews.push(value),onEnd:value=>ends.push(value)},
 {item:({item})=>[h('div',{'data-item':item.id},[h('strong','A long item label · 줄바꿈하는 항목 '+item.id),h('input',{value:item.details.count,'aria-label':'Content '+item.id,style:'inline-size:100%;max-inline-size:7rem;box-sizing:border-box'})])]})]),
 h('button',{id:'outside',type:'button',class:'sol-button'},'Outside'),h('div',{style:'block-size:120vh'},'Ordinary page scroll')
])})
provideSolLocale(app,locale);app.use(vuetify).mount('#app')
window.qa={reset:async(count=3,nested=false)=>{disabled.value=false;readonly.value=false;accept.value=true;mode.value=nested?'nested':'window';original=Object.freeze(Array.from({length:count},(_,index)=>Object.freeze({id:index<3?'abc'[index]:'item-'+index,details:Object.freeze({count:index})})));items.value=original;await nextTick();updates=[];changes=[];starts=[];previews=[];ends=[];scrollTo(0,0)},
 set:async state=>{locale.value=state.locale;document.documentElement.lang=state.locale;applySolyiAppearance(vuetify.theme,state);await nextTick()},
 disabled:async state=>{disabled.value=state;await nextTick()},readonly:async state=>{readonly.value=state;await nextTick()},accept:state=>accept.value=state,
 external:async()=>{items.value=[...items.value].reverse();await nextTick()},get:()=>({ids:items.value.map(item=>item.id),original:original.map(item=>item.id),changes:changes.length,starts:starts.length,previews:previews.length,ends,identity:items.value.every(item=>original.includes(item))})}
await window.qa.reset()
`)
await build({root:fileURLToPath(out),configFile:false,logLevel:'error',resolve:{alias:[
  {find:/^solyi-ui$/,replacement:fileURLToPath(new URL('dist/index.js',ui))},
  {find:/^solyi-ui\/all.css$/,replacement:fileURLToPath(new URL('dist/all.css',ui))},
  {find:/^vue$/,replacement:fileURLToPath(new URL('node_modules/vue/dist/vue.runtime.esm-bundler.js',consumer))},
]},build:{outDir:fileURLToPath(new URL('dist/',out)),emptyOutDir:false}})
const directory=path.resolve(fileURLToPath(new URL('dist/',out))),mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.woff2':'font/woff2','.ttf':'font/ttf'}
const server=http.createServer(async(req,res)=>{try{let pathname=decodeURIComponent(new URL(req.url,'http://local').pathname);if(pathname.endsWith('/'))pathname+='index.html';const file=path.resolve(directory,'.'+pathname);if(!file.startsWith(directory+path.sep)){res.writeHead(403).end();return}res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'}).end(await readFile(file))}catch{res.writeHead(404).end()}})
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const origin='http://127.0.0.1:'+server.address().port,records=[]
let browser
try{
 browser=await chromium.launch({executablePath:process.env.SOLYI_QA_CHROME||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,chromiumSandbox:true})
 for(const width of [320,768,1440]){
  const context=await browser.newContext({viewport:{width,height:900},hasTouch:width===320,reducedMotion:'reduce'}),page=await context.newPage(),errors=[]
  page.on('pageerror',error=>errors.push(error.message));await page.route('**/*',route=>new URL(route.request().url()).origin===origin?route.continue():route.abort());await page.goto(origin,{waitUntil:'networkidle'})
  const row=id=>page.locator('.sol-ui-sortable-row').filter({has:page.locator('[data-item="'+id+'"]')}),handle=id=>row(id).locator('.sol-ui-sortable-handle'),get=()=>page.evaluate(()=>window.qa.get())
  const drag=async(id,target)=>{await handle(id).scrollIntoViewIfNeeded();const start=await handle(id).boundingBox(),end=await row(target).boundingBox();await page.mouse.move(start.x+start.width/2,start.y+start.height/2);await page.mouse.down();await page.mouse.move(start.x+start.width/2,end.y+end.height/2+1);return start}
  for(const theme of ['violet','sage','sand'])for(const mode of ['light','dark'])for(const density of ['comfortable','compact'])for(const locale of ['ko-KR','en-US']){
   const state={theme,mode,density,locale};await page.evaluate(state=>window.qa.set(state),state);await page.evaluate(()=>window.qa.reset())
   assert.equal(await handle('a').getAttribute('aria-label'),locale==='en-US'?'Reorder Item a':'Item a 순서 조절','Component and provider share the same installed locale instance')
   await handle('a').focus();await page.keyboard.press('Space');assert.equal(await handle('a').getAttribute('aria-pressed'),'true');assert.equal((await get()).starts,1)
   assert.notEqual(await handle('a').evaluate(element=>getComputedStyle(element).outlineStyle),'none','Package-only keyboard focus ring remains visible')
   await page.keyboard.press('ArrowDown');assert.deepEqual((await get()).ids,['a','b','c']);assert.equal((await get()).changes,0)
   await page.keyboard.press('Enter');assert.deepEqual((await get()).ids,['b','a','c']);assert.equal((await get()).changes,1);assert.equal((await get()).starts,1);assert.equal((await get()).ends.length,1)
   assert.equal(await handle('a').evaluate(element=>element===document.activeElement),true);assert.equal(await handle('a').getAttribute('aria-pressed'),'false');assert.equal((await get()).identity,true)
   await page.keyboard.press('Space');await page.keyboard.press('End');await page.keyboard.press('Escape');assert.deepEqual((await get()).ids,['b','a','c']);assert.equal((await get()).ends.at(-1).reason,'escape')
   await page.keyboard.press('Space');await page.keyboard.press('Tab');assert.equal((await get()).ends.at(-1).reason,'tab');assert.equal(await handle('a').evaluate(element=>element===document.activeElement),false)
   await row('a').locator('.sol-ui-sortable-moves button').nth(1).click();assert.deepEqual((await get()).ids,['b','c','a']);assert.equal(await handle('a').evaluate(element=>element===document.activeElement),true)
   const box=await handle('a').boundingBox();assert.ok(box.width>=40&&box.height>=40);if(width===320)assert.ok(box.width>=44&&box.height>=44)
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);records.push({width,...state})
  }
  await page.evaluate(()=>window.qa.reset());await drag('a','c');assert.equal(await handle('a').evaluate(element=>element.hasPointerCapture(1)),true);assert.deepEqual((await get()).ids,['a','b','c']);await page.mouse.up()
  assert.deepEqual((await get()).ids,['b','c','a']);assert.equal((await get()).changes,1);assert.equal((await get()).ends.length,1);assert.equal((await get()).ends[0].input,'pointer');assert.equal(await handle('a').getAttribute('aria-pressed'),'false')
  for(const cancellation of ['escape','external','capture','disabled','readonly']){
   await page.evaluate(()=>window.qa.reset());await drag('a','b')
   if(cancellation==='escape')await page.keyboard.press('Escape')
   if(cancellation==='external')await page.evaluate(()=>window.qa.external())
   if(cancellation==='capture'){await handle('a').evaluate(element=>element.releasePointerCapture(1));await page.mouse.move(10,10)}
   if(cancellation==='disabled')await page.evaluate(()=>window.qa.disabled(true))
   if(cancellation==='readonly')await page.evaluate(()=>window.qa.readonly(true))
   await page.mouse.up();const state=await get();assert.equal(state.changes,0,cancellation);assert.equal(state.ends.length,1,cancellation);assert.equal(state.ends[0].reason,cancellation==='readonly'?'disabled':cancellation)
  }
  await page.evaluate(()=>window.qa.reset(40,true));await handle('a').scrollIntoViewIfNeeded();let start=await handle('a').boundingBox(),port=await page.locator('#scrollport').boundingBox(),before=await page.locator('#scrollport').evaluate(element=>element.scrollTop)
  await page.mouse.move(start.x+start.width/2,start.y+start.height/2);await page.mouse.down();await page.mouse.move(start.x+start.width/2,port.y+port.height-2);await page.waitForFunction(before=>document.getElementById('scrollport').scrollTop>before+20,before)
  assert.equal((await get()).changes,0);await page.keyboard.press('Escape');await page.mouse.up();assert.equal((await get()).ends.at(-1).reason,'escape')
  const stopped=await page.locator('#scrollport').evaluate(element=>element.scrollTop);await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));assert.equal(await page.locator('#scrollport').evaluate(element=>element.scrollTop),stopped)
  await page.evaluate(()=>window.qa.reset(40,false));await handle('a').scrollIntoViewIfNeeded();start=await handle('a').boundingBox();before=await page.evaluate(()=>scrollY)
  await page.mouse.move(start.x+start.width/2,start.y+start.height/2);await page.mouse.down();await page.mouse.move(start.x+start.width/2,892);await page.waitForFunction(before=>scrollY>before+20,before);await page.keyboard.press('Escape');await page.mouse.up();assert.equal((await get()).changes,0)
  if(width===320){
   await page.evaluate(()=>window.qa.reset());await row('a').locator('.sol-ui-sortable-moves button').nth(1).tap();assert.deepEqual((await get()).ids,['b','a','c'])
   const cdp=await context.newCDPSession(page),touch=(type,x,y)=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints:type==='touchEnd'||type==='touchCancel'?[]:[{x,y}]})
   await page.evaluate(()=>window.qa.reset());await handle('a').scrollIntoViewIfNeeded();start=await handle('a').boundingBox();const end=await row('b').boundingBox(),x=start.x+start.width/2,y=start.y+start.height/2
   await touch('touchStart',x,y);await touch('touchMove',x,end.y+end.height/2+1);assert.equal((await get()).changes,0);await touch('touchCancel');assert.equal((await get()).ends.at(-1).reason,'pointercancel');assert.deepEqual((await get()).ids,['a','b','c'])
   await touch('touchStart',x,y);await touch('touchMove',x,end.y+end.height/2+1);await touch('touchEnd');assert.deepEqual((await get()).ids,['b','a','c'])
   await page.evaluate(()=>window.qa.reset(40,true));await row('a').locator('.sol-ui-sortable-content').scrollIntoViewIfNeeded();const content=await row('a').locator('.sol-ui-sortable-content').boundingBox();before=await page.locator('#scrollport').evaluate(element=>element.scrollTop)
   await touch('touchStart',content.x+5,content.y+15);await touch('touchMove',content.x+5,content.y-90);await touch('touchEnd');await page.waitForFunction(before=>document.getElementById('scrollport').scrollTop>before,before);assert.equal((await get()).starts,0);await cdp.detach()
  }
  await page.evaluate(()=>window.qa.reset());await page.mouse.move(width-10,800);await page.mouse.wheel(0,300);await page.waitForFunction(()=>scrollY>0);assert.deepEqual(errors,[])
  await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:fileURLToPath(new URL(width+'.png',out))});await context.close();console.log('PASS: '+width+'px; 24 appearance/locale keyboard cases, native focus/buttons, pointer capture/cancel, nested/window autoscroll, ordinary scroll'+(width===320?', touch tap/drag/cancel/body pan':''))
 }
 await writeFile(new URL('report.json',out),JSON.stringify({browser:browser.version(),packageSource:fileURLToPath(ui),installed,cases:records.length,records,limits:[installed?'Installed local development tarball; no public release':'Current public exports built from source; installed package verification is a later gate','Touch is Chrome emulation; no physical device or screen reader verification']},null,2))
}finally{await browser?.close();await new Promise(resolve=>server.close(resolve))}
