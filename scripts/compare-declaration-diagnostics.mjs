/* Read-only baseline comparison. Real dependencies and diagnostic options stay fixed. */
import assert from 'node:assert/strict'
import {readFile, readdir, mkdir, writeFile} from 'node:fs/promises'
import {createRequire} from 'node:module'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {createHash} from 'node:crypto'

const root = fileURLToPath(new URL('../', import.meta.url))
function argument(name, fallback) { const index = process.argv.indexOf(name); return index < 0 ? fallback : process.argv[index + 1] }
const baseline = path.resolve(argument('--baseline', path.join(root, 'qa-output/baseline/package')))
const candidate = path.resolve(argument('--candidate', path.join(root, 'examples/package-consumer/node_modules/solyi-ui')))
const consumer = path.resolve(argument('--consumer', path.join(root, 'examples/package-consumer')))
const starter = path.resolve(argument('--starter', path.join(root, 'examples/vue-vuetify')))
const output = path.resolve(argument('--out', path.join(root, 'qa-output/declaration-comparison')))
const normalize = value => path.resolve(value).replaceAll('\\', '/')
const virtualRoot = normalize(path.join(consumer, 'node_modules/solyi-ui/dist'))
const dependencies = normalize(path.join(consumer, 'node_modules'))
const fixture = `import {STimePicker,SDatePicker,SNumberInput} from './index'
const time: InstanceType<typeof STimePicker>['$props'] = {id:'time',label:'Time',modelValue:'09:07',min:'09:07',max:'10:00',step:15,readonly:true}
const date: InstanceType<typeof SDatePicker>['$props'] = {id:'date',label:'Date',modelValue:'2026-10-28'}
const number: InstanceType<typeof SNumberInput>['$props'] = {id:'number',label:'Number',modelValue:20,min:5,max:100,step:5}
void [time,date,number]
`
async function declarations(directory) {
  const entries = []
  async function visit(current, relative = '') {
    for (const entry of await readdir(current, {withFileTypes:true})) {
      const file = path.join(current, entry.name), name = path.posix.join(relative, entry.name)
      if (entry.isDirectory()) await visit(file, name)
      else if (entry.name.endsWith('.d.ts')) entries.push([name, await readFile(file,'utf8')])
    }
  }
  await visit(path.join(directory, 'dist'))
  return entries
}
const packages = []
for (const [label, directory] of [['baseline', baseline], ['candidate', candidate]]) {
  const metadata = JSON.parse(await readFile(path.join(directory, 'package.json'),'utf8'))
  assert.equal(metadata.name,'solyi-ui')
  packages.push({label, directory, version:metadata.version, files:await declarations(directory), runtimeSha256:createHash('sha256').update(await readFile(path.join(directory,'dist/index.js'))).digest('hex')})
}
assert.equal(packages[0].version,'1.0.0','The comparison baseline is the published 1.0.0')
const results = []
for (const [label, project] of [['recipe',starter], ['independent-consumer',consumer]]) {
  const require = createRequire(path.join(project,'package.json')), ts = require('typescript')
  for (const skipLibCheck of [false,true]) {
    const pair = []
    for (const pkg of packages) {
      const memory = new Map(pkg.files.map(([name, text]) => [virtualRoot+'/'+name,text]))
      memory.set(virtualRoot+'/compatibility-fixture.ts',fixture)
      const host = ts.createCompilerHost({}), read = host.readFile.bind(host), exists = host.fileExists.bind(host), directory = host.directoryExists.bind(host)
      host.readFile = file => memory.get(normalize(file)) ?? read(file)
      host.fileExists = file => memory.has(normalize(file)) || exists(file)
      host.directoryExists = file => [...memory.keys()].some(entry => entry.startsWith(normalize(file)+'/')) || directory(file)
      host.getSourceFile = (file, version, onError) => {
        const text = host.readFile(file)
        if (text === undefined) { onError?.('Cannot read '+file); return undefined }
        return ts.createSourceFile(file,text,version,true)
      }
      const options = {target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext,moduleResolution:ts.ModuleResolutionKind.Bundler,
        strict:true,noEmit:true,skipLibCheck,lib:['lib.es2022.d.ts','lib.dom.d.ts']}
      const program = ts.createProgram([...memory.keys()],options,host)
      const diagnostics = ts.getPreEmitDiagnostics(program).filter(item => item.category===ts.DiagnosticCategory.Error).map(item => {
        const filename = item.file ? normalize(item.file.fileName) : '<global>'
        const location = item.file?.getLineAndCharacterOfPosition(item.start??0)
        return {file:filename.startsWith(dependencies+'/')?filename.slice(dependencies.length+1):filename,own:filename.startsWith(virtualRoot+'/'),
          code:item.code,line:location?location.line+1:0,column:location?location.character+1:0,message:ts.flattenDiagnosticMessageText(item.messageText,'\n')}
      }).sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b)))
      const own = diagnostics.filter(item=>item.own), external = diagnostics.filter(item=>!item.own)
      pair.push({label:pkg.label,version:pkg.version,declarationFiles:pkg.files.length,runtimeSha256:pkg.runtimeSha256,ownCount:own.length,externalCount:external.length,diagnostics})
    }
    const before = new Set(pair[0].diagnostics.filter(item=>!item.own).map(item=>JSON.stringify(item)))
    const after = new Set(pair[1].diagnostics.filter(item=>!item.own).map(item=>JSON.stringify(item)))
    const added = [...after].filter(item=>!before.has(item)).map(item=>JSON.parse(item)), removed = [...before].filter(item=>!after.has(item)).map(item=>JSON.parse(item))
    results.push({compiler:label,typescript:ts.version,skipLibCheck,strict:true,target:'ES2022',moduleResolution:'Bundler',libs:['ES2022','DOM'],pair,added,removed})
    console.log(`${label} TS${ts.version} skipLibCheck:${skipLibCheck}; baseline own/external=${pair[0].ownCount}/${pair[0].externalCount}; candidate=${pair[1].ownCount}/${pair[1].externalCount}; added=${added.length}, removed=${removed.length}`)
  }
}
await mkdir(output,{recursive:true})
await writeFile(path.join(output,'report.json'),JSON.stringify({baseline,candidate,consumer,starter,dependencyResolution:'Same consumer dependency tree and virtual solyi-ui path for both packages; package declarations are overlaid in memory only.',fixture,results},null,2)+'\n')
for (const result of results) {
  assert.equal(result.pair[0].ownCount,0,'Baseline own/common fixture diagnostics')
  assert.equal(result.pair[1].ownCount,0,'Candidate own/common fixture diagnostics')
  assert.equal(result.added.length,0,'No new external declaration diagnostics')
}
console.log('PASS: no new external declaration errors under identical dependencies/options. Strict external failures still affect consumers without skipLibCheck; this comparison does not hide or repair them.')
