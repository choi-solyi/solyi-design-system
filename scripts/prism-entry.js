import Prism from 'prismjs';
import 'prismjs/components/prism-typescript.js';
import 'prismjs/components/prism-json.js';
import 'prismjs/components/prism-bash.js';

Prism.manual = true;
Prism.disableWorkerMessageHandler = true;

// Prism's normal markup grammar already embeds JavaScript and CSS blocks.
// Only lang="ts" scripts need a preceding, language-specific token.
Prism.languages.vue = {
  'script-typescript': {
    pattern: /(<script\b(?=[^>]*\blang\s*=\s*["'](?:ts|typescript)["'])[^>]*>)[\s\S]*?(?=<\/script>)/i,
    lookbehind: true,
    greedy: true,
    alias: 'language-typescript',
    inside: Prism.languages.typescript,
  },
  interpolation: {
    pattern: /\{\{[\s\S]*?\}\}/,
    inside: {
      punctuation: /^\{\{|\}\}$/,
      expression: {pattern: /[\s\S]+/, inside: Prism.languages.javascript},
    },
  },
  ...Prism.languages.markup,
};
globalThis.Prism = Prism;
