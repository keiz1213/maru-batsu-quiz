<script setup lang="ts">
  import { Quiz } from '~/types/quiz'

  defineProps<{
    quizzes: Quiz[]
  }>()
</script>

<template>
  <div>
    <label for="item-quizzes" class="block text-md mb-2 ml-2">クイズ</label>
    <table
      id="item-quizzes"
      class="w-full table-fixed border-separate rounded-lg border-t border-x border-gray-200 border-spacing-0 overflow-hidden"
    >
      <thead>
        <tr>
          <th
            class="bg-primary text-center break-words text-white whitespace-pre-wrap py-3"
          >
            出題順
          </th>
          <th
            class="bg-primary text-center break-words text-white whitespace-pre-wrap py-3"
          >
            問題
          </th>
          <th
            class="bg-primary text-center break-words text-white whitespace-pre-wrap py-3"
          >
            正解
          </th>
          <th
            class="bg-primary text-center break-words text-white whitespace-pre-wrap py-3"
          >
            解説
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(quiz, index) in quizzes" :key="index">
          <th
            class="border-b border-gray-200 font-normal py-3 px-3"
          >
            {{ index + 1 }}
          </th>
          <th
            class="border-b text-left border-gray-200 font-normal py-3 px-3"
          >
            {{ quiz.question }}
          </th>
          <th
            class="border-b border-gray-200 font-normal py-3 px-3"
          >
            {{ quiz.correct_answer }}
          </th>
          <th
            class="border-b text-left border-gray-200 font-normal py-3 px-3"
          >
            {{ quiz.explanation }}
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>
