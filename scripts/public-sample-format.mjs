import { createRequire } from 'node:module'
import { format } from 'prettier'

const require = createRequire(new URL('../examples/vue-vuetify/package.json', import.meta.url))
const ts = require('typescript')
const { parse } = require('@vue/compiler-sfc')

// Public examples share one style without imposing it on implementation files.
export const publicSampleFormat = Object.freeze({
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  printWidth: 100,
  arrowParens: 'avoid',
})

function separateImports(source) {
  const file = ts.createSourceFile('sample.ts', source, ts.ScriptTarget.Latest, true)
  const imports = file.statements.filter(statement => ts.isImportDeclaration(statement))
  if (!imports.length) return source
  const lastImport = imports.at(-1)
  const rest = source.slice(lastImport.end)
  if (!rest.trim()) return source
  // Keep any comment on the last import's line attached to that import.
  const comment = /^( *\/\/[^\n]*)\n/.exec(rest)
  const end = lastImport.end + (comment?.[0].length || 0)
  return source.slice(0, end).trimEnd() + '\n\n' + source.slice(end).trimStart()
}

export async function formatPublicSample(source, language) {
  const parser = language === 'vue' ? 'vue' : /^(?:ts|typescript|tsx)$/.test(language) ? 'typescript' : 'babel'
  let formatted = await format(source, { ...publicSampleFormat, parser })
  if (language === 'vue') {
    let parsed = parse(formatted, { filename: 'sample.vue' })
    // Vue detects multi-statement event handlers by their semicolons. Prettier's
    // semi:false can remove those required separators and produce invalid SFCs.
    if (parsed.errors.length && !parse(source, { filename: 'sample.vue' }).errors.length) {
      formatted = await format(source, {
        ...publicSampleFormat,
        parser,
        embeddedLanguageFormatting: 'off',
      })
      parsed = parse(formatted, { filename: 'sample.vue' })
    }
    const { descriptor, errors } = parsed
    if (errors.length) throw new Error(errors.map(error => error.message || error).join('\n'))
    for (const block of [descriptor.script, descriptor.scriptSetup].filter(Boolean).reverse()) {
      const scriptParser = block.lang === 'ts' ? 'typescript' : 'babel'
      const script = await format(block.content, { ...publicSampleFormat, parser: scriptParser })
      const separated = await format(separateImports(script), {
        ...publicSampleFormat,
        parser: scriptParser,
      })
      formatted = formatted.slice(0, block.loc.start.offset) +
        '\n' + separated + formatted.slice(block.loc.end.offset)
    }
    return formatted
  } else {
    formatted = separateImports(formatted)
  }
  return format(formatted, { ...publicSampleFormat, parser })
}
