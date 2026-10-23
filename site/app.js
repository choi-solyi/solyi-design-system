import tokens from './token-data.js';
import {solIcon} from './icons.js';
import {highlightSample} from './code-highlight.js';
import {renderComponentReferences,mountComponentReferences} from './component-api.js';
import {renderGettingStarted,mountGettingStarted} from './getting-started.js';
import {renderReleases} from './releases.js';
import {mountVueExamples,mountVuePreviews} from './vue-examples.js';
import {mountOverflowText} from './overflow.js';
import {presentTopics,scrollToDocumentSection,getDocumentSearchEntries,resolveDocumentLocation} from './topics.js';
import {mountDocumentSearch} from './doc-search.js';
import {mountHeaderPreferences} from './header-preferences.js';
import {resolveAppearance,persistAppearance} from './appearance-state.js';
import {renderExpansion,mountExpansion,requestExpansionLeave} from './expansion.js';
import {renderPatternExamples, mountExamples} from './extended.js';
import {renderGoalSpecimen, renderMotionSection, mountMotion} from './motion.js';
import {renderColorExamples, mountColorExamples} from './palette.js';

const root = document.documentElement;
Object.assign(root.dataset,resolveAppearance());
const main = document.querySelector('main');
const announcement = document.querySelector('#announcement');
const dialog = document.querySelector('#detail-dialog');
const routes = {start:'Getting started',style:'Style',component:'Components',pattern:'Patterns',releases:'Releases',licensing:'Licensing'};
let snippetId = 0;
let toastTimer;
let headerPreferences=null;
let returnFocus;
let cleanupVueExamples=()=>{};
let cleanupVuePreviews=()=>{};
let cleanupComponentReferences=()=>{};
let cleanupGettingStarted=()=>{};
let cleanupOverflow = () => {}; let cleanupTopics = () => {}; let cleanupExpansion = () => {}; let routeId = 0; let cleanupExamples = () => {}; let cleanupMotion = () => {}; let cleanupColors = () => {};
const snippets = new Map();
const projects = [
  {title:'작은 정원 기록', type:'기록 도구', status:'진행 중', description:'식물 관찰을 모으는 가상의 프로젝트입니다.', next:'관찰 화면의 입력 흐름 정리'},
  {title:'저녁 책장', type:'독서 도구', status:'초안', description:'한 줄 감상을 모으는 가상의 독서 도구입니다.', next:'첫 기록을 남기는 빈 상태 설계'},
  {title:'주말 산책 지도', type:'탐색 도구', status:'진행 중', description:'산책 경로를 비교하는 가상의 탐색 도구입니다.', next:'검색과 결과 목록 연결'}
];
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const E = escapeHTML;
const section = (id, title, subtitle, content) => `<section id="${id}" class="section" aria-labelledby="${id}-title"><div class="section-header"><h2 id="${id}-title">${title}</h2>${subtitle ? `<p>${subtitle}</p>` : ''}</div>${content}</section>`;
const intro = (kicker, title, description) => `<div class="page-intro"><span class="eyebrow">${kicker}</span><h1 tabindex="-1">${title}</h1><p>${description}</p></div>`;
const localNav = items => `<nav class="local-nav" aria-label="이 문서의 항목">${items.map(([id,label])=>`<a href="#${currentRoute()}/${id}">${label} ↓</a>`).join('')}</nav>`;
function codeSample(label, code, {collapsible=true}={}) {
  const id = `snippet-${++snippetId}`;
  snippets.set(id, code);
  const body=`<div class="code-body"><div class="code-toolbar"><span class="code-language">${E(label)}</span><button class="sol-button subtle code-copy-button" type="button" data-copy-snippet="${id}" aria-label="현재 코드 복사" title="코드 복사"><span class="code-copy-glyph">${solIcon('copy',{size:16})}</span><span class="code-check-glyph">${solIcon('check',{size:16})}</span></button></div><pre tabindex="0" role="group" aria-label="${E(label)} 코드"><code>${highlightSample(code,label)}</code></pre></div>`;
  return collapsible?`<details class="code-example"><summary>${E(label)}</summary>${body}</details>`:`<div class="code-example" data-code-static>${body}</div>`;
}
const contract = (states, keys, mapping) => `<dl class="contract"><dt>상태</dt><dd>${states}</dd><dt>Keyboard</dt><dd>${keys}</dd><dt>Tokens</dt><dd>${mapping}</dd></dl>`;
const demo = (name, content, note = 'LIVE · 가상 데이터') => `<div class="demo"><div class="demo-header"><span>${name}</span><span>${note}</span></div><div class="demo-stage">${content}</div></div>`;
const footer = () => `<footer class="site-footer"><p>Solyi Design System · v${tokens.version} <span aria-hidden="true">/</span> 2026.10</p><p><a href="#theme/scope">범위와 검증</a> · <a href="https://github.com/choi-solyi/solyi-design-system">Source ↗</a></p></footer>`;

function overview() {
  return `<div class="overview-hero"><div class="page-intro"><span class="eyebrow">A PERSONAL DESIGN FOUNDATION</span><h1 class="intro-title" tabindex="-1">같은 결,<br><span class="accent">다른 표정.</span></h1><p>솔의 여러 앱이 함께 쓰는 작은 기준.<br>읽기 좋은 위계와 적당한 밀도를 바탕으로,<br>각 앱에 어울리는 색과 성격을 더합니다.</p><div class="button-row"><a class="sol-button primary" href="#style">Style 둘러보기 <span aria-hidden="true">→</span></a><a class="sol-button" href="#component">예시 사용하기</a></div></div><div>${renderGoalSpecimen()}<div class="hero-caption"><span>역할 기반 색</span><span>또렷한 위계</span><span>4px 간격 리듬</span></div></div></div>
  <div class="section-header"><h2>시스템의 네 가지 층</h2><p>Style → Component → Pattern</p></div>
  <div class="grid-4">${[
    ['01','Style','원칙과 역할 기반 토큰. 색보다 먼저, 화면의 뼈대를 정합니다.','style'],
    ['02','Component','버튼부터 피드백까지. 모양과 동작을 함께 살펴봅니다.','component'],
    ['03','Pattern','폼·검색·상세·비교. 작은 흐름을 끝까지 연결합니다.','pattern'],
    ['04','Theme','같은 구조에 다른 성격. 색과 밀도를 앱에 맞춥니다.','theme']
  ].map(([num,title,desc,route])=>`<a class="entry-card" href="#${route}"><span class="number">${num}<span class="arrow">↗</span></span><h3>${title}</h3><p>${desc}</p></a>`).join('')}</div>
  ${section('principles','색이 달라도, 같은 기준','작은 일관성을 쌓습니다.',`<div class="grid-3"><div class="principle"><span class="eyebrow">01 / HIERARCHY</span><h3>읽는 순서가 보이게</h3><p>제목, 설명, 행동을 구분합니다. 한 영역에서 가장 중요한 행동은 하나만 강조합니다.</p></div><div class="principle"><span class="eyebrow">02 / RHYTHM</span><h3>여백도 정보의 일부</h3><p>가까운 정보는 묶고 다른 맥락은 띄웁니다. 공간을 채우기 위한 카드나 장식을 더하지 않습니다.</p></div><div class="principle"><span class="eyebrow">03 / FEEDBACK</span><h3>지금 상태를 명확하게</h3><p>색만으로 뜻을 전하지 않습니다. 기다림, 오류, 완료에 설명과 다음 행동을 붙입니다.</p></div></div>`)}
  <div class="callout"><div><h3>바로 가져갈 수 있는 기본값</h3><p>프레임워크 독립 CSS 토큰과 단순 JSON export. 문서와 데모가 같은 토큰 소스를 씁니다.</p></div><div class="button-row"><a class="sol-button" href="./tokens.css" download>CSS ↓</a><a class="sol-button" href="./tokens.json" download>JSON ↓</a><a class="sol-button subtle" href="#theme/adoption">적용 방법 →</a></div></div>
  <p class="small muted" style="margin-top:20px">Cool violet은 기본 테마입니다. 앱에 맞춰 역할 색과 밀도를 조정할 수 있습니다.</p>`;
}

