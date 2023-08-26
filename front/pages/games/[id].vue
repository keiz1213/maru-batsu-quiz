<script setup lang="ts">
  import { Game } from '~/types/game'

  definePageMeta({
    layout: 'mbq-default',
    middleware: ['auth', 'creator-only']
  })

  const { getGameStore } = useGame()
  const route = useRoute()

  const gameId = route.params.id as string
  const game = getGameStore(parseInt(gameId)) as Game

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
  <DetailGameView />
</template>
