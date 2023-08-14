// @vitest-environment nuxt

import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import MbqFormGameDescription from '~/components/molecules/form/MbqFormGameDescription.vue'

describe('MbqFormGameDescription', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(MbqFormGameDescription, {
      props: {
        modelValue: 'description'
      }
    })
  })

  it('initial value', () => {
    const textarea = wrapper.find('textarea')
    expect(textarea.element.value).toBe('description')
  })

  it('updates modelValue when textarea value changes', async () => {
    const textarea = wrapper.find('textarea')
    textarea.element.value = 'new description'
    await textarea.trigger('input')
    expect(wrapper.emitted('update:modelValue')![0][0]).toBe('new description')
  })
})
