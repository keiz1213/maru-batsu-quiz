<script setup lang="ts">
  import OwnerAvatar from '~/utils/class/OwnerAvatar'
  import PlayerAvatar from '~/utils/class/PlayerAvatar'
  import InfluentialAction from '~/utils/class/InfluentialAction'
  import NonInfluentialAction from '~/utils/class/NonInfluentialAction'
  import SkyWay from '~/utils/class/SkyWay'
  import { getGame } from '~/utils/api/services/game'
  import { getUser } from '~/utils/api/services/user'

  definePageMeta({
    middleware: ['auth', 'venue-status']
  })

  const { currentUserId, isGameOwner } = useCurrentUserId()
  const { errorMessage } = useSkyWayErrorMessage()

  let avatar: PlayerAvatar | OwnerAvatar
  const route = useRoute()
  const gameId = route.params.id as string
  const game = await getGame(gameId)
  const user = await getUser(currentUserId.value)
  const ownerId = game.user_id as number
  const skyWay = new SkyWay(user, game)
  await skyWay.initiarizeSkyWay()
  const nonInfluentialAction = new NonInfluentialAction(game.number_of_winner)
  const influentialAction = new InfluentialAction(skyWay.localDataStream!)
  const initialAvatarParams = [
    currentUserId.value.toString(),
    isGameOwner(ownerId) ? true : false,
    user.name,
    user.avatar_url,
    null,
    skyWay,
    influentialAction,
    nonInfluentialAction
  ] as const

  const owner = nonInfluentialAction.reactiveVenue.owner
  const players = nonInfluentialAction.reactiveVenue.players
  const losers = nonInfluentialAction.reactiveVenue.losers
  const winners = nonInfluentialAction.reactiveVenue.winners
  const numberOfWinner = nonInfluentialAction.reactiveVenue.numberOfWinner
  const currentQuizNumber = nonInfluentialAction.reactiveVenue.currentQuizNumber
  const questionVisible = nonInfluentialAction.reactiveVenue.questionVisible
  const isStandByGame = nonInfluentialAction.reactiveVenue.isStandByGame
  const isEndOfGame = nonInfluentialAction.reactiveVenue.isEndOfGame
  const announceText = nonInfluentialAction.reactiveVenue.announceText
  const chatVisible = nonInfluentialAction.reactiveVenue.chatVisible
  const chatMessages = nonInfluentialAction.reactiveVenue.chatMessages
  const publisherNames = nonInfluentialAction.reactiveVenue.publisherNames
  const timeElapsed = nonInfluentialAction.reactiveVenue.timeElapsed
  const timeLimit = nonInfluentialAction.reactiveVenue.timeLimit

  if (isGameOwner(ownerId)) {
    avatar = new OwnerAvatar(...initialAvatarParams)
    avatar.setUpChannel()
  } else {
    avatar = new PlayerAvatar(...initialAvatarParams)
    avatar.setUpChannel()
  }

  useHead({
    title: `${game.title} | マルバツクイズオンライン`
  })

  onMounted(() => {
    window.addEventListener('beforeunload', avatar.leaveChannel)
  })

  onUnmounted(() => {
    window.removeEventListener('beforeunload', avatar.leaveChannel)
  })
</script>

<template>
  <MbqModalEnd
    v-model="isEndOfGame"
    :winners="winners"
    :quizzes="game.quizzes"
    :background="'interactive'"
  />
  <MbqModalStandBy
    v-model="isStandByGame"
    :isOwner="isGameOwner(ownerId)"
    :errorMessage="errorMessage"
    :players="players"
    :background="'interactive'"
    @start-connection="
      avatar instanceof OwnerAvatar ? avatar.startConnection(players) : null
    "
    :publisherNames="publisherNames"
  />

  <MbqModalCheck
    v-model="questionVisible"
    :quizzes="game.quizzes"
    @close-question="
      avatar instanceof OwnerAvatar ? avatar.closeCheckQuestion() : null
    "
  />

  <div>
    <div
      id="main-container"
      class="bg-gradient-to-r from-violet-500 to-fuchsia-500 min-w-full w-[1350px]"
    >
      <MbqMacHeader :title="game.title" :numberOfWinner="numberOfWinner" />
      <div id="ownner-container" class="flex justify-center my-12">
        <div id="board-container">
          <div id="board-area">
            <MbqBoard
              :announceText="announceText"
              :elapsed="timeElapsed"
              :limit="timeLimit"
            />
          </div>
        </div>
        <div id="questioner-container">
          <div id="questioner-area">
            <MbqOwnerArea
              :owner="(owner as OwnerAvatar)"
              :isOwner="isGameOwner(ownerId)"
              :quizzes="game.quizzes"
              :currentQuizNumber="currentQuizNumber"
              @announce="
                avatar instanceof OwnerAvatar
                  ? avatar.announce(
                      currentQuizNumber,
                      game.quizzes[currentQuizNumber]
                    )
                  : null
              "
              @check-question="
                avatar instanceof OwnerAvatar ? avatar.checkQuestion() : null
              "
              :description="game.description"
            />
          </div>
        </div>
      </div>
      <div id="public-container" class="flex justify-center mb-12">
        <div id="answer-container">
          <div id="answer-area">
            <MbqAnswer />
          </div>
        </div>
        <div id="chat-container">
          <div id="chat-area">
            <MbqChat
              :chatVisible="chatVisible"
              :myId="avatar.id"
              :messages="chatMessages"
              @update:messages="avatar.sendChatMessage"
              @update:chatVisible="avatar.toggelChatVisible(chatVisible)"
            />
          </div>
        </div>
      </div>
      <div id="player-container">
        <div id="players-winners-container" class="flex justify-center">
          <div id="players-area">
            <MbqPlayers :players="players" :title="'players'" />
          </div>
          <div id="winners-area">
            <MbqWinners :winners="winners" :title="'winners'" />
          </div>
        </div>
        <div id="losers-container">
          <div id="losers-area" class="flex justify-center">
            <MbqLosers :losers="losers" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
