// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    layoutTransition: { 
      name: 'layout',
      mode: 'out-in' 
    }
  },
  modules: [
    'nuxt-particles'
  ],
  particles: {
    mode: 'slim',
    lazy: true
  }
})
