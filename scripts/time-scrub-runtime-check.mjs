/* Scrub proposals, final commits and cancellation must remain separate. */
import assert from 'node:assert/strict'
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { JSDOM } from 'jsdom'
const root = new URL('../', import.meta.url), consumer = new URL('examples/package-consumer/', root)
const dom = new JSDOM('<div id="app"></div>', { url: 'https://example.test', pretendToBeVisual: true })
const w = dom.window, d = w.document
for (const name of ['window', 'document', 'Element', 'Node', 'HTMLElement', 'HTMLInputElement', 'SVGElement', 'ShadowRoot', 'Document', 'MutationObserver', 'Event', 'MouseEvent', 'KeyboardEvent', 'FocusEvent', 'getComputedStyle']) Object.defineProperty(globalThis, name, { value: name === 'window' ? w : name === 'document' ? d : w[name], configurable: true })
globalThis.requestAnimationFrame = w.requestAnimationFrame.bind(w); globalThis.cancelAnimationFrame = w.cancelAnimationFrame.bind(w)
w.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} }); globalThis.matchMedia = w.matchMedia
globalThis.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} }; globalThis.CSS = { supports: () => false }
const captured = new WeakMap()
w.HTMLElement.prototype.setPointerCapture = function (id) { captured.set(this, id) }
w.HTMLElement.prototype.hasPointerCapture = function (id) { return captured.get(this) === id }
w.HTMLElement.prototype.releasePointerCapture = function () { captured.delete(this) }
const entry = process.argv.includes('--source') ? '../../packages/vue-ui/src/index' : 'solyi-ui'
await writeFile(new URL('.runtime-extension-entry.ts', consumer), `export {createApp,h,ref,nextTick} from 'vue';export * from ${JSON.stringify(entry)};`)
const { build } = await import(new URL('node_modules/vite/dist/node/index.js', consumer))
const built = await build({ root: fileURLToPath(consumer), configFile: false, logLevel: 'error', resolve: { dedupe: ['vue', 'vuetify'] }, ssr: { noExternal: true }, build: { ssr: fileURLToPath(new URL('.runtime-extension-entry.ts', consumer)), write: false, minify: false, rolldownOptions: { external: ['vue'] } } })
await writeFile(new URL('.runtime-check.mjs', consumer), built.output.find(chunk => chunk.type === 'chunk').code)
const api = await import(new URL('.runtime-check.mjs?time-scrub=' + Date.now(), consumer))
const { createApp, h, ref, nextTick, STimePicker } = api
const tick = async () => { await nextTick(); await nextTick() }
const $ = selector => { const value = d.querySelector(selector); assert.ok(value, selector); return value }
function pointer(element, type, y = 100, id = 1, extra = {}) {
  const event = new w.MouseEvent(type, { bubbles: true, cancelable: true, clientY: y, button: 0, ...extra })
  Object.defineProperties(event, { pointerId: { value: id }, pointerType: { value: 'touch' }, isPrimary: { value: true } })
  element.dispatchEvent(event); return event
}
function key(element, type, value, extra = {}) { element.dispatchEvent(new w.KeyboardEvent(type, { key: value, bubbles: true, cancelable: true, ...extra })) }
const data = () => new w.FormData($('#fixture')).get('time')
let app, vuetify, events, value, disabled, readonly, step, language, visible, fieldHandle
const warnings = []
const legacyLocale = {...api.enLocale}
for (const name of ['timeScrub', 'timeScrubKeys', 'timePreview', 'timeScrubCancelled']) delete legacyLocale[name]
assert.equal(api.resolveSolLocale(legacyLocale).timePreview('09:07'), 'Preview 09:07')
assert.equal(api.resolveSolLocale('en', {timePreview: 42}).timePreview('09:07'), 'Preview 09:07')
async function mount(extra = {}, formEvents = {}) {
  value = ref('09:22'); disabled = ref(false); readonly = ref(false); step = ref(15); language = ref('ko-KR'); visible = ref(true)
  events = { preview: [], commit: [], cancel: [], change: [] }
  app = createApp({ render: () => h('form', { id: 'fixture', ...formEvents }, [visible.value ? h(STimePicker, {
    ref: handle => fieldHandle = handle, id: 'time', name: 'time', label: 'Time', modelValue: value.value, min: '09:07', max: '10:00', step: step.value,
    scrubbable: true, listScrubbable: true, scrubPixelsPerStep: 10, presentation: 'list', disabled: disabled.value, readonly: readonly.value,
    'onUpdate:modelValue': next => value.value = next, onChange: next => events.change.push(next),
    onPreview: next => events.preview.push(next), onInteractionCommit: next => events.commit.push(next), onInteractionCancel: next => events.cancel.push(next), ...extra,
  }) : null, h('button', { id: 'outside', type: 'button' }, 'Outside')]) })
  app.config.warnHandler = message => warnings.push(message)
  vuetify = api.createSolyiVuetify(); app.use(vuetify).use({ install: api.install }, { locale: language }).mount('#app'); await tick()
}
async function unmount() { app.unmount(); vuetify.unmount(); await tick() }
const start = () => pointer($('.sol-ui-time-scrub'), 'pointerdown')
const move = (y, id = 1) => pointer(w, 'pointermove', y, id)
const up = (y, id = 1) => pointer(w, 'pointerup', y, id)

