import {createApp} from 'vue';
import {createVuetify} from 'vuetify';
import {VApp} from 'vuetify/components/VApp';
import {VBtn} from 'vuetify/components/VBtn';
import {VTextField} from 'vuetify/components/VTextField';
import {VDialog} from 'vuetify/components/VDialog';
import 'vuetify/styles';
import './core/tokens.css';
import './adapter.css';
import core from './core/tokens.json';
import App from './App.vue';
const themes={};
for(const [name,data] of Object.entries(core.themes))for(const mode of ['light','dark']){
  const c=data[mode];themes[`${name}-${mode}`]={dark:mode==='dark',colors:{background:c.canvas,surface:c.surface,'surface-variant':c['surface-alt'],'on-background':c.text,'on-surface':c.text,primary:c.accent,'on-primary':c['on-accent'],error:c.danger,success:c.success,warning:c.warning,info:c.info},variables:{'border-color':c['control-border'],'border-opacity':1}};
}
const vuetify=createVuetify({components:{VApp,VBtn,VTextField,VDialog},theme:{defaultTheme:'violet-light',themes},defaults:{VBtn:{ripple:false},VTextField:{variant:'outlined',density:'compact'}}});
createApp(App).use(vuetify).mount('#app');
