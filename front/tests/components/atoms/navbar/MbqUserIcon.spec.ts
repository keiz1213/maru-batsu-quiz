// @vitest-environment nuxt

import { User } from '~/types/user'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import MbqUserIcon from '~/components/atoms/navbar/MbqUserIcon.vue'

describe('MbqUserIcon', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  const currentUserMock = {
    id: 1,
    uid: 'test',
    name: 'testName',
    avatar_url: 'https://example.com/u/72614612/1?v=4/',
    games: []
  } as User

  it('when user logged in, renders user photo', () => {
    const wrapper = shallowMount(MbqUserIcon, {
      props: {
        currentUser: currentUserMock
      }
    })
    expect(wrapper.attributes('src')).toBe('https://example.com/u/72614612/1?v=4/')
  })
})
