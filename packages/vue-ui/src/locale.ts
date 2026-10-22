import {computed, inject} from 'vue';
import type {App, InjectionKey} from 'vue';

export interface SolLocale {
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
  selectedItems:'선택한 항목',loading:'목록을 불러오는 중이에요.',loadFailed:'목록을 불러오지 못했어요.',retry:'목록 다시 시도',noResults:'검색 결과가 없어요.',chooseAtLeastOne:'하나 이상 선택해 주세요.',unavailable:'선택 불가',moreActions:'더 많은 동작',contextKeys:'우클릭 또는 Shift+F10 · 모바일에서는 아래 동작 버튼',lower:'최솟값',upper:'최댓값',rangeKeys:'방향키: 한 간격 · Shift/Page: 10간격 · Home/End: 허용 경계 · 트랙을 눌러서도 조절할 수 있어요.',splitKeys:'방향키: 크기 조절 · Shift: 10간격 · Home/End: 최소/최대 · Enter: 최소/이전 크기',splitStacked:'좁은 화면에서는 두 영역을 세로 순서로 표시합니다. 크기 설정은 유지됩니다.',remove:(label:string)=>label+' 제거',selectionLimit:(max:number)=>'최대 '+max+'개까지 선택할 수 있어요.',selectionCount:(count:number,max?:number)=>count+'개 선택'+(max===undefined?'':' · 최대 '+max+'개'),
  code:'ko-KR',firstDay:0,required:'필수',choose:'선택해 주세요',clear:'지우기',close:'닫기',done:'선택 완료',
  increase:'늘리기',decrease:'줄이기',invalidNumber:'유효한 숫자를 입력해 주세요.',numberRange:'허용 범위 안의 숫자를 입력해 주세요.',numberStep:'설정된 간격의 숫자를 입력해 주세요.',
  calendar:'달력 열기',singleDate:'날짜 선택',dateRange:'기간 선택',previousMonth:'이전 달',nextMonth:'다음 달',today:'오늘로 이동',
  chooseStart:'시작일을 선택하세요.',chooseEnd:'종료일을 선택하세요. 두 날짜를 고르면 반영합니다.',invalidDate:'YYYY-MM-DD 형식의 실제 날짜를 입력해 주세요.',invalidRange:'YYYY-MM-DD ~ YYYY-MM-DD 형식의 실제 날짜와 올바른 기간 순서를 입력해 주세요.',dateRequired:'날짜를 선택하거나 입력해 주세요.',
  calendarKeys:'방향키: 하루·한 주 · Home/End: 주 경계 · PageUp/Down: 월 이동(Shift: 연도) · Enter/Space: 선택 · Escape: 취소',selected:'선택일',start:'시작일',end:'종료일',
  time:'시각 선택',hour:'시',minute:'분',invalidTime:'허용 범위와 간격에 맞는 HH:mm 시각을 입력해 주세요.',timeRequired:'시각을 입력해 주세요.',
  notification:'알림',count:(current:number,max?:number)=>max===undefined?String(current):`${current} / ${max}`,
  numberHelp:(min:number|undefined,max:number|undefined,step:number)=>[min===undefined?'':`최소 ${min}`,max===undefined?'':`최대 ${max}`,`${step} 간격`].filter(Boolean).join(' · '),
  timeHelp:(min:string,max:string,step:number)=>`HH:mm · ${min}–${max} · ${step}분 간격`
});
export const enLocale:Readonly<SolLocale>=Object.freeze({
  selectedItems:'selected options',loading:'Loading options.',loadFailed:'Could not load options.',retry:'Retry options',noResults:'No results.',chooseAtLeastOne:'Choose at least one option.',unavailable:'Unavailable',moreActions:'More actions',contextKeys:'Right-click or Shift+F10; use the action button on touch.',lower:'Lower value',upper:'Upper value',rangeKeys:'Arrows: one step; Shift/Page: ten steps; Home/End: bounds. You can also click the track.',splitKeys:'Arrows: resize; Shift: ten steps; Home/End: bounds; Enter: minimum/previous size.',splitStacked:'Narrow layout: both panes are stacked. Your size setting is retained.',remove:(label:string)=>'Remove '+label,selectionLimit:(max:number)=>'Choose at most '+max+' options.',selectionCount:(count:number,max?:number)=>count+' selected'+(max===undefined?'':' · maximum '+max),
  code:'en-US',firstDay:0,required:'required',choose:'Choose',clear:'Clear',close:'Close',done:'Done',increase:'Increase',decrease:'Decrease',
  invalidNumber:'Enter a valid number.',numberRange:'Enter a number within the allowed range.',numberStep:'Use the configured step.',
  calendar:'Open calendar',singleDate:'Choose a date',dateRange:'Choose a range',previousMonth:'Previous month',nextMonth:'Next month',today:'Go to today',
  chooseStart:'Choose the start date.',chooseEnd:'Choose the end date. Both dates are required to commit.',invalidDate:'Enter a real date as YYYY-MM-DD.',invalidRange:'Enter an ordered range as YYYY-MM-DD ~ YYYY-MM-DD.',dateRequired:'Choose or enter a date.',
  calendarKeys:'Arrows: day/week · Home/End: week boundaries · PageUp/Down: month (Shift: year) · Enter/Space: choose · Escape: cancel',selected:'Selected date',start:'Start',end:'End',
  time:'Choose time',hour:'Hour',minute:'Minute',invalidTime:'Enter HH:mm within the allowed range and step.',timeRequired:'Enter a time.',notification:'Notification',
  count:(current:number,max?:number)=>max===undefined?String(current):`${current} / ${max}`,
  numberHelp:(min:number|undefined,max:number|undefined,step:number)=>[min===undefined?'':`Min ${min}`,max===undefined?'':`Max ${max}`,`Step ${step}`].filter(Boolean).join(' · '),
  timeHelp:(min:string,max:string,step:number)=>`HH:mm · ${min}–${max} · ${step} min step`
});
export const SolLocaleKey:InjectionKey<Partial<SolLocale>>=Symbol('SolLocale');
export function provideSolLocale(app:App,locale:Partial<SolLocale>={}){app.provide(SolLocaleKey,locale);}
export function useSolLocale(overrides:()=>Partial<SolLocale>|undefined){const provided=inject(SolLocaleKey,{});const defined=(value:Partial<SolLocale>)=>Object.fromEntries(Object.entries(value).filter(([,v])=>v!==undefined));return computed<SolLocale>(()=>({...koLocale,...defined(provided),...defined(overrides()||{})}));}
