<script setup lang="ts">
  import MbqButtonGithub from '~/components/atoms/MbqButtonGithub.vue'

  const { githubLogin } = useAuth()
  const { toast, setToast, unsetToast, notifyOnSpot, notify } = useToast()

  const login = async () => {
    try {
      isLoading.value = true
      await githubLogin()
      setToast('ログインしました！', 'success')
      navigateTo('/home')
    } catch {
      isLoading.value = false
      notifyOnSpot('ログインに失敗しました', 'error')
    }
  }

  const isLoading = ref(false)

  if (toast.value.isSet) {
    notify(toast.value.message, toast.value.type)
    unsetToast()
  }
</script>

<template>
  <h2 class="text-4xl text-center mt-56">ログインしてください</h2>
  <MbqButtonGithub
    @click="login"
    :isLoading="isLoading"
    class="block mx-auto my-36"
  />
  <MbqFooter class="fixed bottom-0" />
</template>
