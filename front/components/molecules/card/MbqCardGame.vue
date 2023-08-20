<script setup lang="ts">
  import { Game } from '~/types/game'

  defineProps<{
    game: Game
  }>()

  const format = (date: string) => {
    const dateTimeFormat = new Intl.DateTimeFormat('ja', {
      dateStyle: 'medium'
    })
    return dateTimeFormat.format(new Date(date))
  }

  const navigate = (game: Game) => {
    return navigateTo({
      path: `/games/${game.id}`
    })
  }
</script>

<template>
  <div class="mx-auto">
    <div
      id="card-container"
      class="h-72 w-80 bg-white border border-gray-200 rounded-lg break-all relative hover:brightness-[0.97] hover:cursor-pointer"
      @click="navigate(game)"
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
  </div>
</template>
