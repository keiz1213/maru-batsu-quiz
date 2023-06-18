<script setup lang="ts">
  import { RemoteDataStream, RoomPublication } from '@skyway-sdk/room'
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
  const description = game.description
  const channelName = game.channel_name
  const quizzes = game.quizzes

  const publicationIds = ref<string[]>([])

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
    owners,
    members,
    losers,
    winners,
    numberOfWinner,
    isEndOfGame,
    addOwner,
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

  const {
    chatMessages,
    chatVisible,
    addChatMessage,
    adjustScrollTop,
    updateChatMessages,
    updateChatVisible
  } = useChat(member, writer)

  const currentQuizNumber = ref(0)
  const gameStart = ref(false)

  const setAvatarAction = (member: Member): void => {
    if (!document.getElementById(member.uid)) {
      if (isOwner(member.id)) {
        addOwner(member)
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
    addChatMessage(chatMessage)
    adjustScrollTop()
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

  const join = async () => {
    for (const [index, publicationId] of publicationIds.value.entries()) {
      if (publicationId === publicationIds.value[0]) continue
      await subscribe(publicationId)
    }
    await allUpdateMetadata()

    setTimeout(async () => {
      for (const [index, publicationId] of publicationIds.value.entries()) {
        if (publicationId === publicationIds.value[0]) continue
        await addIndex(index, publicationIds.value[index])
        console.log(`addIndex: ${index - 1} to: ${publicationIds.value[index]}`)
      }
    }, 5000)

    setTimeout(() => {
      test()
    }, 10000)

    setTimeout(() => {
      writer.invite(0)
    }, 15000)
  }

  const updateToSubscribed = async (publication: RoomPublication) => {
    await new Promise<void>((resolve) => {
      publication.publisher.updateMetadata('subscribed')
      resolve()
    })
  }

  const allUpdateMetadata = async () => {
    for (const publication of channel.publications) {
      if (publication === member.myPublication) continue
      await updateToSubscribed(publication)
      console.log(`${publication} のmetaDataを更新しました`)
    }
  }

  const inviteAction = async (index: number): Promise<void> => {
    console.log(`送られてきたindex: ${index}`)
    console.log(`私のindex: ${member.myIndex}`)
    if (index === member.myIndex) {
      console.log(
        `index: ${index} のアバターはオーナーにアバターを送信しました`
      )
      writer.writeMember()
      setTimeout(() => {
        writer.passToNext2(index)
      }, 5000)
    }
  }

  const overAction2 = (index: number) => {
    index++
    if (index === channel.members.length - 1) {
      console.log('完了')
    } else {
      setTimeout(() => {
        writer.invite(index)
      }, 5000)
    }
  }

  const addIndex = async (index: number, publicationId: string) => {
    await new Promise<void>((resolve) => {
      writer.addIndex(index - 1, publicationId)
      resolve()
    })
  }

  const test = () => {
    console.log('hello')
    writer.writeMember()
  }

  const deadline = async (index: number) => {
    writer.writeMember()
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
      } else if (tag === 'test') {
        console.log('test')
      } else if (tag === 'invite') {
        if (isOwner(member.id)) return
        let index = JSON.parse(message).params.index
        console.log('inviteaction')
        inviteAction(index)
      } else if (tag === 'passToNext2') {
        if (!isOwner(member.id)) return
        let index = JSON.parse(message).params.index
        overAction2(index)
      } else if (tag === 'addIndex') {
        if (isOwner(member.id)) return
        let publicationId = JSON.parse(message).params.publicationId
        if (publicationId === member.myPublication?.id) {
          let index = JSON.parse(message).params.index
          member.id = index + 2
          member.uid = `testUid-${index + 1}`
          member.name = `testName-${index + 1}`
          member.avatar_url = `/_nuxt/assets/images/${index + 1}.svg`
          draggable.setDraggable(member.uid)
          draggable.setDropzone('◯', member.uid)
          draggable.setDropzone('✕', member.uid)
          member.myIndex = index
          console.log(`myIndex: ${member.myIndex}`)
          console.log(`myId: ${member.id}`)
          console.log(`myUid: ${member.uid}`)
          console.log(`myUrl: ${member.avatar_url}`)
        }
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
  }

  const allSubscribe = async () => {
    for (let i = 1; i < channel.publications.length; i++) {
      if (channel.publications[i] === member.myPublication) continue
      subscribe(channel.publications[i].id)
    }
  }

  if (myId === ownerId) {
    draggable.setDraggable(member.uid)
    addOwner(member)
    publicationIds.value.push(channel.publications[0].id)
    channel.onPublicationListChanged.add(async (e) => {
      const publicationId = channel.publications.slice(-1)[0].id
      publicationIds.value.push(publicationId)
    })
  } else {
    const memberAsChannel = member.memberCertificates
    console.log(`私のpublicationId: ${member.myPublication?.id}`)
    memberAsChannel?.onMetadataUpdated.add(async () => {
      await ownnerSubscribe()
    })
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
  <MbqModalEnd
    v-model="isEndOfGame"
    :winners="winners"
    :quizzes="game.quizzes"
    :background="'interactive'"
  />
  <MbqModalStandBy
    v-model="isStandBy"
    :isOwner="isOwner(myId)"
    :title="'接続確認中です、そのままお待ち下さい'"
    :members="members"
    :background="'interactive'"
    @start="deadline(0)"
    @join="join"
    @test="test"
    :ids="publicationIds"
  />

  <MbqModalCheck v-model="isCheckQuestion" :quizzes="quizzes" />

  <div>
    <div id="main-container">
      <div id="top-container">
        <div id="title-container">
          <div id="title-area" class="flex justify-center my-6 break-all">
            <h1 class="text-5xl">{{ title }}</h1>
          </div>
        </div>
      </div>
      <div id="ownner-container" class="flex justify-center">
        <div id="board-container">
          <div id="board-area">
            <MbqBoard
              :announcement="announcement"
              :gameStart="gameStart"
              :elapsed="timeElapsed"
              :limit="timeLimit"
            />
          </div>
        </div>
        <div id="questioner-container">
          <div id="questioner-area">
            <MbqOwnerArea
              :owners="owners"
              :isOwner="isOwner(myId)"
              :quizzes="quizzes"
              :currentQuizNumber="currentQuizNumber"
              @question="sendAnnouncement"
              @check-question="openQuestion"
              :description="description"
            />
          </div>
        </div>
      </div>
      <div id="public-container" class="flex justify-center">
        <div id="answer-container">
          <div id="answer-area">
            <MbqAnswer />
          </div>
        </div>
        <div id="chat-container">
          <div id="chat-area">
            <MbqChat
              :chatVisible="chatVisible"
              :myId="myId"
              :messages="chatMessages"
              @update:messages="updateChatMessages"
              @update:chatVisible="updateChatVisible"
            />
          </div>
        </div>
      </div>
      <div id="player-container">
        <div id="challenger-container">
          <div id="challenger-area" class="flex justify-center">
            <MbqChallengers :members="members" :gameStart="gameStart" />
          </div>
        </div>
        <div id="winner-container">
          <div id="winner-area" class="flex justify-center">
            <MbqWinners :numberOfWinner="numberOfWinner" :winners="winners" />
          </div>
        </div>
        <div id="loser-container" class="mb-7">
          <div id="loser-area" class="flex justify-center">
            <MbqLosers :losers="losers" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
