import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import MbqCardHeader from '../MbqCardHeader.vue'

describe('MbqCardHeader', () => {
  it('render correctly with title', () => {
    const wrapper = shallowMount(MbqCardHeader, {
      props: {
        title: 'test game'
      }
    })
    expect(wrapper.find('#card-title').text()).toBe('test game')
  })
})
