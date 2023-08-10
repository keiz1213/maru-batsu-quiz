// @vitest-environment nuxt

import { Game } from '~/types/game'
import { describe, it, expect } from 'vitest'
import { mount, VueWrapper, DOMWrapper } from '@vue/test-utils'
import { mountSuspended } from 'nuxt-vitest/utils'
import MbqFormGame from '../MbqFormGame.vue'

describe('MbqFormGame', () => {
  let game: Game
  let wrapper: VueWrapper

  describe('when the game props is missing', () => {
    beforeEach(async () => {
      wrapper = await mountSuspended(MbqFormGame, { route: '/games/new' })
    })

    describe('game', () => {
      it('heading level 1 is ゲーム作成', () => {
        expect(wrapper.find('h1').text()).toBe('ゲーム作成')
      })

      it('initial game title is empty', () => {
        const titleForm = wrapper.findComponent({
          name: 'MbqFormGameTitle'
        })
        expect(titleForm.find('input').text()).toBe('')
      })

      it('initial game description is empty', () => {
        const descriptionForm = wrapper.findComponent({
          name: 'MbqFormGameDescription'
        })
        expect(descriptionForm.find('textarea').text()).toBe('')
      })

      it('initial game number of winner is 1', () => {
        const numberOfWinnerForm = wrapper.findComponent({
          name: 'MbqFormGameNumberOfWinner'
        })
        expect(numberOfWinnerForm.find('select').element.value).toBe('1')
      })
    })

    describe('quiz', () => {
      it('initial content of question is empty', () => {
        const quiz = wrapper.findComponent({
          name: 'MbqFormQuiz'
        })
        expect(quiz.find('#form-question-1').text()).toBe('')
      })

      it('initial content of correct answer is ◯', () => {
        const quiz = wrapper.findComponent({
          name: 'MbqFormQuiz'
        })
        expect(quiz.find('select').element.value).toBe('◯')
      })

      it('initial content of explanation is empty', () => {
        const quiz = wrapper.findComponent({
          name: 'MbqFormQuiz'
        })
        expect(quiz.find('#form-explanation-1').text()).toBe('')
      })
    })

    describe('button', () => {
      it('primary button text is ゲームを作成する', () => {
        const button = wrapper.findComponent({
          name: 'MbqButtonPrimary'
        })
        expect(button.text()).toBe('ゲームを作成する')
      })
    })
  })

  describe('when the game props exists', () => {
    beforeEach(() => {
      game = {
        user_id: 1,
        id: 1,
        channel_name: 'test name',
        title: 'Test Game',
        description: 'This is a test game',
        quizzes: [
          {
            question: '1 + 1 = 2 ?',
            correct_answer: '◯',
            explanation: '普通に2です'
          },
          {
            question: '2 + 2 = 5 ?',
            correct_answer: '✕',
            explanation: '普通に4です'
          }
        ],
        number_of_winner: 3,
        created_at: '2023-08-04T12:34:56Z',
        updated_at: '2023-08-04T14:22:33Z'
      }

      wrapper = mount(MbqFormGame, {
        props: {
          game: game
        }
      })
    })

    describe('game', () => {
      it('heading level 1 is ゲーム編集', () => {
        expect(wrapper.find('h1').text()).toBe('ゲーム編集')
      })

      it('game title is rendered', () => {
        const titleForm = wrapper.findComponent({
          name: 'MbqFormGameTitle'
        })
        expect(titleForm.find('input').element.value).toBe(game.title)
      })

      it('game description is rendered', () => {
        const descriptionForm = wrapper.findComponent({
          name: 'MbqFormGameDescription'
        })
        expect(descriptionForm.find('textarea').element.value).toBe(
          game.description
        )
      })

      it('game number of winner is rendered', () => {
        const numberOfWinnerForm = wrapper.findComponent({
          name: 'MbqFormGameNumberOfWinner'
        })
        expect(numberOfWinnerForm.find('select').element.value).toBe(
          game.number_of_winner.toString()
        )
      })
    })

    describe('quiz', () => {
      it('quizzes is rendered', () => {
        const quizzes = wrapper.findAllComponents({
          name: 'MbqFormQuiz'
        })
        expect(quizzes.length).toEqual(game.quizzes.length)
      })

      it('question is rendered', () => {
        const quizzes = wrapper.findAllComponents({
          name: 'MbqFormQuiz'
        })
        const secondQuiz = quizzes.at(1)
        const questionForm = secondQuiz!.find(
          '#form-question-2'
        ) as DOMWrapper<HTMLTextAreaElement>
        expect(questionForm.element.value).toBe(game.quizzes[1].question)
      })

      it('correct answer is rendered', () => {
        const quizzes = wrapper.findAllComponents({
          name: 'MbqFormQuiz'
        })
        const secondQuiz = quizzes.at(1)
        const correctAnswerForm = secondQuiz!.find(
          '#form-correct-answer-2'
        ) as DOMWrapper<HTMLSelectElement>
        expect(correctAnswerForm.element.value).toBe(
          game.quizzes[1].correct_answer
        )
      })

      it('explanation is rendered', () => {
        const quizzes = wrapper.findAllComponents({
          name: 'MbqFormQuiz'
        })
        const secondQuiz = quizzes.at(1)
        const correctAnswerForm = secondQuiz!.find(
          '#form-explanation-2'
        ) as DOMWrapper<HTMLTextAreaElement>
        expect(correctAnswerForm.element.value).toBe(
          game.quizzes[1].explanation
        )
      })
    })

    describe('button', () => {
      it('primary button text is ゲームを更新する', () => {
        const button = wrapper.findComponent({
          name: 'MbqButtonPrimary'
        })
        expect(button.text()).toBe('ゲームを更新する')
      })
    })
  })

  describe('public button', () => {
    it('add quiz button is rendered', () => {
      const wrapper = mount(MbqFormGame)
      const addButton = wrapper.findComponent({
        name: 'MbqButtonSecondary'
      })
      expect(addButton.text()).toBe('+ クイズを追加する')
    })
  })
})
