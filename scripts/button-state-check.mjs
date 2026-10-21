/* CSS cascade regression: parse shipped CSS, match selectors for explicit pseudo states,
 * compare real specificity/source order, resolve inherited role variables, then measure contrast.
 * This is a bounded CSS contract check, not a substitute for browser rendering. */
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {JSDOM} from 'jsdom';
const require=createRequire(import.meta.url),CSSOM=require('rrweb-cssom');
const root=new URL('../',import.meta.url),tokens=JSON.parse(await readFile(new URL('tokens.json',root),'utf8'));
const source=(await Promise.all(['components.css','docs.css'].map(n=>readFile(new URL('docs/'+n,root),'utf8')))).join('\n');
const rules=[...CSSOM.parse(source).cssRules].filter(r=>r.selectorText);
function parts(s){const out=[];let depth=0,start=0,quote='';for(let i=0;i<s.length;i++){const c=s[i];if(quote){if(c===quote&&s[i-1]!=='\\')quote='';continue;}if(c==='"'||c==="'"){quote=c;continue;}if(c==='('||c==='[')depth++;if(c===')'||c===']')depth--;if(c===','&&!depth){out.push(s.slice(start,i));start=i+1;}}out.push(s.slice(start));return out;}
const compare=(a,b)=>a[0]-b[0]||a[1]-b[1]||a[2]-b[2];
function specificity(s){const result=[0,0,0];for(let i=0;i<s.length;){const c=s[i];if(c==='['){result[1]++;let q='';for(i++;i<s.length;i++){if(q){if(s[i]===q)q='';}else if(s[i]==='"'||s[i]==="'")q=s[i];else if(s[i]===']'){i++;break;}}}else if(c==='.'||c==='#'){result[c==='#'?0:1]++;i++;while(i<s.length&&/[\w-]/.test(s[i]))i++;}else if(c===':'){const element=s[i+1]===':';i+=element?2:1;const start=i;while(i<s.length&&/[\w-]/.test(s[i]))i++;const name=s.slice(start,i);if(s[i]==='('){let depth=1,end=++i;while(end<s.length&&depth){if(s[end]==='(')depth++;if(s[end]===')')depth--;end++;}const arg=s.slice(i,end-1);if(['is','not','has'].includes(name)){const max=parts(arg).map(specificity).sort(compare).at(-1)||[0,0,0];max.forEach((n,j)=>result[j]+=n);}else if(name!=='where')result[element?2:1]++;i=end;}else result[element?2:1]++;}else if(/[a-zA-Z_]/.test(c)){result[2]++;while(i<s.length&&/[\w-]/.test(s[i]))i++;}else i++;}return result;}
// Guard the test's own selector calculus with independent, known specificity examples.
assert.deepEqual(specificity('.sol-button:hover:not(:disabled):not([aria-disabled="true"])'),[0,4,0]);
assert.deepEqual(specificity('.sol-tone .sol-button.tone-fill'),[0,3,0]);
assert.deepEqual(specificity(':where(button, #ignored):is(.a,#b)'),[1,0,0]);
const parsed=rules.flatMap((r,index)=>parts(r.selectorText).map(selector=>({selector:selector.trim(),match:selector.replace(/:(hover|active|focus-visible|focus)(?![\w-])/g,(_,p)=>`[data-css-state~="${p}"]`),score:specificity(selector),index,style:r.style})));
const dom=new JSDOM('<main><article class="sol-card sol-tone"><button class="sol-button">가상 행동</button></article></main>'),d=dom.window.document,button=d.querySelector('button'),card=d.querySelector('article');
function winner(el,property){let chosen=null;for(const r of parsed){const value=r.style.getPropertyValue(property);if(!value)continue;let match=false;try{match=el.matches(r.match);}catch{}if(!match)continue;const important=r.style.getPropertyPriority(property)==='important';if(!chosen||Number(important)>Number(chosen.important)||important===chosen.important&&(compare(r.score,chosen.score)>0||compare(r.score,chosen.score)===0&&r.index>chosen.index))chosen={...r,value,important};}return chosen;}
let roles={};function variable(el,name,depth=0){if(depth>20)throw Error('Variable recursion');for(let at=el;at;at=at.parentElement){const found=winner(at,name);if(found)return resolve(at,found.value,depth+1);}return roles[name];}
function resolve(el,value,depth=0){return value.replace(/var\((--[\w-]+)\)/g,(_,n)=>{const v=variable(el,n,depth);assert.ok(v,`Known variable ${n}`);return resolve(el,v,depth+1);});}
const value=(el,p)=>{const rule=winner(el,p);return rule?resolve(el,rule.value).trim():p==='opacity'?'1':null;};
function luminance(hex){assert.match(hex,/^#[\da-f]{6}$/i);return hex.slice(1).match(/../g).map(n=>parseInt(n,16)/255).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4).reduce((a,n,i)=>a+n*[.2126,.7152,.0722][i],0);}
const ratio=(a,b)=>{const x=luminance(a),y=luminance(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
const states={normal:[],hover:['hover'],focus:['focus','focus-visible'],'focus-hover':['hover','focus','focus-visible'],active:['active','hover'],disabled:['hover'],'aria-disabled':['hover']};let count=0,minimum=Infinity;
for(const [theme,data]of Object.entries(tokens.themes))for(const mode of ['light','dark'])for(const tone of ['accent','info','success','warning','danger'])for(const variant of ['fill','soft','outline'])for(const [state,pseudo]of Object.entries(states)){
 roles=Object.fromEntries(Object.entries(data[mode]).map(([k,v])=>['--sol-color-'+k,v]));card.dataset.tone=tone;button.className='sol-button tone-'+variant;button.dataset.cssState=pseudo.join(' ');button.disabled=state==='disabled';button.setAttribute('aria-disabled',String(state==='aria-disabled'));
 const ink=value(button,'color'),background=value(button,'background')||value(button,'background-color'),contrast=ratio(ink,background),name=`${theme}/${mode}/${tone}/${variant}/${state}`;assert.ok(contrast>=4.5,`${name}: ${ink} on ${background} = ${contrast.toFixed(3)}:1`);assert.equal(value(button,'opacity'),'1',`${name}: no fading of readable state`);minimum=Math.min(minimum,contrast);count++;
 if(state==='hover'||state==='focus'||state==='focus-hover'||state==='active')assert.equal(value(button,'text-decoration'),'underline',`${name}: visible non-color feedback`);
}

// Regression fixtures: a multiline editor must not inherit single-line sizing; only selectable tables reserve a dedicated checkbox column.
Object.assign(roles,Object.fromEntries(Object.entries(tokens.base).map(([k,v])=>['--sol-'+k,v])));
const fixture=d.createElement('section');fixture.innerHTML='<textarea class="sol-input sol-textarea" rows="3"></textarea><input class="sol-input"><table class="sol-data-table sol-chart-table"><tbody><tr><th>월요일</th><td>Long free-flowing content</td></tr></tbody></table><table class="sol-data-table sol-selectable-table"><tbody><tr><th>선택</th><td>항목</td></tr></tbody></table>';d.body.append(fixture);
const textarea=fixture.querySelector('textarea'),single=fixture.querySelector('input'),day=fixture.querySelector('.sol-chart-table th'),longCell=fixture.querySelector('.sol-chart-table td'),selection=fixture.querySelector('.sol-selectable-table th');
for(const controlHeight of ['2.5rem','2.75rem']){roles['--sol-control-height']=controlHeight;assert.equal(value(textarea,'height'),'auto');const minimum=value(textarea,'min-height'),px=parseFloat(minimum)*(minimum.endsWith('rem')?16:1);assert.ok(px>=3*14*1.65+18,'At least three body lines plus padding');assert.equal(value(single,'height'),controlHeight);}
assert.equal(value(button,'border-radius'),'0.375rem','Button restored to v0.2.2 6px');assert.equal(value(single,'border-radius'),'0.625rem','Input remains10px');assert.equal(value(card,'border-radius'),'0.75rem','Card reduced to12px');const radiusDialog=d.createElement('dialog');radiusDialog.className='sol-dialog';fixture.append(radiusDialog);assert.equal(value(radiusDialog,'border-radius'),'1rem','Dialog and large panel16px');
const nestedCard=d.createElement('article');nestedCard.className='sol-card';card.append(nestedCard);assert.equal(value(nestedCard,'border-radius'),'0.625rem','Nested auxiliary surface remains10px');
const navNumber=d.createElement('span');navNumber.className='nav-index';navNumber.textContent='04';fixture.append(navNumber);assert.equal(value(navNumber,'white-space'),'nowrap');assert.equal(value(navNumber,'flex'),'0 0 2ch');assert.equal(value(navNumber,'min-width'),'2ch');
for(const name of ['sol-menu','sol-popover','sol-calendar-dialog','sol-time-panel','sol-tooltip','sol-toast','sol-combobox-menu','toast']){const floating=d.createElement(name==='sol-calendar-dialog'?'dialog':'div');floating.className=name;fixture.append(floating);assert.equal(value(floating,'border-radius'),'0.75rem',name+' uses floating12px');}
assert.equal(value(textarea,'resize'),'vertical');assert.equal(value(textarea,'overflow-y'),'auto');assert.equal(value(textarea,'overflow-wrap'),'anywhere');assert.equal(value(textarea,'line-height'),'1.65');assert.equal(value(textarea,'white-space'),'pre-wrap');
const ellipsis=d.createElement('span');ellipsis.className='sol-record-title';fixture.append(ellipsis);assert.equal(value(ellipsis,'white-space'),'nowrap');assert.equal(value(ellipsis,'text-overflow'),'ellipsis');assert.equal(value(ellipsis,'overflow'),'hidden');const recordCards=d.createElement('ul');recordCards.className='sol-record-cards';recordCards.innerHTML='<li>긴 제목</li>';fixture.append(recordCards);assert.equal(value(recordCards,'grid-template-columns'),'minmax(0,1fr)');assert.equal(value(recordCards.firstElementChild,'min-width'),'0');
assert.notEqual(value(day,'width'),'44px');assert.equal(value(day,'white-space'),'nowrap');assert.notEqual(value(longCell,'white-space'),'nowrap');assert.equal(value(selection,'width'),tokens.base['table-selection-width']);assert.equal(value(day,'padding'),'0.5rem 0.75rem');
assert.equal(value(fixture.querySelector('.sol-selectable-table'),'table-layout'),'fixed');
console.log('PASS: multiline sizing survives single-line cascade, conditional scrolling/resize/wrapping, compact chart cells and selection-only column width. Geometry remains a real-browser check.');


// New numbered navigation has its own selected foreground; check its full state cascade too.
card.className='sol-pagination';button.className='sol-button sol-page-button';button.setAttribute('aria-current','page');let pageCount=0,pageMinimum=Infinity;
for(const [theme,data]of Object.entries(tokens.themes))for(const mode of ['light','dark'])for(const[state,pseudo]of Object.entries(states)){
 roles=Object.fromEntries(Object.entries(data[mode]).map(([k,v])=>['--sol-color-'+k,v]));button.dataset.cssState=pseudo.join(' ');button.disabled=state==='disabled';button.setAttribute('aria-disabled',String(state==='aria-disabled'));
 const contrast=ratio(value(button,'color'),value(button,'background'));assert.ok(contrast>=4.5,theme+'/'+mode+'/page/'+state+': '+contrast);pageMinimum=Math.min(pageMinimum,contrast);pageCount++;
}
console.log('PASS: '+pageCount+' current-page button state contrasts, minimum '+pageMinimum.toFixed(3)+':1.');

dom.window.close();console.log(`PASS: ${count} semantic button state/variant/theme text contrasts (minimum ${minimum.toFixed(3)}:1); cascade specificity, paired ink/background, readable disabled and non-color interaction feedback.`);
