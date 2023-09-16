<script setup lang="ts">
  import ChatQuestionOutlineIcon from 'vue-material-design-icons/ChatQuestionOutline.vue'
  import ChatAlertOutlineIcon from 'vue-material-design-icons/ChatAlertOutline.vue'

  useHead({
    title: 'HOW TO PLAY',
    meta: [
      {
        name: 'description',
        content: 'ゲームの遊び方'
      },
      {
        name: 'og:title',
        content: '遊び方'
      },
      {
        name: 'og:description',
        content: 'ゲームの遊び方'
      }
    ]
  })
</script>

<template>
  <HowToPlayView />
</template>
