import { ChatMessage } from '~/types/chatMessage'
import { ParticipantData } from '~/types/participantData'
import Avatar from './Avatar'
import Judge from './Judge'
import Announce from './Announce'
import Chat from './Chat'
import Timer from './Timer'
import Load from './Load'

class ReactiveVenue {
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
  announceText: Ref<string>
  chatVisible: Ref<boolean>
  chatMessages: Ref<ChatMessage[]>
  timeElapsed: Ref<number>
  timeLimit: Ref<number>
  loading: Ref<boolean>
  judge: Judge
  announce: Announce
  chat: Chat
  timer: Timer
  load: Load

  constructor(initialNumberOfWinner: number) {
    const judge = new Judge(initialNumberOfWinner)
    const announce = new Announce()
    const chat = new Chat()
    const timer = new Timer()
    const load = new Load()

    this.participantData = judge.participantData
    this.owner = judge.owner
    this.players = judge.players
    this.losers = judge.losers
    this.winners = judge.winners
    this.numberOfWinner = judge.numberOfWinner
    this.currentQuizNumber = judge.currentQuizNumber
    this.questionVisible = judge.questionVisible
    this.isStandByGame = judge.isStandByGame
    this.isEndOfGame = judge.isEndOfGame
    this.announceText = announce.announceText
    this.chatVisible = chat.chatVisible
    this.chatMessages = chat.chatMessages
    this.timeElapsed = timer.timeElapsed
    this.timeLimit = timer.timeLimit
    this.loading = load.loading
    this.judge = judge
    this.announce = announce
    this.chat = chat
    this.timer = timer
    this.load = load
  }
}

export default ReactiveVenue
