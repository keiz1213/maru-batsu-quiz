<script setup lang="ts">
  import { NotificationType } from '~/types/notificationType'
  import { Game } from '~/types/game'
  import { Quiz } from '~/types/quiz'
  import { postGame } from '~/utils/api/services/game'

  const { currentUser } = useCurrentUser()
  const { setToast, notifyOnSpot } = useToast()
  const { setLoading, clearLoading } = useLoading()
  const { resetGamesStore } = useGame()
  const defaultInitialQuizCount = 3
  const isEditing = ref(false)
  const quizzes = ref<Quiz[]>([])
  let newGame = reactive<Game>({
    user_id: null,
    id: null,
    title: '',
    description: '',
    quizzes: quizzes.value,
    number_of_winner: 1,
    channel_name: '',
    created_at: '',
    updated_at: ''
  })

  const editing = () => (isEditing.value = true)
  const done = () => (isEditing.value = false)

  const updateGameProps = (game: Game) => {
    newGame = game
  }

  const createGame = async (newGame: Game): Promise<void> => {
    try {
      done()
      setLoading()
      const createdGame = await postGame(currentUser.value.id, newGame)
      await resetGamesStore()
      setToast('ゲームを作成しました!', NotificationType.Success)
      navigateTo(`/games/${createdGame.id}`)
      clearLoading()
    } catch {
      editing()
      clearLoading()
      notifyOnSpot(
        'ゲームの作成に失敗しました。再度やり直してください。',
        NotificationType.Error
      )
    }
  }

  const confirmSave = (event: BeforeUnloadEvent) => {
    if (isEditing.value) {
      event.preventDefault()
      event.returnValue = ''
    }
  }

  onBeforeMount(() => {
    for (let i = 0; i < defaultInitialQuizCount; i++) {
      const quiz: Quiz = reactive({
        question: '',
        correct_answer: '◯',
        explanation: ''
      })
      quizzes.value.push(quiz)
    }
  })

  onMounted(() => {
    window.addEventListener('beforeunload', confirmSave)
    watch(newGame, () => {
      editing()
    })
  })

  onUnmounted(() => {
    window.removeEventListener('beforeunload', confirmSave)
  })

  onBeforeRouteLeave((to, from, next) => {
    if (isEditing.value) {
      let answer = window.confirm(
        '編集した内容が破棄されますがよろしいですか？'
      )
      if (answer) {
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
      :game="newGame"
      @update-game="updateGameProps"
      @submit="createGame(newGame)"
      @invalid-submit="
        notifyOnSpot('入力内容を確認してください', NotificationType.Error)
      "
    />
  </TheContainer>
</template>
