// @vitest-environment nuxt

import Avatar from '~/utils/class/Avatar'
import { Quiz } from '~/types/quiz'
import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import MbqOwnerArea from '~/components/venue/MbqOwnerArea.vue'

describe('MbqOwnerArea', () => {
  let wrapper: VueWrapper
  let owner: Avatar
  let quizzes: Quiz[]
  let props: {
    owner: Avatar | undefined
    quizzes: Quiz[]
    currentQuizNumber: number
    isOwner: boolean
    description: string
    isLoading: boolean
  }

  beforeEach(() => {
    owner = new Avatar(
      '1',
      true,
      'test avatar',
      'https://example.com/photo.jpg',
      null,
      null,
      null,
      null
    )

    quizzes = [
      {
        question: '1 + 1 = 2 ?',
        correct_answer: '◯',
        explanation: '普通に2です'
      },
      {
        question: '2 + 2 = 4 ?',
        correct_answer: '◯',
        explanation: '普通に4です'
      }
    ]
  })

  describe("from the owner's perspective", () => {
    beforeEach(() => {
      props = {
        owner: owner,
        quizzes: quizzes,
        currentQuizNumber: 2,
        isOwner: true,
        description: 'testなgameです',
        isLoading: false
      }

      wrapper = mount(MbqOwnerArea, {
        props: props
      })
    })

    it('render owner avatar', () => {
      const ownerAvatar = wrapper.findComponent({
        name: 'MbqAvatar'
      })
      expect(ownerAvatar.exists()).toBeTruthy()
    })

    it('render question button', () => {
      const button = wrapper.find('#question-button')
      expect(button.text()).toBe(
        `${props.currentQuizNumber + 1} 問目を出題する`
      )
    })

    it('render quiz check button', () => {
      const button = wrapper.find('#check-question-button')
      expect(button.text()).toBe('問題を確認する')
    })

    it('not render game description', () => {
      const description = wrapper.find('#check-game-description')
      expect(description.exists()).toBeFalsy()
    })

    it('check question', async () => {
      const button = wrapper.find('#check-question-button')
      await button.trigger('click')
      expect(wrapper.emitted('check-question')).toBeTruthy()
    })

    it('announce', async () => {
      const button = wrapper.find('#question-button')
      await button.trigger('click')
      expect(wrapper.emitted('announce')).toBeTruthy()
    })
  })

  describe("from the player's perspective", () => {
    beforeEach(() => {
      props = {
        owner: owner,
        quizzes: quizzes,
        currentQuizNumber: 2,
        isOwner: false,
        description: 'testなgameです',
        isLoading: false
      }

      wrapper = mount(MbqOwnerArea, {
        props: props
      })
    })

    it('render owner avatar', () => {
      const ownerAvatar = wrapper.findComponent({
        name: 'MbqAvatar'
      })
      expect(ownerAvatar.exists()).toBeTruthy()
    })

    it('not render question button', () => {
      const button = wrapper.find('#question-button')
      expect(button.exists()).toBeFalsy()
    })

    it('not render quiz check button', () => {
      const button = wrapper.find('#check-question-button')
      expect(button.exists()).toBeFalsy()
    })

    it('render game description', () => {
      const description = wrapper.find('#check-game-description')
      expect(description.exists()).toBeTruthy()
    })
  })
})
