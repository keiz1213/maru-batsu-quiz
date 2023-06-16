<script setup lang="ts">
  import { VueFinalModal } from 'vue-final-modal'
  import { Quiz } from '@/types/Quiz'

  defineProps<{
    quizzes: Quiz[]
  }>()

  const emit = defineEmits<{
    (e: 'confirm'): void
    (e: 'cancel'): void
  }>()
</script>
<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class=" w-3/4 mx-auto my-6 p-4 bg-white rounded-lg space-y-2 absolute inset-0"
    content-transition="vfm-fade"
    overlay-transition="vfm-fade"
  >
    <div class="absolute inset-0 h-full overflow-auto px-12">
      <slot />
      <div>
        <MbqTableQuiz :quizzes="quizzes" />
      </div>
    </div>
  </VueFinalModal>
</template>
