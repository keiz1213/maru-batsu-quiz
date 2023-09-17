import { User } from '~/types/user'
import { AvatarParams } from '~/types/avatarParams'
import { ChatMessage } from '~/types/chatMessage'
import { Quiz } from '~/types/quiz'
import { RemoteDataStream } from '@skyway-sdk/room'
import Avatar from '~/utils/class/Avatar'
import PlayerAvatar from '~/utils/class/PlayerAvatar'
import VenueActivity from './VenueActivity'
import SkywayChannel from './SkywayChannel'
import SkywayDataStream from './SkywayDataStream'

class OwnerAvatar extends Avatar {
  constructor(
    user: User,
    skywayChannel: SkywayChannel,
    skywayDataStream: SkywayDataStream,
    venueActivity: VenueActivity
  ) {
    super(user, skywayChannel, skywayDataStream, venueActivity)
  }

  setUp = () => {
    this.venueActivity!.setMyAvatarId(this.avatarId)
    this.setUpChannel()
  }

  delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  addOwnerData = () => {
    const channel = this.skywayChannel!.channel!
    const owner = channel.publications[0].publisher
    const ownerName = owner.name as string
    const ownerImageUrl = owner.metadata as string
    const ownerData = {
      name: ownerName,
      imageUrl: ownerImageUrl
    }
    this.venueActivity!.addParticipantMetaData(ownerData)
  }

  setHandlePlayerEntry = () => {
    const channel = this.skywayChannel!.channel!
    channel.onPublicationListChanged.add(() => {
      const player = channel.publications.slice(-1)[0].publisher
      const playerName = player.name as string
      const playerImageUrl = player.metadata as string
      const playerData = {
        name: playerName,
        imageUrl: playerImageUrl
      }
      this.venueActivity!.addParticipantMetaData(playerData)
    })
  }

  setUpChannel = async () => {
    const { chatVisible } = useChat()
    const skywayChannel = this.skywayChannel!
    if (chatVisible.value) {
      await skywayChannel.updateChannelMetadata('chatVisible')
    } else {
      await skywayChannel.updateChannelMetadata('accetable')
    }
    this.setHandleChannelMetadataUpdated()
    this.addOwnerData()
    this.venueActivity!.addOwner(this)
    this.setHandlePlayerEntry()
  }

  setHandleDataWrite = async (dataStream: RemoteDataStream) => {
    await new Promise<void>(async (resolve) => {
      dataStream.onData.add(async (message) => {
        const { reactionName, data } = JSON.parse(message as string)

        switch (reactionName) {
          case 'setAvatar':
            const avatar: OwnerAvatar | PlayerAvatar = data
            this.venueActivity!.setAvatar(avatar)
            break
          case 'moveAvatar':
            const avatarParams: AvatarParams = data
            this.venueActivity!.moveAvatar(avatarParams)
            break
          case 'reflectChatMessage':
            const chatMessage: ChatMessage = data
            this.venueActivity!.reflectChatMessage(chatMessage)
            break
          case 'promptPlayersForMutualSubscriptions':
            const index: number = data
            this.promptPlayersForMutualSubscriptions(index)
            break
          default:
            break
        }
      })
      resolve()
    })
  }

  subscribeToAllPlayers = async () => {
    try {
      const channel = this.skywayChannel!.channel!
      const numberOfParticipant = channel.publications.length
      for (let i = 1; i < numberOfParticipant; i++) {
        const playerPublicationId = channel.publications[i].id
        const dataStream = await this.skywayChannel!.subscribe(
          playerPublicationId
        )
        await this.setHandleDataWrite(dataStream)
        this.venueActivity!.calculateProgress(numberOfParticipant - 1)
      }
    } catch {
      throw new Error()
    }
  }

  checkPlayerSubscribedToOwner = async (playerIndex: string) => {
    let iteration = 0
    const maxIteration = 10
    while (iteration < maxIteration) {
      if (this.skywayChannel!.agent!.metadata === playerIndex) {
        break
      }
      await this.delay(1000)
      iteration++
    }
    if (iteration === maxIteration) {
      throw new Error()
    }
  }

