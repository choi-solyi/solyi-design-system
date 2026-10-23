/* Optional local QA: isolated installed Chrome; no profile, external request, upload or deployment. */
import assert from 'node:assert/strict';
import http from 'node:http';
import path from 'node:path';
import {readFile, mkdir, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';

const startedAt = new Date().toISOString();
const root = new URL('../', import.meta.url);
const docs = path.resolve(fileURLToPath(new URL('docs/', root)));
const out = new URL('qa-output/warm-sand/', root);
const {chromium} = await import(new URL('.tooling/browser-qa/node_modules/playwright-core/index.mjs', root));
const expectedSelection = {
  light: {'selected-surface':'#E8D2BC','selected-text':'#4A3020','selected-border':'#8B6248','selected-indicator':'#805338'},
  dark: {'selected-surface':'#543E2E','selected-text':'#FFF1E4','selected-border':'#D9B394','selected-indicator':'#EDC9A6'}
};
const rgb = hex => 'rgb(' + hex.slice(1).match(/../g).map(pair => parseInt(pair, 16)).join(', ') + ')';
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.woff2':'font/woff2','.ttf':'font/ttf','.svg':'image/svg+xml','.ico':'image/x-icon'};
const server = http.createServer(async (req, res) => {
  try {
    let name = decodeURIComponent(new URL(req.url, 'http://local').pathname);
    if (name.endsWith('/')) name += 'index.html';
    const file = path.resolve(docs, '.' + name);
    if (!file.startsWith(docs + path.sep)) {res.writeHead(403).end(); return;}
    const bytes = await readFile(file);
    res.writeHead(200, {'Content-Type':types[path.extname(file)] || 'application/octet-stream','Cache-Control':'no-store'}).end(bytes);
  } catch {res.writeHead(404).end();}
});
await mkdir(out, {recursive:true});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = 'http://127.0.0.1:' + server.address().port;
const records = [];
let browser;

try {
  const tokenDocument = JSON.parse(await readFile(new URL('docs/tokens.json', root), 'utf8'));
  assert.equal(tokenDocument.version, '0.12.3', 'Run only after the new documentation build is prepared');
  for (const mode of ['light','dark']) for (const [role, value] of Object.entries(expectedSelection[mode])) {
    assert.equal(tokenDocument.themes.sand[mode][role], value, 'Built Warm sand ' + mode + '/' + role);
  }
  browser = await chromium.launch({executablePath:process.env.SOLYI_QA_CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,chromiumSandbox:true});
  console.log('Started ' + startedAt + ' · isolated installed Chrome ' + browser.version());

  for (const width of (process.env.SOLYI_QA_WIDTHS || '1180,720,333').split(',').map(Number))
  for (const mode of (process.env.SOLYI_QA_MODES || 'light,dark').split(','))
  for (const density of (process.env.SOLYI_QA_DENSITIES || 'comfortable,compact').split(',')) {
    assert.ok(Number.isInteger(width) && width >= 320);
    assert.ok(Object.hasOwn(expectedSelection, mode));
    assert.ok(['comfortable','compact'].includes(density));
    const contextStartedAt = new Date().toISOString();
    const context = await browser.newContext({viewport:{width,height:1000},locale:'ko-KR',hasTouch:width <= 720,reducedMotion:'reduce'});
    await context.addInitScript(preferences => localStorage.setItem('solyi-ds-prefs', JSON.stringify(preferences)), {theme:'sand',mode,density});
    const page = await context.newPage(), errors = [], blockedOrigins = new Set();
    page.setDefaultTimeout(10000);
    page.on('pageerror', error => errors.push(error.message));
    await page.route('**/*', route => {
      const requestOrigin = new URL(route.request().url()).origin;
      if (requestOrigin === origin) return route.continue();
      blockedOrigins.add(requestOrigin); return route.abort();
    });
    const settle = () => page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    const screenshotName = `${width}-${mode}-${density}.png`;
    const sample = locator => locator.evaluate(label => {
      const style = getComputedStyle(label), input = label.querySelector('input'), rect = label.getBoundingClientRect(), inputStyle = getComputedStyle(input);
      return {background:style.backgroundColor,text:style.color,border:style.borderTopColor,indicator:style.boxShadow,outline:style.outlineColor,outlineWidth:parseFloat(style.outlineWidth),outlineOffset:style.outlineOffset,height:rect.height,width:rect.width,paddingX:parseFloat(style.paddingLeft),paddingY:parseFloat(style.paddingTop),checked:input.checked,disabled:input.disabled,inputAccent:inputStyle.accentColor,inputFocus:input.matches(':focus-visible')};
    });
    try {
      const url = new URL('/starter/', origin);
      url.search = new URLSearchParams({view:'recipes',example:'choices',theme:'sand',mode,density,embed:'1'}).toString();
      await page.goto(url.href, {waitUntil:'domcontentloaded'});
      await page.locator('#recipe-include').waitFor();
      await page.evaluate(() => document.fonts.ready);
      await page.waitForFunction(({mode,density}) => document.documentElement.dataset.theme === 'sand' && document.documentElement.dataset.mode === mode && document.documentElement.dataset.density === density, {mode,density});
      const cssRoles = await page.evaluate(() => Object.fromEntries(['selected-surface','selected-text','selected-border','selected-indicator','surface-alt','text','muted','focus'].map(role => [role,getComputedStyle(document.documentElement).getPropertyValue('--sol-color-' + role).trim().toUpperCase()])));
      for (const [role, value] of Object.entries(expectedSelection[mode])) assert.equal(cssRoles[role], value, 'Loaded CSS ' + role);
      const selected = state => {
        assert.equal(state.background, rgb(expectedSelection[mode]['selected-surface']), 'Selected background');
        assert.equal(state.text, rgb(expectedSelection[mode]['selected-text']), 'Selected foreground');
        assert.equal(state.border, rgb(expectedSelection[mode]['selected-border']), 'Selected border');
        assert.ok(state.indicator.includes(rgb(expectedSelection[mode]['selected-indicator'])), 'Selected inset indicator');
      };
      const include = page.locator('#recipe-include'), archived = page.locator('#recipe-archived'), unavailable = page.locator('#recipe-unavailable');
      const includeLabel = include.locator('..'), archivedLabel = archived.locator('..'), unavailableLabel = unavailable.locator('..');
      const radioList = page.locator('#recipe-view-0'), radioCards = page.locator('#recipe-view-1');
      assert.equal(await include.isChecked(), true);assert.equal(await archived.isChecked(), false);assert.equal(await unavailable.isDisabled(), true);
      await page.mouse.move(0, 0);await settle();
      const initialSelected = await sample(includeLabel), initialUnselected = await sample(archivedLabel), initialDisabled = await sample(unavailableLabel);
      selected(initialSelected);assert.equal(initialUnselected.background, 'rgba(0, 0, 0, 0)');assert.equal(initialUnselected.text, rgb(tokenDocument.themes.sand[mode].text));
      assert.equal(initialDisabled.text, rgb(tokenDocument.themes.sand[mode].muted));assert.equal(initialDisabled.checked, false);
      for (const row of [initialSelected,initialUnselected,initialDisabled]) {assert.ok(row.height >= 44, 'Shared row touch floor in both densities');assert.equal(row.paddingX, 12);}

      await includeLabel.hover();await settle();const selectedHover = await sample(includeLabel);selected(selectedHover);
      await archivedLabel.hover();await settle();const unselectedHover = await sample(archivedLabel);assert.equal(unselectedHover.background, rgb(tokenDocument.themes.sand[mode]['surface-alt']));
      await unavailableLabel.hover();await settle();const disabledHover = await sample(unavailableLabel);
      for (const key of ['background','text','border','indicator']) assert.equal(disabledHover[key], initialDisabled[key], 'Disabled does not acquire hover selection: ' + key);
      await unavailableLabel.evaluate(label => label.click());assert.equal(await unavailable.isChecked(), false, 'Disabled native label activation preserves state');

      await page.mouse.move(0, 0);await include.focus();await page.keyboard.press('Space');await settle();
      const uncheckedFocus = await sample(includeLabel);assert.equal(await include.isChecked(), false);assert.ok(uncheckedFocus.inputFocus && uncheckedFocus.outlineWidth >= 2, 'Unselected keyboard focus remains visible');
      await page.keyboard.press('Space');await settle();const checkedFocus = await sample(includeLabel);selected(checkedFocus);assert.ok(checkedFocus.inputFocus && checkedFocus.outlineWidth >= 2, 'Selected keyboard focus remains visible');
      await archived.focus();await page.keyboard.press('Space');await settle();const newlySelected = await sample(archivedLabel);selected(newlySelected);
      await page.keyboard.press('Space');assert.equal(await archived.isChecked(), false, 'Second Space cancels selection');
      await radioList.focus();await page.keyboard.press('ArrowRight');await settle();
      assert.equal(await radioCards.isChecked(), true);assert.equal(await radioList.isChecked(), false);const radioSelected = await sample(radioCards.locator('..'));selected(radioSelected);assert.ok(radioSelected.inputFocus && radioSelected.outlineWidth >= 2);
      await page.keyboard.press('ArrowLeft');assert.equal(await radioList.isChecked(), true);assert.equal(await page.locator('#recipe-view-2').isDisabled(), true);
      const card = page.locator('.sol-ui-card').first(), cardGap = await card.evaluate(element => parseFloat(getComputedStyle(element).rowGap));
      assert.equal(cardGap, density === 'comfortable' ? 16 : 12, 'SCard shared density gap');
      const overflow = await page.evaluate(() => ({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
      assert.ok(overflow.scroll <= overflow.client + 1, 'No page horizontal overflow');
      assert.deepEqual(errors, [], 'No page runtime errors');
      await page.screenshot({path:fileURLToPath(new URL(screenshotName, out)),animations:'disabled',timeout:12000});
      records.push({width,mode,density,touchEmulation:width <= 720,contextStartedAt,completedAt:new Date().toISOString(),path:url.pathname + url.search,cssRoles,cardGap,overflow,initialSelected,initialUnselected,initialDisabled,selectedHover,unselectedHover,disabledHover,uncheckedFocus,checkedFocus,newlySelected,radioSelected,blockedOrigins:[...blockedOrigins],screenshot:screenshotName});
      console.log(`PASS ${width}/${mode}/${density}: actual checkbox/radio states, role colors, keyboard, focus, disabled, 44px row, ${cardGap}px card gap and overflow.`);
    } catch (error) {
      const failure = {startedAt,failedAt:new Date().toISOString(),browser:browser.version(),width,mode,density,message:String(error.stack || error),pageErrors:errors,records};
      try {await page.screenshot({path:fileURLToPath(new URL('failure-' + screenshotName, out)),animations:'disabled',timeout:12000});} catch (captureError) {failure.captureError = String(captureError);}
      await writeFile(new URL('failure.json', out), JSON.stringify(failure, null, 2) + '\n');
      throw error;
    } finally {await context.close();}
  }
  await writeFile(new URL('report.json', out), JSON.stringify({startedAt,completedAt:new Date().toISOString(),browser:browser.version(),headless:true,userProfile:false,sandbox:true,physicalDevice:false,documentVersion:'0.12.3',expectedCore:'0.4.9',expectedUi:'0.10.3',scope:'Canonical choices recipe uses installed Vue S controls and shared Core choice-row styles. No all-component visual-pass claim.',records}, null, 2) + '\n');
} finally {await browser?.close();await new Promise(resolve => server.close(resolve));}
