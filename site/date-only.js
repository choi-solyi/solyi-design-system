/* Pure date/time arithmetic shared by reference demos and Vue. No DOM or timezone conversion of stored values. */
const pad=n=>String(n).padStart(2,'0');
export const dateISO=({y,m,d})=>`${String(y).padStart(4,'0')}-${pad(m)}-${pad(d)}`;
export const monthDays=(y,m)=>[31,(y%4===0&&(y%100!==0||y%400===0))?29:28,31,30,31,30,31,31,30,31,30,31][m-1];
export function parseDateOnly(value){if(typeof value!=='string')return null;const match=/^(\d{4})-(\d{2})-(\d{2})$/.exec(value);if(!match)return null;const [y,m,d]=match.slice(1).map(Number);return y>=1&&y<=9999&&m>=1&&m<=12&&d>=1&&d<=monthDays(y,m)?{y,m,d}:null;}
const utcDate=value=>{const date=new Date(0);date.setUTCHours(0,0,0,0);date.setUTCFullYear(value.y,value.m-1,value.d);return date;};
export const weekday=value=>utcDate(value).getUTCDay();
export function shiftDay(value,delta){const date=utcDate(value);date.setUTCDate(date.getUTCDate()+delta);const y=date.getUTCFullYear();return y<1?{y:1,m:1,d:1}:y>9999?{y:9999,m:12,d:31}:{y,m:date.getUTCMonth()+1,d:date.getUTCDate()};}
export function shiftMonth(value,delta){const index=Math.max(12,Math.min(9999*12+11,value.y*12+value.m-1+delta));const y=Math.floor(index/12),m=index%12+1;return {y,m,d:Math.min(value.d,monthDays(y,m))};}

export function parseTimeOnly(raw){const m=String(raw).trim().match(/^(?:(\d{1,2}):(\d{2})|(\d{2})(\d{2}))$/);if(!m)return null;const h=Number(m[1]??m[3]),n=Number(m[2]??m[4]);if(h>23||n>59)return null;return{value:String(h).padStart(2,'0')+':'+String(n).padStart(2,'0'),minutes:h*60+n};}
