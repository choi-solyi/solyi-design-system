/** Group the integer part without converting an unfinished decimal to a number. */
export function groupNumberDraft(value: string, regroup = false): string {
  if (!/^[+-]?[\d,]+(?:\.\d*)?$/.test(value) || (!regroup && !/^[+-]?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d*)?$/.test(value))) return value
  return value.replace(/^[^.]+/, integer => integer.replaceAll(',', '').replace(/\B(?=(\d{3})+(?!\d))/g, ','))
}

export function groupNumberInput(input: HTMLInputElement, regroup = false): string {
  const value = groupNumberDraft(input.value, regroup)
  if (value === input.value) return value
  const start = input.selectionStart ?? input.value.length, end = input.selectionEnd ?? start
  const positions = [start, end].map(position => input.value.slice(0, position).replaceAll(',', '').length)
  const direction = input.selectionDirection
  input.value = value
  const caret = (count: number) => {
    let index = 0
    while (index < value.length && count > 0) if (value[index++] !== ',') count--
    return index
  }
  input.setSelectionRange(caret(positions[0]), caret(positions[1]), direction ?? undefined)
  return value
}
