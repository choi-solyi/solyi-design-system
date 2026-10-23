import {defineConfig} from 'vite';
import {createVueAutoImport} from './auto-import.config.js';
export default defineConfig({base:'./',plugins:[createVueAutoImport()],resolve:{dedupe:['vue','vuetify']}});
