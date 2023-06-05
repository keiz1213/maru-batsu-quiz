import { Member } from '@/types/Member'
import { MemberObject } from '@/types/MemberObject'

export class Referee {
  createDummyMember(): Member {
    const member = {
      id: 0,
      uid: '',
      name: '',
      avatar_url: '',
      games: [],
      token: '',
      myIndex: null,
      myData: null,
      memberCertificates: null,
      myPublication: null
    }
    return member
  }

  exchangeDummyMember(
    members: Ref<MemberObject[]>,
    memberObject: MemberObject
  ): void {
    const dummyMember = this.createDummyMember()
    memberObject.params = dummyMember
    const index = memberObject.index as number
    members.value[index] = memberObject
  }

  isIncorrectArea(
    avatarY: number,
    avatarX: number,
    correctAnswer: string
  ): boolean {
    const minX = correctAnswer === '◯' ? 520 : 0
    const maxX = correctAnswer === '◯' ? 1040 : 520
    return 330 < avatarY && avatarY < 700 && minX < avatarX && avatarX < maxX
      ? true
      : false
  }

  isLoser(memberObject: MemberObject, correctAnswer: string): boolean {
    const uid = memberObject.params.uid
    const avatar = document.getElementById(uid) as HTMLElement
    const clientRect = avatar.getBoundingClientRect()
    const avatarY = clientRect.top + window.scrollY + 44 // 中心にするため
    const avatarX = clientRect.left + window.scrollX + 44 // 中心にするため
    return this.isIncorrectArea(avatarY, avatarX, correctAnswer)
  }

  moveLoserObject(
    members: Ref<MemberObject[]>,
    losers: Ref<MemberObject[]>,
    loserObject: MemberObject
  ): void {
    losers.value.push(loserObject)
    this.exchangeDummyMember(members, loserObject)
  }

  judge(
    members: Ref<MemberObject[]>,
    losers: Ref<MemberObject[]>,
    correctAnswer: string
  ) {
    for (let i = 0; i < members.value.length; i++) {
      if (members.value[i].index === null) {
        continue
      }
      const currentMemberObject = members.value[i] as MemberObject
      if (this.isLoser(currentMemberObject, correctAnswer)) {
        this.moveLoserObject(members, losers, currentMemberObject)
      }
    }
  }

  getSurvivors(members: Ref<MemberObject[]>): MemberObject[] {
    const survivors = members.value.filter((member) => {
      return member.index != null
    }) as MemberObject[]
    return survivors
  }

  moveWinnerObject(
    members: Ref<MemberObject[]>,
    winners: Ref<MemberObject[]>,
    winnerObject: MemberObject
  ) {
    winners.value.push(winnerObject)
    this.exchangeDummyMember(members, winnerObject)
  }

  resurrecteLosers(
    members: Ref<MemberObject[]>,
    beforeJudgeMembers: MemberObject[],
    losers: Ref<MemberObject[]>
  ) {
    const survivors = this.getSurvivors(members)
    members.value = beforeJudgeMembers
    for (let i = 0; i < survivors.length; i++) {
      const winnerObject = survivors[i] as MemberObject
      this.exchangeDummyMember(members, winnerObject)
    }
    const resurrectedLosers = members.value.filter((loser) => {
      return loser.index != null
    })
    losers.value = losers.value.filter(
      (loser) => !resurrectedLosers.includes(loser)
    )
  }

  checkWinner(
    members: Ref<MemberObject[]>,
    winners: Ref<MemberObject[]>,
    beforeJudgeMembers: MemberObject[],
    losers: Ref<MemberObject[]>,
    numberOfWinner: Ref<number>
  ) {
    const survivors = this.getSurvivors(members)
    if (survivors.length <= numberOfWinner.value) {
      for (let i = 0; i < survivors.length; i++) {
        const survivor = survivors[i]
        this.moveWinnerObject(members, winners, survivor)
      }
      // もし勝者の人数が、設定した勝ち抜き人数に満たない場合、このクイズの不正解者を復活させる
      if (
        0 < winners.value.length &&
        winners.value.length < numberOfWinner.value
      ) {
        this.resurrecteLosers(members, beforeJudgeMembers, losers)
      }
      numberOfWinner.value -= survivors.length
    }
  }
}
