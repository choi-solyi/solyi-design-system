/* Optional actual-browser review. Isolated installed Chrome; no user profile or uploads. */
import assert from 'node:assert/strict';
import http from 'node:http';
import path from 'node:path';
import {readFile, mkdir, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';

const root = new URL('../', import.meta.url);
const docs = path.resolve(fileURLToPath(new URL('docs/', root)));
const output = new URL('qa-output/integration-0.11/', root);
const {chromium} = await import(process.env.SOLYI_PLAYWRIGHT_MODULE || new URL('.tooling/browser-qa/node_modules/playwright-core/index.mjs', root));
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.woff2':'font/woff2','.ttf':'font/ttf','.svg':'image/svg+xml','.ico':'image/x-icon'};
await mkdir(output, {recursive:true});
const server = http.createServer(async (req, res) => {
  try {
    let name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (name.endsWith('/')) name += 'index.html';
    const file = path.resolve(docs, '.' + name);
    if (!file.startsWith(docs + path.sep)) {res.writeHead(403).end();return;}
    const data = await readFile(file);
    res.writeHead(200, {'Content-Type':types[path.extname(file)] || 'application/octet-stream','Cache-Control':'no-store'}).end(data);
  } catch {res.writeHead(404).end();}
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = 'http://127.0.0.1:' + server.address().port;
const results = [];
let browser;
try {
  browser = await chromium.launch({executablePath:process.env.SOLYI_QA_CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,chromiumSandbox:true});
  for (const width of [1180,720,333]) for (const mode of ['light','dark']) {
    const context = await browser.newContext({viewport:{width,height:900},locale:'ko-KR',hasTouch:width<=720,reducedMotion:'reduce'});
    await context.grantPermissions(['clipboard-read','clipboard-write'], {origin});
    await context.addInitScript(value => localStorage.setItem('solyi-ds-prefs', JSON.stringify({theme:'violet',density:'comfortable',mode:value})), mode);
    const page = await context.newPage();
    page.setDefaultTimeout(10000);
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('**/*', route => route.request().url().startsWith(origin + '/') ? route.continue() : route.abort());
    async function visit(url) {
      if(url.startsWith('/starter/'))url+='&mode='+mode;
      await page.goto(origin + url, {waitUntil:'domcontentloaded'});
      await page.locator('h1').first().waitFor();
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator('html').getAttribute('data-mode'),mode,'The rendered appearance matches the test mode');
    }
    async function capture(name) {
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1), name + ': no document overflow');
      const screenshot = `${width}-${mode}-${name}.png`;
      await page.screenshot({path:fileURLToPath(new URL(screenshot,output)),animations:'disabled'});
      results.push({width,mode,name,screenshot});
    }
    if(process.env.SOLYI_REVIEW_ONLY==='api') {
      await visit('/#component/stext-field-api');
      const table=page.locator('#stext-field-api .api-table-scroll').first();
      await table.scrollIntoViewIfNeeded();
      assert.equal(await table.locator('tbody th code').first().evaluate(element=>getComputedStyle(element).whiteSpace),'nowrap');
      if(width<=720) {
        await table.focus();
        await page.keyboard.press('ArrowRight');
        await page.waitForFunction(()=>document.querySelector('#stext-field-api .api-table-scroll').scrollLeft>0);
        await table.evaluate(element=>element.scrollLeft=0);
      }
      await capture('api');
      assert.deepEqual(errors,[]);
      console.log(`PASS ${width}/${mode}: readable API names, contained table scrolling and keyboard access.`);
      await context.close();
      continue;
    }
    if(process.env.SOLYI_REVIEW_ONLY!=='forms') {
    await visit('/#start');
    assert.equal(await page.locator('.sidebar [data-route]').count(),6);
    await capture('start');
    if(width<=720) {
      await page.locator('#mobile-document-menu').click();
      assert.equal(await page.locator('#mobile-document-menu').getAttribute('aria-expanded'),'true');
      if(width===333&&mode==='dark')await capture('mobile-menu');
      await page.locator('.sidebar nav>a[data-route=component]').click();
      await page.waitForFunction(()=>document.querySelector('#mobile-document-menu')?.getAttribute('aria-expanded')==='false');
    }
    await page.locator('#document-search-open').click();
    await page.locator('#document-search-query').fill('Date Picker');
    await page.locator('#document-search-results a').first().waitFor();
    await page.keyboard.press('ArrowDown');
    assert.equal(await page.evaluate(()=>document.activeElement.closest('#document-search-results')!==null),true);
    await page.keyboard.press('Enter');
    await page.locator('#document-search-dialog').waitFor({state:'hidden'});

    await visit('/#component/fields');
    const code = page.locator('#fields .vue-code-examples');
    await code.locator('summary').click();
    await code.locator('.code-toolbar').scrollIntoViewIfNeeded();
    assert.ok(await code.locator('[role=tabpanel]:not([hidden]) .token').count() > 0, 'Real Vue syntax tokens');
    const syntaxStyle = await code.locator('[role=tabpanel]:not([hidden]) .token').first().evaluate(element => {const style=getComputedStyle(element);return {padding:style.padding,border:style.borderTopWidth,display:style.display};});
    assert.equal(syntaxStyle.padding,'0px','Syntax tokens never inherit color-token card spacing');
    assert.equal(syntaxStyle.border,'0px','Syntax tokens never inherit card borders');
    assert.equal(syntaxStyle.display,'inline','Highlighted code stays inline');
    const raw = await code.locator('[role=tabpanel]:not([hidden]) pre code').textContent();
    assert.ok(!/^import\s+(?!type\b)[^;]*from ['"]vue['"]/m.test(raw), 'Vue preset is reflected in displayed source');
    await code.locator('.code-copy-button').click();
    await page.waitForFunction(()=>document.querySelector('#fields .code-copy-button')?.dataset.copied==='true');
    const clipboard = await page.evaluate(()=>navigator.clipboard.readText());
    assert.equal(clipboard.replace(/\r\n/g,'\n'),raw.replace(/\r\n/g,'\n'),'Actual clipboard preserves source text (Windows line endings normalized)');
    await code.locator('.code-toolbar').evaluate(element=>window.scrollBy({top:element.getBoundingClientRect().top-document.querySelector('.topbar').getBoundingClientRect().height-16,behavior:'instant'}));
    await capture('code');
    await code.locator('[role=tab]').last().focus();
    await page.keyboard.press('Home');
    assert.equal(await code.locator('[role=tab]').first().getAttribute('aria-selected'),'true');
    if((width===1180&&mode==='light')||(width===333&&mode==='dark')) {
      await visit('/#component/stext-field-api');
      await page.locator('#stext-field-api').scrollIntoViewIfNeeded();
      await capture('api');
    }

    await visit('/#theme/packages');
    await page.locator('#packages .sol-install-card').first().waitFor();
    assert.equal(await page.locator('#packages a[download]').count(),2,'One current pair, historical files remain downloadable');
    await capture('releases');
    }

    await visit('/starter/?view=recipes&example=form');
    const submit = page.locator('form button[type=submit]').first();
    await submit.click();
    await page.locator('#recipe-form-name[aria-invalid=true]').waitFor();
    assert.equal(await page.evaluate(() => document.activeElement.id),'recipe-form-name');
    await page.locator('.sol-ui-card').first().evaluate(element=>window.scrollBy({top:element.getBoundingClientRect().top-20,behavior:'instant'}));
    await capture('form-error');
    await page.locator('#recipe-form-name').fill('가상 프로젝트');
    await submit.click();
    await page.getByRole('status').filter({hasText:'확인했어요'}).waitFor();
    assert.equal(await page.locator('#recipe-form-name').inputValue(),'가상 프로젝트');
    await capture('form-success');

    await visit('/starter/?view=recipes&example=error-summary');
    await page.locator('form button[type=submit]').first().click();
    await page.locator('#recipe-summary').waitFor();
    assert.equal(await page.evaluate(() => document.activeElement.id),'recipe-summary');
    await page.locator('#recipe-summary a').first().click();
    assert.equal(await page.evaluate(() => document.activeElement.id),'recipe-summary-name');
    await page.locator('#recipe-summary').evaluate(element=>window.scrollBy({top:element.getBoundingClientRect().top-20,behavior:'instant'}));
    await capture('summary');
    assert.deepEqual(errors, [], 'No browser page errors');
    console.log(`PASS ${width}/${mode}: rendered navigation, highlighted source, current pair, SForm invalid→valid/ref focus, error summary.`);
    await context.close();
  }
  await writeFile(new URL(process.env.SOLYI_REVIEW_ONLY?'report-'+process.env.SOLYI_REVIEW_ONLY+'.json':'report.json',output),JSON.stringify({date:new Date().toISOString(),browser:browser.version(),headless:true,userProfile:false,results},null,2)+'\n');
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}
