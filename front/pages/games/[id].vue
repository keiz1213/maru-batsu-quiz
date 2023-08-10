<script setup lang="ts">
  import { getGame } from '~/utils/api/services/game'

  definePageMeta({
    layout: 'mbq-after-login',
    middleware: ['auth', 'creator-only']
  })
  const route = useRoute()

  const gameId = route.params.id as string
  const game = await getGame(gameId)

  useHead({
    title: game.title
  })
</script>

<template>
  <MbqDetailGame :game="game" />
</template>
