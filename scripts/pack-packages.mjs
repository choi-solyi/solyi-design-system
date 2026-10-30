import {mkdir,writeFile,readFile,copyFile,mkdtemp} from 'node:fs/promises';
import {tmpdir} from 'node:os'
import path from 'node:path'
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {packageTarball,artifactDirectory} from './package-identity.mjs';
const root=new URL('../',import.meta.url),out=new URL(artifactDirectory(),root);
await mkdir(out,{recursive:true});
const npm=process.platform==='win32'?'npm.cmd':'npm',records=[];
for(const name of ['core','vue-ui']){
  await copyFile(new URL('DESIGN.md',root),new URL('packages/'+name+'/DESIGN.md',root));
  const metadata=JSON.parse(await readFile(new URL('packages/'+name+'/package.json',root),'utf8'));
  assert.ok(!Object.values(metadata.dependencies||{}).some(value=>/^(?:file:|link:|workspace:)/.test(value)),'Packed runtime must not depend on a repository directory: '+name);
  const temporary = await mkdtemp(path.join(tmpdir(), 'solyi-pack-'))
  const result = execFileSync(npm, ['pack', '--ignore-scripts', '--json', '--pack-destination', temporary], {
    cwd: fileURLToPath(new URL('packages/' + name + '/', root)),
    encoding: 'utf8',
    shell: process.platform === 'win32',
  })
  const [pack] = JSON.parse(result)
  assert.equal(pack.filename, packageTarball(metadata), 'Actual npm tarball follows the package name')
  const fresh = path.join(temporary, pack.filename)
  const destination = new URL(pack.filename, out)
  let existing
  try {
    existing = await readFile(destination)
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }
  if (existing) {
    assert.deepEqual(existing, await readFile(fresh), 'Existing tarball is immutable; choose a new version')
  } else {
    await copyFile(fresh, destination)
  }
  records.push(pack)
  console.log(`Packed ${pack.name}@${pack.version}: ${pack.filename}, ${pack.files.length} files, ${pack.integrity}`)
}
await writeFile(new URL('pack-report.json',out),JSON.stringify(records,null,2)+'\n');
