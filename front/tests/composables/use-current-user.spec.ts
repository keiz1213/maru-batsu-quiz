// @vitest-environment nuxt
import { vi, expect, it } from 'vitest'

afterEach(() => {
  vi.restoreAllMocks()
  const { clearCurrentUserStore } = useCurrentUser()
  clearCurrentUserStore()
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
    postUser: vi.fn()
  }
})

vi.mock('~/composables/use-firebase-auth', () => {
  return {
    useFirebaseAuth: mocks.useFirebaseAuth
  }
})

vi.mock('~/utils/api/services/user', async () => {
  const userService = (await vi.importActual(
    '~/utils/api/services/user'
  )) as Object
  return {
    ...userService,
    postUser: mocks.postUser
  }
})

it('default currentUser', () => {
  const defaultCurrentUser = {
    id: 0,
    uid: '',
    name: '',
    avatar_url: '',
    games: []
  }
  const { currentUser } = useCurrentUser()
  expect(currentUser.value).toEqual(defaultCurrentUser)
})

it('can set currentUser', () => {
  const authenticatedUser = {
    id: 1,
    uid: 'test',
    name: 'test user',
    avatar_url: 'https://avatars.githubusercontent.com/u/72614612?v=4',
    games: []
  }

  const { currentUser, setCurrentUserStore } = useCurrentUser()
  setCurrentUserStore(authenticatedUser)
  expect(currentUser.value).toEqual(authenticatedUser)
})

it('can clear currentUser', () => {
  const defaultCurrentUser = {
    id: 0,
    uid: '',
    name: '',
    avatar_url: '',
    games: []
  }

  const authenticatedUser = {
    id: 1,
    uid: 'test',
    name: 'test user',
    avatar_url: 'https://avatars.githubusercontent.com/u/72614612?v=4',
    games: []
  }

  const { currentUser, setCurrentUserStore, clearCurrentUserStore } =
    useCurrentUser()
  setCurrentUserStore(authenticatedUser)
  expect(currentUser.value).toEqual(authenticatedUser)
  clearCurrentUserStore()
  expect(currentUser.value).toEqual(defaultCurrentUser)
})

it('can be determined whether the user is the owner', () => {
  const game = {
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
      },
      {
        question: '3 + 3 = 4 ?',
        correct_answer: '✕',
        explanation: '普通に6です'
      }
    ],
    number_of_winner: 3,
    created_at: '2023-08-04T12:34:56Z',
    updated_at: '2023-08-04T14:22:33Z'
  }

  const owner = {
    id: 1,
    uid: 'test',
    name: 'test user',
    avatar_url: 'https://avatars.githubusercontent.com/u/72614612?v=4',
    games: [game]
  }

  const { setCurrentUserStore, isOwner } = useCurrentUser()
  setCurrentUserStore(owner)
  expect(isOwner(game)).toBeTruthy()
})

describe('checkCurrentUserStore', () => {
  describe('when loggedIn', () => {
    it('if the current user is the default current user, it can be reset.', () => {
      const defaultCurrentUser = {
        id: 0,
        uid: '',
        name: '',
        avatar_url: '',
        games: []
      }

      mocks.useFirebaseAuth.mockReturnValueOnce({
        user: vi.fn(),
        isLoggedIn: { value: true },
        firebaseLogin: vi.fn(),
        firebaseLogout: vi.fn(),
        checkAuthState: vi.fn(),
        firebaseWithdrawal: vi.fn()
      })

      const { checkCurrentUserStore, currentUser } = useCurrentUser()
      expect(currentUser.value).toEqual(defaultCurrentUser)
      checkCurrentUserStore()
      expect(mocks.postUser).toHaveBeenCalledOnce()
    })
  })
  describe('when not loggedIn', () => {
    it('can not reset current user', () => {
      mocks.useFirebaseAuth.mockReturnValueOnce({
        user: vi.fn(),
        isLoggedIn: { value: false },
        firebaseLogin: vi.fn(),
        firebaseLogout: vi.fn(),
        checkAuthState: vi.fn(),
        firebaseWithdrawal: vi.fn()
      })
      const { checkCurrentUserStore } = useCurrentUser()
      checkCurrentUserStore()
      expect(mocks.postUser).not.toHaveBeenCalledOnce()
    })
  })
})