const colorRoles = {
  canvas:['Canvas','페이지의 바탕'], surface:['Surface','카드·입력 영역'], 'surface-alt':['Surface alt','구분이 필요한 보조 영역'],
  text:['Text','주요 본문과 제목'], muted:['Muted','설명과 메타 정보'], border:['Border','장식적 구획선'], 'control-border':['Control border','입력·조작 영역의 경계'],
  accent:['Accent','주요 행동과 선택'], 'accent-hover':['Accent hover','주요 행동에 포인터가 있을 때'], 'accent-soft':['Accent soft','선택된 영역의 바탕'], 'on-accent':['On accent','주요 행동 위의 글자'],
  focus:['Focus','키보드 탐색의 현재 위치'], success:['Success','완료·성공 안내'], 'success-soft':['Success soft','성공 안내 바탕'], warning:['Warning','행동 전 확인 안내'], 'warning-soft':['Warning soft','확인 안내 바탕'], danger:['Danger','오류·위험 안내'], 'danger-soft':['Danger soft','오류 안내 바탕'], info:['Info','중립적 진행 안내'], 'info-soft':['Info soft','진행 안내 바탕']
};
Object.assign(colorRoles,{'selected-surface':['Selected surface','선택한 행과 항목의 바탕'],'selected-text':['Selected text','선택 영역의 본문과 보조 글자'],'selected-border':['Selected border','선택을 식별하는 테두리'],'selected-indicator':['Selected indicator','선택 표시선과 체크 강조']});
function tokenCards(query='') {
  const theme = tokens.themes[root.dataset.theme];
  const colors = theme[root.dataset.mode];
  return Object.entries(colors).filter(([key,value])=>`${key} ${value} ${colorRoles[key].join(' ')}`.toLowerCase().includes(query.toLowerCase())).map(([key,value])=>`<button class="sol-token-card" data-copy="--sol-color-${key}: ${value};" aria-describedby="token-${key}-action"><span class="token-color" style="--swatch:${value}" aria-hidden="true"></span><span><strong id="token-${key}-name">${colorRoles[key][0]} <span class="token-value">${value}</span></strong><code id="token-${key}-variable">--sol-color-${key}</code><small id="token-${key}-help">${colorRoles[key][1]}</small><span id="token-${key}-action" hidden>CSS 선언 복사</span></span></button>`).join('');
}
function style() {
  return intro('01 / STYLE · CORE','보기 좋은 화면의 기본값','색의 이름 대신 역할로 연결합니다. 앱이 달라져도 읽는 순서, 간격의 관계, 상태를 알리는 방식은 이어집니다.') +
  localNav([['principles','Principles'],['tokens','Color tokens'],['color-examples','컬러 적용 예시'],['type','Typography'],['space','Space & density'],['accessibility','Accessibility'],['motion','Motion'],['icons','Icons'],['layers','Layers'],['writing','UI writing']]) +
  section('principles','Core의 경계','공통 규칙과 앱의 언어를 나눕니다.',`<div class="grid-2"><div class="sol-card"><h3>함께 가져가는 것</h3><ul class="rule-list"><li>제목 → 설명 → 행동의 정보 위계</li><li>16px 본문과 여유 있는 행간, 4px 기반 간격</li><li>역할 기반 색, 키보드 포커스, 오류·완료 안내</li><li>조밀한 화면에도 유지하는 터치 목표와 의미 구조</li></ul></div><div class="sol-card"><h3>앱에서 결정하는 것</h3><ul class="rule-list"><li>앱의 강조색·의미 색·목록 밀도</li><li>도메인의 정보 구조와 특수 시각화</li><li>게임의 전투력·등급·희귀도 색은 앱 전용 토큰</li><li>특정 프레임워크의 컴포넌트·라우터·상태 관리</li></ul></div></div>`) +
  section('tokens','역할로 연결하는 색','카드를 누르면 현재 CSS 선언이 복사됩니다.',`<div class="token-toolbar"><label class="sol-label" for="token-search">토큰 찾기</label><input class="sol-input" type="search" id="token-search" placeholder="역할, 설명, HEX로 검색" aria-describedby="token-search-help"><div class="token-actions"><a class="sol-button" href="#theme/themes">테마 바꾸기 →</a><a class="sol-button" href="./tokens.css" download>전체 CSS ↓</a><a class="sol-button" href="./tokens.json" download>JSON ↓</a></div><p id="token-search-help" class="sol-hint">현재 테마와 라이트·다크 모드의 값을 보여줍니다.</p></div><p id="token-count" class="small muted" role="status">${Object.keys(tokens.themes[root.dataset.theme][root.dataset.mode]).length}개 토큰 · ${E(tokens.themes[root.dataset.theme].label)} / ${root.dataset.mode}</p><div id="token-grid" class="token-grid">${tokenCards()}</div><p class="small muted" style="margin-top:16px"><code>border</code>는 구획용입니다. 입력처럼 경계 인지가 필요한 곳에는 더 뚜렷한 <code>control-border</code>를 씁니다. 상태 색은 UI의 의미이며 등급 색이 아닙니다.</p>${codeSample('CSS 역할 매핑 보기',`.app-panel {\n  background: var(--sol-color-surface);\n  color: var(--sol-color-text);\n  border: 1px solid var(--sol-color-border);\n  padding: var(--sol-space-6);\n  border-radius: var(--sol-radius-card);\n}\n.app-primary {\n  background: var(--sol-color-accent);\n  color: var(--sol-color-on-accent);\n}`)}`) +
  section('type','크기보다 먼저, 읽는 순서','Wanted Sans 1.0.3 · 같은 사이트에서 로드 · 코드 글꼴은 별도',`<dl><div class="type-sample"><dt>Display · 48 / 1.25<br>--sol-text-display</dt><dd style="font-size:clamp(2rem,4vw,3rem);font-weight:720;line-height:1.25;letter-spacing:-.04em">같은 결, 다른 표정.</dd></div><div class="type-sample"><dt>Section · 28 / 1.25<br>--sol-text-xl</dt><dd style="font-size:1.75rem;font-weight:700;line-height:1.25">읽는 순서가 보이게</dd></div><div class="type-sample"><dt>Title · 20 / 1.25<br>--sol-text-lg</dt><dd style="font-size:1.25rem;font-weight:650;line-height:1.25">오늘의 작은 기록</dd></div><div class="type-sample"><dt>Body · 16 / 1.65<br>--sol-text-md</dt><dd>중요한 정보는 먼저, 부가 설명은 다음에 둡니다. 한 문장에 하나의 뜻을 담습니다.</dd></div><div class="type-sample"><dt>Label · 14 / 1.65<br>--sol-text-sm</dt><dd class="small">레이블은 무엇을 입력할지, 안내는 왜 필요한지 설명합니다.</dd></div><div class="type-sample"><dt>Meta · 13 / 1.65<br>--sol-text-xs</dt><dd style="font-size:.8125rem" class="muted">초안 · 가상 프로젝트 · 방금 업데이트</dd></div></dl><p class="small muted">UI는 공식 Wanted Sans Variable을 self-host합니다. 로드 중에는 시스템 폰트로 표시하며 코드·pre·kbd·samp는 JetBrains Mono → Nanum Gothic Coding → monospace를 사용합니다. 한글은 글리프별로 보조 글꼴을 사용하며 UI 글꼴과 구분합니다. <a href="./fonts/wanted-sans/OFL.txt">OFL 원문</a> · <a href="./fonts/wanted-sans/SOURCE.json">고정 출처와 해시</a>. 본문은 60~70자 안팎의 줄 길이를 목표로 합니다. 표·메타 정보를 줄이기 전에 덜 중요한 정보를 접거나 나눕니다. 한국어 제목은 어절을 지키되 좁은 폭에서는 줄바꿈을 허용합니다.</p><pre class="code-font-sample" tabindex="0" role="group" aria-label="한영 주석 코드 글꼴 예시"><code>// English comment: keep the last valid value.
// 한글 주석: 유효한 마지막 값을 유지합니다.
const label = "가상 기록";
const valid = count &gt;= 0 &amp;&amp; count !== null;
// Symbols: {} [] () =&gt; === != + - * / %</code></pre><p class="small muted">코드 글꼴은 <a href="./fonts/jetbrains-mono/SOURCE.json">JetBrains Mono 2.304</a>와 <a href="./fonts/nanum-gothic-coding/SOURCE.json">나눔고딕코딩</a> 공식 원본을 같은 사이트에서 제공합니다. <a href="./fonts/jetbrains-mono/OFL.txt">JetBrains OFL</a> · <a href="./fonts/nanum-gothic-coding/OFL.txt">나눔 OFL</a>. 긴 코드는 가로 스크롤로 읽을 수 있습니다. 리가처 설정은 별도로 변경하지 않습니다.</p>`) +
  section('space','간격·밀도·모서리','4 · 8 · 12 · 16 · 24 · 32 · 48',`<div class="space-scale">${[4,8,12,16,24,32,48].map(n=>`<div><span class="space-block" style="--size:${n}px"></span><span>${n}px</span></div>`).join('')}</div><div class="grid-2"><div class="sol-card"><h3>관계로 쓰는 여백</h3><p class="small muted">레이블과 필드 8px, 같은 묶음 16px, 카드 내부 24px, 다른 섹션 32~48px를 출발점으로 둡니다. 모서리는 작은 표시 6px, 버튼 6px·필드 10px, 카드·작은 팝업 12px, 대화상자·큰 패널 16px로 역할을 나눕니다. 선은 기존 1px 구획선을 유지하며, 사선 모서리·장식용 그라데이션을 추가하지 않습니다.</p></div><div class="sol-card"><h3>접히는 화면에도 같은 흐름</h3><p class="small muted">넓을 때 나란한 영역은 좁으면 한 열로 쌓습니다. 내비게이션은 줄바꿈하며, 320px까지 읽기 흐름을 설계했습니다. 펼친 폴드는 폭에 따라 열 수를 늘리고, 힌지 전용 분할은 실제 기기 검증 후 도입합니다.</p><a href="#theme/density" class="small">밀도 선택해 보기 →</a></div></div><div class="shape-samples"><h3>부드러운 면, 절제된 컨트롤</h3><p class="small muted">색과 높이는 그대로 두고 면의 크기에 따라 둥글기를 나눕니다. 아래는 실제 공유 CSS를 사용하는 가상 예시입니다.</p><div class="shape-panel"><span class="sol-status">큰 패널 · 16px</span><div class="sol-card"><h4>카드 · 12px</h4><p class="small muted">패널 안에서도 카드는 별도 정보 묶음으로 읽힙니다.</p><div class="sol-card"><p class="small muted">카드 안의 보조 면 · 10px. 같은 반경을 반복해 부풀리지 않습니다.</p><label class="sol-field" for="shape-note"><span class="sol-label">가상 기록</span><input class="sol-input" id="shape-note" placeholder="짧은 기록을 입력해 보세요"><span class="sol-hint">필드 10px · 데스크톱 40px / 좁은 화면 44px</span></label><div class="button-row" style="margin-top:16px"><a href="#component/buttons" class="sol-button primary">버튼 예시 보기</a><span class="sol-status success">작은 배지 · 6px</span></div></div></div></div><dl class="contract shape-rules"><dt>6px · radius-small / button</dt><dd>배지·태그·작은 날짜 셀. 체크박스·라디오는 네이티브 모양을 유지하므로 OS에 따라 모서리가 다릅니다.</dd><dt>10px · radius-control / inset</dt><dd>입력·선택과 중첩 보조 면. 버튼은 radius-button 6px로 따로 유지합니다.</dd><dt>12px · radius-card</dt><dd>독립 카드·데이터 프레임. 안쪽 여백을 확보하고 같은 카드 안의 보조 면은 inset으로 줄입니다.</dd><dt>12px · radius-floating</dt><dd>메뉴·팝오버·달력·시간 선택·자동완성 목록·툴팁·토스트 같은 작은 팝업에 연결합니다.</dd><dt>16px · radius-panel</dt><dd>큰 예시 패널·대화상자. 화면 가장자리에 붙는 좁은 전체 높이 패널은 0px로 연결합니다.</dd></dl><p class="small muted">앱 CSS에서는 <code>border-radius: var(--sol-radius-control)</code>처럼 역할을 연결합니다. 버튼은 <code>--sol-radius-button</code>으로 분리하고 v0.2.2의 6px를 유지합니다. 원형 Avatar·로딩 표시·진행률·스위치는 의미에 맞는 원형을 유지합니다. 포커스 외곽선은 둥근 컨테이너 밖에서도 잘리지 않도록 여백을 확보합니다.</p></div>`) +
  section('accessibility','접근성을 위한 작업 기준','완전한 준수 인증을 뜻하지 않습니다.',`<ul class="rule-list"><li>일반 텍스트는 최소 4.5:1, 큰 텍스트는 3:1의 대비가 기준입니다. 큰 텍스트는 일반적으로 24 CSS px 이상 또는 약 18.7px 이상의 굵은 글자입니다. <a href="https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html">W3C Contrast ↗</a></li><li>키보드 위치는 3px 외곽선으로 표시합니다. 상태에는 색과 함께 글자를 쓰고, 필드 오류는 입력과 연결합니다.</li><li>데스크톱 버튼은 36px, 입력·선택은 40px입니다. 좁은 화면·터치 포인터에서는 자체 목표 44px 이상으로 늘립니다. 실제 박스 사이 간격을 유지하며 보이지 않는 클릭 영역을 겹치지 않습니다. WCAG 2.2 AA의 24×24 CSS px 또는 간격 등 예외 기준과 구분합니다. <a href="https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html">W3C Target size ↗</a></li><li>320 CSS px 리플로우를 목표로 설계했습니다. 의미상 2차원이 필요한 표·지도 등은 예외가 있지만, 각 셀의 내용은 계속 읽을 수 있어야 합니다. <a href="https://www.w3.org/WAI/WCAG22/Understanding/reflow.html">W3C Reflow ↗</a></li><li>움직임 줄이기 설정을 따릅니다. 실제 화면 낭독기, 400% 확대, 폴드 힌지, 브라우저별 동작은 후속 검증이 필요합니다.</li></ul><div class="callout"><div><h3>지금 확인할 수 있는 대비</h3><p>현재 테마·모드의 주요 역할 조합을 토큰 값으로 계산합니다. 전체 화면 접근성 감사는 별도입니다.</p></div></div><div id="contrast-results" style="margin-top:16px"></div>`) ;
}



