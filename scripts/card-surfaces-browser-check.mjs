/* Verify leaf backgrounds/radii without clipping the component or its focus/popups. */
import assert from 'node:assert/strict'
import http from 'node:http'
import path from 'node:path'
import {mkdir,readFile,writeFile,stat} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'
const root=new URL('../',import.meta.url),out=new URL('qa-output/card-surfaces-browser/',root),argument=process.argv.indexOf('--docs')
const directory=path.resolve(argument<0?fileURLToPath(new URL('docs/',root)):process.argv[argument+1])
const {chromium}=await import(new URL('.tooling/browser-qa/node_modules/playwright-core/index.mjs',root))
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.woff2':'font/woff2','.ttf':'font/ttf'}
await mkdir(out,{recursive:true})
const server=http.createServer(async(req,res)=>{try{const filename=path.resolve(directory,'.'+decodeURIComponent(new URL(req.url,'http://local').pathname));if(filename!==directory&&!filename.startsWith(directory+path.sep)){res.writeHead(403).end();return}const file=(await stat(filename)).isDirectory()?path.join(filename,'index.html'):filename;res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'}).end(await readFile(file))}catch{res.writeHead(404).end()}})
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const origin='http://127.0.0.1:'+server.address().port,records=[]
let browser
try{
  browser=await chromium.launch({executablePath:process.env.SOLYI_QA_CHROME||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,chromiumSandbox:true})
  for(const width of [320,768,1440]){
    const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'}),page=await context.newPage(),errors=[]
    page.on('pageerror',error=>errors.push(error.message))
    await page.route('**/*',route=>new URL(route.request().url()).origin===origin?route.continue():route.abort())
    for(const theme of ['violet','sage','sand'])for(const mode of ['light','dark'])for(const density of ['comfortable','compact']){
      const config={theme,mode,density}
      await page.addInitScript(value=>localStorage.setItem('solyi-ds-prefs',JSON.stringify(value)),config)
      await page.goto(origin+'/#component/sbtn',{waitUntil:'networkidle'})
      const card=page.locator('#sbtn'),frame=page.frameLocator('#sbtn iframe')
      await card.evaluate(element=>element.scrollIntoView({block:'start'}));await page.evaluate(()=>scrollBy(0,-100))
      await frame.getByRole('button',{name:'Review',exact:true}).waitFor()
      const layers=await frame.locator('html').evaluate(()=>['html','body','.v-application','.sol-ui-card'].map(selector=>{const element=document.querySelector(selector),style=getComputedStyle(element);return {selector,background:style.backgroundColor,radius:style.borderRadius,overflow:style.overflow}}))
      for(const layer of layers.slice(0,3))assert.equal(layer.background,'rgba(0, 0, 0, 0)',layer.selector)
      assert.notEqual(layers[3].background,'rgba(0, 0, 0, 0)');assert.equal(layers[3].overflow,'visible');assert.ok(parseFloat(layers[3].radius)>0)
      assert.equal(await page.locator('#sbtn iframe').evaluate(element=>getComputedStyle(element).backgroundColor),'rgba(0, 0, 0, 0)')
      assert.equal(await card.evaluate(element=>getComputedStyle(element).overflow),'visible')
      assert.equal(await page.locator('#sbtn .vue-live-part').evaluate(element=>getComputedStyle(element).overflow),'visible')
      await frame.getByRole('button',{name:'확인',exact:true}).focus();await page.keyboard.press('Tab')
      const focus=await frame.locator(':focus').evaluate(element=>{const style=getComputedStyle(element);return {visible:element.matches(':focus-visible'),outline:style.outlineStyle}})
      assert.equal(focus.visible,true);assert.notEqual(focus.outline,'none')
      const tooltipButton=frame.getByRole('button',{name:'Copy · 복사',exact:true});await tooltipButton.focus();await frame.getByRole('tooltip').waitFor({state:'visible'})
      await tooltipButton.blur()
      if(theme==='violet'&&density==='comfortable'){await page.screenshot({path:fileURLToPath(new URL(width+'-'+mode+'-examples.png',out))})}
      await page.locator('#sbtn-code-tab').click()
      const radii=await page.locator('#sbtn .component-sample-source').evaluate(element=>{const toolbar=element.querySelector('.code-toolbar'),outer=getComputedStyle(element),inner=getComputedStyle(toolbar);return {outer:parseFloat(outer.borderTopLeftRadius),border:parseFloat(outer.borderLeftWidth),left:parseFloat(inner.borderTopLeftRadius),right:parseFloat(inner.borderTopRightRadius),overflow:outer.overflow}})
      assert.equal(radii.left,radii.outer-radii.border);assert.equal(radii.right,radii.left);assert.equal(radii.overflow,'visible')
      const shared=await page.locator('.component-sample-source').evaluateAll(elements=>elements.map(element=>{const outer=getComputedStyle(element),toolbar=element.querySelector('.code-toolbar'),inner=getComputedStyle(toolbar);return Math.abs(parseFloat(inner.borderTopLeftRadius)-(parseFloat(outer.borderTopLeftRadius)-parseFloat(outer.borderLeftWidth)))<.1}))
      assert.ok(shared.length>=42);assert.equal(shared.every(Boolean),true,'Every shared component code wrapper uses the same inner corner contract')
      if(theme==='violet'&&density==='comfortable'){await card.evaluate(element=>element.scrollIntoView({block:'start'}));await page.evaluate(()=>scrollBy(0,-100));await page.screenshot({path:fileURLToPath(new URL(width+'-'+mode+'-code.png',out))})}
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false)
      records.push({width,...config,layers,radii,shared:shared.length})
    }
    assert.deepEqual(errors,[]);await context.close();console.log('PASS: '+width+'px; 12 theme/mode/density cases, transparent embed layers, visible card/focus/tooltip, matching code corners across shared wrappers')
  }
  await writeFile(new URL('report.json',out),JSON.stringify({browser:browser.version(),directory,cases:records.length,records,limits:['Actual local browser; user Library image pixels unavailable because host python3 could not start','No physical screen reader/touch-device or public deployment verification']},null,2))
}finally{await browser?.close();await new Promise(resolve=>server.close(resolve))}
