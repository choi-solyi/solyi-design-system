import {defineConfig} from 'vite';
export default defineConfig({build:{lib:{entry:'src/index.ts',formats:['es'],fileName:'index',cssFileName:'styles'},rolldownOptions:{external:id=>id==='vue'||id.startsWith('vue/')||id==='vuetify'||id.startsWith('vuetify/')||id.startsWith('@solyi/core')}}});
