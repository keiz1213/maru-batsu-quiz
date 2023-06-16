<script setup lang="ts">
  defineProps<{
    announcement: string
    elapsed: number
    limit: number
  }>()
</script>

<template>
  <div
    class="w-[950px] h-[270px] p-4 bg-white border border-gray-200 rounded-lg break-all overflow-y-scroll"
  >
    <div class="flex">
      <div id="announce-container" class="w-[885px]">
        <div class="text-3xl break-words whitespace-pre-wrap">
          {{ announcement }}
        </div>
      </div>
      <div id="timer-container">
        <Timelimit :elapsed="elapsed" :limit="limit" />
      </div>
    </div>
  </div>
</template>
