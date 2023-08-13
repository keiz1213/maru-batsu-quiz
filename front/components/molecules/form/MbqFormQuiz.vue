<script setup lang="ts">
  const props = defineProps<{
    index: number
    quizzesLength: number
    question: string
    correctAnswer: string
    explanation: string
  }>()

  const emits = defineEmits<{
    (e: 'update:question', value: string): void
    (e: 'update:correctAnswer', value: string): void
    (e: 'update:explanation', value: string): void
    (e: 'removeQuiz', value: number): void
  }>()

  const question = computed({
    get: () => props.question,
    set: (value) => emits('update:question', value)
  })

  const correctAnswer = computed({
    get: () => props.correctAnswer,
    set: (value) => emits('update:correctAnswer', value)
  })

  const explanation = computed({
    get: () => props.explanation,
    set: (value) => emits('update:explanation', value)
  })

  const remove = (index: number) => {
    emits('removeQuiz', index)
  }

  const isLastQuiz = () => {
    return props.quizzesLength === 1
  }

  const quizNumber = props.index + 1
</script>

<template>
  <MbqItemContainer>
    <MbqLabel :labelFor="`form-quiz-${quizNumber}`"
      >クイズ{{ quizNumber }}</MbqLabel
    >
    <MbqFrameMd
      :id="`form-quiz-${quizNumber}`"
      :data-cy="`form-quiz-${quizNumber}`"
    >
      <div class="flex justify-end">
        <MbqButtonCirculeCross
          v-show="!isLastQuiz()"
          @click="remove(props.index)"
          :button-type="'button'"
        />
      </div>
      <MbqLabel :labelFor="`form-question-${quizNumber}`">問題</MbqLabel>
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
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
      >
      </VeeField>
      <VeeErrorMessage
        :name="`question-${quizNumber}`"
        class="text-red-700 block m-2"
      />
      <MbqLabel :labelFor="`form-correct-answer-${quizNumber}`">正解</MbqLabel>
      <select
        :data-cy="`form-correct-answer-${quizNumber}`"
        v-model="correctAnswer"
        :id="`form-correct-answer-${quizNumber}`"
        :name="'correct-answer'"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg select select-bordered block w-full max-w-xs p-2.5"
      >
        <option>◯</option>
        <option>✕</option>
      </select>
      <MbqLabel :labelFor="`form-explanation-${quizNumber}`">解説</MbqLabel>
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
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
      ></VeeField>
      <VeeErrorMessage
        :name="`explanation-${quizNumber}`"
        class="text-red-700 block m-2"
      />
    </MbqFrameMd>
  </MbqItemContainer>
</template>
