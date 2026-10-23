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
const {renderGettingStarted, gettingStartedSnippets: snippets, currentInstallCommand, currentTarballInstallCommand} = await import('data:text/javascript,' + encodeURIComponent(loaded));
const copied = [];
const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const html = renderGettingStarted({
  section: (id, title, subtitle, content) => `<section id="${id}"><h2>${title}</h2><p>${subtitle}</p>${content}</section>`,
  codeSample: (label, code) => {copied.push({label, code});return `<pre aria-label="${escape(label)}"><code>${escape(code)}</code></pre>`;},
});
const document = new JSDOM(html).window.document;
assert.deepEqual([...document.querySelectorAll('section')].map(node => node.id), ['install','registration','auto-import','forms','appearance','update']);
for (const item of current.packages.filter(item => item.name === 'solyi-ui')) {
  assert.ok(currentInstallCommand().includes(item.name + '@' + item.version));
  assert.ok(currentTarballInstallCommand().includes(`/releases/${current.release}/${item.file}`));
  assert.ok(document.querySelector(`a[href="./releases/${current.release}/${item.file}"]`));
}
assert.ok(copied.some(item => item.code.startsWith('pnpm add --save-exact') && item.code.includes('solyi-ui@')));
assert.doesNotMatch(currentInstallCommand(), /@solyi\/core/);
assert.doesNotMatch(currentTarballInstallCommand(), /solyi-core-/);
assert.equal(document.querySelectorAll('a[download]').length, 1, 'Only the consumer UI tarball is needed');
assert.doesNotMatch(document.body.textContent, /미게시|게시 예정|게시예정|초안|준비 중|준비중|보존 정책|승인 대기/);
assert.equal(currentInstallCommand({current: 'missing', releases: []}), '');
const changed = structuredClone(catalogue);
changed.releases[0].packages.forEach(item => {item.version = '9.8.7';});
assert.equal((currentInstallCommand(changed).match(/@9\.8\.7/g) || []).length, 1, 'The install command follows the UI version, not the internal Core artifact');
assert.ok(copied.every(item => [...document.querySelectorAll('code')].some(code => code.textContent === item.code)), 'Displayed code preserves the same raw copy source');

const guide = await read('documentation/guide/GETTING-STARTED.md');
for (const key of ['tooling','registration','vite','types','lintInstall','lint','verify','form','restore']) assert.ok(guide.includes(snippets[key]), 'Guide and site use the same ' + key + ' snippet');
for (const file of ['GETTING-STARTED','DISTRIBUTION','COMPATIBILITY']) {
  const markdown = await read('documentation/guide/' + file + '.md');
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
