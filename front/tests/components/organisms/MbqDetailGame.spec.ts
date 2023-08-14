// @vitest-environment nuxt

import { Game } from '~/types/game'
import { describe, it, expect } from 'vitest'
import { VueWrapper } from '@vue/test-utils'
import { mountSuspended } from 'nuxt-vitest/utils'
import MbqDetailGame from '~/components/organisms/MbqDetailGame.vue'

describe('MbqDetailGame', () => {
  let game: Game
  let wrapper: VueWrapper

  beforeEach(async () => {
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
          question: '2 + 2 = 4 ?',
          correct_answer: '◯',
          explanation: '普通に4です'
        }
      ],
      number_of_winner: 3,
      created_at: '2023-08-04T12:34:56Z',
      updated_at: '2023-08-04T14:22:33Z'
    }
    wrapper = await mountSuspended(MbqDetailGame, {
      props: {
        game: game
      }
    })
  })

  describe('render', () => {
    it('game title', () => {
      expect(wrapper.find('h1').text()).toBe(game.title)
    })

    it('game description', () => {
      expect(wrapper.find('#item-game-description').text()).toBe(
        game.description
      )
    })

    it('game quizzes', () => {
      expect(
        wrapper
          .findComponent({
            name: 'MbqTableQuiz'
          })
          .exists()
      ).toBeTruthy()
    })

    it('game number of winner', () => {
      expect(wrapper.find('#item-game-number-of-winner').text()).toBe('3')
    })

    it('game venue url', () => {
      const config = useRuntimeConfig()
      const frontUrl = config.public.frontURL
      const gameVenuePath = `/games/${game.id}/venue`
      const queryParams = new URLSearchParams({ title: game.title })
      const gameVenueUrl = `${frontUrl}${gameVenuePath}?${queryParams.toString()}`
      const venueUrl = wrapper.find('#item-game-venue-url')
      const trimmedURL = venueUrl.text().replace(/^Copied!/, '')
      expect(trimmedURL).toBe(gameVenueUrl)
    })
  })
})
