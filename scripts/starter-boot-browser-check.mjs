/* Optional local boot paint QA with an isolated installed Chrome. No user profile. */
import assert from 'node:assert/strict';
import http from 'node:http';
import path from 'node:path';
import {readFile, mkdir, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';

const root = new URL('../', import.meta.url), docs = path.resolve(fileURLToPath(new URL('docs/', root)));
const {chromium} = await import(process.env.SOLYI_PLAYWRIGHT_MODULE || new URL('.tooling/browser-qa/node_modules/playwright-core/index.mjs', root));
const output = new URL('qa-output/starter-boot/', root);await mkdir(output, {recursive: true});
const remainingOnly = process.argv.includes('--remaining');
const noscriptOnly = process.argv.includes('--noscript');
const motionOnly = process.argv.includes('--motion');
const tokens = JSON.parse(await readFile(new URL('tokens.json', root), 'utf8'));
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.woff2':'font/woff2','.ttf':'font/ttf','.svg':'image/svg+xml','.ico':'image/x-icon'};
const server = http.createServer(async (request, response) => {
  try {
    let name = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    if (name.endsWith('/')) name += 'index.html';
    const file = path.resolve(docs, '.' + name);
    if (!file.startsWith(docs + path.sep)) {response.writeHead(403).end();return;}
    const bytes = await readFile(file);
    response.writeHead(200, {'Content-Type':types[path.extname(file)] || 'application/octet-stream','Cache-Control':'no-store'}).end(bytes);
  } catch {response.writeHead(404).end();}
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = 'http://127.0.0.1:' + server.address().port, results = [];
let browser;
const base = '/starter/?view=recipes&example=buttons&embed=1';
async function create(name, {width = 720, mode = 'light', reducedMotion = 'no-preference', javaScriptEnabled = true, intercept} = {}) {
  const context = await browser.newContext({viewport:{width,height:760},locale:'ko-KR',hasTouch:width<=720,reducedMotion,javaScriptEnabled});
  await context.addInitScript(() => {
    window.__bootTrace = [];
    document.addEventListener('load', event => {const link = event.target;if (link?.tagName === 'LINK' && link.as === 'style') window.__bootTrace.push({kind:'css-load',rel:link.rel,state:link.dataset.starterCss,time:performance.now()});}, true);
    new MutationObserver(() => window.__bootTrace.push({kind:'state',state:document.documentElement.dataset.starterBoot,time:performance.now()})).observe(document.documentElement || document, {subtree:true,attributes:true,attributeFilter:['data-starter-boot']});
  });
  const page = await context.newPage(), errors = [];
  page.setDefaultTimeout(8000);
  page.on('pageerror', error => errors.push(error.message));
  await page.route('**/*', async route => {
    if (!route.request().url().startsWith(origin + '/')) {await route.abort();return;}
    if (intercept && await intercept(route)) return;
    await route.continue();
  });
  const url = origin + base + '&mode=' + mode;
  return {name, context, page, errors, url, width, mode};
}
async function ready(page) {await page.waitForFunction(() => document.documentElement.dataset.starterBoot === 'ready');}
async function screenshot(page, name) {await page.screenshot({path:fileURLToPath(new URL(name, output)),animations:'disabled',timeout:8000});}
async function record(item, extra = {}) {
  results.push({name:item.name,width:item.width,mode:item.mode,errors:item.errors,...extra});
  await item.context.close();console.log('PASS ' + item.name);
}
try {
  browser = await chromium.launch({executablePath:process.env.SOLYI_QA_CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,chromiumSandbox:true});
  const browserVersion = browser.version();
  if (!remainingOnly && !noscriptOnly && !motionOnly) {
  const normal = await create('normal-two-css-loads', {width:1180,mode:'dark'});
  await normal.page.goto(normal.url + '&theme=sage&density=compact', {waitUntil:'domcontentloaded'});await ready(normal.page);
  const actual = await normal.page.evaluate(() => ({
    state:document.documentElement.dataset.starterBoot,appearance:{theme:document.documentElement.dataset.theme,mode:document.documentElement.dataset.mode,density:document.documentElement.dataset.density},
    css:[...document.querySelectorAll('link[data-starter-css]')].map(link => ({rel:link.rel,state:link.dataset.starterCss,rules:link.sheet?.cssRules.length || 0})),
    trace:window.__bootTrace,background:getComputedStyle(document.documentElement).getPropertyValue('--boot-bg').trim(),
    appInert:document.getElementById('app').hasAttribute('inert'),appBusy:document.getElementById('app').getAttribute('aria-busy'),loaderHidden:document.getElementById('starter-boot').hidden,
  }));
  assert.deepEqual(actual.appearance, {theme:'sage',mode:'dark',density:'compact'});
  assert.equal(actual.background, tokens.themes.sage.dark.canvas);
  assert.equal(actual.appInert, false);assert.equal(actual.appBusy, 'false');assert.equal(actual.loaderHidden, true);
  assert.ok(actual.css.every(link => link.rel === 'stylesheet' && link.state === 'ready' && link.rules > 0));
  const cssLoads = actual.trace.filter(event => event.kind === 'css-load');
  assert.ok(cssLoads.length >= 2 && cssLoads[0].rel === 'preload' && cssLoads.at(-1).rel === 'stylesheet', 'Actual Chrome applies CSS after the second load');
  assert.deepEqual(normal.errors, []);await screenshot(normal.page, 'normal-ready-1180-dark.png');await record(normal, actual);

  let releaseCss;const cssGate = new Promise(resolve => {releaseCss = resolve;});
  const slow = await create('slow-css-loading-333-reduced', {width:333,reducedMotion:'reduce',intercept:async route => {if (!route.request().url().endsWith('/starter/index.css')) return false;await cssGate;await route.continue();return true;}});
  await slow.page.goto(slow.url, {waitUntil:'domcontentloaded'});
  await slow.page.locator('#starter-boot').waitFor({state:'visible'});
  const pending = await slow.page.evaluate(() => ({state:document.documentElement.dataset.starterBoot,inert:document.getElementById('app').hasAttribute('inert'),busy:document.getElementById('app').getAttribute('aria-busy'),visibility:getComputedStyle(document.getElementById('app')).visibility,animation:getComputedStyle(document.querySelector('.starter-boot-circle')).animationName,overflow:document.documentElement.scrollWidth>innerWidth}));
  assert.deepEqual(pending, {state:'loading',inert:true,busy:'true',visibility:'hidden',animation:'none',overflow:false});
  await screenshot(slow.page, 'slow-css-333-light-reduced.png');releaseCss();await ready(slow.page);assert.deepEqual(slow.errors, []);await record(slow, {pending});

  for (const kind of ['js', 'css']) {
    let blocked = true;
    const failed = await create(kind + '-failure-retry', {width:kind==='js'?720:333,mode:'dark',intercept:async route => {
      if (blocked && route.request().url().endsWith(kind==='js'?'/starter/starter.js':'/starter/index.css')) {await route.abort();return true;}return false;
    }});
    await failed.page.goto(failed.url, {waitUntil:'domcontentloaded'});
    await failed.page.waitForFunction(() => document.documentElement.dataset.starterBoot === 'failed');
    assert.equal(await failed.page.locator('#app').getAttribute('inert'), '');
    await failed.page.getByRole('button', {name:'다시 시도'}).waitFor({state:'visible'});
    assert.ok(await failed.page.getByRole('link', {name:'문서로 돌아가기'}).isVisible());
    if (kind === 'js') await screenshot(failed.page, 'js-failure-720-dark.png');
    blocked = false;
    await failed.page.getByRole('button', {name:'다시 시도'}).click();await ready(failed.page);
    await record(failed, {retried:true});
  }
  }
  if (!noscriptOnly && !motionOnly) {
  const blockedFonts = [];
  const font = await create('font-failure-fallback', {width:333,intercept:async route => {if (/\.(woff2|ttf)(?:\?|$)/.test(route.request().url())) {blockedFonts.push(new URL(route.request().url()).pathname);await route.abort();return true;}return false;}});
  await font.page.goto(font.url, {waitUntil:'domcontentloaded'});await ready(font.page);
  assert.equal(await font.page.locator('#starter-boot').evaluate(element => element.hidden), true);
  const faces = await font.page.evaluate(() => [...document.fonts].map(face => ({family:face.family,status:face.status})));
  assert.ok(blockedFonts.some(name => /\/WantedSansVariable\.split\.\d+\.woff2$/.test(name)));
  assert.ok(!blockedFonts.some(name => name.endsWith('/WantedSansVariable.woff2')), 'Ordinary button text does not request the complete font');
  assert.ok(faces.some(face => face.family === 'Wanted Sans Variable' && face.status === 'error'));
  assert.equal(await font.page.evaluate(() => document.fonts.check('400 14px "Wanted Sans Variable"')), false);
  await record(font, {systemFontFallback:true,blockedFonts,faces});
  }

  if (!motionOnly) {
  const disabled = await create('noscript-333', {width:333,javaScriptEnabled:false});
  await disabled.page.goto(disabled.url, {waitUntil:'domcontentloaded'});
  await screenshot(disabled.page, 'noscript-333.png');
  assert.ok(await disabled.page.locator('noscript p').isVisible());
  assert.match(await disabled.page.locator('noscript p').innerText(), /JavaScript/);
  assert.equal(await disabled.page.locator('#starter-boot').isVisible(), false);
  assert.ok(await disabled.page.getByRole('link', {name:'문서로 돌아가세요.'}).isVisible());await record(disabled, {javaScriptEnabled:false});
  }
  if (!noscriptOnly) {
  let releaseMotionCss;const motionGate = new Promise(resolve => {releaseMotionCss = resolve;});
  const motion = await create('normal-motion-loading-720', {width:720,mode:'dark',intercept:async route => {if (!route.request().url().endsWith('/starter/index.css')) return false;await motionGate;await route.continue();return true;}});
  await motion.page.goto(motion.url, {waitUntil:'domcontentloaded'});
  const animation = await motion.page.locator('.starter-boot-circle').evaluate(element => {const style = getComputedStyle(element);return {name:style.animationName,duration:style.animationDuration,iterations:style.animationIterationCount};});
  assert.deepEqual(animation, {name:'starter-boot-spin',duration:'1.2s',iterations:'infinite'});
  assert.equal(await motion.page.locator('#app').getAttribute('inert'), '');
  releaseMotionCss();await ready(motion.page);assert.deepEqual(motion.errors, []);await record(motion, {animation});
  }
  await writeFile(new URL(motionOnly ? 'motion-report.json' : remainingOnly ? 'remaining-report.json' : 'report.json', output), JSON.stringify({date:new Date().toISOString(),browser:'Installed Chrome '+browserVersion,headless:true,userProfile:false,externalRequestsBlocked:true,remainingOnly,results},null,2)+'\n');
  console.log('PASS boot-only real Chrome QA; screenshots require direct pixel inspection separately.');
} finally {await browser?.close();await new Promise(resolve => server.close(resolve));}
