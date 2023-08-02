import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MbqButtonCirculeCross from '../MbqButtonCirculeCross.vue'

describe('MbqButtonCirculeCrossVue', () => {
  it('emits click event when clicked', async () => {
    const wrapper = mount(MbqButtonCirculeCross)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toBeTruthy()
  })

  it('buttonType property is submit', () => {
    const wrapper = mount(MbqButtonCirculeCross, {
      props: {
        buttonType: 'submit'
      }
    })
    expect(wrapper.attributes().type).toBe('submit')
  })
})
