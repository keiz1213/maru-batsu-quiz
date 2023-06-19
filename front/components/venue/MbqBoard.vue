<script setup lang="ts">
  defineProps<{
    announcement: string
    elapsed: number
    limit: number
  }>()
</script>

<template>
  <div
    class="w-[900px] h-[270px] bg-black border border-gray-200 rounded-lg break-all overflow-auto"
  >
    <MbqMacBar :title="'Question'" :isChat="false" />
    <div class="flex">
      <div id="announce-container" class="w-[885px]">
        <div class="text-3xl break-words whitespace-pre-wrap text-bash">
          $ {{ announcement }}
        </div>
      </div>
      <div id="timer-container">
        <MbqTimer :elapsed="elapsed" :limit="limit" />
      </div>
    </div>
  </div>
</template>
