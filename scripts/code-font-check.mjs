import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url),read=p=>readFile(new URL(p,root)),hash=b=>createHash('sha256').update(b).digest('hex');
const expected={
 'jetbrains-mono':{commit:'cd5227bd1f61dff3bbd6c814ceaf7ffd95e947d9',version:'2.304',fonts:['JetBrainsMono-Regular.woff2','JetBrainsMono-Bold.woff2']},
 'nanum-gothic-coding':{commit:'9cb22ac3b8e238d037c48f98ef521f818958e102',version:'2.000',fonts:['NanumGothicCoding-Regular.ttf','NanumGothicCoding-Bold.ttf']}
};
function sfnt(b){const tables={};for(let i=0;i<b.readUInt16BE(4);i++){const o=12+i*16;tables[b.toString('ascii',o,o+4)]=b.readUInt32BE(o+8);}return tables;}
function glyph(b,t,cp){const o=t.cmap;for(let i=0;i<b.readUInt16BE(o+2);i++){const s=o+b.readUInt32BE(o+4+i*8+4);if(b.readUInt16BE(s)!==4||cp>0xffff)continue;const n=b.readUInt16BE(s+6)/2,end=s+14,start=end+n*2+2,delta=start+n*2,range=delta+n*2;for(let j=0;j<n;j++){if(cp>b.readUInt16BE(end+j*2)||cp<b.readUInt16BE(start+j*2))continue;const ro=b.readUInt16BE(range+j*2),d=b.readInt16BE(delta+j*2);let g=ro?b.readUInt16BE(range+j*2+ro+2*(cp-b.readUInt16BE(start+j*2))):cp;if(g)g=(g+d)&0xffff;return g;}}return 0;}
for(const [dir,e] of Object.entries(expected)){
 const source=JSON.parse(await read('site/fonts/'+dir+'/SOURCE.json'));assert.equal(source.commit,e.commit);assert.equal(source.version,e.version);assert.equal(source.modified,false);assert.equal(source.license,'OFL-1.1');
 for(const f of source.files){const b=await read('site/fonts/'+dir+'/'+f.local);assert.equal(hash(b),f.sha256);assert.equal(b.length,f.bytes);assert.equal(createHash('sha1').update(Buffer.from('blob '+b.length+'\0')).update(b).digest('hex'),f.gitBlob);for(const p of ['packages/core/dist/fonts/','docs/fonts/'])assert.deepEqual(b,await read(p+dir+'/'+f.local));}
 const license=(await read('site/fonts/'+dir+'/OFL.txt')).toString();assert.match(license,/SIL OPEN FONT LICENSE Version 1.1/);assert.ok((await read('docs/starter/THIRD-PARTY-NOTICES.txt')).toString().includes(license));
 for(const f of e.fonts){const b=await read('site/fonts/'+dir+'/'+f);assert.deepEqual(b,await read('docs/starter/'+f));for(const app of ['package-consumer','vue-vuetify'])assert.deepEqual(b,await read('examples/'+app+'/node_modules/solyi-ui/dist/core/fonts/'+dir+'/'+f));if(f.endsWith('.woff2'))assert.equal(b.toString('ascii',0,4),'wOF2');else{assert.equal(b.readUInt32BE(0),0x00010000);const t=sfnt(b);for(const char of '한글 주석: 유효한 마지막 값을 유지합니다. English ABCxyz0123 {}[]() => !==+-*/%')assert.ok(glyph(b,t,char.codePointAt(0)),'Nanum original cmap covers '+char);const o=t.name,s=o+b.readUInt16BE(o+4);let version='';for(let i=0;i<b.readUInt16BE(o+2);i++){const p=o+6+i*12;if(b.readUInt16BE(p)===3&&b.readUInt16BE(p+6)===5)version=Buffer.from(b.subarray(s+b.readUInt16BE(p+10),s+b.readUInt16BE(p+10)+b.readUInt16BE(p+8))).swap16().toString('utf16le');}assert.match(version,/Version 2\.000/);}}
}
const css=(await read('site/fonts/code-fonts.css')).toString();assert.equal((css.match(/font-display: swap/g)||[]).length,4);assert.ok(!/https?:\/\/|font-feature-settings|font-variant-ligatures/.test(css));assert.match(css,/code, pre, kbd, samp/);assert.deepEqual(await read('site/fonts/code-fonts.css'),await read('packages/core/dist/fonts/code-fonts.css'));
const pkg=JSON.parse(await read('packages/core/package.json'));assert.equal(pkg.exports['./code-fonts.css'],'./dist/fonts/code-fonts.css');
const tokens=JSON.parse(await read('tokens.json'));assert.equal(tokens.base['font-mono'],'"JetBrains Mono", "Nanum Gothic Coding", monospace');assert.match(tokens.base['font-sans'],/^"Wanted Sans Variable"/);
for(const p of ['examples/package-consumer/main.ts','examples/vue-vuetify/src/main.js'])assert.ok((await read(p)).toString().includes("import 'solyi-ui/code-fonts.css'"));
assert.ok((await read('site/index.html')).toString().includes('href="./fonts/code-fonts.css"'));
console.log('PASS: pinned unmodified code font/OFL hashes, Nanum 2.000 cmap/version, package/site/two installed consumers/starter bytes, opt-in self-hosted CSS and exact approved fallback stack. Actual rendered font/failure/layout are separate browser checks.');
