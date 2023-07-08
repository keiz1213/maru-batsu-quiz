<script setup lang="ts">
  const { signOut, isLoggedIn, currentUser } = useAuth()
  const { toast, setToast, unsetToast, notify } = useToast()
  const route = useRoute()

  const avatarUrl = currentUser.value.avatar_url

  const logout = async (): Promise<void> => {
    await signOut()
    setToast('ログアウトしました！', 'success')
    navigateTo('/')
  }

  watch(route, () => {
    if (toast.value.isSet) {
      notify(toast.value.message, toast.value.type)
      unsetToast()
    }
  })
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <MbqNavBar
      v-if="isLoggedIn()"
      @logout="logout"
      :avatarUrl="avatarUrl"
    ></MbqNavBar>
    <slot />
    <MbqFooter class="mt-auto"></MbqFooter>
  </div>
</template>
