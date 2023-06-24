import Avatar from '@/utils/Avatar'
import Reaction from '@/utils/Reaction'
import {
  LocalDataStream,
  LocalP2PRoomMember,
  RoomPublication,
  RemoteDataStream,
  P2PRoom
} from '@skyway-sdk/room'

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
    publication: RoomPublication<LocalDataStream> | null,
    metadata: string
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
      publication,
      metadata
    )
  }

  setHandleWriteData = async (stream: RemoteDataStream) => {
    await new Promise<void>(async (resolve) => {
      stream.onData.add(async (message) => {
        const { reaction, data } = JSON.parse(message as string)

        switch (reaction) {
          case 'placeAvatar':
            this.reaction?.placeAvatar(data)
            break
          case 'startGame':
            this.reaction?.startTheGame()
            break
          case 'moveOtherAvatar':
            this.reaction?.moveOtherAvatar(data)
            break
          case 'acceptAnnounce':
            this.reaction?.acceptAnnounce(data)
            break
          case 'startQuiz':
            this.reaction?.startQuiz(data)
            break
          case 'stopTimer':
            this.reaction?.stopTimer(data)
            break
          case 'updateChat':
            this.reaction?.updateChat(data)
            break
          case 'executeJudge':
            this.reaction?.executeJudge()
            break
          case 'subscribeAll':
            this.subscribeAllPlayers(data)
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
    myIndex: number
  ) => {
    await ownerPublication.publisher.updateMetadata(myIndex.toString())
  }

  subscribeOwner = async () => {
    const myIndex = this.index as number
    const ownerPublication = this.channel?.publications[0] as RoomPublication
    const ownerPublicationId = ownerPublication?.id as string
    const stream = await this.subscribe(ownerPublicationId)
    await this.setHandleWriteData(stream)
    const writer = new DataStreamWriter(this)
    writer.writeAvatar()
    await this.updateOwnerMetadata(ownerPublication, myIndex)
  }

  subscribeAllPlayers = async (index: number) => {
    const myIndex = this.index as number
    if (index === myIndex) {
      const numberOfPlayers = (this.channel?.publications.length as number) - 1
      for (let i = 1; i < numberOfPlayers; i++) {
        if (this.channel?.publications[i] === this.publication) continue
        const playerPublicationId = this.channel?.publications[i].id as string
        const stream = await this.subscribe(playerPublicationId)
        await this.setHandleWriteData(stream)
      }
      const writer = new DataStreamWriter(this)
      writer.writeReportSubscribed(myIndex)
    }
  }
}

export default PlayerAvatar
