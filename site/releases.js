import {releaseNotes} from './changelog-data.js';
export function renderReleases(h){
 const escape=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
 const inline=value=>escape(value).replace(/`([^`]+)`/g,'<code>$1</code>');
 return h.section('changelog',releaseNotes.date,'한국시간 기준',`<article class="sol-card"><p class="sol-hint">문서 ${escape(releaseNotes.version)}</p><ul class="rule-list">${releaseNotes.entries.map(entry=>'<li>'+inline(entry)+'</li>').join('')}</ul></article>`);
}
