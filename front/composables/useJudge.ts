import Avatar from '~/utils/Avatar'

export const useJudge = (initialNumberOfWinner: number) => {
  const owner = ref<Avatar>()
  const players = ref<Avatar[]>([])
  const losers = ref<Avatar[]>([])
  const winners = ref<Avatar[]>([])
  const numberOfWinner = ref<number>(initialNumberOfWinner)
  const currentQuizNumber = ref(1)
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
    const writer = new DataStreamWriter(avatar)
    const draggable = new SyncDraggable(writer)
    draggable.setDraggable(avatar.uid)
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
    const uid = player.uid
    const avatarElement = document.getElementById(uid) as HTMLElement
    const answer = avatarElement.dataset.answer
    return correctAnswer === answer
  }

  const moveLoser = (loser: Avatar): void => {
    const writer = new DataStreamWriter(loser)
    const draggable = new SyncDraggable(writer)
    draggable.unsetDraggable(loser.uid)
    addLoser(loser)
    draggable.setNonDraggableAttribute(loser.uid)
    const index = loser.index as number
    injectDummyAvatar(index)
  }

  const moveWinner = (winner: Avatar) => {
    const writer = new DataStreamWriter(winner)
    const draggable = new SyncDraggable(writer)
    draggable.unsetDraggable(winner.uid)
    addWinner(winner)
    draggable.setNonDraggableAttribute(winner.uid)
    const index = winner.index as number
    injectDummyAvatar(index)
  }

  const getWinnersFromPlayers = (correctAnswer: string): Avatar[] => {
    let winnersInPlayers: Avatar[] = []
    for (let i = 0; i < players.value.length; i++) {
      if (players.value[i].uid === '') continue
      const player = players.value[i] as Avatar
      if (isWinner(player, correctAnswer)) {
        const index = player.index as number
        const winner = players.value[index] as Avatar
        winnersInPlayers.push(winner)
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
        const index = player.index as number
        const loser = players.value[index] as Avatar
        losersInPlayers.push(loser)
      }
    }
    return losersInPlayers
  }

  const judge = (correctAnswer: string) => {
    const winnersInPlayers = getWinnersFromPlayers(correctAnswer)
    const losersInPlayers = getLosersFromPlayers(correctAnswer)
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
