import {readFile,readdir,writeFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const starter=fileURLToPath(new URL('../examples/vue-vuetify/',import.meta.url)),entries=[];
async function scan(dir){for(const entry of await readdir(dir,{withFileTypes:true})){if(!entry.isDirectory()||entry.name.startsWith('.'))continue;const p=path.join(dir,entry.name);if(entry.name.startsWith('@')){await scan(p);continue;}let pkg;try{pkg=JSON.parse(await readFile(path.join(p,'package.json'),'utf8'));}catch{continue;}if(pkg.name.startsWith('@solyi/')||pkg.name==='solyi-ui')continue;const license=pkg.license||pkg.licenses?.map(x=>x.type).join(', ');if(!license||/UNLICENSED|UNKNOWN/i.test(license))throw Error(`Review missing license: ${pkg.name}`);const names=(await readdir(p,{withFileTypes:true})).filter(x=>x.isFile()&&/^(licen[cs]e|copying|notice)(\.|$)/i.test(x.name)).map(x=>x.name);const texts=await Promise.all(names.map(async name=>`${name}\n${await readFile(path.join(p,name),'utf8')}`));entries.push({name:pkg.name,version:pkg.version,license,texts});try{await scan(path.join(p,'node_modules'));}catch(e){if(e.code!=='ENOENT')throw e;}}}
await scan(path.join(starter,'node_modules'));entries.sort((a,b)=>a.name.localeCompare(b.name)||a.version.localeCompare(b.version));
// Preserve all existing license texts across platform-specific install sets.
let text=await readFile(path.join(starter,'THIRD-PARTY-NOTICES.txt'),'utf8');
for(const p of entries){if(text.includes('===== '+p.name+'@'+p.version+' |'))continue;if(/@rolldown\/binding-|lightningcss-(?:win32|linux|darwin|android|freebsd)/.test(p.name))continue;text+='\n\n===== '+p.name+'@'+p.version+' | '+p.license+' =====\nhttps://registry.npmjs.org/'+p.name+'/'+p.version+'\n'+(p.texts.join('\n\n')||'Package metadata declares the license above; no separate license file.');}

await mkdir(path.join(starter,'public'),{recursive:true});await writeFile(path.join(starter,'THIRD-PARTY-NOTICES.txt'),text);await writeFile(path.join(starter,'public/THIRD-PARTY-NOTICES.txt'),text);console.log(`Preserved license metadata/text for ${entries.length} installed packages.`);
