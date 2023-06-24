import Avatar from './Avatar'
import OwnerAvatar from './OwnerAvatar'
import { AvatarParams } from '@/types/AvatarParams'
import { ChatMessage } from '@/types/ChatMessage'

class Reaction {
  addOwner: Function
  addMember: Function
  setAllMembers: Function
  startTimer: Function
  resetTimer: Function
  judge: Function
  updateAnnounceText: Function
  addChatMessage: Function

  constructor(
    addOwner: Function,
    addMember: Function,
    setAllMembers: Function,
    startTimer: Function,
    resetTimer: Function,
    judge: Function,
    updateAnnounceText: Function,
    addChatMessage: Function
  ) {
    this.addOwner = addOwner
    this.addMember = addMember
    this.setAllMembers = setAllMembers
    this.startTimer = startTimer
    this.resetTimer = resetTimer
    this.judge = judge
    this.updateAnnounceText = updateAnnounceText
    this.addChatMessage = addChatMessage
  }

  placeAvatar = (avatar: Avatar): void => {
    if (!document.getElementById(avatar.uid)) {
      if (avatar instanceof OwnerAvatar) {
        this.addOwner(avatar)
      } else {
        this.addMember(avatar)
      }
    }
  }

  startGame = () => {}

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
}

export default Reaction
