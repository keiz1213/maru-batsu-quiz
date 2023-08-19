<script setup lang="ts">
  useHead({
    titleTemplate: (title) => {
      return title
        ? `${title} | マルバツクイズオンライン`
        : 'マルバツクイズオンライン'
    }
  })

  const { logout } = useAuth()
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
    <MbqNavBar @logout="logout"></MbqNavBar>
    <slot />
    <MbqFooter class="mt-auto"></MbqFooter>
  </div>
</template>
