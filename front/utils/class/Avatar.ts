import { User } from '~/types/user'
import VenueActivity from './VenueActivity'
import SkywayChannel from './SkywayChannel'
import SkywayDataStream from './SkywayDataStream'

class Avatar {
  avatarId: string
  avatarName: string
  avatarImage: string
  avatarIndex: number | null
  skywayChannel: SkywayChannel | null
  skywayDataStream: SkywayDataStream | null
  venueActivity: VenueActivity | null

  constructor(
    user: User,
    skywayChannel: SkywayChannel,
    skywayDataStream: SkywayDataStream,
    venueActivity: VenueActivity
  ) {
    this.avatarId = `avatar-${user.id}`
    this.avatarName = user.name
    this.avatarImage = user.avatar_url
    this.avatarIndex = null
    this.skywayChannel = skywayChannel
    this.skywayDataStream = skywayDataStream
    this.venueActivity = venueActivity
  }

  createMockAvatar = () => {
    const mockAvatar = {
      avatarId: this.avatarId,
      avatarName: this.avatarName,
      avatarImage: this.avatarImage,
      avatarIndex: this.avatarIndex,
      skywayChannel: null,
      skywayDataStream: null,
      venueActivity: null
    } as Avatar
    return mockAvatar
  }

  setHandleChannelMetadataUpdated = () => {
    const channel = this.skywayChannel!.channel!
    channel.onMetadataUpdated.add((e) => {
      if (e.metadata === 'error') {
        this.venueActivity!.notifyError()
      }
    })
  }

  leaveChannel = () => {
    const { endOfGame } = useGameState()
    if (!endOfGame.value) {
      this.skywayChannel!.updateChannelMetadata('error')
      localStorage.clear()
      this.skywayChannel!.agent!.leave()
    }
  }

  sendChatMessage = (newMessage: string) => {
    const chatMessage = this.venueActivity!.chat.createChatMessage(
      this,
      newMessage
    )
    this.venueActivity!.reflectChatMessage(chatMessage)
    this.skywayDataStream!.writeChatMessage(chatMessage)
  }
}

export default Avatar
