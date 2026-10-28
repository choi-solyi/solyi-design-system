import assert from 'node:assert/strict'
import {readTimeGrid,timeGridLanes,timeGridTicks} from '../packages/vue-ui/src/time-grid-values.ts'
const columns=Object.freeze([Object.freeze({key:'a',label:'A',date:'2026-10-28'}),Object.freeze({key:'b',label:'B'})])
const items=Object.freeze([Object.freeze({id:'one',column:'a',start:0,end:30,label:'One'}),Object.freeze({id:'two',column:'a',start:10,end:40,label:'Two'}),Object.freeze({id:'three',column:'a',start:50,end:55,label:'Short'}),Object.freeze({id:1,column:'b',start:1430,end:1440,label:'Day end'})])
const access={key:item=>item.id,label:item=>item.label,column:item=>item.column,start:item=>item.start,end:item=>item.end}
const before=JSON.stringify({columns,items}),snapshot=readTimeGrid(items,columns,access,0,1440)
const lanes=timeGridLanes(snapshot.entries,'a',0,60)
assert.deepEqual(lanes.map(item=>[item.key,item.lane,item.lanes]),[['one',0,2],['two',1,2],['three',0,1]])
assert.equal(lanes.at(-1).endMinute,55,'Visual minimum never changes actual duration')
assert.equal(JSON.stringify({columns,items}),before)
assert.ok(Object.isFrozen(snapshot.entries))
assert.equal(timeGridLanes(snapshot.entries,'b',480,1080).length,0)
assert.deepEqual(timeGridTicks(495,630),[540,600])
assert.throws(()=>readTimeGrid([...items,items[0]],columns,access,0,1440),TypeError)
assert.throws(()=>readTimeGrid(items,[{key:'a',label:'A',date:'2026-02-30'}],access,0,1440),TypeError)
assert.throws(()=>readTimeGrid(items,columns,access,0,1441),TypeError)
assert.throws(()=>readTimeGrid([{id:'x',column:'missing',start:0,end:20,label:'X'}],columns,access,0,1440),TypeError)
assert.throws(()=>readTimeGrid(items,columns,access,0,1440,[{id:'b',label:'Band',startMinute:70,endMinute:60}]),TypeError)
console.log('PASS: frozen source preservation, overlap packing, short-item duration, range clipping, hour ticks, stable keys, strict ISO dates and invalid coordinates/bands.')
