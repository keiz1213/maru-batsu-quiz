<script setup lang="ts">
  import { getGame } from '~/utils/api/services/game'
  import Announce from '~/utils/class/Announce'
  import Chat from '~/utils/class/Chat'
  import OwnerAvatar from '~/utils/class/OwnerAvatar'
  import PlayerAvatar from '~/utils/class/PlayerAvatar'
  import Referee from '~/utils/class/Referee'
  import SkywayChannel from '~/utils/class/SkywayChannel'
  import SkywayDataStream from '~/utils/class/SkywayDataStream'
  import SyncDraggable from '~/utils/class/SyncDraggable'
  import Timer from '~/utils/class/Timer'
  import VenueActivity from '~/utils/class/VenueActivity'

  definePageMeta({
    layout: false,
    middleware: ['auth', 'venue-status']
  })

  const { currentUser, isOwner } = useCurrentUser()
  const { participantMetaData } = useParticipantMetaData()
  const { owner } = useOwner()
  const { players } = usePlayers()
  const { losers } = useLosers()
  const { winners } = useWinners()
  const { numberOfWinner } = useNumberOfWinner()
  const { currentQuizNumber } = useCurrentQuizNumber()
  const { questionVisible } = useQuestionVisible()
  const { chatVisible, chatMessages } = useChat()
  const { standByGame, endOfGame } = useGameState()
  const { announceText } = useAnnounce()
  const { timeElapsed, timeLimit } = useTimer()
  const { quizLoading } = useQuizLoading()
  const { connectionLoading } = useConnectionLoading()
  const { connectionProgress } = useConnectionProgress()

  let avatar: PlayerAvatar | OwnerAvatar
  const route = useRoute()
  const gameId = route.params.id as string
  const game = await getGame(gameId)
  const skywayChannel = new SkywayChannel(currentUser.value, game)
  await skywayChannel.joinChannel()
  const skywayDataStream = new SkywayDataStream(skywayChannel)
  const venueActivity = new VenueActivity(
    new Referee(game, new SyncDraggable()),
    new Chat(),
    new Announce(),
    new Timer()
  )
  const avatarInstanceProps = [
    currentUser.value,
    skywayChannel,
    skywayDataStream,
    venueActivity
  ] as const

  avatar = isOwner(game)
    ? new OwnerAvatar(...avatarInstanceProps)
    : new PlayerAvatar(...avatarInstanceProps)
  avatar.venueActivity!.setMyAvatarId(avatar.avatarId)
  avatar.setUpChannel()

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
  <EndOfGameModal
    v-model="endOfGame"
    :winners="winners"
    :quizzes="game.quizzes"
    :background="'interactive'"
  />
  <StandByGameModal
    v-model="standByGame"
    :isOwner="isOwner(game)"
    :players="players"
    :background="'interactive'"
    @start-connection="
      avatar instanceof OwnerAvatar ? avatar.startConnection(players) : null
    "
    :participantMetaData="participantMetaData"
    :isLoading="connectionLoading"
    :connectionProgress="connectionProgress"
  />

  <QuizCheckModal
    v-model="questionVisible"
    :quizzes="game.quizzes"
    @close-question="
      avatar instanceof OwnerAvatar
        ? avatar.venueActivity!.closeQuestion()
        : null
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
              :isOwner="isOwner(game)"
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
                avatar instanceof OwnerAvatar
                  ? avatar.venueActivity!.openQuestion()
                  : null
              "
              :description="game.description"
              :isLoading="quizLoading"
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
        <div v-if="chatVisible" id="chat-container">
          <div id="chat-area">
            <MbqChat
              :myId="avatar.avatarId"
              :messages="chatMessages"
              @update:messages="avatar.sendChatMessage"
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
