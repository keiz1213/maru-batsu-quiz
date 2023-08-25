// @vitest-environment nuxt

import { describe, it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import MbqNavBar from '~/components/molecules/rayout/MbqNavBar.vue'

describe('MbqNavBar', () => {
  it('when user not logged in, the user icon is hidden ', () => {
    const wrapper = shallowMount(MbqNavBar)
    const useIcon = wrapper.findComponent({ name: 'MbqUserIcon' })
    expect(useIcon.exists()).toBeFalsy()
  })

  it("when user not logged in, href attribute of the brand icon is set to '/' ", () => {
    const wrapper = shallowMount(MbqNavBar)
    const brandIcon = wrapper.findComponent({ name: 'MbqBrand' })
    expect(brandIcon.attributes('href')).toBe('/')
  })
})
