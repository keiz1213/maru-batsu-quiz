<script setup lang="ts">
  definePageMeta({
    middleware: 'auth',
    layout: 'mbq-after-login'
  })

  const { currentUser } = useAuth()
  const games = currentUser.value.games
</script>

<template>
  <MbqHome :games="games" />
</template>
