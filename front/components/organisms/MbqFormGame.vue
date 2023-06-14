<script setup lang="ts">
  import { Game } from '@/types/Game'
  import { Quiz } from '@/types/Quiz'
  import { getGame } from '~/utils/getters'

  const props = defineProps<{
    actionType: string
    userId: number
    gameId: string
  }>()

  onMounted(() => {
    window.addEventListener('beforeunload', confirmSave)
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

  const isEditing = ref(false)
  const confirmSave = (event: BeforeUnloadEvent) => {
    if (isEditing.value) {
      event.preventDefault()
      event.returnValue = '編集した内容が破棄されますがよろしいですか？'
    }
  }

  const { toast, setToast, unsetToast, notify } = useToast()

  let quizzes: Ref<Quiz[]>
  let game: Game

  const isNewAction = (): boolean => props.actionType === 'new'

  const postGame = async (game: Game, userId: number): Promise<void> => {
    const { data } = await useMyFetch('/api/v1/games', {
      method: 'post',
      body: {
        user_id: userId,
        title: game.title,
        description: game.description,
        number_of_winner: game.number_of_winner,
        channel_name: Math.random().toString(32).substring(2),
        quizzes: game.quizzes
      }
    })
    const createdGame = data.value as Game
    setToast('ゲームを作成しました!', 'success')
    navigateTo(`/games/${createdGame.id}`)
  }

  const putGame = async (game: Game, gameId: string): Promise<void> => {
    await useMyFetch(`/api/v1/games/${gameId}`, {
      method: 'put',
      body: {
        title: game.title,
        description: game.description,
        number_of_winner: game.number_of_winner,
        quizzes: game.quizzes
      }
    })
    setToast('ゲームを更新しました!', 'success')
    navigateTo(`/games/${gameId}`)
  }

  const setGame = (editableGame: Game): void => {
    game = reactive<Game>(editableGame)
    watch(game, () => {
      isEditing.value = true
    })
  }

  const setQuizzes = (editableQuizzes: Quiz[] | []): void => {
    quizzes = ref<Quiz[] | []>(editableQuizzes)
  }

  const initializeNewGame = (): void => {
    setQuizzes([])
    for (let i = 0; i < 3; i++) {
      addQuiz()
    }
    const newGame: Game = {
      user_id: null,
      id: null,
      channel_name: '',
      title: '',
      description: '',
      quizzes: quizzes.value,
      number_of_winner: 1,
      created_at: '',
      updated_at: ''
    }
    setGame(newGame)
  }

  const initializeCreatedGame = async (): Promise<void> => {
    const createdGame = await getGame(props.gameId)
    setQuizzes(createdGame.quizzes)
    setGame(createdGame)
  }

  const addQuiz = (): void => {
    const quiz: Quiz = reactive({
      question: '',
      correct_answer: '◯',
      explanation: ''
    })
    quizzes.value.push(quiz)
  }

  const removeQuiz = (index: number): void => {
    quizzes.value.splice(index, 1)
  }

  const onInvalidSubmit = () => {
    setToast('入力内容を確認してください', 'error')
    notify(toast.value.message, toast.value.type)
    unsetToast()
  }

  const onSubmit = () => {
    isEditing.value = false
    isNewAction() ? postGame(game, props.userId) : putGame(game, props.gameId)
  }

  isNewAction() ? initializeNewGame() : await initializeCreatedGame()
</script>

<template>
  <TheContainer>
    <MbqH1>ゲーム{{ isNewAction() ? '作成' : '編集' }}</MbqH1>
    <VeeForm @submit="onSubmit" @invalid-submit="onInvalidSubmit">
      <MbqFormGameTitle
        :id="'new-game-name'"
        v-model:modelValue="game.title"
      ></MbqFormGameTitle>

      <MbqFormGameDescription
        :id="'new-description'"
        v-model:modelValue="game.description"
      ></MbqFormGameDescription>

      <MbqFormQuiz
        v-for="(quiz, index) in quizzes"
        :key="index"
        :index="index"
        v-model:quizzesLength="quizzes.length"
        v-model:question="quiz.question"
        v-model:correctAnswer="quiz.correct_answer"
        v-model:explanation="quiz.explanation"
        @removeQuiz="removeQuiz"
      ></MbqFormQuiz>
      <MbqButtonSecondary @click="addQuiz" :button-type="'button'"
        >+ クイズを追加する</MbqButtonSecondary
      >

      <MbqFormGameNumberOfWinner
        :id="'new-number-of-winner'"
        v-model:modelValue="game.number_of_winner"
      ></MbqFormGameNumberOfWinner>

      <div class="flex justify-center">
        <MbqButtonPrimary v-if="isNewAction()" :button-type="'submit'">
          作成
        </MbqButtonPrimary>
        <MbqButtonPrimary v-else="!isNewAction()" :button-type="'submit'">
          更新
        </MbqButtonPrimary>
      </div>
    </VeeForm>
  </TheContainer>
</template>
