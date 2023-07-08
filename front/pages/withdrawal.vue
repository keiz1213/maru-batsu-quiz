<script setup lang="ts">
  useHead({
    title: '退会完了',
    meta: [{ name: 'description', content: 'Page announcing completion of withdrawal' }]
  })
</script>

<template>
  <TheContainer>
    <p>ご利用ありがとうございました</p>
    <NuxtLink :to="'/'">○✗クイズオンライン</NuxtLink>
  </TheContainer>
</template>
