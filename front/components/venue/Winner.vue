<script setup>
  const props = defineProps({
    numberOfWinner: Number,
    winners: Array
  })
</script>

<template>
  <div
    id="description"
    class="w-[1420px] max-w h-60 p-4 bg-white border border-gray-200 rounded-lg sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 break-all"
  >
    <div>
      <p>winner: 残り{{ numberOfWinner }}人</p>
      <Avatar
        v-for="(winner, index) in winners"
        :key="index"
        :memberObject="winner"
      />
    </div>
  </div>
</template>
