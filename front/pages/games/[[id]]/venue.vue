<script setup lang="ts">
  import { RemoteDataStream } from '@skyway-sdk/room'
  import {
    createSkyWayContext,
    createMember,
    createTestMember,
    findOrCreateChannel
  } from '~/utils/functions'
  import { getSkywayToken, getGame } from '~/utils/getters'
  import { Member } from '@/types/Member'
  import { AvatarParams } from '@/types/AvatarParams'
  import { ChatMessage } from '@/types/ChatMessage'
  import ModalEndOfGame from '@/components/ModalEndOfGame.vue'

  definePageMeta({
    middleware: 'auth'
    // layout: 'after-login'
  })

  const { currentUser } = useAuth()

  const route = useRoute()
  const gameId = route.params.id
  const game = await getGame(String(gameId))
  let skywayToken
  if (currentUser.value.id != 0) {
    skywayToken = await getSkywayToken(currentUser.value.token)
  } else {
    skywayToken = await getSkywayToken('firebaseIdTokenForTestUser')
  }
  const ownerId = game.user_id
  const title = game.title
  const channelName = game.channel_name
  const quizzes = game.quizzes

  const skywayContext = await createSkyWayContext(skywayToken)
  const channel = await findOrCreateChannel(skywayContext, channelName)
  let member: Member
  if (currentUser.value.id != 0) {
    member = await createMember(currentUser.value, channel)
  } else {
    member = await createTestMember(channel)
  }

  const myId = member.id

  const writer = new DataStreamWriter(member)
  const draggable = new SyncDraggable(writer)

  const {
    members,
    losers,
    winners,
    numberOfWinner,
    isEndOfGame,
    addMember,
    setAllMembers,
    judge,
    createDummyMember
  } = useReferee(game.number_of_winner)

  const { timeElapsed, timeLimit, startTimer, resetTimer } = useTimer()

  const {
    announcement,
    announceSetQuestion,
    announceQuestion,
    announceStart,
    announceStop,
    announcePreparation,
    announceCorrectAnswer,
    announceExplanation,
    announceReset
  } = useAnnouncer(writer)

  const isStandBy = ref(true)
  const isCheckQuestion = ref(false)
  const openQuestion = () => {
    isCheckQuestion.value = true
  }

  const chat = useChat(member, writer)
  const chatMessages = chat.chatMessages
  const chatVisible = chat.chatVisible

  const owner = ref(createDummyMember())

  const currentQuizNumber = ref(0)
  const gameStart = ref(false)

  const setAvatarAction = (member: Member): void => {
    if (!document.getElementById(member.uid)) {
      if (isOwner(member.id)) {
        owner.value = member
      } else {
        addMember(member)
      }
    }
  }

  const moveAvatarAction = (avatarParams: AvatarParams): void => {
    const target = document.getElementById(avatarParams.id) as HTMLElement
    const x = avatarParams.x
    const y = avatarParams.y
    const answer = avatarParams.answer
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
    target.setAttribute('data-answer', answer)
  }

  const announceAction = (announceText: string): void => {
    announcement.value = announceText
    if (announceText === 'スタート！') {
      startTimer()
    } else if (announceText === 'ストップ！') {
      draggable.unsetDraggable(member.uid)
      const avatar = document.getElementById(member.uid) as HTMLElement
      avatar.classList.add('opacity-30')
    } else if (announceText === '正解は・・') {
      resetTimer()
    } else if (announceText === quizzes[currentQuizNumber.value].explanation) {
      const myAvatar = document.getElementById(member.uid) as HTMLElement
      if (myAvatar.getAttribute('data-draggable') != '') {
        draggable.setDraggable(member.uid)
        myAvatar.classList.remove('opacity-30')
      }
    }
  }

  const judgeAction = (): void => {
    const correctAnswer = quizzes[currentQuizNumber.value].correct_answer
    judge(correctAnswer)
    currentQuizNumber.value++
  }

  const chatAction = (chatMessage: ChatMessage): void => {
    chat.addChatMessage(chatMessage)
    chat.adjustScrollTop()
  }

  const startGameAction = (members: Member[]): void => {
    setAllMembers(members)
  }

  const closeRecruitmentAction = async (index: number): Promise<void> => {
    if (index === member.myIndex) {
      // 自分とオーナー以外の全員をサブスクする
      await allSubscribe()
      // 終わったらオーナーに対して自分のindexを添えて終わったことを連絡
      writer.passToNext(index)
    }
  }

  const overAction = (index: number) => {
    //allSubscribeが終わったメンバーから連絡を受信する
    console.log(`index: ${index} のアバターは全メンバーをサブスクしました`)
    // 次のメンバーのindexにする
    index++
    // 全員がallSubscribeし終えるとモーダルを消す
    // (indexは0から始まるのでこの条件で良い)
    if (index === members.value.length) {
      closeModal()
      writer.closeModal2()
    } else {
      // 全員が終わってなければ再度次のメンバーに対して連絡
      setTimeout(() => {
        deadline(index)
      }, 2000)
    }
  }

  const deadline = (index: number) => {
    writer.allWrite(members.value)
    writer.deadline(index)
  }

  const isOwner = (membeId: number) => {
    return membeId === ownerId
  }

  const handleWriteData = (stream: RemoteDataStream) => {
    stream.onData.add(async (data) => {
      const message = data as string
      const tag = JSON.parse(message).tag as string
      if (tag === 'setAvatar') {
        const member = JSON.parse(message).params
        setAvatarAction(member)
      } else if (tag === 'moveAvatar') {
        const avatarParams = JSON.parse(message).params
        moveAvatarAction(avatarParams)
      } else if (tag === 'announcement') {
        const announceText = JSON.parse(message).params
        announceAction(announceText)
      } else if (tag === 'judge') {
        judgeAction()
      } else if (tag === 'chat') {
        let text = JSON.parse(message).params
        chatAction(text)
      } else if (tag === 'closeModal') {
        closeModal()
      } else if (tag === 'start') {
        if (isOwner(member.id)) return
        let avatars = JSON.parse(message).params
        startGameAction(avatars)
      } else if (tag === 'deadline') {
        if (isOwner(member.id)) return
        let index = JSON.parse(message).params.index
        closeRecruitmentAction(index)
      } else if (tag === 'over') {
        if (!isOwner(member.id)) return
        let index = JSON.parse(message).params.index
        overAction(index)
      }
    })
  }

  const subscribe = async (publicationId: string) => {
    const remote = await member.memberCertificates?.subscribe(publicationId)
    const stream = remote?.stream as RemoteDataStream
    handleWriteData(stream)
  }

  const ownnerSubscribe = async () => {
    await subscribe(channel.publications[0].id)
    console.log('オーナーをサブスクしました')
    setTimeout(() => {
      writer.writeMember()
    }, 1000)
  }

  const allSubscribe = async () => {
    for (let i = 1; i < channel.publications.length; i++) {
      if (channel.publications[i] === member.myPublication) continue
      subscribe(channel.publications[i].id)
    }
  }

  if (myId === ownerId) {
    draggable.setDraggable(member.uid)
    owner.value = member
    channel.onPublicationListChanged.add(async (e) => {
      const publicationId = channel.publications.slice(-1)[0].id
      await subscribe(publicationId)
      setTimeout(() => {
        writer.writeMember()
      }, 1000)
    })
  } else {
    draggable.setDraggable(member.uid)
    draggable.setDropzone('◯', member.uid)
    draggable.setDropzone('✕', member.uid)
    await ownnerSubscribe()
  }

  const sendAnnouncement = async () => {
    const quizNumber = currentQuizNumber.value + 1
    announceSetQuestion(quizNumber)
    await announceReset()
    const question = quizzes[currentQuizNumber.value].question
    await announceQuestion(question)
    await announceStart()
    startTimer()
    await announceQuestion(question)
    await announceStop()
    await announcePreparation()
    resetTimer()
    const correctAnswer = quizzes[currentQuizNumber.value].correct_answer
    await announceCorrectAnswer(correctAnswer)
    const explanation = quizzes[currentQuizNumber.value].explanation
    await announceExplanation(explanation)
    member.myData?.write(
      JSON.stringify({
        tag: 'judge',
        params: ''
      })
    )
    judge(correctAnswer)
    currentQuizNumber.value++
  }

  const closeModal = () => {
    isStandBy.value = false
  }
