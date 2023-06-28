import Avatar from './Avatar'
import { AvatarParams } from '@/types/AvatarParams'
import { ChatMessage } from '@/types/ChatMessage'

class DataStreamHandler {
  addOwner: Function
  addPlayer: Function
  setAllPlayers: Function
  startGame: Function
  startTimer: Function
  resetTimer: Function
  judge: Function
  updateAnnounceText: Function
  addChatMessage: Function
  addPublisherName: Function
  updateErrorMessage: Function
  clearErrorMessage: Function

  constructor(
    addOwner: Function,
    addPlayer: Function,
    setAllPlayers: Function,
    startGame: Function,
    startTimer: Function,
    resetTimer: Function,
    judge: Function,
    updateAnnounceText: Function,
    addChatMessage: Function,
    addPublisherName: Function,
    updateErrorMessage: Function,
    clearErrorMessage: Function
  ) {
    this.addOwner = addOwner
    this.addPlayer = addPlayer
    this.setAllPlayers = setAllPlayers
    this.startGame = startGame
    this.startTimer = startTimer
    this.resetTimer = resetTimer
    this.judge = judge
    this.updateAnnounceText = updateAnnounceText
    this.addChatMessage = addChatMessage
    this.addPublisherName = addPublisherName
    this.updateErrorMessage = updateErrorMessage
    this.clearErrorMessage = clearErrorMessage
  }

  startGameAction = (avatar: Avatar): void => {
    this.startGame(avatar)
  }

  placeAvatarAction = (avatar: Avatar): void => {
    if (!document.getElementById(avatar.uid)) {
      if (avatar.owner) {
        this.addOwner(avatar)
      } else {
        this.addPlayer(avatar)
      }
    }
  }

  placeAllPlayerAvatarAction = (players: Avatar[]): void => {
    this.setAllPlayers(players)
  }

  moveAvatarAction = (avatarParams: AvatarParams): void => {
    const target = document.getElementById(avatarParams.id) as HTMLElement
    const x = avatarParams.x
    const y = avatarParams.y
    const answer = avatarParams.answer
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
    target.setAttribute('data-answer', answer)
  }

  updateAnnounceTextAction = (announceText: string): void => {
    this.updateAnnounceText(announceText)
  }

  startQuizAction = (announceText: string): void => {
    this.startTimer()
    this.updateAnnounceText(announceText)
  }

  checkExplanationAction = (announceText: string): void => {
    this.resetTimer()
    this.updateAnnounceText(announceText)
  }

  updateChatAction = (chatMessage: ChatMessage): void => {
    this.addChatMessage(chatMessage)
  }

  executeJudgeAction = (correctAnswer: string): void => {
    this.judge(correctAnswer)
  }

  addPublisherNameAction = (publisherName: string) => {
    this.addPublisherName(publisherName)
  }

  updateErrorMessageAction = (message: string) => {
    this.updateErrorMessage(message)
  }

  clearErroMessageAction = () => {
    this.clearErroMessageAction()
  }
}

export default DataStreamHandler
