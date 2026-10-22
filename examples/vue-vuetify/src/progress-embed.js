import {applySolyiAppearance} from '@solyi/vue-ui';
export function mountProgressEmbed(theme){
 document.body.classList.add('starter-embed');
 if(window.parent===window)return()=>{};
 const target=document.querySelector('.starter-main'),origin=location.origin;
 const resize=()=>{const height=Math.ceil(target.getBoundingClientRect().height);if(height>0)window.parent.postMessage({type:'solyi:progress-height',height},origin);};
 const receive=e=>{if(e.source!==window.parent||e.origin!==origin||e.data?.type!=='solyi:appearance')return;const appearance=e.data.appearance||{};applySolyiAppearance(theme,appearance);document.documentElement.dataset.motionPolicy=appearance.motionPolicy==='reduced'?'reduced':'system';};
 const observer=new ResizeObserver(resize);observer.observe(target);window.addEventListener('message',receive);resize();window.parent.postMessage({type:'solyi:progress-ready'},origin);
 const cleanup=()=>{observer.disconnect();window.removeEventListener('message',receive);};window.addEventListener('pagehide',cleanup,{once:true});return cleanup;
}
