import assert from 'node:assert/strict'
import {mkdir,readFile,writeFile} from 'node:fs/promises'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
const root=new URL('../',import.meta.url),starter=new URL('examples/vue-vuetify/',root),directory=new URL('.runtime-test/month-calendar-types/',starter),installed=process.argv.includes('--installed')
await mkdir(directory,{recursive:true})
const source=await readFile(new URL('src/proofs/month-calendar.vue',starter),'utf8'),global=source.replace(/^import \{ SMonthCalendar \}[^\n]*\n/m,'').replaceAll('SMonthCalendar','MonthGlobalProof')
await writeFile(new URL('global.d.ts',directory),`import type {SMonthCalendar} from ${JSON.stringify(installed?'solyi-ui':'../../../../packages/vue-ui/src/index')};declare module 'vue' {interface GlobalComponents {MonthGlobalProof:typeof SMonthCalendar}}export {}\n`)
const compiler=fileURLToPath(new URL('node_modules/vue-tsc/bin/vue-tsc.js',starter))
async function run(name,content){
 await writeFile(new URL(name+'.vue',directory),content)
 const config=new URL(name+'.json',directory)
 await writeFile(config,JSON.stringify({extends:'../../tsconfig.recipes.json',compilerOptions:{types:[],paths:installed?{}:{'solyi-ui':['../../../../packages/vue-ui/src/index.ts'],'solyi-ui/global':['../../../../packages/vue-ui/src/global.ts']}},vueCompilerOptions:{strictTemplates:true,checkUnknownProps:true},files:['global.d.ts','../../src/auto-imports.d.ts',installed?'../../node_modules/solyi-ui/dist/global.d.ts':'../../../../packages/vue-ui/src/global.ts','../../node_modules/vite/client.d.ts'],include:[name+'.vue']},null,2))
 try{return {status:0,output:execFileSync(process.execPath,[compiler,'--noEmit','-p',fileURLToPath(config)],{cwd:fileURLToPath(root),encoding:'utf8',stdio:'pipe'})}}
 catch(error){return {status:error.status,output:String(error.stdout||'')+String(error.stderr||'')}}
}
for(const [name,content] of [['local',source],['global',global]]){const result=await run(name,content);assert.equal(result.status,0,result.output);console.log('PASS: '+name+' MonthCalendar props/events/slots and exposed handle')}
for(const [name,content,expected] of [
 ['slot-negative',source.replace('daily[0]?.label','daily[0]?.missing'),/TS2339.*missing/],
 ['callback-negative',source.replace("date => date.endsWith('-10')",'date => date'),/TS2322/],
 ['marker-negative',source.replace("id:'m'",'id:true'),/TS2322/],
 ['prop-negative',source.replace('id="month-proof"','id="month-proof" :required="true"'),/TS2353|TS2322/],
]){const result=await run(name,content);assert.notEqual(result.status,0,name+' must fail');assert.match(result.output,expected);console.log('PASS: '+name+' rejected by real strict vue-tsc')}
