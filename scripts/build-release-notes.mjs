import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
const root=new URL('../',import.meta.url);
const markdown=(await readFile(new URL('CHANGELOG.md',root),'utf8')).replaceAll('\r\n','\n');
const headings=[...markdown.matchAll(/^##\s+(\d{4}-\d{2}-\d{2}).*$/gm)];
assert.equal(headings.length,1,'CHANGELOG has one dated release entry');
// Unreleased notes must never be attributed to the already published version.
function datedEntries(source) {
  const heading = /^##\s+\d{4}-\d{2}-\d{2}.*$/m.exec(source)
  if (!heading) return []
  const body = source.slice(heading.index + heading[0].length).split(/^##\s+/m)[0]
  return [...body.matchAll(/^-\s+(.+)$/gm)].map(match => match[1])
}
assert.deepEqual(datedEntries('## Unreleased\n- Future API\n\n## 2026-10-24\n- Published API\n\n## Other\n- Other note'), ['Published API'], 'Pending and later sections stay outside the published release')
const entries=datedEntries(markdown);
assert.ok(entries.length>0,'Release entry describes the current functionality');
const version=JSON.parse(await readFile(new URL('package.json',root),'utf8')).version;
await writeFile(new URL('site/changelog-data.js',root),'// Generated from CHANGELOG.md.\nexport const releaseNotes='+JSON.stringify({date:headings[0][1],version,entries},null,2)+';\n');
console.log('Generated the current release entry from CHANGELOG.md.');
