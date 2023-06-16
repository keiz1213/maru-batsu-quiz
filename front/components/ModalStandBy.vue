<script setup lang="ts">
  import { VueFinalModal } from 'vue-final-modal'

  defineProps<{
    title: string
    members: object
    isOwner: boolean
  }>()

  const emit = defineEmits<{
    (e: 'start'): void
  }>()
</script>
<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class="flex flex-col max-w-xl mx-4 p-4 bg-white rounded-lg space-y-2"
  >
    <h1 class="text-xl text-center">
      {{ title }}
    </h1>
    <div class="flex justify-center" aria-label="読み込み中">
      <div class="animate-ping h-2 w-2 bg-blue-600 rounded-full"></div>
      <div class="animate-ping h-2 w-2 bg-blue-600 rounded-full mx-4"></div>
      <div class="animate-ping h-2 w-2 bg-blue-600 rounded-full"></div>
    </div>
    <slot />
    <Hiring :members="members" />
    <div class="flex justify-center">
      <MbqButtonPrimary
        v-if="isOwner"
        :button-type="'button'"
        @click="emit('start')"
        >接続開始</MbqButtonPrimary
      >
    </div>
  </VueFinalModal>
</template>
