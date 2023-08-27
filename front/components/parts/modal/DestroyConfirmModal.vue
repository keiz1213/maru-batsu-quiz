<script setup lang="ts">
  import { VueFinalModal } from 'vue-final-modal'
  defineProps<{
    title?: string
  }>()
  const emit = defineEmits<{
    (e: 'destroy-game'): void
    (e: 'cancel'): void
  }>()

  const { loading } = useLoading()
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
      <SecondaryButton
        class="mx-3"
        @click="emit('cancel')"
        :button-type="'button'"
        >キャンセル</SecondaryButton
      >
      <DangerButton
        class="mx-3"
        @click="emit('destroy-game')"
        :button-type="'button'"
        :is-loading="loading"
        >削除</DangerButton
      >
    </div>
  </VueFinalModal>
</template>
