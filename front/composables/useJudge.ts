import Avatar from '~/utils/class/Avatar'
import SyncDraggable from '~/utils/class/SyncDraggable'
import { ParticipantData } from '~/types/participantData'

export const useJudge = (initialNumberOfWinner: number) => {
  const participantData = ref<ParticipantData[]>([])
  const owner = ref<Avatar>()
  const players: Ref<Avatar[]> = ref([])
  const losers: Ref<Avatar[]> = ref([])
  const winners: Ref<Avatar[]> = ref([])
  const numberOfWinner = ref<number>(initialNumberOfWinner)
  const currentQuizNumber = ref(0)
  const questionVisible = ref(false)
  const isStandByGame = ref(true)
  const isEndOfGame = ref(false)

  const addParticipantData = (data: ParticipantData) => {
    participantData.value.push(data)
  }

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

  const openQuestion = () => {
    questionVisible.value = true
  }

  const closeQuestion = () => {
    questionVisible.value = false
  }

  const startGame = (avatar: Avatar) => {
    const { notifyOnSpot } = useToast()
    SyncDraggable.setDraggable(avatar)
    SyncDraggable.setDropzone('maru', avatar)
    SyncDraggable.setDropzone('batsu', avatar)
    isStandByGame.value = false
    notifyOnSpot('接続が完了しました。ゲームを開始できます。', 'success')
  }

  const checkEndOfGame = () => {
    if (numberOfWinner.value === 0) {
      isEndOfGame.value = true
      fireWorks()
    }
  }

  const convert = (answer: string) => {
    if (answer === 'maru') {
      return '◯'
    } else if (answer === 'batsu') {
      return '✕'
    } else {
      return ''
    }
  }

  const isLoser = (player: Avatar, correctAnswer: string) => {
    const avatarElement = document.getElementById(player.id) as HTMLElement
    const answer = convert(avatarElement.dataset.answer!)
    return correctAnswer != answer || answer === ''
  }

  const isWinner = (player: Avatar, correctAnswer: string) => {
    const avatarElement = document.getElementById(player.id) as HTMLElement
    const answer = convert(avatarElement.dataset.answer!)
    return correctAnswer === answer
  }

  const moveLoser = (loser: Avatar) => {
    const avatarElement = document.getElementById(loser.id) as HTMLElement
    avatarElement.classList.add('animate__rotateOut')
    avatarElement.classList.remove('z-10')
    avatarElement.dataset.state = 'loser'
    SyncDraggable.unsetDraggable(loser)
    addLoser(loser)
  }

  const moveWinner = (winner: Avatar) => {
    const avatarElement = document.getElementById(winner.id) as HTMLElement
    avatarElement.classList.add('animate__fadeOut')
    avatarElement.classList.remove('z-10')
    avatarElement.dataset.state = 'winner'
    SyncDraggable.unsetDraggable(winner)
    addWinner(winner)
  }

  const getWinnersFromPlayers = (correctAnswer: string) => {
    let winnersInPlayers: Avatar[] = []
    for (let i = 0; i < players.value.length; i++) {
      const avatarElement = document.getElementById(
        players.value[i].id
      ) as HTMLElement
      if (avatarElement.dataset.state != '') continue
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
      const avatarElement = document.getElementById(
        players.value[i].id
      ) as HTMLElement
      if (avatarElement.dataset.state != '') continue
      const player = players.value[i] as Avatar
      if (isLoser(player, correctAnswer)) {
        losersInPlayers.push(player)
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
    participantData,
    owner,
    players,
    losers,
    winners,
    numberOfWinner,
    currentQuizNumber,
    questionVisible,
    isStandByGame,
    isEndOfGame,
    addParticipantData,
    addOwner,
    addPlayer,
    setAllPlayers,
    openQuestion,
    closeQuestion,
    startGame,
    judge
  }
}
