<script setup lang="ts">
  import { Game } from '@/types/Game'

  defineProps<{
    game: Game
  }>()

  const format = (date: string): string => {
    const dateTimeFormat = new Intl.DateTimeFormat('ja', {
      dateStyle: 'medium'
    })
    return dateTimeFormat.format(new Date(date))
  }
</script>

<template>
  <div class="mx-auto">
    <NuxtLink :to="`/games/${game.id}`">
      <div
        class="h-72 w-96 bg-white border border-gray-200 rounded-lg break-all relative hover:brightness-[0.97]"
      >
        <MbqCardHeader :title="game.title"></MbqCardHeader>
        <MbqCardContent
          :description="game.description"
          :numberOfWinner="game.number_of_winner"
          :createdAt="format(game.created_at)"
          :updatedAt="format(game.updated_at)"
        >
        </MbqCardContent>
      </div>
    </NuxtLink>
  </div>
</template>
