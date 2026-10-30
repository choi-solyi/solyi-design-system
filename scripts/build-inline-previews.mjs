import {createRequire} from 'node:module'
import {fileURLToPath,pathToFileURL} from 'node:url'
import {createVueAutoImport} from '../examples/vue-vuetify/auto-import.config.js'
const root=new URL('../examples/vue-vuetify/',import.meta.url)
const require=createRequire(new URL('package.json',root))
const {build}=await import(pathToFileURL(require.resolve('vite')))
const {default:vue}=await import(pathToFileURL(require.resolve('@vitejs/plugin-vue')))
await build({root:fileURLToPath(root),base:'./',define:{'process.env.NODE_ENV':'"production"','process.env.VITE_LOGGER_ENABLED':'undefined'},configFile:false,plugins:[vue(),createVueAutoImport({generate:false})],resolve:{dedupe:['vue','vuetify']},build:{outDir:'dist/inline',emptyOutDir:true,cssCodeSplit:false,lib:{entry:fileURLToPath(new URL('src/inline-previews.ts',root)),formats:['es'],fileName:'inline-preview',cssFileName:'inline-preview'}}})
console.log('Built same-document previews from the installed package; no package publication.')
