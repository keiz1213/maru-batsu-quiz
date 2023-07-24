<script setup lang="ts">
  import { Quiz } from '~/types/quiz'
  import Avatar from '~/utils/class/Avatar'
  import { VueFinalModal } from 'vue-final-modal'

  const props = defineProps<{
    winners: Avatar[]
    quizzes: Quiz[]
  }>()

  watch(props, () => {
    bothSidesCracker()
  })
</script>
<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class=" w-3/4 mx-auto my-6 p-4 bg-white rounded-lg space-y-2 absolute inset-0"
    content-transition="vfm-fade"
    overlay-transition="vfm-fade"
  >
    <div class="absolute inset-0 h-full overflow-auto px-12">
      <h1 class="text-3xl text-center my-6 animate__animated animate__flip">
        Congratulations!
      </h1>
      <slot />
      <div class="flex justify-center">
        <MbqAvatar
          v-for="winner in winners"
          :key="winner.id"
          :avatar="winner"
        />
      </div>
      <div>
        <MbqTableQuiz :quizzes="quizzes" />
      </div>
    </div>
  </VueFinalModal>
</template>
~/types/quiz
