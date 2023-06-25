import Avatar from '@/utils/Avatar'
import Reaction from '@/utils/Reaction'
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
    name: string,
    avatarUrl: string,
    index: number | null,
    reaction: Reaction | null,
    channel: P2PRoom | null,
    localDataStream: LocalDataStream | null,
    agent: LocalP2PRoomMember | null,
    publication: RoomPublication<LocalStream> | null
  ) {
    super(
      id,
      uid,
      name,
      avatarUrl,
      index,
      reaction,
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

  addMyPublicationId = () => {
    const myPublicationId = this.publication?.id as string
    this.reaction?.pushPublicationId(myPublicationId)
  }

  setHandlePublishListChanged = () => {
    this.channel?.onPublicationListChanged.add(async () => {
      const publicationId = this.channel?.publications.slice(-1)[0].id as string
      const publisherName = this.channel?.publications.slice(-1)[0].publisher
        .name as string
      this.reaction?.pushPublicationId(publicationId)
      this.reaction?.pushPublicationName(publisherName)
    })
  }

  setHandleWriteData = async (stream: RemoteDataStream) => {
    await new Promise<void>(async (resolve) => {
      stream.onData.add(async (message) => {
        const { reaction, data } = JSON.parse(message as string)
        const announceText: string = data

        switch (reaction) {
          case 'startTheGame':
            this.reaction?.startTheGame()
            break
          case 'placeAvatar':
            const avatar: Avatar = data
            this.reaction?.placeAvatar(avatar)
            break
          case 'placeAllPlayerAvatar':
            const players: Avatar[] = data
            this.reaction?.placeAllPlayerAvatar(players)
            break
          case 'moveOtherAvatar':
            const avatarParams: AvatarParams = data
            this.reaction?.moveOtherAvatar(avatarParams)
            break
          case 'acceptAnnounce':
            this.reaction?.acceptAnnounce(announceText)
            break
          case 'startQuiz':
            this.reaction?.startQuiz(announceText)
            break
          case 'stopTimer':
            this.reaction?.stopTimer(announceText)
            break
          case 'updateChat':
            const chatMessage: ChatMessage = data
            this.reaction?.updateChat(chatMessage)
            break
          case 'executeJudge':
            this.reaction?.executeJudge()
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
      await this.setHandleWriteData(stream)
    }
  }

  checkPlayerSubscribedAll = (index: number) => {
    const numberOfParticipant = this.channel?.publications.length as number
    const maxIndex = numberOfParticipant - 2
    if (index > maxIndex) {
      console.log('全参加者同士接続完了')
      

    } else {
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
        break
      }
      await this.delay(1000)
    }
  }

  updateAllPlayerMetaData = async () => {
    const allPublications = this.channel?.publications as RoomPublication[]
    for (let i = 1; i < allPublications.length; i++) {
      const playerIndex = (i - 1).toString()
      await this.updatePlayerMetaData(allPublications[i], playerIndex)
      await this.checkMyMetaData(playerIndex)
    }
  }

  announceQuizNumber = (quizNumber: number) => {
    const announceText = `${quizNumber}問目！`
    const writer = new DataStreamWriter(this)
    this.reaction?.updateAnnounceText(announceText)
    writer.writeAnnounceText(announceText)
  }

  announceShortPause = () => {
    const announceText = ''
    const writer = new DataStreamWriter(this)
    this.reaction?.updateAnnounceText(announceText)
    writer.writeAnnounceText(announceText)
  }

  announceQuestion = (question: string) => {
    const announceText = question
    const writer = new DataStreamWriter(this)
    this.reaction?.updateAnnounceText(announceText)
    writer.writeAnnounceText(announceText)
  }

  announceQuizStart = () => {
    const announceText = 'スタート！'
    const writer = new DataStreamWriter(this)
    this.reaction?.updateAnnounceText(announceText)
    this.reaction?.startTimer()
    writer.writeStartTimer(announceText)
  }

  announceQuizStop = () => {
    const announceText = 'ストップ！'
    const writer = new DataStreamWriter(this)
    this.reaction?.updateAnnounceText(announceText)
    this.reaction?.resetTimer()
    writer.writeStopTimer(announceText)
  }

  announceSuspense = () => {
    const announceText = '正解は・・・'
    const writer = new DataStreamWriter(this)
    this.reaction?.updateAnnounceText(announceText)
    writer.writeAnnounceText(announceText)
  }

  announceCorrectAnswer = (correctAnswer: string) => {
    const announceText = correctAnswer
    const writer = new DataStreamWriter(this)
    this.reaction?.updateAnnounceText(announceText)
    writer.writeAnnounceText(announceText)
  }

  announceExplanation = (explanation: string) => {
    const announceText = explanation
    const writer = new DataStreamWriter(this)
    this.reaction?.updateAnnounceText(announceText)
    writer.writeAnnounceText(announceText)
  }

  announce = async (currentQuizNumber: number, quiz: Quiz) => {
    this.announceQuizNumber(currentQuizNumber)
    await this.delay(2000)
    this.announceShortPause()
    await this.delay(2000)
    this.announceQuestion(quiz.question)
    await this.delay(3000)
    this.announceQuizStart()
    await this.delay(2000)
    this.announceQuestion(quiz.question)
    await this.delay(8000)
    this.announceQuizStop()
    await this.delay(2000)
    this.announceSuspense()
    await this.delay(3000)
    this.announceCorrectAnswer(quiz.correct_answer)
    await this.delay(3000)
    this.announceExplanation(quiz.explanation)
    this.reaction?.executeJudge()
    const writer = new DataStreamWriter(this)
    writer.writeJudge()
  }
}

export default OwnerAvatar
