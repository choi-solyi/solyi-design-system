/* Installed-package behavior and contrast contracts; real native keyboard/layout QA is separate. */
import assert from 'node:assert/strict'
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { JSDOM } from 'jsdom'

const root = new URL('../', import.meta.url)
const consumer = new URL('examples/package-consumer/', root)
const source = process.argv.includes('--source')
const dom = new JSDOM('<div id="app"></div>', {
  pretendToBeVisual: true,
  url: 'https://example.test',
})
const w = dom.window,
  d = w.document
for (const key of [
  'window',
  'document',
  'Element',
  'Node',
  'HTMLElement',
  'SVGElement',
  'ShadowRoot',
  'Document',
  'MutationObserver',
  'Event',
  'MouseEvent',
  'KeyboardEvent',
  'getComputedStyle',
]) {
  Object.defineProperty(globalThis, key, {
    value: key === 'window' ? w : key === 'document' ? d : w[key],
    configurable: true,
  })
}
globalThis.requestAnimationFrame = w.requestAnimationFrame.bind(w)
globalThis.cancelAnimationFrame = w.cancelAnimationFrame.bind(w)
w.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} })
globalThis.matchMedia = w.matchMedia
globalThis.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.CSS = { supports: () => false }
const moduleName = source ? '../../packages/vue-ui/src/index' : 'solyi-ui'
await writeFile(
  new URL('.runtime-extension-entry.ts', consumer),
  `export {createApp,h,ref,nextTick} from 'vue';export * from ${JSON.stringify(moduleName)};`,
)
const { build } = await import(new URL('node_modules/vite/dist/node/index.js', consumer))
const built = await build({
  root: fileURLToPath(consumer),
  configFile: false,
  logLevel: 'error',
  resolve: { dedupe: ['vue', 'vuetify'] },
  ssr: { noExternal: true },
  build: {
    ssr: fileURLToPath(new URL('.runtime-extension-entry.ts', consumer)),
    write: false,
    minify: false,
    rolldownOptions: { external: ['vue'] },
  },
})
await writeFile(
  new URL('.runtime-check.mjs', consumer),
  built.output.find((chunk) => chunk.type === 'chunk').code,
)
const api = await import(new URL('.runtime-check.mjs?primitives=' + Date.now(), consumer))
const { createApp, h, ref, nextTick, SChip, SBadge, SIcon, SIconBtn, SBtn } = api
const tick = async () => {
  await nextTick()
  await nextTick()
}
const $ = (selector) => {
  const element = d.querySelector(selector)
  assert.ok(element, selector)
  return element
}
const warnings = []
let app, vuetify
async function mount(render, locale = 'ko-KR') {
  app = createApp({ render })
  app.config.warnHandler = (message) => warnings.push(message)
  vuetify = api.createSolyiVuetify()
  app.use(vuetify).use({ install: api.install }, { locale })
  app.mount('#app')
  await tick()
}
async function unmount() {
  app.unmount()
  vuetify.unmount()
  await tick()
}
for (const name of ['SChip', 'SBadge', 'SIcon', 'SIconBtn'])
  assert.equal(api.sComponents[name], api[name])

await mount(() => h(SChip, { label: 'A complete long label · 긴 이름' }))
assert.equal(d.querySelector('button'), null, 'Passive chips do not invent an action')
assert.equal($('.sol-ui-chip').title, 'A complete long label · 긴 이름')
assert.equal(app.component('SChip'), SChip, 'The plugin registers the same public component')
await unmount()

const selected = ref(false),
  disabled = ref(false),
  language = ref('ko-KR')
let selectionProposals = [],
  clicks = 0,
  removals = 0
await mount(
  () =>
    h(SChip, {
      label: 'Design',
      selectable: true,
      selected: selected.value,
      disabled: disabled.value,
      removable: true,
      'onUpdate:selected': (value) => selectionProposals.push(value),
      onClick: () => clicks++,
      onRemove: () => removals++,
    }),
  language,
)
$('.sol-ui-chip-main').click()
assert.deepEqual(selectionProposals, [true])
assert.equal(
  $('.sol-ui-chip-main').getAttribute('aria-pressed'),
  'false',
  'The parent owns selection',
)
selected.value = true
await tick()
assert.equal($('.sol-ui-chip-main').getAttribute('aria-pressed'), 'true')
assert.ok($('.sol-ui-chip-main svg'), 'Selected state has a non-color indicator')
assert.equal(d.querySelector('button button'), null)
$('.sol-ui-chip-remove').focus()
$('.sol-ui-chip-remove').click()
assert.equal(removals, 1)
assert.equal(clicks, 1, 'Remove does not also select or emit the main action')
const focused = d.activeElement
language.value = 'en-US'
await tick()
assert.equal($('.sol-ui-chip-remove').getAttribute('aria-label'), 'Remove Design')
assert.equal(d.activeElement, focused)
assert.deepEqual(selectionProposals, [true], 'Language changes do not emit selection')
disabled.value = true
await tick()
$('.sol-ui-chip-main').click()
$('.sol-ui-chip-remove').click()
assert.equal(clicks, 1)
assert.equal(removals, 1)
await unmount()

