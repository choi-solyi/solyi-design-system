import assert from 'node:assert/strict'
import {readFile,readdir} from 'node:fs/promises'
import {gzipSync} from 'node:zlib'
import {createHash} from 'node:crypto'

// Legacy filename retained for existing command paths. Numeric caps are retired.
export const sizeProfiles=JSON.parse(await readFile(new URL('../documentation/development/LIBRARY-SIZE-BUDGETS.json',import.meta.url),'utf8'))
export function assertComponentInventory(version,components){
 const profile=sizeProfiles.versions[version]
 assert.ok(profile,'No public component inventory for '+version)
 assert.deepEqual([...components].sort(),[...profile.components].sort(),'Exact public component set remains a package contract')
 return profile
}
export function assertMeasurement(metrics){
 for(const [name,value]of Object.entries(metrics))assert.ok(Number.isFinite(value)&&value>=0,'Valid nonnegative size measurement: '+name)
}
export function assertMeasuredImport(version,name,metrics){
 assert.ok(sizeProfiles.versions[version]?.imports.includes(name),'No named-import measurement entry for '+version+'/'+name)
 assertMeasurement(metrics)
}
export function measurementDelta(metrics,reference){
 return Object.fromEntries(Object.entries(metrics).filter(([name])=>Number.isFinite(reference?.[name])).map(([name,value])=>[name,value-reference[name]]))
}
export async function measureSource(directory){
 const source=await readFile(new URL('dist/index.js',directory),'utf8'),global=await readFile(new URL('dist/global.d.ts',directory),'utf8')
 const components=[...global.matchAll(/^\s+(S[A-Z]\w*):/gm)].map(match=>match[1])
 const files=[]
 async function visit(url){for(const entry of await readdir(url,{withFileTypes:true})){const file=new URL(entry.name+(entry.isDirectory()?'/':''),url);if(entry.isDirectory())await visit(file);else if(entry.name.endsWith('.js'))files.push(await readFile(file))}}
 await visit(new URL('dist/',directory))
 return {components,indexSha256:createHash('sha256').update(source).digest('hex'),metrics:{characters:source.length,bytes:Buffer.byteLength(source),gzipBytes:gzipSync(source,{level:9}).length,totalJavaScriptBytes:files.reduce((sum,file)=>sum+file.length,0),totalJavaScriptGzipBytes:files.reduce((sum,file)=>sum+gzipSync(file,{level:9}).length,0),javascriptFiles:files.length}}
}
