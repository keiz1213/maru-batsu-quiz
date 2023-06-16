<script setup lang="ts">
  import { Quiz } from '@/types/Quiz'

  defineProps<{
    questioner: object
    quizzes: Quiz[]
    currentQuizNumber: number
    isOwner: boolean
  }>()

  const emit = defineEmits<{
    (e: 'question'): void
    (e: 'check-question'): void
  }>()
</script>

<template>
  <div
    class="w-[370px] h-[110px] max-w p-4 bg-white border border-gray-400 rounded-lg"
  >
    <SetQuestion
      v-if="isOwner"
      :quizzes="quizzes"
      :currentQuizNumber="currentQuizNumber"
      @question="emit('question')"
      @check-question="emit('check-question')"
    />
  </div>
</template>
