import { ChatMessage } from '~/types/chatMessage'

export const useChat = () => {
  const chatVisible = useState<boolean>('chat-visible', () => {
    return false
  })
  const chatMessages = ref<ChatMessage[]>([])

  const visible = () => {
    chatVisible.value = true
  }

  const inVisible = () => {
    chatVisible.value = false
  }

  const adjustScrollTop = (): void => {
    const chatArea = document.getElementById('chat-display') as HTMLElement
    if (chatArea !== null) {
      const chatAreaHeight = chatArea.scrollHeight
      chatArea.scrollTop = chatAreaHeight
    }
  }

  const addChatMessage = (chatMessage: ChatMessage): void => {
    chatMessages.value.push(chatMessage)
    adjustScrollTop()
  }

  return {
    chatVisible,
    chatMessages,
    visible,
    inVisible,
    addChatMessage
  }
}
