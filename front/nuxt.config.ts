// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  components: [
    {
      path: '~/components/',
      pathPrefix: false
    }
  ],
  runtimeConfig: {
    public: {
      baseURL: process.env.API_URL,
      frontURL: process.env.FRONT_URL,
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID
    }
  },
  css: ['~/assets/css/main.css', 'vue-final-modal/style.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  modules: [
    [
      '@vee-validate/nuxt',
      {
        autoImports: true,
        componentNames: {
          Form: 'VeeForm',
          Field: 'VeeField',
          FieldArray: 'VeeFieldArray',
          ErrorMessage: 'VeeErrorMessage'
        }
      }
    ]
  ]
})
