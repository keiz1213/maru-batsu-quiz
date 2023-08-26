<script setup lang="ts">
  definePageMeta({
    middleware: 'auth',
    layout: 'mbq-default'
  })

  useHead({
    title: 'ホーム',
    meta: [
      {
        name: 'description',
        content: 'ユーザーのゲーム一覧'
      },
      {
        name: 'og:title',
        content: 'ホーム'
      },
      {
        name: 'og:description',
        content: 'ユーザーのゲーム一覧'
      }
    ]
  })

  // const { games } = useGame()
</script>

<template>
  <!-- <MbqListGame :games="games" /> -->
  <HomeView />
</template>
