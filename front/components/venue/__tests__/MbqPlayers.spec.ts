// @vitest-environment nuxt

import Avatar from '~/utils/class/Avatar'
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MbqPlayers from '../MbqPlayers.vue'

describe('MbqPlayers', () => {
  it('render avatars', () => {
    const avatar1 = new Avatar(
      '1',
      true,
      'test avatar1',
      'https://example.com/1/photo.jpg',
      null,
      null,
      null,
      null
    )
  
    const avatar2 = new Avatar(
      '2',
      false,
      'test avatar2',
      'https://example.com/2/photo.jpg',
      null,
      null,
      null,
      null
    )

    const avatars = [avatar1, avatar2]
    const wrapper = mount(MbqPlayers, {
      props: {
        players: avatars,
        title: 'Players'
      }
    })
    const avatarComponents = wrapper.findAllComponents({
      name: 'MbqAvatar'
    })
    expect(avatarComponents.length).toBe(avatars.length)
  })
})
