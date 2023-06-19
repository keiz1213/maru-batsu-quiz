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
    content-class=" w-3/4 mx-auto my-6 p-4 bg-white rounded-lg space-y-2 absolute inset-0"
    content-transition="vfm-fade"
    overlay-transition="vfm-fade"
  >
    <div class="absolute inset-0 h-full overflow-auto px-12">
      <h1 class="text-xl text-center my-6">Congratulations!</h1>
      <slot />
      <div class="flex justify-center">
        <MbqAvatar
          v-for="(winner, index) in winners"
          :key="index"
          :member="winner"
          :gameStart="true"
        />
      </div>
      <div>
        <MbqTableQuiz :quizzes="quizzes" />
      </div>
    </div>
  </VueFinalModal>
</template>
