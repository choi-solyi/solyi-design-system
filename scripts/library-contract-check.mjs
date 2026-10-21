import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
const root=new URL('../',import.meta.url),json=async file=>JSON.parse(await readFile(new URL(file,root),'utf8'));
const packs=await json('artifacts/pack-report.json');
for(const [name,minimum]of [['core',['dist/tokens.css','dist/components.css','dist/tokens.json','dist/index.js','dist/index.d.ts']],['vue-ui',['dist/index.js','dist/index.d.ts','dist/styles.css']]]){
 const pkg=await json('packages/'+name+'/package.json');assert.equal(pkg.private,true);assert.equal(pkg.license,'UNLICENSED');assert.ok(!pkg.scripts?.publish);const report=packs.find(p=>p.name===pkg.name);assert.ok(report);for(const file of minimum)assert.ok(report.files.some(f=>f.path===file),file+' included in pack');for(const value of Object.values(pkg.exports)){for(const target of typeof value==='string'?[value]:Object.values(value))assert.ok((await stat(new URL('packages/'+name+'/'+target,root))).isFile());}
 assert.ok(!report.files.some(f=>/node_modules|brand|favicon|\.env|\.git\//.test(f.path)));
}
const library=await readFile(new URL('packages/vue-ui/dist/index.js',root),'utf8');assert.ok(/from ["']vue["']/.test(library));assert.ok(/from ["']vuetify\//.test(library));assert.ok(/@solyi\/core\/overflow/.test(library));assert.ok(library.length<40000,'No bundled framework runtime');
const types=await readFile(new URL('packages/vue-ui/dist/index.d.ts',root),'utf8');for(const name of ['SolButton','SolField','SolDialog','SolTable','TableColumn','TableSort'])assert.ok(types.includes(name));
const styles=await readFile(new URL('packages/vue-ui/dist/styles.css',root),'utf8');assert.match(styles,/\.sol-ui-table \.sol-data-table\{[^}]*table-layout:fixed[^}]*width:100%/,'Package table keeps fixed layout at intermediate widths');
for(const project of ['examples/package-consumer','examples/vue-vuetify']){
 const lock=await json(project+'/package-lock.json');for(const [path,pkg]of Object.entries(lock.packages)){assert.ok(path===''||path.startsWith('node_modules/'),'No source directory linkage '+path);assert.ok(!pkg.link,'No symlink '+path);if(path.includes('/@solyi/')){assert.match(pkg.resolved,/^file:.*\.tgz$/);assert.match(pkg.integrity,/^sha512-/);}else if(pkg.resolved){assert.ok(pkg.resolved.startsWith('https://registry.npmjs.org/'));assert.match(pkg.integrity,/^sha512-/);assert.ok(pkg.license);}}
 const paths=Object.keys(lock.packages);assert.equal(paths.filter(p=>/(?:^|\/)node_modules\/vue$/.test(p)).length,1);assert.equal(paths.filter(p=>/(?:^|\/)node_modules\/vuetify$/.test(p)).length,1);
 for(const name of ['core','vue-ui'])assert.deepEqual(await readFile(new URL(project+'/node_modules/@solyi/'+name+'/dist/index.js',root)),await readFile(new URL('packages/'+name+'/dist/index.js',root)),'Installed package matches current build');
}
assert.deepEqual(await readFile(new URL('packages/core/dist/components.css',root)),await readFile(new URL('site/components.css',root)));
assert.deepEqual(await readFile(new URL('packages/core/dist/tokens.json',root)),await readFile(new URL('tokens.json',root)));
console.log('PASS: private pack contents/typed exports/CSS, shared source bytes, external Vue/Vuetify/Core, two actual tarball consumers, locked registry integrity/licenses and one framework copy each.');
