import { ChatMessage } from '@/types/ChatMessage'

export const useChat = () => {
  const chatMessages = ref<ChatMessage[]>([])

  const addChatMessage = (chatMessage: ChatMessage): void => {
    chatMessages.value.push(chatMessage)
  }

  return {
    addChatMessage
  }
}
