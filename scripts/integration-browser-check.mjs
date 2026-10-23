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
    await context.addInitScript(value => localStorage.setItem('solyi-ds-prefs', JSON.stringify({theme:'violet',density:'comfortable',mode:value})), mode);
    const page = await context.newPage();
    page.setDefaultTimeout(10000);
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('**/*', route => route.request().url().startsWith(origin + '/') ? route.continue() : route.abort());
    async function visit(url) {
      await page.goto(origin + url, {waitUntil:'domcontentloaded'});
      await page.locator('h1').first().waitFor();
      await page.evaluate(() => document.fonts.ready);
    }
    async function capture(name) {
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1), name + ': no document overflow');
      const screenshot = `${width}-${mode}-${name}.png`;
      await page.screenshot({path:fileURLToPath(new URL(screenshot,output)),animations:'disabled'});
      results.push({width,mode,name,screenshot});
    }
    await visit('/#start');
    assert.equal(await page.locator('.sidebar nav>a').count(),6);
    await capture('start');

    await visit('/#component/fields');
    const code = page.locator('#fields .vue-code-examples');
    await code.locator('summary').click();
    await code.locator('.code-toolbar').scrollIntoViewIfNeeded();
    assert.ok(await code.locator('[role=tabpanel]:not([hidden]) .token').count() > 0, 'Real Vue syntax tokens');
    const raw = await code.locator('[role=tabpanel]:not([hidden]) pre code').textContent();
    assert.ok(!/^import\s+(?!type\b)[^;]*from ['"]vue['"]/m.test(raw), 'Vue preset is reflected in displayed source');
    await capture('code');
    await code.locator('[role=tab]').last().focus();
    await page.keyboard.press('Home');
    assert.equal(await code.locator('[role=tab]').first().getAttribute('aria-selected'),'true');

    await visit('/#theme/packages');
    await page.locator('#packages .sol-install-card').first().waitFor();
    assert.equal(await page.locator('#packages a[download]').count(),2,'One current pair, historical files remain downloadable');
    await capture('releases');

    await visit('/starter/?view=recipes&example=form');
    const submit = page.locator('form button[type=submit]').first();
    await submit.click();
    await page.locator('#recipe-form-name[aria-invalid=true]').waitFor();
    assert.equal(await page.evaluate(() => document.activeElement.id),'recipe-form-name');
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
    await capture('summary');
    assert.deepEqual(errors, [], 'No browser page errors');
    console.log(`PASS ${width}/${mode}: rendered navigation, highlighted source, current pair, SForm invalid→valid/ref focus, error summary.`);
    await context.close();
  }
  await writeFile(new URL('report.json',output),JSON.stringify({date:new Date().toISOString(),browser:browser.version(),headless:true,userProfile:false,results},null,2)+'\n');
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}
