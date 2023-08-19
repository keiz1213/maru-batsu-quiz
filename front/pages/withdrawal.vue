<script setup lang="ts">
  definePageMeta({
    layout: 'mbq-default'
  })
  useHead({
    title: '退会完了',
    meta: [
      {
        name: 'description',
        content: '退会完了'
      },
      {
        name: 'og:title',
        content: '退会完了'
      },
      {
        name: 'og:description',
        content: '退会完了'
      }
    ]
  })
</script>

<template>
  <TheContainer>
    <MbqH1>退会完了</MbqH1>
    <h2 class="text-3xl text-center mt-48">
      ご利用ありがとうございました。またのご利用お待ちしています。
    </h2>
    <span class="text-2xl block text-center mt-20 underline"
      ><NuxtLink :to="'/'">Top</NuxtLink></span
    >
  </TheContainer>
</template>
