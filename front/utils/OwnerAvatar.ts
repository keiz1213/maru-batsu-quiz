import Avatar from '@/utils/Avatar'
import DataStreamHandler from '~/utils/DataStreamHandler'
import {
  LocalDataStream,
  LocalP2PRoomMember,
  RoomPublication,
  RemoteDataStream,
  P2PRoom,
  LocalStream
} from '@skyway-sdk/room'
import { AvatarParams } from '@/types/AvatarParams'
import { ChatMessage } from '@/types/ChatMessage'
import { Quiz } from '@/types/Quiz'

class OwnerAvatar extends Avatar {
  constructor(
    id: number,
    uid: string,
    owner: boolean,
    name: string,
    avatarUrl: string,
    index: number | null,
    handler: DataStreamHandler | null,
    channel: P2PRoom | null,
    localDataStream: LocalDataStream | null,
    agent: LocalP2PRoomMember | null,
    publication: RoomPublication<LocalStream> | null
  ) {
    super(
      id,
      uid,
      owner,
      name,
      avatarUrl,
      index,
      handler,
      channel,
      localDataStream,
      agent,
      publication
    )
  }

  sendAllPlayerAvatar = (players: object) => {
    const writer = new DataStreamWriter(this)
    writer.writeAllPlayer(players)
  }

  setHandlePublishListChanged = () => {
    this.channel?.onPublicationListChanged.add(async () => {
      const publisherName = this.channel?.publications.slice(-1)[0].publisher
        .name as string
      this.handler?.addPublisherNameAction(publisherName)
    })
  }

  setHandleDataStream = async (stream: RemoteDataStream) => {
    await new Promise<void>(async (resolve) => {
      stream.onData.add(async (message) => {
        const { handlerName, data } = JSON.parse(message as string)

        switch (handlerName) {
          case 'placeAvatarAction':
            const avatar: Avatar = data
            this.handler?.placeAvatarAction(avatar)
            break
          case 'moveAvatarAction':
            const avatarParams: AvatarParams = data
            this.handler?.moveAvatarAction(avatarParams)
            break
          case 'updateChatAction':
            const chatMessage: ChatMessage = data
            this.handler?.updateChatAction(chatMessage)
            break
          case 'checkPlayerSubscribedAll':
            const index: number = data
            this.checkPlayerSubscribedAll(index)
            break
          default:
            break
        }
      })
      resolve()
    })
  }

  subscribeAllPlayers = async () => {
    const numberOfParticipant = this.channel?.publications.length as number
    for (let i = 1; i < numberOfParticipant; i++) {
      const playerPublicationId = this.channel?.publications[i].id as string
      const stream = await this.subscribe(playerPublicationId)
      console.log(`${i}人目のサブスク完了`)
      await this.setHandleDataStream(stream)
      console.log(`${i}人目のdatastreamにハンドラセット完了`)
    }
  }

  checkPlayerSubscribedAll = (index: number) => {
    const numberOfParticipant = this.channel?.publications.length as number
    const maxIndex = numberOfParticipant - 2
    if (index > maxIndex) {
      console.log('全参加者同士接続完了')
      this.handler?.startGame(this)
      const writer = new DataStreamWriter(this)
      writer.writeStartGame()
    } else {
      console.log(`index: [${index}]のplayerが全playerのサブスクを開始・・・`)
      const writer = new DataStreamWriter(this)
      writer.writeCheckSubscribed(index)
    }
  }

  updatePlayerMetaData = async (
    playerPublication: RoomPublication,
    playerIndex: string
  ) => {
    await playerPublication.publisher.updateMetadata(playerIndex)
  }

  checkMyMetaData = async (playerIndex: string) => {
    while (true) {
      if (this.agent?.metadata === playerIndex) {
        console.log(
          `index: ${this.agent?.metadata} がownerをサブスク完了しました`
        )
        break
      }
      await this.delay(1000)
      console.log('自分のmetadataを確認中・・・')
    }
  }

  updateAllPlayerMetaData = async () => {
    const allPublications = this.channel?.publications as RoomPublication[]
    for (let i = 1; i < allPublications.length; i++) {
      const playerIndex = (i - 1).toString()
      console.log(
        `[${allPublications[i]}]のmetadataを[${playerIndex}]に更新します・・・`
      )
      await this.updatePlayerMetaData(allPublications[i], playerIndex)
      console.log(
        `[${playerIndex}]に更新されたplayerがownerをサブスクしたかどうか確認開始・・・`
      )
      await this.checkMyMetaData(playerIndex)
    }
  }

  announceQuizNumber = (quizNumber: number) => {
    const announceText = `${quizNumber}問目！`
    const writer = new DataStreamWriter(this)
    this.handler?.updateAnnounceText(announceText)
    writer.writeAnnounceText(announceText)
  }

  announceShortPause = () => {
    const announceText = ''
    const writer = new DataStreamWriter(this)
    this.handler?.updateAnnounceText(announceText)
    writer.writeAnnounceText(announceText)
  }

  announceQuestion = (question: string) => {
    const announceText = question
    const writer = new DataStreamWriter(this)
    this.handler?.updateAnnounceText(announceText)
    writer.writeAnnounceText(announceText)
  }

  announceQuizStart = () => {
    const announceText = 'スタート！'
    const writer = new DataStreamWriter(this)
    this.handler?.startQuizAction(announceText)
    writer.writeStartQuiz(announceText)
  }

  announceQuizStop = () => {
    const announceText = 'ストップ！'
    const writer = new DataStreamWriter(this)
    this.handler?.updateAnnounceText(announceText)
    writer.writeAnnounceText(announceText)
  }

  announceSuspense = () => {
    const announceText = '正解は・・・'
    const writer = new DataStreamWriter(this)
    this.handler?.updateAnnounceText(announceText)
    writer.writeAnnounceText(announceText)
  }

  announceCorrectAnswer = (correctAnswer: string) => {
    const announceText = correctAnswer
    const writer = new DataStreamWriter(this)
    this.handler?.updateAnnounceText(announceText)
    writer.writeAnnounceText(announceText)
  }

  announceExplanation = (explanation: string) => {
    const announceText = explanation
    const writer = new DataStreamWriter(this)
    this.handler?.checkExplanationAction(announceText)
    writer.writeExplanation(announceText)
  }

  announceJudge = (correctAnswer: string) => {
    this.handler?.executeJudgeAction(correctAnswer)
    const writer = new DataStreamWriter(this)
    writer.writeJudge(correctAnswer)
  }

  announce = async (currentQuizNumber: number, quiz: Quiz) => {
    const question = quiz.question
    const correctAnswer = quiz.correct_answer
    const explanation = quiz.explanation
    this.announceQuizNumber(currentQuizNumber + 1)
    await this.delay(2000)
    this.announceShortPause()
    await this.delay(2000)
    this.announceQuestion(question)
    await this.delay(3000)
    this.announceQuizStart()
    await this.delay(2000)
    this.announceQuestion(question)
    await this.delay(8000)
    this.announceQuizStop()
    await this.delay(2000)
    this.announceSuspense()
    await this.delay(3000)
    this.announceCorrectAnswer(correctAnswer)
    await this.delay(3000)
    this.announceExplanation(explanation)
    this.announceJudge(correctAnswer)
  }
}

export default OwnerAvatar
