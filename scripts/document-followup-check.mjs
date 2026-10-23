import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { JSDOM } from 'jsdom'
import { presentTopics, scrollToDocumentSection } from '../site/topics.js'
import { mountVuePreviews } from '../site/vue-examples.js'

const read = path => readFile(new URL('../' + path, import.meta.url), 'utf8')
const names = ['start', 'style', 'component', 'pattern', 'releases', 'licensing']
const pause = () => new Promise(resolve => setTimeout(resolve, 40))

function fixture(body, hash, mobile = false) {
  const dom = new JSDOM(
    `<header class="topbar" style="position:sticky"><div class="header-actions"></div></header>
    <aside class="sidebar"><nav>${names
      .map(name => `<a href="#${name}" data-route="${name}">${name}</a>`)
      .join('')}</nav></aside><main>${body}</main>`,
    { url: 'https://example.test/' + hash, pretendToBeVisual: true },
  )
  const window = dom.window
  const media = new window.EventTarget()
  media.matches = mobile
  Object.assign(globalThis, {
    window,
    document: window.document,
    location: window.location,
    AbortController: window.AbortController,
    MutationObserver: window.MutationObserver,
    matchMedia: () => media,
    getComputedStyle: window.getComputedStyle.bind(window),
    requestAnimationFrame: window.requestAnimationFrame.bind(window),
    cancelAnimationFrame: window.cancelAnimationFrame.bind(window),
    innerHeight: 1000,
  })
  window.document.querySelector('.topbar').getBoundingClientRect = () => ({
    top: 0,
    bottom: 76,
    width: 1180,
    height: 76,
  })
  return { dom, window, document: window.document }
}

// Browser geometry from FUP-07: every Licensing section fits, and the first anchor is clamped.
{
  const ids = ['code-license', 'brand-license', 'third-party-license']
  const { dom, window, document } = fixture(
    ids.map(id => `<section class="section" id="${id}"><h2>${id}</h2></section>`).join(''),
    '#licensing/code-license',
  )
  let y = 0
  Object.defineProperty(globalThis, 'scrollY', { configurable: true, get: () => y })
  Object.defineProperty(window, 'scrollY', { get: () => y })
  Object.defineProperty(document.documentElement, 'scrollHeight', { get: () => 1240 })
  window.scrollTo = ({ top }) => {
    y = Math.max(0, Math.min(top, 240))
    window.dispatchEvent(new window.Event('scroll'))
  }
  ids.forEach((id, index) => {
    const section = document.getElementById(id)
    const bounds = () => ({ top: 344.84 + index * 280 - y, height: 200, width: 850 })
    section.getBoundingClientRect = bounds
    section.querySelector('h2').getBoundingClientRect = bounds
  })
  const cleanup = presentTopics(document.querySelector('main'), 'licensing')
  const active = () =>
    document.querySelector('[data-section-link][aria-current]')?.dataset.sectionLink

  scrollToDocumentSection('code-license', { focus: false })
  await pause()
  assert.equal(y, 240)
  assert.equal(active(), 'code-license', 'A clamped cold link retains its explicit first section')
  window.dispatchEvent(new window.Event('resize'))
  await pause()
  assert.equal(active(), 'code-license', 'Unchanged scroll geometry retains the selected section')

  window.scrollTo({ top: 230 })
  await pause()
  assert.equal(active(), 'code-license')
  window.scrollTo({ top: 240 })
  await pause()
  assert.equal(active(), 'third-party-license', 'Manual scrolling still activates the last section')

  scrollToDocumentSection('brand-license')
  await pause()
  assert.equal(active(), 'brand-license', 'A clamped middle anchor also keeps its selection')
  assert.equal(document.activeElement.textContent, 'brand-license')
  scrollToDocumentSection('code-license')
  await pause()
  assert.equal(active(), 'code-license')
  assert.equal(document.activeElement.textContent, 'code-license')
  cleanup()
  dom.window.close()
}

// Keep native heading/anchor semantics when the document mounts an independent recipe iframe.
{
  const parts = [
    ['date', 'extra-range-form'],
    ['files', 'extra-file-drop'],
    ['autocomplete', 'extra-autocomplete'],
  ]
  const { dom, window, document } = fixture(
    `<h1>Patterns</h1><section class="section" id="inputs"><h2>Local input workflows</h2>${parts
      .map(
        ([, id]) =>
          `<div class="demo"><div class="demo-header"><span>Inputs</span></div>
          <div class="demo-stage"><form id="${id}"></form></div></div>`,
      )
      .join('')}</section>`,
    '#pattern/date',
    true,
  )
  Object.defineProperty(globalThis, 'scrollY', { configurable: true, get: () => 0 })
  window.scrollTo = () => {}
  const cleanupTopics = presentTopics(document.querySelector('main'), 'pattern')
  const cleanupPreviews = mountVuePreviews(document.querySelector('main'))
  document.querySelector('#mobile-document-menu').click()
  for (const [id] of parts) {
    const heading = document.getElementById(id)
    assert.equal(heading.tagName, 'H3')
    assert.equal(document.querySelectorAll('#' + id).length, 1)
    assert.ok(heading.parentElement.classList.contains('vue-live-part'))
    assert.equal(heading.nextElementSibling.tagName, 'IFRAME')
    assert.equal(heading.nextElementSibling.dataset.part, id)
    assert.ok(heading.nextElementSibling.title.includes('실제 패키지 예제'))
    scrollToDocumentSection(id)
    assert.equal(document.activeElement, heading)
    assert.equal(document.querySelector('#document-primary-nav').hidden, true)
    assert.equal(document.querySelector('[aria-current="location"]').dataset.sectionLink, id)
  }
  cleanupPreviews()
  cleanupTopics()
  dom.window.close()
}

// In the scripting-disabled parse, the fallback is part of the initial main content.
{
  const dom = new JSDOM(await read('site/index.html'))
  const fallback = dom.window.document.querySelector('main > noscript .noscript')
  assert.ok(fallback)
  assert.equal(fallback.querySelector('h1').id, 'noscript-title')
  assert.deepEqual(
    [...fallback.querySelectorAll('a')].map(link => link.getAttribute('href')),
    ['./tokens.css', './tokens.json'],
  )
  dom.window.close()
}

const require = createRequire(new URL('../examples/vue-vuetify/package.json', import.meta.url))
const { parse, compileScript } = require('@vue/compiler-sfc')
const source = await read('examples/vue-vuetify/src/recipes/color-examples.vue')
const { descriptor, errors } = parse(source)
assert.deepEqual(errors, [])
assert.ok(compileScript(descriptor, { id: 'color-followup', inlineTemplate: true }).content)

console.log(
  'PASS: clamped anchor selection/manual bottom tracking, iframe alias heading/focus/mobile close, ' +
    'first-main noscript content and canonical color recipe SFC compilation.',
)
