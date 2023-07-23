<script setup lang="ts">
  definePageMeta({
    middleware: 'auth',
    layout: 'mbq-after-login'
  })

  useHead({
    title: '新規ゲーム作成'
  })
</script>

<template>
  <MbqFormGame />
</template>
