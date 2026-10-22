import {computed, inject} from 'vue';
import type {App, InjectionKey} from 'vue';

export interface SolLocale {
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
