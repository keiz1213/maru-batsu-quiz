import { ChatMessage } from '~/types/chatMessage'

class Chat {
  chatVisible: Ref<boolean>
  chatMessages: Ref<ChatMessage[]>
  visible: Function
  inVisible: Function
  addChatMessage: Function

  constructor() {
    const { chatVisible, chatMessages, visible, inVisible, addChatMessage } =
      useChat()

    this.chatVisible = chatVisible
    this.chatMessages = chatMessages
    this.visible = visible
    this.inVisible = inVisible
    this.addChatMessage = addChatMessage
  }
}

export default Chat
