<script setup lang="ts">
  definePageMeta({
    middleware: ['loggedin-redirect']
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

  const { login } = useAuth()
  const { loading } = useLoading()
</script>

<template>
  <h2 class="text-4xl text-center mt-56">ログインしてください</h2>
  <GithubButton
    @click="login"
    :is-loading="loading"
    class="block mx-auto my-36"
  />
</template>
