<script setup lang="ts">
  const { signOut, currentUser } = useAuth()
  const { toast, setToast, unsetToast, notify } = useToast()
  const route = useRoute()

  const avatarUrl = currentUser.value.avatar_url

  const logout = async (): Promise<void> => {
    await signOut()
    setToast('ログアウトしました！', 'success')
    navigateTo('/login')
  }

  const withdrawal = async (): Promise<void> => {
    await useMyFetch(`/api/v1/users/${currentUser.value.id}`, {
      method: 'delete'
    })
    await signOut()
    navigateTo('/withdrawal', { replace: true })
    console.log('退会しました')
  }

  watch(route, () => {
    if (toast.value.isSet) {
      notify(toast.value.message, toast.value.type)
      unsetToast()
    }
  })
</script>

<template>
  <MbqNavBar @logout="logout" :avatarUrl="avatarUrl"></MbqNavBar>
  <slot />
  <MbqFooter @withdrawal="withdrawal"></MbqFooter>
</template>
