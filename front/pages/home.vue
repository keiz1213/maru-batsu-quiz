<script setup lang="ts">
  import { getGames } from '~/utils/api/services/game'

  definePageMeta({
    middleware: 'auth',
    layout: 'mbq-after-login'
  })

  useHead({
    title: 'ホーム'
  })

  const games = await getGames()
</script>

<template>
  <MbqListGame :games="games" />
</template>
