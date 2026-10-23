import {releaseNotes} from './changelog-data.js';
export function renderReleases(h){
 const escape=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
 const inline=value=>escape(value).replace(/`([^`]+)`/g,'<code>$1</code>');
 return h.section('changelog',escape(releaseNotes.version),`${escape(releaseNotes.date)} · 한국시간`,`<article class="sol-card"><p class="sol-hint">${releaseNotes.version === '1.0.0' ? 'Sol UI의 첫 정식 버전' : '제공 기능과 지원 범위'}</p><ul class="rule-list">${releaseNotes.entries.map(entry=>'<li>'+inline(entry)+'</li>').join('')}</ul></article>`);
}
