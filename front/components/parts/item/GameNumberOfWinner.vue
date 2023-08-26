<script setup lang="ts">
  defineProps<{
    numberOfWinner: number
  }>()
</script>

<template>
  <div>
    <label for="item-game-number-of-winner" class="block text-md mb-2 ml-2"
      >勝者枠</label
    >
    <div
      class="w-full p-4 bg-white border border-gray-200 rounded-lg sm:p-6 md:p-8 break-all"
    >
      <span id="item-game-number-of-winner" class="text-xl whitespace-pre-wrap">
        {{ numberOfWinner }}
      </span>
    </div>
  </div>
</template>
