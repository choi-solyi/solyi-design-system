import assert from 'node:assert/strict'
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const directory = new URL('../site/fonts/wanted-sans/', import.meta.url)

export function expandUnicodeRanges(value) {
  const points = new Set()
  for (const [, start, end] of value.matchAll(/U\+([0-9a-f]+)(?:-([0-9a-f]+))?/gi)) {
    const first = Number.parseInt(start, 16)
    const last = end ? Number.parseInt(end, 16) : first
    for (let point = first; point <= last; point++) points.add(point)
  }
  return points
}

export function formatUnicodeRanges(values) {
  const ranges = []
  for (const value of [...values].sort((a, b) => a - b)) {
    const previous = ranges.at(-1)
    if (previous && previous[1] + 1 === value) previous[1] = value
    else ranges.push([value, value])
  }
  const hex = (value) => value.toString(16).toUpperCase().padStart(4, '0')
  return ranges.map(([a, b]) => (a === b ? `U+${hex(a)}` : `U+${hex(a)}-${hex(b)}`)).join(',')
}

export function fontFaces(css) {
  return [...css.matchAll(/@font-face\s*\{([^}]+)\}/g)].map(([, body]) => ({
    file: body.match(/url\("\.\/([^"\s]+)"\)/)?.[1],
    unicodeRange: body.match(/unicode-range:\s*([^;]+);/)?.[1],
    body,
  }))
}

export async function composeWantedFontDelivery() {
  const css = await readFile(new URL('WantedSansVariable.split.original.css', directory), 'utf8')
  const validation = JSON.parse(await readFile(new URL('SPLIT-VALIDATION.json', directory), 'utf8'))
  const files = new Map(validation.files.map((file) => [file.local, file]))
  const covered = new Set()
  for (const face of fontFaces(css)) {
    const actual = expandUnicodeRanges(files.get(face.file).cmapRanges)
    for (const point of expandUnicodeRanges(face.unicodeRange)) {
      if (actual.has(point)) covered.add(point)
    }
  }
  const missing = [...expandUnicodeRanges(validation.original.cmapRanges)].filter(
    (point) => !covered.has(point),
  )
  assert.equal(missing.length, 103, 'Review a changed upstream distribution before regenerating')
  const supplement = formatUnicodeRanges(missing)
  const output = `${css}
/* The official split release omits ${missing.length} original cmap entries. Keep the original
   complete binary available only for those characters; no glyph is modified. */
@font-face {
    font-family: "Wanted Sans Variable";
    font-style: normal;
    font-display: swap;
    font-weight: 400 1000;
    src: url("./woff2/WantedSansVariable.woff2") format("woff2-variations");
    unicode-range: ${supplement};
}
`
  return { css: output, missing, supplement }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { css } = await composeWantedFontDelivery()
  if (process.argv.includes('--write')) {
    await writeFile(new URL('WantedSansVariable.css', directory), css)
    console.log('Generated official split CSS with exact original-font coverage supplement.')
  } else {
    assert.equal(await readFile(new URL('WantedSansVariable.css', directory), 'utf8'), css)
    console.log('PASS: deterministic split CSS and exact 103-codepoint coverage supplement.')
  }
}
