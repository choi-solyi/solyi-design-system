/* Fresh isolated Chrome; no user browser/profile or external navigation. */
import assert from 'node:assert/strict'
import http from 'node:http'
import path from 'node:path'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
const installed = process.argv.includes('--installed'), consumerArgument = process.argv.indexOf('--consumer')
const root = new URL('../', import.meta.url), out = new URL(installed ? 'qa-output/time-scrub-installed-browser/' : 'qa-output/time-scrub-browser/', root)
const consumer = consumerArgument < 0 ? new URL('examples/package-consumer/', root) : pathToFileURL(path.resolve(process.argv[consumerArgument + 1]) + path.sep)
const ui = installed ? new URL('node_modules/solyi-ui/', consumer) : new URL('packages/vue-ui/', root)
const { chromium } = await import(new URL('.tooling/browser-qa/node_modules/playwright-core/index.mjs', root))
const { build } = await import(new URL('node_modules/vite/dist/node/index.js', consumer))
await mkdir(out, { recursive: true })
await writeFile(new URL('index.html', out), '<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Time scrub QA</title><div id="app"></div><script type="module" src="./entry.js"></script></html>')
await writeFile(new URL('entry.js', out), `
import {createApp,h,ref,nextTick} from 'vue'
import {STimePicker,createSolyiVuetify,applySolyiAppearance,provideSolLocale} from 'solyi-ui'
import 'solyi-ui/all.css'
const locale=ref('ko-KR'),value=ref('09:22'),readonly=ref(false),disabled=ref(false)
let changes=[],previews=[],commits=[],cancels=[]
const vuetify=createSolyiVuetify(),app=createApp({render:()=>h('main',{class:'sol-card',style:'margin:var(--sol-space-4);max-inline-size:var(--sol-reading-max)'},[
 h('h1','Time scrub'),h('form',{id:'form'},[
 h(STimePicker,{id:'time',name:'time',label:'A long time field label that can wrap',modelValue:value.value,presentation:'list',scrubbable:true,listScrubbable:true,scrubPixelsPerStep:10,min:'00:07',max:'23:59',step:15,readonly:readonly.value,disabled:disabled.value,'onUpdate:modelValue':v=>value.value=v,onChange:v=>changes.push(v),onPreview:v=>previews.push(v),onInteractionCommit:v=>commits.push(v),onInteractionCancel:v=>cancels.push(v)}),
 h('button',{id:'outside',type:'button',class:'sol-button'},'Outside'),
 ]),h('div',{style:'block-size:150vh'},'Page scroll area')
])})
provideSolLocale(app,locale);app.use(vuetify).mount('#app')
window.qa={set:async state=>{locale.value=state.locale;document.documentElement.lang=state.locale;applySolyiAppearance(vuetify.theme,state);await nextTick()},value:async next=>{value.value=next;await nextTick()},reset:async()=>{value.value='09:22';changes=[];previews=[];commits=[];cancels=[];await nextTick()},disabled:async next=>{disabled.value=next;await nextTick()},get:()=>({value:value.value,changes,previews,commits,cancels,data:new FormData(document.getElementById('form')).get('time')})}
`)
await build({ root: fileURLToPath(out), configFile: false, logLevel: 'error', resolve: { alias: [
  { find: /^solyi-ui$/, replacement: fileURLToPath(new URL('dist/index.js', ui)) },
  { find: /^solyi-ui\/all.css$/, replacement: fileURLToPath(new URL('dist/all.css', ui)) },
  { find: /^vue$/, replacement: fileURLToPath(new URL('node_modules/vue/dist/vue.runtime.esm-bundler.js', consumer)) },
] }, build: { outDir: fileURLToPath(new URL('dist/', out)), emptyOutDir: false } })
const directory = path.resolve(fileURLToPath(new URL('dist/', out))), mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2' }
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
    const context = await browser.newContext({ viewport: { width, height: 900 }, hasTouch: true, reducedMotion: 'reduce' })
    const page = await context.newPage(), errors = [], grip = page.locator('.sol-ui-time-scrub')
    page.on('pageerror', error => errors.push(error.message))
    await page.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort())
    await page.goto(origin, { waitUntil: 'networkidle' })
    const get = () => page.evaluate(() => window.qa.get())
    const down = async () => { const box = await grip.boundingBox(); await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await page.mouse.down(); return box.y + box.height / 2 }
    const open = async () => { await page.locator('#time').focus(); await page.keyboard.press('Alt+ArrowDown'); await page.getByRole('listbox').waitFor() }
    for (const theme of ['violet', 'sage', 'sand']) for (const mode of ['light', 'dark']) for (const density of ['comfortable', 'compact']) for (const locale of ['ko-KR', 'en-US']) {
      const config = { width, theme, mode, density, locale }
      await page.evaluate(state => window.qa.set(state), config); await page.evaluate(() => window.qa.reset())
      await page.locator('#time').evaluate(input => { input.focus(); input.setSelectionRange(1, 4) })
      const y = await down(), box = await grip.boundingBox()
      await page.mouse.move(box.x + box.width / 2, y - 10)
      await page.waitForFunction(() => window.qa.get().previews.at(-1)?.value === '09:37')
      let state = await get(); assert.equal(state.value, '09:22'); assert.equal(state.data, '09:22'); assert.equal(state.changes.length, 0)
      assert.equal(await grip.evaluate(element => element.hasPointerCapture(1)), true)
      await page.mouse.up(); state = await get(); assert.equal(state.value, '09:37'); assert.deepEqual(state.changes, ['09:37']); assert.equal(state.commits.length, 1)
      assert.equal(await grip.evaluate(element => element.hasPointerCapture(1)), false)
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false)
      assert.ok(box.width >= 40); assert.ok(box.height >= 40)
      records.push(config)
    }
    await page.locator('#time').evaluate(input => { input.focus(); input.setSelectionRange(1, 4) })
    let y = await down(), box = await grip.boundingBox(); await page.mouse.move(box.x + box.width / 2, y - 10)
    await page.keyboard.press('Escape'); await page.mouse.up()
    assert.equal((await get()).value, '09:37'); assert.equal((await get()).cancels.at(-1).reason, 'escape')
    assert.deepEqual(await page.locator('#time').evaluate(input => [input === document.activeElement, input.selectionStart, input.selectionEnd]), [true, 1, 4])
    await grip.focus(); await page.keyboard.down('ArrowUp'); await page.keyboard.down('ArrowUp'); assert.equal((await get()).value, '09:37')
    await page.keyboard.up('ArrowUp'); assert.equal((await get()).value, '10:07')
    await grip.focus();const beforeKeyboardCancel=await get();await page.keyboard.down('ArrowUp');await page.keyboard.press('Escape');await page.keyboard.up('ArrowUp');
    assert.equal((await get()).value,beforeKeyboardCancel.value,'Grip ArrowUp then Escape cancels without committing');assert.equal((await get()).commits.length,beforeKeyboardCancel.commits.length);assert.equal((await get()).cancels.at(-1).reason,'escape');
    await open()
    const list = page.getByRole('listbox'), listBox = await list.boundingBox()
    // Drag a dedicated row handle to the bottom edge and retain it while RAF scrolls.
    const handle = await page.locator('[data-time-value="10:07"] .sol-ui-time-list-grip').boundingBox()
    await page.mouse.move(handle.x + handle.width / 2, handle.y + handle.height / 2); await page.mouse.down()
    const before = await list.evaluate(element => element.scrollTop)
    await page.mouse.move(handle.x + handle.width / 2, listBox.y + listBox.height - 2)
    await page.waitForFunction(start => document.querySelector('[role=listbox]').scrollTop > start + 20, before)
    assert.equal((await get()).value, '10:07'); assert.equal((await get()).data, '10:07')
    await page.keyboard.press('Escape'); await page.mouse.up(); assert.equal((await get()).value, '10:07'); assert.equal((await get()).cancels.at(-1).source, 'list')
    assert.equal(await list.evaluate(element => { const active = document.getElementById(element.getAttribute('aria-activedescendant')).getBoundingClientRect(), viewport = element.getBoundingClientRect(); return active.top >= viewport.top && active.bottom <= viewport.bottom }), true, 'Cancellation restores a visible active option')
    assert.ok(await list.isVisible()); await page.keyboard.press('Escape')
    if (width === 320) {
      const cdp = await context.newCDPSession(page)
      const touch = (type, x, y) => cdp.send('Input.dispatchTouchEvent', {type,touchPoints:type==='touchEnd'||type==='touchCancel'?[]:[{x,y}]})
      box = await grip.boundingBox(); const x = box.x + box.width / 2; y = box.y + box.height / 2
      await touch('touchStart', x, y); await touch('touchMove', x, y - 20)
      await page.waitForFunction(() => window.qa.get().previews.at(-1)?.value === '10:37')
      assert.equal((await get()).value, '10:07'); await touch('touchCancel'); assert.equal((await get()).value, '10:07'); assert.equal((await get()).cancels.at(-1).reason, 'pointercancel')
      await touch('touchStart', x, y); await touch('touchMove', x, y - 10); await touch('touchEnd'); assert.equal((await get()).value, '10:22')
      await open(); const body = await list.boundingBox(), top = await list.evaluate(element => element.scrollTop)
      await touch('touchStart', body.x + 20, body.y + body.height - 50)
      await touch('touchMove', body.x + 20, body.y + body.height - 130); await touch('touchEnd')
      await page.waitForFunction(start => document.querySelector('[role=listbox]').scrollTop > start, top)
      assert.equal((await get()).value, '10:22', 'Normal list touch panning never starts a scrub'); await page.keyboard.press('Escape'); await cdp.detach()
    }
    await page.evaluate(() => scrollTo(0,0)); await open()
    await page.screenshot({ path: fileURLToPath(new URL(width + '.png', out)) }); await page.keyboard.press('Escape')
    await page.mouse.move(width - 10, 800); await page.mouse.wheel(0, 300); await page.waitForFunction(() => scrollY > 0)
    assert.deepEqual(errors, [])
    await context.close(); console.log('PASS: ' + width + 'px; capture/release, form-safe preview, key commit/Escape selection, list edge autoscroll/cancel, page scroll; 24 theme/mode/density/locale combinations')
  }
  await writeFile(new URL('report.json', out), JSON.stringify({browser:browser.version(),packageSource:fileURLToPath(ui),installed,combinations:records.length,records,limits:[installed ? 'Installed local development tarball; not a published release' : 'Built source dist; installed tarball pending','Touch is Chrome emulation; physical touch and screen reader unverified']}, null, 2))
} finally { await browser?.close(); await new Promise(resolve => server.close(resolve)) }
