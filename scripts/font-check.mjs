import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import {
  composeWantedFontDelivery,
  expandUnicodeRanges,
  fontFaces,
} from './wanted-font-delivery.mjs'
import { wantedSansSiteFiles, wantedSansStarterFiles } from './wanted-font-files.mjs'

const root = new URL('../', import.meta.url)
const read = (path) => readFile(new URL(path, root))
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex')
const sourceOnly = process.argv.includes('--source-only')
const prefix = 'site/fonts/wanted-sans/'
const source = JSON.parse(await read(prefix + 'SOURCE.json'))
const validation = JSON.parse(await read(prefix + 'SPLIT-VALIDATION.json'))

assert.equal(source.version, '1.0.3')
assert.equal(source.commit, '02c9b822349c188ada95f9e2d90c2ed18f853235')
assert.equal(source.modified, false, 'The upstream font binaries and vendor CSS remain unmodified')
assert.equal(source.license, 'OFL-1.1')
assert.equal(source.files.length, 96)
assert.equal(wantedSansStarterFiles.length, 92)
assert.equal(new Set(wantedSansSiteFiles).size, wantedSansSiteFiles.length)
for (const file of source.files) {
  const bytes = await read(prefix + file.local)
  assert.equal(bytes.length, file.bytes, file.local)
  assert.equal(hash(bytes), file.sha256, file.local)
  assert.equal(
    createHash('sha1')
      .update(Buffer.from('blob ' + bytes.length + '\0'))
      .update(bytes)
      .digest('hex'),
    file.gitBlob,
    'Pinned upstream Git blob: ' + file.local,
  )
}
const originalSourceBytes = await read(prefix + source.originalSource.local)
assert.equal(hash(originalSourceBytes), source.originalSource.sha256)
const originalSource = JSON.parse(originalSourceBytes)
assert.equal(originalSource.files.length, 3, 'Keep the original complete distribution provenance')
for (const file of originalSource.files) {
  const local =
    file.local === 'WantedSansVariable.css'
      ? 'WantedSansVariable.complete.original.css'
      : file.local
  assert.equal(hash(await read(prefix + local)), file.sha256)
}
const original = await read(prefix + 'woff2/WantedSansVariable.woff2')
assert.equal(original.subarray(0, 4).toString(), 'wOF2')
assert.equal(hash(original), '4259e7e9a172e634c2cb419d793b84148990316341e910443e5d10965b2c8f16')
assert.equal(validation.original.sha256, hash(original))
assert.equal(validation.original.cmapCount, 12032)
assert.equal(validation.original.glyphCount, 12663)
assert.equal(validation.splitCount, 92)
assert.equal(validation.faceCount, 93)
assert.deepEqual(validation.original.axes, [['wght', 400, 400, 1000]])
assert.deepEqual(validation.weightsCompared, [400, 700, 1000])
assert.deepEqual(validation.errors, [])
assert.deepEqual(validation.missingOriginalGlyphSignatures, { 400: 0, 700: 0, 1000: 0 })

