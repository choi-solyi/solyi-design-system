/* Read-only release diagnosis. Builds only ignored fixtures; never changes a budget or release. */
import {readFile,writeFile,mkdir,cp} from 'node:fs/promises'
import {createRequire} from 'node:module'
import {gzipSync} from 'node:zlib'
import {fileURLToPath} from 'node:url'
const root=new URL('../',import.meta.url),fixtures=new URL('qa-output/combobox-final-c4f3011/',root),out=new URL('qa-output/release-size-analysis/',root)
await mkdir(out,{recursive:true})
const {build}=await import(new URL('consumer/node_modules/vite/dist/node/index.js',fixtures))
const names=['bare_vue','setup_only','SBtn','SChip','SIcon','STextField','SDatePicker','STimePicker','SCombobox','all_plugin']
const size=text=>({bytes:Buffer.byteLength(text),gzipBytes:gzipSync(text,{level:9}).length})
const report={scope:'Frozen 1.0.0 versus completed c4f3011 candidate; unexported Picker WIP is excluded',compression:'Node gzipSync level 9; production minification by Vite 8.3.4',fixtures:[],probes:[]}
const prototype=new URL('pure-prototype/solyi-ui/',out)
await cp(new URL('consumer/node_modules/solyi-ui/',fixtures),prototype,{recursive:true})
const prototypeFile=new URL('dist/index.js',prototype),prototypeText=await readFile(prototypeFile,'utf8'),require=createRequire(new URL('consumer/package.json',fixtures)),ts=require('typescript'),program=ts.createProgram([fileURLToPath(prototypeFile)],{allowJs:true,noResolve:true,noEmit:true}),checker=program.getTypeChecker(),ast=program.getSourceFile(fileURLToPath(prototypeFile))
let imported
for(const node of ast.statements)if(ts.isImportDeclaration(node)&&node.moduleSpecifier.text==='vue'&&ts.isNamedImports(node.importClause?.namedBindings))for(const specifier of node.importClause.namedBindings.elements)if((specifier.propertyName||specifier.name).text==='defineComponent')imported=checker.getSymbolAtLocation(specifier.name)
const inserts=[]
function visit(node){if(ts.isCallExpression(node)&&ts.isIdentifier(node.expression)&&checker.getSymbolAtLocation(node.expression)===imported)inserts.push(node.getStart());ts.forEachChild(node,visit)}visit(ast)
if(!imported||!inserts.length)throw Error('No verified defineComponent binding for the isolated prototype')
let annotated=prototypeText;for(const at of inserts.sort((a,b)=>b-a))annotated=annotated.slice(0,at)+'/*@__PURE__*/'+annotated.slice(at)
await writeFile(prototypeFile,annotated);report.prototype={purpose:'Isolated copied installed module; no package source/build/gate change',annotation:'Only calls resolved by TypeScript to the imported Vue defineComponent binding',calls:inserts.length}
for(const kind of ['baseline','consumer','pure-prototype']){
 const directory=new URL((kind==='pure-prototype'?'consumer':kind)+'/',fixtures),ui=kind==='pure-prototype'?prototype:new URL('node_modules/solyi-ui/',directory),entryDir=new URL('.size-probe/',directory)
 await mkdir(entryDir,{recursive:true})
 const source=await readFile(new URL('dist/index.js',ui),'utf8'),global=await readFile(new URL('dist/global.d.ts',ui),'utf8'),components=[...global.matchAll(/^\s+(S[A-Z]\w*):/gm)].map(match=>match[1])
 const metadata=JSON.parse(await readFile(new URL('package.json',ui),'utf8'))
 report.fixtures.push({kind,version:metadata.version,componentCount:components.length,esmCharacters:source.length,...size(source),sideEffects:metadata.sideEffects,peerDependencies:metadata.peerDependencies,imports:[...source.matchAll(/from\s+["']([^"']+)["']/g)].map(match=>match[1])})
 for(const name of names){
  if(!['all_plugin','setup_only','bare_vue'].includes(name)&&!components.includes(name))continue
  if(kind==='pure-prototype'&&!['SIcon','SCombobox','all_plugin'].includes(name))continue
  for(const mode of name==='SBtn'&&kind!=='pure-prototype'?['peers-external','app-bundled','app-with-css']:['peers-external','app-bundled']){
   const entry=new URL('entry.js',entryDir),selected=name==='all_plugin'?'SolyiUI':name
   const apiImport=name==='all_plugin'?"import SolyiUI,{createSolyiVuetify} from 'solyi-ui'":"import {"+name+",createSolyiVuetify} from 'solyi-ui'"
   const content=(mode==='app-with-css'?"import 'solyi-ui/all.css';":'')+(name==='bare_vue'?"import {createApp,h} from 'vue';window.solyiSizeProbe=()=>createApp({render:()=>h('main','Probe')});":name==='setup_only'?"import {createApp,h} from 'vue';import {createSolyiVuetify} from 'solyi-ui';const v=createSolyiVuetify();window.solyiSizeProbe=()=>createApp({render:()=>h('main','Probe')}).use(v);":mode==='peers-external'?(name==='all_plugin'?"import SolyiUI from 'solyi-ui';window.solyiSizeProbe=SolyiUI;":"import {"+name+"} from 'solyi-ui';window.solyiSizeProbe="+name+';'):"import {createApp,h} from 'vue';"+apiImport+";const vuetify=createSolyiVuetify();window.solyiSizeProbe=()=>{const app=createApp({render:()=>h("+(name==='all_plugin'?"'main'":selected)+",{id:'probe',label:'Probe',name:'edit',content:'Probe'})});app.use(vuetify);"+(name==='all_plugin'?'app.use(SolyiUI);':'')+"return app};")
   await writeFile(entry,content)
   const external=id=>mode==='peers-external'&&(id==='vue'||id.startsWith('vue/')||id==='vuetify'||id.startsWith('vuetify/'))
   const result=await build({root:fileURLToPath(directory),configFile:false,logLevel:'error',resolve:{dedupe:['vue','vuetify'],...(kind==='pure-prototype'?{alias:[{find:/^solyi-ui$/,replacement:fileURLToPath(prototypeFile)}]}:{})},build:{write:false,minify:true,cssMinify:true,rolldownOptions:{input:fileURLToPath(entry),external,output:{format:'es'}}}})
   const js=result.output.filter(item=>item.type==='chunk'),css=result.output.filter(item=>item.type==='asset'&&item.fileName.endsWith('.css')),code=js.map(item=>item.code).join('\n'),styles=css.map(item=>String(item.source)).join('\n')
   const modules=[...new Set(js.flatMap(item=>Object.keys(item.modules||{})))].map(file=>file.replaceAll('\\','/'))
   const fonts=result.output.filter(item=>item.type==='asset'&&/\.(?:woff2?|ttf|otf)$/.test(item.fileName))
   const record={fixture:kind,name,mode,javascript:size(code),css:size(styles),fontAssets:{count:fonts.length,bytes:fonts.reduce((total,item)=>total+Buffer.byteLength(item.source),0)},chunks:js.length,retainedNameStrings:components.filter(component=>code.includes(component)),modules:{all:modules.length,vue:modules.filter(file=>/node_modules\/(?:@vue|vue)\//.test(file)).length,vuetify:modules.filter(file=>file.includes('/node_modules/vuetify/')).length,ui:modules.filter(file=>file.includes('/node_modules/solyi-ui/')).length}}
   report.probes.push(record);console.log(kind+' '+name+' '+mode+': JS '+record.javascript.bytes+' / gzip '+record.javascript.gzipBytes+'; CSS '+record.css.bytes+'; retained names '+record.retainedNameStrings.length)
  }
 }
}
await writeFile(new URL('report.json',out),JSON.stringify(report,null,2)+'\n')
