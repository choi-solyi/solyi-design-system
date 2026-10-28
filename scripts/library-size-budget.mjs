import assert from 'node:assert/strict'
import {readFile,readdir} from 'node:fs/promises'
import {gzipSync} from 'node:zlib'

export const budgets=JSON.parse(await readFile(new URL('../documentation/development/LIBRARY-SIZE-BUDGETS.json',import.meta.url),'utf8'))
export function assertSourceBudget(version,metrics,components){
 const budget=budgets.versions[version]
 assert.ok(budget,'No reviewed library size budget for '+version)
 assert.deepEqual([...components].sort(),[...budget.components].sort(),'Size budget covers this exact public component set')
 assert.ok(metrics.characters<budget.maxCharactersExclusive,'ESM component-source budget: '+metrics.characters+' < '+budget.maxCharactersExclusive+' characters ('+version+')')
 if(budget.maxGzipBytes!==undefined)assert.ok(metrics.gzipBytes<=budget.maxGzipBytes,'ESM gzip budget: '+metrics.gzipBytes+' <= '+budget.maxGzipBytes)
 if(budget.maxTotalJavaScriptBytes!==undefined)assert.ok(metrics.totalJavaScriptBytes<=budget.maxTotalJavaScriptBytes,'All shipped JS byte budget includes every entry and embedded Core')
 if(budget.maxTotalJavaScriptGzipBytes!==undefined)assert.ok(metrics.totalJavaScriptGzipBytes<=budget.maxTotalJavaScriptGzipBytes,'All shipped JS gzip sum budget includes every entry and embedded Core')
 return budget
}
export function assertImportBudget(version,name,metrics){
 const limit=budgets.versions[version]?.imports?.[name]
 assert.ok(limit,'No reviewed named-import budget for '+version+'/'+name)
 assert.ok(metrics.gzipBytes<=limit.maxGzipBytes,name+' peer-external gzip budget: '+metrics.gzipBytes+' <= '+limit.maxGzipBytes)
}
export async function measureSource(directory){
 const source=await readFile(new URL('dist/index.js',directory),'utf8'),global=await readFile(new URL('dist/global.d.ts',directory),'utf8')
 const components=[...global.matchAll(/^\s+(S[A-Z]\w*):/gm)].map(match=>match[1])
 const files=[]
 async function visit(url){for(const entry of await readdir(url,{withFileTypes:true})){const file=new URL(entry.name+(entry.isDirectory()?'/':''),url);if(entry.isDirectory())await visit(file);else if(entry.name.endsWith('.js'))files.push(await readFile(file))}}
 await visit(new URL('dist/',directory))
 return {components,metrics:{characters:source.length,bytes:Buffer.byteLength(source),gzipBytes:gzipSync(source,{level:9}).length,totalJavaScriptBytes:files.reduce((sum,file)=>sum+file.length,0),totalJavaScriptGzipBytes:files.reduce((sum,file)=>sum+gzipSync(file,{level:9}).length,0),javascriptFiles:files.length}}
}
