import {createApp} from 'vue';
import {createStarterVuetify} from './vuetify.js';
import 'vuetify/styles';
import '@solyi/core/fonts.css';
import '@solyi/core/code-fonts.css';
import '@solyi/core/tokens.css';
import '@solyi/core/components.css';
import '@solyi/vue-ui/styles.css';
import './adapter.css';
import SolyiUI, {provideSolLocale} from '@solyi/vue-ui';
import '@solyi/vue-ui/global';
import {mountProgressEmbed} from './progress-embed.js';
import {starterLocale} from './locale-state.js';
import App from './App.vue';
const app=createApp(App);provideSolLocale(app,starterLocale);const vuetify=createStarterVuetify();const mounted=app.use(vuetify).use(SolyiUI).mount('#app');
if(new URLSearchParams(location.search).get('view')==='progress')mountProgressEmbed(vuetify.theme);
if(new URLSearchParams(location.search).get('view')==='recipes'&&new URLSearchParams(location.search).get('embed')==='1'){
 document.documentElement.dataset.motionPolicy=new URLSearchParams(location.search).get('motionPolicy')==='reduced'?'reduced':'system';
 mountProgressEmbed(vuetify.theme,'recipe',()=>mounted.confirmRecipeLeave());
}
