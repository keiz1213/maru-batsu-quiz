<script setup lang="ts">
  import Avatar from '@/utils/Avatar'
  import OwnerAvatar from '~/utils/OwnerAvatar'
  import PlayerAvatar from '~/utils/PlayerAvatar'
  import DataStreamHandler from '~/utils/DataStreamHandler'
  import SkyWay from '~/utils/SkyWay'
  import { useSkyWayErrorMessage } from '~/composables/useSkyWayErrorMessage'

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
  const { errorMessage, updateErrorMessage, clearErrorMessage } =
    useSkyWayErrorMessage()

  const writer = new DataStreamWriter()
  const handler = new DataStreamHandler(
    addOwner,
    addPlayer,
    setAllPlayers,
    startGame,
    startTimer,
    resetTimer,
    judge,
    updateAnnounceText,
    addChatMessage,
    addPublisherName,
    updateErrorMessage,
    clearErrorMessage
  )

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

  const startConnection = async () => {
    try {
      if (avatar instanceof OwnerAvatar) {
        console.log('----ownerが全playerをサブスク&ハンドラセットを開始----')
        await avatar.subscribeAllPlayers()
        console.log('----ownerが全playerをサブスク&ハンドラセット完了----')
        console.log(
          '----ownerが全playerに対してownerをサブスク&ハンドラセットするように促します----'
        )
        await avatar.promptAllPlayersSubscribeOwner()
        console.log('----全playerがownerをサブスク&ハンドラセット完了----')
        avatar.sendMyAvatar()
        console.log('-----自分のアバターを全playerに対して送信----')
        avatar.sendAllPlayerAvatar(players.value)
        console.log('-----全playerに対して全playerのアバターを送信-----')
        console.log('-----全player同士のサブスクを開始・・・-----')
        avatar.promptSubscribeAllPlayers(0)
      }
    } catch (error) {
      if (error instanceof Error) {
        avatar.handler?.updateErrorMessage(error.message)
        avatar.updateAllMetadataWithError()
      }
    }
  }

  // ----------test用--------------

  const _subscribeAllPlayers = async () => {
    try {
      if (avatar instanceof OwnerAvatar) {
        await avatar.subscribeAllPlayers()
        console.log('全playerサブスク&ハンドラセット完了')
      }
    } catch (error) {
      if (error instanceof Error) {
        avatar.handler?.updateErrorMessage(error.message)
        avatar.updateAllMetadataWithError()
      }
    }
  }
  const _promptAllPlayersSubscribeOwner = async () => {
    try {
      if (avatar instanceof OwnerAvatar) {
        await avatar.promptAllPlayersSubscribeOwner()
        console.log('全playerがownerのサブスク&ハンドラセットを完了しました')
      }
    } catch (error) {
      if (error instanceof Error) {
        avatar.handler?.updateErrorMessage(error.message)
        avatar.updateAllMetadataWithError()
      }
    }
  }
  const _promptSubscribeAllPlayers = async () => {
    if (avatar instanceof OwnerAvatar) {
      avatar._promptSubscribeAllPlayers(0)
    }
  }
  const _sendMyAvatar = async () => {
    if (avatar instanceof OwnerAvatar) {
      avatar.sendMyAvatar()
      console.log('ownerのavatarを全playerに送信しました')
    }
  }
  const _sendAllPlayerAvatar = async () => {
    if (avatar instanceof OwnerAvatar) {
      avatar.sendAllPlayerAvatar(players.value)
    }
  }
  const _promptStartGame = async () => {
    if (avatar instanceof OwnerAvatar) {
      avatar.handler?.startGameAction(avatar)
      avatar.writer?.promptStartGame(avatar)
    }
  }

  // ----------ここまで--------------

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

  const initialParams = [
    currentUser.value.id,
    currentUser.value.uid,
    true,
    currentUser.value.name,
    currentUser.value.avatar_url,
    null,
    writer,
    handler,
    skyWayChannel,
    localDataStream,
    agent,
    publication
  ] as const

  const initialTestParams = [
    0,
    '',
    false,
    '',
    '',
    null,
    writer,
    handler,
    skyWayChannel,
    localDataStream,
    agent,
    publication
  ] as const

  if (currentUser.value.id === ownerId) {
    avatar = new OwnerAvatar(...initialParams)
    addOwner(avatar)
    avatar.setHandlePublishListChanged()
    avatar.setHandleMetaDataUpdate()
  } else {
    avatar = new PlayerAvatar(...initialTestParams)
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
    :errorMessage="errorMessage"
    :players="players"
    :background="'interactive'"
    @startConnection="startConnection"
    @subscribe-all-players="_subscribeAllPlayers"
    @prompt-all-players-subscribe-owner="_promptAllPlayersSubscribeOwner"
    @prompt-subscribe-all-players="_promptSubscribeAllPlayers"
    @send-my-avatar="_sendMyAvatar"
    @send-all-player-avatar="_sendAllPlayerAvatar"
    @prompt-start-game="_promptStartGame"
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
            <MbqLosers :losers="losers" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
