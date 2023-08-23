import { getGame } from '~/utils/api/services/game'
import { getUser } from '~/utils/api/services/user'
import SkywayChannel from '~/utils/class/SkywayChannel'

export default defineNuxtRouteMiddleware(async (to) => {
  const { currentUserId, isGameOwner } = useCurrentUserId()
  const { setToast } = useToast()
  const { visible } = useChat()

  const gameId = to.params.id as string
  const game = await getGame(gameId)
  const user = await getUser(currentUserId.value)
  const ownerId = game.user_id!
  const skywayChannel = new SkywayChannel(user, game)
  const channel = await skywayChannel.findChannel()

  if (isGameOwner(ownerId)) {
    if (skywayChannel.isOwnerEnterable(channel)) {
      if (localStorage.getItem('chat')) {
        visible()
      }
      return
    } else {
      setToast(
        '参加者がまだ残っています。参加者が退出してから入室してください。',
        'error'
      )
      return navigateTo('/home')
    }
  } else if (skywayChannel.isPlayerEnterable(channel)) {
    if (skywayChannel.isChatEnabled(channel)) {
      visible()
    }
    return
  } else {
    setToast(
      '主催者がまだ入室していないか、既にゲームが始まっています。',
      'error'
    )
    return navigateTo('/home')
  }
})
