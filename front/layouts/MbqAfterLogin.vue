<script setup lang="ts">
  useHead({
    titleTemplate: (title) => {
      return title ? `${title} | マルバツクイズオンライン` : 'マルバツクイズオンライン'
    }
  })
  const { signOut } = useAuth()
  const { toast, setToast, unsetToast, notify } = useToast()
  const route = useRoute()

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
    <MbqNavBar @logout="logout"></MbqNavBar>
    <slot />
    <MbqFooter class="mt-auto"></MbqFooter>
  </div>
</template>
