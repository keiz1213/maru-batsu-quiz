import {
  LocalDataStream,
  LocalP2PRoomMember,
  RoomPublication,
  RemoteDataStream
} from '@skyway-sdk/room'

class Avatar {
  id: number
  uid: string
  name: string
  avatarUrl: string
  index: number | null
  dataStream: LocalDataStream | null
  agent: LocalP2PRoomMember | null
  publication: RoomPublication<LocalDataStream> | null
  metadata: string

  constructor(
    id: number,
    uid: string,
    name: string,
    avatarUrl: string,
    index: number | null,
    localDataStream: LocalDataStream | null,
    agent: LocalP2PRoomMember | null,
    publication: RoomPublication<LocalDataStream> | null,
    metadata: string
  ) {
    this.id = id
    this.uid = uid
    this.name = name
    this.avatarUrl = avatarUrl
    this.index = index
    this.dataStream = localDataStream
    this.agent = agent
    this.publication = publication
    this.metadata = metadata
  }

  subscribe = async (publicationId: string): Promise<RemoteDataStream> => {
    const remote = await this.agent?.subscribe(publicationId)
    const remoteDataStream = remote?.stream as RemoteDataStream
    return remoteDataStream
  }
}

export default Avatar
