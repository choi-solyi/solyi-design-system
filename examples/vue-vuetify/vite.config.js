import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {createVueAutoImport} from './auto-import.config.js';
export default defineConfig({base:'./',plugins:[vue(),createVueAutoImport()],resolve:{dedupe:['vue','vuetify']},build:{rolldownOptions:{output:{entryFileNames:'starter.js',chunkFileNames:'[name].js',assetFileNames:'[name][extname]'}}}});
