<script setup>
  defineProps({
    quizzes: Array,
    currentQuizNumber: Number
  })
</script>

<template>
  <div
    class="w-80 p-2 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 flex justify-center"
  >
    <button class="btn btn-primary m-1" @click="$emit('question')">
      {{ currentQuizNumber + 1 }} 問目を出題する
    </button>
    <!-- The button to open modal -->
    <label for="my-modal-3" class="btn m-1">問題を確認する</label>
    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="my-modal-3" class="modal-toggle" />
    <div class="modal">
      <div class="w-3/4 overflow-auto h-3/4 relative">
        <label for="my-modal-3" class="btn btn-sm absolute right-2 top-2 z-10"
          >閉じる</label
        >
        <div id="quiz">
          <table class="table w-full table-fixed">
            <thead>
              <tr>
                <th class="w-14 text-center">出題順</th>
                <th class="text-center">問題</th>
                <th class="w-14 text-center">正解</th>
                <th class="text-center">解説</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(quiz, index) in quizzes" :key="index" class="">
                <th class="text-center">{{ index + 1 }}</th>
                <td class="break-words whitespace-pre-wrap">
                  {{ quiz.question }}
                </td>
                <td class="text-center">{{ quiz.correct_answer }}</td>
                <td class="break-words whitespace-pre-wrap">
                  {{ quiz.explanation }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
