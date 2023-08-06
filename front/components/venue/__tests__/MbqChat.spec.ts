// @vitest-environment nuxt

import Avatar from '~/utils/class/Avatar'
import { ChatMessage } from '~/types/chatMessage'
import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import MbqChat from '../MbqChat.vue'

describe('MbqChat', () => {
  let wrapper: VueWrapper
  let avatar1: Avatar
  let avatar2: Avatar
  let myChatMessage1: ChatMessage
  let myChatMessage2: ChatMessage
  let otherUserMessage: ChatMessage
  let chatMessages: ChatMessage[]

  beforeEach(() => {
    avatar1 = new Avatar(
      '1',
      true,
      'test avatar1',
      'https://example.com/1/photo.jpg',
      null,
      null,
      null,
      null
    )

    avatar2 = new Avatar(
      '2',
      false,
      'test avatar2',
      'https://example.com/2/photo.jpg',
      null,
      null,
      null,
      null
    )

    myChatMessage1 = avatar1.createChatMessage('my message 1')
    otherUserMessage = avatar2.createChatMessage('other user message')
    myChatMessage2 = avatar1.createChatMessage('my message 2')

    chatMessages = [myChatMessage1, otherUserMessage, myChatMessage2]
  })

  describe('render', () => {
    it('render chat messages', () => {
      wrapper = mount(MbqChat, {
        props: {
          messages: chatMessages,
          myId: avatar1.id
        }
      })

      const messages = wrapper.findAll('[id^="chat-message-"]')
      expect(messages.length).toBe(chatMessages.length)
    })

    it("my own message have 'chat-end' class", () => {
      const myMessages = chatMessages.filter(
        (chatMessage) => chatMessage.avatarId === avatar1.id
      )

      wrapper = mount(MbqChat, {
        props: {
          messages: chatMessages,
          myId: avatar1.id
        }
      })

      const messages = wrapper.findAll('.chat-end')
      expect(messages.length).toBe(myMessages.length)
    })

    it("other user's message are displayed with an icon", () => {
      const otherUserChatMessages = chatMessages.filter(
        (chatMessage) => chatMessage.avatarId != avatar1.id
      )

      wrapper = mount(MbqChat, {
        props: {
          messages: chatMessages,
          myId: avatar1.id
        }
      })

      const userIcons = wrapper.findAll('img')
      expect(userIcons.length).toBe(otherUserChatMessages.length)
    })
  })

  describe('emit', () => {
    it('emit is fired when send button is clicked', async () => {
      wrapper = mount(MbqChat, {
        props: {
          messages: chatMessages,
          myId: avatar1.id
        }
      })

      const sendButton = wrapper.find('#chat-send-button')
      const input = wrapper.find('input')

      await input.setValue('hello')
      await sendButton.trigger('click')

      expect(wrapper.emitted('update:messages')![0]).toEqual(['hello'])
    })
  })
})
