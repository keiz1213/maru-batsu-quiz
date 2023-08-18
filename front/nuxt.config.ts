// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        {
          name: 'description',
          content:
            'オンラインでマルバツクイズが遊べるサービスです。誰が、どれくらいの人数の人が、○ or ✗ と答えているか、また回答に迷っている様子がリアルタイムで見れる機能が備わっています。'
        },
        {
          name: 'og:title',
          content: 'マルバツクイズオンライン'
        },
        {
          name: 'og:type',
          content: 'website'
        },
        {
          name: 'og:site_name',
          content: 'マルバツクイズオンライン'
        },
        {
          name: 'og:description',
          content:
            'オンラインでマルバツクイズが遊べるサービスです。誰が、どれくらいの人数の人が、○ or ✗ と答えているか、また回答に迷っている様子がリアルタイムで見れる機能が備わっています。'
        },
        {
          name: 'og:image',
          content:
            'https://marubatsu-quiz-online.com/assets/images/logo-ogp.png'
        },
        {
          name: 'og:url',
          content: 'https://www.marubatsu-quiz-online.com'
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          name: 'twitter:description',
          content:
            'オンラインでマルバツクイズが遊べるサービスです。誰が、どれくらいの人数の人が、○ or ✗ と答えているか、また回答に迷っている様子がリアルタイムで見れる機能が備わっています。'
        },
        {
          name: 'twitter:image',
          content:
            'https://www.marubatsu-quiz-online.com/assets/images/logo-ogp.png'
        },
        {
          name: 'twitter:site',
          content:
            '@Nakamura'
        },
        {
          name: 'twitter:title',
          content:
            'マルバツクイズオンライン'
        },
      ]
    }
  },
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
  css: [
    '~/assets/css/main.css',
    'vue-final-modal/style.css',
    'animate.css/animate.min.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  modules: [
    'nuxt-vitest',
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
