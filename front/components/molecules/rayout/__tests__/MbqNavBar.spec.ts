// @vitest-environment nuxt

import { describe, it, expect, vi, beforeAll } from 'vitest'
import useAuthMock from '~/composables/__tests__/mock/useAuthMock'
import { mockNuxtImport } from 'nuxt-vitest/utils'
import { shallowMount } from '@vue/test-utils'
import MbqNavBar from '../MbqNavBar.vue'

describe('MbqNavBar', () => {
  beforeAll(() => {
    mockNuxtImport('useAuth', () => {
      return () => useAuthMock()
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('when user not logged in, the user icon is hidden ', () => {
    useAuthMock.mockImplementation(() => {
      return {
        user: {
          value: null
        },
        isLoggedIn: false
      }
    })
    const wrapper = shallowMount(MbqNavBar)
    const useIcon = wrapper.findComponent({ name: 'MbqUserIcon' })
    expect(useIcon.exists()).toBeFalsy()
  })

  it("when user not logged in, href attribute of the brand icon is set to '/' ", () => {
    useAuthMock.mockImplementation(() => {
      return {
        user: {
          value: null
        },
        isLoggedIn: false
      }
    })
    const wrapper = shallowMount(MbqNavBar)
    const brandIcon = wrapper.findComponent({ name: 'MbqBrand' })
    expect(brandIcon.attributes('href')).toBe('/')
  })

  it('when user logged in, the user icon is desplayed ', () => {
    const wrapper = shallowMount(MbqNavBar)
    const useIcon = wrapper.findComponent({ name: 'MbqUserIcon' })
    expect(useIcon.exists()).toBeTruthy()
  })

  it("when user logged in, href attribute of the brand icon is set to '/home' ", () => {
    const wrapper = shallowMount(MbqNavBar)
    const brandIcon = wrapper.findComponent({ name: 'MbqBrand' })
    expect(brandIcon.attributes('href')).toBe('/home')
  })

  it('when user logged in, user can logout', () => {
    const wrapper = shallowMount(MbqNavBar)
    const logoutButton = wrapper.find('#logout-button')
    logoutButton.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('logout')
  })
})
