import type { HighlighterCore } from 'shiki/core'
import type { LanguageInput } from 'shiki'

// A custom, DESIGN.md-compliant syntax theme: only the five neutrals
// (press-ink, paper-white, newsprint, foil-gray, mute-gray) — tokens are
// told apart by weight/style, not hue, the same discipline as the rest
// of the site's type system.
const monoTheme = {
  name: 'design-mono',
  bg: '#f1f1f1',
  fg: '#121212',
  settings: [
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: '#c5c5c5', fontStyle: 'italic' }
    },
    {
      scope: ['keyword', 'storage', 'keyword.control', 'keyword.operator.new', 'variable.language.this'],
      settings: { foreground: '#121212', fontStyle: 'bold' }
    },
    {
      scope: ['entity.name.tag', 'entity.name.function', 'support.function', 'entity.name.type', 'entity.other.attribute-name'],
      settings: { foreground: '#121212', fontStyle: 'bold' }
    },
    {
      scope: ['string', 'string.quoted'],
      settings: { foreground: '#121212' }
    },
    {
      scope: ['constant.numeric', 'constant.language', 'constant.character'],
      settings: { foreground: '#121212', fontStyle: 'bold' }
    },
    {
      scope: ['variable', 'variable.parameter', 'variable.other'],
      settings: { foreground: '#121212' }
    },
    {
      scope: ['punctuation', 'meta.brace'],
      settings: { foreground: '#5c5c5c' }
    }
  ]
}

export const CODE_THEME_NAME = monoTheme.name

let highlighterPromise: Promise<HighlighterCore> | undefined

/** Lazily creates a single shared Shiki highlighter, scoped to just the
 * languages this project's own source actually uses — loaded only when
 * a code panel is first opened, not bundled into the initial page. */
export function useHighlighter() {
  highlighterPromise ??= createHighlighter()
  return highlighterPromise
}

async function createHighlighter() {
  const [{ createHighlighterCore }, { createJavaScriptRegexEngine }, vue, typescript, scss] = await Promise.all([
    import('shiki/core'),
    import('shiki/engine/javascript'),
    import('@shikijs/langs/vue') as Promise<{ default: LanguageInput }>,
    import('@shikijs/langs/typescript') as Promise<{ default: LanguageInput }>,
    import('@shikijs/langs/scss') as Promise<{ default: LanguageInput }>
  ])

  return createHighlighterCore({
    themes: [monoTheme],
    langs: [vue.default, typescript.default, scss.default],
    engine: createJavaScriptRegexEngine()
  })
}
