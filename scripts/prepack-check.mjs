import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { packageRoles } from './package-identity.mjs'

const root = new URL('../', import.meta.url)
const canonical = await readFile(new URL('DESIGN.md', root))
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
for (const role of packageRoles) {
  const directory = new URL(`packages/${role}/`, root)
  const before = await readFile(new URL('package.json', directory))
  const [pack] = JSON.parse(
    execFileSync(npm, ['pack', '--dry-run', '--json'], {
      cwd: fileURLToPath(directory),
      encoding: 'utf8',
      shell: process.platform === 'win32',
    }),
  )
  assert.ok(
    pack.files.some(file => file.path === 'DESIGN.md'),
    role + ' exports its guide',
  )
  assert.deepEqual(await readFile(new URL('DESIGN.md', directory)), canonical)
  assert.deepEqual(await readFile(new URL('package.json', directory)), before)
}
console.log(
  'PASS: normal npm pack lifecycle includes the canonical guide without changing metadata',
)
