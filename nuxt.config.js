export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Diamond Rush',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      {
        rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@100;200;300;400;500;600;700&display=swap'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/fireauth.js',
    '~/plugins/user_wallet.js',
    '~/plugins/GoogleAnalytics.js',
  ],

  router: {
    middleware: 'router-auth'
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    'vue-sweetalert2/nuxt',
  ],
  sweetalert: {
    confirmButtonColor: '#41b882',
    cancelButtonColor: '#ff7674'
  },

  axios: {
    baseURL: 'https://us-central1-diamond-rush-b9ad9.cloudfunctions.net/app/api',
    // proxy: true
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL
    }
  },

  vendor: [
    'firebase'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  server: {
    host: "0.0.0.0"
  },
  target: "static",
  generate: {
    fallback: true
  }
}
