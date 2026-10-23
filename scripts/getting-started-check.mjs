import assert from 'node:assert/strict';
import {readFile, mkdir, writeFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {execFileSync} from 'node:child_process';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {JSDOM} from 'jsdom';
import {ESLint} from 'eslint';

const root = new URL('../', import.meta.url), read = name => readFile(new URL(name, root), 'utf8');
const index = JSON.parse(await read('release-assets/index.json'));
const current = JSON.parse(await read(`release-assets/${index.current}/manifest.json`));
const catalogue = {current: index.current, releases: [current]};
const source = await read('site/getting-started.js');
const loaded = source.replace("import {packageReleases} from './release-data.js';", `const packageReleases=${JSON.stringify(catalogue)};`);
const {renderGettingStarted, mountGettingStarted, gettingStartedSnippets: snippets, currentInstallCommand, currentTarballInstallCommand} = await import('data:text/javascript,' + encodeURIComponent(loaded));
const copied = [];
const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const html = renderGettingStarted({
  section: (id, title, subtitle, content) => `<section id="${id}"><h2>${title}</h2><p>${subtitle}</p>${content}</section>`,
  codeSample: (label, code) => {
    const id = 'guide-snippet-' + (copied.length + 1);
    copied.push({label, code, id});
    return `<details class="code-example"><summary>${escape(label)}</summary><div class="code-body"><div class="code-toolbar"><span class="code-language">${escape(label)}</span><button type="button" data-copy-snippet="${id}">복사</button></div><pre tabindex="0" aria-label="${escape(label)}"><code>${escape(code)}</code></pre></div></details>`;
  },
});
const dom = new JSDOM(html, {url: 'https://example.test/#start/install'}), {document} = dom.window;
assert.deepEqual([...document.querySelectorAll('section')].map(node => node.id), ['install','registration','auto-import','forms','appearance','update']);
for (const item of current.packages.filter(item => item.name === 'solyi-ui')) {
  assert.ok(currentTarballInstallCommand().includes(`/releases/${current.release}/${item.file}`));
  assert.ok(document.querySelector(`a[href="./releases/${current.release}/${item.file}"]`));
}
assert.equal(currentInstallCommand(), 'npm install solyi-ui');
assert.ok(copied.some(item => item.code === 'pnpm add solyi-ui'));
assert.doesNotMatch(currentInstallCommand(), /--save-exact|@latest|vue@|vuetify@/);
assert.ok(copied.some(item => item.label.includes('직접 설치') && /npm install vue@\d/.test(item.code)), 'Explicit peer installation remains available for environments without peer auto-install');
assert.doesNotMatch(currentInstallCommand(), /@solyi\/core/);
assert.doesNotMatch(currentTarballInstallCommand(), /solyi-core-/);
assert.equal(document.querySelectorAll('a[download]').length, 1, 'Only the consumer UI tarball is needed');
assert.doesNotMatch(document.body.textContent, /미게시|게시 예정|게시예정|초안|준비 중|준비중|보존 정책|승인 대기/);
assert.equal(currentTarballInstallCommand({current: 'missing', releases: []}), '');
const changed = structuredClone(catalogue);
changed.current = '9.9.9';
changed.releases[0].release = '9.9.9';
changed.releases[0].packages.find(item => item.name === 'solyi-ui').file = 'solyi-ui-9.8.7.tgz';
assert.ok(currentTarballInstallCommand(changed).includes('/releases/9.9.9/solyi-ui-9.8.7.tgz'), 'Direct verification keeps the exact UI artifact URL');
assert.ok(copied.every(item => [...document.querySelectorAll('code')].some(code => code.textContent === item.code)), 'Displayed code preserves the same raw copy source');

const cleanup = mountGettingStarted(document.body);
const group = document.querySelector('[data-install-command-group]');
assert.equal(group.querySelectorAll('[role="tab"]').length, 2);
assert.equal(group.querySelector('details'), null, 'Install tabs expose code immediately instead of nesting a disclosure');
const pnpm = group.querySelector('[data-install-manager="pnpm"]');
const npm = group.querySelector('[data-install-manager="npm"]');
function active(manager) {
  const tab = group.querySelector(`[data-install-manager="${manager}"]`);
  const panel = document.getElementById(tab.getAttribute('aria-controls'));
  assert.equal(tab.getAttribute('aria-selected'), 'true');
  assert.equal(tab.tabIndex, 0);
  assert.equal(panel.hidden, false);
  assert.equal(panel.getAttribute('aria-labelledby'), tab.id);
  assert.equal(group.querySelectorAll('[role="tab"][tabindex="0"]').length, 1);
  assert.equal([...group.querySelectorAll('[role="tabpanel"]')].filter(node => !node.hidden).length, 1);
  const copy = panel.querySelector('[data-copy-snippet]');
  const entry = copied.find(item => item.id === copy.dataset.copySnippet);
  assert.equal(panel.querySelector('code').textContent, entry.code, 'Visible panel and registered copy target are identical');
  assert.equal(entry.code, manager === 'pnpm' ? 'pnpm add solyi-ui' : 'npm install solyi-ui');
}
const peerGuidance = group.querySelector('[data-install-panel="pnpm"] .install-peer-guidance');
assert.ok(peerGuidance.textContent.includes('직접 import'));
assert.equal(peerGuidance.querySelector('code').textContent, 'pnpm add solyi-ui vue vuetify');
assert.equal(copied.find(item => item.id === peerGuidance.querySelector('[data-copy-snippet]').dataset.copySnippet).code, 'pnpm add solyi-ui vue vuetify');
const compatibility = document.querySelector('.install-compatibility');
assert.ok(compatibility.querySelector('summary'));
assert.ok(compatibility.textContent.includes(current.packages.find(item => item.name === 'solyi-ui').version), 'Version details remain available inside a disclosure');
const hashBefore = dom.window.location.hash, historyBefore = dom.window.history.length;
const key = (tab, value) => tab.dispatchEvent(new dom.window.KeyboardEvent('keydown', {key: value, bubbles: true, cancelable: true}));
active('pnpm');
pnpm.focus();key(pnpm, 'ArrowRight');active('npm');assert.equal(document.activeElement, npm);
key(npm, 'Home');active('pnpm');assert.equal(document.activeElement, pnpm);
key(pnpm, 'End');active('npm');
key(npm, 'ArrowRight');active('pnpm');
key(pnpm, 'ArrowLeft');active('npm');
pnpm.click();active('pnpm');
assert.equal(dom.window.location.hash, hashBefore);
assert.equal(dom.window.history.length, historyBefore);
cleanup();key(pnpm, 'ArrowRight');active('pnpm');

const guide = await read('documentation/guide/GETTING-STARTED.md');
for (const key of ['tooling','registration','vite','types','lintInstall','lint','verify','form','restore']) assert.ok(guide.includes(snippets[key]), 'Guide and site use the same ' + key + ' snippet');
for (const file of ['GETTING-STARTED','DISTRIBUTION','COMPATIBILITY']) {
  const markdown = await read('documentation/guide/' + file + '.md');
  assert.doesNotMatch(markdown, /solyi-ui@latest/);
  assert.doesNotMatch(markdown, /\.\.\/(?:plans|quality)\/|COMPATIBILITY-HISTORY|MOVED-DOCUMENTS|releases\/packages|미게시|게시 예정|게시예정|초안|준비 중|준비중/);
}
for (const name of ['fonts.css','code-fonts.css','tokens.css','components.css']) assert.ok(snippets.registration.includes(`'solyi-ui/${name}'`));
assert.ok(snippets.registration.indexOf("'vuetify/styles'") < snippets.registration.indexOf("'solyi-ui/tokens.css'"));
assert.ok(snippets.registration.indexOf("'solyi-ui/components.css'") < snippets.registration.indexOf("'solyi-ui/styles.css'"));
assert.doesNotMatch(html, /@solyi\/core|Core\/UI|Core CSS/);
assert.doesNotMatch(guide, /@solyi\/core|Core\/UI|Core CSS/);
assert.doesNotMatch(snippets.registration, /docs\.css/);
assert.doesNotMatch(snippets.form, /document\.getElementById|import\s*\{[^}]*\b(?:SBtn|STextField|SCard|SForm)\b[^}]*\}/);
assert.match(snippets.form, /useTemplateRef<SFormHandle>/);
assert.match(snippets.form, /if \(result\.cancelled\) return/);
assert.match(snippets.form, /server-error=/);

