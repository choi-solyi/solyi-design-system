import {createVuetify} from 'vuetify';
import {VApp} from 'vuetify/components/VApp';
import {tokens as core} from '@solyi/core';

export function createStarterVuetify(){
  const themes={};
  for(const [name,data] of Object.entries(core.themes))for(const mode of ['light','dark']){
    const c=data[mode];themes[`${name}-${mode}`]={dark:mode==='dark',colors:{background:c.canvas,surface:c.surface,'surface-variant':c['surface-alt'],'on-background':c.text,'on-surface':c.text,primary:c.accent,'on-primary':c['on-accent'],error:c.danger,success:c.success,warning:c.warning,info:c.info},variables:{'border-color':c['control-border'],'border-opacity':1}};
  }
  return createVuetify({components:{VApp},theme:{defaultTheme:'violet-light',themes},defaults:{VBtn:{ripple:false},VTextField:{variant:'outlined',density:'compact'}}});
}
