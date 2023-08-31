// @vitest-environment nuxt
import { vi, expect, it, describe } from 'vitest'
import Avatar from '~/utils/class/Avatar'
import OwnerAvatar from '~/utils/class/OwnerAvatar'
import PlayerAvatar from '~/utils/class/PlayerAvatar'

describe('useParticipantMetaData', () => {
  afterEach(() => {
    const { participantMetaData } = useParticipantMetaData()
    participantMetaData.value = []
  })

  it('default participantMetaData is empty', () => {
    const { participantMetaData } = useParticipantMetaData()
    expect(participantMetaData.value).toHaveLength(0)
  })

  it('can add participantMetaData', () => {
    const { participantMetaData, addParticipantMetaData } =
      useParticipantMetaData()
    expect(participantMetaData.value).toHaveLength(0)

    const newParticipantMetaData = {
      name: 'test',
      imageUrl: 'https://avatars.githubusercontent.com/u/72614612?v=4'
    }
    addParticipantMetaData(newParticipantMetaData)
    expect(participantMetaData.value).toHaveLength(1)
  })
})

describe('useMyAvatar', () => {
  afterEach(() => {
    const { myAvatarId } = useMyAvatar()
    myAvatarId.value = ''
  })

  it('default avatar id is blank', () => {
    const { myAvatarId } = useMyAvatar()
    expect(myAvatarId.value).toEqual('')
  })

  it('can set my avatar id', () => {
    const { myAvatarId, setMyAvatarId } = useMyAvatar()
    expect(myAvatarId.value).toEqual('')
    setMyAvatarId('avatar-id')
    expect(myAvatarId.value).toEqual('avatar-id')
  })

  it("can verify if it's your own avatar", () => {
    const { setMyAvatarId, isMyAvatar } = useMyAvatar()
    const myAvatar = {
      avatarId: 'my-avatar',
      avatarName: 'test',
      avatarImage: 'https://avatars.githubusercontent.com/u/72614612?v=4'
    } as Avatar
    setMyAvatarId(myAvatar.avatarId)
    expect(isMyAvatar(myAvatar)).toBeTruthy()
  })
})

describe('useOwner', () => {
  afterEach(() => {
    const { owner } = useOwner()
    owner.value = {}
  })

  it('default owner is empty', () => {
    const { owner } = useOwner()
    expect(owner.value).toEqual({})
  })

  it('can add owner', () => {
    const { owner, addOwner } = useOwner()
    const ownerAvatar = {
      avatarId: 'owner-avatar',
      avatarName: 'test',
      avatarImage: 'https://avatars.githubusercontent.com/u/72614612?v=4'
    } as OwnerAvatar
    expect(owner.value).toEqual({})
    addOwner(ownerAvatar)
    expect(owner.value).toEqual(ownerAvatar)
  })
})

describe('usePlayers', () => {
  afterEach(() => {
    const { players } = usePlayers()
    players.value = []
  })

  it('default players is empty', () => {
    const { players } = usePlayers()
    expect(players.value).toHaveLength(0)
  })

  it('can add player', () => {
    const { players, addPlayer } = usePlayers()
    const playerAvatar = {
      avatarId: 'player-avatar',
      avatarName: 'test',
      avatarImage: 'https://avatars.githubusercontent.com/u/72614612?v=4'
    } as PlayerAvatar
    expect(players.value).toHaveLength(0)
    addPlayer(playerAvatar)
    expect(players.value).toHaveLength(1)
  })

  it('can set all players', () => {
    const { players, setAllPlayers } = usePlayers()
    const playerAvatar1 = {
      avatarId: 'player-avatar-1',
      avatarName: 'test',
      avatarImage: 'https://avatars.githubusercontent.com/u/72614612?v=4'
    } as PlayerAvatar

    const playerAvatar2 = {
      avatarId: 'player-avatar-2',
      avatarName: 'test',
      avatarImage: 'https://avatars.githubusercontent.com/u/72614612?v=4'
    } as PlayerAvatar

    const allPlayers = [playerAvatar1, playerAvatar2]
    expect(players.value).toHaveLength(0)
    setAllPlayers(allPlayers)
    expect(players.value).toHaveLength(allPlayers.length)
  })
})

describe('useLosers', () => {
  afterEach(() => {
    const { losers } = useLosers()
    losers.value = []
  })

  it('default losers is empty', () => {
    const { losers } = useLosers()
    expect(losers.value).toHaveLength(0)
  })

  it('can add loser', () => {
    const { losers, addLoser } = useLosers()
    const loser = {
      avatarId: 'loser-avatar',
      avatarName: 'test',
      avatarImage: 'https://avatars.githubusercontent.com/u/72614612?v=4'
    } as PlayerAvatar
    expect(losers.value).toHaveLength(0)
    addLoser(loser)
    expect(losers.value).toHaveLength(1)
  })
})

