<script setup lang="ts">
  definePageMeta({
    middleware: 'auth',
    layout: 'mbq-after-login'
  })

  const route = useRoute()
  const gameId = route.params.id as string
</script>

<template>
  <MbqGameShow :gameId="gameId" />
</template>
