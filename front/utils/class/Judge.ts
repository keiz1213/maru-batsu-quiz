import Avatar from '~/utils/class/Avatar'

class Judge {
  owner: Ref<Avatar | undefined>
  players: Ref<Avatar[]>
  losers: Ref<Avatar[]>
  winners: Ref<Avatar[]>
  numberOfWinner: Ref<number>
  currentQuizNumber: Ref<number>
  questionVisible: Ref<boolean>
  isStandByGame: Ref<boolean>
  isEndOfGame: Ref<boolean>
  addOwner: Function
  addPlayer: Function
  setAllPlayers: Function
  openQuestion: Function
  closeQuestion: Function
  startGame: Function
  judge: Function

  constructor(initialNumberOfWinner: number) {
    const {
      owner,
      players,
      losers,
      winners,
      numberOfWinner,
      currentQuizNumber,
      questionVisible,
      isStandByGame,
      isEndOfGame,
      addOwner,
      addPlayer,
      setAllPlayers,
      openQuestion,
      closeQuestion,
      startGame,
      judge
    } = useJudge(initialNumberOfWinner)

    this.owner = owner
    this.players = players
    this.losers = losers
    this.winners = winners
    this.numberOfWinner = numberOfWinner
    this.currentQuizNumber = currentQuizNumber
    this.questionVisible = questionVisible
    this.isStandByGame = isStandByGame
    this.isEndOfGame = isEndOfGame
    this.addOwner = addOwner
    this.addPlayer = addPlayer
    this.setAllPlayers = setAllPlayers
    this.openQuestion = openQuestion
    this.closeQuestion = closeQuestion
    this.startGame = startGame
    this.judge = judge
  }
}

export default Judge
