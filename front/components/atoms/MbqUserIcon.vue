<script setup lang="ts">
  const { currentUser } = useAuth()
</script>

<template>
  <img
    class="h-14 w-14 rounded-full border-4 border-double border-blue-500 object-cover object-center"
    :src="currentUser.avatar_url"
  />
</template>
