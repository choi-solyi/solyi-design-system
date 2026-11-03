import assert from 'node:assert/strict'
import {readFile} from 'node:fs/promises'
import {assertSourceBudget,assertImportBudget,budgets} from './library-size-budget.mjs'
const root=new URL('../',import.meta.url)
const legacy={metrics:{characters:175999},components:budgets.versions['1.0.0'].components}
assertSourceBudget('1.0.0',legacy.metrics,legacy.components)
assert.equal(budgets.versions['1.0.0'].maxCharactersExclusive,176000,'Retain the original exclusive 1.0.0 character budget')
assert.throws(()=>assertSourceBudget('1.0.0',{...legacy.metrics,characters:176000},legacy.components),/ESM component-source budget/)
for(const version of ['1.1.0','1.1.1']){
const budget=budgets.versions[version],metrics={characters:budget.maxCharactersExclusive-1,gzipBytes:budget.maxGzipBytes,totalJavaScriptBytes:budget.maxTotalJavaScriptBytes,totalJavaScriptGzipBytes:budget.maxTotalJavaScriptGzipBytes}
assertSourceBudget(version,metrics,budget.components)
for(const [key,limit]of [['characters',budget.maxCharactersExclusive],['gzipBytes',budget.maxGzipBytes+1],['totalJavaScriptBytes',budget.maxTotalJavaScriptBytes+1],['totalJavaScriptGzipBytes',budget.maxTotalJavaScriptGzipBytes+1]])assert.throws(()=>assertSourceBudget(version,{...metrics,[key]:limit},budget.components),undefined,key+' oversized result rejects')
assert.throws(()=>assertSourceBudget('9.9.9',metrics,budget.components),/No reviewed/)
assert.throws(()=>assertSourceBudget(version,metrics,budget.components.slice(1)),/exact public/)
assert.throws(()=>assertSourceBudget(version,metrics,[...budget.components.slice(1),'SFake']),/exact public/)
for(const [name,limit]of Object.entries(budget.imports)){
 assertImportBudget(version,name,{gzipBytes:limit.maxGzipBytes})
 assert.throws(()=>assertImportBudget(version,name,{gzipBytes:limit.maxGzipBytes+1}),/gzip budget/)
}
assert.throws(()=>assertImportBudget(version,'SFake',{gzipBytes:0}),/No reviewed/)
}
assert.deepEqual(budgets.versions['1.1.1'].components.filter(name=>name!=='SBtnGroup'),budgets.versions['1.1.0'].components,'Candidate preserves all fifty existing exports');
for(const key of ['maxCharactersExclusive','maxGzipBytes','maxTotalJavaScriptBytes','maxTotalJavaScriptGzipBytes'])assert.equal(budgets.versions['1.1.1'][key],budgets.versions['1.1.0'][key],'Candidate preserves existing cap '+key);
const source=await readFile(new URL('scripts/library-contract-check.mjs',root),'utf8')
assert.ok(source.indexOf('assertSourceBudget(ui.version')<source.indexOf("const types=await readFile"),'The versioned gate remains before declaration/content checks at its original point')
console.log('PASS: frozen 1.0.0 budget, new minor source/total/gzip/import boundaries, exact APIs, unknown-version rejection and unchanged gate ordering')

const approved=budgets.versions['1.1.1'].imports.STimeGrid.approvedException
assert.equal(budgets.versions['1.1.1'].imports.STimeGrid.maxGzipBytes,17408,'Normal TimeGrid cap remains 17KiB')
assert.equal(approved.maxGzipBytes,17464,'Approval is limited to 56 bytes')
assert.match(approved.indexSha256,/^[a-f0-9]{64}$/)
const current={gzipBytes:17464,indexSha256:approved.indexSha256}
assert.equal(assertImportBudget('1.1.1','STimeGrid',current).id,approved.id)
for(const metrics of [{...current,gzipBytes:17465},{...current,indexSha256:'0'.repeat(64)},{gzipBytes:17464}])assert.throws(()=>assertImportBudget('1.1.1','STimeGrid',metrics),/gzip budget/)
assert.throws(()=>assertImportBudget('1.1.0','STimeGrid',current),/gzip budget/)
assert.throws(()=>assertImportBudget('1.1.1','SIcon',current),/gzip budget/)
console.log('PASS: exact-index 1.1.1 TimeGrid 56B exception; missing/different code, excess bytes, other versions and APIs still reject')
