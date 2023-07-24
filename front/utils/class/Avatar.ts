import { ChatMessage } from '~/types/chatMessage'
import { RoomPublication, RemoteDataStream } from '@skyway-sdk/room'
import SkyWay from '~/utils/class/SkyWay'
import InfluentialAction from '~/utils/class/InfluentialAction'
import NonInfluentialAction from '~/utils/class/NonInfluentialAction'
import SyncDraggable from '~/utils/class/SyncDraggable'

class Avatar {
  id: string
  owner: boolean
  name: string
  avatarUrl: string
  index: number | null
  skyway: SkyWay | null
  influentialAction: InfluentialAction | null
  nonInfluentialAction: NonInfluentialAction | null

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
    this.id = `avatar-${id}`
    this.owner = owner
    this.name = name
    this.avatarUrl = avatarUrl
    this.index = index
    this.skyway = skyway
    this.influentialAction = influentialAction
    this.nonInfluentialAction = nonInfluentialAction
  }

  subscribeTo = async (publicationId: string): Promise<RemoteDataStream> => {
    const subscription = await this.skyway!.agent!.subscribe(publicationId)
    const remoteDataStream = subscription?.stream as RemoteDataStream
    return remoteDataStream
  }

  updateChannelMetadataWith = async (value: string) => {
    await this.skyway!.channel!.updateMetadata(value)
  }

  updateParticipantMetadataWith = async (
    publication: RoomPublication,
    value: string
  ) => {
    await publication.publisher.updateMetadata(value)
  }

  onChannelMetadataUpdated = () => {
    this.skyway!.channel!.onMetadataUpdated.add((e) => {
      if (e.metadata === 'error') {
        this.nonInfluentialAction!.notifySkyWayError()
      }
    })
  }

  leaveChannel = () => {
    this.updateChannelMetadataWith('error')
    localStorage.clear()
    this.skyway!.agent!.leave()
  }

  sendMyAvatar = () => {
    this.influentialAction!.writeAvatar(this)
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

export default Avatar
