import {
  SkyWayRoom,
  SkyWayContext,
  SkyWayStreamFactory,
  P2PRoom,
  LocalStream,
  LocalDataStream,
  LocalP2PRoomMember,
  RoomPublication
} from '@skyway-sdk/room'
import type { User } from '~/types/user'
import { Game } from '~/types/game'
import { getSkyWayToken } from '~/utils/api/services/skywayToken'

class SkyWay {
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

  createSkyWayContext = async (): Promise<SkyWayContext> => {
    const skyWayToken = await getSkyWayToken()
    const context = await SkyWayContext.Create(skyWayToken)
    return context
  }

  findOrCreateChannel = async (
    context: SkyWayContext,
    channel_name: string
  ): Promise<P2PRoom> => {
    const channel = await SkyWayRoom.FindOrCreate(context, {
      type: 'p2p',
      name: channel_name
    })
    return channel
  }

  createLocalDataStream = async (): Promise<LocalDataStream> => {
    const localDataStream = await SkyWayStreamFactory.createDataStream()
    return localDataStream
  }

  createAgent = async (channel: P2PRoom): Promise<LocalP2PRoomMember> => {
    const nameForSkyWay = this.filterUserNameForSkyWay()
    const agent = await channel.join({
      metadata: this.user.avatar_url,
      name: nameForSkyWay
    })
    return agent
  }

  createPublication = async (
    agent: LocalP2PRoomMember,
    localDataStream: LocalDataStream
  ): Promise<RoomPublication> => {
    const publication = await agent.publish(localDataStream)
    return publication
  }

  findOrCreateChannelForCheck = async () => {
    const context = await this.createSkyWayContext()
    return await this.findOrCreateChannel(context, this.game.channel_name)
  }

  initiarizeSkyWay = async () => {
    const context = await this.createSkyWayContext()
    const channel = await this.findOrCreateChannel(
      context,
      this.game.channel_name
    )
    const localDataStream = await this.createLocalDataStream()
    const agent = await this.createAgent(channel)
    const publication = await this.createPublication(agent, localDataStream)

    this.channel = channel
    this.localDataStream = localDataStream
    this.agent = agent
    this.publication = publication
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

  filterUserNameForSkyWay = () => {
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
}

export default SkyWay
