import Avatar from './Avatar'
import OwnerAvatar from './OwnerAvatar'
import { AvatarParams } from '@/types/AvatarParams'
import { ChatMessage } from '@/types/ChatMessage'

class Reaction {
  addOwner: Function
  addPlayer: Function
  setAllPlayers: Function
  startGame: Function
  startTimer: Function
  resetTimer: Function
  judge: Function
  updateAnnounceText: Function
  addChatMessage: Function
  addPublicationId: Function
  addPublisherName: Function

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
    addPublicationId: Function,
    addPublisherName: Function
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
    this.addPublicationId = addPublicationId
    this.addPublisherName = addPublisherName
  }

  startTheGame = (): void => {
    this.startGame
  }

  placeAvatar = (avatar: Avatar): void => {
    if (!document.getElementById(avatar.uid)) {
      if (avatar instanceof OwnerAvatar) {
        this.addOwner(avatar)
      } else {
        this.addPlayer(avatar)
      }
    }
  }

  placeAllPlayerAvatar = (players: Avatar[]): void => {
    this.setAllPlayers(players)
  }

  moveOtherAvatar = (avatarParams: AvatarParams): void => {
    const target = document.getElementById(avatarParams.id) as HTMLElement
    const x = avatarParams.x
    const y = avatarParams.y
    const answer = avatarParams.answer
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
    target.setAttribute('data-answer', answer)
  }

  acceptAnnounce = (announceText: string): void => {
    this.updateAnnounceText(announceText)
  }

  startQuiz = (announceText: string): void => {
    this.startTimer()
    this.updateAnnounceText(announceText)
  }

  stopTimer = (announceText: string): void => {
    this.resetTimer()
    this.updateAnnounceText(announceText)
  }

  updateChat = (chatMessage: ChatMessage): void => {
    this.addChatMessage(chatMessage)
  }

  executeJudge = (): void => {
    this.judge()
  }

  pushPublicationId = (publicationId: string) => {
    this.addPublicationId(publicationId)
  }

  pushPublicationName = (publisherName: string) => {
    this.addPublisherName(publisherName)
  }
}

export default Reaction
