<script setup lang="ts">
  const { signOut, currentUser } = useAuth()

  const logout = async (): Promise<void> => {
    await signOut()
    navigateTo('/login', { replace: true })
    console.log('logoutしました')
  }
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
  <MbqNavBar @logout="logout"></MbqNavBar>
  <slot />
  <MbqFooter @withdrawal="withdrawal"></MbqFooter>
</template>
