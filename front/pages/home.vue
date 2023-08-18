<script setup lang="ts">
  import { getGames } from '~/utils/api/services/game'

  definePageMeta({
    middleware: 'auth',
    layout: 'mbq-after-login'
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

  const games = await getGames()
</script>

<template>
  <MbqListGame :games="games" />
</template>
