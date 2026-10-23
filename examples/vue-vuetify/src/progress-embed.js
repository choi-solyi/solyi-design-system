import { applySolyiAppearance } from 'solyi-ui'
import { measureEmbedHeight } from './embed-height.js'
export function mountProgressEmbed(
  theme,
  channel = 'progress',
  confirmLeave = () => Promise.resolve(true),
) {
  document.body.classList.add('starter-embed')
  if (window.parent === window) return () => {}
  const target = document.querySelector('.starter-main'),
    origin = location.origin
  const observed = new WeakSet()
  const resize = () => {
    const panels = [
      ...document.querySelectorAll('dialog[open],.v-overlay--active .v-overlay__content'),
    ]
    if (channel === 'recipe') {
      for (const panel of document.querySelectorAll('[popover]')) {
        try {
          if (panel.matches(':popover-open')) panels.push(panel)
        } catch {}
      }
    }
    for (const panel of panels) {
      if (!observed.has(panel)) {
        observer.observe(panel)
        observed.add(panel)
      }
    }
    const height = measureEmbedHeight(target, channel === 'recipe' ? panels : [], window)
    if (height > 0)
      window.parent.postMessage({ type: 'solyi:' + channel + '-height', height }, origin)
  }
  let disposed = false
  const receive = async e => {
    if (e.source !== window.parent || e.origin !== origin) return
    if (
      channel === 'recipe' &&
      e.data?.type === 'solyi:recipe-leave' &&
      typeof e.data.id === 'string' &&
      e.data.id.length < 80
    ) {
      const id = e.data.id
      window.parent.postMessage({ type: 'solyi:recipe-leave-ready', id }, origin)
      let allowed = false
      try {
        allowed = await confirmLeave()
      } catch {}
      if (!disposed)
        window.parent.postMessage(
          { type: 'solyi:recipe-leave-result', id, allowed: allowed === true },
          origin,
        )
      return
    }
    if (e.data?.type !== 'solyi:appearance') return
    const appearance = e.data.appearance || {}
    applySolyiAppearance(theme, appearance)
    document.documentElement.dataset.motionPolicy =
      appearance.motionPolicy === 'reduced' ? 'reduced' : 'system'
  }
  const observer = new ResizeObserver(resize)
  observer.observe(target)
  const changes = new MutationObserver(resize)
  if (channel === 'recipe')
    changes.observe(document.body, {
      subtree: true,
      attributes: true,
      attributeFilter: ['open', 'class'],
    })
  window.addEventListener('message', receive)
  document.addEventListener('toggle', resize, true)
  resize()
  window.parent.postMessage({ type: 'solyi:' + channel + '-ready' }, origin)
  const cleanup = () => {
    disposed = true
    observer.disconnect()
    changes.disconnect()
    window.removeEventListener('message', receive)
    document.removeEventListener('toggle', resize, true)
  }
  window.addEventListener('pagehide', cleanup, { once: true })
  return cleanup
}
