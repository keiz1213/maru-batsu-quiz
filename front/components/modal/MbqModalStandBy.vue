<script setup lang="ts">
  import { VueFinalModal } from 'vue-final-modal'

  defineProps<{
    title: string
    members: object
    isOwner: boolean
    publisherNames: string[]
  }>()

  const emit = defineEmits<{
    (e: 'join'): void
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
    <div v-if="isOwner">
      <p>{{ publisherNames.length }}人が待機中</p>
      <ul>
        <li v-for="(name, index) in publisherNames" :key="index">{{ name }}</li>
      </ul>
    </div>
    <MbqAttend :members="members" />
    <div class="flex justify-center">
      <MbqButtonSecondary
        v-if="isOwner"
        :button-type="'button'"
        @click="emit('join')"
        >接続開始</MbqButtonSecondary
      >
    </div>
  </VueFinalModal>
</template>
