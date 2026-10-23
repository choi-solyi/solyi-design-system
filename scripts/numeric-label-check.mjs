import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { JSDOM } from 'jsdom'

const root = fileURLToPath(new URL('../', import.meta.url))
const ui = path.join(root, 'packages/vue-ui')
const require = createRequire(path.join(ui, 'package.json'))
const work = process.argv[2] || (await mkdtemp(path.join(tmpdir(), 'solyi-numeric-label-')))
await mkdir(work, { recursive: true })
const dom = new JSDOM('<html><body><div id="app"></div></body></html>', {
  url: 'https://numeric-label.invalid/',
  pretendToBeVisual: true,
})
const window = dom.window
for (const key of [
  'window',
  'document',
  'Element',
  'Node',
  'HTMLElement',
  'HTMLInputElement',
  'SVGElement',
  'ShadowRoot',
  'Document',
  'MutationObserver',
  'Event',
  'KeyboardEvent',
  'getComputedStyle',
  'AbortController',
  'AbortSignal',
]) {
  Object.defineProperty(globalThis, key, {
    value: key === 'window' ? window : key === 'document' ? window.document : window[key],
    configurable: true,
  })
}
globalThis.requestAnimationFrame = window.requestAnimationFrame.bind(window)
globalThis.cancelAnimationFrame = window.cancelAnimationFrame.bind(window)
window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} })
globalThis.matchMedia = window.matchMedia
globalThis.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.CSS = { supports: () => false, escape: String }
window.CSS = globalThis.CSS
window.HTMLDialogElement.prototype.showModal = function () {
  this.open = true
}
window.HTMLDialogElement.prototype.close = function () {
  this.open = false
}

const entry = path.join(work, 'entry.ts')
const source = path.join(ui, 'src/index.ts').replaceAll('\\', '/')
await writeFile(
  entry,
  ["export {createApp,h,ref,nextTick} from 'vue'", `export * from ${JSON.stringify(source)}`].join(
    '\n',
  ),
)
const { build } = await import(pathToFileURL(require.resolve('vite')))
const bundle = await build({
  root: ui,
  configFile: false,
  logLevel: 'error',
  ssr: { noExternal: true },
  build: {
    ssr: entry,
    write: false,
    minify: false,
    rolldownOptions: { external: ['vue'] },
  },
})
const vue = pathToFileURL(path.join(ui, 'node_modules/vue/dist/vue.runtime.esm-bundler.js'))
const code = bundle.output
  .find(item => item.type === 'chunk')
  .code.replace(/from ['"]vue['"]/g, 'from ' + JSON.stringify(vue.href))
const module = path.join(work, 'runtime.mjs')
await writeFile(module, code)
const api = await import(pathToFileURL(module))
const tick = async () => {
  await api.nextTick()
  await api.nextTick()
}
const token = (label, number) => {
  const escaped = number.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(`(?:^|[^\\p{L}\\p{N}])${escaped}(?=$|[^\\p{L}\\p{N}])`, 'u').test(label)
}
const configurations = [
  { id: 'ko', code: 'ko-KR' },
  { id: 'en', code: 'en-US' },
  { id: 'ko-override', code: 'ko-KR', pageLabel: (page, count) => `${page}쪽, 모두 ${count}쪽` },
  { id: 'en-override', code: 'en-US', pageLabel: (page, count) => `Result${page}of${count}` },
]
const results = []
for (const config of configurations) {
  for (const mode of ['single', 'range']) {
    const value = api.ref(
      mode === 'single' ? '2026-10-23' : { start: '2026-10-23', end: '2026-10-25' },
    )
    const app = api.createApp({
      setup: () => () =>
        api.h('main', [
          api.h(api.SDataTable, {
            columns: [{ key: 'name', label: 'Name' }],
            rows: [{ id: 'one', name: 'Example' }],
            caption: 'Records',
            page: 1,
            pageCount: 2,
          }),
          api.h(api.SDatePicker, {
            id: 'date',
            label: 'Date',
            mode,
            modelValue: value.value,
            'onUpdate:modelValue': next => {
              value.value = next
            },
          }),
        ]),
    })
    const errors = []
    app.config.errorHandler = error => errors.push(String(error))
    api.provideSolLocale(app, config)
    app.use(api.createSolyiVuetify()).mount('#app')
    await tick()
    window.document.querySelector('.sol-date-open').click()
    await tick()
    const capture = async state => {
      const pageButtons = [...window.document.querySelectorAll('.sol-page-button')]
      const days = [...window.document.querySelectorAll('[data-calendar-day]')]
      assert.equal(pageButtons.length, 2)
      assert.equal(days.length, 42)
      for (const button of [...pageButtons, ...days]) {
        assert.ok(token(button.getAttribute('aria-label'), button.textContent.trim()))
      }
      for (const button of days) {
        const [year, month] = button.dataset.calendarDay.split('-').map(Number)
        const date = new Date(`${button.dataset.calendarDay}T00:00:00Z`)
        const label = button.getAttribute('aria-label')
        const name = new Intl.DateTimeFormat(config.code, {
          month: 'long',
          weekday: 'long',
          timeZone: 'UTC',
        }).formatToParts(date)
        assert.ok(label.includes(String(year)))
        assert.ok(
          name
            .filter(part => ['month', 'weekday'].includes(part.type))
            .every(part => label.includes(part.value)),
          `${year}-${month}: complete date context`,
        )
      }
      const id = `${config.id}-${mode}-${state}`
      window.document.documentElement.lang = config.code
      await writeFile(path.join(work, `${id}.html`), dom.serialize())
      results.push({
        id,
        pageButtons: pageButtons.length,
        calendarDays: days.length,
        pages: pageButtons.map(button => ({
          visible: button.textContent.trim(),
          label: button.getAttribute('aria-label'),
        })),
        sampleDay: days
          .find(button => button.dataset.calendarDay === '2026-10-23')
          .getAttribute('aria-label'),
      })
    }
    await capture('open')
    if (mode === 'range') {
      window.document.querySelector('[data-calendar-day="2026-10-23"]').click()
      await tick()
      await capture('partial')
    }
    assert.deepEqual(errors, [], 'Component setup/mount has no runtime errors')
    app.unmount()
    await tick()
  }
}
assert.equal(
  api.resolveSolLocale('ko-KR', { pageLabel: () => 'Page 1 of 2' }).pageLabel(1, 2),
  'Page 1 of 2',
)
assert.ok(token(api.resolveSolLocale({ pageLabel: () => '1000쪽' }).pageLabel(1000, 2000), '1,000'))
assert.equal(
  api
    .resolveSolLocale({ code: 'ko-KR', pageLabel: () => 'wrong' }, { code: 'en-US' })
    .pageLabel(1, 2),
  'Page 1 of 2',
)
await writeFile(path.join(work, 'numeric-label-results.json'), JSON.stringify(results, null, 2))
dom.window.close()
console.log('PASS: numeric tokens and full calendar context', {
  states: results.length,
  pageButtons: results.reduce((count, item) => count + item.pageButtons, 0),
  calendarDays: results.reduce((count, item) => count + item.calendarDays, 0),
  output: work,
})
