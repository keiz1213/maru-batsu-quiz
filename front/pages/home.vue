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
</script>

<template>
  <HomeView />
</template>
