import assert from 'node:assert/strict'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { JSDOM, VirtualConsole } from 'jsdom'

const root = new URL('../', import.meta.url)
const consumer = new URL('examples/package-consumer/', root)
const temporary = await mkdtemp(path.join(os.tmpdir(), 'solyi-component-feedback-'))
const virtualConsole = new VirtualConsole()
const errors = []
virtualConsole.on('jsdomError', (error) => errors.push(error.message))
const dom = new JSDOM('<html><body><div id="app"></div></body></html>', {
  url: 'https://example.test/',
  pretendToBeVisual: true,
  virtualConsole,
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
  'MouseEvent',
  'KeyboardEvent',
  'FocusEvent',
  'AbortController',
  'getComputedStyle',
]) {
  Object.defineProperty(globalThis, key, {
    value: key === 'window' ? window : key === 'document' ? window.document : window[key],
    configurable: true,
  })
}
globalThis.visualViewport = undefined
globalThis.requestAnimationFrame = window.requestAnimationFrame.bind(window)
globalThis.cancelAnimationFrame = window.cancelAnimationFrame.bind(window)
globalThis.innerWidth = 1180
globalThis.innerHeight = 900
window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} })
globalThis.matchMedia = window.matchMedia
globalThis.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = globalThis.ResizeObserver
globalThis.CSS = { supports: () => false, escape: (value) => String(value).replace(/[^\w-]/g, '') }
window.CSS = globalThis.CSS