await mount()
$('#time').focus(); $('#time').setSelectionRange(1, 4)
start(); move(90); await tick()
assert.equal(value.value, '09:22'); assert.equal($('#time').value, '09:22'); assert.equal(data(), '09:22')
assert.deepEqual(events.change, []); assert.equal($('.sol-ui-time-scrub').getAttribute('aria-valuetext'), '09:37')
assert.equal($('output').textContent, '미리보기 09:37')
assert.deepEqual(events.preview, [{ source: 'input', input: 'pointer', previousValue: '09:22', value: '09:37' }])
up(90, 2); assert.equal(events.commit.length, 0, 'Another pointer cannot finish this gesture')
up(90); await tick(); assert.equal(value.value, '09:37'); assert.deepEqual(events.change, ['09:37']); assert.equal(events.commit.length, 1)
assert.equal(data(), '09:37'); assert.equal($('.sol-ui-time-scrub').hasPointerCapture(1), false)
move(70); up(70); await tick(); assert.equal(events.commit.length, 1, 'Released listeners cannot commit twice')
start(); up(100); await tick(); assert.equal(events.commit.length, 1, 'An input grip tap cannot auto-select')
await unmount()

await mount(); start(); move(90); await tick(); fieldHandle.clear(); await tick(); up(90); await tick()
assert.equal(value.value, null); assert.deepEqual(events.change, [null]); assert.equal(events.commit.length, 0); assert.equal(events.cancel.at(-1).reason, 'external', 'Public clear cancels the pending gesture before clearing')
await unmount()

await mount({}, {onFocusin: event => { if (event.target.classList.contains('sol-ui-time-scrub')) disabled.value = true }})
start(); await tick(); move(90); up(90); await tick()
assert.equal(value.value, '09:22'); assert.equal(events.commit.length, 0); assert.equal(events.cancel.at(-1).reason, 'disabled', 'A controlled focus handler can disable the field before movement')
await unmount()

await mount(); $('#time').focus(); start(); move(90); await tick()
const retainedFocus = d.activeElement
language.value = 'en-US'; await tick()
assert.equal(d.activeElement, retainedFocus); assert.equal(value.value, '09:22'); assert.equal($('output').textContent, 'Preview 09:37'); assert.equal(events.cancel.length, 0)
up(90); await tick(); assert.equal(value.value, '09:37'); await unmount()

await mount({ allowManualInput: false, required: true, scrubPixelsPerStep: -1 })
value.value = null; await tick()
assert.equal($('#fixture').checkValidity(), false)
start(); up(100); await tick(); assert.equal(value.value, null)
const requiredGrip = $('.sol-ui-time-scrub'); requiredGrip.focus()
key(requiredGrip, 'keydown', 'Home'); await tick(); assert.equal(value.value, null); assert.equal(data(), '')
key(requiredGrip, 'keyup', 'Home'); await tick(); assert.equal(value.value, '09:07'); assert.equal($('#fixture').checkValidity(), true)
assert.deepEqual(new w.FormData($('#fixture')).getAll('time'), ['09:07'])
start(); move(90); up(90); await tick(); assert.equal(value.value, '09:22', 'Invalid sensitivity falls back to a positive step distance')
await unmount()

