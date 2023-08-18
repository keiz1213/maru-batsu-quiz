import { postUser, deleteUser } from '@/utils/api/services/user'

export const useAuth = () => {
  const { loading, setLoading, clearLoading } = useLoading()
  const { setToast, notifyOnSpot } = useToast()
  const { setCurrentUserId, clearCurrentUserId } = useCurrentUserId()
  const { redirectPath, clearRedirectPath, isForwarding } =
    useFriendlyForwarding()
  const {
    user,
    isLoggedIn,
    firebaseLogin,
    firebaseLogout,
    checkAuthState,
    firebaseWithdrawal
  } = useFirebaseAuth()

  const login = async () => {
    try {
      setLoading()
      await firebaseLogin()
      const receivedUser = await postUser()
      setCurrentUserId(receivedUser.id)
      setToast('ログインしました！', 'success')
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
      clearCurrentUserId()
      setToast('ログアウトしました！', 'success')
      navigateTo('/')
    } catch {
      clearLoading()
      notifyOnSpot('ログアウトに失敗しました', 'error')
    }
  }

  const withdrawal = async (userId: number) => {
    try {
      setLoading()
      await deleteUser(userId)
      clearCurrentUserId()
      await firebaseWithdrawal()
      navigateTo('/withdrawal')
    } catch {
      if (user.value) {
        await postUser()
      }
      clearLoading()
      notifyOnSpot('退会に失敗しました', 'error')
    }
  }

  return {
    user,
    isLoggedIn,
    checkAuthState,
    loading,
    login,
    logout,
    withdrawal
  }
}
