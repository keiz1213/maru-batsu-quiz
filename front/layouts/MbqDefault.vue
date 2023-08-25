<script setup lang="ts">
  useHead({
    titleTemplate: (title) => {
      return title
        ? `${title} | マルバツクイズオンライン`
        : 'マルバツクイズオンライン'
    }
  })

  const { logout, isLoggedIn } = useAuth()
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
    <MbqLoggedInNavBar v-if="isLoggedIn" @logout="logout" />
    <MbqNavBar v-else />
    <slot />
    <MbqFooter class="mt-auto"></MbqFooter>
  </div>
</template>
