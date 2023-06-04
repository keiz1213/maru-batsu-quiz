<script setup lang="ts">
  const props = defineProps<{
    index: number
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
</script>

<template>
  <MbqItemContainer>
    <MbqLabel :id="`new-quiz-${props.index}`">クイズ{{ index + 1 }}</MbqLabel>
    <MbqFlameMd :id="`new-quiz-${props.index}`">
      <div class="flex justify-end">
        <MbqButtonCirculeCross @click="remove(props.index)" />
      </div>
      <MbqLabel :id="`new-question-${props.index}`">問題</MbqLabel>
      <textarea
        v-model="question"
        placeholder="1 + 1 = 2 ◯か✕か"
        rows="4"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
      >
      </textarea>
      <MbqLabel :id="`new-correct-answer-${props.index}`">正解</MbqLabel>
      <select
        v-model="correctAnswer"
        :id="`new-correct-answer-${props.index}`"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg select select-bordered block w-full max-w-xs p-2.5"
      >
        <option>◯</option>
        <option>✕</option>
      </select>
      <MbqLabel :id="`new-explanation-${props.index}`">解説</MbqLabel>
      <textarea
        v-model="explanation"
        :id="`new-explanation-${props.index}`"
        rows="4"
        placeholder="正解は◯です。1に1を足すと2になります"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
      >
      </textarea>
    </MbqFlameMd>
  </MbqItemContainer>
</template>
