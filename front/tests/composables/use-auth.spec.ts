// @vitest-environment nuxt
import { vi, expect, it } from 'vitest'
import { useLoading } from '~/composables/use-loading'
import { useAuth } from '~/composables/use-auth'
import { postUser, deleteUser } from '@/utils/api/services/user'

afterEach(() => {
  vi.restoreAllMocks()
})

beforeEach(() => {
  mocks.useLoading.mockReturnValue({
    setLoading: vi.fn(),
    clearLoading: vi.fn()
  })

  mocks.useToast.mockReturnValue({
    setToast: vi.fn(),
    notifyOnSpot: vi.fn()
  })

  mocks.useCurrentUser.mockReturnValue({
    currentUser: vi.fn(),
    clearCurrentUserStore: vi.fn(),
    checkCurrentUserStore: vi.fn()
  })

  mocks.useGame.mockReturnValue({
    clearGamesStore: vi.fn(),
    checkGamesStore: vi.fn()
  })
})

const mocks = vi.hoisted(() => {
  return {
    useLoading: vi.fn(() => {
      return {
        setLoading: vi.fn(),
        clearLoading: vi.fn()
      }
    }),
    useToast: vi.fn(() => {
      return {
        setToast: vi.fn(),
        notifyOnSpot: vi.fn()
      }
    }),
    useCurrentUser: vi.fn(() => {
      return {
        currentUser: vi.fn(),
        clearCurrentUserStore: vi.fn(),
        checkCurrentUserStore: vi.fn()
      }
    }),
    useGame: vi.fn(() => {
      return {
        clearGamesStore: vi.fn(),
        checkGamesStore: vi.fn()
      }
    }),
    useFirebaseAuth: vi.fn(() => {
      return {
        user: vi.fn(),
        isLoggedIn: vi.fn(),
        firebaseLogin: vi.fn(),
        firebaseLogout: vi.fn(),
        checkAuthState: vi.fn(),
        firebaseWithdrawal: vi.fn()
      }
    }),
    postUser: vi.fn(),
    deleteUser: vi.fn()
  }
})

vi.mock('~/composables/use-loading', () => {
  return {
    useLoading: mocks.useLoading
  }
})

vi.mock('~/composables/use-toast', () => {
  return {
    useToast: mocks.useToast
  }
})

vi.mock('~/composables/use-game', () => {
  return {
    useGame: mocks.useGame
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
    postUser: mocks.postUser,
    deleteUser: mocks.deleteUser
  }
})

vi.mock('~/composables/use-current-user', () => {
  return {
    useCurrentUser: mocks.useCurrentUser
  }
})

describe('login', () => {
  it('can login', async () => {
    mocks.useFirebaseAuth.mockReturnValue({
      user: vi.fn(),
      isLoggedIn: vi.fn(),
      firebaseLogin: vi.fn(),
      firebaseLogout: vi.fn(),
      checkAuthState: vi.fn(),
      firebaseWithdrawal: vi.fn()
    })

    const { setLoading, clearLoading } = useLoading()
    const { setToast } = useToast()
    const { firebaseLogin } = useFirebaseAuth()
    const { login } = useAuth()
    await login()

    expect(setLoading).toHaveBeenCalledOnce()
    expect(firebaseLogin).toHaveBeenCalledOnce()
    expect(postUser).toHaveBeenCalledOnce()
    expect(clearLoading).toHaveBeenCalledOnce()
    expect(setToast).toHaveBeenCalledWith('ログインしました！', 'success')
  })

  it('if Firebase Login fails, user should not be able to login', async () => {
    mocks.useFirebaseAuth.mockReturnValue({
      user: vi.fn(),
      isLoggedIn: vi.fn(),
      firebaseLogin: vi.fn().mockRejectedValue(new Error()),
      firebaseLogout: vi.fn(),
      checkAuthState: vi.fn(),
      firebaseWithdrawal: vi.fn()
    })
    const { setLoading, clearLoading } = useLoading()
    const { notifyOnSpot } = useToast()
    const { firebaseLogin } = useFirebaseAuth()
    const { login } = useAuth()
    await login()

    expect(setLoading).toHaveBeenCalledOnce()
    expect(firebaseLogin).toHaveBeenCalledOnce()
    expect(clearLoading).toHaveBeenCalledOnce()
    expect(notifyOnSpot).toHaveBeenCalledWith('ログインに失敗しました', 'error')
  })

  it('if Post User fails, user should not be able to login', async () => {
    mocks.useFirebaseAuth.mockReturnValue({
      user: vi.fn(),
      isLoggedIn: vi.fn(),
      firebaseLogin: vi.fn(),
      firebaseLogout: vi.fn(),
      checkAuthState: vi.fn(),
      firebaseWithdrawal: vi.fn()
    })

    mocks.postUser.mockRejectedValue(new Error())

    const { setLoading, clearLoading } = useLoading()
    const { notifyOnSpot } = useToast()
    const { firebaseLogin } = useFirebaseAuth()
    const { login } = useAuth()
    await login()

    expect(setLoading).toHaveBeenCalledOnce()
    expect(firebaseLogin).toHaveBeenCalledOnce()
    expect(clearLoading).toHaveBeenCalledOnce()
    expect(notifyOnSpot).toHaveBeenCalledWith('ログインに失敗しました', 'error')
  })
})

