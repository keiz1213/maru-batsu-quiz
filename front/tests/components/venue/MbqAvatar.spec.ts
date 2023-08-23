// @vitest-environment nuxt

import Avatar from '~/utils/class/Avatar'
import { describe, it, expect } from 'vitest'
import { shallowMount, VueWrapper } from '@vue/test-utils'
import MbqAvatar from '~/components/venue/MbqAvatar.vue'

describe('MbqAvatar', () => {
  let wrapper: VueWrapper
  let avatarStub: Avatar

  beforeEach(() => {
    avatarStub = {
      avatarId: 'avatar-1',
      avatarName: 'test',
      avatarImage: 'https://example.com/u/72614612/1?v=4',
      avatarIndex: null,
      skywayChannel: null,
      skywayDataStream: null,
      venueActivity: null
    } as Avatar

    wrapper = shallowMount(MbqAvatar, {
      props: {
        avatar: avatarStub
      }
    })
  })

  it('element id', () => {
    expect(wrapper.attributes('id')).toBe(`${avatarStub.avatarId}`)
  })

  it('desplay avatar name', () => {
    const avatarName = wrapper.find(`#avatar-name-${avatarStub.avatarId}`)
    expect(avatarName.text()).toBe(avatarStub.avatarName)
  })

  it('set avatar url', () => {
    const avatarName = wrapper.find(`#avatar-img-${avatarStub.avatarId}`)
    expect(avatarName.attributes('src')).toBe(avatarStub.avatarImage)
  })
})
