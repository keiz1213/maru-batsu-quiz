// @vitest-environment nuxt

import { describe, it, expect, vi, beforeAll } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import MbqNavBar from '~/components/molecules/rayout/MbqNavBar.vue'

describe('MbqNavBar', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  const mocks = vi.hoisted(() => {
    return {
      useAuth: vi.fn()
    }
  })

  vi.mock('~/composables/use-auth', () => {
    return {
      useAuth: mocks.useAuth
    }
  })

  it('when user not logged in, the user icon is hidden ', () => {
    mocks.useAuth.mockReturnValueOnce({
      isLoggedIn: false
    })
    const wrapper = shallowMount(MbqNavBar)
    const useIcon = wrapper.findComponent({ name: 'MbqUserIcon' })
    expect(useIcon.exists()).toBeFalsy()
  })

  it("when user not logged in, href attribute of the brand icon is set to '/' ", () => {
    mocks.useAuth.mockReturnValueOnce({
      isLoggedIn: false
    })
    const wrapper = shallowMount(MbqNavBar)
    const brandIcon = wrapper.findComponent({ name: 'MbqBrand' })
    expect(brandIcon.attributes('href')).toBe('/')
  })

  it('when user logged in, the user icon is desplayed ', () => {
    mocks.useAuth.mockReturnValueOnce({
      isLoggedIn: true
    })
    const wrapper = shallowMount(MbqNavBar)
    const useIcon = wrapper.findComponent({ name: 'MbqUserIcon' })
    expect(useIcon.exists()).toBeTruthy()
  })

  it("when user logged in, href attribute of the brand icon is set to '/home' ", () => {
    mocks.useAuth.mockReturnValueOnce({
      isLoggedIn: true
    })
    const wrapper = shallowMount(MbqNavBar)
    const brandIcon = wrapper.findComponent({ name: 'MbqBrand' })
    expect(brandIcon.attributes('href')).toBe('/home')
  })

  it('when user logged in, user can logout', () => {
    mocks.useAuth.mockReturnValueOnce({
      isLoggedIn: true
    })
    const wrapper = shallowMount(MbqNavBar)
    const logoutButton = wrapper.find('#logout-button')
    logoutButton.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('logout')
  })
})
