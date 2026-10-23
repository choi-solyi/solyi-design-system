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
const work = process.argv[2] || (await mkdtemp(path.join(tmpdir(), 'solyi-pane-touch-')))
await mkdir(work, { recursive: true })
const dom = new JSDOM('<html><body><div id="app"></div></body></html>', {
  url: 'https://split-pane.invalid/',
  pretendToBeVisual: true,
})
const w = dom.window
for (const name of [
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
  'MouseEvent',
  'getComputedStyle',
  'AbortController',
  'AbortSignal',
]) {
  Object.defineProperty(globalThis, name, {
    value: name === 'window' ? w : name === 'document' ? w.document : w[name],
    configurable: true,
  })
}
let scheduledFrames = 0
let cancelledFrames = 0
globalThis.requestAnimationFrame = callback => {
  scheduledFrames++
  return w.requestAnimationFrame(callback)
}
globalThis.cancelAnimationFrame = id => {
  cancelledFrames++
  w.cancelAnimationFrame(id)
}
w.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} })
globalThis.matchMedia = w.matchMedia
globalThis.CSS = { supports: () => false, escape: String }
w.CSS = globalThis.CSS
let resize
globalThis.ResizeObserver = class {
  constructor(callback) {
    resize = callback
  }
  observe() {}
  disconnect() {}
}
const entry = path.join(work, 'entry.ts')
await writeFile(
  entry,
  `export {createApp,h,ref,nextTick} from 'vue'\nexport {SResizableSplitPane} from ${JSON.stringify(path.join(ui, 'src/split-pane.ts').replaceAll('\\', '/'))}\n`,
)
const { build } = await import(pathToFileURL(require.resolve('vite')))
const bundle = await build({
  root: ui,
  configFile: false,
  logLevel: 'error',
  ssr: { noExternal: true },
  build: { ssr: entry, write: false, minify: false, rolldownOptions: { external: ['vue'] } },
})
const vue = pathToFileURL(path.join(ui, 'node_modules/vue/dist/vue.runtime.esm-bundler.js'))
const runtime = path.join(work, 'runtime.mjs')
await writeFile(
  runtime,
  bundle.output
    .find(item => item.type === 'chunk')
    .code.replace(/from ['"]vue['"]/g, 'from ' + JSON.stringify(vue.href)),
)
const { createApp, h, ref, nextTick, SResizableSplitPane } = await import(pathToFileURL(runtime))
const tick = async () => {
  await nextTick()
  await nextTick()
}
const ratio = ref(50),
  readonly = ref(false),
  disabled = ref(false)
const orientation = ref('horizontal'),
  min = ref(20),
  max = ref(80),
  step = ref(5)
const updates = [],
  changes = [],
  reflows = []
const app = createApp({
  setup: () => () =>
    h(
      SResizableSplitPane,
      {
        id: 'pane',
        label: 'Pane',
        primaryLabel: 'Primary',
        secondaryLabel: 'Secondary',
        modelValue: ratio.value,
        readonly: readonly.value,
        disabled: disabled.value,
        orientation: orientation.value,
        min: min.value,
        max: max.value,
        step: step.value,
        'onUpdate:modelValue': value => {
          ratio.value = value
          updates.push(value)
        },
        onChange: value => changes.push(value),
        onReflow: value => reflows.push(value),
      },
      {
        primary: () => h('input', { id: 'primary-input', value: 'Kept' }),
        secondary: () => h('input', { id: 'secondary-input', value: 'Retained' }),
      },
    ),
})
app.mount('#app')
await tick()
const host = w.document.querySelector('#pane')
const layout = host.querySelector('.sol-ui-pane-layout')
const bar = host.querySelector('[role=separator]')
let width = 800
host.getBoundingClientRect = () => ({ width })
layout.getBoundingClientRect = () => ({ width: 824, height: 324 })
bar.getBoundingClientRect = () =>
  width < 560 || orientation.value === 'vertical'
    ? { width: 333, height: 24 }
    : { width: 24, height: 324 }
let captured = null,
  releases = 0,
  captureFails = false
bar.setPointerCapture = id => {
  if (captureFails) throw Error('Unavailable')
  captured = id
}
bar.releasePointerCapture = id => {
  assert.equal(id, captured ?? id)
  captured = null
  releases++
}
const pointer = (target, type, x, y = 0, id = 1, extra = {}) => {
  const event = new w.MouseEvent(type, {
    clientX: x,
    clientY: y,
    button: 0,
    bubbles: true,
    cancelable: true,
    ...extra,
  })
  Object.defineProperty(event, 'pointerId', { value: id })
  target.dispatchEvent(event)
}
const key = (name, extra = {}) =>
  bar.dispatchEvent(
    new w.KeyboardEvent('keydown', { key: name, bubbles: true, cancelable: true, ...extra }),
  )
key('ArrowRight')
await tick()
assert.equal(ratio.value, 55)
key('End')
await tick()
assert.equal(ratio.value, 80)
key('Enter')
await tick()
assert.equal(ratio.value, 20)
key('Enter')
await tick()
assert.equal(ratio.value, 80)
ratio.value = 50
await tick()
let before = updates.length,
  complete = changes.length
pointer(bar, 'pointerdown', 400)
pointer(bar, 'pointermove', 480)
await tick()
assert.equal(ratio.value, 60)
assert.equal(updates.length, before + 1, 'Bubbled handle move emits one update')
pointer(w, 'pointerup', 480)
assert.equal(changes.length, complete + 1)
assert.equal(captured, null)
bar.focus()
width = 333
const scheduledBefore = scheduledFrames
resize()
resize()
resize()
assert.equal(scheduledFrames, scheduledBefore + 1, 'Observer notifications coalesce into one frame')
assert.deepEqual(reflows, [], 'Observer callback defers layout changes until the next frame')
await new Promise(resolve => w.requestAnimationFrame(resolve))
await tick()
assert.deepEqual(reflows, [true])
assert.equal(bar.getAttribute('aria-orientation'), 'horizontal')
assert.equal(w.document.activeElement, bar)
assert.equal(w.document.querySelector('#primary-input').value, 'Kept')
key('ArrowDown')
await tick()
assert.equal(ratio.value, 65)
key('ArrowRight')
await tick()
assert.equal(ratio.value, 65)
key('Home')
await tick()
assert.equal(ratio.value, 20)
key('ArrowDown', { shiftKey: true })
await tick()
assert.equal(ratio.value, 70)
ratio.value = 50
await tick()
pointer(bar, 'pointerdown', 150, 150)
pointer(w, 'pointermove', 150, 180, 2)
await tick()
assert.equal(ratio.value, 50)
pointer(w, 'pointermove', 150, 180)
await tick()
assert.equal(ratio.value, 60)
complete = changes.length
pointer(w, 'pointercancel', 150, 180)
pointer(w, 'pointermove', 150, 250)
pointer(w, 'pointerup', 150, 250)
await tick()
assert.equal(ratio.value, 60)
assert.equal(changes.length, complete)
assert.equal(captured, null)
pointer(bar, 'pointerdown', 150, 180)
pointer(w, 'pointermove', 150, 195)
await tick()
assert.equal(ratio.value, 65)
pointer(bar, 'lostpointercapture', 150, 195)
pointer(w, 'pointerup', 150, 195)
assert.equal(changes.length, complete)
assert.equal(captured, null)
captureFails = true
pointer(bar, 'pointerdown', 150, 195)
pointer(w, 'pointermove', 150, 1000)
await tick()
assert.equal(ratio.value, 80)
pointer(w, 'pointerup', 150, 1000)
assert.equal(changes.length, complete + 1)
captureFails = false
pointer(bar, 'pointerdown', 150, 200)
width = 800
resize()
await new Promise(resolve => w.requestAnimationFrame(resolve))
await tick()
assert.equal(captured, null)
assert.equal(bar.getAttribute('aria-orientation'), 'vertical')
pointer(w, 'pointermove', -1000, 200)
pointer(w, 'pointerup', -1000, 200)
assert.equal(ratio.value, 80)
orientation.value = 'vertical'
await tick()
pointer(bar, 'pointerdown', 150, 200)
pointer(w, 'pointermove', 150, -1000)
await tick()
assert.equal(ratio.value, 20)
pointer(w, 'pointerup', 150, -1000)
for (const state of [readonly, disabled]) {
  state.value = true
  await tick()
  complete = changes.length
  key('End')
  pointer(bar, 'pointerdown', 150, 100)
  pointer(w, 'pointermove', 150, 250)
  pointer(w, 'pointerup', 150, 250)
  await tick()
  assert.equal(ratio.value, 20)
  assert.equal(changes.length, complete)
  state.value = false
  await tick()
}
pointer(bar, 'pointerdown', 150, 100)
readonly.value = true
await tick()
assert.equal(captured, null)
readonly.value = false
min.value = 0
max.value = 100
step.value = 5
width = 333
resize()
await new Promise(resolve => w.requestAnimationFrame(resolve))
await tick()
w.document.querySelector('#primary-input').focus()
ratio.value = 0
await tick()
assert.equal(w.document.activeElement, bar)
assert.ok(w.document.querySelector('#pane-primary').hasAttribute('inert'))
ratio.value = 50
await tick()
w.document.querySelector('#secondary-input').focus()
ratio.value = 100
await tick()
assert.equal(w.document.activeElement, bar)
assert.ok(w.document.querySelector('#pane-secondary').hasAttribute('inert'))
min.value = 25
max.value = 74
step.value = 10
await tick()
key('End')
await tick()
assert.equal(ratio.value, 65)
pointer(bar, 'pointerdown', 150, 150)
complete = changes.length
const releasedBefore = releases
const cancelledBefore = cancelledFrames
const reflowsBefore = reflows.length
width = 800
resize()
app.unmount()
assert.equal(captured, null)
assert.equal(releases, releasedBefore + 1)
assert.equal(cancelledFrames, cancelledBefore + 1, 'Unmount cancels the pending measurement')
resize()
await new Promise(resolve => w.requestAnimationFrame(resolve))
assert.equal(reflows.length, reflowsBefore, 'No measurement is scheduled after unmount')
pointer(w, 'pointermove', 150, 300)
pointer(w, 'pointerup', 150, 300)
assert.equal(changes.length, complete)
await writeFile(
  path.join(work, 'results.json'),
  JSON.stringify(
    {
      passed: true,
      updates,
      changes,
      reflows,
      releases,
      coverage:
        'responsive axis, keyboard/bounds/step, touch-like pointer, single update, capture fallback/cancel/loss/reflow/readonly/unmount, inert/focus',
    },
    null,
    2,
  ),
)
dom.window.close()
console.log(
  'PASS: split pane responsive resize, keyboard/bounds, pointer capture fallback/cancel/cleanup and collapsed focus. Synthetic DOM; physical mobile browsers are not certified.',
)
