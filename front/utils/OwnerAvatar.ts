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

  // roomに入ってきた人の名前を収集
  setHandlePublishListChanged = () => {
    this.channel?.onPublicationListChanged.add(async () => {
      const publisherName = this.channel?.publications.slice(-1)[0].publisher
        .name as string
      this.handler?.addPublisherNameAction(publisherName)
    })
  }

  // サブスクした相手のstreamにハンドラをセットする
  // 相手がstreamにhandleNameとdataを書き込む
  // handleNameは対応するアクション
  // dataは書き込み内容
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
          case 'promptSubscribeAllPlayers':
            const index: number = data
            this.promptSubscribeAllPlayers(index)
            break
          default:
            break
        }
      })
      resolve()
    })
  }

  // owner → all player
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

  // ownerがplayerのmetadataをindexで更新することで、そのplayerは
  // 1. 自分のindexが確定する
  // 2. indexを自アバターにセットする
  // 3. playerがownerをサブスク&ハンドラセットする
  // 4. playerが自indexでownerのmetadataを更新することで完了を報告する
  private updatePlayerMetaData = async (
    playerPublication: RoomPublication,
    playerIndex: string
  ) => {
    await playerPublication.publisher.updateMetadata(playerIndex)
  }

  // playerがownerをサブスク&ハンドラセットしたか確認する
  private checkMyMetaData = async (playerIndex: string) => {
    // 自分のmetaDataが更新されるまでroop
    while (true) {
      // playerはownerに対するサブスクとハンドラセットの完了を、ownerのmetadataを自indexで更新することで報告する
      if (this.agent?.metadata === playerIndex) {
        console.log(
          `index: ${this.agent?.metadata} がownerをサブスク&ハンドラセット完了しました`
        )
        break
      }
      await this.delay(100)
      console.log('自分のmetadataを確認中・・・')
    }
  }

  // 全playerに対してownerをサブスク&ハンドラセットするように促す
  promptAllPlayersSubscribeOwner = async () => {
    const allPublications = this.channel?.publications as RoomPublication[]
    for (let i = 1; i < allPublications.length; i++) {
      const playerIndex = (i - 1).toString()
      console.log(
        `[${allPublications[i]}]のmetadataを[${playerIndex}]に更新します・・・`
      )
      await this.updatePlayerMetaData(allPublications[i], playerIndex)
      console.log(
        `[${playerIndex}]に更新されたplayerがownerをサブスク&ハンドラセットしたかどうか確認開始・・・`
      )
      // 待機
      await this.checkMyMetaData(playerIndex)
    }
  }

  // この関数は事実上roopする
  // indexのplayerに他の全playerをサブスク&ハンドラセットするように促す
  promptSubscribeAllPlayers = (index: number) => {
    const numberOfParticipant = this.channel?.publications.length as number
    // owner分 -1
    // 0startのため -1
    // 例) 参加者5 - 1(owner) -1(0start) = 3(maxIndex)
    const maxIndex = numberOfParticipant - 2
    // playerは自index + 1を書き込んでくるので、最後のplayerが書き込んだindexはmaxIndexを超える(全playerが完了)
    if (index > maxIndex) {
      console.log('全参加者同士接続完了')
      this.handler?.startGame(this)
      const writer = new DataStreamWriter(this)
      writer.promptStartGame()
    } else {
      console.log(
        `index: [${index}]のplayerが全playerのサブスク&ハンドラセットを開始・・・`
      )
      const writer = new DataStreamWriter(this)
      // indexのplayerに対して全playerをサブスク&ハンドラセットするように伝える
      // indexのplayerがサブスク&ハンドラセットするとこのpromptPlayerSubscribeAllPlayersが再度呼び出される(playerが自分の次のindexをdatastreamに書き込み、それにハンドラとして設定されているpromptPlayerSubscribeAllPlayersが再度呼び出される)
      writer.promptSubscribeAllPlayers(index)
    }
  }

  sendAllPlayerAvatar = (players: object) => {
    const writer = new DataStreamWriter(this)
    writer.sendAllPlayerAvatar(players)
  }

  announceQuizNumber = (quizNumber: number) => {
    const announceText = `${quizNumber}問目！`
    const writer = new DataStreamWriter(this)
    this.handler?.updateAnnounceText(announceText)
    writer.sendAnnounceText(announceText)
  }

  announceShortPause = () => {
    const announceText = ''
    const writer = new DataStreamWriter(this)
    this.handler?.updateAnnounceText(announceText)
    writer.sendAnnounceText(announceText)
  }

  announceQuestion = (question: string) => {
    const announceText = question
    const writer = new DataStreamWriter(this)
    this.handler?.updateAnnounceText(announceText)
    writer.sendAnnounceText(announceText)
  }

  announceQuizStart = () => {
    const announceText = 'スタート！'
    const writer = new DataStreamWriter(this)
    this.handler?.startQuizAction(announceText)
    writer.promptStartQuiz(announceText)
  }

  announceQuizStop = () => {
    const announceText = 'ストップ！'
    const writer = new DataStreamWriter(this)
    this.handler?.updateAnnounceText(announceText)
    writer.sendAnnounceText(announceText)
  }

  announceSuspense = () => {
    const announceText = '正解は・・・'
    const writer = new DataStreamWriter(this)
    this.handler?.updateAnnounceText(announceText)
    writer.sendAnnounceText(announceText)
  }

  announceCorrectAnswer = (correctAnswer: string) => {
    const announceText = correctAnswer
    const writer = new DataStreamWriter(this)
    this.handler?.updateAnnounceText(announceText)
    writer.sendAnnounceText(announceText)
  }

  announceExplanation = (explanation: string) => {
    const announceText = explanation
    const writer = new DataStreamWriter(this)
    this.handler?.checkExplanationAction(announceText)
    writer.promptCheckExplanation(announceText)
  }

  announceJudge = (correctAnswer: string) => {
    this.handler?.executeJudgeAction(correctAnswer)
    const writer = new DataStreamWriter(this)
    writer.promptJudge(correctAnswer)
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
