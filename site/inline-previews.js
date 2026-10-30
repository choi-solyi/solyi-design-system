// Floating examples must share the document viewport, rather than resizing an iframe.
let runtimeModule,stylesReady
function stylesheet(url,id){
 return new Promise((resolve,reject)=>{
  const existing=document.querySelector(`link[data-inline-preview-style="${id}"]`)
  if(existing?.sheet){resolve();return}
  const link=existing||document.createElement('link')
  const timer=setTimeout(()=>reject(Error('Preview styles timed out')),10000)
  link.addEventListener('load',()=>{clearTimeout(timer);resolve()},{once:true})
  link.addEventListener('error',()=>{clearTimeout(timer);reject(Error('Preview styles failed'))},{once:true})
  if(!existing){link.rel='stylesheet';link.href=url;link.dataset.inlinePreviewStyle=id;document.head.append(link)}
 })
}
async function runtime(){
 stylesReady??=Promise.all([stylesheet(new URL('./starter/index.css',location.href).href,'package'),stylesheet(new URL('./starter/inline/inline-preview.css',location.href).href,'canvas')])
 await stylesReady
 runtimeModule??=import(new URL('./starter/inline/inline-preview.js',location.href).href)
 return runtimeModule
}
export function mountInlinePreviews(definitions,appearance){
 let disposed=false,instance,loading,sequence=0
 const mounted=new Set()
 const start=async definition=>{
  if(disposed||mounted.has(definition))return
  mounted.add(definition)
  const current=sequence
  try{
   loading??=runtime()
   const module=await loading
   if(disposed||current!==sequence||!definition.host.isConnected)return
   instance??=module.createInlinePreviewRuntime(appearance())
   definition.host.replaceChildren()
   instance.mount(definition)
   definition.host.removeAttribute('aria-busy')
  }catch(error){
   console.error('Inline preview failed',error)
   if(disposed||!definition.host.isConnected)return
   const note=document.createElement('p');note.className='sol-hint';note.setAttribute('role','status');note.textContent='실행 예제를 불러오지 못했습니다.'
   const link=document.createElement('a');link.className='sol-button';link.textContent='별도 화면에서 예제 열기';link.href=definition.fallback;link.target='_blank';link.rel='noopener'
   definition.host.replaceChildren(note,link);definition.host.removeAttribute('aria-busy')
  }
 }
 const observer=typeof IntersectionObserver==='undefined'?null:new IntersectionObserver(entries=>{
  for(const entry of entries)if(entry.isIntersecting){observer.unobserve(entry.target);const definition=definitions.find(item=>item.host===entry.target);if(definition)void start(definition)}
 },{rootMargin:'240px'})
 for(const definition of definitions){
  definition.host.id='inline-example-'+(++sequence)
  definition.host.setAttribute('aria-busy','true')
  const note=document.createElement('p');note.className='sol-hint';note.textContent='실행 예제를 불러오는 중…';definition.host.append(note)
  if(observer)observer.observe(definition.host)
 }
 if(!observer)for(const definition of definitions)void start(definition)
 return {
  sync(){if(!disposed)instance?.sync(appearance())},
  requestLeave:()=>instance?.requestLeave()??Promise.resolve(true),
  dispose(){disposed=true;sequence++;observer?.disconnect();instance?.dispose()},
 }
}
