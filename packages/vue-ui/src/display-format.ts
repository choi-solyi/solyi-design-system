import { warn } from 'vue'
import type { SolLocale } from './locale'

/** Display callbacks never become parsers or replace the canonical field draft. */
export function formatFieldDisplay<T>(
  value: T,
  fallback: string,
  formatter: ((value: T, locale: Readonly<SolLocale>) => string) | undefined,
  locale: SolLocale,
): string {
  if (!formatter) return fallback
  try {
    const formatted = formatter(value, locale)
    if (typeof formatted === 'string' && formatted.trim()) return formatted
    warn('A field display formatter must return a nonempty string; using the canonical display.')
  } catch {
    warn('A field display formatter failed; using the canonical display.')
  }
  return fallback
}
