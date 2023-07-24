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

  createAgent = async (
    channel: P2PRoom,
    userName: string
  ): Promise<LocalP2PRoomMember> => {
    const agent = await channel.join({
      metadata: '',
      name: userName
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
    const agent = await this.createAgent(channel, this.user.name)
    const publication = await this.createPublication(agent, localDataStream)

    this.channel = channel
    this.localDataStream = localDataStream
    this.agent = agent
    this.publication = publication
  }

  hasMembers = (channel: P2PRoom) => {
    return channel.members.length != 0
  }

  isChannelMetadataEmpty = (channel: P2PRoom) => {
    return channel.metadata === undefined || channel.metadata === ''
  }

  isChatVisible = (channel: P2PRoom) => {
    return channel.metadata === 'chatVisible'
  }
}

export default SkyWay
