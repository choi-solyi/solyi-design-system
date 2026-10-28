import assert from 'node:assert/strict'
import {mkdir,readFile,writeFile} from 'node:fs/promises'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
const root=new URL('../',import.meta.url),starter=new URL('examples/vue-vuetify/',root),directory=new URL('.runtime-test/input-control-types/',starter),installed=process.argv.includes('--installed')
await mkdir(directory,{recursive:true})
const source=await readFile(new URL('src/proofs/input-control.vue',starter),'utf8'),global=source.replace(/^import \{ STextField, STextarea, SSelect, SNumberInput \}[^\n]*\n/m,'').replaceAll('STextField','TextGlobalProof').replaceAll('STextarea','AreaGlobalProof').replaceAll('SSelect','SelectGlobalProof').replaceAll('SNumberInput','NumberGlobalProof')
await writeFile(new URL('global.d.ts',directory),`import type {STextField,STextarea,SSelect,SNumberInput} from ${JSON.stringify(installed?'solyi-ui':'../../../../packages/vue-ui/src/index')};declare module 'vue' {interface GlobalComponents {TextGlobalProof:typeof STextField;AreaGlobalProof:typeof STextarea;SelectGlobalProof:typeof SSelect;NumberGlobalProof:typeof SNumberInput}}export {}\n`)
const compiler=fileURLToPath(new URL('node_modules/vue-tsc/bin/vue-tsc.js',starter))
async function run(name,content){
 await writeFile(new URL(name+'.vue',directory),content)
 const config=new URL(name+'.json',directory)
 await writeFile(config,JSON.stringify({extends:'../../tsconfig.recipes.json',compilerOptions:{types:[],paths:installed?{}:{'solyi-ui':['../../../../packages/vue-ui/src/index.ts'],'solyi-ui/global':['../../../../packages/vue-ui/src/global.ts']}},vueCompilerOptions:{strictTemplates:true,checkUnknownProps:true},files:['global.d.ts','../../src/auto-imports.d.ts',installed?'../../node_modules/solyi-ui/dist/global.d.ts':'../../../../packages/vue-ui/src/global.ts','../../node_modules/vite/client.d.ts'],include:[name+'.vue']},null,2))
 try{return {status:0,output:execFileSync(process.execPath,[compiler,'--noEmit','-p',fileURLToPath(config)],{cwd:fileURLToPath(root),encoding:'utf8',stdio:'pipe'})}}
 catch(error){return {status:error.status,output:String(error.stdout||'')+String(error.stderr||'')}}
}
for(const [name,content]of [['local',source],['global',global]]){const result=await run(name,content);assert.equal(result.status,0,result.output);console.log('PASS: '+name+' text/textarea/select/number props, clear event, shared slots, number presets and public handle')}
for(const [name,content,expected]of [
 ['slot-negative',source.replace('error.toUpperCase()','error.missing'),/TS2339.*missing/],
 ['model-negative',source.replace('v-model="value"','v-model="true"'),/TS2322|Invalid v-model|must be a valid JavaScript/],
 ['event-negative',source.replace('SolInputClearEvent<string>','SolInputClearEvent<number>'),/TS2322/],
 ['reason-negative',source.replace('event.reason)','event.reason.missing)'),/TS2339.*missing/],
 ['prop-negative',source.replace('clearable loading','clearable loading :unknown-control="true"'),/TS2353|TS2322/],
 ['preset-negative',source.replace('presets[0]?.value.toFixed(0)','presets[0]?.value.missing'),/TS2339.*missing/],
 ['select-event-negative',source.replace('SolInputClearEvent<string|null>','SolInputClearEvent<number|null>'),/TS2322/],
]){const result=await run(name,content);assert.notEqual(result.status,0,name+' must fail');assert.match(result.output,expected);console.log('PASS: '+name+' rejected by real strict vue-tsc')}
