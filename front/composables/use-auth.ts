import { postUser, deleteUser } from '@/utils/api/services/user'

export const useAuth = () => {
  const { setLoading, clearLoading } = useLoading()
  const { setToast, notifyOnSpot } = useToast()
  const { clearCurrentUserStore } = useCurrentUser()
  const { clearGamesStore } = useGame()
  const { redirectPath, clearRedirectPath, isForwarding } =
    useFriendlyForwarding()
  const {
    user,
    isLoggedIn,
    firebaseLogin,
    firebaseLogout,
    firebaseWithdrawal
  } = useFirebaseAuth()

  const login = async () => {
    try {
      setLoading()
      await firebaseLogin()
      await postUser()
      setToast('ログインしました！', 'success')
      clearLoading()
      if (isForwarding.value) {
        navigateTo(redirectPath.value)
        clearRedirectPath()
      } else {
        navigateTo('/home')
      }
    } catch {
      isLoggedIn.value ? await firebaseLogout() : null
      clearLoading()
      notifyOnSpot('ログインに失敗しました', 'error')
    }
  }

  const logout = async () => {
    try {
      setLoading()
      await firebaseLogout()
      clearCurrentUserStore()
      clearGamesStore()
      setToast('ログアウトしました！', 'success')
      navigateTo('/')
      clearLoading()
    } catch {
      clearLoading()
      notifyOnSpot('ログアウトに失敗しました', 'error')
    }
  }

  const withdrawal = async (userId: number) => {
    try {
      setLoading()
      await deleteUser(userId)
      clearCurrentUserStore()
      clearGamesStore()
      await firebaseWithdrawal()
      navigateTo('/withdrawal')
      clearLoading()
    } catch {
      user.value ? await postUser() : null
      clearLoading()
      notifyOnSpot('退会に失敗しました', 'error')
    }
  }

  return {
    login,
    logout,
    withdrawal,
  }
}
