import {nextTick, onBeforeUnmount, onMounted, ref, watch} from 'vue';
import type {Ref} from 'vue';
interface FloatingOptions {
  placement?:()=> 'bottom-start'|'bottom-end'|'top-start'|'top-end';
  manageNative?:boolean;
  gap?:()=>number;
  margin?:()=>number|undefined;
  visualViewport?:boolean;
}

/** A local native top-layer panel with a positioned fallback. No global IDs. */
export function useFloatingPanel(open: Ref<boolean>, anchor: Ref<HTMLElement|null>, panel: Ref<HTMLElement|null>, matchWidth=false, avoidAnchor=false, options:FloatingOptions={}) {
  const position=ref<Record<string,string>>({left:'16px',top:'16px'});
  let revision=0,disposed=false,observer:ResizeObserver|undefined;
  function locate() {
    if(disposed||!open.value||!anchor.value||!panel.value)return;
    const viewport=options.visualViewport?window.visualViewport:undefined,leftEdge=viewport?.offsetLeft||0,topEdge=viewport?.offsetTop||0;
    const width=viewport?.width||document.documentElement.clientWidth||window.innerWidth;
    const height=viewport?.height||window.innerHeight,box=anchor.value.getBoundingClientRect();
    const size=panel.value.getBoundingClientRect();
    const edge=options.margin?.()??16;
    const actualWidth=Math.min(matchWidth?Math.max(160,box.width):size.width,Math.max(0,width-edge*2));
    if(avoidAnchor){
      const gap=options.gap?.()??(parseFloat(getComputedStyle(panel.value).getPropertyValue('--sol-space-2'))||0);
      const below=Math.max(0,topEdge+height-box.bottom-gap-edge),above=Math.max(0,box.top-gap-topEdge-edge),preferUp=options.placement?.().startsWith('top'),up=preferUp?(above>=size.height||above>below):(below<size.height&&above>below);
      const rtl=getComputedStyle(anchor.value).direction==='rtl';
      const alignEnd=options.placement?.().endsWith('end')||false;
      position.value={left:Math.max(leftEdge+edge,Math.min(rtl!==alignEnd?box.right-actualWidth:box.left,leftEdge+width-actualWidth-edge))+'px',...(up?{bottom:Math.max(edge,window.innerHeight-box.top+gap,window.innerHeight-topEdge-height+edge)+'px',top:'auto'}:{top:Math.max(topEdge+edge,box.bottom+gap)+'px',bottom:'auto'}),maxWidth:Math.max(0,width-edge*2)+'px',maxHeight:Math.min(height-edge*2,up?above:below)+'px',...(matchWidth?{width:actualWidth+'px'}:{})};
      return;
    }
    const below=box.bottom+8,top=below+size.height<=height-16?below:Math.max(16,box.top-size.height-8);
    position.value={left:Math.max(16,Math.min(box.left,width-actualWidth-16))+'px',top:top+'px',maxWidth:Math.max(0,width-32)+'px',maxHeight:Math.max(48,height-top-16)+'px',...(matchWidth?{width:actualWidth+'px'}:{})};
  }
  watch(open,async value=>{
    const current=++revision;
    if(!value){if(options.manageNative!==false)try{panel.value?.hidePopover?.();}catch{/* Already closed by the browser. */}return;}
    await nextTick();
    if(disposed||current!==revision||!open.value||!panel.value?.isConnected)return;
    if(options.manageNative!==false)try{panel.value.showPopover?.();}catch{/* Positioned DOM fallback remains operable. */}
    locate();
  },{immediate:true});
  onMounted(()=>{
    window.addEventListener('resize',locate);
    window.addEventListener('scroll',locate,true);
    if(options.visualViewport){window.visualViewport?.addEventListener('resize',locate);window.visualViewport?.addEventListener('scroll',locate);}
    if(typeof ResizeObserver!=='undefined'){observer=new ResizeObserver(locate);if(panel.value)observer.observe(panel.value);if(anchor.value)observer.observe(anchor.value);}
  });
  watch([panel,anchor],([nextPanel,nextAnchor],[oldPanel,oldAnchor])=>{if(observer){if(oldPanel)observer.unobserve(oldPanel);if(oldAnchor)observer.unobserve(oldAnchor);if(nextPanel)observer.observe(nextPanel);if(nextAnchor)observer.observe(nextAnchor);}if(open.value)void nextTick(locate);});
  onBeforeUnmount(()=>{disposed=true;revision++;observer?.disconnect();window.removeEventListener('resize',locate);window.removeEventListener('scroll',locate,true);window.visualViewport?.removeEventListener('resize',locate);window.visualViewport?.removeEventListener('scroll',locate);if(options.manageNative!==false)try{panel.value?.hidePopover?.();}catch{/* Detached native panel. */}});
  return {position,locate};
}
