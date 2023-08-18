<script setup lang="ts">
  import { getGame } from '~/utils/api/services/game'

  definePageMeta({
    layout: 'mbq-after-login',
    middleware: ['auth', 'creator-only']
  })

  useHead({
    title: 'ゲーム編集',
    meta: [
      {
        name: 'description',
        content: 'ゲーム編集'
      },
      {
        name: 'og:title',
        content: 'ゲーム編集'
      },
      {
        name: 'og:description',
        content: 'ゲーム編集'
      }
    ]
  })

  const route = useRoute()

  const gameId = route.params.id as string
  const game = await getGame(gameId)
</script>

<template>
  <MbqFormGame :game="game" />
</template>
