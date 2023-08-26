<script setup lang="ts">
  import { Game } from '~/types/game'
  import { Quiz } from '~/types/quiz'
  import UpdateIcon from 'vue-material-design-icons/Update.vue'

  const props = defineProps<{
    game: Game
  }>()

  const { loading } = useLoading()

  const emits = defineEmits<{
    (e: 'update-game', value: Game): void
    (e: 'submit'): void
    (e: 'invalid-submit'): void
  }>()

  const game = computed({
    get: () => props.game,
    set: (value) => emits('update-game', value)
  })

  const updateTitle = (title: string) => (game.value.title = title)

  const updateDescription = (description: string) =>
    (game.value.description = description)

  const updateQuizzes = (quizzes: Quiz[]) => (game.value.quizzes = quizzes)

  const updateNumberOfWinner = (numberOfWinner: number) =>
    (game.value.number_of_winner = numberOfWinner)

  const emitSubmit = () => emits('submit')

  const emitInvalidSubmit = () => emits('invalid-submit')

  const addQuiz = () => {
    const quiz: Quiz = reactive({
      question: '',
      correct_answer: '◯',
      explanation: ''
    })
    props.game.quizzes.push(quiz)
  }
</script>

<template>
  <div>
    <MbqH1>ゲーム{{ game.id === null ? '作成' : '更新' }}</MbqH1>
    <VeeForm @submit="emitSubmit" @invalid-submit="emitInvalidSubmit">
      <div class="my-6">
        <GameTitleForm :title="game.title" @update-title="updateTitle" />
      </div>
      <div class="my-6">
        <GameDescriptionForm
          :description="game.description"
          @update-description="updateDescription"
        />
      </div>
      <div class="my-6">
        <QuizTemplate :quizzes="game.quizzes" @update-quizzes="updateQuizzes" />
      </div>
      <div>
        <MbqButtonSecondary @click="addQuiz" :button-type="'button'"
          >+ クイズを追加する</MbqButtonSecondary
        >
      </div>
      <div class="my-6">
        <GameNumberOfWinnerForm
          :numberOfWinner="game.number_of_winner"
          @update-number-of-winner="updateNumberOfWinner"
        />
      </div>
      <div class="flex justify-center">
        <MbqButtonPrimary :buttonType="'submit'" :isLoading="loading">
          <div class="flex justify-center">
            <update-icon /><span class="ml-1"
              >ゲームを{{ game.id === null ? '作成' : '更新' }}する</span
            >
          </div>
        </MbqButtonPrimary>
      </div>
    </VeeForm>
  </div>
</template>
