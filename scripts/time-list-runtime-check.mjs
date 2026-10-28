/* Native compatibility, list navigation and read-only-entry form validation. */
import assert from 'node:assert/strict'
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { JSDOM } from 'jsdom'
const root = new URL('../', import.meta.url), consumer = new URL('examples/package-consumer/', root)
const dom = new JSDOM('<div id="app"></div>', { url: 'https://example.test', pretendToBeVisual: true })
const w = dom.window, d = w.document
for (const key of ['window', 'document', 'Element', 'Node', 'HTMLElement', 'HTMLInputElement', 'SVGElement', 'ShadowRoot', 'Document', 'MutationObserver', 'Event', 'MouseEvent', 'KeyboardEvent', 'FocusEvent', 'getComputedStyle']) Object.defineProperty(globalThis, key, { value: key === 'window' ? w : key === 'document' ? d : w[key], configurable: true })
globalThis.requestAnimationFrame = w.requestAnimationFrame.bind(w); globalThis.cancelAnimationFrame = w.cancelAnimationFrame.bind(w)
w.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} }); globalThis.matchMedia = w.matchMedia
globalThis.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} }; globalThis.CSS = { supports: () => false }
const entry = process.argv.includes('--source') ? '../../packages/vue-ui/src/index' : 'solyi-ui'
await writeFile(new URL('.runtime-extension-entry.ts', consumer), `export {createApp,h,ref,nextTick} from 'vue';export * from ${JSON.stringify(entry)};`)
const { build } = await import(new URL('node_modules/vite/dist/node/index.js', consumer))
const built = await build({ root: fileURLToPath(consumer), configFile: false, logLevel: 'error', resolve: { dedupe: ['vue', 'vuetify'] }, ssr: { noExternal: true }, build: { ssr: fileURLToPath(new URL('.runtime-extension-entry.ts', consumer)), write: false, minify: false, rolldownOptions: { external: ['vue'] } } })
await writeFile(new URL('.runtime-check.mjs', consumer), built.output.find(chunk => chunk.type === 'chunk').code)
const api = await import(new URL('.runtime-check.mjs?time-list=' + Date.now(), consumer))
const { createApp, h, ref, nextTick, STimePicker } = api
const tick = async () => { await nextTick(); await nextTick() }
const $ = selector => { const value = d.querySelector(selector); assert.ok(value, selector); return value }
const key = (element, value, extra = {}) => { const event = new w.KeyboardEvent('keydown', { key: value, bubbles: true, cancelable: true, ...extra }); element.dispatchEvent(event); return event }
const data = () => new w.FormData($('#fixture'))
let app, vuetify
const warnings = []
async function mount(render, locale = 'ko-KR') {
  app = createApp({ render: () => h('form', { id: 'fixture' }, [render(), h('button', { type: 'button', id: 'outside' }, 'Outside')]) })
  app.config.warnHandler = message => warnings.push(message)
  vuetify = api.createSolyiVuetify(); app.use(vuetify).use({ install: api.install }, { locale }).mount('#app'); await tick()
}
async function unmount() { app.unmount(); vuetify.unmount(); await tick() }

let changes = [], closes = []
await mount(() => h(STimePicker, { id: 'native', name: 'time', label: 'Time', modelValue: '09:07', min: '09:07', max: '10:00', step: 15, initialScrollValue: '09:52', onChange: value => changes.push(value) }))
assert.equal($('#native').readOnly, false)
$('.sol-time-entry button').click(); await tick()
assert.equal(d.querySelectorAll('.sol-ui-time-panel select').length, 2)
assert.equal(d.querySelector('[role=listbox]'), null)
assert.equal($('.sol-ui-time-panel select').value, '09')
assert.deepEqual(changes, []); assert.equal(data().get('time'), '09:07')
key(d.activeElement, 'Escape'); await tick(); assert.equal(d.activeElement, $('.sol-time-entry button'))
await unmount()

