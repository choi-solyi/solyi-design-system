import {mkdir, readFile, writeFile, copyFile, cp} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {solIconNames} from '../site/icons.js';
const root=new URL('../',import.meta.url),core=new URL('packages/core/',root),dist=new URL('dist/',core);
const pkg=JSON.parse(await readFile(new URL('package.json',core),'utf8'));
execFileSync(process.execPath,[fileURLToPath(new URL('scripts/build.mjs',root)),'--core-only'],{stdio:'inherit'});
await mkdir(dist,{recursive:true});
for(const file of ['tokens.css','tokens.json'])await copyFile(new URL('docs/'+file,root),new URL(file,dist));
for(const file of ['components.css','overflow.js','icons.js','date-only.js'])await copyFile(new URL('site/'+file,root),new URL(file,dist));
const tokens=JSON.parse(await readFile(new URL('tokens.json',dist),'utf8'));
await writeFile(new URL('index.js',dist),`export const coreVersion=${JSON.stringify(pkg.version)};\nexport const tokens=${JSON.stringify(tokens,null,2)};\n`);
await writeFile(new URL('index.d.ts',dist),'export declare const coreVersion: "'+pkg.version+'";\nexport interface TokenTheme {label:string;description:string;light:Record<string,string>;dark:Record<string,string>}\nexport declare const tokens: {version:string;format:string;description:string;base:Record<string,string>;reference:Record<string,string>;themes:Record<"violet"|"sage"|"sand",TokenTheme>;density:Record<string,Record<string,string>>};\n');
await writeFile(new URL('overflow.d.ts',dist),'export interface OverflowCleanup {():void;refresh():void}\nexport declare function mountOverflowText(root:HTMLElement):OverflowCleanup;\n');
await writeFile(new URL('icons.d.ts',dist),'export type SolIconName = '+solIconNames.map(name=>JSON.stringify(name)).join(' | ')+';\nexport declare const solIconNames: readonly SolIconName[];\nexport declare const solIconPaths: Readonly<Record<SolIconName,string>>;\nexport declare function solIcon(name:SolIconName,options?:{size?:16|20|24;label?:string}):string;\n');
console.log('Built @solyi/core '+pkg.version+' from the shared source (no Vue dependency).');

await copyFile(new URL('site/date-only.d.ts',root),new URL('date-only.d.ts',dist));

await cp(new URL('site/fonts/',root),new URL('fonts/',dist),{recursive:true});
