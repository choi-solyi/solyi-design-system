import {readFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const base='https://choi-solyi.github.io/solyi-design-system/';
const files=(await readdir(new URL('../docs/',import.meta.url))).filter(name=>!name.startsWith('.'));
const hash=data=>createHash('sha256').update(data).digest('hex');
for(const name of files) {
  const url=new URL(name==='index.html'?'':name,base);
  const response=await fetch(url,{signal:AbortSignal.timeout(15000),cache:'no-store'});
  assert.equal(response.status,200,`${url} HTTP 200`);
  const remote=Buffer.from(await response.arrayBuffer());
  const local=await readFile(new URL(`../docs/${name}`,import.meta.url));
  assert.equal(hash(remote),hash(local),`${name} SHA-256 matches the checked source`);
  console.log(`PASS ${name}: HTTP 200, SHA-256 ${hash(remote).slice(0,16)}…`);
}
console.log(`Verified ${files.length} public assets at ${base}`);
