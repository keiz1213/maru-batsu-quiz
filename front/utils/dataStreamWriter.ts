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
    this.write('setQuizNumber', `${quizNumber}問目！`)
  }

  writeQuiz(quiz: string): void {
    this.write('setQuiz', quiz)
  }

  writeStartTimer(): void {
    this.write('startTimer', 'スタート！')
  }

  writeStopTimer(): void {
    this.write('stopTimer', 'ストップ！')
  }

  writeSuspense(): void {
    this.write('setSuspense', '正解は・・')
  }

  writeCorrectAnswer(correctAnswer: string): void {
    this.write('setCorrectAnswer', correctAnswer)
  }

  writeExplanation(explanation: string): void {
    this.write('setExplanation', explanation)
  }

  writeResetQuiz(): void {
    this.write('resetQuiz', '')
  }

  writeChatMessage(chatMessage: ChatMessage): void {
    this.write('updateChatMessages', chatMessage)
  }

  writeJudge(): void {
    this.write('judge', '')
  }

  writeCheckSubscribed(index: number): void {
    this.write('subscribeAll', index)
  }

  writeReportSubscribed(index: number): void {
    this.write('checkSubscribed', index)
  }
}
