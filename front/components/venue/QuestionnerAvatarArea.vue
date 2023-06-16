<script setup lang="ts">
  defineProps<{
    owners: object
    gameStart: boolean
  }>()
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-lg flex justify-center">
    <Avatar
      v-for="(owner, index) in owners"
      :key="index"
      :memberObject="owner"
    />
  </div>
</template>
