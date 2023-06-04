<script setup>
  defineProps({
    announcement: String
  })
</script>

<template>
  <div
    id="description"
    class="w-[920px] max-w h-[220px] p-4 bg-white border border-gray-200 rounded-lg sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 break-all"
  >
    <p class="text-3xl break-words whitespace-pre-wrap">{{ announcement }}</p>
  </div>
</template>
