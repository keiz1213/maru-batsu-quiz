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
    let myAvatar = new Avatar(
      this.avatar.id,
      this.avatar.uid,
      this.avatar.owner,
      this.avatar.name,
      this.avatar.avatarUrl,
      this.avatar.index,
      null,
      null,
      null,
      null,
      null
    )
    this.write('placeAvatar', myAvatar)
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
    this.write('checkPlayerSubscribedAll', index)
  }
}
