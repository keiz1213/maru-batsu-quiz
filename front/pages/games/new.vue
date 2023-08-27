<script setup lang="ts">
  definePageMeta({
    middleware: 'auth'
  })

  useHead({
    title: '新規ゲーム作成',
    meta: [
      {
        name: 'description',
        content: '新規ゲーム作成'
      },
      {
        name: 'og:title',
        content: '新規ゲーム作成'
      },
      {
        name: 'og:description',
        content: '新規ゲーム作成'
      }
    ]
  })
</script>

<template>
  <NewGameView />
</template>
