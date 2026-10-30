import assert from 'node:assert/strict'
import {readFile} from 'node:fs/promises'
import {createHash} from 'node:crypto'
import {JSDOM} from 'jsdom'
import {parseReleaseHistory} from './release-note-data.mjs'
import {renderReleases} from '../site/releases.js'
import {releaseHistory} from '../site/changelog-data.js'
const read=file=>readFile(new URL('../'+file,import.meta.url),'utf8')
const parsed=parseReleaseHistory(await read('CHANGELOG.md'))
assert.deepEqual(releaseHistory,parsed,'Generated version/date entries reflect the canonical changelog')
assert.deepEqual(parsed.map(x=>x.version),['1.1.0','1.0.0'])
assert.deepEqual(parsed.map(x=>x.date),['2026-10-29','2026-10-24'])
const original=await read('documentation/releases/1.0.0.txt')
assert.deepEqual(parsed[1].entries,[...original.matchAll(/^-\s+(.+)$/gm)].map(x=>x[1]),'All original 1.0.0 descriptions survive verbatim')
const fixture='## Unreleased\n- Pending\n\n## 1.2.0 · 2026-11-01 · 한국시간\n- Next\n\n## Other\n- Unrelated\n\n## 1.1.0 · 2026-10-29 · 한국시간\n- Previous\n'
assert.deepEqual(parseReleaseHistory(fixture).map(x=>x.entries),[['Next'],['Previous']],'Future and unrelated notes cannot overwrite a published version')
assert.throws(()=>parseReleaseHistory('## 2026-10-24\n- Without version'),/Explicit version/)
const preservedArchive=JSON.parse(await read('documentation/releases/archive.json'))
assert.deepEqual(preservedArchive.map(x=>x.version),JSON.parse(await read('scripts/published-release-archive.json')))
for(const record of preservedArchive){
  const source=await read('documentation/releases/'+record.file)
  assert.equal(createHash('sha256').update(source).digest('hex'),record.sha256,'Historical snapshot bytes are preserved')
  assert.equal(JSON.parse(await read(`docs/releases/${record.version}/manifest.json`)).sourceRef,record.sourceRef)
}
const html=renderReleases({section:(id,title,description,body)=>`<section id="${id}"><h2>${title}</h2><p>${description}</p>${body}</section>`})
const dom=new JSDOM(html),d=dom.window.document
assert.deepEqual([...d.querySelectorAll('article h3')].map(x=>x.textContent),['1.1.0','1.0.0'])
assert.equal(d.querySelector('#release-document-archive'),null,'Internal development records are not a public release list')
assert.deepEqual([...d.querySelectorAll('nav a')].map(x=>x.textContent),['1.1.0','1.0.0'])
assert.ok(!html.includes('documentation/releases/'),'No public link to the internal development-version index')
assert.ok(!(await read('site/changelog-data.js')).includes('archivedReleaseNotes'),'Do not ship internal archive metadata to the public release UI')
for(const file of ['README.md','CHANGELOG.md','documentation/guide/DISTRIBUTION.md'])assert.ok(!(await read(file)).includes('releases/README.md'),'Public release guidance must not promote development versions: '+file)
assert.equal(d.querySelectorAll('#release-1-0-0 li').length,parsed[1].entries.length)
dom.window.close()
console.log('PASS: only published 1.1.0/1.0.0 in public history/guidance, original notes preserved, pending-note isolation and internal archive bytes retained without public promotion.')
