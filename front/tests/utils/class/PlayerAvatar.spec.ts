// @vitest-environment nuxt
import { expect, it, vi } from 'vitest'
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
  reportSubscribedAllPlayers: vi.fn()
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
  onMetadataUpdated: {
    add: vi.fn()
  }
}
const agentMock = {
  onMetadataUpdated: {
    add: vi.fn()
  },
  metadata: '1'
}
const skywayChannelMock = {
  user: currentUser,
  game: game,
  channel: channelMock,
  localDataStream: null,
  agent: agentMock,
  publication: {
    id: 2,
    publisher: {
      name: 'test player 1',
      metadata: 'https://example.com/u/72614612?v=4'
    }
  },
  subscribe: skywayChannelMockMethod.subscribe,
  updateParticipantMetadata: skywayChannelMockMethod.updateParticipantMetadata
} as any

const dataStreamMock = {
  reportSubscribedAllPlayers: dataStreamMockMethod.reportSubscribedAllPlayers
} as any

const avatar = new PlayerAvatar(
  currentUser,
  skywayChannelMock,
  dataStreamMock,
  venueActivity
)

it('can perform the necessary actions to start the game.', () => {
  const venueActivitySpy = vi.spyOn(venueActivity, 'setMyAvatarId')
  const setUpChannelSpy = vi.spyOn(avatar, 'setUpChannel')

  avatar.setUp()
  expect(venueActivitySpy).toHaveBeenCalledWith(avatar.avatarId)
  expect(setUpChannelSpy).toHaveBeenCalledOnce()
})

it('can set my index', () => {
  expect(avatar.avatarIndex).toBeNull()
  avatar.setMyIndex(1)
  expect(avatar.avatarIndex).toBe(1)
})

it('can set a handler for when my metadata is updated.', () => {
  avatar.setHandleMyMetadataUpdated()
  expect(agentMock.onMetadataUpdated.add).toHaveBeenCalledOnce()
})

it('can set up channel', () => {
  const setHandleMyMetadataUpdatedSpy = vi.spyOn(
    avatar,
    'setHandleMyMetadataUpdated'
  )
  const setHandleChannelMetadataUpdatedSpy = vi.spyOn(
    avatar,
    'setHandleChannelMetadataUpdated'
  )

  avatar.setUpChannel()
  expect(setHandleChannelMetadataUpdatedSpy).toHaveBeenCalledOnce()
  expect(setHandleMyMetadataUpdatedSpy).toHaveBeenCalledOnce()
})

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

it('can subscribe to owner', async () => {
  const ownerPublication = channelMock.publications[0] as any
  const ownerPublicationId = ownerPublication.id
  const setHandleDataWriteSpy = vi.spyOn(avatar, 'setHandleDataWrite')

  avatar.setMyIndex(1)
  await avatar.subscribeToOwner()

  expect(skywayChannelMockMethod.subscribe).toHaveBeenCalledWith(
    ownerPublicationId
  )
  expect(setHandleDataWriteSpy).toHaveBeenCalledOnce()
  expect(
    skywayChannelMockMethod.updateParticipantMetadata
  ).toHaveBeenCalledWith(ownerPublication, avatar.avatarIndex!.toString())
})

it('can subscribe to all players', async () => {
  const numberOfPlayer = channelMock.publications.length - 1
  const setHandleDataWriteSpy = vi.spyOn(avatar, 'setHandleDataWrite')

  avatar.setMyIndex(1)
  await avatar.subscribeToAllPlayers(avatar.avatarIndex!)

  expect(skywayChannelMockMethod.subscribe).toHaveBeenCalledTimes(
    numberOfPlayer
  )
  expect(setHandleDataWriteSpy).toHaveBeenCalledTimes(numberOfPlayer)
  expect(dataStreamMockMethod.reportSubscribedAllPlayers).toHaveBeenCalledOnce()
})
