import assert from 'node:assert/strict'
import {JSDOM} from 'jsdom'
import {readFile} from 'node:fs/promises'
import {componentReferences,componentExampleSources} from '../site/component-api-data.js'
import {componentCatalogue,renderComponentReferences} from '../site/component-api.js'
import {getDocumentSearchEntries,resolveDocumentLocation} from '../site/topics.js'
import {findDocumentResults} from '../site/doc-search.js'
const expectations=[
 ['SDialog','Dialog',['busy','busyScope'],['update:modelValue','close'],['default','actions','actions-start','feedback'],[]],
 ['SSwitch','Switch',['hideLabel','label'],['update:modelValue'],[],[]],
 ['SCard','Card',['description'],[],['leading','title','description','meta','default','actions'],[]],
 ['SChip','칩',['selected','removable','disabled'],['update:selected','click','remove'],['default','leading','trailing'],[]],
 ['SBadge','배지',['content','label','live'],[],['default','anchor'],[]],
 ['SIcon','아이콘',['name','label','decorative','size','rotate'],[],[],[]],
 ['SIconBtn','아이콘 버튼',['icon','label','loading','disabled'],['click'],['default'],[]],
 ['SDatePicker','날짜 선택',['displayFormatter','pickerPresentation','placement','clearable'],['change'],[],['focus','validate','clear']],
 ['SNumberInput','숫자 입력',['presets','formatValue','unit','clearable'],['change'],['presets'],['focus','validate','clear']],
 ['STimePicker','시각 선택',['allowManualInput','presentation','initialScrollValue','scrollToCurrentTime','scrubbable','listScrubbable','scrubPixelsPerStep','pickerPresentation','placement','clearable'],['change','preview','interactionCommit','interactionCancel'],[],['focus','validate','clear']],
 ['SSortableList','정렬 목록',['modelValue','itemKey','itemLabel','isItemDisabled','disabled','readonly'],['update:modelValue','change','start','preview','end'],['item','handle-icon','empty','help'],['focus','cancel']],
 ['SMonthCalendar','월간 달력',['month','modelValue','firstDay','today','markers','markerLimit','isDateDisabled','loading'],['update:month','update:modelValue','month-change','change'],['cell','marker','empty','help'],['focus']],
 ['SCombobox','콤보박스',['modelValue','commitOn','loadOptions'],['change'],[],['focus','clear','retry']],
 ['SConfirmAction','확인 액션',['timeout','cancelOnBlur','loading','error'],['confirm','cancel'],[],['focus','reset']],
 ['SEmptyState','빈 상태',['title','description','icon'],[],['actions','icon','description'],[]],
 ['SLoadingOverlay','로딩 오버레이',['modelValue','scope','blocking','delay','minVisibleMs'],['visibleChange'],[],[]],
 ['SPagination','페이지 이동',['modelValue','pageCount','siblingCount','disabled','loading'],['update:modelValue'],[],['focus']],
 ['STimeGrid','시간 그리드',['items','columns','readonly','snapMinutes','allowResize','allowDuplicate','pendingKeys','isItemDisabled'],['start','preview','commit','cancel'],['item','band','empty','help'],['focus','cancel']],
]
const escape=value=>value.replace(/[&<>]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[char]))
const html=renderComponentReferences({section:(id,title,description,body)=>`<section class="section" id="${id}"><h2>${title}</h2>${body}</section>`,codeSample:(_label,source)=>`<details><summary>Code</summary><div class="code-body"><pre><code>${escape(source)}</code></pre></div></details>`})
const dom=new JSDOM('<main><header class="page-intro"><h1>Components</h1></header>'+html+'</main>'),d=dom.window.document,index=getDocumentSearchEntries(d.querySelector('main'),'component'),catalogue=componentCatalogue().flatMap(group=>group.items)
const report=[]
for(const [name,korean,props,events,slots,methods] of expectations){
 const component=componentReferences.find(item=>item.name===name);assert.ok(component,name+' is documented');const id=component.id,card=d.getElementById(id)
 assert.ok(catalogue.some(item=>item.id===id&&item.apiName===name),name+' menu index');assert.deepEqual(resolveDocumentLocation('#component/'+id),{route:'component',anchor:id})
 for(const query of [name,korean]){const first=findDocumentResults(index,query)[0];assert.equal(first?.id,id,query+' resolves to the actual component, not shared code prose')}
 for(const key of props)assert.ok(component.props.some(item=>item.name===key),name+' prop '+key)
 for(const key of events)assert.ok(component.events.some(item=>item.name===key),name+' event '+key)
 for(const key of slots)assert.ok(component.slots.some(item=>item.name===key),name+' slot '+key)
 for(const key of methods)assert.ok(component.methods.some(item=>item.name===key),name+' method '+key)
 assert.deepEqual([...card.querySelectorAll('[data-component-tab]')].map(tab=>tab.textContent),['Examples','Sample Code','API'])
 assert.ok(new RegExp('<'+name+'(?:\\s|>)').test(componentExampleSources[component.example]),name+' is actually in the linked consumer source')
 assert.equal(card.querySelector('.component-code-panel pre code').textContent,componentExampleSources[component.example])
 const canvas=card.querySelector('[data-component-example]'),preview={recipe:canvas.dataset.componentExample,view:canvas.dataset.previewView,part:canvas.dataset.previewPart}
 const link=card.querySelector('.code-example-footer a[href^="./starter/"]').getAttribute('href'),url=new URL(link,'https://example.test/')
 assert.equal(url.searchParams.get('view'),preview.view);assert.equal(url.searchParams.get('example'),preview.recipe);if(preview.part)assert.equal(url.searchParams.get('part'),preview.part)
 report.push({name,id,korean,preview,link})
}
const sortable=componentReferences.find(item=>item.name==='SSortableList')
assert.equal(sortable.props.find(item=>item.name==='modelValue').type,'readonly T[]');assert.match(sortable.props.find(item=>item.name==='itemKey').type,/item: T/)
assert.deepEqual(sortable.slots.map(item=>item.name).sort(),['empty','handle-icon','help','item']);assert.match(sortable.slots.find(item=>item.name==='item').scope,/SolSortableItemScope<T>/)
assert.equal(sortable.methods.find(item=>item.name==='focus').signature,'(key?: SolSortableKey) => void')
for(const absent of ['SScheduler'])assert.equal(componentReferences.some(item=>item.name===absent),false,'Business scheduler APIs are outside this release')
const registry=await readFile(new URL('../packages/vue-ui/src/index.ts',import.meta.url),'utf8');for(const [name] of expectations)assert.ok(registry.includes(name))
console.log('PASS: '+report.length+' new/extended Components menu/search/routes, 3 panels, API additions, real consumer source/links; generic slots/methods match declarations and excluded scheduler is absent.')
for(const item of report)console.log(item.name+' → #component/'+item.id+' → '+item.link)
