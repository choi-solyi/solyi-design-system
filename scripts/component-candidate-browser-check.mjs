/* Final local document inventory. No shared profile, external navigation or deployment. */
import assert from 'node:assert/strict'
import {createServer} from 'node:http'
import {mkdir,readFile,stat,writeFile} from 'node:fs/promises'
import {resolve,sep,extname} from 'node:path'
import {fileURLToPath} from 'node:url'
import {chromium} from '../.tooling/browser-qa/node_modules/playwright-core/index.mjs'
import {componentReferences,componentExampleSources} from '../site/component-api-data.js'
const root=resolve('docs'),out=new URL('../qa-output/improvements-30/final-document-browser/',import.meta.url),records=[]
await mkdir(out,{recursive:true})
const server=createServer(async(req,res)=>{try{let path=resolve(root,'.'+new URL(req.url,'http://local').pathname);if(path!==root&&!path.startsWith(root+sep))throw Error('outside');if((await stat(path)).isDirectory())path=resolve(path,'index.html');res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.woff2':'font/woff2'})[extname(path)]||'application/octet-stream');res.end(await readFile(path))}catch{res.statusCode=404;res.end()}})
await new Promise(done=>server.listen(0,'127.0.0.1',done));const origin='http://127.0.0.1:'+server.address().port
let browser
try{
 browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,chromiumSandbox:true})
 for(const appearance of [{width:1100,theme:'violet',mode:'light'},{width:390,theme:'sage',mode:'dark',density:'compact'},{width:390,theme:'sand',mode:'light'}]){
  const context=await browser.newContext({viewport:{width:appearance.width,height:900},hasTouch:appearance.width===390}),page=await context.newPage(),errors=[];page.setDefaultTimeout(20000);page.on('pageerror',e=>errors.push(e.message));await page.route('**/*',r=>new URL(r.request().url()).origin===origin?r.continue():r.abort())
  if(process.argv.includes('--search-only')){
   await page.goto(origin+'/?'+new URLSearchParams(appearance)+'#component/sbtn-group',{waitUntil:'domcontentloaded'});await page.locator('#document-search-open').click();await page.locator('#document-search-query').fill('버튼 그룹');const result=page.locator('#document-search-results a').first();await page.waitForFunction(()=>document.querySelector('#document-search-results a')?.getAttribute('href')==='#component/sbtn-group');await result.focus();await page.keyboard.press('Enter');await page.locator('#sbtn-group').waitFor({state:'visible'});records.push({kind:'Korean Button Group search',appearance,keyboard:true,href:'#component/sbtn-group'});await context.close();console.log('PASS Korean Button Group search',appearance.theme);continue;
  }
  for(const item of componentReferences){
   await page.goto(origin+'/?'+new URLSearchParams(appearance)+'#component/'+item.id,{waitUntil:'domcontentloaded'})
   const card=page.locator('#'+item.id);await card.waitFor({state:'visible'});await card.scrollIntoViewIfNeeded()
   const canvas=card.locator('.component-example-canvas'),shared=card.locator('[data-shared-component-example]');let runtime='shared'
   if(await canvas.count()){
    const frame=canvas.locator('iframe');
    await page.waitForFunction(id=>{const c=document.querySelector('#'+id+' .component-example-canvas');return c?.querySelector('iframe,.sol-inline-preview')},item.id)
    if(await frame.count()){await frame.first().contentFrame().locator('main').waitFor({state:'visible'});runtime='iframe'}
    else{await canvas.locator('.sol-inline-preview[data-package-version="1.1.1"]').waitFor({state:'visible'});runtime='same-document'}
   }else assert.equal(await shared.count(),1,item.name+' links to its comparison owner')
   if(['SBtnGroup','STimeGrid','SMonthCalendar','SBarChart','SFileInput','SDatePicker','SSortableList'].includes(item.name))await card.screenshot({path:fileURLToPath(new URL(appearance.theme+'-'+item.id+'.png',out))})
   await card.locator('[data-component-tab="code"]').click();assert.equal((await card.locator('#'+item.id+'-code pre code').first().textContent()).trim(),componentExampleSources[item.example].trim(),item.name+' Sample Code matches canonical source')
   await card.locator('[data-component-tab="api"]').click();assert.equal(await card.locator('#'+item.id+'-api').isVisible(),true)
   for(const prop of item.props)assert.ok((await card.locator('#'+item.id+'-api').textContent()).includes(prop.name),item.name+'.'+prop.name)
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,item.name+' has no document horizontal overflow')
   records.push({name:item.name,theme:appearance.theme,width:appearance.width,runtime,code:true,api:true,route:page.url().split('#')[1]})
  }
  assert.deepEqual(errors,[]);await page.goto(origin+'/?'+new URLSearchParams(appearance)+'#releases',{waitUntil:'domcontentloaded'});await page.locator('article#release-1-1-0').waitFor({state:'visible'});assert.equal(await page.locator('article#release-1-1-0').count(),1);assert.equal(await page.locator('article#release-1-0-0').count(),1);assert.equal(await page.locator('article#release-1-1-1').count(),0);assert.ok((await page.getByRole('note').first().textContent()).includes('미게시'))
  await page.goto(origin+'/starter/?'+new URLSearchParams(appearance),{waitUntil:'domcontentloaded'});await page.locator('.starter-main > .sol-notice[role=note]').waitFor({state:'visible'});assert.ok((await page.locator('.starter-main > .sol-notice[role=note]').textContent()).includes('1.1.1'));assert.ok((await page.locator('.starter-main > .sol-notice[role=note]').textContent()).includes('1.1.0'));await writeFile(new URL('inventory.json',out),JSON.stringify(records,null,2)+'\n');await context.close();console.log('PASS final document inventory',appearance.theme,componentReferences.length,'routes/code/API/runtime and stable release history')
 }
 await writeFile(new URL(process.argv.includes('--search-only')?'search.json':'inventory.json',out),JSON.stringify(records,null,2)+'\n')
}finally{await browser?.close();await new Promise(done=>server.close(done))}
