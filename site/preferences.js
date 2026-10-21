/* Local preferences only. No remote services or network request. */
try {
  const prefs = JSON.parse(localStorage.getItem('solyi-ds-prefs') || '{}');
  document.documentElement.dataset.mode = ['light','dark'].includes(prefs.mode) ? prefs.mode : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  if (['violet','sage','sand'].includes(prefs.theme)) document.documentElement.dataset.theme = prefs.theme;
  if (['comfortable','compact'].includes(prefs.density)) document.documentElement.dataset.density = prefs.density;
} catch { /* Storage may be unavailable. The light default remains usable. */ }
