import {createApp,computed,defineComponent,h,nextTick,onErrorCaptured,ref,shallowRef,Teleport} from 'vue'
import type {Component,ComponentPublicInstance} from 'vue'
import {VApp} from 'vuetify/components/VApp'
import {VThemeProvider} from 'vuetify/components/VThemeProvider'
import {SCard,sComponents,applySolyiAppearance,createSolyiVuetify,provideSolLocale,uiVersion} from 'solyi-ui'
import type {SAppearance} from 'solyi-ui'
import {recipeComponents} from './recipe-registry'
import AdvancedExamples from './AdvancedExamples.vue'
import './inline-previews.css'

export interface InlinePreviewDefinition {
  host:HTMLElement
  recipe:string
  part?:string
  view?:string
  label:string
  onError?:(error:unknown)=>void
}
interface PreviewEntry extends InlinePreviewDefinition { component:Component; failure?:unknown; failed:boolean; ready:boolean }
type PreviewHandle=ComponentPublicInstance & {confirmLeave?:()=>boolean|Promise<boolean>}
// The example still renders the real SCard; its title follows the containing h3.
const DocumentCard=defineComponent({name:'SolDocumentPreviewCard',inheritAttrs:false,setup(_,{attrs,slots}){
  return()=>{const cardAttrs={...attrs};delete cardAttrs['heading-level'];delete cardAttrs.headingLevel;return h(SCard,{...cardAttrs,headingLevel:4},slots)}
}})

/** Document canvases share the actual page viewport and one Vuetify overlay stack. */
export function createInlinePreviewRuntime(initial:SAppearance){
  const marker=document.createElement('div')
  marker.dataset.inlinePreviewRuntime=''
  document.body.append(marker)
  const entries=shallowRef<PreviewEntry[]>([]),language=ref<'ko-KR'|'en-US'>('ko-KR')
  const handles=new Map<HTMLElement,PreviewHandle>()
  const vuetify=createSolyiVuetify({components:{VApp,VThemeProvider}})
  const app=createApp({render:()=>h(VApp,{class:'sol-inline-runtime'},()=>entries.value.map(entry=>
    h(Teleport,{to:entry.host,key:entry.host.id},h(VThemeProvider,{withBackground:false},()=>
      h('div',{class:'sol-inline-preview v-application','data-package-version':uiVersion},[
        h(entry.component),
      ]),
    )),
  ))})
  provideSolLocale(app,computed(()=>({code:language.value})))
  app.use(vuetify)
  for(const [name,component]of Object.entries(sComponents))app.component(name,name==='SCard'?DocumentCard:component)
  app.mount(marker)
  let disposed=false
  function sync(appearance:SAppearance){
    if(!disposed)applySolyiAppearance(vuetify.theme,appearance,marker)
  }
  sync(initial)
  return {
    async mount(definition:InlinePreviewDefinition){
      if(disposed||entries.value.some(entry=>entry.host===definition.host))return
      const component=definition.view==='advanced'?AdvancedExamples:
        recipeComponents[definition.recipe as keyof typeof recipeComponents]
      if(!component)throw Error('Unknown preview recipe: '+definition.recipe)
      const entry:PreviewEntry={...definition,component,failed:false,ready:false}
      entry.component=defineComponent({name:'SolDocumentPreviewBoundary',setup(){
        onErrorCaptured(error=>{
          entry.failed=true;entry.failure=error
          entries.value=entries.value.filter(item=>item!==entry)
          if(entry.ready)void nextTick(()=>{if(!disposed)definition.onError?.(error)})
          return false
        })
        return()=>h(component,{...(entry.part?{part:entry.part}:{}),...(entry.view==='advanced'?{headingLevel:4,idPrefix:entry.host.id}:{}),ref:(value:unknown)=>{
          if(value)handles.set(entry.host,value as PreviewHandle)
          else handles.delete(entry.host)
        }})
      }})
      entries.value=[...entries.value,entry]
      await nextTick()
      if(entry.failed)throw entry.failure
      entry.ready=true
    },
    sync,
    async requestLeave(){
      for(const handle of handles.values())if(handle.confirmLeave&&!(await handle.confirmLeave()))return false
      return true
    },
    dispose(){
      if(disposed)return
      disposed=true
      app.unmount()
      vuetify.unmount()
      handles.clear()
      marker.remove()
    },
  }
}
