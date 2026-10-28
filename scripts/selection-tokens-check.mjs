import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url),tokens=JSON.parse(await readFile(new URL('tokens.json',root),'utf8'));
const lum=hex=>hex.slice(1).match(/../g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4).reduce((a,x,i)=>a+x*[.2126,.7152,.0722][i],0),ratio=(a,b)=>(Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05);
const roles=['selected-surface','selected-text','selected-border','selected-indicator'];
const categoricalRoles=Array.from({length:8},(_,index)=>['foreground','background','border'].map(role=>'categorical-'+(index+1)+'-'+role)).flat();
const original={violet:'ca60a7a01bf3fa07d7ef8f595290a0716581e546b898ecd6ea415379d240cf92',sage:'84b2bb5505359c95e0751b17c17fbf5720854037fe9621ee4d5efeaa00bbe1fa'};
for(const [name,theme]of Object.entries(tokens.themes)){
 for(const mode of ['light','dark']){const c=theme[mode];for(const role of roles)assert.match(c[role],/^#[0-9A-F]{6}$/i);for(const [fg,bg,min]of [['selected-text','selected-surface',4.5],['selected-border','selected-surface',3],['selected-border','surface',3],['selected-indicator','selected-surface',3],['focus','selected-surface',3]])assert.ok(ratio(c[fg],c[bg])>=min,`${name}/${mode} ${fg}/${bg}`);}
 // Preserve the original hash: exclude only the explicitly added role names.
 // Unexpected roles or changes to any original value must still fail.
 if(original[name]){const old=structuredClone(theme);for(const mode of ['light','dark'])for(const role of [...roles,...categoricalRoles])delete old[mode][role];assert.equal(createHash('sha256').update(JSON.stringify(old)).digest('hex'),original[name],'Existing '+name+' palette is unchanged');}
}
const core=await readFile(new URL('site/components.css',root),'utf8'),ui=await readFile(new URL('packages/vue-ui/src/styles.css',root),'utf8');
for(const css of [core,ui])for(const role of roles)assert.ok(css.includes('--sol-color-'+role),'Shared selected role '+role);
assert.match(core,/box-shadow:inset 3px 0 var\(--sol-color-selected-indicator\)/,'Selected rows have an indicator in addition to a fill');
assert.match(core,/\.sol-choice\.sol-choice-row[^{}]*\{[^{}]*padding:var\(--sol-space-2\) var\(--sol-space-3\)/,'Inset belongs to the reusable row');
assert.ok(!/\.specimen-task[^{}]*\{[^{}]*padding:/.test(await readFile(new URL('site/docs.css',root),'utf8')),'The goal page does not own a private padding override');
console.log('PASS: selected foreground/border/indicator/focus in3 themes ×2 modes; Violet/Sage original20-role palettes unchanged; Core/Vue consume shared roles and opt-in row inset. Background separation alone is not claimed as a3:1 boundary.');
