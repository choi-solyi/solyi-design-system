import {computed, inject, toValue} from 'vue';
import type {App, InjectionKey, MaybeRefOrGetter} from 'vue';
import {parseDateOnly} from '@solyi/core/date';

export type SolLocaleCode='ko-KR'|'en-US';
export type SolLocaleSource=MaybeRefOrGetter<Partial<SolLocale>|string>;
export interface SolLocale {
  validationRequired:string;validationInvalid:string;validationMinLength:(minimum:number)=>string;
  breadcrumb:string;steps:string;currentStep:string;completeStep:string;chartInvalid:string;chartCategory:string;chartValue:string;toastAccent:string;
  filesChoose:string;filesClear:string;dropFiles:string;filesRejected:string;fileRequired:string;unknownFileType:string;noFileExtension:string;duplicateFile:string;unsupportedFile:string;
  filesHelp:(accept:string,max:number,size:string)=>string;oversizedFile:(size:string)=>string;tooManyFiles:(max:number)=>string;fileRemove:string;fileType:(mime:string)=>string;
  progressFailed:string;progressPending:string;progressUnknown:string;progressInvalid:string;progressComplete:string;progressRunning:(percent:string)=>string;progressError:(percent:string)=>string;
  details:string;record:string;fullText:string;viewFullText:(text:string)=>string;selectRecord:(text:string)=>string;
  selectPage:string;selectRecords:string;sortField:string;chooseSort:string;ascending:string;descending:string;sortDirection:(direction:string)=>string;
  tableLoading:string;tableRetry:string;tableEmpty:string;previousPage:string;nextPage:string;
  pages:(caption:string)=>string;pageLabel:(page:number,count:number)=>string;pageSummary:(page:number,count:number,selected:number)=>string;
  selectedItems:string;loading:string;loadFailed:string;retry:string;noResults:string;chooseAtLeastOne:string;unavailable:string;moreActions:string;contextKeys:string;lower:string;upper:string;rangeKeys:string;splitKeys:string;splitStacked:string;remove:(label:string)=>string;selectionLimit:(max:number)=>string;selectionCount:(count:number,max?:number)=>string;
  code:string; firstDay:number; required:string; choose:string; clear:string; close:string; done:string;
  increase:string; decrease:string; invalidNumber:string; numberRange:string; numberStep:string;
  calendar:string; singleDate:string; dateRange:string; previousMonth:string; nextMonth:string; today:string;
  chooseStart:string; chooseEnd:string; invalidDate:string; invalidRange:string; dateRequired:string;
  calendarKeys:string; selected:string; start:string; end:string;
  time:string; hour:string; minute:string; invalidTime:string; timeRequired:string;
  toastInfo:string;toastSuccess:string;toastWarning:string;toastDanger:string;notification:string; count:(current:number,max?:number)=>string;
  numberHelp:(min:number|undefined,max:number|undefined,step:number)=>string;
  timeHelp:(min:string,max:string,step:number)=>string;
  timeScrub?:(source:'input'|'list')=>string;
  timeScrubKeys?:string;
  timePreview?:(value:string)=>string;
  timeScrubCancelled?:string;
  sortableHandle?:(label:string)=>string;
  sortableMove?:(label:string,direction:-1|1)=>string;
  sortableKeys?:string;
  sortableInvalid?:string;
  sortableStatus?:(kind:'start'|'preview'|'commit'|'cancel'|'unchanged',label:string,position:number,count:number)=>string;
  monthCalendarKeys?:string;
  monthCalendarInvalid?:string;
  monthCalendarEmpty?:string;
  monthCalendarLoading?:string;
  monthCalendarReadonly?:string;
  monthCalendarToday?:string;
  monthCalendarMore?:(count:number)=>string;
  monthCalendarDetails?:string;
  monthCalendarCount?:(count:number)=>string;
}
export const koLocale:Readonly<SolLocale>=Object.freeze({
  monthCalendarKeys:'방향키: 하루·한 주 · Home/End: 주 경계 · PageUp/Down: 월 이동(Shift: 연도) · Enter/Space: 날짜 선택 · Escape: 선택일 초점 복귀',
  monthCalendarInvalid:'달력의 월·날짜·marker 설정을 확인해 주세요.',
  monthCalendarEmpty:'표시할 날짜별 자료가 없습니다.',
  monthCalendarLoading:'달력 자료를 불러오는 중입니다.',
  monthCalendarReadonly:'보기 전용입니다. 월과 날짜를 탐색할 수 있습니다.',
  monthCalendarToday:'오늘',
  monthCalendarMore:(count:number)=>'추가 '+num(count,'ko-KR')+'개',
  monthCalendarDetails:'날짜별 자료',
  monthCalendarCount:(count:number)=>'자료 '+num(count,'ko-KR')+'개',
  sortableHandle:(label:string)=>label+' 순서 조절',
  sortableMove:(label:string,direction:-1|1)=>label+(direction===-1?' 위로 이동':' 아래로 이동'),
  sortableKeys:'손잡이를 위아래로 드래그할 수 있습니다. 키보드는 Space/Enter로 시작·확정, 위/아래와 Home/End로 이동, Escape 또는 Tab으로 취소합니다. 위/아래 이동 버튼도 사용할 수 있습니다.',
  sortableInvalid:'현재 목록을 정렬할 수 없습니다.',
  sortableStatus:(kind:'start'|'preview'|'commit'|'cancel'|'unchanged',label:string,position:number,count:number)=>({start:'순서 조절 시작',preview:'이동 예정',commit:'순서 제안 완료',cancel:'순서 조절 취소',unchanged:'순서 유지'}[kind])+': '+label+(kind==='cancel'?'':' · '+num(position,'ko-KR')+' / '+num(count,'ko-KR')),
  timeScrub:(source:'input'|'list')=>source==='input'?'시간 드래그 조절':'목록 드래그 조절',
  timeScrubKeys:'조절 손잡이를 위아래로 드래그하세요. 키보드: 화살표 한 단계, Shift/Page 열 단계, Home/End 경계. 키를 놓으면 확정, Escape 취소. 목록 본문은 스크롤할 수 있습니다.',
  timePreview:(value:string)=>'미리보기 '+value,
  timeScrubCancelled:'시간 조절을 취소했습니다.',
  validationRequired:'필수 항목을 입력하거나 선택해 주세요.',validationInvalid:'입력값을 확인해 주세요.',validationMinLength:(minimum:number)=>`${minimum}자 이상 입력해 주세요.`,
  breadcrumb:'현재 위치',steps:'진행 단계',currentStep:'현재 단계',completeStep:'완료한 단계',chartInvalid:'유효한 0 이상의 값과 축 범위를 확인해 주세요.',chartCategory:'항목',chartValue:'값',toastAccent:'강조',fileRemove:'제거',fileType:(mime:string)=>({'text/plain':'텍스트','image/png':'PNG 이미지','image/jpeg':'JPEG 이미지','application/pdf':'PDF 문서'}[mime]||mime),
  filesChoose:'파일 선택',filesClear:'모두 제거',dropFiles:'파일을 여기에 놓거나 선택해 주세요.',filesRejected:'선택하지 못한 파일',fileRequired:'파일을 하나 이상 선택해 주세요.',unknownFileType:'MIME 정보 없음',noFileExtension:'확장자 없음',duplicateFile:'이미 선택한 파일입니다.',unsupportedFile:'허용하지 않는 파일 형식입니다.',
  filesHelp:(accept:string,max:number,size:string)=>`${accept||'모든 형식'} · 파일당 ${size} 이하 · 최대 ${num(max,'ko-KR')}개`,oversizedFile:(size:string)=>`파일당 ${size}를 초과했습니다.`,tooManyFiles:(max:number)=>`최대 ${num(max,'ko-KR')}개까지 선택할 수 있어요.`,
  selectedItems:'선택한 항목',loading:'목록을 불러오는 중이에요.',loadFailed:'목록을 불러오지 못했어요.',retry:'목록 다시 시도',noResults:'검색 결과가 없어요.',chooseAtLeastOne:'하나 이상 선택해 주세요.',unavailable:'선택 불가',moreActions:'더 많은 동작',contextKeys:'우클릭 또는 Shift+F10 · 모바일에서는 아래 동작 버튼',lower:'최솟값',upper:'최댓값',rangeKeys:'방향키: 한 간격 · Shift/Page: 10간격 · Home/End: 허용 경계 · 트랙을 눌러서도 조절할 수 있어요.',splitKeys:'방향키: 크기 조절 · Shift: 10간격 · Home/End: 최소/최대 · Enter: 최소/이전 크기',splitStacked:'좁은 화면에서는 위아래로 드래그하거나 위/아래 화살표로 두 영역의 높이를 조절합니다.',remove:(label:string)=>label+' 제거',selectionLimit:(max:number)=>'최대 '+num(max,'ko-KR')+'개까지 선택할 수 있어요.',selectionCount:(count:number,max?:number)=>num(count,'ko-KR')+'개 선택'+(max===undefined?'':' · 최대 '+num(max,'ko-KR')+'개'),
  details:'상세',record:'자료',fullText:'전체 내용',viewFullText:(text:string)=>text+' — 전체 내용 보기',selectRecord:(text:string)=>text+' 선택',selectPage:'현재 페이지 모두 선택',selectRecords:'자료 선택',sortField:'정렬 항목',chooseSort:'정렬할 항목 선택',ascending:'오름차순',descending:'내림차순',sortDirection:(direction:string)=>'정렬 방향 바꾸기, 현재 '+direction,tableLoading:'자료를 불러오는 중이에요.',tableRetry:'다시 시도',tableEmpty:'조건에 맞는 자료가 없어요.',previousPage:'이전 페이지',nextPage:'다음 페이지',pages:(caption:string)=>caption+' 페이지',pageLabel:(page:number,count:number)=>num(page,'ko-KR')+' 페이지, 전체 '+num(count,'ko-KR')+' 페이지',pageSummary:(page:number,count:number,selected:number)=>num(page,'ko-KR')+' / '+num(count,'ko-KR')+'페이지 · 전체 선택 '+num(selected,'ko-KR')+'개',
  progressFailed:'! 오류 · 작업을 확인해 주세요.',progressPending:'처리 중',progressUnknown:'처리 중',progressInvalid:'! 진행 정보를 확인해 주세요.',progressComplete:'✓ 완료',progressRunning:(percent:string)=>percent+' 진행',progressError:(percent:string)=>'! 오류 · 마지막 확인 '+percent,
  code:'ko-KR',firstDay:0,required:'필수',choose:'선택해 주세요',clear:'지우기',close:'닫기',done:'선택 완료',
  increase:'늘리기',decrease:'줄이기',invalidNumber:'유효한 숫자를 입력해 주세요.',numberRange:'허용 범위 안의 숫자를 입력해 주세요.',numberStep:'설정된 간격의 숫자를 입력해 주세요.',
  calendar:'달력 열기',singleDate:'날짜 선택',dateRange:'기간 선택',previousMonth:'이전 달',nextMonth:'다음 달',today:'오늘로 이동',
  chooseStart:'시작일을 선택하세요.',chooseEnd:'종료일을 선택하세요. 두 날짜를 고르면 반영합니다.',invalidDate:'YYYY-MM-DD 형식의 실제 날짜를 입력해 주세요.',invalidRange:'YYYY-MM-DD ~ YYYY-MM-DD 형식의 실제 날짜와 올바른 기간 순서를 입력해 주세요.',dateRequired:'날짜를 선택하거나 입력해 주세요.',
  calendarKeys:'방향키: 하루·한 주 · Home/End: 주 경계 · PageUp/Down: 월 이동(Shift: 연도) · Enter/Space: 선택 · Escape: 취소',selected:'선택일',start:'시작일',end:'종료일',
  time:'시각 선택',hour:'시',minute:'분',invalidTime:'허용 범위와 간격에 맞는 HH:mm 시각을 입력해 주세요.',timeRequired:'시각을 입력해 주세요.',
  toastInfo:'정보',toastSuccess:'완료',toastWarning:'확인',toastDanger:'오류',notification:'알림',count:(current:number,max?:number)=>max===undefined?num(current,'ko-KR'):`${num(current,'ko-KR')} / ${num(max,'ko-KR')}`,
  numberHelp:(min:number|undefined,max:number|undefined,step:number)=>[min===undefined?'':`최소 ${num(min,'ko-KR')}`,max===undefined?'':`최대 ${num(max,'ko-KR')}`,`${num(step,'ko-KR')} 간격`].filter(Boolean).join(' · '),
  timeHelp:(min:string,max:string,step:number)=>`HH:mm · ${min}–${max} · ${step}분 간격`
});
export const enLocale:Readonly<SolLocale>=Object.freeze({
  monthCalendarKeys:'Arrows: day/week; Home/End: week boundaries; PageUp/Down: month (Shift: year); Enter/Space: choose a date; Escape: focus the selected date.',
  monthCalendarInvalid:'Check the calendar month, date and marker configuration.',
  monthCalendarEmpty:'No date-specific data to show.',
  monthCalendarLoading:'Loading calendar data.',
  monthCalendarReadonly:'Read only. You can still browse months and dates.',
  monthCalendarToday:'Today',
  monthCalendarMore:(count:number)=>num(count,'en-US')+' more',
  monthCalendarDetails:'Date data',
  monthCalendarCount:(count:number)=>num(count,'en-US')+' markers',
  sortableHandle:(label:string)=>'Reorder '+label,
  sortableMove:(label:string,direction:-1|1)=>'Move '+label+(direction===-1?' up':' down'),
  sortableKeys:'Drag a handle up or down. With a keyboard, Space/Enter starts or confirms; Up/Down and Home/End propose a position; Escape or Tab cancels. You can also use the move up/down buttons.',
  sortableInvalid:'This list cannot be reordered right now.',
  sortableStatus:(kind:'start'|'preview'|'commit'|'cancel'|'unchanged',label:string,position:number,count:number)=>({start:'Reordering',preview:'Proposed position',commit:'Order proposed',cancel:'Reordering cancelled',unchanged:'Order unchanged'}[kind])+': '+label+(kind==='cancel'?'':' · '+num(position,'en-US')+' / '+num(count,'en-US')),
  timeScrub:(source:'input'|'list')=>source==='input'?'Adjust time by dragging':'Adjust time in list by dragging',
  timeScrubKeys:'Drag the adjustment handle up or down. Keyboard: arrows one step, Shift/Page ten steps, Home/End bounds. Release the key to commit; Escape cancels. The list body remains scrollable.',
  timePreview:(value:string)=>'Preview '+value,
  timeScrubCancelled:'Time adjustment cancelled.',
  validationRequired:'Enter or choose a required value.',validationInvalid:'Check this value.',validationMinLength:(minimum:number)=>`Use at least ${minimum} characters.`,
  breadcrumb:'Breadcrumb',steps:'Progress steps',currentStep:'Current step',completeStep:'Completed step',chartInvalid:'Check nonnegative finite values and the axis range.',chartCategory:'Category',chartValue:'Value',toastAccent:'Accent',fileRemove:'Remove',fileType:(mime:string)=>({'text/plain':'Plain text','image/png':'PNG image','image/jpeg':'JPEG image','application/pdf':'PDF document'}[mime]||mime),
  filesChoose:'Choose files',filesClear:'Remove all',dropFiles:'Drop files here or use the choose button.',filesRejected:'Files not selected',fileRequired:'Choose at least one file.',unknownFileType:'MIME type unavailable',noFileExtension:'No extension',duplicateFile:'This file is already selected.',unsupportedFile:'This file type is not allowed.',
  filesHelp:(accept:string,max:number,size:string)=>`${accept||'All formats'} · Up to ${size} per file · Up to ${num(max,'en-US')} files`,oversizedFile:(size:string)=>`Exceeds ${size} per file.`,tooManyFiles:(max:number)=>`Choose at most ${num(max,'en-US')} files.`,
  selectedItems:'selected options',loading:'Loading options.',loadFailed:'Could not load options.',retry:'Retry options',noResults:'No results.',chooseAtLeastOne:'Choose at least one option.',unavailable:'Unavailable',moreActions:'More actions',contextKeys:'Right-click or Shift+F10; use the action button on touch.',lower:'Lower value',upper:'Upper value',rangeKeys:'Arrows: one step; Shift/Page: ten steps; Home/End: bounds. You can also click the track.',splitKeys:'Arrows: resize; Shift: ten steps; Home/End: bounds; Enter: minimum/previous size.',splitStacked:'Narrow layout: drag up or down, or use the Up/Down arrows, to resize pane heights.',remove:(label:string)=>'Remove '+label,selectionLimit:(max:number)=>'Choose at most '+num(max,'en-US')+' options.',selectionCount:(count:number,max?:number)=>num(count,'en-US')+' selected'+(max===undefined?'':' · maximum '+max),
  details:'Details',record:'Record',fullText:'Full content',viewFullText:(text:string)=>'View full content: '+text,selectRecord:(text:string)=>'Select '+text,selectPage:'Select all on this page',selectRecords:'Select record',sortField:'Sort by',chooseSort:'Choose a sort field',ascending:'Ascending',descending:'Descending',sortDirection:(direction:string)=>'Change sort direction, currently '+direction,tableLoading:'Loading records.',tableRetry:'Retry',tableEmpty:'No matching records.',previousPage:'Previous page',nextPage:'Next page',pages:(caption:string)=>caption+' pages',pageLabel:(page:number,count:number)=>'Page '+num(page,'en-US')+' of '+num(count,'en-US'),pageSummary:(page:number,count:number,selected:number)=>'Page '+num(page,'en-US')+' of '+num(count,'en-US')+' · '+num(selected,'en-US')+' selected',
  progressFailed:'! Error · check the task.',progressPending:'Working',progressUnknown:'Working',progressInvalid:'! Check the progress information.',progressComplete:'✓ Complete',progressRunning:(percent:string)=>percent+' complete',progressError:(percent:string)=>'! Error · last confirmed '+percent,
  code:'en-US',firstDay:0,required:'required',choose:'Choose',clear:'Clear',close:'Close',done:'Done',increase:'Increase',decrease:'Decrease',
  invalidNumber:'Enter a valid number.',numberRange:'Enter a number within the allowed range.',numberStep:'Use the configured step.',
  calendar:'Open calendar',singleDate:'Choose a date',dateRange:'Choose a range',previousMonth:'Previous month',nextMonth:'Next month',today:'Go to today',
  chooseStart:'Choose the start date.',chooseEnd:'Choose the end date. Both dates are required to commit.',invalidDate:'Enter a real date as YYYY-MM-DD.',invalidRange:'Enter an ordered range as YYYY-MM-DD ~ YYYY-MM-DD.',dateRequired:'Choose or enter a date.',
  calendarKeys:'Arrows: day/week · Home/End: week boundaries · PageUp/Down: month (Shift: year) · Enter/Space: choose · Escape: cancel',selected:'Selected date',start:'Start',end:'End',
  time:'Choose time',hour:'Hour',minute:'Minute',invalidTime:'Enter HH:mm within the allowed range and step.',timeRequired:'Enter a time.',toastInfo:'Information',toastSuccess:'Complete',toastWarning:'Check',toastDanger:'Error',notification:'Notification',
  count:(current:number,max?:number)=>max===undefined?num(current,'en-US'):`${num(current,'en-US')} / ${num(max,'en-US')}`,
  numberHelp:(min:number|undefined,max:number|undefined,step:number)=>[min===undefined?'':`Min ${num(min,'en-US')}`,max===undefined?'':`Max ${num(max,'en-US')}`,`Step ${num(step,'en-US')}`].filter(Boolean).join(' · '),
  timeHelp:(min:string,max:string,step:number)=>`HH:mm · ${min}–${max} · ${step} min step`
});
export const SolLocaleKey:InjectionKey<SolLocaleSource>=Symbol('SolLocale');

