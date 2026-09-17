// Generates public/snippets.json from real source files, for the
// in-page code viewer (see app/widgets/architecture-case-study). This
// runs as a `pre*` step before dev/build/generate so the snippets can
// never silently go stale.
//
// This has to be a plain static JSON asset, fetched at runtime, rather
// than a `?raw` module import: Nitro's server/prerender bundle uses
// Rollup, and Rollup's CommonJS plugin fails to parse the generated
// chunk for a `?raw`-imported .ts/.vue file ("Expected a semicolon"),
// even when the import is dynamic and only ever awaited client-side —
// Rollup still walks and bundles it at build time regardless of any
// runtime guard. A fetched static asset never enters that bundle at all.
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)))

const snippets = {
  animation: { title: 'app/shared/styles/main.scss', lang: 'scss', path: 'app/shared/styles/main.scss' },
  i18n: { title: 'app/features/lang-switch/LangSwitch.vue', lang: 'vue', path: 'app/features/lang-switch/LangSwitch.vue' },
  codeViewer: { title: 'app/widgets/code-viewer/CodeViewerPanel.vue', lang: 'vue', path: 'app/widgets/code-viewer/CodeViewerPanel.vue' },
  performance: { title: 'app/shared/lib/useReducedMotion.ts', lang: 'typescript', path: 'app/shared/lib/useReducedMotion.ts' }
}

const output = {}
for (const [key, { title, lang, path: relPath }] of Object.entries(snippets)) {
  const source = await readFile(path.join(rootDir, relPath), 'utf-8')
  output[key] = { title, lang, source }
}

const publicDir = path.join(rootDir, 'public')
await mkdir(publicDir, { recursive: true })
await writeFile(path.join(publicDir, 'snippets.json'), JSON.stringify(output), 'utf-8')

console.log(`Generated public/snippets.json (${Object.keys(output).length} snippets)`)
