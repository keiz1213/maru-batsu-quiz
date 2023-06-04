<script setup>
  const props = defineProps({
    questioner: Object,
    quizzes: Array,
    currentQuizNumber: Number,
    myId: Number
  })
</script>

<template>
  <div
    class="w-[370px] h-[110px] max-w p-4 bg-white border border-gray-400 rounded-lg dark:bg-gray-800 dark:border-gray-700"
  >
    <SetQuestion
      v-if="questioner.id === myId"
      :quizzes="quizzes"
      :currentQuizNumber="currentQuizNumber"
      @question="$emit('question')"
    />
  </div>
</template>
