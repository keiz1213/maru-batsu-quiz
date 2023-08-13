import { getGame } from '@/utils/api/services/game'

export default defineNuxtRouteMiddleware(async (to) => {
  // const { isGameOwner } = useCurrentUserId()
  // const gameId = to.params.id as string
  // const game = await getGame(gameId)
  // const ownerId = game.user_id!
  // if (!isGameOwner(ownerId)) {
  //   return navigateTo('/home')
  // }
})