if (process.argv.includes('--source-only')) {
  console.log('PASS Getting started source: single solyi-ui npm/pnpm and tarball, dynamic UI release, six sections, copied source/guide identity, CSS import order and template-ref form. Package type/lint checks deferred to the integrated build.');
  process.exit(0);
}

const starter = new URL('examples/vue-vuetify/', root);
const require = createRequire(new URL('package.json', starter));
const fixture = new URL('.runtime-test/getting-started/', starter);
await mkdir(fixture, {recursive: true});
await writeFile(new URL('App.vue', fixture), snippets.form);
await writeFile(new URL('main.ts', fixture), snippets.registration);
await writeFile(new URL('tsconfig.json', fixture), JSON.stringify({
  extends: '../../tsconfig.recipes.json',
  include: ['App.vue','main.ts',fileURLToPath(new URL('src/auto-imports.d.ts', starter))],
}, null, 2));
execFileSync(process.execPath, [fileURLToPath(new URL('node_modules/vue-tsc/bin/vue-tsc.js', starter)), '-p', fileURLToPath(new URL('tsconfig.json', fixture))], {cwd: fileURLToPath(starter), stdio: 'pipe'});

const config = snippets.lint
  .replace("'vue-eslint-parser'", JSON.stringify(pathToFileURL(require.resolve('vue-eslint-parser')).href))
  .replace("'@typescript-eslint/parser'", JSON.stringify(pathToFileURL(require.resolve('@typescript-eslint/parser')).href))
  .replace("new URL('./.eslintrc-auto-import.json', import.meta.url)", JSON.stringify(fileURLToPath(new URL('.eslintrc-auto-import.json', starter))));
const {default: lintConfig} = await import('data:text/javascript,' + encodeURIComponent(config));
const lint = new ESLint({cwd: fileURLToPath(root), overrideConfigFile: true, overrideConfig: lintConfig});
const messages = await lint.lintText(snippets.form, {filePath: 'src/GettingStarted.vue'});
assert.deepEqual(messages.flatMap(item => item.messages), [], 'The copied ESLint config understands the actual form snippet');
const negative = await lint.lintText('<script setup>refTypo(0); ref = () => 0;</script>', {filePath: 'src/Negative.vue'});
assert.ok(negative[0].messages.some(item => item.ruleId === 'no-undef'));
assert.ok(negative[0].messages.some(item => item.ruleId === 'no-global-assign'));
console.log('PASS Getting started: single solyi-ui npm/pnpm and tarball links, six on-site sections, raw/copy identity, shared guide snippets, strict actual-package SFC/main types, real generated ESLint globals and negative fixtures.');
