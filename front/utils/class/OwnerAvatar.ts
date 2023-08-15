import { AvatarParams } from '~/types/avatarParams'
import { ChatMessage } from '~/types/chatMessage'
import { Quiz } from '~/types/quiz'
import Avatar from '~/utils/class/Avatar'
import SkyWay from '~/utils/class/SkyWay'
import InfluentialAction from '~/utils/class/InfluentialAction'
import NonInfluentialAction from '~/utils/class/NonInfluentialAction'
import { RoomPublication, RemoteDataStream } from '@skyway-sdk/room'

class OwnerAvatar extends Avatar {
  constructor(
    id: string,
    owner: boolean,
    name: string,
    avatarUrl: string,
    index: number | null,
    skyway: SkyWay | null,
    influentialAction: InfluentialAction | null,
    nonInfluentialAction: NonInfluentialAction | null
  ) {
    super(
      id,
      owner,
      name,
      avatarUrl,
      index,
      skyway,
      influentialAction,
      nonInfluentialAction
    )
  }

  calculateProgress = (numberOfPlayers: number) => {
    const progress = (1 / 3) * (1 / numberOfPlayers)
    const { addCompleted } = useProgress()
    addCompleted(progress * 100)
  }

  onPlayerEnterChannel = () => {
    this.skyway!.channel!.onPublicationListChanged.add(async () => {
      const publisherName = this.skyway!.channel!.publications.slice(-1)[0]
        .publisher.name as string
      const publisherAvatarUrl = this.skyway!.channel!.publications.slice(-1)[0]
        .publisher.metadata as string
      const participantData = {
        name: publisherName,
        avatarUrl: publisherAvatarUrl
      }
      this.nonInfluentialAction!.addParticipant(participantData)
    })
  }

  setUpChannel = async (chatVisible: boolean) => {
    if (chatVisible) {
      await this.updateChannelMetadataWith('chatVisible')
    } else {
      await this.updateChannelMetadataWith('accetable')
    }
    this.onChannelMetadataUpdated()
    this.nonInfluentialAction!.reactiveVenue.judge.addOwner(this)
    this.onPlayerEnterChannel()
  }

