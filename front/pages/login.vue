<script setup lang="ts">
  definePageMeta({
    layout: 'mbq-after-login'
  })

  useHead({
    title: 'ログイン'
  })

  const { githubLogin, isLoading } = useAuth()

</script>

<template>
  <h2 class="text-4xl text-center mt-56">ログインしてください</h2>
  <MbqButtonGithub
    @click="githubLogin"
    :isLoading="isLoading"
    class="block mx-auto my-36"
  />
</template>
