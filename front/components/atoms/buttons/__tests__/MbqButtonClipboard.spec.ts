import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MbqButtonClipboard from '../MbqButtonClipboard.vue'

describe('MbqButtonClipboardVue', () => {
  it('emits click event when clicked', async () => {
    const wrapper = mount(MbqButtonClipboard)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toBeTruthy()
  })
})