function pattern() {
  return intro('03 / PATTERN','작은 흐름을 끝까지','컴포넌트를 모으는 데서 멈추지 않고, 입력과 기다림, 결과와 회복을 연결합니다. 데모 데이터는 가상이며 서버에 전송하지 않습니다.') +
  localNav([['form','Form'],['search','Search & detail'],['compare','Compare'],['empty','Empty state'],['data','Table & list'],['inputs','Local inputs'],['responses','Response states'],['composition','Composition'],['layouts','App shell'],['workflow','Edit & undo']]) +
  section('form','입력 → 검증 → 결과','오류가 나도 작성한 내용은 남습니다.',demo('Create project / Form',`<form id="project-form" class="form-demo" novalidate><label class="sol-field"><span class="sol-label">프로젝트 이름 <span class="muted">(필수)</span></span><input class="sol-input" id="project-name" name="projectName" autocomplete="off" required minlength="3" maxlength="40" aria-describedby="project-name-help project-name-error" placeholder="예: 작은 정원 기록"><span id="project-name-help" class="sol-hint">3~40자로 입력해 주세요. 개인 정보는 입력하지 마세요.</span><span id="project-name-error" class="sol-error" hidden></span></label><label class="sol-field"><span class="sol-label">프로젝트 유형</span><select name="projectType" class="sol-select"><option>기록 도구</option><option>탐색 도구</option><option>일정 도구</option></select></label><label class="sol-choice"><input type="checkbox" id="simulate-failure">실패 응답을 시뮬레이션하기</label><div class="button-row"><button class="sol-button primary" type="submit" id="form-submit">프로젝트 만들기</button><button class="sol-button" type="reset">초기화</button></div><div id="form-result" role="status" aria-live="polite"></div></form>`) + `<div class="demo-usage"><p><strong>의도</strong> 먼저 필요한 입력만 요청합니다. 검증은 제출 시 실행하고, 오류가 생긴 뒤에는 입력할 때 다시 확인합니다.</p><p><strong>상태</strong> 빈 입력 → 오류와 포커스 → 저장 중(약 0.7초) → 성공 또는 실패. 실패 체크를 해제한 후 다시 제출해 회복할 수 있습니다.</p></div>` + codeSample('Form 흐름의 핵심',`form.addEventListener('submit', async event => {
  event.preventDefault()
  if (busy) return
  if (!validate()) {
    nameInput.focus()
    return
  }
  setBusy(true) // aria-busy, aria-disabled + 이벤트 중복 차단
  try {
    await save()
    result.textContent = '프로젝트를 만들었어요.'
  } catch {
    result.textContent = '저장하지 못했어요. 입력은 남아 있습니다.'
  } finally {
    setBusy(false)
  }
})`)) +
  section('search','검색 → 결과 → 상세','결과 없음과 불러오기 실패를 구분합니다.',demo('Project explorer / Search',`<div class="sol-filterbar"><label class="sol-field"><span class="sol-label">프로젝트 검색</span><input class="sol-input" id="project-search" type="search" placeholder="정원, 책장, 산책" aria-describedby="search-help"><span class="sol-hint" id="search-help">이름과 유형을 검색합니다. 없는 단어를 넣어 빈 상태를 확인해 보세요.</span></label><label class="sol-field"><span class="sol-label">상태 필터</span><select class="sol-select" id="project-filter"><option value="all">전체 상태</option><option>진행 중</option><option>초안</option></select></label></div><div class="row-between" style="margin-top:16px"><p id="search-count" class="small muted" role="status" style="margin:0">결과 3개</p><button class="sol-button subtle" data-action="search-failure">로딩·실패 체험</button></div><div id="project-results" class="project-list sol-record-list" aria-label="검색 결과">${projectRows(projects)}</div>`) + `<div class="demo-usage"><p><strong>의도</strong> 검색과 필터의 조건을 유지하고 결과 수를 알립니다. 카드 전체를 클릭 영역으로 만들지 않고 명확한 상세 버튼을 둡니다.</p><p><strong>Keyboard</strong> 검색·필터 → 상세 버튼 순서로 이동합니다. 결과 갱신은 포커스를 가져가지 않습니다. 상세 모달은 Component의 Dialog 규칙을 따릅니다.</p></div>` + codeSample('Search 결과 구조',`<label for="query">프로젝트 검색</label>\n<input id="query" type="search" aria-describedby="query-help">\n<p id="query-help">이름과 유형을 검색합니다.</p>\n<p role="status">결과 2개</p>\n<ul aria-label="검색 결과">\n  <li>작은 정원 기록 <button type="button">상세 보기</button></li>\n</ul>\n<!-- 결과 없음: 조건을 지우는 행동을 함께 제공합니다.\n     실패: 조건을 유지하고 재시도 행동을 제공합니다. -->`)) +
  section('compare','같은 항목끼리 비교하기','가격·계정 없이 구성만 비교하는 가상 예시',demo('Comparison / Selection',`<fieldset class="choice-fieldset"><legend>작업 방식을 골라 보세요</legend><div class="compare-grid"><div class="compare-card"><h3>가볍게 기록</h3><p class="small muted">작은 생각을 빠르게 남기는 방식</p><dl><div><dt>입력 항목</dt><dd>이름 + 메모</dd></div><div><dt>보기 방식</dt><dd>단일 목록</dd></div><div><dt>어울리는 상황</dt><dd>개인 기록</dd></div></dl><label class="sol-choice"><input type="radio" name="compare" value="가볍게 기록" checked>가볍게 기록 선택</label></div><div class="compare-card"><h3>차근차근 정리</h3><p class="small muted">여러 항목을 기준에 따라 묶는 방식</p><dl><div><dt>입력 항목</dt><dd>이름 + 메모 + 분류</dd></div><div><dt>보기 방식</dt><dd>목록 + 필터</dd></div><div><dt>어울리는 상황</dt><dd>작은 자료실</dd></div></dl><label class="sol-choice"><input type="radio" name="compare" value="차근차근 정리">차근차근 정리 선택</label></div></div></fieldset><p id="compare-result" class="feedback-space" role="status">선택: 가볍게 기록</p>`) + `<div class="demo-usage"><p><strong>의도</strong> 같은 이름과 순서의 속성을 배치합니다. 카드 전체를 누르면 라디오가 선택됩니다. 작은 화면에서도 같은 순서와 선택 레이블을 유지합니다.</p><p><strong>Keyboard</strong> 라디오 그룹에 진입한 뒤 방향키로 선택합니다. 선택 결과를 글자로 알립니다. 추천 순위를 색으로만 전하지 않습니다.</p></div>` + codeSample('Compare의 의미 구조',`<fieldset>\n  <legend>작업 방식 선택</legend>\n  <article>\n    <h3>가볍게 기록</h3>\n    <dl><dt>보기 방식</dt><dd>단일 목록</dd></dl>\n    <label><input type="radio" name="method" value="simple">가볍게 기록 선택</label>\n  </article>\n  <!-- 다른 옵션도 같은 속성 이름과 순서를 사용합니다. -->\n</fieldset>\n<p role="status">선택: 가볍게 기록</p>`)) +
  section('empty','비어 있어도 다음 행동은 보이게','첫 사용 · 검색 결과 없음 · 오류는 서로 다른 상태',demo('First use / Empty state',`<div id="empty-demo"><div class="empty-state"><span class="empty-mark" aria-hidden="true">[ + ]</span><h3>아직 기록이 없어요.</h3><p>작은 관찰부터 하나 남겨 보세요.<br>예시 버튼을 누르면 가상 기록이 추가됩니다.</p><button class="sol-button primary" data-action="empty-add">첫 기록 추가</button></div></div><p id="empty-result" class="feedback-space" role="status"></p>`) + `<div class="grid-2" style="margin-top:16px"><div class="sol-card"><h3>검색 결과 없음</h3><p class="small muted">“조건에 맞는 항목이 없어요.” 어떤 조건을 바꾸면 되는지 안내하고, 조건 초기화 버튼을 둡니다.</p></div><div class="sol-card"><h3>불러오기 실패</h3><p class="small muted">“불러오지 못했어요.” 빈 목록처럼 보이지 않도록 오류를 밝히고 다시 시도할 수 있게 합니다.</p></div></div>` + codeSample('Empty state 사용 예시',`<section aria-labelledby="empty-title">\n  <h2 id="empty-title">아직 기록이 없어요.</h2>\n  <p>작은 관찰부터 하나 남겨 보세요.</p>\n  <button class="sol-button primary" type="button">첫 기록 추가</button>\n</section>\n<!-- 로딩이나 오류에 이 빈 상태 문구를 재사용하지 않습니다. -->`));
}

