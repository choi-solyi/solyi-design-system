import {readFile, writeFile, mkdir, copyFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
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
for (const name of ['index.html', 'app.js', 'extended.js', 'motion.js','calendar.js','palette.js', 'preferences.js', 'docs.css', 'components.css', 'favicon.ico','brand-sparkle.svg']) await copyFile(path.join(root, 'site', name), path.join(out, name));
await writeFile(path.join(out, '.nojekyll'), '');
console.log('Built docs/ from the allowlisted site files and shared tokens.json.');
