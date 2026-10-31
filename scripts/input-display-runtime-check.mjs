/* Canonical drafts, displayed values and named native form fields are separate contracts. */
import assert from 'node:assert/strict'
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { JSDOM } from 'jsdom'

const root = new URL('../', import.meta.url), consumer = new URL('examples/package-consumer/', root)
const dom = new JSDOM('<div id="app"></div>', { url: 'https://example.test', pretendToBeVisual: true })
const w = dom.window, d = w.document
for (const key of ['window', 'document', 'Element', 'Node', 'HTMLElement', 'HTMLInputElement', 'SVGElement', 'ShadowRoot', 'Document', 'MutationObserver', 'Event', 'MouseEvent', 'KeyboardEvent', 'FocusEvent', 'getComputedStyle']) {
  Object.defineProperty(globalThis, key, { value: key === 'window' ? w : key === 'document' ? d : w[key], configurable: true })
}
globalThis.requestAnimationFrame = w.requestAnimationFrame.bind(w)
globalThis.cancelAnimationFrame = w.cancelAnimationFrame.bind(w)
w.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} })
globalThis.matchMedia = w.matchMedia
globalThis.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} }
globalThis.CSS = { supports: () => false }
w.HTMLDialogElement.prototype.showModal = function () { this.open = true }
w.HTMLDialogElement.prototype.close = function () { this.open = false; this.dispatchEvent(new w.Event('close')) }
const entry = process.argv.includes('--source') ? '../../packages/vue-ui/src/index' : 'solyi-ui'
await writeFile(new URL('.runtime-extension-entry.ts', consumer), `export {createApp,h,ref,nextTick} from 'vue';export * from ${JSON.stringify(entry)};`)
const { build } = await import(new URL('node_modules/vite/dist/node/index.js', consumer))
const built = await build({
  root: fileURLToPath(consumer), configFile: false, logLevel: 'error', resolve: { dedupe: ['vue', 'vuetify'] }, ssr: { noExternal: true },
  build: { ssr: fileURLToPath(new URL('.runtime-extension-entry.ts', consumer)), write: false, minify: false, rolldownOptions: { external: ['vue'] } },
})
await writeFile(new URL('.runtime-check.mjs', consumer), built.output.find(chunk => chunk.type === 'chunk').code)
const api = await import(new URL('.runtime-check.mjs?input-display=' + Date.now(), consumer))
const { createApp, h, ref, nextTick, SDatePicker, SNumberInput, SForm } = api
const tick = async () => { await nextTick(); await nextTick() }
const $ = selector => { const element = d.querySelector(selector); assert.ok(element, selector); return element }
const data = () => new w.FormData(d.querySelector('form'))
const enter = async (selector, value) => {
  const element = $(selector); element.focus(); await tick(); element.value = value
  element.dispatchEvent(new w.Event('input', { bubbles: true })); await tick()
}
const blur = async () => { $('#outside').focus(); await tick() }
const warnings = []
let app, vuetify
async function mount(render, locale = 'ko-KR', form = true) {
  app = createApp({ render: () => h(form ? 'form' : 'div', { id: 'fixture' }, [render(), h('button', { id: 'outside', type: 'button' }, 'Outside')]) })
  app.config.warnHandler = message => warnings.push(message)
  vuetify = api.createSolyiVuetify()
  app.use(vuetify).use({ install: api.install }, { locale }).mount('#app')
  await tick()
}
async function unmount() { app.unmount(); vuetify.unmount(); await tick() }
const weekday = (iso, locale) => iso + ' (' + api.formatSolDate(iso, locale, { year: undefined, month: undefined, day: undefined, weekday: 'short' }) + ')'

