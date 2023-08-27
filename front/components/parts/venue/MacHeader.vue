<script setup lang="ts">
  defineProps<{
    numberOfWinner: number
    title: string
  }>()
</script>

<template>
  <div class="backdrop-blur-sm bg-white/30 px-3 py-0 w-full z-10 h-6">
    <ul class="flex">
      <li class="font-bold">{{ title }}</li>
      <li class="ml-3">残勝者枠: {{ numberOfWinner }} 枠</li>
    </ul>
  </div>
</template>
