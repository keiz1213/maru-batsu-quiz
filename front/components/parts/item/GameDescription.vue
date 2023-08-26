<script setup lang="ts">
  defineProps<{
    description: string
  }>()
</script>

<template>
  <div>
    <label for="item-game-description" class="block text-md mb-2 ml-2"
      >説明</label
    >
    <div
      class="w-full p-4 bg-white border border-gray-200 rounded-lg sm:p-6 md:p-8 break-all"
    >
      <span id="item-game-description" class="text-xl whitespace-pre-wrap">
        {{ description }}
      </span>
    </div>
  </div>
</template>
