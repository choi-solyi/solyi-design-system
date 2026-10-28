/* Fresh headless Chrome, local source build; no shared profile or external service. */
import assert from 'node:assert/strict'
import http from 'node:http'
import path from 'node:path'
import {mkdir,readFile,writeFile} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'
const root=new URL('../',import.meta.url),consumer=new URL('examples/package-consumer/',root),ui=new URL('packages/vue-ui/',root),out=new URL('qa-output/input-control-browser/',root)
const {chromium}=await import(new URL('.tooling/browser-qa/node_modules/playwright-core/index.mjs',root)),{build}=await import(new URL('node_modules/vite/dist/node/index.js',consumer))
await mkdir(out,{recursive:true})
await writeFile(new URL('index.html',out),'<!doctype html><html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;font-family:var(--sol-font-sans)}</style><div id="app"></div><script type="module" src="./entry.js"></script></html>')
await writeFile(new URL('entry.js',out),`
import {createApp,h,ref,nextTick} from 'vue'
import {STextField,STextarea,SSelect,SNumberInput,SAutocomplete,SMultiSelect,SIcon,createSolyiVuetify,provideSolLocale,applySolyiAppearance} from 'solyi-ui'
import 'solyi-ui/all.css'
const locale=ref('ko-KR'),text=ref('Long text '.repeat(40)),area=ref('Long note '.repeat(40)),select=ref('a'),number=ref(5),auto=ref('a'),multi=ref(['a']),disabled=ref(false),readonly=ref(false),loading=ref(true)
let submits=0,clears=[]
const vuetify=createSolyiVuetify(),app=createApp({render:()=>h('form',{id:'form',class:'sol-card',style:'margin:8px;padding:8px;display:grid;gap:16px',onSubmit:event=>{event.preventDefault();submits++}},[

 ...[[STextField,'text',text],[STextarea,'area',area],[SSelect,'select',select],[SNumberInput,'number',number],[SAutocomplete,'auto',auto],[SMultiSelect,'multi',multi]].map(([C,id,model])=>h(C,{
  id,name:id,label:id==='text'?'Text field / 텍스트 입력':id==='area'?'Textarea / 여러 줄':id==='select'?'Select / 선택':id==='number'?'Number / 숫자':id==='auto'?'Autocomplete / 검색':'Multiple / 다중 선택',
  modelValue:model.value,clearable:true,loading:loading.value,disabled:disabled.value,readonly:readonly.value,required:true,
  ...(['select','auto','multi'].includes(id)?{options:[{value:'a',label:'A very long option label '.repeat(10)},{value:'b',label:'Beta'}]}:{}),
  ...(id==='number'?{min:5,max:95,step:15,unit:'minutes',presets:[{value:20},{value:21}],formatValue:value=>value.toFixed(2)}:{}),
  'onUpdate:modelValue':value=>model.value=value,onClear:event=>clears.push({id,...event})
 },id==='number'?{}:{leading:()=>[h(SIcon,{name:'search',size:16,decorative:true})],trailing:()=>[h('span',{class:'unit'},'kg')],...(id==='select'?{indicator:()=>[h(SIcon,{name:'chevron',size:16,decorative:true})]}:{})})),
 h('button',{id:'outside',type:'button',class:'sol-button'},'Outside')])})
provideSolLocale(app,locale);app.use(vuetify).mount('#app')
window.qa={set:async state=>{locale.value=state.locale;document.documentElement.lang=state.locale;document.documentElement.dir=state.dir;vuetify.locale.rtl.value.en=state.dir==='rtl';applySolyiAppearance(vuetify.theme,state);await nextTick()},reset:async()=>{text.value='Long text '.repeat(40);area.value='Long note '.repeat(40);select.value='a';number.value=5;auto.value='a';multi.value=['a'];disabled.value=false;readonly.value=false;loading.value=true;clears=[];submits=0;await nextTick()},flags:async state=>{if('disabled'in state)disabled.value=state.disabled;if('readonly'in state)readonly.value=state.readonly;if('loading'in state)loading.value=state.loading;await nextTick()},get:()=>({text:text.value,area:area.value,select:select.value,number:number.value,auto:auto.value,multi:multi.value,clears:[...clears],submits}),data:()=>Object.fromEntries(new FormData(document.getElementById('form')))}
`)
await build({root:fileURLToPath(out),configFile:false,logLevel:'error',resolve:{alias:[{find:/^solyi-ui$/,replacement:fileURLToPath(new URL('dist/index.js',ui))},{find:/^solyi-ui\/all.css$/,replacement:fileURLToPath(new URL('dist/all.css',ui))},{find:/^vue$/,replacement:fileURLToPath(new URL('node_modules/vue/dist/vue.runtime.esm-bundler.js',consumer))}]},build:{outDir:fileURLToPath(new URL('dist/',out)),emptyOutDir:false}})
const directory=path.resolve(fileURLToPath(new URL('dist/',out))),mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.woff2':'font/woff2','.ttf':'font/ttf'}
const server=http.createServer(async(req,res)=>{try{let pathname=decodeURIComponent(new URL(req.url,'http://local').pathname);if(pathname.endsWith('/'))pathname+='index.html';const file=path.resolve(directory,'.'+pathname);if(!file.startsWith(directory+path.sep)){res.writeHead(403).end();return}res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'}).end(await readFile(file))}catch{res.writeHead(404).end()}})
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const origin='http://127.0.0.1:'+server.address().port,records=[]
let browser
try{
 browser=await chromium.launch({executablePath:process.env.SOLYI_QA_CHROME||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,chromiumSandbox:true})
 for(const width of [320,768,1440]){
  const context=await browser.newContext({viewport:{width,height:900},hasTouch:width===320,reducedMotion:'reduce'}),page=await context.newPage(),errors=[]
  page.on('pageerror',error=>errors.push(error.message));await page.route('**/*',route=>new URL(route.request().url()).origin===origin?route.continue():route.abort());await page.goto(origin,{waitUntil:'networkidle'})
  for(const theme of ['violet','sage','sand'])for(const mode of ['light','dark'])for(const density of ['comfortable','compact'])for(const locale of ['ko-KR','en-US'])for(const dir of ['ltr','rtl']){
   const appearance={theme,mode,density,locale,dir};await page.evaluate(state=>window.qa.set(state),appearance);await page.evaluate(()=>window.qa.reset())
   for(const id of ['text','area','select','number','auto','multi']){
    const input=page.locator('#'+id),field=input.locator('xpath=ancestor::*[contains(@class,"sol-ui-field") or contains(@class,"sol-field")][1]'),clear=field.locator('.sol-ui-input-clear')
    assert.equal(await clear.count(),1);assert.equal(await input.getAttribute('aria-busy'),'true');assert.match(await clear.getAttribute('aria-label'),locale==='en-US'?/Clear/:/지우기/)
    const target=await clear.boundingBox();assert.ok(target.width>=40&&target.height>=40,'Clear target uses the existing 40/44px density token')
    const geometry=await field.evaluate(el=>{const input=el.querySelector('input:not([type=hidden]),textarea,select').getBoundingClientRect(),rail=el.querySelector('.sol-ui-input-rail').getBoundingClientRect();return {left:input.left,right:input.right,railLeft:rail.left,railRight:rail.right}})
    assert.ok(dir==='ltr'?geometry.right<=geometry.railLeft+1:geometry.left>=geometry.railRight-1,'Input content and action rail do not overlap: '+JSON.stringify(geometry))
    await input.focus();if(id==='text'){assert.equal(await input.evaluate(el=>getComputedStyle(el).outlineStyle),'none','The enhanced VTextField uses one outer focus ring, without a second rectangular ring across the action rail');assert.notEqual(await field.locator('.v-field').evaluate(el=>getComputedStyle(el).outlineStyle),'none')}await page.keyboard.press('Tab');assert.equal(await clear.evaluate(el=>el===document.activeElement),true,'The native clear button is reachable next by keyboard');assert.notEqual(await clear.evaluate(el=>getComputedStyle(el).outlineStyle),'none')
    await page.keyboard.press('Enter');assert.deepEqual((await page.evaluate(()=>window.qa.get()))[id],id==='multi'?[]:['select','number','auto'].includes(id)?null:'');assert.equal(await input.evaluate(el=>el===document.activeElement),true);assert.equal(await clear.count(),0);assert.equal(await input.getAttribute('aria-invalid'),'true');assert.ok(await field.locator('#'+id+'-error').isVisible());assert.equal((await page.evaluate(()=>window.qa.data()))[id],id==='select'?undefined:'','Native Select excludes its disabled required placeholder; other inputs retain an empty successful value')
   }
   const state=await page.evaluate(()=>window.qa.get());assert.equal(state.submits,0);assert.equal(state.clears.length,6);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false)
   for(const flag of ['disabled','readonly']){await page.evaluate(()=>window.qa.reset());await page.evaluate(flag=>window.qa.flags({[flag]:true}),flag);assert.equal(await page.locator('.sol-ui-input-clear').count(),0);assert.equal(await page.locator('.sol-ui-input-trigger:not(:disabled)').count(),0)}
   records.push({width,...appearance})
  }
  await page.evaluate(()=>window.qa.reset());if(width===320){await page.locator('.sol-ui-input-clear').first().tap();assert.equal((await page.evaluate(()=>window.qa.get())).text,'')}

  await page.evaluate(()=>window.qa.reset());
  for(const id of ['auto','multi']){
   const input=page.locator('#'+id),field=input.locator('xpath=ancestor::*[contains(@class,"sol-field")][1]');
   await input.focus();await page.keyboard.press('ArrowDown');assert.equal(await input.getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await input.getAttribute('aria-expanded'),'false');
   await field.locator('.sol-ui-input-trigger').click();assert.equal(await input.getAttribute('aria-expanded'),'true');await field.locator('.sol-ui-input-clear').click();assert.equal(await input.getAttribute('aria-expanded'),'false');assert.equal(await input.evaluate(element=>element===document.activeElement),true);
  }
  await page.screenshot({path:fileURLToPath(new URL(width+'.png',out)),fullPage:true});assert.deepEqual(errors,[]);await context.close();console.log('PASS: '+width+'px; 48 locale/theme/density/RTL combinations, long text, nonoverlapping rails, trusted keyboard clear/focus/required/FormData, loading and disabled/readonly'+(width===320?', touch emulation':''))
 }
 await writeFile(new URL('report.json',out),JSON.stringify({browser:browser.version(),cases:records.length,packageSource:fileURLToPath(ui),records,limits:['Built current source; no new tarball installation or public deployment','Chrome touch emulation; physical touch, screen reader and Safari not verified']},null,2))
}finally{await browser?.close();await new Promise(resolve=>server.close(resolve))}
