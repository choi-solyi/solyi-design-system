export function measureEmbedHeight(target, floatingPanels, view) {
  let height = target.getBoundingClientRect().height
  for (const panel of floatingPanels) {
    const limit = Number.parseFloat(view.getComputedStyle(panel).maxHeight)
    const inset = Number.isFinite(limit) ? Math.max(0, view.innerHeight - limit) : 48
    const border = panel.offsetHeight - panel.clientHeight
    height = Math.max(height, 480, panel.scrollHeight + border + inset)
  }
  return Math.ceil(height)
}
