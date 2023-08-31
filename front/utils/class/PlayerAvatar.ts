import { User } from '~/types/user'
import { AvatarParams } from '~/types/avatarParams'
import { ChatMessage } from '~/types/chatMessage'
import Avatar from '~/utils/class/Avatar'
import OwnerAvatar from '~/utils/class/OwnerAvatar'
import VenueActivity from './VenueActivity'
import SkywayChannel from './SkywayChannel'
import SkywayDataStream from './SkywayDataStream'
import { RemoteDataStream } from '@skyway-sdk/room'

class PlayerAvatar extends Avatar {
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

  setMyIndex = (myIndx: number) => {
    this.avatarIndex = myIndx
  }

  setHandleMyMetadataUpdated = () => {
    const agent = this.skywayChannel!.agent!
    agent.onMetadataUpdated.add(async () => {
      try {
        const myIndex = agent.metadata as string
        this.setMyIndex(parseInt(myIndex))
        await this.subscribeToOwner()
        this.skywayDataStream!.writeAvatar(this)
      } catch {
        this.skywayChannel!.updateChannelMetadata('error')
      }
    })
  }

  setUpChannel = async () => {
    this.setHandleMyMetadataUpdated()
    this.setHandleChannelMetadataUpdated()
  }

  setHandleDataWrite = async (dataStream: RemoteDataStream) => {
    await new Promise<void>(async (resolve) => {
      dataStream.onData.add(async (message) => {
        const { reactionName, data } = JSON.parse(message as string)
        const announceText: string = data

        switch (reactionName) {
          case 'startGame':
            this.venueActivity!.startGame(this)
            break
          case 'setAvatar':
            const avatar: OwnerAvatar | PlayerAvatar = data
            this.venueActivity!.setAvatar(avatar)
            break
          case 'setAllPlayerAvatars':
            const players: PlayerAvatar[] = data
            this.venueActivity!.setAllPlayerAvatars(players)
            break
          case 'moveAvatar':
            const avatarParams: AvatarParams = data
            this.venueActivity!.moveAvatar(avatarParams)
            break
          case 'reflectAnnounceText':
            if (announceText === 'ストップ！') {
              this.venueActivity!.lockAvatar(this)
            }
            this.venueActivity!.reflectAnnounceText(announceText)
            break
          case 'startQuiz':
            this.venueActivity!.startQuiz(announceText)
            break
          case 'checkExplanation':
            this.venueActivity!.unLockAvatar(this)
            this.venueActivity!.checkExplanation(announceText)
            break
          case 'reflectChatMessage':
            const chatMessage: ChatMessage = data
            this.venueActivity!.reflectChatMessage(chatMessage)
            break
          case 'judge':
            const correctAnswer: string = data
            this.venueActivity!.judge(correctAnswer)
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

  subscribeToOwner = async () => {
    try {
      const skywayChannel = this.skywayChannel!
      const myIndex = this.avatarIndex!
      const ownerPublication = skywayChannel.channel!.publications[0]
      const ownerPublicationId = ownerPublication.id
      const dataStream = await skywayChannel.subscribe(ownerPublicationId)
      await this.setHandleDataWrite(dataStream)
      await skywayChannel.updateParticipantMetadata(
        ownerPublication,
        myIndex.toString()
      )
    } catch {
      throw new Error()
    }
  }

  subscribeToAllPlayers = async (subscriberIndex: number) => {
    try {
      const myIndex = this.avatarIndex!
      if (subscriberIndex === myIndex) {
        const channel = this.skywayChannel!.channel!
        const myPublication = this.skywayChannel!.publication!
        const numberOfParticipant = channel.publications.length
        for (let i = 1; i < numberOfParticipant; i++) {
          if (channel.publications[i] === myPublication) continue
          const playerPublicationId = channel.publications[i].id
          const dataStream = await this.skywayChannel!.subscribe(
            playerPublicationId
          )
          await this.setHandleDataWrite(dataStream)
        }
        const nextSubscriberIndex = myIndex + 1
        this.skywayDataStream!.reportSubscribedAllPlayers(nextSubscriberIndex)
      }
    } catch {
      this.skywayChannel!.updateChannelMetadata('error')
    }
  }
}

export default PlayerAvatar
