// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['vuetify-nuxt-module', '@nuxtjs/google-fonts', 'nuxt-gtag'],
  css: [
    '~/assets/css/styles.css'
  ],
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      /* vuetify options */
    }
  },
  gtag: {
    enabled: process.env.NODE_ENV === 'production',
    id: 'G-HBPLE7V1RS',
    config: {
      anonymize_ip: true,  // Protect user privacy
      send_page_view: true // Auto-track route changes
    }
  },
  googleFonts: {
    families: {
      "Joti One": true,
      "Irish Grover": true,
      "Kode Mono": true
    }
  },
})