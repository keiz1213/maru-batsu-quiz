<script setup lang="ts">
  definePageMeta({
    layout: 'mbq-default',
    middleware: ['auth', 'creator-only']
  })

  useHead({
    title: 'ゲーム編集',
    meta: [
      {
        name: 'description',
        content: 'ゲーム編集'
      },
      {
        name: 'og:title',
        content: 'ゲーム編集'
      },
      {
        name: 'og:description',
        content: 'ゲーム編集'
      }
    ]
  })
</script>

<template>
  <EditGameView />
</template>
