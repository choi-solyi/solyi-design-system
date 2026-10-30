import assert from 'node:assert/strict'
import http from 'node:http'
import path from 'node:path'
import {mkdir,readFile,writeFile,stat} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'
import {componentReferences} from '../site/component-api-data.js'
const root=new URL('../',import.meta.url),out=new URL('qa-output/component-extensions-browser/',root),argument=process.argv.indexOf('--docs'),directory=path.resolve(argument<0?fileURLToPath(new URL('docs/',root)):process.argv[argument+1])
const {chromium}=await import(new URL('.tooling/browser-qa/node_modules/playwright-core/index.mjs',root))
const cases=[['SChip','칩','.sol-ui-chip','selected'],['SBadge','배지','.sol-ui-badge','content'],['SIcon','아이콘','svg[role=img]','decorative'],['SIconBtn','아이콘 버튼','button[aria-label="예제 저장"]','loading'],['SDatePicker','날짜 선택','#recipe-date','displayFormatter'],['SNumberInput','숫자 입력','#recipe-amount','formatValue'],['STimePicker','시각 선택','#recipe-time-list','scrubbable'],['SSortableList','정렬 목록','#advanced-sortable','itemKey'],['SMonthCalendar','월간 달력','#advanced-month','isDateDisabled']]
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.woff2':'font/woff2','.ttf':'font/ttf'}
await mkdir(out,{recursive:true})
const server=http.createServer(async(req,res)=>{try{const filename=path.resolve(directory,'.'+decodeURIComponent(new URL(req.url,'http://local').pathname));if(filename!==directory&&!filename.startsWith(directory+path.sep)){res.writeHead(403).end();return}const file=(await stat(filename)).isDirectory()?path.join(filename,'index.html'):filename;res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'}).end(await readFile(file))}catch{res.writeHead(404).end()}})
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const origin='http://127.0.0.1:'+server.address().port,records=[]
let browser
try{
 browser=await chromium.launch({executablePath:process.env.SOLYI_QA_CHROME||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,chromiumSandbox:true})
 for(const width of [320,1440]){
  const context=await browser.newContext({viewport:{width,height:1000},hasTouch:width===320,reducedMotion:'reduce'}),page=await context.newPage(),errors=[]
  page.on('pageerror',error=>errors.push(error.message));await page.route('**/*',route=>new URL(route.request().url()).origin===origin?route.continue():route.abort())
  for(const [name,korean,marker,prop] of cases){
   const reference=componentReferences.find(component=>component.name===name);assert.ok(reference)
   await page.goto(origin+'/#component/'+reference.id,{waitUntil:'networkidle'})
   const card=page.locator('#'+reference.id);await card.scrollIntoViewIfNeeded();await (await card.locator('.inline-preview-canvas').count()?card:page.frameLocator('#'+reference.id+' iframe')).locator(marker).first().waitFor()
   assert.equal(await page.locator('a[data-section-link="'+reference.id+'"]').count(),1,'Menu index contains '+name)
   await page.locator('#document-search-open').click();await page.locator('#document-search-query').fill(name)
   assert.equal(await page.locator('#document-search-results a').first().getAttribute('href'),'#component/'+reference.id,'Unique API name ranks first')
   await page.locator('#document-search-query').fill(korean)
   const result=page.locator('#document-search-results a[href="#component/'+reference.id+'"]');assert.equal(await result.count(),1,'Korean name includes the component alongside any equally exact Style result');await result.click()
   const frame=await card.locator('.inline-preview-canvas').count()?card:page.frameLocator('#'+reference.id+' iframe');await frame.locator(marker).first().waitFor()
   if(name==='SChip'){const chip=frame.getByRole('button',{name:'검토 선택',exact:true});await chip.click();assert.equal(await chip.getAttribute('aria-pressed'),'true')}
   if(name==='SDatePicker'){await frame.locator('#recipe-date-mode input[value=single]').check();await frame.locator('#recipe-date-weekday').check();await frame.locator('#recipe-date').fill('2026-10-28');await page.locator('#'+reference.id+'-title').click();assert.match(await frame.locator('#recipe-date').inputValue(),/^2026-10-28 \(/)}
   if(name==='SNumberInput'){await frame.locator('.sol-ui-number-presets').getByRole('button',{name:'6 개',exact:true}).click();await frame.locator('#recipe-number-format').check();await page.locator('#'+reference.id+'-title').click();assert.equal(await frame.locator('#recipe-amount').inputValue(),'6.0')}
   if(name==='STimePicker'){await frame.locator('#recipe-time-list').focus();await page.keyboard.press('Alt+ArrowDown');await page.keyboard.press('ArrowDown');await page.keyboard.press('Enter');assert.equal(await frame.locator('#recipe-time-list').inputValue(),'09:22')}
   if(name==='SMonthCalendar'){await frame.getByRole('button',{name:'다음 달',exact:true}).click();assert.ok((await frame.locator('#advanced-month-result').textContent()).includes('표시 월: 2026-11'));await frame.locator('#advanced-month-accept').uncheck();await frame.getByRole('button',{name:'이전 달',exact:true}).click();assert.ok((await frame.locator('#advanced-month-result').textContent()).includes('표시 월: 2026-11'));await frame.locator('#advanced-month-accept').check();await frame.getByRole('button',{name:'이전 달',exact:true}).click();await frame.locator('[data-date="2026-10-12"] .sol-ui-month-day').click();assert.ok((await frame.locator('#advanced-month-result').textContent()).includes('선택 ISO: 2026-10-12'))}
   if(name==='SSortableList'){const firstHandle=frame.locator('.sol-ui-sortable-handle').first();await firstHandle.focus();await page.keyboard.press('Space');await page.keyboard.press('ArrowDown');await page.keyboard.press('Enter');assert.equal(await frame.getByText('확정 순서: b → a → c',{exact:true}).count(),1);await frame.locator('#advanced-sort-accept').uncheck();await frame.locator('.sol-ui-sortable-row').nth(1).locator('.sol-ui-sortable-moves button').nth(1).click();assert.equal(await frame.getByText('확정 순서: b → a → c',{exact:true}).count(),1)}
   await page.locator('#'+reference.id+'-api-tab').click();const api=page.locator('#'+reference.id+'-api');assert.ok((await api.textContent()).includes(prop));if(name==='SSortableList')assert.match(await api.textContent(),/key\?: SolSortableKey/)
   await page.locator('#'+reference.id+'-code-tab').click();const code=page.locator('#'+reference.id+'-code');assert.ok((await code.locator('pre code').textContent()).includes('<'+name));const link=code.locator('.code-example-footer a').first(),href=await link.getAttribute('href')
   await link.click();await page.waitForURL(url=>url.pathname.endsWith('/starter/'));await page.locator(marker).first().waitFor();assert.equal(await page.title(),'Solyi · 컴포넌트 미리보기');assert.equal(await page.getByRole('heading',{name:'컴포넌트 미리보기',exact:true,level:1}).count(),1)
   records.push({width,name,korean,id:reference.id,href})
  }
  assert.deepEqual(errors,[]);await context.close();console.log('PASS: '+width+'px; 9 actual Components menu/search/routes, running installed-package canvas operations, API tabs, canonical sample code and standalone preview links')
 }
 await writeFile(new URL('report.json',out),JSON.stringify({browser:browser.version(),directory,cases:records.length,records,limits:['Local docs only; not deployed to ui.solyi.kr','No physical screen reader verification']},null,2))
}finally{await browser?.close();await new Promise(resolve=>server.close(resolve))}
