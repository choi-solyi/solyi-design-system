/* Actual built documentation + starter, using an isolated browser and local server. */
import assert from 'node:assert/strict'
import http from 'node:http'
import path from 'node:path'
import {mkdir,readFile,writeFile,stat} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'
const root=new URL('../',import.meta.url),out=new URL('qa-output/starter-updates-browser/',root)
const argument=process.argv.indexOf('--docs'),directory=path.resolve(argument<0?fileURLToPath(new URL('docs/',root)):process.argv[argument+1])
const {chromium}=await import(new URL('.tooling/browser-qa/node_modules/playwright-core/index.mjs',root))
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.ico':'image/x-icon','.woff2':'font/woff2','.ttf':'font/ttf'}
await mkdir(out,{recursive:true})
const server=http.createServer(async(request,response)=>{
  try{const pathname=decodeURIComponent(new URL(request.url,'http://local').pathname),filename=path.resolve(directory,'.'+pathname)
    if(filename!==directory&&!filename.startsWith(directory+path.sep)){response.writeHead(403).end();return}
    const target=(await stat(filename)).isDirectory()?path.join(filename,'index.html'):filename
    response.writeHead(200,{'Content-Type':mime[path.extname(target)]||'application/octet-stream','Cache-Control':'no-store'}).end(await readFile(target))
  }catch{response.writeHead(404).end()}
})
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve))
const origin='http://127.0.0.1:'+server.address().port,records=[]
let browser
try{
  browser=await chromium.launch({executablePath:process.env.SOLYI_QA_CHROME||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,chromiumSandbox:true})
  for(const width of [320,768,1440]){
    const context=await browser.newContext({viewport:{width,height:900},hasTouch:width===320,reducedMotion:'reduce'}),page=await context.newPage(),errors=[]
    page.on('pageerror',error=>errors.push(error.message))
    await page.route('**/*',route=>new URL(route.request().url()).origin===origin?route.continue():route.abort())
    for(const theme of ['violet','sage','sand'])for(const mode of ['light','dark'])for(const density of ['comfortable','compact']){
      const state={theme,mode,density}
      await page.addInitScript(value=>localStorage.setItem('solyi-ds-prefs',JSON.stringify(value)),state)
      await page.goto(origin+'/',{waitUntil:'networkidle'})
      const demo=page.getByRole('link',{name:'UI 데모',exact:true})
      assert.equal(await demo.getAttribute('href'),'./starter/');assert.equal(await demo.isVisible(),true)
      assert.equal(await page.locator('#document-search-open').isVisible(),true);assert.equal(await page.locator('#appearance-open').count(),1)
      if(width===1440){assert.equal(await page.locator('#header-density-toggle').isVisible(),true);assert.equal(await page.locator('#mode-toggle').isVisible(),true)}
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Document header fits')
      await demo.focus();assert.notEqual(await demo.evaluate(element=>getComputedStyle(element).outlineStyle),'none')
      await page.keyboard.press('Enter');await page.waitForURL(origin+'/starter/');await page.locator('#starter-updates-title').waitFor()
      assert.equal(await page.title(),'Solyi · 컴포넌트 미리보기');assert.equal(await page.getByRole('heading',{level:1,name:'컴포넌트 미리보기',exact:true}).count(),1)
      const links=page.locator('.starter-example-nav a'),styles=await links.evaluateAll(elements=>elements.map(element=>{const style=getComputedStyle(element),box=element.getBoundingClientRect();return {href:element.getAttribute('href'),role:element.tagName,decoration:style.textDecorationLine,border:style.borderTopWidth,height:box.height,top:box.top,left:box.left,right:box.right}}))
      assert.equal(styles.length,11);assert.ok(styles.some(link=>link.href==='#advanced-sortable-title'))
      for(const link of styles){assert.equal(link.role,'A');assert.equal(link.decoration,'none');assert.equal(link.border,'1px');assert.ok(link.height>=44);assert.ok(link.left>=0&&link.right<=width)}
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Starter fits')
      if(width===320)assert.ok(new Set(styles.map(link=>link.top)).size>1,'Narrow navigation wraps')
      await links.first().focus();await page.keyboard.press('Tab');assert.equal(await links.nth(1).evaluate(element=>element===document.activeElement),true)
      assert.notEqual(await links.nth(1).evaluate(element=>getComputedStyle(element).outlineStyle),'none')
      await page.keyboard.press('Enter');assert.equal(new URL(page.url()).hash,'#starter-table-title')
      records.push({width,...state,links:styles.length})
    }
    await page.goto(origin+'/starter/',{waitUntil:'networkidle'})
    const updates=page.locator('.starter-updates')
    await updates.getByRole('button',{name:'Review',exact:true}).click();assert.equal(await updates.getByRole('button',{name:'Review',exact:true}).getAttribute('aria-pressed'),'true')
    await updates.locator('.sol-ui-chip-remove').first().click();assert.equal(await updates.getByText('항목을 제거했어요.',{exact:true}).isVisible(),true)
    assert.equal(await updates.getByRole('img',{name:'Information · 정보',exact:true}).count(),1)
    assert.equal(await updates.getByText('✓ Complete · 완료',{exact:true}).isVisible(),true)
    const save=updates.getByRole('button',{name:'Save · 저장',exact:true});await save.click();assert.equal(await save.getAttribute('aria-busy'),'true');await page.waitForFunction(()=>document.querySelector('.starter-updates [aria-label="Save · 저장"]').getAttribute('aria-busy')!=='true')
    await page.locator('#recipe-date-mode').selectOption('single');await page.locator('#recipe-date-weekday').check();await page.locator('#recipe-date').fill('2026-10-28');await page.locator('#recipe-amount').focus()
    assert.match(await page.locator('#recipe-date').inputValue(),/^2026-10-28 \(/);assert.equal(await updates.getByText('완료값: "2026-10-28"',{exact:true}).count(),1)
    await updates.locator('.sol-ui-number-presets').getByRole('button',{name:'6 개',exact:true}).click();await page.locator('#recipe-number-format').check();await page.locator('#recipe-amount').blur()
    assert.equal(await page.locator('#recipe-amount').inputValue(),'6.0');assert.equal(await updates.getByText('숫자 모델: 6',{exact:true}).count(),1)
    assert.equal(await updates.locator('.sol-ui-number-presets').getByRole('button',{name:'5 · 간격 불일치',exact:true}).isDisabled(),true)
    const time=page.locator('#recipe-time-list'),open=async()=>{await time.focus();await page.keyboard.press('Alt+ArrowDown');await page.getByRole('listbox').waitFor()}
    assert.equal(await time.evaluate(input=>input.readOnly),true);await open();assert.equal(await page.getByRole('listbox').getAttribute('aria-activedescendant'),'recipe-time-list-time-0907')
    await page.keyboard.press('ArrowDown');await page.keyboard.press('Enter');assert.equal(await time.inputValue(),'09:22')
    const timeField=time.locator('xpath=ancestor::div[contains(concat(" ",normalize-space(@class)," ")," sol-field ")][1]')
    await timeField.locator('.sol-ui-picker-clear').click();await page.locator('#recipe-time-now').check();assert.equal(await page.locator('#recipe-time-initial').isDisabled(),true)
    await open();const distance=await page.getByRole('listbox').evaluate(element=>{const text=document.getElementById(element.getAttribute('aria-activedescendant')).getAttribute('data-time-value'),[h,m]=text.split(':').map(Number),now=new Date();return Math.abs(h*60+m-now.getHours()*60-now.getMinutes())});assert.ok(distance<=8);await page.keyboard.press('Escape')
    await page.locator('#recipe-time-manual').check();await time.fill('09:37');await page.locator('#recipe-time-scrub').check();assert.equal(await time.inputValue(),'09:37')
    const grip=timeField.locator('.sol-ui-time-scrub');await grip.scrollIntoViewIfNeeded();const box=await grip.boundingBox(),x=box.x+box.width/2,y=box.y+box.height/2
    await page.mouse.move(x,y);await page.mouse.down();await page.mouse.move(x,y-10);assert.equal(await time.inputValue(),'09:37');await page.mouse.up();assert.equal(await time.inputValue(),'09:52')
    assert.equal(await updates.getByText('확정 09:52',{exact:true}).count(),1)
    const duplicateIds=await page.evaluate(()=>{const ids=[...document.querySelectorAll('[id]')].map(element=>element.id);return ids.filter((id,index)=>ids.indexOf(id)!==index)});assert.deepEqual(duplicateIds,[])
    await page.locator('.starter-example-nav').scrollIntoViewIfNeeded();await page.screenshot({path:fileURLToPath(new URL(width+'.png',out))})
    assert.deepEqual(errors,[]);await context.close();console.log('PASS: '+width+'px; 12 header/nav appearance cases, keyboard href/focus, all four primitives, ISO weekday, numeric presets/format, time anchor/manual/scrub wiring')
  }
  await writeFile(new URL('report.json',out),JSON.stringify({browser:browser.version(),directory,appearanceCases:records.length,records,limits:['Local built starter using isolated installed development tarball','No public deployment, physical device or screen reader verification']},null,2))
}finally{await browser?.close();await new Promise(resolve=>server.close(resolve))}
