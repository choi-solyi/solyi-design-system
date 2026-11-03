// Actual Components and Starter pages, never the document hamburger.
// The external-input probe is temporary DOM only; no app data/storage is changed.
import assert from 'node:assert/strict'
import {createServer} from 'node:http'
import {readFile,stat,mkdir,writeFile} from 'node:fs/promises'
import {resolve,extname,sep} from 'node:path'
import {fileURLToPath} from 'node:url'
import {chromium} from '../.tooling/browser-qa/node_modules/playwright-core/index.mjs'
const local=process.argv.includes('--local'),commit=process.argv.find(x=>x.startsWith('--commit='))?.slice(9)
assert.match(commit||'',/^[0-9a-f]{7,40}$/,'Record the verified source/deployment commit')
const starterDist=process.argv.find(x=>x.startsWith('--starter-dist='))?.slice(15)
const workspace=resolve(fileURLToPath(new URL('../',import.meta.url))),override=starterDist?resolve(workspace,starterDist):null
if(override)assert.ok(local&&override.startsWith(resolve(workspace,'qa-output')+sep),'Only a local QA starter can override the frozen demo')
const out=new URL('../qa-output/action-menu-focus/',import.meta.url),records=[]
await mkdir(out,{recursive:true})
let server,browser,origin='https://ui.solyi.kr/'
if(local){const docs=resolve(workspace,'docs');server=createServer(async(req,res)=>{try{const url=new URL(req.url,'http://local').pathname,isStarter=override&&url.startsWith('/starter/'),root=isStarter?override:docs;let path=resolve(root,'.'+(isStarter?url.slice(8):url));if(path!==root&&!path.startsWith(root+sep))throw Error('path');if((await stat(path)).isDirectory())path=resolve(path,'index.html');res.setHeader('Content-Type',({'.html':'text/html;charset=utf-8','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml'})[extname(path)]||'application/octet-stream');res.end(await readFile(path))}catch{res.writeHead(404).end()}});await new Promise(done=>server.listen(0,'127.0.0.1',done));origin='http://127.0.0.1:'+server.address().port+'/'}
try{
 browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,chromiumSandbox:true})
 for(const [width,height] of [[704,797],[475,750],[320,640]]){
  const context=await browser.newContext({viewport:{width,height},isMobile:true,hasTouch:true}),page=await context.newPage(),errors=[]
  await page.addInitScript(()=>{window.qaMenuSelections=0;document.addEventListener('click',e=>{if(e.target.closest('[role=menuitem]'))window.qaMenuSelections++},true)})
  page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(30000)
  for(const [route,selectors] of [['#component/scontext-menu',['#scontext-menu .sol-ui-context']],['starter/?view=recipes&example=action-menu',['#recipe-actions','#recipe-context']]]){
   await page.goto(origin+route,{waitUntil:'domcontentloaded'})
   for(const selector of selectors){
    const root=page.locator(selector).first(),trigger=root.locator('.sol-ui-context-trigger,.sol-ui-split-toggle'),menu=root.locator('[role=menu]')
    await trigger.waitFor();const owner=await root.elementHandle()
    const open=async()=>{await trigger.scrollIntoViewIfNeeded();const a=await trigger.boundingBox(),point={x:a.x+a.width/2,y:a.y+a.height/2};await page.touchscreen.tap(point.x,point.y);await menu.waitFor({state:'visible'});assert.equal(await menu.evaluate(el=>el.contains(document.activeElement)),true);const box=await menu.boundingBox();assert.ok(box.x>=0&&box.y>=0&&box.x+box.width<=width+1&&box.y+box.height<=height+1,'Menu stays inside viewport');assert.ok(box.y+box.height<=a.y||box.y>=a.y+a.height,'Menu never covers the opener');return point}
    const blank=async()=>{const point=await page.evaluate(()=>{const main=document.querySelector('main');for(let y=innerHeight-25;y>120;y-=23)for(const x of [innerWidth-18,18,innerWidth/2]){const el=document.elementFromPoint(x,y);if(!el||!main?.contains(el)||el.closest('[role=menu],dialog,.sol-ui-context,.sol-ui-split-button'))continue;const control=el.closest('a[href],button,input,select,textarea,summary,label,[contenteditable],[tabindex]');if(control&&control!==main)continue;return{x,y,target:el.id||el.tagName}}return null});assert.ok(point,'Find a real noninteractive main area outside the action menu');await page.touchscreen.tap(point.x,point.y);await menu.waitFor({state:'detached'});return point}
    await open();const outsidePoint=await blank();assert.equal(await trigger.evaluate(el=>el===document.activeElement),true,'Blank touch restores actual action trigger')
    await open();await page.keyboard.press('Escape');await menu.waitFor({state:'detached'});assert.equal(await trigger.evaluate(el=>el===document.activeElement),true)
    await open();await menu.locator('button:not([aria-disabled=true])').first().tap();await menu.waitFor({state:'detached'});assert.equal(await trigger.evaluate(el=>el===document.activeElement),true)
    const samePoint=await open(),before=await page.evaluate(()=>window.qaMenuSelections);
    assert.equal(await trigger.evaluate((el,p)=>el.contains(document.elementFromPoint(p.x,p.y)),samePoint),true)
    await page.screenshot({path:fileURLToPath(new URL(`open-${width}-${selector.includes('recipe-actions')?'split':selector.includes('recipe-context')?'starter-context':'components-context'}.png`,out))})
    await page.touchscreen.tap(samePoint.x,samePoint.y);await menu.waitFor({state:'detached'});assert.equal(await trigger.evaluate(el=>el===document.activeElement),true);assert.equal(await page.evaluate(()=>window.qaMenuSelections),before,'Re-tap never executes a menu item')
    await page.evaluate(()=>{const input=document.createElement('input');input.id='qa-external-focus-probe';input.setAttribute('aria-label','Temporary focus regression probe');input.style.cssText='position:fixed;bottom:0;right:0;width:80px;height:24px;z-index:9999';document.querySelector('main').append(input)})
    await open();const input=page.locator('#qa-external-focus-probe');await input.tap();await menu.waitFor({state:'detached'});assert.equal(await input.evaluate(el=>el===document.activeElement),true,'The actual menu must preserve external input focus');await input.evaluate(el=>el.remove())
    const target=root.locator('.sol-ui-context-target');if(await target.count()){await target.focus();await page.keyboard.press('Shift+F10');await menu.waitFor({state:'visible'});await blank();assert.equal(await target.evaluate(el=>el===document.activeElement),true,'Context-key invoker is preserved')}
    assert.equal(await owner.evaluate(el=>el.isConnected),true,'No example remount during menu operations')
    await page.screenshot({path:fileURLToPath(new URL(`${local?'built':'public'}-${width}-${selector.includes('recipe-actions')?'split':selector.includes('recipe-context')?'starter-context':'components-context'}.png`,out))})
    records.push({width,height,route,selector,outsidePoint,blankFocus:true,escape:true,select:true,reclick:{passed:true,samePoint,selectedDelta:0,heightIncreasedForPass:false},temporaryInputFocus:true,contextKey:!!(await target.count()),instanceRetained:true});console.log('PASS actual action menu',width,height,route,selector)
   }
  }
  assert.deepEqual(errors,[]);await context.close()
 }
 await writeFile(new URL(local?'built-pages-results.json':'public-pages-results.json',out),JSON.stringify({origin,commit,commitScope:override?'base commit; local QA starter contains uncommitted package changes':'served build',starterDist:starterDist||null,physicalAndroid:false,temporaryExternalInputProbe:true,records},null,2)+'\n')
}finally{await browser?.close();if(server)await new Promise(done=>server.close(done))}
