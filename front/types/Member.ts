import { User } from './User'
import {
  LocalDataStream,
  LocalP2PRoomMember,
  RoomPublication
} from '@skyway-sdk/room'

export interface Member extends User {
  myIndex: number | null
  myData: LocalDataStream | null
  memberCertificates: LocalP2PRoomMember | null
  myPublication: RoomPublication<LocalDataStream> | null
}
