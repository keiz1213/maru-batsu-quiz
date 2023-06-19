<script setup lang="ts">
  import { ChatMessage } from '@/types/ChatMessage'

  defineProps<{
    messages: Array<ChatMessage>
    chatVisible: boolean
    myId: number
  }>()

  const emit = defineEmits<{
    (e: 'update:messages', message: string): void
    (e: 'update:chatVisible'): void
  }>()

  const message = ref('')

  const send = () => {
    emit('update:messages', message.value)
    message.value = ''
  }
</script>

<template>
  <div
    class="w-[370px] h-[420px] bg-white border border-gray-200 rounded-lg break-all"
  >
    <MbqMacBar
      :title="'Chat'"
      :isChat="true"
      @update:chatVisible="emit('update:chatVisible')"
    />
    <div v-show="chatVisible">
      <div
        id="chat"
        class="h-[300px] px-4 pt-4 pb-14 mx-3 mt-3 bg-white border border-gray-200 rounded-lg break-all overflow-auto"
      >
        <div v-for="(chatMessage, index) in messages" :key="index">
          <div v-if="chatMessage.memberId != myId" class="chat chat-start">
            <div class="chat-image avatar">
              <div class="w-10 rounded-full">
                <img :src="chatMessage.avatarUrl" />
              </div>
            </div>
            <div class="chat-bubble chat-bubble-primary">
              {{ chatMessage.content }}
            </div>
          </div>
          <div v-if="chatMessage.memberId === myId" class="chat chat-end">
            <div class="chat-bubble">{{ chatMessage.content }}</div>
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <input
          v-model="message"
          type="text"
          class="input input-bordered w-[275px] mt-4"
        />
        <button @click="send" class="btn btn-active btn-accent mt-4 ml-2">
          送信
        </button>
      </div>
    </div>
  </div>
</template>
