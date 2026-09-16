export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',

  modules: ['@nuxtjs/i18n', '@tresjs/nuxt', '@nuxt/eslint'],

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
      htmlAttrs: { lang: 'en' }
    }
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/about', '/stack', '/architecture', '/contact']
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
