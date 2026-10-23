import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { formatPublicSample } from './public-sample-format.mjs'

const root = fileURLToPath(new URL('../', import.meta.url))
const starter = path.join(root, 'examples/vue-vuetify')
const require = createRequire(path.join(starter, 'package.json'))
const ts = require('typescript')
const { parse, compileScript, compileTemplate } = require('@vue/compiler-sfc')
const read = name => readFile(path.join(root, name), 'utf8')
async function walk(directory) {
  const files = []
  for (const item of await readdir(path.join(root, directory), { withFileTypes: true })) {
    const name = directory + '/' + item.name
    files.push(...(item.isDirectory() ? await walk(name) : [name]))
  }
  return files
}

const samples = []
for (const name of ['README.md', 'DESIGN.md', 'packages/vue-ui/README.md', 'packages/core/README.md', ...await walk('documentation')].filter(name => name.endsWith('.md'))) {
  const source = await read(name)
  for (const match of source.matchAll(/^```(js|ts|vue|javascript|typescript|jsx|tsx)\s*\n([\s\S]*?)^```/gm)) {
    samples.push({ name: name + ':' + (source.slice(0, match.index).match(/\n/g) || []).length, language: match[1], source: match[2] })
  }
}
for (const name of (await walk('examples/vue-vuetify/src/recipes')).filter(name => name.endsWith('.vue'))) {
  samples.push({ name, language: 'vue', source: await read(name) })
}
for (const name of ['examples/vue-vuetify/src/main.js', 'examples/vue-vuetify/src/vuetify.js', 'examples/vue-vuetify/src/AdvancedExamples.vue']) {
  samples.push({ name, language: name.endsWith('.vue') ? 'vue' : 'js', source: await read(name) })
}
const guideSource = await read('site/getting-started.js')
const guideFile = ts.createSourceFile('getting-started.js', guideSource, ts.ScriptTarget.Latest, true)
function guideVisit(node) {
  if (ts.isPropertyAssignment(node) && ts.isNoSubstitutionTemplateLiteral(node.initializer)) {
    const key = node.name.getText(guideFile)
    const language = { registration: 'ts', vite: 'ts', lint: 'js', form: 'vue' }[key]
    if (language) samples.push({ name: 'site/getting-started.js:' + key, language, source: node.initializer.text })
  }
  ts.forEachChild(node, guideVisit)
}
guideVisit(guideFile)
const appSource = await read('site/app.js')
const appFile = ts.createSourceFile('app.js', appSource, ts.ScriptTarget.Latest, true)
function appVisit(node) {
  if (ts.isCallExpression(node) && node.expression.getText(appFile) === 'codeSample') {
    const code = node.arguments[1]
    if (code && ts.isNoSubstitutionTemplateLiteral(code) && code.text.startsWith("form.addEventListener('submit'")) {
      samples.push({ name: 'site/app.js:form-flow', language: 'js', source: code.text, hostContext: true })
    }
  }
  ts.forEachChild(node, appVisit)
}
appVisit(appFile)
const starterSource = await read('examples/vue-vuetify/src/App.vue')
const starterFontSample = starterSource.match(/<code>(\/\/ English comment:[\s\S]*?)<\/code>/)
assert.ok(starterFontSample, 'The starter bilingual code-font sample remains present')
samples.push({
  name: 'examples/vue-vuetify/src/App.vue:code-font',
  language: 'js',
  source: starterFontSample[1].replaceAll('&gt;', '>').replaceAll('&amp;', '&'),
  declarations: 'declare const count: number | null\n',
})