const cssBytes = await read(prefix + source.delivery.stylesheet)
const css = cssBytes.toString()
assert.equal(hash(cssBytes), source.delivery.sha256)
assert.equal(hash(cssBytes), validation.cssSha256)
const composed = await composeWantedFontDelivery()
assert.equal(css, composed.css, 'The active CSS is deterministic and keeps the vendor CSS intact')
assert.equal(composed.missing.length, source.delivery.supplement.codepoints)
assert.equal(composed.supplement, source.delivery.supplement.unicodeRange)
assert.ok(!/url\(["']?https?:/.test(css), 'All font URLs remain self-hosted')
const faces = fontFaces(css)
assert.equal(faces.length, 93)
const records = new Map(validation.files.map((file) => [file.local, file]))
const union = new Set()
for (const face of faces) {
  assert.match(face.body, /font-family:\s*"Wanted Sans Variable"/)
  assert.match(face.body, /font-weight:\s*400 1000/)
  assert.match(face.body, /font-display:\s*swap/)
  assert.ok(face.unicodeRange, 'Every face limits the characters that can trigger its download')
  const record = records.get(face.file)
  assert.ok(record, 'Glyph validation includes ' + face.file)
  assert.equal(hash(await read(prefix + face.file)), record.sha256)
  const cmap = expandUnicodeRanges(record.cmapRanges)
  assert.equal(cmap.size, record.cmapCount)
  for (const codepoint of expandUnicodeRanges(face.unicodeRange)) {
    if (cmap.has(codepoint)) union.add(codepoint)
  }
}
const originalCmap = expandUnicodeRanges(validation.original.cmapRanges)
assert.equal(union.size, 12032)
assert.deepEqual(
  [...union].sort((a, b) => a - b),
  [...originalCmap].sort((a, b) => a - b),
)
for (let point = 0xac00; point <= 0xd7a3; point++)
  assert.ok(union.has(point), 'Every Hangul syllable')
for (const char of '가힣 English 0123 ₩→…✓ɐe\u0301ﬃ⅛⸺') assert.ok(union.has(char.codePointAt(0)))
const completeFace = faces.filter((face) => !face.file.includes('.split.'))
assert.equal(completeFace.length, 1)
const supplement = expandUnicodeRanges(completeFace[0].unicodeRange)
assert.equal(supplement.size, 103, 'Only the omitted original characters can request the full font')
for (const char of '가힣 English 0123 ₩→…✓') assert.ok(!supplement.has(char.codePointAt(0)))
for (const char of 'ɐ\u0301ﬃ⅛⸺') assert.ok(supplement.has(char.codePointAt(0)))
const tokens = JSON.parse(await read('tokens.json'))
assert.match(tokens.base['font-sans'], /^"Wanted Sans Variable", "Wanted Sans",/)
assert.ok(tokens.base['font-sans'].includes('Malgun Gothic'))
assert.equal(tokens.base['font-mono'], '"JetBrains Mono", "Nanum Gothic Coding", monospace')
assert.match(
  (await read('site/index.html')).toString(),
  /rel="stylesheet" href="\.\/fonts\/wanted-sans\/WantedSansVariable.css"/,
)
for (const path of ['examples/vue-vuetify/src/main.js', 'examples/package-consumer/main.ts']) {
  const entry = (await read(path)).toString()
  if (entry.includes("import 'solyi-ui/all.css'")) {
    assert.match(
      (await read('packages/vue-ui/src/all.css')).toString(),
      /@import '\.\/core\/fonts\/wanted-sans\/WantedSansVariable\.css';/,
      'The combined entry includes the same UI font stylesheet',
    )
  } else assert.ok(entry.includes("import 'solyi-ui/fonts.css'"), path + ': UI font import')
}
if (!sourceOnly) {
  for (const name of wantedSansSiteFiles) {
    const bytes = await read('site/' + name)
    assert.deepEqual(bytes, await read('packages/core/dist/' + name))
    assert.deepEqual(bytes, await read('docs/' + name))
  }
  for (const face of faces) {
    const basename = face.file.split('/').at(-1)
    assert.deepEqual(await read(prefix + face.file), await read('docs/starter/' + basename))
    for (const app of ['package-consumer', 'vue-vuetify'])
      assert.deepEqual(
        await read(prefix + face.file),
        await read(
          'examples/' + app + '/node_modules/solyi-ui/dist/core/fonts/wanted-sans/' + face.file,
        ),
      )
  }
  assert.ok(
    (await read('examples/vue-vuetify/dist/THIRD-PARTY-NOTICES.txt'))
      .toString()
      .includes((await read(prefix + 'OFL.txt')).toString()),
  )
  await import('./code-font-check.mjs')
}
console.log(
  'PASS: pinned unmodified originals, 92 official splits + 103-character complete-font supplement, all 12,032 cmap entries, recorded glyph/advance/axis/line-metric validation and unchanged import/fallback contracts.' +
    (sourceOnly ? ' Source-only check; generated copies await integration.' : ''),
)
