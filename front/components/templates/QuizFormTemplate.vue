<script setup lang="ts">
  import { Quiz } from '~/types/quiz'

  const props = defineProps<{
    quizzes: Quiz[]
  }>()

  const emits = defineEmits<{
    (e: 'update-quizzes', value: Quiz[]): void
  }>()

  const quizzes = computed({
    get: () => props.quizzes,
    set: (value) => emits('update-quizzes', value)
  })

  const updateQuestion = (quiz: Quiz, question: string) =>
    (quiz.question = question)

  const updateCorrectAnswer = (quiz: Quiz, correctAnswer: string) =>
    (quiz.correct_answer = correctAnswer)

  const updateExplanation = (quiz: Quiz, explanation: string) =>
    (quiz.explanation = explanation)

  const removeQuiz = (index: number) => {
    props.quizzes.splice(index, 1)
  }
</script>

<template>
  <div v-for="(quiz, index) in quizzes" :key="index" class="my-6">
    <QuizForm
      :quiz="quiz"
      :index="index"
      :quizzes-length="quizzes.length"
      @update-question="updateQuestion"
      @update-correct-answer="updateCorrectAnswer"
      @update-explanation="updateExplanation"
      @remove-quiz="removeQuiz"
    />
  </div>
</template>
