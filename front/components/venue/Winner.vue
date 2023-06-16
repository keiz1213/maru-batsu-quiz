<script setup>
  const props = defineProps({
    numberOfWinner: Number,
    winners: Array
  })
</script>

<template>
  <div
    class="w-[1320px] max-w h-60 p-4 bg-white border border-gray-200 rounded-lg break-all"
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
