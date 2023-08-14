// @vitest-environment nuxt

import Avatar from '~/utils/class/Avatar'
import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import MbqWinners from '~/components/venue/MbqWinners.vue'

describe('MbqWinners', () => {
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
    const wrapper = shallowMount(MbqWinners, {
      props: {
        winners: avatars,
        title: 'winners'
      }
    })
    const avatarComponents = wrapper.findAllComponents({
      name: 'MbqAvatar'
    })
    expect(avatarComponents.length).toBe(avatars.length)
  })
})
