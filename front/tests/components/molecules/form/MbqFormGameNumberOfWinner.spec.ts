// @vitest-environment nuxt

import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import MbqFormGameNumberOfWinner from '~/components/molecules/form/MbqFormGameNumberOfWinner.vue'

describe('MbqFormGameNumberOfWinner', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(MbqFormGameNumberOfWinner, {
      props: {
        modelValue: 2
      }
    })
  })

  it('initial value', () => {
    const select = wrapper.find('select')
    expect(select.element.value).toBe('2')
  })

  it('updates modelValue when select value changes', async () => {
    const select = wrapper.find('select')
    select.element.value = '3'
    await select.trigger('change')
    expect(wrapper.emitted('update:modelValue')![0][0]).toBe(3)
  })
})
