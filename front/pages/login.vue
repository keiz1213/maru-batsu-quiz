<script setup lang="ts">
  definePageMeta({
    layout: 'mbq-after-login',
    middleware: 'authenticated'
  })

  useHead({
    title: 'ログイン'
  })

  const { githubLogin, loading } = useAuth()
</script>

<template>
  <h2 class="text-4xl text-center mt-56">ログインしてください</h2>
  <MbqButtonGithub
    @click="githubLogin"
    :isLoading="loading"
    class="block mx-auto my-36"
  />
</template>
