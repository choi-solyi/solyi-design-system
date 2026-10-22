import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url),read=p=>readFile(new URL(p,root)),hash=b=>createHash('sha256').update(b).digest('hex');
const source=JSON.parse(await read('site/fonts/wanted-sans/SOURCE.json'));
assert.equal(source.version,'1.0.3');assert.equal(source.commit,'02c9b822349c188ada95f9e2d90c2ed18f853235');assert.equal(source.modified,false);
for(const file of source.files){const bytes=await read('site/fonts/wanted-sans/'+file.local);assert.equal(hash(bytes),file.sha256);assert.equal(createHash('sha1').update(Buffer.from('blob '+bytes.length+'\0')).update(bytes).digest('hex'),file.gitBlob);assert.deepEqual(bytes,await read('packages/core/dist/fonts/wanted-sans/'+file.local));assert.deepEqual(bytes,await read('docs/fonts/wanted-sans/'+file.local));}
const font=await read('site/fonts/wanted-sans/woff2/WantedSansVariable.woff2');assert.equal(font.subarray(0,4).toString(),'wOF2');assert.deepEqual(font,await read('docs/starter/WantedSansVariable.woff2'));
const tokens=JSON.parse(await read('tokens.json'));assert.match(tokens.base['font-sans'],/^"Wanted Sans Variable", "Wanted Sans",/);assert.ok(tokens.base['font-sans'].includes('Malgun Gothic'));assert.equal(tokens.base['font-mono'],'ui-monospace, SFMono-Regular, Consolas, monospace');
const css=(await read('site/fonts/wanted-sans/WantedSansVariable.css')).toString();assert.match(css,/font-display:\s*swap/);assert.match(css,/font-weight:\s*400 1000/);assert.ok(!/url\(["']?https?:/.test(css));
assert.match((await read('site/index.html')).toString(),/rel="stylesheet" href="\.\/fonts\/wanted-sans\/WantedSansVariable.css"/);
for(const p of ['examples/vue-vuetify/src/main.js','examples/package-consumer/main.ts'])assert.ok((await read(p)).toString().includes("import '@solyi/core/fonts.css'"));
assert.ok((await read('examples/vue-vuetify/dist/THIRD-PARTY-NOTICES.txt')).toString().includes((await read('site/fonts/wanted-sans/OFL.txt')).toString()));
console.log('PASS: official pinned Wanted Sans WOFF2/CSS/OFL hashes, package/site/starter identical bytes, self-hosted swap, fallback stack and unchanged code monospace. Font rendering/failure/CLS remains a real-browser check.');
