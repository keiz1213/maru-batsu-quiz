import { configure } from 'vee-validate'
import { localize } from '@vee-validate/i18n'
import ja from '@vee-validate/i18n/dist/locale/ja.json'
import { defineRule } from 'vee-validate'
import AllRules from '@vee-validate/rules'

export default defineNuxtPlugin((nuxtApp) => {
  localize({ ja })

  configure({
    generateMessage: localize('ja', {
      names: {
        title: 'ゲーム名',
        description: 'ゲームの説明',
        question: '問題',
        explanation: '解説'
      }
    })
  })

  Object.keys(AllRules).forEach((rule) => {
    defineRule(rule, AllRules[rule])
  })
})
