import assert from 'node:assert/strict'
import {proposeTimeGridCoordinate,freezeTimeGridProposal,sameTimeGridCoordinate} from '../packages/vue-ui/src/time-grid-proposal.ts'
const from={columnKey:'one',startMinute:480,endMinute:540}
assert.deepEqual(proposeTimeGridCoordinate(from,'move',503,'two'),{columnKey:'two',startMinute:510,endMinute:570})
assert.deepEqual(proposeTimeGridCoordinate(from,'move',-100),{columnKey:'one',startMinute:0,endMinute:60})
assert.deepEqual(proposeTimeGridCoordinate(from,'move',1700),{columnKey:'one',startMinute:1380,endMinute:1440})
assert.deepEqual(proposeTimeGridCoordinate(from,'resize-start',505,'two'),{columnKey:'one',startMinute:510,endMinute:540})
assert.deepEqual(proposeTimeGridCoordinate(from,'resize-end',565),{columnKey:'one',startMinute:480,endMinute:570})
assert.equal(proposeTimeGridCoordinate(from,'resize-start',10000).startMinute,539)
assert.equal(proposeTimeGridCoordinate(from,'resize-end',-100).endMinute,481)
const copy=proposeTimeGridCoordinate(from,'duplicate',480)
const offGrid={columnKey:'one',startMinute:482,endMinute:542}
assert.deepEqual(proposeTimeGridCoordinate(offGrid,'move',482,'two'),{columnKey:'two',startMinute:482,endMinute:542},'Column-only moves preserve existing off-grid times')
assert.ok(sameTimeGridCoordinate(copy,from))
const payload=freezeTimeGridProposal('a','duplicate',from,copy,'button')
assert.ok(Object.isFrozen(payload)&&Object.isFrozen(payload.from)&&Object.isFrozen(payload.to))
assert.notEqual(payload.from,from);assert.equal(Object.isFrozen(from),false)
assert.deepEqual(from,{columnKey:'one',startMinute:480,endMinute:540})
for(const snap of [0,NaN,2.5,1441])assert.throws(()=>proposeTimeGridCoordinate(from,'move',500,'one',snap),TypeError)
assert.throws(()=>proposeTimeGridCoordinate(from,'move',NaN),TypeError)
console.log('PASS: move/resize/duplicate coordinate proposals, midnight snapping, both day bounds, positive duration, frozen detached payloads and unchanged originals.')
