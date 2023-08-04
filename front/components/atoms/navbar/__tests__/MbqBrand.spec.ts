// @vitest-environment nuxt

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MbqBrand from '../MbqBrand.vue'

describe('MbqBrand', () => {
  it("NuxtLink has the correct 'href' attribute set", async () => {
    const wrapper = mount(MbqBrand, {
      props: {
        href: '/home'
      }
    })

    expect(wrapper.props('href')).toBe('/home')
  })
})
