import {
  SkyWayRoom,
  SkyWayContext,
  SkyWayStreamFactory,
  P2PRoom,
  LocalStream,
  LocalDataStream,
  LocalP2PRoomMember,
  RoomPublication,
  RemoteDataStream
} from '@skyway-sdk/room'
import type { User } from '~/types/user'
import { Game } from '~/types/game'
import { getSkyWayToken } from '~/utils/api/services/skyway-token'

class SkywayChannel {
  user: User
  game: Game
  channel: P2PRoom | null
  localDataStream: LocalDataStream | null
  agent: LocalP2PRoomMember | null
  publication: RoomPublication<LocalStream> | null

  constructor(user: User, game: Game) {
    this.user = user
    this.game = game
    this.channel = null
    this.localDataStream = null
    this.agent = null
    this.publication = null
  }

  joinChannel = async () => {
    const skyWayToken = await getSkyWayToken()
    const context = await SkyWayContext.Create(skyWayToken)
    const channel = await SkyWayRoom.FindOrCreate(context, {
      type: 'p2p',
      name: this.game.channel_name
    })
    const localDataStream = await SkyWayStreamFactory.createDataStream()
    const nameForChannel = this.filterUserNameForChannel()
    const agent = await channel.join({
      metadata: this.user.avatar_url,
      name: nameForChannel
    })
    const publication = await agent.publish(localDataStream)
    this.channel = channel
    this.localDataStream = localDataStream
    this.agent = agent
    this.publication = publication
  }

  subscribe = async (publicationId: string): Promise<RemoteDataStream> => {
    const subscription = await this.agent!.subscribe(
      publicationId
    )
    const remoteDataStream = subscription?.stream as RemoteDataStream
    return remoteDataStream
  }

  updateChannelMetadata = async (data: string) => {
    await this.channel!.updateMetadata(data)
  }

  updateParticipantMetadata = async (
    publication: RoomPublication,
    value: string
  ) => {
    await publication.publisher.updateMetadata(value)
  }

  setChannelMetadataUpdatedhandler = () => {
    this.channel!.onMetadataUpdated.add((e) => {
      if (e.metadata === 'error') {
        const { notifyOnSpot } = useToast()
        notifyOnSpot(
          'エラーが発生しました。ゲームを中断し、再度アクセスしてください',
          'error'
        )
      }
    })
  }

  filterUserNameForChannel = () => {
    const userName = this.user.name
    if (userName === 'anonymous') {
      return this.user.uid
    }
    const pattern = /^(?![*]$)[.A-Za-z0-9%*_-]+$/
    if (!pattern.test(userName)) {
      if (userName.includes(' ')) {
        return userName.split(' ').join('')
      } else {
        return this.user.uid
      }
    } else {
      return userName
    }
  }

  hasNoMembers = (channel: P2PRoom) => {
    return channel.members.length === 0
  }

  isChannelMetadataEmpty = (channel: P2PRoom) => {
    return channel.metadata === undefined || channel.metadata === ''
  }

  isChatEnabled = (channel: P2PRoom) => {
    return channel.metadata === 'chatVisible'
  }

  isError = (channel: P2PRoom) => {
    return channel.metadata === 'error'
  }

  isOwnerEnterable = (channel: P2PRoom) => {
    return this.hasNoMembers(channel)
  }

  isPlayerEnterable = (channel: P2PRoom) => {
    return !this.isChannelMetadataEmpty(channel) && !this.isError(channel)
  }
}

export default SkywayChannel
