import {designGuide} from './design-guide-data.js';
export function renderAiGuide(h){
 const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 return h.section('ai-guide','AI guide','소비 프로젝트에서 Sol UI를 사용할 때 AI와 함께 읽는 지침입니다.',
 `<div class="sol-card ai-guide-card"><p>루트의 <code>DESIGN.md</code> 한 파일에서 이 화면·복사 내용·다운로드·패키지 포함 파일을 생성합니다. 이 저장소의 개발 규칙과 소비 앱의 UI 지침은 구분합니다.</p><p class="sol-hint">파일명만으로 모든 AI가 자동으로 읽지는 않습니다. 사용하는 도구의 프로젝트 지침에서 참조하거나 작업 시작 때 제공하세요.</p><div class="button-row"><button type="button" class="sol-button primary" data-copy="${escape(designGuide.text)}">가이드 복사</button><a class="sol-button" href="./DESIGN.md" download="DESIGN.md">DESIGN.md 다운로드</a><a href="./DESIGN.md">원문 보기</a></div><h3>짧은 시작 프롬프트</h3><pre class="ai-guide-prompt" tabindex="0" role="group" aria-label="AI 시작 프롬프트"><code>${escape(designGuide.prompt)}</code></pre><button type="button" class="sol-button" data-copy="${escape(designGuide.prompt)}">프롬프트 복사</button><details class="ai-guide-reading"><summary>DESIGN.md 전체 읽기</summary><article aria-label="Sol UI 소비 프로젝트 지침">${designGuide.html}</article></details></div>`);
}
