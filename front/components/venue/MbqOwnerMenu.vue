<script setup lang="ts">
  import { Quiz } from '@/types/Quiz'

  defineProps<{
    quizzes: Quiz[]
    currentQuizNumber: number
  }>()

  const emit = defineEmits<{
    (e: 'question'): void
    (e: 'check-question'): void
  }>()
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-lg flex justify-center">
    <div>
      <MbqButtonPrimary :button-type="'button'" @click="emit('question')"
        >{{ currentQuizNumber + 1 }} 問目を出題する</MbqButtonPrimary
      >
      <MbqButtonSecondary
        :button-type="'button'"
        @click="emit('check-question')"
        >問題を確認する
      </MbqButtonSecondary>
    </div>
  </div>
</template>
