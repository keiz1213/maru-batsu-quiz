// @vitest-environment nuxt

import Avatar from '~/utils/class/Avatar'
import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import MbqAvatar from '../MbqAvatar.vue'

describe('MbqAvatar', () => {
  let wrapper: VueWrapper
  let avatar: Avatar

  beforeEach(() => {
    avatar = new Avatar(
      '1',
      true,
      'test avatar',
      'https://example.com/photo.jpg',
      null,
      null,
      null,
      null
    )

    wrapper = mount(MbqAvatar, {
      props: {
        avatar: avatar
      }
    })
  })

  it('element id', () => {
    expect(wrapper.attributes('id')).toBe(`${avatar.id}`)
  })

  it('desplay avatar name', () => {
    const avatarName = wrapper.find(`#avatar-name-${avatar.id}`)
    expect(avatarName.text()).toBe(avatar.name)
  })

  it('set avatar url', () => {
    const avatarName = wrapper.find(`#avatar-img-${avatar.id}`)
    expect(avatarName.attributes('src')).toBe(avatar.avatarUrl)
  })
})
