<script setup lang="ts">
  definePageMeta({
    middleware: 'auth',
    layout: 'mbq-after-login'
  })

  const { signOut, currentUser } = useAuth()
  const router = useRouter()

  const withdrawal = async (): Promise<void> => {
    await useMyFetch(`/api/v1/users/${currentUser.value.id}`, {
      method: 'delete'
    })
    await signOut()
    navigateTo('/withdrawal', { replace: true })
    console.log('退会しました')
  }
</script>

<template>
  <TheContainer>
    <h1 class="text-4xl text-center">退会</h1>
    <h2 class="text-3xl text-center mt-48">
      今まで作成した○×クイズが全て消去されますがよろしいでしょうか？
    </h2>
    <MbqButtonDanger @click="withdrawal" class="block mx-auto my-36">
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
