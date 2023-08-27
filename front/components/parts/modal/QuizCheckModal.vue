<script setup lang="ts">
  import { VueFinalModal } from 'vue-final-modal'
  import { Quiz } from '~/types/quiz'

  defineProps<{
    quizzes: Quiz[]
  }>()

  const emit = defineEmits<{
    (e: 'close-question'): void
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
      <div class="flex justify-end mt-4">
        <MbqButtonCirculeCross @click="emit('close-question')" />
      </div>
      <div>
        <MbqTableQuiz :quizzes="quizzes" />
      </div>
    </div>
  </VueFinalModal>
</template>
