<script setup lang="ts">
  import { Game } from '@/types/Game'

  defineProps<{
    games: Game[]
  }>()
</script>

<template>
  <TheContainer>
    <div class="grid grid-cols-1 gap-7 lg:grid-cols-2 xl:grid-cols-3">
      <MbqCardNew></MbqCardNew>
      <MbqCardGame
        v-for="(game, index) in games"
        :key="index"
        :game="game"
      ></MbqCardGame>
    </div>
  </TheContainer>
</template>
