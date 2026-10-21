import {copyFile,mkdir} from 'node:fs/promises';
const dir=new URL('../examples/vue-vuetify/src/core/',import.meta.url);await mkdir(dir,{recursive:true});
for(const name of ['tokens.css','tokens.json'])await copyFile(new URL(`../docs/${name}`,import.meta.url),new URL(name,dir));
console.log('Synced starter snapshot from the same generated Core source.');
