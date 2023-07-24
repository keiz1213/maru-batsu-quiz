import { AvatarParams } from '~/types/avatarParams'
import { ChatMessage } from '~/types/chatMessage'
import Avatar from '~/utils/class/Avatar'
import SkyWay from '~/utils/class/SkyWay'
import InfluentialAction from '~/utils/class/InfluentialAction'
import NonInfluentialAction from '~/utils/class/NonInfluentialAction'
import { RoomPublication, RemoteDataStream } from '@skyway-sdk/room'

class PlayerAvatar extends Avatar {
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

  setMyIndex = (myIndx: number) => {
    this.index = myIndx
  }

  onMyMetaDataUpdated = () => {
    this.skyway!.agent!.onMetadataUpdated.add(async () => {
      try {
        const myIndx = this.skyway!.agent!.metadata as string
        this.setMyIndex(parseInt(myIndx))
        await this.subscribeToOwner()
        this.sendMyAvatar()
      } catch {
        this.nonInfluentialAction!.notifySkyWayError()
        this.updateChannelMetadataWith('error')
      }
    })
  }

  setUpChannel = () => {
    this.onMyMetaDataUpdated()
    this.onChannelMetadataUpdated()
  }

  onDataWrite = async (stream: RemoteDataStream) => {
    await new Promise<void>(async (resolve) => {
      stream.onData.add(async (message) => {
        const { reactionName, data } = JSON.parse(message as string)
        const announceText: string = data

        switch (reactionName) {
          case 'startTheGame':
            this.nonInfluentialAction!.startTheGame(this)
            break
          case 'setAvatar':
            const avatar: Avatar = data
            this.nonInfluentialAction!.setAvatar(avatar)
            break
          case 'setAllPlayerAvatars':
            const players: Avatar[] = data
            this.nonInfluentialAction!.setAllPlayerAvatars(players)
            break
          case 'moveAvatar':
            const avatarParams: AvatarParams = data
            this.nonInfluentialAction!.moveAvatar(avatarParams)
            break
          case 'reflectAnnounceText':
            if (announceText === 'ストップ！') {
              this.lockMyAvatar()
            }
            this.nonInfluentialAction!.reflectAnnounceText(announceText)
            break
          case 'startTheQuiz':
            this.nonInfluentialAction!.startTheQuiz(announceText)
            break
          case 'checkExplanation':
            this.unLockMyAvatar()
            this.nonInfluentialAction!.checkExplanation(announceText)
            break
          case 'reflectChatMessage':
            const chatMessage: ChatMessage = data
            this.nonInfluentialAction!.reflectChatMessage(chatMessage)
            break
          case 'executeJudge':
            const correctAnswer: string = data
            this.nonInfluentialAction!.executeJudge(correctAnswer)
            break
          case 'subscribeToAllPlayers':
            const index: number = data
            await this.subscribeToAllPlayers(index)
            break
          default:
            break
        }
      })
      resolve()
    })
  }

  // player → owner
  subscribeToOwner = async () => {
    try {
      const myIndex = this.index as number
      const ownerPublication = this.skyway!.channel!
        .publications[0] as RoomPublication
      const ownerPublicationId = ownerPublication?.id as string
      const stream = await this.subscribeTo(ownerPublicationId)
      await this.onDataWrite(stream)
      await this.updateParticipantMetadataWith(
        ownerPublication,
        myIndex.toString()
      )
    } catch {
      throw new Error
    }
  }

  subscribeToAllPlayers = async (specifiedIndex: number) => {
    try {
      const myIndex = this.index as number
      if (specifiedIndex === myIndex) {
        const numberOfParticipant = this.skyway!.channel!.publications
          .length as number
        for (let i = 1; i < numberOfParticipant; i++) {
          if (
            this.skyway!.channel!.publications[i] === this.skyway!.publication
          )
            continue
          const playerPublicationId = this.skyway!.channel!.publications[i]
            .id as string
          const stream = await this.subscribeTo(playerPublicationId)
          await this.onDataWrite(stream)
        }
        this.influentialAction!.reportSubscribedAllPlayers(myIndex + 1)
      }
    } catch {
      this.updateChannelMetadataWith('error')
    }
  }
}

export default PlayerAvatar
