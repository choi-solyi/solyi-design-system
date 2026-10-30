import assert from 'node:assert/strict'
import {readFile} from 'node:fs/promises'
import {createHash} from 'node:crypto'
import {JSDOM} from 'jsdom'
import {parseReleaseHistory} from './release-note-data.mjs'
import {renderReleases} from '../site/releases.js'
import {releaseHistory,archivedReleaseNotes} from '../site/changelog-data.js'
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
assert.deepEqual(archivedReleaseNotes.map(x=>x.version),JSON.parse(await read('scripts/published-release-archive.json')))
for(const record of archivedReleaseNotes){
  const source=await read('documentation/releases/'+record.file)
  assert.equal(createHash('sha256').update(source).digest('hex'),record.sha256,'Historical snapshot bytes are preserved')
  assert.equal(JSON.parse(await read(`docs/releases/${record.version}/manifest.json`)).sourceRef,record.sourceRef)
}
const html=renderReleases({section:(id,title,description,body)=>`<section id="${id}"><h2>${title}</h2><p>${description}</p>${body}</section>`})
const dom=new JSDOM(html),d=dom.window.document
assert.deepEqual([...d.querySelectorAll('article h3')].map(x=>x.textContent),['1.1.0','1.0.0'])
assert.equal(d.querySelectorAll('#release-document-archive li').length,20)
assert.equal(d.querySelectorAll('#release-1-0-0 li').length,parsed[1].entries.length)
dom.window.close()
console.log('PASS: cumulative explicit versions/dates, unchanged original 1.0.0 notes, pending-note isolation, 20 provenance/hash-verified archives and release-page rendering.')
