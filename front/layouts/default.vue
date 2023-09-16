<script setup lang="ts">
  useHead({
    titleTemplate: (title) => {
      return title ? `${title} | ○×クイズオンライン` : '○×クイズオンライン'
    }
  })

  const { logout } = useAuth()
  const { isLoggedIn } = useFirebaseAuth()
  const { toast, clearToast, notify } = useToast()
  const route = useRoute()

  watch(route, () => {
    if (toast.value.isSet) {
      notify(toast.value.message, toast.value.type)
      clearToast()
    }
  })
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <LoggedInNavBar v-if="isLoggedIn" @logout="logout" />
    <NavBar v-else />
    <slot />
    <Footer class="mt-auto"></Footer>
  </div>
</template>
