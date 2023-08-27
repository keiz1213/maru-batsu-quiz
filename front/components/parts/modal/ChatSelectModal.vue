<script setup lang="ts">
  import { VueFinalModal } from 'vue-final-modal'
  import ChatPlusOutlineIcon from 'vue-material-design-icons/ChatPlusOutline.vue'
  import ChatMinusOutlineIcon from 'vue-material-design-icons/ChatMinusOutline.vue'
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
      <PrimaryButton
        class="mx-3"
        @click="emit('chat-mode')"
        :button-type="'button'"
        ><div class="flex">
          <chat-plus-outline-icon /><span class="ml-7">Chat有り</span>
        </div></PrimaryButton
      >
      <SecondaryButton
        class="mx-3"
        @click="emit('non-caht-mode')"
        :button-type="'button'"
        ><div class="flex">
          <chat-minus-outline-icon /><span class="ml-7">Chat無し</span>
        </div></SecondaryButton
      >
    </div>
  </VueFinalModal>
</template>