  onDataWrite = async (stream: RemoteDataStream) => {
    await new Promise<void>(async (resolve) => {
      stream.onData.add(async (message) => {
        const { reactionName, data } = JSON.parse(message as string)

        switch (reactionName) {
          case 'setAvatar':
            const avatar: Avatar = data
            this.nonInfluentialAction!.setAvatar(avatar)
            break
          case 'moveAvatar':
            const avatarParams: AvatarParams = data
            this.nonInfluentialAction!.moveAvatar(avatarParams)
            break
          case 'reflectChatMessage':
            const chatMessage: ChatMessage = data
            this.nonInfluentialAction!.reflectChatMessage(chatMessage)
            break
          case 'promptSubscribeToAllPlayersForPlayer':
            const index: number = data
            this.promptSubscribeToAllPlayersForPlayer(index)
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
      const numberOfParticipant = this.skyway!.channel!.publications
        .length as number
      for (let i = 1; i < numberOfParticipant; i++) {
        const playerPublicationId = this.skyway!.channel!.publications[i]
          .id as string
        const stream = await this.subscribeTo(playerPublicationId)
        await this.onDataWrite(stream)
        this.calculateProgress(numberOfParticipant - 1)
        console.log(`[:subscribeToAllPlayers] ${i}人目をサブスク完了`)
      }
    } catch {
      throw new Error()
    }
  }

  checkPlayerSubscribedToOwner = async (
    playerIndex: string,
    maxIteration: number
  ) => {
    let iteration = 0
    while (iteration < maxIteration) {
      if (this.skyway!.agent!.metadata === playerIndex) {
        break
      }
      await this.delay(1000)
      iteration++
    }
    if (iteration === maxIteration) {
      throw new Error()
    }
  }

  promptSubscribeToOwnerForAllPlayers = async () => {
    try {
      const allPublications = this.skyway!.channel!
        .publications as RoomPublication[]
      for (let i = 1; i < allPublications.length; i++) {
        const playerIndex = (i - 1).toString()
        await this.updateParticipantMetadataWith(
          allPublications[i],
          playerIndex
        )
        console.log(
          `[:promptSubscribeToOwnerForAllPlayers] ${i}人目にownerをサブスクするように促します`
        )
        await this.checkPlayerSubscribedToOwner(playerIndex, 10)
        this.calculateProgress(
          allPublications.length - 1
        )
        console.log(
          `[:promptSubscribeToOwnerForAllPlayers] ${i}人目がownerをサブスクサブスク完了しました`
        )
      }
    } catch {
      throw new Error()
    }
  }

  promptSubscribeToAllPlayersForPlayer = (index: number) => {
    const numberOfParticipants = this.skyway!.channel!.publications
      .length as number
    // 例) 参加者5 - 1(owner) -1(0start) = 3(maxIndex)
    const maxIndex = numberOfParticipants - 2
    if (index > maxIndex) {
      console.log(
        `[:promptSubscribeToAllPlayersForPlayer] 全player同士のサブスクを完了しました`
      )
      this.nonInfluentialAction!.startTheGame(this)
      this.influentialAction!.promptStartTheGame()
    } else {
      console.log(
        `[:promptSubscribeToAllPlayersForPlayer] index=${index} のplayerに対して他の全playerをサブスクするように促します`
      )
      this.influentialAction!.promptSubscribeToAllPlayers(index)
      this.calculateProgress(
        numberOfParticipants - 1
      )
    }
  }

  sendAllPlayerAvatars = (players: Avatar[]) => {
    this.influentialAction!.writeAllPlayerAvatars(players)
  }

  startConnection = async (players: Avatar[]) => {
    try {
      console.log(`[:startConnection] 接続開始`)
      await this.updateChannelMetadataWith('')
      console.log(`[:startConnection] channelのmetadataをクリア`)
      await this.subscribeToAllPlayers()
      console.log(`[:startConnection] ownerが全playerサブスク完了`)
      await this.promptSubscribeToOwnerForAllPlayers()
      console.log(`[:startConnection] 全playerがownerをサブスク完了`)
      this.sendMyAvatar()
      console.log(`[:startConnection] 全playerに対してownerのavatarを送信完了`)
      this.sendAllPlayerAvatars(players)
      console.log(
        `[:startConnection] 全playerに対して全playerのavatarを送信完了`
      )
      console.log(`[:startConnection] player同士のサブスクを開始します`)
      this.promptSubscribeToAllPlayersForPlayer(0)
    } catch {
      this.nonInfluentialAction!.notifySkyWayError()
      this.updateChannelMetadataWith('error')
    }
  }

  checkQuestion = () => {
    this.nonInfluentialAction!.reactiveVenue.judge.openQuestion()
  }

  closeCheckQuestion = () => {
    this.nonInfluentialAction!.reactiveVenue.judge.closeQuestion()
  }

  announceQuizNumber = (quizNumber: number) => {
    const announceText = `${quizNumber}問目！`
    this.nonInfluentialAction!.reflectAnnounceText(announceText)
    this.influentialAction!.writeAnnounceText(announceText)
  }

  announceShortPause = () => {
    const announceText = ''
    this.nonInfluentialAction!.reflectAnnounceText(announceText)
    this.influentialAction!.writeAnnounceText(announceText)
  }

  announceQuestion = (question: string) => {
    const announceText = question
    this.nonInfluentialAction!.reflectAnnounceText(announceText)
    this.influentialAction!.writeAnnounceText(announceText)
  }

  announceQuizStart = () => {
    const announceText = 'スタート！'
    this.nonInfluentialAction!.startTheQuiz(announceText)
    this.influentialAction!.promptStartTheQuiz(announceText)
  }

  announceQuizStop = () => {
    const announceText = 'ストップ！'
    this.nonInfluentialAction!.reflectAnnounceText(announceText)
    this.influentialAction!.writeAnnounceText(announceText)
  }

  announceSuspense = () => {
    const announceText = '正解は・・・'
    this.nonInfluentialAction!.reflectAnnounceText(announceText)
    this.influentialAction!.writeAnnounceText(announceText)
  }

  announceCorrectAnswer = (correctAnswer: string) => {
    const announceText = correctAnswer
    this.nonInfluentialAction!.reflectAnnounceText(announceText)
    this.influentialAction!.writeAnnounceText(announceText)
  }

  announceExplanation = (explanation: string) => {
    const announceText = explanation
    this.nonInfluentialAction!.checkExplanation(announceText)
    this.influentialAction!.promptCheckExplanation(announceText)
  }

  announceJudge = (correctAnswer: string) => {
    this.nonInfluentialAction!.executeJudge(correctAnswer)
    this.influentialAction!.promptExecuteJudge(correctAnswer)
  }

  announce = async (currentQuizNumber: number, quiz: Quiz) => {
    this.nonInfluentialAction!.setLoading()
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
    this.nonInfluentialAction!.clearLoading()
  }
}

export default OwnerAvatar
