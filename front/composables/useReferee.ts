import { Member } from '@/types/Member'

export const useReferee = (initialNumberOfWinner: number) => {
  const owners = ref<Member[]>([])
  const members = ref<Member[]>([])
  const losers = ref<Member[]>([])
  const winners = ref<Member[]>([])
  const numberOfWinner = ref<number>(initialNumberOfWinner)
  const isEndOfGame = ref(false)

  const addOwner = (member: Member) => {
    owners.value.push(member)
  }
  const addMember = (member: Member) => {
    members.value.push(member)
  }

  const addLoser = (loser: Member) => {
    losers.value.push(loser)
  }

  const addWinner = (winner: Member) => {
    winners.value.push(winner)
  }

  const setAllMembers = (allMembers: Member[]) => {
    members.value = allMembers
  }

  const subtractNumberOfWinner = (subtractBy: number) => {
    numberOfWinner.value -= subtractBy
  }

  const checkEndOfGame = () => {
    if (numberOfWinner.value === 0) {
      isEndOfGame.value = true
    }
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
    return correctAnswer != answer || answer === ''
  }

  const isWinner = (member: Member, correctAnswer: string): boolean => {
    const uid = member.uid
    const avatar = document.getElementById(uid) as HTMLElement
    const answer = avatar.dataset.answer
    return correctAnswer === answer
  }

  const moveLoser = (loser: Member): void => {
    const writer = new DataStreamWriter(loser)
    const draggable = new SyncDraggable(writer)
    draggable.unsetDraggable(loser.uid)
    addLoser(loser)
    draggable.setNonDraggableAttribute(loser.uid)
    const index = loser.myIndex as number
    injectDummyMember(index)
  }

  const moveWinner = (winner: Member) => {
    const writer = new DataStreamWriter(winner)
    const draggable = new SyncDraggable(writer)
    draggable.unsetDraggable(winner.uid)
    addWinner(winner)
    draggable.setNonDraggableAttribute(winner.uid)
    const index = winner.myIndex as number
    injectDummyMember(index)
  }

  const getWinnersFromMembers = (correctAnswer: string): Member[] => {
    let winnersInMembers: Member[] = []
    for (let i = 0; i < members.value.length; i++) {
      if (members.value[i].uid === '') continue
      const member = members.value[i] as Member
      if (isWinner(member, correctAnswer)) {
        const index = member.myIndex as number
        const winner = members.value[index] as Member
        winnersInMembers.push(winner)
      }
    }
    return winnersInMembers
  }

  const getLosersFromMembers = (correctAnswer: string): Member[] => {
    let losersInMembers: Member[] = []
    for (let i = 0; i < members.value.length; i++) {
      if (members.value[i].uid === '') continue
      const member = members.value[i] as Member
      if (isLoser(member, correctAnswer)) {
        const index = member.myIndex as number
        const loser = members.value[index] as Member
        losersInMembers.push(loser)
      }
    }
    return losersInMembers
  }

  const judge = (correctAnswer: string) => {
    const winnersInMembers = getWinnersFromMembers(correctAnswer)
    const losersInMembers = getLosersFromMembers(correctAnswer)
    const countOfWinners = winnersInMembers.length
    if (countOfWinners === numberOfWinner.value) {
      winnersInMembers.forEach((winner) => moveWinner(winner))
      losersInMembers.forEach((loser) => moveLoser(loser))
      subtractNumberOfWinner(countOfWinners)
    } else if (countOfWinners < numberOfWinner.value) {
      winnersInMembers.forEach((winner) => moveWinner(winner))
      subtractNumberOfWinner(countOfWinners)
    } else if (countOfWinners > numberOfWinner.value) {
      losersInMembers.forEach((loser) => moveLoser(loser))
    }
    checkEndOfGame()
  }

  return {
    owners,
    members,
    losers,
    winners,
    numberOfWinner,
    isEndOfGame,
    addOwner,
    addMember,
    setAllMembers,
    judge,
    createDummyMember
  }
}
