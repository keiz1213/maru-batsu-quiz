// @vitest-environment nuxt

import { describe, it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import MbqUserIcon from '~/components/atoms/navbar/MbqUserIcon.vue'

describe('MbqUserIcon', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  const currentUser = {
    id: 1,
    uid: 'test',
    name: 'testName',
    avatar_url: 'https://example.com/u/72614612/1?v=4/',
    games: []
  }

  it('when user logged in, renders user photo', () => {
    const wrapper = shallowMount(MbqUserIcon, {
      props: {
        currentUser: currentUser
      }
    })
    expect(wrapper.attributes('src')).toBe(
      'https://example.com/u/72614612/1?v=4/'
    )
  })
})
