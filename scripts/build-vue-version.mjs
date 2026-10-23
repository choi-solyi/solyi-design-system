import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
const root=new URL('../',import.meta.url),metadata=JSON.parse(await readFile(new URL('packages/vue-ui/package.json',root),'utf8'));
const file=new URL('packages/vue-ui/src/version.ts',root),expected='// Generated from package.json; do not edit.\nexport const uiVersion = '+JSON.stringify(metadata.version)+';\n';
if(process.argv.includes('--check'))assert.equal(await readFile(file,'utf8'),expected,'Runtime version source follows package metadata');
else await writeFile(file,expected);
console.log('Verified Vue UI runtime version source '+metadata.version+'.');
