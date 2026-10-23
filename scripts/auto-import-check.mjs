import assert from 'node:assert/strict';
import {readFile, readdir, mkdir, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {ESLint} from 'eslint';
import { formatPublicSample } from './public-sample-format.mjs'
import {createVueAutoImport} from '../examples/vue-vuetify/auto-import.config.js';

const root = new URL('../', import.meta.url);
const starter = new URL('examples/vue-vuetify/', root);
const {build} = await import(new URL('node_modules/vite/dist/node/index.js', starter));
const entry = new URL('.runtime-test/auto-import-smoke.ts', starter);
await mkdir(new URL('./', entry), {recursive: true});
await writeFile(entry, 'export const value = ref<number>(1);\nexport const doubled = computed(() => value.value * 2);\n');
const built = await build({
  configFile: false,
  root: fileURLToPath(starter),
  plugins: [createVueAutoImport({generate: false})],
  logLevel: 'error',
  build: {lib: {entry: fileURLToPath(entry), formats: ['es']}, write: false, minify: false, rolldownOptions: {external: ['vue']}},
});
const code = (Array.isArray(built) ? built : [built]).flatMap(result => result.output).filter(file => file.type === 'chunk').map(file => file.code).join('\n');
assert.match(code, /import[^;]+\bref\b[^;]+from ["']vue["']/);
assert.match(code, /import[^;]+\bcomputed\b[^;]+from ["']vue["']/);
for (const [dir, declaration] of [['vue-vuetify', 'src/auto-imports.d.ts'], ['package-consumer', 'auto-imports.d.ts']]) {
  const base = new URL('examples/' + dir + '/', root);
  const globals = JSON.parse(await readFile(new URL('.eslintrc-auto-import.json', base), 'utf8')).globals;
  const types = await readFile(new URL(declaration, base), 'utf8');
  for (const name of ['ref', 'computed', 'nextTick', 'onBeforeUnmount', 'useTemplateRef']) {
    assert.equal(globals[name], 'readonly', dir + ' lint global ' + name);
    assert.ok(types.includes('const ' + name + ': typeof import(\'vue\').' + name), dir + ' Vue declaration ' + name);
  }
}
const recipes = new URL('src/recipes/', starter);
for (const name of await readdir(recipes)) if (name.endsWith('.vue')) {
  const text = await readFile(new URL(name, recipes), 'utf8');
  assert.equal(text, await formatPublicSample(text, 'vue'), name + ': canonical public SFC formatting')
  assert.doesNotMatch(text, /^import\s+(?!type\b)[^;]+\bfrom\s*['"]vue['"]/m, name + ': Vue preset imports are omitted');
  assert.doesNotMatch(text, /document\.getElementById/, name + ': component focus uses template refs');
}
for (const script of ['vue-recipes-runtime-check', 'starter-runtime-check', 'progress-runtime-check', 'recipe-navigation-check']) assert.ok((await readFile(new URL('scripts/' + script + '.mjs', root), 'utf8')).includes('createVueAutoImport({generate:false})'), script + ': actual runtime compiles with the same Vue preset');
const eslint = new ESLint({cwd: fileURLToPath(root), overrideConfigFile: fileURLToPath(new URL('examples/eslint.config.mjs', root))});
const actual = await eslint.lintFiles(['examples/vue-vuetify/src', 'examples/package-consumer/main.ts']);
assert.deepEqual(actual.flatMap(result => result.messages.map(message => result.filePath + ': ' + message.message)), []);
const positive = await eslint.lintText('<script setup lang="ts">const state = ref(0);</script><template><p>{{ state }}</p></template>', {filePath: 'examples/vue-vuetify/src/qa-auto-import.vue'});
assert.equal(positive[0].errorCount, 0);
const negative = await eslint.lintText('<script setup lang="ts">refTypo(0); ref = () => 0;</script>', {filePath: 'examples/vue-vuetify/src/qa-auto-import.vue'});
assert.ok(negative[0].messages.some(message => message.ruleId === 'no-undef'));
assert.ok(negative[0].messages.some(message => message.ruleId === 'no-global-assign'));
console.log('PASS: real Vue-preset import injection, both checked-in TypeScript/readonly lint globals, all30 import-free recipes/template refs, matching runtime plugins, actual ESLint scripts plus typo/readonly negative fixtures.');
