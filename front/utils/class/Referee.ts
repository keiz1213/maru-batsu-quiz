import { Game } from '~/types/game'
import Avatar from '~/utils/class/Avatar'
import SyncDraggable from '~/utils/class/SyncDraggable'

class Referee {
  draggable: SyncDraggable

  constructor(game: Game, draggable: SyncDraggable) {
    this.draggable = draggable
    const initialNumberOfWinner = game.number_of_winner
    const { setNumberOfWinner } = useNumberOfWinner()
    setNumberOfWinner(initialNumberOfWinner)
  }

  startGame = (avatar: Avatar) => {
    const { startGame } = useGameState()
    const { notifyOnSpot } = useToast()
    const { clearLoading } = useLoading()
    this.draggable.setDraggable(avatar)
    this.draggable.setDropzone('maru', avatar)
    this.draggable.setDropzone('batsu', avatar)
    startGame()
    clearLoading()
    notifyOnSpot('接続が完了しました。ゲームを開始できます。', 'success')
  }

  checkEndOfGame = () => {
    const { numberOfWinner } = useNumberOfWinner()
    const { endGame } = useGameState()
    if (numberOfWinner.value === 0) {
      endGame()
      fireWorks()
    }
  }

  convert = (answer: string) => {
    if (answer === 'maru') {
      return '◯'
    } else if (answer === 'batsu') {
      return '✕'
    } else {
      return ''
    }
  }

  checkLoser = (player: Avatar, correctAnswer: string) => {
    const avatarElement = document.getElementById(
      player.avatarId
    ) as HTMLElement
    const answer = this.convert(avatarElement.dataset.answer!)
    return correctAnswer != answer || answer === ''
  }

  checkWinner = (player: Avatar, correctAnswer: string) => {
    const avatarElement = document.getElementById(
      player.avatarId
    ) as HTMLElement
    const answer = this.convert(avatarElement.dataset.answer!)
    return correctAnswer === answer
  }

  addLoser = (loser: Avatar) => {
    const { addLoser } = useLosers()
    const avatarElement = document.getElementById(loser.avatarId) as HTMLElement
    avatarElement.classList.add('animate__rotateOut')
    avatarElement.classList.remove('z-10')
    avatarElement.dataset.state = 'loser'
    this.draggable.unsetDraggable(loser)
    addLoser(loser)
  }

  addWinner = (winner: Avatar) => {
    const { addWinner } = useWinners()
    const avatarElement = document.getElementById(
      winner.avatarId
    ) as HTMLElement
    avatarElement.classList.add('animate__fadeOut')
    avatarElement.classList.remove('z-10')
    avatarElement.dataset.state = 'winner'
    this.draggable.unsetDraggable(winner)
    addWinner(winner)
  }

  getWinnersFromPlayers = (correctAnswer: string) => {
    const { players } = usePlayers()
    let winnersInPlayers: Avatar[] = []
    for (let i = 0; i < players.value.length; i++) {
      const avatarElement = document.getElementById(
        players.value[i].avatarId
      ) as HTMLElement
      if (avatarElement.dataset.state != '') continue
      const player = players.value[i] as Avatar
      if (this.checkWinner(player, correctAnswer)) {
        winnersInPlayers.push(player)
      }
    }
    return winnersInPlayers
  }

  getLosersFromPlayers = (correctAnswer: string): Avatar[] => {
    const { players } = usePlayers()
    let losersInPlayers: Avatar[] = []
    for (let i = 0; i < players.value.length; i++) {
      const avatarElement = document.getElementById(
        players.value[i].avatarId
      ) as HTMLElement
      if (avatarElement.dataset.state != '') continue
      const player = players.value[i] as Avatar
      if (this.checkLoser(player, correctAnswer)) {
        losersInPlayers.push(player)
      }
    }
    return losersInPlayers
  }

  judge = (correctAnswer: string) => {
    const { numberOfWinner, subtractNumberOfWinner } = useNumberOfWinner()
    const { incrementCurrentQuizNumber } = useCurrentQuizNumber()
    const winnersInPlayers = this.getWinnersFromPlayers(correctAnswer)
    const losersInPlayers = this.getLosersFromPlayers(correctAnswer)
    const countOfWinners = winnersInPlayers.length
    if (countOfWinners === numberOfWinner.value) {
      winnersInPlayers.forEach((winner) => this.addWinner(winner))
      losersInPlayers.forEach((loser) => this.addLoser(loser))
      subtractNumberOfWinner(countOfWinners)
    } else if (countOfWinners < numberOfWinner.value) {
      winnersInPlayers.forEach((winner) => this.addWinner(winner))
      subtractNumberOfWinner(countOfWinners)
    } else if (countOfWinners > numberOfWinner.value) {
      losersInPlayers.forEach((loser) => this.addLoser(loser))
    }
    incrementCurrentQuizNumber()
    this.checkEndOfGame()
  }
}

export default Referee
