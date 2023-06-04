<script setup>
  const props = defineProps({
    questioner: Object,
    gameStart: Boolean
  })
</script>

<template>
  <div
    class="w-22 bg-white border border-gray-200 rounded-lg flex justify-center"
  >
    <Avatar :memberObject="questioner" :gameStart="gameStart" />
  </div>
</template>
