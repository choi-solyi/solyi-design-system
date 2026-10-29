/* Own declarations are checked without suppressing their diagnostics. No package build is written. */
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const ui = path.join(root, 'packages/vue-ui')
// The starter pins the documented consumer TypeScript version, independently of library tooling.
const require = createRequire(path.join(root, 'examples/vue-vuetify/package.json'))
const ts = require('typescript')
const installed = process.argv.includes('--installed')
const normalize = file => path.resolve(file).replaceAll('\\', '/')
const ownRoot = installed
  ? path.join(root, 'examples/package-consumer/node_modules/solyi-ui/dist')
  : path.join(ui, '.declaration-contract-memory')
const memory = new Map()
const configFile = ts.readConfigFile(path.join(ui, 'tsconfig.json'), ts.sys.readFile)
const config = ts.parseJsonConfigFileContent(configFile.config, ts.sys, ui)

if (!installed) {
  const sourceProgram = ts.createProgram(config.fileNames, {
    ...config.options,
    outDir: ownRoot,
    skipLibCheck: true,
  })
  const errors = ts.getPreEmitDiagnostics(sourceProgram)
    .filter(diagnostic => diagnostic.category === ts.DiagnosticCategory.Error)
  assert.equal(errors.length, 0, ts.formatDiagnosticsWithColorAndContext(errors, {
    getCurrentDirectory: () => root,
    getCanonicalFileName: file => file,
    getNewLine: () => '\n',
  }))
  const emitted = sourceProgram.emit(undefined, (file, text) => {
    // Match the existing finalizer: CSS is an explicit public subpath, not a type side effect.
    memory.set(normalize(file), text.replace("import './styles.css';\n", ''))
  })
  assert.equal(emitted.emitSkipped, false, 'Own declaration emit succeeds')
}

const options = {
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  strict: true,
  skipLibCheck: false,
  noEmit: true,
  lib: ['lib.es2022.d.ts', 'lib.dom.d.ts'],
}
const host = ts.createCompilerHost(options)
const originalRead = host.readFile.bind(host)
const originalExists = host.fileExists.bind(host)
const originalDirectoryExists = host.directoryExists.bind(host)
const originalSourceFile = host.getSourceFile.bind(host)
host.readFile = file => memory.get(normalize(file)) ?? originalRead(file)
host.fileExists = file => memory.has(normalize(file)) || originalExists(file)
host.directoryExists = directory => [...memory.keys()].some(file => {
  return file.startsWith(normalize(directory) + '/')
}) || originalDirectoryExists(directory)
host.getSourceFile = (file, languageVersion, onError, createNew) => {
  const source = memory.get(normalize(file))
  return source === undefined
    ? originalSourceFile(file, languageVersion, onError, createNew)
    : ts.createSourceFile(file, source, languageVersion, true)
}
const entries = installed
  ? ts.sys.readDirectory(ownRoot, ['.d.ts'], undefined, ['**/*.d.ts'])
  : [...memory.keys()]
