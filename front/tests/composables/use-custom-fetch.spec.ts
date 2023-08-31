// @vitest-environment nuxt
import { vi, expect, it } from 'vitest'

afterEach(() => {
  vi.restoreAllMocks()
})

const mocks = vi.hoisted(() => {
  return {
    useFetch: vi.fn(),
    useFirebaseAuth: vi.fn(() => {
      return {
        user: {},
        isLoggedIn: vi.fn(),
        firebaseLogin: vi.fn(),
        firebaseLogout: vi.fn(),
        checkAuthState: vi.fn(),
        firebaseWithdrawal: vi.fn()
      }
    })
  }
})

vi.mock('~/composables/use-firebase-auth', () => {
  return {
    useFirebaseAuth: mocks.useFirebaseAuth
  }
})

vi.mock('nuxt/app', async () => {
  const nuxt = (await vi.importActual('nuxt/app')) as Object
  return {
    ...nuxt,
    useFetch: mocks.useFetch
  }
})

describe('authenticatedUser', () => {
  it("can include the user's ID token in the request header when making a request", async () => {
    mocks.useFirebaseAuth.mockReturnValueOnce({
      user: {
        value: {
          getIdToken: () => 'testUserIdToken'
        }
      },
      isLoggedIn: vi.fn(),
      firebaseLogin: vi.fn(),
      firebaseLogout: vi.fn(),
      checkAuthState: vi.fn(),
      firebaseWithdrawal: vi.fn()
    })

    await useCustomFetch('/api/v1/users', {
      method: 'get'
    })

    const params = {
      baseURL: 'http://localhost:3000',
      headers: {
        authorization: 'Bearer testUserIdToken'
      },
      key: '/api/v1/users',
      method: 'get'
    }

    expect(mocks.useFetch).toHaveBeenCalledWith(
      '/api/v1/users',
      params,
      '$b6PA8iGh9P'
    )
  })
})

describe('unauthenticatedUser', () => {
  it("can not include the user's correct ID token in the request header when making a request", async () => {
    mocks.useFirebaseAuth.mockReturnValueOnce({
      user: {
        value: null
      },
      isLoggedIn: vi.fn(),
      firebaseLogin: vi.fn(),
      firebaseLogout: vi.fn(),
      checkAuthState: vi.fn(),
      firebaseWithdrawal: vi.fn()
    })

    await useCustomFetch('/api/v1/users', {
      method: 'get'
    })

    const params = {
      baseURL: 'http://localhost:3000',
      headers: {
        authorization: 'Bearer undefined'
      },
      key: '/api/v1/users',
      method: 'get'
    }

    expect(mocks.useFetch).toHaveBeenCalledWith(
      '/api/v1/users',
      params,
      '$b6PA8iGh9P'
    )
  })
})
