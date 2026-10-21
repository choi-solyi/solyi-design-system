import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig({base:'./',plugins:[vue()],resolve:{dedupe:['vue','vuetify']},build:{rolldownOptions:{output:{entryFileNames:'starter.js',chunkFileNames:'[name].js',assetFileNames:'[name][extname]'}}}});
