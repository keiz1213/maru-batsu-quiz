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

  promptStartGame(): void {
    this.write('startGameAction', '')
  }

  sendMyAvatar(): void {
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

  sendAllPlayerAvatar(players: Object): void {
    this.write('placeAllPlayerAvatarAction', players)
  }

  sendMyAvatarParams(id: string, x: string, y: string, answer: string): void {
    const avatarParams = {
      id: id,
      answer: answer,
      x: x,
      y: y
    }
    this.write('moveAvatarAction', avatarParams)
  }

  sendAnnounceText(announceText: string): void {
    this.write('updateAnnounceTextAction', announceText)
  }

  promptStartQuiz(announceText: string): void {
    this.write('startQuizAction', announceText)
  }

  promptCheckExplanation(announceText: string): void {
    this.write('checkExplanationAction', announceText)
  }

  sendChatMessage(chatMessage: ChatMessage): void {
    this.write('updateChatAction', chatMessage)
  }

  promptJudge(correctAnswer: string): void {
    this.write('executeJudgeAction', correctAnswer)
  }

  promptSubscribeAllPlayers(index: number): void {
    this.write('subscribeAllPlayers', index)
  }

  reportSubscribedAllPlayers(index: number): void {
    this.write('promptSubscribeAllPlayers', index)
  }
}
