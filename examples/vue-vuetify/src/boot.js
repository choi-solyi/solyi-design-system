// This adapter only reveals the mounted app; it does not load another Vue copy.
export function waitForStarterStyles(document = globalThis.document) {
  return Promise.all([...document.querySelectorAll('link[data-starter-css]')].map(link => {
    if (link.dataset.starterCss === 'ready') return Promise.resolve();
    if (link.dataset.starterCss === 'error') return Promise.reject(new Error('Starter stylesheet failed'));
    return new Promise((resolve, reject) => {
      const cleanup = () => {link.removeEventListener('load', loaded); link.removeEventListener('error', failed);};
      const loaded = () => {if (link.dataset.starterCss === 'ready') {cleanup(); resolve();}};
      const failed = () => {cleanup(); reject(new Error('Starter stylesheet failed'));};
      link.addEventListener('load', loaded);
      link.addEventListener('error', failed, {once: true});
      // A preload may have become a stylesheet between the first check and wiring.
      loaded();
    });
  }));
}

export async function revealStarter(document = globalThis.document, boot = globalThis.__solyiStarterBoot) {
  if (!boot) return; // Synthetic component tests intentionally do not load the HTML shell.
  try {
    await waitForStarterStyles(document);
    // Layout requests the fonts used by the mounted, visibility-hidden content.
    document.getElementById('app')?.getBoundingClientRect();
    try {await document.fonts?.ready;} catch { /* Failed fonts use the existing system fallback. */ }
    boot.ready();
  } catch {boot.fail();}
}