</script>

<template>
  <ModalEndOfGame
    v-model="isEndOfGame"
    :winners="winners"
    :quizzes="game.quizzes"
    :background="'interactive'"
  />
  <ModalStandBy
    v-model="isStandBy"
    :isOwner="isOwner(myId)"
    :title="'接続確認中です、そのままお待ち下さい'"
    :members="members"
    :background="'interactive'"
    @start="deadline(0)"
  />

  <ModalCheckQuestion v-model="isCheckQuestion" :quizzes="quizzes" />

  <div class="flex justify-center">
    <div>
      <div id="title-container">
        <GameTitle :title="title"></GameTitle>
      </div>
      <div id="main-container">
        <div id="game-container" class="flex">
          <div id="left-container">
            <div id="board" class="flex">
              <div id="message-board">
                <QuestionBoard :announcement="announcement" />
              </div>
              <div id="info-board">
                <div id="questioner">
                  <QuestionnerAvatarArea
                    :questioner="owner"
                    :gameStart="gameStart"
                  />
                </div>
                <div id="timelimit">
                  <Timelimit :elapsed="timeElapsed" :limit="timeLimit" />
                </div>
              </div>
            </div>
            <div id="answer">
              <Answer />
            </div>
          </div>
          <div id="right-container">
            <div id="menu">
              <QuestionnerArea
                :questioner="owner"
                :isOwner="isOwner(myId)"
                :quizzes="quizzes"
                :currentQuizNumber="currentQuizNumber"
                @question="sendAnnouncement"
                @check-question="openQuestion"
              />
            </div>
            <div id="chat-container">
              <Chat
                :chatVisible="chatVisible"
                :myId="myId"
                :messages="chatMessages"
                @update:messages="chat.updateChatMessages"
                @update:chatVisible="chat.updateChatVisible"
              />
            </div>
          </div>
        </div>
        <div id="avatar-container">
          <div id="winners">
            <Winner :numberOfWinner="numberOfWinner" :winners="winners" />
          </div>
          <div id="challengers">
            <Start :members="members" :gameStart="gameStart" />
          </div>
          <div id="losers">
            <Loser :losers="losers" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
