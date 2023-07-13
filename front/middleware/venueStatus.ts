export default defineNuxtRouteMiddleware(async (to) => {
  const { checkAuthState, isLoggedIn, currentUser } = useAuth()
  const { setToast } = useToast()
  const { setRedirectPath } = useRedirectPath()

  await checkAuthState()

  if (!isLoggedIn()) {
    setRedirectPath(to.fullPath)
    return navigateTo('/login')
  }

  const skyWayToken = await SkyWay.getSkyWayToken(currentUser.value.token)
  const gameId = to.params.id
  const game = await getGame(String(gameId))
  const ownerId = game.user_id
  const skyWayContext = await SkyWay.createSkyWayContext(skyWayToken)
  const skyWayChannel = await SkyWay.findOrCreateChannel(
    skyWayContext,
    game.channel_name
  )

  if (ownerId === currentUser.value.id) {
    if (skyWayChannel.members.length != 0) {
      setToast(
        '参加者がまだ残っています。参加者が退出してから入室してください。',
        'skyway-error'
      )
      return navigateTo('/home')
    }
  } else {
    if (skyWayChannel.metadata === undefined || skyWayChannel.metadata === '') {
      setToast(
        '主催者がまだ入室していないか、既にゲームが始まっています。',
        'skyway-error'
      )
      return navigateTo('/login')
    }
  }
})
