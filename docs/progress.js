/* The canonical example executes the real installed Vue package in the same-origin starter. */
export function renderProgress(h){return h.section('progress','Progress bar & circle','설치한 SProgressLinear·SProgressCircular 예제를 직접 실행합니다.',h.demo('Actual package / fictional manual progress',`<iframe id="progress-package-frame" class="progress-package-frame" src="./starter/?view=progress" title="실제 패키지 진행 표시 예제" loading="lazy" height="620"></iframe><p class="sol-hint">이 프레임은 같은 사이트의 실제 패키지 소비 예제입니다. <a href="./starter/#s-progress-title">전체 starter에서 열기 →</a></p>`)+h.contract('Determinate, indeterminate, complete, error. Unknown에는 퍼센트/aria-valuenow가 없으며 오류는 마지막 값을 보존합니다.','프레임 안의 상태·범위·버튼은 Tab/방향키로 사용합니다. 완료·재시도 후 초점 복귀를 유지합니다.','같은 Core progress CSS / accent·success·danger / reduced-motion')+h.codeSample('실제 Vue 패키지 사용',`<script setup>
import {SProgressLinear, SProgressCircular} from '@solyi/vue-ui';
</script>
<SProgressLinear id="task-bar" label="작업 진행" :model-value="35" :show-value="true" :show-message="false" />
<SProgressCircular id="task-circle" label="파일 처리" state="indeterminate" />
<!-- modelValue는 표시 값입니다. 실제 작업이 갱신합니다.
     showLabel / showValue / showMessage는 각각 기본 true입니다.\n     표시를 꺼도 접근성 이름·값·상태 연결은 유지됩니다.\n     message에 직접 넣은 숫자는 앱이 관리합니다.\n     announce는 기본 false; 같은 작업의 live 안내는 한곳만 켭니다. -->`));}
export function mountProgress(root){const frame=root.querySelector('#progress-package-frame');if(!frame)return()=>{};const ctl=new AbortController(),signal=ctl.signal,origin=location.origin;
 const sync=()=>frame.contentWindow?.postMessage({type:'solyi:appearance',appearance:{theme:document.documentElement.dataset.theme,mode:document.documentElement.dataset.mode,density:document.documentElement.dataset.density}},origin);
 frame.addEventListener('load',sync,{signal});window.addEventListener('message',e=>{if(e.origin!==origin||e.source!==frame.contentWindow)return;if(e.data?.type==='solyi:progress-ready')sync();if(e.data?.type==='solyi:progress-height'&&Number.isFinite(e.data.height)){const height=Math.max(128,Math.min(1600,Math.ceil(e.data.height)));if(frame.height!==String(height))frame.height=String(height);}},{signal});
 const observer=new MutationObserver(sync);observer.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme','data-mode','data-density']});sync();return()=>{ctl.abort();observer.disconnect();};
}
