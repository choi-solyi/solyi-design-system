// Eight fixed buckets are the v1 mapping contract. Extending a palette must not
// change this divisor or reorder IDs: existing keys retain their categories.
export function resolveCategoricalValue(tokens,key,{theme='violet',mode='light'}={}) {
  if(typeof key!=='string'&&(typeof key!=='number'||!Number.isFinite(key)))throw new TypeError('A category key must be a string or finite number')
  if(!Object.hasOwn(tokens.themes,theme)||(mode!=='light'&&mode!=='dark'))throw new TypeError('Unknown categorical appearance')
  const text=typeof key==='number'?'n:'+String(key):'s:'+key
  let hash=2166136261
  for(let i=0;i<text.length;i++){hash^=text.charCodeAt(i);hash=Math.imul(hash,16777619)>>>0}
  const index=hash%8,category='c'+(index+1),colors=tokens.themes[theme][mode],prefix='categorical-'+(index+1)+'-'
  return Object.freeze({category,index,foreground:colors[prefix+'foreground'],background:colors[prefix+'background'],border:colors[prefix+'border']})
}
