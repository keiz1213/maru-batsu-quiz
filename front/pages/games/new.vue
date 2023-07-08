<script setup lang="ts">
  definePageMeta({
    middleware: 'auth',
    layout: 'mbq-after-login'
  })

  useHead({
    title: '新規ゲーム作成',
    meta: [{ name: 'description', content: 'Create a new game page' }]
  })

  const { currentUser } = useAuth()
  const userId = currentUser.value.id
</script>

<template>
  <MbqGameNew :userId="userId" />
</template>
