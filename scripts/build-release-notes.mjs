import {readFile,writeFile} from 'node:fs/promises'
import {parseReleaseHistory} from './release-note-data.mjs'
const root=new URL('../',import.meta.url)
const history=parseReleaseHistory(await readFile(new URL('CHANGELOG.md',root),'utf8'))
const archive=JSON.parse(await readFile(new URL('documentation/releases/archive.json',root),'utf8'))
await writeFile(new URL('site/changelog-data.js',root),'// Generated from CHANGELOG.md and preserved document history.\nexport const releaseHistory='+JSON.stringify(history,null,2)+';\nexport const releaseNotes=releaseHistory[0];\nexport const archivedReleaseNotes='+JSON.stringify(archive,null,2)+';\n')
console.log(`Generated ${history.length} versioned releases and ${archive.length} preserved document records.`)
