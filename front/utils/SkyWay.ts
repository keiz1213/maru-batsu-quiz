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
  static getSkyWayToken = async (firebaseIdToken: string): Promise<string> => {
    const { data } = await useMyFetch('/api/v1/skyway_token', {
      method: 'post',
      headers: {
        authorization: `Bearer ${firebaseIdToken}`
      }
    })
    const skyWayToken = data.value as string
    return skyWayToken
  }

  static createSkyWayContext = async (
    skyWayToken: string
  ): Promise<SkyWayContext> => {
    const context = await SkyWayContext.Create(skyWayToken)
    return context
  }

  static findOrCreateChannel = async (
    context: SkyWayContext,
    channelName: string
  ): Promise<P2PRoom> => {
    const channel = await SkyWayRoom.FindOrCreate(context, {
      type: 'p2p',
      name: channelName
    })
    return channel
  }

  static createLocalDataStream = async (): Promise<LocalDataStream> => {
    const localDataStream = await SkyWayStreamFactory.createDataStream()
    return localDataStream
  }

  static createAgent = async (
    channel: P2PRoom,
    userName: string
  ): Promise<LocalP2PRoomMember> => {
    const agent = await channel.join({
      metadata: '',
      name: userName
    })
    return agent
  }

  static createPublication = async (
    localDataStream: LocalDataStream,
    agent: LocalP2PRoomMember
  ): Promise<RoomPublication> => {
    const publication = await agent.publish(localDataStream)
    return publication
  }

  static generateUniqueName = () => {
    const adjectives = ['Happy', 'Silly', 'Brave', 'Crazy', 'Lucky', 'Wise']
    const nouns = ['Cat', 'Dog', 'Monkey', 'Tiger', 'Elephant', 'Lion']

    const randomAdjective =
      adjectives[Math.floor(Math.random() * adjectives.length)]
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]
    const randomNum = Math.floor(Math.random() * 1001)
    return `${randomAdjective}-${randomNoun}-${randomNum}`
  }
}

export default SkyWay
