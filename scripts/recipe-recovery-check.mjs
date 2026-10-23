import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { JSDOM } from 'jsdom'

const root = new URL('../', import.meta.url)
const read = path => readFile(new URL(path, root), 'utf8')
const require = createRequire(new URL('../examples/vue-vuetify/package.json', import.meta.url))
const { parse, compileScript } = require('@vue/compiler-sfc')
const ts = require('typescript')
const vueSource = await read('examples/vue-vuetify/node_modules/vue/dist/vue.global.prod.js')
const sources = await Promise.all(
  ['RecipeExamples.vue', 'recipes/workflow.vue', 'recipes/bulk-recovery.vue'].map(async file => [
    file,
    await read('examples/vue-vuetify/src/' + file),
  ]),
)
const sourceMap = Object.fromEntries(sources)
const registrySource = await read('examples/vue-vuetify/src/recipe-registry.ts')

function fixture(example = 'workflow') {
  const dom = new JSDOM('<div id="app"></div><button id="other">다른 작업</button>', {
    url: `https://example.test/starter/?view=recipes&example=${example}&keep=query#kept`,
    runScripts: 'outside-only',
    pretendToBeVisual: true,
  })
  const w = dom.window
  const d = w.document
  const media = new w.EventTarget()
  media.matches = false
  w.matchMedia = () => media
  w.eval(vueSource)
  const V = w.Vue
  const errors = []
  const moduleCache = new Map()
  const evaluate = (code, load) => {
    const module = { exports: {} }
    const js = ts.transpileModule(code, {
      compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
    }).outputText
    new Function(
      'require',
      'module',
      'exports',
      'window',
      'document',
      'location',
      'history',
      'HTMLElement',
      js,
    )(load, module, module.exports, w, d, w.location, w.history, w.HTMLElement)
    return module.exports
  }
  function load(id) {
    if (id === 'vue') return V
    if (id === 'solyi-ui/icons') return { solIconPaths: { chevron: 'M9 5l7 7-7 7' } }
    if (id === './recipe-registry') return evaluate(registrySource, load)
    const file = id.replace(/^\.\//, '')
    if (moduleCache.has(file)) return { default: moduleCache.get(file) }
    if (sourceMap[file]) {
      const withPreset = sourceMap[file].replace(
        '<script setup lang="ts">',
        '<script setup lang="ts">\nimport {ref,computed,watch,nextTick,useTemplateRef,onMounted,onBeforeUnmount} from \'vue\'\n',
      )
      const { descriptor, errors } = parse(withPreset, { filename: file })
      assert.deepEqual(errors, [])
      const script = compileScript(descriptor, { id: file, inlineTemplate: true })
      const component = evaluate(script.content, load).default
      moduleCache.set(file, component)
      return { default: component }
    }
    return { default: V.defineComponent({ render: () => V.h('p', { 'data-recipe': file }, file) }) }
  }
  const button = V.defineComponent({
    inheritAttrs: false,
    props: ['disabled', 'loading'],
    setup(props, { attrs, slots }) {
      return () =>
        V.h(
          'button',
          {
            ...attrs,
            type: attrs.type || 'button',
            disabled: props.disabled || props.loading,
          },
          slots.default?.(),
        )
    },
  })
  const surface = V.defineComponent({
    props: ['title'],
    setup(props, { attrs, slots }) {
      return () =>
        V.h('section', attrs, [
          props.title && V.h('h2', props.title),
          slots.default?.(),
          slots.actions?.(),
        ])
    },
  })
  const field = tag =>
    V.defineComponent({
      inheritAttrs: false,
      props: ['modelValue', 'label', 'error', 'disabled'],
      emits: ['update:modelValue'],
      setup(props, { attrs, emit, expose }) {
        let input
        expose({ focus: () => input?.focus() })
        return () =>
          V.h('label', [
            props.label,
            V.h(tag, {
              ...attrs,
              ref: value => {
                input = value
              },
              value: props.modelValue,
              disabled: props.disabled,
              onInput: event => emit('update:modelValue', event.target.value),
            }),
          ])
      },
    })
  const checkbox = V.defineComponent({
    props: ['modelValue', 'disabled', 'label', 'id'],
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      return () =>
        V.h('label', [
          V.h('input', {
            id: props.id,
            type: 'checkbox',
            checked: props.modelValue,
            disabled: props.disabled,
            onChange: event => emit('update:modelValue', event.target.checked),
          }),
          props.label,
        ])
    },
  })
  const dialog = V.defineComponent({
    props: ['modelValue', 'title'],
    setup(props, { slots }) {
      return () =>
        props.modelValue &&
        V.h('div', { role: 'dialog' }, [
          V.h('h2', props.title),
          slots.default?.(),
          slots.actions?.(),
        ])
    },
  })
  function mount(file) {
    const app = V.createApp(load('./' + file).default)
    app.config.errorHandler = error => errors.push(error)
    for (const [name, component] of Object.entries({
      SBtn: button,
      SCard: surface,
      SAlert: surface,
      STextField: field('input'),
      STextarea: field('textarea'),
      SCheckbox: checkbox,
      SDialog: dialog,
    }))
      app.component(name, component)
    app.mount('#app')
    return app
  }
  const pause = async (ms = 30) => {
    await new Promise(resolve => setTimeout(resolve, ms))
    await V.nextTick()
  }
  const clickText = (text, scope = d) => {
    const target = [...scope.querySelectorAll('button')].find(
      button => button.textContent.trim() === text,
    )
    assert.ok(target, 'Button exists: ' + text)
    target.click()
  }
  const choose = id => d.getElementById('recipe-link-' + id).click()
  const selection = () => d.querySelector('[aria-current="page"]')?.id
  async function edit(value) {
    d.getElementById('recipe-edit').click()
    await pause()
    const input = d.getElementById('recipe-edit-name')
    input.value = value
    input.dispatchEvent(new w.Event('input', { bubbles: true }))
    await pause()
    return input
  }
  return { dom, w, d, V, errors, mount, pause, clickText, choose, selection, edit }
}

