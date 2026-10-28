import {onMounted,onBeforeUnmount,ref} from 'vue'

/** Private geometry shared by modal owners; no DOM reads during SSR. */
export function useVisualViewport() {
  const viewport=ref<{top:number;left:number;width:number;height:number}|null>(null)
  const update=()=>{
    const visible=window.visualViewport
    viewport.value={top:visible?.offsetTop||0,left:visible?.offsetLeft||0,width:visible?.width||window.innerWidth,height:visible?.height||window.innerHeight}
  }
  onMounted(()=>{update();window.addEventListener('resize',update);window.visualViewport?.addEventListener('resize',update);window.visualViewport?.addEventListener('scroll',update)})
  onBeforeUnmount(()=>{window.removeEventListener('resize',update);window.visualViewport?.removeEventListener('resize',update);window.visualViewport?.removeEventListener('scroll',update)})
  return viewport
}
