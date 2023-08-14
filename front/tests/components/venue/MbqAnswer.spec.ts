// @vitest-environment nuxt

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MbqAnswer from '~/components/venue/MbqAnswer.vue'

describe('MbqAnswer', () => {
  it("render '◯' zone", () => {
    const wrapper = mount(MbqAnswer)
    const maruZone = wrapper.find('#maru')
    expect(maruZone.exists()).toBeTruthy()
  })

  it("render '✕' zone", () => {
    const wrapper = mount(MbqAnswer)
    const batsuZone = wrapper.find('#batsu')
    expect(batsuZone.exists()).toBeTruthy()
  })
})
