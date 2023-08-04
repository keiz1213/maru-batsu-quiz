// @vitest-environment nuxt

import { describe, it, expect } from 'vitest'
import { mount, VueWrapper, DOMWrapper } from '@vue/test-utils'
import MbqFormQuiz from '../MbqFormQuiz.vue'

describe('MbqFormQuiz', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(MbqFormQuiz, {
      props: {
        index: 2,
        quizzesLength: 5,
        question: '2 + 1 は 4 ◯か✕か',
        correctAnswer: '✕',
        explanation: '普通に3です'
      }
    })
  })

  describe('initial value', () => {
    it('quiz title', () => {
      const label = wrapper.find('[for="form-quiz-3"]')
      expect(label.text()).toBe('クイズ3')
    })

    it('quiz question', () => {
      const textarea = wrapper.find(
        '#form-question-3'
      ) as DOMWrapper<HTMLTextAreaElement>
      expect(textarea.element.value).toBe('2 + 1 は 4 ◯か✕か')
    })

    it('quiz correct answer', () => {
      const select = wrapper.find(
        '#form-correct-answer-3'
      ) as DOMWrapper<HTMLSelectElement>
      expect(select.element.value).toBe('✕')
    })

    it('quiz explanation', () => {
      const textarea = wrapper.find(
        '#form-explanation-3'
      ) as DOMWrapper<HTMLTextAreaElement>
      expect(textarea.element.value).toBe('普通に3です')
    })
  })

  describe('updates value of quiz', () => {
    it('when the value of question changes', async () => {
      const textarea = wrapper.find(
        '#form-question-3'
      ) as DOMWrapper<HTMLTextAreaElement>
      textarea.element.value = '令和5年現在の日本の首相は岸田さん？'
      await textarea.trigger('input')
      expect(wrapper.emitted('update:question')![0][0]).toBe(
        '令和5年現在の日本の首相は岸田さん？'
      )
    })

    it('when the value of correct answer changes', async () => {
      const select = wrapper.find(
        '#form-correct-answer-3'
      ) as DOMWrapper<HTMLSelectElement>
      select.element.value = '◯'
      await select.trigger('change')
      expect(wrapper.emitted('update:correctAnswer')![0][0]).toBe('◯')
    })

    it('when the value of explanation changes', async () => {
      const textarea = wrapper.find(
        '#form-explanation-3'
      ) as DOMWrapper<HTMLTextAreaElement>
      textarea.element.value = '普通に岸田さんです'
      await textarea.trigger('input')
      expect(wrapper.emitted('update:explanation')![0][0]).toBe(
        '普通に岸田さんです'
      )
    })
  })
})
