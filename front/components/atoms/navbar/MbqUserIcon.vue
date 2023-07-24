<script setup lang="ts">
  const { user } = useAuth()
  const photoURL = user.value?.photoURL as string
</script>

<template>
  <img
    class="h-12 w-12 rounded-full border-2 border-my-blue object-cover object-center"
    :src="photoURL"
  />
</template>
