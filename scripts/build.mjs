import './build-usage-examples.mjs';
import {releaseCatalogue,releaseFiles} from './releases.mjs';
import {readFile, writeFile, mkdir, copyFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {siteFiles,starterFiles} from './site-manifest.mjs';
import {documentShell} from './document-shell.mjs'
const root = fileURLToPath(new URL('../', import.meta.url));
const tokens = JSON.parse(await readFile(path.join(root, 'tokens.json'), 'utf8'));
const declarations = (entries, prefix = '') => Object.entries(entries).map(([key, value]) => `  --sol-${prefix}${key}: ${value};`).join('\n');
let css = '/* Generated from tokens.json. Run npm run build; do not edit. */\n';
css += `:root {\n${declarations(tokens.base)}\n${declarations(tokens.density.comfortable)}\n${declarations(tokens.themes.violet.light, 'color-')}\n}\n`;
for (const [theme, data] of Object.entries(tokens.themes)) {
  for (const mode of ['light', 'dark']) {
    const selectors = [`[data-theme="${theme}"][data-mode="${mode}"]`];
    if (theme === 'violet') selectors.push(`[data-mode="${mode}"]:not([data-theme])`);
    css += `${selectors.join(',\n')} {\n  color-scheme: ${mode};\n${declarations(data[mode], 'color-')}\n}\n`;
  }
}
for (const [density, data] of Object.entries(tokens.density)) css += `[data-density="${density}"] {\n${declarations(data)}\n}\n`;
css += '@media (max-width: 680px), (pointer: coarse) { :root { --sol-control-height: var(--sol-touch-target-min); --sol-button-height: var(--sol-touch-target-min); } }\n';
const out = path.join(root, 'docs');
await mkdir(out, {recursive:true});
await writeFile(path.join(out, 'tokens.css'), css);
await writeFile(path.join(out, 'token-data.js'), `// Generated from tokens.json.\nexport default ${JSON.stringify(tokens, null, 2)};\n`);
await copyFile(path.join(root, 'tokens.json'), path.join(out, 'tokens.json'));
if(process.argv.includes('--core-only')) {console.log('Generated shared Core tokens only.');process.exit(0);}
await import('./build-component-api.mjs');
await import('./build-release-notes.mjs');
await import('./build-code-highlight.mjs');
await import('./build-design-guide.mjs');
await copyFile(path.join(root,'DESIGN.md'),path.join(out,'DESIGN.md'));
for (const name of siteFiles) {
  await mkdir(path.dirname(path.join(out, name)), { recursive: true })
  if (name === 'index.html') {
    const shell = await documentShell(await readFile(path.join(root, 'site', name), 'utf8'), tokens.version)
    await writeFile(path.join(out, name), shell.html)
    await writeFile(path.join(out, 'shell.css'), shell.css)
  } else {
    await copyFile(path.join(root, 'site', name), path.join(out, name))
  }
}
const catalogue=await releaseCatalogue();
await writeFile(path.join(out,'release-data.js'),'// Generated verified release catalogue.\nexport const packageReleases='+JSON.stringify(catalogue,null,2)+';\n');
for(const name of await releaseFiles()){await mkdir(path.dirname(path.join(out,name)),{recursive:true});await copyFile(path.join(root,'release-assets',name.slice('releases/'.length)),path.join(out,name));}
await mkdir(path.join(out,'starter'),{recursive:true});
for(const name of starterFiles)await copyFile(path.join(root,'examples/vue-vuetify/dist',name),path.join(out,'starter',name));
await writeFile(path.join(out, '.nojekyll'), '');
console.log('Built docs/ from the allowlisted site files and shared tokens.json.');