const virtual = new Map()
const labels = new Map()
const builtinDeclarations = new Map()
let sfcCount = 0
for (const [index, sample] of samples.entries()) {
  assert.equal(sample.source.trimEnd() + '\n', await formatPublicSample(sample.source, sample.language), sample.name + ': canonical formatting')
  let source = sample.source
  let scriptLanguage = sample.language
  if (sample.language === 'vue') {
    const { descriptor, errors } = parse(source, { filename: sample.name + '.vue' })
    assert.deepEqual(errors, [], sample.name + ': real Vue SFC parse')
    const script = descriptor.script || descriptor.scriptSetup
    const compiled = script ? compileScript(descriptor, { id: 'public-' + index }) : null
    if (descriptor.template) {
      const template = compileTemplate({
        source: descriptor.template.content,
        filename: sample.name + '.vue',
        id: 'public-' + index,
        compilerOptions: { bindingMetadata: compiled?.bindings, expressionPlugins: ['typescript'] },
      })
      assert.deepEqual(template.errors, [], sample.name + ': real Vue template compile')
    }
    source = [descriptor.script?.content, descriptor.scriptSetup?.content].filter(Boolean).join('\n')
    scriptLanguage = script?.lang || 'js'
    sfcCount++
  }
  const declarations = ts.createSourceFile('sample.ts', source, ts.ScriptTarget.Latest, true)
  for (const statement of declarations.statements) {
    if (!ts.isImportDeclaration(statement) || !statement.moduleSpecifier.text.startsWith('node:')) continue
    const specifier = statement.moduleSpecifier.text
    const actual = await import(specifier)
    const bindings = statement.importClause?.namedBindings
    if (bindings && ts.isNamedImports(bindings)) {
      const names = builtinDeclarations.get(specifier) || new Set()
      for (const binding of bindings.elements) {
        const imported = binding.propertyName?.text || binding.name.text
        assert.ok(imported in actual, sample.name + ': actual Node export ' + imported)
        names.add(imported)
      }
      builtinDeclarations.set(specifier, names)
    }
  }
  const base = sample.name.startsWith('examples/vue-vuetify/src/') && !sample.name.includes('/recipes/')
    ? path.dirname(path.join(root, sample.name)) : path.join(starter, 'src')
  const extension = /^(?:ts|typescript|tsx)$/.test(scriptLanguage) || sample.hostContext || sample.declarations ? 'ts' : 'js'
  const filename = path.join(base, '.public-sample-' + index + '.' + extension)
  const context = sample.hostContext ? `
declare const form: HTMLFormElement, nameInput: HTMLInputElement, result: HTMLElement
declare let busy: boolean
declare function validate(): boolean
declare function setBusy(value: boolean): void
declare function save(): Promise<void>
` : ''
  virtual.set(filename, context + (sample.declarations || '') + source + '\nexport {}\n')
  labels.set(filename, sample.name)
}
const globalsFile = path.join(starter, 'src/.public-sample-env.d.ts')
virtual.set(globalsFile, `
/// <reference types="vite/client" />
declare module '*.vue' {
  const component: any
  export default component
}
declare const defineProps: typeof import('vue').defineProps
declare const defineEmits: typeof import('vue').defineEmits
declare const defineExpose: typeof import('vue').defineExpose
declare const defineModel: typeof import('vue').defineModel
declare const defineOptions: typeof import('vue').defineOptions
declare const withDefaults: typeof import('vue').withDefaults
` + [...builtinDeclarations].map(([specifier, names]) => `declare module '${specifier}' { ${[...names].map(name => `export const ${name}: any`).join('; ')} }`).join('\n'))
const options = {
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  // Script-name/import checking also covers intentionally untyped JS examples;
  // the guide and executable recipes have separate strict vue-tsc checks.
  strict: false,
  allowJs: true,
  checkJs: true,
  skipLibCheck: true,
  noEmit: true,
  allowSyntheticDefaultImports: true,
  types: [],
}
const host = ts.createCompilerHost(options)
const originalRead = host.readFile.bind(host)
const originalExists = host.fileExists.bind(host)
host.readFile = filename => virtual.get(path.normalize(filename)) ?? originalRead(filename)
host.fileExists = filename => virtual.has(path.normalize(filename)) || originalExists(filename)
host.getSourceFile = (filename, languageVersion) => {
  const source = host.readFile(filename)
  return source === undefined ? undefined : ts.createSourceFile(filename, source, languageVersion, true)
}
const program = ts.createProgram([...virtual.keys(), path.join(starter, 'src/auto-imports.d.ts')], options, host)
const diagnosticPath = diagnostic => path.normalize(diagnostic.file?.fileName || '')
// JS application modules intentionally remain untyped. Inspect declaration and
// import failures here; real guide/recipe vue-tsc checks validate component types.
const nameAndImportErrors = new Set([2304, 2305, 2306, 2307, 2459, 2614, 2724])
const errors = ts.getPreEmitDiagnostics(program).filter(diagnostic => labels.has(diagnosticPath(diagnostic)) && nameAndImportErrors.has(diagnostic.code))
assert.deepEqual(errors.map(diagnostic => labels.get(diagnosticPath(diagnostic)) + ': ' + ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')), [], 'Public scripts resolve their declared imports and names with the documented Vue preset')

const negativeFile = path.join(starter, 'src/.public-sample-negative.ts')
virtual.set(negativeFile, "import type { MissingPublicExport } from 'solyi-ui'\ntype MissingName = UndeclaredSampleType\nexport {}\n")
const negativeProgram = ts.createProgram([negativeFile], options, host)
const negativeErrors = ts.getPreEmitDiagnostics(negativeProgram).filter(diagnostic => diagnosticPath(diagnostic) === negativeFile)
assert.ok(negativeErrors.some(diagnostic => [2305, 2614, 2724].includes(diagnostic.code)), 'An undeclared public import fails the semantic guard: ' + JSON.stringify(negativeErrors.map(diagnostic => [diagnostic.code, ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')])))
assert.ok(negativeErrors.some(diagnostic => diagnostic.code === 2304), 'An undeclared sample name fails the semantic guard')

// Regression fixtures cover the failure modes that motivated this guard.
const requiredSeparators = '<script setup>let selected = 0; function move() { selected++ }</script><template><button @click="selected = 1; move()">Open</button></template>'
const safe = await formatPublicSample(requiredSeparators, 'vue')
assert.deepEqual(parse(safe).errors, [], 'Formatting retains required Vue inline-statement separators')
assert.equal(safe, await formatPublicSample(safe, 'vue'), 'Required separator formatting is stable')
const asi = await formatPublicSample('const done = true\n;[done].forEach(value => console.log(value))\n', 'js')
assert.match(asi, /\n;\[done\]/, 'Formatting retains an ASI-safety semicolon')
assert.notEqual(await formatPublicSample("import {ref} from 'vue';\nconst value = ref(0);\n", 'ts'), "import {ref} from 'vue';\nconst value = ref(0);\n", 'Legacy defaults fail the single canonical style')
console.log(`PASS: ${samples.length} public JS/TS/Vue samples share one format; ${sfcCount} SFCs parse and compile; imports and script names typecheck; required Vue/ASI separators stay valid.`)
