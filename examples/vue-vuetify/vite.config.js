import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig({base:'./',plugins:[vue()],build:{rollupOptions:{output:{entryFileNames:'starter.js',chunkFileNames:'[name].js',assetFileNames:'[name][extname]'}}}});
