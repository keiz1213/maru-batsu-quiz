// @vitest-environment nuxt

import { Game } from '~/types/game'
import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import MbqListGame from '~/components/organisms/MbqListGame.vue'

describe('MbqListGame', () => {
  let game1: Game
  let game2: Game
  let wrapper: VueWrapper

  describe('when the games props is missing', () => {
    beforeEach(() => {
      wrapper = mount(MbqListGame, {
        props: {
          games: null
        }
      })
    })

    it('games are not rendered', () => {
      const games = wrapper.findAllComponents({
        name: 'MbqCardGame'
      })
      expect(games.length).toBe(0)
    })
  })

  describe('when the games props exsits', () => {
    beforeEach(() => {
      game1 = {
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

      game2 = {
        user_id: 1,
        id: 2,
        channel_name: 'test name2',
        title: 'Test Game2',
        description: 'This is a test game2',
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
        number_of_winner: 1,
        created_at: '2023-08-05T12:34:56Z',
        updated_at: '2023-08-05T14:22:33Z'
      }

      const games = [game1, game2]

      wrapper = mount(MbqListGame, {
        props: {
          games: games
        }
      })
    })

    it('games are rendered', () => {
      const games = wrapper.findAllComponents({
        name: 'MbqCardGame'
      })
      expect(games.length).toBe(2)
    })
  })
})
