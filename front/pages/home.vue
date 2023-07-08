<script setup lang="ts">
  definePageMeta({
    middleware: 'auth',
    layout: 'mbq-after-login'
  })

  useHead({
    title: 'ホーム',
    meta: [{ name: 'description', content: 'List of games created by users' }]
  })

  const { currentUser } = useAuth()
  const games = currentUser.value.games
</script>

<template>
  <MbqHome :games="games" />
</template>
