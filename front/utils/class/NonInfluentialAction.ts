import { AvatarParams } from '~/types/avatarParams'
import { ChatMessage } from '~/types/chatMessage'
import Avatar from '~/utils/class/Avatar'
import ReactiveVenue from './ReactiveVenue'

class NonInfluentialAction {
  reactiveVenue: ReactiveVenue

  constructor(initialNumberOfWinner: number) {
    this.reactiveVenue = new ReactiveVenue(initialNumberOfWinner)
  }

  startTheGame = (avatar: Avatar) => {
    this.reactiveVenue.judge.startGame(avatar)
  }

  setAvatar = (avatar: Avatar) => {
    if (!document.getElementById(avatar.id)) {
      if (avatar.owner) {
        this.reactiveVenue.judge.addOwner(avatar)
      } else {
        this.reactiveVenue.judge.addPlayer(avatar)
      }
    }
  }

  setAllPlayerAvatars = (players: Avatar[]) => {
    this.reactiveVenue.judge.setAllPlayers(players)
  }

  moveAvatar = (avatarParams: AvatarParams) => {
    const target = document.getElementById(avatarParams.id) as HTMLElement
    const x = avatarParams.x
    const y = avatarParams.y
    const answer = avatarParams.answer
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
    target.setAttribute('data-answer', answer)
  }

  reflectAnnounceText = (announceText: string) => {
    this.reactiveVenue.announce.updateAnnounceText(announceText)
  }

  startTheQuiz = (announceText: string) => {
    this.reactiveVenue.timer.startTimer()
    this.reactiveVenue.announce.updateAnnounceText(announceText)
  }

  checkExplanation = (announceText: string) => {
    this.reactiveVenue.timer.resetTimer()
    this.reactiveVenue.announce.updateAnnounceText(announceText)
  }

  reflectChatMessage = (chatMessage: ChatMessage) => {
    this.reactiveVenue.chat.addChatMessage(chatMessage)
  }

  executeJudge = (correctAnswer: string) => {
    this.reactiveVenue.judge.judge(correctAnswer)
  }

  addParticipantName = (participantName: string) => {
    this.reactiveVenue.publication.addPublisherName(participantName)
  }

  setLoading = () => {
    this.reactiveVenue.load.setLoading()
  }

  clearLoading = () => {
    this.reactiveVenue.load.clearLoading()
  }

  notifySkyWayError = () => {
    const { notifyOnSpot } = useToast()
    notifyOnSpot(
      'エラーが発生しました。ゲームを中断し、再度アクセスしてください',
      'error'
    )
  }
}

export default NonInfluentialAction
