import { NotificationType } from '~/types/notificationType'
import { postUser, deleteUser } from '@/utils/api/services/user'

export const useAuth = () => {
  const { startLoading, stopLoading } = useLoading()
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
      startLoading()
      await firebaseLogin()
      await postUser()
      setToast('ログインしました！', NotificationType.Success)
      stopLoading()
      if (isForwarding()) {
        navigateTo(redirectPath.value)
        clearRedirectPath()
      } else {
        navigateTo('/home')
      }
    } catch {
      isLoggedIn.value ? await firebaseLogout() : null
      notifyOnSpot('ログインに失敗しました', NotificationType.Error)
      stopLoading()
    }
  }

  const logout = async () => {
    try {
      startLoading()
      await firebaseLogout()
      clearCurrentUserStore()
      clearGamesStore()
      setToast('ログアウトしました！', NotificationType.Success)
      navigateTo('/')
      stopLoading()
    } catch {
      notifyOnSpot('ログアウトに失敗しました', NotificationType.Error)
      stopLoading()
    }
  }

  const withdrawal = async (userId: number) => {
    try {
      startLoading()
      await deleteUser(userId)
      await firebaseWithdrawal()
      clearCurrentUserStore()
      clearGamesStore()
      navigateTo('/withdrawal')
      stopLoading()
    } catch {
      user.value ? await postUser() : null
      notifyOnSpot('退会に失敗しました', NotificationType.Error)
      stopLoading()
    }
  }

  return {
    login,
    logout,
    withdrawal
  }
}
