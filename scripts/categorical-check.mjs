import assert from 'node:assert/strict'
import {readFile} from 'node:fs/promises'
import {resolveCategoricalColor} from '../packages/core/dist/index.js'
const tokens=JSON.parse(await readFile(new URL('../tokens.json',import.meta.url),'utf8'))
const luminance=color=>{const a=color.match(/[a-f\d]{2}/gi).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return a[0]*.2126+a[1]*.7152+a[2]*.0722}
const contrast=(a,b)=>{const x=luminance(a),y=luminance(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05)}
let textMin=Infinity,borderMin=Infinity
for(const theme of Object.values(tokens.themes))for(const mode of ['light','dark'])for(let index=1;index<=8;index++){
 const colors=theme[mode],prefix=`categorical-${index}-`,text=contrast(colors[prefix+'foreground'],colors[prefix+'background'])
 const border=Math.min(contrast(colors[prefix+'border'],colors[prefix+'background']),contrast(colors[prefix+'border'],colors.surface))
 assert.ok(text>=4.5,`Readable category ${index} ${mode}: ${text}`);assert.ok(border>=3,`Category boundary ${index} ${mode}: ${border}`)
 textMin=Math.min(textMin,text);borderMin=Math.min(borderMin,border)
}
// Fixed vectors protect the versioned key mapping, rather than repeating its algorithm.
for(const [key,category]of [['example-a','c1'],['항목','c3'],[0,'c4'],[1,'c1']])for(const theme of Object.keys(tokens.themes))for(const mode of ['light','dark']){
 const color=resolveCategoricalColor(key,{theme,mode});assert.equal(color.category,category);assert.ok(Object.isFrozen(color));assert.equal(color.foreground,tokens.themes[theme][mode][`categorical-${color.index+1}-foreground`])
}
for(const key of [NaN,Infinity,null,{}])assert.throws(()=>resolveCategoricalColor(key),TypeError)
assert.throws(()=>resolveCategoricalColor('x',{theme:'missing'}),TypeError)
console.log(`PASS: 48 category appearances, fixed key mapping, invalid input and built Core resolver; minimum text ${textMin.toFixed(3)}:1, boundary ${borderMin.toFixed(3)}:1.`)
