// @vitest-environment nuxt

import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import MbqBoard from '../MbqBoard.vue'

describe('MbqBoard', () => {
  let wrapper: VueWrapper
  let props: {
    announceText: string
    elapsed: number
    limit: number
  }

  describe('basic', () => {
    beforeEach(() => {
      props = {
        announceText: 'test',
        elapsed: 0,
        limit: 10
      }
      wrapper = mount(MbqBoard, {
        props: props
      })
    })

    it('display announce text', () => {
      const announceContainer = wrapper.find('#announce-container')
      expect(announceContainer.text()).toBe(`$ ${props.announceText}`)
    })

    it('timer with the set time limit is displayed', () => {
      const limit = wrapper.find('.time-left-label')
      expect(limit.text()).toBe(`00:${props.limit}`)
    })
  })

  describe('timer', () => {
    it('time limit is reduced by 1 second when 1 second has passed', () => {
      props = {
        announceText: 'test',
        elapsed: 1,
        limit: 10
      }
      wrapper = mount(MbqBoard, {
        props: props
      })

      const limit = wrapper.find('.time-left-label')
      expect(limit.text()).toBe('00:09')
    })

    it('time limit is reduced by 2 second when 2 second has passed', () => {
      props = {
        announceText: 'test',
        elapsed: 2,
        limit: 10
      }
      wrapper = mount(MbqBoard, {
        props: props
      })

      const limit = wrapper.find('.time-left-label')
      expect(limit.text()).toBe('00:08')
    })

    it('time limit is reduced by 3 second when 3 second has passed', () => {
      props = {
        announceText: 'test',
        elapsed: 3,
        limit: 10
      }
      wrapper = mount(MbqBoard, {
        props: props
      })

      const limit = wrapper.find('.time-left-label')
      expect(limit.text()).toBe('00:07')
    })
  })
})
