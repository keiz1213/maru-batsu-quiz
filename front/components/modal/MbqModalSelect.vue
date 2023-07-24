<script setup lang="ts">
  import { VueFinalModal } from 'vue-final-modal'
  import ChatPlusIcon from 'vue-material-design-icons/chatPlusOutline.vue'
  import ChatMinusIcon from 'vue-material-design-icons/chatMinusOutline.vue'
  defineProps<{
    title?: string
  }>()
  const emit = defineEmits<{
    (e: 'chat-mode'): void
    (e: 'non-caht-mode'): void
  }>()
</script>
<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class="flex flex-col max-w-xl mx-4 p-4 bg-white rounded-lg space-y-2"
  >
    <h1 class="text-xl text-center mb-6">
      {{ title }}
    </h1>
    <slot />
    <div class="flex px-9">
      <MbqButtonPrimary
        class="mx-3"
        @click="emit('chat-mode')"
        :button-type="'button'"
        ><div class="flex">
          <chat-plus-icon /><span class="ml-7">Chat有り</span>
        </div></MbqButtonPrimary
      >
      <MbqButtonSecondary
        class="mx-3"
        @click="emit('non-caht-mode')"
        :button-type="'button'"
        ><div class="flex">
          <chat-minus-icon /><span class="ml-7">Chat無し</span>
        </div></MbqButtonSecondary
      >
    </div>
  </VueFinalModal>
</template>
