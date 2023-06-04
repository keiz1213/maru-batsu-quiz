<script setup lang="ts">
  import { Game } from '@/types/Game'

  defineProps<{
    games: Game[]
  }>()
</script>

<template>
  <MbqListGame :games="games" />
</template>
