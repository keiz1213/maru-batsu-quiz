import { Member } from '@/types/Member'

export const useReferee = (initialNumberOfWinner: number) => {
  const members = ref<Member[]>([])
  const losers = ref<Member[]>([])
  const winners = ref<Member[]>([])
  const numberOfWinner = ref<number>(initialNumberOfWinner)

  const addMember = (member: Member) => {
    members.value.push(member)
  }

  const setAllMembers = (allMembers: Member[]) => {
    members.value = allMembers
  }

  const createDummyMember = (): Member => {
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

  const injectDummyMember = (index: number): void => {
    const dummyMember = createDummyMember()
    members.value[index] = dummyMember
  }

  const isLoser = (member: Member, correctAnswer: string): boolean => {
    const uid = member.uid
    const avatar = document.getElementById(uid) as HTMLElement
    const answer = avatar.dataset.answer
    return correctAnswer != answer
  }

  const moveLoser = (loser: Member): void => {
    losers.value.push(loser)
    const index = loser.myIndex as number
    injectDummyMember(index)
  }

  const judge = (correctAnswer: string) => {
    for (let i = 0; i < members.value.length; i++) {
      if (members.value[i].uid === '') {
        continue
      }
      const currentMember = members.value[i] as Member
      if (isLoser(currentMember, correctAnswer)) {
        moveLoser(currentMember)
      }
    }
  }

  const getSurvivors = (): Member[] => {
    const survivors = members.value.filter((member) => {
      return member.uid != ''
    }) as Member[]
    return survivors
  }

  const moveWinner = (winner: Member) => {
    winners.value.push(winner)
    const index = winner.myIndex as number
    injectDummyMember(index)
  }

  const resurrecteLosers = (
    beforeJudgeMembers: Member[],
    survivors: Member[]
  ) => {
    members.value = beforeJudgeMembers
    for (let i = 0; i < survivors.length; i++) {
      const winner = survivors[i]
      const index = winner.myIndex as number
      injectDummyMember(index)
    }
    const resurrectedLosers = members.value.filter((loser) => {
      return loser.myIndex != null
    })
    losers.value = losers.value.filter(
      (loser) => !resurrectedLosers.includes(loser)
    )
  }

  const checkWinner = async (beforeJudgeMembers: Member[]) => {
    const survivors = getSurvivors()
    if (survivors.length <= numberOfWinner.value) {
      for (let i = 0; i < survivors.length; i++) {
        const survivor = survivors[i]
        moveWinner(survivor)
      }
      // もし勝者の人数が、設定した勝ち抜き人数に満たない場合、このクイズの不正解者を復活させる
      if (
        0 < winners.value.length &&
        winners.value.length <= numberOfWinner.value
      ) {
        resurrecteLosers(beforeJudgeMembers, survivors)
      }
      numberOfWinner.value -= survivors.length
    }
  }

  return {
    members,
    losers,
    winners,
    numberOfWinner,
    addMember,
    setAllMembers,
    judge,
    checkWinner,
    createDummyMember
  }
}
