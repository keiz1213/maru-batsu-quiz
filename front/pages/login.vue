<script setup lang="ts">
  const { githubLogin } = useAuth()
  const login = async () => {
    isLoading.value = true
    await githubLogin()
    navigateTo('/home', { replace: true })
    console.log('loginしました')
  }
  const { toast, unsetToast, notify } = useToast()

  const isLoading = ref(false)

  if (toast.value.isSet) {
    notify(toast.value.message, toast.value.type)
    unsetToast()
    isLoading.value = false
  }
</script>

<template>
  <TheContainer>
    <MbqButtonPrimary :onClick="login" :isLoading="isLoading"
      >GitHubでログイン</MbqButtonPrimary
    >
  </TheContainer>
</template>
