// @vitest-environment nuxt
import { expect, it, vi } from 'vitest'
import OwnerAvatar from '~/utils/class/OwnerAvatar'
import SyncDraggable from '~/utils/class/SyncDraggable'
import Referee from '~/utils/class/Referee'
import Chat from '~/utils/class/Chat'
import Announce from '~/utils/class/Announce'
import Timer from '~/utils/class/Timer'
import VenueActivity from '~/utils/class/VenueActivity'
import PlayerAvatar from '~/utils/class/PlayerAvatar'

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

const currentUser = {
  id: 1,
  uid: 'test',
  name: 'test user',
  avatar_url: 'https://avatars.githubusercontent.com/u/72614612?v=4',
  games: [game]
}

const venueActivity = new VenueActivity(
  new Referee(game, new SyncDraggable()),
  new Chat(),
  new Announce(),
  new Timer()
)
const skywayChannelMockMethod = {
  updateChannelMetadata: vi.fn(),
  subscribe: vi.fn(() => {
    return {
      onData: {
        add: () => null
      }
    }
  }),
  updateParticipantMetadata: vi.fn()
}
const dataStreamMockMethod = {
  writeChatMessage: vi.fn(),
  promptStartGame: vi.fn(),
  promptSubscribeToAllPlayers: vi.fn(),
  writeAvatar: vi.fn(),
  writeAllPlayerAvatars: vi.fn(),
  writeAnnounceText: vi.fn(),
  promptStartQuiz: vi.fn(),
  promptCheckExplanation: vi.fn(),
  promptJudge: vi.fn()
}
const channelMock = {
  publications: [
    {
      id: 1,
      publisher: {
        name: 'test owner',
        metadata: 'https://avatars.githubusercontent.com/u/72614612?v=4'
      }
    },
    {
      id: 2,
      publisher: {
        name: 'test player 1',
        metadata: 'https://example.com/u/72614612?v=4'
      }
    },
    {
      id: 3,
      publisher: {
        name: 'test player 2',
        metadata: 'https://example.com/u/72614612?v=4'
      }
    }
  ],
  onPublicationListChanged: {
    add: vi.fn()
  },
  onMetadataUpdated: {
    add: vi.fn()
  }
}
const agentMock = {
  leave: vi.fn(),
  metadata: '1'
}
const skywayChannelMock = {
  user: currentUser,
  game: game,
  channel: channelMock,
  localDataStream: null,
  agent: agentMock,
  publication: null,
  updateChannelMetadata: skywayChannelMockMethod.updateChannelMetadata,
  subscribe: skywayChannelMockMethod.subscribe,
  updateParticipantMetadata: skywayChannelMockMethod.updateParticipantMetadata
} as any

const dataStreamMock = {
  writeChatMessage: dataStreamMockMethod.writeChatMessage,
  promptStartGame: dataStreamMockMethod.promptStartGame,
  promptSubscribeToAllPlayers: dataStreamMockMethod.promptSubscribeToAllPlayers,
  writeAvatar: dataStreamMockMethod.writeAvatar,
  writeAllPlayerAvatars: dataStreamMockMethod.writeAllPlayerAvatars,
  writeAnnounceText: dataStreamMockMethod.writeAnnounceText,
  promptStartQuiz: dataStreamMockMethod.promptStartQuiz,
  promptCheckExplanation: dataStreamMockMethod.promptCheckExplanation,
  promptJudge: dataStreamMockMethod.promptJudge
} as any

const avatar = new OwnerAvatar(
  currentUser,
  skywayChannelMock,
  dataStreamMock,
  venueActivity
)

describe('setUp', () => {
  it('can perform the necessary actions to start the game.', () => {
    const venueActivitySpy = vi.spyOn(venueActivity, 'setMyAvatarId')
    const setUpChannelSpy = vi.spyOn(avatar, 'setUpChannel')

    avatar.setUp()
    expect(venueActivitySpy).toHaveBeenCalledWith(avatar.avatarId)
    expect(setUpChannelSpy).toHaveBeenCalledOnce()
  })
})

describe('addOwnerData', () => {
  it('can add owner metadata', () => {
    const venueActivitySpy = vi.spyOn(venueActivity, 'addParticipantMetaData')
    avatar.addOwnerData()
    const expectedOwnerdata = {
      name: channelMock.publications[0].publisher.name,
      imageUrl: channelMock.publications[0].publisher.metadata
    }
    expect(venueActivitySpy).toHaveBeenCalledWith(expectedOwnerdata)
  })
})

describe('setHandlePlayerEntry', () => {
  it('can set a handler for when the player enter the channel.', () => {
    avatar.setHandlePlayerEntry()
    expect(channelMock.onPublicationListChanged.add).toHaveBeenCalledOnce()
  })
})

