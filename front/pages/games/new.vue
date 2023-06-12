<script setup lang="ts">
  definePageMeta({
    middleware: 'auth',
    layout: 'mbq-after-login'
  })
  const { toast, unsetToast, notify } = useToast()
  const { currentUser } = useAuth()
  const userId = currentUser.value.id
</script>

<template>
  <MbqGameNew :userId="userId" />
  {{ toast }}
</template>
