// @vitest-environment nuxt
import { NotificationType } from "~/types/notificationType"
import { AvatarParams } from '~/types/avatarParams'
import { expect, it, vi } from 'vitest'
import VenueActivity from '~/utils/class/VenueActivity'
import OwnerAvatar from '~/utils/class/OwnerAvatar'
import SyncDraggable from '~/utils/class/SyncDraggable'
import Referee from '~/utils/class/Referee'
import Chat from '~/utils/class/Chat'
import Announce from '~/utils/class/Announce'
import Timer from '~/utils/class/Timer'
import PlayerAvatar from '~/utils/class/PlayerAvatar'
import Avatar from '~/utils/class/Avatar'

afterEach(() => {
  vi.restoreAllMocks()
})

const game = {
  user_id: 1,
  id: 1,
  channel_name: 'test name',
  title: 'Test Game',
  description: 'This is a test game',
  quizzes: [
    {
      question: '1 + 1 = 2 ?',
      correct_answer: '◯',
      explanation: '普通に2です'
    },
    {
      question: '2 + 2 = 5 ?',
      correct_answer: '✕',
      explanation: '普通に4です'
    }
  ],
  number_of_winner: 3,
  created_at: '2023-08-04T12:34:56Z',
  updated_at: '2023-08-04T14:22:33Z'
}

const currentUser1 = {
  id: 1,
  uid: 'test1',
  name: 'test user1',
  avatar_url: 'https://avatars.githubusercontent.com/u/72614612?v=4',
  games: []
}
const currentUser2 = {
  id: 2,
  uid: 'test2',
  name: 'test user2',
  avatar_url: 'https://avatars.githubusercontent.com/u/72614612?v=4',
  games: [game]
}
const currentUser3 = {
  id: 3,
  uid: 'test3',
  name: 'test user3',
  avatar_url: 'https://avatars.githubusercontent.com/u/72614612?v=4',
  games: []
}
const currentUser4 = {
  id: 4,
  uid: 'test4',
  name: 'test user4',
  avatar_url: 'https://avatars.githubusercontent.com/u/72614612?v=4',
  games: []
}
const skywayChannelMock = {} as any
const dataStreamMock = {} as any

const mocks = vi.hoisted(() => {
  return {
    setMyAvatarId: vi.fn(),
    addParticipantMetaData: vi.fn(),
    addOwner: vi.fn(),
    addPlayer: vi.fn(),
    setAllPlayers: vi.fn(),
    openQuestion: vi.fn(),
    closeQuestion: vi.fn(),
    setQuizLoading: vi.fn(),
    clearQuizLoading: vi.fn(),
    setConnectionLoading: vi.fn(),
    clearConnectionLoading: vi.fn(),
    addProgress: vi.fn(),
    notifyOnSpot: vi.fn()
  }
})

vi.mock('~/composables/venue-states', async () => {
  const actual = (await vi.importActual('~/composables/venue-states')) as Object
  return {
    ...actual,
    useMyAvatar: () => {
      return {
        setMyAvatarId: mocks.setMyAvatarId
      }
    },
    useParticipantMetaData: () => {
      return {
        addParticipantMetaData: mocks.addParticipantMetaData
      }
    },
    useOwner: () => {
      return {
        addOwner: mocks.addOwner
      }
    },
    usePlayers: () => {
      return {
        players: {
          value: []
        },
        addPlayer: mocks.addPlayer,
        setAllPlayers: mocks.setAllPlayers
      }
    },
    useQuestionVisible: () => {
      return {
        openQuestion: mocks.openQuestion,
        closeQuestion: mocks.closeQuestion
      }
    },
    useQuizLoading: () => {
      return {
        setQuizLoading: mocks.setQuizLoading,
        clearQuizLoading: mocks.clearQuizLoading
      }
    },
    useConnectionLoading: () => {
      return {
        setConnectionLoading: mocks.setConnectionLoading,
        clearConnectionLoading: mocks.clearConnectionLoading
      }
    },
    useConnectionProgress: () => {
      return {
        addProgress: mocks.addProgress
      }
    }
  }
})

vi.mock('~/composables/use-toast', () => {
  return {
    useToast: () => {
      return {
        notifyOnSpot: mocks.notifyOnSpot
      }
    }
  }
})

const venueActivity = new VenueActivity(
  new Referee(game, new SyncDraggable()),
  new Chat(),
  new Announce(),
  new Timer()
)

const avatar = new Avatar(
  currentUser1,
  skywayChannelMock,
  dataStreamMock,
  venueActivity
)
const ownerAvatar = new OwnerAvatar(
  currentUser2,
  skywayChannelMock,
  dataStreamMock,
  venueActivity
)
const playerAvatar1 = new PlayerAvatar(
  currentUser3,
  skywayChannelMock,
  dataStreamMock,
  venueActivity
)
const playerAvatar2 = new PlayerAvatar(
  currentUser4,
  skywayChannelMock,
  dataStreamMock,
  venueActivity
)

