export interface DateParts {y:number;m:number;d:number}
export declare const dateISO:(value:DateParts)=>string;
export declare const monthDays:(year:number,month:number)=>number;
export declare function parseDateOnly(value:unknown):DateParts|null;
export declare const weekday:(value:DateParts)=>number;
export declare function shiftDay(value:DateParts,delta:number):DateParts;
export declare function shiftMonth(value:DateParts,delta:number):DateParts;
export declare function parseTimeOnly(value:unknown):{value:string;minutes:number}|null;
