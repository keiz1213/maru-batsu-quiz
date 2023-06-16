<script setup lang="ts">
  import { Quiz } from '@/types/Quiz'

  defineProps<{
    owners: object
    quizzes: Quiz[]
    currentQuizNumber: number
    isOwner: boolean
    description: string
  }>()

  const emit = defineEmits<{
    (e: 'question'): void
    (e: 'check-question'): void
  }>()
</script>

<template>
  <div
    class="w-[370px] h-[270px] max-w bg-white border border-gray-200 rounded-lg"
  >
    <div class="bg-white border border-gray-200 rounded-lg flex justify-center">
      <Avatar
        v-for="(owner, index) in owners"
        :key="index"
        :memberObject="owner"
      />
    </div>
    <OwnerMenu
      v-if="isOwner"
      :quizzes="quizzes"
      :currentQuizNumber="currentQuizNumber"
      @question="emit('question')"
      @check-question="emit('check-question')"
    />
    <div
      v-else
      class="bg-white border border-gray-200 rounded-lg w-full h-[175px] overflow-auto p-3"
    >
      {{ description }}
    </div>
  </div>
</template>
