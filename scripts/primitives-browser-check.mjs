/* Optional isolated Chrome QA. Install playwright-core only in .tooling/browser-qa. */
import assert from 'node:assert/strict'
import http from 'node:http'
import path from 'node:path'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const root = new URL('../', import.meta.url)
const out = new URL('qa-output/primitives-browser/', root)
const consumer = new URL('examples/package-consumer/', root)
const { chromium } = await import(
  new URL('.tooling/browser-qa/node_modules/playwright-core/index.mjs', root)
)
const { build } = await import(new URL('node_modules/vite/dist/node/index.js', consumer))
await mkdir(out, { recursive: true })
await writeFile(
  new URL('index.html', out),
  '<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Display primitives QA</title><div id="app"></div><script type="module" src="./entry.js"></script></html>',
)
await writeFile(
  new URL('entry.js', out),
  `
import {createApp,h,ref,nextTick} from 'vue'
import {SChip,SBadge,SIcon,SIconBtn,createSolyiVuetify,applySolyiAppearance,provideSolLocale} from 'solyi-ui'
import 'solyi-ui/all.css'
const locale=ref('ko-KR'),selected=ref(false),busy=ref(false),removed=ref(false),message=ref(''),result=ref(null)
const vuetify=createSolyiVuetify()
const app=createApp({render:()=>h('main',{class:'sol-card',style:'margin:var(--sol-space-4);display:grid;gap:var(--sol-content-gap);max-inline-size:var(--sol-reading-max)'},[
 h('h1','Chip · Badge · Icon'),
 h('div',{class:'sol-actions'},[
  h(SChip,{id:'plain',label:'Design · 디자인'}),
  h(SChip,{id:'select',label:'Review · 검토',selectable:true,selected:selected.value,'onUpdate:selected':v=>selected.value=v}),
  removed.value?null:h(SChip,{id:'remove',label:'긴 항목 이름 · A very long reusable label without horizontal overflow',removable:true,onRemove:async()=>{removed.value=true;await nextTick();result.value.focus()}}),
  h(SChip,{id:'disabled-chip',label:'Unavailable',selectable:true,removable:true,disabled:true}),
 ]),
 h('div',{class:'sol-actions'},['neutral','accent','info','success','warning','danger'].map(tone=>h(SBadge,{tone,variant:'filled',content:tone==='success'?'✓ Complete':tone==='danger'?'! Error':tone}))),
 h('div',{class:'sol-actions'},[
  h(SBadge,{content:3,label:'Three notifications'},{anchor:({descriptionId})=>h(SIconBtn,{icon:'info',label:'Notifications','aria-describedby':descriptionId})}),
  h(SIcon,{id:'named-icon',name:'info',label:'Information'}),h(SIcon,{name:'chevron',size:16,rotate:270}),
  h(SIconBtn,{id:'copy',icon:'copy',label:'Copy',loading:busy.value,onClick:()=>message.value='Copied'}),
  h(SIconBtn,{id:'disabled-icon',icon:'trash',label:'Delete',tone:'danger',disabled:true}),
 ]),
 h('p',{id:'result',ref:result,role:'status',tabindex:-1},removed.value?'Removed':message.value),
])})
provideSolLocale(app,locale);app.use(vuetify).mount('#app')
window.qa={set:async config=>{locale.value=config.locale;document.documentElement.lang=config.locale;applySolyiAppearance(vuetify.theme,config);await nextTick()},busy:async value=>{busy.value=value;await nextTick()}}
`,
)
const packageRoot = new URL('node_modules/solyi-ui/', consumer)
await build({
  root: fileURLToPath(out),
  configFile: false,
  logLevel: 'error',
  resolve: {
    alias: [
      { find: /^solyi-ui$/, replacement: fileURLToPath(new URL('dist/index.js', packageRoot)) },
      {
        find: /^solyi-ui\/all.css$/,
        replacement: fileURLToPath(new URL('dist/all.css', packageRoot)),
      },
      {
        find: /^vue$/,
        replacement: fileURLToPath(
          new URL('node_modules/vue/dist/vue.runtime.esm-bundler.js', consumer),
        ),
      },
    ],
  },
  build: { outDir: fileURLToPath(new URL('dist/', out)), emptyOutDir: false },
})
const directory = path.resolve(fileURLToPath(new URL('dist/', out)))
const mime = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.woff2': 'font/woff2',
}
const server = http.createServer(async (request, response) => {
  try {
    let pathname = decodeURIComponent(new URL(request.url, 'http://local').pathname)
    if (pathname.endsWith('/')) pathname += 'index.html'
    const filename = path.resolve(directory, '.' + pathname)
    if (!filename.startsWith(directory + path.sep)) {
      response.writeHead(403).end()
      return
    }
    response
      .writeHead(200, {
        'Content-Type': mime[path.extname(filename)] || 'application/octet-stream',
      })
      .end(await readFile(filename))
  } catch {
    response.writeHead(404).end()
  }
})
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
const origin = 'http://127.0.0.1:' + server.address().port
let browser
const records = []
try {
  browser = await chromium.launch({
    executablePath:
      process.env.SOLYI_QA_CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: true,
    chromiumSandbox: true,
  })
  console.log(
    'Isolated headless Chrome ' + browser.version() + '; no shared profile or debug connection.',
  )
  for (const width of [320, 768, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 1000 },
      hasTouch: width === 320,
      reducedMotion: 'reduce',
    })
    const page = await context.newPage(),
      errors = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.route('**/*', (route) =>
      new URL(route.request().url()).origin === origin ? route.continue() : route.abort(),
    )
    await page.goto(origin, { waitUntil: 'networkidle' })
    for (const theme of ['violet', 'sage', 'sand'])
      for (const mode of ['light', 'dark'])
        for (const density of ['comfortable', 'compact'])
          for (const locale of ['ko-KR', 'en-US']) {
            const config = { theme, mode, density, locale }
            await page.evaluate((config) => window.qa.set(config), config)
            const state = await page.evaluate(() => {
              const button = document.getElementById('copy'),
                svg = button.querySelector('svg'),
                rect = button.getBoundingClientRect(),
                icon = svg.getBoundingClientRect()
              return {
                overflow: document.documentElement.scrollWidth > innerWidth,
                width: rect.width,
                height: rect.height,
                iconWidth: icon.width,
                label: button.getAttribute('aria-label'),
                remove: document.querySelector('.sol-ui-chip-remove').getAttribute('aria-label'),
              }
            })
            assert.equal(state.overflow, false, JSON.stringify({ width, config, state }))
            assert.equal(state.width, state.height, 'Icon target is square')
            assert.ok(state.width >= (width === 320 ? 44 : 36))
            assert.equal(state.iconWidth, 20)
            assert.equal(state.label, 'Copy')
            assert.match(state.remove, locale === 'en-US' ? /^Remove / : /제거$/)
            records.push({ width, ...config, ...state })
            if (theme === 'sand' && density === 'compact' && locale === 'en-US')
              await page.screenshot({
                path: fileURLToPath(new URL(width + '-' + mode + '.png', out)),
                fullPage: true,
              })
          }
    await page.locator('#select').focus()
    await page.keyboard.press('Space')
    assert.equal(await page.locator('#select').getAttribute('aria-pressed'), 'true')
    await page.keyboard.press('Enter')
    assert.equal(await page.locator('#select').getAttribute('aria-pressed'), 'false')
    assert.notEqual(
      await page.locator('#select').evaluate((element) => getComputedStyle(element).outlineStyle),
      'none',
    )
    await page.locator('#copy').focus()
    await page.keyboard.press('Enter')
    assert.equal(await page.locator('#result').innerText(), 'Copied')
    await page.evaluate(() => window.qa.busy(true))
    assert.equal(
      await page.locator('#copy').evaluate((element) => element === document.activeElement),
      true,
    )
    assert.equal(await page.locator('#copy').getAttribute('aria-busy'), 'true')
    await page.evaluate(() => window.qa.busy(false))
    if (width === 320) await page.locator('#select').tap()
    await page.locator('#remove .sol-ui-chip-remove').focus()
    await page.keyboard.press('Space')
    await page.waitForFunction(() => document.activeElement.id === 'result')
    assert.equal(await page.locator('#remove').count(), 0)
    assert.deepEqual(errors, [])
    await context.close()
    console.log(
      'PASS: ' +
        width +
        'px, 24 theme/mode/density/locale cases and native keyboard/focus' +
        (width === 320 ? '/touch emulation' : ''),
    )
  }
  await writeFile(
    new URL('report.json', out),
    JSON.stringify(
      {
        browser: browser.version(),
        combinations: records.length,
        records,
        limits: [
          'Headless Chrome only',
          'Touch emulation is not physical mobile or screen reader certification',
        ],
      },
      null,
      2,
    ),
  )
} finally {
  await browser?.close()
  await new Promise((resolve) => server.close(resolve))
}
