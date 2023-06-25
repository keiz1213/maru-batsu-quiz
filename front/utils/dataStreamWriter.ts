import { cloneDeep } from 'lodash'
import { ChatMessage } from '@/types/ChatMessage'
import Avatar from './Avatar'
import { AvatarParams } from '~/types/AvatarParams'

export class DataStreamWriter {
  avatar: Avatar

  constructor(avatar: Avatar) {
    this.avatar = avatar
  }

  write(
    reaction: string,
    data: string | number | Avatar | ChatMessage | AvatarParams | Object
  ): void {
    this.avatar.localDataStream?.write(
      JSON.stringify({
        reaction: reaction,
        data: data
      })
    )
  }

  makeWritableAvatar(avatar: Avatar): Avatar {
    avatar.localDataStream = null
    avatar.agent = null
    avatar.publication = null
    return avatar
  }

  writeStartGame(): void {
    this.write('startTheGame', '')
  }

  writeAvatar(): void {
    const clonedAvatar = cloneDeep(this.avatar)
    const writableAvatar = this.makeWritableAvatar(clonedAvatar)
    this.write('placeAvatar', writableAvatar)
  }

  writeAllPlayer(players: Object): void {
    this.write('placeAllPlayerAvatar', players)
  }

  writeMyAvatarParams(id: string, x: string, y: string, answer: string): void {
    const avatarParams = {
      id: id,
      answer: answer,
      x: x,
      y: y
    }
    this.write('moveOtherAvatar', avatarParams)
  }

  writeAnnounceText(announceText: string): void {
    this.write('acceptAnnounce', announceText)
  }

  writeStartTimer(announceText: string): void {
    this.write('startQuiz', announceText)
  }

  writeStopTimer(announceText: string): void {
    this.write('stopTimer', announceText)
  }

  writeChatMessage(chatMessage: ChatMessage): void {
    this.write('updateChat', chatMessage)
  }

  writeJudge(): void {
    this.write('executeJudge', '')
  }

  writeCheckSubscribed(index: number): void {
    this.write('subscribeAllPlayers', index)
  }

  writeReportSubscribed(index: number): void {
    this.write('checkSubscribedAll', index)
  }
}
