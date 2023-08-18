<script setup lang="ts">
  import { getGame } from '~/utils/api/services/game'

  definePageMeta({
    layout: 'mbq-default',
    middleware: ['auth', 'creator-only']
  })
  const route = useRoute()

  const gameId = route.params.id as string
  const game = await getGame(gameId)

  useHead({
    title: game.title,
    meta: [
      {
        name: 'description',
        content: 'ゲーム詳細'
      },
      {
        name: 'og:title',
        content: game.title
      },
      {
        name: 'og:description',
        content: 'ゲーム詳細'
      }
    ]
  })
</script>

<template>
  <MbqDetailGame :game="game" />
</template>
