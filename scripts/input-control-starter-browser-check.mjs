/* Actual source-built starter recipes; no shared browser, install, or deployment. */
import assert from 'node:assert/strict'
import http from 'node:http'
import path from 'node:path'
import {mkdir,readFile,writeFile} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'
const root=new URL('../',import.meta.url),directory=path.resolve(fileURLToPath(new URL('examples/vue-vuetify/dist/',root))),out=new URL('qa-output/input-control-starter/',root)
const {chromium}=await import(new URL('.tooling/browser-qa/node_modules/playwright-core/index.mjs',root))
await mkdir(out,{recursive:true})
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.woff2':'font/woff2','.ttf':'font/ttf','.svg':'image/svg+xml'}
const server=http.createServer(async(req,res)=>{try{let pathname=decodeURIComponent(new URL(req.url,'http://local').pathname);if(pathname.endsWith('/'))pathname+='index.html';const file=path.resolve(directory,'.'+pathname);if(!file.startsWith(directory+path.sep)){res.writeHead(403).end();return}res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'}).end(await readFile(file))}catch{res.writeHead(404).end()}})
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const origin='http://127.0.0.1:'+server.address().port,records=[]
const cases=[
 ['STextField','fields','', 'recipe-field','text'],
 ['STextarea','advanced-inputs','textarea','recipe-note','text'],
 ['SSelect','choices','', 'recipe-sort','select'],
 ['SNumberInput','advanced-inputs','number','recipe-amount','number'],
 ['SAutocomplete','inputs','autocomplete','recipe-autocomplete','autocomplete'],
 ['SMultiSelect','advanced-inputs','multiselect','recipe-tags','multiselect'],
 ['SDatePicker','inputs','date','recipe-date','date'],
 ['STimePicker native','time','', 'recipe-time','time'],
 ['STimePicker list','time','', 'recipe-time-list','time'],
]
let browser
try{
 browser=await chromium.launch({executablePath:process.env.SOLYI_QA_CHROME||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,chromiumSandbox:true})
 const context=await browser.newContext({viewport:{width:320,height:900},hasTouch:true,reducedMotion:'reduce'}),page=await context.newPage(),errors=[]
 page.on('pageerror',error=>errors.push(error.message));await page.route('**/*',route=>new URL(route.request().url()).origin===origin?route.continue():route.abort())
 for(const [name,example,part,id,kind]of cases){
  const url=new URL('/?view=recipes&embed=1&example='+example,origin);if(part)url.searchParams.set('part',part)
  await page.goto(url.href,{waitUntil:'networkidle'});const input=page.locator('#'+id);await input.waitFor({state:'visible'})
  const field=input.locator('xpath=ancestor::*[contains(@class,"sol-ui-field") or contains(@class,"sol-field")][1]')
  if(kind==='text')await input.fill('Example clear content')
  else if(kind==='autocomplete')await input.fill('no-matching-option')
  else if(kind==='multiselect'){await input.click();await page.getByRole('option').first().click();assert.equal(await field.locator('.sol-ui-tags li').count(),1)}
  else if(kind==='date')await input.fill('2026-10-28')
  else if(kind==='time'&&!await input.inputValue()){
   if(await input.evaluate(element=>element.readOnly)){await field.locator('.sol-ui-input-trigger').click();await page.locator('#'+id+'-panel [role=option]').first().click()}
   else{await input.fill('10:00');await input.press('Enter')}
  }
  if(kind==='time'){await field.locator('.sol-ui-input-trigger').click();assert.equal(await page.locator('#'+id+'-panel').count(),1)}
  assert.equal(await field.locator('.sol-ui-input-clear').count(),1,name+' actually opts into the new clear action')
  await field.locator('.sol-ui-input-clear').tap();assert.equal(await input.inputValue(),'');assert.equal(await field.locator('.sol-ui-input-clear').count(),0);assert.equal(await input.evaluate(element=>element===document.activeElement),true)
  if(kind==='time')assert.equal(await page.locator('#'+id+'-panel').count(),0)
  if(kind==='multiselect')assert.equal(await field.locator('.sol-ui-tags li').count(),0)
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false)
  records.push({name,example,part,id,href:url.pathname+url.search,clear:true,focus:true});console.log('PASS: actual starter '+name+' → '+example+(part?'/'+part:''))
 }
 assert.deepEqual(errors,[]);await page.screenshot({path:fileURLToPath(new URL('time-list-320.png',out)),fullPage:true});await context.close()
 await writeFile(new URL('report.json',out),JSON.stringify({browser:browser.version(),cases:records.length,records,limits:['Actual starter built with the current source alias; not an installed new tarball or public deployment','Mobile Chrome emulation; physical touch, IME, screen reader and Safari are separate']},null,2))
}finally{await browser?.close();await new Promise(resolve=>server.close(resolve))}