describe('useWinners', () => {
  afterEach(() => {
    const { winners } = useWinners()
    winners.value = []
  })

  it('default winners is empty', () => {
    const { winners } = useWinners()
    expect(winners.value).toHaveLength(0)
  })

  it('can add winner', () => {
    const winner = {
      avatarId: 'winner-avatar',
      avatarName: 'test',
      avatarImage: 'https://avatars.githubusercontent.com/u/72614612?v=4'
    } as PlayerAvatar
    const { winners, addWinner } = useWinners()
    expect(winners.value).toHaveLength(0)
    addWinner(winner)
    expect(winners.value).toHaveLength(1)
  })
})

describe('useNumberOfWinner', () => {
  afterEach(() => {
    const { numberOfWinner } = useNumberOfWinner()
    numberOfWinner.value = 0
  })

  it('default number of winner is 0', () => {
    const { numberOfWinner } = useNumberOfWinner()
    expect(numberOfWinner.value).toEqual(0)
  })

  it('can set initial number of winner', () => {
    const { numberOfWinner, setNumberOfWinner } = useNumberOfWinner()
    const initialNumberOfWinner = 3
    expect(numberOfWinner.value).toEqual(0)
    setNumberOfWinner(initialNumberOfWinner)
    expect(numberOfWinner.value).toEqual(3)
  })

  it('can subtract number of winner', () => {
    const { numberOfWinner, setNumberOfWinner, subtractNumberOfWinner } =
      useNumberOfWinner()
    const initialNumberOfWinner = 3
    setNumberOfWinner(initialNumberOfWinner)
    expect(numberOfWinner.value).toEqual(3)
    subtractNumberOfWinner(1)
    expect(numberOfWinner.value).toEqual(2)
  })
})

describe('useCurrentQuizNumber', () => {
  afterEach(() => {
    const { currentQuizNumber } = useCurrentQuizNumber()
    currentQuizNumber.value = 0
  })

  it('default current quiz number is 0', () => {
    const { currentQuizNumber } = useCurrentQuizNumber()
    expect(currentQuizNumber.value).toEqual(0)
  })

  it('can increment current quiz number', () => {
    const { currentQuizNumber, incrementCurrentQuizNumber } =
      useCurrentQuizNumber()
    expect(currentQuizNumber.value).toEqual(0)
    incrementCurrentQuizNumber()
    expect(currentQuizNumber.value).toEqual(1)
  })
})

describe('useQuestionVisible', () => {
  afterEach(() => {
    const { questionVisible } = useQuestionVisible()
    questionVisible.value = false
  })

  it('default question visible is false', () => {
    const { questionVisible } = useQuestionVisible()
    expect(questionVisible.value).toBeFalsy()
  })

  it('can open question for checking question', () => {
    const { questionVisible, openQuestion } = useQuestionVisible()
    expect(questionVisible.value).toBeFalsy()
    openQuestion()
    expect(questionVisible.value).toBeTruthy()
  })

  it('can close question', () => {
    const { questionVisible, openQuestion, closeQuestion } =
      useQuestionVisible()
    openQuestion()
    expect(questionVisible.value).toBeTruthy()
    closeQuestion()
    expect(questionVisible.value).toBeFalsy()
  })
})

describe('useGameState', () => {
  afterEach(() => {
    const { standByGame, endOfGame } = useGameState()
    standByGame.value = true
    endOfGame.value = false
  })

  it('default standByGame is true', () => {
    const { standByGame } = useGameState()
    expect(standByGame.value).toBeTruthy()
  })

  it('default endOfGame is false', () => {
    const { endOfGame } = useGameState()
    expect(endOfGame.value).toBeFalsy()
  })

  it('can start the game', () => {
    const { standByGame, startGame } = useGameState()
    expect(standByGame.value).toBeTruthy()
    startGame()
    expect(standByGame.value).toBeFalsy()
  })

  it('can end game', () => {
    const { standByGame, endOfGame, startGame, endGame } = useGameState()
    expect(standByGame.value).toBeTruthy()
    expect(endOfGame.value).toBeFalsy()
    startGame()
    expect(standByGame.value).toBeFalsy()
    endGame()
    expect(endOfGame.value).toBeTruthy()
  })
})

describe('useChat', () => {
  afterEach(() => {
    const { chatVisible, chatMessages } = useChat()
    chatVisible.value = false
    chatMessages.value = []
  })

  it('default chatVisible is false', () => {
    const { chatVisible } = useChat()
    expect(chatVisible.value).toBeFalsy()
  })

  it('default chatMessages is empty', () => {
    const { chatMessages } = useChat()
    expect(chatMessages.value).toHaveLength(0)
  })

  it('can visible the chat', () => {
    const { chatVisible, visible } = useChat()
    expect(chatVisible.value).toBeFalsy()
    visible()
    expect(chatVisible.value).toBeTruthy()
  })

  it('can inVisible the chat', () => {
    const { chatVisible, visible, inVisible } = useChat()
    visible()
    expect(chatVisible.value).toBeTruthy()
    inVisible()
    expect(chatVisible.value).toBeFalsy()
  })

  it('can add chat message', () => {
    const { chatMessages, addChatMessage } = useChat()
    expect(chatMessages.value).toHaveLength(0)
    const chatMessage = {
      avatarId: 'avatar-1',
      avatarImage: 'https://avatars.githubusercontent.com/u/72614612?v=4',
      content: 'Hello!'
    }
    addChatMessage(chatMessage)
    expect(chatMessages.value).toHaveLength(1)
  })
})

