import assert from 'node:assert/strict';
import {readFile,readdir,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=fileURLToPath(new URL('../',import.meta.url));
const documents=[];
for(const entry of await readdir(root,{withFileTypes:true}))if(entry.isFile()&&entry.name.endsWith('.md'))documents.push(entry.name);
async function walk(folder){for(const entry of await readdir(path.join(root,folder),{withFileTypes:true})){const file=path.posix.join(folder,entry.name);if(entry.isDirectory())await walk(file);else if(file.endsWith('.md'))documents.push(file);}}
await walk('documentation');
for(const file of ['packages/core/README.md','packages/vue-ui/README.md','examples/vue-vuetify/README.md'])documents.push(file);
let count=0;
for(const file of documents){
  const source=(await readFile(path.join(root,file),'utf8')).replace(/```[^\n]*\n[\s\S]*?```/g,'');
  for(const match of source.matchAll(/!?\[[^\]]*\]\(([^)\n]+)\)/g)){
    const target=match[1].trim().replace(/^<|>$/g,'');
    if(/^(?:[a-z][a-z\d+.-]*:|#|\/\/)/i.test(target))continue;
    const name=decodeURIComponent(target.split(/[?#]/,1)[0]);
    if(!name)continue;
    const resolved=path.resolve(root,path.dirname(file),name);
    assert.ok(resolved===path.resolve(root)||resolved.startsWith(path.resolve(root)+path.sep),`${file}: link stays in repository: ${target}`);
    let info;try{info=await stat(resolved);}catch{assert.fail(`${file}: missing local link ${target}`);}
    assert.ok(info.isFile()||info.isDirectory(),`${file}: valid local target ${target}`);count++;
  }
}
console.log(`PASS: ${documents.length} repository Markdown documents and ${count} local link targets. External URLs and generated website anchors require their separate gates.`);
