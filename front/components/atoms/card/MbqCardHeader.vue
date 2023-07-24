<script setup lang="ts">
  defineProps<{
    title: string
  }>()
</script>

<template>
  <div
    class="w-full max-w-sm p-2 bg-primary border-x-1 border-t-1 border-gray-200 rounded-t-lg break-all text-white"
  >
    <h2 class="mt-2 mb-2 text-center text-2xl line-clamp-1">{{ title }}</h2>
  </div>
</template>
