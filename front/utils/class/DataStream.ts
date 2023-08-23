import { ChatMessage } from '~/types/chatMessage'
import { AvatarParams } from '~/types/avatarParams'
import { LocalDataStream } from '@skyway-sdk/room'
import Avatar from './Avatar'
import SkywayChannel from './SkywayChannel'

class DataStream {
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

  promptStartTheGame() {
    this.write('startTheGame', '')
  }

  writeAvatar(avatar: Avatar) {
    const numericStringFromAvatarId = avatar.id.replace(/\D/g, '')
    const writableAvatar = new Avatar(
      numericStringFromAvatarId,
      avatar.owner,
      avatar.name,
      avatar.avatarUrl,
      avatar.index,
      null,
      null,
      null
    )
    this.write('setAvatar', writableAvatar)
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

  promptStartTheQuiz(announceText: string) {
    this.write('startTheQuiz', announceText)
  }

  promptCheckExplanation(announceText: string) {
    this.write('checkExplanation', announceText)
  }

  writeChatMessage(chatMessage: ChatMessage) {
    this.write('reflectChatMessage', chatMessage)
  }

  promptExecuteJudge(correctAnswer: string) {
    this.write('executeJudge', correctAnswer)
  }

  promptSubscribeToAllPlayers(index: number) {
    this.write('subscribeToAllPlayers', index)
  }

  reportSubscribedAllPlayers(index: number) {
    this.write('promptSubscribeToAllPlayersForPlayer', index)
  }
}

export default DataStream
