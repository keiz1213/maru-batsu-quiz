export default defineNuxtRouteMiddleware(async (to) => {
  const { checkAuthState, isLoggedIn, user } = useAuth()
  const { checkCurrentUserId } = useCurrentUserId()
  const { setRedirectPath } = useFriendlyForwarding()

  await checkAuthState()
  await checkCurrentUserId(user.value)

  if (!isLoggedIn.value) {
    setRedirectPath(to.fullPath)
    return navigateTo('/login')
  }
})
