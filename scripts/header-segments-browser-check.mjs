/* Optional local pixel/keyboard QA. Uses an isolated installed Chrome, never a user profile. */
import assert from 'node:assert/strict';
import http from 'node:http';
import path from 'node:path';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';

const root=new URL('../',import.meta.url),docs=path.resolve(fileURLToPath(new URL('docs/',root)));
const {chromium}=await import(process.env.SOLYI_PLAYWRIGHT_MODULE||new URL('.tooling/browser-qa/node_modules/playwright-core/index.mjs',root));
const executablePath=process.env.SOLYI_QA_CHROME||'C:/Program Files/Google/Chrome/Application/chrome.exe';
const output=new URL('qa-output/header-segments/',root);await mkdir(output,{recursive:true});
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.woff2':'font/woff2','.ttf':'font/ttf','.svg':'image/svg+xml','.ico':'image/x-icon'};
const server=http.createServer(async(req,res)=>{
  try{const name=decodeURIComponent(new URL(req.url,'http://localhost').pathname),file=path.resolve(docs,'.'+(name==='/'?'/index.html':name));if(file!==docs&&!file.startsWith(docs+path.sep)){res.writeHead(403).end();return;}res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'}).end(await readFile(file));}
  catch{res.writeHead(404).end();}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin='http://127.0.0.1:'+server.address().port,results=[];
let browser;
try{
  browser=await chromium.launch({executablePath,headless:true,chromiumSandbox:true});
  const version=browser.version();console.log('Isolated installed Chrome '+version);
  for(const width of [1180,720,333])for(const mode of ['light','dark']){
    const context=await browser.newContext({viewport:{width,height:820},locale:'ko-KR',hasTouch:width<=720,reducedMotion:'reduce'});
    await context.addInitScript(prefs=>{if(!localStorage.getItem('solyi-ds-prefs'))localStorage.setItem('solyi-ds-prefs',JSON.stringify(prefs));},{theme:'violet',density:'comfortable',mode});
    const page=await context.newPage(),errors=[];page.on('pageerror',error=>errors.push(error.message));
    page.setDefaultTimeout(6000);
    await page.route('**/*',route=>route.request().url().startsWith(origin+'/')?route.continue():route.abort());
    await page.goto(origin+'/#overview',{waitUntil:'domcontentloaded'});
    await page.locator('#appearance-inline [data-pref-theme]').first().waitFor({state:'attached'});
    await page.evaluate(()=>document.fonts.ready);
    const mobile=width<=1100,scope=mobile?'#appearance-dialog':'#appearance-inline';
    if(mobile)await page.locator('#appearance-open').click();
    const geometry=await page.locator(scope+' .appearance-options').evaluateAll(groups=>groups.map(group=>[...group.querySelectorAll('.appearance-choice-face')].map(face=>{
      const r=face.getBoundingClientRect(),s=getComputedStyle(face);return{x:r.x,right:r.right,y:r.y,height:r.height,width:r.width,scrollWidth:face.scrollWidth,clientWidth:face.clientWidth,radii:[s.borderTopLeftRadius,s.borderTopRightRadius,s.borderBottomRightRadius,s.borderBottomLeftRadius]};
    })));
    assert.deepEqual(geometry.map(group=>group.length),[3,2]);
    for(const group of geometry){
      for(let i=0;i<group.length;i++){
        assert.ok(group[i].height>=(width<=720?44:36)-.1,'Preserved control/touch height');
        assert.ok(group[i].scrollWidth<=group[i].clientWidth+1,'Labels fit');
        assert.ok(Math.abs(group[i].y-group[0].y)<.1,'One connected row');
        if(i)assert.ok(Math.abs(group[i].x-group[i-1].right+1)<.15,'Adjacent segments share one border');
      }
      assert.deepEqual(group[0].radii,['6px','0px','0px','6px']);
      assert.deepEqual(group.at(-1).radii,['0px','6px','6px','0px']);
      if(group.length===3)assert.deepEqual(group[1].radii,['0px','0px','0px','0px']);
    }
    const theme=page.locator(scope+' [data-pref-theme][value=violet]');await theme.focus();await page.keyboard.press('ArrowRight');
    assert.equal(await page.locator('html').getAttribute('data-theme'),'sage');
    await page.keyboard.press('ArrowRight');assert.equal(await page.locator('html').getAttribute('data-theme'),'sand');
    await page.keyboard.press('ArrowLeft');assert.equal(await page.locator('html').getAttribute('data-theme'),'sage');
    await page.locator(scope+' [data-pref-density][value=comfortable]').focus();await page.keyboard.press('ArrowRight');
    assert.equal(await page.locator('html').getAttribute('data-density'),'compact');
    const toggle=page.locator(mobile?'#appearance-mode-toggle':'#mode-toggle');await toggle.click();assert.notEqual(await page.locator('html').getAttribute('data-mode'),mode);await toggle.click();
    await page.reload({waitUntil:'domcontentloaded'});await page.locator('#appearance-inline [data-pref-theme][value=sage]:checked').waitFor({state:'attached'});
    assert.equal(await page.locator('html').getAttribute('data-density'),'compact');assert.equal(await page.locator('html').getAttribute('data-mode'),mode);
    if(mobile)await page.locator('#appearance-open').click();
    await page.locator(scope+' [data-pref-theme][value=sage]').focus();await page.keyboard.press('ArrowRight');await page.keyboard.press('ArrowLeft');
    assert.equal(await page.locator(scope+' [data-pref-theme]:checked').getAttribute('aria-label'),'Quiet sage');
    assert.equal(await page.locator(scope+' [data-pref-theme]:checked+.appearance-choice-face .appearance-choice-check').evaluate(e=>getComputedStyle(e).visibility),'visible');
    assert.equal(await page.locator(scope+' [data-pref-theme]:checked+.appearance-choice-face').evaluate(e=>getComputedStyle(e).outlineWidth),'2px');
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth),'No document horizontal overflow');
    await page.evaluate(()=>document.fonts.ready);
    const screenshot=`header-${width}-${mode}.png`;await page.screenshot({path:fileURLToPath(new URL(screenshot,output)),animations:'disabled'});
    if(mobile){await page.keyboard.press('Escape');assert.equal(await page.locator('#appearance-dialog').evaluate(e=>e.open),false);assert.equal(await page.evaluate(()=>document.activeElement.id),'appearance-open');}
    assert.deepEqual(errors,[]);results.push({width,mode,touchEmulation:width<=720,geometry,screenshot});
    await context.close();console.log('PASS '+width+' '+mode+': borders, radii, size, native arrows, check/focus, persistence, mode, overflow and Escape.');
  }
  await writeFile(new URL('report.json',output),JSON.stringify({date:new Date().toISOString(),browser:'Installed Chrome '+version,headless:true,userProfile:false,results},null,2)+'\n');
}finally{await browser?.close();await new Promise(resolve=>server.close(resolve));}
