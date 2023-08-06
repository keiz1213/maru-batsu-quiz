<script setup lang="ts">
  import { Game } from '~/types/game'
  import { Quiz } from '~/types/quiz'
  import { postGame, putGame } from '~/utils/api/services/game'
  import FolderPlusIcon from 'vue-material-design-icons/FolderPlus.vue'
  import UpdateIcon from 'vue-material-design-icons/Update.vue'

  const props = defineProps<{
    game?: Game
  }>()

  const { loading, setLoading } = useLoading()
  const { setToast, notifyOnSpot } = useToast()

  const defaultInitialQuizCount = 3
  const isEditGame = computed(() => !!props.game)
  const isEditing = ref(false)
  const editNow = () => (isEditing.value = true)
  const editDone = () => (isEditing.value = false)
  let quizzes: Ref<Quiz[]>
  let game: Game

  const createGame = async (game: Game): Promise<void> => {
    try {
      setLoading()
      const { currentUserId } = useCurrentUserId()
      const createdGame = await postGame(currentUserId.value, game)
      setToast('ゲームを作成しました!', 'success')
      navigateTo(`/games/${createdGame.id}`)
    } catch {
      notifyOnSpot(
        'ゲームの作成に失敗しました。再度やり直してください。',
        'error'
      )
    }
  }

  const updateGame = async (game: Game): Promise<void> => {
    try {
      setLoading()
      await putGame(game)
      setToast('ゲームを更新しました!', 'success')
      navigateTo(`/games/${game.id}`)
    } catch {
      notifyOnSpot(
        'ゲームの更新に失敗しました。再度やり直してください。',
        'error'
      )
    }
  }

  const setGame = (editableGame: Game) => {
    game = reactive<Game>(editableGame)
    watch(game, () => {
      editNow()
    })
  }

  const setQuizzes = (editableQuizzes: Quiz[] | []) => {
    quizzes = ref<Quiz[] | []>(editableQuizzes)
  }

  const initializeNewGame = () => {
    setQuizzes([])
    for (let i = 0; i < defaultInitialQuizCount; i++) {
      addQuiz()
    }
    const newGame: Game = {
      user_id: null,
      id: null,
      title: '',
      description: '',
      quizzes: quizzes.value,
      number_of_winner: 1,
      channel_name: '',
      created_at: '',
      updated_at: ''
    }
    setGame(newGame)
  }

  const initializeEditGame = () => {
    game = props.game as Game
    setQuizzes(game.quizzes)
    setGame(game)
  }

  const addQuiz = () => {
    const quiz: Quiz = reactive({
      question: '',
      correct_answer: '◯',
      explanation: ''
    })
    quizzes.value.push(quiz)
  }

  const removeQuiz = (index: number) => {
    quizzes.value.splice(index, 1)
  }

  const onInvalidSubmit = () => {
    notifyOnSpot('入力内容を確認してください', 'error')
  }

  const onSubmit = () => {
    editDone()
    isEditGame.value ? updateGame(game) : createGame(game)
  }

  const confirmSave = (event: BeforeUnloadEvent) => {
    if (isEditing.value) {
      event.preventDefault()
      event.returnValue = ''
    }
  }

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

  isEditGame.value ? initializeEditGame() : initializeNewGame()
</script>

<template>
  <TheContainer>
    <div class="px-40">
      <MbqH1>ゲーム{{ isEditGame ? '編集' : '作成' }}</MbqH1>
      <VeeForm @submit="onSubmit" @invalid-submit="onInvalidSubmit">
        <MbqFormGameTitle
          v-model:modelValue="game.title"
        ></MbqFormGameTitle>

        <MbqFormGameDescription
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
          v-model:modelValue="game.number_of_winner"
        ></MbqFormGameNumberOfWinner>

        <div class="flex justify-center">
          <MbqButtonPrimary
            v-if="isEditGame"
            :buttonType="'submit'"
            :isLoading="loading"
          >
            <div class="flex">
              <update-icon /><span class="ml-1">ゲームを更新する</span>
            </div>
          </MbqButtonPrimary>
          <MbqButtonPrimary v-else :buttonType="'submit'" :isLoading="loading">
            <div class="flex">
              <folder-plus-icon /><span class="ml-1">ゲームを作成する</span>
            </div>
          </MbqButtonPrimary>
        </div>
      </VeeForm>
    </div>
  </TheContainer>
</template>
