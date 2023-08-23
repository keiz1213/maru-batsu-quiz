import { ChatMessage } from '~/types/chatMessage'

class Chat2 {
  visble = () => {
    const { visible } = useChat()
    visible()
  }

  inVisible = () => {
    const { inVisible } = useChat()
    inVisible()
  }

  adjustScrollTop = (): void => {
    const chatArea = document.getElementById('chat-display') as HTMLElement
    if (chatArea !== null) {
      const chatAreaHeight = chatArea.scrollHeight
      chatArea.scrollTop = chatAreaHeight
    }
  }

  addChatMessage = (chatMessage: ChatMessage) => {
    const { addChatMessage } = useChat()
    addChatMessage(chatMessage)
    this.adjustScrollTop()
  }
}

export default Chat2
