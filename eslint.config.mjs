// @ts-check
import boundaries from 'eslint-plugin-boundaries'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    files: ['app/**/*.{ts,vue}'],
    plugins: { boundaries },
    settings: {
      'boundaries/elements': [
        { type: 'app-root', pattern: 'app/app.vue', partialMatch: false },
        { type: 'layouts', pattern: 'app/layouts/**' },
        { type: 'pages', pattern: 'app/pages/**' },
        { type: 'widgets', pattern: 'app/widgets/*/**' },
        { type: 'features', pattern: 'app/features/*/**' },
        { type: 'entities', pattern: 'app/entities/*/**' },
        { type: 'shared', pattern: 'app/shared/**' }
      ]
    },
    rules: {
      // FSD layering: shared -> entities -> features -> widgets -> pages/layouts -> app.
      // A layer may only import itself or layers below it in this list.
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          policies: [
            {
              from: { element: { type: 'shared' } },
              allow: { to: { element: { type: 'shared' } } }
            },
            {
              from: { element: { type: 'entities' } },
              allow: { to: { element: { type: ['shared', 'entities'] } } }
            },
            {
              from: { element: { type: 'features' } },
              allow: { to: { element: { type: ['shared', 'entities', 'features'] } } }
            },
            {
              from: { element: { type: 'widgets' } },
              allow: { to: { element: { type: ['shared', 'entities', 'features', 'widgets'] } } }
            },
            {
              from: { element: { type: 'pages' } },
              allow: { to: { element: { type: ['shared', 'entities', 'features', 'widgets'] } } }
            },
            {
              from: { element: { type: 'layouts' } },
              allow: { to: { element: { type: ['shared', 'widgets'] } } }
            },
            {
              from: { element: { type: 'app-root' } },
              allow: { to: { element: { type: ['shared', 'widgets', 'layouts'] } } }
            }
          ]
        }
      ]
    }
  },
  {
    files: ['**/*.test.ts'],
    rules: {
      'boundaries/dependencies': 'off'
    }
  },
  {
    // Short, generic names are intentional for design-system primitives and
    // the single hero widget — not accidental clashes with HTML elements.
    files: ['app/shared/ui/**/*.vue', 'app/widgets/hero/**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off'
    }
  }
)
