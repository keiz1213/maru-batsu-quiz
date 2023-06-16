<script setup lang="ts">
  defineProps<{
    announcement: string
  }>()
</script>

<template>
  <div
    class="w-[1050px] h-[220px] p-4 bg-white border border-gray-200 rounded-lg break-all"
  >
    <p class="text-3xl break-words whitespace-pre-wrap">{{ announcement }}</p>
  </div>
</template>
