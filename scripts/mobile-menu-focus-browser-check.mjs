// Built document shell with only topics.js served from source. No build/artifact mutation.
import assert from 'node:assert/strict'
import {createServer} from 'node:http'
import {readFile,stat,mkdir,writeFile} from 'node:fs/promises'
import {resolve,extname,sep} from 'node:path'
import {fileURLToPath} from 'node:url'
import {chromium} from '../.tooling/browser-qa/node_modules/playwright-core/index.mjs'

const root=fileURLToPath(new URL('../docs/',import.meta.url)).replace(/[\\/]$/,'')
const baseline=process.argv.includes('--baseline'),built=process.argv.includes('--built'),publicUrl=process.argv.find(arg=>arg.startsWith('--url='))?.slice(6),commit=process.argv.find(arg=>arg.startsWith('--commit='))?.slice(9),records=[]
if(publicUrl)assert.match(commit||'',/^[0-9a-f]{7,40}$/,'Record the verified deployed commit')
const out=new URL('../qa-output/mobile-menu-focus/',import.meta.url)
await mkdir(out,{recursive:true})
const server=createServer(async(req,res)=>{try{
 let path=resolve(root,'.'+new URL(req.url,'http://local').pathname)
 if(path!==root&&!path.startsWith(root+sep))throw Error('path')
 if((await stat(path)).isDirectory())path=resolve(path,'index.html')
 if(!baseline&&!built&&path===resolve(root,'topics.js'))path=fileURLToPath(new URL('../site/topics.js',import.meta.url))
 res.setHeader('Content-Type',({'.html':'text/html;charset=utf-8','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml'})[extname(path)]||'application/octet-stream')
 res.end(await readFile(path))
}catch{res.writeHead(404).end()}})
await new Promise(done=>server.listen(0,'127.0.0.1',done))
let browser
try{
 browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,chromiumSandbox:true})
 for(const width of [475,320]){
  const context=await browser.newContext({viewport:{width,height:900},hasTouch:true}),page=await context.newPage()
  await page.goto((publicUrl||'http://127.0.0.1:'+server.address().port+'/')+'#start/install')
  const trigger=page.locator('#mobile-document-menu'),nav=page.locator('#document-primary-nav')
  await trigger.waitFor()
  // Real main container's blank area and controls. Keep targets below the menu's clip.
  await page.evaluate(()=>{
   const fixture=document.createElement('div');fixture.id='focus-targets'
   fixture.style.cssText='position:fixed;bottom:0;left:0;right:0;height:14px;z-index:9999;display:flex;background:white'
   fixture.innerHTML='<span id="focus-blank" style="width:50px">blank</span><input id="focus-input" aria-label="Focus check" style="width:55px"><a id="focus-link" href="#focus-targets">Link</a><button id="focus-button">Button</button><span id="focus-custom">Custom</span>'
   fixture.querySelector('#focus-custom').addEventListener('click',()=>fixture.querySelector('input').focus())
   document.querySelector('main').append(fixture)
   fixture.querySelector('a').addEventListener('click',event=>event.preventDefault())
  })
  const open=async()=>{await trigger.tap();await nav.waitFor({state:'visible'});await nav.locator('button:visible').first().focus()}
  await open();await page.keyboard.press('Escape');await nav.waitFor({state:'hidden'});assert.equal(await trigger.evaluate(el=>el===document.activeElement),true)
  await open();await page.locator('#focus-blank').tap()
  const blank=await page.evaluate(()=>({active:document.activeElement.id,closed:document.querySelector('#document-primary-nav').hidden}))
  if(baseline){records.push({width,blank});await context.close();continue}
  assert.deepEqual(blank,{active:'mobile-document-menu',closed:true})
  for(const id of ['focus-input','focus-link','focus-button','focus-custom']){
   await open();await page.locator('#'+id).tap();await nav.waitFor({state:'hidden'})
   assert.equal(await page.evaluate(()=>document.activeElement.id),id==='focus-custom'?'focus-input':id,'Do not steal intended focus from '+id)
  }
  await open();await trigger.tap();await nav.waitFor({state:'hidden'});assert.equal(await trigger.evaluate(el=>el===document.activeElement),true)
  await open();const link=nav.locator('a[href="#start/install"]');await link.tap();await nav.waitFor({state:'hidden'})
  assert.equal(await page.evaluate(()=>document.activeElement.id),'install-title','Selected section is an intentional focus destination')
  // Mouse click follows the same blank-area dismissal contract.
  await open();await page.locator('#focus-blank').click();assert.equal(await trigger.evaluate(el=>el===document.activeElement),true)
  assert.equal(await page.locator('#mobile-document-menu').count(),1)
  await page.screenshot({path:fileURLToPath(new URL(width+'.png',out))})
  records.push({width,escape:true,blankTouchAndClick:true,inputLinkButtonAndCustomFocus:true,triggerToggle:true,sectionSelection:true})
  await context.close();console.log('PASS mobile menu focus',width)
 }
 await writeFile(new URL(publicUrl?'public-results.json':baseline?'baseline.json':built?'built-results.json':'results.json',out),JSON.stringify({baseline,built,publicUrl,commit,physicalAndroid:false,records},null,2)+'\n')
}finally{await browser?.close();await new Promise(done=>server.close(done))}
