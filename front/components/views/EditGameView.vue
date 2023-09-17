<script setup lang="ts">
  import { NotificationType } from '~/types/notificationType'
  import { Game } from '~/types/game'
  import { putGame } from '~/utils/api/services/game'

  const { setToast, notifyOnSpot } = useToast()
  const { setLoading, clearLoading } = useLoading()
  const { getGameStore, resetGamesStore } = useGame()
  const route = useRoute()
  const isEditing = ref(false)
  const gameId = route.params.id as string
  let createdGame = getGameStore(parseInt(gameId)) as Game
  const editing = () => (isEditing.value = true)
  const done = () => (isEditing.value = false)

  const updateGameProps = (game: Game) => {
    createdGame = game
  }

  const updateGame = async (game: Game): Promise<void> => {
    try {
      done()
      setLoading()
      await putGame(game)
      await resetGamesStore()
      setToast('ゲームを更新しました!', NotificationType.Success)
      navigateTo(`/games/${game.id}`)
      clearLoading()
    } catch {
      clearLoading()
      editing()
      notifyOnSpot(
        'ゲームの更新に失敗しました。再度やり直してください。',
        NotificationType.Error
      )
    }
  }

  const confirmSave = async (event: BeforeUnloadEvent) => {
    if (isEditing.value) {
      event.preventDefault()
      event.returnValue = ''
      await resetGamesStore()
    }
  }

  onMounted(() => {
    window.addEventListener('beforeunload', confirmSave)
    watch(createdGame, () => {
      editing()
    })
  })

  onUnmounted(() => {
    window.removeEventListener('beforeunload', confirmSave)
  })

  onBeforeRouteLeave(async (to, from, next) => {
    if (isEditing.value) {
      let answer = window.confirm(
        '編集した内容が破棄されますがよろしいですか？'
      )
      if (answer) {
        await resetGamesStore()
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  })
</script>

<template>
  <TheContainer>
    <GameFormTemplate
      :game="createdGame"
      @update-game="updateGameProps"
      @submit="updateGame(createdGame)"
      @invalid-submit="
        notifyOnSpot('入力内容を確認してください', NotificationType.Error)
      "
    />
  </TheContainer>
</template>