describe('setUpChannel', () => {
  it('can set up channel without chat.', async () => {
    const setHandleChannelMetadataUpdatedSpy = vi.spyOn(
      avatar,
      'setHandleChannelMetadataUpdated'
    )
    const addOwnerDataSpy = vi.spyOn(avatar, 'addOwnerData')
    const venueActivitySpy = vi.spyOn(venueActivity, 'addOwner')
    const setHandlePlayerEntrySpy = vi.spyOn(avatar, 'setHandlePlayerEntry')

    await avatar.setUpChannel()
    expect(skywayChannelMockMethod.updateChannelMetadata).toHaveBeenCalledWith(
      'accetable'
    )
    expect(setHandleChannelMetadataUpdatedSpy).toHaveBeenCalledOnce()
    expect(addOwnerDataSpy).toHaveBeenCalledOnce()
    expect(venueActivitySpy).toHaveBeenCalledWith(avatar)
    expect(setHandlePlayerEntrySpy).toHaveBeenCalledOnce()
  })

  it('can set up channel with chat.', async () => {
    const setHandleChannelMetadataUpdatedSpy = vi.spyOn(
      avatar,
      'setHandleChannelMetadataUpdated'
    )
    const addOwnerDataSpy = vi.spyOn(avatar, 'addOwnerData')
    const venueActivitySpy = vi.spyOn(venueActivity, 'addOwner')
    const setHandlePlayerEntrySpy = vi.spyOn(avatar, 'setHandlePlayerEntry')

    avatar.venueActivity?.chat.visble()

    await avatar.setUpChannel()
    expect(skywayChannelMockMethod.updateChannelMetadata).toHaveBeenCalledWith(
      'chatVisible'
    )
    expect(setHandleChannelMetadataUpdatedSpy).toHaveBeenCalledOnce()
    expect(addOwnerDataSpy).toHaveBeenCalledOnce()
    expect(venueActivitySpy).toHaveBeenCalledWith(avatar)
    expect(setHandlePlayerEntrySpy).toHaveBeenCalledOnce()
  })
})

describe('setHandleDataWrite', () => {
  it('can set a handler to respond when there is a write to the passed data stream.', async () => {
    const remoteDataStreamMockMethod = vi.fn()
    const remoteDataStreamMock = {
      onData: {
        add: remoteDataStreamMockMethod
      }
    } as any
    await avatar.setHandleDataWrite(remoteDataStreamMock)
    expect(remoteDataStreamMockMethod).toHaveBeenCalledOnce()
  })
})

describe('subscribeToAllPlayers', () => {
  it('can subscribe to all players', async () => {
    const numberOfPlayer = channelMock.publications.length - 1
    const setHandleDataWriteSpy = vi.spyOn(avatar, 'setHandleDataWrite')
    const venueActivitySpy = vi.spyOn(venueActivity, 'calculateProgress')

    await avatar.subscribeToAllPlayers()

    expect(skywayChannelMockMethod.subscribe).toHaveBeenCalledTimes(
      numberOfPlayer
    )
    expect(setHandleDataWriteSpy).toHaveBeenCalledTimes(numberOfPlayer)
    expect(venueActivitySpy).toHaveBeenCalledTimes(numberOfPlayer)
    expect(venueActivitySpy).toHaveBeenCalledWith(numberOfPlayer)
  })
})

describe('checkPlayerSubscribedToOwner', () => {
  it('can confirm that the player has subscribed to the owner.', async () => {
    const delaySpy = vi.spyOn(avatar, 'delay')
    delaySpy.mockImplementation((): Promise<void> => {
      return new Promise((resolve) => resolve())
    })
    const checkPlayerSubscribedToOwnerSpy = vi.spyOn(
      avatar,
      'checkPlayerSubscribedToOwner'
    )

    await avatar.checkPlayerSubscribedToOwner('1')
    expect(checkPlayerSubscribedToOwnerSpy).not.toThrow()
  })
})

describe('promptOwnerSubscriptionToPlayers', () => {
  it('can prompt all players to subscribe to the owner.', async () => {
    const numberOfPlayer = channelMock.publications.length - 1
    const checkPlayerSubscribedToOwnerSpy = vi.spyOn(
      avatar,
      'checkPlayerSubscribedToOwner'
    )
    checkPlayerSubscribedToOwnerSpy.mockImplementation((): Promise<void> => {
      return new Promise((resolve) => resolve())
    })
    const venueActivitySpy = vi.spyOn(venueActivity, 'calculateProgress')

    await avatar.promptOwnerSubscriptionToPlayers()

    expect(
      skywayChannelMockMethod.updateParticipantMetadata
    ).toHaveBeenCalledTimes(numberOfPlayer)
    expect(checkPlayerSubscribedToOwnerSpy).toHaveBeenCalledTimes(
      numberOfPlayer
    )
    expect(venueActivitySpy).toHaveBeenCalledTimes(numberOfPlayer)
  })
})

