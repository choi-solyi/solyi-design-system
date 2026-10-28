/* Compare the frozen release and the candidate with identical compiler/options/peers. */
import assert from 'node:assert/strict'
import {writeFile} from 'node:fs/promises'
import {createRequire} from 'node:module'
import {fileURLToPath} from 'node:url'
const root=new URL('../',import.meta.url),target=process.argv.find(arg=>arg.startsWith('--fixtures='))?.slice(11)||'qa-output/combobox-final-c4f3011/',fixtures=new URL(target.replace(/\/?$/,'/'),root)
assert.ok(fixtures.href.startsWith(new URL('qa-output/',root).href),'Fixtures stay in qa-output')
const normalize=file=>file.replaceAll('\\','/'),reports=[]
const variants=[['library','consumer/node_modules/typescript/package.json'],['starter',null]]
for(const [name,location]of variants){
 const require=createRequire(location?new URL(location,fixtures):new URL('examples/vue-vuetify/package.json',root)),ts=require('typescript'),results={}
 for(const fixture of ['baseline','consumer']){
  const directory=new URL(fixture+'/',fixtures),entry=new URL('declaration-import.ts',directory),prefix=normalize(fileURLToPath(directory)),own=prefix+'node_modules/solyi-ui/dist/'
  await writeFile(entry,"import {sComponents,uiVersion} from 'solyi-ui';import 'solyi-ui/global';void sComponents;void uiVersion;\n")
  const options={target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext,moduleResolution:ts.ModuleResolutionKind.Bundler,strict:true,noEmit:true,skipLibCheck:false,types:[],lib:['lib.es2022.d.ts','lib.dom.d.ts']}
  const program=ts.createProgram([fileURLToPath(entry)],options),diagnostics=ts.getPreEmitDiagnostics(program).filter(item=>item.category===ts.DiagnosticCategory.Error)
  const external=[],ownErrors=[],fixtureErrors=[]
  for(const item of diagnostics){
   const file=normalize(item.file?.fileName||'')
   const message=ts.flattenDiagnosticMessageText(item.messageText,'\n').replaceAll(fileURLToPath(directory),'<fixture>/').replaceAll(prefix,'<fixture>/')
   const key=JSON.stringify({file:file.includes('/node_modules/')?file.slice(file.indexOf('/node_modules/')+1):file.replace(prefix,'<fixture>/'),code:item.code,start:item.start,length:item.length,message})
   if(file.startsWith(own))ownErrors.push(key)
   else if(!file.includes('/node_modules/'))fixtureErrors.push(key)
   else external.push(key)
  }
  assert.deepEqual(ownErrors,[],fixture+' own declarations')
  assert.deepEqual(fixtureErrors,[],fixture+' import/global fixture')
  const skipped=ts.getPreEmitDiagnostics(ts.createProgram([fileURLToPath(entry)],{...options,skipLibCheck:true})).filter(item=>item.category===ts.DiagnosticCategory.Error)
  assert.equal(skipped.length,0,fixture+' skipLibCheck:true consumer import')
  results[fixture]={own:ownErrors.length,fixture:fixtureErrors.length,external:external.sort(),skipLibCheckTrue:skipped.length}
 }
 const baseline=new Set(results.baseline.external),candidate=new Set(results.consumer.external),added=[...candidate].filter(item=>!baseline.has(item)),removed=[...baseline].filter(item=>!candidate.has(item))
 assert.deepEqual(added,[],'No added external diagnostics: '+ts.version)
 assert.deepEqual(removed,[],'Same external declaration baseline: '+ts.version)
 const report={compiler:name,version:ts.version,options:{strict:true,skipLibCheck:false,target:'ES2022',module:'ESNext',moduleResolution:'Bundler',types:[],lib:['ES2022','DOM']},baseline:{...results.baseline,external:baseline.size},candidate:{...results.consumer,external:candidate.size},added:added.length,removed:removed.length}
 reports.push(report);console.log('PASS: TypeScript '+ts.version+'; frozen/candidate own=0; external '+baseline.size+'/'+candidate.size+'; added=0 removed=0; skipLibCheck:true=0/0')
}
await writeFile(new URL('declaration-comparison.json',fixtures),JSON.stringify({reports,scope:'Same import/global fixture and pinned peers; external errors remain unsuppressed and separately reported'},null,2))
