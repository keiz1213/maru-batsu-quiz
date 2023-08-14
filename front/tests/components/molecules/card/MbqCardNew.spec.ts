// @vitest-environment nuxt

import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import MbqCardNew from '~/components/molecules/card/MbqCardNew.vue'

describe('MbqCardNew', () => {
  it('correctly rendered', () => {
    const wrapper = shallowMount(MbqCardNew)
    expect(wrapper.find('h2').text()).toBe('新しいゲームを作成する')
  })
})
