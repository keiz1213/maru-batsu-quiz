// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'ja',
        prefix: 'og: https://ogp.me/ns#'
      },
      meta: [
        {
          name: 'description',
          content:
            'オンラインで○×クイズが遊べるサービスです。誰が、どれくらいの人数の人が、○ or ✗ と答えているか、また回答に迷っている様子がリアルタイムで見れる機能が備わっています。'
        },
        {
          property: 'og:title',
          content: '○×クイズオンライン'
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:site_name',
          content: '○×クイズオンライン'
        },
        {
          property: 'og:description',
          content:
            'オンラインで○×クイズが遊べるサービスです。誰が、どれくらいの人数の人が、○ or ✗ と答えているか、また回答に迷っている様子がリアルタイムで見れる機能が備わっています。'
        },
        {
          property: 'og:image',
          content: 'https://www.marubatsu-quiz-online.com/logo-ogp.png'
        },
        {
          property: 'og:url',
          content: 'https://www.marubatsu-quiz-online.com'
        },
        {
          property: 'twitter:card',
          content: 'summary'
        },
        {
          property: 'twitter:title',
          content: '○×クイズオンライン'
        },
        {
          property: 'twitter:description',
          content:
            'オンラインで○×クイズが遊べるサービスです。誰が、どれくらいの人数の人が、○ or ✗ と答えているか、また回答に迷っている様子がリアルタイムで見れる機能が備わっています。'
        },
        {
          property: 'twitter:image',
          content: 'https://www.marubatsu-quiz-online.com/logo-ogp.png'
        },
        {
          property: 'twitter:site',
          content: '@Nakamura'
        },
        {
          property: 'twitter:title',
          content: '○×クイズオンライン'
        }
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
