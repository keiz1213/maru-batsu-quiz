<script setup lang="ts">
  import { Game } from '@/types/Game'

  const props = defineProps<{
    gameId: string
  }>()

  const gameId = props.gameId

  const getGame = async (gameId: string): Promise<Game> => {
    const { data } = await useFetch(
      `http://localhost:3001/api/v1/games/${gameId}`
    )
    const game = data.value as Game
    return game
  }

  const removeGame = async (gameId: string): Promise<void> => {
    await useFetch(`http://localhost:3001/api/v1/games/${gameId}`, {
      method: 'delete'
    })
    navigateTo('/home')
  }

  const game = await getGame(gameId)
  const gameVenueUrl = `http://localhost:3000/games/${gameId}/venue?title=${game.title}`

  // onBeforeMount(() => {
  // })
</script>

<template>
  <TheContainer>
    <MbqH1>{{ game.title }}</MbqH1>
    <MbqItemGame
      :content="game.description"
      :labelName="'説明'"
      :id="'show-game-description'"
    />
    <MbqTableQuiz :quizzes="game.quizzes" />
    <MbqItemGame
      :content="game.number_of_winner"
      :labelName="'勝ち抜き人数'"
      :id="'show-game-number-of-winner'"
    />
    <MbqItemGame
      :content="gameVenueUrl"
      :labelName="'ゲーム会場URL'"
      :id="'show-game-venue-url'"
    />
    <NuxtLink :to="gameVenueUrl">
      <MbqButtonPrimary>会場へ</MbqButtonPrimary>
    </NuxtLink>
    <NuxtLink :to="`/games/${gameId}/edit`">
      <MbqButtonSecondary>編集</MbqButtonSecondary>
    </NuxtLink>
    <MbqButtonDanger @click="removeGame(gameId)">削除</MbqButtonDanger>
  </TheContainer>
</template>
