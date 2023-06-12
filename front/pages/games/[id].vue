<script setup lang="ts">
  definePageMeta({
    middleware: 'auth',
    layout: 'mbq-after-login'
  })
  const { toast, unsetToast, notify } = useToast()
  const route = useRoute()
  const gameId = route.params.id as string

  if (toast.value.isSet) {
    notify(toast.value.message, toast.value.type)
    unsetToast()
  }
</script>

<template>
  <MbqGameShow :gameId="gameId" />
</template>
