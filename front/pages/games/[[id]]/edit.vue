<script setup lang="ts">
  definePageMeta({
    middleware: 'auth',
    layout: 'mbq-after-login'
  })

  useHead({
    title: 'ゲーム編集'
  })

  const { currentUser } = useAuth()
  const userId = currentUser.value.id
  const route = useRoute()
  const gameId = route.params.id as string
</script>

<template>
  <MbqFormGame :actionType="'edit'" :userId="userId" :gameId="gameId" />
</template>
