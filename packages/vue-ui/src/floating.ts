import {nextTick, onBeforeUnmount, onMounted, ref, watch} from 'vue';
import type {Ref} from 'vue';

/** A local native top-layer panel with a positioned fallback. No global IDs. */
export function useFloatingPanel(open: Ref<boolean>, anchor: Ref<HTMLElement|null>, panel: Ref<HTMLElement|null>, matchWidth=false) {
  const position=ref<Record<string,string>>({left:'16px',top:'16px'});
  let revision=0,disposed=false,observer:ResizeObserver|undefined;
  function locate() {
    if(!open.value||!anchor.value||!panel.value)return;
    const width=document.documentElement.clientWidth||window.innerWidth;
    const height=window.innerHeight,box=anchor.value.getBoundingClientRect();
    const size=panel.value.getBoundingClientRect();
    const actualWidth=Math.min(matchWidth?Math.max(160,box.width):size.width,width-32);
    const below=box.bottom+8,top=below+size.height<=height-16?below:Math.max(16,box.top-size.height-8);
    position.value={left:Math.max(16,Math.min(box.left,width-actualWidth-16))+'px',top:top+'px',maxWidth:Math.max(0,width-32)+'px',maxHeight:Math.max(48,height-top-16)+'px',...(matchWidth?{width:actualWidth+'px'}:{})};
  }
  watch(open,async value=>{
    const current=++revision;
    if(!value){try{panel.value?.hidePopover?.();}catch{/* Already closed by the browser. */}return;}
    await nextTick();
    if(disposed||current!==revision||!open.value||!panel.value?.isConnected)return;
    try{panel.value.showPopover?.();}catch{/* Positioned DOM fallback remains operable. */}
    locate();
  },{immediate:true});
  onMounted(()=>{
    window.addEventListener('resize',locate);
    window.addEventListener('scroll',locate,true);
    if(typeof ResizeObserver!=='undefined'){observer=new ResizeObserver(locate);if(panel.value)observer.observe(panel.value);if(anchor.value)observer.observe(anchor.value);}
  });
  onBeforeUnmount(()=>{disposed=true;revision++;observer?.disconnect();window.removeEventListener('resize',locate);window.removeEventListener('scroll',locate,true);try{panel.value?.hidePopover?.();}catch{/* Detached native panel. */}});
  return {position,locate};
}
