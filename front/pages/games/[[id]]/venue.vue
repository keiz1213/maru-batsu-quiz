<script setup lang="ts">
  import Avatar from '@/utils/Avatar'
  import { useJudge } from '~/composables/useJudge'
  import { usePublication } from '~/composables/usePublication'
  import OwnerAvatar from '~/utils/OwnerAvatar'
  import PlayerAvatar from '~/utils/PlayerAvatar'
  import Reaction from '~/utils/Reaction'
  import SkyWay from '~/utils/SkyWay'

  definePageMeta({
    middleware: 'auth'
    // layout: 'after-login'
  })

  const { currentUser } = useAuth()
  const route = useRoute()
  const gameId = route.params.id
  const game = await getGame(String(gameId))
  const ownerId = game.user_id
  const isCheckQuestion = ref(false)
  const chatVisible = ref(true)
  let avatar: OwnerAvatar | PlayerAvatar
  let skyWayToken
  let userName

  const {
    owner,
    players,
    losers,
    winners,
    numberOfWinner,
    currentQuizNumber,
    isStandByGame,
    isEndOfGame,
    addOwner,
    addPlayer,
    setAllPlayers,
    startGame,
    judge
  } = useJudge(game.number_of_winner)
  const { announceText, updateAnnounceText } = useAnnounce()
  const { chatMessages, addChatMessage } = useChat()
  const { publisherNames, addPublisherName } = usePublication()
  const { timeElapsed, timeLimit, startTimer, resetTimer } = useTimer()

  if (currentUser.value.id === 0) {
    skyWayToken = await SkyWay.getSkyWayToken('testUserToken')
    userName = SkyWay.generateUniqueName()
  } else {
    skyWayToken = await SkyWay.getSkyWayToken(currentUser.value.token)
    userName = currentUser.value.name
  }
  const skyWayContext = await SkyWay.createSkyWayContext(skyWayToken)
  const skyWayChannel = await SkyWay.findOrCreateChannel(
    skyWayContext,
    game.channel_name
  )
  const localDataStream = await SkyWay.createLocalDataStream()
  const agent = await SkyWay.createAgent(skyWayChannel, userName)
  const publication = await SkyWay.createPublication(localDataStream, agent)

  const reaction = new Reaction(
    addOwner,
    addPlayer,
    setAllPlayers,
    startGame,
    startTimer,
    resetTimer,
    judge,
    updateAnnounceText,
    addChatMessage,
    addPublisherName
  )

  const initialAvatarParams = [
    currentUser.value.id,
    currentUser.value.uid,
    true,
    currentUser.value.name,
    currentUser.value.avatar_url,
    null,
    reaction,
    skyWayChannel,
    localDataStream,
    agent,
    publication
  ] as const

  const initialTestAvatarParams = [
    0,
    '',
    false,
    '',
    '',
    null,
    reaction,
    skyWayChannel,
    localDataStream,
    agent,
    publication
  ] as const

  const isOwner = (avatar: Avatar) => {
    return ownerId === avatar.id
  }

  const sendAnnounce = async () => {
    if (avatar instanceof OwnerAvatar) {
      await avatar.announce(
        currentQuizNumber.value,
        game.quizzes[currentQuizNumber.value]
      )
    }
  }

  const openQuestion = () => {
    isCheckQuestion.value = true
  }

  const updateChatVisible = () => {
    chatVisible.value = false
  }

  const sendChatMessage = (newMessage: string) => {
    avatar.sendChatMessage(newMessage)
  }

  const join = async () => {
    if (avatar instanceof OwnerAvatar) {
      console.log('----ownerが全playerをサブスクを開始----')
      await avatar.subscribeAllPlayers()
      console.log('----ownerが全playerをサブスク完了----')
      console.log('----ownerが全playerのmetadataの更新を開始します----')
      await avatar.updateAllPlayerMetaData()
      console.log('----全playerがownerをサブスク完了----')
      avatar.sendMyAvatar()
      console.log('-----自分のアバターを送信----')
      avatar.sendAllPlayerAvatar(players.value)
      console.log('-----全player送信-----')
      console.log('-----全player同士のサブスクを開始・・・-----')
      avatar.checkPlayerSubscribedAll(0)
    }
  }

  if (currentUser.value.id === ownerId) {
    avatar = new OwnerAvatar(...initialAvatarParams)
    addOwner(avatar)
    avatar.setHandlePublishListChanged()
  } else {
    avatar = new PlayerAvatar(...initialTestAvatarParams)
    avatar.setHandleMetaDataUpdate()
  }
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
    :isOwner="isOwner(avatar)"
    :players="players"
    :background="'interactive'"
    @join="join"
    :publisherNames="publisherNames"
  />

  <MbqModalCheck v-model="isCheckQuestion" :quizzes="game.quizzes" />

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
              :isOwner="isOwner(avatar)"
              :quizzes="game.quizzes"
              :currentQuizNumber="currentQuizNumber"
              @question="sendAnnounce"
              @check-question="openQuestion"
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
              @update:messages="sendChatMessage"
              @update:chatVisible="updateChatVisible"
            />
          </div>
        </div>
      </div>
      <div id="player-container">
        <div id="challengers-winners-container" class="flex justify-center">
          <div id="challengers-area">
            <MbqMacFinder :avatars="players" :title="'challengers'" />
          </div>
          <div id="winners-area">
            <MbqMacFinder :avatars="winners" :title="'winners'" />
          </div>
        </div>
        <div id="losers-container">
          <div id="losers-area" class="flex justify-center">
            <MbqLosers :numberOfWinner="numberOfWinner" :losers="losers" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
