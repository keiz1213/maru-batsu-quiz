<script setup lang="ts">
  defineProps<{
    numberOfWinner: number
    winners: object
  }>()
</script>

<template>
  <div
    class="w-[1320px] h-60 p-4 bg-white border border-gray-200 rounded-lg break-all"
  >
    <div>
      <p>winner: 残り{{ numberOfWinner }}人</p>
      <MbqAvatar
        v-for="(winner, index) in winners"
        :key="index"
        :member="winner"
      />
    </div>
  </div>
</template>
