import assert from 'node:assert/strict'
import {readFile} from 'node:fs/promises'
import {createRequire} from 'node:module'
const root=new URL('../',import.meta.url),require=createRequire(new URL('packages/vue-ui/package.json',root)),ts=require('typescript')
const source=await readFile(new URL('packages/vue-ui/src/month-calendar-values.ts',root),'utf8')
const compiled=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText.replace(/(['"])@solyi\/core\/date\1/g,JSON.stringify(new URL('packages/core/dist/date-only.js',root).href))
const {parseCalendarMonth,calendarMonthOf,calendarMonthLayout,shiftCalendarMonth,initialCalendarDate,navigateCalendarDate}=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'))
for(const value of [null,undefined,1,{},'', '2026-1','2026-00','2026-13','0000-01','10000-01','2026-01-01',' 2026-01'])assert.equal(parseCalendarMonth(value),null)
assert.deepEqual(parseCalendarMonth('0001-01'),{y:1,m:1,d:1});assert.deepEqual(parseCalendarMonth('9999-12'),{y:9999,m:12,d:1})
for(const firstDay of [-1,7,.5,NaN,Infinity])assert.deepEqual(calendarMonthLayout('2026-10',firstDay),{valid:false,reason:'first-day'})
assert.deepEqual(calendarMonthLayout('bad',0),{valid:false,reason:'month'})
let layouts=0
for(let year=1900;year<2300;year++)for(let month=1;month<=12;month++)for(let firstDay=0;firstDay<7;firstDay++){
 const iso=String(year).padStart(4,'0')+'-'+String(month).padStart(2,'0'),layout=calendarMonthLayout(iso,firstDay),last=new Date(Date.UTC(year,month,0)).getUTCDate()
 assert.equal(layout.valid,true);assert.equal(layout.cells.length,42);assert.equal(layout.weekdays.length,7);assert.equal(new Set(layout.weekdays).size,7);assert.equal(layout.weekdays[0],firstDay)
 const dates=layout.cells.filter(Boolean);assert.equal(dates.length,last);assert.equal(new Set(dates.map(cell=>cell.iso)).size,last)
 assert.deepEqual(dates.map(cell=>cell.day),Array.from({length:last},(_,index)=>index+1))
 const index=layout.cells.findIndex(Boolean);assert.equal((index+firstDay)%7,new Date(iso+'-01T00:00:00Z').getUTCDay())
 for(const cell of dates)assert.equal(cell.weekday,new Date(cell.iso+'T00:00:00Z').getUTCDay())
 assert.equal(Object.isFrozen(layout),true);assert.equal(Object.isFrozen(layout.cells),true);assert.equal(Object.isFrozen(dates[0]),true);layouts++
}
for(const month of ['0001-01','0001-12','0099-02','0100-02','0400-02','9999-01','9999-12'])for(const firstDay of [0,1,6]){
 const layout=calendarMonthLayout(month,firstDay);assert.equal(layout.valid,true);assert.ok(layout.cells.filter(Boolean).every(cell=>cell.iso.startsWith(month+'-')))
}
assert.equal(shiftCalendarMonth('0001-01',-1),'0001-01');assert.equal(shiftCalendarMonth('9999-12',1),'9999-12');assert.equal(shiftCalendarMonth('2026-12',1),'2027-01');assert.equal(shiftCalendarMonth('2026-01',-1),'2025-12')
for(const delta of [.5,NaN,Infinity,Number.MAX_SAFE_INTEGER+1])assert.equal(shiftCalendarMonth('2026-10',delta),null)
assert.equal(calendarMonthOf('2024-02-29'),'2024-02');assert.equal(calendarMonthOf('2023-02-29'),null)
assert.equal(initialCalendarDate('2026-10','2026-10-07','2026-10-28'),'2026-10-07');assert.equal(initialCalendarDate('2026-10','2026-09-07','2026-10-28'),'2026-10-28');assert.equal(initialCalendarDate('2026-10',null,'2026-11-01'),'2026-10-01');assert.equal(initialCalendarDate('bad',null,null),null)
for(const [from,key,firstDay,shift,to] of [
 ['2026-10-31','ArrowRight',0,false,'2026-11-01'],['2026-10-01','ArrowLeft',0,false,'2026-09-30'],
 ['2026-10-28','ArrowUp',0,false,'2026-10-21'],['2026-10-28','ArrowDown',0,false,'2026-11-04'],
 ['2026-10-28','Home',0,false,'2026-10-25'],['2026-10-28','Home',1,false,'2026-10-26'],
 ['2026-10-28','End',0,false,'2026-10-31'],['2026-10-28','End',1,false,'2026-11-01'],
 ['2024-03-31','PageUp',1,false,'2024-02-29'],['2023-01-31','PageDown',0,false,'2023-02-28'],
 ['2024-02-29','PageDown',0,true,'2025-02-28'],['2024-02-29','PageUp',0,true,'2023-02-28'],
 ['0001-01-01','ArrowLeft',0,false,'0001-01-01'],['9999-12-31','ArrowRight',0,false,'9999-12-31'],
])assert.equal(navigateCalendarDate(from,key,firstDay,shift),to,from+' '+key)
for(const value of ['bad','2026-02-29',null,{}])assert.equal(navigateCalendarDate(value,'ArrowRight',0),null)
assert.equal(navigateCalendarDate('2026-10-28','Enter',0),null);assert.equal(navigateCalendarDate('2026-10-28','Home',9),null)
const originalTZ=process.env.TZ,reference=JSON.stringify(calendarMonthLayout('2024-03',1))
try{for(const timezone of ['UTC','Asia/Seoul','America/Los_Angeles']){process.env.TZ=timezone;assert.equal(JSON.stringify(calendarMonthLayout('2024-03',1)),reference);assert.equal(navigateCalendarDate('2024-03-10','ArrowRight',0),'2024-03-11')}}finally{if(originalTZ===undefined)delete process.env.TZ;else process.env.TZ=originalTZ}
console.log('PASS: '+layouts+' Gregorian month/week-start layouts, empty spacers/42 cells, 0001–9999 boundaries, immutable internal data, ISO focus anchors, keyboard day/week/month/year proposals and timezone independence. Internal foundation only; no public Calendar UI is registered.')
