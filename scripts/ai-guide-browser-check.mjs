/* Optional isolated installed-Chrome check; no user profile or external service. */
import assert from 'node:assert/strict';
import http from 'node:http';
import path from 'node:path';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const root=new URL('../',import.meta.url),docs=path.resolve(fileURLToPath(new URL('docs/',root))),output=new URL('qa-output/ai-guide/',root);
const {chromium}=await import(process.env.SOLYI_PLAYWRIGHT_MODULE||new URL('.tooling/browser-qa/node_modules/playwright-core/index.mjs',root));
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.md':'text/markdown; charset=utf-8','.json':'application/json','.woff2':'font/woff2','.ttf':'font/ttf','.svg':'image/svg+xml','.ico':'image/x-icon'};
const server=http.createServer(async(req,res)=>{try{let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(name.endsWith('/'))name+='index.html';const file=path.resolve(docs,'.'+name);if(!file.startsWith(docs+path.sep)){res.writeHead(403).end();return;}res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'}).end(await readFile(file));}catch{res.writeHead(404).end();}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base=process.env.SOLYI_PUBLIC_BASE||'http://127.0.0.1:'+server.address().port+'/',origin=new URL(base).origin;
const source=await readFile(new URL('DESIGN.md',root),'utf8'),records=[];let browser;
await mkdir(output,{recursive:true});
try{
 browser=await chromium.launch({executablePath:process.env.SOLYI_QA_CHROME||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,chromiumSandbox:true});
 for(const width of process.env.SOLYI_PUBLIC_BASE?[333]:[1180,720,333])for(const mode of process.env.SOLYI_PUBLIC_BASE?['dark']:['light','dark']){
  const context=await browser.newContext({viewport:{width,height:900},locale:'ko-KR',hasTouch:width<=720,reducedMotion:'reduce'});
  await context.grantPermissions(['clipboard-read','clipboard-write'],{origin});
  await context.addInitScript(mode=>localStorage.setItem('solyi-ds-prefs',JSON.stringify({theme:'violet',mode,density:'comfortable'})),mode);
  const page=await context.newPage(),errors=[];page.setDefaultTimeout(15000);page.on('pageerror',error=>errors.push(error.message));
  await page.route('**/*',route=>new URL(route.request().url()).origin===origin?route.continue():route.abort());
  await page.goto(base+'#start/ai-guide',{waitUntil:'domcontentloaded'});
  const guide=page.locator('#ai-guide');await guide.waitFor();await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('html').getAttribute('data-mode'),mode);
  const overflow=()=>page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+1);
  assert.ok(await overflow());
  async function copy(label,expected){await guide.getByRole('button',{name:label,exact:true}).click();await page.waitForFunction(()=>document.querySelector('#announcement').textContent.includes('복사'));const actual=await page.evaluate(()=>navigator.clipboard.readText());assert.equal(actual.replace(/\r\n/g,'\n'),expected.replace(/\r\n/g,'\n'));}
  await copy('가이드 복사',source);
  const prompt=await guide.locator('.ai-guide-prompt code').textContent();assert.ok(source.includes(prompt));await copy('프롬프트 복사',prompt);
  const [download]=await Promise.all([page.waitForEvent('download'),guide.getByRole('link',{name:'DESIGN.md 다운로드'}).click()]);
  assert.equal(download.suggestedFilename(),'DESIGN.md');assert.equal(await readFile(await download.path(),'utf8'),source);
  const header=page.locator('.topbar');await guide.evaluate(element=>window.scrollBy({top:element.getBoundingClientRect().top-document.querySelector('.topbar').getBoundingClientRect().height-16,behavior:'instant'}));
  await page.screenshot({path:fileURLToPath(new URL(`${process.env.SOLYI_PUBLIC_BASE?'public-':''}${width}-${mode}-guide.png`,output)),animations:'disabled'});
  const summary=guide.locator('details>summary');await summary.focus();await page.keyboard.press('Enter');assert.equal(await guide.locator('details').getAttribute('open'),'');
  const article=guide.locator('article');await article.evaluate(element=>window.scrollBy({top:element.getBoundingClientRect().top-document.querySelector('.topbar').getBoundingClientRect().height-16,behavior:'instant'}));
  assert.ok(await overflow());await page.screenshot({path:fileURLToPath(new URL(`${process.env.SOLYI_PUBLIC_BASE?'public-':''}${width}-${mode}-reading.png`,output)),animations:'disabled'});
  await page.locator('#document-search-open').click();await page.locator('#document-search-query').fill('DESIGN.md');const result=page.locator('#document-search-results a').first();await result.waitFor();assert.equal(await result.getAttribute('href'),'#start/ai-guide');await page.keyboard.press('ArrowDown');await page.keyboard.press('Enter');await page.locator('#document-search-dialog').waitFor({state:'hidden'});
  if(width<=720){await page.locator('#mobile-document-menu').click();await page.locator('.section-subnav a[href="#start/ai-guide"]').click();await page.waitForFunction(()=>document.querySelector('#mobile-document-menu').getAttribute('aria-expanded')==='false');}
  assert.deepEqual(errors,[]);assert.ok(await overflow());records.push({width,mode,copy:true,download:true,keyboardDisclosure:true,search:true,mobileMenu:width<=720});
  console.log(`PASS ${width}/${mode}: actual copy/download bytes, disclosure/search/menu keys, no page errors or overflow.`);await context.close();
 }
 await writeFile(new URL(process.env.SOLYI_PUBLIC_BASE?'public-report.json':'report.json',output),JSON.stringify({startedAt:process.env.SOLYI_QA_STARTED||null,completedAt:new Date().toISOString(),browser:browser.version(),headless:true,userProfile:false,base,records},null,2)+'\n');
}finally{await browser?.close();await new Promise(resolve=>server.close(resolve));}