describe('logout', () => {
  it('can logout', async () => {
    mocks.useFirebaseAuth.mockReturnValue({
      user: vi.fn(),
      isLoggedIn: vi.fn(),
      firebaseLogin: vi.fn(),
      firebaseLogout: vi.fn(),
      checkAuthState: vi.fn(),
      firebaseWithdrawal: vi.fn()
    })

    const { setLoading, clearLoading } = useLoading()
    const { setToast } = useToast()
    const { clearCurrentUserStore } = useCurrentUser()
    const { clearGamesStore } = useGame()
    const { firebaseLogout } = useFirebaseAuth()
    const { logout } = useAuth()
    await logout()

    expect(setLoading).toHaveBeenCalledOnce()
    expect(firebaseLogout).toHaveBeenCalledOnce()
    expect(clearCurrentUserStore).toHaveBeenCalledOnce()
    expect(clearGamesStore).toHaveBeenCalledOnce()
    expect(clearLoading).toHaveBeenCalledOnce()
    expect(setToast).toHaveBeenCalledWith('ログアウトしました！', 'success')
  })

  it('if Firebase Logout fails, user should not be able to logout', async () => {
    mocks.useFirebaseAuth.mockReturnValue({
      user: vi.fn(),
      isLoggedIn: vi.fn(),
      firebaseLogin: vi.fn(),
      firebaseLogout: vi.fn().mockRejectedValue(new Error()),
      checkAuthState: vi.fn(),
      firebaseWithdrawal: vi.fn()
    })

    const { clearLoading } = useLoading()
    const { notifyOnSpot } = useToast()
    const { firebaseLogout } = useFirebaseAuth()
    const { clearCurrentUserStore } = useCurrentUser()
    const { clearGamesStore } = useGame()
    const { logout } = useAuth()
    await logout()

    expect(clearLoading).toHaveBeenCalledOnce()
    expect(firebaseLogout).toHaveBeenCalledOnce()
    expect(clearCurrentUserStore).not.toHaveBeenCalledOnce()
    expect(clearGamesStore).not.toHaveBeenCalledOnce()
    expect(clearLoading).toHaveBeenCalledOnce()
    expect(notifyOnSpot).toHaveBeenCalledWith(
      'ログアウトに失敗しました',
      'error'
    )
  })
})

describe('withdrawal', () => {
  it('can withdrawal', async () => {
    mocks.useFirebaseAuth.mockReturnValue({
      user: vi.fn(),
      isLoggedIn: vi.fn(),
      firebaseLogin: vi.fn(),
      firebaseLogout: vi.fn(),
      checkAuthState: vi.fn(),
      firebaseWithdrawal: vi.fn()
    })

    const { setLoading, clearLoading } = useLoading()
    const { firebaseWithdrawal } = useFirebaseAuth()
    const { clearCurrentUserStore } = useCurrentUser()
    const { clearGamesStore } = useGame()
    const { withdrawal } = useAuth()
    const userId = 1

    await withdrawal(userId)
    expect(setLoading).toHaveBeenCalledOnce()
    expect(deleteUser).toHaveBeenCalledOnce()
    expect(firebaseWithdrawal).toHaveBeenCalledOnce()
    expect(clearCurrentUserStore).toHaveBeenCalledOnce()
    expect(clearGamesStore).toHaveBeenCalledOnce()
    expect(clearLoading).toHaveBeenCalledOnce()
  })

  it('if Firebase Withdrawal fails, user should not be able to withdrawal', async () => {
    mocks.useFirebaseAuth.mockReturnValue({
      user: vi.fn(),
      isLoggedIn: vi.fn(),
      firebaseLogin: vi.fn(),
      firebaseLogout: vi.fn(),
      checkAuthState: vi.fn(),
      firebaseWithdrawal: vi.fn().mockRejectedValue(new Error())
    })

    const { setLoading, clearLoading } = useLoading()
    const { firebaseWithdrawal } = useFirebaseAuth()
    const { clearCurrentUserStore } = useCurrentUser()
    const { clearGamesStore } = useGame()
    const { withdrawal } = useAuth()
    const userId = 1

    await withdrawal(userId)
    expect(setLoading).toHaveBeenCalledOnce()
    expect(deleteUser).toHaveBeenCalledOnce()
    expect(firebaseWithdrawal).toHaveBeenCalledOnce()
    expect(clearCurrentUserStore).not.toHaveBeenCalledOnce()
    expect(clearGamesStore).not.toHaveBeenCalledOnce()
    expect(clearLoading).toHaveBeenCalledOnce()
  })
  it('if Delete User fails, user should not be able to withdrawal', async () => {
    mocks.useFirebaseAuth.mockReturnValue({
      user: vi.fn(),
      isLoggedIn: vi.fn(),
      firebaseLogin: vi.fn(),
      firebaseLogout: vi.fn(),
      checkAuthState: vi.fn(),
      firebaseWithdrawal: vi.fn().mockRejectedValue(new Error())
    })

    mocks.deleteUser.mockRejectedValue(new Error())

    const { setLoading, clearLoading } = useLoading()
    const { firebaseWithdrawal } = useFirebaseAuth()
    const { clearCurrentUserStore } = useCurrentUser()
    const { clearGamesStore } = useGame()
    const { withdrawal } = useAuth()
    const userId = 1

    await withdrawal(userId)
    expect(setLoading).toHaveBeenCalledOnce()
    expect(deleteUser).toHaveBeenCalledOnce()
    expect(firebaseWithdrawal).not.toHaveBeenCalledOnce()
    expect(clearCurrentUserStore).not.toHaveBeenCalledOnce()
    expect(clearGamesStore).not.toHaveBeenCalledOnce()
    expect(clearLoading).toHaveBeenCalledOnce()
  })
})
