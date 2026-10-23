import {readFileSync} from 'node:fs';
import vueParser from 'vue-eslint-parser';
import tsParser from '@typescript-eslint/parser';

const globalsFor = project => JSON.parse(readFileSync(new URL(project + '/.eslintrc-auto-import.json', import.meta.url), 'utf8')).globals;
const browser = Object.fromEntries([
  ...Object.getOwnPropertyNames(globalThis),
  'window', 'document', 'location', 'history', 'localStorage', 'navigator',
  'HTMLElement', 'HTMLInputElement', 'HTMLAnchorElement', 'HTMLButtonElement', 'HTMLSelectElement',
  'HTMLDialogElement', 'Node', 'Element', 'Event', 'EventTarget', 'MouseEvent', 'KeyboardEvent',
  'BeforeUnloadEvent', 'FocusEvent', 'MediaQueryListEvent', 'File', 'FileList', 'AbortSignal',
  'ResizeObserver', 'CSS', 'matchMedia', 'requestAnimationFrame', 'cancelAnimationFrame', 'innerWidth', 'innerHeight',
  'defineProps', 'defineEmits', 'defineExpose', 'withDefaults', 'defineModel', 'defineOptions', 'defineSlots',
].map(name => [name, 'readonly']));

// Vue template identifiers are checked by vue-tsc; this gate checks script globals.
export default [
  {ignores: ['**/node_modules/**', '**/dist/**', '**/.runtime-test/**', '**/*.d.ts']},
  {
    files: ['examples/vue-vuetify/src/**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {parser: tsParser, ecmaVersion: 'latest', sourceType: 'module', lib: ['es2023', 'dom', 'dom.iterable']},
      globals: {...browser, ...globalsFor('vue-vuetify')},
    },
    rules: {'no-undef': 'error', 'no-global-assign': 'error'},
  },
  {
    files: ['examples/vue-vuetify/src/**/*.js', 'examples/package-consumer/main.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {ecmaVersion: 'latest', sourceType: 'module', lib: ['es2023', 'dom', 'dom.iterable']},
      globals: {...browser, ...globalsFor('vue-vuetify'), ...globalsFor('package-consumer')},
    },
    rules: {'no-undef': 'error', 'no-global-assign': 'error'},
  },
];
