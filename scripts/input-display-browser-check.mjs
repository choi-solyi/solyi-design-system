/* Isolated built-source QA; no shared browser/profile, registry publish or release replacement. */
import assert from 'node:assert/strict'
import http from 'node:http'
import path from 'node:path'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const root = new URL('../', import.meta.url), out = new URL('qa-output/input-display-browser/', root)
const consumer = new URL('examples/package-consumer/', root), ui = new URL('packages/vue-ui/', root)
const { chromium } = await import(new URL('.tooling/browser-qa/node_modules/playwright-core/index.mjs', root))
const { build } = await import(new URL('node_modules/vite/dist/node/index.js', consumer))
await mkdir(out, { recursive: true })
await writeFile(new URL('index.html', out), '<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Input display QA</title><div id="app"></div><script type="module" src="./entry.js"></script></html>')
await writeFile(new URL('entry.js', out), `
import {createApp,h,ref,nextTick} from 'vue'
import {SDatePicker,SNumberInput,createSolyiVuetify,applySolyiAppearance,provideSolLocale,formatSolDate} from 'solyi-ui'
import 'solyi-ui/all.css'
const locale=ref('ko-KR'),date=ref('2026-10-27'),range=ref({start:'2026-10-27',end:'2026-10-29'}),number=ref(5)
const options=ref({formatted:true,readonly:false,disabled:false,bad:false}),submitted=ref('')
let changes=0
const weekday=(iso,l)=>{if(options.value.bad)throw Error('consumer formatter');return iso+' ('+formatSolDate(iso,l,{year:undefined,month:undefined,day:undefined,weekday:'short'})+')'}
const numeric=(value,l)=>options.value.bad?'':new Intl.NumberFormat(l.code,{minimumFractionDigits:2}).format(value)
const vuetify=createSolyiVuetify(),app=createApp({render:()=>h('form',{id:'form',class:'sol-card',style:'margin:var(--sol-space-4);display:grid;gap:var(--sol-content-gap);max-inline-size:var(--sol-reading-max)',onSubmit:e=>{e.preventDefault();submitted.value=JSON.stringify(Object.fromEntries(new FormData(e.currentTarget)))}},[
 h('h1','ISO · Display · Presets'),
 h(SDatePicker,{id:'date',name:'date',label:'Date',modelValue:date.value,displayFormatter:options.value.formatted?weekday:undefined,readonly:options.value.readonly,disabled:options.value.disabled,'onUpdate:modelValue':v=>{date.value=v;changes++}}),
 h(SDatePicker,{id:'range',name:'range',label:'Range',mode:'range',modelValue:range.value,displayFormatter:options.value.formatted?weekday:undefined,readonly:options.value.readonly,disabled:options.value.disabled,'onUpdate:modelValue':v=>{range.value=v;changes++}}),
 h(SNumberInput,{id:'amount',name:'amount',label:'Quantity',modelValue:number.value,min:5,max:95,step:15,presets:[{value:5},{value:20,label:'Twenty'},{value:21,label:'Off step'}],formatValue:options.value.formatted?numeric:undefined,unit:locale.value==='en-US'?'minutes':'분',readonly:options.value.readonly,disabled:options.value.disabled,'onUpdate:modelValue':v=>{number.value=v;changes++}}),
 h('div',{class:'sol-actions'},[h('button',{id:'outside',type:'button',class:'sol-button'},'Outside'),h('button',{id:'submit',type:'submit',class:'sol-button'},'Submit')]),
 h('output',{id:'submitted',role:'status'},submitted.value),
])})
provideSolLocale(app,locale);app.use(vuetify).mount('#app')
window.qa={set:async config=>{locale.value=config.locale;document.documentElement.lang=config.locale;applySolyiAppearance(vuetify.theme,config);await nextTick()},options:async value=>{options.value={...options.value,...value};await nextTick()},get:()=>({date:date.value,number:number.value,changes}),data:()=>Object.fromEntries(new FormData(document.getElementById('form')))}
`)
await build({
  root: fileURLToPath(out), configFile: false, logLevel: 'error',
  resolve: { alias: [
    { find: /^solyi-ui$/, replacement: fileURLToPath(new URL('dist/index.js', ui)) },
    { find: /^solyi-ui\/all.css$/, replacement: fileURLToPath(new URL('dist/all.css', ui)) },
    { find: /^vue$/, replacement: fileURLToPath(new URL('node_modules/vue/dist/vue.runtime.esm-bundler.js', consumer)) },
  ] }, build: { outDir: fileURLToPath(new URL('dist/', out)), emptyOutDir: false },
})
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
  console.log('Built-source input QA · isolated Chrome ' + browser.version())
  for (const width of [320, 768, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 1100 }, hasTouch: width === 320, reducedMotion: 'reduce' })
    const page = await context.newPage(), errors = []
    page.on('pageerror', error => errors.push(error.message))
    await page.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort())
    await page.goto(origin, { waitUntil: 'networkidle' })
    for (const theme of ['violet', 'sage', 'sand']) for (const mode of ['light', 'dark']) for (const density of ['comfortable', 'compact']) for (const locale of ['ko-KR', 'en-US']) {
      const config = { theme, mode, density, locale }
      await page.evaluate(config => window.qa.set(config), config)
      const state = await page.evaluate(() => ({ overflow: document.documentElement.scrollWidth > innerWidth, date: document.getElementById('date').value, number: document.getElementById('amount').value, data: window.qa.data(), changes: window.qa.get().changes }))
      assert.equal(state.overflow, false, JSON.stringify({ width, config, state }))
      assert.equal(state.date, locale === 'en-US' ? '2026-10-27 (Tue)' : '2026-10-27 (화)')
      assert.equal(state.number, '5.00'); assert.equal(state.changes, 0)
      assert.deepEqual(state.data, { date: '2026-10-27', range: '2026-10-27 ~ 2026-10-29', amount: '5' })
      records.push({ width, ...config, ...state })
      if (theme === 'sand' && density === 'compact' && locale === 'en-US') await page.screenshot({ path: fileURLToPath(new URL(width + '-' + mode + '.png', out)), fullPage: true })
    }
    await page.locator('#date').focus(); assert.equal(await page.locator('#date').inputValue(), '2026-10-27')
    await page.locator('#date').fill('2026-10-30')
    await page.locator('#submit').click()
    assert.deepEqual(JSON.parse(await page.locator('#submitted').innerText()), { date: '2026-10-30', range: '2026-10-27 ~ 2026-10-29', amount: '5' }, 'Native submit never sends the weekday display')
    const numberWidth = await page.locator('#amount').evaluate(element => element.getBoundingClientRect().width)
    await page.getByRole('button', { name: 'Twenty', exact: true }).click()
    assert.equal(await page.locator('#amount').inputValue(), '20')
    assert.equal(await page.locator('#amount').evaluate(element => element.getBoundingClientRect().width), numberWidth)
    await page.locator('#outside').click()
    assert.equal(await page.locator('#amount').inputValue(), '20.00')
    assert.equal(await page.getByRole('button', { name: 'Off step', exact: true }).isDisabled(), true)
    await page.locator('#amount').fill('21'); await page.locator('#outside').click()
    assert.equal(await page.locator('#amount').getAttribute('aria-invalid'), 'true')
    assert.equal(await page.evaluate(() => window.qa.get().number), 20)
    await page.getByRole('button', { name: 'Twenty', exact: true }).click(); await page.locator('#outside').click()
    await page.evaluate(() => window.qa.options({ readonly: true }))
    await page.locator('#date').focus(); assert.equal(await page.locator('#date').inputValue(), '2026-10-30 (Fri)')
    await page.locator('#amount').focus(); assert.equal(await page.locator('#amount').inputValue(), '20.00')
    assert.equal(await page.getByRole('button', { name: 'Twenty', exact: true }).isDisabled(), true)
    await page.evaluate(() => window.qa.options({ disabled: true }))
    assert.deepEqual(await page.evaluate(() => window.qa.data()), {})
    await page.evaluate(() => window.qa.options({ readonly: false, disabled: false, bad: true }))
    await page.locator('#outside').click()
    assert.equal(await page.locator('#date').inputValue(), '2026-10-30')
    assert.equal(await page.locator('#amount').inputValue(), '20')
    await page.evaluate(() => window.qa.options({ formatted: false }))
    assert.equal(await page.locator('input[type=hidden]').count(), 0)
    assert.deepEqual(errors, [])
    await context.close()
    console.log('PASS: ' + width + 'px · 24 display/locale/theme cases, native editing/submission, presets/bounds, readonly/disabled and fallback')
  }
  await writeFile(new URL('report.json', out), JSON.stringify({ browser: browser.version(), combinations: records.length, source: 'current UI dist build, not a published tarball', records, limits: ['Headless Chrome only', 'No physical mobile or screen reader verification'] }, null, 2))
} finally { await browser?.close(); await new Promise(resolve => server.close(resolve)) }
