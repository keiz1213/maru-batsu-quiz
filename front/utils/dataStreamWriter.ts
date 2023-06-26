import { ChatMessage } from '@/types/ChatMessage'
import Avatar from './Avatar'
import { AvatarParams } from '~/types/AvatarParams'

export class DataStreamWriter {
  avatar: Avatar

  constructor(avatar: Avatar) {
    this.avatar = avatar
  }

  write(
    handlerName: string,
    data: string | number | Avatar | ChatMessage | AvatarParams | Object
  ): void {
    this.avatar.localDataStream?.write(
      JSON.stringify({
        handlerName: handlerName,
        data: data
      })
    )
  }

  writeStartGame(): void {
    this.write('startGameAction', '')
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
    this.write('placeAvatarAction', myAvatar)
  }

  writeAllPlayer(players: Object): void {
    this.write('placeAllPlayerAvatarAction', players)
  }

  writeMyAvatarParams(id: string, x: string, y: string, answer: string): void {
    const avatarParams = {
      id: id,
      answer: answer,
      x: x,
      y: y
    }
    this.write('moveAvatarAction', avatarParams)
  }

  writeAnnounceText(announceText: string): void {
    this.write('updateAnnounceTextAction', announceText)
  }

  writeStartQuiz(announceText: string): void {
    this.write('startQuizAction', announceText)
  }

  writeExplanation(announceText: string): void {
    this.write('checkExplanationAction', announceText)
  }

  writeChatMessage(chatMessage: ChatMessage): void {
    this.write('updateChatAction', chatMessage)
  }

  writeJudge(correctAnswer: string): void {
    this.write('executeJudgeAction', correctAnswer)
  }

  writeCheckSubscribed(index: number): void {
    this.write('subscribeAllPlayers', index)
  }

  writeReportSubscribed(index: number): void {
    this.write('checkPlayerSubscribedAll', index)
  }
}
