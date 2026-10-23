import assert from 'node:assert/strict';
import {readFile, readdir} from 'node:fs/promises';
import {JSDOM} from 'jsdom';
import '../site/vendor/prism.js';
import {highlightSample, sampleLanguage} from '../site/code-highlight.js';

const raw = `<script setup lang="ts">\n// 한글과 English comment\ninterface Entry { count: number }\nconst entry = ref<Entry>({ count: 2 });\n</script>\n<template>\n  <SBtn :disabled="entry.count === 0">{{ entry.count }}</SBtn>\n</template>\n<style scoped>\n.card { padding: 16px; color: red; }\n</style>\n`;
const markup = highlightSample(raw, 'Vue 예제');
assert.equal(sampleLanguage(raw), 'vue');
assert.ok(markup.includes('script-typescript'));
assert.ok(markup.includes('token keyword'));
assert.ok(markup.includes('language-css'));
assert.ok(markup.includes('token interpolation'));
assert.ok(markup.includes('token tag'));
function unchanged(text, label) {
  const dom = new JSDOM('<pre><code>' + highlightSample(text, label) + '</code></pre>');
  assert.equal(dom.window.document.querySelector('code').textContent, text, label + ': highlighted text stays byte-for-byte identical for selection/copy');
  assert.equal(dom.window.document.querySelectorAll('script').length, 0, 'Code never executes');
  dom.window.close();
}
unchanged(raw, 'Vue 예제');
const recipes = new URL('../examples/vue-vuetify/src/recipes/', import.meta.url);
for (const name of await readdir(recipes)) if (name.endsWith('.vue')) unchanged(await readFile(new URL(name, recipes), 'utf8'), name);
unchanged('<img src=x onerror="alert(1)"> & <script>alert(2)</script>', 'HTML 참고');
unchanged('npm install --save-exact package@0.1.0', '고정 설치');

const tokens = JSON.parse(await readFile(new URL('../tokens.json', import.meta.url), 'utf8'));
const css = await readFile(new URL('../site/code-highlight.css', import.meta.url), 'utf8');
const lum = hex => hex.slice(1).match(/../g).map(x => parseInt(x, 16) / 255).map(x => x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4).reduce((s, x, i) => s + x * [.2126, .7152, .0722][i], 0);
const contrast = (a, b) => (Math.max(lum(a), lum(b)) + .05) / (Math.min(lum(a), lum(b)) + .05);
const colors = [...css.matchAll(/(?:^|\n)([^\n]+)\{color:(#[\da-f]{6})/g)].map(m => ({mode: m[1].includes('data-mode="dark"') ? 'dark' : 'light', value: m[2]}));
assert.equal(colors.length, 10);
for (const theme of Object.values(tokens.themes)) for (const {mode, value} of colors) for (const background of ['canvas', 'surface', 'surface-alt']) assert.ok(contrast(value, theme[mode][background]) >= 4.5, `${mode} Prism ${value}/${background} text contrast`);
console.log('PASS: real Prism Vue SFC TypeScript/template/CSS and interpolation, all30 canonical raw-source identities, escaped HTML, and token foreground contrast in3 themes/light-dark. Screen review remains part of the final batch.');
