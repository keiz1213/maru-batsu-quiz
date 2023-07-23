export default defineNuxtRouteMiddleware(async () => {
  const { checkAuthState, isLoggedIn } = useAuth()

  await checkAuthState()
  if (isLoggedIn.value) {
    return navigateTo('/home')
  }
})