describe('setMyAvatarId', () => {
  it('can set my avatar id', () => {
    const avatarId = avatar.avatarId
    venueActivity.setMyAvatarId(avatarId)
    expect(mocks.setMyAvatarId).toHaveBeenCalledWith(avatarId)
  })
})

describe('lockAvatar', () => {
  it('can make the avatar immobile', () => {
    const refereeSpy = vi.spyOn(
      venueActivity.referee.draggable,
      'unsetDraggable'
    )
    venueActivity.lockAvatar(avatar)
    expect(refereeSpy).toHaveBeenCalledWith(avatar)
  })
})

describe('unLockAvatar', () => {
  it('can make the avatar movable', () => {
    const refereeSpy = vi.spyOn(venueActivity.referee.draggable, 'setDraggable')
    venueActivity.unLockAvatar(avatar)
    expect(refereeSpy).toHaveBeenCalledWith(avatar)
  })
})

describe('addParticipantMetaData', () => {
  it('can add the metadata of participant', () => {
    const participantMetaData = {
      name: 'test user',
      imageUrl: 'https://avatars.githubusercontent.com/u/72614612?v=4'
    }
    venueActivity.addParticipantMetaData(participantMetaData)
    expect(mocks.addParticipantMetaData).toHaveBeenCalledWith(
      participantMetaData
    )
  })
})

describe('addOwner', () => {
  it('can add avatar of owner', () => {
    venueActivity.addOwner(ownerAvatar)
    expect(mocks.addOwner).toHaveBeenCalledWith(ownerAvatar)
  })
})

describe('addPlayer', () => {
  it('can add avatar of player', () => {
    venueActivity.addPlayer(playerAvatar1)
    expect(mocks.addPlayer).toHaveBeenCalledWith(playerAvatar1)
  })
})

describe('startGame', () => {
  it('can start the game', () => {
    const refereeSpy = vi.spyOn(venueActivity.referee, 'startGame')
    venueActivity.startGame(avatar)
    expect(refereeSpy).toHaveBeenCalledWith(avatar)
  })
})

describe('setAvatar', () => {
  describe('when avatar of owner', () => {
    it('can set avatar of owner', () => {
      const addOwnerSpy = vi.spyOn(venueActivity, 'addOwner')
      venueActivity.setAvatar(ownerAvatar)
      expect(addOwnerSpy).toHaveBeenCalledWith(ownerAvatar)
    })

    it('do not set it if the avatar already exists', () => {
      document.body.innerHTML = `
      <div id="${ownerAvatar.avatarId}" data-state="" class="z-10" data-answer="maru" style="width: 50px; height: 50px;">
      </div>
    `
      const addOwnerSpy = vi.spyOn(venueActivity, 'addOwner')
      venueActivity.setAvatar(ownerAvatar)
      expect(addOwnerSpy).not.toHaveBeenCalledWith(ownerAvatar)
    })
  })

  describe('when avatar of player', () => {
    it('can set avatar of player', () => {
      const addPlayerSpy = vi.spyOn(venueActivity, 'addPlayer')
      playerAvatar1.setMyIndex(0)
      venueActivity.setAvatar(playerAvatar1)
      expect(addPlayerSpy).toHaveBeenCalledWith(playerAvatar1)
    })

    it('do not set it if the avatar already exists', () => {
      document.body.innerHTML = `
      <div id="${playerAvatar1.avatarId}" data-state="" class="z-10" data-answer="maru" style="width: 50px; height: 50px;">
      </div>
    `
      const addPlayerSpy = vi.spyOn(venueActivity, 'addPlayer')
      venueActivity.setAvatar(playerAvatar1)
      expect(addPlayerSpy).not.toHaveBeenCalledWith(playerAvatar1)
    })
  })
})

describe('setAllPlayerAvatars', () => {
  it('can set all avatar of player', () => {
    const players = [playerAvatar1, playerAvatar2]
    venueActivity.setAllPlayerAvatars(players)
    expect(mocks.setAllPlayers).toHaveBeenCalledWith(players)
  })
})

describe('moveAvatar', () => {
  it('can move the avatar according to the avatarParams', () => {
    document.body.innerHTML = `
      <div id="${avatar.avatarId}" data-state="" class="z-10" data-answer="" style="width: 50px; height: 50px;">
      </div>
    `
    const avatarParams = {
      id: avatar.avatarId,
      x: '10',
      y: '10',
      answer: 'maru'
    } as AvatarParams
    venueActivity.moveAvatar(avatarParams)
    const element = document.getElementById(avatar.avatarId)
    expect(element!.dataset.answer).toBe('maru')
    expect(element!.dataset.x).toBe('10')
    expect(element!.dataset.y).toBe('10')
  })
})

