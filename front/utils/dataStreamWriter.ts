import { cloneDeep } from 'lodash'
import { Member } from '@/types/Member'
import { ChatMessage } from '@/types/ChatMessage'

export class DataStreamWriter {
  member: Member

  constructor(member: Member) {
    this.member = member
  }

  disableUnsendableProperty(member: Member): Member {
    member.myData = null
    member.memberCertificates = null
    member.myPublication = null
    return member
  }

  writeMember(): void {
    const clonedMember = cloneDeep(this.member)
    const sendableMember = this.disableUnsendableProperty(clonedMember)
    this.member.myData?.write(
      JSON.stringify({
        tag: 'setAvatar',
        params: sendableMember
      })
    )
  }

  writeMyAvatarParams(id: string, x: string, y: string, answer: string): void {
    this.member.myData?.write(
      JSON.stringify({
        tag: 'moveAvatar',
        params: {
          id: id,
          x: x,
          y: y,
          answer: answer
        }
      })
    )
  }

  writeQuiz(quiz: string): void {
    this.member.myData?.write(
      JSON.stringify({
        tag: 'announcement',
        params: quiz
      })
    )
  }

  writeQuizNumber(quizNumber: number): void {
    this.member.myData?.write(
      JSON.stringify({
        tag: 'announcement',
        params: `${quizNumber}問目！`
      })
    )
  }

  writeStartQuiz(): void {
    this.member.myData?.write(
      JSON.stringify({
        tag: 'announcement',
        params: 'スタート！'
      })
    )
  }

  writeStopQuiz(): void {
    this.member.myData?.write(
      JSON.stringify({
        tag: 'announcement',
        params: 'ストップ！'
      })
    )
  }

  writePreparation(): void {
    this.member.myData?.write(
      JSON.stringify({
        tag: 'announcement',
        params: '正解は・・'
      })
    )
  }

  writeCorrectAnswer(correctAnswer: string): void {
    this.member.myData?.write(
      JSON.stringify({
        tag: 'announcement',
        params: correctAnswer
      })
    )
  }

  writeExplanation(explanation: string): void {
    this.member.myData?.write(
      JSON.stringify({
        tag: 'announcement',
        params: explanation
      })
    )
  }

  writeEmpty(): void {
    this.member.myData?.write(
      JSON.stringify({
        tag: 'announcement',
        params: ''
      })
    )
  }

  writeChatMessage(chatMessage: ChatMessage): void {
    this.member.myData?.write(
      JSON.stringify({
        tag: 'chat',
        params: chatMessage
      })
    )
  }

  writeJudge(): void {
    this.member.myData?.write(
      JSON.stringify({
        tag: 'judge',
        params: ''
      })
    )
  }

  passToNext(index: number): void {
    this.member.myData?.write(
      JSON.stringify({
        tag: 'over',
        params: {
          index: index
        }
      })
    )
  }

  allWrite(members: Object): void {
    this.member.myData?.write(
      JSON.stringify({
        tag: 'start',
        params: members
      })
    )
  }

  deadline(index: number): void {
    this.member.myData?.write(
      JSON.stringify({
        tag: 'deadline',
        params: {
          index: index
        }
      })
    )
  }

  closeModal2(): void {
    this.member.myData?.write(
      JSON.stringify({
        tag: 'closeModal',
        params: ''
      })
    )
  }

  test(): void {
    this.member.myData?.write(
      JSON.stringify({
        tag: 'test',
        params: ''
      })
    )
  }

  invite(index: number): void {
    this.member.myData?.write(
      JSON.stringify({
        tag: 'invite',
        params: {
          index: index
        }
      })
    )
  }

  passToNext2(index: number): void {
    this.member.myData?.write(
      JSON.stringify({
        tag: 'passToNext2',
        params: {
          index: index
        }
      })
    )
  }

  addIndex(index: number, publicationId: string): void {
    this.member.myData?.write(
      JSON.stringify({
        tag: 'addIndex',
        params: {
          index: index,
          publicationId: publicationId
        }
      })
    )
  }
}
