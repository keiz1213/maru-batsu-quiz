// @vitest-environment nuxt
import { vi, expect, it } from 'vitest'

afterEach(() => {
  vi.restoreAllMocks()
})

const mocks = vi.hoisted(() => {
  return {
    getAuth: vi.fn(() => {
      return {
        onIdTokenChanged: vi.fn()
      }
    }),
    signInWithPopup: vi.fn(),
    GithubAuthProvider: vi.fn(),
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

it('checkAuthState', () => {
  const { checkAuthState } = useFirebaseAuth()
  checkAuthState()
  expect(mocks.getAuth).toHaveBeenCalledOnce()
  expect(mocks.onAuthStateChanged).toHaveBeenCalledOnce()
})

it('firebaseLogin', () => {
  const { firebaseLogin } = useFirebaseAuth()
  firebaseLogin()
  expect(mocks.getAuth).toHaveBeenCalledOnce()
  expect(mocks.GithubAuthProvider).toHaveBeenCalledOnce()
  expect(mocks.signInWithPopup).toHaveBeenCalledOnce()
})

it('firebaseLogout', () => {
  const { firebaseLogout } = useFirebaseAuth()
  firebaseLogout()
  expect(mocks.getAuth).toHaveBeenCalledOnce()
  expect(mocks.signOut).toHaveBeenCalledOnce()
})
// TO DO
it('firebaseWithdrawal', () => {
  // const { firebaseWithdrawal } = useFirebaseAuth()
  // firebaseWithdrawal()
})
