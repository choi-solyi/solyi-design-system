/* Build actual installed named imports. No source alias, CSS, runtime peer bytes or network. */
import assert from 'node:assert/strict'
import {mkdir,readFile,writeFile} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'
import {gzipSync} from 'node:zlib'
import {assertSourceBudget,assertImportBudget,measureSource} from './library-size-budget.mjs'
const root=new URL('../',import.meta.url),target=process.argv.find(arg=>arg.startsWith('--consumer='))?.slice(11),consumer=new URL(target?target.replace(/\/?$/,'/'):'examples/package-consumer/',root)
if(target)assert.ok(consumer.href.startsWith(new URL('qa-output/',root).href),'Explicit candidates stay in ignored qa-output')
const ui=new URL('node_modules/solyi-ui/',consumer),metadata=JSON.parse(await readFile(new URL('package.json',ui),'utf8')),source=await measureSource(ui)
const budget=assertSourceBudget(metadata.version,source.metrics,source.components)
const {build}=await import(new URL('node_modules/vite/dist/node/index.js',consumer)),fixture=new URL('.size-probe/',consumer),report={version:metadata.version,compression:'gzip level 9',...source,imports:[]}
await mkdir(fixture,{recursive:true})
for(const name of Object.keys(budget.imports||{})){
 const entry=new URL('entry.js',fixture)
 await writeFile(entry,name==='all_plugin'?"import SolyiUI from 'solyi-ui'; window.solyiSizeProbe=SolyiUI;":"import {"+name+"} from 'solyi-ui'; window.solyiSizeProbe="+name+';')
 const result=await build({root:fileURLToPath(consumer),configFile:false,logLevel:'error',build:{write:false,minify:true,rolldownOptions:{input:fileURLToPath(entry),external:id=>id==='vue'||id.startsWith('vue/')||id==='vuetify'||id.startsWith('vuetify/'),output:{format:'es'}}}})
 const chunks=result.output.filter(item=>item.type==='chunk'),code=chunks.map(item=>item.code).join('\n'),modules=chunks.flatMap(item=>Object.keys(item.modules||{})).map(file=>file.replaceAll('\\','/'))
 assert.ok(code.length>0&&code.includes('solyiSizeProbe'),'An observable import survives the app bundler')
 assert.ok(!modules.some(file=>/node_modules\/(?:vue|@vue|vuetify)\//.test(file)),'Peers are external in the component-only measurement')
 const metrics={name,bytes:Buffer.byteLength(code),gzipBytes:gzipSync(code,{level:9}).length,retainedNameStrings:source.components.filter(component=>code.includes(component))}
 assertImportBudget(metadata.version,name,metrics);report.imports.push(metrics)
}
await writeFile(new URL('size-budget-result.json',consumer),JSON.stringify(report,null,2)+'\n')
console.log('PASS: '+metadata.version+' / '+source.components.length+' exact public APIs / versioned source budgets / '+report.imports.length+' installed import gzip budgets')
console.log(JSON.stringify(report))
