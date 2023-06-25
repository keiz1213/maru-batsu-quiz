import Reaction from '@/utils/Reaction'
import {
  LocalDataStream,
  LocalP2PRoomMember,
  RoomPublication,
  RemoteDataStream,
  P2PRoom
} from '@skyway-sdk/room'

class Avatar {
  id: number
  uid: string
  name: string
  avatarUrl: string
  index: number | null
  reaction: Reaction | null
  channel: P2PRoom | null
  localDataStream: LocalDataStream | null
  agent: LocalP2PRoomMember | null
  publication: RoomPublication<LocalDataStream> | null

  constructor(
    id: number,
    uid: string,
    name: string,
    avatarUrl: string,
    index: number | null,
    reaction: Reaction | null,
    channel: P2PRoom | null,
    localDataStream: LocalDataStream | null,
    agent: LocalP2PRoomMember | null,
    publication: RoomPublication<LocalDataStream> | null,
  ) {
    this.id = id
    this.uid = uid
    this.name = name
    this.avatarUrl = avatarUrl
    this.index = index
    this.reaction = reaction
    this.channel = channel
    this.localDataStream = localDataStream
    this.agent = agent
    this.publication = publication
  }

  playGame = () => {
    this.reaction?.startGame()
  }

  subscribe = async (publicationId: string): Promise<RemoteDataStream> => {
    const remote = await this.agent?.subscribe(publicationId)
    const remoteDataStream = remote?.stream as RemoteDataStream
    return remoteDataStream
  }

  delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}

export default Avatar
