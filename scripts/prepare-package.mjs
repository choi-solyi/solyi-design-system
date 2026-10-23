import { readFile, writeFile } from 'node:fs/promises'
import { packageRoles } from './package-identity.mjs'

const role = process.argv[2]
if (process.argv.length !== 3 || !packageRoles.includes(role)) {
  throw new Error('Expected one package role: core or vue-ui')
}

const root = new URL('../', import.meta.url)
const source = await readFile(new URL('DESIGN.md', root))
const target = new URL(`packages/${role}/DESIGN.md`, root)
const previous = await readFile(target).catch(error => {
  if (error.code === 'ENOENT') return null
  throw error
})

// Keep the canonical guide byte-for-byte, without rebuilding or changing metadata.
if (!previous?.equals(source)) await writeFile(target, source)
