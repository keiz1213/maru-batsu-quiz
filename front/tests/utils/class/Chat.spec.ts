// @vitest-environment nuxt
import { expect, it } from 'vitest'
import Chat from '~/utils/class/Chat'
import Avatar from '~/utils/class/Avatar'

let chat: Chat

afterEach(() => {
  const { inVisible, chatMessages } = useChat()
  inVisible()
  chatMessages.value = []
})

beforeEach(() => {
  chat = new Chat()
})

it('can display chat', () => {
  const { chatVisible } = useChat()
  expect(chatVisible.value).toBeFalsy()
  chat.visble()
  expect(chatVisible.value).toBeTruthy()
})

it('can hide the chat.', () => {
  const { chatVisible } = useChat()
  chat.visble()
  expect(chatVisible.value).toBeTruthy()
  chat.inVisible()
  expect(chatVisible.value).toBeFalsy()
})

it('can adjust scroll top', () => {
  document.body.innerHTML = `
  <div id="chat-display" style="width: 50px; height: 50px; overflow: auto;">
    <div style="height: 10px;">test</div>
    <div style="height: 10px;">test</div>
    <div style="height: 10px;">test</div>
    <div style="height: 10px;">test</div>
    <div style="height: 10px;">test</div>
  </div>
`

  const element = document.getElementById('chat-display')
  const scrollHeight = element?.scrollHeight
  chat.adjustScrollTop()
  expect(element?.scrollTop).toBe(scrollHeight)
})

it('can create chat message', () => {
  const myAvatar = {
    avatarId: 'my-avatar',
    avatarName: 'test',
    avatarImage: 'https://avatars.githubusercontent.com/u/72614612?v=4'
  } as Avatar

  const message = chat.createChatMessage(myAvatar, 'hello!')
  expect(message.avatarId).toBe(myAvatar.avatarId)
  expect(message.content).toBe('hello!')
})

it('can add chat message to chatMessages', () => {
  const { chatMessages } = useChat()
  const message = {
    avatarId: 'test',
    avatarImage: 'https://avatars.githubusercontent.com/u/72614612?v=4',
    content: 'hello!!'
  }

  expect(chatMessages.value).toHaveLength(0)
  chat.addChatMessage(message)
  expect(chatMessages.value).toHaveLength(1)
})
