type DecimalNumber = {
  coefficient: bigint
  exponent: number
}

function decimalNumber(value: number): DecimalNumber {
  const [mantissa, exponent = '0'] = String(value).split('e')
  const fraction = mantissa.split('.')[1] || ''
  return {
    coefficient: BigInt(mantissa.replace('.', '')),
    exponent: Number(exponent) - fraction.length,
  }
}

function coefficientAt(value: DecimalNumber, exponent: number): bigint {
  return value.coefficient * 10n ** BigInt(value.exponent - exponent)
}

/** Add decimal steps only when the sum has a finite, distinct Number representation. */
export function addNumberStep(value: number, step: number): number | null {
  if (!Number.isFinite(value) || !Number.isFinite(step)) return null
  const current = decimalNumber(value)
  const increment = decimalNumber(step)
  const exponent = Math.min(current.exponent, increment.exponent)
  const coefficient = coefficientAt(current, exponent) + coefficientAt(increment, exponent)
  const next = Number(`${coefficient}e${exponent}`)
  if (!Number.isFinite(next) || next === value) return null
  const represented = decimalNumber(next)
  const resultExponent = Math.min(exponent, represented.exponent)
  const exact = coefficientAt({ coefficient, exponent }, resultExponent)
  return exact === coefficientAt(represented, resultExponent) ? next : null
}

/** Keep the existing 1e-7 step tolerance without subtracting nearby floating-point values. */
export function isNumberStepAligned(value: number, origin: number, step: number): boolean {
  if (![value, origin, step].every(Number.isFinite) || step <= 0) return false
  const current = decimalNumber(value)
  const start = decimalNumber(origin)
  const increment = decimalNumber(step)
  const exponent = Math.min(current.exponent, start.exponent, increment.exponent)
  const distance = coefficientAt(current, exponent) - coefficientAt(start, exponent)
  const interval = coefficientAt(increment, exponent)
  const remainder = distance % interval
  const absolute = remainder < 0n ? -remainder : remainder
  const closest = absolute < interval - absolute ? absolute : interval - absolute
  return closest * 10_000_000n <= interval
}
