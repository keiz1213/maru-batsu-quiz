<script setup lang="ts">
  const { githubLogin } = useAuth()
  const login = async () => {
    await githubLogin()
    navigateTo('/home', { replace: true })
    console.log('loginしました')
  }
</script>

<template>
  <TheContainer>
    <MbqButtonPrimary :onClick="login">GitHubでログイン</MbqButtonPrimary>
  </TheContainer>
</template>
