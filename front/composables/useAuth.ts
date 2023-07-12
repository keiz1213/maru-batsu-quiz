import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth'

export const useAuth = () => {
  const { currentUser, initializeCurrentUser, setCurrentUser, isLoggedIn } =
    useCurrentUser()
  const { setToast, notifyOnSpot } = useToast()
  const { isLoading, setLoading, unsetLoading } = useLoading()

  const githubLogin = async (): Promise<void> => {
    try {
      setLoading()
      const auth = getAuth()
      const provider = new GithubAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const firebaseToken = await result.user.getIdToken()
      const user = await getOrCreateUser(firebaseToken)
      setCurrentUser(user, firebaseToken)
      setToast('ログインしました！', 'success')
      navigateTo('/home')
    } catch {
      unsetLoading()
      notifyOnSpot('ログインに失敗しました', 'error')
    }
  }

  const signOut = async (): Promise<void> => {
    const auth = getAuth()
    await firebaseSignOut(auth)
    initializeCurrentUser()
    setToast('ログアウトしました！', 'success')
    navigateTo('/')
  }

  const checkAuthState = async (): Promise<void> => {
    return await new Promise<void>((resolve) => {
      const auth = getAuth()
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          console.log('只今login中ですので維持します by checkAuthState')
          const firebaseToken = await user.getIdToken()
          const loggedInUser = await getOrCreateUser(firebaseToken)
          setCurrentUser(loggedInUser, firebaseToken)
          resolve()
        } else {
          console.log('すでにlogoutしています by checkAuthState')
          initializeCurrentUser()
          resolve()
        }
      })
    })
  }

  return {
    githubLogin,
    signOut,
    checkAuthState,
    isLoggedIn,
    currentUser,
    isLoading
  }
}