const f = fixture()
const app = f.mount('RecipeExamples.vue')
await f.pause()
const originalUrl = f.w.location.href
let draft = await f.edit('선택 취소 시 보존')
f.choose('buttons')
await f.pause()
assert.ok(f.d.querySelector('[role="dialog"]'))
assert.equal(f.w.location.href, originalUrl)
assert.equal(f.selection(), 'recipe-link-workflow')
f.clickText('계속 작업', f.d.querySelector('[role="dialog"]'))
await f.pause()
assert.equal(f.w.location.href, originalUrl)
assert.equal(f.d.getElementById('recipe-edit-name'), draft)
assert.equal(draft.value, '선택 취소 시 보존')
f.choose('buttons')
await f.pause()
f.clickText('변경 버리기', f.d.querySelector('[role="dialog"]'))
await f.pause()
assert.equal(f.selection(), 'recipe-link-buttons')
assert.equal(new URL(f.w.location.href).searchParams.get('keep'), 'query')
assert.equal(f.w.location.hash, '#kept')
f.w.history.back()
await f.pause(250)
assert.equal(
  f.selection(),
  'recipe-link-workflow',
  JSON.stringify({
    url: f.w.location.href,
    state: f.w.history.state,
    errors: f.errors.map(String),
  }),
)
draft = await f.edit('앞으로 취소 보존')
f.w.history.forward()
await f.pause(250)
assert.ok(f.d.querySelector('[role="dialog"]'))
assert.equal(f.w.location.href, originalUrl, 'History URL is restored before asking')
f.clickText('계속 작업', f.d.querySelector('[role="dialog"]'))
await f.pause()
assert.equal(f.d.getElementById('recipe-edit-name'), draft)
assert.equal(draft.value, '앞으로 취소 보존')
f.w.history.forward()
await f.pause(250)
f.clickText('변경 버리기', f.d.querySelector('[role="dialog"]'))
await f.pause(250)
assert.equal(f.selection(), 'recipe-link-buttons')
f.choose('workflow')
await f.pause()
const currentUrl = f.w.location.href
draft = await f.edit('뒤로 취소 보존')
f.w.history.back()
await f.pause(250)
assert.equal(f.w.location.href, currentUrl)
assert.ok(f.d.querySelector('[role="dialog"]'))
f.clickText('계속 작업', f.d.querySelector('[role="dialog"]'))
await f.pause()
assert.equal(f.d.getElementById('recipe-edit-name'), draft)
assert.equal(draft.value, '뒤로 취소 보존')
f.w.history.back()
await f.pause(250)
f.clickText('변경 버리기', f.d.querySelector('[role="dialog"]'))
await f.pause(250)
assert.equal(f.selection(), 'recipe-link-buttons')
f.w.history.forward()
await f.pause(250)
assert.equal(f.selection(), 'recipe-link-workflow')
await f.edit('반복 요청 보존')
f.choose('buttons')
f.choose('fields')
await f.pause()
f.clickText('계속 작업', f.d.querySelector('[role="dialog"]'))
await f.pause()
assert.equal(f.selection(), 'recipe-link-workflow')
assert.equal(f.d.getElementById('recipe-edit-name').value, '반복 요청 보존')
f.choose('buttons')
await f.pause()
app.unmount()
await f.pause()
assert.equal(f.w.location.href, currentUrl, 'Unmount cancels pending selection')
assert.deepEqual(f.errors, [])
f.dom.window.close()

for (const moveFocus of [false, true]) {
  const b = fixture('bulk-recovery')
  const bulk = b.mount('recipes/bulk-recovery.vue')
  await b.pause()
  const start = [...b.d.querySelectorAll('button')].find(button =>
    button.textContent.includes('선택한'),
  )
  start.focus()
  start.click()
  await b.pause(390)
  assert.match(b.d.getElementById('recipe-bulk-result').textContent, /완료 2개 · 실패 1개/)
  const retry = b.d.getElementById('recipe-bulk-retry')
  retry.focus()
  retry.click()
  await b.pause()
  assert.equal(retry.disabled, true)
  // JSDOM ignores blur() on an already disabled button. Reproduce the audited
  // Chrome blur without generating an unrelated user focusin event.
  retry.disabled = false
  retry.blur()
  retry.disabled = true
  assert.equal(b.d.activeElement, b.d.body, 'Disabled-button focus loss is reproduced')
  if (moveFocus) b.d.getElementById('other').focus()
  await b.pause(390)
  assert.match(b.d.getElementById('recipe-bulk-result').textContent, /완료 3개 · 실패 0개/)
  assert.equal(b.d.activeElement.id, moveFocus ? 'other' : 'recipe-bulk-result')
  assert.equal(retry.disabled, true)
  const attempts = [...b.d.querySelectorAll('p')].filter(p =>
    /^success|^pending|^error|^idle/.test(p.textContent),
  )
  assert.deepEqual(
    attempts.map(p => p.textContent.trim()),
    ['success · 처리 1회', 'success · 처리 2회', 'success · 처리 1회'],
  )
  bulk.unmount()
  assert.deepEqual(b.errors, [])
  b.dom.window.close()
}
console.log(
  'PASS: actual explorer/workflow SFC guard for list selection, back/forward cancel/approve, repeated requests and unmount; URL/selection/draft retained on cancel. Actual bulk SFC restores result focus after disabled-button blur and respects a user focus move; only failed rows retry. UI components are focused test doubles; real-browser dialog/keyboard/layout checks remain separate.',
)
