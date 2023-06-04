<script setup lang="ts">
  defineProps<{
    userId: number
  }>()
</script>

<template>
  <MbqFormGame :actionType="'new'" :userId="userId" :gameId="''" />
</template>
