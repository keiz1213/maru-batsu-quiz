import { Member } from '@/types/Member'
import {
  LocalDataStream,
  RoomPublication,
  LocalP2PRoomMember
} from '@skyway-sdk/room'

export interface MemberObject {
  index: number | null
  params: Member
  me: LocalP2PRoomMember
  mydata: LocalDataStream
  myPublication: RoomPublication<LocalDataStream>
}
