// @vitest-environment nuxt

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import MbqCardNew from '../MbqCardNew.vue'

describe('MbqCardNew', () => {
  it('correctly rendered', () => {
    const wrapper = mount(MbqCardNew)
    expect(wrapper.find('h2').text()).toBe('新しいゲームを作成する')
  })
})
