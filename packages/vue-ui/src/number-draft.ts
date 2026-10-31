/** Group the integer part without converting an unfinished decimal to a number. */
export function groupNumberDraft(value: string): string {
  if (!/^[+-]?\d[\d,]*(?:\.\d*)?$/.test(value) || value.includes(',,')) return value
  return value.replace(/^[^.]+/, integer => integer.replaceAll(',', '').replace(/\B(?=(\d{3})+(?!\d))/g, ','))
}

export function groupNumberInput(input: HTMLInputElement): string {
  const start = input.selectionStart ?? input.value.length, end = input.selectionEnd ?? start
  const positions = [start, end].map(position => input.value.slice(0, position).replaceAll(',', '').length)
  const value = groupNumberDraft(input.value)
  input.value = value
  const caret = (count: number) => {
    let index = 0
    while (index < value.length && count > 0) if (value[index++] !== ',') count--
    return index
  }
  input.setSelectionRange(caret(positions[0]), caret(positions[1]), input.selectionDirection ?? undefined)
  return value
}
