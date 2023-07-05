import Avatar from '~/utils/Avatar'

export const useJudge = (initialNumberOfWinner: number) => {
  const owner = ref<Avatar>()
  const players: Ref<Avatar[]> = ref([])
  const losers: Ref<Avatar[]> = ref([])
  const winners: Ref<Avatar[]> = ref([])
  const numberOfWinner = ref<number>(initialNumberOfWinner)
  const currentQuizNumber = ref(0)
  const isStandByGame = ref(true)
  const isEndOfGame = ref(false)

  const addOwner = (gameOwner: Avatar) => {
    owner.value = gameOwner
  }

  const addPlayer = (player: Avatar) => {
    players.value.push(player)
  }

  const addLoser = (loser: Avatar) => {
    losers.value.push(loser)
  }

  const addWinner = (winner: Avatar) => {
    winners.value.push(winner)
  }

  const setAllPlayers = (allPlayers: Avatar[]) => {
    players.value = allPlayers
  }

  const subtractNumberOfWinner = (subtractBy: number) => {
    numberOfWinner.value -= subtractBy
  }

  const incrementCurrentQuizNumber = () => {
    currentQuizNumber.value++
  }

  const startGame = (avatar: Avatar) => {
    SyncDraggable.setDraggable(avatar)
    SyncDraggable.setDropzone('◯', avatar)
    SyncDraggable.setDropzone('✕', avatar)
    isStandByGame.value = false
  }

  const checkEndOfGame = () => {
    if (numberOfWinner.value === 0) {
      isEndOfGame.value = true
    }
  }

  const createDummyAvatar = (): Avatar => {
    const avatar = new Avatar(
      0,
      '',
      false,
      '',
      '',
      null,
      null,
      null,
      null,
      null,
      null,
      null
    )
    return avatar
  }

  const injectDummyAvatar = (index: number): void => {
    const dummyAvatar = createDummyAvatar()
    players.value[index] = dummyAvatar
  }

  const isLoser = (player: Avatar, correctAnswer: string): boolean => {
    const uid = player.uid
    const avatarElement = document.getElementById(uid) as HTMLElement
    const answer = avatarElement.dataset.answer
    return correctAnswer != answer || answer === ''
  }

  const isWinner = (player: Avatar, correctAnswer: string): boolean => {
    console.log(`----isWinner----`)
    console.log(`correctAnswer: ${correctAnswer}`)
    const uid = player.uid
    console.log(`id: ${uid}`)
    const avatarElement = document.getElementById(uid) as HTMLElement
    console.log(`avatarElement: ${avatarElement}`)
    const answer = avatarElement.dataset.answer
    console.log(`answer: ${answer}`)
    console.log(`判定: ${correctAnswer === answer}`)
    return correctAnswer === answer
  }

  const moveLoser = (loser: Avatar): void => {
    SyncDraggable.unsetDraggable(loser)
    addLoser(loser)
    const index = loser.index as number
    injectDummyAvatar(index)
  }

  const moveWinner = (winner: Avatar) => {
    SyncDraggable.unsetDraggable(winner)
    addWinner(winner)
    const index = winner.index as number
    injectDummyAvatar(index)
  }

  const getWinnersFromPlayers = (correctAnswer: string): Avatar[] => {
    let winnersInPlayers: Avatar[] = []
    for (let i = 0; i < players.value.length; i++) {
      if (players.value[i].id === 0) continue
      const player = players.value[i] as Avatar
      if (isWinner(player, correctAnswer)) {
        winnersInPlayers.push(player)
      }
    }
    return winnersInPlayers
  }

  const getLosersFromPlayers = (correctAnswer: string): Avatar[] => {
    let losersInPlayers: Avatar[] = []
    for (let i = 0; i < players.value.length; i++) {
      if (players.value[i].uid === '') continue
      const player = players.value[i] as Avatar
      if (isLoser(player, correctAnswer)) {
        losersInPlayers.push(player)
      }
    }
    return losersInPlayers
  }

  const judge = (correctAnswer: string) => {
    console.log('----judge----')
    const winnersInPlayers = getWinnersFromPlayers(correctAnswer)
    console.log(`winners: ${winnersInPlayers}`)
    const losersInPlayers = getLosersFromPlayers(correctAnswer)
    console.log(`losers: ${losersInPlayers}`)
    const countOfWinners = winnersInPlayers.length
    if (countOfWinners === numberOfWinner.value) {
      winnersInPlayers.forEach((winner) => moveWinner(winner))
      losersInPlayers.forEach((loser) => moveLoser(loser))
      subtractNumberOfWinner(countOfWinners)
    } else if (countOfWinners < numberOfWinner.value) {
      winnersInPlayers.forEach((winner) => moveWinner(winner))
      subtractNumberOfWinner(countOfWinners)
    } else if (countOfWinners > numberOfWinner.value) {
      losersInPlayers.forEach((loser) => moveLoser(loser))
    }
    incrementCurrentQuizNumber()
    checkEndOfGame()
  }

  return {
    owner,
    players,
    losers,
    winners,
    numberOfWinner,
    currentQuizNumber,
    isStandByGame,
    isEndOfGame,
    addOwner,
    addPlayer,
    setAllPlayers,
    startGame,
    judge
  }
}
