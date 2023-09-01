// @vitest-environment nuxt
import { expect, it, vi } from 'vitest'
import Avatar from '~/utils/class/Avatar'
import SyncDraggable from '~/utils/class/SyncDraggable'
import Referee from '~/utils/class/Referee'
import Chat from '~/utils/class/Chat'
import Announce from '~/utils/class/Announce'
import Timer from '~/utils/class/Timer'
import VenueActivity from '~/utils/class/VenueActivity'

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

const chat = new Chat()
const chatSpy = vi.spyOn(chat, 'createChatMessage')
const venueActivity = new VenueActivity(
  new Referee(game, new SyncDraggable()),
  chat,
  new Announce(),
  new Timer()
)
const venueActivitySpy = vi.spyOn(venueActivity, 'reflectChatMessage')
const skywayChannelMockMethod = {
  updateChannelMetadata: vi.fn()
}
const dataStreamMockMethod = {
  writeChatMessage: vi.fn()
}
const channelMock = {
  onMetadataUpdated: {
    add: vi.fn()
  }
}
const agentMock = {
  leave: vi.fn()
}
const skywayChannelMock = {
  user: currentUser,
  game: game,
  channel: channelMock,
  localDataStream: null,
  agent: agentMock,
  publication: null,
  updateChannelMetadata: skywayChannelMockMethod.updateChannelMetadata
} as any

const dataStreamMock = {
  writeChatMessage: dataStreamMockMethod.writeChatMessage
} as any

const avatar = new Avatar(
  currentUser,
  skywayChannelMock,
  dataStreamMock,
  venueActivity
)

it('can create your own mock avatar', () => {
  const mockAvatar = avatar.createMockAvatar()
  const expectedMockAvatar = {
    avatarId: avatar.avatarId,
    avatarName: avatar.avatarName,
    avatarImage: avatar.avatarImage,
    avatarIndex: avatar.avatarIndex,
    skywayChannel: null,
    skywayDataStream: null,
    venueActivity: null
  }
  expect(mockAvatar).toEqual(expectedMockAvatar)
})

it("can set a handler for when the channel's metadata is updated.", () => {
  avatar.setHandleChannelMetadataUpdated()
  expect(channelMock.onMetadataUpdated.add).toHaveBeenCalledOnce()
})

it('can leave channel', () => {
  const localStorageSpy = vi.spyOn(window.localStorage, 'clear')
  avatar.leaveChannel()
  expect(skywayChannelMockMethod.updateChannelMetadata).toHaveBeenCalledWith('error')
  expect(localStorageSpy).toHaveBeenCalledOnce()
  expect(agentMock.leave).toHaveBeenCalledOnce()
})

it('can send chat message', () => {
  avatar.sendChatMessage('Hello!')
  expect(chatSpy).toHaveBeenCalledWith(avatar, 'Hello!')
  const chatMessage = {
    avatarId: avatar.avatarId,
    avatarImage: avatar.avatarImage,
    content: 'Hello!'
  }
  expect(venueActivitySpy).toHaveBeenCalledWith(chatMessage)
  expect(dataStreamMockMethod.writeChatMessage).toHaveBeenCalledWith(chatMessage)
})
