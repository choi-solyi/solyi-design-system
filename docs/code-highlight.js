// Prism is loaded locally before the document app. Raw snippets remain separate.
export function sampleLanguage(code, label = '') {
  if (/<(?:script|template)\b/i.test(code) && /<(?:template|script)\b/i.test(code)) return 'vue';
  if (/\b(?:json|manifest)\b/i.test(label)) return 'json';
  if (/\b(?:css|tokens)\b/i.test(label) && !/<[a-z][^>]*>/i.test(code)) return 'css';
  if (/^\s*(?:npm |pnpm |yarn |#|npx )/m.test(code)) return 'bash';
  if (/<[a-z][^>]*>/i.test(code)) return 'markup';
  return 'typescript';
}

export function highlightSample(code, label = '') {
  const raw = String(code);
  const language = sampleLanguage(raw, label);
  const prism = globalThis.Prism;
  return prism?.languages?.[language]
    ? prism.highlight(raw, prism.languages[language], language)
    : raw.replace(/[&<>"']/g, char => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[char]));
}