await mount(() =>
  h('div', [
    h(SIcon, { id: 'decorative', name: 'copy', size: 16 }),
    h(SIcon, { id: 'meaningful', name: 'info', label: 'Information' }),
    h(SIcon, { id: 'rotated', name: 'chevron', rotate: 270 }),
    h(SBadge, { id: 'zero', content: 0, label: 'No notifications' }),
    h(SBadge, { id: 'live', content: '✓ Done', label: 'Complete', live: 'polite' }),
    h(
      SBadge,
      { content: 3, label: 'Three notifications' },
      {
        anchor: ({ descriptionId }) =>
          h('button', { id: 'anchor', 'aria-describedby': descriptionId }, 'Notifications'),
      },
    ),
  ]),
)
assert.equal($('#decorative').getAttribute('aria-hidden'), 'true')
assert.equal($('#decorative').getAttribute('width'), '16')
assert.equal($('#meaningful').getAttribute('role'), 'img')
assert.equal($('#meaningful').getAttribute('aria-label'), 'Information')
assert.equal($('#rotated path').getAttribute('transform'), 'rotate(270 12 12)')
assert.equal($('#zero .sol-ui-tag-label').textContent, '0')
assert.equal($('#zero').getAttribute('role'), 'img')
assert.equal($('#live').getAttribute('role'), 'status')
assert.equal($('#live .sol-ui-sr-only').textContent, 'Complete')
assert.equal(
  d.getElementById($('#anchor').getAttribute('aria-describedby')).getAttribute('aria-label'),
  'Three notifications',
)
await unmount()

const busy = ref(false),
  iconDisabled = ref(false)
let iconClicks = 0,
  oldClicks = 0
await mount(() =>
  h('div', [
    h(SIconBtn, {
      id: 'icon-button',
      icon: 'copy',
      label: 'Copy',
      loading: busy.value,
      disabled: iconDisabled.value,
      onClick: () => iconClicks++,
    }),
    h(SBtn, { id: 'old-button', onClick: () => oldClicks++ }, () => 'Existing API'),
  ]),
)
$('#icon-button').focus()
$('#icon-button').click()
assert.equal(iconClicks, 1)
const iconButton = $('#icon-button')
assert.equal(iconButton.getAttribute('aria-label'), 'Copy')
assert.equal(iconButton.querySelector('svg').getAttribute('width'), '20')
busy.value = true
await tick()
assert.equal($('#icon-button').getAttribute('aria-busy'), 'true')
assert.equal(d.activeElement, iconButton, 'Loading preserves the SBtn focus contract')
$('#icon-button').click()
assert.equal(iconClicks, 1)
busy.value = false
iconDisabled.value = true
await tick()
$('#icon-button').click()
assert.equal(iconClicks, 1)
$('#old-button').click()
assert.equal(oldClicks, 1, 'Existing SBtn behavior remains available')
await unmount()
assert.deepEqual(warnings, [])

await mount(() =>
  h('div', [
    h(SIcon, { id: 'unknown', name: '__proto__', size: 99 }),
    h(SIcon, { id: 'unnamed', name: 'info', decorative: false }),
    h(SIconBtn, { icon: 'copy', label: '' }),
  ]),
)
assert.equal(
  $('#unknown').querySelector('path'),
  null,
  'Unknown names never access inherited object properties',
)
assert.equal($('#unknown').getAttribute('width'), '20')
assert.equal($('#unnamed').getAttribute('aria-hidden'), 'true')
assert.equal(d.querySelector('button'), null, 'Invalid icon buttons do not create unnamed actions')
// Vue's production build may elide development warnings; the safe DOM contract is required.
await unmount()

const tokens = JSON.parse(await readFile(new URL('tokens.json', root), 'utf8'))
function luminance(hex) {
  const channels = hex.match(/[a-f\d]{2}/gi).map((value) => parseInt(value, 16) / 255)
  const linear = channels.map((value) =>
    value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
  )
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722
}
function contrast(a, b) {
  const values = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (values[0] + 0.05) / (values[1] + 0.05)
}
for (const [theme, data] of Object.entries(tokens.themes))
  for (const mode of ['light', 'dark']) {
    const c = data[mode]
    for (const tone of ['neutral', 'accent', 'info', 'success', 'warning', 'danger']) {
      const fg = tone === 'neutral' ? c.text : c[tone]
      const soft = tone === 'neutral' ? c['surface-alt'] : c[tone + '-soft']
      const ink = tone === 'accent' ? c['on-accent'] : c.surface
      for (const [variant, a, b] of [
        ['filled', ink, fg],
        ['subtle', fg, soft],
        ['outlined', fg, c.surface],
      ]) {
        assert.ok(contrast(a, b) >= 4.5, `${theme}/${mode}/${tone}/${variant}: ${contrast(a, b)}`)
      }
    }
  }
console.log(
  'PASS: installed/global APIs, controlled chip selection/removal, reactive locale/focus, SVG naming/sizing, badge descriptions, SBtn loading/disabled regression and 108 token contrast combinations.',
)
