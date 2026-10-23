import assert from 'node:assert/strict';
import {readFile,writeFile,cp,copyFile,readdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=new URL('../',import.meta.url),dist=new URL('packages/vue-ui/dist/',root);
const corePaths={'@solyi/core':'index.js','@solyi/core/date':'date-only.js','@solyi/core/icons':'icons.js','@solyi/core/overflow':'overflow.js'};
// Copy only the framework-independent build: no brand marks, site content or repository files.
await cp(new URL('packages/core/dist/',root),new URL('core/',dist),{recursive:true});
await copyFile(new URL('packages/core/LICENSE',root),new URL('core/LICENSE',dist));
async function finalize(directory){
  for(const entry of await readdir(directory,{withFileTypes:true})){
    const file=new URL(entry.name,directory);
    if(entry.isDirectory()){await finalize(new URL(entry.name+'/',directory));continue;}
    if(!/\.(?:js|d\.ts)$/.test(entry.name))continue;
    let source=await readFile(file,'utf8');
    if(entry.name==='index.d.ts'&&directory.href===dist.href)source=source.replace("import './styles.css';\n",'');
    // Declaration emit preserves source module names, so make those local as well.
    source=source.replace(/(['"])(@solyi\/core(?:\/[\w-]+)?)\1/g,(match,quote,id)=>{
      assert.ok(corePaths[id],`Unknown internal Core runtime: ${id}`);
      let relative=path.relative(path.dirname(fileURLToPath(file)),fileURLToPath(new URL('core/'+corePaths[id],dist))).replaceAll('\\','/');
      if(!relative.startsWith('.'))relative='./'+relative;
      return quote+relative+quote;
    });
    assert.doesNotMatch(source,/['"]@solyi\/core(?:\/|['"])/,'Published runtime and types resolve within solyi-ui');
    await writeFile(file,source);
  }
}
await finalize(dist);
// Explicit opt-in global template types; the runtime module has no side effects.
await writeFile(new URL('global.js',dist),'export {};\n');
console.log('Finalized solyi-ui with local Core runtime, tokens, CSS, fonts and license notices.');
