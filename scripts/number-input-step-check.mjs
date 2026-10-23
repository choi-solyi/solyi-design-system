import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { mkdtemp, readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { JSDOM } from 'jsdom'

const root = fileURLToPath(new URL('../', import.meta.url))
const ui = path.join(root, 'packages/vue-ui')
const require = createRequire(path.join(ui, 'package.json'))
const ts = require('typescript')
const helper = await readFile(path.join(ui, 'src/number-step.ts'), 'utf8')
const compiled = ts.transpileModule(helper, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
}).outputText
const helperUrl = 'data:text/javascript;base64,' + Buffer.from(compiled).toString('base64')
const { addNumberStep, isNumberStepAligned } = await import(helperUrl)

const additions = [
  [0.1, 0.2, 0.3],
  [0.3, -0.1, 0.2],
  [-0.1, 0.1, 0],
  [-0.1, -0.1, -0.2],
  [1e-11, 1e-11, 2e-11],
  [1e-11, -1e-11, 0],
  [-1e-11, -1e-11, -2e-11],
  [1e-10, 1e-10, 2e-10],
  [1, 1e-11, 1.00000000001],
  [1.00000000001, 1e-11, 1.00000000002],
  [1e-100, 1e-100, 2e-100],
  [Number.MIN_VALUE, Number.MIN_VALUE, 1e-323],
  [Number.MAX_VALUE, -Number.MAX_VALUE, 0],
  [Number.MAX_VALUE, Number.MAX_VALUE, null],
  [-Number.MAX_VALUE, -Number.MAX_VALUE, null],
  [1, Number.MIN_VALUE, null],
  [Number.MAX_SAFE_INTEGER, 2, null],
  [1.0000000000000002, 3e-16, null],
  [1.0000000000000002, 2e-16, 1.0000000000000004],
  [1, 0, null],
  [Infinity, 1, null],
  [1, NaN, null],
]
for (const [value, step, expected] of additions) {
  assert.equal(addNumberStep(value, step), expected, `${value} + ${step}`)
}
const alignments = [
  [0.3, 0, 0.1, true],
  [0.1 + 0.2, 0, 0.1, true],
  [-0.3, 0, 0.1, true],
  [0.35, 0, 0.1, false],
  [1.00000000002, 1, 1e-11, true],
  [1.000000000025, 1, 1e-11, false],
  [2e-11, -1e-11, 1e-11, true],
  [1e-323, 0, Number.MIN_VALUE, true],
  [1, 0, 0, false],
  [1, 0, -1, false],
  [1, 0, Infinity, false],
]
for (const [value, origin, step, expected] of alignments) {
  assert.equal(isNumberStepAligned(value, origin, step), expected)
}

