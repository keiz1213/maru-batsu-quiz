<script setup lang="ts">
  definePageMeta({
    middleware: 'auth',
    layout: 'mbq-after-login'
  })

  useHead({
    title: '新規ゲーム作成'
  })

  const { currentUser } = useAuth()
  const userId = currentUser.value.id
</script>

<template>
  <MbqFormGame :actionType="'new'" :userId="userId" :gameId="''" />
</template>
