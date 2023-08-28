export default defineNuxtRouteMiddleware(async () => {
  const { checkAuthState, isLoggedIn } = useFirebaseAuth()

  await checkAuthState()
  if (isLoggedIn.value) {
    return navigateTo('/home')
  }
})
