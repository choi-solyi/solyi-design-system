import assert from 'node:assert/strict'
import { measureEmbedHeight } from '../examples/vue-vuetify/src/embed-height.js'

const target = { getBoundingClientRect: () => ({ height: 315 }) }
const calendar = { scrollHeight: 560, offsetHeight: 432, clientHeight: 430 }
const view = { innerHeight: 480, getComputedStyle: () => ({ maxHeight: '432px' }) }
assert.equal(measureEmbedHeight(target, [], view), 315)
assert.equal(measureEmbedHeight(target, [calendar], view), 610)
calendar.offsetHeight = 562
calendar.clientHeight = 560
view.innerHeight = 610
view.getComputedStyle = () => ({ maxHeight: '562px' })
assert.equal(measureEmbedHeight(target, [calendar], view), 610, 'Sizing settles without growth')
calendar.scrollHeight = 630
assert.equal(measureEmbedHeight(target, [calendar], view), 680, 'Narrow content needs more height')
view.getComputedStyle = () => ({ maxHeight: 'none' })
assert.equal(measureEmbedHeight(target, [calendar], view), 680)
assert.equal(
  measureEmbedHeight({ getBoundingClientRect: () => ({ height: 920 }) }, [calendar], view),
  920,
)
console.log(
  'PASS: actual floating content and viewport inset determine iframe height; no resize growth',
)
