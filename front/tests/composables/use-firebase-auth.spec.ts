// @vitest-environment nuxt
import { vi, expect, it } from 'vitest'

afterEach(() => {
  vi.restoreAllMocks()
})

const mocks = vi.hoisted(() => {
  class MockedGithubAuthProvider {
    constructor() {}
  
    static credentialFromResult() {
      return 'mockedCredential'
    }
  }
  return {
    getAuth: vi.fn(() => {
      return {
        onIdTokenChanged: vi.fn()
      }
    }),
    signInWithPopup: vi.fn(),
    GithubAuthProvider: MockedGithubAuthProvider,
    signOut: vi.fn(),
    onAuthStateChanged: vi.fn(),
    reauthenticateWithCredential: vi.fn(),
    deleteUser: vi.fn()
  }
})

vi.mock('firebase/auth', async () => {
  const firebase = (await vi.importActual('firebase/auth')) as Object
  return {
    ...firebase,
    getAuth: mocks.getAuth,
    signInWithPopup: mocks.signInWithPopup,
    GithubAuthProvider: mocks.GithubAuthProvider,
    signOut: mocks.signOut,
    onAuthStateChanged: mocks.onAuthStateChanged,
    reauthenticateWithCredential: mocks.reauthenticateWithCredential,
    deleteUser: mocks.deleteUser
  }
})
describe('checkAuthState', () => {
  it('can keep authentication if logged in firebase', () => {
    const { checkAuthState } = useFirebaseAuth()
    checkAuthState()
    expect(mocks.getAuth).toHaveBeenCalledOnce()
    expect(mocks.onAuthStateChanged).toHaveBeenCalledOnce()
  })
})

describe('firebaseLogin', () => {
  it('can login to firebase', async () => {
    const { firebaseLogin } = useFirebaseAuth()
    await firebaseLogin()
    expect(mocks.getAuth).toHaveBeenCalledOnce()
    expect(mocks.signInWithPopup).toHaveBeenCalledOnce()
  })
})

describe('firebaseLogout', () => {
  it('can logout from firebase', async () => {
    const { firebaseLogout } = useFirebaseAuth()
    await firebaseLogout()
    expect(mocks.getAuth).toHaveBeenCalledOnce()
    expect(mocks.signOut).toHaveBeenCalledOnce()
  })
})

describe('firebaseWithdrawal', () => {
  it('can withdrawal from firebase', async () => {
    const { firebaseWithdrawal } = useFirebaseAuth()
    await firebaseWithdrawal()
    expect(mocks.getAuth).toHaveBeenCalledOnce()
    expect(mocks.signInWithPopup).toHaveBeenCalledOnce()
    expect(mocks.reauthenticateWithCredential).toHaveBeenCalledOnce()
    expect(mocks.deleteUser).toHaveBeenCalledOnce()
  })
})
