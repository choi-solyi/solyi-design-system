import {readFile,writeFile} from 'node:fs/promises'
import {parseReleaseHistory} from './release-note-data.mjs'
const root=new URL('../',import.meta.url)
const history=parseReleaseHistory(await readFile(new URL('CHANGELOG.md',root),'utf8'))
await writeFile(new URL('site/changelog-data.js',root),'// Generated from published CHANGELOG.md entries.\nexport const releaseHistory='+JSON.stringify(history,null,2)+';\nexport const releaseNotes=releaseHistory[0];\n')
console.log(`Generated ${history.length} published release entries.`)
