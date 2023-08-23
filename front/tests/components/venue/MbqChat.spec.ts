// @vitest-environment nuxt

import Avatar from '~/utils/class/Avatar'
import { ChatMessage } from '~/types/chatMessage'
import { describe, it, expect } from 'vitest'
import { shallowMount, VueWrapper } from '@vue/test-utils'
import MbqChat from '~/components/venue/MbqChat.vue'

describe('MbqChat', () => {
  let wrapper: VueWrapper
  let myAvatarStub: Avatar
  let otherAvatarStub: Avatar
  let myChatMessage1: ChatMessage
  let myChatMessage2: ChatMessage
  let otherUserMessage: ChatMessage
  let chatMessages: ChatMessage[]

  beforeEach(() => {
    myAvatarStub = {
      avatarId: 'avatar-1',
      avatarName: 'test',
      avatarImage: 'https://example.com/u/72614612/1?v=4/',
      avatarIndex: null,
      skywayChannel: null,
      skywayDataStream: null,
      venueActivity: null
    } as Avatar

    otherAvatarStub = {
      avatarId: 'avatar-2',
      avatarName: 'test2',
      avatarImage: 'https://example.com/u/72614612/2?v=4',
      avatarIndex: null,
      skywayChannel: null,
      skywayDataStream: null,
      venueActivity: null
    } as Avatar

    myChatMessage1 = {
      avatarId: myAvatarStub.avatarId,
      avatarImage: myAvatarStub.avatarImage,
      content: 'my message 1'
    } as ChatMessage

    myChatMessage2 = {
      avatarId: myAvatarStub.avatarId,
      avatarImage: myAvatarStub.avatarImage,
      content: 'my message 2'
    } as ChatMessage

    otherUserMessage = {
      avatarId: otherAvatarStub.avatarId,
      avatarImage: otherAvatarStub.avatarImage,
      content: 'other user message'
    } as ChatMessage

    chatMessages = [myChatMessage1, otherUserMessage, myChatMessage2]

    wrapper = shallowMount(MbqChat, {
      props: {
        messages: chatMessages,
        myId: myAvatarStub.avatarId
      }
    })
  })

  describe('render', () => {
    it('render chat messages', () => {
      const messages = wrapper.findAll('[id^="chat-message-"]')
      expect(messages.length).toBe(chatMessages.length)
    })

    it("own message have 'chat-end' class", () => {
      const myMessages = chatMessages.filter(
        (chatMessage) => chatMessage.avatarId === myAvatarStub.avatarId
      )
      const messages = wrapper.findAll('.chat-end')
      expect(messages.length).toBe(myMessages.length)
    })

    it("other user's message are displayed with an icon", () => {
      const otherUserChatMessages = chatMessages.filter(
        (chatMessage) => chatMessage.avatarId === otherAvatarStub.avatarId
      )
      const userIcons = wrapper.findAll('img')
      expect(userIcons.length).toBe(otherUserChatMessages.length)
    })
  })

  describe('emit', () => {
    it('emit is fired when send button is clicked', async () => {
      const sendButton = wrapper.find('#chat-send-button')
      const input = wrapper.find('input')

      await input.setValue('hello')
      await sendButton.trigger('click')

      expect(wrapper.emitted('update:messages')![0]).toEqual(['hello'])
    })
  })
})