describe('promptPlayersForMutualSubscriptions', () => {
  it('can prompt all players to subscribe with each other.', async () => {
    const startGameSpy = vi.spyOn(venueActivity, 'startGame')
    const stopConnectionLoadingSpy = vi.spyOn(
      venueActivity,
      'stopConnectionLoading'
    )
    const calculateProgressSpy = vi.spyOn(venueActivity, 'calculateProgress')

    avatar.promptPlayersForMutualSubscriptions(1)
    expect(calculateProgressSpy).toHaveBeenCalledOnce()
    expect(
      dataStreamMockMethod.promptSubscribeToAllPlayers
    ).toHaveBeenCalledOnce()

    avatar.promptPlayersForMutualSubscriptions(2)
    expect(startGameSpy).toHaveBeenCalledOnce()
    expect(dataStreamMockMethod.promptStartGame).toHaveBeenCalledOnce()
    expect(stopConnectionLoadingSpy).toHaveBeenCalledOnce()
  })
})

describe('startConnection', () => {
  it('can start connection', async () => {
    const venueActivitySpy = vi.spyOn(venueActivity, 'startConnectionLoading')
    const subscribeToAllPlayersSpy = vi.spyOn(avatar, 'subscribeToAllPlayers')
    const promptOwnerSubscriptionToPlayersSpy = vi.spyOn(
      avatar,
      'promptOwnerSubscriptionToPlayers'
    )
    promptOwnerSubscriptionToPlayersSpy.mockImplementation(
      (): Promise<void> => {
        return new Promise((resolve) => resolve())
      }
    )
    const promptPlayersForMutualSubscriptionsSpy = vi.spyOn(
      avatar,
      'promptPlayersForMutualSubscriptions'
    )

    const playersMock = [
      new PlayerAvatar(
        currentUser,
        skywayChannelMock,
        dataStreamMock,
        venueActivity
      ),
      new PlayerAvatar(
        currentUser,
        skywayChannelMock,
        dataStreamMock,
        venueActivity
      )
    ]

    await avatar.startConnection(playersMock)
    expect(venueActivitySpy).toHaveBeenCalledOnce()
    expect(skywayChannelMockMethod.updateChannelMetadata).toBeCalledWith('')
    expect(subscribeToAllPlayersSpy).toHaveBeenCalledOnce()
    expect(promptOwnerSubscriptionToPlayersSpy).toHaveBeenCalledOnce()
    expect(dataStreamMockMethod.writeAvatar).toHaveBeenCalledWith(avatar)
    expect(dataStreamMockMethod.writeAllPlayerAvatars).toHaveBeenCalledWith(
      playersMock
    )
    expect(promptPlayersForMutualSubscriptionsSpy).toHaveBeenCalledWith(0)
  })
})

describe('announceQuizNumber', () => {
  it('can announce quiz number', () => {
    const venueActivitySpy = vi.spyOn(venueActivity, 'reflectAnnounceText')

    avatar.announceQuizNumber(1)
    expect(venueActivitySpy).toHaveBeenCalledWith('1問目！')
    expect(dataStreamMockMethod.writeAnnounceText).toHaveBeenCalledWith(
      '1問目！'
    )
  })
})

describe('announceShortPause', () => {
  it('can announce short pause', () => {
    const venueActivitySpy = vi.spyOn(venueActivity, 'reflectAnnounceText')

    avatar.announceShortPause()
    expect(venueActivitySpy).toHaveBeenCalledWith('')
    expect(dataStreamMockMethod.writeAnnounceText).toHaveBeenCalledWith('')
  })
})

describe('announceQuestion', () => {
  it('can announce question', () => {
    const venueActivitySpy = vi.spyOn(venueActivity, 'reflectAnnounceText')

    avatar.announceQuestion('1 + 1 = 2 ? ◯か✕か')
    expect(venueActivitySpy).toHaveBeenCalledWith('1 + 1 = 2 ? ◯か✕か')
    expect(dataStreamMockMethod.writeAnnounceText).toHaveBeenCalledWith(
      '1 + 1 = 2 ? ◯か✕か'
    )
  })
})

