import { readFile } from 'node:fs/promises'
import path from 'node:path'

const root = new URL('../', import.meta.url)

export async function documentShell(source, version) {
  const sheets = [...source.matchAll(/<link rel="stylesheet" href="\.\/([^\"]+)">/g)]
  const css = []
  for (const [, asset] of sheets) {
    const location = asset === 'tokens.css' ? 'docs/' : 'site/'
    const original = await readFile(new URL(location + asset, root), 'utf8')
    const rebased = original.replace(/url\((['"]?)(\.\/[^)'"\s]+)\1\)/g, (_, quote, value) => {
      const target = path.posix.normalize(path.posix.join(path.posix.dirname(asset), value))
      return `url(${quote}./${target}${quote})`
    })
    css.push(`/* ${asset} */\n${rebased}`)
  }
  let first = true
  let html = source.replace(/<link rel="stylesheet" href="\.\/([^\"]+)">/g, () => {
    if (!first) return ''
    first = false
    return '<link rel="stylesheet" href="./shell.css">'
  })
  const preferences = await readFile(new URL('site/preferences.js', root), 'utf8')
  html = html.replace('<script src="./preferences.js"></script>', `<script>${preferences}</script>`)
  return {
    html: html.replaceAll('__SOLYI_DOCUMENT_VERSION__', version).replace(/^[ \t]+$/gm, ''),
    css: css.join('\n'),
  }
}
