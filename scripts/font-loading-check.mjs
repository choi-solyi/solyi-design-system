import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { JSDOM } from 'jsdom'
import { loadCodeFontStylesheet, observeCodeFonts } from '../site/font-loading.js'
import { documentShell } from './document-shell.mjs'

const dom = new JSDOM('<pre>const value = 1</pre>', { url: 'https://example.test/' })
const { window } = dom
const { document } = window
let callback
let observed = 0
let loads = 0
let disconnected = 0
window.IntersectionObserver = class {
  constructor(next) {
    callback = next
  }
  observe() {
    observed++
  }
  disconnect() {
    disconnected++
  }
}
const dispose = observeCodeFonts({
  root: document,
  load: () => {
    loads++
  },
})
assert.equal(observed, 1)
assert.equal(loads, 0, 'Offscreen code does not download optional fonts')
callback([{ isIntersecting: false }])
await Promise.resolve()
assert.equal(loads, 0)
callback([{ isIntersecting: true }])
await Promise.resolve()
assert.equal(loads, 1)
callback([{ isIntersecting: true }])
await Promise.resolve()
assert.equal(loads, 1, 'Load once even when several code panels become visible')
dispose()
assert.ok(disconnected >= 1)

const first = loadCodeFontStylesheet('./fonts/code-fonts.css', document)
const second = loadCodeFontStylesheet('./fonts/code-fonts.css', document)
assert.equal(
  document.querySelectorAll('link').length,
  1,
  'The shared loader deduplicates stylesheets',
)
document.querySelector('link').dispatchEvent(new window.Event('load'))
await Promise.all([first, second])

delete window.IntersectionObserver
let fallback = 0
const stopFallback = observeCodeFonts({
  root: document,
  load: () => {
    fallback++
    return Promise.reject(new Error('Synthetic optional font failure'))
  },
})
await Promise.resolve()
await Promise.resolve()
assert.equal(fallback, 1, 'Unsupported observers retain a one-shot fallback without a retry loop')
stopFallback()
dom.window.close()

const root = new URL('../', import.meta.url)
const source = await readFile(new URL('site/index.html', root), 'utf8')
const shell = await documentShell(source, '0.0.0')
const html = new JSDOM(shell.html)
assert.equal(html.window.document.querySelectorAll('link[rel="stylesheet"]').length, 1)
assert.ok(shell.html.indexOf('solyi-ds-prefs') < shell.html.indexOf('href="./shell.css"'))
assert.match(shell.css, /fonts\/wanted-sans\/woff2\/WantedSansVariable\.woff2/)
assert.doesNotMatch(shell.html, /rel="preload"[^>]+WantedSansVariable/)
assert.ok(html.window.document.querySelector('script[src="./deferred-code-fonts.js"]'))
html.window.close()
console.log(
  'PASS: visible-code one-shot loading, failure fallback, stylesheet deduplication, one render-blocking shell CSS and preferences before paint',
)
