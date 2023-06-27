import { ChatMessage } from '@/types/ChatMessage'
import Avatar from './Avatar'
import { AvatarParams } from '~/types/AvatarParams'

export class DataStreamWriter {
  write(
    sender: Avatar,
    handlerName: string,
    data: string | number | Avatar | ChatMessage | AvatarParams | Object
  ): void {
    sender.localDataStream?.write(
      JSON.stringify({
        handlerName: handlerName,
        data: data
      })
    )
  }

  promptStartGame(sender: Avatar): void {
    this.write(sender, 'startGameAction', '')
  }

  sendMyAvatar(sender: Avatar): void {
    let myAvatar = new Avatar(
      sender.id,
      sender.uid,
      sender.owner,
      sender.name,
      sender.avatarUrl,
      sender.index,
      null,
      null,
      null,
      null,
      null,
      null
    )
    this.write(sender, 'placeAvatarAction', myAvatar)
  }

  sendAllPlayerAvatar(sender: Avatar, players: Object): void {
    this.write(sender, 'placeAllPlayerAvatarAction', players)
  }

  sendMyAvatarParams(sender: Avatar, avatarParams: AvatarParams): void {
    this.write(sender, 'moveAvatarAction', avatarParams)
  }

  sendAnnounceText(sender: Avatar, announceText: string): void {
    this.write(sender, 'updateAnnounceTextAction', announceText)
  }

  promptStartQuiz(sender: Avatar, announceText: string): void {
    this.write(sender, 'startQuizAction', announceText)
  }

  promptCheckExplanation(sender: Avatar, announceText: string): void {
    this.write(sender, 'checkExplanationAction', announceText)
  }

  sendChatMessage(sender: Avatar, chatMessage: ChatMessage): void {
    this.write(sender, 'updateChatAction', chatMessage)
  }

  promptJudge(sender: Avatar, correctAnswer: string): void {
    this.write(sender, 'executeJudgeAction', correctAnswer)
  }

  promptSubscribeAllPlayers(sender: Avatar, index: number): void {
    this.write(sender, 'subscribeAllPlayers', index)
  }

  reportSubscribedAllPlayers(sender: Avatar, index: number): void {
    this.write(sender, 'promptSubscribeAllPlayers', index)
  }
}

export default DataStreamWriter
