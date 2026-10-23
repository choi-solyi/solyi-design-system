import assert from 'node:assert/strict'
import { cp, mkdir, mkdtemp, readFile, copyFile, access } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import path from 'node:path'

const root = new URL('../', import.meta.url)
const temporary = await mkdtemp(path.join(tmpdir(), 'solyi-core-bootstrap-'))
await cp(new URL('scripts/', root), path.join(temporary, 'scripts'), { recursive: true })
await copyFile(new URL('tokens.json', root), path.join(temporary, 'tokens.json'))
await mkdir(path.join(temporary, 'site/fonts/wanted-sans'), { recursive: true })
await copyFile(
  new URL('site/fonts/wanted-sans/SOURCE.json', root),
  path.join(temporary, 'site/fonts/wanted-sans/SOURCE.json'),
)
for (const name of ['node_modules', 'examples/vue-vuetify/node_modules']) {
  await assert.rejects(access(path.join(temporary, name)), { code: 'ENOENT' })
}
const env = { ...process.env }
delete env.NODE_PATH
const output = execFileSync(process.execPath, ['scripts/build.mjs', '--core-only'], {
  cwd: temporary,
  env,
  encoding: 'utf8',
})
assert.match(output, /Generated shared Core tokens only/)
for (const name of ['tokens.css', 'tokens.json', 'token-data.js']) {
  assert.ok((await readFile(path.join(temporary, 'docs', name))).length)
}
assert.deepEqual(
  JSON.parse(await readFile(path.join(temporary, 'docs/tokens.json'), 'utf8')),
  JSON.parse(await readFile(new URL('tokens.json', root), 'utf8')),
)
console.log('PASS: isolated Core bootstrap without Vue, TypeScript, formatter or consumer dependencies')
