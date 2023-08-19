<script setup lang="ts">
  import { ChatMessage } from '~/types/chatMessage'

  defineProps<{
    messages: Array<ChatMessage>
    myId: string
  }>()

  const emit = defineEmits<{
    (e: 'update:messages', message: string): void
  }>()

  const message = ref('')

  const send = () => {
    emit('update:messages', message.value)
    message.value = ''
  }
</script>

<template>
  <div class="w-[350px] h-[420px] bg-white rounded-lg mx-2 flex flex-col">
    <MbqMacBar :title="'Chat'" />
    <div>
      <div
        id="chat-display"
        class="h-[300px] border-b overflow-auto px-4 pt-4 pb-14 break-all"
      >
        <div
          v-for="(chatMessage, index) in messages"
          :key="index"
          :id="`chat-message-${index + 1}`"
        >
          <div v-if="chatMessage.avatarId != myId" class="chat chat-start">
            <div class="chat-image avatar">
              <div class="w-10 rounded-full">
                <img :src="chatMessage.avatarUrl" alt="user-icon" />
              </div>
            </div>
            <div class="chat-bubble chat-bubble-primary">
              {{ chatMessage.content }}
            </div>
          </div>
          <div v-else class="chat chat-end">
            <div class="chat-bubble">{{ chatMessage.content }}</div>
          </div>
        </div>
      </div>
      <div id="chat-input" class="h-[90px] flex justify-around items-center">
        <input
          v-model="message"
          type="text"
          class="input input-bordered w-[250px] bg-mac-finder-top"
          placeholder="Hello World!"
        />
        <button id="chat-send-button" @click="send" class="btn btn-primary">
          送信
        </button>
      </div>
    </div>
  </div>
</template>
