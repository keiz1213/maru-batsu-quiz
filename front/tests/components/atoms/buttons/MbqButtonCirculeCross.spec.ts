import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import MbqButtonCirculeCross from '~/components/atoms/buttons/MbqButtonCirculeCross.vue'

describe('MbqButtonCirculeCrossVue', () => {
  it('emits click event when clicked', async () => {
    const wrapper = shallowMount(MbqButtonCirculeCross)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toBeTruthy()
  })

  it('buttonType property is submit', () => {
    const wrapper = shallowMount(MbqButtonCirculeCross, {
      props: {
        buttonType: 'submit'
      }
    })
    expect(wrapper.attributes().type).toBe('submit')
  })
})
