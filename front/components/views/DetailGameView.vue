<script setup lang="ts">
  import { NotificationType } from '~/types/notificationType'
  import { Game } from '~/types/game'
  import { deleteGame } from '~/utils/api/services/game'

  const { getGameStore, resetGamesStore } = useGame()
  const { setToast, notifyOnSpot } = useToast()
  const { startLoading, stopLoading } = useLoading()
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
      startLoading()
      await deleteGame(gameId)
      setToast('ゲームを削除しました!', NotificationType.Success)
      await resetGamesStore()
      stopLoading()
      navigateTo('/home')
    } catch {
      stopLoading()
      notifyOnSpot(
        'ゲームの削除に失敗しました。再度やり直してください。',
        NotificationType.Error
      )
    }
  }
</script>

<template>
  <TheContainer>
    <GameItemTemplate
      :game="game"
      :game-venue-url="gameVenueUrl"
      @destroy-game="destroyGame"
    />
  </TheContainer>
</template>
