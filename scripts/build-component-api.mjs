import {readFile, readdir, writeFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
import { formatPublicSample } from './public-sample-format.mjs'

// Read the implementation rather than maintaining a second, fictional V* API.
const root = new URL('../', import.meta.url);
const require = createRequire(new URL('packages/vue-ui/package.json', root));
const ts = require('typescript');
const configPath=fileURLToPath(new URL('packages/vue-ui/tsconfig.json',root));
const config=ts.readConfigFile(configPath,ts.sys.readFile);
const parsed=ts.parseJsonConfigFileContent(config.config,ts.sys,fileURLToPath(new URL('packages/vue-ui/',root)));
const program=ts.createProgram(parsed.fileNames,{...parsed.options,noEmit:true});
const checker=program.getTypeChecker();
const files = new Map();
for (const file of await readdir(new URL('packages/vue-ui/src/', root))) {
  if (!file.endsWith('.ts') || file.endsWith('.d.ts')) continue;
  const text = await readFile(new URL('packages/vue-ui/src/' + file, root), 'utf8');
  const source = program.getSourceFile(fileURLToPath(new URL('packages/vue-ui/src/'+file,root))) || ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const symbols = new Map(), imports = new Map();
  for (const node of source.statements) {
    if (ts.isVariableStatement(node)) for (const declaration of node.declarationList.declarations)
      if (ts.isIdentifier(declaration.name)) symbols.set(declaration.name.text, declaration.initializer);
    if (ts.isFunctionDeclaration(node) && node.name) symbols.set(node.name.text, node);
    if ((ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) && node.name) symbols.set(node.name.text, node);
    if (ts.isExportDeclaration(node) && node.moduleSpecifier?.text.startsWith('vuetify') && node.exportClause && ts.isNamedExports(node.exportClause))
      for (const entry of node.exportClause.elements) if (/^S[A-Z]/.test(entry.name.text)) symbols.set(entry.name.text, undefined);
    if (ts.isImportDeclaration(node) && node.moduleSpecifier.text.startsWith('./')) {
      const bindings = node.importClause?.namedBindings;
      if (bindings && ts.isNamedImports(bindings)) for (const entry of bindings.elements)
        imports.set(entry.name.text, {file: node.moduleSpecifier.text.slice(2) + '.ts', name: entry.propertyName?.text || entry.name.text});
    }
  }
  files.set(file, {source, symbols, imports});
}
const text = node => node?.getText().replace(/\s+/g, ' ').trim() || '';
const unwrap = node => node && (ts.isAsExpression(node) || ts.isParenthesizedExpression(node) || ts.isSatisfiesExpression(node)) ? unwrap(node.expression) : node;
function resolve(node, file, seen = new Set()) {
  node = unwrap(node);
  if (!node || !ts.isIdentifier(node)) return {node, file};
  const key = file + ':' + node.text;
  if (seen.has(key)) return {node, file};
  seen.add(key);
  const record = files.get(file), imported = record?.imports.get(node.text);
  if (record?.symbols.has(node.text)) return resolve(record.symbols.get(node.text), file, seen);
  if (imported) return resolve(files.get(imported.file)?.symbols.get(imported.name), imported.file, seen);
  return {node, file};
}
function entries(node, file) {
  const target = resolve(node, file);
  if (!target.node || !ts.isObjectLiteralExpression(target.node)) return [];
  return target.node.properties.flatMap(property => {
    if (ts.isSpreadAssignment(property)) return entries(property.expression, target.file);
    if (ts.isPropertyAssignment(property)) return [[property.name.text || property.name.getText(), property.initializer, target.file]];
    if (ts.isShorthandPropertyAssignment(property)) return [[property.name.text, property.name, target.file]];
    if (ts.isMethodDeclaration(property)) return [[property.name.text, property, target.file]];
    return [];
  });
}
const property = (node, file, name) => entries(node, file).find(entry => entry[0] === name)?.[1];
function visit(node, predicate) {
  const found = [];
  function walk(child) {if (predicate(child)) found.push(child); ts.forEachChild(child, walk);}
  if (node) walk(node);
  return found;
}
function options(initializer, file) {
  const target = resolve(initializer, file), node = target.node;
  if (!node) return {file};
  if (ts.isCallExpression(node) && node.expression.getText() === 'defineComponent') return {node: node.arguments[0], file: target.file};
  if (ts.isCallExpression(node)) {
    const factory = resolve(node.expression, target.file);
    const calls = visit(factory.node, child => ts.isCallExpression(child) && child.expression.getText() === 'defineComponent');
    if (calls.length) return {node: calls[0].arguments[0], file: factory.file};
  }
  return {node, file: target.file};
}
const propertyDescriptions = {
  itemKey:'항목의 안정적인 string/유한 number key를 반환합니다. 중복 key는 조작을 막습니다.',
  itemLabel:'각 항목의 손잡이·이동 버튼·상태 안내에 쓰는 비어 있지 않은 이름입니다.',
  scrubbable:'입력 옆 전용 손잡이를 켭니다. 드래그·키 반복 중 preview만 발행하고 release에 확정합니다.',
  listScrubbable:'list presentation의 전용 행 손잡이를 켭니다. 목록 본문은 native 스크롤을 유지합니다.',
  scrubPixelsPerStep:'입력 손잡이에서 한 step에 필요한 양수 픽셀입니다. 생략하면 control 높이의 1/4, 잘못된 값은 10px을 사용합니다.',
  allowManualInput:'직접 타이핑을 허용합니다. false여도 readonly와 달리 팝업 선택은 허용합니다.',
  initialScrollValue:'목록을 열 때의 별도 스크롤 기준입니다. 값 선택이나 모델 변경을 뜻하지 않습니다.',
  scrollToCurrentTime:'선택값과 별도 기준이 없으면 현재 시각에 가까운 항목으로 스크롤합니다.',
  displayFormatter:'ISO 모델과 분리한 날짜 표시 callback입니다. 편집과 제출에는 표시 문자열을 사용하지 않습니다.',
  presets:'범위와 min 기준 step을 만족하는 숫자 preset 목록입니다.',
  unit:'모델과 parser에 포함하지 않는 표시용 단위입니다.',
  id:'입력·제목·패널의 접근성 연결에 사용하는 고유 ID입니다.', label:'화면과 보조 기술에 전달하는 이름입니다.', title:'표면 또는 패널의 제목입니다.', eyebrow:'제목 위에 표시하는 짧은 보조 문구입니다.',
  headingLevel:'문서의 제목 위계입니다. 화면의 실제 h2·h3·h4 수준에 맞춥니다.', modelValue:'소비 앱이 소유하는 현재 값입니다. update:modelValue와 연결합니다.',
  help:'입력 아래의 보조 설명입니다.', error:'소비 앱이 제공하는 오류 문구입니다.', serverError:'서버 응답 오류입니다. 로컬 규칙 오류와 구분하여 소비 앱에서 갱신합니다.',
  rules:'순서대로 실행할 공통 검증 규칙입니다. true·false 또는 오류 문구를 반환합니다.', errorMessages:'외부에서 제공하는 오류 문구입니다.',
  disabled:'사용을 막고 비활성 상태를 표시합니다.', readonly:'현재 값은 보여 주고 사용자 변경을 막습니다.', required:'필수 입력 의미와 해당 컴포넌트의 검증에 사용합니다.',
  locale:'앱 공통 문구를 이 컴포넌트에서 부분적으로 덮어씁니다.', variant:'행동의 시각적 위계입니다.', tone:'강조·정보·성공·주의·오류의 의미색입니다.', loading:'처리 중 상태입니다. 해당 컴포넌트의 입력·행동 계약을 따릅니다.',
  type:'입력 또는 버튼의 HTML 유형입니다.', options:'값·이름·비활성 여부로 구성된 선택지입니다.', items:'표시할 항목 자료입니다. 타입 정의의 필수 키를 확인합니다.', name:'라디오 입력 등에서 공유하는 HTML 이름입니다.', layout:'목록 또는 카드 표시 방식입니다.',
  placeholder:'값이 없을 때의 짧은 입력 예입니다. label을 대신하지 않습니다.', rows:'여러 줄 입력의 초기 줄 수입니다. 최소 세 줄을 유지합니다.', maxlength:'입력 가능한 최대 글자 수입니다.', showCount:'입력 글자 수 표시 여부입니다.',
  min:'허용하는 최소값입니다.', max:'허용하는 최대값입니다.', step:'값이 증가하거나 선택되는 간격입니다.',
  orientation:'가로 또는 세로 탐색 방향입니다.', activation:'초점 이동과 선택을 함께 할지, 별도로 확정할지 정합니다.',
  duration:'자동 닫기까지의 밀리초입니다. 0이면 자동으로 닫지 않으며, 초점·포인터가 알림 안에 있는 동안 타이머를 멈춥니다.', timeout:'자동 닫기까지의 밀리초입니다.', live:'보조 기술에 알리는 강도입니다. 초기 정적 내용은 off를 권장합니다.',
  mode:'단일 날짜 또는 시작·종료 기간을 선택합니다.', returnFocus:'닫힌 뒤 초점을 돌려줄 요소입니다.', closeLabel:'닫기 행동의 접근 가능한 이름입니다.', presentation:'중앙 다이얼로그 또는 옆 패널 표시 방식입니다.', maxWidth:'패널의 최대 너비입니다.',
  caption:'표의 이름입니다.', columns:'열 키·제목·너비·정렬·표시 형식을 정의합니다.', rows:'표 자료 또는 입력 줄 수입니다. 컴포넌트별 타입을 확인합니다.', selected:'선택한 자료의 ID 목록입니다.', selectable:'행 선택 체크박스를 표시합니다.', sort:'소비 앱이 소유하는 정렬 열과 방향입니다.', page:'현재 페이지 번호입니다.', pageCount:'전체 페이지 수입니다.', emptyText:'자료가 없을 때 표시할 문구입니다.',
  text:'짧은 설명 본문입니다.', src:'이미지 주소입니다. 소비 앱이 허용한 주소를 사용합니다.', initials:'이미지가 없을 때 보여 줄 짧은 글자입니다.', size:'아이콘·아바타·원형 진행 표시의 크기입니다.', current:'현재 경로나 항목 ID입니다.', completed:'완료한 단계 ID 목록입니다.', interactive:'사용자가 단계를 선택할 수 있게 합니다.', showTable:'차트와 같은 자료의 텍스트 표를 함께 표시합니다.', categoryLabel:'범주 열의 제목입니다.', valueLabel:'수치 열의 제목입니다.',
  message:'상태를 설명하는 문구입니다.', state:'알려진 진행률·무한 로딩·완료·오류 상태입니다.', animated:'무한 로딩의 반복 모션 여부입니다. 모션 줄이기 설정을 존중합니다.', showLabel:'보이는 이름 표시 여부입니다. 접근 가능한 이름은 유지합니다.', showValue:'보이는 수치 표시 여부입니다. 알 수 없는 진행률을 만들지 않습니다.', showMessage:'보이는 상태 문구 표시 여부입니다.', announce:'진행 상태 변화를 aria-live로 알릴지 정합니다.',
  accept:'허용하는 파일 확장자 또는 MIME 형식입니다.', multiple:'여러 파일을 선택할 수 있게 합니다.', maxFiles:'선택 가능한 최대 파일 수입니다.', maxSize:'파일 하나의 최대 바이트 수입니다.', maxSizeBytes:'파일 하나의 최대 바이트 수입니다.',
  loadOptions:'로컬 또는 소비 앱의 비동기 선택지 공급 함수입니다. 취소 신호를 처리합니다.', debounce:'검색 요청 전 기다리는 밀리초입니다.', debounceMs:'검색 요청 전 기다리는 밀리초입니다.', minLength:'검색을 시작하는 최소 글자 수입니다.', maxSelected:'선택 가능한 최대 항목 수입니다.',
  expanded:'펼쳐진 항목 ID 목록입니다.', selectedId:'선택한 항목 ID입니다.', ratio:'분할 영역의 현재 비율입니다.', minRatio:'첫 영역의 최소 비율입니다.', maxRatio:'첫 영역의 최대 비율입니다.', minSize:'분할 영역의 최소 크기입니다.', collapseAt:'두 영역을 세로로 바꾸는 컨테이너 너비 기준입니다.',
  open:'메뉴의 제어형 열림 상태입니다. update:open 이벤트와 연결합니다.', menuLabel:'분할 버튼에서 추가 행동 메뉴를 여는 버튼의 이름입니다.', maxFileSize:'파일 하나에 허용하는 최대 바이트 수입니다. 기본 2 × 1024 × 1024바이트(2 MiB)입니다.', drop:'파일 드래그·드롭 영역을 활성화합니다. 선택 버튼은 별도로 유지합니다.', fastFail:'폼 검증에서 첫 오류가 발생하면 뒤의 자체 필드 검사를 중단합니다.', lowerLabel:'범위의 아래쪽 핸들을 구분하는 이름입니다.', upperLabel:'범위의 위쪽 핸들을 구분하는 이름입니다.', formatValue:'숫자 하나를 받아 화면·접근성 값 표시용 문자열을 반환하는 함수입니다. 모델 값은 숫자로 유지합니다.', triggerLabel:'모바일·키보드에서 맥락 메뉴를 직접 여는 버튼의 이름입니다.', dismissible:'사용자가 알림을 닫을 수 있는 버튼을 표시합니다.', collapseBelow:'컨테이너 너비가 이 CSS px 값보다 작으면 두 영역을 세로로 배치합니다. 0 이하는 자동 전환을 끕니다.', primaryLabel:'첫 번째 분할 영역의 접근 가능한 이름입니다.', secondaryLabel:'두 번째 분할 영역의 접근 가능한 이름입니다.',
};
const records = [
  ['SMonthCalendar','표시·레이아웃','한 달의 날짜와 범용 marker를 조회·탐색합니다. 선택과 표시 월은 부모가 관리합니다.','component','advanced-vue'],
  ['SSortableList','표시·레이아웃','임의 객체 목록의 순서를 포인터·키보드·이동 버튼으로 제안합니다. 원본 모델은 직접 수정하지 않습니다.','component','advanced-vue'],
  ['SChip','표시·레이아웃','짧은 값의 표시·선택·제거를 구분합니다.','component','buttons'],
  ['SBadge','표시·레이아웃','상태와 개수를 비대화형 표시로 전달합니다.','component','buttons'],
  ['SIcon','표시·레이아웃','공통 선 아이콘을 장식 또는 접근 가능한 이미지로 표시합니다.','component','buttons'],
  ['SIconBtn','동작','접근 가능한 이름을 갖는 아이콘 전용 버튼입니다.','component','buttons'],
  ['SBtn','동작','버튼의 기본·보조·로딩·비활성 상태를 구분합니다.','component','buttons'],
  ['SSplitBtn','동작','대표 행동과 추가 행동 메뉴를 한 묶음으로 제공합니다.','component','action-menu'],
  ['SAutocomplete','입력','검색어와 한 개의 선택값을 구분하고 비동기 응답을 다룹니다.','pattern','autocomplete'],
  ['SCombobox','입력','콤보박스에서 자유 입력 문자열과 후보 선택을 확정합니다. Enter 또는 opt-in blur로 확정하고 옵션 ID는 change.option.value로 전달합니다.','component','combobox'],
  ['SCheckbox','입력','서로 독립적인 여러 조건을 켜고 끕니다.','component','choices'],
  ['SDatePicker','입력','한 입력창에서 단일 날짜 또는 기간을 선택합니다.','pattern','date'],
  ['SFileInput','입력','브라우저 안에서만 파일을 선택·드롭·제거합니다.','pattern','files'],
  ['SForm','입력','폼 검증 결과와 필드 초점을 모아 처리합니다.','pattern','form'],
  ['SMultiSelect','입력','검색과 태그 제거를 함께 사용하는 다중 선택입니다.','component','advanced-inputs'],
  ['SNumberInput','입력','최소·최대·간격이 있는 수치를 입력합니다.','component','advanced-inputs'],
  ['SRadioGroup','입력','서로 배타적인 선택지에서 하나를 고릅니다.','component','selection'],
  ['SRangeSlider','입력','최소·최대 범위의 양 끝값을 조절합니다.','start','advanced-vue'],
  ['SSegmentedControl','입력','짧은 단일 선택지를 이어진 컨트롤로 표시합니다.','start','advanced-vue'],
  ['SSelect','입력','정해진 항목 가운데 하나를 선택합니다.','component','choices'],
  ['SSwitch','입력','즉시 적용되는 설정을 켜고 끕니다.','component','selection'],
  ['STextarea','입력','여러 줄 내용과 글자 수·도움말을 표시합니다.','component','advanced-inputs'],
  ['STextField','입력','레이블·도움말·오류가 연결된 한 줄 입력입니다.','component','fields'],
  ['STimePicker','입력','직접 HH:mm 입력과 작은 시·분 패널을 함께 제공합니다.','component','time'],
  ['SAccordion','탐색','추가 내용을 같은 맥락에서 펼치고 접습니다.','component','accordion'],
  ['SBreadcrumbs','탐색','현재 위치와 상위 경로를 표시합니다.','component','navigation'],
  ['SContextMenu','탐색','우클릭·키보드·모바일 실행 버튼으로 행동 메뉴를 엽니다.','start','advanced-vue'],
  ['SStepper','탐색','현재·완료·다음 단계를 글과 상태로 구분합니다.','component','identity-progress'],
  ['STabs','탐색','방향키로 탭을 탐색하고 연결된 패널을 표시합니다.','component','content-tabs'],
  ['STree','탐색','계층 자료의 펼침과 선택을 구분합니다.','component','tree'],
  ['SAlert','피드백','화면에 남아 있어야 하는 정보·성공·오류를 전달합니다.','component','feedback'],
  ['SDialog','피드백','현재 맥락의 모달 또는 사이드 패널을 표시합니다.','component','dialog'],
  ['SPopover','피드백','실행 가능한 추가 정보를 작은 패널에 표시합니다.','component','help'],
  ['SProgressCircular','피드백','수치가 알려진 진행률과 무한 로딩을 원형으로 표시합니다.','component','progress'],
  ['SProgressLinear','피드백','수치가 알려진 진행률과 무한 로딩을 선형으로 표시합니다.','component','progress'],
  ['SSnackbar','피드백','짧은 상태를 초점을 빼앗지 않고 알립니다.','component','feedback'],
  ['STooltip','피드백','초점·클릭으로 짧은 비대화형 설명을 표시합니다.','component','help'],
  ['SAvatar','표시·레이아웃','이미지 또는 대체 글자로 대상을 표시합니다.','component','identity-progress'],
  ['SBarChart','표시·레이아웃','작은 수치 비교를 차트와 같은 자료의 표로 제공합니다.','component','chart'],
  ['SCard','표시·레이아웃','제목·내용·하단 행동을 한 표면으로 묶습니다.','pattern','composition'],
  ['SCol','표시·레이아웃','반응형 격자의 한 열을 구성합니다.','pattern','layouts'],
  ['SContainer','표시·레이아웃','반응형 화면의 콘텐츠 너비를 제한합니다.','pattern','layouts'],
  ['SDataTable','표시·레이아웃','정렬·선택·페이지와 작은 화면의 카드 보기를 제공합니다.','pattern','data'],
  ['SResizableSplitPane','표시·레이아웃','포인터·키보드로 두 영역의 크기를 조절합니다.','start','advanced-vue'],
  ['SRow','표시·레이아웃','반응형 격자의 행과 열 간격을 구성합니다.','pattern','layouts'],
];
const groupOrder = ['동작','입력','탐색','피드백','표시·레이아웃'];
const methodTypes = {focus:'() => void',validate:'() => boolean',resetValidation:'() => void',clear:'() => void',retry:'() => void',open:'() => void',close:'() => void',toggle:'() => void',reset:'() => void'};
const validationHook=files.get('form.ts')?.symbols.get('useSFieldValidation');
const validationHandle=visit(validationHook,ts.isReturnStatement).flatMap(statement=>entries(statement.expression,'form.ts').map(entry=>entry[0]));
if(validationHook)for(const method of ['focus','validate','resetValidation'])assert.ok(validationHandle.includes(method),'Shared field hook really returns '+method);
const declarations=new Map();
for(const record of files.values())for(const [name,node]of record.symbols)if(node&&(ts.isTypeAliasDeclaration(node)||ts.isInterfaceDeclaration(node)))declarations.set(name,node);
function allowedValues(type){const names=[...type.matchAll(/\b[A-Z]\w*\b/g)].map(match=>match[0]);return [...new Set([...type.matchAll(/'([^']+)'/g)].map(match=>match[1]).concat(names.flatMap(name=>{const declaration=declarations.get(name);return declaration&&ts.isTypeAliasDeclaration(declaration)&&ts.isUnionTypeNode(declaration.type)?declaration.type.types.filter(ts.isLiteralTypeNode).map(node=>node.literal).filter(ts.isStringLiteral).map(node=>node.text):[];})))];}
const signature = fn => '(' + (fn.parameters || []).map(p => p.name.getText().replace(/^_/,'') + (p.questionToken?'?':'') + ': ' + text(p.type || p.initializer)).join(', ') + ')';
const references = [];
for (const [name, group, description, exampleRoute, example] of records) {
  let file, initializer;
  for (const [filename, record] of files) if (record.symbols.has(name)) {file=filename;initializer=record.symbols.get(name);break;}
  // New APIs may be written concurrently. Never label absent APIs as implemented.
  if (!file) continue;
  const component = options(initializer,file), props = entries(property(component.node, component.file, 'props'),component.file).map(([name, value, file]) => {
    const settings = entries(value,file), typeNode = settings.find(e=>e[0]==='type')?.[1] || value;
    const typeSource = text(typeNode), propType = /PropType<([\s\S]+)>/.exec(typeSource)?.[1];
    const type = propType || ({String:'string',Number:'number',Boolean:'boolean',Object:'Record<string, unknown>',Array:'unknown[]',Function:'Function'}[typeSource] || typeSource || 'unknown');
    const defaultNode = settings.find(e=>e[0]==='default')?.[1];
    const def = defaultNode ? text(defaultNode).replace(/^\(\)\s*=>\s*/,'') : type==='boolean'?'false':'undefined';
    return {name,type,required:/^true\b/.test(text(settings.find(e=>e[0]==='required')?.[1])),default:def,description:propertyDescriptions[name] || `${name} 설정값입니다.`,values:allowedValues(type)};
  });
  if (name === 'SNumberInput') {
    props.find(prop => prop.name === 'step').description =
      '양의 유한한 증감 간격입니다. JavaScript Number로 정확한 별도 결과를 표현할 수 없거나 범위를 넘는 증감은 실행하지 않습니다.'
  }
  if (name === 'SSwitch') props.find(prop => prop.name === 'hideLabel').description = '기본 false입니다. 외부 설정명이 있는 배치에서 시각 라벨만 숨깁니다. label의 접근 가능한 이름은 유지하고 명시적 aria-label/aria-labelledby를 우선합니다.'
  if (name === 'SCombobox') {
    props.find(prop => prop.name === 'modelValue').description = '확정된 표시 문자열 또는 null입니다. 편집 draft는 Enter/opt-in blur 또는 후보 선택 전까지 모델에 반영하지 않습니다. 비어 있는 직접 입력은 null, 그 외 공백은 보존합니다.'
    props.find(prop => prop.name === 'commitOn').description = '직접 입력의 확정 시점입니다. 기본 [enter], blur는 opt-in입니다. 후보 클릭 또는 명시적으로 방향키 탐색 후 Enter는 select입니다. 빈 배열은 자동 직접 입력 확정을 사용하지 않습니다.'
    props.find(prop => prop.name === 'openOnFocus').description = '초점 진입 시 목록을 엽니다. clear·선택·retry의 내부 초점 복원으로 중복 요청하지 않습니다.'
  }
  if (name === 'STimePicker') props.find(prop => prop.name === 'presentation').description =
    '기본 두 native select 또는 opt-in 스크롤 목록입니다. 허용값은 native/list입니다.'
  if (name === 'STimePicker') {
    props.find(prop => prop.name === 'pickerPresentation').description = '생략하면 기존 body 연결 패널입니다. auto/popover/dialog는 팝업 표시 opt-in이며 presentation=native/list의 내용 선택과 독립적입니다. 표시 전환 중 scrub은 확정 없이 취소합니다.'
    props.find(prop => prop.name === 'placement').description = 'opt-in 연결 팝업의 logical 위치입니다. 기본 bottom-start이며 top/bottom과 start/end를 조합합니다. 화면 경계에서 flip/shift합니다.'
  }
  if (name === 'SDatePicker') {
    props.find(prop => prop.name === 'pickerPresentation').description = '생략하면 기존 native 모달을 유지합니다. auto는 화면 크기에 맞춰 연결 팝업/모달로 전환하며 popover/dialog는 명시적 opt-in입니다. 열린 auto 전환은 부분 기간 선택을 보존하고 legacy 경계를 바꾸면 취소합니다.'
    props.find(prop => prop.name === 'placement').description = 'opt-in 연결 팝업의 logical 시작/끝 위치입니다. 화면 경계에서 flip/shift하며 모달에서는 위치 기준으로 사용하지 않습니다.'
  }
  const emits = resolve(property(component.node,component.file,'emits'),component.file);
  const events = entries(emits.node,emits.file).map(([name,fn])=>({name,signature:signature(fn),description:name==='update:modelValue'?'소비 앱의 모델 값을 갱신합니다.':name.startsWith('update:')?'해당 상태의 변경을 소비 앱에 전달합니다.':name==='invalid'?'검증 실패 문구를 전달합니다.':name==='close'?(fn.parameters?.length?'닫힌 이유를 전달합니다.':'닫힌 뒤 전달합니다.'):name==='open'?'패널이 열린 뒤 전달합니다.':name==='retry'?'소비 앱에 재시도 처리를 요청합니다.':`${name} 동작이 발생했을 때 전달합니다.`}));
    if (name === 'SCombobox') {
      events.find(event => event.name === 'change').description = '확정된 표시 문자열 value와 reason(select/custom/clear)을 전달합니다. select에만 option 복사본을 포함하고 option.value는 후보 ID입니다. clear는 이미 빈 모델에도 알림을 보냅니다. 부모가 제안을 거부하면 화면은 부모 모델로 복원됩니다.'
      events.find(event => event.name === 'search').description = 'IME 조합 중에는 보내지 않고, debounce 전의 검색 문자열을 전달합니다. 실제 로더는 debounce/AbortSignal/stale 응답 무시를 적용합니다.'
    }
    if (name === 'STimePicker') {
      const interactionDescriptions = {
        preview:'스크러빙 중 허용 HH:mm 제안입니다. 모델·폼 값은 바꾸지 않습니다.',
        interactionCommit:'스크러빙의 포인터·키 release 확정입니다. 기존 change payload는 유지합니다.',
        interactionCancel:'스크러빙 취소 사유와 마지막 제안입니다. 모델·change를 쓰지 않습니다.',
      }
      for (const event of events) if (interactionDescriptions[event.name]) event.description = interactionDescriptions[event.name]
    }
    if(name==='SSortableList') {
      const contract=declarations.get('SolSortableProps')
      assert.ok(contract&&ts.isInterfaceDeclaration(contract),'Generic public props interface exists')
      for(const prop of props){const member=contract.members.find(member=>member.name?.text===prop.name);assert.ok(member,'Runtime prop is in the public generic contract: '+prop.name);prop.type=text(member.type);prop.required=!member.questionToken}
      for(const event of events){const key=event.name==='update:modelValue'?'onUpdate:modelValue':'on'+event.name[0].toUpperCase()+event.name.slice(1);const member=contract.members.find(member=>member.name?.text===key);assert.ok(member&&ts.isFunctionTypeNode(member.type),'Typed generic event: '+event.name);event.signature=signature(member.type)}
      const descriptions={start:'키보드/포인터 이동 조작을 시작합니다. 이동 버튼은 바로 제안을 확정합니다.',preview:'순서 미리보기 제안입니다. 모델과 DOM 원본 순서는 바꾸지 않습니다.',end:'commit/unchanged/cancel 결과입니다. cancel이면 취소 사유를 포함합니다.',change:'최종 순서가 달라질 때 items/key/from/to/input 제안을 한 번 보냅니다.'}
      for(const event of events)if(descriptions[event.name])event.description=descriptions[event.name]
    }
    const setup = property(component.node,component.file,'setup');
  const slotNames = new Set();
  for (const node of visit(setup,n=>ts.isPropertyAccessExpression(n)&&n.expression.getText()==='slots')) slotNames.add(node.name.text);
  const shared = text(setup).includes('fieldLabel(') || text(setup).includes('fieldMessages(');
  if (shared) {slotNames.add('label');slotNames.add('help');}
  if(name==='SSortableList'||name==='SMonthCalendar')slotNames.delete('label')
  if (name==='SDataTable')slotNames.add('cell-{column.key}');
  if (name==='STabs')slotNames.add('panel-{item.value}');
  const slotScopes=new Map();
  for(const call of visit(setup,ts.isCallExpression)){
    const callee=call.expression;
    let slot;
    if(ts.isPropertyAccessExpression(callee)&&callee.expression.getText()==='slots')slot=callee.name.text;
    else if(ts.isElementAccessExpression(callee)&&callee.expression.getText()==='slots')slot=ts.isStringLiteral(callee.argumentExpression)?callee.argumentExpression.text:name==='SDataTable'?'cell-{column.key}':name==='STabs'?'panel-{item.value}':undefined;
    if(!slot)continue;slotNames.add(slot);
    slotScopes.set(slot,call.arguments.length?checker.typeToString(checker.getTypeAtLocation(call.arguments[0]),call.arguments[0],ts.TypeFormatFlags.NoTruncation):'인자 없음');
  }
  if(props.some(prop=>prop.name==='clearable')){
    const inputSlots=declarations.get('SolInputControlSlots');assert.ok(inputSlots&&ts.isInterfaceDeclaration(inputSlots),'Shared input slots exist')
    for(const member of inputSlots.members){const slot=member.name.text;slotNames.add(slot);slotScopes.set(slot,member.type.parameters.length?text(member.type.parameters[0].type):'인자 없음')}
  }
  const slots = [...slotNames].map(name=>({name,scope:slotScopes.get(name)||'인자 없음',description:name==='default'?'기본 내용입니다.':name==='actions'?'내용과 구분된 하단·보조 행동입니다.':name==='activator'?'전달받은 props를 실제 실행 요소에 바인딩합니다.':name==='label'?'기본 이름 표시를 바꿉니다. 접근 가능한 이름은 유지합니다.':name==='help'?'입력 아래의 보조 설명입니다.':name.startsWith('cell-')?'열 키에 해당하는 셀 내용입니다. {row, value}를 받습니다.':name.startsWith('panel-')?'항목 값에 해당하는 탭 패널 내용입니다.':`${name} 영역의 내용입니다.`}));
  const methodNames = new Set();
  for (const call of visit(setup,n=>ts.isCallExpression(n)&&n.expression.getText()==='expose')) {for(const [method]of entries(call.arguments[0],component.file))methodNames.add(method);if(/\bvalidation\b/.test(text(call.arguments[0]))&&text(setup).includes('useSFieldValidation('))for(const method of validationHandle)methodNames.add(method);}
  const methods=[...methodNames].map(method=>({name:method,signature:name==='SForm'&&method==='validate'?'() => Promise<SFormResult>':methodTypes[method]||'소스의 공개 핸들 타입 참조',description:method==='focus'?'사용 가능한 입력 또는 실행 요소로 초점을 이동합니다.':method==='validate'?'현재 값을 검증하고 유효 여부를 반환합니다.':method==='resetValidation'?'입력값을 바꾸지 않고 로컬 검증 표시를 초기화합니다.':method==='clear'?'선택값을 초기화합니다.':method==='retry'?'실패한 요청을 다시 실행합니다.':`${method} 작업을 실행합니다.`}));
  if(name==='SForm')for(const slot of slots)if(slot.name==='default')slot.description='폼 상태와 작업을 받습니다: {validate, resetValidation, focus, errors, isValid, isValidating}. validate는 Promise<SFormResult>를 반환합니다.';
  if(name==='SSortableList'||name==='SMonthCalendar'){
    const contract=declarations.get(name==='SSortableList'?'SolSortableSlots':'SolMonthCalendarSlots'),handle=declarations.get(name==='SSortableList'?'SolSortableHandle':'SolMonthCalendarHandle')
    assert.deepEqual(slots.map(slot=>slot.name).sort(),contract.members.map(member=>member.name.text).sort(),'Document exactly the implemented sortable slots')
    for(const slot of slots){const member=contract.members.find(member=>member.name.text===slot.name);slot.scope=member.type.parameters.length?text(member.type.parameters[0].type):'범위 없음'}
    assert.deepEqual(methods.map(method=>method.name).sort(),handle.members.map(member=>member.name.text).sort(),'Document exactly the exposed sortable handle')
    for(const method of methods){const member=handle.members.find(member=>member.name.text===method.name);method.signature=signature(member)+' => '+text(member.type)}
  }
  const usedTypes=new Map(),pending=[...props.map(prop=>prop.type),...events.map(event=>event.signature),...methods.map(method=>method.signature),...slots.map(slot=>slot.scope)];
  while(pending.length){const type=pending.pop();for(const match of type.matchAll(/\b[A-Z]\w*\b/g)){const declaration=declarations.get(match[0]);if(!declaration||usedTypes.has(match[0])||match[0]==='SolLocale')continue;const source=declaration.getText().replace(/^export\s+/,'');usedTypes.set(match[0],source);pending.push(source);}}
  references.push({name,id:name.replace(/([a-z0-9])([A-Z])/g,'$1-$2').toLowerCase(),group,description,exampleRoute,example,source:'packages/vue-ui/src/'+file,props,events,slots,methods,types:[...usedTypes].map(([name,source])=>({name,source})),passthrough:['SContainer','SRow','SCol'].includes(name)?name.replace(/^S/,'V'):null});
}
references.sort((a,b)=>groupOrder.indexOf(a.group)-groupOrder.indexOf(b.group)||a.name.localeCompare(b.name,'en'));
const index=files.get('index.ts'),publicComponents=entries(index.symbols.get('sComponents'),'index.ts').map(entry=>entry[0]);
assert.deepEqual(references.map(x=>x.name).sort(),publicComponents.sort(),'Every public S component has one component reference; no imaginary API');
for (const ref of references) {assert.equal(new Set(ref.props.map(x=>x.name)).size,ref.props.length,ref.name+' unique props');assert.ok(ref.props.length||ref.passthrough,ref.name+' props parsed');}
const versions=Object.fromEntries(await Promise.all(['core','vue-ui'].map(async name=>[name,JSON.parse(await readFile(new URL('packages/'+name+'/package.json',root),'utf8')).version])));
const recipeFiles={date:'inputs',files:'inputs',autocomplete:'inputs',chart:'chart-tree',tree:'chart-tree'};
const exampleSources=Object.fromEntries(await Promise.all([...new Set(references.map(ref=>ref.example))].map(async example=>[example,await readFile(new URL(example==='advanced-vue'?'examples/vue-vuetify/src/AdvancedExamples.vue':'examples/vue-vuetify/src/recipes/'+(recipeFiles[example]||example)+'.vue',root),'utf8')])));
for(const [example,source] of Object.entries(exampleSources))assert.equal(source,await formatPublicSample(source,'vue'),example+': component examples retain the canonical public SFC format');
const code='// Generated from packages/vue-ui/src by scripts/build-component-api.mjs.\nexport const componentReferences='+JSON.stringify(references,null,2)+';\nexport const componentReferenceVersions='+JSON.stringify(versions)+';\nexport const componentExampleSources='+JSON.stringify(exampleSources,null,2)+';\n';
if(process.argv.includes('--check'))assert.ok((await readFile(new URL('site/component-api-data.js',root),'utf8'))===code,'Component reference changed; regenerate from the current implementation');
else await writeFile(new URL('site/component-api-data.js',root),code);
console.log(`Generated ${references.length} source-linked S component references with typed props, defaults, events, slots and exposed methods.`);
