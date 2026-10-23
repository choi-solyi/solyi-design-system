import AutoImport from 'unplugin-auto-import/vite';
import {fileURLToPath} from 'node:url';

// The same Vue preset is used by the app and its isolated runtime tests.
export function createVueAutoImport({generate = true} = {}) {
  return AutoImport({
    imports: ['vue'],
    vueTemplate: false,
    dts: generate ? fileURLToPath(new URL('./src/auto-imports.d.ts', import.meta.url)) : false,
    eslintrc: {
      enabled: generate,
      filepath: fileURLToPath(new URL('./.eslintrc-auto-import.json', import.meta.url)),
      globalsPropValue: 'readonly',
    },
  });
}
