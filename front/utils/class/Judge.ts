import Avatar from '~/utils/class/Avatar'
import { ParticipantData } from '~/types/participantData'

class Judge {
  participantData: Ref<ParticipantData[]>
  owner: Ref<Avatar | undefined>
  players: Ref<Avatar[]>
  losers: Ref<Avatar[]>
  winners: Ref<Avatar[]>
  numberOfWinner: Ref<number>
  currentQuizNumber: Ref<number>
  questionVisible: Ref<boolean>
  isStandByGame: Ref<boolean>
  isEndOfGame: Ref<boolean>
  addParticipantData: Function
  addOwner: Function
  addPlayer: Function
  setAllPlayers: Function
  openQuestion: Function
  closeQuestion: Function
  startGame: Function
  judge: Function

  constructor(initialNumberOfWinner: number) {
    const {
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
    } = useJudge(initialNumberOfWinner)

    this.participantData = participantData
    this.owner = owner
    this.players = players
    this.losers = losers
    this.winners = winners
    this.numberOfWinner = numberOfWinner
    this.currentQuizNumber = currentQuizNumber
    this.questionVisible = questionVisible
    this.isStandByGame = isStandByGame
    this.isEndOfGame = isEndOfGame
    this.addParticipantData = addParticipantData
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
