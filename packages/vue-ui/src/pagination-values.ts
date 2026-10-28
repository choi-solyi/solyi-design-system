export function paginationCount(value:number){return Number.isFinite(value)?Math.min(Number.MAX_SAFE_INTEGER,Math.max(0,Math.trunc(value))):0}
export function paginationPage(value:number,count:number){return count?Math.max(1,Math.min(count,Number.isFinite(value)?Math.trunc(value):1)):0}
export function paginationRange(page:number,count:number,siblings=1){
 count=paginationCount(count);page=paginationPage(page,count)
 if(!count)return []
 const radius=Number.isFinite(siblings)?Math.max(0,Math.min(5,Math.trunc(siblings))):1,values=new Set([1,count])
 for(let index=Math.max(1,page-radius);index<=Math.min(count,page+radius);index++)values.add(index)
 return [...values].sort((a,b)=>a-b)
}