describe('announceQuizStart', () => {
  it('can announce start timer', () => {
    const venueActivitySpy = vi.spyOn(venueActivity, 'startQuiz')

    avatar.announceQuizStart()
    expect(venueActivitySpy).toHaveBeenCalledWith('スタート！')
    expect(dataStreamMockMethod.promptStartQuiz).toHaveBeenCalledWith(
      'スタート！'
    )
  })
})

describe('announceQuizStop', () => {
  it('can announce stop timer', () => {
    const venueActivitySpy = vi.spyOn(venueActivity, 'reflectAnnounceText')

    avatar.announceQuizStop()
    expect(venueActivitySpy).toHaveBeenCalledWith('ストップ！')
    expect(dataStreamMockMethod.writeAnnounceText).toHaveBeenCalledWith(
      'ストップ！'
    )
  })
})

describe('announceSuspense', () => {
  it('can announce suspense', () => {
    const venueActivitySpy = vi.spyOn(venueActivity, 'reflectAnnounceText')

    avatar.announceSuspense()
    expect(venueActivitySpy).toHaveBeenCalledWith('正解は・・・')
    expect(dataStreamMockMethod.writeAnnounceText).toHaveBeenCalledWith(
      '正解は・・・'
    )
  })
})

describe('announceCorrectAnswer', () => {
  it('can announce correct answer', () => {
    const venueActivitySpy = vi.spyOn(venueActivity, 'reflectAnnounceText')

    avatar.announceCorrectAnswer('◯です')
    expect(venueActivitySpy).toHaveBeenCalledWith('◯です')
    expect(dataStreamMockMethod.writeAnnounceText).toHaveBeenCalledWith('◯です')
  })
})

describe('announceExplanation', () => {
  it('can announce explanation', () => {
    const venueActivitySpy = vi.spyOn(venueActivity, 'checkExplanation')

    avatar.announceExplanation('普通に2です')
    expect(venueActivitySpy).toHaveBeenCalledWith('普通に2です')
    expect(dataStreamMockMethod.promptCheckExplanation).toHaveBeenCalledWith(
      '普通に2です'
    )
  })
})

describe('announceJudge', () => {
  it('can announce judge', () => {
    const venueActivitySpy = vi.spyOn(venueActivity, 'judge')

    avatar.announceJudge('◯')
    expect(venueActivitySpy).toHaveBeenCalledWith('◯')
    expect(dataStreamMockMethod.promptJudge).toHaveBeenCalledWith('◯')
  })
})

describe('announce', () => {
  it('can announce the quiz', async () => {
    const startQuizLoadingSpy = vi.spyOn(venueActivity, 'startQuizLoading')
    const stopQuizLoadingSpy = vi.spyOn(venueActivity, 'stopQuizLoading')
    const delaySpy = vi.spyOn(avatar, 'delay')
    delaySpy.mockImplementation((): Promise<void> => {
      return new Promise((resolve) => resolve())
    })
    const announceQuizNumberSpy = vi.spyOn(avatar, 'announceQuizNumber')
    const announceShortPauseSpy = vi.spyOn(avatar, 'announceShortPause')
    const announceQuestionSpy = vi.spyOn(avatar, 'announceQuestion')
    const announceQuizStartSpy = vi.spyOn(avatar, 'announceQuizStart')
    const announceQuizStopSpy = vi.spyOn(avatar, 'announceQuizStop')
    const announceSuspenseSpy = vi.spyOn(avatar, 'announceSuspense')
    const announceCorrectAnswerSpy = vi.spyOn(avatar, 'announceCorrectAnswer')
    const announceExplanationSpy = vi.spyOn(avatar, 'announceExplanation')
    const announceJudgeSpy = vi.spyOn(avatar, 'announceJudge')

    const currentQuizNumber = 0
    const quiz = game.quizzes[0]
    await avatar.announce(currentQuizNumber, quiz)

    expect(startQuizLoadingSpy).toHaveBeenCalledOnce()
    expect(announceQuizNumberSpy).toHaveBeenCalledWith(currentQuizNumber + 1)
    expect(announceShortPauseSpy).toHaveBeenCalledOnce()
    expect(announceQuestionSpy).toHaveBeenCalledWith(quiz.question)
    expect(announceQuizStartSpy).toHaveBeenCalledOnce()
    expect(announceQuizStopSpy).toHaveBeenCalledOnce()
    expect(announceSuspenseSpy).toHaveBeenCalledOnce()
    expect(announceCorrectAnswerSpy).toHaveBeenCalledWith(quiz.correct_answer)
    expect(announceExplanationSpy).toHaveBeenCalledWith(quiz.explanation)
    expect(announceJudgeSpy).toHaveBeenCalledWith(quiz.correct_answer)
    expect(stopQuizLoadingSpy).toHaveBeenCalledOnce()
  })
})
