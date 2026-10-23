import { loadCodeFontStylesheet, observeCodeFonts } from './font-loading.js'

observeCodeFonts({ load: () => loadCodeFontStylesheet('./fonts/code-fonts.css') })
