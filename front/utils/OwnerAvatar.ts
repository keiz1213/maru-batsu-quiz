import Avatar from '@/utils/Avatar'
import Reaction from '@/utils/Reaction'
import {
  LocalDataStream,
  LocalP2PRoomMember,
  RoomPublication,
  RemoteDataStream,
  P2PRoom
} from '@skyway-sdk/room'
import { AvatarParams } from '@/types/AvatarParams'
import { ChatMessage } from '@/types/ChatMessage'

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
    publication: RoomPublication<LocalDataStream> | null
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
          case 'checkSubscribed':
            const index: number = data
            this.checkSubscribedAll(index)
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

  checkSubscribedAll = async (index: number) => {
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
      if (this.publication?.publisher.metadata === playerIndex) {
        break
      }
      await this.delay(1000)
    }
  }

  updateAllPlayerMetaData = async () => {
    const allPublications = this.channel?.publications as RoomPublication[]
    for (let i = 1; i < allPublications.length; i++) {
      const playerIndex = (i -1).toString()
      await this.updatePlayerMetaData(allPublications[i],playerIndex)
      await this.checkMyMetaData(playerIndex)
    }
  }
}

export default OwnerAvatar
