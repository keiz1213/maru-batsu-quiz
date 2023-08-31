import { ChatMessage } from '~/types/chatMessage'
import Avatar from './Avatar'

class Chat {
  visble = () => {
    const { visible } = useChat()
    visible()
  }

  inVisible = () => {
    const { inVisible } = useChat()
    inVisible()
  }

  adjustScrollTop = () => {
    const chatArea = document.getElementById('chat-display') as HTMLElement
    if (chatArea !== null) {
      const chatAreaHeight = chatArea.scrollHeight
      chatArea.scrollTop = chatAreaHeight
    }
  }

  createChatMessage = (avatar: Avatar, newMessage: string): ChatMessage => {
    const chatMessage = {
      avatarId: avatar.avatarId,
      avatarImage: avatar.avatarImage,
      content: newMessage
    }
    return chatMessage
  }

  addChatMessage = (chatMessage: ChatMessage) => {
    const { addChatMessage } = useChat()
    addChatMessage(chatMessage)
    this.adjustScrollTop()
  }
}

export default Chat
