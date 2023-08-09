import { getGames } from '~/utils/api/services/game'
import { getGame } from '~/utils/api/services/game'
import { postGame } from '~/utils/api/services/game'
import { putGame } from '~/utils/api/services/game'
import { deleteGame } from '~/utils/api/services/game'
import { describe, it, expect, vi } from 'vitest'

describe('game', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  const mocks = vi.hoisted(() => {
    return {
      useCustomFetch: vi.fn()
    }
  })

  const game1 = {
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

  const game2 = {
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

  vi.mock('~/composables/useCustomFetch', () => {
    return {
      useCustomFetch: mocks.useCustomFetch
    }
  })

  describe('getGames', () => {
    it("fetch current user's games", async () => {
      mocks.useCustomFetch.mockReturnValueOnce({
        data: { value: games },
        error: { value: false }
      })

      const result = await getGames()
      expect(result[1]).toEqual(games[1])
      expect(mocks.useCustomFetch).toHaveBeenCalledWith(
        '/api/v1/current_user/games',
        { method: 'get' }
      )
    })

    it('throw error', async () => {
      mocks.useCustomFetch.mockReturnValueOnce({ error: { value: true } })
      await expect(getGames()).rejects.toThrow(Error)
      expect(mocks.useCustomFetch).toHaveBeenCalledWith(
        '/api/v1/current_user/games',
        { method: 'get' }
      )
    })
  })

  describe('getGame', () => {
    it('fetch game', async () => {
      mocks.useCustomFetch.mockReturnValueOnce({
        data: { value: game1 },
        error: { value: false }
      })

      const result = await getGame(game1.id)
      expect(result).toEqual(game1)
      expect(mocks.useCustomFetch).toHaveBeenCalledWith(
        `/api/v1/games/${game1.id}`,
        { method: 'get' }
      )
    })

    it('throw error', async () => {
      mocks.useCustomFetch.mockReturnValueOnce({ error: { value: true } })
      await expect(getGame(1)).rejects.toThrow(Error)
      expect(mocks.useCustomFetch).toHaveBeenCalledWith(
        `/api/v1/games/${game1.id}`,
        { method: 'get' }
      )
    })
  })

  describe('postGame', () => {
    it('post game', async () => {
      mocks.useCustomFetch.mockReturnValueOnce({
        data: { value: game1 },
        error: { value: false }
      })
      const userId = 1
      const result = await postGame(userId, game1)
      expect(result).toEqual(game1)
      expect(mocks.useCustomFetch).toHaveBeenCalledWith(
        `/api/v1/games/`,
        expect.objectContaining({
          method: 'post',
          headers: { 'Content-Type': 'application/json' }
        })
      )
    })

    it('throw error', async () => {
      mocks.useCustomFetch.mockReturnValueOnce({ error: { value: true } })
      const userId = 1
      await expect(postGame(userId, game1)).rejects.toThrow(Error)
      expect(mocks.useCustomFetch).toHaveBeenCalledWith(
        `/api/v1/games/`,
        expect.objectContaining({
          method: 'post',
          headers: { 'Content-Type': 'application/json' }
        })
      )
    })
  })

  describe('putGame', () => {
    it('put game', async () => {
      mocks.useCustomFetch.mockReturnValueOnce({
        data: { value: game1 },
        error: { value: false }
      })
      const result = await putGame(game1)
      expect(result).toEqual(game1)
      expect(mocks.useCustomFetch).toHaveBeenCalledWith(
        `/api/v1/games/${game1.id}`,
        expect.objectContaining({
          method: 'put',
          headers: { 'Content-Type': 'application/json' }
        })
      )
    })

    it('throw error', async () => {
      mocks.useCustomFetch.mockReturnValueOnce({ error: { value: true } })
      const userId = 1
      await expect(putGame(game1)).rejects.toThrow(Error)
      expect(mocks.useCustomFetch).toHaveBeenCalledWith(
        `/api/v1/games/${game1.id}`,
        expect.objectContaining({
          method: 'put',
          headers: { 'Content-Type': 'application/json' }
        })
      )
    })
  })

  describe('deleteGame', () => {
    it('delete game', async () => {
      mocks.useCustomFetch.mockReturnValueOnce({
        error: { value: false }
      })
      await deleteGame(game1.id)
      expect(mocks.useCustomFetch).toHaveBeenCalledWith(
        `/api/v1/games/${game1.id}`,
        expect.objectContaining({
          method: 'delete'
        })
      )
    })

    it('throw error', async () => {
      mocks.useCustomFetch.mockReturnValueOnce({ error: { value: true } })
      await expect(deleteGame(game1.id)).rejects.toThrow(Error)
      expect(mocks.useCustomFetch).toHaveBeenCalledWith(
        `/api/v1/games/${game1.id}`,
        expect.objectContaining({
          method: 'delete'
        })
      )
    })
  })
})