const date = ref('2026-10-27'), language = ref('ko-KR'), readonly = ref(false), disabled = ref(false), useFormatter = ref(true)
let updates = 0, invalid = 0, focusValue = ''
await mount(() => h(SDatePicker, {
  id: 'date', label: 'Date', name: 'date', modelValue: date.value, readonly: readonly.value, disabled: disabled.value,
  displayFormatter: useFormatter.value ? weekday : undefined,
  'onUpdate:modelValue': value => { updates++; date.value = value }, onInvalid: () => invalid++,
  onFocus: event => { focusValue = event.target.value },
}), language)
assert.equal($('#date').value, '2026-10-27 (화)')
assert.deepEqual(data().getAll('date'), ['2026-10-27'])
assert.equal(date.value, '2026-10-27'); assert.equal(updates, 0)
$('#date').focus(); await tick()
assert.equal($('#date').value, '2026-10-27'); assert.equal(focusValue, '2026-10-27')
$('#date').setSelectionRange(2, 5)
language.value = 'en-US'; await tick()
assert.equal($('#date').selectionStart, 2); assert.equal($('#date').selectionEnd, 5)
await blur()
assert.equal($('#date').value, '2026-10-27 (Tue)'); assert.equal(updates, 0)
await enter('#date', '2026-02-30'); await blur()
assert.equal(date.value, '2026-10-27'); assert.equal($('#date').value, '2026-02-30')
assert.equal(invalid, 1); assert.equal($('#date').validity.valid, false)
assert.equal(data().get('date'), '2026-10-27', 'An invalid draft never submits the display string')
await enter('#date', '2026-10-28'); await blur()
assert.equal(date.value, '2026-10-28'); assert.equal($('#date').value, '2026-10-28 (Wed)')
assert.equal(data().get('date'), '2026-10-28')
$('.sol-date-open').click(); await tick()
$('[data-calendar-day="2026-10-29"]').click(); await tick()
assert.equal(date.value, '2026-10-29'); assert.equal($('#date').value, '2026-10-29 (Thu)')
readonly.value = true; await tick(); $('#date').focus(); await tick()
assert.equal($('#date').value, '2026-10-29 (Thu)', 'Readonly does not enter raw editing mode')
assert.equal($('.sol-date-open').disabled, true)
assert.equal(data().get('date'), '2026-10-29')
disabled.value = true; await tick(); assert.equal(data().has('date'), false)
disabled.value = false; readonly.value = false; useFormatter.value = false; await tick()
assert.equal($('#date').value, '2026-10-29'); assert.equal($('#date').name, 'date')
assert.equal(d.querySelector('input[type=hidden]'), null, 'The default native form DOM remains unchanged')
await unmount()

const range = ref({ start: '2026-10-27', end: '2026-10-29' })
await mount(() => h(SDatePicker, { id: 'range', label: 'Range', name: 'range', mode: 'range', modelValue: range.value, displayFormatter: weekday, 'onUpdate:modelValue': value => range.value = value }))
assert.equal($('#range').value, '2026-10-27 (화) ~ 2026-10-29 (목)')
assert.equal(data().get('range'), '2026-10-27 ~ 2026-10-29')
await enter('#range', '2026-10-30 ~ 2026-10-29'); await blur()
assert.deepEqual(range.value, { start: '2026-10-27', end: '2026-10-29' })
await enter('#range', '2026-11-01 ~ 2026-11-02'); await blur()
assert.deepEqual(range.value, { start: '2026-11-01', end: '2026-11-02' })
assert.equal(data().get('range'), '2026-11-01 ~ 2026-11-02')
await unmount()

