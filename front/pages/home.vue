<script setup lang="ts">
  definePageMeta({
    middleware: 'auth',
    layout: 'mbq-after-login'
  })
  const { toast, unsetToast, notify } = useToast()
  const { currentUser } = useAuth()
  const games = currentUser.value.games

  if (toast.value.isSet) {
    notify(toast.value.message, toast.value.type)
    unsetToast()
  }
</script>

<template>
  <MbqHome :games="games" />
  {{ toast }}
</template>
