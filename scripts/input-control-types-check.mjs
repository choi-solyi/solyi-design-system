import assert from 'node:assert/strict'
import {mkdir,readFile,writeFile} from 'node:fs/promises'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
const root=new URL('../',import.meta.url),starter=new URL('examples/vue-vuetify/',root),directory=new URL('.runtime-test/input-control-types/',starter),installed=process.argv.includes('--installed')
await mkdir(directory,{recursive:true})
const names=['STextField','STextarea','SSelect','SNumberInput','SAutocomplete','SMultiSelect'],source=await readFile(new URL('src/proofs/input-control.vue',starter),'utf8')
let global=source.replace(/^import \{[^}]+\} from 'solyi-ui'\r?\n/m,'')
for(const name of names)global=global.replaceAll(name,'Proof'+name)
await writeFile(new URL('global.d.ts',directory),`import type {${names.join(',')}} from ${JSON.stringify(installed?'solyi-ui':'../../../../packages/vue-ui/src/index')};declare module 'vue' {interface GlobalComponents {${names.map(name=>'Proof'+name+':typeof '+name).join(';')}}}export {}\n`)
const compiler=fileURLToPath(new URL('node_modules/vue-tsc/bin/vue-tsc.js',starter))
async function run(name,content){
 await writeFile(new URL(name+'.vue',directory),content)
 const config=new URL(name+'.json',directory)
 await writeFile(config,JSON.stringify({extends:'../../tsconfig.recipes.json',compilerOptions:{types:[],paths:installed?{}:{'solyi-ui':['../../../../packages/vue-ui/src/index.ts'],'solyi-ui/global':['../../../../packages/vue-ui/src/global.ts']}},vueCompilerOptions:{strictTemplates:true,checkUnknownProps:true},files:['global.d.ts','../../src/auto-imports.d.ts',installed?'../../node_modules/solyi-ui/dist/global.d.ts':'../../../../packages/vue-ui/src/global.ts','../../node_modules/vite/client.d.ts'],include:[name+'.vue']},null,2))
 try{return {status:0,output:execFileSync(process.execPath,[compiler,'--noEmit','-p',fileURLToPath(config)],{cwd:fileURLToPath(root),encoding:'utf8',stdio:'pipe'})}}
 catch(error){return {status:error.status,output:String(error.stdout||'')+String(error.stderr||'')}}
}
for(const [name,content]of [['local',source],['global',global]]){const result=await run(name,content);assert.equal(result.status,0,result.output);console.log('PASS: '+name+' six input props, clear events, shared slots, number presets and public handle')}
for(const [name,content,expected]of [
 ['slot-negative',source.replace('error.toUpperCase()','error.missing'),/TS2339.*missing/],
 ['model-negative',source.replace('v-model="value"','v-model="true"'),/TS2322|Invalid v-model|must be a valid JavaScript/],
 ['event-negative',source.replace('SolInputClearEvent<string>','SolInputClearEvent<number>'),/TS2322/],
 ['reason-negative',source.replace('event.reason)','event.reason.missing)'),/TS2339.*missing/],
 ['prop-negative',source.replace('clearable loading','clearable loading :unknown-control="true"'),/TS2353|TS2322/],
 ['preset-negative',source.replace('presets[0]?.value.toFixed(0)','presets[0]?.value.missing'),/TS2339.*missing/],
 ['select-event-negative',source.replace('SolInputClearEvent<string|null>','SolInputClearEvent<number|null>'),/TS2322/],
 ['multiple-event-negative',source.replace("event.value.join(',')","event.value.push('bad')"),/TS2339.*push/],
 ['selection-only-negative',source.replace('id="auto-proof"','id="auto-proof" :allow-custom="true"'),/TS2353|TS2322/],
]){const result=await run(name,content);assert.notEqual(result.status,0,name+' must fail');assert.match(result.output,expected);console.log('PASS: '+name+' rejected by real strict vue-tsc')}
