import {solIcon,solIconNames} from './icons.js';
export function renderFoundation(h) {
  return h.section('icons','Icons','하나의 선, 세 가지 크기',h.demo('Solyi line / interface symbols',`<div class="sol-icon-grid">${solIconNames.map(n=>`<div>${solIcon(n)}<code>${n}</code></div>`).join('')}</div><div class="button-row" style="margin-top:16px">${[16,20,24].map(s=>`<span class="sol-icon-size">${solIcon('search',{size:s})} ${s}px</span>`).join('')}<button class="sol-button" id="foundation-icon-action">${solIcon('check',{size:16})} 예시 확인</button><button class="sol-button sol-icon-button" id="foundation-icon-only" aria-label="아이콘 예시 닫기">${solIcon('close')}</button></div><p id="foundation-icon-result" class="sol-hint" role="status">모든 심볼은 현재 글자색을 따릅니다.</p>`) + h.contract('기본·hover·focus·disabled는 소속 버튼의 상태입니다. 브랜드 로고와 UI 아이콘은 별도 자산입니다.','버튼은 Tab → Enter/Space. 장식 SVG는 Tab 순서와 읽기에서 제외합니다.','icon-sm/md/lg · text · muted · accent · button-height · touch-target-min') + `<p class="small muted">기본 20px, 글자 옆 16px, 독립된 설명 24px. 동일 24 viewBox와 1.6px 둥근 선을 비례 축소합니다. 글자가 있으면 SVG는 aria-hidden, 아이콘만 있는 버튼은 버튼에 동사+대상 이름을 붙입니다. 색만으로 행동을 설명하지 않습니다. 좁은 화면의 버튼은 44px 이상입니다. 기존 ✓·오류 부호는 텍스트 상태 표기입니다.</p>` + h.codeSample('아이콘 재사용',`import {solIcon} from './icons.js';
// 사용자 문자열을 경로로 삽입하지 않고 정해진 이름을 사용합니다.
button.innerHTML = solIcon('save', {size:16}) + ' 저장';
// 장식 아이콘: aria-hidden. 아이콘만 있는 버튼: aria-label="기록 삭제".
// 별도 의미 있는 이미지: solIcon('info', {label:'추가 정보',size:24}).`)) +
  h.section('layers','Layer & elevation','겹침에는 이유와 순서를 둡니다.',`<div class="grid-2"><div class="sol-card"><h3>역할 토큰</h3><dl class="detail-list"><div><dt>base / sticky</dt><dd>0 / 20 · 본문과 고정 헤더</dd></div><div><dt>floating / toast</dt><dd>60 / 80 · 메뉴·도움말과 결과 알림</dd></div><div><dt>announcement</dt><dd>100 · 건너뛰기 링크·간단한 안내</dd></div><div><dt>native top layer</dt><dd>dialog.showModal() · 숫자 z-index보다 위</dd></div></dl></div><div class="sol-card sol-elevated"><h3>그림자는 떠 있는 영역에</h3><p>카드는 기본 평면, 메뉴·팝오버는 floating 그림자입니다. 모달은 공통 backdrop-color로 배경의 문맥을 남깁니다.</p><a href="#component/help">실제 팝오버 열기 →</a><p class="sol-hint">한 번에 하나의 주요 모달만 엽니다. 모달 뒤 토스트에 필수 오류를 두지 않습니다.</p></div></div>` + h.codeSample('레이어 재사용',`.app-popover { z-index:var(--sol-layer-floating); box-shadow:var(--sol-elevation-floating); }
.app-dialog::backdrop { background:var(--sol-backdrop-color); }
// stacking context 내부의 숫자입니다. native dialog top layer를 넘기려 올리지 않습니다.
// Escape·포커스 반환·스크롤 범위를 함께 설계합니다.`)) +
  h.section('writing','UI writing','무슨 일이 일어났고, 무엇을 할 수 있는지',`<div class="grid-2"><div class="sol-card"><h3>권장</h3><ul class="rule-list"><li>버튼: “기록 저장”, “필터 초기화”처럼 동사와 대상을 씁니다.</li><li>오류: “제목을 입력해 주세요.”처럼 위치와 해결을 말합니다.</li><li>파괴 행동: 영향과 복구 가능성을 실행 전에 설명합니다.</li><li>성공은 완료한 대상을, 빈 상태는 다음 행동을 안내합니다.</li></ul></div><div class="sol-card"><h3>피하기</h3><ul class="rule-list"><li>문맥 없는 “확인”, “처리”</li><li>“잘못됐습니다”, “오류 1001”만 표시</li><li>완료하지 않았는데 “저장 완료” 표시</li><li>사용자를 탓하거나 색으로만 오류 설명</li></ul></div></div>${h.demo('Copy lab / fictional states',`<label class="sol-field"><span class="sol-label">문구 상황</span><select class="sol-select" id="foundation-copy"><option value="error">입력 오류</option><option value="empty">검색 결과 없음</option><option value="success">저장 완료</option></select></label><div id="foundation-copy-output" class="sol-notice" role="status" style="margin-top:16px"></div>`)}${h.codeSample('문구와 간격 적용',`<label class="sol-field"><span class="sol-label">기록 제목</span>
  <input class="sol-input" aria-describedby="title-help">
  <span class="sol-hint" id="title-help">1~40자로 입력해 주세요.</span>
</label>
<!-- 레이블→컨트롤 8px / 필드 묶음 16px / 카드 내부 24px.
버튼 desktop 36px, 필드 40px, 좁은 화면/터치 모두 최소 44px.
알림 내 재시도·닫기는 inline-action. 실제 클릭 영역을 겹치지 않습니다. -->`)}`);
}
export function mountFoundation(root) {
  const control=new AbortController(),signal=control.signal,$=s=>root.querySelector(s);
  for(const id of ['foundation-icon-action','foundation-icon-only']) $('#'+id)?.addEventListener('click',()=>{$('#foundation-icon-result').textContent=id.endsWith('only')?'닫기 행동을 확인했습니다. 예시는 계속 표시합니다.':'✓ 아이콘과 레이블의 행동을 확인했습니다.';},{signal});
  const copy=$('#foundation-copy');
  const show=()=>{const data={error:['제목을 입력해 주세요.','“오류!”보다 원인과 해결을 함께 설명합니다.'],empty:['조건에 맞는 기록이 없어요. 검색어나 상태를 바꿔 보세요.','검색 결과와 처음 사용의 빈 상태를 구분합니다.'],success:['✓ 가상 기록을 저장했어요.','실제 저장 성공 후에만 보여 줍니다. 이 예시는 문구 시뮬레이션입니다.']}[copy.value];$('#foundation-copy-output').textContent=data.join(' ');};
  if(copy){copy.addEventListener('change',show,{signal});show();}return()=>control.abort();
}
