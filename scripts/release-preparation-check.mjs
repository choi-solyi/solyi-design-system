import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'
import { releaseCatalogue, verifyRelease } from './releases.mjs'

const root = new URL('../', import.meta.url)
const read = file => readFile(new URL(file, root), 'utf8')
const metadata = JSON.parse(await read('packages/vue-ui/package.json'))
const documentVersion = JSON.parse(await read('package.json')).version
const sourceCatalogue = await releaseCatalogue()
const current = sourceCatalogue.releases.find(release => release.release === documentVersion)
assert.ok(current, 'Current package files are verified before preparing the document')
assert.equal(metadata.name, 'solyi-ui')
assert.equal(metadata.private, false, 'Approved next-version UI metadata is publishable; this check never publishes')
assert.equal(metadata.license, 'MIT')
assert.deepEqual(metadata.repository, {
  type: 'git',
  url: 'https://github.com/choi-solyi/solyi-design-system.git',
  directory: 'packages/vue-ui',
})
assert.equal(metadata.homepage, 'https://ui.solyi.kr/')
assert.deepEqual(metadata.publishConfig, {
  registry: 'https://registry.npmjs.org/',
  access: 'public',
})
assert.equal(metadata.peerDependencies.vue, '>=3.5.44 <3.6.0')
assert.equal(metadata.peerDependencies.vuetify, '>=4.3.0 <4.4.0')
for (const field of ['dependencies', 'optionalDependencies', 'peerDependencies']) {
  assert.equal(metadata[field]?.['@solyi/core'], undefined, 'Consumers install only solyi-ui')
}
const publicIndex = JSON.parse(await read('docs/releases/index.json'))
assert.deepEqual(publicIndex, { current: documentVersion, releases: [documentVersion] })
const { packageReleases } = await import(new URL('../docs/release-data.js', import.meta.url))
const {releaseHistory}=await import(new URL('../site/changelog-data.js',import.meta.url))
assert.deepEqual(packageReleases, {published:releaseHistory[0].version,current:documentVersion,releases:[current]})
assert.equal(packageReleases.published,'1.1.0','Unpublished candidate does not replace the current npm release record')
// Verify the retained source catalogue without requiring an obsolete previous version.
for (const release of sourceCatalogue.releases) {
  await verifyRelease(new URL(`docs/releases/${release.release}/`, root))
}
for (const name of [
  'README.md',
  'DESIGN.md',
  'documentation/guide/GETTING-STARTED.md',
  'documentation/guide/DISTRIBUTION.md',
  'documentation/guide/COMPATIBILITY.md',
  'documentation/guide/FONT.md',
  'packages/vue-ui/README.md',
]) {
  assert.doesNotMatch(
    await read(name),
    /마이그레이션|롤백|구버전|이전 릴리스|0\.11\.6|0\.14\.3|0\.4\.15/,
    name + ': current user guidance does not describe historical releases',
  )
}
assert.doesNotMatch(await read('site/getting-started.js'), /롤백|구버전|직전 정상 버전/)
assert.doesNotMatch(await read('examples/vue-vuetify/src/App.vue'), /패키지는 private/)
if (documentVersion === '1.0.0') {
  assert.equal(metadata.version, '1.0.0')
  assert.match(await read('CHANGELOG.md'), /^## 2026-10-24 · 한국시간$/m)
  assert.match(await read('CHANGELOG.md'), /solyi-ui` 1\.0\.0/)
}
for (const exported of Object.values(metadata.exports)) {
  for (const target of typeof exported === 'string' ? [exported] : Object.values(exported)) {
    assert.ok((await stat(new URL('packages/vue-ui/' + target, root))).isFile())
  }
}
console.log(
  'PASS: current-release metadata, private publication guard, current-only version listing, retained downloads and first-release user guidance',
)
