/* Compare real installed before/after tarballs with the same version and dependency pins. */
import assert from 'node:assert/strict'
import {readFile,writeFile,readdir,mkdir} from 'node:fs/promises'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import {gzipSync} from 'node:zlib'
import {measureSource} from './library-size-budget.mjs'
const root=new URL('../',import.meta.url),arg=process.argv.find(value=>value.startsWith('--fixtures='))?.slice(11)
assert.ok(arg,'Pass --fixtures=qa-output/<comparison>/ with installed before/after consumers')
const out=new URL(arg.replace(/\/?$/,'/'),root)
assert.ok(out.href.startsWith(new URL('qa-output/',root).href))
const ts=(await import(new URL('packages/vue-ui/node_modules/typescript/lib/typescript.js',root))).default
const config=ts.readConfigFile(fileURLToPath(new URL('packages/vue-ui/tsconfig.json',root)),ts.sys.readFile),parsed=ts.parseJsonConfigFileContent(config.config,ts.sys,fileURLToPath(new URL('packages/vue-ui/',root))),program=ts.createProgram(parsed.fileNames,parsed.options),checker=program.getTypeChecker(),printer=ts.createPrinter({removeComments:true})
const annotations=[]
for(const ast of program.getSourceFiles().filter(file=>!file.isDeclarationFile&&file.fileName.replaceAll('\\','/').includes('/packages/vue-ui/src/'))){
 const bindings=new Set()
 for(const node of ast.statements)if(ts.isImportDeclaration(node)&&node.moduleSpecifier.text==='vue'&&ts.isNamedImports(node.importClause?.namedBindings))for(const specifier of node.importClause.namedBindings.elements)if((specifier.propertyName||specifier.name).text==='defineComponent')bindings.add(checker.getSymbolAtLocation(specifier.name))
 let count=0
 function visit(node){if(ts.isCallExpression(node)&&/\/\*\s*[@#]__PURE__\s*\*\/\s*$/.test(ast.text.slice(Math.max(0,node.getStart()-30),node.getStart()))){assert.ok(ts.isIdentifier(node.expression)&&bindings.has(checker.getSymbolAtLocation(node.expression)),'Only imported Vue defineComponent may be annotated: '+ast.fileName);assert.ok(node.arguments.length===1&&ts.isObjectLiteralExpression(node.arguments[0]));count++}ts.forEachChild(node,visit)}visit(ast)
 if(count){const relative=ast.fileName.replaceAll('\\','/').split('/solyi-design-system/').at(-1),before=execFileSync('git',['show','c440b03:'+relative],{cwd:fileURLToPath(root),encoding:'utf8'}),beforeAst=ts.createSourceFile(ast.fileName,before,ts.ScriptTarget.Latest,true);assert.equal(printer.printFile(ast),printer.printFile(beforeAst),'PURE-only source keeps the exact executable AST: '+relative);annotations.push({file:relative,count})}
}
assert.equal(annotations.reduce((sum,file)=>sum+file.count,0),42,'Review newly introduced annotations explicitly')
const report={baseline:'c440b03',scope:'Same-version PURE-only installed comparison; metadata preparation is tested separately',annotations,fixtures:[],probes:[],ssr:[]}
for(const kind of ['before','after']){
 const directory=new URL(kind+'/consumer/',out),ui=new URL('node_modules/solyi-ui/',directory),source=await measureSource(ui),{build}=await import(new URL('node_modules/vite/dist/node/index.js',directory)),fixture=new URL('.size-probe/',directory)
 report.fixtures.push({kind,...source});await mkdir(fixture,{recursive:true})
 for(const name of ['SIcon','SCombobox','all_plugin'])for(const mode of ['peers-external','app-bundled']){
  const entry=new URL('entry.js',fixture),selected=name==='all_plugin'?'SolyiUI':name
  await writeFile(entry,mode==='peers-external'?(name==='all_plugin'?"import SolyiUI from 'solyi-ui';window.solyiSizeProbe=SolyiUI;":"import {"+name+"} from 'solyi-ui';window.solyiSizeProbe="+name+';'):"import {createApp,h} from 'vue';import "+(name==='all_plugin'?"SolyiUI,{createSolyiVuetify}":"{"+name+",createSolyiVuetify}")+" from 'solyi-ui';window.solyiSizeProbe=()=>{const app=createApp({render:()=>h("+(name==='all_plugin'?"'main'":selected)+",{name:'edit',label:'Probe'})});app.use(createSolyiVuetify());"+(name==='all_plugin'?'app.use(SolyiUI);':'')+"return app};")
  const result=await build({root:fileURLToPath(directory),configFile:false,logLevel:'error',resolve:{dedupe:['vue','vuetify']},build:{write:false,minify:true,rolldownOptions:{input:fileURLToPath(entry),external:id=>mode==='peers-external'&&(id==='vue'||id.startsWith('vue/')||id==='vuetify'||id.startsWith('vuetify/')),output:{format:'es'}}}}),code=result.output.filter(item=>item.type==='chunk').map(item=>item.code).join('\n')
  assert.ok(code.length>0&&code.includes('solyiSizeProbe'),'Observable entry was retained')
  report.probes.push({kind,name,mode,bytes:Buffer.byteLength(code),gzipBytes:gzipSync(code,{level:9}).length,retainedNameStrings:source.components.filter(component=>code.includes(component))})
 }
 assert.equal(typeof window,'undefined');assert.equal(typeof document,'undefined')
 const ssrEntry=new URL('ssr-entry.ts',fixture)
 await writeFile(ssrEntry,"export * from 'solyi-ui';export {default as SolyiUI} from 'solyi-ui';export {createSSRApp,h} from 'vue';export {renderToString} from '@vue/server-renderer';export {VApp} from 'vuetify/components/VApp';")
 const built=await build({root:fileURLToPath(directory),configFile:false,logLevel:'error',resolve:{dedupe:['vue','vuetify']},ssr:{noExternal:true},build:{ssr:fileURLToPath(ssrEntry),write:false,minify:false,rolldownOptions:{external:['vue','@vue/server-renderer']}}})
 await writeFile(new URL('ssr.mjs',fixture),built.output.find(item=>item.type==='chunk').code)
 const api=await import(new URL('ssr.mjs',fixture)),html={},warnings=[],names=Object.keys(api.sComponents).sort()
 assert.deepEqual(names,[...source.components].sort(),'All named exports and global registry survive')
 const registry=api.createSSRApp({render:()=>null});registry.use(api.SolyiUI);for(const name of names)assert.equal(registry.component(name),api[name],name+' global installation retains named identity')
 for(const name of names){
  const special={STabs:{modelValue:'a'},SRangeSlider:{modelValue:[0,50]},SSortableList:{modelValue:[],itemKey:item=>item.id,itemLabel:item=>item.label},SIcon:{name:'close'},SIconBtn:{icon:'close'},SMonthCalendar:{month:'2026-10'}}[name]||{}
  const props={id:'probe',label:'Probe',title:'Probe',text:'Probe',content:'Probe',message:'Probe',caption:'Probe',primaryLabel:'First',secondaryLabel:'Second',columns:[],rows:[],items:[],options:[],...special}
  const app=api.createSSRApp({render:()=>api.h(api.VApp,{},()=>api.h(api[name],props,{default:()=> 'Content',primary:()=> 'First',secondary:()=> 'Second'}))});app.use(api.createSolyiVuetify());app.config.warnHandler=message=>warnings.push(name+': '+message)
  html[name]=(await api.renderToString(app)).replace(/v-\d+/g,'v-ID')
 }
 assert.deepEqual(warnings,[],'SSR emitted no component warnings');report.ssr.push({kind,components:names.length,html})
}
assert.deepEqual(report.ssr[0].html,report.ssr[1].html,'All 45 rendered SSR outputs remain identical')
async function files(directory,prefix=''){const all=[];for(const entry of await readdir(directory,{withFileTypes:true})){if(entry.isDirectory())all.push(...await files(new URL(entry.name+'/',directory),prefix+entry.name+'/'));else all.push(prefix+entry.name)}return all}
report.unchangedFiles=[]
for(const file of await files(new URL('before/consumer/node_modules/solyi-ui/dist/',out))){if(file==='index.js')continue;assert.deepEqual(await readFile(new URL('before/consumer/node_modules/solyi-ui/dist/'+file,out)),await readFile(new URL('after/consumer/node_modules/solyi-ui/dist/'+file,out)),file+' bytes unchanged');report.unchangedFiles.push(file)}
for(const name of ['SIcon','SCombobox']){const rows=report.probes.filter(row=>row.name===name&&row.mode==='peers-external');assert.ok(rows[1].gzipBytes<rows[0].gzipBytes/2,'Substantial real named-import reduction '+name)}
await writeFile(new URL('comparison.json',out),JSON.stringify(report,null,2)+'\n')
console.log('PASS: 42 safe annotations / identical executable source AST / 45 SSR outputs and global identities / '+report.unchangedFiles.length+' identical declaration, stylesheet and Core files / actual named-import reduction')
console.log(JSON.stringify(report.probes))
