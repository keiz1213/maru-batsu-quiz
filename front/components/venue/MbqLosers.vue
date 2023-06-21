<script setup lang="ts">
  defineProps<{
    losers: object
  }>()
</script>

<template>
  <div
    class="w-[1320px] pt-2 pl-2 h-56 backdrop-blur-sm bg-white/30 rounded-lg break-all my-4"
  >
    <div class="">
      <MbqAvatar
        v-for="(loser, index) in losers"
        :key="index"
        :member="loser"
      />
    </div>
  </div>
</template>
