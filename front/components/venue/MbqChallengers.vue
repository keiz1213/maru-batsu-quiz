<script setup lang="ts">
  defineProps<{
    members: object
    gameStart: boolean
  }>()
</script>

<template>
  <div
    class="w-[1320px] h-60 p-4 bg-white border border-gray-200 rounded-lg break-all flex"
  >
    <div>
      <p>challenger</p>
      <MbqAvatar
        v-for="(member, index) in members"
        :key="index"
        :member="member"
        :gameStart="gameStart"
      />
    </div>
  </div>
</template>
