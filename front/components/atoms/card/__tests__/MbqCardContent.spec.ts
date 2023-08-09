import { describe, it, expect } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import MbqCardContent from '../MbqCardContent.vue'

describe('MbqCardContent', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = shallowMount(MbqCardContent, {
      props: {
        description: 'test description',
        numberOfWinner: 1,
        createdAt: '2023/8/1',
        updatedAt: '2023/8/1'
      }
    })
  })

  it('render correctly with description', () => {
    expect(wrapper.find('#card-description').text()).toBe('test description')
  })

  it('render correctly with number of winner', () => {
    expect(wrapper.find('#card-number-of-winner').text()).toBe(
      '勝ち抜き人数: 1人'
    )
  })

  it('render correctly with created at', () => {
    expect(wrapper.find('#card-created-at').text()).toBe('作成日: 2023/8/1')
  })

  it('render correctly with updated at', () => {
    expect(wrapper.find('#card-updated-at').text()).toBe('更新日: 2023/8/1')
  })
})
