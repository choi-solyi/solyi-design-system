import { readFileSync } from 'node:fs'

const source = JSON.parse(
  readFileSync(new URL('../site/fonts/wanted-sans/SOURCE.json', import.meta.url), 'utf8'),
)

// Both the unmodified complete original and the official split distribution ship locally.
export const wantedSansSiteFiles = [
  'SOURCE.json',
  'SPLIT-VALIDATION.json',
  'README.md',
  source.originalSource.local,
  source.delivery.stylesheet,
  ...source.files.map((file) => file.local),
].map((file) => 'fonts/wanted-sans/' + file)

export const wantedSansStarterFiles = source.files
  .filter((file) => /\/WantedSansVariable\.split\.\d+\.woff2$/.test(file.local))
  .map((file) => file.local.split('/').at(-1))
