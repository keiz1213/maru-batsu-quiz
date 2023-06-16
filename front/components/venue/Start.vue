<script setup>
  defineProps({
    members: Array,
    gameStart: Boolean
  })
</script>

<template>
  <div
    class="w-[1320px] h-60 p-4 bg-white border border-gray-200 rounded-lg break-all flex"
  >
    <div>
      <p>challenger</p>
      <Avatar
        v-for="(member, index) in members"
        :key="index"
        :memberObject="member"
        :gameStart="gameStart"
      />
    </div>
  </div>
</template>