function projectRows(items) {
  return items.map(item=>`<article class="project-row sol-record-row"><div><h3><span class="sol-record-title">${E(item.title)}</span></h3><p>${E(item.type)} · ${E(item.status)}</p></div><button class="sol-button subtle sol-row-action" data-open-detail="${projects.indexOf(item)}" aria-label="${E(item.title)} 상세 보기">상세</button></article>`).join('');
}

function theme() {
  return intro('04 / THEME & ADOPTION','기본은 함께, 성격은 다르게','Core는 고정된 팔레트가 아닙니다. 같은 역할을 유지하면서 색과 밀도를 바꾸고, 앱의 의미는 별도의 토큰으로 더합니다.') +
  localNav([['themes','Themes'],['density','Density'],['adoption','Adoption'],['scope','Scope & sources'],['starter','Vue / Vuetify'],['versioning','Version policy']]) +
  section('themes','세 가지 시작점','선택하면 문서와 모든 데모가 함께 바뀝니다.',`<div class="grid-3">${Object.entries(tokens.themes).map(([key,data])=>`<article class="theme-card" data-theme="${key}" data-mode="${root.dataset.mode}"><div class="theme-preview"><div class="sol-card"><span class="sol-status">◷ 진행 중</span><strong class="theme-preview-title">작은 정원 기록</strong><p>위계와 간격은 그대로.</p><span class="sol-button primary" aria-hidden="true">새 기록</span></div></div><div class="theme-card-body"><h3>${E(data.label)}</h3><p>${E(data.description)}</p><button class="sol-button" data-set-theme="${key}" aria-pressed="${root.dataset.theme===key}">${root.dataset.theme===key?'선택됨':'이 테마 사용'}</button></div></article>`).join('')}</div><p class="small muted" style="margin-top:16px">세이지·샌드는 기존 공개 브랜드 팔레트에서 확장한 테마입니다. 원래 세이지 <code>#91A99A</code>를 작은 글자나 주요 버튼 배경으로 바로 쓰지 않고 대비를 고려해 역할 색을 조정했습니다. 각 테마는 라이트·다크 값을 따로 가집니다.</p><div class="callout"><div><h3>라이트와 다크는 명도 반전이 아닙니다.</h3><p>배경·표면·본문·강조의 관계를 각각 지정합니다. 상단 버튼으로 두 모드를 바꿔 살펴보세요.</p></div><button class="sol-button" data-action="toggle-mode">모드 전환</button></div>`) +
  section('density','밀도는 정보의 양에 맞게','조작 목표를 작게 만드는 옵션이 아닙니다.',`<fieldset class="choice-fieldset"><legend>문서·데모 밀도</legend><div class="density-control"><label class="sol-choice"><input type="radio" name="density" value="comfortable" ${root.dataset.density==='comfortable'?'checked':''}><span><strong>Comfortable</strong><br><span class="sol-hint">표 상하 6px · 리스트 상하 12px · 묶음 16px</span></span></label><label class="sol-choice"><input type="radio" name="density" value="compact" ${root.dataset.density==='compact'?'checked':''}><span><strong>Compact</strong><br><span class="sol-hint">표 상하 4px · 리스트 상하 8px · 묶음 12px</span></span></label></div></fieldset><div class="project-list sol-record-list">${projectRows(projects.slice(0,2))}</div><p class="small muted" style="margin-top:16px">두 옵션 모두 데스크톱 버튼 36px·필드 40px, 좁은 화면·터치 포인터 조작 높이 44px를 유지합니다. 밀도는 콘텐츠 간격과 목록 패딩을 조정합니다. 테마·모드·밀도 선택만 이 브라우저에 저장하며, 저장을 차단한 환경에서도 사용할 수 있습니다.</p>`) +
  section('adoption','하나의 화면부터 적용하기','CSS / JSON · 프레임워크 독립',`<ol class="adoption-steps"><li><div><h3>Core 파일을 가져옵니다.</h3><p>CSS 토큰을 앱의 전역 스타일 앞에서 불러옵니다. 데모 스타일이 필요하면 <code>components.css</code>도 선택적으로 가져옵니다. <code>docs.css</code>는 문서 사이트 셸 전용입니다.</p><div class="button-row" style="margin-top:12px"><a class="sol-button" href="./tokens.css" download>tokens.css ↓</a><a class="sol-button" href="./tokens.json" download>tokens.json ↓</a><a class="sol-button" href="./components.css" download>components.css ↓</a></div>${codeSample('기본 로드와 테마 설정',`<html lang="ko" data-theme="violet" data-mode="light"\n  data-density="comfortable">\n<head>\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <link rel="stylesheet" href="./tokens.css">\n  <link rel="stylesheet" href="./components.css">\n</head>` )}</div></li><li><div><h3>앱 색을 역할에 연결합니다.</h3><p>HEX 값을 컴포넌트마다 반복하지 않고 역할 토큰을 사용합니다. 테마를 추가할 때 hover·focus·오류·다크 모드의 조합도 함께 확인합니다.</p>${codeSample('앱별 테마와 도메인 토큰 분리',`/* 앱 전용 스타일에서 역할을 덮어씁니다. */\n[data-app="notebook"][data-mode="light"] {\n  --sol-color-accent: #476A56;\n  --sol-color-accent-hover: #355443;\n  --sol-color-accent-soft: #E6EEE7;\n  --sol-color-on-accent: #FFFFFF;\n  --sol-color-focus: #476A56;\n}\n/* 도메인 의미는 앱 네임스페이스로 분리합니다. */\n.notebook { --notebook-bookmark-color: #85614D; }\n/* 실제 도입 시 다크 값도 별도로 정의하고 검증합니다. */`)}</div></li><li><div><h3>구현체와 동작을 연결합니다.</h3><p>Vue 3에서는 solyi-ui의 전역 등록과 테마 설정을 사용합니다. 토큰과 기본 CSS는 프레임워크와 독립적으로도 사용할 수 있습니다. 다른 프레임워크의 동작은 별도 검증이 필요합니다.</p></div></li><li><div><h3>한 흐름을 확인한 뒤 넓힙니다.</h3><p>실제 앱의 폼 또는 검색 화면 하나에 적용해 위계·대비·포커스·오류 회복을 확인합니다. 검토 후 다음 컴포넌트를 추가합니다. 앱별 업무 규칙과 예외는 프로젝트의 디자인 지침에 기록합니다.</p></div></li></ol><div class="sol-notice">JSON은 Solyi의 <strong>단순 JSON export</strong>입니다. DTCG 호환을 표방하지 않습니다. <code>tokens.json</code>을 수정하고 <code>npm run build</code>를 실행하면 데모와 다운로드 CSS를 함께 생성합니다.</div>`) +
  section('scope','구현 범위와 검증','사용할 수 있는 기능과 검증 한계를 함께 확인합니다.',`<div class="grid-2"><div class="sol-card"><h3>제공 범위</h3><ul class="rule-list"><li>선택 상태를 포함한 역할 색 24개, 세 테마와 라이트·다크</li><li>글꼴·간격·모서리·밀도·모션 토큰과 CSS·JSON</li><li>Vue 컴포넌트, 실제 실행 샘플과 타입·이벤트·메서드 API</li><li>폼·검색·비교·데이터 조회·편집·오류 복구 패턴</li><li>단일 날짜·기간·시간 선택, 로컬 파일과 비동기 검색 시뮬레이션</li></ul></div><div class="sol-card"><h3>검증 한계</h3><ul class="rule-list"><li>자동 검사는 타입·패키지·대비·상태·키보드 흐름을 확인합니다.</li><li>Chrome의 대표 데스크톱·좁은 화면에서 실제 화면을 확인합니다.</li><li>Safari·실제 Fold·화면 낭독기·모든 화면의 확대 및 강제 색상은 별도 확인이 필요합니다.</li><li>전체 접근성 적합성이나 모든 앱·프레임워크와의 호환성을 보장하지 않습니다.</li></ul></div></div><h3>참고와 독립성</h3><ul class="source-list"><li><a href="https://design.yeolyi.com/">yeolyi.com 디자인 시스템 ↗</a><p>정보 구조와 UI·사이트 셸의 분리 개념을 참고했습니다. 원문과 시각 디자인은 복제하지 않았습니다.</p></li><li><a href="https://choi-solyi.github.io/solyi-brand-assets/">Solyi Brand Assets ↗</a><p>공식 sparkle 심볼과 favicon 원본을 사용합니다. 브랜드 파일은 재사용 코드 패키지에 포함하지 않습니다. <a href="#licensing/brand-license">브랜드 사용 범위</a>를 확인하세요.</p></li><li><a href="https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html">W3C Contrast (Minimum) ↗</a> · <a href="https://www.w3.org/WAI/WCAG22/Understanding/reflow.html">Reflow ↗</a> · <a href="https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html">Target Size (Minimum) ↗</a><p>구현 기준의 근거이며 사이트 전체의 인증을 의미하지 않습니다.</p></li></ul><p class="small muted">예제는 가상 데이터로 동작합니다. 파일은 브라우저 안에서만 처리하며 외부 서버로 전송하지 않습니다. 테마·모드·밀도는 이 브라우저에 저장되고 다른 예제의 입력은 새로고침하면 초기화됩니다.</p>`);
}

const documentationHelpers=()=>({section,demo,contract,codeSample,version:tokens.version});
function themeSections(){const template=document.createElement('template');template.innerHTML=theme()+renderExpansion('theme',documentationHelpers());return template.content;}
function start(){
 const original=document.createElement('template');original.innerHTML=overview();const legacy=themeSections();
 const order=['ai-guide','starter','adoption','themes','density','locale','advanced-vue','scope'];
 const steps=section('start-here','작은 화면 하나부터 시작하기','설치 → 공통 설정 → 첫 부품 → 앱의 상태 순서로 익힙니다.',
 '<ol class="adoption-steps"><li><div><h3>패키지를 설치합니다.</h3><p>solyi-ui와 Vue·Vuetify를 설치하고 버전을 고정합니다.</p><a href="#start/install">설치 안내 →</a></div></li><li><div><h3>공통 설정을 연결합니다.</h3><p>전역 등록과 Vue 자동 import, 타입·lint·스타일을 같은 기준으로 설정합니다.</p><a href="#start/registration">프로젝트 설정 →</a></div></li><li><div><h3>부품을 조합해 확인합니다.</h3><p>Examples에서 동작을 보고 Sample Code와 API로 필요한 계약을 확인합니다.</p><div class="button-row"><a href="#component/sbtn">Button →</a><a href="#pattern/form">폼 흐름 →</a></div></div></li></ol>');
 return original.content.querySelector('.overview-hero').outerHTML+steps+renderGettingStarted(documentationHelpers())+order.map(id=>legacy.querySelector('#'+id)?.outerHTML||'').join('')+original.content.querySelector('#principles').outerHTML;
}
function releases(){return intro('RELEASES','변경 이력','라이브러리와 문서의 변경 사항을 확인합니다.')+renderReleases(documentationHelpers());}

function licensing(){return intro('LICENSING','사용 범위와 라이선스','코드의 사용 허용과 브랜드·제삼자 자산의 권리를 구분합니다.')+
 section('code-license','재사용 코드 · MIT','UI 코드와 브랜드는 같은 허가 범위가 아닙니다.','<div class="sol-card"><p>@solyi/core와 solyi-ui의 자체 재사용 코드는 MIT입니다. 상업적 사용·수정·재배포는 원문 라이선스의 조건에 따르며 저작권 및 허가 고지를 보존합니다.</p><p><a href="https://github.com/choi-solyi/solyi-design-system/blob/main/LICENSE">MIT 원문</a> · <a href="https://github.com/choi-solyi/solyi-design-system/blob/main/LICENSE-SCOPE.md">적용 범위</a></p><p class="sol-hint">Core 토큰과 Vue UI의 사용·설정은 Getting started에서 확인하세요.</p></div>')+
 section('brand-license','브랜드 자산 제외','로고·캐릭터·개인 콘텐츠를 패키지 코드 라이선스로 허가하지 않습니다.','<div class="sol-card"><p>문서 헤더의 공식 sparkle 심볼과 favicon은 Solyi 브랜드 자산입니다. 재사용 UI 패키지에서는 제외합니다. MIT가 이름·로고·캐릭터·개인 콘텐츠의 상표권이나 사용 허가까지 부여하지 않습니다.</p><p><a href="https://choi-solyi.github.io/solyi-brand-assets/">공식 브랜드 자산과 사용 안내 ↗</a></p></div>')+
 section('third-party-license','폰트·아이콘·외부 의존성','원문 라이선스와 고지를 함께 보존합니다.','<div class="sol-card"><ul class="rule-list"><li>Wanted Sans, JetBrains Mono, 나눔고딕코딩: 각 원본 OFL 1.1·저작권·출처를 폰트와 함께 제공합니다.</li><li>공통 선형 UI 아이콘은 이 저장소의 자체 코드입니다. 브랜드 로고와 구분하며 자체 코드의 MIT 범위를 따릅니다.</li><li>Vue·Vuetify·Prism 등 외부 코드는 각 배포본의 원래 라이선스를 따릅니다. 패키지와 실행 예제의 THIRD-PARTY-NOTICES를 확인하세요.</li></ul><div class="button-row"><a href="./starter/THIRD-PARTY-NOTICES.txt">실행 예제 제삼자 고지</a><a href="./vendor/PRISM-LICENSE.txt">Prism MIT 원문</a><a href="./fonts/wanted-sans/OFL.txt">Wanted Sans OFL</a><a href="./fonts/jetbrains-mono/OFL.txt">JetBrains Mono OFL</a><a href="./fonts/nanum-gothic-coding/OFL.txt">나눔고딕코딩 OFL</a></div></div>');}
function currentRoute(){return resolveDocumentLocation(location.hash).route;}
function pageMarkup(route){
 const helpers=documentationHelpers();let body;
 if(route==='start')body=start();
 else if(route==='releases')body=releases();
 else if(route==='licensing')body=licensing();
 else if(route==='component'){
  body=intro('COMPONENTS','화면을 구성하는 부품','동작 예제를 먼저 살펴보고, 샘플 코드와 API로 프로젝트에 연결하세요.')+renderComponentReferences(helpers);
 }else body=({style,pattern}[route])()+(route==='pattern'?renderPatternExamples(helpers):renderColorExamples(helpers)+renderMotionSection({...helpers,tokens}))+renderExpansion(route,helpers);
 return '<div class="breadcrumb"><span>Solyi</span><span aria-hidden="true">/</span><span>'+routes[route]+'</span></div>'+body+footer();
}
function buildDocumentSearchIndex(){
 const saved=new Map(snippets),savedId=snippetId;try {return Object.keys(routes).flatMap(route=>{const template=document.createElement('template');template.innerHTML=pageMarkup(route);return getDocumentSearchEntries(template.content,route);});}
 finally {snippets.clear();for(const [key,value]of saved)snippets.set(key,value);snippetId=savedId;}
}
function render({focus=false}={}) {
  let route = currentRoute();
  if (!routes[route]) route = 'start';
  cleanupVueExamples(); cleanupVuePreviews(); cleanupComponentReferences(); cleanupGettingStarted(); cleanupOverflow(); cleanupTopics(); cleanupExpansion(); cleanupColors(); cleanupMotion(); cleanupExamples(); routeId++;
  snippets.clear();
  main.innerHTML = pageMarkup(route);
  cleanupVueExamples=mountVueExamples(main,codeSample);
  document.title = `Solyi Design System · ${routes[route]}`;
  cleanupTopics = presentTopics(main,route,{section,demo,contract,codeSample});
  cleanupVuePreviews = mountVuePreviews(main);
  cleanupComponentReferences=mountComponentReferences(main,{onNavigate:hash=>{displayedHash=hash;}});
  cleanupGettingStarted=mountGettingStarted(main);
  document.querySelectorAll('[data-route]').forEach(link=>{
    if (link.dataset.route===route) link.setAttribute('aria-current','page'); else link.removeAttribute('aria-current');
  });
  syncPreferences();
  if (route==='style') renderContrast();
  bindPageEvents(); cleanupExamples = mountExamples(main,notify); cleanupMotion = mountMotion(main); cleanupColors = mountColorExamples(main); cleanupExpansion = mountExpansion(main,notify); cleanupOverflow = mountOverflowText(main);
  const anchor = resolveDocumentLocation(location.hash).anchor;
  if (anchor) scrollToDocumentSection(anchor,{focus});
  else if (focus) scrollToDocumentSection('',{focus:true});
}
function persistPreferences() {
  persistAppearance(root.dataset);
}
function syncPreferences() {
  headerPreferences?.sync();
  document.querySelectorAll('input[name="density"]').forEach(input=>input.checked=input.value===root.dataset.density);
  document.querySelector('meta[name="theme-color"]').content=tokens.themes[root.dataset.theme][root.dataset.mode].canvas;
  document.querySelectorAll('.theme-card').forEach(card=>card.dataset.mode=root.dataset.mode);
  document.querySelectorAll('[data-set-theme]').forEach(button => {
    const selected = button.dataset.setTheme === root.dataset.theme
    const label = selected ? '선택됨' : '이 테마 사용'
    button.textContent = label
    button.setAttribute('aria-label', `${label} — ${tokens.themes[button.dataset.setTheme].label}`)
    button.setAttribute('aria-pressed', String(selected))
  })
}
function applyPreferences(next){
 // Appearance is a DOM-only update: keep document, selected panel and hash intact.
 const viewport={left:window.scrollX,top:window.scrollY},hash=location.hash;
 if(next.theme&&tokens.themes[next.theme])root.dataset.theme=next.theme;
 if(['comfortable','compact'].includes(next.density))root.dataset.density=next.density;
 if(['light','dark'].includes(next.mode))root.dataset.mode=next.mode;
 persistPreferences();syncPreferences();updateTokens();
 // CSS may synchronously change layout; do not turn this into route navigation.
 if(location.hash===hash&&(window.scrollX!==viewport.left||window.scrollY!==viewport.top))window.scrollTo({...viewport,behavior:'auto'});
 notify(`${tokens.themes[root.dataset.theme].label} · ${root.dataset.density==='compact'?'컴팩트':'기본'} · ${root.dataset.mode==='dark'?'다크':'라이트'}`);
}
function toggleMode(){applyPreferences({mode:root.dataset.mode==='dark'?'light':'dark'});}
function notify(message) {
  clearTimeout(toastTimer); announcement.textContent=message;
  toastTimer=setTimeout(()=>announcement.textContent='',4200);
}
async function copy(text) {
  try {await navigator.clipboard.writeText(text); notify('복사했어요.');return true;}
  catch {
    const area=document.createElement('textarea'); area.value=text; area.setAttribute('aria-label','복사할 내용'); area.style.cssText='position:fixed;left:0;top:0;width:1px;height:1px;opacity:0';
    document.body.append(area); const previous=document.activeElement; area.select();
    const copied=document.execCommand?.('copy'); area.remove(); previous?.focus();
    notify(copied?'복사했어요.':'자동 복사를 사용할 수 없어요. 코드 또는 다운로드 파일에서 복사해 주세요.');
    return !!copied;
  }
}
const codeCopyTimers=new WeakMap();
function showCodeCopyResult(button,id){
  if(!button.isConnected||button.dataset.copySnippet!==id)return;
  clearTimeout(codeCopyTimers.get(button));button.dataset.copied='true';button.setAttribute('aria-label','코드 복사 완료');
  codeCopyTimers.set(button,setTimeout(()=>{if(button.isConnected&&button.dataset.copySnippet===id){delete button.dataset.copied;button.setAttribute('aria-label','현재 코드 복사');}},1500));
}
function updateTokens() {
  const grid=document.querySelector('#token-grid'); if(!grid)return;
  const query=document.querySelector('#token-search').value;
  const cards=tokenCards(query); grid.innerHTML=cards || '<p class="small muted">일치하는 토큰이 없어요. 검색어를 바꿔 보세요.</p>';
  document.querySelector('#token-count').textContent=`${grid.querySelectorAll('.sol-token-card').length}개 토큰 · ${tokens.themes[root.dataset.theme].label} / ${root.dataset.mode}`;
  renderContrast();
}
function luminance(hex) {return hex.slice(1).match(/../g).map(x=>parseInt(x,16)/255).map(x=>x<=0.04045?x/12.92:((x+.055)/1.055)**2.4).reduce((sum,x,i)=>sum+x*[.2126,.7152,.0722][i],0);}
function contrast(a,b) {const x=luminance(a),y=luminance(b); return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);}
function renderContrast() {
  const target=document.querySelector('#contrast-results'); if(!target)return;
  const c=tokens.themes[root.dataset.theme][root.dataset.mode];
  const pairs=[['본문 / 바탕','text','canvas',4.5],['설명 / 표면','muted','surface',4.5],['강조 / 표면','accent','surface',4.5],['버튼 글자 / 강조','on-accent','accent',4.5],['성공 / 성공 바탕','success','success-soft',4.5],['성공 안내 / 표면','success','surface',4.5],['오류 / 오류 바탕','danger','danger-soft',4.5],['입력 경계 / 표면','control-border','surface',3]];
  target.innerHTML=`<table class="spec-table"><caption>${E(tokens.themes[root.dataset.theme].label)} / ${root.dataset.mode} · 선택한 조합</caption><thead><tr><th scope="col">조합</th><th scope="col">대비</th><th scope="col">계산 결과</th></tr></thead><tbody>${pairs.map(([label,a,b,min])=>{const ratio=contrast(c[a],c[b]);return `<tr><th scope="row">${label}</th><td>${ratio.toFixed(2)}:1</td><td>${ratio>=min?'충족':'검토 필요'} · ${min}:1</td></tr>`;}).join('')}</tbody></table>`;
}
const wait = ms => new Promise(resolve=>setTimeout(resolve,ms));
async function busyAction(button, callback, ms=700) {
  if(button.getAttribute('aria-disabled')==='true')return;
  const label=button.textContent; button.setAttribute('aria-busy','true');button.setAttribute('aria-disabled','true');button.textContent='처리 중…';
  await wait(ms);
  if(button.isConnected){button.removeAttribute('aria-busy');button.removeAttribute('aria-disabled');button.textContent=label;callback();}
}
main.addEventListener('click',async event=>{
  const button=event.target.closest('button'); if(!button)return;
  if(button.dataset.copy) {await copy(button.dataset.copy);return;}
  if(button.dataset.copySnippet) {const id=button.dataset.copySnippet;const copied=await copy(snippets.get(id));if(copied&&button.classList.contains('code-copy-button'))showCodeCopyResult(button,id);return;}
  if(button.dataset.setTheme) {applyPreferences({theme:button.dataset.setTheme});return;}
  if(button.dataset.openDetail!==undefined) {openDetail(Number(button.dataset.openDetail),button);return;}
  const action=button.dataset.action;
  if(action==='toggle-mode')toggleMode();
  if(action==='overview-save')await busyAction(button,()=>document.querySelector('#overview-feedback').textContent='✓ 브라우저 안에서 저장 동작을 체험했어요.');
  if(action==='button-feedback')document.querySelector('#button-feedback').textContent='✓ 변경 사항을 저장한 예시입니다.';
  if(action==='secondary-feedback')document.querySelector('#button-feedback').textContent='변경을 취소한 예시입니다.';
  if(action==='loading-demo')await busyAction(button,()=>document.querySelector('#button-feedback').textContent='✓ 저장 시뮬레이션을 마쳤어요.');
  if(action==='toast-demo')notify('복사 완료 안내의 예시입니다.');
  if(action==='retry-feedback')await busyAction(button,()=>document.querySelector('#retry-result').textContent='✓ 재시도에 성공한 예시입니다.');
  if(action==='search-failure')await searchFailure(button);
  if(action==='search-retry')updateSearch();
  if(action==='search-clear'){document.querySelector('#project-search').value='';document.querySelector('#project-filter').value='all';updateSearch();document.querySelector('#project-search').focus();}
  if(action==='empty-add'){
    document.querySelector('#empty-demo').innerHTML=`<article class="project-row sol-record-row"><div><h3>오늘의 첫 관찰</h3><p>잎이 한 장 더 자랐어요. · 가상 기록</p></div><button class="sol-button" data-action="empty-reset">기록 초기화</button></article>`;
    document.querySelector('#empty-result').textContent='✓ 첫 가상 기록을 추가했어요.';document.querySelector('[data-action="empty-reset"]').focus();
  }
  if(action==='empty-reset'){
    document.querySelector('#empty-demo').innerHTML=`<div class="empty-state"><span class="empty-mark" aria-hidden="true">[ + ]</span><h3>아직 기록이 없어요.</h3><p>작은 관찰부터 하나 남겨 보세요.</p><button class="sol-button primary" data-action="empty-add">첫 기록 추가</button></div>`;
    document.querySelector('#empty-result').textContent='가상 기록을 초기화했어요.';document.querySelector('[data-action="empty-add"]').focus();
  }
});
function openDetail(index, opener) {
  const project=projects[index];if(!project)return;
  returnFocus=opener;
  dialog.querySelector('h2').textContent=project.title;
  dialog.querySelector('#detail-dialog-description').textContent=project.description+' 모든 데모 데이터는 가상입니다.';
  dialog.querySelectorAll('dd')[0].textContent=project.status;
  dialog.querySelectorAll('dd')[1].textContent=project.next;
  if(typeof dialog.showModal==='function')dialog.showModal();
  else notify('이 브라우저는 native dialog를 지원하지 않아요. 최신 브라우저에서 상세 예시를 확인해 주세요.');
}
document.querySelector('#dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>returnFocus?.isConnected && returnFocus.focus());
let searchGeneration=0;
function updateSearch() {
  const results=document.querySelector('#project-results'); if(!results)return;
  searchGeneration++;
  results.removeAttribute('aria-busy');
  const query=document.querySelector('#project-search').value.trim().toLowerCase();
  const filter=document.querySelector('#project-filter').value;
  const items=projects.filter(p=>`${p.title} ${p.type}`.toLowerCase().includes(query) && (filter==='all'||p.status===filter));
  document.querySelector('#search-count').textContent=`결과 ${items.length}개`;
  results.innerHTML=items.length?projectRows(items):`<div class="empty-state"><span class="empty-mark" aria-hidden="true">[ 0 ]</span><h3>조건에 맞는 항목이 없어요.</h3><p>검색어나 상태 필터를 바꿔 보세요.</p><button class="sol-button" data-action="search-clear">조건 초기화</button></div>`;
}
async function searchFailure(button) {
  if(button.getAttribute('aria-disabled')==='true')return;
  const generation=++searchGeneration;
  const results=document.querySelector('#project-results');const count=document.querySelector('#search-count');
  results.setAttribute('aria-busy','true');results.innerHTML='<div class="sol-search-loading" role="status"><p class="small muted">예시 목록을 불러오는 중…</p></div>';count.textContent='불러오는 중';
  await busyAction(button,()=>{
    if(generation!==searchGeneration)return;
    results.removeAttribute('aria-busy'); count.textContent='불러오기 실패';
    results.innerHTML='<div class="sol-notice danger"><strong>목록을 불러오지 못했어요.</strong><p class="sol-notice-message">검색 조건은 남아 있습니다. 다시 시도해 주세요.</p><div class="sol-notice-actions"><button class="sol-button inline-action" type="button" data-action="search-retry">다시 불러오기</button></div></div>';
  });
}
function bindPageEvents() {
  document.querySelector('#token-search')?.addEventListener('input',updateTokens);
  document.querySelector('#project-search')?.addEventListener('input',updateSearch);
  document.querySelector('#project-filter')?.addEventListener('change',updateSearch);
  document.querySelectorAll('.compare-card').forEach(card=>{const input=card.querySelector('input[name="compare"]');if(!input)return;input.addEventListener('change',()=>document.querySelector('#compare-result').textContent=`선택: ${input.value}`);card.addEventListener('click',event=>{if(event.target.closest('input,label,a,button'))return;input.focus({preventScroll:true});input.click();});});
  document.querySelectorAll('input[name="density"]').forEach(input=>input.addEventListener('change',()=>applyPreferences({density:input.value})));
  const form=document.querySelector('#project-form');
  if(form) {
    const nameInput=form.elements.projectName;const error=document.querySelector('#project-name-error');const result=document.querySelector('#form-result');const submit=document.querySelector('#form-submit');
    let busy=false;let validated=false;
    const validate=()=>{
      const length=Array.from(nameInput.value.trim()).length;
      const message=length<3?'이름을 3자 이상 입력해 주세요.':length>40?'이름을 40자 이내로 입력해 주세요.':'';
      error.textContent=message;error.hidden=!message;
      if(message)nameInput.setAttribute('aria-invalid','true');else nameInput.removeAttribute('aria-invalid');
      return !message;
    };
    nameInput.addEventListener('input',()=>{if(validated)validate();});
    form.addEventListener('submit',async event=>{
      event.preventDefault();if(busy)return;validated=true;
      if(!validate()){result.textContent='입력 내용을 확인해 주세요.';nameInput.focus();return;}
      busy=true;const currentId=routeId;const name=nameInput.value.trim();const fail=document.querySelector('#simulate-failure').checked;
      submit.setAttribute('aria-busy','true');submit.setAttribute('aria-disabled','true');submit.textContent='만드는 중…';result.textContent='프로젝트 생성 응답을 기다리는 중…';
      await wait(700);if(!form.isConnected||currentId!==routeId)return;
      busy=false;submit.removeAttribute('aria-busy');submit.removeAttribute('aria-disabled');submit.textContent='프로젝트 만들기';
      result.className=`sol-notice ${fail?'danger':'success'}`;
      result.textContent=fail?'저장하지 못했어요. 입력은 남아 있습니다. 실패 시뮬레이션을 해제한 뒤 다시 제출해 주세요.':`✓ “${name}” 프로젝트를 만들었어요. 서버에 저장하지 않는 가상 결과입니다.`;
    });
    form.addEventListener('reset',event=>{
      if(busy){event.preventDefault();result.textContent='처리 중입니다. 응답이 온 뒤 초기화해 주세요.';return;}
      validated=false;error.hidden=true;error.textContent='';nameInput.removeAttribute('aria-invalid');result.className='';result.textContent='입력을 초기화했어요.';
      if(!busy)nameInput.focus();
    });
  }
}
headerPreferences=mountHeaderPreferences({themes:tokens.themes,getState:()=>root.dataset,apply:applyPreferences,toggleMode});
mountDocumentSearch({getDocuments:buildDocumentSearchIndex,goToSection:scrollToDocumentSection});
let displayedHash=location.hash||'#start',navigationRequest=0;
window.addEventListener('hashchange',async()=>{
  if(location.hash==='#main-content'){scrollToDocumentSection('',{focus:false});main.focus();return;}
  const nextHash=location.hash||'#overview',request=++navigationRequest;
  const nextPage=resolveDocumentLocation(nextHash).route;
  if(nextPage===main.dataset.page){displayedHash=nextHash;scrollToDocumentSection(resolveDocumentLocation(nextHash).anchor,{focus:true});return;}
  history.replaceState(null,'',displayedHash);
  const vueAllowed=await (cleanupVuePreviews.requestLeave?.()??true);
  const allowed=vueAllowed&&await requestExpansionLeave();
  if(request!==navigationRequest||!allowed)return;
  history.replaceState(null,'',nextHash);displayedHash=nextHash;
  render({focus:true});
});
render();