/** Keep a visible number as a complete token when a locale override replaces its label. */
export function withVisibleNumberLabel(label: string, visible: string): string {
  const escaped = visible.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const token = new RegExp(`(?:^|[^\\p{L}\\p{N}])${escaped}(?=$|[^\\p{L}\\p{N}])`, 'u')
  return token.test(label) ? label : label ? `${visible}, ${label}` : visible
}

const supported=(code:unknown):SolLocaleCode|undefined=>typeof code==='string'&&['ko','ko-kr','en','en-us'].includes(code.toLowerCase())?({'ko':'ko-KR','ko-kr':'ko-KR','en':'en-US','en-us':'en-US'} as Record<string,SolLocaleCode>)[code.toLowerCase()]:undefined;
export function resolveSolLocale(source:Partial<SolLocale>|string={},overrides:Partial<SolLocale>={}):SolLocale {
 const app=typeof source==='string'?{code:source}:source||{},appCode=supported(app.code)||'ko-KR',code=supported(overrides.code)||appCode,base=code==='en-US'?enLocale:koLocale;
 const valid=(value:Partial<SolLocale>)=>Object.fromEntries(Object.entries(value).filter(([key,v])=>Object.hasOwn(base,key)&&typeof v===typeof base[key as keyof SolLocale]&&key!=='code'&&(key!=='firstDay'||Number.isInteger(v)&&Number(v)>=0&&Number(v)<=6)));
  const resolved = { ...base, ...(code === appCode ? valid(app) : {}), ...valid(overrides), code }
  const pageLabel = resolved.pageLabel
  return {
    ...resolved,
    pageLabel: (page, count) => withVisibleNumberLabel(pageLabel(page, count), num(page, code)),
  }
}
export function provideSolLocale(app:App,locale:SolLocaleSource={}){app.provide(SolLocaleKey,locale);}
export function useSolLocale(overrides:()=>Partial<SolLocale>|undefined=()=>undefined){const provided=inject(SolLocaleKey,{});return computed<SolLocale>(()=>resolveSolLocale(toValue(provided),overrides()));}
function num(value:number,code:string){return new Intl.NumberFormat(code,{maximumSignificantDigits:21}).format(value);}
export function formatSolNumber(value:number,locale:Partial<SolLocale>|string='ko-KR',options:Intl.NumberFormatOptions={}){return new Intl.NumberFormat(resolveSolLocale(locale).code,{maximumSignificantDigits:21,...options}).format(value);}
// Supported packs share comma grouping and a dot decimal; malformed grouping is rejected.
export function parseSolNumber(text:string,locale:Partial<SolLocale>|string='ko-KR'):number|null {resolveSolLocale(locale);const value=text.trim();if(!/^[+-]?(?:(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d*)?|\.\d+)$/.test(value))return null;const number=Number(value.replaceAll(',',''));return Number.isFinite(number)?number:null;}
export function formatSolDate(value:string,locale:Partial<SolLocale>|string='ko-KR',options:Intl.DateTimeFormatOptions={}){const parts=parseDateOnly(value);if(!parts)return '';const date=new Date(0);date.setUTCHours(0,0,0,0);date.setUTCFullYear(parts.y,parts.m-1,parts.d);return new Intl.DateTimeFormat(resolveSolLocale(locale).code,{year:'numeric',month:'short',day:'numeric',...options,calendar:'gregory',timeZone:'UTC'}).format(date);}
