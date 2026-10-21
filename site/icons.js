// Solyi line UI icons: original geometric paths. These are interface symbols, never brand marks.
export const solIconPaths = Object.freeze({
  check:'m5 12 4 4L19 6', close:'m6 6 12 12M18 6 6 18',
  arrow:'M4 12h16m-6-6 6 6-6 6', external:'M14 4h6v6m0-6L10 14M10 4H4v16h16v-6',
  chevron:'m6 9 6 6 6-6', search:'M20 20l-5-5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0',
  menu:'M4 6h16M4 12h16M4 18h16', more:'M5 12h.01M12 12h.01M19 12h.01',
  info:'M12 11v6m0-10v.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
  edit:'m15 4 5 5M4 20l4-1L21 6l-4-4L4 15v5Z',
  trash:'M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7',
  user:'M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0M4 21v-2a8 8 0 0 1 16 0v2',
  folder:'M3 6V4h6l2 3h10v13H3V6Z', plus:'M12 4v16M4 12h16', minus:'M4 12h16',
  calendar:'M4 5h16v16H4V5ZM8 2v6m8-6v6M4 11h16', save:'M4 3h13l4 4v14H3V3h1ZM7 3v6h10V3M7 21v-7h10v7'
});
export const solIconNames = Object.freeze(Object.keys(solIconPaths));
export function solIcon(name,{size=20,label=''}={}) {
  if(!solIconPaths[name]) throw new Error(`Unknown Solyi UI icon: ${name}`);
  if(![16,20,24].includes(size)) throw new Error('Icon size must be 16, 20 or 24');
  const safe=String(label).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  return `<svg class="sol-icon size-${size}" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" focusable="false" ${label?`role="img" aria-label="${safe}"`:'aria-hidden="true"'}><path d="${solIconPaths[name]}"></path></svg>`;
}
