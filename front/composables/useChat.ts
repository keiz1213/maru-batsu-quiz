import { ChatMessage } from '@/types/ChatMessage'
import { Member } from '@/types/Member'
import { DataStreamWriter } from '@/utils/dataStreamWriter'

export const useChat = (member: Member, writer: DataStreamWriter) => {
  const chatMessages = ref<ChatMessage[]>([])
  const chatVisible = ref(true)

  const addChatMessage = (chatMessage: ChatMessage): void => {
    chatMessages.value.push(chatMessage)
  }

  const createChatMessage = (newMessage: string): ChatMessage => {
    const chatMessage = {
      memberId: member.id,
      avatarUrl: member.avatar_url,
      content: newMessage
    }
    return chatMessage
  }

  const adjustScrollTop = (): void => {
    const chatArea = document.getElementById('chat') as HTMLElement
    const chatAreaHeight = chatArea.scrollHeight
    chatArea.scrollTop = chatAreaHeight
  }

  const updateChatMessages = (newMessage: string) => {
    const chatMessage = createChatMessage(newMessage)
    chatMessages.value.push(chatMessage)
    writer.writeChatMessage(chatMessage)
    adjustScrollTop()
  }

  const updateChatVisible = () => {
    chatVisible.value = !chatVisible.value
  }

  return {
    chatMessages,
    chatVisible,
    addChatMessage,
    adjustScrollTop,
    updateChatMessages,
    updateChatVisible
  }
}
