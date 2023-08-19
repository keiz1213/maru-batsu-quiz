<script setup lang="ts">
  import { Game } from '~/types/game'

  defineProps<{
    games: Game[] | null
  }>()
</script>

<template>
  <div class="grid grid-cols-1 gap-7 lg:grid-cols-2 xl:grid-cols-3 mt-[100px]">
    <MbqCardNew></MbqCardNew>
    <MbqCardGame
      v-for="(game, index) in games"
      :key="index"
      :game="game"
    ></MbqCardGame>
  </div>
</template>
