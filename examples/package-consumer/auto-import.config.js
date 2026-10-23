import AutoImport from 'unplugin-auto-import/vite';
import {fileURLToPath} from 'node:url';

export function createVueAutoImport({generate = true} = {}) {
  return AutoImport({
    imports: ['vue'],
    dts: generate ? fileURLToPath(new URL('./auto-imports.d.ts', import.meta.url)) : false,
    eslintrc: {
      enabled: generate,
      filepath: fileURLToPath(new URL('./.eslintrc-auto-import.json', import.meta.url)),
      globalsPropValue: 'readonly',
    },
  });
}
