<script setup lang="ts">
  defineProps<{
    gameId: string
  }>()
</script>

<template>
  <MbqDetailGame :gameId="gameId" />
</template>
