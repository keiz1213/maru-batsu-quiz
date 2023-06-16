<script setup>
  defineProps({
    losers: Array
  })
</script>

<template>
  <div
    class="w-[1320px] max-w h-60 p-4 bg-white border border-gray-200 rounded-lg break-all flex"
  >
    <div>
      <p>losers</p>
      <Avatar
        v-for="(loser, index) in losers"
        :key="index"
        :memberObject="loser"
      />
    </div>
  </div>
</template>
