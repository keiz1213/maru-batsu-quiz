<script setup lang="ts">
  import { VueFinalModal } from 'vue-final-modal'

  defineProps<{
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
    content-class=" w-3/4 mx-auto my-6 p-4 bg-white rounded-lg space-y-2 absolute inset-0"
  >
    <div class="absolute inset-0 h-full overflow-auto px-12">
      <h1 v-if="isOwner" class="text-center my-5">
        参加予定者が全員待機中になったら「接続開始」を押してください
      </h1>
      <h1 v-else class="text-center my-5">
        接続確認中です。そのままお待ち下さい・・・
      </h1>
      <div class="flex justify-center mb-5" aria-label="読み込み中">
        <div class="animate-ping h-2 w-2 bg-blue-600 rounded-full"></div>
        <div class="animate-ping h-2 w-2 bg-blue-600 rounded-full mx-4"></div>
        <div class="animate-ping h-2 w-2 bg-blue-600 rounded-full"></div>
      </div>
      <slot />
      <div v-if="isOwner" class="text-center my-5">
        <p>{{ publisherNames.length }}人が待機中</p>
        <ul>
          <li v-for="(name, index) in publisherNames" :key="index">
            {{ name }} が待機中・・・
          </li>
        </ul>
      </div>
      <div class="flex justify-center">
        <MbqMacFinder :members="members" :title="'challengers'" />
      </div>
      <div class="flex justify-center">
        <MbqButtonSecondary
          v-if="isOwner"
          :button-type="'button'"
          @click="emit('join')"
          >接続開始</MbqButtonSecondary
        >
      </div>
    </div>
  </VueFinalModal>
</template>
