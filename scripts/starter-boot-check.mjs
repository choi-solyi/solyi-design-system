import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {JSDOM, VirtualConsole} from 'jsdom';
import {nonblockingStarterStyles, starterBootPalettes} from '../examples/vue-vuetify/vite.config.js';
import {revealStarter} from '../examples/vue-vuetify/src/boot.js';
import {resolveAppearance} from '../site/appearance-state.js';

const source = await readFile(new URL('../examples/vue-vuetify/index.html', import.meta.url), 'utf8');
const tokens = JSON.parse(await readFile(new URL('../tokens.json', import.meta.url), 'utf8'));
const fixture = nonblockingStarterStyles(source.replace('</head>', '<link rel="stylesheet" crossorigin href="./index.css"></head>'));
function create({saved, query = '', dark = false, brokenStorage = false} = {}) {
  let deadline;
  const dom = new JSDOM(fixture, {url: 'https://example.test/starter/' + query, runScripts: 'dangerously', virtualConsole: new VirtualConsole(), beforeParse(window) {
    window.matchMedia = () => ({matches: dark});
    if (saved) window.localStorage.setItem('solyi-ds-prefs', JSON.stringify(saved));
    if (brokenStorage) Object.defineProperty(window, 'localStorage', {get() {throw Error('Denied');}});
    const timeout = window.setTimeout.bind(window);
    window.setTimeout = (callback, delay) => {if (delay === 30000) deadline = callback; return timeout(callback, delay);};
  }});
  return {dom, window: dom.window, document: dom.window.document, deadline: () => deadline()};
}
for (const theme of ['violet', 'sage', 'sand']) for (const mode of ['light', 'dark']) for (const density of ['comfortable', 'compact']) {
  const x = create({saved: {theme, mode, density}});
  assert.deepEqual({...x.window.__solyiStarterBoot.appearance}, {theme, mode, density});
  assert.deepEqual({...x.window.__solyiStarterBoot.appearance}, resolveAppearance({storage: x.window.localStorage, search: '', prefersDark: false}), 'Early inline preferences agree with the shared App resolver');
  assert.equal(x.document.documentElement.dataset.theme, theme);
  assert.equal(x.document.documentElement.style.getPropertyValue('--boot-bg'), tokens.themes[theme][mode].canvas);
  assert.equal(starterBootPalettes[theme][mode][2], tokens.themes[theme][mode].accent);
  x.dom.window.close();
}
const override = create({saved: {theme: 'sage', mode: 'dark', density: 'compact'}, query: '?theme=sand&mode=light&density=comfortable'});
assert.deepEqual({...override.window.__solyiStarterBoot.appearance}, {theme: 'sand', mode: 'light', density: 'comfortable'});override.dom.window.close();
const invalid = create({saved: {theme: 'sage', mode: 'dark', density: 'compact'}, query: '?theme=invalid&mode=invalid&density=invalid'});
assert.deepEqual({...invalid.window.__solyiStarterBoot.appearance}, resolveAppearance({storage: invalid.window.localStorage, search: invalid.window.location.search, prefersDark: false}));invalid.dom.window.close();
const denied = create({brokenStorage: true, dark: true});assert.equal(denied.document.documentElement.dataset.mode, 'dark');denied.dom.window.close();

const x = create(), link = x.document.querySelector('link[data-starter-css]');
let finishFonts;
Object.defineProperty(x.document, 'fonts', {value: {ready: new Promise(resolve => {finishFonts = resolve;})}});
const ready = revealStarter(x.document, x.window.__solyiStarterBoot);
await Promise.resolve();
assert.equal(x.document.documentElement.dataset.starterBoot, 'loading');
link.dispatchEvent(new x.window.Event('load'));
assert.equal(link.rel, 'stylesheet');
assert.equal(link.dataset.starterCss, 'pending');
link.dispatchEvent(new x.window.Event('load'));
await Promise.resolve();await Promise.resolve();
assert.equal(x.document.documentElement.dataset.starterBoot, 'loading', 'Fonts still pending; app stays inert');
assert.ok(x.document.getElementById('app').hasAttribute('inert'));
finishFonts();await ready;
assert.equal(x.document.documentElement.dataset.starterBoot, 'ready');
assert.equal(x.document.getElementById('app').getAttribute('aria-busy'), 'false');
assert.equal(x.document.getElementById('app').hasAttribute('inert'), false);
assert.equal(x.document.getElementById('starter-boot').hidden, true);x.dom.window.close();

for (const failure of ['css', 'js', 'timeout']) {
  const x = create();
  if (failure === 'css') x.document.querySelector('link[data-starter-css]').dispatchEvent(new x.window.Event('error'));
  if (failure === 'js') x.window.dispatchEvent(new x.window.ErrorEvent('error', {message: 'Module failed'}));
  if (failure === 'timeout') x.deadline();
  assert.equal(x.document.documentElement.dataset.starterBoot, 'failed', failure);
  assert.equal(x.document.getElementById('starter-boot-actions').hidden, false);
  assert.match(x.document.getElementById('starter-boot-message').textContent, /다시 시도/);
  x.window.__solyiStarterBoot.ready();
  assert.equal(x.document.documentElement.dataset.starterBoot, 'failed', 'Late readiness cannot hide a visible failure');
  x.dom.window.close();
}
const fontFallback = create();
fontFallback.document.querySelector('link[data-starter-css]').dataset.starterCss = 'ready';
const rejected = Promise.reject(Error('Font unavailable'));rejected.catch(() => {});
Object.defineProperty(fontFallback.document, 'fonts', {value: {ready: rejected}});
await revealStarter(fontFallback.document, fontFallback.window.__solyiStarterBoot);
assert.equal(fontFallback.document.documentElement.dataset.starterBoot, 'ready', 'Failed fonts fall back without a permanent spinner');fontFallback.dom.window.close();
assert.match(source, /prefers-reduced-motion:reduce/);
assert.match(source, /<noscript>/);
assert.equal((source.match(/setTimeout\(/g) || []).length, 1, 'Only the failure escape timer exists');
console.log('PASS: token-derived12 appearance combinations, URL/storage denial, CSS apply + font readiness gating, inert/busy cleanup, JS/CSS/failure-timeout retry escape, font fallback, noscript/reduced-motion source. Real slow-network paint remains browser QA.');
