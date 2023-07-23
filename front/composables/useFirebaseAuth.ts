import type { User } from 'firebase/auth'
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  reauthenticateWithCredential,
  deleteUser
} from 'firebase/auth'

export const useFirebaseAuth = () => {
  const auth = getAuth()
  const user = ref<User | null>(auth.currentUser)
  const isLoggedIn = computed(() => !!user.value)

  auth.onIdTokenChanged((authUser) => (user.value = authUser))

  const checkAuthState = async (): Promise<void> => {
    return await new Promise<void>((resolve) => {
      onAuthStateChanged(auth, (authUser) => {
        if (authUser) {
          user.value = authUser
          resolve()
        } else {
          user.value = null
          resolve()
        }
      })
    })
  }

  const firebaseLogin = async (): Promise<void> => {
    await signInWithPopup(auth, new GithubAuthProvider())
  }

  const firebaseLogout = async (): Promise<void> => {
    await firebaseSignOut(auth)
    user.value = null
  }

  const firebaseWithdrawal = async (): Promise<void> => {
    const result = await signInWithPopup(auth, new GithubAuthProvider())
    const credential = GithubAuthProvider.credentialFromResult(result)
    await reauthenticateWithCredential(user.value!, credential!)
    await deleteUser(user.value!)
    user.value = null
  }

  return {
    user,
    isLoggedIn,
    firebaseLogin,
    firebaseLogout,
    checkAuthState,
    firebaseWithdrawal
  }
}
