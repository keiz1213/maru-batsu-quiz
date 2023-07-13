export default defineNuxtRouteMiddleware(async () => {
  const { checkAuthState, isLoggedIn } = useAuth()

  await checkAuthState()
  if (isLoggedIn()) {
    return navigateTo('/home')
  }
})