const declarationCount = entries.length
assert.ok(declarationCount > 10, 'All own public declaration files are checked')
const fixture = normalize(path.join(ownRoot, 'navigation-contract.ts'))
memory.set(fixture, `import { STabs, SResizableSplitPane, SChip, SBadge, SIcon, SIconBtn, SBtn, SDatePicker, SNumberInput, STimePicker, SSortableList, SPagination, SDataTable } from './index'
import {createApp,h} from 'vue'
import type {SolSortableProps,SolSortableSlots,SolTimeGridProps,SolTimeGridSlots,SolTimeGridHandle} from './index'
import type { SolIconName, SolTone, SolDateDisplayFormatter, SolNumberDisplayFormatter, SolNumberPreset } from './index'
import type { GlobalComponents } from 'vue'
type TabsProps = InstanceType<typeof STabs>['$props']
type PaneProps = InstanceType<typeof SResizableSplitPane>['$props']
const tabs: TabsProps = { id: 'tabs', label: 'Tabs', modelValue: 'a', items: [], error: 'Info' }
const pane: PaneProps = { id: 'pane', label: 'Pane', primaryLabel: 'A', secondaryLabel: 'B' }
// @ts-expect-error Navigation is not a validated input.
const tabRules: TabsProps = { ...tabs, rules: [] }
// @ts-expect-error Navigation has a display-only error, not server field state.
const tabServer: TabsProps = { ...tabs, serverError: 'Server' }
// @ts-expect-error Layout is not a validated input.
const paneRules: PaneProps = { ...pane, rules: [] }
// @ts-expect-error Layout has a display-only error, not server field state.
const paneServer: PaneProps = { ...pane, errorMessages: ['Server'] }
void [tabs, pane, tabRules, tabServer, paneRules, paneServer]
type IconProps = InstanceType<typeof SIcon>['$props']
type IconButtonProps = InstanceType<typeof SIconBtn>['$props']
type ChipProps = InstanceType<typeof SChip>['$props']
type BadgeProps = InstanceType<typeof SBadge>['$props']
const icon: IconProps = { name: 'copy', size: 16, rotate: 90 }
const iconButton: IconButtonProps = { label: 'Copy', icon: 'copy', tone: 'danger' }
const chip: ChipProps = { label: 'Design', selected: true, selectable: true }
const badge: BadgeProps = { content: 0, label: 'No notifications', tone: 'neutral' }
const oldButton: InstanceType<typeof SBtn>['$props'] = {}
const globalIconButton: GlobalComponents['SIconBtn'] = SIconBtn
const iconName: SolIconName = 'copy'
const tone: SolTone = 'neutral'
// @ts-expect-error Accessible label is required for icon buttons.
const unnamedIconButton: IconButtonProps = { icon: 'copy' }
// @ts-expect-error There is no warning path in the existing icon set.
const unknownIcon: IconProps = { name: 'warning' }
// @ts-expect-error Icon sizes use the existing three tokens.
const arbitraryIconSize: IconProps = { name: 'copy', size: 23 }
// @ts-expect-error Passive badges are not readonly inputs.
const readonlyBadge: BadgeProps = { content: 'Done', readonly: true }
void [icon, iconButton, chip, badge, oldButton, globalIconButton, iconName, tone, unnamedIconButton, unknownIcon, arbitraryIconSize, readonlyBadge]
const dateDisplay: SolDateDisplayFormatter = (iso, locale) => iso + locale.code
const numberDisplay: SolNumberDisplayFormatter = (value, locale) => String(value) + locale.code
const numberPresets: readonly SolNumberPreset[] = [{ value: 20, label: 'Twenty' }]
const formattedDate: InstanceType<typeof SDatePicker>['$props'] = { id: 'date', label: 'Date', displayFormatter: dateDisplay }
const presetNumber: InstanceType<typeof SNumberInput>['$props'] = { id: 'number', label: 'Number', presets: numberPresets, unit: 'units', formatValue: numberDisplay }
// @ts-expect-error Display callbacks return text and never parse into model values.
const numericDateFormatter: SolDateDisplayFormatter = () => 1
// @ts-expect-error Presets preserve the existing numeric model.
const stringPreset: SolNumberPreset = { value: '20' }
void [formattedDate, presetNumber, numericDateFormatter, stringPreset]
const listTime: InstanceType<typeof STimePicker>['$props'] = { id: 'time', label: 'Time', presentation: 'list', allowManualInput: false, initialScrollValue: '09:07', scrollToCurrentTime: true }
const nativeTime: InstanceType<typeof STimePicker>['$props'] = { id: 'native', label: 'Time' }
// @ts-expect-error Custom time presentation is an explicit opt-in union.
const unsupportedTime: InstanceType<typeof STimePicker>['$props'] = { id: 'time', label: 'Time', presentation: 'wheel' }
const scrubTime: InstanceType<typeof STimePicker>['$props'] = { id: 'scrub', label: 'Time', scrubbable: true, listScrubbable: true, scrubPixelsPerStep: 10,
  onPreview: value => { const source: 'input' | 'list' = value.source; void source },
  onInteractionCommit: value => { const input: 'pointer' | 'keyboard' = value.input; void input },
  onInteractionCancel: value => { const reason: string = value.reason; void reason },
}
// @ts-expect-error Preview remains a typed clock proposal, never a number model.
const invalidPreview: InstanceType<typeof STimePicker>['$props'] = { id: 'scrub', label: 'Time', onPreview: (value: number) => void value }
void [listTime, nativeTime, unsupportedTime, scrubTime, invalidPreview]
interface Item {id:string;details:{count:number}}
const sortable:SolSortableProps<Item> = {id:'sort',label:'Sort',modelValue:[{id:'a',details:{count:1}}],itemKey:item=>item.id,itemLabel:item=>item.id}
createApp({}).component('SortableDirect',SSortableList)
h(SSortableList<Item>,sortable)
const sortableSlots:SolSortableSlots<Item> = {item:({item})=>[h('strong',item.details.count.toFixed(0))]}
// @ts-expect-error Generic item identity cannot become a boolean.
const badSortableKey:SolSortableProps<Item> = {...sortable,itemKey:item=>!!item.id}
// @ts-expect-error Readonly generic input arrays cannot silently become unrelated item models.
const badSortableModel:SolSortableProps<Item> = {...sortable,modelValue:[1,2]}
// @ts-expect-error Slot items retain the caller's concrete object type.
const badSortableSlot:SolSortableSlots<Item> = {item:({item})=>[h('span',item.missing)]}
void [sortableSlots,badSortableKey,badSortableModel,badSortableSlot]
interface GridItem {id:string;title:string;column:string;start:number;end:number}
const grid:SolTimeGridProps<GridItem> = {id:'grid',label:'Grid',items:[],columns:[{key:'one',label:'One'}],itemKey:item=>item.id,itemLabel:item=>item.title,itemColumn:item=>item.column,itemStart:item=>item.start,itemEnd:item=>item.end,onCommit:p=>{p.to.startMinute.toFixed()},onCancel:p=>{p.reason.toUpperCase()}}
const gridSlots:SolTimeGridSlots<GridItem> = {item:({item,proposal})=>[h('span',item.title+(proposal?.action||''))]}
declare const gridHandle:SolTimeGridHandle
gridHandle.focus('a');gridHandle.cancel()
// @ts-expect-error Minute accessors cannot return display strings.
const badGridMinute:SolTimeGridProps<GridItem> = {...grid,itemStart:item=>String(item.start)}
// @ts-expect-error Generic item slot keeps the concrete caller type.
const badGridSlot:SolTimeGridSlots<GridItem> = {item:({item})=>[h('span',item.missing)]}
// @ts-expect-error Frozen proposal coordinates cannot be mutated by a consumer.
const badGridCommit:SolTimeGridProps<GridItem> = {...grid,onCommit:p=>{p.to.startMinute=0}}
void [gridSlots,badGridMinute,badGridSlot,badGridCommit]
const paginationProps:InstanceType<typeof SPagination>['$props']={pageCount:1003,siblingCount:3,compactPagination:false}
const tableProps:InstanceType<typeof SDataTable>['$props']={caption:'Table',columns:[],rows:[],siblingCount:3,compactPagination:true}
// @ts-expect-error Compact pagination is boolean, not a CSS density string.
const badCompact:InstanceType<typeof SDataTable>['$props']={...tableProps,compactPagination:'compact'}
// @ts-expect-error Neighbor counts are numeric on the standalone control too.
const badSiblings:InstanceType<typeof SPagination>['$props']={...paginationProps,siblingCount:'3'}
void [paginationProps,tableProps,badCompact,badSiblings]
`)
entries.push(fixture)
const program = ts.createProgram(entries, options, host)
const errors = ts.getPreEmitDiagnostics(program)
  .filter(diagnostic => diagnostic.category === ts.DiagnosticCategory.Error)
const ownErrors = errors.filter(diagnostic => {
  return diagnostic.file && normalize(diagnostic.file.fileName).startsWith(normalize(ownRoot) + '/')
})
assert.equal(ownErrors.length, 0, ts.formatDiagnosticsWithColorAndContext(ownErrors, {
  getCurrentDirectory: () => root,
  getCanonicalFileName: file => file,
  getNewLine: () => '\n',
}))
console.log(`PASS: ${declarationCount} ${installed ? 'installed' : 'in-memory'} solyi-ui ` +
  `declaration files and negative API fixture; TypeScript ${ts.version}; ` +
  'skipLibCheck:false; own declaration diagnostics=0.')
console.log(`LIMIT: ${errors.length - ownErrors.length} external declaration diagnostics are separate; ` +
  'this check does not certify all Vuetify/optional-adapter declarations.')
