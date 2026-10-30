// Real built documentation/starter journey. --local serves docs/ without altering it.
// Public runs require --commit=<verified deployed SHA>; npm is never contacted here.
import assert from 'node:assert/strict'
import {createServer} from 'node:http'
import {readFile,stat,mkdir,writeFile} from 'node:fs/promises'
import {resolve,extname,sep} from 'node:path'
import {fileURLToPath} from 'node:url'
import {chromium} from '../.tooling/browser-qa/node_modules/playwright-core/index.mjs'

const repository=new URL('../',import.meta.url),local=process.argv.includes('--local')
const commit=process.argv.find(arg=>arg.startsWith('--commit='))?.slice(9)
assert.match(commit||'',/^[0-9a-f]{7,40}$/,'Record the source/deployed commit explicitly')
const out=new URL('qa-output/public-followups/'+(local?'built-site/':'live-site/'),repository)
await mkdir(out,{recursive:true})
let server,browser,origin='https://ui.solyi.kr'
if(local){
 const root=fileURLToPath(new URL('docs/',repository)).replace(/[\\/]$/,'')
 server=createServer(async(req,res)=>{try{
  let path=resolve(root,'.'+new URL(req.url,'http://local').pathname)
  if(path!==root&&!path.startsWith(root+sep))throw Error('path')
  if((await stat(path)).isDirectory())path=resolve(path,'index.html')
  res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.woff2':'font/woff2','.ttf':'font/ttf','.ico':'image/x-icon'})[extname(path)]||'application/octet-stream')
  res.end(await readFile(path))
 }catch{res.statusCode=404;res.end()}})
 await new Promise(done=>server.listen(0,'127.0.0.1',done));origin='http://127.0.0.1:'+server.address().port
}
const records=[]
try{
 browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,chromiumSandbox:true})
 for(const appearance of [{width:1100,theme:'violet',mode:'light'},{width:390,theme:'sage',mode:'dark',density:'compact'},{width:390,theme:'sand',mode:'light'}].filter(item=>!process.argv.some(arg=>arg.startsWith('--theme='))||process.argv.includes('--theme='+item.theme))){
  const context=await browser.newContext({viewport:{width:appearance.width,height:1000},hasTouch:appearance.width===390,reducedMotion:'no-preference',timezoneId:'UTC'}),page=await context.newPage(),errors=[]
  page.setDefaultTimeout(40000);page.on('pageerror',error=>errors.push(error.message))
  await page.route('**/*',route=>new URL(route.request().url()).origin===origin?route.continue():route.abort())
  await page.clock.install({time:new Date('2026-10-30T10:13:00Z')})
  const query=extra=>new URLSearchParams({...appearance,...extra})
  async function doc(id){console.log('CHECK',appearance.theme,id);await page.goto(origin+'/?'+query({})+'#component/'+id,{waitUntil:'domcontentloaded'});const card=page.locator('#'+id);await card.waitFor({state:'visible'});await card.scrollIntoViewIfNeeded();return card}
  const scope=async card=>await card.locator('iframe').count()?card.locator('iframe').first().contentFrame():card
  const shot=async name=>page.screenshot({path:fileURLToPath(new URL(appearance.theme+'-'+name+'.png',out))})

  let card=await doc('sprogress-circular'),inside=await scope(card)
  assert.equal(await inside.locator('.sol-ui-progress-circle').count(),1);assert.equal(await inside.locator('.sol-ui-progress-linear').count(),0);await shot('circular')
  card=await doc('sbadge');inside=await scope(card);assert.equal(await inside.locator('.sol-ui-badge button').count(),0);assert.ok((await inside.locator('.sol-ui-badge').evaluateAll(nodes=>nodes.map(el=>getComputedStyle(el).cursor))).every(value=>value!=='pointer'));await shot('badge')
  card=await doc('schip');inside=await scope(card);const heights=await inside.locator('.sol-ui-chip').evaluateAll(nodes=>nodes.map(el=>el.getBoundingClientRect().height));assert.equal(heights.length,4);assert.ok(Math.max(...heights)-Math.min(...heights)<1);await shot('chip')
  card=await doc('sbar-chart');inside=await scope(card);await inside.locator('#recipe-chart-type').getByRole('radio',{name:/Pie/}).check();const legend=inside.locator('.sol-ui-chart-legend'),rows=await legend.locator('li').all(),expected=[['월요일',2],['화요일',4],['수요일',0],['목요일',5]]
  assert.equal(rows.length,4);assert.equal(await legend.evaluate(el=>getComputedStyle(el).listStyleType),'none')
  for(let i=0;i<rows.length;i++){assert.equal((await rows[i].locator('.sol-ui-chart-order').textContent()).trim(),String(i+1)+'.');assert.equal((await rows[i].locator('.sol-ui-chart-name').textContent()).trim(),expected[i][0]);assert.equal((await rows[i].locator('.sol-ui-chart-value').textContent()).replace(/\s/g,''),'기록수'+expected[i][1]);if(i){const a=await rows[i-1].boundingBox(),b=await rows[i].boundingBox();assert.ok(b.x>=a.x+a.width+1||b.y>=a.y+a.height+1)}}await shot('chart')
  card=await doc('sprogress-linear');inside=await scope(card);await inside.locator('#recipe-loading-scope').selectOption('viewport');await inside.locator('#recipe-loading-start').click();const scrim=page.locator('.sol-ui-picker-host:has(.sol-ui-loading-host)>.v-overlay__scrim');await scrim.waitFor({state:'visible'});assert.notEqual(await scrim.evaluate(el=>getComputedStyle(el).backgroundColor),'rgba(0, 0, 0, 0)');await shot('loading');await scrim.waitFor({state:'hidden'});
  card=await doc('scard');inside=await scope(card);const link=inside.locator('a.sol-ui-card-link');await page.mouse.move(0,0);assert.equal(await link.getAttribute('target'),'_blank');assert.equal(await link.evaluate(el=>getComputedStyle(el).textDecorationLine),'none');await page.keyboard.press('Tab');await link.focus();assert.notEqual(await link.evaluate(el=>getComputedStyle(el).outlineStyle),'none');const opened=context.waitForEvent('page');await link.click();const popup=await opened;await popup.waitForLoadState('domcontentloaded');assert.equal(new URL(popup.url()).searchParams.get('example'),'empty');await popup.close()

  card=await doc('smonth-calendar');assert.equal(await card.locator('iframe').count(),0,'Calendar uses the actual document viewport');const cal=card.locator('.sol-ui-month-calendar'),table=cal.locator('table'),marked=cal.locator('[data-date="2026-10-28"] button'),details=cal.locator('.sol-ui-month-details'),loading=card.locator('input[id$="advanced-month-loading"]'),top=async()=>{await table.evaluate(async el=>{await el.ownerDocument.fonts.ready});return table.evaluate(el=>el.getBoundingClientRect().top+scrollY)},before=await top()
  for(let i=0;i<2;i++){await loading.check();assert.equal(await top(),before);await loading.uncheck();assert.equal(await top(),before)}
  if(appearance.width>800)await marked.locator('.sol-ui-month-more').click();else await marked.tap()
  assert.equal(await details.locator('li').count(),3);await details.getByRole('button',{name:'닫기',exact:true}).click();assert.equal(await details.isVisible(),false);assert.ok(await marked.evaluate(el=>el===document.activeElement));await cal.locator('[data-date="2026-10-07"] button').click();assert.ok(await details.isVisible());await marked.click();assert.equal(await details.locator('li').count(),3);await details.press('Escape');assert.equal(await details.isVisible(),false);await shot('calendar')
  card=await doc('ssortable-list');inside=await scope(card);const sortRows=inside.locator('.sol-ui-sortable-row'),content=sortRows.nth(1).locator('.sol-ui-sortable-content'),x=(await content.boundingBox()).x;await inside.locator('input[id$="advanced-sort-lock"]').check();assert.equal(await sortRows.nth(1).locator('.sol-ui-sortable-handle:visible').count(),0);assert.equal((await content.boundingBox()).x,x);const order=await sortRows.locator('.sol-ui-sortable-content').allTextContents(),grip=sortRows.first().locator('.sol-ui-sortable-handle');await grip.click();assert.equal(await grip.evaluate(el=>getComputedStyle(el).outlineStyle),'none');await grip.press('ArrowDown');await grip.press('Escape');assert.deepEqual(await sortRows.locator('.sol-ui-sortable-content').allTextContents(),order);assert.notEqual(await grip.evaluate(el=>getComputedStyle(el).outlineStyle),'none');await shot('sortable')

  await page.goto(origin+'/starter/?'+query({view:'advanced',part:'time-grid'}),{waitUntil:'domcontentloaded'})
  const grid=page.locator('#advanced-time-grid'),items=grid.locator('.sol-ui-time-grid-item'),column=grid.locator('.sol-ui-time-grid-column').first(),status=page.locator('#advanced-time-grid-result'),accept=page.locator('#advanced-time-grid-accept'),initial=await items.count()
  assert.equal(initial,4);assert.equal(await grid.locator('.sol-ui-time-grid-toolbar').count(),0);assert.equal(await grid.locator('.sol-ui-time-grid-agenda li').first().getByRole('button').count(),1)
  await grid.getByRole('button',{name:'항목 추가',exact:true}).click();assert.equal(await items.count(),initial+1)
  let title='새 가상 항목 1',created=items.filter({hasText:title});const identity=await created.elementHandle();assert.ok(identity)
  const time=()=>identity.evaluate(el=>el.querySelector('.sol-ui-time-grid-item-time').textContent.trim())
  async function stable(value){assert.ok(await identity.evaluate(el=>el.isConnected),'The keyed article identity survives model updates');assert.equal(await items.count(),initial+1);assert.equal(await time(),value)}
  async function drag(selector,minutes){const target=selector?created.locator(selector):created;await target.scrollIntoViewIfNeeded();const b=await target.boundingBox(),height=(await column.boundingBox()).height;await page.mouse.move(b.x+8,b.y+b.height/2);await page.mouse.down();await page.mouse.move(b.x+8,b.y+b.height/2+height/600*minutes,{steps:6});await page.mouse.up();await page.waitForTimeout(30);await column.dispatchEvent('click',{bubbles:true,detail:1,clientX:1,clientY:1})}
  await stable('08:00–08:15');await drag(null,30);await stable('08:30–08:45');await drag('.sol-ui-time-grid-handle--resize-start',-15);await stable('08:15–08:45');await drag('.sol-ui-time-grid-handle--resize-end',30);await stable('08:15–09:15')
  await accept.uncheck();await drag(null,15);await stable('08:15–09:15');assert.ok((await status.textContent()).includes('원본 유지'));await accept.check()
  if(appearance.width===390){
   const session=await context.newCDPSession(page);let id=0
   async function touch(selector,minutes,cancel=false){const target=selector?created.locator(selector):created;await target.scrollIntoViewIfNeeded();const b=await target.boundingBox(),height=(await column.boundingBox()).height;id++;await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:b.x+8,y:b.y+b.height/2,id}]});await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:b.x+8,y:b.y+b.height/2+height/600*minutes,id}]});await page.waitForTimeout(60);assert.ok(await grid.locator('.sol-ui-time-grid-preview').isVisible());await session.send('Input.dispatchTouchEvent',{type:cancel?'touchCancel':'touchEnd',touchPoints:[]});await page.waitForTimeout(30);assert.equal(await grid.getByRole('menu').count(),0,'Touch drag must not open the action menu')}
   await touch(null,15);await stable('08:30–09:30');await touch(null,15,true);await stable('08:30–09:30');assert.ok((await status.textContent()).includes('pointercancel'));await touch('.sol-ui-time-grid-handle--resize-start',-15);await stable('08:15–09:30');await touch('.sol-ui-time-grid-handle--resize-end',15);await stable('08:15–09:45')
  }
  const finalTime=await time(),dialog=page.getByRole('dialog',{name:'항목 수정',exact:true})
  async function menu(name,right=false){if(right)await created.click({button:'right',position:{x:8,y:20}});else {const trigger=created.getByRole('button',{name:/더 많은 동작/});if(appearance.width===390)await trigger.tap();else await trigger.click()}const panel=grid.getByRole('menu');await panel.waitFor({state:'visible'});const b=await panel.boundingBox();assert.ok(b.x>=0&&b.y>=0&&b.x+b.width<=appearance.width+1&&b.y+b.height<=1001);const choice=panel.getByRole('menuitem',{name,exact:true});if(appearance.width===390)await choice.tap();else await choice.click()}
  await menu('항목 수정',true);await dialog.getByRole('textbox',{name:'항목 내용',exact:true}).fill('취소할 내용');await dialog.getByRole('button',{name:'취소',exact:true}).click();assert.equal(await identity.evaluate(el=>el.querySelector('.sol-ui-time-grid-item-title').textContent),title);await stable(finalTime)
  await accept.uncheck();await menu('항목 수정');await dialog.getByRole('textbox',{name:'항목 내용',exact:true}).fill('거절할 내용');await dialog.getByRole('button',{name:'저장',exact:true}).click();assert.equal(await identity.evaluate(el=>el.querySelector('.sol-ui-time-grid-item-title').textContent),title);assert.ok((await status.textContent()).includes('원본 유지'));await accept.check()
  await menu('항목 수정');await dialog.getByRole('textbox',{name:'항목 내용',exact:true}).fill('공개 검증 항목');await dialog.getByRole('button',{name:'저장',exact:true}).click();title='공개 검증 항목';created=items.filter({hasText:title});assert.equal(await identity.evaluate(el=>el.querySelector('.sol-ui-time-grid-item-title').textContent),title);await stable(finalTime);assert.ok((await status.textContent()).includes('new-1'),'Edit request confirms the original stable key');await shot('time-grid-edited')
  await menu('항목 삭제');assert.equal(await items.count(),initial);assert.equal(await identity.evaluate(el=>el.isConnected),false);assert.ok((await status.textContent()).includes('new-1'));assert.ok(await grid.evaluate(el=>el.contains(document.activeElement)),'Accepted deletion keeps focus in the grid')
  card=await doc('stime-grid');assert.equal(await card.locator('iframe').count(),0);const inline=card.locator('.sol-ui-time-grid'),height=(await card.boundingBox()).height,scrollHeight=await page.evaluate(()=>document.documentElement.scrollHeight);await inline.locator('.sol-ui-time-grid-menu-trigger').first().click();await inline.getByRole('menu').waitFor();assert.equal((await card.boundingBox()).height,height);assert.equal(await page.evaluate(()=>document.documentElement.scrollHeight),scrollHeight);await page.keyboard.press('Escape')
  await page.goto(origin+'/?'+query({})+'#releases/changelog',{waitUntil:'domcontentloaded'});await page.locator('#release-1-1-0').waitFor({state:'visible'});assert.equal(await page.locator('#release-1-1-0 li').count(),2);assert.equal(await page.locator('#release-1-0-0').count(),1);assert.equal(await page.locator('#release-1-1-1').count(),0);assert.equal(await page.locator('[id^="release-0-"]').count(),0);await shot('release-notes')
  assert.deepEqual(errors,[]);records.push({commit,stage:local?'built-site':'public-site',appearance,heights,calendarReopenAndLoading:true,lockedAlignmentAndCancel:true,timeGrid:{key:'new-1',countInvariant:true,keyedDomIdentity:true,editAndDeleteKeyConfirmed:true,finalTime,touch:appearance.width===390},legend:expected,releaseHistory:['1.1.0','1.0.0']});await writeFile(new URL('results-'+appearance.theme+'.json',out),JSON.stringify(records.at(-1),null,2)+'\n');await context.close();console.log('PASS actual '+(local?'built':'public')+' site journey',appearance.theme,appearance.width)
 }
 await writeFile(new URL('results.json',out),JSON.stringify(records,null,2)+'\n')
}finally{await browser?.close();if(server)await new Promise(done=>server.close(done))}
