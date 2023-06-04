<script setup>
  defineProps({
    question: String
  })
</script>

<template>
  <div
    id="description"
    class="flex w-[1050px] max-w bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 break-all"
  >
    <Circle />
    <Cross />
  </div>
</template>