const value = ref(null), readonly = ref(false), disabled = ref(false), language = ref('ko-KR')
await mount(() => h(STimePicker, { id: 'list', name: 'time', label: 'Time', modelValue: value.value, presentation: 'list', allowManualInput: false, min: '09:07', max: '10:00', step: 15, initialScrollValue: '09:31', readonly: readonly.value, disabled: disabled.value,
  'onUpdate:modelValue': next => value.value = next, onChange: next => changes.push(next), onClose: reason => closes.push(reason),
}), language)
assert.equal($('#list').readOnly, true)
$('#list').focus(); key($('#list'), 'ArrowDown', { altKey: true }); await tick()
assert.equal(d.activeElement, $('[role=listbox]'))
assert.deepEqual([...d.querySelectorAll('[role=option]')].map(element => element.getAttribute('data-time-value')), ['09:07', '09:22', '09:37', '09:52'])
assert.equal($('[role=listbox]').getAttribute('aria-activedescendant'), 'list-time-0937')
assert.deepEqual(changes, []); assert.equal(value.value, null)
key($('[role=listbox]'), 'ArrowDown'); await tick()
assert.equal($('[role=listbox]').getAttribute('aria-activedescendant'), 'list-time-0952'); assert.equal(value.value, null)
key($('[role=listbox]'), 'Enter'); await tick()
assert.equal(value.value, '09:52'); assert.deepEqual(changes, ['09:52'])
assert.equal(d.activeElement, $('#list')); assert.equal(closes.at(-1), 'select')
$('#list').value = '09:07'; $('#list').dispatchEvent(new w.Event('input', { bubbles: true })); await tick()
assert.equal($('#list').value, '09:52'); assert.equal(value.value, '09:52')
const beforeInput = new w.Event('beforeinput', { bubbles: true, cancelable: true }); $('#list').dispatchEvent(beforeInput); assert.equal(beforeInput.defaultPrevented, true)
key($('#list'), 'ArrowDown', { altKey: true }); await tick()
assert.equal($('[role=listbox]').getAttribute('aria-activedescendant'), 'list-time-0952', 'Selection wins over the initial anchor')
key($('[role=listbox]'), 'Home'); await tick(); assert.equal(value.value, '09:52')
const focused = d.activeElement
language.value = 'en-US'; await tick(); assert.equal(d.activeElement, focused)
key($('[role=listbox]'), 'Escape'); await tick()
assert.equal(closes.at(-1), 'escape'); assert.equal(value.value, '09:52'); assert.deepEqual(changes, ['09:52'])
$('.sol-time-entry button').click(); await tick(); readonly.value = true; await tick()
assert.equal(d.querySelector('[role=listbox]'), null); assert.equal($('.sol-time-entry button').disabled, true)
assert.equal(data().get('time'), '09:52')
disabled.value = true; await tick(); assert.equal(data().has('time'), false)
await unmount()

const requiredValue = ref(null)
await mount(() => h(STimePicker, { id: 'required', name: 'time', label: 'Required time', modelValue: requiredValue.value, presentation: 'list', allowManualInput: false, required: true, min: '09:07', max: '10:00', step: 15, 'onUpdate:modelValue': value => requiredValue.value = value }))
assert.equal($('#required').willValidate, false, 'Readonly text is natively barred from validation')
assert.equal($('.sol-ui-sr-only').willValidate, true, 'The unnamed proxy retains the selectable field validation contract')
assert.equal($('#fixture').checkValidity(), false)
assert.equal(d.activeElement, $('#required'))
assert.deepEqual(data().getAll('time'), [''], 'Validation proxy never creates an extra submitted field')
$('.sol-time-entry button').click(); await tick(); key($('[role=listbox]'), 'Enter'); await tick()
assert.equal(requiredValue.value, '09:07'); assert.equal($('#fixture').checkValidity(), true)
assert.deepEqual(data().getAll('time'), ['09:07'])
await unmount()

const step = ref(0)
await mount(() => h(STimePicker, { id: 'empty', label: 'Time', presentation: 'list', step: step.value, min: '09:07', max: '10:00', initialScrollValue: '23:59' }))
$('.sol-time-entry button').click(); await tick()
assert.equal(d.querySelectorAll('[role=option]').length, 0)
assert.equal($('[role=listbox]').hasAttribute('aria-activedescendant'), false)
assert.ok($('[role=status]').textContent)
step.value = 15; await tick()
assert.equal(d.querySelectorAll('[role=option]').length, 4)
assert.equal($('[role=listbox]').getAttribute('aria-activedescendant'), 'empty-time-0952')
key($('[role=listbox]'), 'PageUp'); await tick(); assert.equal($('[role=listbox]').getAttribute('aria-activedescendant'), 'empty-time-0907')
key($('[role=listbox]'), 'End'); await tick(); assert.equal($('[role=listbox]').getAttribute('aria-activedescendant'), 'empty-time-0952')
await unmount()
assert.equal(d.querySelector('.sol-ui-time-panel'), null)
assert.deepEqual(warnings, [])
console.log('PASS: native two-select defaults/change, manual-input guard vs readonly, min-origin list anchors/clamp, no navigation writes, keyboard choose/Escape/focus, locale, empty/config changes and named native required validation.')
