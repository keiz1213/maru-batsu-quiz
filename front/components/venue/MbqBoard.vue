<script setup lang="ts">
  defineProps<{
    announcement: string
    elapsed: number
    limit: number
  }>()
</script>

<template>
  <div
    class="w-[950px] h-[350px] bg-black rounded-lg break-all overflow-auto mx-2"
  >
    <MbqMacBar :title="'Quiz'" :isChat="false" />
    <div class="flex px-2 py-2">
      <div id="announce-container" class="w-[885px]">
        <div
          class="text-3xl break-words whitespace-pre-wrap text-bash leading-relaxed"
        >
          $ {{ announcement }}
        </div>
      </div>
      <div id="timer-container">
        <MbqTimer :elapsed="elapsed" :limit="limit" />
      </div>
    </div>
  </div>
</template>
