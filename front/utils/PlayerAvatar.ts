import Avatar from '@/utils/Avatar'
import {
  LocalDataStream,
  LocalP2PRoomMember,
  RoomPublication,
  RemoteDataStream
} from '@skyway-sdk/room'

class PlayerAvatar extends Avatar {
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
    super(
      id,
      uid,
      name,
      avatarUrl,
      index,
      localDataStream,
      agent,
      publication,
      metadata
    )
  }
}

export default PlayerAvatar
