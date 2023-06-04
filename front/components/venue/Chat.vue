<script setup>
  const prop = defineProps({
    messages: Array,
    chatVisible: Boolean,
    myId: Number
  })

  const emit = defineEmits(['update:messages', 'update:chatVisible'])

  const message = ref('')

  const send = () => {
    emit('update:messages', message.value)
    message.value = ''
  }
</script>

<template>
  <div class="w-[370px] flex justify-end mt-5">
    <span class="label-text">チャット表示</span>
    <input
      @change="$emit('update:chatVisible')"
      type="checkbox"
      class="toggle toggle-primary"
      checked
    />
  </div>
  <div
    v-show="chatVisible"
    id="chat-area"
    class="w-[370px] h-[450px] max-w p-4 bg-white border border-gray-200 rounded-lg break-all"
  >
    <div
      id="chat"
      class="w-[350px] h-[350px] px-4 pt-4 pb-14 bg-white border border-gray-700 rounded-lg break-all overflow-y-scroll"
    >
      <div v-for="(chatMessage, index) in messages" :key="index">
        <div v-if="chatMessage.memberId != prop.myId" class="chat chat-start">
          <div class="chat-image avatar">
            <div class="w-10 rounded-full">
              <img :src="chatMessage.avatarUrl" />
            </div>
          </div>
          <div class="chat-bubble chat-bubble-primary">
            {{ chatMessage.content }}
          </div>
        </div>
        <div v-if="chatMessage.memberId === prop.myId" class="chat chat-end">
          <div class="chat-bubble">{{ chatMessage.content }}</div>
        </div>
      </div>
    </div>
    <div class="flex">
      <input
        v-model="message"
        type="text"
        class="input input-bordered w-[290px] mt-4"
      />
      <button @click="send" class="btn btn-active btn-accent mt-4 ml-2">
        送信
      </button>
    </div>
  </div>
</template>
