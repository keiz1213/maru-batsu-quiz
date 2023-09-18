import { NotificationType } from '~/types/notificationType'
import { getGame } from '~/utils/api/services/game'
import SkywayChannel from '~/utils/class/SkywayChannel'

export default defineNuxtRouteMiddleware(async (to) => {
  const { currentUser, isOwner } = useCurrentUser()
  const { setToast } = useToast()
  const { visible } = useChat()

  const gameId = to.params.id as string
  const game = await getGame(gameId)
  const skywayChannel = new SkywayChannel(currentUser.value, game)
  const channel = await skywayChannel.findChannel()

  if (isOwner(game)) {
    if (skywayChannel.isOwnerEnterable(channel)) {
      if (localStorage.getItem('chat')) {
        visible()
      }
      return
    } else {
      setToast(
        '参加者がまだ残っています。参加者が退出してから入室してください。',
        NotificationType.Error
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
      NotificationType.Error
    )
    return navigateTo('/home')
  }
})
