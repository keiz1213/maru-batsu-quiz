import Reaction from '@/utils/Reaction'
import {
  LocalDataStream,
  LocalP2PRoomMember,
  RoomPublication,
  RemoteDataStream,
  P2PRoom
} from '@skyway-sdk/room'
import { ChatMessage } from '~/types/ChatMessage'

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
    publication: RoomPublication<LocalDataStream> | null
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

  subscribe = async (publicationId: string): Promise<RemoteDataStream> => {
    const remote = await this.agent?.subscribe(publicationId)
    const remoteDataStream = remote?.stream as RemoteDataStream
    return remoteDataStream
  }

  playGame = () => {
    this.reaction?.startGame()
  }

  createChatMessage = (newMessage: string): ChatMessage => {
    const chatMessage = {
      avatarId: this.id,
      avatarUrl: this.avatarUrl,
      content: newMessage
    }
    return chatMessage
  }

  sendChatMessage = (newMessage: string) => {
    const chatMessage = this.createChatMessage(newMessage)
    this.reaction?.addChatMessage(chatMessage)
    const writer = new DataStreamWriter(this)
    writer.writeChatMessage(chatMessage)
  }

  delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}

export default Avatar
