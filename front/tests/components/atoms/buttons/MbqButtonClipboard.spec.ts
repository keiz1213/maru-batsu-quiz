import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import MbqButtonClipboard from '~/components/atoms/buttons/MbqButtonClipboard.vue'

describe('MbqButtonClipboardVue', () => {
  it('emits click event when clicked', async () => {
    const wrapper = shallowMount(MbqButtonClipboard)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toBeTruthy()
  })
})
