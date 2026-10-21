import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url);
const provenance=JSON.parse(await readFile(new URL('brand-assets.json',root),'utf8'));
for(const asset of provenance.assets){
  for(const folder of ['site','docs']){
    const data=await readFile(new URL(`${folder}/${asset.file}`,root));
    assert.equal(data.length,asset.bytes,`${folder}/${asset.file} original byte length`);
    assert.equal(createHash('sha256').update(data).digest('hex'),asset.sha256,`${folder}/${asset.file} original SHA-256`);
    const blob=createHash('sha1').update(`blob ${data.length}\0`).update(data).digest('hex');
    assert.equal(blob,asset.gitBlob,`${folder}/${asset.file} official Git blob`);
    if(asset.file.endsWith('.ico')){assert.equal(data.readUInt16LE(2),1);assert.equal(data.readUInt16LE(4),6);}
  }
}
const html=await readFile(new URL('site/index.html',root),'utf8');
assert.match(html,/<link rel="icon" href="\.\/favicon\.ico" type="image\/x-icon">/);
assert.match(html,/<img[^>]+class="brand-mark"[^>]+src="\.\/brand-sparkle\.svg"/);
assert.ok(!html.includes('brand-symbol'),'No improvised s-dot logo');
console.log('PASS: official brand symbol/favicon byte lengths, SHA-256 and Git blobs; header and icon references.');
