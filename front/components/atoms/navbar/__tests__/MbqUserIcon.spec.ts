// @vitest-environment nuxt

import { describe, it, expect, vi, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import useAuthMock from '~/composables/__tests__/mock/useAuthMock'
import { mockNuxtImport } from 'nuxt-vitest/utils'
import MbqUserIcon from '../MbqUserIcon.vue'

describe('MbqUserIcon', () => {
  beforeAll(() => {
    mockNuxtImport('useAuth', () => {
      return () => useAuthMock()
    })
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('when user logged in, renders user photo', () => {
    const wrapper = mount(MbqUserIcon)
    expect(wrapper.attributes('src')).toBe('https://example.com/photo.jpg')
  })
})
