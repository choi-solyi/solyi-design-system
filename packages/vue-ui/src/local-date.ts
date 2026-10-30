/** Local wall date for calendar/timeline defaults; never UTC-convert a consumer date. */
export function localDateKey(date = new Date()): string {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    .map((value, index) => String(value).padStart(index ? 2 : 4, '0'))
    .join('-')
}
