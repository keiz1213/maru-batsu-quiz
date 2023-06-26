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

class PlayerAvatar extends Avatar {
  constructor(
    id: number,
    uid: string,
    owner: boolean,
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
      owner,
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

  setHandleMetaDataUpdate = async () => {
    this.agent?.onMetadataUpdated.add(async () => {
      console.log('--------------------onMetadataUpdated')
      const myIndx = this.agent?.metadata as string
      console.log(`自分のmetadataが[${myIndx}]に更新された`)
      this.index = parseInt(myIndx)
      console.log(`自分のindexに[${this.index}]がセットされた`)

      // ----------ここからtestUser用。後で消す。testUserは自分のindexが確定するまではuserに関するプロパティが初期化できないのでここで初期化する
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
      console.log('--------------------onMetadataUpdated')
      this.sendMyAvatar()
    })
  }

  setHandleWriteData = async (stream: RemoteDataStream) => {
    await new Promise<void>(async (resolve) => {
      stream.onData.add(async (message) => {
        const { reaction, data } = JSON.parse(message as string)
        const announceText: string = data

        switch (reaction) {
          case 'startGameAction':
            this.reaction?.startGameAction(this)
            break
          case 'placeAvatarAction':
            const avatar: Avatar = data
            this.reaction?.placeAvatarAction(avatar)
            break
          case 'placeAllPlayerAvatarAction':
            const players: Avatar[] = data
            this.reaction?.placeAllPlayerAvatarAction(players)
            break
          case 'moveAvatarAction':
            const avatarParams: AvatarParams = data
            this.reaction?.moveAvatarAction(avatarParams)
            break
          case 'updateAnnounceTextAction':
            if (announceText === 'ストップ！') {
              this.lockMyAvatar()
            }
            this.reaction?.updateAnnounceTextAction(announceText)
            break
          case 'startQuizAction':
            this.reaction?.startQuizAction(announceText)
            break
          case 'checkExplanationAction':
            this.unLockMyAvatar()
            this.reaction?.checkExplanationAction(announceText)
            break
          case 'updateChatAction':
            const chatMessage: ChatMessage = data
            this.reaction?.updateChatAction(chatMessage)
            break
          case 'executeJudgeAction':
            const correctAnswer: string = data
            this.reaction?.executeJudgeAction(correctAnswer)
            break
          case 'subscribeAllPlayers':
            const index: number = data
            await this.subscribeAllPlayers(index)
            break
          default:
            break
        }
      })
      resolve()
    })
  }

  updateOwnerMetadata = async (
    ownerPublication: RoomPublication,
    myIndex: string
  ) => {
    await ownerPublication.publisher.updateMetadata(myIndex)
  }

  subscribeOwner = async () => {
    console.log('-----------------------subscribeOwner')
    const myIndex = this.index as number
    const ownerPublication = this.channel?.publications[0] as RoomPublication
    const ownerPublicationId = ownerPublication?.id as string
    const stream = await this.subscribe(ownerPublicationId)
    console.log('ownerをサブスクしました')
    // this.sendMyAvatar()
    // await this.delay(1000)
    await this.setHandleWriteData(stream)
    console.log('ownerのdatastreamにハンドラをセットしました')
    await this.updateOwnerMetadata(ownerPublication, myIndex.toString())
    console.log('オーナーのmetadata更新しました')
    console.log('-----------------------subscribeOwner')
  }

  subscribeAllPlayers = async (index: number) => {
    const myIndex = this.index as number
    if (index === myIndex) {
      console.log(
        `myIndex:[${myIndex}]が他の全playerのサブスクを開始します・・・`
      )
      const numberOfParticipant = this.channel?.publications.length as number
      for (let i = 1; i < numberOfParticipant; i++) {
        console.log('roop開始・・・')
        if (this.channel?.publications[i] === this.publication) continue
        const playerPublicationId = this.channel?.publications[i].id as string
        const stream = await this.subscribe(playerPublicationId)
        console.log(`publicationId[${playerPublicationId}]のサブスク完了`)
        await this.setHandleWriteData(stream)
        console.log(
          `publicationId[${playerPublicationId}]のstreamにハンドラセット完了`
        )
      }
      console.log('他の全playerのサブスクとハンドラセット完了')
      const writer = new DataStreamWriter(this)
      console.log(
        'myIndexに1を足して次のindexを書き込み、ownerに完了を報告します'
      )
      writer.writeReportSubscribed(myIndex + 1)
    }
  }
}

export default PlayerAvatar
