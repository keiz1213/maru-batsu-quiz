<script setup lang="ts">
  definePageMeta({
    middleware: 'auth',
    layout: 'mbq-after-login'
  })

  useHead({
    title: '退会の確認'
  })

  const { withdrawal, loading } = useAuth()
  const { currentUserId } = useCurrentUserId()
  const router = useRouter()
</script>

<template>
  <TheContainer>
    <h1 class="text-4xl text-center">退会</h1>
    <h2 class="text-3xl text-center mt-48">
      今まで作成した○×クイズが全て消去されますがよろしいでしょうか？
    </h2>
    <MbqButtonDanger
      :isLoading="loading"
      @click="withdrawal(currentUserId)"
      class="block mx-auto my-36"
    >
      退会する
    </MbqButtonDanger>
    <p
      @click="router.back"
      class="mt-16 text-2xl underline hover:cursor-pointer"
    >
      ←戻る
    </p>
  </TheContainer>
</template>