  promptOwnerSubscriptionToPlayers = async () => {
    try {
      const channel = this.skywayChannel!.channel!
      const numberOfParticipant = channel.publications.length
      for (let i = 1; i < numberOfParticipant; i++) {
        const playerIndex = (i - 1).toString()
        const playerPublication = channel.publications[i]
        await this.skywayChannel!.updateParticipantMetadata(
          playerPublication,
          playerIndex
        )
        await this.checkPlayerSubscribedToOwner(playerIndex)
        this.venueActivity!.calculateProgress(numberOfParticipant - 1)
      }
    } catch {
      throw new Error()
    }
  }

  promptPlayersForMutualSubscriptions = (index: number) => {
    const channel = this.skywayChannel!.channel!
    const numberOfParticipant = channel.publications.length
    const maxIndex = numberOfParticipant - 2
    if (index > maxIndex) {
      this.venueActivity!.startGame(this)
      this.skywayDataStream!.promptStartGame()
      this.venueActivity!.stopConnectionLoading()
    } else {
      this.venueActivity!.calculateProgress(numberOfParticipant - 1)
      this.skywayDataStream!.promptSubscribeToAllPlayers(index)
    }
  }

  startConnection = async (players: Avatar[]) => {
    try {
      this.venueActivity!.startConnectionLoading()
      await this.skywayChannel!.updateChannelMetadata('')
      await this.subscribeToAllPlayers()
      await this.promptOwnerSubscriptionToPlayers()
      this.skywayDataStream!.writeAvatar(this)
      this.skywayDataStream!.writeAllPlayerAvatars(players)
      this.promptPlayersForMutualSubscriptions(0)
    } catch {
      this.skywayChannel!.updateChannelMetadata('error')
    }
  }

  announceQuizNumber = (quizNumber: number) => {
    const announceText = `${quizNumber}問目！`
    this.venueActivity!.reflectAnnounceText(announceText)
    this.skywayDataStream!.writeAnnounceText(announceText)
  }

  announceShortPause = () => {
    const announceText = ''
    this.venueActivity!.reflectAnnounceText(announceText)
    this.skywayDataStream!.writeAnnounceText(announceText)
  }

  announceQuestion = (question: string) => {
    const announceText = question
    this.venueActivity!.reflectAnnounceText(announceText)
    this.skywayDataStream!.writeAnnounceText(announceText)
  }

  announceQuizStart = () => {
    const announceText = 'スタート！'
    this.venueActivity!.startQuiz(announceText)
    this.skywayDataStream!.promptStartQuiz(announceText)
  }

  announceQuizStop = () => {
    const announceText = 'ストップ！'
    this.venueActivity!.reflectAnnounceText(announceText)
    this.skywayDataStream!.writeAnnounceText(announceText)
  }

  announceSuspense = () => {
    const announceText = '正解は・・・'
    this.venueActivity!.reflectAnnounceText(announceText)
    this.skywayDataStream!.writeAnnounceText(announceText)
  }

  announceCorrectAnswer = (correctAnswer: string) => {
    const announceText = correctAnswer
    this.venueActivity!.reflectAnnounceText(announceText)
    this.skywayDataStream!.writeAnnounceText(announceText)
  }

  announceExplanation = (explanation: string) => {
    const announceText = explanation
    this.venueActivity!.checkExplanation(announceText)
    this.skywayDataStream!.promptCheckExplanation(announceText)
  }

  announceJudge = (correctAnswer: string) => {
    this.venueActivity!.judge(correctAnswer)
    this.skywayDataStream!.promptJudge(correctAnswer)
  }

  announce = async (currentQuizNumber: number, quiz: Quiz) => {
    this.venueActivity!.setQuizLoading()
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
    this.venueActivity!.clearQuizLoading()
  }
}

export default OwnerAvatar
