import {readFile, mkdir, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';

const root = new URL('../', import.meta.url);
const {build} = await import(new URL('examples/vue-vuetify/node_modules/vite/dist/node/index.js', root));
const out = new URL('site/vendor/', root);
await mkdir(out, {recursive: true});
await build({
  configFile: false,
  root: fileURLToPath(root),
  logLevel: 'error',
  build: {
    lib: {entry: fileURLToPath(new URL('scripts/prism-entry.js', root)), formats: ['iife'], name: 'SolyiPrism', fileName: () => 'prism.js'},
    outDir: fileURLToPath(out),
    emptyOutDir: false,
    minify: true,
  },
});
const pkg = JSON.parse(await readFile(new URL('node_modules/prismjs/package.json', root), 'utf8'));
if (pkg.version !== '1.30.0' || pkg.license !== 'MIT') throw Error('Review Prism version/license before changing the vendor build.');
await writeFile(new URL('PRISM-LICENSE.txt', out), 'Prism ' + pkg.version + '\nOfficial source: https://github.com/PrismJS/prism\nRegistry: https://registry.npmjs.org/prismjs\n\n' + await readFile(new URL('node_modules/prismjs/LICENSE', root), 'utf8'));
console.log('Built self-hosted Prism 1.30.0 with markup/CSS/JavaScript/TypeScript/Vue SFC/JSON/Bash and MIT notice.');
