<script setup lang="ts">
  defineProps<{
    userId: number
    gameId: string
  }>()
</script>

<template>
  <MbqFormGame :actionType="'edit'" :userId="userId" :gameId="gameId" />
</template>
