<script setup lang="ts">
  import { Quiz } from '~/types/quiz'

  defineProps<{
    quizzes: Quiz[]
  }>()
</script>

<template>
  <MbqItemContainer>
    <MbqLabel :labelFor="'table-quizzes'">クイズ</MbqLabel>
    <table
      class="w-full table-fixed border-separate rounded-lg border-t border-x border-gray-200 border-spacing-0 overflow-hidden"
    >
      <thead>
        <tr>
          <MbqTableHeader>出題順</MbqTableHeader>
          <MbqTableHeader>問題</MbqTableHeader>
          <MbqTableHeader>正解</MbqTableHeader>
          <MbqTableHeader>解説</MbqTableHeader>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(quiz, index) in quizzes" :key="index">
          <MbqTableData>{{ index + 1 }}</MbqTableData>
          <MbqTableData>{{ quiz.question }}</MbqTableData>
          <MbqTableData>{{ quiz.correct_answer }}</MbqTableData>
          <MbqTableData>{{ quiz.explanation }}</MbqTableData>
        </tr>
      </tbody>
    </table>
  </MbqItemContainer>
</template>
