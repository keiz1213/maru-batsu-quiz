<script setup lang="ts">
  import { Quiz } from '~/types/quiz'
  import { VueFinalModal } from 'vue-final-modal'
  import Avatar from '~/utils/class/Avatar'

  defineProps<{
    winners: Avatar[]
    quizzes: Quiz[]
  }>()

  const backToHome = () => {
    navigateTo('/home', { external: true })
  }
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
          :key="winner.avatarId"
          :avatar="winner"
        />
      </div>
      <div>
        <MbqTableQuiz :quizzes="quizzes" />
      </div>
      <div class="mb-10">
        <span @click="backToHome" class="underline hover:cursor-pointer">
          ←ホームに戻る
        </span>
      </div>
    </div>
  </VueFinalModal>
</template>
