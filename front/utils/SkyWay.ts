import { User } from '@/types/User'
import { Game } from '@/types/Game'
import {
  SkyWayRoom,
  SkyWayContext,
  SkyWayStreamFactory,
  P2PRoom,
  LocalDataStream,
  LocalP2PRoomMember,
  RoomPublication
} from '@skyway-sdk/room'

class SkyWay {
  currentUser: User
  game: Game

  constructor(currentUser: User, game: Game) {
    this.currentUser = currentUser
    this.game = game
  }

  getSkyWayToken = async (firebaseIdToken: string): Promise<string> => {
    const { data } = await useMyFetch('/api/v1/skyway_token', {
      method: 'post',
      headers: {
        authorization: `Bearer ${firebaseIdToken}`
      }
    })
    const skyWayToken = data.value as string
    return skyWayToken
  }

  createSkyWayContext = async (skyWayToken: string): Promise<SkyWayContext> => {
    const context = await SkyWayContext.Create(skyWayToken)
    return context
  }

  findOrCreateChannel = async (
    context: SkyWayContext,
    channelName: string
  ): Promise<P2PRoom> => {
    const channel = await SkyWayRoom.FindOrCreate(context, {
      type: 'p2p',
      name: channelName
    })
    return channel
  }

  createLocalDataStream = async (): Promise<LocalDataStream> => {
    const localDataStream = await SkyWayStreamFactory.createDataStream()
    return localDataStream
  }

  createAgent = async (channel: P2PRoom): Promise<LocalP2PRoomMember> => {
    const agent = await channel.join({
      metadata: '',
      name: this.currentUser.name
    })
    return agent
  }

  createPublication = async (
    localDataStream: LocalDataStream,
    agent: LocalP2PRoomMember
  ): Promise<RoomPublication> => {
    const publication = await agent.publish(localDataStream)
    return publication
  }

  
}