for (const reason of ['escape', 'pointercancel', 'capture', 'blur', 'external', 'configuration', 'disabled', 'unmount']) {
  await mount(); $('#time').focus(); $('#time').setSelectionRange(1, 4); start(); move(90); await tick()
  if (reason === 'escape') key(w, 'keydown', 'Escape')
  if (reason === 'pointercancel') pointer(w, 'pointercancel', 90)
  if (reason === 'capture') pointer($('.sol-ui-time-scrub'), 'lostpointercapture', 90)
  if (reason === 'blur') w.dispatchEvent(new w.Event('blur'))
  if (reason === 'external') value.value = '09:52'
  if (reason === 'configuration') step.value = 30
  if (reason === 'disabled') disabled.value = true
  if (reason === 'unmount') visible.value = false
  await tick(); up(90); move(70); await tick()
  assert.equal(events.commit.length, 0, reason); assert.deepEqual(events.change, [], reason)
  assert.equal(value.value, reason === 'external' ? '09:52' : '09:22', reason)
  assert.equal(events.cancel.length, 1, reason); assert.equal(events.cancel[0].reason, reason)
  if (['escape', 'pointercancel', 'capture'].includes(reason)) { assert.equal(d.activeElement, $('#time')); assert.equal($('#time').selectionStart, 1); assert.equal($('#time').selectionEnd, 4) }
  await unmount()
}

await mount()
$('#time').focus(); $('#time').value = '09:37'; $('#time').dispatchEvent(new w.Event('input', { bubbles: true })); await tick()
start(); move(90); await tick(); assert.equal(value.value, '09:22', 'Moving focus to the grip must not blur-commit the typed draft')
assert.equal(data(), '09:37'); key(w, 'keydown', 'Escape'); await tick(); assert.equal($('#time').value, '09:37'); assert.equal(value.value, '09:22')
start(); move(90); up(90); await tick(); assert.equal(value.value, '09:52'); assert.deepEqual(events.change, ['09:52'])
await unmount()

await mount(); value.value = '09:52'; await tick()
start(); move(0); move(10); await tick(); assert.equal(events.preview.at(-1).value, '09:37', 'Boundary overshoot must not delay reversal')
up(10); await tick(); assert.equal(value.value, '09:37'); await unmount()

await mount()
const grip = $('.sol-ui-time-scrub'); grip.focus()
key(grip, 'keydown', 'ArrowUp'); key(grip, 'keydown', 'ArrowUp', { repeat: true }); await tick()
assert.equal(value.value, '09:22'); assert.equal(events.preview.at(-1).value, '09:52')
key(grip, 'keyup', 'ArrowUp'); await tick(); assert.equal(value.value, '09:52'); assert.equal(events.commit.length, 1); assert.deepEqual(events.change, ['09:52'])
key(grip, 'keydown', 'Home'); await tick(); key(w, 'keydown', 'Escape'); key(grip, 'keyup', 'Home'); await tick()
assert.equal(value.value, '09:52'); assert.equal(events.cancel.at(-1).reason, 'escape')
language.value = 'en-US'; await tick(); assert.equal(grip.getAttribute('aria-label'), 'Time Adjust time by dragging')
readonly.value = true; await tick(); assert.equal(grip.tabIndex, -1); start(); move(0); up(0); assert.equal(events.commit.length, 1)
await unmount()

await mount()
$('.sol-time-entry button').click(); await tick()
const rowGrip = $('[data-time-value="09:37"] .sol-ui-time-list-grip')
pointer(rowGrip, 'pointerdown'); await tick(); assert.equal(value.value, '09:22'); assert.equal(data(), '09:22'); assert.equal(events.preview.at(-1).source, 'list')
pointer(w, 'pointercancel'); await tick(); rowGrip.click(); await tick()
assert.equal(value.value, '09:22'); assert.ok(d.querySelector('[role=listbox]')); assert.equal(events.commit.length, 0)
assert.equal($('[role=listbox]').getAttribute('aria-activedescendant'), 'time-time-0922')
pointer(rowGrip, 'pointerdown'); up(100); await tick(); rowGrip.click(); await tick()
assert.equal(value.value, '09:37'); assert.deepEqual(events.change, ['09:37']); assert.equal(events.commit.length, 1); assert.equal(d.querySelector('[role=listbox]'), null)
await unmount()

await mount({ scrubbable: false, listScrubbable: false })
assert.equal(d.querySelector('.sol-ui-time-scrub'), null); $('.sol-time-entry button').click(); await tick(); assert.equal(d.querySelector('.sol-ui-time-list-grip'), null)
await unmount(); assert.deepEqual(warnings, [])
console.log('PASS: scrub preview never writes model/form; one pointer/key-release commit; identity, bounds/reversal, raw draft blur, selection/focus, eight cancel paths, locale/readonly, list tap/cancel and cleanup. Synthetic DOM; real capture, scrolling and touch require browser QA.')