const dom = new JSDOM('<html><body><div id="app"></div></body></html>', {
  url: 'https://number-step.invalid/',
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

const work = await mkdtemp(path.join(tmpdir(), 'solyi-number-step-'))
const sourcePath = (name) => path.join(ui, 'src', name).replaceAll('\\', '/')
const entry = path.join(work, 'entry.ts')
await writeFile(
  entry,
  [
    "export {createApp,h,reactive,ref,nextTick} from 'vue'",
    `export {SNumberInput} from ${JSON.stringify(sourcePath('controls.ts'))}`,
    `export {createSolyiVuetify} from ${JSON.stringify(sourcePath('vuetify.ts'))}`,
    `export {enLocale,formatSolNumber} from ${JSON.stringify(sourcePath('locale.ts'))}`,
  ].join('\n'),
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
  .find((item) => item.type === 'chunk')
  .code.replace(/from ['"]vue['"]/g, 'from ' + JSON.stringify(vue.href))
const module = path.join(work, 'runtime.mjs')
await writeFile(module, code)
const api = await import(pathToFileURL(module))
const tick = async () => {
  await api.nextTick()
  await api.nextTick()
}
let transitions = 0
const trace = []

async function check(config, run) {
  const state = api.reactive({ readonly: false, disabled: false, ...config })
  const handle = api.ref(null)
  const changes = []
  const app = api.createApp({
    setup: () => () =>
      api.h(api.SNumberInput, {
        id: 'number',
        label: 'Number',
        ref: handle,
        locale: api.enLocale,
        modelValue: state.value,
        min: state.min,
        max: state.max,
        step: state.step,
        readonly: state.readonly,
        disabled: state.disabled,
        'onUpdate:modelValue': (value) => {
          state.value = value
          changes.push(value)
        },
      }),
  })
  app.use(api.createSolyiVuetify()).mount('#app')
  await tick()
  const input = () => window.document.querySelector('#number')
  const buttons = () => [...window.document.querySelectorAll('button')]
  async function move(action, expected) {
    const before = state.value
    if (action === 'plus' || action === 'minus') {
      buttons()[action === 'plus' ? 1 : 0].click()
    } else {
      input().dispatchEvent(
        new window.KeyboardEvent('keydown', {
          key: action,
          bubbles: true,
          cancelable: true,
        }),
      )
    }
    await tick()
    assert.equal(state.value, expected, `${config.step}: ${action}`)
    assert.equal(input().value, api.formatSolNumber(expected, api.enLocale))
    assert.equal(window.document.querySelector('#number-error'), null)
    trace.push({
      step: state.step,
      min: state.min,
      max: state.max,
      readonly: state.readonly,
      disabled: state.disabled,
      action,
      before,
      actual: state.value,
      expected,
    })
    transitions++
  }
  try {
    await run({ state, handle, changes, input, buttons, move })
  } finally {
    app.unmount()
    await tick()
  }
}

for (const [step, twice, limit] of [
  [1e-11, 2e-11, 3e-11],
  [1e-10, 2e-10, 3e-10],
]) {
  await check({ value: step, step, min: -limit, max: limit }, async ({ move, handle }) => {
    await move('ArrowUp', twice)
    await move('plus', limit)
    await move('ArrowUp', limit)
    await move('minus', twice)
    await move('ArrowDown', step)
    await move('ArrowDown', 0)
    await move('ArrowDown', -step)
    await move('minus', -twice)
    await move('ArrowDown', -limit)
    await move('ArrowDown', -limit)
    assert.equal(handle.value.validate(), true)
  })
}
await check({ value: 0.1, step: 0.1, min: -0.3, max: 0.3 }, async ({ move, state }) => {
  await move('plus', 0.2)
  await move('ArrowUp', 0.3)
  await move('ArrowUp', 0.3)
  state.value = -0.2
  await tick()
  await move('ArrowDown', -0.3)
  await move('minus', -0.3)
  await move('ArrowUp', -0.2)
})
await check({ value: 1, step: 1e-11, min: 1, max: 1.00000000003 }, async ({ move }) => {
  await move('ArrowUp', 1.00000000001)
  await move('ArrowUp', 1.00000000002)
  await move('plus', 1.00000000003)
  await move('ArrowUp', 1.00000000003)
  await move('ArrowDown', 1.00000000002)
})
await check({ value: 1e-11, step: 1e-11, min: 0, max: 1 }, async (context) => {
  for (const prop of ['readonly', 'disabled']) {
    context.state[prop] = true
    await tick()
    assert.ok(context.buttons().every((button) => button.disabled))
    await context.move('ArrowUp', 1e-11)
    await context.move('ArrowDown', 1e-11)
    await context.move('plus', 1e-11)
    await context.move('minus', 1e-11)
    assert.deepEqual(context.changes, [])
    context.state[prop] = false
    await tick()
  }
})
dom.window.close()
const result = {
  additions: additions.length,
  alignments: alignments.length,
  componentTransitions: transitions,
  source: 'packages/vue-ui/src/controls.ts',
  output: work,
  trace,
}
await writeFile(path.join(work, 'results.json'), JSON.stringify(result, null, 2))
console.log('PASS: decimal steps, signed bounds, offset alignment, readonly/disabled', {
  ...result,
  trace: `${trace.length} recorded transitions`,
})
