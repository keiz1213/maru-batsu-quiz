<script setup lang="ts">
  definePageMeta({
    middleware: 'auth'
  })

  useHead({
    title: '退会の確認',
    meta: [
      {
        name: 'description',
        content: '退会の確認'
      },
      {
        name: 'og:title',
        content: '退会の確認'
      },
      {
        name: 'og:description',
        content: '退会の確認'
      }
    ]
  })

  const { withdrawal } = useAuth()
  const { loading } = useLoading()
  const { currentUser } = useCurrentUser()
</script>

<template>
  <TheContainer>
    <TheH1>退会</TheH1>
    <h2 class="text-2xl text-center mt-16 md:text-4xl md:mt-48">
      今まで作成した○×クイズが全て消去されますがよろしいでしょうか？
    </h2>
    <DangerButton
      :is-loading="loading"
      @click="withdrawal(currentUser.id)"
      class="block mx-auto my-36"
    >
      退会する
    </DangerButton>
    <span class="mt-16 text-2xl underline hover:cursor-pointer w-20"
      ><NuxtLink :to="'/'">←Top</NuxtLink></span
    >
  </TheContainer>
</template>