describe('useAnnounce', () => {
  afterEach(() => {
    const { announceText } = useAnnounce()
    announceText.value = ''
  })

  it('default announceText is blank', () => {
    const { announceText } = useAnnounce()
    expect(announceText.value).toEqual('')
  })

  it('can update the announceText', () => {
    const { announceText, updateAnnounceText } = useAnnounce()
    expect(announceText.value).toEqual('')
    updateAnnounceText('1問目!!')
    expect(announceText.value).toEqual('1問目!!')
  })
})

describe('useTimer', () => {
  afterEach(() => {
    const { resetTimer } = useTimer()
    resetTimer()
    vi.clearAllTimers()
  })

  it('default timeElapsed is 0', () => {
    const { timeElapsed } = useTimer()
    expect(timeElapsed.value).toEqual(0)
  })

  it('default timeLimit is 10', () => {
    const { timeLimit } = useTimer()
    expect(timeLimit.value).toEqual(10)
  })

  it('timer starts and when it reaches the time limit, the timer stops automatically.', async () => {
    const { timeElapsed, timeLimit, startTimer } = useTimer()
    expect(timeElapsed.value).toEqual(0)
    expect(timeLimit.value).toEqual(10)
    vi.useFakeTimers()
    vi.spyOn(global, 'setInterval')
    vi.spyOn(global, 'clearInterval')

    startTimer()
    for (let i = 0; i < timeLimit.value; i++) {
      vi.advanceTimersByTime(1000)
    }

    expect(setInterval).toHaveBeenCalledTimes(1)
    expect(clearInterval).toHaveBeenCalledTimes(1)
  })

  it("when the timer is started and hasn't reached the time limit, the timer won't stop.", async () => {
    const { timeElapsed, timeLimit, startTimer } = useTimer()
    expect(timeElapsed.value).toEqual(0)
    expect(timeLimit.value).toEqual(10)
    vi.useFakeTimers()
    vi.spyOn(global, 'setInterval')
    vi.spyOn(global, 'clearInterval')

    startTimer()
    for (let i = 0; i < 7; i++) {
      vi.advanceTimersByTime(1000)
    }

    expect(setInterval).toHaveBeenCalledTimes(1)
    expect(clearInterval).not.toHaveBeenCalledTimes(1)
  })
})

describe('useConnectionLoading', () => {
  afterEach(() => {
    const { clearConnectionLoading } = useConnectionLoading()
    clearConnectionLoading()
  })

  it('default connectionLoading is false', () => {
    const { connectionLoading } = useConnectionLoading()
    expect(connectionLoading.value).toBeFalsy()
  })

  it('switching from false to true for loading.', () => {
    const { connectionLoading, setConnectionLoading } = useConnectionLoading()
    expect(connectionLoading.value).toBeFalsy()
    setConnectionLoading()
    expect(connectionLoading.value).toBeTruthy()
  })

  it('switching from true to false for loading.', () => {
    const { connectionLoading, setConnectionLoading, clearConnectionLoading } =
      useConnectionLoading()
    setConnectionLoading()
    expect(connectionLoading.value).toBeTruthy()
    clearConnectionLoading()
    expect(connectionLoading.value).toBeFalsy()
  })
})

describe('useQuizLoading', () => {
  afterEach(() => {
    const { clearQuizLoading } = useQuizLoading()
    clearQuizLoading()
  })

  it('default quizLoading is false', () => {
    const { quizLoading } = useQuizLoading()
    expect(quizLoading.value).toBeFalsy()
  })

  it('switching from false to true for loading.', () => {
    const { quizLoading, setQuizLoading } = useQuizLoading()
    expect(quizLoading.value).toBeFalsy()
    setQuizLoading()
    expect(quizLoading.value).toBeTruthy()
  })

  it('switching from true to false for loading.', () => {
    const { quizLoading, setQuizLoading, clearQuizLoading } = useQuizLoading()
    setQuizLoading()
    expect(quizLoading.value).toBeTruthy()
    clearQuizLoading()
    expect(quizLoading.value).toBeFalsy()
  })
})

describe('useConnectionProgress', () => {
  afterEach(() => {
    const { connectionProgress } = useConnectionProgress()
    connectionProgress.value = 0
  })

  it('default connectionProgress is 0', () => {
    const { connectionProgress } = useConnectionProgress()
    expect(connectionProgress.value).toEqual(0)
  })

  it('can add connectionProgress', () => {
    const { connectionProgress, addProgress } = useConnectionProgress()
    expect(connectionProgress.value).toEqual(0)
    for (let i = 0; i < 3; i++) {
      addProgress(i)
    }
    expect(connectionProgress.value).toEqual(3)
  })
})