let app
try {
  const entry = path.join(temporary, 'entry.ts')
  await writeFile(
    entry,
    [
      "export {createApp,h,ref,nextTick} from 'vue'",
      `export * from ${JSON.stringify(fileURLToPath(new URL('packages/vue-ui/src/index.ts', root)))}`,
    ].join('\n'),
  )
  const require = createRequire(new URL('package.json', consumer))
  const vueModule = pathToFileURL(require.resolve('vue')).href
  const { build } = await import(new URL('node_modules/vite/dist/node/index.js', consumer))
  const built = await build({
    root: fileURLToPath(consumer),
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
  const bundle = path.join(temporary, 'check.mjs')
  const code = built.output.find((output) => output.type === 'chunk').code
  await writeFile(bundle, code.replace(/from ['"]vue['"]/g, 'from ' + JSON.stringify(vueModule)))
  const { createApp, h, ref, nextTick, createSolyiVuetify, SBtn, SForm, SFileInput } = await import(
    pathToFileURL(bundle).href
  )
  const busy = ref(false)
  const disabled = ref(false)
  const ariaDisabled = ref(false)
  const tabIndex = ref(undefined)
  const fileDisabled = ref(false)
  const fileReadonly = ref(false)
  const formDisabled = ref(false)
  const formReadonly = ref(false)
  const droppable = ref(true)
  const files = ref([])
  const rejections = []
  let clicks = 0
  app = createApp({
    setup() {
      return () =>
        h('main', [
          h(
            SBtn,
            {
              id: 'action',
              loading: busy.value,
              disabled: disabled.value,
              'aria-disabled': ariaDisabled.value ? 'true' : undefined,
              tabindex: tabIndex.value,
              onClick: () => clicks++,
            },
            () => [h('svg', { 'aria-hidden': 'true', 'data-slot-icon': '' }), 'Save'],
          ),
          h(SForm, { disabled: formDisabled.value, readonly: formReadonly.value }, () =>
            h(SFileInput, {
              id: 'files',
              label: 'Attachments',
              modelValue: files.value,
              disabled: fileDisabled.value,
              readonly: fileReadonly.value,
              drop: droppable.value,
              accept: '.txt',
              maxFiles: 2,
              maxFileSize: 32,
              'onUpdate:modelValue': (value) => (files.value = value),
              onReject: (value) => rejections.push(value),
            }),
          ),
        ])
    },
  })
  app.use(createSolyiVuetify()).mount('#app')
  const tick = async () => {
    await nextTick()
    await nextTick()
  }
  await tick()
  const button = window.document.getElementById('action')
  const content = button.querySelector('.v-btn__content')
  const originalSlot = content.firstElementChild
  button.click()
  assert.equal(clicks, 1)
  busy.value = true
  await tick()
  button.focus()
  button.click()
  assert.equal(clicks, 1, 'Loading blocks repeated submission')
  assert.equal(button.getAttribute('aria-busy'), 'true')
  assert.equal(button.getAttribute('aria-disabled'), 'true')
  assert.equal(window.document.activeElement, button, 'Loading retains current focus')
  assert.equal(button.tabIndex, 0, 'Loading retains the existing tab order')
  assert.equal(content.textContent, 'Save', 'Loading leaves the original label in layout')
  assert.equal(content.firstElementChild, originalSlot, 'Slotted icon is retained')
  const loader = button.querySelector('.v-btn__loader .sol-ui-busy')
  assert.ok(loader, 'Loader uses the native VBtn overlay outside the width-defining content')
  assert.equal(loader.getAttribute('aria-hidden'), 'true')
  assert.equal(content.contains(loader), false)
  tabIndex.value = -1
  disabled.value = true
  await tick()
  assert.equal(button.disabled, true)
  assert.equal(button.tabIndex, -1, 'Explicit tabindex is preserved')
  disabled.value = false
  busy.value = false
  tabIndex.value = undefined
  ariaDisabled.value = true
  await tick()
  button.click()
  assert.equal(clicks, 1, 'Forwarded aria-disabled remains guarded')
  assert.equal(button.querySelector('.v-btn__loader'), null)

  const zone = () => window.document.querySelector('.sol-ui-file > div')
  const file = (name, type = 'text/plain') => new window.File(['test'], name, { type })
  function drag(type, incoming = [], types = ['Files']) {
    const event = new window.Event(type, { bubbles: true, cancelable: true })
    Object.defineProperty(event, 'dataTransfer', {
      value: { types, files: incoming, dropEffect: 'none' },
    })
    zone().dispatchEvent(event)
    return event
  }
  const state = () => zone().getAttribute('data-drag-state')
  const accepted = file('accepted.txt')
  assert.equal(state(), 'idle')
  assert.equal(drag('dragenter', [], ['text/plain']).defaultPrevented, false)
  await tick()
  assert.equal(state(), 'idle', 'Text drags never activate the file affordance')
  drag('dragenter')
  drag('dragenter')
  await tick()
  assert.equal(state(), 'over')
  assert.equal(
    zone().matches('.sol-dropzone[data-drag-state="over"]'),
    true,
    'Vue state matches the existing Core active dropzone selector',
  )
  drag('dragleave')
  await tick()
  assert.equal(state(), 'over', 'Leaving a nested child keeps the zone active')
  drag('dragleave')
  await tick()
  assert.equal(state(), 'idle')
  const over = drag('dragover')
  await tick()
  assert.equal(state(), 'over', 'Dragover also restores the active feedback')
  assert.equal(over.dataTransfer.dropEffect, 'copy')
  drag('drop', [accepted])
  await tick()
  assert.equal(state(), 'idle')
  assert.deepEqual(
    files.value.map((item) => item.name),
    ['accepted.txt'],
  )
  drag('dragenter')
  drag('drop', [file('rejected.png', 'image/png')])
  await tick()
  assert.equal(state(), 'idle', 'Rejected drops reset the active affordance')
  assert.equal(rejections.at(-1)[0].code, 'type')
  assert.equal(window.document.querySelector('.sol-ui-file [role=alert]') !== null, true)
  assert.deepEqual(
    files.value.map((item) => item.name),
    ['accepted.txt'],
  )

  for (const flag of [fileDisabled, fileReadonly, formDisabled, formReadonly]) {
    drag('dragenter')
    await tick()
    assert.equal(state(), 'over')
    flag.value = true
    await tick()
    assert.equal(state(), 'idle', 'Becoming unavailable clears an in-progress drag')
    assert.equal(zone().getAttribute('data-dragging'), 'false')
    assert.equal(zone().getAttribute('aria-disabled'), 'true')
    assert.equal(window.document.getElementById('files-choose').disabled, true)
    assert.equal(window.document.getElementById('files').disabled, true)
    const blocked = drag('dragover')
    drag('drop', [file('blocked.txt')])
    await tick()
    assert.equal(state(), 'idle')
    assert.equal(blocked.dataTransfer.dropEffect, 'none')
    assert.deepEqual(
      files.value.map((item) => item.name),
      ['accepted.txt'],
    )
    flag.value = false
    await tick()
    assert.equal(state(), 'idle', 'Re-enabling never restores a stale drag')
  }
  drag('dragenter')
  await tick()
  droppable.value = false
  await tick()
  assert.equal(state(), 'idle')
  drag('drop', [file('no-drop.txt')])
  await tick()
  assert.deepEqual(
    files.value.map((item) => item.name),
    ['accepted.txt'],
  )
  const coreStyles = await readFile(new URL('site/components.css', root), 'utf8')
  assert.match(coreStyles, /\.sol-dropzone\[data-drag-state="over"\]/)
  assert.deepEqual(errors, [])
  console.log(
    'PASS: source SBtn loader preserves slot/focus/tab order/guards; file drag Core state, nested leave, accepted/rejected drop, local/form disabled/readonly and drop-off reset. Browser geometry and colors are checked separately.',
  )
} finally {
  app?.unmount()
  dom.window.close()
  const resolved = path.resolve(temporary)
  assert.ok(resolved.startsWith(path.resolve(os.tmpdir()) + path.sep))
  assert.ok(path.basename(resolved).startsWith('solyi-component-feedback-'))
  await rm(resolved, { recursive: true, force: true })
}
