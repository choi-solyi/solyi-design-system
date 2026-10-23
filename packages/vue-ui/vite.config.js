import {defineConfig} from 'vite';
// Core stays a separate source/build unit, but its runtime ships inside this package.
const corePaths={
  '@solyi/core':'./core/index.js',
  '@solyi/core/date':'./core/date-only.js',
  '@solyi/core/icons':'./core/icons.js',
  '@solyi/core/overflow':'./core/overflow.js'
};
export default defineConfig({build:{lib:{entry:'src/index.ts',formats:['es'],fileName:'index',cssFileName:'styles'},rolldownOptions:{
  external:id=>id==='vue'||id.startsWith('vue/')||id==='vuetify'||id.startsWith('vuetify/')||Object.hasOwn(corePaths,id),
  output:{paths:corePaths}
}}});
