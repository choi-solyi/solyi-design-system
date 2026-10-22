import {readFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
const base='https://choi-solyi.github.io/solyi-design-system/';
const ref=process.argv[2];
if(ref)assert.match(ref,/^[0-9a-f]{7,40}$/,'Optional published commit SHA');
async function list(dir,prefix=''){const out=[];for(const x of await readdir(dir,{withFileTypes:true})){if(x.name.startsWith('.'))continue;const name=prefix+x.name;if(x.isDirectory())out.push(...await list(new URL(x.name+'/',dir),name+'/'));else out.push(name);}return out;}
const files=ref?execFileSync('git',['ls-tree','-r','--name-only',ref,'--','docs'],{encoding:'utf8'}).trim().split(/\r?\n/).map(s=>s.slice(5)).filter(s=>!s.startsWith('.')):await list(new URL('../docs/',import.meta.url));
const hash=data=>createHash('sha256').update(data).digest('hex');
for(const name of files) {
  const url=new URL(name==='index.html'?'':name,base);
  const response=await fetch(url,{signal:AbortSignal.timeout(15000),cache:'no-store'});
  assert.equal(response.status,200,`${url} HTTP 200`);
  const remote=Buffer.from(await response.arrayBuffer());
  const local=ref?execFileSync('git',['show',`${ref}:docs/${name}`],{maxBuffer:16*1024*1024}):await readFile(new URL(`../docs/${name}`,import.meta.url));
  assert.equal(hash(remote),hash(local),`${name} SHA-256 matches the checked source`);
  console.log(`PASS ${name}: HTTP 200, SHA-256 ${hash(remote).slice(0,16)}…`);
}
console.log(`Verified ${files.length} public assets at ${base}`);
