import { parseTimeOnly } from '@solyi/core/date'

/** Shared ISO wall-minute display; ko/en use the same clock digits. Supports the grid's 24:00 boundary. */
export function formatTimeMinute(minutes: number): string {
  return String(Math.floor(minutes / 60)).padStart(2, '0') + ':' + String(minutes % 60).padStart(2, '0')
}

/** Finite same-day clock grid, aligned to min rather than midnight. */
export function timeChoices(min: string, max: string, step: number): readonly string[] {
  const start = parseTimeOnly(min)?.minutes, end = parseTimeOnly(max)?.minutes
  if (start === undefined || end === undefined || start > end || !Number.isInteger(step) || step <= 0) return []
  return Array.from({ length: Math.floor((end - start) / step) + 1 }, (_, index) => {
    return formatTimeMinute(start + index * step)
  })
}

/** Only positions the list. Ties choose the later entry and never write a model. */
export function nearestTime(choices: readonly string[], minutes: number): string | undefined {
  if (!Number.isFinite(minutes)) return choices[0]
  let best: string | undefined, distance = Infinity
  for (const choice of choices) {
    const current = Math.abs(parseTimeOnly(choice)!.minutes - minutes)
    if (current <= distance) { best = choice; distance = current }
  }
  return best
}
