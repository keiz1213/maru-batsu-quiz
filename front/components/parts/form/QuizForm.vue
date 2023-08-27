<script setup lang="ts">
  import { Quiz } from '~/types/quiz'

  const props = defineProps<{
    quiz: Quiz
    index: number
    quizzesLength: number
  }>()

  const emits = defineEmits<{
    (e: 'update-question', quiz: Quiz, value: string): void
    (e: 'update-correct-answer', quiz: Quiz, value: string): void
    (e: 'update-explanation', quiz: Quiz, value: string): void
    (e: 'remove-quiz', value: number): void
  }>()

  const quizNumber = props.index + 1

  const question = computed({
    get: () => props.quiz.question,
    set: (value) => emits('update-question', props.quiz, value)
  })

  const correctAnswer = computed({
    get: () => props.quiz.correct_answer,
    set: (value) => emits('update-correct-answer', props.quiz, value)
  })

  const explanation = computed({
    get: () => props.quiz.explanation,
    set: (value) => emits('update-explanation', props.quiz, value)
  })

  const remove = (index: number) => {
    emits('remove-quiz', index)
  }
</script>

<template>
  <div>
    <label :for="`form-quiz-${quizNumber}`" class="block text-md mb-2 ml-2"
      >クイズ{{ quizNumber }}</label
    >
    <div
      :id="`form-quiz-${quizNumber}`"
      :data-cy="`form-quiz-${quizNumber}`"
      class="w-full max-w-2xl p-4 bg-white border border-gray-300 rounded-lg relative"
    >
      <div class="absolute right-2 top-2">
        <CirculeCrossButton
          v-show="props.quizzesLength != 1"
          @click="remove(props.index)"
          :button-type="'button'"
        />
      </div>
      <label :for="`form-question-${quizNumber}`" class="block text-md m-2"
        >問題</label
      >
      <VeeField
        :data-cy="`form-question-${quizNumber}`"
        :id="`form-question-${quizNumber}`"
        :name="`question-${quizNumber}`"
        label="question"
        :rules="'required'"
        as="textarea"
        v-model="question"
        placeholder="1 + 1 = 2 ◯か✕か"
        rows="4"
        class="block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-300"
      >
      </VeeField>
      <VeeErrorMessage
        :name="`question-${quizNumber}`"
        class="text-red-700 block m-2"
      />
      <label
        :for="`form-correct-answer-${quizNumber}`"
        class="block text-md m-2"
        >正解</label
      >
      <select
        :data-cy="`form-correct-answer-${quizNumber}`"
        v-model="correctAnswer"
        :id="`form-correct-answer-${quizNumber}`"
        :name="'correct-answer'"
        class="bg-gray-50 border border-gray-300 text-sm rounded-lg select select-bordered block w-full max-w-xs p-2.5"
      >
        <option>◯</option>
        <option>✕</option>
      </select>
      <label :for="`form-explanation-${quizNumber}`" class="block text-md m-2"
        >解説</label
      >
      <VeeField
        :data-cy="`form-explanation-${quizNumber}`"
        :id="`form-explanation-${quizNumber}`"
        :name="`explanation-${quizNumber}`"
        label="explanation"
        :rules="'required'"
        as="textarea"
        v-model="explanation"
        placeholder="正解は◯です。1に1を足すと2になります"
        rows="4"
        class="block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-300"
      ></VeeField>
      <VeeErrorMessage
        :name="`explanation-${quizNumber}`"
        class="text-red-700 block m-2"
      />
    </div>
  </div>
</template>
