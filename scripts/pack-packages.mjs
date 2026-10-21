import {mkdir,writeFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=new URL('../',import.meta.url),out=new URL('artifacts/',root);
await mkdir(out,{recursive:true});
const npm=process.platform==='win32'?'npm.cmd':'npm',records=[];
for(const name of ['core','vue-ui']){
  const result=execFileSync(npm,['pack','--ignore-scripts','--json','--pack-destination',fileURLToPath(out)],{cwd:fileURLToPath(new URL('packages/'+name+'/',root)),encoding:'utf8',shell:process.platform==='win32'});
  const [pack]=JSON.parse(result);records.push(pack);console.log(`Packed ${pack.name}@${pack.version}: ${pack.filename}, ${pack.files.length} files, ${pack.integrity}`);
}
await writeFile(new URL('pack-report.json',out),JSON.stringify(records,null,2)+'\n');
