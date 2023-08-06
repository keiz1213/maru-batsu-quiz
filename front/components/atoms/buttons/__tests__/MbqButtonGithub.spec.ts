import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MbqButtonGithub from '../MbqButtonGithub.vue'

describe('MbqButtonDangerVue', () => {
  it('emits click event when clicked', async () => {
    const wrapper = mount(MbqButtonGithub)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toBeTruthy()
  })

  it('buttonType property is submit', () => {
    const wrapper = mount(MbqButtonGithub, {
      props: {
        buttonType: 'submit'
      }
    })
    expect(wrapper.attributes().type).toBe('submit')
  })

  it('loading animation is displayed', () => {
    const wrapper = mount(MbqButtonGithub, {
      props: {
        isLoading: true
      }
    })
    expect(wrapper.find('#loading').exists()).toBe(true)
  })

  it('loading animation is not displayed', () => {
    const wrapper = mount(MbqButtonGithub, {
      props: {
        isLoading: false
      }
    })
    expect(wrapper.find('#loading').exists()).toBe(false)
  })
})