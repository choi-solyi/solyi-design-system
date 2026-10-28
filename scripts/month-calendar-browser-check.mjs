import assert from 'node:assert/strict'
import http from 'node:http'
import path from 'node:path'
import {mkdir,readFile,writeFile} from 'node:fs/promises'
import {fileURLToPath,pathToFileURL} from 'node:url'
const installed=process.argv.includes('--installed'),argument=process.argv.indexOf('--consumer'),root=new URL('../',import.meta.url),consumer=argument<0?new URL('examples/package-consumer/',root):pathToFileURL(path.resolve(process.argv[argument+1])+path.sep)
const ui=installed?new URL('node_modules/solyi-ui/',consumer):new URL('packages/vue-ui/',root),out=new URL(installed?'qa-output/month-calendar-installed-browser/':'qa-output/month-calendar-browser/',root)
const {chromium}=await import(new URL('.tooling/browser-qa/node_modules/playwright-core/index.mjs',root)),{build}=await import(new URL('node_modules/vite/dist/node/index.js',consumer))
await mkdir(out,{recursive:true})
await writeFile(new URL('index.html',out),'<!doctype html><html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;font-family:var(--sol-font-sans)}</style><div id="app"></div><script type="module" src="./entry.js"></script></html>')
await writeFile(new URL('entry.js',out),`
import {createApp,h,ref,nextTick} from 'vue'
import {SMonthCalendar,createSolyiVuetify,provideSolLocale,applySolyiAppearance} from 'solyi-ui'
import 'solyi-ui/all.css'
const locale=ref('ko-KR'),month=ref('2026-10'),value=ref('2026-10-07'),disabled=ref(false),readonly=ref(false),loading=ref(false),data=ref(true),acceptMonth=ref(true),acceptValue=ref(true),monday=ref(false)
const markers=Object.freeze({'2026-10-28':Object.freeze([{id:'a',label:'First marker · 첫 번째 상태',tone:'info',icon:'copy'},{id:'b',label:'A very long generic marker label · 길게 표시되는 범용 상태',tone:'warning'},{id:'c',label:'Third marker remains in the full accessible name'}])})
let values=[],months=[]
const vuetify=createSolyiVuetify(),app=createApp({render:()=>h('main',{class:'sol-card',style:'margin:var(--sol-space-2);padding:var(--sol-space-2)'},[
 h(SMonthCalendar,{id:'calendar',label:'Generic month · 범용 달력',month:month.value,modelValue:value.value,today:'2026-10-28',firstDay:monday.value?1:0,markers:data.value?markers:{},isDateDisabled:date=>date==='2026-10-10',loading:loading.value,readonly:readonly.value,disabled:disabled.value,
 'onUpdate:month':next=>{months.push(next);if(acceptMonth.value)month.value=next},'onUpdate:modelValue':next=>{values.push(next);if(acceptValue.value)value.value=next}},{cell:({date})=>date.endsWith('-28')?[h('span',{'aria-label':'Arbitrary cell content · 긴 추가 내용',title:'Arbitrary cell content · 긴 추가 내용'},'ⓘ')]:[]}),
 h('button',{id:'outside',type:'button',class:'sol-button'},'Outside')])})
provideSolLocale(app,locale);app.use(vuetify).mount('#app')
window.qa={reset:async()=>{month.value='2026-10';value.value='2026-10-07';disabled.value=false;readonly.value=false;loading.value=false;data.value=true;acceptMonth.value=true;acceptValue.value=true;monday.value=false;await nextTick();values=[];months=[]},
set:async state=>{locale.value=state.locale;document.documentElement.lang=state.locale;applySolyiAppearance(vuetify.theme,state);await nextTick()},
flags:async state=>{if('loading'in state)loading.value=state.loading;if('readonly'in state)readonly.value=state.readonly;if('disabled'in state)disabled.value=state.disabled;if('data'in state)data.value=state.data;if('acceptMonth'in state)acceptMonth.value=state.acceptMonth;if('acceptValue'in state)acceptValue.value=state.acceptValue;await nextTick()},
get:()=>({month:month.value,value:value.value,values:[...values],months:[...months]})}
`)
await build({root:fileURLToPath(out),configFile:false,logLevel:'error',resolve:{alias:[{find:/^solyi-ui$/,replacement:fileURLToPath(new URL('dist/index.js',ui))},{find:/^solyi-ui\/all.css$/,replacement:fileURLToPath(new URL('dist/all.css',ui))},{find:/^vue$/,replacement:fileURLToPath(new URL('node_modules/vue/dist/vue.runtime.esm-bundler.js',consumer))}]},build:{outDir:fileURLToPath(new URL('dist/',out)),emptyOutDir:false}})
const directory=path.resolve(fileURLToPath(new URL('dist/',out))),mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.woff2':'font/woff2','.ttf':'font/ttf'}
const server=http.createServer(async(req,res)=>{try{let pathname=decodeURIComponent(new URL(req.url,'http://local').pathname);if(pathname.endsWith('/'))pathname+='index.html';const file=path.resolve(directory,'.'+pathname);if(!file.startsWith(directory+path.sep)){res.writeHead(403).end();return}res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'}).end(await readFile(file))}catch{res.writeHead(404).end()}})
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const origin='http://127.0.0.1:'+server.address().port,records=[]
let browser
try{
 browser=await chromium.launch({executablePath:process.env.SOLYI_QA_CHROME||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,chromiumSandbox:true})
 for(const width of [320,768,1440]){
  const context=await browser.newContext({viewport:{width,height:1000},hasTouch:width===320,reducedMotion:'reduce'}),page=await context.newPage(),errors=[]
  page.on('pageerror',error=>errors.push(error.message));await page.route('**/*',route=>new URL(route.request().url()).origin===origin?route.continue():route.abort());await page.goto(origin,{waitUntil:'networkidle'})
  const day=iso=>page.locator('[data-date="'+iso+'"] .sol-ui-month-day'),state=()=>page.evaluate(()=>window.qa.get())
  for(const theme of ['violet','sage','sand'])for(const mode of ['light','dark'])for(const density of ['comfortable','compact'])for(const locale of ['ko-KR','en-US']){
   const appearance={theme,mode,density,locale};await page.evaluate(state=>window.qa.set(state),appearance);await page.evaluate(()=>window.qa.reset())
   assert.equal(await page.locator('tbody tr').count(),6);assert.equal(await page.locator('tbody td').count(),42);assert.equal(await page.locator('.sol-ui-month-day').count(),31)
   assert.match(await day('2026-10-28').getAttribute('aria-label'),locale==='en-US'?/Today/:/오늘/);assert.match(await day('2026-10-28').getAttribute('aria-label'),/Third marker remains/)
   assert.equal(await day('2026-10-28').locator('.sol-ui-month-marker').count(),2);assert.equal(await day('2026-10-07').getAttribute('aria-pressed'),'true');assert.ok((await day('2026-10-07').textContent()).includes('✓'))
   if(width<=800){assert.equal(await day('2026-10-28').locator('.sol-ui-month-marker-count').isVisible(),true);assert.equal(await day('2026-10-28').locator('.sol-ui-month-marker-count').textContent(),'3');assert.equal(await day('2026-10-28').locator('.sol-ui-month-marker').first().isVisible(),false);assert.ok((await day('2026-10-07').boundingBox()).height<100,'Narrow date cells use the compact marker-count layout')}
   await day('2026-10-07').focus();await page.keyboard.press('ArrowRight');assert.equal(await day('2026-10-08').evaluate(element=>element===document.activeElement),true);assert.equal((await state()).values.length,0)
   assert.notEqual(await day('2026-10-08').evaluate(element=>getComputedStyle(element).outlineStyle),'none');await page.keyboard.press('Enter');assert.equal((await state()).value,'2026-10-08');assert.equal((await state()).values.length,1)
   await page.keyboard.press('PageDown');assert.equal((await state()).month,'2026-11');assert.equal(await day('2026-11-08').evaluate(element=>element===document.activeElement),true);assert.equal((await state()).value,'2026-10-08')
   await page.getByRole('button',{name:locale==='en-US'?'Go to today':'오늘로 이동',exact:true}).click();assert.equal((await state()).month,'2026-10');assert.equal(await day('2026-10-28').evaluate(element=>element===document.activeElement),true);assert.equal((await state()).value,'2026-10-08')
   assert.equal(await page.locator('.sol-ui-month-details li').count(),3);assert.ok((await page.locator('.sol-ui-month-details').textContent()).includes('Third marker remains in the full accessible name'));assert.equal(await page.locator('.sol-ui-month-details').evaluate(element=>element.scrollWidth>element.clientWidth),false,'Full marker text wraps in the keyboard-accessible details region')
   await day('2026-10-10').focus();await page.keyboard.press('Enter');assert.equal((await state()).value,'2026-10-08');await page.keyboard.press('ArrowRight');assert.equal(await day('2026-10-11').evaluate(element=>element===document.activeElement),true)
   const measure=()=>page.locator('.sol-ui-month-table').evaluate(table=>({height:table.getBoundingClientRect().height,rows:[...table.querySelectorAll('tbody tr')].map(row=>row.getBoundingClientRect().height),day:[...table.querySelectorAll('[data-date="2026-10-28"] *')].map(element=>({tag:element.tagName,cls:element.className,height:element.getBoundingClientRect().height,font:getComputedStyle(element).fontSize,line:getComputedStyle(element).lineHeight}))}))
   const before=await measure();await page.evaluate(()=>window.qa.flags({loading:true,data:false}));const after=await measure();if(Math.abs(before.height-after.height)>=1){await writeFile(new URL('geometry-failure.json',out),JSON.stringify({appearance,width,before,after},null,2));await page.screenshot({path:fileURLToPath(new URL('geometry-failure.png',out)),fullPage:true})}assert.ok(Math.abs(before.height-after.height)<1,'Loading keeps the default six-row calendar geometry: '+JSON.stringify({before:before.height,after:after.height,rowsBefore:before.rows,rowsAfter:after.rows}));assert.equal((await state()).value,'2026-10-08');await day('2026-10-12').scrollIntoViewIfNeeded();const blockedTarget=await day('2026-10-12').boundingBox();await page.mouse.click(blockedTarget.x+blockedTarget.width/2,blockedTarget.y+blockedTarget.height/2);assert.equal((await state()).values.length,1)
   await page.evaluate(()=>window.qa.flags({loading:false,readonly:true}));await day('2026-10-12').focus();await page.keyboard.press('ArrowRight');assert.equal(await day('2026-10-13').evaluate(element=>element===document.activeElement),true);await page.keyboard.press('Space');assert.equal((await state()).values.length,1)
   await page.evaluate(()=>window.qa.flags({readonly:false,acceptMonth:false}));await page.getByRole('button',{name:locale==='en-US'?'Next month':'다음 달',exact:true}).click();assert.equal((await state()).month,'2026-10')
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);const box=await day('2026-10-07').boundingBox();assert.ok(box.width>=24&&box.height>=40,'Calendar grid date target remains usable without horizontal overflow')
   await page.evaluate(()=>window.qa.flags({disabled:true}));assert.equal(await page.locator('.sol-ui-month-toolbar button:not(:disabled),.sol-ui-month-day:not(:disabled)').count(),0);records.push({width,...appearance,dateTarget:{width:box.width,height:box.height}})
  }
  if(width===320){await page.evaluate(()=>window.qa.reset());await day('2026-10-12').tap();assert.equal((await state()).value,'2026-10-12')}
  await page.evaluate(()=>window.qa.reset());await day('2026-10-28').focus();await page.screenshot({path:fileURLToPath(new URL(width+'.png',out)),fullPage:true});assert.deepEqual(errors,[]);await context.close();console.log('PASS: '+width+'px; 24 locale/appearance cases, controlled month/date, trusted keyboard/focus, compact marker counts/full text details, loading geometry, readonly/disabled and no overflow'+(width===320?', touch tap':''))
 }
 await writeFile(new URL('report.json',out),JSON.stringify({browser:browser.version(),installed,packageSource:fileURLToPath(ui),cases:records.length,records,limits:['Local development build; no publication/deployment','Touch is Chrome emulation; physical screen reader and Safari not verified']},null,2))
}finally{await browser?.close();await new Promise(resolve=>server.close(resolve))}
