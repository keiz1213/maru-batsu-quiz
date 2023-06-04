<script setup lang="ts">
  import { Game } from '@/types/Game'
  import { Quiz } from '@/types/Quiz'

  const props = defineProps<{
    actionType: string
    userId: number
    gameId: string
  }>()

  let quizzes: Ref<Quiz[]>
  let game: Game

  const isNewAction = (): boolean => props.actionType === 'new'

  const getGame = async (gameId: string): Promise<Game> => {
    const { data } = await useFetch(
      `http://localhost:3001/api/v1/games/${gameId}`
    )
    const game = data.value as Game
    return game
  }

  const postGame = async (game: Game, userId: number): Promise<void> => {
    const { data } = await useFetch('http://localhost:3001/api/v1/games', {
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
    navigateTo(`/games/${createdGame.id}`)
  }

  const putGame = async (game: Game, gameId: string): Promise<void> => {
    await useFetch(`http://localhost:3001/api/v1/games/${gameId}`, {
      method: 'put',
      body: {
        title: game.title,
        description: game.description,
        number_of_winner: game.number_of_winner,
        quizzes: game.quizzes
      }
    })
    navigateTo(`/games/${gameId}`)
  }

  const setGame = (editableGame: Game): void => {
    game = reactive<Game>(editableGame)
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

  // onBeforeMount(async () => {
  // })

  isNewAction() ? initializeNewGame() : await initializeCreatedGame()
</script>

<template>
  <TheContainer>
    <MbqH1>ゲーム{{ isNewAction() ? '作成' : '編集' }}</MbqH1>
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
      v-model:question="quiz.question"
      v-model:correctAnswer="quiz.correct_answer"
      v-model:explanation="quiz.explanation"
      @removeQuiz="removeQuiz"
    ></MbqFormQuiz>
    <MbqButtonSecondary @click="addQuiz">+ クイズを追加する</MbqButtonSecondary>

    <MbqFormGameNumberOfWinner
      :id="'new-number-of-winner'"
      v-model:modelValue="game.number_of_winner"
    ></MbqFormGameNumberOfWinner>

    <MbqButtonPrimary
      v-if="isNewAction()"
      @click="postGame(game, props.userId)"
    >
      作成
    </MbqButtonPrimary>
    <MbqButtonPrimary
      v-else="!isNewAction()"
      @click="putGame(game, props.gameId)"
    >
      更新
    </MbqButtonPrimary>
  </TheContainer>
</template>
