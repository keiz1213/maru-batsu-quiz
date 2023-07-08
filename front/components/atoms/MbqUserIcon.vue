<script setup lang="ts">
  const { currentUser } = useAuth()
</script>

<template>
  <img
    class="h-12 w-12 rounded-full border-2 border-primary object-cover object-center"
    :src="currentUser.avatar_url"
  />
</template>
