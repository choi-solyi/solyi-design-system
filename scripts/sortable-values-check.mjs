import assert from 'node:assert/strict'
import {readFile} from 'node:fs/promises'
import {createRequire} from 'node:module'
import {fileURLToPath} from 'node:url'
const root = new URL('../',import.meta.url), require = createRequire(new URL('packages/vue-ui/package.json',root)), ts = require('typescript')
const file = fileURLToPath(new URL('packages/vue-ui/src/sortable-values.ts',root))
const source = await readFile(file,'utf8')
const compiled = ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}})
const {snapshotSortable,sameSortableSnapshot,proposeSortableMove} = await import('data:text/javascript;base64,'+Buffer.from(compiled.outputText).toString('base64'))
const snapshot = (items,key=item=>item.id) => {const result=snapshotSortable(items,key);assert.equal(result.valid,true);return result.snapshot}

const a=Object.freeze({id:'a',nested:Object.freeze({quantity:2})}), b=Object.freeze({id:'b',nested:Object.freeze({quantity:7})}), c=Object.freeze({id:'c',nested:Object.freeze({quantity:11})})
const original=Object.freeze([a,b,c]), captured=snapshot(original), proposal=proposeSortableMove(captured,'a',2,'pointer')
assert.deepEqual(proposal,{items:[b,c,a],key:'a',from:0,to:2,input:'pointer'})
assert.deepEqual(original,[a,b,c]); assert.equal(proposal.items[2],a); assert.equal(proposal.items[2].nested,a.nested)
proposal.items.pop(); assert.deepEqual(original,[a,b,c]); assert.deepEqual(captured.items,[a,b,c],'A consumer may change its proposed array without corrupting the snapshot')
assert.equal(Object.isFrozen(captured.items),true); assert.equal(Object.isFrozen(captured.keys),true)
assert.equal(snapshotSortable([{id:1},{id:'1'}],item=>item.id).valid,true,'Numeric and textual keys are distinct')
assert.equal(snapshotSortable([{id:0},{id:-0}],item=>item.id).reason,'duplicate-key')
assert.equal(snapshotSortable([{id:'x'},{id:'x'}],item=>item.id).reason,'duplicate-key')
assert.equal(snapshotSortable([{id:NaN}],item=>item.id).reason,'item-key')
assert.equal(snapshotSortable([{id:Infinity}],item=>item.id).reason,'item-key')
assert.equal(snapshotSortable([{}],()=>{throw Error('consumer getter')}).reason,'item-key')
assert.equal(snapshotSortable([{}],()=>({})).reason,'item-key')
assert.equal(snapshotSortable(new Array(2),()=>1).reason,'items')
assert.equal(snapshotSortable(null,()=>1).reason,'items')
let reads=0
snapshot(original,item=>{reads++;return item.id});assert.equal(reads,3)
const mutating=[{id:'a'},{id:'b'}];let callbackReads=0
assert.equal(snapshotSortable(mutating,item=>{callbackReads++;mutating.push({id:'extra'+callbackReads});return item.id}).reason,'items')
assert.equal(callbackReads,2,'A callback cannot grow the snapshot loop or create mismatched key/item pairs')
for(const target of [-1,3,.5,NaN,Infinity]) assert.equal(proposeSortableMove(captured,'a',target,'keyboard'),undefined)
assert.equal(proposeSortableMove(captured,'missing',0,'button'),undefined)
assert.equal(proposeSortableMove(snapshot([]),'a',0,'button'),undefined)

let permutations=0
for(let length=1;length<=7;length++) {
  const items=Object.freeze(Array.from({length},(_,id)=>Object.freeze({id}))), state=snapshot(items)
  for(let from=0;from<length;from++) for(let to=0;to<length;to++) {
    const next=proposeSortableMove(state,from,to,'keyboard')
    assert.equal(next.items.length,length);assert.equal(next.items[to],items[from]);assert.equal(new Set(next.items).size,length)
    assert.deepEqual(next.items.filter(item=>item!==items[from]),items.filter(item=>item!==items[from]),'Only the moved item may change relative order')
    assert.deepEqual(items.map(item=>item.id),Array.from({length},(_,id)=>id));permutations++
  }
}
const live=[{id:'a',label:'A'},{id:'b',label:'B'}], initial=snapshot(live)
live[0].label='Renamed';assert.equal(sameSortableSnapshot(initial,snapshot(live)),true)
assert.equal(Object.isFrozen(live),false);assert.equal(Object.isFrozen(live[0]),false,'The helper cannot freeze consumer-owned data')
assert.equal(sameSortableSnapshot(initial,snapshot([...live])),false,'A replacement array invalidates stale work even with the same keys')
live[0]={id:'a',label:'New object'};assert.equal(sameSortableSnapshot(initial,snapshot(live)),false)
const replaced=snapshot(live);live[0].id='new-key';assert.equal(sameSortableSnapshot(replaced,snapshot(live)),false)
const rekeyed=snapshot(live);live.reverse();assert.equal(sameSortableSnapshot(rekeyed,snapshot(live)),false)

const fixture=fileURLToPath(new URL('qa-output/sortable-values-types.ts',root))
const contract=`import {snapshotSortable,proposeSortableMove} from '../packages/vue-ui/src/sortable-values'
const rows=[{id:'a',nested:{quantity:2}}]
const result=snapshotSortable(rows,row=>row.id)
if(result.valid){
  const proposal=proposeSortableMove(result.snapshot,'a',0,'keyboard')
  const amount:number|undefined=proposal?.items[0]?.nested.quantity
  void amount
  // @ts-expect-error Input modality is a finite contract.
  proposeSortableMove(result.snapshot,'a',0,'drag')
}
// @ts-expect-error An arbitrary object keeps its concrete item type.
snapshotSortable(rows,row=>row.missing)
// @ts-expect-error Keys are strings or numbers, never booleans.
snapshotSortable(rows,row=>true)
`
const options={target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext,moduleResolution:ts.ModuleResolutionKind.Bundler,strict:true,noEmit:true,skipLibCheck:false,types:[],lib:['lib.es2022.d.ts']}
const host=ts.createCompilerHost(options),get=host.getSourceFile.bind(host),exists=host.fileExists.bind(host)
const normalized=name=>name.replaceAll('\\','/')
host.fileExists=name=>normalized(name)===normalized(fixture)||exists(name)
host.getSourceFile=(name,...args)=>normalized(name)===normalized(fixture)?ts.createSourceFile(name,contract,ts.ScriptTarget.Latest,true):get(name,...args)
const errors=ts.getPreEmitDiagnostics(ts.createProgram([file,fixture],options,host)).filter(item=>item.category===ts.DiagnosticCategory.Error)
assert.equal(errors.length,0,ts.formatDiagnosticsWithColorAndContext(errors,{getCurrentDirectory:()=>fileURLToPath(root),getCanonicalFileName:file=>file,getNewLine:()=> '\n'}))
console.log(`PASS: ${permutations} immutable move permutations; arbitrary frozen objects/reference identity, key guards, external snapshot changes, proposal isolation and strict generic/negative types. No public component or pointer interaction is implemented by this unit.`)
