export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',

  modules: ['@nuxtjs/i18n', '@nuxt/eslint'],

  // FSD owns component/composable placement explicitly (shared/ui, widgets, features,
  // entities) instead of Nuxt's implicit components/ + composables/ auto-import scan.
  components: false,

  typescript: {
    strict: true,
    typeCheck: true
  },

  css: ['~/shared/styles/main.scss'],

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]
    }
  },

  nitro: {
    // Pinned: on Vercel, Nitro auto-detects `vercel-static` from the
    // environment, which prerendered only 7 routes there (no /ru/*, no
    // lazy-loaded i18n message files) versus 24 locally under `static`.
    preset: 'static',
    prerender: {
      crawlLinks: true,
      // Listed explicitly rather than relying on the crawler to discover
      // the locale-prefixed pages, so the route set can't differ by host.
      routes: [
        '/',
        '/about',
        '/stack',
        '/architecture',
        '/contact',
        '/ru',
        '/ru/about',
        '/ru/stack',
        '/ru/architecture',
        '/ru/contact'
      ]
    }
  },

  i18n: {
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'ru', name: 'Русский', file: 'ru.json' }
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    // Manual RU/EN toggle only (see features/lang-switch) — automatic
    // browser-language redirection switches locale client-side after SSR,
    // which races the lazy-loaded locale fetch and causes a hydration
    // mismatch on first paint.
    detectBrowserLanguage: false
  },

  eslint: {
    config: {
      stylistic: false
    }
  }
})
