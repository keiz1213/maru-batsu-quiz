<script setup lang="ts">
  definePageMeta({
    middleware: 'auth',
    layout: 'mbq-after-login'
  })

  useHead({
    title: 'ゲーム編集',
    meta: [{ name: 'description', content: 'Edit Game' }]
  })

  const { currentUser } = useAuth()
  const userId = currentUser.value.id
  const route = useRoute()
  const gameId = route.params.id as string
</script>

<template>
  <MbqGameEdit :userId="userId" :gameId="gameId" />
</template>
