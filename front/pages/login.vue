<script setup lang="ts">
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
  <TheContainer>
    <MbqButtonPrimary :onClick="login" :isLoading="isLoading"
      >GitHubでログイン</MbqButtonPrimary
    >
    <div class="w-32 h-32 bg-red-300 animate__animated animate__bounce"></div>
  </TheContainer>
</template>
