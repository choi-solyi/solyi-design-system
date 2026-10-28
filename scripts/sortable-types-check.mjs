import assert from 'node:assert/strict'
import {mkdir,readFile,writeFile} from 'node:fs/promises'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
const root=new URL('../',import.meta.url),starter=new URL('examples/vue-vuetify/',root),directory=new URL('.runtime-test/sortable-types/',starter)
await mkdir(directory,{recursive:true})
const installed=process.argv.includes('--installed')
const source=(await readFile(new URL('src/proofs/sortable-keyboard.vue',starter),'utf8')).replaceAll("'../../../../packages/vue-ui/src/sortable-list'",installed?"'solyi-ui'":"'../../../../packages/vue-ui/src/index'")
const global=source.replace(/^import \{ SSortableList \}[^\n]*\n/m,'').replaceAll('SSortableList','SortableGlobalProof')
await writeFile(new URL('global.d.ts',directory),`import type {SSortableList} from ${JSON.stringify(installed?'solyi-ui':'../../../../packages/vue-ui/src/index')};declare module 'vue' {interface GlobalComponents {SortableGlobalProof:typeof SSortableList}}export {}\n`)
const compiler=fileURLToPath(new URL('node_modules/vue-tsc/bin/vue-tsc.js',starter))
const run=(name,content)=>{
  const file=new URL(name+'.vue',directory),config=new URL(name+'.json',directory)
  return (async()=>{
    await writeFile(file,content)
    await writeFile(config,JSON.stringify({extends:'../../tsconfig.recipes.json',compilerOptions:{types:[],paths:installed?{}:{'solyi-ui':['../../../../packages/vue-ui/src/index.ts'],'solyi-ui/global':['../../../../packages/vue-ui/src/global.ts']}},vueCompilerOptions:{strictTemplates:true,checkUnknownProps:true},files:['global.d.ts','../../src/auto-imports.d.ts',installed?'../../node_modules/solyi-ui/dist/global.d.ts':'../../../../packages/vue-ui/src/global.ts','../../node_modules/vite/client.d.ts'],include:[name+'.vue']},null,2))
    try{return {status:0,output:execFileSync(process.execPath,[compiler,'--noEmit','-p',fileURLToPath(config)],{cwd:fileURLToPath(root),encoding:'utf8',stdio:'pipe'})}}
    catch(error){return {status:error.status,output:String(error.stdout||'')+String(error.stderr||'')}}
  })()
}
for(const [name,content] of [['local',source],['global',global]]){const result=await run(name,content);assert.equal(result.status,0,result.output);console.log('PASS: '+name+' generic SFC props, slots and events with strict templates/unknown-prop checking')}
for(const [name,content,expected] of [
  ['slot-negative',source.replace('item.details.count.toFixed(0)','item.details.missing.toFixed(0)'),/TS2339.*missing/],
  ['key-negative',source.replace('item => item.id','item => true'),/TS2322/],
  ['prop-negative',source.replace('id="sortable-proof"','id="sortable-proof" :required="true"'),/TS2353|TS2322/],
]){const result=await run(name,content);assert.notEqual(result.status,0,name+' must fail, not silently become any');assert.match(result.output,expected);console.log('PASS: '+name+' rejected by real vue-tsc')}
