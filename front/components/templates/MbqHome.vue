<script setup lang="ts">
  import { Game } from '@/types/Game'

  defineProps<{
    games: Game[] | null
  }>()
</script>

<template>
  <MbqListGame :games="games" />
</template>
