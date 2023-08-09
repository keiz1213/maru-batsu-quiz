// @vitest-environment nuxt

import { describe, it, expect, vi, beforeAll } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import MbqUserIcon from '../MbqUserIcon.vue'

describe('MbqUserIcon', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  const mocks = vi.hoisted(() => {
    return {
      useAuth: vi.fn()
    }
  })

  vi.mock('~/composables/useAuth', () => {
    return {
      useAuth: mocks.useAuth
    }
  })

  it('when user logged in, renders user photo', () => {
    mocks.useAuth.mockReturnValueOnce({
      user: {
        value: {
          photoURL: 'https://example.com/photo.jpg'
        }
      }
    })
    const wrapper = shallowMount(MbqUserIcon)
    expect(wrapper.attributes('src')).toBe('https://example.com/photo.jpg')
  })
})
