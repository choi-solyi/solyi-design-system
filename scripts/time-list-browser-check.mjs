/* Current built source in an isolated headless browser, not a published release. */
import assert from 'node:assert/strict'
import http from 'node:http'
import path from 'node:path'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
const root = new URL('../', import.meta.url), out = new URL('qa-output/time-list-browser/', root)
const consumer = new URL('examples/package-consumer/', root), ui = new URL('packages/vue-ui/', root)
const { chromium } = await import(new URL('.tooling/browser-qa/node_modules/playwright-core/index.mjs', root))
const { build } = await import(new URL('node_modules/vite/dist/node/index.js', consumer))
await mkdir(out, { recursive: true })
await writeFile(new URL('index.html', out), '<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Time list QA</title><div id="app"></div><script type="module" src="./entry.js"></script></html>')
await writeFile(new URL('entry.js', out), `
import {createApp,h,ref,nextTick} from 'vue'
import {STimePicker,createSolyiVuetify,applySolyiAppearance,provideSolLocale} from 'solyi-ui'
import 'solyi-ui/all.css'
const locale=ref('ko-KR'),value=ref(null),config=ref({required:false,readonly:false,disabled:false,initial:'09:07',now:false})
let changes=0,submits=0
const vuetify=createSolyiVuetify(),app=createApp({render:()=>h('main',{class:'sol-card',style:'margin:var(--sol-space-4);max-inline-size:var(--sol-reading-max)'},[
 h('h1','Time list · opt-in'),h('form',{id:'form',onSubmit:e=>{e.preventDefault();submits++}},[
 h(STimePicker,{id:'time',name:'time',label:'Time',modelValue:value.value,presentation:'list',allowManualInput:false,min:'00:07',max:'23:59',step:15,initialScrollValue:config.value.initial,scrollToCurrentTime:config.value.now,required:config.value.required,readonly:config.value.readonly,disabled:config.value.disabled,'onUpdate:modelValue':v=>{value.value=v;changes++}}),
 h('button',{id:'outside',type:'button',class:'sol-button'},'Outside'),h('button',{id:'submit',type:'submit',class:'sol-button'},'Submit'),
 ]),h('div',{style:'block-size:100vh'},'Page scroll area'),
])})
provideSolLocale(app,locale);app.use(vuetify).mount('#app')
window.qa={set:async state=>{locale.value=state.locale;document.documentElement.lang=state.locale;applySolyiAppearance(vuetify.theme,state);await nextTick()},config:async state=>{config.value={...config.value,...state};await nextTick()},value:async next=>{value.value=next;await nextTick()},get:()=>({value:value.value,changes,submits}),data:()=>Object.fromEntries(new FormData(document.getElementById('form')))}
`)
await build({ root: fileURLToPath(out), configFile: false, logLevel: 'error', resolve: { alias: [
  { find: /^solyi-ui$/, replacement: fileURLToPath(new URL('dist/index.js', ui)) },
  { find: /^solyi-ui\/all.css$/, replacement: fileURLToPath(new URL('dist/all.css', ui)) },
  { find: /^vue$/, replacement: fileURLToPath(new URL('node_modules/vue/dist/vue.runtime.esm-bundler.js', consumer)) },
] }, build: { outDir: fileURLToPath(new URL('dist/', out)), emptyOutDir: false } })
const directory = path.resolve(fileURLToPath(new URL('dist/', out)))
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2' }
const server = http.createServer(async (request, response) => {
  try {
    let pathname = decodeURIComponent(new URL(request.url, 'http://local').pathname)
    if (pathname.endsWith('/')) pathname += 'index.html'
    const filename = path.resolve(directory, '.' + pathname)
    if (!filename.startsWith(directory + path.sep)) { response.writeHead(403).end(); return }
    response.writeHead(200, { 'Content-Type': mime[path.extname(filename)] || 'application/octet-stream' }).end(await readFile(filename))
  } catch { response.writeHead(404).end() }
})
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
const origin = 'http://127.0.0.1:' + server.address().port, records = []
let browser
try {
  browser = await chromium.launch({ executablePath: process.env.SOLYI_QA_CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, chromiumSandbox: true })
  for (const width of [320, 768, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, hasTouch: width === 320, reducedMotion: 'reduce' })
    const page = await context.newPage(), errors = []
    page.on('pageerror', error => errors.push(error.message))
    await page.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort())
    await page.goto(origin, { waitUntil: 'networkidle' })
    const open = async () => { await page.locator('#time').focus(); await page.keyboard.press('Alt+ArrowDown'); await page.getByRole('listbox').waitFor() }
    for (const theme of ['violet', 'sage', 'sand']) for (const mode of ['light', 'dark']) for (const density of ['comfortable', 'compact']) for (const locale of ['ko-KR', 'en-US']) {
      const config = { theme, mode, density, locale }
      await page.evaluate(state => window.qa.set(state), config); await open()
      const state = await page.getByRole('listbox').evaluate(list => {
        const option = document.getElementById(list.getAttribute('aria-activedescendant')), outer = list.getBoundingClientRect(), inner = option.getBoundingClientRect()
        return { active: option.getAttribute('data-time-value'), scroll: list.scrollTop, visible: inner.top >= outer.top && inner.bottom <= outer.bottom, changes: window.qa.get().changes, overflow: document.documentElement.scrollWidth > innerWidth }
      })
      assert.equal(state.active, '09:07'); assert.ok(state.scroll > 0); assert.equal(state.visible, true)
      assert.equal(state.changes, 0); assert.equal(state.overflow, false)
      records.push({ width, ...config, ...state })
      if (theme === 'sand' && density === 'compact' && locale === 'en-US') await page.screenshot({ path: fileURLToPath(new URL(width + '-' + mode + '.png', out)), fullPage: false })
      await page.keyboard.press('Escape'); assert.equal(await page.locator('#time').evaluate(element => element === document.activeElement), true)
    }
    await page.evaluate(() => window.qa.value('13:07')); await open()
    assert.equal(await page.getByRole('listbox').getAttribute('aria-activedescendant'), 'time-time-1307')
    await page.keyboard.press('ArrowDown'); assert.equal(await page.evaluate(() => window.qa.get().value), '13:07')
    await page.keyboard.press('Enter'); assert.equal(await page.evaluate(() => window.qa.get().value), '13:22')
    assert.equal(await page.evaluate(() => window.qa.get().changes), 1)
    await page.evaluate(() => window.qa.value(null)); await page.evaluate(() => window.qa.config({ required: true }))
    await page.locator('#submit').click(); assert.equal(await page.evaluate(() => window.qa.get().submits), 0)
    assert.equal(await page.locator('#time').getAttribute('aria-invalid'), 'true')
    await open(); await page.keyboard.press('Home'); await page.keyboard.press('Enter')
    assert.deepEqual(await page.evaluate(() => window.qa.data()), { time: '00:07' })
    await page.locator('#submit').click(); assert.equal(await page.evaluate(() => window.qa.get().submits), 1)
    await page.evaluate(() => window.qa.config({ readonly: true })); assert.equal(await page.locator('.sol-time-entry button').isDisabled(), true)
    await page.evaluate(() => window.qa.config({ disabled: true })); assert.deepEqual(await page.evaluate(() => window.qa.data()), {})
    await page.evaluate(() => window.qa.config({ readonly: false, disabled: false, required: false, initial: undefined, now: true })); await page.evaluate(() => window.qa.value(null)); await open()
    const distance = await page.getByRole('listbox').evaluate(list => { const text = document.getElementById(list.getAttribute('aria-activedescendant')).getAttribute('data-time-value'); const [h,m] = text.split(':').map(Number), now = new Date(); return Math.abs(h * 60 + m - now.getHours() * 60 - now.getMinutes()) })
    assert.ok(distance <= 8); await page.keyboard.press('Escape')
    if (width === 320) { await open(); await page.getByRole('option', { name: '12:07', exact: true }).tap(); assert.equal(await page.evaluate(() => window.qa.get().value), '12:07') }
    await page.mouse.move(width - 10, 750); await page.mouse.wheel(0, 350); await page.waitForFunction(() => scrollY > 0)
    assert.deepEqual(errors, []); await context.close()
    console.log('PASS: ' + width + 'px · 24 initial-scroll/theme/locale cases, keyboard, native required/submit, readonly, current-time anchor and outside page scroll')
  }
  await writeFile(new URL('report.json', out), JSON.stringify({ browser: browser.version(), combinations: records.length, records, limits: ['Built-source dist; installed tarball pending', 'No physical touch device or screen reader verification'] }, null, 2))
} finally { await browser?.close(); await new Promise(resolve => server.close(resolve)) }
