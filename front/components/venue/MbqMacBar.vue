<script setup lang="ts">
  defineProps<{
    title: string
  }>()
</script>

<template>
  <div class="w-full h-7 bg-neutral-200 mb-2 flex relative">
    <div class="flex absolute top-2 left-2">
      <div class="w-[13px] h-[13px] mr-1 rounded-full bg-rose-500"></div>
      <div class="w-[13px] h-[13px] mr-1 rounded-full bg-yellow-400"></div>
      <div class="w-[13px] h-[13px] rounded-full bg-green-500"></div>
    </div>
    <p class="mx-auto my-auto">{{ title }}</p>
  </div>
</template>
