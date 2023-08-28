export default defineNuxtRouteMiddleware(async (to) => {
  const { checkAuthState, isLoggedIn } = useFirebaseAuth()
  const { setRedirectPath } = useFriendlyForwarding()
  const { checkCurrentUserStore } = useCurrentUser()
  const { checkGamesStore } = useGame()

  await checkAuthState()
  await checkCurrentUserStore()
  await checkGamesStore()

  if (!isLoggedIn.value) {
    setRedirectPath(to.fullPath)
    return navigateTo('/login')
  }
})
