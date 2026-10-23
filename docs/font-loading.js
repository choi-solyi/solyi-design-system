// Shared by the document shell and the Vue starter. Font failure keeps the fallback stack.
export function observeCodeFonts({ root = document, load }) {
  const view = root.ownerDocument?.defaultView || root.defaultView
  let started = false
  let disposed = false
  let scheduled = false
  const seen = new WeakSet()
  const start = () => {
    if (started || disposed) return
    started = true
    observer?.disconnect()
    mutations?.disconnect()
    Promise.resolve()
      .then(load)
      .catch(() => {})
  }
  const observer = view.IntersectionObserver
    ? new view.IntersectionObserver(
        entries => {
          if (entries.some(entry => entry.isIntersecting)) start()
        },
        { rootMargin: '160px 0px' },
      )
    : null
  const scan = () => {
    scheduled = false
    if (started || disposed) return
    const targets = root.querySelectorAll('pre, code, kbd, samp')
    if (!observer && targets.length) return start()
    for (const target of targets) {
      if (seen.has(target)) continue
      seen.add(target)
      observer.observe(target)
    }
  }
  const mutations = new view.MutationObserver(() => {
    if (scheduled || started || disposed) return
    scheduled = true
    queueMicrotask(scan)
  })
  mutations.observe(root, { childList: true, subtree: true })
  scan()
  return () => {
    disposed = true
    observer?.disconnect()
    mutations.disconnect()
  }
}

export function loadCodeFontStylesheet(href, target = document) {
  const url = new URL(href, target.baseURI).href
  let link = [...target.querySelectorAll('link[rel="stylesheet"]')].find(item => item.href === url)
  if (link?.sheet) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const existing = Boolean(link)
    link ||= target.createElement('link')
    const cleanup = () => {
      link.removeEventListener('load', loaded)
      link.removeEventListener('error', failed)
    }
    const loaded = () => {
      cleanup()
      resolve()
    }
    const failed = () => {
      cleanup()
      reject(new Error('Code font stylesheet failed'))
    }
    link.addEventListener('load', loaded, { once: true })
    link.addEventListener('error', failed, { once: true })
    if (!existing) {
      link.rel = 'stylesheet'
      link.href = url
      target.head.append(link)
    }
  })
}
