import { ChatMessage } from '@/types/ChatMessage'

export const useChat = () => {
  const chatMessages = ref<ChatMessage[]>([])

  const adjustScrollTop = (): void => {
    const chatArea = document.getElementById('chat-display') as HTMLElement
    const chatAreaHeight = chatArea.scrollHeight
    chatArea.scrollTop = chatAreaHeight
  }

  const addChatMessage = (chatMessage: ChatMessage): void => {
    chatMessages.value.push(chatMessage)
    adjustScrollTop()
  }

  return {
    chatMessages,
    addChatMessage
  }
}
