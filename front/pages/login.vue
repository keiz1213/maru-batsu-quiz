<script setup lang="ts">
  const { githubLogin } = useAuth()
  const login = async () => {
    await githubLogin()
    navigateTo('/home', { replace: true })
    console.log('loginしました')
  }
  const { toast, unsetToast, notify } = useToast()

  if (toast.value.isSet) {
    notify(toast.value.message, toast.value.type)
    unsetToast()
  }
</script>

<template>
  <TheContainer>
    <MbqButtonPrimary :onClick="login" :buttonType="'button'">GitHubでログイン</MbqButtonPrimary>
  </TheContainer>
</template>
