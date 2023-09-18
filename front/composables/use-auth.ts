import { NotificationType } from '~/types/notificationType'
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
      setToast('ログインしました！', NotificationType.Success)
      clearLoading()
      if (isForwarding()) {
        navigateTo(redirectPath.value)
        clearRedirectPath()
      } else {
        navigateTo('/home')
      }
    } catch {
      isLoggedIn.value ? await firebaseLogout() : null
      clearLoading()
      notifyOnSpot('ログインに失敗しました', NotificationType.Error)
    }
  }

  const logout = async () => {
    try {
      setLoading()
      await firebaseLogout()
      clearCurrentUserStore()
      clearGamesStore()
      setToast('ログアウトしました！', NotificationType.Success)
      navigateTo('/')
      clearLoading()
    } catch {
      clearLoading()
      notifyOnSpot('ログアウトに失敗しました', NotificationType.Error)
    }
  }

  const withdrawal = async (userId: number) => {
    try {
      setLoading()
      await deleteUser(userId)
      await firebaseWithdrawal()
      clearCurrentUserStore()
      clearGamesStore()
      navigateTo('/withdrawal')
      clearLoading()
    } catch {
      user.value ? await postUser() : null
      clearLoading()
      notifyOnSpot('退会に失敗しました', NotificationType.Error)
    }
  }

  return {
    login,
    logout,
    withdrawal
  }
}