describe('reflectAnnounceText', () => {
  it('can reflect the announcement text', () => {
    const { announceText } = useAnnounce()
    const announceSpy = vi.spyOn(venueActivity.announce, 'updateAnnounceText')
    const text = 'Hello!'
    venueActivity.reflectAnnounceText(text)
    expect(announceSpy).toHaveBeenCalledWith(text)
    expect(announceText.value).toBe(text)
    announceText.value = ''
  })
})

describe('startQuiz', () => {
  it('can start the quiz', () => {
    const { announceText } = useAnnounce()
    const announceSpy = vi.spyOn(venueActivity.announce, 'updateAnnounceText')
    const timerSpy = vi.spyOn(venueActivity.timer, 'startTimer')
    const text = '1問目！'
    venueActivity.startQuiz(text)
    expect(announceSpy).toHaveBeenCalledWith(text)
    expect(timerSpy).toHaveBeenCalledOnce()
    expect(announceText.value).toBe(text)
    announceText.value = ''
  })
})

describe('checkExplanation', () => {
  it('can stop the quiz', () => {
    const { announceText } = useAnnounce()
    const announceSpy = vi.spyOn(venueActivity.announce, 'updateAnnounceText')
    const timerSpy = vi.spyOn(venueActivity.timer, 'resetTimer')
    const text = '普通に2です'
    venueActivity.checkExplanation(text)
    expect(announceSpy).toHaveBeenCalledWith(text)
    expect(timerSpy).toHaveBeenCalledOnce()
    expect(announceText.value).toBe(text)
    announceText.value = ''
  })
})

describe('reflectChatMessage', () => {
  it('can reflect the chat message', () => {
    const { chatMessages } = useChat()
    const chatSpy = vi.spyOn(venueActivity.chat, 'addChatMessage')
    const chatMessage = {
      avatarId: avatar.avatarId,
      avatarImage: avatar.avatarImage,
      content: 'Hello!'
    }
    venueActivity.reflectChatMessage(chatMessage)
    expect(chatSpy).toHaveBeenCalledWith(chatMessage)
    expect(chatMessages.value[0]).toStrictEqual(chatMessage)
    chatMessages.value = []
  })
})

describe('judge', () => {
  it('can execute judge', () => {
    const refereeSpy = vi.spyOn(venueActivity.referee, 'judge')
    const correctAnswer = '◯'
    venueActivity.judge(correctAnswer)
    expect(refereeSpy).toHaveBeenCalledWith(correctAnswer)
  })
})

describe('openQuestion', () => {
  it('can open question', () => {
    venueActivity.openQuestion()
    expect(mocks.openQuestion).toHaveBeenCalledOnce()
  })
})

describe('closeQuestion', () => {
  it('can close question', () => {
    venueActivity.closeQuestion()
    expect(mocks.closeQuestion).toHaveBeenCalledOnce()
  })
})

describe('setQuizLoading', () => {
  it('can set loading of quiz', () => {
    venueActivity.setQuizLoading()
    expect(mocks.setQuizLoading).toHaveBeenCalledOnce()
  })
})

describe('clearQuizLoading', () => {
  it('can clear loading of quiz', () => {
    venueActivity.clearQuizLoading()
    expect(mocks.clearQuizLoading).toHaveBeenCalledOnce()
  })
})

describe('setConnectionLoading', () => {
  it('can set loading of connection', () => {
    venueActivity.setConnectionLoading()
    expect(mocks.setConnectionLoading).toHaveBeenCalledOnce()
  })
})

describe('clearConnectionLoading', () => {
  it('can clear loading of connection', () => {
    venueActivity.clearConnectionLoading()
    expect(mocks.clearConnectionLoading).toHaveBeenCalledOnce()
  })
})

describe('calculateProgress', () => {
  it('can calculate progress for connection', () => {
    const numberOfPlayers = 3
    const expectedProgress = (1 / 3) * (1 / numberOfPlayers) * 100
    venueActivity.calculateProgress(numberOfPlayers)
    expect(mocks.addProgress).toHaveBeenCalledWith(expectedProgress)
  })
})

describe('notifyError', () => {
  it('can notify error on spot', () => {
    venueActivity.notifyError()
    expect(mocks.notifyOnSpot).toHaveBeenCalledWith(
      'エラーが発生しました。ゲームを中断し、再度アクセスしてください',
      NotificationType.Error
    )
  })
})