const number = ref(5), numberReadonly = ref(false), numberDisabled = ref(false), formatted = ref(true)
let numberUpdates = [], presetScope
const presets = [{ value: 5 }, { value: 20, label: 'Twenty' }, { value: 21 }, { value: 80 }, { value: 35, disabled: true }]
await mount(() => h(SNumberInput, {
  id: 'number', label: 'Quantity', name: 'quantity', modelValue: number.value,
  min: 5, max: 65, step: 15, presets, unit: 'units', readonly: numberReadonly.value, disabled: numberDisabled.value,
  formatValue: formatted.value ? value => value + ' displayed' : undefined,
  'onUpdate:modelValue': value => { numberUpdates.push(value); number.value = value },
}))
assert.equal($('#number').value, '5 displayed'); assert.equal($('#number').getAttribute('aria-valuenow'), '5')
assert.equal($('#number').getAttribute('aria-valuetext'), '5 displayed units')
assert.deepEqual(data().getAll('quantity'), ['5'])
const choices = [...d.querySelectorAll('.sol-ui-number-presets button')]
assert.deepEqual(choices.map(button => button.disabled), [false, false, true, true, true])
choices[1].click(); await tick()
assert.equal(number.value, 20); assert.deepEqual(numberUpdates, [20]); assert.equal(typeof number.value, 'number')
assert.notEqual(d.activeElement, $('#number'), 'A preset must not force the editing keyboard open'); assert.equal($('#number').value, '20 displayed')
$('#number').focus(); await tick(); assert.equal($('#number').value, '20', 'Explicit focus still enables direct editing')
await blur(); assert.equal($('#number').value, '20 displayed'); assert.equal(data().get('quantity'), '20')
choices[2].click(); await tick(); assert.deepEqual(numberUpdates, [20])
await enter('#number', '21'); await blur()
assert.equal(number.value, 20); assert.equal($('#number').validity.valid, false)
await enter('#number', '35'); await blur()
assert.equal(number.value, 35); assert.equal(data().get('quantity'), '35')
numberReadonly.value = true; await tick(); $('#number').focus(); await tick()
assert.equal($('#number').value, '35 displayed')
assert.equal(data().get('quantity'), '35')
numberDisabled.value = true; await tick(); assert.equal(data().has('quantity'), false)
numberDisabled.value = false; numberReadonly.value = false; formatted.value = false; await tick()
assert.equal($('#number').name, 'quantity'); assert.equal(d.querySelector('input[type=hidden]'), null)
await unmount()

const decimal = ref(.1)
await mount(() => h(SNumberInput, { id: 'decimal', label: 'Decimal', min: .1, max: .5, step: .2, modelValue: decimal.value, presets: [{ value: .3 }], 'onUpdate:modelValue': value => decimal.value = value }, {
  presets: scope => { presetScope = scope; return h('button', { id: 'custom-preset', type: 'button', onClick: () => scope.setValue(.3) }, 'Decimal preset') },
}))
assert.equal(presetScope.isAllowed(.3), true); assert.equal(presetScope.isAllowed(.2), false)
assert.equal(presetScope.setValue(.2), false); assert.equal(decimal.value, .1)
$('#custom-preset').click(); await tick(); assert.equal(decimal.value, .3)
assert.equal(presetScope.setValue(Infinity), false); assert.equal(decimal.value, .3)
await unmount()

await mount(() => h(SNumberInput, { id: 'grouped', label: 'Grouped', name: 'grouped', modelValue: 1234.5, step: .5, formatValue: () => 'Pretty number' }))
assert.equal(data().get('grouped'), '1,234.5', 'Custom display preserves existing committed native number serialization')
await unmount()
const inheritedDisabled = ref(false)
await mount(() => h(SForm, { id: 'scoped-form', disabled: inheritedDisabled.value, readonly: true }, () => [
  h(SDatePicker, { id: 'scoped-date', label: 'Date', name: 'date', modelValue: '2026-10-27', displayFormatter: weekday }),
  h(SNumberInput, { id: 'scoped-number', label: 'Number', name: 'number', modelValue: 10, formatValue: value => value + ' displayed', presets: [{ value: 20 }] }),
]), 'ko-KR', false)
assert.equal($('#scoped-date').readOnly, true); assert.equal($('#scoped-number').readOnly, true)
assert.deepEqual([...data().entries()], [['date', '2026-10-27'], ['number', '10']])
inheritedDisabled.value = true; await tick(); assert.deepEqual([...data().entries()], [])
await unmount()
assert.deepEqual(warnings, [])

await mount(() => h('div', [
  h(SDatePicker, { id: 'broken-date', label: 'Date', modelValue: '2026-10-27', displayFormatter: () => { throw Error('consumer callback') } }),
  h(SNumberInput, { id: 'broken-number', label: 'Number', modelValue: 5, formatValue: () => '' }),
]))
assert.equal($('#broken-date').value, '2026-10-27'); assert.equal($('#broken-number').value, '5')
await unmount()
console.log('PASS: ISO/number models, weekday/range display, raw editing, invalid-draft retention, locale/selection, named form fields, inherited readonly/disabled, min-origin presets/decimal steps, scoped preset guards and formatter fallback.')
