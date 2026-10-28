import assert from 'node:assert/strict'
import {mkdir,readFile,writeFile} from 'node:fs/promises'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
const root=new URL('../',import.meta.url),starter=new URL('examples/vue-vuetify/',root),target=process.argv.find(arg=>arg.startsWith('--consumer='))?.slice(11),consumer=target?new URL(target.replace(/\/?$/,'/'),root):starter,directory=new URL('.runtime-test/combobox-types/',consumer),installed=!!target||process.argv.includes('--installed')
if(target)assert.ok(consumer.href.startsWith(new URL('qa-output/',root).href),'Explicit fixtures stay in qa-output')
await mkdir(directory,{recursive:true})
const proof=await readFile(new URL('src/proofs/combobox.vue',starter),'utf8'),source=target?proof.replace('<script setup lang="ts">','<script setup lang="ts">\nimport { ref } from \'vue\''):proof,withoutImport=source.replace(/^import \{ SCombobox \} from 'solyi-ui'\r?\n/m,''),global=target?withoutImport:withoutImport.replaceAll('<SCombobox','<ProofSCombobox').replaceAll('</SCombobox','</ProofSCombobox')
await writeFile(new URL('global.d.ts',directory),`import type {SCombobox} from ${JSON.stringify(installed?'solyi-ui':'../../../../packages/vue-ui/src/index')};declare module 'vue' {interface GlobalComponents {ProofSCombobox:typeof SCombobox}}export {}\n`)
const compiler=fileURLToPath(new URL('node_modules/vue-tsc/bin/vue-tsc.js',starter))
async function run(name,content){
 await writeFile(new URL(name+'.vue',directory),content)
 const config=new URL(name+'.json',directory)
 await writeFile(config,JSON.stringify(target?{compilerOptions:{target:'ES2022',module:'ESNext',moduleResolution:'Bundler',strict:true,skipLibCheck:true,types:[],lib:['ES2022','DOM'],noEmit:true},vueCompilerOptions:{strictTemplates:true,checkUnknownProps:true},files:['global.d.ts','../../node_modules/solyi-ui/dist/global.d.ts',name+'.vue']}:{extends:'../../tsconfig.recipes.json',compilerOptions:{types:[],paths:installed?{}:{'solyi-ui':['../../../../packages/vue-ui/src/index.ts'],'solyi-ui/global':['../../../../packages/vue-ui/src/global.ts']}},vueCompilerOptions:{strictTemplates:true,checkUnknownProps:true},files:['global.d.ts','../../src/auto-imports.d.ts',installed?'../../node_modules/solyi-ui/dist/global.d.ts':'../../../../packages/vue-ui/src/global.ts','../../node_modules/vite/client.d.ts'],include:[name+'.vue']},null,2))
 try{return {status:0,output:execFileSync(process.execPath,[compiler,'--noEmit','-p',fileURLToPath(config)],{cwd:fileURLToPath(root),encoding:'utf8',stdio:'pipe'})}}
 catch(error){return {status:error.status,output:String(error.stdout||'')+String(error.stderr||'')}}
}
for(const [name,content]of [['local',source],['global',global]]){const result=await run(name,content);assert.equal(result.status,0,result.output);console.log('PASS: '+name+' Combobox props, discriminated events, slots and public handle')}
for(const [name,content,expected]of [
 ['model-negative',source.replace('ref<string|null>(null)','ref<number|null>(null)'),/TS2322/],
 ['commit-negative',source.replace("['enter', 'blur']","['change']"),/TS2322/],
 ['event-negative',source.replace('event.option.value.toUpperCase()','event.option.value.toFixed(0)'),/TS2551.*toFixed/],
 ['reason-negative',source.replace("event.reason === 'select'","event.reason === 'custom'"),/TS18048.*option/],
 ['slot-negative',source.replace('error.toUpperCase()','error.missing'),/TS2339.*missing/],
 ['prop-negative',source.replace('clearable loading','clearable loading allow-custom'),/TS2353|TS2322/],
 ['handle-negative',source.replace('handle?.retry()','handle?.commit()'),/TS2339.*commit/],
]){const result=await run(name,content);assert.notEqual(result.status,0,name+' must fail');assert.match(result.output,expected);console.log('PASS: '+name+' rejected by strict vue-tsc')}
