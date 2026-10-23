import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const expectedImports = [
  'vuetify/styles',
  './core/fonts/wanted-sans/WantedSansVariable.css',
  './core/tokens.css',
  './core/components.css',
  './styles.css',
]

export async function checkPackageStyleEntry(packageDirectory) {
  const directory =
    packageDirectory instanceof URL ? fileURLToPath(packageDirectory) : packageDirectory
  const packageUrl = pathToFileURL(path.resolve(directory) + path.sep)
  const metadata = JSON.parse(await readFile(new URL('package.json', packageUrl), 'utf8'))
  assert.equal(metadata.exports['./all.css'], './dist/all.css')
  assert.ok(metadata.sideEffects.includes('**/*.css'), 'CSS imports remain side effects')

  const entryUrl = new URL('dist/all.css', packageUrl)
  const css = await readFile(entryUrl, 'utf8')
  // CSS import flattening hoists layer statements ahead of blocks; keep Core first.
  const layerPrelude = '@layer vuetify-core;'
  assert.ok(css.startsWith(layerPrelude), 'Vuetify Core remains the first cascade layer')
  const importCss = css.slice(layerPrelude.length)
  const importPattern = /^@import\s+(['"])([^'"]+)\1;\s*$/gm
  const imports = [...importCss.matchAll(importPattern)].map((match) => match[2])
  assert.deepEqual(imports, expectedImports, 'Default CSS preserves the individual import order')
  assert.equal(
    importCss.replace(importPattern, '').trim(),
    '',
    'Entry contains only the expected imports',
  )
  for (const specifier of imports.slice(1)) {
    const target = new URL(specifier, entryUrl)
    assert.ok(target.href.startsWith(new URL('dist/', packageUrl).href))
    assert.ok((await stat(target)).isFile(), 'Bundled CSS target exists: ' + specifier)
  }
  return { entry: entryUrl.pathname, imports }
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  const packageDirectory = process.argv[2] || new URL('../packages/vue-ui/', import.meta.url)
  await checkPackageStyleEntry(packageDirectory)
  console.log('PASS: all.css export, ordered imports and local package targets')
}
