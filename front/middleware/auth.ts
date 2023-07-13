export default defineNuxtRouteMiddleware(async (to, from) => {
  const { checkAuthState, isLoggedIn } = useAuth()
  const { setRedirectPath } = useRedirectPath()

  await checkAuthState()

  if (!isLoggedIn()) {
    setRedirectPath(to.fullPath)
    return navigateTo('/login')
  }
})
