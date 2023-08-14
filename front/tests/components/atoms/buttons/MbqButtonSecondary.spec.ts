import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import MbqButtonSecondary from '~/components/atoms/buttons/MbqButtonSecondary.vue'
describe('MbqButtonDangerVue', () => {
  it('emits click event when clicked', async () => {
    const wrapper = shallowMount(MbqButtonSecondary)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toBeTruthy()
  })

  it('buttonType property is submit', () => {
    const wrapper = shallowMount(MbqButtonSecondary, {
      props: {
        buttonType: 'submit'
      }
    })
    expect(wrapper.attributes().type).toBe('submit')
  })

  it('loading animation is displayed', () => {
    const wrapper = shallowMount(MbqButtonSecondary, {
      props: {
        isLoading: true
      }
    })
    expect(wrapper.find('#loading').exists()).toBe(true)
  })

  it('loading animation is not displayed', () => {
    const wrapper = shallowMount(MbqButtonSecondary, {
      props: {
        isLoading: false
      }
    })
    expect(wrapper.find('#loading').exists()).toBe(false)
  })
})
