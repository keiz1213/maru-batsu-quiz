import { User } from '~/types/user'
import { Game } from '~/types/game'
import { ChatMessage } from '~/types/chatMessage'
import { RoomPublication, RemoteDataStream } from '@skyway-sdk/room'
import SkyWay from '~/utils/class/SkyWay'
import CommunicationActivity from './CommunicationActivity'
import VenueActivity from './VenueActivity'
import SyncDraggable from '~/utils/class/SyncDraggable'

class Avatar2 {
  avatarId: string
  avatarName: string
  avatarImage: string
  communicationActivity: CommunicationActivity
  venueActivity: VenueActivity

  constructor(user: User, game: Game) {
    this.avatarId = `avatar-${user.id}`
    this.avatarName = user.name
    this.avatarImage = user.avatar_url
    this.communicationActivity = new CommunicationActivity(user, game)
    this.venueActivity = new VenueActivity(game)
  }

  leaveChannel = () => {
    this.communicationActivity.skywayChannel.updateChannelMetadata('error')
    localStorage.clear()
    this.communicationActivity.skywayChannel.agent!.leave()
  }

  lockMyAvatar = () => {
    SyncDraggable.unsetDraggable(this)
  }

  unLockMyAvatar = () => {
    SyncDraggable.setDraggable(this)
  }

  createChatMessage = (newMessage: string): ChatMessage => {
    const chatMessage = {
      avatarId: this.id,
      avatarUrl: this.avatarUrl,
      content: newMessage
    }
    return chatMessage
  }

  sendChatMessage = (newMessage: string) => {
    const chatMessage = this.createChatMessage(newMessage)
    this.nonInfluentialAction!.reflectChatMessage(chatMessage)
    this.influentialAction!.writeChatMessage(chatMessage)
  }

  delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}
