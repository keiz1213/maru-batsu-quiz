<script setup lang="ts">
  const { signOut, currentUser } = useAuth()
  const { toast, unsetToast, notify } = useToast()
  const avatarUrl = currentUser.value.avatar_url

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

  if (toast.value.isSet) {
    notify(toast.value.message, toast.value.type)
    unsetToast()
  }
</script>

<template>
  <MbqNavBar @logout="logout" :avatarUrl="avatarUrl"></MbqNavBar>
  <slot />
  <MbqFooter @withdrawal="withdrawal"></MbqFooter>
</template>
