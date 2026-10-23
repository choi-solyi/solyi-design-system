import { createApp } from 'vue'
import { createStarterVuetify } from './vuetify.js'
import 'vuetify/styles'
import 'solyi-ui/fonts.css'
import 'solyi-ui/tokens.css'
import 'solyi-ui/components.css'
import 'solyi-ui/styles.css'
import './adapter.css'
import SolyiUI, { provideSolLocale } from 'solyi-ui'
import 'solyi-ui/global'
import { mountProgressEmbed } from './progress-embed.js'
import { starterLocale } from './locale-state.js'
import App from './App.vue'
import { revealStarter } from './boot.js'
import { observeCodeFonts } from '../../../site/font-loading.js'
const app = createApp(App)
provideSolLocale(app, starterLocale)
const vuetify = createStarterVuetify()
const mounted = app.use(vuetify).use(SolyiUI).mount('#app')
if (new URLSearchParams(location.search).get('view') === 'progress')
  mountProgressEmbed(vuetify.theme)
if (
  ['recipes', 'advanced'].includes(new URLSearchParams(location.search).get('view')) &&
  new URLSearchParams(location.search).get('embed') === '1'
) {
  document.documentElement.dataset.motionPolicy =
    new URLSearchParams(location.search).get('motionPolicy') === 'reduced' ? 'reduced' : 'system'
  mountProgressEmbed(vuetify.theme, 'recipe', () => mounted.confirmRecipeLeave())
}
void revealStarter()
observeCodeFonts({ load: () => import('solyi-ui/code-fonts.css') })
