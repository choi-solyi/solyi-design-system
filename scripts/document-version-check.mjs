import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {runInNewContext} from 'node:vm';
import {JSDOM} from 'jsdom';
import { documentShell } from './document-shell.mjs'
const root=new URL('../',import.meta.url);
export async function checkDocumentVersions(){
 const tokens=JSON.parse(await readFile(new URL('tokens.json',root),'utf8')),version=tokens.version;
 assert.equal(JSON.parse(await readFile(new URL('package.json',root),'utf8')).version,version,'Documentation package metadata agrees with token version');
 const source=await readFile(new URL('site/index.html',root),'utf8'),html=await readFile(new URL('docs/index.html',root),'utf8');
 assert.ok(source.includes('v__SOLYI_DOCUMENT_VERSION__'),'Source header uses the shared version placeholder')
 assert.equal(html, (await documentShell(source, version)).html, 'Built shell uses the shared token version')
 const header=new JSDOM(html);assert.equal(header.window.document.querySelector('.version').textContent.trim().replace(/\s+/g,' '),`v${version}`);header.window.close();
 const app=await readFile(new URL('docs/app.js',root),'utf8'),declaration=app.match(/^const footer = (.+);$/m);assert.ok(declaration,'Actual footer renderer is available');
 const footer=runInNewContext('('+declaration[1]+')',{tokens});
 for(const candidate of [version,'9.8.7']){tokens.version=candidate;const dom=new JSDOM(footer());assert.ok(dom.window.document.querySelector('.site-footer p').textContent.includes('v'+candidate),'Actual footer renderer follows version metadata, including a future-version fixture');dom.window.close();}
 console.log('PASS: built header and actual footer renderer share tokens.version; package metadata and future-version fixture agree. No file mutation.');
}
if(process.argv[1]===fileURLToPath(import.meta.url))await checkDocumentVersions();
