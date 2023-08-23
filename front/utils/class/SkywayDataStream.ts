import { ChatMessage } from '~/types/chatMessage'
import { AvatarParams } from '~/types/avatarParams'
import { LocalDataStream } from '@skyway-sdk/room'
import Avatar from './Avatar'
import SkywayChannel from './SkywayChannel'

class SkywayDataStream {
  localDataStream: LocalDataStream

  constructor(skywayChannel: SkywayChannel) {
    this.localDataStream = skywayChannel.localDataStream!
  }

  write(
    reactionName: string,
    data: string | number | Avatar | ChatMessage | AvatarParams | Avatar[]
  ) {
    this.localDataStream.write(
      JSON.stringify({
        reactionName: reactionName,
        data: data
      })
    )
  }

  promptStartGame() {
    this.write('startGame', '')
  }

  writeAvatar(avatar: Avatar) {
    const mockAvatar = avatar.createMockAvatar()
    this.write('setAvatar', mockAvatar)
  }

  writeAllPlayerAvatars(players: Avatar[]) {
    this.write('setAllPlayerAvatars', players)
  }

  writeAvatarParams(avatarParams: AvatarParams) {
    this.write('moveAvatar', avatarParams)
  }

  writeAnnounceText(announceText: string) {
    this.write('reflectAnnounceText', announceText)
  }

  promptStartQuiz(announceText: string) {
    this.write('startQuiz', announceText)
  }

  promptCheckExplanation(announceText: string) {
    this.write('checkExplanation', announceText)
  }

  writeChatMessage(chatMessage: ChatMessage) {
    this.write('reflectChatMessage', chatMessage)
  }

  promptJudge(correctAnswer: string) {
    this.write('judge', correctAnswer)
  }

  promptSubscribeToAllPlayers(index: number) {
    this.write('subscribeToAllPlayers', index)
  }

  reportSubscribedAllPlayers(index: number) {
    this.write('promptPlayersForMutualSubscriptions', index)
  }
}

export default SkywayDataStream
