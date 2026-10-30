import assert from 'node:assert/strict'
import {createServer} from 'node:http'
import {mkdir,readFile,writeFile,stat} from 'node:fs/promises'
import {resolve,extname} from 'node:path'
import {fileURLToPath} from 'node:url'
import {chromium} from '../.tooling/browser-qa/node_modules/playwright-core/index.mjs'
const out=new URL('../qa-output/improvements-30/',import.meta.url),root=resolve('docs'),records=[]
await mkdir(out,{recursive:true})
const server=createServer(async(req,res)=>{try{let f=resolve(root,'.'+new URL(req.url,'http://local').pathname);if(f!==root&&!f.startsWith(root+'\\'))throw Error('path');if((await stat(f)).isDirectory())f=resolve(f,'index.html');res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.woff2':'font/woff2','.svg':'image/svg+xml','.json':'application/json'})[extname(f)]||'application/octet-stream');res.end(await readFile(f))}catch{res.statusCode=404;res.end()}})
await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;let browser,debugPage,debugErrors=[]

try{browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,chromiumSandbox:true});
for(const kind of ['css','module','render','retry']){
 const context=await browser.newContext({viewport:{width:390,height:900}}),page=await context.newPage();let fail=true,requests=0;await page.route('**/*',async r=>{const url=new URL(r.request().url());if(url.origin!==origin)return r.abort();const target=['css','retry'].includes(kind)?'/starter/inline/inline-preview.css':'/starter/inline/inline-preview.js';if(url.pathname===target){requests++;if(kind!=='render'&&fail)return r.fulfill({status:503,body:'Unavailable'});if(kind==='render'){let source=await readFile(resolve(root,'starter/inline/inline-preview.js'),'utf8');assert.match(source,/inputs: [\w$]+,/);source=source.replace(/inputs: [\w$]+,/,'inputs: {setup(){return()=>{if(window.__failPreviewRender)throw Error("Simulated preview render failure");return "Recovered"}}},');return r.fulfill({status:200,contentType:'text/javascript',body:source})}}return r.continue()});await page.addInitScript(()=>window.__failPreviewRender=true);
 await page.goto(origin+'/#component/sdate-picker',{waitUntil:'networkidle'});await page.locator('#sdate-picker').scrollIntoViewIfNeeded();let canvas=page.locator('#sdate-picker .inline-preview-canvas');await canvas.getByRole('status').waitFor();assert.equal(await canvas.getAttribute('aria-busy'),null);assert.equal(await canvas.getByRole('button',{name:'다시 시도',exact:true}).count(),1);
 fail=false;if(kind==='retry')await canvas.getByRole('button',{name:'다시 시도',exact:true}).click();else{await page.evaluate(()=>{window.__failPreviewRender=false;location.hash='#start'});await page.waitForTimeout(100);await page.evaluate(()=>location.hash='#component/sdate-picker');await page.locator('#sdate-picker').scrollIntoViewIfNeeded();}canvas=page.locator('#sdate-picker .inline-preview-canvas');await canvas.locator(kind==='render'?'.sol-inline-preview':'#recipe-date').waitFor({state:'visible',timeout:20000});if(kind==='render')assert.match(await canvas.textContent(),/Recovered/);await page.waitForFunction(()=>document.querySelector('#sdate-picker .inline-preview-canvas')?.getAttribute('aria-busy')===null);if(kind!=='render')assert.ok(requests>=2,'A failed fetch is retried');records.push({kind,requests,revisitRecovered:kind!=='retry',retryRecovered:kind==='retry'});await context.close();console.log('PASS',kind,'failure -> same-page route revisit -> rendered preview')
}
await writeFile(new URL('inline-recovery-observations.json',out),JSON.stringify(records,null,2)+'\n')
}finally{await browser?.close();await new Promise(r=>server.close(r))}
