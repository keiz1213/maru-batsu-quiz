// @vitest-environment nuxt

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import MbqUserIcon from '../MbqUserIcon.vue'

describe('MbqUserIcon', () => {
  it('renders user photo', () => {
    vi.mock('~/composables/useAuth.ts', () => ({
      useAuth: () => ({
        user: {
          value: {
            photoURL: 'https://example.com/photo.jpg'
          }
        }
      })
    }))

    const wrapper = mount(MbqUserIcon)
    expect(wrapper.attributes('src')).toBe('https://example.com/photo.jpg')
  })
})
