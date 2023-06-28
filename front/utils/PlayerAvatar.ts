import Avatar from '@/utils/Avatar'
import DataStreamHandler from '@/utils/DataStreamHandler'
import DataStreamWriter from '@/utils/DataStreamWriter'
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

class PlayerAvatar extends Avatar {
  constructor(
    id: number,
    uid: string,
    owner: boolean,
    name: string,
    avatarUrl: string,
    index: number | null,
    writer: DataStreamWriter,
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
      writer,
      handler,
      channel,
      localDataStream,
      agent,
      publication
    )
  }

  // test用
  randomDelay = () => {
    return Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000
  }

  setHandleMetaDataUpdate = async () => {
    this.agent?.onMetadataUpdated.add(async () => {
      try {
        if (this.agent?.metadata === 'error') {
          this.handler?.updateErrorMessage('エラーが発生しました！')
        } else {
          console.log('--------------------onMetadataUpdated')
          const myIndx = this.agent?.metadata as string
          console.log(`自分のmetadataが[${myIndx}]に更新された`)
          this.index = parseInt(myIndx)
          console.log(`自分のindexに[${this.index}]がセットされた`)

          // ----------ここからtestUser用。後で消す。testUserは自分のindexが確定するまではプロパティが初期化できないのでここで初期化する
          this.id = this.index + 2
          this.uid = `testUid-${this.index + 1}`
          this.name = `testName-${this.index + 1}`
          this.avatarUrl = new URL(
            `../assets/images/${this.index + 1}.svg`,
            import.meta.url
          ).href
          // ---------ここまで
          console.log(`自分の
          idが[${this.id}]に設定された
          uidが[${this.uid}]に設定された
          nameが[${this.name}]に設定された
          avatarUrlが[${this.avatarUrl}]に設定された
          `)
          await this.subscribeOwner()
          console.log(`ownerを
          ・サブスク完了!
          ・ハンドラセット完了!
          ・metadata更新完了!`)
          console.log('自分のアバターをownerに送信します')
          this.sendMyAvatar()
          console.log('--------------------onMetadataUpdated')
        }
      } catch (error) {
        this.handler?.updateErrorMessage('エラーが発生しました！')
        this.updateAllMetadataWithError()
      }
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
        const announceText: string = data

        switch (handlerName) {
          case 'startGameAction':
            this.handler?.startGameAction(this)
            break
          case 'placeAvatarAction':
            const avatar: Avatar = data
            this.handler?.placeAvatarAction(avatar)
            break
          case 'placeAllPlayerAvatarAction':
            const players: Avatar[] = data
            this.handler?.placeAllPlayerAvatarAction(players)
            break
          case 'moveAvatarAction':
            const avatarParams: AvatarParams = data
            this.handler?.moveAvatarAction(avatarParams)
            break
          case 'updateAnnounceTextAction':
            if (announceText === 'ストップ！') {
              this.lockMyAvatar()
            }
            this.handler?.updateAnnounceTextAction(announceText)
            break
          case 'startQuizAction':
            this.handler?.startQuizAction(announceText)
            break
          case 'checkExplanationAction':
            this.unLockMyAvatar()
            this.handler?.checkExplanationAction(announceText)
            break
          case 'updateChatAction':
            const chatMessage: ChatMessage = data
            this.handler?.updateChatAction(chatMessage)
            break
          case 'executeJudgeAction':
            const correctAnswer: string = data
            this.handler?.executeJudgeAction(correctAnswer)
            break
          case 'subscribeAllPlayers':
            const index: number = data
            await this.subscribeAllPlayers(index)
            break
          // ---------test--------
          case '_subscribeAllPlayers':
            await this._subscribeAllPlayers(data)
            // --------ここまで----------
            break
          default:
            break
        }
      })
      resolve()
    })
  }

  // player → owner
  subscribeOwner = async () => {
    //-----test用-----------
    // await this.delay(this.randomDelay())
    //----------------
    console.log('-----------------------subscribeOwner')
    const myIndex = this.index as number
    const ownerPublication = this.channel?.publications[0] as RoomPublication
    const ownerPublicationId = ownerPublication?.id as string
    // -------------test-----------
    // const invalidId = 'invalid'
    // const stream = await this.subscribe(invalidId)
    // ---------------------------
    const stream = await this.subscribe(ownerPublicationId)
    console.log('ownerをサブスクしました')
    await this.setHandleDataStream(stream)
    console.log('ownerのdatastreamにハンドラをセットしました')
    await this.updateMetadataWith(ownerPublication, myIndex.toString())
    console.log('オーナーのmetadataを自indexで更新し、完了を報告しました')
    console.log('-----------------------subscribeOwner')
  }

  subscribeAllPlayers = async (index: number) => {
    try {
      const myIndex = this.index as number
      if (index === myIndex) {
        //-----test用-----------
        // await this.delay(this.randomDelay())
        //----------------

        console.log(
          `myIndex:[${myIndex}]が他の全playerのサブスクを開始します・・・`
        )
        const numberOfParticipant = this.channel?.publications.length as number
        for (let i = 1; i < numberOfParticipant; i++) {
          console.log('roop開始・・・')
          if (this.channel?.publications[i] === this.publication) continue
          const playerPublicationId = this.channel?.publications[i].id as string
          //----------test-----------
          // const invalidId = 'invalid'
          // const stream = await this.subscribe(invalidId)
          //-------------------------
          const stream = await this.subscribe(playerPublicationId)
          console.log(`publicationId[${playerPublicationId}]のサブスク完了`)
          await this.setHandleDataStream(stream)
          console.log(
            `publicationId[${playerPublicationId}]のstreamにハンドラセット完了`
          )
        }
        console.log('他の全playerのサブスクとハンドラセット完了')
        console.log(
          'myIndexに1を足して次のindexを書き込み、ownerに完了を報告します'
        )
        this.writer?.reportSubscribedAllPlayers(this, myIndex + 1)
      }
    } catch {
      this.handler?.updateErrorMessage('エラーが発生しました！')
      this.updateAllMetadataWithError()
    }
  }

  //------------test---------------
  _subscribeAllPlayers = async (index: number) => {
    const myIndex = this.index as number
    if (index === myIndex) {
      //-----test用-----------
      // await this.delay(this.randomDelay())
      //----------------
      try {
        console.log(
          `myIndex:[${myIndex}]が他の全playerのサブスクを開始します・・・`
        )
        const numberOfParticipant = this.channel?.publications.length as number
        for (let i = 1; i < numberOfParticipant; i++) {
          console.log('roop開始・・・')
          if (this.channel?.publications[i] === this.publication) continue
          const playerPublicationId = this.channel?.publications[i].id as string
          //----------test-----------
          // const invalidId = 'invalid'
          // const stream = await this.subscribe(invalidId)
          //-------------------------
          const stream = await this.subscribe(playerPublicationId)
          console.log(`publicationId[${playerPublicationId}]のサブスク完了`)
          await this.setHandleDataStream(stream)
          console.log(
            `publicationId[${playerPublicationId}]のstreamにハンドラセット完了`
          )
        }
        console.log('他の全playerのサブスクとハンドラセット完了')
        console.log(
          'myIndexに1を足して次のindexを書き込み、ownerに完了を報告します'
        )
        this.writer?._reportSubscribedAllPlayers(this, myIndex + 1)
      } catch (error) {
        if (error instanceof Error) {
          this.handler?.updateErrorMessage('エラーが発生しました！')
          this.updateAllMetadataWithError()
        }
      }
    }
  }
  //------------ここまで---------------
}

export default PlayerAvatar
