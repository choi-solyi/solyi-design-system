import {releaseHistory} from './changelog-data.js';
export function renderReleases(h){
 const escape=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
 const inline=value=>escape(value).replace(/`([^`]+)`/g,'<code>$1</code>');
 const releases=releaseHistory.map(release=>`<article class="sol-card" id="release-${release.version.replaceAll('.','-')}"><h3>${escape(release.version)}</h3><p class="sol-hint"><time datetime="${escape(release.date)}">${escape(release.date)}</time> · 한국시간${release.version === '1.0.0' ? ' · Sol UI의 첫 정식 버전' : ''}</p><ul class="rule-list">${release.entries.map(entry=>'<li>'+inline(entry)+'</li>').join('')}</ul><p><a href="https://www.npmjs.com/package/solyi-ui/v/${escape(release.version)}">npm ${escape(release.version)}</a> · <a href="https://github.com/choi-solyi/solyi-design-system/releases/tag/v${escape(release.version)}">GitHub Release</a></p></article>`).join('');
 const navigation=`<nav class="button-row" aria-label="릴리즈 버전">${releaseHistory.map(release=>`<a class="sol-button" href="#releases/release-${release.version.replaceAll('.','-')}">${escape(release.version)}</a>`).join('')}</nav>`;
 return h.section('changelog','변경 이력','버전별 변경사항을 최신순으로 제공합니다. 과거 버전의 날짜와 설명을 보존합니다.',`<div class="sol-stack">${navigation}${releases}</div>`);
}
