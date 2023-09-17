// @vitest-environment nuxt
import { NotificationType } from "~/types/notificationType"
import { vi, expect, it } from 'vitest'

afterEach(() => {
  vi.restoreAllMocks()
})

const mocks = vi.hoisted(() => {
  return {
    setLoading: vi.fn(),
    clearLoading: vi.fn(),
    setToast: vi.fn(),
    notifyOnSpot: vi.fn(),
    currentUser: vi.fn(),
    clearCurrentUserStore: vi.fn(),
    checkCurrentUserStore: vi.fn(),
    clearGamesStore: vi.fn(),
    checkGamesStore: vi.fn(),
    value: vi.fn(),
    isLoggedIn: vi.fn(),
    firebaseLogin: vi.fn(),
    firebaseLogout: vi.fn(),
    checkAuthState: vi.fn(),
    firebaseWithdrawal: vi.fn(),
    postUser: vi.fn(),
    deleteUser: vi.fn(),
    navigateTo: vi.fn()
  }
})

vi.mock('~/composables/use-loading', () => {
  return {
    useLoading: () => {
      return {
        setLoading: mocks.setLoading,
        clearLoading: mocks.clearLoading
      }
    }
  }
})

vi.mock('~/composables/use-toast', () => {
  return {
    useToast: () => {
      return {
        setToast: mocks.setToast,
        notifyOnSpot: mocks.notifyOnSpot
      }
    }
  }
})

vi.mock('~/composables/use-game', () => {
  return {
    useGame: () => {
      return {
        clearGamesStore: mocks.clearGamesStore,
        checkGamesStore: mocks.checkGamesStore
      }
    }
  }
})

vi.mock('~/composables/use-firebase-auth', () => {
  return {
    useFirebaseAuth: () => {
      return {
        user: {
          value: mocks.value
        },
        isLoggedIn: mocks.isLoggedIn,
        firebaseLogin: mocks.firebaseLogin,
        firebaseLogout: mocks.firebaseLogout,
        checkAuthState: mocks.checkAuthState,
        firebaseWithdrawal: mocks.firebaseWithdrawal
      }
    }
  }
})

