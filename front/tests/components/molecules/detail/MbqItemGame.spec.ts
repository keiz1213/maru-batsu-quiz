// @vitest-environment nuxt

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MbqItemGame from '~/components/molecules/detail/MbqItemGame.vue'

describe('MbqItemGame', () => {
  it("if labelName property is 'ゲーム会場URL', clipboard is desplayed", () => {
    const wrapper = mount(MbqItemGame, {
      props: {
        content: 'test content',
        labelName: 'ゲーム会場URL',
        id: 'detail-game-venue'
      }
    })
    const clipboard = wrapper.findComponent({
      name: 'MbqButtonClipboard'
    })
    expect(clipboard.exists()).toBeTruthy()
  })
})
