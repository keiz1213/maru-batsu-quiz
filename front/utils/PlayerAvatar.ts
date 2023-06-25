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

  setHandleMetaDataUpdate = async () => {
    this.agent?.onMetadataUpdated.add(async () => {
      const myIndx = this.agent?.metadata as string
      this.index = parseInt(myIndx)

      // ----------ここからtestUser用。後で消す。testUserは自分のindexが確定するまではuserに関するプロパティが初期化できないのでここで初期化する
      this.id = this.index + 2
      this.uid = `testUid-${this.index + 1}`
      this.name = `testName-${this.index + 1}`
      this.avatarUrl = new URL(
        `../assets/images/${this.index + 1}.svg`,
        import.meta.url
      ).href
      // ---------ここまで
      await this.subscribeOwner()
    })
  }

  setHandleWriteData = async (stream: RemoteDataStream) => {
    await new Promise<void>(async (resolve) => {
      stream.onData.add(async (message) => {
        const { reaction, data } = JSON.parse(message as string)
        const announceText: string = data

        switch (reaction) {
          case 'startTheGame':
            this.reaction?.startTheGame(this)
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
    const myIndex = this.index as number
    const ownerPublication = this.channel?.publications[0] as RoomPublication
    const ownerPublicationId = ownerPublication?.id as string
    const stream = await this.subscribe(ownerPublicationId)
    this.sendMyAvatar()
    await this.delay(1000)
    await this.setHandleWriteData(stream)
    await this.updateOwnerMetadata(ownerPublication, myIndex.toString())
  }

  subscribeAllPlayers = async (index: number) => {
    const myIndex = this.index as number
    if (index === myIndex) {
      const numberOfParticipant = this.channel?.publications.length as number
      for (let i = 1; i < numberOfParticipant; i++) {
        if (this.channel?.publications[i] === this.publication) continue
        const playerPublicationId = this.channel?.publications[i].id as string
        const stream = await this.subscribe(playerPublicationId)
        await this.setHandleWriteData(stream)
      }
      const writer = new DataStreamWriter(this)
      writer.writeReportSubscribed(myIndex + 1)
    }
  }
}

export default PlayerAvatar
