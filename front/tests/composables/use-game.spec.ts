// @vitest-environment nuxt
import { Game } from '~/types/game'
import { vi, expect, it } from 'vitest'

afterEach(() => {
  vi.restoreAllMocks()
  const { clearGamesStore } = useGame()
  clearGamesStore()
})

const mocks = vi.hoisted(() => {
  return {
    useFirebaseAuth: vi.fn(() => {
      return {
        user: vi.fn(),
        isLoggedIn: {},
        firebaseLogin: vi.fn(),
        firebaseLogout: vi.fn(),
        checkAuthState: vi.fn(),
        firebaseWithdrawal: vi.fn()
      }
    }),
    getCurrentUserGames: vi.fn()
  }
})

vi.mock('~/composables/use-firebase-auth', () => {
  return {
    useFirebaseAuth: mocks.useFirebaseAuth
  }
})

vi.mock('~/utils/api/services/game', async () => {
  const gameService = (await vi.importActual(
    '~/utils/api/services/game'
  )) as Object
  return {
    ...gameService,
    getCurrentUserGames: mocks.getCurrentUserGames
  }
})

const gamesOfUser = [
  {
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
  },
  {
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
] as Game[]

it('default games is empty', () => {
  const { games } = useGame()
  expect(games.value).toHaveLength(0)
})

it('can get a game from game store', () => {
  const { games, setGamesStore, getGameStore } = useGame()
  expect(games.value).toHaveLength(0)
  setGamesStore(gamesOfUser)
  expect(games.value).toHaveLength(2)
  const gameId = gamesOfUser[0].id as number
  const game = getGameStore(gameId) as Game
  expect(game.id).toBe(1)
})

it('can set games', () => {
  const { games, setGamesStore, getGameStore } = useGame()
  expect(games.value).toHaveLength(0)
  setGamesStore(gamesOfUser)
  expect(games.value).toHaveLength(2)
})

it('can clear games', () => {
  const { games, setGamesStore, clearGamesStore } = useGame()
  expect(games.value).toHaveLength(0)
  setGamesStore(gamesOfUser)
  expect(games.value).toHaveLength(2)
  clearGamesStore()
  expect(games.value).toHaveLength(0)
})

it('can reset games', () => {
  const { resetGamesStore } = useGame()
  resetGamesStore()
  expect(mocks.getCurrentUserGames).toHaveBeenCalledOnce()
})

describe('checkGamesStore', () => {
  describe('when loggedIn', () => {
    it('if games is empty, it can be reset.', () => {
      mocks.useFirebaseAuth.mockReturnValueOnce({
        user: vi.fn(),
        isLoggedIn: { value: true },
        firebaseLogin: vi.fn(),
        firebaseLogout: vi.fn(),
        checkAuthState: vi.fn(),
        firebaseWithdrawal: vi.fn()
      })

      const { games, checkGamesStore } = useGame()
      expect(games.value).toHaveLength(0)
      checkGamesStore()
      expect(mocks.getCurrentUserGames).toHaveBeenCalledOnce()
    })
  })
  describe('when not loggedIn', () => {
    it('can not reset games', () => {
      mocks.useFirebaseAuth.mockReturnValueOnce({
        user: vi.fn(),
        isLoggedIn: { value: false },
        firebaseLogin: vi.fn(),
        firebaseLogout: vi.fn(),
        checkAuthState: vi.fn(),
        firebaseWithdrawal: vi.fn()
      })
      const { games, checkGamesStore } = useGame()
      expect(games.value).toHaveLength(0)
      checkGamesStore()
      expect(mocks.getCurrentUserGames).not.toHaveBeenCalledOnce()
    })
  })
})
