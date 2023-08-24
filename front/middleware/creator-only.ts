export default defineNuxtRouteMiddleware(async (to) => {
  const { isOwner } = useCurrentUser()
  const { getGameStore } = useGame()
  const gameId = to.params.id as string
  const game = getGameStore(parseInt(gameId))
  if (!isOwner(game)) {
    return navigateTo('/home')
  }
})
