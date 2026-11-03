import assert from 'node:assert/strict'
import {readFile} from 'node:fs/promises'
import {assertComponentInventory,assertMeasurement,assertMeasuredImport,measurementDelta,sizeProfiles} from './library-size-budget.mjs'
const root=new URL('../',import.meta.url)
assert.equal(sizeProfiles.mode,'report-only')
assert.ok(!/maxCharactersExclusive|maxGzipBytes|maxTotalJavaScript|approvedException/.test(JSON.stringify(sizeProfiles)),'No active size caps or per-file exceptions')
for(const [version,profile]of Object.entries(sizeProfiles.versions)){
 assertComponentInventory(version,profile.components)
 assert.throws(()=>assertComponentInventory(version,profile.components.slice(1)),/Exact public/)
 assert.throws(()=>assertComponentInventory(version,[...profile.components.slice(1),'SFake']),/Exact public/)
 // The former boundaries and larger results must be reportable, not rejected.
 for(const characters of [176000,300000,1000000])assertMeasurement({characters,gzipBytes:1000000,totalJavaScriptBytes:1000000,totalJavaScriptGzipBytes:1000000})
 for(const name of profile.imports)assertMeasuredImport(version,name,{bytes:Number.MAX_SAFE_INTEGER,gzipBytes:1000000})
 assert.throws(()=>assertMeasuredImport(version,'SFake',{bytes:1,gzipBytes:1}),/No named-import/)
}
assert.throws(()=>assertComponentInventory('9.9.9',[]),/No public component inventory/)
for(const value of [-1,NaN,Infinity,undefined])assert.throws(()=>assertMeasurement({gzipBytes:value}),/Valid nonnegative/)
assert.deepEqual(measurementDelta({bytes:110,gzipBytes:90},{bytes:100,gzipBytes:95}),{bytes:10,gzipBytes:-5})
assert.deepEqual(measurementDelta({bytes:110}),{},'No fabricated delta without a measured reference')
assert.deepEqual(sizeProfiles.versions['1.1.1'].components.filter(name=>name!=='SBtnGroup'),sizeProfiles.versions['1.1.0'].components,'Candidate preserves all fifty existing exports')
const source=await readFile(new URL('scripts/library-contract-check.mjs',root),'utf8')
assert.ok(source.indexOf('assertComponentInventory(ui.version')<source.indexOf("const types=await readFile"),'Exact API inventory remains a required package check')
const measurement=await readFile(new URL('scripts/library-size-check.mjs',root),'utf8')
assert.ok(measurement.includes('An observable import survives')&&measurement.includes('Peers are external'),'Bundler and peer validation remain required')
console.log('PASS: report-only sizes and signed deltas; exact public APIs, valid measurements, unknown-version/import rejection and peer checks preserved')
