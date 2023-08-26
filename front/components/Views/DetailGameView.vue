<script setup lang="ts">
  import { Game } from '~/types/game'
  import { deleteGame } from '~/utils/api/services/game'

  const { getGameStore, resetGamesStore } = useGame()
  const { setToast, notifyOnSpot } = useToast()
  const { setLoading, clearLoading } = useLoading()
  const config = useRuntimeConfig()
  const route = useRoute()
  const gameId = route.params.id as string
  const game = getGameStore(parseInt(gameId)) as Game
  const frontUrl = config.public.frontURL
  const gameVenuePath = `/games/${gameId}/venue`
  const queryParams = new URLSearchParams({ title: game.title })
  const gameVenueUrl = `${frontUrl}${gameVenuePath}?${queryParams.toString()}`

  const destroyGame = async () => {
    try {
      setLoading()
      await deleteGame(gameId)
      setToast('ゲームを削除しました!', 'success')
      await resetGamesStore()
      clearLoading()
      navigateTo('/home')
    } catch {
      clearLoading()
      notifyOnSpot(
        'ゲームの削除に失敗しました。再度やり直してください。',
        'error'
      )
    }
  }
</script>

<template>
  <TheContainer>
    <GameItemTemplate
      :game="game"
      :gameVenueUrl="gameVenueUrl"
      @destroy-game="destroyGame"
    />
  </TheContainer>
</template>
