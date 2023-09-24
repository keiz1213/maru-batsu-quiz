<script setup lang="ts">
  import { Quiz } from '~/types/quiz'
  import { VueFinalModal } from 'vue-final-modal'
  import PlayerAvatar from '~/utils/class/PlayerAvatar'

  defineProps<{
    winners: PlayerAvatar[]
    quizzes: Quiz[]
  }>()
</script>
<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class="mx-auto my-6 p-4 bg-white rounded-lg space-y-2 absolute inset-0 w-[850px]"
    content-transition="vfm-fade"
    overlay-transition="vfm-fade"
  >
    <div class="absolute inset-0 h-full overflow-auto px-12">
      <div class="text-center">
        <h1
          class="text-4xl my-6 animate__animated animate__flip text-gradient font-bold"
        >
          Congratulations!
        </h1>
      </div>
      <slot />
      <div class="flex justify-center">
        <Avatar
          v-for="winner in winners"
          :key="winner.avatarId"
          :avatar="winner"
        />
      </div>
      <div>
        <QuizTable :quizzes="quizzes" />
      </div>
      <div class="mb-10 mt-3">
        <span class="text-md underline hover:cursor-pointer w-20"
          ><NuxtLink :to="'/'">←Top</NuxtLink></span
        >
      </div>
    </div>
  </VueFinalModal>
</template>

<style scoped>
  .text-gradient {
    display: inline-block;
    background: -webkit-linear-gradient(19deg, #21d4fd 0%, #b721ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: blue;
  }
</style>
