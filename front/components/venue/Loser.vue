<script setup>
  defineProps({
    losers: Array
  })
</script>

<template>
  <div
    id="description"
    class="w-[1420px] max-w h-60 p-4 bg-white border border-gray-200 rounded-lg sm:p-6 md:p-8 break-all flex"
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
