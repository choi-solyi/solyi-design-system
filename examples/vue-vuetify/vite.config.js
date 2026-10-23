import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {createVueAutoImport} from './auto-import.config.js';
import {readFileSync} from 'node:fs';
const bootTokens=JSON.parse(readFileSync(new URL('../../tokens.json',import.meta.url),'utf8'));
export const starterBootPalettes=Object.fromEntries(Object.entries(bootTokens.themes).map(([name,colors])=>[name,Object.fromEntries(['light','dark'].map(mode=>[mode,['canvas','text','accent','control-border'].map(role=>colors[mode][role])]))]));
export function nonblockingStarterStyles(html) {
  html=html.replace('/*__SOLYI_BOOT_PALETTES__*/ {}',JSON.stringify(starterBootPalettes));
  return html.replace(/<link\b[^>]*\brel="stylesheet"[^>]*>/g, tag => tag.replace('rel="stylesheet"', 'rel="preload" as="style" data-starter-css="pending" onload="if(this.rel===\'preload\'){this.rel=\'stylesheet\'}else{this.dataset.starterCss=\'ready\'}" onerror="this.dataset.starterCss=\'error\';globalThis.__solyiStarterBoot?.fail()"'));
}
export default defineConfig({base:'./',plugins:[vue(),createVueAutoImport(),{name:'starter-css-readiness',transformIndexHtml:{order:'post',handler:nonblockingStarterStyles}}],resolve:{dedupe:['vue','vuetify']},build:{rolldownOptions:{output:{entryFileNames:'starter.js',chunkFileNames:'[name].js',assetFileNames:'[name][extname]'}}}});
