<script setup lang="ts">
  definePageMeta({
    layout: 'mbq-after-login',
    middleware: ['logged-in-redirect']
  })

  useHead({
    title: 'ログイン',
    meta: [
      {
        name: 'description',
        content: 'ログインページ'
      },
      {
        name: 'og:title',
        content: 'ログイン'
      },
      {
        name: 'og:description',
        content: 'ログインページ'
      }
    ]
  })

  const { login, loading } = useAuth()
</script>

<template>
  <h2 class="text-4xl text-center mt-56">ログインしてください</h2>
  <MbqButtonGithub
    @click="login"
    :isLoading="loading"
    class="block mx-auto my-36"
  />
</template>
