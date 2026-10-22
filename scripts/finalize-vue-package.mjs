import {readFile,writeFile} from 'node:fs/promises';
const file=new URL('../packages/vue-ui/dist/index.d.ts',import.meta.url);
const source=await readFile(file,'utf8');
// Styles are an explicit public subpath, not a type-only side effect.
await writeFile(file,source.replace("import './styles.css';\n",''));
// Explicit opt-in global template types; the runtime module has no side effects.
await writeFile(new URL('./global.js',file),'export {};\n');
