<script setup lang="ts">
  import { VueFinalModal } from 'vue-final-modal'
  import { Quiz } from '~/types/Quiz'

  defineProps<{
    winners: object
    quizzes: Quiz[]
  }>()
</script>
<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class="flex flex-col max-w-xl mx-4 p-4 bg-white rounded-lg space-y-2"
  >
    <h1 class="text-xl text-center mb-6">おめでとうございます！</h1>
    <slot />
    <div class="flex justify-center">
      <Avatar
        v-for="(winner, index) in winners"
        :key="index"
        :memberObject="winner"
        :gameStart="true"
      />
    </div>
    <div>
      <MbqTableQuiz :quizzes="quizzes" />
    </div>
  </VueFinalModal>
</template>
