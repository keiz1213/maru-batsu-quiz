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
  <div class="w-[270px] h-[270px] border border-gray-200 rounded-lg">
    <MbqMacBar :title="'Menu'" />
    <div class="text-center">
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
