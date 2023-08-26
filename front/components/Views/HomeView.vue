<script setup lang="ts">
  const { games } = useGame()
</script>

<template>
  <TheContainer>
    <CardTemplate :games="games" />
  </TheContainer>
</template>
