export default defineNuxtRouteMiddleware(async (to, from) => {
  const { checkAuthState, currentUser } = useAuth()
  const { setToast } = useToast()
  await checkAuthState()
  let skyWayToken
  if (currentUser.value.id === 0) {
    skyWayToken = await SkyWay.getSkyWayToken('testUserToken')
  } else {
    skyWayToken = await SkyWay.getSkyWayToken(currentUser.value.token)
  }
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
        'ゲーム会場の初期化を行っています。少々お待ち下さい。',
        'skyway-error'
      )
      return await navigateTo('/home')
    }
  } else {
    if (skyWayChannel.metadata === undefined || skyWayChannel.metadata === '') {
      setToast(
        '主催者がまだ入室していないか、既にゲームが始まっています。',
        'skyway-error'
      )
      return await navigateTo('/login')
    }
  }
})
