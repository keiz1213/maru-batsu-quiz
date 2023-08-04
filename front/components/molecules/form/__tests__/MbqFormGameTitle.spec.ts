// @vitest-environment nuxt

import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import MbqFormGameTitle from '../MbqFormGameTitle.vue'

describe('MbqFormGameTitle', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(MbqFormGameTitle, {
      props: {
        modelValue: 'sample game'
      }
    })
  })

  it('initial value', () => {
    const textInput = wrapper.find('input')
    expect(textInput.element.value).toBe('sample game')
  })

  it('updates modelValue when text input value changes', async () => {
    const textInput = wrapper.find('input')
    textInput.element.value = 'new sample game'
    await textInput.trigger('input')
    expect(wrapper.emitted('update:modelValue')![0][0]).toBe('new sample game')
  })
})
