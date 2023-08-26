<script setup lang="ts">
  import { Game } from '~/types/game'

  defineProps<{
    games: Game[]
  }>()
</script>

<template>
  <div class="grid grid-cols-1 gap-7 lg:grid-cols-2 xl:grid-cols-3">
    <div class="mx-auto">
      <NewGameCard></NewGameCard>
    </div>
    <div v-for="game in games" :key="game.id!" class="mx-auto">
      <GameCard :game="game" />
    </div>
  </div>
</template>
