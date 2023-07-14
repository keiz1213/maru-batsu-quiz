export default defineNuxtRouteMiddleware(async (to, from) => {
  const { checkAuthState, isLoggedIn, isGameOwner } = useAuth()
  const { setRedirectPath } = useRedirectPath()

  const gameIdRegex = /^\/games\/(\d+)$/

  await checkAuthState()

  if (!isLoggedIn()) {
    setRedirectPath(to.fullPath)
    return navigateTo('/login')
  }

  if (gameIdRegex.test(to.fullPath)) {
    const gameId = to.params.id as string
    const ownerId = (await getGame(gameId)).user_id as number
    if (!isGameOwner(ownerId)) {
      return navigateTo('/home')
    }
  }
})
