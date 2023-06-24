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

  writeAvatar(): void {
    const clonedAvatar = cloneDeep(this.avatar)
    const writableAvatar = this.makeWritableAvatar(clonedAvatar)
    this.write('placeAvatar', writableAvatar)
  }

  writeAllPlayers(players: Object): void {
    this.write('startGame', players)
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

  writeQuizNumber(quizNumber: number): void {
    this.write('acceptAnnounce', `${quizNumber}問目！`)
  }

  writeQuiz(quiz: string): void {
    this.write('acceptAnnounce', quiz)
  }

  writeStartTimer(): void {
    this.write('startQuiz', 'スタート！')
  }

  writeStopTimer(): void {
    this.write('stopTimer', 'ストップ！')
  }

  writeSuspense(): void {
    this.write('acceptAnnounce', '正解は・・')
  }

  writeCorrectAnswer(correctAnswer: string): void {
    this.write('acceptAnnounce', correctAnswer)
  }

  writeExplanation(explanation: string): void {
    this.write('acceptAnnounce', explanation)
  }

  writeResetQuiz(): void {
    this.write('acceptAnnounce', '')
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
    this.write('checkSubscribed', index)
  }
}
