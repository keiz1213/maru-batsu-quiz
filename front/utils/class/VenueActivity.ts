import { NotificationType } from '~/types/notificationType'
import { AvatarParams } from '~/types/avatarParams'
import { ParticipantMetaData } from '~/types/participantMetaData'
import { ChatMessage } from '~/types/chatMessage'
import Avatar from '~/utils/class/Avatar'
import OwnerAvatar from '~/utils/class/OwnerAvatar'
import PlayerAvatar from '~/utils/class/PlayerAvatar'
import Referee from './Referee'
import Chat from './Chat'
import Announce from './Announce'
import Timer from './Timer'

class VenueActivity {
  referee: Referee
  chat: Chat
  announce: Announce
  timer: Timer

  constructor(referee: Referee, chat: Chat, announce: Announce, timer: Timer) {
    this.referee = referee
    this.chat = chat
    this.announce = announce
    this.timer = timer
  }

  setMyAvatarId = (avatarId: string) => {
    const { setMyAvatarId } = useMyAvatar()
    setMyAvatarId(avatarId)
  }

  lockAvatar = (avatar: Avatar) => {
    this.referee.draggable.unsetDraggable(avatar)
  }

  unLockAvatar = (avatar: Avatar) => {
    this.referee.draggable.setDraggable(avatar)
  }

  addParticipantMetaData = (participantMetaData: ParticipantMetaData) => {
    const { addParticipantMetaData } = useParticipantMetaData()
    addParticipantMetaData(participantMetaData)
  }

  addOwner = (avatar: OwnerAvatar) => {
    const { addOwner } = useOwner()
    addOwner(avatar)
  }

  addPlayer = (avatar: PlayerAvatar) => {
    const { addPlayer } = usePlayers()
    addPlayer(avatar)
  }

  startGame = (avatar: Avatar) => {
    this.referee.startGame(avatar)
  }

  setAvatar = (avatar: OwnerAvatar | PlayerAvatar) => {
    if (!document.getElementById(avatar.avatarId)) {
      if (avatar.avatarIndex === null) {
        this.addOwner(avatar as OwnerAvatar)
      } else {
        this.addPlayer(avatar as PlayerAvatar)
      }
    }
  }

  setAllPlayerAvatars = (players: PlayerAvatar[]) => {
    const { setAllPlayers } = usePlayers()
    setAllPlayers(players)
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
    this.announce.updateAnnounceText(announceText)
  }

  startQuiz = (announceText: string) => {
    this.timer.startTimer()
    this.announce.updateAnnounceText(announceText)
  }

  checkExplanation = (announceText: string) => {
    this.timer.resetTimer()
    this.announce.updateAnnounceText(announceText)
  }

  reflectChatMessage = (chatMessage: ChatMessage) => {
    this.chat.addChatMessage(chatMessage)
  }

  judge = (correctAnswer: string) => {
    this.referee.judge(correctAnswer)
  }

  openQuestion = () => {
    const { openQuestion } = useQuestionVisible()
    openQuestion()
  }

  closeQuestion = () => {
    const { closeQuestion } = useQuestionVisible()
    closeQuestion()
  }

  setQuizLoading = () => {
    const { setQuizLoading } = useQuizLoading()
    setQuizLoading()
  }

  clearQuizLoading = () => {
    const { clearQuizLoading } = useQuizLoading()
    clearQuizLoading()
  }

  setConnectionLoading = () => {
    const { setConnectionLoading } = useConnectionLoading()
    setConnectionLoading()
  }

  clearConnectionLoading = () => {
    const { clearConnectionLoading } = useConnectionLoading()
    clearConnectionLoading()
  }

  calculateProgress = (numberOfPlayers: number) => {
    const progress = (1 / 3) * (1 / numberOfPlayers)
    const { addProgress } = useConnectionProgress()
    addProgress(progress * 100)
  }

  notifyError = () => {
    const { notifyOnSpot } = useToast()
    notifyOnSpot(
      'エラーが発生しました。ゲームを中断し、再度アクセスしてください',
      NotificationType.Error
    )
  }
}

export default VenueActivity