vi.mock('~/composables/use-current-user', () => {
  return {
    useCurrentUser: () => {
      return {
        currentUser: mocks.currentUser,
        clearCurrentUserStore: mocks.clearCurrentUserStore,
        checkCurrentUserStore: mocks.checkCurrentUserStore
      }
    }
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

vi.mock('nuxt/app', async () => {
  const nuxt = (await vi.importActual('nuxt/app')) as Object
  return {
    ...nuxt,
    navigateTo: mocks.navigateTo
  }
})

describe('login', () => {
  it('can login', async () => {
    const { login } = useAuth()
    await login()

    expect(mocks.setLoading).toHaveBeenCalledOnce()
    expect(mocks.firebaseLogin).toHaveBeenCalledOnce()
    expect(mocks.postUser).toHaveBeenCalledOnce()
    expect(mocks.clearLoading).toHaveBeenCalledOnce()
    expect(mocks.setToast).toHaveBeenCalledWith('ログインしました！', NotificationType.Success)
  })

  it('if Firebase Login fails, user should not be able to login', async () => {
    mocks.firebaseLogin.mockRejectedValueOnce(new Error())
    const { login } = useAuth()
    await login()

    expect(mocks.setLoading).toHaveBeenCalledOnce()
    expect(mocks.firebaseLogin).toHaveBeenCalledOnce()
    expect(mocks.clearLoading).toHaveBeenCalledOnce()
    expect(mocks.notifyOnSpot).toHaveBeenCalledWith(
      'ログインに失敗しました',
      NotificationType.Error
    )
  })

  it('if Post User fails, user should not be able to login', async () => {
    mocks.postUser.mockRejectedValueOnce(new Error())
    const { login } = useAuth()
    await login()

    expect(mocks.setLoading).toHaveBeenCalledOnce()
    expect(mocks.firebaseLogin).toHaveBeenCalledOnce()
    expect(mocks.clearLoading).toHaveBeenCalledOnce()
    expect(mocks.notifyOnSpot).toHaveBeenCalledWith(
      'ログインに失敗しました',
      NotificationType.Error
    )
  })

  it('if the user attempts to visit a specific page, they will be redirected there after logging in.', async () => {
    const { login } = useAuth()
    const { setRedirectPath } = useFriendlyForwarding()
    setRedirectPath('/games/1')
    await login()

    expect(mocks.setLoading).toHaveBeenCalledOnce()
    expect(mocks.firebaseLogin).toHaveBeenCalledOnce()
    expect(mocks.postUser).toHaveBeenCalledOnce()
    expect(mocks.clearLoading).toHaveBeenCalledOnce()
    expect(mocks.setToast).toHaveBeenCalledWith('ログインしました！', NotificationType.Success)
    expect(mocks.navigateTo).toHaveBeenCalledWith('/games/1')
  })
})

describe('logout', () => {
  it('can logout', async () => {
    const { logout } = useAuth()
    await logout()

    expect(mocks.setLoading).toHaveBeenCalledOnce()
    expect(mocks.firebaseLogout).toHaveBeenCalledOnce()
    expect(mocks.clearCurrentUserStore).toHaveBeenCalledOnce()
    expect(mocks.clearGamesStore).toHaveBeenCalledOnce()
    expect(mocks.clearLoading).toHaveBeenCalledOnce()
    expect(mocks.navigateTo).toHaveBeenCalledWith('/')
    expect(mocks.setToast).toHaveBeenCalledWith(
      'ログアウトしました！',
      NotificationType.Success
    )
  })

  it('if Firebase Logout fails, user should not be able to logout', async () => {
    mocks.firebaseLogout.mockRejectedValueOnce(new Error())
    const { logout } = useAuth()
    await logout()

    expect(mocks.setLoading).toHaveBeenCalledOnce()
    expect(mocks.firebaseLogout).toHaveBeenCalledOnce()
    expect(mocks.clearCurrentUserStore).not.toHaveBeenCalledOnce()
    expect(mocks.clearGamesStore).not.toHaveBeenCalledOnce()
    expect(mocks.clearLoading).toHaveBeenCalledOnce()
    expect(mocks.navigateTo).not.toHaveBeenCalledOnce()
    expect(mocks.notifyOnSpot).toHaveBeenCalledWith(
      'ログアウトに失敗しました',
      NotificationType.Error
    )
  })
})

describe('withdrawal', () => {
  it('can withdrawal', async () => {
    const { withdrawal } = useAuth()
    const userId = 1

    await withdrawal(userId)
    expect(mocks.setLoading).toHaveBeenCalledOnce()
    expect(mocks.deleteUser).toHaveBeenCalledWith(userId)
    expect(mocks.firebaseWithdrawal).toHaveBeenCalledOnce()
    expect(mocks.clearCurrentUserStore).toHaveBeenCalledOnce()
    expect(mocks.clearGamesStore).toHaveBeenCalledOnce()
    expect(mocks.navigateTo).toHaveBeenCalledWith('/withdrawal')
    expect(mocks.clearLoading).toHaveBeenCalledOnce()
  })

  it('if Firebase Withdrawal fails, user should not be able to withdrawal', async () => {
    mocks.firebaseWithdrawal.mockRejectedValueOnce(new Error())
    mocks.value.mockReturnValueOnce(true)
    const { withdrawal } = useAuth()
    const userId = 1

    await withdrawal(userId)
    expect(mocks.setLoading).toHaveBeenCalledOnce()
    expect(mocks.deleteUser).toHaveBeenCalledWith(userId)
    expect(mocks.firebaseWithdrawal).toHaveBeenCalledOnce()
    expect(mocks.clearCurrentUserStore).not.toHaveBeenCalledOnce()
    expect(mocks.clearGamesStore).not.toHaveBeenCalledOnce()
    expect(mocks.clearLoading).toHaveBeenCalledOnce()
    expect(mocks.navigateTo).not.toHaveBeenCalledWith('/withdrawal')
    expect(mocks.postUser).toHaveBeenCalledOnce()
    expect(mocks.notifyOnSpot).toHaveBeenCalledWith(
      '退会に失敗しました',
      NotificationType.Error
    )
  })

  it('if Delete User fails, user should not be able to withdrawal', async () => {
    mocks.deleteUser.mockRejectedValue(new Error())
    const { withdrawal } = useAuth()
    const userId = 1

    await withdrawal(userId)
    expect(mocks.setLoading).toHaveBeenCalledOnce()
    expect(mocks.deleteUser).toHaveBeenCalledWith(userId)
    expect(mocks.firebaseWithdrawal).not.toHaveBeenCalledOnce()
    expect(mocks.clearCurrentUserStore).not.toHaveBeenCalledOnce()
    expect(mocks.clearGamesStore).not.toHaveBeenCalledOnce()
    expect(mocks.clearLoading).toHaveBeenCalledOnce()
    expect(mocks.notifyOnSpot).toHaveBeenCalledWith(
      '退会に失敗しました',
      NotificationType.Error
    )
  })
})
