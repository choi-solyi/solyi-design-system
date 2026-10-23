import {mkdir,writeFile,readFile,copyFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {packageTarball} from './package-identity.mjs';
const root=new URL('../',import.meta.url),out=new URL('artifacts/',root);
await mkdir(out,{recursive:true});
const npm=process.platform==='win32'?'npm.cmd':'npm',records=[];
for(const name of ['core','vue-ui']){
  await copyFile(new URL('DESIGN.md',root),new URL('packages/'+name+'/DESIGN.md',root));
  const metadata=JSON.parse(await readFile(new URL('packages/'+name+'/package.json',root),'utf8'));
  assert.ok(!Object.values(metadata.dependencies||{}).some(value=>/^(?:file:|link:|workspace:)/.test(value)),'Packed runtime must not depend on a repository directory: '+name);
  const result=execFileSync(npm,['pack','--ignore-scripts','--json','--pack-destination',fileURLToPath(out)],{cwd:fileURLToPath(new URL('packages/'+name+'/',root)),encoding:'utf8',shell:process.platform==='win32'});
  const [pack]=JSON.parse(result);assert.equal(pack.filename,packageTarball(metadata),'Actual npm tarball follows the package name');records.push(pack);console.log(`Packed ${pack.name}@${pack.version}: ${pack.filename}, ${pack.files.length} files, ${pack.integrity}`);
}
await writeFile(new URL('pack-report.json',out),JSON.stringify(records,null,2)+'\n');
