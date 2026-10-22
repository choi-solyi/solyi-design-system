import {computed, inject, toValue} from 'vue';
import type {App, InjectionKey, MaybeRefOrGetter} from 'vue';
import {parseDateOnly} from '@solyi/core/date';

export type SolLocaleCode='ko-KR'|'en-US';
export type SolLocaleSource=MaybeRefOrGetter<Partial<SolLocale>|string>;
export interface SolLocale {
  progressPending:string;progressUnknown:string;progressInvalid:string;progressComplete:string;progressRunning:(percent:string)=>string;progressError:(percent:string)=>string;
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
  notification:string; count:(current:number,max?:number)=>string;
  numberHelp:(min:number|undefined,max:number|undefined,step:number)=>string;
  timeHelp:(min:string,max:string,step:number)=>string;
}
export const koLocale:Readonly<SolLocale>=Object.freeze({
  selectedItems:'선택한 항목',loading:'목록을 불러오는 중이에요.',loadFailed:'목록을 불러오지 못했어요.',retry:'목록 다시 시도',noResults:'검색 결과가 없어요.',chooseAtLeastOne:'하나 이상 선택해 주세요.',unavailable:'선택 불가',moreActions:'더 많은 동작',contextKeys:'우클릭 또는 Shift+F10 · 모바일에서는 아래 동작 버튼',lower:'최솟값',upper:'최댓값',rangeKeys:'방향키: 한 간격 · Shift/Page: 10간격 · Home/End: 허용 경계 · 트랙을 눌러서도 조절할 수 있어요.',splitKeys:'방향키: 크기 조절 · Shift: 10간격 · Home/End: 최소/최대 · Enter: 최소/이전 크기',splitStacked:'좁은 화면에서는 두 영역을 세로 순서로 표시합니다. 크기 설정은 유지됩니다.',remove:(label:string)=>label+' 제거',selectionLimit:(max:number)=>'최대 '+num(max,'ko-KR')+'개까지 선택할 수 있어요.',selectionCount:(count:number,max?:number)=>num(count,'ko-KR')+'개 선택'+(max===undefined?'':' · 최대 '+num(max,'ko-KR')+'개'),
  details:'상세',record:'자료',fullText:'전체 내용',viewFullText:(text:string)=>text+' — 전체 내용 보기',selectRecord:(text:string)=>text+' 선택',selectPage:'현재 페이지 모두 선택',selectRecords:'자료 선택',sortField:'정렬 항목',chooseSort:'정렬할 항목 선택',ascending:'오름차순',descending:'내림차순',sortDirection:(direction:string)=>'정렬 방향 바꾸기, 현재 '+direction,tableLoading:'자료를 불러오는 중이에요.',tableRetry:'다시 시도',tableEmpty:'조건에 맞는 자료가 없어요.',previousPage:'이전 페이지',nextPage:'다음 페이지',pages:(caption:string)=>caption+' 페이지',pageLabel:(page:number,count:number)=>num(page,'ko-KR')+'페이지, 전체 '+num(count,'ko-KR')+'페이지',pageSummary:(page:number,count:number,selected:number)=>num(page,'ko-KR')+' / '+num(count,'ko-KR')+'페이지 · 전체 선택 '+num(selected,'ko-KR')+'개',
  progressPending:'처리 중',progressUnknown:'처리 중 · 진행률을 아직 알 수 없어요.',progressInvalid:'! 진행 정보를 확인해 주세요.',progressComplete:'✓ 완료',progressRunning:(percent:string)=>percent+' 진행',progressError:(percent:string)=>'! 오류 · 마지막 확인 '+percent,
  code:'ko-KR',firstDay:0,required:'필수',choose:'선택해 주세요',clear:'지우기',close:'닫기',done:'선택 완료',
  increase:'늘리기',decrease:'줄이기',invalidNumber:'유효한 숫자를 입력해 주세요.',numberRange:'허용 범위 안의 숫자를 입력해 주세요.',numberStep:'설정된 간격의 숫자를 입력해 주세요.',
  calendar:'달력 열기',singleDate:'날짜 선택',dateRange:'기간 선택',previousMonth:'이전 달',nextMonth:'다음 달',today:'오늘로 이동',
  chooseStart:'시작일을 선택하세요.',chooseEnd:'종료일을 선택하세요. 두 날짜를 고르면 반영합니다.',invalidDate:'YYYY-MM-DD 형식의 실제 날짜를 입력해 주세요.',invalidRange:'YYYY-MM-DD ~ YYYY-MM-DD 형식의 실제 날짜와 올바른 기간 순서를 입력해 주세요.',dateRequired:'날짜를 선택하거나 입력해 주세요.',
  calendarKeys:'방향키: 하루·한 주 · Home/End: 주 경계 · PageUp/Down: 월 이동(Shift: 연도) · Enter/Space: 선택 · Escape: 취소',selected:'선택일',start:'시작일',end:'종료일',
  time:'시각 선택',hour:'시',minute:'분',invalidTime:'허용 범위와 간격에 맞는 HH:mm 시각을 입력해 주세요.',timeRequired:'시각을 입력해 주세요.',
  notification:'알림',count:(current:number,max?:number)=>max===undefined?num(current,'ko-KR'):`${num(current,'ko-KR')} / ${num(max,'ko-KR')}`,
  numberHelp:(min:number|undefined,max:number|undefined,step:number)=>[min===undefined?'':`최소 ${num(min,'ko-KR')}`,max===undefined?'':`최대 ${num(max,'ko-KR')}`,`${num(step,'ko-KR')} 간격`].filter(Boolean).join(' · '),
  timeHelp:(min:string,max:string,step:number)=>`HH:mm · ${min}–${max} · ${step}분 간격`
});
export const enLocale:Readonly<SolLocale>=Object.freeze({
  selectedItems:'selected options',loading:'Loading options.',loadFailed:'Could not load options.',retry:'Retry options',noResults:'No results.',chooseAtLeastOne:'Choose at least one option.',unavailable:'Unavailable',moreActions:'More actions',contextKeys:'Right-click or Shift+F10; use the action button on touch.',lower:'Lower value',upper:'Upper value',rangeKeys:'Arrows: one step; Shift/Page: ten steps; Home/End: bounds. You can also click the track.',splitKeys:'Arrows: resize; Shift: ten steps; Home/End: bounds; Enter: minimum/previous size.',splitStacked:'Narrow layout: both panes are stacked. Your size setting is retained.',remove:(label:string)=>'Remove '+label,selectionLimit:(max:number)=>'Choose at most '+num(max,'en-US')+' options.',selectionCount:(count:number,max?:number)=>num(count,'en-US')+' selected'+(max===undefined?'':' · maximum '+max),
  details:'Details',record:'Record',fullText:'Full content',viewFullText:(text:string)=>'View full content: '+text,selectRecord:(text:string)=>'Select '+text,selectPage:'Select all on this page',selectRecords:'Select record',sortField:'Sort by',chooseSort:'Choose a sort field',ascending:'Ascending',descending:'Descending',sortDirection:(direction:string)=>'Change sort direction, currently '+direction,tableLoading:'Loading records.',tableRetry:'Retry',tableEmpty:'No matching records.',previousPage:'Previous page',nextPage:'Next page',pages:(caption:string)=>caption+' pages',pageLabel:(page:number,count:number)=>'Page '+num(page,'en-US')+' of '+num(count,'en-US'),pageSummary:(page:number,count:number,selected:number)=>'Page '+num(page,'en-US')+' of '+num(count,'en-US')+' · '+num(selected,'en-US')+' selected',
  progressPending:'Working',progressUnknown:'Working · progress is unknown.',progressInvalid:'! Check the progress information.',progressComplete:'✓ Complete',progressRunning:(percent:string)=>percent+' complete',progressError:(percent:string)=>'! Error · last confirmed '+percent,
  code:'en-US',firstDay:0,required:'required',choose:'Choose',clear:'Clear',close:'Close',done:'Done',increase:'Increase',decrease:'Decrease',
  invalidNumber:'Enter a valid number.',numberRange:'Enter a number within the allowed range.',numberStep:'Use the configured step.',
  calendar:'Open calendar',singleDate:'Choose a date',dateRange:'Choose a range',previousMonth:'Previous month',nextMonth:'Next month',today:'Go to today',
  chooseStart:'Choose the start date.',chooseEnd:'Choose the end date. Both dates are required to commit.',invalidDate:'Enter a real date as YYYY-MM-DD.',invalidRange:'Enter an ordered range as YYYY-MM-DD ~ YYYY-MM-DD.',dateRequired:'Choose or enter a date.',
  calendarKeys:'Arrows: day/week · Home/End: week boundaries · PageUp/Down: month (Shift: year) · Enter/Space: choose · Escape: cancel',selected:'Selected date',start:'Start',end:'End',
  time:'Choose time',hour:'Hour',minute:'Minute',invalidTime:'Enter HH:mm within the allowed range and step.',timeRequired:'Enter a time.',notification:'Notification',
  count:(current:number,max?:number)=>max===undefined?num(current,'en-US'):`${num(current,'en-US')} / ${num(max,'en-US')}`,
  numberHelp:(min:number|undefined,max:number|undefined,step:number)=>[min===undefined?'':`Min ${num(min,'en-US')}`,max===undefined?'':`Max ${num(max,'en-US')}`,`Step ${num(step,'en-US')}`].filter(Boolean).join(' · '),
  timeHelp:(min:string,max:string,step:number)=>`HH:mm · ${min}–${max} · ${step} min step`
});
export const SolLocaleKey:InjectionKey<SolLocaleSource>=Symbol('SolLocale');
const supported=(code:unknown):SolLocaleCode|undefined=>typeof code==='string'&&['ko','ko-kr','en','en-us'].includes(code.toLowerCase())?({'ko':'ko-KR','ko-kr':'ko-KR','en':'en-US','en-us':'en-US'} as Record<string,SolLocaleCode>)[code.toLowerCase()]:undefined;
export function resolveSolLocale(source:Partial<SolLocale>|string={},overrides:Partial<SolLocale>={}):SolLocale {
 const app=typeof source==='string'?{code:source}:source||{},appCode=supported(app.code)||'ko-KR',code=supported(overrides.code)||appCode,base=code==='en-US'?enLocale:koLocale;
 const valid=(value:Partial<SolLocale>)=>Object.fromEntries(Object.entries(value).filter(([key,v])=>Object.hasOwn(base,key)&&typeof v===typeof base[key as keyof SolLocale]&&key!=='code'&&(key!=='firstDay'||Number.isInteger(v)&&Number(v)>=0&&Number(v)<=6)));
 return {...base,...(code===appCode?valid(app):{}),...valid(overrides),code};
}
export function provideSolLocale(app:App,locale:SolLocaleSource={}){app.provide(SolLocaleKey,locale);}
export function useSolLocale(overrides:()=>Partial<SolLocale>|undefined=()=>undefined){const provided=inject(SolLocaleKey,{});return computed<SolLocale>(()=>resolveSolLocale(toValue(provided),overrides()));}
function num(value:number,code:string){return new Intl.NumberFormat(code,{maximumSignificantDigits:21}).format(value);}
export function formatSolNumber(value:number,locale:Partial<SolLocale>|string='ko-KR',options:Intl.NumberFormatOptions={}){return new Intl.NumberFormat(resolveSolLocale(locale).code,{maximumSignificantDigits:21,...options}).format(value);}
// Supported packs share comma grouping and a dot decimal; malformed grouping is rejected.
export function parseSolNumber(text:string,locale:Partial<SolLocale>|string='ko-KR'):number|null {resolveSolLocale(locale);const value=text.trim();if(!/^[+-]?(?:(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d*)?|\.\d+)$/.test(value))return null;const number=Number(value.replaceAll(',',''));return Number.isFinite(number)?number:null;}
export function formatSolDate(value:string,locale:Partial<SolLocale>|string='ko-KR',options:Intl.DateTimeFormatOptions={}){const parts=parseDateOnly(value);if(!parts)return '';const date=new Date(0);date.setUTCHours(0,0,0,0);date.setUTCFullYear(parts.y,parts.m-1,parts.d);return new Intl.DateTimeFormat(resolveSolLocale(locale).code,{year:'numeric',month:'short',day:'numeric',...options,calendar:'gregory',timeZone:'UTC'}).format(date);}
