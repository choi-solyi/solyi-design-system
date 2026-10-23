import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {releasePackage,packageTarball} from './package-identity.mjs';
const root=new URL('../',import.meta.url),assets=new URL('release-assets/',root);
const json=async url=>JSON.parse(await readFile(url,'utf8'));
const semver=value=>typeof value==='string'&&/^\d+\.\d+\.\d+$/.test(value);
export const digest=bytes=>({sha256:createHash('sha256').update(bytes).digest('hex'),integrity:'sha512-'+createHash('sha512').update(bytes).digest('base64')});
export function assertImmutableRelease(existing,packages){if(JSON.stringify(existing.packages)!==JSON.stringify(packages))throw Error('Refusing to replace an immutable release. Choose a new version.');}
export function assertPackageVersions(releases){const known=new Map();for(const release of releases)for(const pkg of release.packages){const key=pkg.name+'@'+pkg.version,hash=pkg.sha256+' '+pkg.integrity;if(known.has(key)&&known.get(key)!==hash)throw Error('Package version has different bytes: '+key);known.set(key,hash);}}
export async function verifyRelease(directory){
 const manifest=await json(new URL('manifest.json',directory));
 if(!semver(manifest.release)||manifest.packages?.length!==2)throw Error('Invalid release manifest');
 for(const name of ['core','vue-ui']){
  const pkg=releasePackage(manifest,name);
  if(!semver(pkg.version)||pkg.file!==packageTarball(pkg))throw Error('Invalid package record');
  const bytes=await readFile(new URL(pkg.file,directory)),hash=digest(bytes);
  if(bytes.length!==pkg.bytes||hash.sha256!==pkg.sha256||hash.integrity!==pkg.integrity)throw Error('Package checksum mismatch: '+pkg.file);
 }
 const sums=manifest.packages.map(p=>p.sha256+'  '+p.file+'\n').join('');
 if(await readFile(new URL('SHA256SUMS',directory),'utf8')!==sums)throw Error('SHA256SUMS mismatch');
 return manifest;
}
export async function releaseCatalogue(){
 let index;try{index=await json(new URL('index.json',assets));}catch(error){if(error.code==='ENOENT')return {current:null,releases:[]};throw error;}
 if(!Array.isArray(index.releases)||new Set(index.releases).size!==index.releases.length||!index.releases.every(semver)||!index.releases.includes(index.current))throw Error('Invalid release index');
 const releases=[];for(const version of index.releases){const manifest=await verifyRelease(new URL(version+'/',assets));if(version!==manifest.release)throw Error('Release directory mismatch');releases.push(manifest);}
 assertPackageVersions(releases);return {current:index.current,releases};
}
export async function releaseFiles(){const catalogue=await releaseCatalogue();return catalogue.releases.length?['releases/index.json',...catalogue.releases.flatMap(r=>['manifest.json','SHA256SUMS',...r.packages.map(p=>p.file)].map(f=>'releases/'+r.release+'/'+f))]:[];}
if(process.argv[1]===fileURLToPath(import.meta.url)){
 const release=process.argv[2];
 if(release==='--check'){const c=await releaseCatalogue();console.log('Verified '+c.releases.length+' immutable package pairs.');}
 else{
  if(!semver(release))throw Error('Usage: node scripts/releases.mjs <x.y.z> | --check');
  const version=(await json(new URL('package.json',root))).version;if(version!==release)throw Error('Documentation release must match package.json');
  const reports=await json(new URL('artifacts/pack-report.json',root)),packages=[];
  for(const name of ['core','vue-ui']){
   const pkg=await json(new URL('packages/'+name+'/package.json',root)),report=reports.find(p=>p.name===pkg.name&&p.version===pkg.version);if(!report)throw Error('Run package pipeline first');
   const file=packageTarball(pkg),bytes=await readFile(new URL('artifacts/'+file,root)),hash=digest(bytes);if(hash.integrity!==report.integrity)throw Error('Pack report does not match '+file);
   packages.push({name:pkg.name,version:pkg.version,file,bytes:bytes.length,...hash});
  }
  assertPackageVersions([...(await releaseCatalogue()).releases,{packages}]);
  const destination=new URL(release+'/',assets);let existing;
  try{existing=await verifyRelease(destination);}catch(error){if(error.code!=='ENOENT')throw error;}
  if(existing){assertImmutableRelease(existing,packages);console.log('Existing release matches; no files rewritten.');}
  else{
   // mkdir without recursive refuses an existing/partial version folder.
   await mkdir(assets,{recursive:true});await mkdir(destination);
   for(const pkg of packages)await copyFile(new URL('artifacts/'+pkg.file,root),new URL(pkg.file,destination));
   const sourceRef=execFileSync('git',['rev-parse','HEAD'],{cwd:fileURLToPath(root),encoding:'utf8'}).trim();
   await writeFile(new URL('manifest.json',destination),JSON.stringify({release,sourceRef,compatibility:{node:'^22.18.0 || >=24.12.0',vue:'3.5.44',vuetify:'4.3.0'},packages},null,2)+'\n');
   await writeFile(new URL('SHA256SUMS',destination),packages.map(p=>p.sha256+'  '+p.file+'\n').join(''));
  }
  let previous=[];try{previous=(await json(new URL('index.json',assets))).releases;}catch(error){if(error.code!=='ENOENT')throw error;}
  const releases=[release,...previous.filter(v=>v!==release)];
  if(!releases.includes('0.5.0'))releases.push('0.5.0');
  for(const v of releases)await verifyRelease(new URL(v+'/',assets));
  await writeFile(new URL('index.json',assets),JSON.stringify({current:release,releases},null,2)+'\n');
  console.log('Prepared '+release+' locally. No publication or network request.');
 }
}
