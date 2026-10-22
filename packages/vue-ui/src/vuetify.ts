import {createVuetify} from 'vuetify';
import type {VuetifyOptions} from 'vuetify';
import {tokens} from '@solyi/core';

export type SThemeName=keyof typeof tokens.themes;
export interface SAppearance {theme:SThemeName;mode:'light'|'dark';density?:'comfortable'|'compact'}
export type SThemeHost=Pick<ReturnType<typeof createVuetify>['theme'],'change'|'themes'>;

/** Six token-derived themes. Consumers can add themes/defaults using Vuetify's own options. */
export function createSolyiVuetify(options:VuetifyOptions={}){
 const themes:Record<string,{dark:boolean;colors:Record<string,string>;variables:Record<string,string|number>}>= {};
 for(const [name,data]of Object.entries(tokens.themes))for(const mode of ['light','dark'] as const){const c=data[mode];themes[name+'-'+mode]={dark:mode==='dark',colors:{background:c.canvas,surface:c.surface,'surface-variant':c['surface-alt'],'on-background':c.text,'on-surface':c.text,primary:c.accent,'on-primary':c['on-accent'],secondary:c.accent,'on-secondary':c['on-accent'],error:c.danger,'on-error':c.surface,success:c.success,'on-success':c.surface,warning:c.warning,'on-warning':c.surface,info:c.info,'on-info':c.surface},variables:{'border-color':c['control-border'],'border-opacity':1}};}
 const defaults:Record<string,Record<string,unknown>>={VApp:{class:'sol-vuetify'},VBtn:{ripple:false,variant:'outlined',class:'sol-vuetify-btn'},VTextField:{variant:'outlined',density:'compact',class:'sol-vuetify-field'},VSelect:{variant:'outlined',density:'compact',class:'sol-vuetify-field'},VTextarea:{variant:'outlined',density:'compact',rows:3,class:'sol-vuetify-field'},VCard:{class:'sol-vuetify-card'},VDialog:{class:'sol-vuetify-dialog'}};
 const merged={...defaults,...options.defaults};for(const key of Object.keys(defaults) as (keyof typeof defaults)[])if(options.defaults?.[key])merged[key]={...defaults[key],...options.defaults[key]};
 return createVuetify({...options,defaults:merged,theme:options.theme===false?false:{...options.theme,defaultTheme:options.theme?.defaultTheme??'violet-light',themes:{...themes,...options.theme?.themes}}});
}

/** Client-side bridge: update Core CSS and Vuetify from the same app-owned state. No persistence. */
export function applySolyiAppearance(themeHost:SThemeHost,next:SAppearance,target?:HTMLElement){
 const name=next.theme+'-'+next.mode;
 if(!Object.hasOwn(tokens.themes,next.theme)||!['light','dark'].includes(next.mode)||next.density!==undefined&&!['comfortable','compact'].includes(next.density)||!themeHost.themes.value[name])return false;
 const host=target??(typeof document==='undefined'?undefined:document.documentElement);
 if(!host)throw new Error('applySolyiAppearance requires a DOM target. Use defaultTheme for SSR.');
 host.dataset.theme=next.theme;host.dataset.mode=next.mode;if(next.density)host.dataset.density=next.density;
 void themeHost.change(name,false);return true;
}
